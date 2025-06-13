import axios from 'axios';

const API_KEY = 'f42a8fcfb8ef8d22075cdcd2c215b4a3';
const AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhOGZjZmI4ZWY4ZDIyMDc1Y2RjZDJjMjE1YjRhMyIsIm5iZiI6MTc0OTc4NjExNi41ODA5OTk5LCJzdWIiOiI2ODRiOWUwNGY3ZDc2NzY1MDg1YzcyMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xcPilBraHIU-z6G9v9GrOdObwTQOBcG-TzpteYs2Bog';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: AUTHORIZATION,
  },
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

export const searchMovies = async (query) => {
  const response = await instance.get('/search/movie', {
    params: {
      query,
      include_adult: true,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};
