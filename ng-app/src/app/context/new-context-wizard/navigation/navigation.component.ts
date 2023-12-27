import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewContextPage } from '../new-context-wizard.component';
import { NavigationItemComponent } from './navigation-item.component';

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
            [active]="step >= 0"
          ></app-navigation-item>
          <app-navigation-item
            label="Location"
            [active]="step >= 1"
          ></app-navigation-item>
          <app-navigation-item
            label="Domains"
            [active]="step >= 2"
          ></app-navigation-item>
          <app-navigation-item
            label="Review"
            [active]="step >= 3"
          ></app-navigation-item>
        </div>
      </div>
    </div>
  `,
})
export class NavigationComponent implements OnChanges {
  @HostBinding('class') class = 'flex flex-col h-full';

  newContextPage = NewContextPage;

  step = 0;

  @Input() page!: string;

  ngOnChanges(changes: SimpleChanges): void {
    switch (changes['page']?.currentValue) {
      case NewContextPage.NAME:
        this.step = 0;
        break;
      case NewContextPage.LOCATION:
        this.step = 1;
        break;
      case NewContextPage.DOMAINS:
        this.step = 2;
        break;
      case NewContextPage.REVIEW:
        this.step = 3;
        break;
    }
  }
}
