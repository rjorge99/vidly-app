export const Input = ({ name, label, value, error, onChange }) => {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                id={name}
                type='text'
                className='form-control'
                autoFocus
            />
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
};
