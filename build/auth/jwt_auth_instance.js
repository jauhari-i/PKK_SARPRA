"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.getToken = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _global_config = require("../config/global_config");

var _error = require("../helpers/error");

var jwt = _jsonwebtoken["default"];

var getKey = function getKey(keyPath) {
  return _fs["default"].readFileSync(keyPath, 'utf-8');
};

var generateToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var privateKey, verifyOptions, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            privateKey = getKey((0, _global_config.getConfig)('/privateKey'));
            verifyOptions = {
              algorithm: 'RS256',
              expiresIn: '24h'
            };
            _context.next = 4;
            return jwt.sign(payload, privateKey, verifyOptions);

          case 4:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var getToken = function getToken(headers) {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    var parted = headers.authorization.split(' ');

    if (parted.length === 2) {
      return parted[1];
    }
  }

  return undefined;
};

exports.getToken = getToken;

var verifyToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var publicKey, verifyOptions, token, decodedToken, userId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            publicKey = _fs["default"].readFileSync((0, _global_config.getConfig)('/publicKey'), 'utf8');
            verifyOptions = {
              algorithm: 'RS256'
            };
            token = getToken(req.headers);

            if (token) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }));

          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return jwt.verify(token, publicKey, verifyOptions);

          case 8:
            decodedToken = _context2.sent;
            _context2.next = 16;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](5);

            if (!(_context2.t0 instanceof jwt.TokenExpiredError)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Access token expired!'
            }));

          case 15:
            return _context2.abrupt("return", (0, _error.handleError)({
              statusCode: 401,
              message: 'Token is not valid!'
            }));

          case 16:
            userId = decodedToken.sub;
            req.userId = userId;
            next();

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 11]]);
  }));

  return function verifyToken(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;