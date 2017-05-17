// import Joi from 'joi';
// import Boom from 'boom';

// import {
//   Task
// } from 'models';

// export const getAllTasks = {
//   method: 'GET',
//   path: '/tasks',
//   handler: (request, reply) => {
//     Task.findAll()
//       .then((tasks) => {

//         reply(tasks);
//       });
//   }
// };

// export const getTask = {
//   method: 'GET',
//   path: '/tasks/{taskId}',
//   handler: (request, reply) => {
//     const taskId = request.params.taskId;

//     Task.findOne({
//         where: {
//           id: taskId
//         }
//       })
//       .then((task) => {
//         reply(task);
//       });
//   }
// };

// export const createTask = {
//   method: 'POST',
//   path: '/tasks',
//   config: {
//     validate: {
//       payload: {
//         requirements: Joi.string(),
//         deliverables: Joi.string(),
//         status: Joi.string(),
//         tstart: Joi.date(),
//         tend: Joi.date(),
//         tdue: Joi.date(),
//         tcompletion: Joi.date(),
//         uidsupervisor: Joi.string(),
//         uidoperator: Joi.string(),
//         uidauditor: Joi.string(),
//         mid: Joi.string(),
//         oid: Joi.string()
//       }
//     }
//   },
//   handler: (request, reply) => {

//     const payload = request.payload;

//     Task.create(payload).then((task) => {
//       reply(task);
//     });

//   }
// };

// export const updateTask = {
//   method: 'PUT',
//   path: '/tasks/{taskId}',
//   config: {
//     validate: {
//       payload: {
//         requirements: Joi.string(),
//         deliverables: Joi.string(),
//         status: Joi.string(),
//         tstart: Joi.date(),
//         tend: Joi.date(),
//         tdue: Joi.date(),
//         tcompletion: Joi.date(),
//         uidsupervisor: Joi.string(),
//         uidoperator: Joi.string(),
//         uidauditor: Joi.string(),
//         mid: Joi.string(),
//         oid: Joi.string()
//       }
//     }
//   },
//   handler: (request, reply) => {
//     const taskId = request.params.taskId;
//     const payload = request.payload;

//     Task.update(payload, {
//         where: {
//           id: taskId
//         }
//       })
//       .then((task) => {
//         reply(task);
//       });
//   }
// };

// export const deleteTask = {
//   method: 'DELETE',
//   path: '/tasks/{taskId}',
//   handler: (request, reply) => {
//     const taskId = request.params.taskId;

//     Task.destroy({
//         where: {
//           id: taskId
//         }
//       })
//       .then((task) => {
//         reply(task);
//       });
//   }
// };
// 
export const genSuccessRes = (props, values) => {
	return genRes('success', props, values)
}

export const genErrRes = (props, values) => {
	return genRes('error', props, values)
}

let genRes = (status, props, values) => {
	if ((props instanceof Array) && (values instanceof Array)){
		if (props.length != values.length){
			throw new Error('2 arrays must have the same number of elements')
		}
		let result = {
			status: status,
			response: {}
		}
		for(let i = 0; i < props.length; i++){
			if (props[i] in result.response){
				throw new Error('Duplicate keys for genRes')
			}
			else {
				result.response[props[i]] = values[i]
			}
		}
		return JSON.parse(JSON.stringify(result))
	}
	else{
		throw new Error('Invalid type for genRes')
	}
}