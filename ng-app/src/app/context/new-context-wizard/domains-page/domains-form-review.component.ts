import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { DomainsFormModel } from './domains-form.model';

@Component({
  selector: 'app-domains-form-review',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="ly-table w-full">
      <colgroup>
        <col width="40%" />
        <col width="60%" />
      </colgroup>
      <tbody>
        <tr>
          <td colspan="2">Domains</td>
        </tr>
        <tr>
          <th>Domain name</th>
          <td>{{ domainName.value }}</td>
        </tr>
        <tr>
          <th>Sub domain name</th>
          <td>{{ subDomainName.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class DomainsFormReviewComponent {
  @Input() form!: FormGroup<DomainsFormModel>;

  get domainName() {
    return this.form.controls.domainName;
  }

  get subDomainName() {
    return this.form.controls.subDomainName;
  }
}
