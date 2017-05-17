import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from './tasks';

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} from './items'

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from './categories'

exports.register = function (server, options, next) {
  server.route(getTasks);
  server.route(getTask);
  server.route(createTask);
  server.route(updateTask);
  server.route(deleteTask);
  server.route(getItems);
  server.route(getItem);
  server.route(createItem);
  server.route(updateItem);
  server.route(deleteItem);
  server.route(getCategories);
  server.route(getCategory);
  server.route(createCategory);
  server.route(updateCategory);
  server.route(deleteCategory)

  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};