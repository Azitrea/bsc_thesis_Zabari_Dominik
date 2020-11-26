import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SecureImagePipe } from './secure-image.pipe';

describe('SecureImagePipe', () => {
  let http: HttpClient;
  let dom: DomSanitizer;
  it('create an instance', () => {
    const pipe = new SecureImagePipe(http, dom);
    expect(pipe).toBeTruthy();
  });
});
