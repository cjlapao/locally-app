import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { AzureForm } from './azure-form.model';

@Component({
  selector: 'app-azure-form-review',
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
          <td colspan="2">Azure Storage</td>
        </tr>
        <tr>
          <th>Subscription Id</th>
          <td>{{ subscriptionId.value }}</td>
        </tr>
        <tr>
          <th>Tenant Id</th>
          <td>{{ tenantId.value }}</td>
        </tr>
        <tr>
          <th>Client Id</th>
          <td>{{ clientId.value }}</td>
        </tr>
        <tr>
          <th>Client secret</th>
          <td>**********</td>
        </tr>
        <tr>
          <th>Storage account name</th>
          <td>{{ storageAccountName.value }}</td>
        </tr>
        <tr>
          <th>Resource group name</th>
          <td>{{ resourceGroupName.value }}</td>
        </tr>
        <tr>
          <th>Container name</th>
          <td>{{ containerName.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class AzureFormReviewComponent {
  @Input() form!: FormGroup<AzureForm>;

  get subscriptionId() {
    return this.form.controls.subscriptionId;
  }

  get tenantId() {
    return this.form.controls.tenantId;
  }

  get clientId() {
    return this.form.controls.clientId;
  }

  get clientSecret() {
    return this.form.controls.clientSecret;
  }

  get storageAccountName() {
    return this.form.controls.storageAccountName;
  }

  get resourceGroupName() {
    return this.form.controls.resourceGroupName;
  }

  get containerName() {
    return this.form.controls.containerName;
  }
}
