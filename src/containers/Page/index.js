import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import * as Actions from '../../store/ducks/rectangles';
import get from 'lodash/get';
import RectangleForm from '../RectangleForm';
import RectanglesScene from '../RectanglesScene';
import Auth from '../Auth';
import TopBar from '../../components/TopBar';
import Spinner from '../../components/Spinner';
import Paper from 'material-ui/Paper';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import DataUtils from '../../utils/DataUtils';
import styles from './styles.css';

@firebaseConnect(
    (props, firebase) => [`users/${firebase._.authUid}/rectangles`]
)
@connect(
    state => ({
        auth: state.firebase.auth,
        rectangles: get(state.firebase.data, `users.${state.firebase.auth.uid}.rectangles`),
        selectedRectangle: state.rects.selectedRectangle,
        dispatch: state.dispatch
    })
)
class Page extends Component {

    constructor(props) {
        super(props);
        this.actions = bindActionCreators(Actions, props.dispatch);
    }

    state = {
        dialogOpen: false
    };

    logout = () => {
        this.props.firebase.logout();
    };

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleRequestClose = () => {
        this.setState({ dialogOpen: false });
        this.actions.clearSelectedRectangle();
    };

    componentWillReceiveProps({selectedRectangle}) {
        if (this.props.selectedRectangle !== selectedRectangle) {
            this.setState({
                dialogOpen: !!selectedRectangle
            });
        }
    }

    isNewButtonDisabled() {
        const {rectangles} = this.props;

        return !isLoaded(rectangles) || (!isEmpty(rectangles) && DataUtils.dbDataToArray(rectangles).length >= 5);
    }

    renderPage() {
        return (
            <div>
                <TopBar
                    name={this.props.auth.displayName}
                    onLogoutClick={this.logout}
                    onNewClicked={this.handleClickOpen}
                    newButtonDisabled={this.isNewButtonDisabled()} />
                <Dialog
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{this.props.selectedRectangle ? 'Edit' : 'New'} rectangle</DialogTitle>
                    <DialogContent>
                        <RectangleForm
                            onRequestClose={this.handleRequestClose}
                            totalWidth={DataUtils.getTotalWidth(this.props.rectangles || {})} />
                    </DialogContent>
                </Dialog>
                <Paper>
                    <RectanglesScene />
                </Paper>
            </div>
        );
    }

    render() {
        const {auth} = this.props;

        return (
            <div className={styles.page}>
                {!isLoaded(auth) ? <Spinner /> : isEmpty(auth) ? <Auth /> : this.renderPage() }
            </div>
        );
    }
}

export default Page;
