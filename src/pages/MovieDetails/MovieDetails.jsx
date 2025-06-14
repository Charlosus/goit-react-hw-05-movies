import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../../services/tmdbApi';
import { ClipLoader } from 'react-spinners';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';

const MovieDetails = () => {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
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
      <Link to={backLink.current}>← Back</Link>
      <div>
        <h1>{movie.title}</h1>
        <div>
          {' '}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="movie poster"
          />
        </div>
        <div>
          <h3>
            User Score: <span>{Math.floor(movie.vote_average * 10)}%</span>
          </h3>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>

          {movie.genres.map(({ id, name }) => (
            <p key={id}>{name}</p>
          ))}
        </div>
      </div>

      <nav>
        <Link to="cast" state={{ from: backLink.current }}>
          Cast
        </Link>{' '}
        |{' '}
        <Link to="reviews" state={{ from: backLink.current }}>
          Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
