import useSWR from "swr";

import MainContainer from "@/components/MainContainer";
import Header from "@/components/Header";
import ChildCard from "@/components/ChildCard";
import Spinner from "@/components/ui/Spinner";
import AddChild from "@/components/ui/AddChild";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const { data: childrenData, isLoading } = useSWR("/api/children_items", {
    fallbackData: [],
  });

  if (isLoading) return <Spinner />;

  return (
    <MainContainer>
      <Header />
      {!childrenData.length ? (
        <AddChild />
      ) : (
        childrenData.map((child) => <ChildCard key={child._id} child={child} />)
      )}
      <Navbar />
    </MainContainer>
  );
}
