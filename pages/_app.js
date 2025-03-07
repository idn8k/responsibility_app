import Header from "@/components/Header";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/MainContainer";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [adminMode, setIsAdmin] = useState(true);

  function handleMode() {
    setIsAdmin(!adminMode);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Header onSetMode={handleMode} />
        <MainContainer>
          <Component adminMode={adminMode} {...pageProps} />
        </MainContainer>
        <Navbar adminMode={adminMode} />
      </SWRConfig>
    </>
  );
}
