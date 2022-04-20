/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import { Sequelize, DataType } from 'sequelize-typescript';
import logger from 'src/utils/logger/logger';
const basename = path.basename(__filename);
//! Fichier de config est obligatoire pour le script de migration.
const config = require('config/config.js')[process.env.NODE_ENV || 'development'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = {};

let database = config.database;

if (process.env.JEST_WORKER_ID) {
  database = `CRONOS_test_worker${process.env.JEST_WORKER_ID}`;
}

const sequelize = new Sequelize(
  database,
  config.username,
  config.password,
  config
);

logger.info('[sequelize] Initializing [db] connector ⏲️ ...');

sequelize
  .authenticate()
  .then(() => {
    logger.info('[sequelize] Connected 😻 !');
  })
  .catch((err: Error) => {
    logger.info(`[sequelize] Error ${err}`);
  });
logger.info('[sequelize] loading models ... 🚄');
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
    );
  })
  .forEach((file: string) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, DataType);
    db[model.name] = model;
    sequelize.addModels([model]);
    logger.info(`[sequelize] Model added : ${model.name} 🎟️`);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
