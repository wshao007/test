import Joi from 'joi';
import Boom from 'boom';

import {
  Item,
  Category
} from 'models';

import {
  genSuccessRes,
  genErrRes
} from '../tools'

export const getItems = {
	method: 'GET',
	path: '/items',
	handler: (request, reply) => {
		let projection = {};
		projection.include = [{
			model: Category
		}]

		if (request.query.name && request.query.name.trim()){
      projection.where = {
      	name: {
	        $like: '%' + request.query.name.trim() + '%'
	      }
	    }
    }

		Item.count(projection)
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
				Item.findAll(projection)
					.then((items) => {
						reply(genSuccessRes(['items', 'total'], [items, total]));
					});
			})

    
	}
};

export const getItem = {
  method: 'GET',
  path: '/items/{itemId}',
  handler: (request, reply) => {
    let itemId = parseInt(request.params.itemId);
    if (!(itemId >= 0)){
      return reply(genErrRes(['error'], ['Invalid itemId']));
    }
    Item.findOne({
        where: {
          id: itemId
        },
        include: [{
					model: Category
				}]
      })
      .then((item) => {
        reply(item);
      });
  }
};


export const createItem = {
  method: 'POST',
  path: '/items',
  config: {
    validate: {
      payload: {
        name: Joi.string(),
        category_id: Joi.number(),
      }
    }
  },
  handler: (request, reply) => {

    const payload = request.payload;
    if (!payload.name){
      return reply({
        statusCode: 400,
        error: 'Bad Request',
        message: 'missing "name"'
      })
    }
    if (!payload.category_id){
      return reply({
        statusCode: 400,
        error: 'Bad Request',
        message: 'missing "category_id"'
      })
    }
    let projection = {attributes: ['id']}
    Category.findAll(projection)
    	.then((categories) => {
    		let categorieIds = [];
    		categories.map((category) => {
    			categorieIds.push(category.id);

    		})
    		// reply(categorieIds)
    		if (categorieIds.indexOf(payload.category_id) < 0) {
    			return reply({
    				statusCode: 400,
		        error: 'Bad Request',
		        message: 'Invalid category_id'
    			})
    		}
    		Item.create(payload).then((item) => {
		      reply(item);
		    });
    	})

    

  }
};

export const updateItem = {
  method: 'PUT',
  path: '/items/{itemId}',
  config: {
    validate: {
      payload: {
        name: Joi.string(),
        category_id: Joi.number()
      }
    }
  },
  handler: (request, reply) => {
    let itemId = parseInt(request.params.itemId);
    if (!(itemId >= 0)){
      return reply(genErrRes(['error'], ['Invalid itemId']));
    }
    const payload = request.payload;
    if (payload.category_id){
    	let projection = {attributes: ['id']}
      Category.findAll()
    	.then((categories) => {
    		let categorieIds = [];
    		categories.map((category) => {
    			categorieIds.push(category.id);

    		})
    		// reply(categorieIds)
    		if (categorieIds.indexOf(payload.category_id) < 0) {
    			return reply({
    				statusCode: 400,
		        error: 'Bad Request',
		        message: 'Invalid category_id'
    			})
    		}
    		Item.update(payload, {
	        where: {
	          id: itemId
	        }
	      })
	      .then((item) => {
	        reply(item);
	      });
    	})
    }
    else {
    	Item.update(payload, {
        where: {
          id: itemId
        }
      })
      .then((item) => {
        reply(item);
      });
    }
  }
};

export const deleteItem = {
  method: 'DELETE',
  path: '/items/{itemId}',
  handler: (request, reply) => {
    let itemId = parseInt(request.params.itemId);
    if (!(itemId >= 0)){
      return reply(genErrRes(['error'], ['Invalid itemId']));
    }

    Item.destroy({
        where: {
          id: itemId
        }
      })
      .then((result) => {
        reply(result);
      });
  }
};
