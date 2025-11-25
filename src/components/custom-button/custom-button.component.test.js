import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomButton from './custom-button.component';

describe('CustomButton Component', () => {
  it('should render without crashing', () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should display children content', () => {
    render(<CustomButton>Test Button</CustomButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should pass through additional props', () => {
    render(<CustomButton type="submit">Submit</CustomButton>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render with custom className', () => {
    render(<CustomButton className="custom-class">Button</CustomButton>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('custom-class');
  });
});
