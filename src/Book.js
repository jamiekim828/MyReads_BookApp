import React from 'react';

class Book extends React.Component {
  render() {
    let backgroundImg;

    if (typeof this.props.book.imageLinks === 'undefined') {
      backgroundImg = '';
    } else {
      backgroundImg = this.props.book.imageLinks.thumbnail;
    }

    console.log(this.props);

    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${backgroundImg})`,
            }}
          ></div>
          <div className='book-shelf-changer'>
            <select
              value={this.props.book.shelf ? this.props.book.shelf : 'none'}
              onChange={(e) =>
                this.props.onSearchUpdateShelf(this.props.book, e.target.value)
              }
            >
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Completed Reading</option>
              <option value='none'>none</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{this.props.title}</div>
        <div className='book-authors'>{this.props.authors}</div>
      </div>
    );
  }
}

export default Book;
