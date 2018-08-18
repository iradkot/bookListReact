import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';


import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
//general funcs:
import {authorsArrToString} from '../../generalFuncs/generalFuncs';
import {checkIfValidDate} from "../../generalFuncs/validationFuncs";
import {openSnackbar} from "../../components/Notifier";


class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: '',
            authorsEdit: '',
            publishedDate: '',
            imageEdit: '',
            fieldsValidation: {
                title: false,
                authors: false,
                publishedDate: false,
                image: false
            }
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthors = this.onChangeAuthors.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.addBook = this.addBook.bind(this);

    }

    addBook() {
        let {fieldsValidation, titleEdit, authorsEdit, publishedDate, imageEdit} = this.state;
        this.validateField('title');
        this.validateField('authors');
        this.validateField('publishedDate');
        this.validateField('image');
        let shouldAddBook = true;
        for (let item in fieldsValidation) {
            if (fieldsValidation[item]) {
                shouldAddBook = false;
            }
        }
        if(shouldAddBook){
            this.props.addBook(titleEdit, authorsEdit, publishedDate, imageEdit);
            this.props.closeModal();
            openSnackbar({message: `Successfully added book: ${titleEdit} `});
        }

    }

    checkTitleUnique(title) {
        let {bookList} = this.props;
        for (let i = 0; i < bookList.length; i++) {
            if(title === bookList[i].volumeInfo.title){
                return false;
            }
            // if(bookList[i])
        }
        return true;
    }

    onChangeTitle(event) {
        let title = event.target.value;
        this.setState({titleEdit: title}, () => {
            this.validateField('title');
        });
    };

    onChangeAuthors(event) {
        let authors = event.target.value;
        this.setState({authorsEdit: authors}, () => {
            this.validateField('authors');
        });
    };

    onChangeDate(event) {
        let publishedDate = event.target.value;
        this.setState({publishedDate}, () => {
            this.validateField('publishedDate');
        });
    };

    onChangeImage(event) {
        let image = event.target.value;
        this.setState({imageEdit: image}, () => {
            this.validateField('image');
        });
    };


    //happneds on blur
    validateField(field) {
        let {authorsEdit, titleEdit, fieldsValidation, publishedDate, imageEdit} = this.state;
        switch (field) {
            case 'title':
                if (titleEdit.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                }
                else if (!this.checkTitleUnique(titleEdit)) {
                    fieldsValidation[field] = 'Title exists';
                }
                else {
                    fieldsValidation[field] = false;
                }
                break;
            case 'authors':
                if (authorsEdit.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                }
                else {
                    fieldsValidation[field] = false;
                }
                break;
            case 'publishedDate':
                if (publishedDate.length <= 0) {
                    fieldsValidation[field] = 'This field cannot be empty';
                    break;
                }
                else if (!checkIfValidDate(new Date(publishedDate))) {
                    fieldsValidation[field] = 'Please fill in a valid Date';
                    break;
                }
                else {
                    fieldsValidation[field] = false;
                }
                break;
            case 'image':
                fieldsValidation[field] = false;
        }
        this.setState({fieldsValidation});
    }


    render() {
        const {classes, closeModal} = this.props;
        const {authorsEdit, titleEdit, fieldsValidation, publishedDate, imageEdit} = this.state;
        checkIfValidDate(new Date(publishedDate));
        let titleError = fieldsValidation['title'],
            authorsErr = fieldsValidation['authors'],
            publishedDateErr = fieldsValidation['publishedDate'],
            imageEditErr = fieldsValidation['image'];
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <EditIcon/>
                        </Avatar>
                        <Typography variant="headline">Add book</Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="title"
                                    label="Book Title"
                                    type="text"
                                    defaultValue={titleEdit}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChangeTitle}
                                    onBlur={() => this.validateField('title')}
                                    error={titleError ? true : false}
                                    helperText={titleError ? titleError : ''}


                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="authors"
                                    label="Authors name display"
                                    type="text"
                                    defaultValue={authorsEdit}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChangeAuthors}
                                    onBlur={() => this.validateField('authors')}
                                    error={authorsErr ? true : false}
                                    helperText={authorsErr ? authorsErr : ''}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="publishedDate"
                                    label="Published Date"
                                    type="text"
                                    defaultValue={publishedDate}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChangeDate}
                                    onBlur={() => this.validateField('publishedDate')}
                                    error={publishedDateErr ? true : false}
                                    helperText={publishedDateErr ? publishedDateErr : ''}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="image"
                                    label="Image ul"
                                    type="text"
                                    defaultValue={imageEdit}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChangeImage}
                                    onBlur={() => this.validateField('image')}
                                    error={imageEditErr ? true : false}
                                    helperText={imageEditErr ? imageEditErr : ''}
                                />
                            </FormControl>
                            <Button
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                onClick={this.addBook}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="raised"
                                color="default"
                                className={classes.delete}
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}


const styles = theme => ({
    layout: {
        width: 'auto',
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#90C2F1',
    },
    form: {
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    delete: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
    }
});
AddBook.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBook);