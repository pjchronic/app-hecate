import bcrypt from "bcrypt";
import Users from "@/app/models/usersOrm";
import Guest from "@/app/models/guestOrm";
import { jwtDecoderToken } from "@/utils/jwtToken";
import { mailDelivery, PackageDeliveryInterface } from "@/utils/resend";
import { getQueryString } from "@/utils/getQueryString";
import { tablesInitializer } from "@/utils/MiddlewaresFunctions/initdatabaseMiddleware";
import { NextResponse } from "next/server";

//#region ------ Cadastro de usuário
async function cadastro(req: Request) {
  await tablesInitializer();

  const token: string = getQueryString(req, "token");
  const body = await req.json();

  const senha: string = await bcrypt.hash(body.senha, 10);

  try {
    if (token) {
      // se existir token na querystring
      const verifyToken = jwtDecoderToken(token);

      if (!(verifyToken === "jwt expired")) {
        // Se token não estiver expirado

        const existCadastro = await Users.findAll({
          where: {
            nomeCompleto: verifyToken.object,
          },
        });

        const existConvite = await Guest.findAll({
          attributes: ["idConvite", "email"],
          where: { nomeCompleto: verifyToken.object },
        });

        if (existCadastro.length >= 1) {
          // Verifica se já está cadastrado
          return NextResponse.json(
            { message: "O Aventureiro já faz parte do app Hecate" },
            { status: 409 }
          );
        } else if (existConvite.length === 0) {
          // Verifica se realmente existe um convite na base
          return NextResponse.json(
            {
              message:
                "Não existe convite para este token. Solicite um novo convite ao seu anfitrião",
            },
            { status: 404 }
          );
        } else {
          //não existe cadastro mas existe convite

          await Users.create({
            idConvite: existConvite[0].dataValues.idConvite,
            email: existConvite[0].dataValues.email,
            nomeCompleto: verifyToken.object,
            senha,
          });

          await mailDelivery({
            destinatario: existConvite[0].dataValues.email!,
            templateType: "welcome",
            nomeCompleto: verifyToken.object!,
          });

          return NextResponse.json(
            { message: "Cadastro realizado com sucesso!", mailDelivery },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message:
              "Token expirado, solicite um novo convite ao seu anfitrião",
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Token não encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao seguir com o cadastro", error },
      { status: 500 }
    );
  }
}
//#endregion

export { cadastro as POST };
