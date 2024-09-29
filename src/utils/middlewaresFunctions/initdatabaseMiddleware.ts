import Guest from "@/app/models/guestOrm";
import Users from "@/app/models/usersOrm";
import { sequelize } from "../configBd";


export async function tablesInitializer() {
  try {
    await Guest.sync();
    await Users.sync();
    await sequelize.sync({ alter: true });

    console.log("Tabelas já existem ou foram criadas com sucesso");
  } catch (error) {
    throw new Error("Erro ao criar tabela de convidados no banco");  
  }
}



