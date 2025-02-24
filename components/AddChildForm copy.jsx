import React, { useState } from "react";
import Button from "./ui/Button";
import styled from "styled-components";
import { mutate } from "swr";

const StyledForm = styled.form`
  height: 60%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const child = {
  name: "ollie",
  birth_date: "09.05.2019",
  imgUrl:
    "https://images.unsplash.com/photo-1475821660373-587d74229161?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function AddChildForm() {
  const [inputData, setInputData] = useState(child);

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
      mutate;
    }

    console.log("response:", response);
  }

  // function handleChange(e) {
  //   setInputData({
  //     ...inputData,
  //     name: e.target.name,
  //     birth_date: e.target.birth_date,
  //     imgUrl: e.target.imgUrl,
  //   });
  // }

  const shortendUrl = child.imgUrl.slice(0, 20) + "...";

  return (
    <>
      <h2>Add Child</h2>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Child Name</label>
          <input
            name="name"
            required
            onChange={handleChange}
            placeholder={inputData.name}
            // value={child.name ? child.name : "Child"}
            type="text"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="birth_date">Date of Birth</label>
          <input
            name="birth_date"
            required
            onChange={handleChange}
            placeholder={child.birth_date}
            // value={child.birth_date ? child.birth_date : "01.01.2020"}
            type="text"
            id="birth_date"
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image URL</label>
          <input
            name="imgUrl"
            required
            onChange={handleChange}
            placeholder={child.imgUrl}
            // value={child.imgUrl ? child.imgUrl : "url..."}
            type="text"
            id="imgUrl"
          />
        </div>
        <Button text="add" type="submit" />
      </StyledForm>
    </>
  );
}
