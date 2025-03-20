import Header from '@/components/Header';
import GlobalStyle from '../styles';
import { ThemeProvider } from 'styled-components';
import useSWR, { SWRConfig } from 'swr';
import Navbar from '@/components/Navbar';
import MainContainer from '@/components/MainContainer';
import { useState } from 'react';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [adminMode, setIsAdmin] = useState(true);
  const { data: tasksData, mutate } = useSWR('/api/tasks_items');

  function handleMode() {
    setIsAdmin(!adminMode);
  }

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
          <Header onSetMode={handleMode} />
          <MainContainer>
            <Component
              handleCompleteTask={handleCompleteTask}
              adminMode={adminMode}
              {...pageProps}
            />
          </MainContainer>
          <Navbar adminMode={adminMode} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
