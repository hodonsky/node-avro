"use strict"

import avro from "avsc"

import {
  actionContractFactory,
  errorContractFactory,
  responseContractFactory
} from "./factories"

export const fromAVRO = ( content, AVRORule, is = {} ) => {
  try {
    const Type = do {
      const { response, error } = is
      if ( response ) {
        avro.Type.forSchema( [ responseContractFactory( "ResponseContract", AVRORule ) ] )
      } else if ( error ) {
        avro.Type.forSchema( [ errorContractFactory() ] )
      } else {
        avro.Type.forSchema( [ actionContractFactory( "RequestContract", AVRORule ) ] )
      }
    }
    return content |> Type.fromBuffer
  } catch ( error ) {
    throw {
      name     : error?.name || `Transformer::fromAVRO:failed[type:${type}]`,
      message  : error?.message || "Something went wrong in unbuffering...",
      stack    : error?.stack || "",
      status   : error?.status || 500,
      userError: error?.userError || false
    }
  }
}