import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-issues-list-page',
  imports: [],
  template: `
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <header class="col-span-3">
        <h1 class="text-3xl font-bold">Github Issues</h1>
        <div class="divider"></div>
      </header>
      <article class="col-span-3 flex flex-col-3">
        <div class="flex gap-2">
          <button class="btn btn-primary">All</button>
          <button class="btn btn-outline">Open</button>
          <button class="btn btn-outline">Closed</button>
        </div>
      </article>
      <article class="mt-4 flex flex-col col-span-2">
        <h3>Issues:</h3>
        <!-- TODO: Issues list -->
        <!-- TODO: Spinner-loader -->
        <!-- TODO: Not issues after filter -->
      </article>
      <article>
        <h3>Labels</h3>
        <!-- TODO: Spinners -->
        <!-- TODO: Label Selector -->
      </article>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPage {}
