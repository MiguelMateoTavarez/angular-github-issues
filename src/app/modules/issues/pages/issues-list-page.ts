import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IssuesService } from '../services/issues-service';
import { LabelSelector } from "../components/label-selector";
import { IssueItem } from "../components/issue-item";
import { State } from '../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [LabelSelector, IssueItem],
  template: `
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <header class="col-span-3">
        <h1 class="text-3xl font-bold">Github Issues</h1>
        <div class="divider"></div>
      </header>
      <article class="col-span-3 flex flex-col-3">
        <div class="flex gap-2">
          <button 
            class="btn"
            [class.btn-primary]="selectedState() === 'all'"
            [class.btn-outline]="selectedState() !== 'all'"
            (click)="changeState('all')">
            All
          </button>
          <button 
            class="btn"
            [class.btn-primary]="selectedState() === 'open'"
            [class.btn-outline]="selectedState() !== 'open'"
            (click)="changeState('open')">
            Open
          </button>
          <button 
            class="btn"
            [class.btn-primary]="selectedState() === 'closed'"
            [class.btn-outline]="selectedState() !== 'closed'"
            (click)="changeState('closed')">
            Closed
          </button>
        </div>
      </article>
      <article class="mt-4 flex flex-col col-span-2">
        @for(issue of issuesQuery().data(); track issue.id) {
          <issue-item [issue]="issue" />
        }@empty {
          @if(issuesQuery().isLoading()) {
            <p>Loading...</p>
          } @else {
            <p>No issues found</p>
          }
        }
        <!-- TODO: Issues list -->
        <!-- TODO: Spinner-loader -->
        <!-- TODO: Not issues after filter -->
      </article>
      <article>
        @if(labelsQuery().isLoading()) {
          <p>Loading...</p>
        } @else {
          <issues-label-selector [labels]="labelsQuery().data() ?? []" />
        }
        <!-- TODO: Spinners -->
        <!-- TODO: Label Selector -->
      </article>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPage {
  private readonly issuesService = inject(IssuesService);

  protected selectedState = computed(() => this.issuesService.selectedState());
  public labelsQuery = computed(() => this.issuesService.labelsQuery);
  public issuesQuery = computed(() => this.issuesService.issuesQuery);

  changeState(newState: string) {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed
    }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }
}
