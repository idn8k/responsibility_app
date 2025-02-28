import AddChildForm from "@/components/ChildForm";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

export default function EditChild() {
  const router = useRouter();
  const { id } = router.query;
  const { data: child, isLoading } = useSWR(`/api/children_items/${id}`);

  async function handleEditChild(event, id) {
    event.preventDefault();
    console.log("Edit child");
    const formData = new FormData(event.target);
    const childData = Object.fromEntries(formData);
    console.log(childData);

    const response = await fetch(`/api/children_items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(childData),
    });
    if (response.ok) {
      mutate();
    }
    router.push(`/`);
  }

  if (!child) return;

  if (isLoading) return <Spinner />;

  return <AddChildForm onEdit={handleEditChild} isEdit child={child} />;
}
