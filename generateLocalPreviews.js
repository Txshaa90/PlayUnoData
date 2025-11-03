import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// Template configurations for screenshot generation
const templates = [
  {
    name: "Project Management Hub",
    url: "http://localhost:3000/workspace",
    filename: "project-management-hub.png",
    description: "Project tracking with tasks and deadlines"
  },
  {
    name: "Content Calendar Pro",
    url: "http://localhost:3000/workspace",
    filename: "content-calendar-pro.png",
    description: "Content management with analytics dashboard",
    // We'll switch to Content Pipeline tab for this screenshot
    setupActions: async (page) => {
      // Wait for the page to load and click on Content Pipeline tab
      await page.waitForSelector('[data-tab="Content Pipeline"]', { timeout: 5000 });
      await page.click('[data-tab="Content Pipeline"]');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for tab content to load
    }
  },
  {
    name: "Blank Template",
    url: "http://localhost:3000/workspace",
    filename: "blank-template.png",
    description: "Flexible template for CSV/Excel import",
    setupActions: async (page) => {
      // Switch to Blank Template tab
      await page.waitForSelector('[data-tab="Blank Template"]', { timeout: 5000 });
      await page.click('[data-tab="Blank Template"]');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },
  {
    name: "Templates Gallery",
    url: "http://localhost:3000/templates",
    filename: "templates-gallery.png",
    description: "Template gallery overview"
  },
  {
    name: "Dashboard Overview",
    url: "http://localhost:3000/dashboard",
    filename: "dashboard-overview.png",
    description: "Main dashboard with workspaces"
  },
  {
    name: "Sales CRM & Pipeline",
    url: "http://localhost:3000/templates/sales-crm",
    filename: "sales-crm.png",
    description: "Complete sales management system with pipeline tracking"
  },
  {
    name: "Landing Page",
    url: "http://localhost:3000",
    filename: "landing-page.png",
    description: "Homepage with features showcase"
  }
];

// Screenshot configuration
const SCREENSHOT_CONFIG = {
  width: 1200,
  height: 800,
  deviceScaleFactor: 2, // For high-quality images
  previewWidth: 400,
  previewHeight: 240
};

async function generatePreviews() {
  console.log("🚀 Starting template preview generation...");
  
  // Create directories if they don't exist
  const previewsDir = "public/previews";
  const templatesDir = "public/templates";
  
  if (!fs.existsSync("public")) fs.mkdirSync("public");
  if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir);
  if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir);

  const browser = await puppeteer.launch({
    headless: "new", // Use new headless mode
    defaultViewport: {
      width: SCREENSHOT_CONFIG.width,
      height: SCREENSHOT_CONFIG.height,
      deviceScaleFactor: SCREENSHOT_CONFIG.deviceScaleFactor
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  
  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  let successCount = 0;
  let errorCount = 0;

  for (const template of templates) {
    try {
      console.log(`📸 Capturing: ${template.name}`);
      
      // Navigate to the template URL
      await page.goto(template.url, { 
        waitUntil: "networkidle0",
        timeout: 30000 
      });

      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Execute any custom setup actions for this template
      if (template.setupActions) {
        try {
          await template.setupActions(page);
        } catch (setupError) {
          console.log(`⚠️  Setup actions failed for ${template.name}, continuing with default view`);
        }
      }

      // Wait for content to be visible
      await page.waitForSelector('body', { timeout: 10000 });
      
      // Take full-size screenshot
      const fullScreenshotPath = path.join(templatesDir, template.filename);
      await page.screenshot({
        path: fullScreenshotPath,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: SCREENSHOT_CONFIG.width,
          height: SCREENSHOT_CONFIG.height
        }
      });

      // Create a smaller preview version
      const previewScreenshotPath = path.join(previewsDir, template.filename);
      await page.setViewport({
        width: SCREENSHOT_CONFIG.previewWidth,
        height: SCREENSHOT_CONFIG.previewHeight,
        deviceScaleFactor: 2
      });
      
      await page.screenshot({
        path: previewScreenshotPath,
        fullPage: false
      });

      // Reset viewport for next screenshot
      await page.setViewport({
        width: SCREENSHOT_CONFIG.width,
        height: SCREENSHOT_CONFIG.height,
        deviceScaleFactor: SCREENSHOT_CONFIG.deviceScaleFactor
      });

      console.log(`✅ Generated: ${template.filename}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to capture ${template.name}:`, error.message);
      errorCount++;
    }
  }

  await browser.close();
  
  console.log("\n🎉 Preview generation complete!");
  console.log(`✅ Successfully generated: ${successCount} previews`);
  console.log(`❌ Failed: ${errorCount} previews`);
  console.log(`📂 Images saved in:`);
  console.log(`   - Full size: /public/templates/`);
  console.log(`   - Previews: /public/previews/`);
  
  // Generate a summary file
  const summary = {
    generatedAt: new Date().toISOString(),
    totalTemplates: templates.length,
    successCount,
    errorCount,
    templates: templates.map(t => ({
      name: t.name,
      filename: t.filename,
      description: t.description,
      fullImagePath: `/templates/${t.filename}`,
      previewImagePath: `/previews/${t.filename}`
    }))
  };
  
  fs.writeFileSync(
    path.join(previewsDir, 'generation-summary.json'), 
    JSON.stringify(summary, null, 2)
  );
  
  console.log("📋 Generation summary saved to /public/previews/generation-summary.json");
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error);
  process.exit(1);
});

// Run the preview generation
generatePreviews().catch(error => {
  console.error('❌ Preview generation failed:', error);
  process.exit(1);
});
