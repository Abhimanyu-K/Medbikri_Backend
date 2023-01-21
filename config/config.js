const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const config = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "postgres",
    password: env.DB_PASSWORD,
    database: env.DB_NAME || "postgres",
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
