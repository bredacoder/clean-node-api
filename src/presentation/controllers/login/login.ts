import {
  BadRequest,
  InternalServerError,
  Ok,
  Unauthorized,
} from '../../helpers/http/http-helper'
import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

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
