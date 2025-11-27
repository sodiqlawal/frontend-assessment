import { render, screen, waitFor } from '@testing-library/react';
import Modal from '@/components/ui/Modal';

// Mock portal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((children) => children),
}));

const mockController = {
  isOpen: true,
  open: jest.fn(),
  close: jest.fn(),
  toggle: jest.fn(),
  data: null,
};

const defaultProps = {
  controller: mockController,
  children: <div data-testid='modal-content'>Modal Content</div>,
  title: 'Test Modal',
};

const setUpModal = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  return render(<Modal {...props} />);
};

describe('Modal component', () => {
  it('should match snapshot', () => {
    const { asFragment } = setUpModal();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render modal content and title when open', async () => {
    setUpModal();
    await waitFor(() => {
      expect(screen.getByTestId('modal-content')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  it('should hide content when closed', async () => {
    const { container } = setUpModal({
      controller: { ...mockController, isOpen: false },
    });

    await waitFor(() => {
      const overlay = container.querySelector('.fixed');
      expect(overlay).toHaveClass('invisible', 'opacity-0');
    });
  });

  it('should apply visible classes when open', async () => {
    const { container } = setUpModal({
      controller: { ...mockController, isOpen: true },
    });

    await waitFor(() => {
      const overlay = container.querySelector('.fixed');
      expect(overlay).toHaveClass('visible', 'opacity-100');
    });
  });

  it('should apply custom className to modal content', async () => {
    const { container } = setUpModal({
      controller: { ...mockController, isOpen: true },
      className: 'custom-modal-class',
    });

    await waitFor(() => {
      const contentWrapper = container.querySelector('.bg-white');
      expect(contentWrapper).toHaveClass('custom-modal-class');
    });
  });

  it('should render without title when title is empty', async () => {
    setUpModal({ controller: { ...mockController, isOpen: true }, title: '' });

    await waitFor(() => {
      const titleElement = screen.queryByRole('heading', { level: 1 });
      expect(titleElement).toBeNull();
      expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    });
  });
});
