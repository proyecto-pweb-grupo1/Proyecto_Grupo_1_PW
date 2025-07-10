import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("TiendaCamisetas", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres"
});

