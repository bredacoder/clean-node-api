import {
  BadRequest,
  InternalServerError,
  Ok,
  Unauthorized,
} from '@presentation/helpers/http/http-helper'
import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './login-controller-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return BadRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return Unauthorized()
      }

      return Ok({ accessToken })
    } catch (error) {
      return InternalServerError(error)
    }
  }
}
