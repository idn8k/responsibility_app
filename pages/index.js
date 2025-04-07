import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ChildCard from '@/components/ChildCard';
import Spinner from '@/components/ui/Spinner';

import { useSession } from 'next-auth/react';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 100px 0 100px 0;
  width: 100%;
  padding: 0 0 100px 0;
`;

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
  const { data: childrenData, isLoading: isLoadingChildren } = useSWR('/api/child_items', {
    fallbackData: [],
  });

  if (isLoadingChildren) return <Spinner />;

  if (childrenData.length === 0) {
    router.push('/addChildPage');
  }

  if (!session) router.push('/loginPage');
  return (
    <StyledUl>
      {childrenData?.map((child) => (
        <StyledLink href={`/child/${child._id}`} key={child._id}>
          <ChildCard child={child} />
        </StyledLink>
      ))}
    </StyledUl>
  );
}
