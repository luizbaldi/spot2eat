import React from 'react';
import colors from '../util/colors';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, halfWidth}) => {
  return (
    <StyledButton onClick={onClick} type="button" halfWidth={halfWidth}>{label}</StyledButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  halfWidth: PropTypes.bool
};

const StyledButton = styled.button`
  background: ${colors.button};
  border: none;
  border-radius: 22px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
  color: #fafafa;
  height: 44px;
  font-size: 16px;
  padding: 0 22px;
  width: ${props => props.halfWidth ? '48%' : '100%'};
  margin: ${props => props.halfWidth ? '0 1%' : '0'};
`;

export default Button;
