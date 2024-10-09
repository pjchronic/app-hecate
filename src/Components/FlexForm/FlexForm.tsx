import React from "react";
import styled from "styled-components";

interface FlexFormInterface {
  children: React.ReactNode;
  direction?: StyledFlexFormInterface["direction"];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface StyledFlexFormInterface {
  direction?: "column" | "row";
}

const ignoredProps = ["align"];

const StyledFlexForm = styled.form.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.includes(prop),
})<StyledFlexFormInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.direction ?? "column" };
  gap: 0.5rem;
`;

const FlexForm: React.FC<FlexFormInterface> = ({ children, direction, onSubmit }) => {
  return (
    <>
      <StyledFlexForm direction={direction} onSubmit={onSubmit}>{children}</StyledFlexForm>
    </>
  );
};

export default FlexForm;
