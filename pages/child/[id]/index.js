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

//!! Child slug !!//

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;

  img {
    object-fit: cover;
  }
`;
const StyledPageHeader = styled.div`
  position: fixed;
  z-index: 99;
  background: #fff;
  top: 80px;
  height: 100px;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  margin: 0;
  font-size: 28px;
  color: #ff3566;
  box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.1);
`;
const StyledHeader = styled.h2`
  display: inline-block;
  background: #fff;
  text-align: center;
  font-size: 28px;
  color: #ff3566;
`;

export default function ChildPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: child, isLoading } = useSWR(`/api/children_items/${id}`);

  if (isLoading) return <Spinner />;
  if (!child) return;

  return (
    <StyledContainer>
      <StyledPageHeader>
        <ImageWrapper>
          <Image priority fill src={child.imgUrl} alt="Child image" />
        </ImageWrapper>
        <StyledHeader>Tasks</StyledHeader>
      </StyledPageHeader>
      {/* <StyledUl>
        {tasksData?.map((task) => (
          <TaskCard
            key={task._id}
            toggleComplete={handleCompleteTask}
            task={task}
          />
        ))}
      </StyledUl> */}
    </StyledContainer>
  );
}
