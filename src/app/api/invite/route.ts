import Guest from "@/app/models/guestOrm";
import { GuestInputInterface } from "./interfaces";
import { jwtGenerateToken } from "@/utils/jwtToken";
import { NextApiRequest, NextApiResponse } from "next";

async function invite(req: NextApiRequest, res: NextApiResponse) {
  const guest: GuestInputInterface = req.body;
  const idAnfitriao: number = parseInt(req.query.idAnfitriao as string, 10);

  try {
    const token: string = await jwtGenerateToken(guest.nomeCompleto, "3h");
    await Guest.create({
      idAnfitriao,
      nomeCompleto: guest.nomeCompleto,
      email: guest.email,
    });
    res.status(200).json({ message: "Convite enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar convite!" });
  }
}

export { invite as POST };
