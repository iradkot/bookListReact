import React, { Component } from 'react';
import './BookList.css';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import BookListDumb from '../../components/BookListDumb';
//redux
import {addBook, setBooks} from '../../state-manager/actions'
import { connect } from 'react-redux';


class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            count: 0
        }
    }


    render() {
        const { bookList } = this.props;
        return (
                <div className="App">
                    <BookListDumb books={bookList} />
                </div>
        );
    }
}

const mapStateToProps = state => ({
    bookList: state.bookList
})

const mapDispatchToProps = dispatch => ({
    addBook: (id, title, images) => dispatch(addBook((id, title, images)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList)

