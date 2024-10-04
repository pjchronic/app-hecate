import { Column, Img, Link, Row, Text } from "@react-email/components";
import React, { ReactElement } from "react";
import HeaderTemplateMail from "../ComponentesEmail/HeaderTemplateMail";
import HrTemplateMail from "../ComponentesEmail/HrTemplateMail";
import BaseTemplate from "../ComponentesEmail/BaseTemplate";

interface InviteProps {
  url: string;
  nome: string;
}

const Invite = ({ url, nome }: InviteProps): ReactElement => {
  const primeiroNome: string = nome.match(/^\S+/)?.[0] || "";
  return (
    <BaseTemplate>
      {/*header*/}
      <HeaderTemplateMail
        iconLink="https://www.flaticon.com/free-icons/papyrus"
        imgIconLink="https://drive.google.com/thumbnail?id=1e54Sl5AVfGNUkBpJDu2KvozkP7D1IrNu"
        titleHeader="Seu convite chegou!"
      />

      <HrTemplateMail />

      {/*body*/}
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
            Parabéns, {primeiroNome}!
          </Text>
          <Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Você foi convidado(a) para fazer parte do projeto Hécate, o web app
            para armazenar e administrar suas fichas de RPG e as fichas de seus
            jogadores.
          </Text>
        </Column>
      </Row>

      <Row>
        <Column width="100%">
          <Img
            style={{ borderRadius: "4px" }}
            src={
              "https://drive.google.com/thumbnail?id=1uYrE0pPlkc2rz1BQ_z5jXEai2akQoYOz"
            }
            alt="Mesa de RPG"
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

      {/*footer*/}
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
            Para finalizar o seu cadastro, basta clicar no{" "}
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
            e criar sua senha de acesso.
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
            Te desejamos uma ótima jogatina!
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

export default Invite;
