"use strict"

/**
 * A standard action contract factory
 */
export const actionContractFactory = fields => ( {
  fields: [
    { name: "data", type: { fields, type: "record" } }
  ],
  name: "RequestContract",
  type: "record"
} )

/**
 * A standard response contract factory
 */
export const responseContractFactory = fields => ( {
  fields: [
    { name: "response", type: { fields, type: "record" } }
  ],
  name: "ResponseContract",
  type: "record"
} )

/**
 * Default error contract factory for handling
 * response failures on either side of the MQ
 */
export const errorContractFactory = () => ( {
  fields: [
    {
      name: "error",
      type: {
        fields: [
          { default: "Error", name: "name", type: "string" },
          { default: "", name: "stack", type: "string" },
          { default: 0, name: "status", type: "int" },
          { default: "System Error", name: "message", type: "string" },
          { default: false, name: "userError", type: "boolean" }
        ],
        type: "record"
      }
    }
  ],
  name: "ErrorContract",
  type: "record"
} )

