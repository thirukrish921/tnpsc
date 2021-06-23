'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName:true
  },
  pool: {
    max: Number(CONFIG.max_pool_conn),
    min: Number(CONFIG.min_pool_conn),
    idleTime: CONFIG.conn_idle_time
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
    console.log("Model: ",model);
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log("Model: ",modelName);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
