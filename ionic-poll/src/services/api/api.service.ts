import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private APIURL = environment.apiUrl;

  login = (): string => `${this.APIURL}/auth/login`;
  schedule = (): string => `${this.APIURL}/schedule`;
  user = (): string => `${this.APIURL}/user`;
  password = (): string => `${this.APIURL}/user/password`;
  pollList = (): string => `${this.APIURL}/poll/list`;
  pollForm = (): string => `${this.APIURL}/poll/form`;
  pollFormData = (): string => `${this.APIURL}/poll/save`;
}
