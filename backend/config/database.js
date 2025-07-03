import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("TiendaCamisetas", "postgres", "2812", {
    host: "localhost",
    dialect: "postgres"
});

