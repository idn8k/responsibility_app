import React from "react";
import styled from "styled-components";

import Image from "next/image";

import { IoIosCloseCircle } from "react-icons/io";

const ImageWrapper = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

const StyledName = styled.span`
  font-size: 42px;
  font-weight: bold;
  color: #ff3566;
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
  color: #ff3566;
  height: 1.6rem;
  width: 1.6rem;
  padding: 0;
`;

export default function ChildCard({ child, onDelete, openModal }) {
  const { name, imgUrl } = child;

  return (
    <>
      <ImageWrapper>
        <Image
          width="120"
          height="120"
          src={imgUrl}
          alt="Child image"
          priority
        />
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
