import { render, screen, within, fireEvent } from '@testing-library/react';
import Table, { TableField, TableProps } from '@/components/ui/Table';
import Loader from '@/components/ui/Loader';

jest.mock('@/components/ui/Loader', () => () => (
    <div data-testid="loader">Loading...</div>
));

type Row = { name: string; age: number };

const fields: TableField<Row>[] = [
    { name: 'name', displayName: 'Name' },
    { name: 'age', displayName: 'Age' },
];

const builder = (field: TableField<Row>, data: Row) => data[field.name];

const tableData: Row[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
];

const renderTable = (overrideProps: Partial<TableProps<Row, Row>> = {}) =>
    render(
        <Table<Row>
            fields={fields}
            tableData={tableData}
            builder={builder}
            {...overrideProps}
        />
    );

describe('Table component', () => {
    it('renders headers and rows', () => {
        renderTable();

        const table = screen.getByRole('table');
        const headerRow = within(table).getAllByRole('row')[0];
        expect(within(headerRow).getByText('Name')).toBeInTheDocument();
        expect(within(headerRow).getByText('Age')).toBeInTheDocument();

        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('shows loader and hides table + no-data message when loading', () => {
        renderTable({ isLoading: true });

        expect(screen.getByTestId('loader')).toBeInTheDocument();

        const table = screen.getByRole('table');
        expect(table).toHaveClass('hidden');

        const noDataWrapper = screen.getByText('No records found to display').parentElement;
        expect(noDataWrapper).toHaveClass('hidden');
    });

    it('shows no-data message and hides table when there is no data and not loading', () => {
        renderTable({ tableData: [], noDataMessage: 'Nothing here yet' });

        const table = screen.getByRole('table', { hidden: true });
        expect(table).toHaveClass('hidden');

        expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
    });

    it('calls onRowClick with correct index when a row is clicked', () => {
        const handleRowClick = jest.fn();

        renderTable({ onRowClick: handleRowClick });

        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');
        const firstDataRow = rows[1];

        fireEvent.click(firstDataRow);

        expect(handleRowClick).toHaveBeenCalledTimes(1);
        expect(handleRowClick).toHaveBeenCalledWith(0);
    });
});
