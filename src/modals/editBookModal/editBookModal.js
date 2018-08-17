import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
//general funcs:
import {authorsArrToString, googleBooksDatesToString} from'../../generalFuncs/generalFuncs';
import {checkIfValidDate} from "../../generalFuncs/validationFuncs";



function SignIn(props) {
    const { classes } = props;
    const {authorsEdit, titleEdit, onChangeTitle, onChangeAuthors, fieldsValidation, validateField} = props.props;
    checkIfValidDate(props.props.publishedDate);
    let titleError = fieldsValidation['title'],
        authorsErr = fieldsValidation['authors'],
        publishedDateErr = fieldsValidation['publishedDate'];
    console.log('titleError, authorsErr, publishedDateErr',titleError, authorsErr, publishedDateErr)
    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EditIcon />
                    </Avatar>
                    <Typography variant="headline">Edit book</Typography>
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
                                onChange={onChangeTitle}
                                onBlur={()=>validateField('title')}
                                error={titleError}
                                helperText={titleError? titleError : ''}


                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="authors"
                                label="Authors name display"
                                type="text"
                                defaultValue={authorsArrToString(props.props.authorsEdit)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={onChangeAuthors}
                                onBlur={()=>validateField('authors')}
                                error={authorsErr}
                                helperText={authorsErr? authorsErr : ''}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="publishedDate"
                                label="publishedDate"
                                type="text"
                                defaultValue={props.props.dateEdit}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <Button
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                            onClick={props.props.edit}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="raised"
                            color="default"
                            className={classes.delete}
                            onClick={props.props.closeModal}
                        >
                            Cancel
                        </Button>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
}

const styles = theme => ({
    layout: {
        width: 'auto',
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
SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);