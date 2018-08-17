import React from 'react';

import RenderBook from '../screens/BookCard/BookCard1'
import Grid from '@material-ui/core/Grid';


export default (props) => {
    let books = [];
    for (let book of props.books) {
        //getting the data I choose from google books api.
        let { id, volumeInfo } = book;
        let { authors, title, imageLinks, publishedDate} = volumeInfo;
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
            <RenderBook key={id} title={title} id={id} authors={newAuthors} images={images} publishedDate={publishedDate}/>
        );
    }
    return (
        <Grid container spacing={24} style={{ padding: 24 }}>
            {books}
        </Grid>
    )
}