import ChildCard from "@/components/ChildCard";
import Spinner from "@/components/Spinner";
import useSWR from "swr";

export default function HomePage() {
  const { data: childrenData, isLoading } = useSWR("/api/children_items", {
    fallbackData: [],
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        childrenData.map((child) => <ChildCard key={child.id} child={child} />)
      )}
    </div>
  );
}
