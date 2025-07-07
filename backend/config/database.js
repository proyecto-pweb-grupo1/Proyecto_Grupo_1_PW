import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("TiendaCamisetas", "postgres", "sebas135", {
    host: "localhost",
    dialect: "postgres"
});

