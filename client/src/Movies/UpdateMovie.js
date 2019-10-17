import React from "react";
import axios from "axios";

import MovieForm from "./MovieForm";

export default class Movie extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: null
      };
    }  

    componentDidMount() {
      this.fetchMovie(this.props.match.params.id);
    }
  
    componentWillReceiveProps(newProps) {
      if (this.props.match.params.id !== newProps.match.params.id) {
        this.fetchMovie(newProps.match.params.id);
      }
    }
  
    fetchMovie = id => {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            this.setState({ movie: res.data });
            console.log(res.data);
        })
        .catch(err => console.log(err.response));
    };

    addMovie = newMovie => {
        axios
        .post(`http://localhost:5000/api/movies/`, newMovie)
        .then(res => {
            console.log(res)
            this.props.history.push(`/movies/${newMovie.id}`)
        })
        .catch(err => console.log(err));
    }

    editMovie = updatedMovie => {
        axios
        .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
        .then(res => {
            console.log(res)
            this.props.history.push(`/movies/${updatedMovie.id}`)
        })
        .catch(err => console.log(err));
    }

    // addMovie = movie => {
    //   axios
    //   .get(`http://localhost:5000/api/movies/${id}`)
    //   .then(res => this.setState({ movie: res.data }))
    //   .catch(err => console.log(err.response));
    // }

    render() {
        if (!this.state.movie) {
          return <div>Loading movie information...</div>;
        }
        return(
            <div className="update-wrapper">
                <MovieForm movie={this.state.movie} submitForm={this.editMovie} type={"Edit Movie"} />
            </div>
        );
    } 
};