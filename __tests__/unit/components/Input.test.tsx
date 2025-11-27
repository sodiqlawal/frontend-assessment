import { render, screen, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import * as FormikModule from 'formik';
import Input from '@/components/ui/forms/Input';

jest.mock('formik', () => {
    const actual = jest.requireActual('formik');
    return {
        __esModule: true,
        ...actual,
        useField: jest.fn(),
    };
});

const mockedUseField = FormikModule.useField as jest.Mock;

const defaultProps = {
    name: 'email',
    label: 'Email',
};

const renderWithFormik = () =>
    render(
        <Formik initialValues={{ email: '' }} onSubmit={jest.fn()}>
            <Input {...defaultProps} />
        </Formik>
    );

const setUpInput = (
    fieldOverride: Partial<{ value: string; onChange: jest.Mock; onBlur: jest.Mock }> = {},
    metaOverride: Partial<{ error: string; touched: boolean }> = {}
) => {
    mockedUseField.mockReturnValue([
        {
            name: defaultProps.name,
            value: '',
            onChange: jest.fn(),
            onBlur: jest.fn(),
            ...fieldOverride,
        },
        {
            error: '',
            touched: false,
            ...metaOverride,
        },
    ]);

    return renderWithFormik();
};

describe('Input component', () => {
    it('renders label and input', () => {
        setUpInput();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders error style when touched and error present', () => {
        setUpInput({}, { error: 'Required', touched: true });
        const input = screen.getByLabelText(/email/i);
        expect(input).toHaveClass('border-danger-500');
    });

    it('does not render error when not touched', () => {
        setUpInput({}, { error: 'Required', touched: false });
        expect(screen.queryByText('Required')).toBeNull();
    });

    it('calls onChange and onBlur from useField', () => {
        const onChange = jest.fn();
        const onBlur = jest.fn();

        setUpInput({ onChange, onBlur });

        const input = screen.getByLabelText(/email/i);
        fireEvent.change(input, { target: { value: 'test@mail.com' } });
        fireEvent.blur(input);

        expect(onChange).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalled();
    });
});
