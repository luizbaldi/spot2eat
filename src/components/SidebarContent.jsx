import React from 'react';

/* Libs */
import styled from 'styled-components';

const SidebarContent = ({ onManageSpotsClick, onLogoutClick, onSelectPlaceClick }) => {
  return (
    <Menu>
      <Item>spot2eat ®</Item>
      <hr />
      <ul>
        <Item onClick={onSelectPlaceClick}>Escolher local</Item>
        <Item onClick={onManageSpotsClick}>Gerenciar restaurantes</Item>
        <Item onClick={onLogoutClick}>Logout</Item>
      </ul>
    </Menu>
  );
};

/* Styled Components */
const Menu = styled.div`
  height: 100%;
  padding: 10px 40px;
  color: white;
  list-style: none;
  background-color: rgba(162, 50, 59, 0.8);
`;

const Item = styled.li`
  padding: 10px 0;
`;

export default SidebarContent;
