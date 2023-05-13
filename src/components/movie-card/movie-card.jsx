import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100" onClick={() => {onMovieClick(movie)}} variant="link">
    
      
      <Card.Body>
        <Card.Img variant="top" src={movie.image} />
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text> 
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired

  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};