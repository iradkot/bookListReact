import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BookList from './screens/bookList/BookList'
//redux
import rootReducer from './state-manager/reducers';
import { setBooks } from './state-manager/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const bookStore = createStore(rootReducer);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            count: 0
        }
        this.getBooks = this.getBooks.bind(this);
    }
    async componentDidMount() {
        this.getBooks();
    }

    getBooks(event = false) {
        let that = this;
        let searchedItem = event && typeof event.target.value === "string" ? event.target.value : 'genetic algorithm';
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedItem}}`)
            .then(function (response) {
                // handle success
                //the way to get the book from the object
                that.setBooks(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    setBooks(response) {
        let books = response.data.items;
        // sometimes the item brings back data with no items, which means it didnt find anything
        if (books) {
            bookStore.dispatch(setBooks(books));
        }
    }


    render() {
        return (
            <Provider store={bookStore}>
                <BookList />
            </Provider>
        );
    }
}

export default App;
