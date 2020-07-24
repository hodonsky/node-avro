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

export const errorContractFactory = () => ({
  name: "ErrorContract",
  type  : "record",
  fields: [
    {
      name: "error",
      type: {
        type: "record",
        fields:[
          { name: "name", type: "string" },
          { name: "stack", type: "string", default: "" },
          { name: "status", type: "int", default: 0 },
          {
            name   : "message",
            type   : "string",
            default: "System Error!! If you do not understand " +
                    "why you are getting this error please email " +
                    "admin and reference the [ 'x-request-id' ] " +
                    "header in this response."
          },
          { name: "userError", type: "boolean", default: false }
        ]
      }
    }
  ]
})

