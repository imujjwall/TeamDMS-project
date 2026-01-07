import { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EnhancedPageLayout from './EnhancedPageLayout';
import { SERVICES } from '../config/services';
import { CONSTANTS } from '../config/constants';

// Dynamic data imports - this will be populated as we migrate services
const DATA_IMPORTS = {
  svlsTroubleshootingData: () => import('../data/svlsTroubleshootingData'),
  elbTroubleshootingData: () => import('../data/elbTroubleshootingData'),
  dmitroubleshootingdata: () => import('../data/dmitroubleshootingdata')
};

/**
 * Generic Service Page Factory Component
 * 
 * This component dynamically renders service pages based on the route
 * and service configuration, eliminating the need for individual page files.
 * 
 * Usage:
 * - Add service config to src/config/services.js
 * - Add data import to DATA_IMPORTS above
 * - Route will automatically work
 * 
 * @param {string} serviceId - Service identifier from route or props
 */
const ServicePageFactory = ({ serviceId: propServiceId }) => {
  const { serviceId: paramServiceId } = useParams();
  const location = useLocation();
  
  // Determine service ID from props, params, or location
  const serviceId = propServiceId || paramServiceId || location.pathname.slice(1);
  
  // Get service configuration
  const serviceConfig = useMemo(() => {
    const config = SERVICES[serviceId];
    if (!config) {
      console.warn(`Service configuration not found for: ${serviceId}`);
      return null;
    }
    return config;
  }, [serviceId]);
  
  // Dynamic data loading
  const { data, loading, error } = useDynamicData(serviceConfig?.dataFile);
  
  // Loading state
  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div>Loading {serviceConfig?.name || serviceId}...</div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="error-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--content-problem, #dc3545)'
      }}>
        <h2>Error Loading Service</h2>
        <p>Failed to load data for {serviceId}</p>
        <p style={{ fontSize: '0.9em', opacity: 0.7 }}>{error.message}</p>
      </div>
    );
  }
  
  // Service not found
  if (!serviceConfig) {
    return (
      <div className="not-found-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <h2>Service Not Found</h2>
        <p>No configuration found for service: {serviceId}</p>
        <p style={{ fontSize: '0.9em', opacity: 0.7 }}>
          Add configuration to src/config/services.js
        </p>
      </div>
    );
  }
  
  // No data available
  if (!data) {
    return (
      <div className="no-data-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <h2>No Data Available</h2>
        <p>Data file not found for {serviceConfig.name}</p>
        <p style={{ fontSize: '0.9em', opacity: 0.7 }}>
          Expected: src/data/{serviceConfig.dataFile}.js
        </p>
      </div>
    );
  }
  
  return (
    <EnhancedPageLayout
      title=""
      subtitle=""
      data={data}
      backLink={serviceConfig.backLink}
      headerProps={{
        title: serviceConfig.name,
        subtitle: serviceConfig.description,
        logoUrl: CONSTANTS.AWS_LOGO_URL,
        logoAlt: serviceConfig.logoAlt
      }}
    />
  );
};

/**
 * Custom hook for dynamic data loading
 * 
 * @param {string} dataFile - Name of the data file to import
 * @returns {Object} { data, loading, error }
 */
function useDynamicData(dataFile) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    if (!dataFile) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    
    const importFunction = DATA_IMPORTS[dataFile];
    if (!importFunction) {
      setState({ 
        data: null, 
        loading: false, 
        error: new Error(`Data import not configured for: ${dataFile}`) 
      });
      return;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    importFunction()
      .then(module => {
        // Handle different export patterns
        let data = null;
        
        // Try ES6 named exports first
        if (module[dataFile]) {
          data = module[dataFile];
        } else if (module.default) {
          // Try default export
          data = module.default;
        } else {
          // Fallback to first array found in exports
          const exportValues = Object.values(module);
          data = exportValues.find(value => Array.isArray(value));
        }
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error(`Data is not an array. Expected array, got: ${typeof data}`);
        }
        
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        console.error(`Failed to load data file: ${dataFile}`, error);
        setState({ data: null, loading: false, error });
      });
  }, [dataFile]);
  
  return state;
}

export default ServicePageFactory;