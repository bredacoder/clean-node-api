import { EmailInUseError } from '@presentation/errors'
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  Ok,
} from '@presentation/helpers/http/http-helper'
import {
  AddAccount,
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return BadRequest(error)

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
      })

      if (!account) {
        return Forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return Ok({ accessToken })
    } catch (error) {
      return InternalServerError(error)
    }
  }
}
