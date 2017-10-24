import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class TopBar extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onLogoutClick: PropTypes.func,
        onNewClick: PropTypes.func,
        newButtonDisabled: PropTypes.bool
    }

    render() {
        const {name, onLogoutClick, onNewClicked, newButtonDisabled} = this.props;

        return (
            <div className={styles.TopBar}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Button
                            raised
                            color="primary"
                            onClick={onNewClicked}
                            disabled={newButtonDisabled}>
                            New rectangle
                        </Button>
                        <Typography align="right" color="inherit" className={styles.name}>
                            {name}
                        </Typography>
                        <Button onClick={onLogoutClick}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default TopBar;
