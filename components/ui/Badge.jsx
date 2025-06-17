import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: #3bd6f9;
  z-index: 1;

  position: absolute;
  top: 5px;
  right: 5px;
`;

export default function Badge({ incompleteTasks }) {
  return <>{incompleteTasks && <StyledDiv />}</>;
}
