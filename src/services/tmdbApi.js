import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrandingMovie = async () => {
  const response = await instance.get('/trending/movie/day');
  return response.data.result;
};

export const fetchMovieById = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

console.log('API_KEY: ', API_KEY);
