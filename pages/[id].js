//!! UNDONE !!//
import ChildCard from "@/components/ChildCard";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Child() {
  const { router } = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: child, isLoading, error } = useSWR(`/api/children_items/${id}`);

  if ((!isReady, isLoading)) return <Spinner />;

  async function deleteChild() {
    const response = await fetch(`/api/children_items/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      return;
    }
    console.error("Failed to delete child item...");
  }
  return <ChildCard />;
}
