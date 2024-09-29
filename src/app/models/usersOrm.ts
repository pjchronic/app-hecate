import { sequelize } from "@/utils/configBd";
import { DataTypes, Model } from "sequelize";

class Users extends Model {
  public idUsuario!: number;
  public idConvite!: number;
  public email!: string;
  public nomeCompleto!: string;
  public senha!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_usuario",
    },
    idConvite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_convite",
      references: {
        model: "convites",
        key: "id_convite",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nome_completo",
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    underscored: true,
  }
);

export default Users;
