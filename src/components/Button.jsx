import React from 'react';
import colors from '../util/colors';

const Button = ({label, onClick, style}) => {
    return (
        <button style={Object.assign(baseStyle, style)} onClick={onClick} type="button">{label}</button>
    );
};

/* Style */
const baseStyle = {
    background: colors.button,
    border: 'none',
    borderRadius: '22px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, .5)',
    color: 'white',
    height: '44px',
    fontSize: '16px',
    padding: '0 22px',
    width: '100%'
};

export default Button;