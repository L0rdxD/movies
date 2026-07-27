import React from 'react';
import { Movies } from './Movies';
import { Search } from './Search';
import { Preloader } from  './Preloader'

class Main extends React.Component {
    state = {
        movies: [],
    };

     searchMovies = (str) => {
        fetch(`http://www.omdbapi.com/?apikey=1fde3c22&s=${str}`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search }));
    };

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=1fde3c22&s=matrix')
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search }));
    }

    render() {
        const { movies } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {movies.length ? (
                    <Movies movies={this.state.movies} />
                ) : (
                    <Preloader />
                )}
            </main>
        );
    }
}

export { Main };