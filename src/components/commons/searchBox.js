export const SearchBox = ({ onChange, placeholder, ...rest }) => {
    return (
        <input
            type='text'
            className='form-control my-3'
            onChange={(e) => onChange(e.target.value)}
            {...rest}
        />
    );
};
