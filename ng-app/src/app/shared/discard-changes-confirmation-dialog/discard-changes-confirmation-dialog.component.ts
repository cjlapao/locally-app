import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discard-changes-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog
      #confirmDlg
      role="presentation"
      tabindex="-1"
      class="rounded-xl bg-white p-8 pt-6 shadow-2xl outline-none backdrop:bg-locally-text/30"
      (click)="$event.target === confirmDlg && onCancel()"
    >
      <div class="flex flex-col gap-5 text-locally-text">
        <div class="flex items-center">
          <div class="text-xl font-medium">Discard changes?</div>
          <button
            class="ly-button ly-button--text ml-auto"
            (click)="onCancel()"
          >
            <i class="ly-icon-close"></i>
          </button>
        </div>
        <div class="flex flex-col gap-6">
          <div>All entered information will be discarded.</div>
          <div class="flex gap-2 [&>*]:!min-w-[100px]">
            <button
              #confirmDlgDefaultAction
              class="ly-button ly-button--primary"
              (click)="onConfirm()"
            >
              Discard
            </button>
            <button class="ly-button" (click)="onCancel()">Cancel</button>
          </div>
        </div>
      </div>
    </dialog>
  `,
})
export class DiscardChangesConfirmationDialogComponent {
  @HostBinding('class') class = 'contents';

  @ViewChild('confirmDlg') confirmDlg!: ElementRef;
  @ViewChild('confirmDlgDefaultAction') confirmDlgDefaultAction!: ElementRef;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  show() {
    this.confirmDlg.nativeElement.showModal();
    this.confirmDlgDefaultAction.nativeElement.focus();
  }

  close() {
    this.confirmDlg.nativeElement.close();
  }

  onConfirm() {
    this.confirm.emit();
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }
}
