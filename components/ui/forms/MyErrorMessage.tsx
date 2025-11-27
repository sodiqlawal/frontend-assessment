import { FC } from 'react';
import { ErrorMessage } from 'formik';

const MyErrorMessage: FC<{ name: string }> = ({ name }) => (
    <ErrorMessage name={name}>
        {(msg) => <div className="text-xs text-start font-semibold text-danger-500 mt-1">{msg}</div>}
    </ErrorMessage>
);

export default MyErrorMessage;
