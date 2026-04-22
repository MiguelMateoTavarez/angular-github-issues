import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueById, getIssueComments } from '../actions';
import { GithubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueById(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue-comments', this.issueNumber()],
    queryFn: () => getIssueComments(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(id: string): void {
    this.issueNumber.set(id);
  }

  prefetchIssue(id: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', id],
      queryFn: () => getIssueById(id!),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60
    });
  }
}
