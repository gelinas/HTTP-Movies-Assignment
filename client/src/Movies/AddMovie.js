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

    addMovie = newMovie => {
        axios
        .post(`http://localhost:5000/api/movies/`, newMovie)
        .then(res => {
            console.log(res)
            this.props.history.push(`/movies/${res.data[res.data.length-1].id}`)
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div className="update-wrapper">
                <MovieForm movie={this.state.movie} submitForm={this.addMovie} type={"Add Movie"} />
            </div>
        );
    } 
};