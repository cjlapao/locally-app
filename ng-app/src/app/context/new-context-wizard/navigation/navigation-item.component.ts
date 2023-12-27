import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start gap-3">
      <ng-container *ngIf="active">
        <div
          class="mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-locally-primary-background bg-locally-background"
        ></div>
        <div class="font-medium">{{ label }}</div>
      </ng-container>
      <ng-container *ngIf="passed">
        <div
          class="mt-1 h-4 w-4 shrink-0 rounded-full bg-locally-primary-background"
        ></div>
        <a
          class="ly-link"
          tabindex="0"
          (click)="navigate.emit()"
          (keyup.enter)="navigate.emit()"
          >{{ label }}</a
        >
      </ng-container>
      <ng-container *ngIf="!active && !passed">
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
  @Input() passed: boolean = false;
  @Input() active: boolean = false;

  @Output() navigate = new EventEmitter<void>();
}
