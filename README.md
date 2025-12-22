# TeamDMS Troubleshooting Guide

A comprehensive React-based troubleshooting guide for TeamDMS services with dual-section navigation for SVLS (Serverless) and DMI (Direct Management Interface) troubleshooting.

## Features

- 🎨 Amazon themed design with updated branding
- 📱 Fully responsive design across all devices
- ♿ Accessible (WCAG compliant)
- 🌙 Dark mode support
- ⚡ Smooth animations and transitions
- 📊 Interactive collapsible tree structure
- 🔝 Scroll to top functionality
- 🚀 Dual-section navigation (SVLS & DMI)
- 🧹 Optimized codebase with unnecessary files removed

## Recent Updates
- **Consistent Branding**: All references updated across components and stylesheets

### Project Cleanup
- Removed build directory from version control
- Eliminated excessive test files focused on implementation details
- Removed unused dependencies (`fast-check`)
- Cleaned up redundant documentation files
- Removed project specification files no longer needed for runtime
- Optimized bundle size and improved performance

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Updated with amazon-logo className
│   ├── Node.js            # Interactive tree node component
│   └── ScrollToTop.js     # Scroll to top functionality
├── pages/
│   ├── HomePage.js        # Landing page with section selection
│   ├── SVLSPage.js        # Serverless troubleshooting section
│   └── DMIPage.js         # Direct Management Interface section
├── data/
│   └── troubleshootingData.js  # Troubleshooting content data
├── App.js                 # Main routing component
├── App.css               # Updated with amazon-logo styles
└── index.js              # Application entry point
```

## Navigation

The application features a dual-section structure:

- **SVLS (Serverless)**: `/svls` - AWS serverless services troubleshooting
- **DMI (Direct Management Interface)**: `/dmi` - Amazon Connect and direct management troubleshooting

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses React Router for navigation.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## TeamDMS Project

This is part of the TeamDMS project suite for comprehensive troubleshooting and management tools.