import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import ModalDelete from '@/components/ui/ModalDelete';

import Link from 'next/link';
import { useState } from 'react';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 50vh;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  img {
    object-fit: cover;
  }
`;

const StyledParagraph = styled.h2`
  color: var(--primary-color);
  margin: 0;
`;

const StyledHeading = styled.p`
  color: var(--primary-color);
`;

const StyledBday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledName = styled.span`
  font-size: 42px;
  /* font-weight: bold; */
  color: var(--primary-color);
  width: 50%;
  text-align: center;
`;

// - SLUG -//

export default function Child() {
  const router = useRouter();
  const { id } = router.query;

  const [childId, setChildId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: child, isLoading } = useSWR(`/api/child_items/${id}`);

  function openModal(id) {
    setChildId(id);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/child_items/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return;
    }
    router.push('/');
  }

  if (isLoading) return <Spinner />;
  if (!child) return;

  return (
    <StyledContainer>
      <ImageWrapper>
        <Image
          style={{ objectFit: 'cover' }}
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          fill
          src={child.imgUrl}
          alt="Child image"
        />
      </ImageWrapper>
      <StyledName>{child.name.charAt(0).toUpperCase() + child.name.slice(1)}</StyledName>
      <StyledBday>
        <StyledHeading>Date of Birth</StyledHeading>
        <StyledParagraph>
          {new Intl.DateTimeFormat('de-DE').format(new Date(child.birth_date))}
        </StyledParagraph>
      </StyledBday>
      <Link href={`/child/${id}/editChild`}>
        <FaRegEdit size="2rem" color="ff3566" />
      </Link>
      <button
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          openModal(child._id);
        }}
      >
        <AiOutlineDelete size="2rem" color="ff3566" />
      </button>

      <ModalDelete
        onDelete={handleDelete}
        closeModal={closeModal}
        childId={childId}
        isOpen={isModalOpen}
      />
    </StyledContainer>
  );
}
