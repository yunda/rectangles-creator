// Actions
const SET_SELECTED_RECTANGLE = 'SET_SELECTED_RECTANGLE';
const CLEAR_SELECTED_RECTANGLE = 'CLEAR_SELECTED_RECTANGLE';

// Reducer
export default function reducer(state = {}, action = {}) {
    const nextState = Object.assign({}, state);
    
    switch (action.type) {
        case SET_SELECTED_RECTANGLE:
            nextState.selectedRectangle = action.rectangle;
            return nextState;
        case CLEAR_SELECTED_RECTANGLE:
            nextState.selectedRectangle = null;
            return nextState;
        default: return state;
    }
}

// Action Creators
export function setSelectedRectangle(rectangle) {
     return { type: SET_SELECTED_RECTANGLE, rectangle };
}

export function clearSelectedRectangle() {
    return { type: CLEAR_SELECTED_RECTANGLE };
}
