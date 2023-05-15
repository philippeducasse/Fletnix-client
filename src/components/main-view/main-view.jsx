import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/Movie-card";
import { MovieView } from "../movie-view/Movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] =useState(null);

  useEffect(() => {
    fetch("https://fletnix-s949.onrender.com/movies"
).then((response)=>
      response.json())
      .then((data)=> {
        // console.log(data)
        const moviesFromApi = data.map((doc)=> {
          console.log(doc)
          return {
            id: doc._id,
            title: doc.Title,
            director: doc.Director.Name,
            genre: doc.Genre.Title
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  if (!user) {
    return <LoginView onLoggedIn= {(user)=> setUser(user)} />;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => { setUser(null); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            console.log(newSelectedMovie);
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
