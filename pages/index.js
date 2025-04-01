import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';

import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const router = useRouter();
  const { data: childrenData, isLoading: isLoadingChildren } = useSWR('/api/children_items', {
    fallbackData: [],
  });

  console.log(session);

  if (isLoadingChildren) return <Spinner />;

  if (childrenData.length === 0) {
    router.push('/addChildPage');
  }

  if (!session) router.push('/loginPage');
  return (
    <>
      {childrenData?.map((child) => (
        <StyledLink href={`/children/${child._id}`} key={child._id}>
          <ChildCard child={child} />
        </StyledLink>
      ))}
    </>
  );
}
