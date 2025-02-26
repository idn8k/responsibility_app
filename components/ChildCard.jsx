import React from "react";
import styled from "styled-components";

import Image from "next/image";

import { IoIosCloseCircle } from "react-icons/io";
import { mutate } from "swr";

const ImageWrapper = styled.div`
  width: 35%;
  height: 90%;
  overflow: hidden;
  position: relative;
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

export default function ChildCard({ child }) {
  const { name, imgUrl } = child;

  async function handleDelete(id) {
    const response = await fetch(`/api/children_item/${child._id}`, {
      method: "DELETE",
    });

    console.log("click");

    if (!response.ok) {
      console.log(response.status);
      return;
    }
    mutate();
  }

  return (
    <>
      <ImageWrapper>
        <Image priority fill src={imgUrl} alt="child image" />
      </ImageWrapper>
      <StyledName>{name.charAt(0).toUpperCase() + name.slice(1)}</StyledName>
      <StyledBtn onClick={() => handleDelete(child._id)}>
        <IoIosCloseCircle size="2rem" />
      </StyledBtn>
    </>
  );
}
