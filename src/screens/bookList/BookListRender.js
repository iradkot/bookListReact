import RenderBook from "../BookCard/BookCard1";
import React from "react";

export default (props) => {
    let { bookList, smallToBig } = props;
    smallToBig = smallToBig? -1: 1;
    let books = [];
    bookList = bookList.sort((a,b)=>{
        let titleA = a.volumeInfo.title;
        let titleB = b.volumeInfo.title;
        if (titleA < titleB) {
            return 1*smallToBig;
        }
        if (titleA > titleB) {
            return -1*smallToBig;
        }
        // names must be equal
        return 0;
    });
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