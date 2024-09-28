import {ZodSchema} from "zod"

export const newAct = <I extends ZodSchema, O extends ZodSchema>(options: {
  in?: I
  out?: O
  do: (inDataParsed: I["_input"]) => Promise<unknown>
}): ((inDataRaw: I["_input"]) => Promise<O["_output"]>) => {
  return async (inDataRaw) => {
    const inDataParsed = options.in ? options.in.parse(inDataRaw) : undefined
    const outDataRaw = await options.do(inDataParsed)
    const outDataParsed = options.out
      ? options.out.parse(outDataRaw)
      : undefined
    return outDataParsed
  }
}
