import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PollMutationService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) { }

  saveFormData(formToSave: FormData) {
    return this.http.post<any>(this.apiService.pollFormData(), formToSave, {
      reportProgress: true,
      observe: 'events',
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          console.log(progress);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
