import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { GithubIssue } from '../interfaces';
import {marked} from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'issue-comment',
  imports: [],
  template: `
  <section class="w-full">
    <article class="border border-gray-200 mt-2 rounded-md shadow-sm">
      <header class="flex items-center bg-slate-900 text-white p-2 rounded-t-md">
        <img [src]="issue().user.avatar_url" alt="User avatar" class="w-8 h-8 rounded-full">
        <span class="mx-2">{{ issue().user.login }}</span>
      </header>
      <body class="p-2 bg-gray-700 text-white">
        <div class="prose max-w-none" [innerHTML]="parsedMarkdown()"></div>
      </body>
    </article>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  sanitizer = inject(DomSanitizer);
  issue = input.required<GithubIssue>();

  parsedMarkdown = computed(() => {
    if (!this.issue().body) return '';
    const rawHtml = marked.parse(this.issue().body!) as string;
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  });
}
