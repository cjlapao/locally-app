import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { AwsForm } from './aws-form.model';

@Component({
  selector: 'app-aws-form-review',
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
          <td colspan="2">Amazon S3</td>
        </tr>
        <tr>
          <th>Access Key Id</th>
          <td>{{ accessKeyId.value }}</td>
        </tr>
        <tr>
          <th>Access Key Secret</th>
          <td>**********</td>
        </tr>
        <tr>
          <th>Region</th>
          <td>{{ region.value }}</td>
        </tr>
        <tr>
          <th>Bucket name</th>
          <td>{{ bucketName.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class AwsFormReviewComponent {
  @Input() form!: FormGroup<AwsForm>;

  get accessKeyId() {
    return this.form.controls.accessKeyId;
  }

  get accessKeySecret() {
    return this.form.controls.accessKeySecret;
  }

  get region() {
    return this.form.controls.region;
  }

  get bucketName() {
    return this.form.controls.bucketName;
  }
}
