export enum InputType {
  INPUT= 'input',
  CHECKBOX_MULTI = 'checkboxmulti',
  CHECKBOX = 'checkbox',
  RADIO_BUTTON = 'radio',
  DATE = 'date',
  FROM_TO  = 'fromto',
  DROPDOWN = 'dropdown',
  PHOTO = 'photo',
  TEXTAREA = 'textarea'
}

export interface IPollItem {
  pollID: number,
  pollName: string,
  depID: number,
  projectID: number,
  etapID: number,
  availableFrom: Date,
  availableTo: Date,
  pollTypeID: number,
  createdBy: string,
  createdAt: Date,
  optional: boolean,
  pollStatus: string,
  active: boolean,
  loginName: string,
  pollType: string,
  pollTypeDescription: string
}

export interface IQuestionSetupItem {
  questionID: number,
  typeID: number,
  type: string,
  typeDescription: string,
  name: string,
  displayText: string,
  questionName: string,
  active: boolean,

  choiceAvailable: boolean,

  options: IQuestionSetupChoiceItem[],
  validations: IQuestionSetupValidationItem[]
}

export interface IQuestionSetupValidationItem {
  validationID: number,
  typeID: number,
  name: string,
  description: string,
  message1: string,
  message2: string,
  value1: number,
  value2: number,
  active: boolean,
}

export interface IQuestionSetupChoiceItem {
  choiceID: number,
  choiceString: string,
  choiceValue: number,
  active: boolean
}