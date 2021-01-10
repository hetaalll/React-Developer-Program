import React, { Component } from 'react'
import Book from './Book'

class FutureReads extends Component {
    render() {
        const { books, updateShelf } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === 'wantToRead')
                        .map((book)=> (
                            <Book key={book.id} book={book} shelf={book.shelf} updateShelf={updateShelf} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default FutureReads