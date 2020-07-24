"use strict"

/**
 * A standard action contract factory
 */
export const actionContractFactory = ( name, fields ) => ({
  name ,
  type  : "record",
  fields: [
    { name: "data", type: { type: "record", fields } }
  ]
})

/**
 * A standard response contract factory
 */
export const responseContractFactory = ( name, fields ) => ({
  name,
  type  : "record",
  fields: [
    { name: "response", type: { type: "record", fields } }
  ]
})

export const errorContractFactory = ( name, fields ) => ({
  name,
  type  : "record",
  fields: [
    { name: "error", type: { type: "record", fields } }
  ]
})
