# Developer Guide: AWS Troubleshooting Hub

## Overview

This guide explains how to work with the refactored, generic AWS Troubleshooting Hub. The codebase has been restructured to be highly reusable and maintainable for new developers.

## Architecture

### Key Components

1. **ServicePageFactory** - Generic component that renders any service page
2. **Configuration System** - Centralized configuration for routes, services, themes
3. **Data Validation** - Utilities to validate troubleshooting data
4. **Content Templates** - Reusable templates for common troubleshooting patterns

### Directory Structure

```
src/
├── components/
│   ├── ServicePageFactory.js    # Generic service page renderer
│   ├── EnhancedPageLayout.js     # Layout component (unchanged)
│   ├── Node.js                   # Tree node component (updated)
│   └── SearchBox.js              # Search component (updated)
├── config/
│   ├── constants.js              # Global constants
│   ├── services.js               # Service configurations
│   ├── routes.js                 # Route definitions
│   └── themes.js                 # Theme system
├── utils/
│   ├── dataValidator.js          # Data validation utilities
│   └── contentTemplates.js       # Content generation templates
├── data/                         # Troubleshooting data files
└── pages/                        # Static page components
```

## Adding a New Service

### Step 1: Add Service Configuration

Edit `src/config/services.js`:

```javascript
export const SERVICES = {
  // ... existing services
  
  newservice: {
    id: 'newservice',
    name: 'New Service Name',
    description: 'Description of the service and what it troubleshoots',
    category: 'compute', // or networking, database, etc.
    backLink: '/parent-category',
    dataFile: 'newServiceTroubleshootingData',
    logoAlt: 'New Service Logo Alt Text'
  }
};
```

### Step 2: Create Data File

Create `src/data/newServiceTroubleshootingData.js`:

```javascript
export const newServiceTroubleshootingData = [
  {
    id: "root",
    title: "New Service Troubleshooting",
    children: [
      {
        id: "common-issues",
        title: "Common Issues",
        children: [
          {
            id: "issue-1",
            title: "Issue Title",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "Description of the issue"</p>
                
                <div class="section-header">What to Look For</div>
                <div class="checklist">
                  <ul>
                    <li>Check item 1</li>
                    <li>Check item 2</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Fix 1:</strong> Description</li>
                    <li><strong>Fix 2:</strong> Description</li>
                  </ol>
                </div>

                <div class="note">
                  💡 Helpful tip or insight
                </div>
              </div>
            `
          }
        ]
      }
    ]
  }
];
```

### Step 3: Add Data Import

Edit `src/components/ServicePageFactory.js` and add your data import:

```javascript
const DATA_IMPORTS = {
  // ... existing imports
  newServiceTroubleshootingData: () => import('../data/newServiceTroubleshootingData')
};
```

### Step 4: Test Your Service

1. Start the development server: `npm start`
2. Navigate to `/newservice`
3. Verify the page loads correctly
4. Test search functionality
5. Validate data structure: `npm run validate-data` (if implemented)

## Using Content Templates

Instead of writing HTML manually, use the content template system:

```javascript
import { generateTroubleshootingContent, CONTENT_TEMPLATES } from '../utils/contentTemplates';

// Use a predefined template
const timeoutContent = CONTENT_TEMPLATES.timeout('Lambda', '15 minutes');

// Or create custom content
const customContent = generateTroubleshootingContent({
  customerSays: "My service is not working",
  quickCheck: [
    "Check CloudWatch logs",
    "Verify configuration"
  ],
  quickFixes: [
    "<strong>Restart service:</strong> Go to console and restart",
    "<strong>Check permissions:</strong> Verify IAM roles"
  ],
  note: "Always check logs first"
});
```

## Data Validation

Validate your data structure:

```javascript
import { generateValidationReport } from '../utils/dataValidator';
import { myTroubleshootingData } from '../data/myTroubleshootingData';

const report = generateValidationReport(myTroubleshootingData, 'myTroubleshootingData');

if (!report.summary.isValid) {
  console.error('Data validation failed:', report.summary);
  console.error('Errors:', report.errors);
}
```

## Theming

### Using Existing Colors

Colors are automatically applied based on node IDs. If your node ID contains keywords like 'lambda', 'apigateway', etc., it will get the appropriate color.

### Adding New Service Colors

Edit `src/config/themes.js`:

```javascript
export const SERVICE_COLORS = {
  // ... existing colors
  mynewservice: '#ff5722'
};
```

### Custom Icons

Add icons to the icon map:

```javascript
export const ICON_MAP = {
  services: {
    // ... existing icons
    mynewservice: '🆕'
  }
};
```

## Best Practices

### Data Structure

1. **Consistent IDs**: Use kebab-case for node IDs
2. **Meaningful Titles**: Clear, descriptive titles for each node
3. **Semantic HTML**: Use proper HTML structure in content
4. **Validation**: Always validate data before committing

### Content Guidelines

1. **Customer-Centric**: Start with "Customer says:" to set context
2. **Actionable**: Provide specific steps, not just descriptions
3. **Structured**: Use consistent sections (Quick Check, Quick Fixes, etc.)
4. **Links**: Include playbook references where applicable

### Performance

1. **Lazy Loading**: Data is loaded dynamically when needed
2. **Code Splitting**: Service pages are rendered on-demand
3. **Caching**: Browser caches data imports automatically

## Troubleshooting

### Common Issues

**Service page not loading:**
- Check service configuration in `src/config/services.js`
- Verify data file exists and is properly exported
- Check data import in `ServicePageFactory.js`

**Styling not applied:**
- Ensure node IDs contain service keywords
- Check theme configuration in `src/config/themes.js`
- Verify CSS variables are properly defined

**Search not working:**
- Check data structure follows expected format
- Ensure content is properly formatted HTML
- Verify search configuration in constants

### Debugging

Enable debug mode by adding to your data file:

```javascript
// Add this to see validation results in console
if (process.env.NODE_ENV === 'development') {
  import('../utils/dataValidator').then(({ generateValidationReport }) => {
    const report = generateValidationReport(yourData, 'yourDataFile');
    console.log('Validation Report:', report);
  });
}
```

## Migration Guide

### From Old Page Files

If you have existing page files like `SVLSPage.js`, you can remove them after:

1. Adding service configuration
2. Ensuring data import is configured
3. Testing the route works with ServicePageFactory

### Updating Existing Data

1. Run validation on existing data
2. Fix any validation errors
3. Consider using content templates for consistency
4. Update any hardcoded URLs to use constants

## Contributing

1. **Add Tests**: Write tests for new utilities and components
2. **Validate Data**: Always run validation before committing
3. **Update Documentation**: Keep this guide updated with changes
4. **Follow Patterns**: Use existing patterns for consistency

## Advanced Features

### Custom Page Types

For pages that don't fit the standard service pattern, you can still use the factory:

```javascript
// In ServicePageFactory.js
if (serviceId === 'special-case') {
  return <CustomComponent data={data} />;
}
```

### Dynamic Configuration

Load service configuration from external sources:

```javascript
// In services.js
export const loadDynamicServices = async () => {
  const response = await fetch('/api/services');
  return response.json();
};
```

### Plugin Architecture

Extend the system with plugins:

```javascript
// Plugin structure
export const myPlugin = {
  name: 'MyPlugin',
  services: { /* service configs */ },
  components: { /* custom components */ },
  routes: { /* additional routes */ }
};
```

## Performance Monitoring

Monitor your service pages:

```javascript
// Add to ServicePageFactory.js
useEffect(() => {
  const startTime = performance.now();
  
  return () => {
    const loadTime = performance.now() - startTime;
    console.log(`Service ${serviceId} loaded in ${loadTime}ms`);
  };
}, [serviceId]);
```

## Support

For questions or issues:

1. Check this documentation first
2. Look at existing service implementations
3. Run data validation to identify issues
4. Check browser console for errors
5. Review the component props and configuration

Remember: The goal is to make adding new services as simple as adding configuration and data files, without touching any component code.