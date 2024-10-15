"use client";

import Container from "@/Components/Container/Container";
import GenericAlert, {
  GenericAlertInterface,
} from "@/Components/GenericAlert/GenericAlert";
import LoadingComponent from "@/Components/LoadingComponent/LoadingComponent";
import TextH1 from "@/Components/TextComponents/TextH1";
import { theme } from "@/theme/Theme";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordForm, {
  ObjInterface,
} from "@/Components/PasswordForm/PasswordForm";

export default function resetPassword() {
  const [token, setToken] = useState<string | null>();
  const [customAlert, setCustomAlert] = useState<GenericAlertInterface>({
    msg: "",
    open: false,
  });
  const [loading, setLoaging] = useState<boolean>(false);
  const router = useRouter();
  const [passObj, setPassObj] = useState<ObjInterface>();  

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get("token");

    setToken(tokenFromQuery);
  }, []);

  const handleAlert = (msg: string, open: boolean) => {
    setCustomAlert({
      msg,
      open,
    });

    setTimeout(() => {
      setCustomAlert({ ...customAlert, open: false });
    }, 8000);
  };

  const handleObjectForm = (obj: ObjInterface) => {
    setPassObj(obj);
  };

  //#region ----- HandleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaging(true);

    try {
      if (
        passObj!.senha.validation?.success &&
        passObj!.confirmSenha.validation?.success
      ) {
        const response = await fetch(
          `/api/users/password-reset?token=${token}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              senha: passObj!.confirmSenha.content,
            }),
          }
        );

        const data: { message: string } = await response.json();

        handleAlert(data.message, true);

        if (response.ok) {
          setTimeout(() => {
            router.push("/public");
          }, 5000);
        }
      } else {
        throw new Error(
          "As senhas não conferem ou não tem os parâmetros necessários"
        );
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

  return (
    <>
      <Container
        as="section"
        widthMax="425px"
        radius
        shadow
        sx={`background-color: rgba(227, 227, 227, 0.5); backdrop-filter: blur(5px); border: 1px solid ${theme.colors.baseWhite}; flex-direction: column`}
      >
        <TextH1 fontSize="3rem">Redefina sua senha!</TextH1>

        <PasswordForm submit={handleSubmit} objecSend={handleObjectForm} />
      </Container>

      <GenericAlert msg={customAlert.msg} open={customAlert.open} />

      {loading ? <LoadingComponent /> : ""}
    </>
  );
}
