import {
  BadRequest,
  InternalServerError,
  Ok,
} from '../../helpers/http/http-helper'
import {
  AddAccount,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

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

      return Ok(account)
    } catch (error) {
      return InternalServerError(error)
    }
  }
}
