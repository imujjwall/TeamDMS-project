import { useState, useEffect, useCallback } from 'react';
import { CONSTANTS } from '../config/constants';

const SearchBox = ({ data, onSearchResults, onExpandNodes, onScrollToMatch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const flattenData = useCallback((nodes, path = []) => {
    let flattened = [];
    
    nodes.forEach(node => {
      const currentPath = [...path, node.title];
      
      flattened.push({
        id: node.id,
        title: node.title,
        content: node.content || '',
        path: currentPath.join(' > '),
        pathArray: currentPath
      });
      
      if (node.children) {
        flattened = [...flattened, ...flattenData(node.children, currentPath)];
      }
    });
    
    return flattened;
  }, []);

  const findNodeIdByPath = useCallback((nodes, pathArray, currentPath = []) => {
    for (const node of nodes) {
      const newPath = [...currentPath, node.title];
      
      if (pathArray.length === newPath.length && 
          pathArray.every((segment, index) => segment === newPath[index])) {
        return node.id;
      }
      
      if (node.children && pathArray.length > newPath.length) {
        const result = findNodeIdByPath(node.children, pathArray, newPath);
        if (result) return result;
      }
    }
    return null;
  }, []);

  const searchInContent = useCallback((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      onSearchResults([]);
      return;
    }

    const flatData = flattenData(data);
    const results = flatData.filter(item => {
      const searchText = `${item.title} ${item.content}`.toLowerCase();
      return searchText.includes(term.toLowerCase());
    });

    setSearchResults(results);
    onSearchResults(results);
    
    if (results.length > 0) {
      const nodeIdsToExpand = new Set();
      results.forEach(result => {
        result.pathArray.forEach((_, index) => {
          if (index < result.pathArray.length - 1) {
            const pathSegment = result.pathArray.slice(0, index + 1);
            const nodeId = findNodeIdByPath(data, pathSegment);
            if (nodeId) {
              nodeIdsToExpand.add(nodeId);
            }
          }
        });
        nodeIdsToExpand.add(result.id);
      });
      
      onExpandNodes(Array.from(nodeIdsToExpand));
    }
  }, [data, onSearchResults, onExpandNodes, flattenData, findNodeIdByPath]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchInContent(searchTerm);
    }, CONSTANTS.SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchInContent]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      const firstMatch = searchResults[0];
      onScrollToMatch(firstMatch.id);
    }
  }, [searchResults, onScrollToMatch]);

  const handleResultClick = useCallback((resultId) => {
    onScrollToMatch(resultId);
  }, [onScrollToMatch]);

  const handleExternalSearch = useCallback((platform, query) => {
    const searchQuery = query || searchTerm || 'AWS serverless troubleshooting';
    let url = '';
    
    switch (platform) {
      case 'repost':
        url = `${CONSTANTS.EXTERNAL_SEARCH.REPOST}search/content?globalSearch=${encodeURIComponent(searchQuery).replace(/%20/g, '+')}`;
        break;
      case 'guide':
        url = `${CONSTANTS.EXTERNAL_SEARCH.AWS_GUIDE}search/content?globalSearch=${encodeURIComponent(searchQuery).replace(/%20/g, '+')}`;
        break;
      case 'google':
        url = `${CONSTANTS.EXTERNAL_SEARCH.GOOGLE}${encodeURIComponent(searchQuery).replace(/%20/g, '+')}+AWS`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  }, [searchTerm]);

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search troubleshooting guides... (Press Enter to jump to first result)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
            {searchResults.length > 0 && <span className="search-hint"> (Press Enter or click to jump to result)</span>}
          </div>
          
          <div className="search-results-list">
            {searchResults.slice(0, 5).map((result, index) => (
              <div 
                key={result.id} 
                className="search-result-item"
                onClick={() => handleResultClick(result.id)}
              >
                <div className="search-result-title">
                  {index + 1}. {result.title}
                </div>
                <div className="search-result-path">
                  📍 {result.path}
                </div>
              </div>
            ))}
            {searchResults.length > 5 && (
              <div className="search-results-more">
                ... and {searchResults.length - 5} more results
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="external-search">
        <button 
          className="external-search-btn"
          onClick={() => handleExternalSearch('repost')}
          title="Search AWS re:Post community for solutions"
        >
          🌐 Search re:Post
        </button>
        <button 
          className="external-search-btn"
          onClick={() => handleExternalSearch('guide')}
          title="Search guide.aws.dev for AWS guides"
        >
          📚 Search guide.aws.dev
        </button>
        <button 
          className="external-search-btn"
          onClick={() => handleExternalSearch('google')}
          title="Search Google for AWS solutions"
        >
          🔍 Google Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;