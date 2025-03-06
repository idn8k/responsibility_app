import Header from "@/components/Header";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/MainContainer";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [modalType, setModalType] = useState("delete");

  function handleModal(){
    setModalType(modalType => )
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Header />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Navbar />
      </SWRConfig>
    </>
  );
}
