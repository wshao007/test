import Sequelize from 'sequelize';
import config from '../config/config';

export const Database = new Sequelize(
  config.database.database_name,
  config.database.username,
  config.database.password,
  {
    dialect: config.database.type,
    logging: false
    // host: config.database.host
  }
);
