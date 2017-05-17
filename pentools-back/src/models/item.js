import Sequelize from 'sequelize';
import _ from 'lodash';
import { Database } from './database';
import { BaseModel } from './base';

export const Item = Database.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, _.merge(BaseModel.config, {

}));
