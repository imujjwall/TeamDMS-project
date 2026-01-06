import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Default/fallback links that are always important
const DEFAULT_LINKS = [
  { path: '/', title: 'Home', priority: 10 },
  { path: '/dms', title: 'DMS', priority: 9 },
  { path: '/svls', title: 'SVLS', priority: 8 },
  { path: '/networking', title: 'Networking', priority: 7 }
];

// All available pages with their display names
const PAGE_MAPPING = {
  '/': 'Home',
  '/dms': 'DMS',
  '/database': 'Database',
  '/analytics': 'Analytics',
  '/bigdata': 'Big Data',
  '/deployment': 'Deployment',
  '/scd': 'SCD',
  '/security': 'Security',
  '/operations': 'Operations',
  '/windows': 'Windows',
  '/linux': 'Linux',
  '/networking': 'Networking',
  '/netmns': 'NetMnS',
  '/svls': 'SVLS',
  '/dmi': 'DMI',
  '/elb': 'ELB',
  '/coming-soon': 'Coming Soon'
};

const STORAGE_KEY = 'aws-troubleshooting-hub-page-visits';
const MAX_QUICK_LINKS = 4;

export const usePageTracking = () => {
  const [quickLinks, setQuickLinks] = useState(DEFAULT_LINKS.slice(0, MAX_QUICK_LINKS));
  const location = useLocation();

  // Load visit data from localStorage
  const loadVisitData = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load page visit data:', error);
      return {};
    }
  }, []);

  // Save visit data to localStorage
  const saveVisitData = useCallback((data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save page visit data:', error);
    }
  }, []);

  // Track page visit
  const trackPageVisit = useCallback((path) => {
    if (!PAGE_MAPPING[path]) return; // Only track known pages
    
    const visitData = loadVisitData();
    const now = Date.now();
    
    if (!visitData[path]) {
      visitData[path] = {
        count: 0,
        lastVisit: now,
        firstVisit: now,
        title: PAGE_MAPPING[path]
      };
    }
    
    visitData[path].count += 1;
    visitData[path].lastVisit = now;
    
    saveVisitData(visitData);
    return visitData;
  }, [loadVisitData, saveVisitData]);

  // Calculate smart quick links using hybrid approach
  const calculateQuickLinks = useCallback(() => {
    const visitData = loadVisitData();
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const ONE_WEEK = 7 * ONE_DAY;
    
    // Create scored pages array
    const scoredPages = [];
    
    // Add visited pages with dynamic scoring
    Object.entries(visitData).forEach(([path, data]) => {
      const timeSinceLastVisit = now - data.lastVisit;
      const isRecent = timeSinceLastVisit < ONE_WEEK;
      
      // Calculate score based on:
      // - Visit frequency (count)
      // - Recency (bonus for recent visits)
      // - Time decay (older visits matter less)
      let score = data.count;
      
      if (isRecent) {
        score += 5; // Recent visit bonus
      }
      
      if (timeSinceLastVisit < ONE_DAY) {
        score += 3; // Today visit bonus
      }
      
      // Time decay factor
      const weeksSinceLastVisit = timeSinceLastVisit / ONE_WEEK;
      score = score * Math.exp(-weeksSinceLastVisit * 0.1);
      
      scoredPages.push({
        path,
        title: data.title,
        score,
        count: data.count,
        lastVisit: data.lastVisit
      });
    });
    
    // Add default pages with their priority scores (but lower if not visited)
    DEFAULT_LINKS.forEach(defaultLink => {
      const existingPage = scoredPages.find(p => p.path === defaultLink.path);
      if (!existingPage) {
        scoredPages.push({
          path: defaultLink.path,
          title: defaultLink.title,
          score: defaultLink.priority * 0.5, // Lower score for unvisited defaults
          count: 0,
          lastVisit: 0
        });
      }
    });
    
    // Sort by score (highest first) and take top links
    const topLinks = scoredPages
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_QUICK_LINKS)
      .map(({ path, title }) => ({ path, title }));
    
    return topLinks;
  }, [loadVisitData]);

  // Track current page visit and update quick links
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Track the visit
    trackPageVisit(currentPath);
    
    // Recalculate quick links
    const newQuickLinks = calculateQuickLinks();
    setQuickLinks(newQuickLinks);
  }, [location.pathname, trackPageVisit, calculateQuickLinks]);

  // Initialize quick links on component mount
  useEffect(() => {
    const initialQuickLinks = calculateQuickLinks();
    setQuickLinks(initialQuickLinks);
  }, [calculateQuickLinks]);

  return quickLinks;
};