"use client";

import GenericButton from "@/Components/Buttons/GenericButton/GenericButton";
import Container from "@/Components/Container/Container";
import FlexForm from "@/Components/FlexForm/FlexForm";
import GenericInputText from "@/Components/InputsText/GenericInputText/GenericInputText";
import TextH1 from "@/Components/TextComponents/TextH1";
import TextLinks from "@/Components/TextComponents/TextLinks";
import { theme } from "@/theme/Theme";
import { useTheme } from "@/utils/Context/themeContext";
import { CSSProperties, useState } from "react";

interface objectLoginInterface {
  email: string;
  senha: string;
}

export default function Login() {
  const [objectLogin, setObjectLogin] = useState<objectLoginInterface>({
    email: "",
    senha: "",
  });
  const { themeProvider } = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(value);

    setObjectLogin({ ...objectLogin, [name]: value });
  };

  const formStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0.5rem",
  };

  return (
    <>
      <Container
        as="section"
        widthMax="425px"
        radius
        shadow
        sx={`background-color: rgba(227, 227, 227, 0.5); backdrop-filter: blur(5px); border: 1px solid ${theme.colors.baseWhite}; flex-direction: column`}
      >
        <TextH1 fontSize="4rem">Login</TextH1>
        <FlexForm onSubmit={handleSubmit}>
          <GenericInputText
            label="E-mail:"
            name="email"
            onChange={handleChange}
            value={objectLogin.email}
          />

          <GenericInputText
            type="password"
            label="Senha:"
            name="senha"
            onChange={handleChange}
            value={objectLogin.senha}
            visibilityIconBtn
          />
          <TextLinks textAlign="right" href="/public/forgot-password">
            Esqueci minha senha...
          </TextLinks>

          <GenericButton themeMode={themeProvider} type="submit">
            Entrar
          </GenericButton>
        </FlexForm>
      </Container>
    </>
  );
}
