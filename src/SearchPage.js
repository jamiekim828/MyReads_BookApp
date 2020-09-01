import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchPage extends React.Component {
  state = {
    input: '',
    searched: [],
  };

  updateInput = (input) => {
    this.setState({ input: input }, () => {
      if (this.state.input.length >= 1) {
        this.props.onSearchBook(this.state.input);
      }
    });
  };

  searchUpdateShelf = (book, newShelf) => {
    this.setState(this.props.updateShelf(book, newShelf));
  };

  render() {
    console.log('this.props', this.props, 'this.state', this.state);

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>

          <div className='search-books-input-wrapper'>
            <input
              value={this.state.input}
              onChange={(e) => {
                this.updateInput(e.target.value);
                this.setState({ input: e.target.value });

                if (e.target.value) {
                  BooksAPI.search(e.target.value).then((books) =>
                    this.setState({ searched: books })
                  );
                } else this.setState({ searched: [] });
              }}
              type='text'
              placeholder='Search by title or author'
            />
          </div>
        </div>

        {this.state.input && (
          <div className='search-books-results'>
            <ol className='books-grid'>
              {this.state.searched.length > 0 &&
                this.state.searched.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      imageLinks={book.imageLinks}
                      shelf={this.props.shelf}
                      searchUpdateShelf={this.searchUpdateShelf}
                    />
                  </li>
                ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
