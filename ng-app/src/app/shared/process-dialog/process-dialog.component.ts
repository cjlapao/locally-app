import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-processing-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog
      #processDlg
      role="presentation"
      tabindex="-1"
      class="rounded-xl bg-white p-8 pt-6 shadow-2xl outline-none backdrop:bg-locally-text/30"
      (cancel)="$event.preventDefault()"
    >
      <div class="flex flex-col gap-5 text-locally-text">
        <div class="flex items-center">
          <div class="text-xl font-medium">{{ title }}</div>
        </div>
        <div class="flex w-80 flex-col gap-6">
          <div>{{ message }}</div>
          <div class="ly-processing" aria-label="Processing..."></div>
        </div>
      </div>
    </dialog>
  `,
})
export class ProcessingDialogComponent {
  @HostBinding('class') class = 'contents';

  @Input() title = '';
  @Input() message = '';

  @ViewChild('processDlg') processDlg!: ElementRef;

  show() {
    this.processDlg.nativeElement.showModal();
  }

  close() {
    this.processDlg.nativeElement.close();
  }
}
