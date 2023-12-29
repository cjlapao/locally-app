import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewContextWizardDialogComponent } from '../../context/new-context-wizard-dialog/new-context-wizard-dialog.component';

@Component({
  selector: 'app-contexts-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NewContextWizardDialogComponent],
  template: `
    <div class="flex flex-col gap-2 border-r border-gray-200 px-3 py-5">
      <button
        class="ly-button ly-button--text flex-col"
        title="Localhost 1"
        aria-pressed="true"
      >
        <i class="i-locally-drive"></i>
        <div class="w-[48px] truncate">Localhost 1</div>
      </button>
      <button class="ly-button ly-button--text flex-col" title="AWS">
        <i class="i-locally-cloud"></i>
        <div class="w-[48px] truncate">AWS</div>
      </button>
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
}
