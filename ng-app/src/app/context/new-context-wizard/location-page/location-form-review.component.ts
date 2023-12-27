import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { LocationFormModel } from './location-form.model';

@Component({
  selector: 'app-location-form-review',
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
          <td colspan="2">Location</td>
        </tr>
        <tr>
          <th>Type</th>
          <td>{{ type.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class LocationFormReviewComponent {
  @Input() form!: FormGroup<LocationFormModel>;

  get type() {
    return this.form.controls.type;
  }
}
