import _ from 'lodash';

export const TableBody = ({ data, columns }) => {
    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {columns.map((column) => (
                        <td key={column.path || column.key}>{renderCell(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
