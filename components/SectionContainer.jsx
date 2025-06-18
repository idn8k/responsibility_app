import { forwardRef } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 1rem 2rem;
`;
const SectionContainer = forwardRef(({ children }, ref) => {
  return <Container ref={ref}>{children}</Container>;
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
