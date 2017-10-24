import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class Rectangle extends Component {
    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        onClick: PropTypes.func
    }

    render() {
        const {id, ...other} = this.props;
 
        return (
            <rect data-id={id} className={styles.Rectangle} {...other} />
        );
    }
}

export default Rectangle;
