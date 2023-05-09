import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/Movie-card";
import { MovieView } from "../movie-view/Movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] =useState(storedToken? storedToken: null);

  if (!user) {
    return (
    <>
      <LoginView
      onLoggedIn= {(user, token) => {
        setUser(user);
        setToken (token);
      }} />
      or
      <SignupView />
      </>
  );
  }

  useEffect(()=> {
    if (!token) {
      return; //return what?
    }
    fetch( "https://fletnix-s949.onrender.com/movies", 
    {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response)=> response.json())
      .then((movies)=> {
        const moviesFromApi = movies.map((movie)=> {
         
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Title
          };
        
      });
      setMovies(moviesFromApi);
    });
  }, [token]); //  this is the second argument of useEffect, ensures fetch is called everytime token changes
              // known as dependency array

  useEffect(() => {
    setMovies(movies);
    }, [movies]);

  if (selectedMovie) {
    console.log(selectedMovie);
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            console.log(newSelectedMovie);
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};
