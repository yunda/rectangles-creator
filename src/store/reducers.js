import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import rectangles from './ducks/rectangles';

const rootReducer = combineReducers({ firebase, rects: rectangles });

export default rootReducer;
