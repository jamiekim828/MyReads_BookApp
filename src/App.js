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
    { none: 'none' },
  ];

  loadMainPage = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  };

  bookShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((res) => {
      console.log(book.shelf, newShelf);
      book.shelf = newShelf;
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

  searchedBookShelfChange = async (book, newShelf) => {
    await BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      console.log(book.shelf);
    });
    let bookStatus = await BooksAPI.getAll();

    this.setState({ books: bookStatus });
    console.log(this.state.books);
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <Route
          exact
          path='/'
          render={() => (
            <MainBookShelves
              books={this.state.books}
              shelves={this.shelves}
              bookShelfChange={this.bookShelfChange}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchPage
              selectedBooks={this.state.books}
              searched={this.state.searched}
              shelves={this.shelves}
              onSearchBook={(query) => {
                this.searchBook(query);
              }}
              onSearchUpdateShelf={this.searchedBookShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
