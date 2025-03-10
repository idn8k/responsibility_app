import styled from "styled-components";

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  ${HiddenCheckbox}:checked + & {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "✔";
    color: white;
    font-size: 20px;
  }
`;

const LabelText = styled.span`
  font-size: 16px;
  display: none;
`;

export default function CustomCheckbox({ label, checked, onChange }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox />
      <LabelText>{label}</LabelText>
    </CheckboxContainer>
  );
}
