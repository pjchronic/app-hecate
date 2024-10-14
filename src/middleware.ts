import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const endPoint = request.nextUrl.pathname;

  try {
    console.log("Endpoint:", endPoint);
    //colocar lógica de validação aqui

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ Erro: error });
  }
}


// Usar o Matcher abaixo para definir as rotas que terão autenticação

/* export const config = {
  matcher: "/api/:path*",
}; */
