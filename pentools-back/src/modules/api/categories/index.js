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

export const getCategories = {
	method: 'GET',
	path: '/categories',
	handler: (request, reply) => {
		let projection = {
      order: [
        ['id']
      ]
    };

    if (request.query.name && request.query.name.trim()){
      projection.where = {
      	name: {
	        $like: '%' + request.query.name.trim() + '%'
	      }
	    }
    }

    Category.count(projection)
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
				Category.findAll(projection)
					.then((categories_) => {
						let categories = JSON.parse(JSON.stringify(categories_));
						let updateCategory = (index) => {
		          if (index >= categories.length){
		            return reply(genSuccessRes(['categories', 'total'], [categories, total]));
		          }
		          let category = categories[index];
		          Item.findAll({
		              where: {
		                category_id: category.id
		              }
		            })
		            .then((items_) => {
		              category.items = items_;
		              updateCategory(index + 1);
		            })
		        }
		        if (categories.length > 0) {
		          updateCategory(0);
		        } else {
		          reply(genSuccessRes(['categories', 'total'], [categories, total]))
		        }
						// reply(categories);
					});
    	})

    
	}
};

export const getCategory = {
  method: 'GET',
  path: '/categories/{categoryId}',
  handler: (request, reply) => {
    let categoryId = parseInt(request.params.categoryId);
    if (!(categoryId >= 0)){
      return reply(genErrRes(['error'], ['Invalid categoryId']));
    }

    Category.findOne({
        where: {
          id: categoryId
        }
      })
      .then((category) => {
        if (category){
        	category = JSON.parse(JSON.stringify(category));
          Item.findAll({
            where: {
              category_id: category.id
            }
          })
          .then((items_) => {
            category.items = items_
            reply(category)
          })
        }
        else {
          reply(null);
        }
      });
  }
};

export const createCategory = {
  method: 'POST',
  path: '/categories',
  config: {
    validate: {
      payload: {
        name: Joi.string()
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

    Category.create(payload).then((category) => {
      reply(category);
    });

  }
};

export const updateCategory = {
  method: 'PUT',
  path: '/categories/{categoryId}',
  config: {
    validate: {
      payload: {
        name: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    let categoryId = parseInt(request.params.categoryId);
    if (!(categoryId >= 0)){
      return reply(genErrRes(['error'], ['Invalid categoryId']));
    }
    const payload = request.payload;

    Category.update(payload, {
        where: {
          id: categoryId
        }
      })
      .then((category) => {
        reply(category);
      });
  }
};

export const deleteCategory = {
  method: 'DELETE',
  path: '/categories/{categoryId}',
  handler: (request, reply) => {
    let categoryId = parseInt(request.params.categoryId);
    if (!(categoryId >= 0)){
      return reply(genErrRes(['error'], ['Invalid categoryId']));
    }

    Category.destroy({
        where: {
          id: categoryId
        }
      })
      .then((result) => {
        reply(result);
      });
  }
};
