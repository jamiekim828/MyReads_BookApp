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
    searched: [],
  };

  shelves = [
    { currentlyReading: 'Currently Reading' },
    { wishToRead: 'Wish to Read' },
    { completedReading: 'Completed Reading' },
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf;
      this.setState((currentBooks) => ({
        books: currentBooks.books
          .filter((b) => b.id !== book.id)
          .concat([book]),
      }));
    });
  };

  searchBook = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState({ searched: books });
    });
  };

  render() {
    console.log('state App.js', this.state);
    return (
      <div className='app'>
        <Header />
        <Route
          exact
          path='/'
          render={() => (
            <MainBookShelves books={this.state.books} shelves={this.shelves} />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchPage
              searched={this.state.searched}
              onSearchBook={(query) => {
                this.searchBook(query);
              }}
              onUpdateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
