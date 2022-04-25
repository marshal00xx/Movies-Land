import { useState, useEffect } from 'react'
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=c9c9ce06'
const movie1 = {
    "Title": "Game of Thrones: The Last Watch",
    "Year": "2019",
    "imdbID": "tt10090796",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDdlMzQzNDQtNTAxMS00NTMyLTgxYTAtYzQ0OGI1YzZhY2Y3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('game of thrones');
  },[]);
  return (
    <div className="app">
      <h1>Movies Land</h1>
      <div className='search'>
        <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      </div>
      {
        movies.length > 0 
        ? (
          <div className='container'>
            {
              movies.map((movie) => (
                <MovieCard movie={movie} />
            ))}
          </div>
        ):(
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
      )}
    </div>
  )
}

export default App
