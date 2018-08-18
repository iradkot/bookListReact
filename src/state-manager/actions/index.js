
export const setBooks = (bookList = []) => ({
    type: "SET_BOOKS",
    bookList
})

export const addBook = (id, title, authors, publishedDate, images) => ({
    type: 'ADD_Book',
    id: id,
    title,
    images
});

export const deleteBook = id => {
    return({
        type: 'DELETE_BOOK',
        id
    })
};

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const editBook = (id, fields) => ({
    type: 'EDIT_BOOK',
    id,
    fields
});

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}