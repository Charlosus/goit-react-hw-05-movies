import { useSearchParams } from 'react-router-dom';
import { MovieList } from './MovieList';
import { SearchBox } from './Searchbox';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../services/tmdbApi';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('name') ?? '';

  useEffect(() => {
    if (!movieName) return;

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(movieName);
        setMovies(results);
      } catch (error) {
        console.error('Fetching error: ', error);
      }
    };

    fetchMovies();
  }, [movieName]);

  const visibleMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  );

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value !== '') {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }

    setSearchParams(updatedParams);
  };

  return (
    <main>
      <SearchBox
        value={movieName}
        onChange={(value) => updateSearchParams('name', value)}
      />
      <MovieList movies={visibleMovies} />
      {visibleMovies.length === 0 && movieName !== '' && (
        <p>No results found for {movieName}</p>
      )}
    </main>
  );
};

export default Movies;
