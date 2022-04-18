import { NavLink } from 'react-router-dom';
export const NavBar = ({ user }) => {
    console.log(user);
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <NavLink className='navbar-brand' to='/movies'>
                Vidly
            </NavLink>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/movies'>
                            Movies
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/customers'>
                            Customers
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/rentals'>
                            Rentals
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li className='nav-item'>
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                                    to='/login'>
                                    Login
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                                    to='/register'>
                                    Register
                                </NavLink>{' '}
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li className='nav-item'>
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                                    to='/profile'>
                                    {user.name}
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                                    to='/logout'>
                                    Logout
                                </NavLink>{' '}
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};
