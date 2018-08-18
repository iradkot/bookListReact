import React, {Component} from 'react';
import './BookList.css';
import BookListDumb from '../../components/BookListDumb';
//redux
import {addBook} from '../../state-manager/actions'
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
//BottomNavigation
import BottomNavigation from '../../components/BottomNavigation';
//Notifier
import Notifier from "../../components/Notifier";
import RenderBook from "../BookCard/BookCard1";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            count: 0
        }
    }

    renderBooks(bookList) {
        let books = [];
        for (let book of bookList) {
            //getting the data I choose from google books api.
            let {id, volumeInfo} = book;
            let {authors, title, imageLinks, publishedDate} = volumeInfo;
            //here I check if the image exists in their db, if not set default pic
            let smallThumbnail;
            let thumbnail;
            let images = [];
            if (imageLinks) {
                smallThumbnail = imageLinks.smallThumbnail ? imageLinks.smallThumbnail : '';
                thumbnail = imageLinks.thumbnail ? imageLinks.thumbnail : '';
                images.push({smallThumbnail, thumbnail})
            }
            // authors may be undefined
            let newAuthors = authors ? authors : "not found";
            books.push(
                <RenderBook key={id} title={title} id={id} authors={newAuthors} images={images}
                            publishedDate={publishedDate}/>
            );
        }
        return books;
    }


    render() {
        const {bookList} = this.props;
        return (
            <div style={{flexGrow: 1}}>
                <Grid container spacing={0}>
                    <Notifier/>
                    <Grid container spacing={24} style={{margin: 24}}>
                    {this.renderBooks(bookList)}
                    </Grid>
                    <div style={{position: "fixed", bottom: "0", width: "100%"}}>
                        <Grid
                            container
                            alignItems={"center"}
                            alignContent={"center"}
                            justify={'center'}
                        >
                            <BottomNavigation/>
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
    addBook: (id, title, images) => dispatch(addBook((id, title, images)))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList)

