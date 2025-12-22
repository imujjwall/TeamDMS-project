import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

// Import page components
import HomePage from './pages/HomePage';
import SVLSPage from './pages/SVLSPage';
import DMIPage from './pages/DMIPage';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Decorative floating emojis */}
        <div className="emoji-decoration">⚡</div>
        <div className="emoji-decoration">☁️</div>
        <div className="emoji-decoration">🔧</div>
        <div className="emoji-decoration">⚙️</div>

        <div className="container">
          <Routes>
            {/* Home page with section selection */}
            <Route path="/" element={<HomePage />} />
            
            {/* SVLS page with serverless troubleshooting */}
            <Route path="/svls" element={<SVLSPage />} />
            
            {/* DMI page with current Amazon Connect content */}
            <Route path="/dmi" element={<DMIPage />} />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
