import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default class Movie extends React.Component {
    constructor(props) {
      super(props);
      this.emptyMovie = { 
          id: "",
          title: "", 
          director: "", 
          metascore: "", 
          star1: "", 
          star2: ""}
      console.log("movie form props", props);
      console.log("empty movie object", this.emptyMovie);
      if (props.movie) {
          this.movieValues = {
              id: props.movie.id,
              title: props.movie.title,
              director: props.movie.director,
              metascore: props.movie.metascore,
              star1: props.movie.stars[0],
              star2: props.movie.stars[1]
          }
          console.log("initial values object", this.movieValues);
      }
    }

    render() {
        return(
            <div className="form-container">
            <Formik initialValues={this.props.movie ? this.movieValues : this.emptyMovie}
                onSubmit={(values, actions) => {
                    this.props.submitForm({
                        id: values.id,
                        title: values.title,
                        director: values.director,
                        metascore: values.metascore,
                        stars: [values.star1, values.star2]
                    })
                    console.log("values from Formik", values);
                    actions.setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="title" placeholder="Title" />
                        <ErrorMessage
                            component="p"
                            name="title"
                            className="error"
                        />
                
                        <Field type="text" name="director" placeholder="Director" />
                        <ErrorMessage
                            component="p"
                            name="director"
                            className="error"
                        />  
                
                        <Field type="text" name="metascore" placeholder="Metascore" />
                        <ErrorMessage
                            component="p"
                            name="metascore"
                            className="error"
                        />  
                
                        <Field type="text" name="star1" placeholder="First Star" />
                        <ErrorMessage
                            component="p"
                            name="star1"
                            className="error"
                        />  
                
                        <Field type="text" name="star2" placeholder="Second Star" />
                        <ErrorMessage
                            component="p"
                            name="star2"
                            className="error"
                        />  
                        <div className="button-container">
                            <button 
                                type="submit" 
                                className="primary-button"
                                disabled={isSubmitting}>
                            {isSubmitting ? "Please wait..." : this.props.type}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        );
    }
}