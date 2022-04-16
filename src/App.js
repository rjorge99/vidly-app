import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <NavBar />
                <main className='container'>
                    <Routes>
                        <Route path='/customers' element={<Customers />} />
                        <Route path='/movies' element={<Movies />} />
                        <Route path='/movies/:id' element={<MovieForm />} />
                        <Route path='/rentals' element={<Rentals />} />
                        <Route path='/register' element={<RegisterForm />} />
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/' element={<Movies />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
