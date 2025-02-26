import useSWR from "swr";
import ChildCard from "@/components/ChildCard";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  width: 80%;
  min-height: 150px;
  padding: 10px;
  overflow: hidden;
  text-decoration: none;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

export default function HomePage() {
  const router = useRouter();
  const { data: childrenData, isLoading } = useSWR("/api/children_items", {
    fallbackData: [],
  });

  if (isLoading) return <Spinner />;

  if (childrenData.length === 0) {
    router.push("/addChildPage");
  }
  //-- earlier ver is commented out for a later ref!

  // return (
  //   <>
  //     {childrenData?.map((child) => (
  //       <ChildCard key={child._id} child={child} />
  //     ))}
  //   </>
  // );

  return (
    <>
      {childrenData?.map((child) => (
        <StyledLink href={`/${child._id}`} key={child._id}>
          <ChildCard child={child} />
        </StyledLink>
      ))}
    </>
  );
}
