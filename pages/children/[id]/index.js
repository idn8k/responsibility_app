import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

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
  color: #ff3566;
  margin: 0;
`;

const StyledHeading = styled.p`
  color: #ff3566;
`;

const StyledBday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledName = styled.span`
  font-size: 42px;
  font-weight: bold;
  color: #ff3566;
  width: 50%;
  text-align: center;
`;

export default function Child() {
  const router = useRouter();
  const { id } = router.query;
  const { data: child, isLoading } = useSWR(`/api/children_items/${id}`);

  if (!child) return;
  if (isLoading) return <Spinner />;

  return (
    <StyledContainer>
      <ImageWrapper>
        <Image priority fill src={child.imgUrl} alt="Child image" />
      </ImageWrapper>
      <StyledName>
        {child.name.charAt(0).toUpperCase() + child.name.slice(1)}
      </StyledName>
      <StyledBday>
        <StyledHeading>Date of Birth</StyledHeading>
        <StyledParagraph>{child.birth_date}</StyledParagraph>
      </StyledBday>
      <Link href={`/children/${id}/editChild`}>
        <FaRegEdit size="2rem" color="ff3566" />
      </Link>
    </StyledContainer>
  );
}
