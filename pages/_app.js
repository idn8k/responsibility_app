import useSWR, { SWRConfig } from 'swr';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import GlobalStyle from '../styles';
import { ThemeProvider } from 'styled-components';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import MainContainer from '@/components/MainContainer';
import Spinner from '@/components/ui/Spinner';

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuth = status === 'authenticated';

  const isSignInPage = router.pathname === '/auth/signin';
  const isRegisterPage = router.pathname === '/registerPage';

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuth && !isSignInPage && !isRegisterPage) {
      router.push(`/auth/signin?callbackUrl=${router.asPath}`);
    }
  }, [isAuth, router, status]);

  if (isAuth || isSignInPage || isRegisterPage) {
    return children;
  }

  return null;
}

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { data: tasksData, mutate } = useSWR('/api/tasks_items');

  async function handleCompleteTask(taskId) {
    const taskToUpdate = tasksData.find((task) => task._id === taskId);

    const updatedTask = {
      ...taskToUpdate,
      isCompleted: !taskToUpdate.isCompleted,
    };

    const newData = tasksData.map((task) => {
      if (task._id === taskId) {
        return updatedTask;
      } else {
        return task;
      }
    });

    mutate(
      async () => {
        await fetch('/api/tasks_items/', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        return newData;
      },
      {
        optimisticData: newData,
        populateCache: true,
        revalidate: false,
        rollbackOnError: true,
      }
    );
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <ThemeProvider theme={GlobalStyle}>
          <GlobalStyle />
          <SessionProvider session={session}>
            <Header />
            <Auth>
              <MainContainer>
                <Component handleCompleteTask={handleCompleteTask} {...pageProps} />
              </MainContainer>
            </Auth>
            <Navbar />
          </SessionProvider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
