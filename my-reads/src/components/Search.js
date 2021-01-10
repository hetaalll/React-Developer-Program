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

    if(str.length <= 0){
      this.setState({
        result: [],
        noResult: false
      })
    }

    if(str) {
      str = str.trim();
      BooksAPI.search(str).then((data) => {
        console.log(data)
        data.length > 0
        ? this.setState({ result: data, noResult: false })
        : this.setState({ result: [], noResult: true });
      })
    }
  }

  render() {
    const getBookShelf = (book) => {
      return this.props.books?.find((item) => item.id === book.id)?.shelf ?? "none";
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
                return <Book book={book} shelf={bookShelf}/>
          })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search