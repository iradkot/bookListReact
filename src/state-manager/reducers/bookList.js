
let count = 1;

const bookList = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKS':
        return action.bookList;
      case 'ADD_Book':
          console.log('action:', action);
          count+=1;
          action.book.id += count;
          state.push(action.book);
          console.log('state:', state);
        return [
          ...state,

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