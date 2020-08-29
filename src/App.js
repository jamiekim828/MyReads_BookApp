import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Header';
import MainBookShelves from './MainBookShelves';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  render() {
    console.log('state App.js', this.state);
    return (
      <div className='app'>
        <Header />
        <Route
          exact
          path='/'
          render={() => <MainBookShelves books={this.state.books} />}
        />
        <Route path='/search' component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
