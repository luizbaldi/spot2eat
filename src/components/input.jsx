import React from 'react';

/*
 * Component
 */
const Input = ({type, placeholder, onChange, name}) => {
	return (
		<input type={type}
			placeholder={placeholder}
			onChange={onChange}
			name={name} />
	);
};

Input.Types = {
	TEXT: 'text',
	PASSWORD: 'password',
	EMAIL: 'email'
};

export default Input;