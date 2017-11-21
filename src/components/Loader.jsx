import React from 'react';

/* Libs */
import { PacmanLoader } from 'halogen';

const Loader = () => {
    return (
        <div style={styles.container}>
            <span style={styles.content}>
                <span style={styles.loader}>
                    <PacmanLoader />
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
    loader: {
        display: 'inline-block'
    }
}

export default Loader;