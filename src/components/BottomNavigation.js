import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// width: 500px;
// border-radius: 5px;
// margin-bottom: 5px;
// background: #fafafa;
// border-color: black;
// border-width: 11px;

const styles = {
    root: {
        width: 500,
        marginBottom: 5,
        backgroundColor: 'linear-gradient(to right bottom, #430089, #82ffa1)',
        borderRadius: 5,
        borderColor: '#000000',

    },
};

class BottomNavigationComponent extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
        );
    }
}

BottomNavigationComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavigationComponent);