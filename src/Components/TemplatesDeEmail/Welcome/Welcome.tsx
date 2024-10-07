import React, { ReactElement } from "react";
import BaseTemplate from "../ComponentesEmail/BaseTemplate";
import HeaderTemplateMail from "../ComponentesEmail/HeaderTemplateMail";
import HrTemplateMail from "../ComponentesEmail/HrTemplateMail";
import { Column, Img, Link, Row, Text } from "@react-email/components";

interface welcomeInterface {
  nome: string;
}

const Welcome = ({ nome }: welcomeInterface): ReactElement => {
  const primeiroNome: string = nome.match(/^\S+/)?.[0] || "";
  return (
    <BaseTemplate>
      {/*header*/}
      <HeaderTemplateMail
        iconLink="https://www.flaticon.com/free-icons/sun"
        titleHeader={`Seja muito bem-vindo(a), ${primeiroNome}!`}
        imgIconLink="https://drive.google.com/thumbnail?id=1Z10iKfxM3c7jGeeUtzVAJIsFPh-i8bHQ"
      />

      <HrTemplateMail />
      {/*Body*/}
      <Row>
        <Column width="100%">
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
          >
            Agora você já pode criar as suas fichas, sessões e convidar outros
            usuários para jogar suas campanhas!
          </Text>
          <Img
            style={{ borderRadius: "4px" }}
            src={
              "https://drive.google.com/thumbnail?id=1po--uBH2NuVcvm_d98oWEd0EuxzpeyCP"
            }
            alt="Mesa de Aventura"
            width="550"
            height="201"
          />
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "0.8rem",
              textAlign: "end",
            }}
          >
            Designed by{" "}
            <Link
              title="Freepik"
              href="http://www.freepik.com/"
              style={{ color: "blue" }}
            >
              Freepik
            </Link>
          </Text>
        </Column>
      </Row>

      <HrTemplateMail />

      <Row>
        <Column>
          <Text
            style={{
              color: "#000",
              fontFamily: "Times New Roman",
              fontSize: "1.3rem",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Viva ótimas aventuras e crie histórias incríveis!
          </Text>

          <Text
            style={{
              color: "#000",
              fontFamily: "Times New Roman",
              fontSize: "1rem",
              textAlign: "end",
              fontStyle: "italic",
            }}
          >
            Ass: Hécate App
          </Text>
        </Column>
      </Row>
    </BaseTemplate>
  );
};

export default Welcome;
