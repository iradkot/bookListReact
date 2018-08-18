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
        return state.map(book => {
            if(book.id === action.id){
                return ({...book, volumeInfo: {...book.volumeInfo, ...action.fields}});
            }
            else {
                return book
            }
        }
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