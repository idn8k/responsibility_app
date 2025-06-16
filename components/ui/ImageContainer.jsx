import styled from 'styled-components';

const ImageWrapper = styled.div`
  height: 120px;
  position: relative;

  img {
    object-fit: cover;
  }
`;

export default function ImageContainer({ children }) {
  return <ImageWrapper>{children}</ImageWrapper>;
}
