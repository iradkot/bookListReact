import React, {Component} from 'react';
//styling and components
import CardView from './CardView';
import './BookCard1.css';

//material ui imports

import Modal from 'react-modal';
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
        console.log('this state', this.state);

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    edit(fields) {
        if (!isEmpty(this.state.fieldsValidation)) {
            console.log("editting fields:", fields)
        }
        // this.openModal();
    }

    delete() {
        this.props.deleteBook(this.props.id);
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
            />
        )
    }
}

const mapStateToProps = state => ({
    bookList: state.bookList
})

const mapDispatchToProps = dispatch => ({
    addBook: (id, title, images) => dispatch(addBook((id, title, images))),
    deleteBook: (id) => dispatch(deleteBook(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookCard1)

