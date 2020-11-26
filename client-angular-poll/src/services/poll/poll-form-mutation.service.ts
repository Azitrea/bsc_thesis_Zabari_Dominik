import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { FieldConfig } from 'src/app/poll-forms/models/field.model';
import { PollInputItem } from 'src/app/poll-forms/models/poll-item.model';

@Injectable({
  providedIn: 'root'
})
export class PollFormMutationService {

  constructor(private apollo: Apollo) { }

  addRemoveForm(formData) {
    const pollForm: PollInputItem = {
      PollID: formData.pollID,
      PollName: formData.pollName,
      DepID: formData.depID,
      ProjectID: formData.projectID,
      EtapID: formData.etapID,
      AvailableFrom: formData.availableFrom,
      AvailableTo: formData.availableTo,
      PollTypeID: formData.pollTypeID,
      Optional: formData.optional,
      PollStatus: formData.pollStatus,
      Active: formData.active,
    };

    return this.apollo.mutate({
      mutation: gql`
      mutation($form: PollInputItem){
        addRemoveForm(pollForm: $form)
          }`,
      variables: {
        form: pollForm
      }
    }).pipe(map((result: any) => {
      console.log(result);
      return result.data.addRemoveForm; // form ID
    }));
  }

  savePollFormData(pollID: number, pollFormData: FieldConfig) {
    return this.apollo.mutate({
      mutation: gql`
      mutation($pID: Int, $formData: FieldConfig){
        savePollFormData(pollID: $pID, pollFormData: $formData)
          }`,
      variables: {
        pID: pollID,
        formData: pollFormData
      }
    }).pipe(map((result: any) => {
      return result.data.savePollFormData;
    }));
  }
}
