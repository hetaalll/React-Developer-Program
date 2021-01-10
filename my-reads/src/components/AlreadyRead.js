import React, { Component } from 'react'
import Book from './Book'

class AlreadyRead extends Component {
    render() {
        const { books, updateShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === 'read')
                        .map((book)=> (
                            <Book key={book.id} book={book} shelf={book.shelf} updateShelf={updateShelf} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default AlreadyRead