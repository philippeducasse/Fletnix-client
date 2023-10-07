import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from 'react-bootstrap/Row';// rows can be divided into twelfths
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../main-view/main-view.scss";

// WHY IS MAINVIEW.jsx NOT THE MAIN ENTRY POINT? WHY DOES IT NEED TO BE TRANSPILED TO INDEX.JSX?
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]); // first part of array is data and second part is the function to populate tarray
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [search, setSearch] = useState("")
  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    } 
    https://fletnix-1sgs.onrender.com/
  useEffect(() => { //useEffect code runs code ON EVERY RENDER
    fetch("https://fletnix-1sgs.onrender.com/movies",
       {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {

          return {
            id: movie._id,
            image: movie.ImageUrl,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
          };
        });
       
        setMovies(moviesFromApi);
      });
  }, [token]); //  this is the second argument of useEffect, ensures fetch is called everytime token changes
  // known as dependency array)

  return (

    <BrowserRouter>

      <NavigationBar
        user={user}
        onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
        

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView user={user} token={token} movies={movies} isProfileView={true} onLoggedOut={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }} updateUser={updateUser} />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!
                  </Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} updateUser={updateUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                  <Row className="justify-content-md-center">
                  <Col md={4}>
                  <Form className="m-3">
                    <Form.Control
                      onChange= {(m) => setSearch(m.target.value)}
                      type="search"
                      placeholder="Search by Movie Title"
                      className="me-2"
                      aria-label="Search"
                    />
                  </Form>
                  </Col>
                  </Row>
                    {movies.filter((searchInput)=>{
                      const lowerCaseSearch = search.toLowerCase()
                      return lowerCaseSearch === ''? searchInput: searchInput.title.toLowerCase().includes(lowerCaseSearch)}
                      
                      )
                      .map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} isProfileView={false} token={token} user={user} updateUser={updateUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};


