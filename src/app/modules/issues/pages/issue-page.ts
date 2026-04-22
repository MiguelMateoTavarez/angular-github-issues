import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { IssueService } from '../services/issue-service';
import { RouterLink } from '@angular/router';
import { IssueComment } from "../components/issue-comment";

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueComment],
  template: `
  <h1>Issue number: <span>{{ issueId() }}</span></h1>
  <a routerLink="/" class="link">Return back</a>

  @if(issueQuery().isLoading()) {
    <p>Loading...</p>
  }@else {
    <issue-comment [issue]="issueQuery().data()!" />
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePage implements OnInit {
  public issueId = input.required<string>();
  private readonly issueService = inject(IssueService);

  ngOnInit(): void {
    this.issueService.setIssueNumber(this.issueId());
  }

  public issueQuery = computed(() => this.issueService.issueQuery);
}
