import axios from 'axios';

const API_KEY = 'f42a8fcfb8ef8d22075cdcd2c215b4a3';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrandingMovie = async () => {
  const response = await instance.get('/trending/movie/day');
  return response.data.results;
};

export const fetchMovieById = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};


