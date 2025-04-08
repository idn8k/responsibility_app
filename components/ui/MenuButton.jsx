import styled from 'styled-components';
import { useState } from 'react';

import { FaTh, FaWindowClose } from 'react-icons/fa';

const StyledButton = styled.button`
  border: none;
  background: none;
  height: 50px;
  width: 50px;
  padding: 0;
`;

function MenuButton({ modalOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleOpen() {
    setMenuOpen(!menuOpen);
    modalOpen((state) => (state = !state));
  }

  return (
    <StyledButton onClick={handleOpen}>
      {menuOpen ? (
        <FaWindowClose size="1.5rem" color="ff3566" />
      ) : (
        <FaTh size="1.5rem" color="ff3566" />
      )}
    </StyledButton>
  );
}

export default MenuButton;
