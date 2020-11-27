import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo, private http: HttpClient) { }

  login(username: string, pw: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/login', {
      loginName: username,
      password: pw
    })
      .pipe(map(data => {
        data = data.response;
        localStorage.setItem('username', username);
        localStorage.setItem(environment.authTokenKey, data.responseToken as string);

        return data.response;
      }));
  }

  logout() {
    localStorage.clear();
  }

  uspDepartmentList(coreOnly: boolean = null, olnyEnabled: boolean = null) {
    return this.apollo.query({
      query: gql`
      query($coreOnly:Boolean, $olnyEnabled:Boolean){
        uspDepartmentList(coreOnly: $coreOnly, olnyEnabled: $olnyEnabled){
          DepID
          DepName
          DepContact
          DepEmail
          DepPhone
          Active
          OnlyGizmo
        }
      }`, variables: {
        coreOnly: coreOnly,
        olnyEnabled: olnyEnabled
      }
    }).pipe(
      map(result => {
        return (result.data['uspDepartmentList']);
      }));
  }

  uspTokenValidity(token): Observable<boolean> {
    return (
      this.apollo.mutate<boolean>({
        mutation: gql`
          mutation{
            uspTokenValidity(token:"${token}"){
              response
            }
          }
        `
      }).pipe(map(res => {
        return res.data['uspTokenValidity'].response[0].responseSuccess;
      }))
    );
  }

  validToken(token): Observable<boolean> {
    return this.uspTokenValidity(token).pipe(map(res => {
      return res;
    }));
  }

}
