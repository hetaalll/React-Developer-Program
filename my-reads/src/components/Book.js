import React, { Component } from 'react'

class Book extends Component {
    handleUpdateShelf = (e) => {
        const book = this.props.book;
        book.shelf = e.target.value;
        this.props.updateShelf(book, book.shelf);
    }
    render() {
        const { book, shelf } = this.props
        return (
            <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    { book.imageLinks && book.imageLinks.thumbnail ?
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://www.solidbackgrounds.com/images/2560x1600/2560x1600-dark-gray-solid-color-background.jpg)` }}></div>
                    }
                    <div className="book-shelf-changer">
                        <select value= {shelf} onChange={this.handleUpdateShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors ? <div className="book-authors">{book.authors.join(", ")}</div> :
                  <div className="book-authors">No Author</div>
                }
            </div>
        </li>
        )
    }
}

export default Book