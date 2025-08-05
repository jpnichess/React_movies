import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
  } = movie;

  function onSeeDetailsClick(movie) {
    const query = new URLSearchParams();
    query.set("title", movie.title);
    query.set("overview", movie.overview);
    query.set("poster_path", movie.poster_path)
    query.set("release_date", movie.release_date)
    query.set("original_language", movie.original_language)
    query.set("vote_average", movie.vote_average)
    navigate(`/movie?${query.toString()}`);
  }

  return (
    <div className="movie-card p-5">
      <div className="w-full p-5">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      /></div>
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="./star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
          <span>•</span>
          <div className="w-20 flex justify-center">
            <button
              onClick={() => onSeeDetailsClick(movie)}
              className="w-full text-white text-sm bg-slate-600 rounded-md font-normal tracking-wide"
            >
              Detalhes
            </button>
            <p className="hidden">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
