import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IPollItem, IQuestionSetupItem } from 'src/models/poll';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PollQueryService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private navCtrl: NavController
  ) { }

  getPollList(departmentID: number, projectID: number, etapID: number,
    availableFrom: Date, availableTo: Date): Observable<IPollItem[]> {
    return this.http.get<IPollItem[]>(this.apiService.pollList());
  }

  getPollForm(pollID: number): Observable<IQuestionSetupItem[]> {
    const options = pollID ? { params: new HttpParams().set('pollID', pollID.toString()) } : {};
    return this.http.get<IQuestionSetupItem[]>(this.apiService.pollForm(), options);
  }
}
