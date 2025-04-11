import { getProviders, signIn } from 'next-auth/react';
import LoginForm from '@/components/LoginForm';
import { useState } from 'react';

export default function SignIn({ providers }) {
  const [showCredentialsSignIn, setShowCredentialsSignIn] = useState(false);

  function handleCredentialsSignIn() {
    setShowCredentialsSignIn((showCredentialsSignIn) => !showCredentialsSignIn);
  }

  return (
    <div>
      <h1>Sign In</h1>
      {Object.values(providers).map((provider) => {
        if (provider.id === 'credentials') {
          return (
            <button key={provider.name} onClick={handleCredentialsSignIn}>
              Sign in with your Email
            </button>
          );
        } else {
          return (
            <button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, { callbackUrl: '/', prompt: 'select_account', redirect: true })
              }
            >
              Sign in with {provider.name}
            </button>
          );
        }
      })}
      {showCredentialsSignIn && <LoginForm />}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
