import React from 'react';
import { Movies } from './Movies';
import { Search } from './Search';
import { Preloader } from './Preloader';

class Main extends React.Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=1fde3c22&s=matrix')
            .then((response) => response.json())
            // Добавлена проверка на случай ошибки API (data.Search может быть undefined)
            .then((data) => this.setState({ movies: data.Search || [] }));
    }

    searchMovies = (str, type = 'all') => { // <-- Исправлено: добавлена запятая после str
        if (!str) return;
        
        fetch(
            `http://www.omdbapi.com/?apikey=1fde3c22&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((response) => response.json())
            // Добавлена проверка на случай ошибки API
            .then((data) => this.setState({ movies: data.Search || [] }));
    };

    render() {
        const { movies } = this.state;
        
        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {!movies.length ? <Preloader /> : <Movies movies={movies} />}
            </main>
        );
    }
}

export { Main };