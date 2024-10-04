import Guest from "@/app/models/guestOrm";
import { GuestInputInterface } from "./interfaces";
import { jwtDecoderToken, jwtGenerateToken } from "@/utils/jwtToken";
import { mailDelivery } from "@/utils/resend";
import { NextResponse } from "next/server";
import { tablesInitializer } from "@/utils/MiddlewaresFunctions/initdatabaseMiddleware";
import Users from "@/app/models/usersOrm";

//#region ------ Envio de convite
async function invite(req: Request) {
  const guest: GuestInputInterface = await req.json();
  // const idAnfitriao: number = parseInt(req.query.idAnfitriao as string, 10);

  try {
    await tablesInitializer();

    const newToken: string = await jwtGenerateToken(guest.nomeCompleto, "3h");

    const existInvite: any = await Guest.findAll({
      attributes: ["token"],
      where: {
        email: guest.email,
      },
    });

    const existCadastro = await Users.findAll({
      where: {
        nomeCompleto: guest.email,
      },
    });

    if (existCadastro.length >= 1) {
      // Informa se existe um cadastro para aquele email
      return NextResponse.json(
        { message: "O Aventureiro já faz parte do app Hecate" },
        { status: 409 }
      );
    } else if (existInvite.length >= 1) {
      //  Verfica se existe um convite para aquele email e se existir verifica o token
      const verifyToken = await jwtDecoderToken(
        existInvite[0].dataValues.token
      );

      if (verifyToken === "jwt expired") {
        // se o token estiver expirado envia um novo
        await Guest.update(
          { token: newToken },
          { where: { nomeCompleto: guest.nomeCompleto } }
        );

        await mailDelivery({
          destinatario: guest.email!,
          templateType: "invite",
          url: `http://${process.env.DOMINIO}/cadastro?token=${newToken}`,
          nomeCompleto: guest.nomeCompleto!,
        });

        return NextResponse.json(
          {
            message: "Token expirado, enviamos um novo link para o e-mail do convidado",
          },
          { status: 401 }
        );
      } else {
        // informa se o token enviado anteriomente ainda está válido
        return NextResponse.json(
          { message: "O Aventureiro já recebeu um e-mail com o token" },
          { status: 409 }
        );
      }
    } else {
      // se não houver cadastro e nem convite, faz o envio do convite
      await Guest.create({
        //    idAnfitriao,
        nomeCompleto: guest.nomeCompleto,
        email: guest.email,
        token: newToken,
      });

      const mailResponse = await mailDelivery({
        destinatario: guest.email!,
        templateType: "invite",
        url: `http://${process.env.DOMINIO}/cadastro?token=${newToken}`,
        nomeCompleto: guest.nomeCompleto!,
      });

      return NextResponse.json(
        { message: "Convite enviado com sucesso!", mailResponse },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao enviar convite!", error },
      { status: 500 }
    );
  }
}
//#endregion

export { invite as POST };
