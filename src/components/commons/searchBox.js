export const SearchBox = ({ onChange, ...rest }) => {
    return (
        <input
            type='text'
            className='form-control my-3'
            placeholder='Search'
            onChange={(e) => onChange(e.target.value)}
            {...rest}
        />
    );
};
