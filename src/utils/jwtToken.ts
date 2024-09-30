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
  if (secret) {
    const decoded: any = jwt.verify(token, secret);
    return decoded;

  } else {
    throw new Error("Secret não definida");
  }
}
