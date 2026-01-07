// Theme configuration system
import { SERVICE_COLORS } from './services';

// Base theme configuration
export const BASE_THEME = {
  // Service colors (can be overridden)
  services: SERVICE_COLORS,
  
  // Content type colors
  content: {
    problem: '#dc3545',
    solution: '#28a745', 
    info: '#17a2b8',
    warning: '#ffc107',
    guidance: '#6c757d'
  },
  
  // UI colors
  ui: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40'
  },
  
  // Layout colors
  layout: {
    background: '#ffffff',
    surface: '#f8f9fa',
    border: '#dee2e6',
    text: '#212529',
    textMuted: '#6c757d'
  }
};

// Icon mapping for services and content types
export const ICON_MAP = {
  // Service icons
  services: {
    lambda: '⚡',
    apigateway: '🌐',
    dms: '🔄',
    monitoring: '📊',
    solutions: '✅',
    elb: '⚖️',
    svls: '🚀',
    dmi: '📱',
    database: '🗄️',
    analytics: '📈',
    security: '🔒',
    operations: '🔧',
    networking: '🌐',
    storage: '💾',
    compute: '⚡'
  },
  
  // Content type icons
  content: {
    problem: '❌',
    solution: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    guidance: '💡',
    playbook: '📖',
    note: '💡',
    checklist: '☑️',
    bestpractices: '⭐'
  },
  
  // UI icons
  ui: {
    expand: '+',
    collapse: '-',
    search: '🔍',
    home: '🏠',
    back: '←',
    external: '🔗'
  }
};

// CSS custom properties generator
export const generateCSSVariables = (theme = BASE_THEME) => {
  const variables = {};
  
  // Service colors
  Object.entries(theme.services).forEach(([service, color]) => {
    variables[`--service-${service}`] = color;
  });
  
  // Content colors
  Object.entries(theme.content).forEach(([type, color]) => {
    variables[`--content-${type}`] = color;
  });
  
  // UI colors
  Object.entries(theme.ui).forEach(([type, color]) => {
    variables[`--ui-${type}`] = color;
  });
  
  // Layout colors
  Object.entries(theme.layout).forEach(([type, color]) => {
    variables[`--layout-${type}`] = color;
  });
  
  return variables;
};

// Apply theme to document root
export const applyTheme = (theme = BASE_THEME) => {
  const variables = generateCSSVariables(theme);
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Get icon for service or content type
export const getIcon = (type, category = 'services') => {
  return ICON_MAP[category]?.[type] || '';
};

// Get color for service or content type
export const getColor = (type, category = 'services', theme = BASE_THEME) => {
  return theme[category]?.[type] || theme.ui.secondary;
};

// Theme presets (for future theme switching)
export const THEME_PRESETS = {
  default: BASE_THEME,
  
  dark: {
    ...BASE_THEME,
    layout: {
      background: '#1a1a1a',
      surface: '#2d2d2d',
      border: '#404040',
      text: '#ffffff',
      textMuted: '#cccccc'
    }
  },
  
  highContrast: {
    ...BASE_THEME,
    layout: {
      background: '#000000',
      surface: '#ffffff',
      border: '#000000',
      text: '#000000',
      textMuted: '#666666'
    }
  }
};