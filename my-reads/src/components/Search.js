import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    query: "",
    result: [],
    noResult: false
  }

  searchBooks= (e) => {
    let str = e.target.value;
    this.setState({
      query: str
    })

    // search bar is clear
    if(str.length <= 0){
      this.setState({
        result: [],
        noResult: false
      })
    }

    if(str) {
      str = str.trim();
      BooksAPI.search(str).then((data) => {
        // console.log(data)
        data.length > 0
        ? this.setState({ result: data, noResult: false }) // search string returned data
        : this.setState({ result: [], noResult: true }); // search string not valid/no data returned
      })
    }
  }

  render() {
    // function will keep the bookself dropdown value consisten across main and search page
    const getBookShelf = (book) => {
      return this.props.books.find((item) => item.id === book.id)?.shelf || "none";
    };
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.result.map((book) => {
                let bookShelf = getBookShelf(book);
                return <Book key={book.id} book={book} shelf={bookShelf} updateShelf={this.props.updateShelf} />
          })}
          </ol>
        </div>
        {this.state.noResult && (
          <div className="noResults">
            No Results Found. Please try again.
          </div>
        )}
      </div>
    )
  }
}

export default Search