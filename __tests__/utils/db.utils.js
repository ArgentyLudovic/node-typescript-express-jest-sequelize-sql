const { Sequelize } = require("sequelize-typescript");
const path = require("path");
const { Umzug, SequelizeStorage } = require("umzug");
const mysql = require("mysql2/promise");
const config = require("../../config/config").test;
import logger from "../../src/utils/logger";
const {
  default: { sequelize },
} = require("../../src/models");

const configConnection = {
  host: "localhost",
  user: config.username,
  password: config.password,
};

let connection;

const createAllworkers = async () => {
  connection = mysql.createPool(configConnection);
  const databaseName = `CRONOS_test_worker${process.env.JEST_WORKER_ID}`;
  await connection
    .query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`)
    .then(([rows]) => {
      logger.warn("[mysql & query] Response: ", rows);
      connection.end();
    })
    .catch((error) => {
      logger.error("[mysql & query] Response: ", error);
      throw error;
    });

  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger,
    migrations: {
      glob: ["migrations/*.js", { cwd: path.resolve(__dirname, "../../") }],
      resolve: ({ name, path: pathWay, context }) => {
        const migration = require(pathWay || "");
        return {
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      },
    },
  });
  await umzug.up();
};

const destroyDB = async () => {
  connection = mysql.createPool(configConnection);
  const databaseName = `CRONOS_test_worker${process.env.JEST_WORKER_ID}`;
  await connection
    .query(`DROP DATABASE \`${databaseName}\`;`)
    .then(([rows]) => {
      logger.warn("Response: ", rows);
      connection.end();
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  createAllworkers,
  destroyDB,
};
