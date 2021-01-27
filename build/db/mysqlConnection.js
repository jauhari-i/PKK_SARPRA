"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _global_config = require("../config/global_config");

var _mysql = _interopRequireDefault(require("mysql"));

var mysqlConfig = (0, _global_config.getConfig)('/mysqlConfig');

var db = _mysql["default"].createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  acquireTimeout: 30000,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});

exports.db = db;