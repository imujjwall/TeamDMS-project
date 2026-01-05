import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application homepage', () => {
  render(<App />);
  const headerElement = screen.getByText(/AWS Troubleshooting Hub/i);
  expect(headerElement).toBeInTheDocument();
});
