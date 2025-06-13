import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../../services/tmdbApi';
import { ClipLoader } from 'react-spinners';

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

  return (
    <div>
      {isLoading && (
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
        >
          <ClipLoader color="#ff6b08" size={40} />
        </div>
      )}
      {movie && <h1>{movie.title}</h1>}
    </div>
  );
};
