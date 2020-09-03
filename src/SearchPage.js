import React from 'react';
import { Route } from 'react-router-dom';
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
    this.setState(this.props.onSearchUpdateShelf(book, newShelf));
  };

  render() {
    let listBooks = this.props.selectedBooks;
    let searchedBooks = this.state.searched;

    // console.log(this.state.searched.length);

    for (let i = 0; i < listBooks.length; i++) {
      for (let j = 0; j < searchedBooks.length; j++) {
        if (listBooks[i].id === searchedBooks[j].id) {
          searchedBooks[j].shelf = listBooks[i].shelf;
        }
      }
    }

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          {/* <Link to='/' className='close-search'>
            <Route exact path='/' render={() => <BooksApp />} />
          </Link> */}

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
                      preSelectedBooks={this.props.selectedBooks}
                      book={book}
                      imageLinks={book.imageLinks}
                      title={book.title}
                      authors={book.authors}
                      onSearchUpdateShelf={this.searchUpdateShelf}
                    />
                  </li>
                ))}
            </ol>
          </div>
        )}

        {this.state.searched.length === undefined && (
          <div className='error-message'>
            <p>
              <b>Please search with valid terms :</b>'Android', 'Art',
              'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
              'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus',
              'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
              'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
              'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy',
              'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future',
              'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',
              'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction',
              'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate',
              'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
              'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
              'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
              'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual
              Reality', 'Web Development', 'iOS'
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
