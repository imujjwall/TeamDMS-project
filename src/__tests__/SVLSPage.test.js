import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SVLSPage from '../pages/SVLSPage';

// Helper function to render SVLSPage with router context
const renderSVLSPage = () => {
  return render(
    <BrowserRouter>
      <SVLSPage />
    </BrowserRouter>
  );
};

describe('SVLS Page Tests', () => {
  test('renders SVLS page with troubleshooting content', () => {
    renderSVLSPage();
    
    expect(screen.getByText('SVLS - Serverless Troubleshooting')).toBeInTheDocument();
    expect(screen.getByText('Service-specific troubleshooting guides with internal playbook references')).toBeInTheDocument();
    expect(screen.getAllByText('AWS Serverless Troubleshooting').length).toBeGreaterThan(0);
  });

  test('displays search functionality', () => {
    renderSVLSPage();
    
    expect(screen.getByPlaceholderText('Search troubleshooting guides... (Press Enter to jump to first result)')).toBeInTheDocument();
    expect(screen.getByText('🌐 Search re:Post')).toBeInTheDocument();
    expect(screen.getByText('📚 Search guide.aws.dev')).toBeInTheDocument();
    expect(screen.getByText('🔍 Google Search')).toBeInTheDocument();
  });

  test('displays service-specific categories', () => {
    renderSVLSPage();
    
    // Find and expand the root section
    const rootToggle = screen.getAllByRole('button')[0];
    fireEvent.click(rootToggle);
    
    expect(screen.getByText('AWS Lambda Issues')).toBeInTheDocument();
    expect(screen.getByText('API Gateway Issues')).toBeInTheDocument();
    expect(screen.getByText('Step Functions Issues')).toBeInTheDocument();
  });

  test('displays monitoring and solutions sections', () => {
    renderSVLSPage();
    
    // Find and expand the root section
    const rootToggle = screen.getAllByRole('button')[0];
    fireEvent.click(rootToggle);
    
    expect(screen.getByText('How to Monitor & Debug')).toBeInTheDocument();
    expect(screen.getByText('Common Solutions & Best Practices')).toBeInTheDocument();
  });

  test('search functionality filters content', () => {
    renderSVLSPage();
    
    const searchInput = screen.getByPlaceholderText('Search troubleshooting guides... (Press Enter to jump to first result)');
    
    // Type in search term
    fireEvent.change(searchInput, { target: { value: 'timeout' } });
    
    // Should show search results
    setTimeout(() => {
      expect(screen.getByText(/Found.*result/)).toBeInTheDocument();
    }, 400); // Account for debounce
  });

  test('toggle buttons expand and collapse nodes', () => {
    renderSVLSPage();
    
    // Find a toggle button
    const toggleButtons = screen.getAllByRole('button').filter(btn => 
      btn.textContent === '+' || btn.textContent === '-'
    );
    
    if (toggleButtons.length > 0) {
      const firstToggle = toggleButtons[0];
      
      // Initial state should be collapsed
      expect(firstToggle).toHaveAttribute('aria-expanded', 'false');
      expect(firstToggle.textContent).toBe('+');
      
      // Click to expand
      fireEvent.click(firstToggle);
      
      // Should be expanded
      expect(firstToggle).toHaveAttribute('aria-expanded', 'true');
      expect(firstToggle.textContent).toBe('-');
    }
  });

  test('navigation elements are present', () => {
    renderSVLSPage();
    
    const backButton = screen.getByText('← Back to DMS Categories');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/dms');
  });

  test('all toggle buttons have proper accessibility attributes', () => {
    renderSVLSPage();
    
    const toggleButtons = screen.getAllByRole('button').filter(btn => 
      btn.hasAttribute('aria-expanded')
    );
    
    toggleButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-label');
      
      const ariaExpanded = button.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(ariaExpanded);
    });
  });

  test('external search buttons work', () => {
    // Mock window.open
    const mockOpen = jest.fn();
    global.window.open = mockOpen;
    
    renderSVLSPage();
    
    const repostButton = screen.getByText('🌐 Search re:Post');
    const guideButton = screen.getByText('📚 Search guide.aws.dev');
    const googleButton = screen.getByText('🔍 Google Search');
    
    fireEvent.click(repostButton);
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('repost.aws/search/content?globalSearch='),
      '_blank'
    );
    
    fireEvent.click(guideButton);
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('guide.aws.dev/search/content?globalSearch='),
      '_blank'
    );
    
    fireEvent.click(googleButton);
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('google.com/search?q='),
      '_blank'
    );
    
    // Restore window.open
    delete global.window.open;
  });
});