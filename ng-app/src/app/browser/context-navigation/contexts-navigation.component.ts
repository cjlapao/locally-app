import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewContextWizardDialogComponent } from '../../context/new-context-wizard-dialog/new-context-wizard-dialog.component';
import { ContextStateService } from './context-state.service';

@Component({
  selector: 'app-contexts-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NewContextWizardDialogComponent],
  template: `
    <div
      class="flex w-[100px] flex-col gap-2 border-r border-gray-200 px-3 py-5"
    >
      @if (contexts(); as contexts) {
        @for (item of contexts; track item.id) {
          <button
            class="ly-button ly-button--text flex-col"
            [attr.aria-pressed]="item.id === activeContextId() ? 'true' : null"
            title="{{ item.name }}"
            (click)="this.contextStateService.setActiveContext(item.id)"
          >
            <i class="i-locally-cloud"></i>
            <div class="line-clamp-2 w-full break-words">{{ item.name }}</div>
          </button>
        } @empty {}
      } @else {
        <div class="flex flex-col gap-2">
          <div class="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div class="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div class="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div class="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      }
      <button
        class="ly-button ly-button--text !justify-center"
        title="Create a new Context"
        (click)="newContextWizardDlg.show()"
      >
        <i class="i-locally-add"></i>
      </button>
    </div>
    <app-new-context-wizard-dialog #newContextWizardDlg>
    </app-new-context-wizard-dialog>
  `,
})
export class ContextsNavigationComponent {
  @HostBinding('class') class = 'contents';

  constructor(public contextStateService: ContextStateService) {}

  contexts = this.contextStateService.contexts;
  activeContextId = this.contextStateService.activeContextId;
}
