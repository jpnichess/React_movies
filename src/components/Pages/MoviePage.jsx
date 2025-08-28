import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function MoviePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const overview = searchParams.get("overview");
  const image = searchParams.get("poster_path");
  const rating = searchParams.get("vote_average");
  const language = searchParams.get("original_language");
  const date = searchParams.get("release_date");

  return (
    <div className="pattern w-full min-h-screen bg-center bg-purple-900 flex justify-center items-center px-4 py-6">
      <div
        className="w-full max-w-5xl bg-dark-100 rounded-2xl shadow-inner h-auto flex flex-col items-center relative p-6"
        style={{ boxShadow: "inset 0 2px 4px rgba(206, 206, 251, 0.1)" }}
      >
        <div
          className="w-11 h-11 bg-dark-100 absolute top-4 left-4 font-extrabold flex items-center justify-center rounded-xl"
          style={{
            boxShadow: "inset 0 4px 8px rgba(206, 206, 251, 0.15)",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="text-purple-200 font-extrabold"
          >
            <ChevronLeftIcon size={28} />
          </button>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
            {title}
          </h1>
        </div>
        <div className="p-4 flex flex-col md:flex-row justify-center items-center md:items-start text-purple-100 gap-6">
          <img
            className="rounded-lg max-h-[28rem] w-full md:w-80 object-cover"
            src={
              image
                ? `https://image.tmdb.org/t/p/original/${image}`
                : "/no-movie.png"
            }
            alt={title}
          />

          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-purple-200">
              Descrição do filme:
            </h3>
            <p className="mt-4 text-sm md:text-base leading-relaxed">
              {overview ? overview : "Descrição indisponível."}
            </p>
            <ul className="mt-4 text-sm md:text-base space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                Avaliação:{" "}
                {rating && !isNaN(Number(rating))
                  ? Number(rating).toFixed(2)
                  : "Indisponível."}
                <img
                  className="ml-1 w-4 h-4"
                  src="./star.svg"
                  alt="Star Icon"
                />
              </li>
              <li>Língua: {language}</li>
              <li>
                Data de Lançamento: {date ? date.split("-")[0] : "Indisponível"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
