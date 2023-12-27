import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItemComponent } from './navigation-item.component';
import { NewContextWizardPage } from '../new-context-wizard-page';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NavigationItemComponent],
  template: `
    <div class="px-7 py-7">
      <div class="relative">
        <div
          class="absolute bottom-2 left-[7px] top-2 border-l-2 border-locally-text-field-disabled-ouline"
        ></div>
        <div class="relative flex flex-col gap-5">
          <app-navigation-item
            label="Name"
            [passed]="step > 0"
            [active]="page === newContextWizardPage.NAME"
            (navigate)="navigate.emit(newContextWizardPage.NAME)"
          ></app-navigation-item>
          <app-navigation-item
            label="Location"
            [passed]="step > 1"
            [active]="page === newContextWizardPage.LOCATION"
            (navigate)="navigate.emit(newContextWizardPage.LOCATION)"
          ></app-navigation-item>
          <app-navigation-item
            label="Domains"
            [passed]="step > 2"
            [active]="page === newContextWizardPage.DOMAINS"
            (navigate)="navigate.emit(newContextWizardPage.DOMAINS)"
          ></app-navigation-item>
          <app-navigation-item
            label="Review"
            [passed]="step > 3"
            [active]="page === newContextWizardPage.REVIEW"
            (navigate)="navigate.emit(newContextWizardPage.REVIEW)"
          ></app-navigation-item>
        </div>
      </div>
    </div>
  `,
})
export class NavigationComponent implements OnChanges {
  @HostBinding('class') class = 'flex flex-col h-full';

  newContextWizardPage = NewContextWizardPage;

  step = 0;

  @Input() page!: string;

  @Output() navigate = new EventEmitter<NewContextWizardPage>();

  ngOnChanges(changes: SimpleChanges): void {
    switch (changes['page']?.currentValue) {
      case NewContextWizardPage.NAME:
        this.step = 0;
        break;
      case NewContextWizardPage.LOCATION:
        this.step = 1;
        break;
      case NewContextWizardPage.DOMAINS:
        this.step = 2;
        break;
      case NewContextWizardPage.REVIEW:
        this.step = 3;
        break;
    }
  }
}
