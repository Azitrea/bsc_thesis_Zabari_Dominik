export interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  passwordChanged?: Date;
  passwordExpired?: boolean;
  avatarID?: number;
  avatarSrc?: string;
}
