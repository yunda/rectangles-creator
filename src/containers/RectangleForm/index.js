import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styles from './styles.css';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';

@firebaseConnect()
@connect(
    state => ({
        auth: state.firebase.auth,
        selectedRectangle: state.rects.selectedRectangle
    })
)
class RectangleForm extends Component {
    static propTypes = {
        firebase: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        onRequestClose: PropTypes.func,
        selectedRectangle: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            x: PropTypes.number,
            y: PropTypes.number
        }),
        totalWidth: PropTypes.number
    }

    state = {
        width: '',
        height: '',
        x: '',
        y: ''
    }

    componentWillMount() {
        const {selectedRectangle} = this.props;

        if (!!selectedRectangle) {
            const {id, ...other} = selectedRectangle;
            this.setState(other);
        }
    }

    componentWillReceiveProps({selectedRectangle}) {
        if (this.props.selectedRectangle !== selectedRectangle) {
            this.setState({
                width: get(selectedRectangle, 'width', ''),
                height: get(selectedRectangle, 'height', ''),
                x: get(selectedRectangle, 'x', ''),
                y: get(selectedRectangle, 'y', '')
            });
        }
    }

    clearForm() {
        this.setState({
            width: '',
            height: '',
            x: '',
            y: ''
        });
    }

    handleChange = ({target}) => {
        const name = target.getAttribute('name');
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        const { auth, selectedRectangle, onRequestClose } = this.props;
        const body = mapValues({...this.state}, val => val - 0)
        
        e.preventDefault();

        if (!selectedRectangle) {
            this.props.firebase.push(`/users/${auth.uid}/rectangles`, body);
        } else {
            this.props.firebase.update(`/users/${auth.uid}/rectangles/${selectedRectangle.id}`, body);
        }

        onRequestClose();
        this.clearForm();
    }

    remove = () => {
        const { auth, selectedRectangle, onRequestClose } = this.props;

        this.props.firebase.remove(`/users/${auth.uid}/rectangles/${selectedRectangle.id}`);

        onRequestClose();
    }
    
    renderActions() {
        const {selectedRectangle, onRequestClose} = this.props;
        
        return (
            <div className={styles.actionsBar}>
                <Button
                    onClick={this.handleSubmit}
                    disabled={!this.isWidthValid()}
                    color="primary">
                    {!!selectedRectangle ? 'Save' : 'Create'}
                </Button>
                {!!selectedRectangle && <Button onClick={this.remove}>Remove</Button>}
                <Button onClick={onRequestClose}>Cancel</Button>
            </div>
        );
    }

    isWidthValid() {
        const {totalWidth, selectedRectangle} = this.props;
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const totalExcludindSelected = selectedRectangle ? totalWidth - selectedRectangle.width : totalWidth;

        return (totalExcludindSelected + (this.state.width - 0)) < viewportWidth;
    }

    render() {
        const {width, height, x, y} = this.state;

        return (
            <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}>
                <fieldset className={styles.fieldset}>
                    <Typography className={styles.legend} type="body2" component="legend">Size</Typography>
                    <FormControl className={styles.formControl} error={!this.isWidthValid()}>
                        <InputLabel htmlFor="width">Width</InputLabel>
                        <Input id="width" name="width" value={width} type="number" min="0" />
                        {!this.isWidthValid() && <FormHelperText>Total width must be less than viewport width.</FormHelperText>}
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="height">Height</InputLabel>
                        <Input id="height" name="height" value={height} type="number" min="0" />
                    </FormControl>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <Typography className={styles.legend} type="body2" component="legend">Position</Typography>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="x">X</InputLabel>
                        <Input id="x" name="x" value={x} type="number" min="0" />
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="y">Y</InputLabel>
                        <Input id="y" name="y" value={y} type="number" min="0" />
                    </FormControl>
                </fieldset>
                {this.renderActions()}
            </form>
        );
    }
}

export default RectangleForm;
