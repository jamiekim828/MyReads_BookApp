import React from 'react';
import { Link } from 'react-router-dom';
import MyBooks from './MyBooks';

class MainBookShelves extends React.Component {
  shelves = [
    { currentlyReading: 'Currently Reading' },
    { wishToRead: 'Wish to Read' },
    { completedReading: 'Completed Reading' },
  ];

  render() {
    console.log('this.props', this.props);

    return (
      <div className='list-books-content'>
        <div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Currently Reading</h2>
            <div className='bookshelf-books'>
              <MyBooks
                name='currentlyReading'
                books={this.props.books}
                onBookShelfChange={this.props.bookShelfChange}
              />
            </div>
          </div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Wish To Read</h2>
            <div className='bookshelf-books'>
              <MyBooks
                name='wantToRead'
                books={this.props.books}
                onBookShelfChange={this.props.bookShelfChange}
              />
            </div>
          </div>
          <div className='bookshelf'>
            <h2 className='bookshelf-title'>Completed Reading</h2>
            <div className='bookshelf-books'>
              <MyBooks
                name='read'
                books={this.props.books}
                onBookShelfChange={this.props.bookShelfChange}
              />
            </div>
          </div>
        </div>

        <div className='open-search'>
          <Link to='/search'>
            <button>Search more books</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainBookShelves;
