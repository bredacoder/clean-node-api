import { makeLogControllerDecorator } from '@main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@presentation/protocols'
import { AddSurveyController } from '@presentation/controllers/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '@main/factories/usecases/survey/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const surveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  )
  return makeLogControllerDecorator(surveyController)
}
