import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import styled from "styled-components";
import { mutate } from "swr";

const StyledHeading = styled.h2`
  color: #ff3566;
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
  color: #ff3566;
  font-size: 20px;
  margin-left: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border-style: inset;
  border: 1px solid #ff3566;
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #ff3566;
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
  }
`;

const StyledDateInput = styled.input.attrs({ type: "date" })`
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  font-size: 16px;
  border: 1px solid #ff3566;
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #ff3566;
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
    font-style: italic;
  }
  &::-webkit-datetime-edit {
    color: grey;
    font-family: system-ui;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export default function AddChildForm() {
  const [inputData, setInputData] = useState({
    name: "",
    birth_date: "",
    imgUrl: "",
  });
  const [isInput, setIsInput] = useState(false);

  useEffect(
    function () {
      console.log("Update state:", isInput);
      console.log("Update state:", inputData);
    },
    [isInput, inputData]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const childData = Object.fromEntries(formData);

    const response = await fetch("/api/children_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(childData),
    });
    if (response.ok) {
      mutate();
    }

    console.log("response:", response);
  }

  function handleChange(e) {
    setIsInput(e.target.value.length === 0);
    console.log(isInput);
  }

  // const shortendUrl = inputData?.imgUrl.slice(0, 20) + "...";

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeading>Add Child</StyledHeading>
        <StyledInputContainer>
          <StyledLabel htmlFor="name">Child Name</StyledLabel>
          <StyledInput
            name="name"
            required
            type="text"
            id="name"
            onChange={handleChange}
            placeholder={inputData.name ? inputData.name : "..."}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="birth_date">Date of Birth</StyledLabel>
          <StyledDateInput
            name="birth_date"
            required
            type="date"
            id="birth_date"
            onChange={handleChange}
            placeholder={inputData.birth_date ? inputData.name : "01.01.2020"}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="imgUrl">Image URL</StyledLabel>
          <StyledInput
            name="imgUrl"
            required
            type="text"
            id="imgUrl"
            onChange={handleChange}
            // placeholder={inputData.imgUrl ? shortendUrl : "..."}
            placeholder={inputData.imgUrl}
          />
        </StyledInputContainer>
        <StyledBtnContainer>
          {!isInput ? (
            <>
              <Button add type="submit">
                Add
              </Button>
              <Button>Cancel</Button>
            </>
          ) : (
            <Button>Cancel</Button>
          )}
        </StyledBtnContainer>
      </StyledForm>
    </>
  );
}
