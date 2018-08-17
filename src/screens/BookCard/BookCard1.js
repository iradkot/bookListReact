import React, {Component} from 'react';
//styling and components
import CardView from './CardView';
import './BookCard1.css';

//material ui imports

//react-redux
import {connect} from 'react-redux';
import {addBook, editBook, deleteBook} from '../../state-manager/actions'
import {authorsArrToString, isEmpty} from "../../generalFuncs/generalFuncs";

// import TodoList from '../components/TodoList'


class BookCard1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appLoaded: false,
            modalIsOpen: false,
            fieldsValidation: {
                title: false,
                authors: false,
                publishedDate: false
            },
            title: '',
            authors: '',
            publishedDate: ''
        }
        ;

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthors = this.onChangeAuthors.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    componentDidMount() {
        this.setState({appLoaded: true});
        this.setUpBook();
    }

    // I use this func to handle the single form I've got once user pressed on edit
    setUpBook() {
        let {title, authors, publishedDate} = this.props;
        this.setState({
            title,
            authors,
            publishedDate
        });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    edit() {
        let { fieldsValidation, title, authors, publishedDate } = this.state;
        for (let item in this.state.fieldsValidation) {
            if (fieldsValidation[item]) {
                return false;
            }
        }
        //check if to update field
        let updatedFieldsObj ={};
        let shouldUpdate = false;
        if(title !== this.props.title){
            updatedFieldsObj.title = title;
            shouldUpdate = true;
        }
        if(authorsArrToString(authors) !== authorsArrToString(this.props.authors)){
            updatedFieldsObj.authors = authors;
            shouldUpdate = true;
        }
        if(publishedDate !== this.props.publishedDate){
            updatedFieldsObj.publishedDate = authors;
            shouldUpdate = true;
        }
        if(shouldUpdate) {
            let {id} = this.props;
            this.props.editBook(id, updatedFieldsObj);
        }
        // if(title!==this.props.)
        // this.openModal();
    }

    delete() {
        let {id} = this.props;
        this.props.deleteBook(id);
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onChangeTitle(event) {
        let title = event.target.value;
        this.setState({title}, () => {
            this.validateField('title');
        });
    };
    onChangeAuthors(event) {
        let authors = event.target.value;
        this.setState({authors}, () => {
            this.validateField('authors');
        });
    };
    onChangeDate(event) {
        let publishedDate = event.target.value;
        this.setState({publishedDate}, () => {
            this.validateField('publishedDate');
        });
    };

    //happneds on blur
    validateField(field) {
        let {title, authors, publishedDate, fieldsValidation} = this.state;
        switch (field) {
            case 'title':
                if (title.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                }
                else {
                    fieldsValidation[field] = false;
                }
                break;
            case 'authors':
                if (authors.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                }
                else {
                    fieldsValidation[field] = false;
                }
                break;
            case 'publishedDate':
                if (publishedDate.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                }
                else {
                    fieldsValidation[field] = false;
                }
        }
        this.setState({fieldsValidation});
    }



    render() {
        let {appLoaded, title, authors, publishedDate, fieldsValidation} = this.state;
        let authorsToStr = authorsArrToString(authors);
        return (
            <CardView
                {...this.props}
                fieldsValidation={fieldsValidation}
                authors={authorsToStr}
                titleEdit={title}
                authorsEdit={authors}
                dateEdit={publishedDate}
                appLoaded={appLoaded}
                modalIsOpen={this.state.modalIsOpen}
                afterOpenModal={this.afterOpenModal}
                closeModal={this.closeModal}
                openModal={this.openModal}
                edit={this.edit}
                delete={this.delete}
                validateField={this.validateField}
                onChangeTitle={this.onChangeTitle}
                onChangeAuthors={this.onChangeAuthors}
                onChangeDate={this.onChangeDate}
            />
        )
    }
}

const mapStateToProps = state => ({
    bookList: state.bookList
});

const mapDispatchToProps = dispatch => ({
    addBook: (id, title, images) => dispatch(addBook((id, title, images))),
    deleteBook: (id) => dispatch(deleteBook(id)),
    editBook: (id, fields) => dispatch(editBook(id, fields)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookCard1)

