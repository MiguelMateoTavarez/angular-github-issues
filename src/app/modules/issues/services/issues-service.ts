import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private _selectedState = signal<State>(State.All);
  public selectedState = this._selectedState.asReadonly();

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels()
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues', this._selectedState()],
    queryFn: () => getIssues(this.selectedState())
  }));

  showIssuesByState(state: State) {
    this._selectedState.set(state);
  }
}
