import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import * as Actions from '../../store/ducks/rectangles';
import Spinner from '../../components/Spinner';
import Rectangle from '../../components/Rectangle';
import get from 'lodash/get';
import maxBy from 'lodash/maxBy';
import styles from './styles.css';
import DataUtils from '../../utils/DataUtils';

@firebaseConnect(
    (props, firebase) => [`users/${firebase._.authUid}/rectangles`]
)
@connect(
    state => ({
        rectangles: get(state.firebase.data, `users.${state.firebase.auth.uid}.rectangles`),
        dispatch: state.dispatch
    })
)
class RectanglesScene extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(Actions, props.dispatch);
    }

    onRectClick = (e) => {
        const id = e.target.getAttribute('data-id');
        const slectedRect = this.props.rectangles[id];

        this.actions.setSelectedRectangle({...slectedRect, id });
    }

    renderRectangles(rectanglesArr) {
        const rectangleElems = rectanglesArr.map((item) =>{
            return <Rectangle key={`rect-${item.id}`} onClick={this.onRectClick} {...item} />;
        });
        const maxByX = maxBy(rectanglesArr, 'x');
        const maxByY = maxBy(rectanglesArr, 'y');
        const maxByWidth = maxBy(rectanglesArr, 'width');
        const maxByHeight = maxBy(rectanglesArr, 'height');
        const svgAttrs = {
            className: styles.svg,
            width: Math.max(maxByX.x + maxByX.width, maxByWidth.x + maxByWidth.width),
            height: Math.max(maxByY.y + maxByY.height, maxByHeight.y + maxByHeight.height)
        };

        return (
            <svg {...svgAttrs}>
                {rectangleElems}
            </svg>
        );
    }

    render() {
        const {rectangles} = this.props;

        if (!isLoaded(rectangles)) {
            return <Spinner />;
        }

        const rectanglesArr = DataUtils.dbDataToArray(rectangles || {});

        return (
            <div className={styles.RectanglesScene}>
                {isEmpty(rectanglesArr) ? <span>No rectangles</span> : this.renderRectangles(rectanglesArr)}
            </div>
        );
    }
}

export default RectanglesScene;
