import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Customers } from './components/customers';
import { LoginForm } from './components/loginForm';
import { MovieForm } from './components/movieForm';
import { Movies } from './components/movies';
import { NavBar } from './components/commons/NavBar';
import { NotFound } from './components/commons/not-found';
import { Rentals } from './components/rentals';
import { RegisterForm } from './components/registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Logout } from './components/logout';
import auth from './services/authService';

function App() {
    // TODO: manejo en un futuro con context o con redux
    const [state, setState] = useState(null);

    useEffect(() => {
        const user = auth.getCurrentUser();
        setState(user);
    }, []);

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <NavBar user={state} />
                <main className='container'>
                    <Routes>
                        <Route path='/customers' element={<Customers />} />
                        <Route path='/movies' element={<Movies />} />
                        {/* validar esta ruta  */}
                        <Route path='/movies/:id' element={<MovieForm />} />
                        <Route path='/rentals' element={<Rentals />} />
                        <Route path='/register' element={<RegisterForm />} />
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/' element={<Movies />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
