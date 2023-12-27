import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { LocallyForm } from './locally-form.model';

@Component({
  selector: 'app-locally-form-review',
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
          <td colspan="2">Locally</td>
        </tr>
        <tr>
          <th>Path</th>
          <td>{{ path.value }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class LocallyFormReviewComponent {
  @Input() form!: FormGroup<LocallyForm>;

  get path() {
    return this.form.controls.path;
  }
}
