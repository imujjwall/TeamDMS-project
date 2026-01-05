import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DMSPage from './pages/DMSPage';
import ComingSoonPage from './pages/ComingSoonPage';

import SVLSPage from './pages/SVLSPage';
import DMIPage from './pages/DMIPage';
import ELBPage from './pages/ELBPage';
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

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="emoji-decoration">🔄</div>
        <div className="emoji-decoration">🗄️</div>
        <div className="emoji-decoration">🔧</div>
        <div className="emoji-decoration">⚙️</div>

        <div className="container">
          <NavigationBar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="/dms" element={<DMSPage />} />
              
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/bigdata" element={<BigDataPage />} />
              <Route path="/deployment" element={<DeploymentPage />} />
              <Route path="/scd" element={<SCDPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/operations" element={<UnifiedOperationsPage />} />
              <Route path="/windows" element={<WindowsPage />} />
              <Route path="/linux" element={<LinuxPage />} />
              
              <Route path="/networking" element={<NetworkingPage />} />
              <Route path="/netmns" element={<NetMnSPage />} />
              
              <Route path="/coming-soon" element={<ComingSoonPage />} />
              
              <Route path="/svls" element={<SVLSPage />} />
              <Route path="/dmi" element={<DMIPage />} />
              <Route path="/elb" element={<ELBPage />} />
              
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
