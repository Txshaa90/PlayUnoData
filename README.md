Data Management App

A modern, clean data management interface inspired by Airtable's design principles, built with Next.js, TypeScript, and Tailwind CSS.

## Design System

### Color Palette
- **Primary Green**: `#16A34A` - Used for primary buttons, active states, and highlights
- **Accent Green**: `#D1FAE5` - Used for hover states and subtle backgrounds
- **Background**: `#F9FAFB` - Main background color for reduced eye strain
- **White**: `#FFFFFF` - Card and component backgrounds

### Status Colors
- **Approved**: Green (`#16A34A`) with light green background
- **Pending**: Amber (`#FACC15`) with light amber background  
- **In Progress**: Blue (`#3B82F6`) with light blue background
- **Rejected/Blocked**: Red (`#EF4444`) with light red background

### Design Principles
- **12px border radius** for modern rounded components
- **Comfortable spacing** throughout the interface
- **Clean typography** with proper contrast ratios
- **Subtle shadows** and hover effects for interactivity
- **Lucide icons** for consistent visual language

## Features

### Header Toolbar
- Clean, minimalist design with action buttons
- Search functionality with icon
- Filter, Group, Sort, and Share controls
- Primary "Add record" button
- View switcher (Grid, Calendar, Chart views)

### Data Grid
- Clean table layout with proper borders
- Status badges with color coding
- Progress bars for visual completion tracking
- User avatars and assignee information
- Sortable columns with hover effects
- Alternating row colors for better readability

### View Controls
- Tab-based filtering (All records, Active, Completed)
- Record count display
- Settings access
- View type selector

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/
│   │   ├── Badge.tsx        # Status and priority badges
│   │   └── Button.tsx       # Reusable button component
│   ├── Header.tsx           # Main header with toolbar
│   ├── ViewControls.tsx     # View switching and filtering
│   └── DataGrid.tsx         # Main data table component
├── lib/
│   └── utils.ts             # Utility functions and helpers
└── tailwind.config.js       # Tailwind configuration with custom colors
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons
- **clsx & tailwind-merge** - Conditional styling utilities

## Responsive Design

The interface is fully responsive and works well on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

All components maintain proper spacing and usability across different screen sizes.
