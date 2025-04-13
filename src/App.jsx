import './App.css';
import { useState } from 'react';
import Headline from './components/Headline';
import SearchBar from './components/SearchBar';
import { useWeather } from './api';

function App() {
  const [ search, setSearch ] = useState("Brisbane");
   const { loading, headlines, error } = useWeather(search);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error !== null) {
    return <p>Something went wrong... {error.message}</p>;
  }



  return (
    <div className="App">
      <h1>{search} Weather Forecast Today</h1>
      <SearchBar onSubmit = {setSearch}/>
      {
        headlines.map(headline => <Headline key={headline.time} {...headline} />)
      }
    </div>
  );
}

export default App;
