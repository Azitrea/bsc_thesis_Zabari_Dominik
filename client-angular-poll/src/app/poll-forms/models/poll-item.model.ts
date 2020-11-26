export interface PollItem {
  PollID: number;
  PollName: number;
  DepID: string;
  ProjectID: number;
  EtapID: number;
  AvailableFrom: string;
  AvailableTo: string;
  PollTypeID: number;
  CreatedBy: number;
  CreatedAt: string;
  Optional: number;
  PollStatus: number;
  Active: number;
  LoginName: string;
  PollType: string;
  PollTypeDescription: string;
}

export interface PollInputItem {
  PollID: number;
  PollName: number;
  DepID: string;
  ProjectID: number;
  EtapID: number;
  AvailableFrom: string;
  AvailableTo: string;
  PollTypeID: number;
  Optional: number;
  PollStatus: number;
  Active: number;
}

export interface IPollInstance {
  pollInstanceID: number;
  pollID: number;
  userID: number;
  empID: number;
  projectID: number;
  etapID: number;
  createdAt: Date;
  modifiedAt: Date;
  intact: boolean;
  comment: string;
  mobile: boolean;
  mobileID: string;
  active: boolean;
  pollName: string;
  loginName: string;
  name: string;
  phone: string;
}
