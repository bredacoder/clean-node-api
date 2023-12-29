import {
  BadRequest,
  InternalServerError,
  OkNoContent,
} from '@presentation/helpers/http/http-helper'
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  AddSurvey,
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return BadRequest(error)

      const { question, answers } = httpRequest.body
      await this.addSurvey.add({ question, answers })

      return OkNoContent()
    } catch (error) {
      return InternalServerError(error)
    }
  }
}
