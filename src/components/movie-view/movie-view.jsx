import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../movie-view/movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";


export const MovieView = ({ movies, user, token, updateUser}) => {

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const username = user.Username;
  let similarMovies = movies.filter((m)=> movie.genre === m.genre);
  console.log(movie);

  const getUser = (username) => {
    //this logic can be replaced by using a change of state
    fetch(`https://fletnix-s949.onrender.com/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Successfully got user info");
          return response.json();
        } else {
          alert(" failed")
        }
      }).then((data) => {
        updateUser(data);
      });
  }

  const addToFavorites = () => {

    fetch(`https://fletnix-s949.onrender.com/users/${username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Successfully added to favorites");
        getUser(username);
      } else {
        alert(" failed to add to favorites")
      }
    });

    // Fetch to updtae user

  }

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
    {/* <Link to= {`users/${user.Username}/movies/${movie.id}`}> */}
    <button
      className="back-button"
      style={{ cursor: "pointer" }}
      onClick={() => addToFavorites()}>
      Add to Favorites</button>
    &emsp;
    {/* </Link> */}
    <Link to={"/"}>
      <button
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </Link>
    <hr />
    <h2>Similar Movies</h2>
    {console.log(similarMovies)}{
    similarMovies.map((movie) => (
      <div className="mb-4" key={movie.id} md={3}>
        <MovieCard movie={movie}/>
      </div>
    ))}

  </div>
);
};

