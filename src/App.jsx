import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deBouncedSearchTerm, setDeBouncedSearchTerm] = useState("");

  useDebounce(() => setDeBouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Falha ao encontrar os filmes.");
      }

      const data = await response.json();

      if (!data.results || data.results.length == 0) {
        setErrorMessage("Nenhum filme encontrado.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
    } catch (error) {
      console.error(`Erro ao encontrar filmes: ${error}`);
      setErrorMessage("Erro ao encontrar filmes, por favor tente mais tarde");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(deBouncedSearchTerm);
  }, [deBouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="h1">
            Jeito <span className="text-gradient">fácil</span> de encontrar os
            seus filmes favorivos
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="h2 mt-[40px]">Todos filmes</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
