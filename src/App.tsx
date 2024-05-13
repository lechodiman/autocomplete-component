import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import debounce from './utils/debounce';
import { fetchMovies } from './api/movies/fetchMovies';

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
      <h1>Search Movies</h1>
      <p>Try typing something like: 'Harry Potter'</p>
      <div>
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
