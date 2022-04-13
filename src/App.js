import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/commons/NavBar';
import { NotFound } from './components/commons/not-found';
import { Customers } from './components/customers';
import { MovieDetail } from './components/movieDetail';
import { Movies } from './components/movies';
import { Rentals } from './components/rentals';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <main className='container'>
                <Routes>
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
