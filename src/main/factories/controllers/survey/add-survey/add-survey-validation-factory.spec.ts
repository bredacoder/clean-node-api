jest.mock('@validation/validators/validation-composite')
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
