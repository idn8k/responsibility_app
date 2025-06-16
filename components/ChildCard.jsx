import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Badge from './ui/Badge';
import Link from 'next/link';
import ImageContainer from './ui/ImageContainer';

const StyledName = styled.p`
  margin-top: 8px;
  text-align: center;
  font-size: 26px;
  color: var(--primary-color);

  //TODO: align name
`;

const StyledLi = styled.li`
  list-style-type: none;
  /* background-color: red; */
  background-color: #fff;
  width: 10rem;
  height: 11rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
`;

export default function ChildCard({ child, tasks }) {
  const { name, imgUrl } = child;
  const incompleteTasks = tasks.some((tasks) => tasks.isCompleted === false);

  return (
    <StyledLi>
      <StyledLink href={`/child/${child._id}`}>
        <ImageContainer>
          <Image fill={true} src={imgUrl} alt="Child image" priority />
        </ImageContainer>
        <Badge incompleteTasks={incompleteTasks} />
        <StyledName>{name.charAt(0).toUpperCase() + name.slice(1)}</StyledName>
      </StyledLink>
    </StyledLi>
  );
}
