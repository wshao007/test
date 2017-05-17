import Joi from 'joi';
import Boom from 'boom';
import Sequelize from 'sequelize';

import {
  Task,
  Item,
  Category
} from 'models';

import {
  genSuccessRes,
  genErrRes
} from '../tools'

export const getTasks = {
  method: 'GET',
  path: '/tasks',
  handler: (request, reply) => {
    let projection = {
      where: {
        isArchive: false
      },
      order: [['id']]
    }

    if (request.query.title && request.query.title.trim()){
      projection.where.title = {
        $like: '%' + request.query.title.trim() + '%'
      }
    }

    Task.count(projection)
      .then((total) => {
        if (request.query.limit){
          let limit = parseInt(request.query.limit);
          if (limit > 0){
            projection.limit = limit
          }
        }
        if (request.query.offset){
          let offset = parseInt(request.query.offset);
          if (offset > 0){
            projection.offset = offset
          }
        }
        // console.log(projection);
        
        Task.findAll(projection)
          .then((tasks) => {
            // reply(tasks);
            tasks = JSON.parse(JSON.stringify(tasks));
            let updateTask = (index) => {
              if (index >= tasks.length){
                return reply(genSuccessRes(['tasks', 'total'], [tasks, total]));
                // return reply(tasks)
              }
              let task = tasks[index];
              Item.findAll({
                where: {
                  id: task.items
                },
                include: [{
                  model: Category
                }]
              })
              .then((items_) => {
                task.items = items_;
                updateTask(index + 1);
              })
            }
            if (tasks.length > 0){
              updateTask(0);
            }
            else {
              reply(genSuccessRes(['tasks', 'total'], [tasks, tasks.total]))
            }
          });
      })
  }
};

export const getTask = {
  method: 'GET',
  path: '/tasks/{taskId}',
  handler: (request, reply) => {
    let taskId = parseInt(request.params.taskId);
    if (!(taskId >= 0)){
      return reply(genErrRes(['error'], ['Invalid taskId']));
    }
    Task.findOne({
        where: {
          id: taskId
        }
      })
      .then((task) => {
        if (task){
          Item.findAll({
            where: {
              id: task.items
            },
            include: [{
              model: Category
            }]
          })
          .then((items_) => {
            task.items = items_
            reply(task)
          })
        }
        else {
          reply(null);
        }
      });
  }
};

export const createTask = {
  method: 'POST',
  path: '/tasks',
  config: {
    validate: {
      payload: {
        title: Joi.string(),
        items: Joi.array(),
      }
    }
  },
  handler: (request, reply) => {

    const payload = request.payload;
    if (!payload.title){
      return reply({
        statusCode: 400,
        error: 'Bad Request',
        message: 'missing "title"'
      })
    }
    if (!payload.items){
      return reply({
        statusCode: 400,
        error: 'Bad Request',
        message: 'missing "items"'
      })
    }

    Task.create(payload).then((task) => {
      reply(task);
    });

  }
};

export const updateTask = {
  method: 'PUT',
  path: '/tasks/{taskId}',
  config: {
    validate: {
      payload: {
        title: Joi.string(),
        items: Joi.array(),
        isArchive: Joi.boolean()
      }
    }
  },
  handler: (request, reply) => {
    let taskId = parseInt(request.params.taskId);
    if (!(taskId >= 0)){
      return reply(genErrRes(['error'], ['Invalid taskId']));
    }
    const payload = request.payload;

    Task.update(payload, {
        where: {
          id: taskId
        }
      })
      .then((task) => {
        reply(task);
      });
  }
};

export const deleteTask = {
  method: 'DELETE',
  path: '/tasks/{taskId}',
  handler: (request, reply) => {
    let taskId = parseInt(request.params.taskId);
    if (!(taskId >= 0)){
      return reply(genErrRes(['error'], ['Invalid taskId']));
    }
    Task.destroy({
        where: {
          id: taskId
        }
      })
      .then((result) => {
        reply(result);
      });
  }
};

// export const testTask = {
//   method: 'GET',
//   path: '/taskstest',
//   handler: function (request, reply) {
//     // let promise = Task.findAll({});
//     let Async = require('asyncawait/async');
//     let Await = require('asyncawait/await');
//     Async(() => {
//       let x = Await(new Promise((resolve, reject) => {
//         Task.findAll({}).then((result) => {
//           resolve(result)
//         })
//       }))
//       reply(x)
//     })()
//   }
// }
