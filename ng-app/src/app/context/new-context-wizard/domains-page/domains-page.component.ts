import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface DomainsForm {
  domainName: FormControl<string>;
  subDomainName: FormControl<string>;
}

@Component({
  selector: 'app-domains-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="text-xl font-medium">Domains</div>
      <div class="flex max-w-[600px] flex-auto flex-col gap-5">
        <div class="ly-form-field">
          <label for="new-context-wizard-local-domain-field">Domain name</label>
          <input
            id="new-context-wizard-local-domain-field"
            class="ly-form-control"
            [class.ly-form-control--error]="
              domainName.invalid && (domainName.dirty || domainName.touched)
            "
            [formControl]="domainName"
          />
          <ng-container
            *ngIf="
              domainName.invalid && (domainName.dirty || domainName.touched)
            "
          >
            <caption
              *ngIf="domainName.errors?.['required']"
              class="ly-form-field__error"
            >
              Domain name is required.
            </caption>
            <caption
              *ngIf="domainName.errors?.['minlength']"
              class="ly-form-field__error"
            >
              Domain name must be at least 3 characters long.
            </caption>
          </ng-container>
          <caption>
            Will be used as root domain name.
          </caption>
        </div>
        <div class="ly-form-field">
          <label for="new-context-wizard-sub-domain-field"
            >Sub domain name</label
          >
          <input
            id="new-context-wizard-sub-domain-field"
            class="ly-form-control"
            [class.ly-form-control--error]="
              subDomainName.invalid &&
              (subDomainName.dirty || subDomainName.touched)
            "
            [formControl]="subDomainName"
          />
          <ng-container
            *ngIf="
              subDomainName.invalid &&
              (subDomainName.dirty || subDomainName.touched)
            "
          >
            <caption
              *ngIf="subDomainName.errors?.['required']"
              class="ly-form-field__error"
            >
              Sub domain name is required.
            </caption>
            <caption
              *ngIf="subDomainName.errors?.['minlength']"
              class="ly-form-field__error"
            >
              Sub domain name must be at least 3 characters long.
            </caption>
          </ng-container>
          <caption>
            Will be used as default subdomain name to construct something.
          </caption>
        </div>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" aria-disabled="true" disabled>Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [attr.aria-disabled]="form.status === 'VALID' ? undefined : true"
          [attr.disabled]="form.status === 'VALID' ? undefined : true"
        >
          Next
        </button>
        <button class="ly-button ml-auto">Cancel</button>
      </div>
    </div>
  `,
})
export class DomainsPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  @Input() form!: FormGroup<DomainsForm>;

  get domainName() {
    return this.form.controls.domainName;
  }

  get subDomainName() {
    return this.form.controls.subDomainName;
  }

  @Output() next = new EventEmitter<void>();
}
