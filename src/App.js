import React from 'react';
import { Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Header';
import MainBookShelves from './MainBookShelves';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  render() {
    return (
      <div className='app'>
        <Header />
        <Route exact path='/' component={MainBookShelves} />
        <Route path='/search' component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
