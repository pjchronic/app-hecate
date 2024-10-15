"use client";
import { useTheme } from "@/utils/Context/themeContext";
import GenericButton from "../Buttons/GenericButton/GenericButton";
import FlexForm from "../FlexForm/FlexForm";
import GenericInputText from "../InputsText/GenericInputText/GenericInputText";
import { useEffect, useState } from "react";

interface PasswordFormInterface {
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  objecSend: (obj: ObjInterface) => void;
}

export interface ObjInterface {
  senha: {
    content: string;
    validation: { error: boolean; success: boolean };
    msg?: string;
  };
  confirmSenha: {
    content: string;
    validation: { error: boolean; success: boolean };
    msg?: string;
  };
}

const PasswordForm: React.FC<PasswordFormInterface> = ({
  submit,
  objecSend,
}) => {
  const { themeProvider } = useTheme();

  const [object, setObject] = useState<ObjInterface>({
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
  });

  useEffect(() => {
    objecSend(object);
  }, [object]);

  //#region ----- HandleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "senha":
        switch (true) {
          case !/[A-Z]/.test(value):
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos uma letra maiúscula",
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[a-z]/.test(value):
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos uma letra",
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[0-9]/.test(value):
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos um número",
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case !/[!@#$%^&*(),.?":{}|<>]/.test(value):
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário ao menos um caractere especial",
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          case value.length <= 7:
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: true, success: false },
                msg: "É necessário que sua senha tenha no mínimo 8 caracteres",
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
              },
            });
            break;

          default:
            setObject({
              ...object,
              senha: {
                content: value,
                validation: { error: false, success: true },
              },
              confirmSenha: {
                content: object.confirmSenha.content,
                validation: { error: true, success: false },
                msg: "As senhas não são iguais",
              },
            });
            break;
        }

        break;

      case "confirmSenha":
        if (
          value !== object.senha.content ||
          object.senha.content.length <= 8
        ) {
          setObject({
            ...object,
            confirmSenha: {
              content: value,
              validation: { error: true, success: false },
              msg: "As senhas não são iguais ou não tem o número de caracteres necessários",
            },
          });
        } else {
          setObject({
            ...object,
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
      <FlexForm onSubmit={submit}>
        <GenericInputText
          label="Digite sua senha:"
          name="senha"
          fullWidth
          type="password"
          onChange={handleChange}
          value={object.senha.content}
          error={object.senha.validation?.error}
          success={object.senha.validation?.success}
          msg={object.senha.msg}
          visibilityIconBtn
        />

        <GenericInputText
          label="Confirme sua senha:"
          name="confirmSenha"
          fullWidth
          type="password"
          onChange={handleChange}
          value={object.confirmSenha.content}
          error={object.confirmSenha.validation?.error}
          success={object.confirmSenha.validation?.success}
          msg={object.confirmSenha.msg}
        />

        <GenericButton themeMode={themeProvider}> Cadastrar</GenericButton>
      </FlexForm>
    </>
  );
};

export default PasswordForm;

//#region ------- instuções de uso

// Necessário uma função para administrar dados do formuário no componente pai e outra para fazer o envio delas (handleSubmit com fetch)

// 1 --------
/* const [passObj, setPassObj] = useState<ObjInterface>();*/

/* const handleObjectForm = (obj: ObjInterface) => {
    setPassObj(obj);
  };*/










