// Route configuration for the application
import { SERVICES } from './services';

// Dynamic service routes generated from services config
export const SERVICE_ROUTES = Object.keys(SERVICES).map(serviceKey => ({
  path: `/${serviceKey}`,
  serviceId: serviceKey,
  type: 'service'
}));

// Static routes that don't follow the service pattern
export const STATIC_ROUTES = [
  {
    path: '/',
    component: 'HomePage',
    type: 'static'
  },
  {
    path: '/dms',
    component: 'DMSPage', 
    type: 'static'
  },
  {
    path: '/database',
    component: 'DatabasePage',
    type: 'static'
  },
  {
    path: '/analytics', 
    component: 'AnalyticsPage',
    type: 'static'
  },
  {
    path: '/bigdata',
    component: 'BigDataPage', 
    type: 'static'
  },
  {
    path: '/deployment',
    component: 'DeploymentPage',
    type: 'static'
  },
  {
    path: '/scd',
    component: 'SCDPage',
    type: 'static'
  },
  {
    path: '/security',
    component: 'SecurityPage',
    type: 'static'
  },
  {
    path: '/operations',
    component: 'UnifiedOperationsPage',
    type: 'static'
  },
  {
    path: '/windows',
    component: 'WindowsPage',
    type: 'static'
  },
  {
    path: '/linux',
    component: 'LinuxPage',
    type: 'static'
  },
  {
    path: '/networking',
    component: 'NetworkingPage',
    type: 'static'
  },
  {
    path: '/netmns',
    component: 'NetMnSPage',
    type: 'static'
  },
  {
    path: '/coming-soon',
    component: 'ComingSoonPage',
    type: 'static'
  }
];

// Combined routes for easy consumption
export const ALL_ROUTES = [...STATIC_ROUTES, ...SERVICE_ROUTES];

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return ALL_ROUTES.find(route => route.path === path);
};

// Helper function to check if route is a service route
export const isServiceRoute = (path) => {
  return SERVICE_ROUTES.some(route => route.path === path);
};