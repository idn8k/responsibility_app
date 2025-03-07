import Header from "@/components/Header";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/MainContainer";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(true);

  function handleMode() {
    setIsAdmin(!isAdmin);
  }

  console.log(isAdmin);
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Header onSetMode={handleMode} />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Navbar />
      </SWRConfig>
    </>
  );
}
