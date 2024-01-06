import { AccessDeniedError } from '@presentation/errors'
import { Forbidden } from '@presentation/helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse } from '@presentation/protocols'

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = Forbidden(new AccessDeniedError())
    return new Promise((resolve) => resolve(error))
  }
}
