import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCast } from '../../../services/tmdbApi';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCast(movieId) {
      setLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getCast(movieId);
  }, [movieId]);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <ClipLoader color="#ff6b08" size={40} />
      </div>
    );
  if (!cast.length) return <p>No cast information found.</p>;
  return (
    <ul>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              width={100}
            />
          ) : (
            <p>No photo</p>
          )}
          <p>
            <strong>{name}</strong> as {character}
          </p>
        </li>
      ))}
    </ul>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
