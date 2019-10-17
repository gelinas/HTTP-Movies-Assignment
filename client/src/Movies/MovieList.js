import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <div onClick={() => this.props.history.push(`/movies/${movie.id}`)}>
            <MovieDetails key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
      <MovieCard movie={movie} />
  );
}
