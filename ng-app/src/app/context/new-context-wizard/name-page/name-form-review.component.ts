import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { NameFormModel } from './name-form.model';

@Component({
  selector: 'app-name-form-review',
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
          <td colspan="2">Name</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{{ name.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class NameFormReviewComponent {
  @Input() form!: FormGroup<NameFormModel>;

  get name() {
    return this.form.controls.name;
  }
}
