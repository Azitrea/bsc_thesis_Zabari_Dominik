import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast/toast.service';
import { NavController } from '@ionic/angular';

const mockLoginBody = {
  username: 'name',
  password: 'pw'
};

describe('AuthService', () => {
  let service: AuthService;
  let storage: Storage;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    storage = new Storage({}, 1);
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storage },
        ToastService
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send api request unsuccessfully', () => {
    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');
    service.login(mockLoginBody.username, mockLoginBody.password);
    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginBody);
    req.flush({
      success: false,
      message: 'fail message'
    });
    httpMock.verify();
    expect(toastService.show).toHaveBeenCalledWith('fail message');
  });

  it('should send api request successfully and save data to storage', () => {
    const navCtrl = TestBed.inject(NavController);
    spyOn(navCtrl, 'navigateForward');
    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');
    const storage = TestBed.inject(Storage);
    const setStorage = spyOn(storage, 'set');
    service.login(mockLoginBody.username, mockLoginBody.password);
    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginBody);
    req.flush({
      success: true,
      message: 'success message',
      id: 1,
      user: {
        username: 'name'
      },
      token: 'login token'
    });
    httpMock.verify();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('dashboard');
    expect(toastService.show).toHaveBeenCalledWith('success message');
    expect(setStorage).toHaveBeenCalledTimes(3);
    expect(setStorage.calls.allArgs()).toEqual([
      ['userID', 1],
      ['user', { username: 'name' }],
      ['token', 'login token']
    ]);
  });

  it('should logout', () => {
    const navCtrl = TestBed.inject(NavController);
    const toastService = TestBed.inject(ToastService);
    const storage = TestBed.inject(Storage);
    spyOn(navCtrl, 'navigateBack');
    spyOn(toastService, 'show');
    spyOn(storage, 'clear');
    service.logout();
    expect(navCtrl.navigateBack).toHaveBeenCalledWith('login');
    expect(toastService.show).toHaveBeenCalledWith('Sikeres kijelentkezés!');
    expect(storage.clear).toHaveBeenCalled();
  });
});
