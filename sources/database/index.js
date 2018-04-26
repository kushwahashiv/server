const Sequelize = require('sequelize');
const config = require('../../config');

const dbConfig = config.sources.database;
const source = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, dbConfig.options);

module.exports = source;
