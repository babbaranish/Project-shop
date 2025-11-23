import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from './form-input.component';

describe('FormInput Component', () => {
  it('should render without crashing', () => {
    render(<FormInput handleChange={() => {}} value="" />);
  });

  it('should render label when provided', () => {
    render(
      <FormInput
        handleChange={() => {}}
        label="Email"
        value=""
      />
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should not render label when not provided', () => {
    const { container } = render(
      <FormInput handleChange={() => {}} value="" />
    );
    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  it('should call handleChange when input value changes', () => {
    const mockHandleChange = jest.fn();
    render(
      <FormInput
        handleChange={mockHandleChange}
        value=""
        type="text"
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should apply shrink class to label when input has value', () => {
    const { container } = render(
      <FormInput
        handleChange={() => {}}
        label="Name"
        value="John Doe"
      />
    );

    const label = screen.getByText('Name');
    expect(label).toHaveClass('shrink');
  });

  it('should not apply shrink class to label when input is empty', () => {
    const { container } = render(
      <FormInput
        handleChange={() => {}}
        label="Name"
        value=""
      />
    );

    const label = screen.getByText('Name');
    expect(label).not.toHaveClass('shrink');
  });

  it('should pass through additional input props', () => {
    render(
      <FormInput
        handleChange={() => {}}
        value=""
        type="email"
        placeholder="Enter email"
        required
      />
    );

    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('required');
  });

  it('should render with correct input value', () => {
    render(
      <FormInput
        handleChange={() => {}}
        value="test value"
        type="text"
      />
    );

    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });
});
