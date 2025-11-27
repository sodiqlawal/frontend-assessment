import { cn } from '@/utils';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  isPrimary?: boolean;
  isOutlined?: boolean;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  title,
  isPrimary,
  isOutlined,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'py-2 px-4 text-sm leading-[1.43] rounded-[8px] font-medium cursor-pointer',
        {
          'bg-blue-500 text-white': isPrimary,
          'bg-white text-dark-600 border border-gray-500 shadow-btn': isOutlined,
          'pointer-events-none opacity-[0.5]': props.disabled,
        },
        className
      )}
      {...props}
    >
      {title}
    </button>
  );
};
export default Button;
