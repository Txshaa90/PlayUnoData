# Template Preview Generation Guide

This guide explains how to generate and use template preview images for your PlayUnoData templates, similar to Airtable's approach.

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```
This will install Puppeteer and other required dependencies.

### Step 2: Start Your Development Server
```bash
npm run dev
```
Make sure your app is running on `http://localhost:3000`

### Step 3: Generate Preview Images
```bash
npm run generate-previews
```

This will:
- Launch a headless Chrome browser
- Navigate to each template page
- Take high-quality screenshots
- Save images in two sizes:
  - Full size: `/public/templates/` (1200x800px)
  - Previews: `/public/previews/` (400x240px)

## 📁 Generated Files

After running the script, you'll have:

```
public/
├── templates/           # Full-size template screenshots
│   ├── project-management-hub.png
│   ├── content-calendar-pro.png
│   ├── blank-template.png
│   └── ...
├── previews/           # Smaller preview images
│   ├── project-management-hub.png
│   ├── content-calendar-pro.png
│   ├── blank-template.png
│   ├── generation-summary.json
│   └── ...
```

## 🎨 Using Preview Images

### In Template Components

```tsx
import { TemplateImage } from '@/components/TemplateImage'

// Basic usage
<TemplateImage 
  templateId="template-4" 
  alt="Content Calendar Pro" 
/>

// With click handler
<TemplateImage 
  templateId="template-4" 
  alt="Content Calendar Pro"
  onClick={() => handleTemplateSelect()}
/>
```

### In Template Cards

```tsx
import { TemplateCardImage } from '@/components/TemplateImage'

<TemplateCardImage
  templateId="template-4"
  templateName="Content Calendar Pro"
  onClick={() => selectTemplate()}
/>
```

### Getting Image URLs Directly

```tsx
import { getTemplatePreviewImage } from '@/utils/previewImages'

const previewUrl = getTemplatePreviewImage('template-4', true) // true for preview size
const fullUrl = getTemplatePreviewImage('template-4', false)   // false for full size
```

## ⚙️ Configuration

### Adding New Templates

Edit `generateLocalPreviews.js` to add new templates:

```javascript
const templates = [
  // ... existing templates
  {
    name: "Your New Template",
    url: "http://localhost:3000/workspace",
    filename: "your-new-template.png",
    description: "Description of your template",
    setupActions: async (page) => {
      // Optional: Custom actions to set up the page
      await page.click('[data-tab="Your Tab"]');
      await page.waitForTimeout(1000);
    }
  }
];
```

### Customizing Screenshot Settings

Modify the `SCREENSHOT_CONFIG` in `generateLocalPreviews.js`:

```javascript
const SCREENSHOT_CONFIG = {
  width: 1200,        // Full screenshot width
  height: 800,        // Full screenshot height
  deviceScaleFactor: 2, // For high-quality images
  previewWidth: 400,   // Preview image width
  previewHeight: 240   // Preview image height
};
```

## 🔧 Troubleshooting

### Common Issues

1. **"Failed to capture" errors**
   - Make sure your dev server is running on `http://localhost:3000`
   - Check that the template URLs are accessible
   - Increase timeout values if pages load slowly

2. **Missing tab selectors**
   - Update the `setupActions` to match your actual tab selectors
   - Use browser dev tools to find the correct selectors

3. **Images not showing**
   - Verify images were generated in `/public/previews/`
   - Check the browser console for 404 errors
   - Ensure template IDs match between components and preview mappings

### Debug Mode

Run with debug output:
```bash
DEBUG=true npm run generate-previews
```

## 🌐 Production Deployment

### Option 1: Include Generated Images
- Commit the generated images to your repository
- Deploy normally - images will be served from `/public/`

### Option 2: Generate During Build
Add to your build process:
```json
{
  "scripts": {
    "build": "npm run generate-previews && next build"
  }
}
```

### Option 3: Use Screenshot APIs (After Deployment)
Once deployed, you can switch to screenshot APIs:

```javascript
// For production URLs
const screenshotUrl = `https://api.screenshotapi.net/screenshot?token=YOUR_TOKEN&url=https://yoursite.com/templates/project-management`
```

## 📊 Template Preview Mappings

Update `/utils/previewImages.ts` when adding new templates:

```typescript
export const TEMPLATE_PREVIEWS: Record<string, TemplatePreview> = {
  'your-template-id': {
    templateId: 'your-template-id',
    name: 'Your Template Name',
    filename: 'your-template.png',
    fullImagePath: '/templates/your-template.png',
    previewImagePath: '/previews/your-template.png',
    fallbackIcon: '🎯'
  }
}
```

## 🎯 Best Practices

1. **Consistent Naming**: Use kebab-case for filenames
2. **Fallback Icons**: Always provide fallback icons for templates
3. **Error Handling**: The TemplateImage component handles missing images gracefully
4. **Performance**: Use preview-sized images for cards, full-size for modals
5. **Accessibility**: Always provide meaningful alt text

## 📈 Next Steps

1. Generate your first set of previews
2. Update your template components to use the new images
3. Test the fallback behavior
4. Consider automating preview generation in your CI/CD pipeline

---

Need help? Check the generation summary at `/public/previews/generation-summary.json` for details about the last generation run.
