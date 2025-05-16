import { useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: #3bd6f9;
  z-index: 999;

  position: absolute;
  top: 5px;
  left: 0;
`;

export default function Badge() {

  const [isActive, setIsActive] = useState(false);

  function showBadge() {
    setIsActive((isActive) => !isActive);
  }
  return <>{isActive && <StyledDiv />}</>;
}
