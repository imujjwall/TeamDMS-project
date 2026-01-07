import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ServicePageFactory from './components/ServicePageFactory';

// Import static pages
import HomePage from './pages/HomePage';
import DMSPage from './pages/DMSPage';
import ComingSoonPage from './pages/ComingSoonPage';
import NetworkingPage from './pages/NetworkingPage';
import NetMnSPage from './pages/NetMnSPage';
import DatabasePage from './pages/DatabasePage';
import AnalyticsPage from './pages/AnalyticsPage';
import BigDataPage from './pages/BigDataPage';
import DeploymentPage from './pages/DeploymentPage';
import SCDPage from './pages/SCDPage';
import SecurityPage from './pages/SecurityPage';
import UnifiedOperationsPage from './pages/UnifiedOperationsPage';
import WindowsPage from './pages/WindowsPage';
import LinuxPage from './pages/LinuxPage';

// Import route configuration
import { STATIC_ROUTES, SERVICE_ROUTES } from './config/routes';

function App() {
  // Component mapping for static routes
  const componentMap = {
    HomePage,
    DMSPage,
    ComingSoonPage,
    NetworkingPage,
    NetMnSPage,
    DatabasePage,
    AnalyticsPage,
    BigDataPage,
    DeploymentPage,
    SCDPage,
    SecurityPage,
    UnifiedOperationsPage,
    WindowsPage,
    LinuxPage
  };

  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="container">
          <NavigationBar />
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Static routes */}
              {STATIC_ROUTES.map(route => {
                const Component = componentMap[route.component];
                return Component ? (
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    element={<Component />} 
                  />
                ) : null;
              })}
              
              {/* Dynamic service routes */}
              {SERVICE_ROUTES.map(route => (
                <Route 
                  key={route.path} 
                  path={route.path} 
                  element={<ServicePageFactory serviceId={route.serviceId} />} 
                />
              ))}
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
