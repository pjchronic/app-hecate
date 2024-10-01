import { sequelize } from "@/utils/configBd";
import { DataTypes, Model } from "sequelize";

class Guest extends Model {
  public idConvite!: number;
  public idAnfitriao?: number;
  public nomeCompleto!: string;
  public email!: string;
  public token!: string;

  public readonly createdAt!: Date;
}

Guest.init(
  {
    idConvite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_convite",
    },
    idAnfitriao: {
      type: DataTypes.INTEGER,
      field: "id_anfitriao",
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nome_completo",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "convites",
    timestamps: true,
    underscored: true,
  }
);

export default Guest;
