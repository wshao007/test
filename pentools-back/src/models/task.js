import Sequelize from 'sequelize';
import _ from 'lodash';
import { Database } from './database';
import { BaseModel } from './base';

export const Task = Database.define('task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isArchive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_archive'
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
}, _.merge(BaseModel.config, {

}));
