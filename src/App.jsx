import { Route, Routes, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './pages/Home/Home';
import { Movies } from './pages/Movies/Movies';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';
import { Cast } from './pages/MovieDetails/Cast/Cast';
import { Reviews } from './pages/MovieDetails/Reviews/Reviews';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
         <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
