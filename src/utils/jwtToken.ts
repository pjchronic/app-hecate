import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export function jwtGenerateToken(object: any, expiresIn: string) {
  if (secret) {
    const token: string = jwt.sign({ object }, secret, { expiresIn });
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
    return error.message;
  }
}
