import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddBookIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/SortByAlphaTwoTone';

const styles = theme => ({
    root: {
        width: 250,
        marginBottom: theme.spacing.unit * 4,
        backgroundColor: "rgba(0,0,0,.78)",
        borderRadius: 10,
        borderWidth: 150,
        borderColor: '#000000',

    },
    icon: {
        paddingBottom: 4,
        // margin: theme.spacing.unit * 2,
    },
    iconHover: {
        '&:hover': {
            // color: 'green',
            padding: 0.5
        },
    },
    label: {
        color: '#ffffff',
        fontSize: '23px',
    },
});

class BottomNavigationComponent extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        console.log('value',value);
        this.setState({ value });
    };

    render() {
        const { classes, toggleFilter, smallToBig, addBook} = this.props;
        let aZ = smallToBig? 'a-z': 'z-a';
        const { value } = this.state;

        return (
            <BottomNavigation
                // value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction onClick={addBook} className={classes.label} label="Add Book" icon={<AddBookIcon className={classes.iconHover}/>} />
                <BottomNavigationAction onClick={toggleFilter} className={classes.label} label={`Sorted by Title ${aZ}`} icon={<FavoriteIcon className={classes.iconHover}/>} />
            </BottomNavigation>
        );
    }
}

BottomNavigationComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavigationComponent);