import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchPage from './SearchPage';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  render() {
    return (
      <div className='app'>
        <div className=''>
          <Route
            exact
            path='/'
            render={() => (
              <div className='list-books'>
                <div className='list-books-title'>
                  <h1>MyReads</h1>
                </div>
                <BookShelf />
                <div className='open-search'>
                  <Link to='/search'>Add Books</Link>
                </div>
              </div>
            )}
          />
        </div>
        <Route path='/search' component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
