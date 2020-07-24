"use strict";
/**
 * A standard action contract factory
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorContractFactory = exports.responseContractFactory = exports.actionContractFactory = void 0;

var actionContractFactory = (name, fields) => ({
  name,
  type: "record",
  fields: [{
    name: "data",
    type: {
      type: "record",
      fields
    }
  }]
});
/**
 * A standard response contract factory
 */


exports.actionContractFactory = actionContractFactory;

var responseContractFactory = (name, fields) => ({
  name,
  type: "record",
  fields: [{
    name: "response",
    type: {
      type: "record",
      fields
    }
  }]
});

exports.responseContractFactory = responseContractFactory;

var errorContractFactory = () => ({
  name: "ErrorContract",
  type: "record",
  fields: [{
    name: "error",
    type: {
      type: "record",
      fields: [{
        name: "name",
        type: "string"
      }, {
        name: "stack",
        type: "string",
        default: ""
      }, {
        name: "status",
        type: "int",
        default: 0
      }, {
        name: "message",
        type: "string",
        default: "System Error!! If you do not understand " + "why you are getting this error please email " + "admin and reference the [ 'x-request-id' ] " + "header in this response."
      }, {
        name: "userError",
        type: "boolean",
        default: false
      }]
    }
  }]
});

exports.errorContractFactory = errorContractFactory;