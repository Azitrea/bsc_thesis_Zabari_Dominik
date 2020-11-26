import { IUser } from './user.type';

export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse extends ICommonResponse {
  token: string;
  id: number;
  user?: IUser;
}

export interface IPopoverLink {
  description: string;
  link: string;
}
