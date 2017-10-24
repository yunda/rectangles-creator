import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import styles from './styles.css';

@firebaseConnect()
@connect(
    state => ({
        authError: state.firebase.authError
    })
)
class Auth extends Component {

    loginWith = (provider) => () => {
        this.props.firebase.login({
            provider,
            type: 'popup'
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div className={styles.Auth}>
                <List className={styles.List} margin='normal'>
                    <ListItem button onClick={this.loginWith('google')}>
                        <ListItemIcon>
                            <img src={require('./images/google.svg')} alt='' />
                        </ListItemIcon>
                        <ListItemText primary="Sign in with Google" />
                    </ListItem>
                    <ListItem button onClick={this.loginWith('facebook')}>
                        <ListItemIcon>
                            <img src={require('./images/facebook.svg')} alt='' />
                        </ListItemIcon>
                        <ListItemText primary="Sign in with Facebook" />
                    </ListItem>
                    <ListItem button onClick={this.loginWith('github')}>
                        <ListItemIcon>
                            <img src={require('./images/github.svg')} alt='' />
                        </ListItemIcon>
                        <ListItemText primary="Sign in with Github" />
                    </ListItem>
                </List>
                {this.props.authError && <Typography color='error'>{this.props.authError.message}</Typography>}
            </div>
        );
    }
}

export default Auth;
