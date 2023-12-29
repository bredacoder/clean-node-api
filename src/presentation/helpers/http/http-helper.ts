import { ServerError, UnauthorizedError } from '@presentation/errors'
import { HttpResponse } from '@presentation/protocols/http'

export const BadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const Forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const Unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const InternalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const Ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
