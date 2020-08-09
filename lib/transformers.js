"use strict"

import { isContentValidType, schemaType } from "./typeCheck"

export const toAVRO = async ( obj, AVRORule, is = {} ) => {
  const Type = AVRORule |> ( is |> schemaType )
  if ( await isContentValidType( Type, obj ) ) {
    return obj |> Type.toBuffer
  }
}

export const fromAVRO = ( content, AVRORule, is = {} ) => {
  const Type = AVRORule |> ( is |> schemaType )
  return content |> Type.fromBuffer
}