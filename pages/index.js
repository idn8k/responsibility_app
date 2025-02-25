import useSWR from "swr";
import ChildCard from "@/components/ChildCard";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const { data: childrenData, isLoading } = useSWR("/api/children_items", {
    fallbackData: [],
  });

  if (isLoading) return <Spinner />;

  if (childrenData.length === 0) {
    router.push("/addChildPage");
  }

  return (
    <>
      {childrenData?.map((child) => (
        <ChildCard key={child._id} child={child} />
      ))}
    </>
  );
}
