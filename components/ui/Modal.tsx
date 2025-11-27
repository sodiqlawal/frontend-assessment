import { ReactNode, useEffect, useState } from 'react';
import { Controller } from '@/hooks/useController';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';

interface ModalProps<T> {
  controller: Controller<T>;
  children: ReactNode;
  className?: string;
  title?: string;
}
function Modal<T>({
  controller,
  children,
  className,
  title,
}: ModalProps<T>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <div
      className={cn(
        'fixed z-[1000] top-0 duration-300 bottom-0 right-0 left-0 flex justify-center items-center bg-b-alpha-3',
        {
          'visible opacity-100': controller.isOpen,
          'invisible opacity-0': !controller.isOpen,
        }
      )}
    >
      <div
        className={cn(
          'bg-white z-[50] p-4 sm:p-6 w-full max-w-[90%] md:max-w-[679px] min-h-[441px] overflow-auto rounded-[8px] max-h-[99%] shadow-box',
          className
        )}
      >
        {!!title && <h1 className='text-[26px] sm:text-[36px] mb-8 font-medium leading-[1.11] text-dark-500'>{title}</h1>}
        {children}
      </div>
    </div>,
    document.body // This renders the modal directly into the body element, outside the parent component
  );
}
export default Modal;
