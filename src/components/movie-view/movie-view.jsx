import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "../movie-view/movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser }) => {

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const username = user.Username
  console.log(user);

  // fetch(`https://fletnix-s949.onrender.com/users/`, {
  //   method: "GET",
  //   headers: { Authorization: `Bearer ${token}` }
  // }).then((response) => response.json())
  //   .then(users => {
  //     if (users) {
  //       users.filter(user => user.Username === username);

  //     } else {
  //       alert('Error');
  //     }
  //   })

  // Things to do:
  // - write a function that fetches the user by username
  // - call that function in addToFavorites. 
  // - call updateUser on result from fetch

  const getUser = (username) => {
    fetch(`https://fletnix-s949.onrender.com/users/${username}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          }
        })
          .then((response)=> {
              if (response.ok) {
                  alert("Successfully got user info");
                  updateUser(user);
              } else {
                  alert(" failed")
              }
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
          updateUser(user);
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

    </div>
  );
};

