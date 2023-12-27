import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start gap-3">
      <ng-container *ngIf="active">
        <div
          class="mt-1 h-4 w-4 shrink-0 rounded-full bg-locally-primary-background"
        ></div>
        <div>{{ label }}</div>
      </ng-container>
      <ng-container *ngIf="!active">
        <div
          class="mt-1 h-4 w-4 rounded-full border-2 border-locally-text-field-disabled-ouline bg-locally-background"
        ></div>
        <div class="text-locally-text-field-disabled-text">{{ label }}</div>
      </ng-container>
    </div>
  `,
})
export class NavigationItemComponent {
  @HostBinding('class') class = 'contents';

  @Input() label!: string;
  @Input() active: boolean = false;
}
