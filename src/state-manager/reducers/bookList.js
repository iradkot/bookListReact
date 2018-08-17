const bookList = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKS': 
        return action.bookList;
      case 'ADD_Book':
        return [
          ...state,
          {
            id: action.id,
            title: action.title,
            images: action.images,
          }
        ];
      case 'EDIT_BOOK':
        return state.map(book =>
          (book.id === action.id)
            ? {...book, ...action.fields}
            : book
        );
        case 'DELETE_BOOK':
            return state.filter( (book) => {
                return book.id !== action.id;
            });
      default:
        return state
    }
  };
  export default bookList