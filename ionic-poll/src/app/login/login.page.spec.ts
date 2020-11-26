import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage';
import { IonicModule, MenuController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/toast/toast.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let storage: Storage;

  beforeEach(async(() => {
    storage = new Storage({}, 1);
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        ToastService,
        { provide: Storage, useValue: storage }
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const app = fixture.nativeElement;
    const title = app.querySelector('ion-title');
    expect(title.textContent).toEqual('Bejelentkezés');
  });

  it('should have login form', () => {
    const app = fixture.nativeElement;
    const labels = app.querySelectorAll('ion-label');
    const inputs = app.querySelectorAll('ion-input');
    const submitButton = app.querySelector('ion-button');
    expect(labels.length).toEqual(2);
    expect(labels[0].textContent).toEqual('Felhasználónév');
    expect(labels[1].textContent).toEqual('Jelszó');
    expect(inputs.length).toEqual(2);
    expect(inputs[0].getAttribute('formcontrolname')).toEqual('username');
    expect(inputs[0].getAttribute('type')).toEqual('text');
    expect(inputs[0].getAttribute('inputmode')).toEqual('text');
    expect(inputs[1].getAttribute('formcontrolname')).toEqual('password');
    expect(inputs[1].getAttribute('type')).toEqual('password');
    expect(inputs[1].getAttribute('inputmode')).toEqual('text');
    expect(submitButton.textContent).toEqual('Bejelentkezés');
    expect(submitButton.type).toEqual('submit');
  });

  it('should disable menu', async () => {
    const menu: MenuController = TestBed.inject(MenuController);
    expect(await menu.isEnabled()).toBeFalsy();
  });

  it('should not call login with empty form', () => {
    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');
    component.login();
    expect(toastService.show).toHaveBeenCalledWith('Minden mező kitöltése kötelező!');
  });

  it('should call login', () => {
    const mockLoginData = {
      username: 'test username',
      password: 'test password'
    };
    const authService: AuthService = TestBed.inject(AuthService);
    spyOn(authService, 'login');
    component.form.controls.username.setValue(mockLoginData.username);
    component.form.controls.password.setValue(mockLoginData.password);
    component.login();
    expect(authService.login).toHaveBeenCalledWith(mockLoginData.username, mockLoginData.password);
  });
});
