import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Autocomplete from './Autocomplete';

function App() {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

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
      <h1>Vite + React</h1>
      <div className='card'>
        <Autocomplete options={options} />
      </div>
    </>
  );
}

export default App;
