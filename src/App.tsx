import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Autocomplete from './Autocomplete';
import { useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: number | null;

  return (...args: Parameters<F>) => {
    const later = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

type Movie = {
  title: string;
};

const fetchMovies = async (input: string): Promise<Movie[]> => {
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

  console.log(data);

  return data.results;
};

function App() {
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const debouncedFetchMovies = useMemo(
    () =>
      debounce(async (input) => {
        if (!input) {
          setOptions([]);
          return;
        }

        try {
          const movies = await fetchMovies(input);
          setOptions(movies.map((movie) => movie.title));
        } catch (error) {
          console.error(error);
        }
      }, 400),
    []
  );

  useEffect(() => {
    debouncedFetchMovies(userInput);
  }, [debouncedFetchMovies, userInput]);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Search Movies</h1>
      <div className='card'>
        <Autocomplete
          options={options}
          userInput={userInput}
          onUserInput={setUserInput}
        />
      </div>
    </>
  );
}

export default App;
