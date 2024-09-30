import { FC } from "react";
import { Resend } from "resend";
import Invite from "@/components/templatesDeEmail/Invite";
import Welcome from "@/components/templatesDeEmail/Welcome";
import ForgotPassword from "@/components/templatesDeEmail/ForgotPassword";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface PackageDeliveryInterface {
  destinatario: string;
  templateType: "invite" | "welcome" | "forgotPassoword";
  url?: string;
  nomeCompleto: string;
}

export async function mailDelivery(packageDelivery: PackageDeliveryInterface) {
  let assunto: string;
  let template: any;
  let from: string;

  switch (packageDelivery.templateType) {
    case "invite":
      assunto = "Você recebeu um convite do Hecate app!";
      from = "convite";
      template = (
        <Invite
          url={packageDelivery.url!}
          nome={packageDelivery.nomeCompleto}
        />
      );
      break;

    case "welcome":
      assunto = "Seja muito bem-vindo(a)";
      from = "boasvindas";
      template = <Welcome nome={packageDelivery.nomeCompleto} />;
      break;

    case "forgotPassoword":
      assunto = "Redefina sua senha";
      from = "senha";
      template = (
        <ForgotPassword
          url={packageDelivery.url!}
          nome={packageDelivery.nomeCompleto}
        />
      );
      break;

    default:
      throw new Error("Tipo de comunicação não definida corretamente");
  }

  const { data, error } = await resend.emails.send({
    from: `${from}@pj.dev.br`,
    to: packageDelivery.destinatario,
    subject: assunto,
    react: template,
  });

  if (error) {
    throw new Error(error?.message);
  } else {
    return data;
  }
}
