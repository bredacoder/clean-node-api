import { BadRequest } from '@presentation/helpers/http/http-helper'
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return BadRequest(error)

    return new Promise((resolve) => resolve(null))
  }
}
