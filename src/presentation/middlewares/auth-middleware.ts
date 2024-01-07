import { LoadAccountByToken } from '@domain/usecases/load-account-by-token'
import { AccessDeniedError } from '@presentation/errors'
import { Forbidden, Ok } from '@presentation/helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse } from '@presentation/protocols'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return Ok({ accountId: account.id })
      }
    }

    return Forbidden(new AccessDeniedError())
  }
}
