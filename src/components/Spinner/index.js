import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import styles from './styles.css';

export default function Spinner() {
    return (
        <div className={styles.Spinner}>
            <CircularProgress />
        </div>
    );
}
