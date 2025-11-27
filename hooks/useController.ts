import { useState } from 'react';
/**
 *
 * @param initialMode The default state of the element, true means the element is open,
 * and false means it is closed by default
 */
export interface Controller<T = unknown> {
  isOpen: boolean;
  open: (val?: T) => void;
  close: () => void;
  toggle: () => void;
  data: T | null;
}
export default function useController<T>(initialMode = false): Controller<T> {
  const [isOpen, setOpen] = useState(initialMode);
  const [data, setData] = useState<T | null>(null);
  /**
   * Toggle between show and hide
   */
  const toggle = () => {
    setOpen(!isOpen);
  };
  /**
    /**
     * Show
     */
  const open = (val?: T) => {
    setOpen(true);
    setData(val!);
  };
  /**
   * Hide
   */
  const close = () => {
    setOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    toggle,
    data,
  };
}
