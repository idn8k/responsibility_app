import React from "react";

export default function ChildCard({ child }) {
  const { name, imgUrl } = child;
  return (
    <>
      <h3>{name}</h3>
      <p>{imgUrl}</p>
    </>
  );
}
