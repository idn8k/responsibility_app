import ChildCard from "@/components/ChildCard";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import styled from "styled-components";
import useSWR from "swr";
import MainContainer from "@/components/MainContainer";

export default function HomePage() {
  const { data: childrenData, isLoading } = useSWR("/api/children_items", {
    fallbackData: [],
  });

  return (
    <>
      <Header />
      <MainContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          childrenData.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))
        )}
      </MainContainer>
      <Navbar />
    </>
  );
}
