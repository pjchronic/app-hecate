import Users from "@/app/models/usersOrm";
import { NextResponse } from "next/server";
import { loginInterface, tokenLoginInterface } from "../interface";
import bcrypt from "bcrypt";
import { jwtGenerateToken } from "@/utils/jwtToken";

async function login(req: Request) {
  const body: loginInterface = await req.json();

  try {
    const user = await Users.findOne({
      attributes: ["email", "senha"],
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.senha, user.senha))) {
      const objResponse: tokenLoginInterface = {
        accessToken: jwtGenerateToken(user.idUsuario, "1h"),
        refreshToken: jwtGenerateToken(user.idUsuario, "30d"),
      };

      return NextResponse.json(objResponse, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Usuário ou senha inválidos" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao seguir com o cadastro", error },
      { status: 500 }
    );
  }
}

export { login as POST };
