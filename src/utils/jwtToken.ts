import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export function jwtGenerateToken(object: any, time: string) {
  if (secret) {
    const token: string = jwt.sign(object, secret, { expiresIn: time });
    return token;
  } else {
    throw new Error("Secret não definida");
  }
}

export function jwtDecoderToken(token: string) {
  try {
    const decoded: any = jwt.verify(token, secret!);
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado:", error.message);
    } else {
      throw new Error("Erro ao verificar o token:", error.message);
    }
  }
}
