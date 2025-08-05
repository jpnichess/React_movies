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
    <div className="pattern w-full h-screen bg-center bg-purple-900 absolute z-0 flex justify-center items-center">
      <div
        className="w-11/12 md:w-3/6 space-y-4 bg-dark-100 rounded-2xl shadow-inner h-auto justify-start flex flex-col items-center relative "
        style={{ boxShadow: "inset 0 2px 4px rgba(206, 206, 251, 0.1)" }}
      >
        <div
          className="w-11 h-11 bg-purple-900 bg-dark-100 absolute top-4 left-4 font-extrabold flex items-center justify-center rounded-xl"
          style={{
            boxShadow: "inset 0 4px 8px rgba(206, 206, 251, 0.15)",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="top-4 left-4 text-purple-200 font-extrabold"
          >
            <ChevronLeftIcon size={28} />
          </button>
        </div>

        <div className="mt-8">
          <h1 className="mx-auto text-xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]">
            {title}
          </h1>
        </div>

        <div className="p-4 text-center flex flex-row justify-center text-purple-100">
          <img
            className="rounded-lg h-[35rem] max-w-[25rem] w-full md:w-auto self-start"
            src={
              image
                ? `https://image.tmdb.org/t/p/original/${image}`
                : "/no-movie.png"
            }
            alt={title}
          />
          <div className="text-center md:text-left max-w-lg ml-6">
            <h3 className="text-3xl mt-4 md:mt-0 text-center text-purple-200">
              Descrição do filme:
            </h3>
            <p className="mt-4">
              {overview ? overview : "Descrição indisponível."}
            </p>
            <ul className="mt-4">
              <li className="flex flex-row items-start p-1">
                Avaliação:{" "}
                {rating && !isNaN(Number(rating))
                  ? Number(rating).toFixed(2)
                  : "N/A"}
                <img className="ml-1 " src="./star.svg" alt="Star Icon" />
              </li>

              <li className="p-1">Língua: {language}</li>
              <li className="p-1">
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
