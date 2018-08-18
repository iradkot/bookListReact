import React, {Component} from 'react';
import './BookList.css';
import BookListDumb from '../../components/BookListDumb';
//render books
import BookListRender from './BookListRender'
//Add Book Modal
import AddBook from '../../modals/addBookModal/addBookModal';
//redux
import {addBook, setBooks} from '../../state-manager/actions'
import {connect} from 'react-redux';
//material ui:
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
//BottomNavigation
import BottomNavigation from '../../components/BottomNavigation';
//Notifier
import Notifier from "../../components/Notifier";
import RenderBook from "../BookCard/BookCard1";
import axios from "axios";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookList: [],
            count: 0,
            smallToBig: true, // for sorting
            showAddBookModal: true
        }
        this.getBooks = this.getBooks.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.addBook = this.addBook.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showAddBookModal = this.showAddBookModal.bind(this);

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
            this.props.setBooks(books);
        }
    }

    toggleFilter(){
        this.setState({
            smallToBig: !this.state.smallToBig
        })
    }

    addBook(title='ycxzczo', authors='yo', publishedDate='yo', image='yo'){
        let imageLinks = {smallThumbnail: image};
        let volumeInfo = {title: title,authors: authors, publishedDate: publishedDate, imageLinks:
            imageLinks}
        let book = {id: 1234, volumeInfo: volumeInfo}
        this.props.addBook(book);
    }

    showAddBookModal(){
        this.setState({
            showAddBookModal: true
        })
    }

    closeModal() {
        this.setState({
            showAddBookModal: false
        })
        console.log('closed?');

    }


    render() {
        const { bookList } = this.props;
        const { smallToBig, showAddBookModal} = this.state;
        return (
            <div style={{flexGrow: 1, paddingBottom: 60}}>
                <Grid container spacing={0}>
                    <Notifier/>
                    <Grid container spacing={24} style={{margin: 24}}>
                    < BookListRender bookList={bookList} smallToBig={smallToBig} />
                    </Grid>
                    <div style={{position: "fixed", bottom: "0", width: "100%"}}>
                        <Grid
                            container
                            alignItems={"center"}
                            alignContent={"center"}
                            justify={'center'}
                        >
                            <BottomNavigation toggleFilter={this.toggleFilter} smallToBig={smallToBig} addBook={this.showAddBookModal} />
                        </Grid>
                    </div>
                </Grid>
                <Modal
                    open={showAddBookModal}
                    onClose={this.closeModal}
                >
                    <AddBook closeModal={this.closeModal} bookList={bookList} addBook={this.addBook}/>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bookList: state.bookList
});

const mapDispatchToProps = dispatch => ({
    addBook: (book) => dispatch(addBook(book)),
    setBooks: (books) => dispatch(setBooks(books))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList)

