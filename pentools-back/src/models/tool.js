import Sequelize from 'sequelize';
import _ from 'lodash';
import { Database } from './database';
import { BaseModel } from './base';

export const Task = Database.define('task', {
  requirements: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deliverables: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tstart: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  tend: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  tdue: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  tcompletion: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  uidsupervisor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uidoperator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uidauditor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  oid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, _.merge(BaseModel.config, {

}));
