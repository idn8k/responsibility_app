import styled from 'styled-components';

const Container = styled.section`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 1rem 2rem;

  /* background-color: yellow; */
`;
export default function SectionContainer({ children }) {
  return <Container>{children}</Container>;
}
