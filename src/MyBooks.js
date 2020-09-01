import React from 'react';

class MyBooks extends React.Component {
  render() {
    console.log(this.props);

    return (
      <ol className='books-grid'>
        {this.props.books
          .filter((book) => book.shelf === this.props.name)
          .map((book) => (
            <li key={book.id}>
              <div className='book'>
                <div className='book-top'>
                  <div
                    className='book-cover'
                    style={{
                      width: 128,
                      height: 188,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  ></div>
                  <div className='book-shelf-changer'>
                    <select
                      onChange={(e) =>
                        this.props.onBookShelfChange(book, e.target.value)
                      }
                    >
                      <option value='move' disabled>
                        Move to...
                      </option>
                      <option value='currentlyReading'>
                        Currently Reading
                      </option>
                      <option value='wantToRead'>Want to Read</option>
                      <option value='read'>Read</option>
                    </select>
                  </div>
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>{book.authors}</div>
              </div>
            </li>
          ))}
      </ol>
    );
  }
}

export default MyBooks;
