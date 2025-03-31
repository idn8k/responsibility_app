import { signIn } from 'next-auth/react';

export default function LoginForm() {
  return (
    <>
      <h2>Login Form</h2>
      {/* TODO: add google icon */}
      <button
        onClick={() =>
          signIn('google', { callbackUrl: '/', prompt: 'select_account', redirect: true })
        }
      >
        Sign In with Google
      </button>
      <button
        onClick={() =>
          signIn('credentials', {
            callbackUrl: '/',
            email: userEmail,
            password: userPassword,
          })
        }
      >
        Sign In with your Email
      </button>
    </>
  );
}
