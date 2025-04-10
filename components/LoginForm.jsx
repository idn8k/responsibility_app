import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        callbackUrl: '/',
        email: userEmail,
        password: userPassword,
        redirect: true,
      });

      if (result?.error) {
        console.error('Sign-in error:', result.error);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Your Password</label>
          <input
            type="password"
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
