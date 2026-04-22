import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueComments } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueNumber = signal<string|null>(null);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueById(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue-comments', this.issueNumber()],
    queryFn: () => getIssueComments(this.issueNumber()!),
    enabled: this.issueNumber !== null
  }));

  setIssueNumber(id: string): void {
    this.issueNumber.set(id);
  }
}
