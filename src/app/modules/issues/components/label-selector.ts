import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubLabel } from '../interfaces';

@Component({
  selector: 'issues-label-selector',
  imports: [],
  template: `
  <div class="flex flex-wrap justify-center items-center gap-2">
    @for(label of labels(); track label.id) {
      <div 
        class="cursor-pointer border px-2 rounded-md hover:bg-slate-950"
        [style]="{'border-color': '#'+label.color}"
      >
        {{ label.name }}
      </div>
    }
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelSelector {
  labels = input.required<GithubLabel[]>();
}
