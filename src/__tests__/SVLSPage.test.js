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
    expect(screen.getByText('Comprehensive troubleshooting guides for AWS serverless services')).toBeInTheDocument();
    expect(screen.getAllByText('AWS Serverless Troubleshooting').length).toBeGreaterThan(0);
  });

  test('displays all main service categories', () => {
    renderSVLSPage();
    
    expect(screen.getByText('AWS Lambda Troubleshooting')).toBeInTheDocument();
    expect(screen.getByText('API Gateway Troubleshooting')).toBeInTheDocument();
    expect(screen.getByText('Step Functions Troubleshooting')).toBeInTheDocument();
  });

  test('toggle buttons expand and collapse nodes', () => {
    renderSVLSPage();
    
    // Find a toggle button
    const toggleButtons = screen.getAllByRole('button');
    const firstToggle = toggleButtons[0];
    
    if (firstToggle) {
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
    
    const backButton = screen.getByText('← Back to Home');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('all toggle buttons have proper accessibility attributes', () => {
    renderSVLSPage();
    
    const toggleButtons = screen.getAllByRole('button');
    
    toggleButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-label');
      
      const ariaExpanded = button.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(ariaExpanded);
    });
  });
});