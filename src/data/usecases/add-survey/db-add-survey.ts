import {
  AddSurvey,
  AddSurveyRepository,
  AddSurveyModel,
} from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
