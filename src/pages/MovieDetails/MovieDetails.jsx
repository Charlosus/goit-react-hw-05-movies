import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../../services/tmdbApi';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error has ocure while requesting data: ', error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <ClipLoader color="#ff6b08" size={40} />
      </div>
    );
  }

  if (!movie) return <p>No movie data</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <nav>
        <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
};
