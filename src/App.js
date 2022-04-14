import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Customers } from './components/customers';
import { LoginForm } from './components/loginForm';
import { MovieDetail } from './components/movieDetail';
import { Movies } from './components/movies';
import { NavBar } from './components/commons/NavBar';
import { NotFound } from './components/commons/not-found';
import { Rentals } from './components/rentals';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <main className='container'>
                <Routes>
                    <Route path='login' element={<LoginForm />} />
                    <Route path='/movies/:id' element={<MovieDetail />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/rentals' element={<Rentals />} />
                    <Route path='/' element={<Movies />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
