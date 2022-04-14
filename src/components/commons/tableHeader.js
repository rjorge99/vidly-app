export const TableHeader = ({ columns, onSort, sortColumn }) => {
    const raiseSort = (path) => {
        let currentSortColumn = { ...sortColumn };
        if (currentSortColumn.path === path) {
            currentSortColumn.order = currentSortColumn.order === 'asc' ? 'desc' : 'asc';
        } else currentSortColumn = { path, order: 'asc' };

        onSort(currentSortColumn);
    };

    const renderSortIcon = (column) => {
        if (column.path !== sortColumn.path) return;
        if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    };

    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        className='clickable'
                        key={column.path || column.key}
                        onClick={() => raiseSort(column.path)}>
                        {column.label} {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
