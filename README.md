# AWS Troubleshooting Hub - Generic & Reusable Architecture

A comprehensive, **generic, and highly reusable** React application for AWS troubleshooting guides. This project has been refactored to eliminate code duplication and make it incredibly easy for new developers to contribute.

## 🚀 What's New - Generic Architecture

This project has been **completely refactored** to be highly reusable and maintainable:

- **90% Less Code Duplication**: Eliminated 17 nearly-identical page files
- **5-Minute Service Addition**: Add new services with just configuration
- **Centralized Configuration**: All constants, routes, and services in config files
- **Data Validation**: Built-in validation for troubleshooting data
- **Theme System**: Configurable colors and icons
- **Developer-Friendly**: Comprehensive documentation and migration tools

## 📁 New Project Structure

```
src/
├── components/
│   ├── ServicePageFactory.js     # 🆕 Generic service page renderer
│   ├── EnhancedPageLayout.js      # Layout component
│   ├── Node.js                    # Tree node component
│   └── SearchBox.js               # Search functionality
├── config/                        # 🆕 Configuration system
│   ├── constants.js               # Global constants
│   ├── services.js                # Service definitions
│   ├── routes.js                  # Route configuration
│   └── themes.js                  # Theme system
├── utils/                         # 🆕 Utility functions
│   ├── dataValidator.js           # Data validation
│   └── contentTemplates.js        # Content templates
├── data/                          # Troubleshooting data files
├── pages/                         # Static page components
└── docs/                          # 🆕 Developer documentation
```

## 🎯 Key Features

### For Developers
- **Generic Service Pages**: One component handles all service pages
- **Configuration-Driven**: Add services without touching component code
- **Data Validation**: Automatic validation of troubleshooting data
- **Content Templates**: Reusable templates for common patterns
- **Theme System**: Configurable colors and icons
- **Migration Tools**: Scripts to help transition existing services

### For Users
- **Fast Search**: Full-text search across all content
- **Responsive Design**: Works on all devices
- **Hierarchical Navigation**: Organized troubleshooting guides
- **External Search**: Integration with re:Post, AWS Guide, Google
- **Accessibility**: ARIA labels and semantic HTML

## 📋 Team Requirements & Guidelines

### For Each Support Team

Each team is responsible for creating and maintaining their service-related files following these requirements:

#### 1. **File Structure Requirements**
```
src/
├── pages/
│   └── [YourService]Page.js          # Main service page component
├── data/
│   └── [yourService]TroubleshootingData.js  # Troubleshooting data structure
└── __tests__/
    └── [YourService]Page.test.js     # Unit tests for your service page
```

#### 2. **Design Standards - MUST BE UNIFORM**

All service pages must follow the standardized design pattern:

**Page Component Structure:**
```javascript
import EnhancedPageLayout from '../components/EnhancedPageLayout';
import { yourServiceTroubleshootingData } from '../data/yourServiceTroubleshootingData';

function YourServicePage() {
  return (
    <EnhancedPageLayout
      title=""
      subtitle=""
      data={yourServiceTroubleshootingData}
      backLink="/parent-category"
      headerProps={{
        title: "Your Service Name",
        subtitle: "Comprehensive troubleshooting guides for [service description]",
        logoUrl: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png",
        logoAlt: "AWS [Your Service]"
      }}
    />
  );
}

export default YourServicePage;
```

**Data Structure Requirements:**
```javascript
export const yourServiceTroubleshootingData = [
  {
    id: "root",
    title: "Your Service Troubleshooting",
    children: [
      {
        id: "service-category",
        title: "Service Category Issues",
        children: [
          {
            id: "specific-issue",
            title: "Specific Issue Title",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "Description of issue"</p>
                
                <div class="section-header">What to Look For</div>
                <div class="checklist">
                  <ul>
                    <li>Diagnostic step 1</li>
                    <li>Diagnostic step 2</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Solution 1:</strong> Description</li>
                    <li><strong>Solution 2:</strong> Description</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="[internal-link]" class="playbook-link" target="_blank">
                    [Service] Troubleshooting Runbook
                  </a>
                </div>

                <div class="note">
                  💡 Key insight or tip
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

#### 3. **Content Guidelines**

- **Consistent Terminology**: Use standardized AWS service names and terminology
- **Structured Content**: Follow the HTML structure with proper CSS classes
- **Internal References**: Include links to internal playbooks and runbooks
- **Customer Language**: Use "Customer says:" format for issue descriptions
- **Actionable Steps**: Provide clear, numbered troubleshooting steps
- **Visual Indicators**: Use emojis and icons consistently (📖 for playbooks, 💡 for tips, etc.)

#### 4. **Testing Requirements**

Each team must provide unit tests for their service pages:
```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YourServicePage from '../pages/YourServicePage';

test('renders service page with correct title', () => {
  render(
    <BrowserRouter>
      <YourServicePage />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Your Service Name/i)).toBeInTheDocument();
});
```

## 🏗️ Architecture & Components

### Core Components
- **EnhancedPageLayout**: Standardized layout with search, navigation, and content rendering
- **Header**: Consistent header with logo, title, and subtitle
- **NavigationBar**: Main navigation across service categories
- **SearchBox**: Advanced search functionality across all content
- **Node**: Interactive tree node component for troubleshooting guides

### Service Categories

| Category | Team Responsibility | Status |
|----------|-------------------|---------|
| **DMS** | Database Migration Service Team | ✅ Active |
| **Database** | Database Services Team (DBMy, DBPo) | ✅ Active |
| **Analytics** | Analytics Team (DFA, DIA) | ✅ Active |
| **Big Data** | Big Data Team (DIST, DBL, ETL, SVO) | ✅ Active |
| **Networking** | Network Team (NetDev, NetInf, NetMnS) | ✅ Active |
| **Deployment** | DevOps Team (CDA, Containers, IaC) | ✅ Active |
| **SCD** | Storage & Content Delivery Team (DTS, MCD) | ✅ Active |
| **Linux** | Linux Systems Team | ✅ Active |
| **Windows** | Windows Team (EAP, WIN) | ✅ Active |
| **Security** | Security Team (SIP, SNC) | ✅ Active |
| **Unified Operations** | Operations Team (Gen-AI, MSS, Telco) | ✅ Active |

## 🛠️ Development Guidelines

### Adding a New Service Category

1. **Create Page Component**: `src/pages/[Service]Page.js`
2. **Create Data File**: `src/data/[service]TroubleshootingData.js`
3. **Add Route**: Update `src/App.js` with new route
4. **Update Homepage**: Add service card to `src/pages/HomePage.js`
5. **Add Tests**: Create `src/__tests__/[Service]Page.test.js`

### Code Standards
- **ES6+ JavaScript**: Use modern JavaScript features
- **React Hooks**: Functional components with hooks
- **Consistent Naming**: camelCase for variables, PascalCase for components
- **CSS Classes**: Use existing CSS classes for consistency
- **Responsive Design**: Ensure mobile compatibility

### Performance Considerations
- **Lazy Loading**: Consider code splitting for large service categories
- **Search Optimization**: Efficient search algorithms for large datasets
- **Memory Management**: Proper cleanup of event listeners and timers

## 🧪 Testing Strategy

### Test Coverage Requirements
- **Unit Tests**: All page components must have basic rendering tests
- **Integration Tests**: Search functionality and navigation flows
- **Accessibility Tests**: Ensure WCAG compliance
- **Performance Tests**: Page load times and search response times

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## 🚀 Deployment & Production

### Build Process
```bash
# Production build
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Environment Requirements
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📊 Analytics & Monitoring

The platform includes built-in page tracking and user analytics:
- **Page Views**: Track service category usage
- **Search Analytics**: Monitor search patterns and popular queries
- **Performance Metrics**: Page load times and user interactions

## 🤝 Contributing

### For Team Leads
1. **Assign Ownership**: Designate team members responsible for your service category
2. **Review Process**: Establish internal review process for content updates
3. **Quality Assurance**: Ensure adherence to design standards and testing requirements

### For Developers
1. **Follow Standards**: Adhere to the design and coding guidelines
2. **Test Thoroughly**: Ensure all changes are properly tested
3. **Document Changes**: Update relevant documentation
4. **Collaborate**: Coordinate with other teams for cross-service issues

## 📞 Support & Contact

### Technical Issues
- **Repository**: [GitHub Issues](https://github.com/imujjwall/TeamDMS-project/issues)
- **Developer**: Ujjwal Kumar ([@imujjwall](https://github.com/imujjwall))

### Content Issues
- Contact the respective team lead for service-specific content issues
- Use internal communication channels for urgent troubleshooting updates

## 📄 License & Usage

This project is developed for **internal use only** within AWS support teams. All content, including troubleshooting guides and internal references, is proprietary and confidential.

---

**Version**: 2.1.0  
**Last Updated**: January 2026  
**Maintained by**: AWS Support Teams