import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PollItem } from 'src/app/poll-forms/models/poll-item.model';

@Injectable({
  providedIn: 'root'
})
export class PollFormQueryService {

  constructor(private apollo: Apollo) { }

  getFormList(
    departmentID: number = null,
    projectID: number = null,
    etapID: number = null,
    availableFrom: string = null,
    availableTo: string = null
  ): Observable<PollItem[]> {
    return this.apollo.query({
      query: gql`
        query($depID: Int, $prjID: Int, $etpID: Int, $from: String, $to: String) {
          getFormList(
            depID: $depID,
            projectID: $prjID,
            etapID: $etpID,
            availableFrom: $from,
            availableTo: $to)
        }
      `, variables: {
        depID: departmentID,
        prjID: projectID,
        etpID: etapID,
        from: availableFrom,
        to: availableTo
      }
    }).pipe(map((res: any) => {
      return res.data.getFormList;
    }));
  }

  getPollQuestionSetup(pollID: number) {
    return this.apollo.query({
      query: gql`
        query($id: Int) {
          getPollQuestionSetup(
            pollID: $id
          )
        }
      `, variables: {
        id: pollID
      }
    }).pipe(map((res: any) => {
      return res.data.getPollQuestionSetup;
    }));
  }

  getPollFormTypeList() {
    return this.apollo.query({
      query: gql`
        query {
          formTypeList
        }
      `
    }).pipe(map((res: any) => {
      return res.data.formTypeList;
    }));
  }

  getValidationTypeList() {
    return this.apollo.query({
      query: gql`
        query {
          formValidationTypeList
        }
      `
    }).pipe(map((res: any) => {
      return res.data.formValidationTypeList;
    }));
  }

  getQuestionTypeList() {
    return this.apollo.query({
      query: gql`
        query {
          questionTypeList
        }
      `
    }).pipe(map((res: any) => {
      return res.data.questionTypeList;
    }));
  }

  getValidationMatrix() {
    return this.apollo.query({
      query: gql`
        query {
          getValidationMatrix
        }
      `
    }).pipe(map((res: any) => {
      return res.data.getValidationMatrix;
    }));
  }

  getInstanceList(pollInstanceID, pollID) {
    return this.apollo.query({
      query: gql`
        query($pollInstanceID: Int, $pollID: Int) {
          getInstanceList(
            pollInstanceID: $pollInstanceID,
            pollID: $pollID
          )
        }
      `, variables: {
        pollInstanceID,
        pollID
      }
    }).pipe(map((res: any) => {
      return res.data.getInstanceList;
    }));
  }

  getAnswerSetup(pollInstanceID, pollID) {
    return this.apollo.query({
      query: gql`
        query($pollInstanceID: Int, $pollID: Int) {
          getAnswerSetup(
            pollInstanceID: $pollInstanceID,
            pollID: $pollID
          )
        }
      `, variables: {
        pollInstanceID,
        pollID
      }
    }).pipe(map((res: any) => {
      return res.data.getAnswerSetup;
    }));
  }

}
