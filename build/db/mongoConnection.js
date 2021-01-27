"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connectMongo;

var _global_config = require("../config/global_config");

function connectMongo(mongoose) {
  var mongoURI = (0, _global_config.getConfig)('/mongoDbUrl');
  mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err) {
    if (err) {
      console.error(err);
      console.log('Failed to connect database');
    } else {
      console.log('Connected to Mongo database');
    }
  });
}