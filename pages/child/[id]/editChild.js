import ChildForm from '@/components/ChildForm';
import Spinner from '@/components/ui/Spinner';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function EditChild() {
  const router = useRouter();
  const { id } = router.query;
  const { data: child, isLoading } = useSWR(`/api/child_items/${id}`);

  async function handleEditChild(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const childData = Object.fromEntries(formData);

    const response = await fetch(`/api/child_items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(childData),
    });
    if (!response.ok) {
      console.error('Something went wrong.');
      return;
    }
    router.push('/');
  }

  if (isLoading) return <Spinner />;
  if (!child) return;

  return <ChildForm onEdit={handleEditChild} isEdit child={child} />;
}
