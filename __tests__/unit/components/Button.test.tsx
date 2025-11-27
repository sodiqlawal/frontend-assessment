import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';
import { jest } from '@jest/globals';

const defaultProps = {
  onClick: jest.fn(),
  title: 'Submit',
  isPrimary: false,
  isOutlined: false,
};

const setupButton = (props = defaultProps) => render(<Button {...props} />);

describe('The <Button /> component', () => {
  it('should match snapshot', () => {
    const { asFragment } = setupButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the button and content', () => {
    setupButton();
    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeInTheDocument();
  });

  it('should call the click handler', () => {
    const mockOnClick = jest.fn();
    const customProps = { ...defaultProps, onClick: mockOnClick };

    setupButton(customProps);
    const button = screen.getByRole('button', { name: /Submit/i });

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const props = { ...defaultProps, disabled: true };
    setupButton(props);
    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute(
      'class',
      expect.stringContaining('pointer-events-none')
    );
  });

  it('should apply primary variant styling', () => {
    const props = { ...defaultProps, isPrimary: true };
    setupButton(props);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-500', 'text-white');
  });

  it('should apply outlined variant styling', () => {
    const props = { ...defaultProps, isOutlined: true };
    setupButton(props);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-white',
      'text-dark-600',
      'border',
      'shadow-btn'
    );
  });

  it('should apply custom className', () => {
    const props = { ...defaultProps, className: 'custom-class w-full' };
    setupButton(props);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class', 'w-full');
  });

  it('should render correct title text', () => {
    setupButton();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submit');
  });

  it('should have proper button role and accessible name', () => {
    setupButton();
    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeVisible();
    expect(button).toHaveAccessibleName('Submit');
  });
});
