import { NextResponse, NextRequest } from "next/server";
import { tablesInitializer } from "./utils/middlewaresFunctions/initdatabaseMiddleware";

export async function middlewares(request: NextRequest) {
  const endPoint = request.nextUrl;
  
  try {
      console.log(endPoint);
    
      await tablesInitializer(); //middleware de inicialização de tabelas
    
      return NextResponse.next();
    
  } catch (error) {
    return NextResponse.json({Erro: error})
  }
}

export const config = {
  matcher: "/api/:path*",
};
