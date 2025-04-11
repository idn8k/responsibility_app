import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
  padding: 20px 0;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: transparent;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
`;

const StyledLabel = styled.label`
  color: #fff;
  font-size: 12px;
`;

const StyledButton = styled.button`
  width: 150px;
  text-align: center;
  /* padding: 10px 20px; */
  height: 25px;
  border: none;
  border-radius: 5px;
  color: var(--primary-color);
  background-color: #fff;
`;

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
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputs>
        <StyledInputContainer>
          <StyledLabel htmlFor="email">Your Email</StyledLabel>
          <StyledInput
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="email">Your Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </StyledInputContainer>
      </StyledInputs>
      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  );
}
