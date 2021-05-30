const Sequelize = require('sequelize'); // class
require('dotenv').config();
const User = require('./user');
// const {history} = require('./trading');
// const {content} = require('./trading');

const env = process.env.NODE_ENV || 'development';

const config= require(__dirname + '/../config/config.js')[env]
const db = {};

let sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);



db.User = User;

User.init(sequelize);



db.sequelize = sequelize; // Object
db.Sequelize = Sequelize; // class

module.exports = db;