import React, { ReactElement } from "react";
import BaseTemplate from "../ComponentesEmail/BaseTemplate";
import HeaderTemplateMail from "../ComponentesEmail/HeaderTemplateMail";
import HrTemplateMail from "../ComponentesEmail/HrTemplateMail";
import { Column, Link, Row, Text } from "@react-email/components";

interface ForgotPasswordInterface {
  url: string;
  nome: string;
}

const ForgotPassword = ({
  url,
  nome,
}: ForgotPasswordInterface): ReactElement => {
  const primeiroNome: string = nome.match(/^\S+/)?.[0] || "";
  return (
    <BaseTemplate>
      <HeaderTemplateMail
        imgIconLink="https://drive.google.com/thumbnail?id=1EWZdT6zHpDuFTLr3A7pcguICdd323tN1"
        titleHeader="Redefina sua senha"
      />

      <HrTemplateMail />

      <Row>
        <Column>
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Olá {primeiroNome}! Recebemos uma solicitacao de redefinição de
            senha para o seu usuário.
          </Text>
        </Column>
      </Row>

      <HrTemplateMail />

      <Row>
        <Column>
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
          >
            Caso a solicitação tenha sido feita por você, basta clicar no{" "}
            <Link
              href={url}
              style={{
                color: "blue",
                fontFamily: "Times New Roman",
                fontSize: "1.5rem",
              }}
            >
              link
            </Link>{" "}
            para redefinir sua senha.
          </Text>
        </Column>
      </Row>

      <Row>
        <Column>
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Caso contrário basta ignorar este e-mail.
          </Text>
        </Column>
      </Row>

      <HrTemplateMail />

      <Row>
        <Column>
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Ressaltamos que o link enviado expira em 30 minutos após a
            solicitação. Depois de expirado é necessário solicitar uma nova
            redefinição.
          </Text>
        </Column>
      </Row>
    </BaseTemplate>
  );
};

export default ForgotPassword;
