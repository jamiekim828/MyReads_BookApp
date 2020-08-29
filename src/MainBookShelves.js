import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class MainBookShelves extends React.Component {
  render() {
    return (
      <div className='list-books-content'>
        <BookShelf />
        <div className='open-search'>
          <Link to='/search'>Add Books</Link>
        </div>
      </div>
    );
  }
}

export default MainBookShelves;
