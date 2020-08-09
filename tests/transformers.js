"use strict"

const chai = require( "chai" )
const cap = require("chai-as-promised")
chai.use(cap)
const { expect } = chai

const { fromAVRO, toAVRO } = require( "../lib/transformers" )

process.on( "unhandledRejection", () => void 0 )

const
  actionData = { data: { username: "donsky" } },
  actionSchema = [{ name: "username", type: "string" }],
  responseData = { response: { firstName: "Firstname", lastName: "Lastname" } },
  responseSchema = [
    { name: "firstName", type: "string" },
    { name: "lastName", type: "string" },
  ],
  errorData = {
    error: {
      message: "FAILURE",
      name: "Error",
      stack: "",
      status: 404,
      userError: false
    }
  },
  errorSchema = [ {
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
  }]

describe( "Main exports...", () => {
  describe( "  are functions:", () => {
    it( "fromAVRO", () => expect( fromAVRO ).to.be.a( "function" ) )
    it( "toAVRO", () => expect( toAVRO ).to.be.a( "function" ) )
  })
})

describe( "Transformers", () => {
  describe( "to", () => {
    it( "throws without proper agruments", () =>{
      expect( toAVRO() ).to.eventually.throw()
    })
    describe( "takes data and schema for:", () =>{
      it( "action", async () => {
        const buf = await toAVRO( actionData, actionSchema )
        expect( buf.toJSON().data ).to.deep.equal([0, 12, 100, 111, 110, 115, 107, 121 ])
      })
      it( "response", async () => {
        const buf = await toAVRO( responseData, responseSchema, { response: true } )
        expect( buf.toJSON().data ).to.deep.equal([
            0,  18,  70, 105, 114, 115,
          116, 110,  97, 109, 101,  16,
          76,  97, 115, 116, 110,  97,
          109, 101
        ])
      })
      it( "error", async () => {
        const buf = await toAVRO( errorData, errorSchema, { error: true } )
        expect( buf.toJSON().data ).to.deep.equal([
          0, 10, 69, 114, 114, 111, 114,
          0,  168, 6, 14,  70,  65,  73,  76,
         85, 82, 69,   0
       ])
      })
    })
  })
  describe( "from:", () => {
    it( "throws without proper agruments", () =>{
      expect( fromAVRO ).to.throw()
    })
    describe( "converts AVRO buffer back into JSON from", () => {
      it( "action", async () => {
        const converted = JSON.parse( fromAVRO( await toAVRO( actionData, actionSchema ), actionSchema ) )
        expect( converted ).to.deep.equal( actionData )
      })
      it( "response", async () => {
        const converted = JSON.parse( fromAVRO( await toAVRO( responseData, responseSchema, {response: true} ), responseSchema, { response: true } ) )
        expect( converted ).to.deep.equal( responseData )
      })
      it( "error", async () => {
        const converted = JSON.parse( fromAVRO( await toAVRO( errorData, errorSchema, { error: true } ), errorSchema, { error: true } ) )
        expect( converted ).to.deep.equal( errorData )
      })
    })
  })
})