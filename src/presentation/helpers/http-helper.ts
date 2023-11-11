import { ServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const BadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const InternalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const Ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
