import React, { useEffect } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { IoIosCloseCircle } from 'react-icons/io';

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
  /* font-weight: bold; */
  color: var(--primary-color);
  text-align: left;
  width: 50%;
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 14px;
  top: 14px;

  background: transparent;
  border: none;
  border-radius: 100%;
  color: var(--primary-color);
  height: 1.6rem;
  width: 1.6rem;
  padding: 0;

  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover,
  &:active {
    background-color: var(--primary-color);
    color: white;
  }
`;

export default function ChildCard({ child, openModal }) {
  const { name, imgUrl } = child;

  return (
    <>
      <ImageWrapper>
        <Image width="120" height="120" src={imgUrl} alt="Child image" priority />
      </ImageWrapper>

      <StyledName>{name.charAt(0).toUpperCase() + name.slice(1)}</StyledName>

      <StyledBtn
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          openModal(child._id);
        }}
      >
        <IoIosCloseCircle size="2rem" />
      </StyledBtn>
    </>
  );
}
