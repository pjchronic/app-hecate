"use client";
import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import styled from "styled-components";
import { theme } from "@/theme/Theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//#region ----Interfaces
interface GenericInputTextInterface {
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  type?: "text" | "password";
  msg?: string;
  visibilityIconBtn?: boolean;

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
  height: 95px;
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
  width: 240px;
  line-height: 1.1rem;
`;

const VisivilityBtn = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 5px;
  color: ${theme.colors.baseGrafite};

  &:hover {
    background-color: ${theme.colors.baseGrafite};
    color: ${theme.colors.baseWhite};
  }
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
  visibilityIconBtn,
}) => {
  const [visibleOrNot, setVisibleOrNot] = useState<boolean>(false);
  const [changeType, setChangeType] =
    useState<GenericInputTextInterface["type"]>("password");

  const handleVisbility = () => {
    setVisibleOrNot(!visibleOrNot);

    setChangeType(visibleOrNot ? "password" : "text");
  };

  return (
    <>
      <InputContainer fullWidth={fullWidth}>
        <LabelInput>
          <TextLabel>{label}</TextLabel>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputGeneric
              type={type === "text" ? type : changeType}
              name={name}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              success={success}
              error={error}
            />

            {visibilityIconBtn && type === "password" ? (
              <VisivilityBtn onClick={handleVisbility}>
                {visibleOrNot ? (
                  <VisibilityOffIcon sx={{ fontSize: "1.3rem" }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: "1.3rem" }} />
                )}
              </VisivilityBtn>
            ) : (
              ""
            )}
          </div>
          {msg ? <ErrorMessage>{msg}</ErrorMessage> : ""}
        </LabelInput>
      </InputContainer>
    </>
  );
};

export default GenericInputText;

//#region ------- instuções de uso

/*
   <GenericInputText
            label="Digite sua senha:"                          ------ Label do input
            name="senha"                                       ------ Name para uso no handleChange
            fullWidth                                          ------ Opcional para usar width 100%
            type="password"                                    ------ Seta se tipo text ou tipo password apenas
            onblur={onblur}                                    ------ Executa função quando o input perde o foco
            onChange={handleChange}                            ------ Atributo onChange para controle
            value={objectCadastro.senha.content}               ------ Atributo value para controle
            error={objectCadastro.senha.validation?.error}     ------ Contorna input de vermelho
            success={objectCadastro.senha.validation?.success} ------ Contorna input de verde
            msg={objectCadastro.senha.msg}                     ------ Se informado passa msg de erro logo abaixo do input
            visibilityIconBtn                                  ------ Se declarado mostra botão de visibilidade, porém apenas se o type for "Password"
          />

          Checar obrigatoriedade das props na interface GenericInputTextInterface
    */
