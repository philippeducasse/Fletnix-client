import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from 'react-bootstrap/Row';// rows can be divided into twelfths
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
import "../main-view/main-view.scss";

const MainView = () => {
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
  useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch("https://fletnix-b399cde14eec.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }

          const moviesData = await response.json();

          const moviesFromApi = moviesData.map((movie) => ({
            id: movie._id,
            image: movie.ImageUrl,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description
          }));

          setMovies(moviesFromApi);
        } catch (error) {
          // Handle errors, e.g., display a message or log the error
          console.error('Error fetching movies:', error.message);
        }
      };
      
      fetchMovies();
    }, [token, user]);
  


return (

  <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
    <Row className="justify-content-center mx-md-8">
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
                <Col md={7}>
                  <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
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
                <Col className="text-light text-center loader" >
                  <div className="spinner"></div>
                  <p>Retrieving movies, please wait...</p>
                </Col>
              ) : (
                <Col md={10} >
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
                <Col className="text-light text-center loader">
                  <div className="spinner">
                  </div>
                  <p>Retrieving movies, please wait...</p>
                </Col>
              ) : (
                <>
                  <Row className="justify-content-center">
                    <Col md={5}>
                      <Form className="m-3">
                        <Form.Control
                          onChange={(m) => setSearch(m.target.value)}
                          type="search"
                          placeholder="Search by Movie Title"
                          className="me-2 text-dark search-bar"
                          aria-label="Search"
                        />
                      </Form>
                    </Col>
                  </Row>
                  {movies.filter((searchInput) => {
                    const lowerCaseSearch = search.toLowerCase();
                    if (lowerCaseSearch === '' || searchInput.title.toLowerCase().includes(lowerCaseSearch)) {
                      return true; // Movie matches the search or no search term
                    } else {
                      <Col className="text-light text-center">No movies found!</Col> // NOT WORKING
                      return false; // Movie doesn't match the search term
                    }
                  }).map((movie) => (
                    <Col className="mb-4 mx-md-4" key={movie.id} sm={8} md={8} lg={4} xl={3} >
                      <MovieCard movie={movie} isProfileView={false} token={token} user={user} updateUser={updateUser} />
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

export default MainView;
