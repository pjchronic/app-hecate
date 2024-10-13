import Users from "@/app/models/usersOrm";
import { jwtGenerateToken } from "@/utils/jwtToken";
import { mailDelivery } from "@/utils/resend";
import { NextResponse } from "next/server";

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
        url: `http://${process.env.DOMINIO}/public/redefinicao-de-senha?token=${token}`,
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

export { forgotPassword as POST };
