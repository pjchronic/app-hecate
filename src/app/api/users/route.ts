import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Users from "@/app/models/usersOrm";
import Guest from "@/app/models/guestOrm";
import { jwtDecoderToken } from "@/utils/jwtToken";
import { mailDelivery, PackageDeliveryInterface } from "@/utils/resend";

//#region ------ Cadastro de usuário
async function cadastro(req: NextApiRequest, res: NextApiResponse) {
  const token: string | undefined = req.query.token as string | undefined;
  const senha: string = await bcrypt.hash(req.body.senha, 10);

  try {
    if (token) {
      const nomeToken = jwtDecoderToken(token);

      const invite: any = await Guest.findAll({
        attributes: ["token", "email"],
        where: {
          nomeCompleto: nomeToken.data,
        },
      });

      if (invite.length === 0) {
        res.status(404).json({
          erro: "Convite não consta na base. Contate o seu anfitrião para solicitar o seu.",
        });
      } else { // falta verificar se token está ou não expirado
        await Users.create({
          idConvite: invite.idConvite,
          email: invite.email,
          senha,
          nomeCompleto: nomeToken.data,
        });

        const packageDelivery: PackageDeliveryInterface = {
          destinatario: invite.email,
          templateType: "welcome",
          nomeCompleto: nomeToken.data,
        };
        await mailDelivery(packageDelivery);

        res.status(200).json({
          message: "Cadastro feito com sucesso! Seja bem-vindo(a) ao Hecate!",
        });
      }
    } else {
      res.status(404).json({
        erro: "Token não fornecido. Solicite um convite ao seu anfitrião",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar aventureiro!", error });
  }
}
//#endregion

export { cadastro as POST };
