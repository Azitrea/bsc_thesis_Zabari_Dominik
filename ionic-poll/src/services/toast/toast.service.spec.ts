import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show toast', () => {
    const toastCtrl = TestBed.inject(ToastController);
    spyOn(toastCtrl, 'create');

    service.show('test');
    expect(toastCtrl.create).toHaveBeenCalled();
  });
});
