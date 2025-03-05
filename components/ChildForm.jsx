import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "./ui/Button";
import styled from "styled-components";
import Link from "next/link";

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
  &::-webkit-datetime-isedit {
    color: grey;
    font-family: system-ui;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const StyledLinkBtn = styled(Link)`
  background-color: #fff;
  color: #ff3566;
  border: 1px solid #ff3566;
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
`;

const StyledSpan = styled.span`
  color: #ff3566;
  position: absolute;
  left: 10px;
  bottom: 80px;
`;

export default function ChildForm({ child, isEdit, onEdit }) {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: child?.name || "",
    birth_date: child?.birth_date
      ? new Date(child.birth_date).toISOString().split("T")[0]
      : "",
    imgUrl: child?.imgUrl || "",
  });

  const [isFormComplete, setFormComplete] = useState(false);
  const [error, setError] = useState("");
  const [debouncedUrl, setDebouncedUrl] = useState(""); // Holds the URL after user stops typing

  useEffect(() => {
    if (
      isEdit ||
      (inputData.name.length !== 0 &&
        inputData.birth_date.length !== 0 &&
        inputData.imgUrl.length !== 0)
    ) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [inputData, isEdit]);

  // Debounce effect: Waits for 500ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputData.imgUrl) {
        setDebouncedUrl(inputData.imgUrl);
      }
    }, 500); // Adjust delay as needed

    return () => clearTimeout(handler); // Cleanup on new keystroke
  }, [inputData.imgUrl]);

  // When debouncedUrl changes, validate it
  useEffect(() => {
    if (!debouncedUrl) return;

    async function validate() {
      const isValid = await validateImageUrl(debouncedUrl);
      console.log(isValid);
      if (!isValid) {
        setError("Invalid image URL. Please provide a valid image.");
      } else {
        setError("");
      }
    }

    validate();
  }, [debouncedUrl]);

  function validateImageUrl(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const childData = Object.fromEntries(formData);

    const response = await fetch("/api/children_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(childData),
    });

    router.push("/");
  }

  async function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setInputData((inputData) => ({ ...inputData, [key]: value }));
  }

  const shortendUrl = isEdit && child.imgUrl.slice(0, 30) + "...";

  return (
    <>
      <StyledForm
        onSubmit={!isEdit ? handleSubmit : (event) => onEdit(event, child._id)}
      >
        <StyledHeading>{isEdit ? "Edit Child" : "Add Child"}</StyledHeading>
        <StyledInputContainer>
          <StyledLabel htmlFor="name">Child Name*</StyledLabel>
          <StyledInput
            name="name"
            required={!isEdit && "required"}
            type="text"
            id="name"
            onChange={handleChange}
            value={inputData.name}
            placeholder={isEdit ? child.name : "..."}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="birth_date">Date of Birth*</StyledLabel>
          <StyledDateInput
            name="birth_date"
            required={!isEdit && "required"}
            type="date"
            id="birth_date"
            onChange={handleChange}
            value={inputData.birth_date}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="imgUrl">Image URL*</StyledLabel>
          <StyledInput
            required={!isEdit && "required"}
            name="imgUrl"
            type="text"
            id="imgUrl"
            onChange={handleChange}
            value={inputData.imgUrl}
            placeholder={isEdit ? shortendUrl : "..."}
          />
          <p>{error && "Not valid url"}</p>
        </StyledInputContainer>
        <StyledBtnContainer>
          <StyledLinkBtn href="/">Cancel</StyledLinkBtn>
          {isFormComplete && !error && <Button type="submit">Add</Button>}
          <StyledSpan>*Required</StyledSpan>
        </StyledBtnContainer>
      </StyledForm>
    </>
  );
}
