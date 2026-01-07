// Data validation utilities for troubleshooting data

/**
 * Expected data schema for troubleshooting data
 */
export const DATA_SCHEMA = {
  type: 'array',
  items: {
    type: 'object',
    required: ['id', 'title'],
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string', optional: true },
      children: {
        type: 'array',
        items: { $ref: '#' }, // Recursive reference
        optional: true
      }
    }
  }
};

/**
 * Validate a single node
 * @param {Object} node - Node to validate
 * @param {string} path - Path for error reporting
 * @returns {Array} Array of validation errors
 */
export const validateNode = (node, path = 'root') => {
  const errors = [];
  
  // Check required fields
  if (!node.id) {
    errors.push(`${path}: Missing required field 'id'`);
  }
  
  if (!node.title) {
    errors.push(`${path}: Missing required field 'title'`);
  }
  
  // Check field types
  if (node.id && typeof node.id !== 'string') {
    errors.push(`${path}: Field 'id' must be a string`);
  }
  
  if (node.title && typeof node.title !== 'string') {
    errors.push(`${path}: Field 'title' must be a string`);
  }
  
  if (node.content && typeof node.content !== 'string') {
    errors.push(`${path}: Field 'content' must be a string`);
  }
  
  if (node.children && !Array.isArray(node.children)) {
    errors.push(`${path}: Field 'children' must be an array`);
  }
  
  // Validate children recursively
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child, index) => {
      const childPath = `${path}.children[${index}]`;
      errors.push(...validateNode(child, childPath));
    });
  }
  
  return errors;
};

/**
 * Validate entire troubleshooting data structure
 * @param {Array} data - Data to validate
 * @param {string} dataFileName - Name of data file for error reporting
 * @returns {Object} Validation result with errors and warnings
 */
export const validateTroubleshootingData = (data, dataFileName = 'unknown') => {
  const result = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      totalNodes: 0,
      maxDepth: 0,
      nodesWithContent: 0,
      nodesWithChildren: 0
    }
  };
  
  // Check if data is an array
  if (!Array.isArray(data)) {
    result.errors.push(`${dataFileName}: Data must be an array`);
    result.valid = false;
    return result;
  }
  
  // Check if data is empty
  if (data.length === 0) {
    result.warnings.push(`${dataFileName}: Data array is empty`);
  }
  
  // Validate each root node
  data.forEach((node, index) => {
    const nodePath = `${dataFileName}[${index}]`;
    result.errors.push(...validateNode(node, nodePath));
  });
  
  // Calculate statistics
  const calculateStats = (nodes, depth = 0) => {
    nodes.forEach(node => {
      result.stats.totalNodes++;
      result.stats.maxDepth = Math.max(result.stats.maxDepth, depth);
      
      if (node.content) {
        result.stats.nodesWithContent++;
      }
      
      if (node.children && node.children.length > 0) {
        result.stats.nodesWithChildren++;
        calculateStats(node.children, depth + 1);
      }
    });
  };
  
  if (Array.isArray(data)) {
    calculateStats(data);
  }
  
  // Set valid flag
  result.valid = result.errors.length === 0;
  
  return result;
};

/**
 * Check for duplicate IDs in data
 * @param {Array} data - Data to check
 * @returns {Array} Array of duplicate ID errors
 */
export const checkDuplicateIds = (data) => {
  const ids = new Set();
  const duplicates = [];
  
  const checkNode = (node, path = 'root') => {
    if (ids.has(node.id)) {
      duplicates.push(`Duplicate ID '${node.id}' found at ${path}`);
    } else {
      ids.add(node.id);
    }
    
    if (node.children) {
      node.children.forEach((child, index) => {
        checkNode(child, `${path}.children[${index}]`);
      });
    }
  };
  
  if (Array.isArray(data)) {
    data.forEach((node, index) => {
      checkNode(node, `root[${index}]`);
    });
  }
  
  return duplicates;
};

/**
 * Validate HTML content in nodes
 * @param {Array} data - Data to validate
 * @returns {Array} Array of HTML validation warnings
 */
export const validateHtmlContent = (data) => {
  const warnings = [];
  
  const checkNode = (node, path = 'root') => {
    if (node.content) {
      // Check for common HTML issues
      if (node.content.includes('<script')) {
        warnings.push(`${path}: Content contains <script> tag - potential security risk`);
      }
      
      if (node.content.includes('javascript:')) {
        warnings.push(`${path}: Content contains javascript: protocol - potential security risk`);
      }
      
      // Check for unclosed tags (basic check)
      const openTags = (node.content.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (node.content.match(/<\/[^>]*>/g) || []).length;
      const selfClosingTags = (node.content.match(/<[^>]*\/>/g) || []).length;
      
      if (openTags !== closeTags + selfClosingTags) {
        warnings.push(`${path}: Possible unclosed HTML tags in content`);
      }
    }
    
    if (node.children) {
      node.children.forEach((child, index) => {
        checkNode(child, `${path}.children[${index}]`);
      });
    }
  };
  
  if (Array.isArray(data)) {
    data.forEach((node, index) => {
      checkNode(node, `root[${index}]`);
    });
  }
  
  return warnings;
};

/**
 * Generate validation report for data file
 * @param {Array} data - Data to validate
 * @param {string} dataFileName - Name of data file
 * @returns {Object} Complete validation report
 */
export const generateValidationReport = (data, dataFileName) => {
  const basicValidation = validateTroubleshootingData(data, dataFileName);
  const duplicateIds = checkDuplicateIds(data);
  const htmlWarnings = validateHtmlContent(data);
  
  return {
    ...basicValidation,
    duplicateIds,
    htmlWarnings,
    summary: {
      totalErrors: basicValidation.errors.length + duplicateIds.length,
      totalWarnings: basicValidation.warnings.length + htmlWarnings.length,
      isValid: basicValidation.valid && duplicateIds.length === 0
    }
  };
};