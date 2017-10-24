import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import { firebase as fbConfig } from '../dbconfig';
import * as firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';

firebase.initializeApp(fbConfig);

const devToolsExtensionDefined = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined';
const createStoreWithMiddleware = compose(
    reactReduxFirebase(
        firebase,
        {
            userProfile: 'users',
            enableLogging: false
        }
    ), devToolsExtensionDefined ? window.devToolsExtension() : f => f
)(createStore);

export default createStoreWithMiddleware(rootReducer);
