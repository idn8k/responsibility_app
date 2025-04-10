import styled from 'styled-components';

import { FaTh, FaWindowClose } from 'react-icons/fa';

const StyledButton = styled.button`
  border: none;
  background-color: white;
  height: 24px;
  width: 24px;
  padding: 0;
`;

function MenuButton({ menuOpen, toggleChildOps }) {
  return (
    <StyledButton onClick={toggleChildOps}>
      {menuOpen ? (
        <FaWindowClose size="1.6rem" color="#FC777E" />
      ) : (
        <FaTh size="1.5rem" color="#FC777E" />
      )}
    </StyledButton>
  );
}

export default MenuButton;
