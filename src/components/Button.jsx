import React from 'react';
import colors from '../util/colors';

const Button = ({label, onClick, style, halfwidth}) => {
    return (
        <button style={generateStyle(style, halfwidth)} onClick={onClick} type="button">{label}</button>
    );
};

const generateStyle = (style, isHalfWidth) => {
    const baseStyle = {
        background: colors.button,
        border: 'none',
        borderRadius: '22px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, .5)',
        color: 'white',
        height: '44px',
        fontSize: '16px',
        padding: '0 22px',
        width: isHalfWidth ? '48%' : '100%',
        margin: isHalfWidth ? '0 1%' : '0'
    };

    return Object.assign(baseStyle, style);
};

export default Button;