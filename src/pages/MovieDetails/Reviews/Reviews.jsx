import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../../services/tmdbApi';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getReviews(movieId) {
      setLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getReviews(movieId);
  }, [movieId]);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <ClipLoader color="#ff6b08" size={40} />
      </div>
    );
  if (!reviews.length) return <p>No Reviews information found.</p>;
  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p>
            <strong>Author: {author}</strong>
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
