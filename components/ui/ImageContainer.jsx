import styled from 'styled-components';

const ImageWrapper = styled.div`
  height: 120px;
  position: relative;

  img {
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  //FIX: fix gradient
  /* background: linear-gradient(135 deg, rgb(179, 126, 228) 50%, rgb(255, 255, 255) 100%); */
`;

export default function ImageContainer({ children }) {
  return <ImageWrapper>{children}</ImageWrapper>;
}
