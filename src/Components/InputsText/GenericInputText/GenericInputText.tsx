"use client";
import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import styles from "./styles.module.css";
import styled from "styled-components";
import { theme } from "@/theme/Theme";

//#region ----Interfaces
interface GenericInputTextInterface {
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  type?: "text" | "password";
  msg?: string;

  fullWidth?: InputContainerInterface["fullWidth"];
  success?: InputGenericInterface["success"];
  error?: InputGenericInterface["error"];
}

interface InputContainerInterface {
  children?: React.ReactNode;
  fullWidth?: boolean | undefined;
}

export interface InputGenericInterface {
  error?: boolean;
  success?: boolean;
}
//#endregion

//#region ----Styled Components
const ignoredProps = { inputContainer: ["fullWidth", "error", "success"] };

const InputContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.inputContainer.includes(prop),
})<InputContainerInterface>`
  width: ${(props) => (props.fullWidth ? "100%" : "238px")};
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  &:hover p {
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const TextLabel = styled.p`
  font-family: ${theme.fonts.contentFont.fontFamily};
  color: ${theme.fonts.contentFont.color};
  font-size: 1.1rem;
  transition: all 0.4s ease-in-out;
`;

const InputGeneric = styled.input.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.inputContainer.includes(prop),
})<InputGenericInterface>`
  height: 45px;
  width: 100%;
  border-radius: 4px;
  font-family: ${theme.fonts.contentFont.fontFamily};
  font-size: 1.3rem;
  padding: 5px;
  border: 2px solid
    ${(props) =>
      props.error ? "red" : props.success ? "green" : theme.colors.baseWhite};
  transition: all 0.4s ease-in-out;

  &:hover {
    border: 2px solid ${theme.colors.greyBase};
  }

  &:focus {
    border: 2px solid ${theme.colors.baseGrafite};
    background-color: ${theme.colors.greyBase};
  }
`;

const ErrorMessage = styled.span`
  font-size: 1rem;
  font-family: ${theme.fonts.contentFont.fontFamily};
  color: red;
  width: 238px;
`;

//#endregion

const GenericInputText: React.FC<GenericInputTextInterface> = ({
  label,
  name,
  onChange,
  value,
  onBlur,
  type = "text",
  fullWidth = undefined,
  success,
  error,
  msg,
}) => {
  return (
    <>
      <InputContainer fullWidth={fullWidth}>
        <LabelInput>
          <TextLabel>{label}</TextLabel>
          <InputGeneric
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            success={success}
            error={error}
          />
          {msg ? <ErrorMessage>{msg}</ErrorMessage> : ""}
        </LabelInput>
      </InputContainer>
    </>
  );
};

export default GenericInputText;
