import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-issue-page',
  imports: [],
  template: `
  <h1>Issue number: <span>123</span></h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePage { }
