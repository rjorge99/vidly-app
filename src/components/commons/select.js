export const Select = ({ name, label, options, ...rest }) => {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <select className='form-control' name={name} {...rest}>
                <option value='' />
                {options.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
