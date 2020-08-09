"use strict"

const chai = require( "chai" )
const { expect } = chai

const {
  actionContractFactory,
  responseContractFactory,
  errorContractFactory
} = require( "../lib/factories" )

describe( "Factories", () => {
  describe( "Action contract:", () => {
    it( "takes one argument <Object(AVRORule)>", () => {
      const AVRORule = [ { name: "firstName", type: "string" } ]
      expect( () => actionContractFactory( AVRORule ) ).to.not.throw()
      const contract = actionContractFactory( AVRORule )
      const expected = {
        fields: [{
          name: "data",
          type: {
            fields: [
              { name: "firstName", type: "string" }
            ],
            type: "record"
          }
        }],
        name: "RequestContract",
        type: "record"
      }
      expect( contract ).to.deep.equal( expected )
    })
  })
  describe( "Response contract:", () => {
    it( "takes one argument <Object(AVRORule)>", () => {
      const AVRORule = [ { name: "id", type: "number" }, { name: "lastName", type: "string" } ]
      expect( () => responseContractFactory( AVRORule ) ).to.not.throw()
      const contract = responseContractFactory( AVRORule )
      const expected = {
        fields: [{
          name: "response",
          type: {
            fields: [
              { name: "id", type: "number" },
              { name: "lastName", type: "string" }
            ],
            type: "record"
          }
        }],
        name: "ResponseContract",
        type: "record"
      }
      expect( contract ).to.deep.equal( expected )
    })
  })
  describe( "Error contract:", () => {
    it( "takes zero arguments", () => {
      expect( errorContractFactory ).to.not.throw()
      const contract = errorContractFactory()
      const expected = {
        fields: [{
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
        }],
        name: "ErrorContract",
        type: "record"
      }
      expect( contract ).to.deep.equal( expected )
    })
  })
})