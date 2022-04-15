export const SearchBox = ({ onChange, placeholder, ...rest }) => {
    return <input type='text' className='form-control my-3' onChange={onChange} {...rest} />;
};
