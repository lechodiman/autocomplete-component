import { Movie } from './types';

export const fetchMovies = async (input: string): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`;
  const requestOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_MOVIEDB_TOKEN}`,
    },
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data.results;
};
