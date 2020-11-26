import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform {

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer){}

  transform(value: any, ...args: any[]): any {
    const src$ = new BehaviorSubject(value);
    return src$.pipe(switchMap(url => this.loadImage(url)));
  }

  private loadImage(url: string): Observable<any> {
    const resoureUrl = environment.apiUrl + '/images';
    return this.httpClient
      .post(resoureUrl, { path: url}, {responseType: 'blob'}).pipe(
      map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))));
  }

}
