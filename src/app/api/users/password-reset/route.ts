import Users from "@/app/models/usersOrm";
import { getQueryString } from "@/utils/getQueryString";
import { jwtDecoderToken, jwtGenerateToken } from "@/utils/jwtToken";
import { mailDelivery } from "@/utils/resend";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

//#region ------ solicita redefinição
async function forgotPassword(req: Request) {
  const body = await req.json();

  try {
    const existEmail = await Users.findAll({
      where: {
        email: body.email,
      },
    });

    const existNome = await Users.findAll({
      where: {
        nomeCompleto: body.nomeCompleto,
      },
    });

    if (existEmail.length === 0) {
      return NextResponse.json(
        {
          message: "Email informado não consta cadastrado na base",
        },
        { status: 404 }
      );
    } else if (existNome.length === 0) {
      return NextResponse.json(
        {
          message: "Nome completo informado não consta cadastrado na base",
        },
        { status: 404 }
      );
    } else {
      const token: string = await jwtGenerateToken(body.nomeCompleto, "30m");

      const mailResponse = await mailDelivery({
        destinatario: body.email,
        nomeCompleto: body.nomeCompleto,
        templateType: "forgotPassoword",
        url: `http://${process.env.DOMINIO}/public/reset-password?token=${token}`,
      });
      return NextResponse.json(
        {
          message: "Email de redefinição enviado com sucesso",
          mailResponse,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao solicitar redefinição de senha", error },
      { status: 500 }
    );
  }
}

//#region --------- faz redefinição

async function resetPassword(req: Request) {
  const { senha } = await req.json();
  const token: string = getQueryString(req, "token");

  try {
    const verifyToken = jwtDecoderToken(token);

    if (token && verifyToken != "jwt expired") {
      //existe token e ele não esta expirado
      const userExist = await Users.findAll({
        where: {
          nomeCompleto: verifyToken.object,
        },
      });

      if (userExist.length >= 1) {
        // se existe usuário
        const senhasIguais: boolean = await bcrypt.compare(
          senha,
          userExist[0].dataValues.senha
        );

        if (senhasIguais) {
          // se as senha é igual a anterior ja cadastrada
          return NextResponse.json(
            { message: "Sua senha não pode ser igual a anterior" },
            { status: 409 }
          );
        } else {
          const criptPassword: string = await bcrypt.hash(senha, 10);

          await Users.update(
            {
              senha: criptPassword,
            },
            { where: { nomeCompleto: verifyToken.object } }
          );

          return NextResponse.json(
            { message: "Senha alterada com sucesso!" },
            { status: 200 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Usuário correspondente ao token não existe na base" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message:
            "token expirado ou inexistente, solicite uma nova redefinição",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao redefinir senha", error },
      { status: 500 }
    );
  }
}
export { forgotPassword as POST, resetPassword as PATCH };
