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



    render() {
        return (
            <Provider store={bookStore}>
                <BookList />
            </Provider>
        );
    }
}

export default App;
