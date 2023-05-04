import { useState } from "react";
import { MovieCard } from "../movie-card/Movie-card";
import { MovieView } from "../movie-view/Movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The 400 Blows",
      director: "Francois Truffault",
      genre: "Drama"

    },
    {
      id: 2,
      title: "Paths of Glory",
      director: "Stanely Kubric",
      genre: "War"
    },
    {
    id: 3,
      title: "The Seventh Seal",
      director: "Bergman",
      genre: "History"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
