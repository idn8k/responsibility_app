import { getProviders, signIn } from 'next-auth/react';
import LoginForm from '@/components/LoginForm';
import { useState } from 'react';
import styled from 'styled-components';

import { FaGoogle } from 'react-icons/fa';

const StyledHeading = styled.h2`
  color: var(--primary-color);
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  height: 100%;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 300px;
  padding: 10px 20px;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: var(--primary-color);
  box-shadow: 2px 1px 5px -1px rgba(0, 0, 0, 0.2);
`;

const CredentialsContainer = styled.div`
  background-color: var(--primary-color);
  border-radius: 10px;
`;

export default function SignIn({ providers }) {
  const [showCredentialsSignIn, setShowCredentialsSignIn] = useState(false);

  function handleCredentialsSignIn() {
    setShowCredentialsSignIn((showCredentialsSignIn) => !showCredentialsSignIn);
  }

  return (
    <StyledLoginContainer>
      <StyledHeading>Sign In</StyledHeading>
      {Object.values(providers).map((provider) => {
        if (provider.id === 'credentials') {
          return (
            <CredentialsContainer>
              <StyledButton key={provider.name} onClick={handleCredentialsSignIn}>
                Sign in with your Email
              </StyledButton>
              {showCredentialsSignIn && <LoginForm />}
            </CredentialsContainer>
          );
        } else {
          return (
            <StyledButton
              key={provider.name}
              onClick={() =>
                signIn(provider.id, { callbackUrl: '/', prompt: 'select_account', redirect: true })
              }
            >
              Sign in with <FaGoogle size="1.2rem" />
            </StyledButton>
          );
        }
      })}
    </StyledLoginContainer>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
