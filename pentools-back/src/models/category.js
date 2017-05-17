import Sequelize from 'sequelize';
import _ from 'lodash';
import { Database } from './database';
import { BaseModel } from './base';

export const Category = Database.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, _.merge(BaseModel.config, {

}));
