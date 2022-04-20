// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config({ silent: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('../src/utils/logger');

const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql'
};

module.exports = {
  development: {
    ...common,
    logging: (msg) => {
      logger.sql(msg);
    }
  },
  test: {
    ...common,
    database: `CRONOS_test_worker${process.env.JEST_WORKER_ID}`,
    logging: false
  },
  production: {
    ...common,
    logging: false
  }
};
