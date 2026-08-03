import React from 'react';
import { Movies } from './Movies';
import { Search } from './Search';
import { Preloader } from './Preloader';

const API_KEY = process.env.REACT_APP_API_KEY

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    };

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
            .then((response) => response.json())
            // Добавлена проверка на случай ошибки API (data.Search может быть undefined)
            .then((data) => this.setState({ movies: data.Search, loading: false }));
    }

    searchMovies = (str, type = 'all') => {
        this.setState({loading: true});
        fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((response) => response.json())
            // Добавлена проверка на случай ошибки API
            .then((data) => this.setState({ movies: data.Search, loading: false}));
    };

    render() {
    const { movies, loading } = this.state;

    return (
        <main className='container content'>
            <Search searchMovies={this.searchMovies} />
            {loading ? <Preloader /> : <Movies movies={movies} />}
        </main>
    );
}
}

export { Main };