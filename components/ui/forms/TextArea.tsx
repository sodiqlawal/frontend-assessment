import { FC, TextareaHTMLAttributes } from 'react';
import MyErrorMessage from './MyErrorMessage';
import { useField } from 'formik';
import { cn } from '@/utils';

type TextAreaProps = {
  label?: string;
};

const TextArea: FC<
  TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaProps
> = ({ className, label, ...props }) => {
  const [input, meta] = useField<string>(props.name as string);

  const isError = meta?.error && meta.touched;

  return (
    <div className={cn('w-full text-dark-500', className)}>
      {!!label && (
        <label
          htmlFor={props.name}
          className='text-sm text-dark-500 font-medium leading-[1.43]'
        >
          {label}
        </label>
      )}
      <textarea
        id={props.name}
        {...props}
        {...input}
        value={input.value || ''}
        className={cn(
          'w-full rounded-[6px] border border-gray-500 bg-white outline-none py-2 px-3 mt-1 h-[141px]',
          {
            'border-danger-500': isError,
          }
        )}
      />
      {isError ? <MyErrorMessage name={props.name!} /> : null}
    </div>
  );
};

export default TextArea;
