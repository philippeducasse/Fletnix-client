import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "../movie-view/movie-view.scss";

export const MovieView = ({ movies }) => {

  const { movieId} = useParams();
  const movie = movies.find((m)=>m.id === movieId)
  return (
    <div>
      <img className="w-50" src={movie.image} />
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <Link to={"/"}>
      <button
        className= "back-button"
        style= {{cursor: "pointer"}}
        >
        Back
      </button>
      </Link>
      
    </div>
  );
};

