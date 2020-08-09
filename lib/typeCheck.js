"use strict"

import avro from "avsc"
import {
  actionContractFactory,
  errorContractFactory,
  responseContractFactory
} from "./factories"

const errTemplate = {
  name     : "Transformer::isValid:avroErrorHook",
  status   : 500,
  userError: false
}

export const schemaType = ( { response, error } ) => AVRORule => (
  response
    ? avro.Type.forSchema( [ responseContractFactory( AVRORule ) ] )
    : error
      ? avro.Type.forSchema( [ errorContractFactory() ] )
      : avro.Type.forSchema( [ actionContractFactory( AVRORule ) ] )
)

export const isContentValidType = async ( type, obj ) => {
  const options = {
    /**
     * Handles errors in avro schema checking
     * @param { Array<string> } location - location of the error
     * @param { Object } errorBlock - The actual error block
     * @param { String } recordType - Expected AVRO type
     * @param { Object } record - The record
     */
    errorHook: ( location, errorBlock, recordType ) => {
      const typeJSON = recordType.toJSON()
      if ( typeJSON.fields ) {
        if ( typeof errorBlock === "object" ) {
          Object.keys( errorBlock ).every( fieldName => {
            if ( !typeJSON.fields.some( field => field.name === fieldName ) ) {
              throw {
                ...errTemplate,
                message: location.length > 0 ?
                  `[${ location.join( "." ) }] - Field [${ fieldName }] is not allowed` :
                  `Field [${ fieldName }] is not allowed`
              }
            }
            return true
          } )
          typeJSON.fields.every( field => {
            if ( typeof errorBlock[ field.name ] !== field.type ) {
              throw{
                message: `For ${ location[ location.length - 1 ] }.${ field.name }, `+
                  `expected :${ field.type }, ` +
                  `got: ${ typeof errorBlock[ field.name ] }`,
                ...errTemplate
              }
            }
            return true
          } )
        } else {
          throw {
            ...errTemplate,
            message: `Does not exist or is undefined in response: [${ location.join( "." ) }]`
          }
        }
      } else {
        throw {
          ...errTemplate,
          message: `For ${ location.join( "." ) }, ` +
                   `expected: ${ typeJSON }, ` +
                   `got: ${ typeof errorBlock }`
        }
      }
      return true
    },
    // DO NOT CHANGE: This assures there is no unwanted data making it through the message queue
    noUndeclaredFields: true
  }
  return await type.isValid( obj, options )
}