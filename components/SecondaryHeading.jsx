import styled from 'styled-components';

const StyledSecondaryHeader = styled.h2`
  display: block;
  background-color: #fff;
  /* background-color: lightcoral; */
  color: var(--primary-color);
  margin-bottom: 12px;
  width: 90%;
  box-shadow: inset 0px -1px 0px 1px rgba(0, 0, 0, 0.3);
`;
export default function SecondaryHeader({ children }) {
  return <StyledSecondaryHeader>{children}</StyledSecondaryHeader>;
}
