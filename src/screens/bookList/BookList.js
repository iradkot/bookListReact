import React, {Component} from 'react';
import './BookList.css';
import BookListDumb from '../../components/BookListDumb';
//render books
import BookListRender from './BookListRender'
//redux
import {addBook, setBooks} from '../../state-manager/actions'
import {connect} from 'react-redux';
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
            smallToBig: true // for sorting
        }
        this.getBooks = this.getBooks.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
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
        this.setState({bookList: books});
    }

    toggleFilter(){
        this.setState({
            smallToBig: !this.state.smallToBig
        })
    }

    render() {
        const {bookList, smallToBig} = this.state;
        console.log('bookList',bookList);
        return (
            <div style={{flexGrow: 1}}>
                <Grid container spacing={0}>
                    <Notifier/>
                    <Grid container spacing={24} style={{margin: 24}}>
                    < BookListRender bookList={bookList} smallToBig={smallToBig}/>
                    </Grid>
                    <div style={{position: "fixed", bottom: "0", width: "100%"}}>
                        <Grid
                            container
                            alignItems={"center"}
                            alignContent={"center"}
                            justify={'center'}
                        >
                            <BottomNavigation toggleFilter={this.toggleFilter} smallToBig={smallToBig} />
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bookList: state.bookList
});

const mapDispatchToProps = dispatch => ({
    addBook: (id, title, images) => dispatch(addBook((id, title, images))),
    setBooks: (books) => dispatch(setBooks(books))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList)

