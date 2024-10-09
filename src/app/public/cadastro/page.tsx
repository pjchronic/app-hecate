"use client";

import GenericButton from "@/Components/Buttons/GenericButton/GenericButton";
import Container from "@/Components/Container/Container";
import FlexForm from "@/Components/FlexForm/FlexForm";
import GenericInputText, {
  InputGenericInterface,
} from "@/Components/InputsText/GenericInputText/GenericInputText";
import TextH1 from "@/Components/TextComponents/TextH1";
import { theme } from "@/theme/Theme";
import { useTheme } from "@/utils/Context/themeContext";
import { useEffect, useState } from "react";

interface ObjectCadastroInterface {
  senha: passObjectInterface;
  confirmSenha: passObjectInterface;
}

interface passObjectInterface {
  content: string;
  validation?: InputGenericInterface;
  msg?: string;
}

export default function Cadastro() {
  const [objectCadastro, setObjectCadastro] = useState<ObjectCadastroInterface>(
    {
      senha: {
        content: "",
        validation: { error: false, success: false },
        msg: "",
      },
      confirmSenha: {
        content: "",
        validation: { error: false, success: false },
        msg: "",
      },
    }
  );

  const { themeProvider } = useTheme();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get("token");

    console.log(tokenFromQuery);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "senha":
        switch (true) {
          case !/[A-Z]/.test(value):
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos uma letra maiúscula",
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[a-z]/.test(value):
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos uma letra",
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[0-9]/.test(value):
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos um número",
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[!@#$%^&*(),.?":{}|<>]/.test(value):
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos um caractere especial",
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case value.length <= 7:
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário que sua senha tenha no mínimo 8 caracteres",
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          default:
            setObjectCadastro({
              ...objectCadastro,
              senha: {
                content: value,
                validation: { error: false, success: true },
              },
              confirmSenha: {
                content: objectCadastro.confirmSenha.content,
                validation: { error: true, success: false },
                msg: "As senhas não são iguais",
              },
            });
            break;
        }

        break;

      case "confirmSenha":
        if (value !== objectCadastro.senha.content) {
          setObjectCadastro({
            ...objectCadastro,
            confirmSenha: {
              content: value,
              validation: { error: true, success: false },
              msg: "As senhas não são iguais",
            },
          });
        } else {
          setObjectCadastro({
            ...objectCadastro,
            confirmSenha: {
              content: value,
              validation: { error: false, success: true },
            },
          });
        }

        break;
    }
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
        <TextH1 fontSize="3rem">Cadastre sua senha!</TextH1>

        <FlexForm onSubmit={handleSubmit}>
          <GenericInputText
            label="Digite sua senha:"
            name="senha"
            fullWidth
            type="password"
            onChange={handleChange}
            value={objectCadastro.senha.content}
            error={objectCadastro.senha.validation?.error}
            success={objectCadastro.senha.validation?.success}
            msg={objectCadastro.senha.msg}
          />

          <GenericInputText
            label="Confirme sua senha:"
            name="confirmSenha"
            fullWidth
            type="password"
            onChange={handleChange}
            value={objectCadastro.confirmSenha.content}
            error={objectCadastro.confirmSenha.validation?.error}
            success={objectCadastro.confirmSenha.validation?.success}
            msg={objectCadastro.confirmSenha.msg}
          />

          <GenericButton themeMode={themeProvider}> Cadastrar</GenericButton>
        </FlexForm>
      </Container>
    </>
  );
}
