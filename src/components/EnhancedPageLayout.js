import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Node from './Node';
import SearchBox from './SearchBox';

const EnhancedPageLayout = ({ 
  title, 
  subtitle, 
  data, 
  headerProps = {},
  backLink = "/" 
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState(data || []);
  const [allExpanded, setAllExpanded] = useState(false);

  // Update filteredData when data prop changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data);
    }
  }, [data]);

  const getSearchTerm = useCallback(() => {
    const searchInput = document.querySelector('.search-input');
    return searchInput ? searchInput.value : '';
  }, []);

  const highlightSearchTerm = useCallback((content, term) => {
    if (!term) return content;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return content.replace(regex, '<span class="highlight">$1</span>');
  }, []);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
    
    if (results.length === 0) {
      setFilteredData(data || []);
    } else {
      const filterNodes = (nodes) => {
        if (!Array.isArray(nodes)) return [];
        return nodes.map(node => {
          const hasMatch = results.some(result => result.id === node.id);
          const filteredChildren = node.children ? filterNodes(node.children) : [];
          const hasChildMatch = filteredChildren.length > 0;
          
          if (hasMatch || hasChildMatch) {
            return {
              ...node,
              children: filteredChildren,
              content: hasMatch && node.content ? 
                highlightSearchTerm(node.content, getSearchTerm()) : 
                node.content
            };
          }
          return null;
        }).filter(Boolean);
      };
      
      setFilteredData(filterNodes(data));
    }
  }, [data, highlightSearchTerm, getSearchTerm]);

  const handleExpandNodes = useCallback((nodeIds) => {
    setTimeout(() => {
      nodeIds.forEach(nodeId => {
        const element = document.getElementById(nodeId);
        if (element) {
          const toggleButton = element.querySelector('.toggle');
          if (toggleButton && toggleButton.getAttribute('aria-expanded') === 'false') {
            toggleButton.click();
          }
        }
      });
    }, 100);
  }, []);

  const handleScrollToMatch = useCallback((nodeId) => {
    setTimeout(() => {
      const element = document.getElementById(nodeId);
      if (element) {
        element.classList.add('search-highlight');
        
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        
        setTimeout(() => {
          element.classList.remove('search-highlight');
        }, 3000);
      }
    }, 200);
  }, []);

  const toggleAllNodes = useCallback(() => {
    const allToggleButtons = document.querySelectorAll('.toggle');
    const shouldExpand = !allExpanded;
    
    allToggleButtons.forEach(button => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (shouldExpand && !isExpanded) {
        button.click();
      } else if (!shouldExpand && isExpanded) {
        button.click();
      }
    });
    
    setAllExpanded(shouldExpand);
  }, [allExpanded]);

  // Update filtered data when data prop changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="page-content">
      <Header 
        title={headerProps.title || title}
        subtitle={headerProps.subtitle || subtitle}
        logoUrl={headerProps.logoUrl || "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"}
        logoAlt={headerProps.logoAlt || "AWS Services"}
        {...headerProps}
      />
      
      <SearchBox 
        data={data} 
        onSearchResults={handleSearchResults}
        onExpandNodes={handleExpandNodes}
        onScrollToMatch={handleScrollToMatch}
      />
      
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to={backLink} className="back-button">
            ← Back to {backLink === '/dms' ? 'DMS Categories' : 'Service Categories'}
          </Link>
          <button 
            className="elegant-expand-btn"
            onClick={toggleAllNodes}
            title={allExpanded ? "Collapse all sections" : "Expand all sections"}
          >
            <span className="expand-icon">
              {allExpanded ? '📁' : '📂'}
            </span>
            <span className="expand-text">
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </span>
          </button>
        </div>
        
        <div className="page-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          {searchResults.length > 0 && (
            <div className="search-status">
              🔍 Showing {searchResults.length} matching result{searchResults.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        
        <div className="mindmap">
          {filteredData && Array.isArray(filteredData) ? filteredData.map((node, index) => (
            <Node 
              key={node.id} 
              node={node} 
              index={index}
            />
          )) : (
            <div className="no-data">
              <p>No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPageLayout;