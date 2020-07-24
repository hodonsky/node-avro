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

var errorContractFactory = (name, fields) => ({
  name,
  type: "record",
  fields: [{
    name: "error",
    type: {
      type: "record",
      fields
    }
  }]
});

exports.errorContractFactory = errorContractFactory;