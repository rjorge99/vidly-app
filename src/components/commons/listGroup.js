export const ListGroup = ({ items, selectedItem, onItemSelect, textProperty, valueProperty }) => {
    return (
        <ul className='list-group'>
            {items.map((item) => (
                <li
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    className={
                        selectedItem === item ? 'list-group-item active' : 'list-group-item'
                    }>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};
