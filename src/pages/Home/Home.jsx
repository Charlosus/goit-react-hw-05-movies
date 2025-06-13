import { useEffect, useState } from 'react';
import { fetchTrandingMovie } from '../../services/tmdbApi';
import { ClipLoader } from 'react-spinners';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      try {
        const data = await fetchTrandingMovie();
        setMovies(data);
      } catch (error) {
        console.error('Error has ocure while requesting data: ', error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      {isLoading && (
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
        >
          <ClipLoader color="#ff6b08" size={40} />
        </div>
      )}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {' '}
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
