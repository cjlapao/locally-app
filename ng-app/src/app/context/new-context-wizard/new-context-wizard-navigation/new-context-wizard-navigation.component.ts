import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-context-wizard-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-7 py-7">
      <div>Name</div>
      <div>Location</div>
      <div>Domains</div>
      <div>Review</div>
    </div>
  `,
})
export class NewContextWizardNavigationComponent {
  @HostBinding('class') class = 'flex flex-col h-full';
}
