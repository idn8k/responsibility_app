import React from 'react';
import styled from 'styled-components';

import Image from 'next/image';

const ImageWrapper = styled.div`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

const StyledName = styled.span`
  font-size: 42px;
  color: var(--primary-color);
  text-align: left;
  width: 50%;
`;

export default function ChildCard({ child }) {
  const { name, imgUrl } = child;

  return (
    <>
      <ImageWrapper>
        <Image width="120" height="120" src={imgUrl} alt="Child image" priority />
      </ImageWrapper>

      <StyledName>{name.charAt(0).toUpperCase() + name.slice(1)}</StyledName>
    </>
  );
}
