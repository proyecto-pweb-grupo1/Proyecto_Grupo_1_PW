import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres", "admincloud@postgres-cloudweb", "Grupo-01", {
    host: "postgres-cloudweb.postgres.database.azure.com",
    dialect: "postgres"
});

