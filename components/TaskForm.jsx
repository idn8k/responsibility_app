import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from './ui/Button';
import styled from 'styled-components';
import Link from 'next/link';
import Spinner from './ui/Spinner';
import useSWR from 'swr';
import SectionContainer from './SectionContainer';

const StyledHeading = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
`;

const StyledForm = styled.form`
  height: 100%;
  width: 80%;
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const StyledInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  display: none;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border-style: inset;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
  }
`;
const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border-style: inset;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top: 80px;
`;

const StyledLinkBtn = styled(Link)`
  background-color: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  text-align: center;

  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover,
  &:active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const StyledSpan = styled.span`
  color: var(--primary-color);
  position: absolute;
  left: 10px;
  bottom: 80px;
`;

export default function TaskForm() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    taskName: '',
    isCompleted: false,
    assignee: '',
  });
  const { data: childrenData, isLoading } = useSWR('/api/child_items');

  const [formComplete, setFormComplete] = useState(false);
  const [error] = useState('');
  const [setDebouncedUrl] = useState(''); // Holds the URL after user stops typing

  //- Form completed effect:
  useEffect(() => {
    if (inputData.taskName.length !== 0 && inputData.assignee.length !== 0) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [inputData]);

  //- Debounce effect:
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputData.imgUrl) {
        setDebouncedUrl(inputData.imgUrl);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [inputData.imgUrl, setDebouncedUrl]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const taskData = Object.fromEntries(formData);

    const response = await fetch('/api/tasks_items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    if (response.ok) router.push('/');
  }

  async function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setInputData((inputData) => ({ ...inputData, [key]: value }));
  }

  if (isLoading) return <Spinner />;

  return (
    <SectionContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeading>Assign a Task</StyledHeading>
        <StyledInputContainer>
          <StyledLabel htmlFor="taskName">Task Name</StyledLabel>
          <StyledInput
            name="taskName"
            required
            type="text"
            id="taskName"
            onChange={handleChange}
            value={inputData.name}
            placeholder="*Write down a task..."
          />
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledLabel htmlFor="assignee">Select a child</StyledLabel>
          <StyledSelect
            required
            name="assignee"
            type="select"
            id="assignee"
            onChange={handleChange}
            value={inputData.assignee}
            placeholder="*Choose a child..."
          >
            <option value="">*Select a child</option>
            {childrenData.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name.charAt(0).toUpperCase() + child.name.slice(1)}
              </option>
            ))}
          </StyledSelect>
          <p>{error && 'Not valid url'}</p>
        </StyledInputContainer>
        <StyledBtnContainer>
          <StyledLinkBtn href="/tasksPage">Cancel</StyledLinkBtn>
          <Button type="submit">Add</Button>
          {/* {isFormComplete && !error && <Button type="submit">Add</Button>} */}
          <StyledSpan>*Required</StyledSpan>
        </StyledBtnContainer>
      </StyledForm>
    </SectionContainer>
  );
}
