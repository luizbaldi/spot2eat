import React from 'react';

/* Libs */
import Spinner from 'react-spinkit';
import colors from '../util/colors';

const Loader = () => {
    return (
        <div style={styles.container}>
            <span style={styles.content}>
                <span style={styles.loaderRow}>
                    <Spinner name="pacman" style={styles.loader} />
                </span>
            </span>
        </div>
    );
};

/* Style */
const styles = {
    container: {
        width: '100%',
        height: '100vh',
        backgroundColor: 'transparent',
        textAlign: 'center',
        display: 'table'
    },
    content: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    loaderRow: {
        display: 'inline-block'
    },
    loader: {
        position: 'absolute',
        color: colors.button,
        animation: 'sk-fade-in .3s'
    }
}

export default Loader;