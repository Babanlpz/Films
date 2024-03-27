import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/searchIcon.svg";
import FilmCard from "./components/filmCard.jsx";

function App() {
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f4573c83";

  const [films, setFilms] = useState([]);
  const [searchFilm, setSearchFilm] = useState([]);

  const rechercheFilms = async (titre) => {
    const response = await fetch(`${API_URL}&s=${titre}`);
    const data = await response.json();
    console.log(data.Search);
    setFilms(data.Search);
  };

  useEffect(() => {
    rechercheFilms("marvel");
  }, []);

  return (
    <div className="app">
      <h1>Moovies</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Rechercher un film"
          value={searchFilm}
          onChange={(e) => setSearchFilm(e.target.value)}
        />
        <img src={searchIcon} alt="Search" />
      </div>
      {films?.length > 0 ? (
        <div className="container">
          {films.map((film) => (
            <FilmCard film={film} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Aucuns films trouvés</h2>
        </div>
      )}
    </div>
  );
}

export default App;
