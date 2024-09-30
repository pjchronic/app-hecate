import Guest from "@/app/models/guestOrm";
import { GuestInputInterface } from "./interfaces";
import { jwtGenerateToken } from "@/utils/jwtToken";
import { NextApiRequest, NextApiResponse } from "next";
import { mailDelivery, PackageDeliveryInterface } from "@/utils/resend";

//#region ------ Envio de convite
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

    const packageDelivery: PackageDeliveryInterface = {
      destinatario: guest.email!,
      templateType: "invite",
      url: `http://${process.env.DOMINIO}/cadastro?token=${token}`,
      nomeCompleto: guest.nomeCompleto!,
    };

    await mailDelivery(packageDelivery);

    res.status(200).json({ message: "Convite enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao enviar convite!" });
  }
}
//#endregion



export { invite as POST };
