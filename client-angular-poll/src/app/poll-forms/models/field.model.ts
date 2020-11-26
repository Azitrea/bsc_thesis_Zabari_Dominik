
export interface FieldConfig {
  questionID: number;
  typeID: number;
  type: string;
  typeDescription: string;
  name: string;
  displayText: string;
  questionName: string;
  active: boolean;

  choiceAvailable: boolean;

  options?: ChoiceOptions[];
  validations?: ValidationConfig[];

  disabled?: boolean;
}

export interface ValidationConfig {
  validationID: number;
  typeID: number;
  name: string;
  description: string;
  active: boolean;
  message1: string;
  value1: number;
  message2?: string;
  value2?: number;
}

export interface ChoiceOptions {
  choiceID: number;
  choiceString: string;
  choiceValue: number;
  active: boolean;
}
