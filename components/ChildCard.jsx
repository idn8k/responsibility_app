import Image from "next/image";
import React from "react";
import styled from "styled-components";

const StyledChildCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 80%;
  height: 200px;
  padding: 10px;
  overflow: hidden;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.div`
  width: 40%;
  height: 100%;
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

export default function ChildCard({ child }) {
  const { name, imgUrl } = child;
  console.log("ChildCard ~ imgUrl:", imgUrl);
  return (
    <StyledChildCard>
      <StyledImage>
        <Image src={imgUrl} layout="fill" alt="child image" />
      </StyledImage>
      <StyledName>{name.charAt(0).toUpperCase() + name.slice(1)}</StyledName>
    </StyledChildCard>
  );
}
