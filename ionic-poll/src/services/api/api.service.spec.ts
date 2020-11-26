import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const APIURL = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return login endpoint', () => {
    expect(service.login()).toEqual(`${APIURL}/auth/login`);
  });

  it('should return schedule endpoint', () => {
    expect(service.schedule()).toEqual(`${APIURL}/schedule`);
  });

  it('should return user endpoint', () => {
    expect(service.user()).toEqual(`${APIURL}/user`);
  });

  it('should return password endpoint', () => {
    expect(service.password()).toEqual(`${APIURL}/user/password`);
  });
});
