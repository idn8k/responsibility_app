import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250px;
  padding: 20px 0;
  border-radius: 10px;

  box-shadow: 2px 1px 5px -1px rgba(0, 0, 0, 0.2);
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

const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: transparent;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
  padding: 10px 5px;
`;

const StyledLabel = styled.label`
  color: #fff;
  font-size: 12px;
  padding-left: 4px;
`;

const StyledButton = styled.button`
  font-size: 12px;
  width: 150px;
  text-align: center;
  height: 25px;
  border: none;
  border-radius: 5px;
  color: var(--primary-color);
  background-color: #fff;
`;

const StyledLink = styled(Link)`
  font-size: 11px;
  width: 150px;
  text-align: center;
  height: 25px;

  border-radius: 5px;
  color: #fff;
  text-decoration: none;

  /* box-shadow: 0 0 1px 1px #ffffff inset; */
`;

const StyledSpan = styled.span`
  color: #fff;
  font-size: 8px;
  width: 100%;
  text-align: end;
  margin-top: 3px;
  padding-right: 4px;
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
          {/* TODO: Add restore link */}
          <StyledSpan>Forgot password</StyledSpan>
        </StyledInputContainer>
      </StyledInputs>
      <StyledBtnContainer>
        <StyledButton type="submit">Login</StyledButton>
        <StyledLink href={'/registerPage'}>Register</StyledLink>
      </StyledBtnContainer>
    </StyledForm>
  );
}
