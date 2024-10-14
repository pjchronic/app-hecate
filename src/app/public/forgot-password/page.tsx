"use client";
import GenericButton from "@/Components/Buttons/GenericButton/GenericButton";
import Container from "@/Components/Container/Container";
import FlexForm from "@/Components/FlexForm/FlexForm";
import GenericAlert, {
  GenericAlertInterface,
} from "@/Components/GenericAlert/GenericAlert";
import GenericInputText from "@/Components/InputsText/GenericInputText/GenericInputText";
import LoadingComponent from "@/Components/LoadingComponent/LoadingComponent";
import TextH1 from "@/Components/TextComponents/TextH1";
import { theme } from "@/theme/Theme";
import { useTheme } from "@/utils/Context/themeContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface objRedefinPasswordInterface {
  nomeCompleto: {
    content: string;
    validation: { error: boolean; succsess: boolean };
    msg: string;
  };
  email: {
    content: string;
    validation: { error: boolean; succsess: boolean };
    msg: string;
  };
}

export default function ForgotPassword() {
  const [objRedefinPassword, setObjRedefinPassword] =
    useState<objRedefinPasswordInterface>({
      nomeCompleto: {
        content: "",
        validation: { error: false, succsess: false },
        msg: "",
      },
      email: {
        content: "",
        validation: { error: false, succsess: false },
        msg: "",
      },
    });
  const { themeProvider } = useTheme();

  const [loading, setLoaging] = useState<boolean>(false);

  const [customAlert, setCustomAlert] = useState<GenericAlertInterface>({
    msg: "",
    open: false,
  });
  const router = useRouter();

  const handleAlert = (msg: string, open: boolean) => {
    setCustomAlert({
      msg,
      open,
    });

    setTimeout(() => {
      setCustomAlert({ ...customAlert, open: false });
    }, 8000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoaging(true);

    try {
      if (
        objRedefinPassword.email.validation.succsess &&
        objRedefinPassword.nomeCompleto.validation.succsess
      ) {
        const response = await fetch(`/api/users/password-reset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: objRedefinPassword.email.content,
            nomeCompleto: objRedefinPassword.nomeCompleto.content,
          }),
        });
        const data: { message: string } = await response.json();

        handleAlert(data.message, true);

        if (response.ok) {
          setTimeout(() => {
            router.push("/public");
          }, 5000);
        }
      } else {
        handleAlert(
          "Nome completo ou email estão inválidos de alguma forma",
          true
        );
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleAlert(error.message, true);
      } else {
        handleAlert(String(error), true);
      }
    }
    setLoaging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "nomeCompleto":
        if (value.length === 0) {
          setObjRedefinPassword({
            ...objRedefinPassword,
            nomeCompleto: {
              content: value,
              validation: { error: true, succsess: false },
              msg: "Este é um campo obrigatório",
            },
          });
        } else {
          setObjRedefinPassword({
            ...objRedefinPassword,
            nomeCompleto: {
              content: value,
              validation: { error: false, succsess: true },
              msg: "",
            },
          });
        }
        break;

      case "email":
        switch (true) {
          case !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value):
            setObjRedefinPassword({
              ...objRedefinPassword,
              email: {
                content: value,
                validation: { error: true, succsess: false },
                msg: "O E-mail informado não é válido",
              },
            });

            break;

          case value.length === 0:
            setObjRedefinPassword({
              ...objRedefinPassword,
              email: {
                content: value,
                validation: { error: true, succsess: false },
                msg: "Este é um campo obrigatório",
              },
            });
          default:
            setObjRedefinPassword({
              ...objRedefinPassword,
              email: {
                content: value,
                validation: { error: false, succsess: true },
                msg: "",
              },
            });
            break;
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
        <TextH1 fontSize="2rem">Recuperação de senha</TextH1>

        <FlexForm onSubmit={handleSubmit}>
          <GenericInputText
            label="Nome completo:"
            name="nomeCompleto"
            value={objRedefinPassword.nomeCompleto.content}
            onChange={handleChange}
            type="text"
            error={objRedefinPassword.nomeCompleto.validation.error}
            success={objRedefinPassword.nomeCompleto.validation.succsess}
            msg={objRedefinPassword.nomeCompleto.msg}
            fullWidth
          />

          <GenericInputText
            label="Email:"
            name="email"
            value={objRedefinPassword.email.content}
            onChange={handleChange}
            type="text"
            error={objRedefinPassword.email.validation.error}
            success={objRedefinPassword.email.validation.succsess}
            msg={objRedefinPassword.email.msg}
            fullWidth
          />
          <GenericButton themeMode={themeProvider}>
            Solicitar Redefinição
          </GenericButton>
        </FlexForm>
      </Container>

      <GenericAlert msg={customAlert.msg} open={customAlert.open} />

      {loading ? <LoadingComponent /> : ""}
    </>
  );
}
