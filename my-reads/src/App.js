import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AlreadyRead from './components/AlreadyRead'
import CurrentlyReading from './components/CurrentlyReading'
import FutureReads from './components/FutureReads'
import Search from './components/Search'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        // console.log(books)
        this.setState(() => ({
          books
        }))
      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      const updatedBook = {
        ...book,
        shelf,
      };
      // console.log(updatedBook)
      this.setState((currentState) => ({
        books: currentState.books.filter((b) => b.id !== book.id).concat(updatedBook),
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search books={this.state.books} updateShelf={this.updateShelf} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading books= {this.state.books} updateShelf={this.updateShelf} />
                <FutureReads books= {this.state.books} updateShelf={this.updateShelf} />
                <AlreadyRead books= {this.state.books} updateShelf={this.updateShelf} />
              </div>
            </div>
              <Link
                to='/search'
                className="open-search"
              >Add a book</Link>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
