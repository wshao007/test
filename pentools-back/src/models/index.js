import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

import {
  Database
} from './database';
import {
  Task
} from './task';
import {
  Category
} from './category';
import {
  Item
} from './item';


// Relationships
Category.hasMany(Item);
Item.belongsTo(Category);

console.log('fake: ' + process.env.fake);
console.log('force: ' + process.env.force);

Database.sync()

// Database.sync({
//   force: process.env.force
// }).then(() => {
//   _.times(10, (time) => {
//     let objects = [];

//     if (process.env.fake){
//       Category.create({
//         name: `Category ${time + 1}`
//       })
//       .then((category) => {
//         _.times(5, () => {
//           Item.create({
//             name: `Item ${(time + 1)} | Category ${category.id}`,
//             category_id: category.id
//           })
//         })
//       })

//     Task.create({
//       title: `Task ${time + 1}`,
//       items: [1, 2, 3, 4, 5, 6]
//     });
//     }
//   });
// });

export {
  Database,
  Task,
  Category,
  Item,
};