import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/Movie-card";
import { MovieView } from "../movie-view/Movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] =useState(storedToken? storedToken: null);


  useEffect(()=> {
    if (!token) {
      return; //early exit, will not run rest of code
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
            image: movie.ImageUrl,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Title
          };
         });
          setMovies(moviesFromApi);
          });
         }, [token]); //  this is the second argument of useEffect, ensures fetch is called everytime token changes
                      // known as dependency array
          return (
            // center the columns within a row
            <Row className="justify-content-md-center">
              {!user ? (
                
                <Col md={5}>
                <LoginView
                onLoggedIn= {(user, token) => {
                  setUser(user);
                  setToken (token);
                }} />
                or
                <SignupView />
                </Col>
                
              ) : selectedMovie ? (
          // col set to 8 with MD breakpoint
              <Col md={8}> 
               <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
               </Col>
                ) : (movies.length === 0) ? (
                <div>The list is empty!
                <button className="logout-button" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
              </div>
                ) : ( <>
                  {movies.map((movie) => (
                    <Col key={movie.id} md={3} className= "mb-5">
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                      }}
                      />
                    </Col>
                  ))}
                  <Col md={8}>
                  <button className="logout-button" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                  </Col>
                </>
              )}
              </Row>
            );
          };
