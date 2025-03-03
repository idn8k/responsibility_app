//-- Tasks Slug --//

import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/router";

const StyledTasksContainer = styled.div`
  background: lightblue;
`;

export default function Task() {
  const router = useRouter();
  const { id } = router.query;

  const { data: task, isLoading } = useSwr(`/api/tasks_items/${id}`);

  if (isLoading) return <Spinner />;
  if (!task) return;

  return (
    <StyledTasksContainer>
      <h3>{id}</h3>
    </StyledTasksContainer>
  );
}
