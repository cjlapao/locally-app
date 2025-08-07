import { Component } from '@angular/core';

import { UserInfoPanelComponent } from './user-info-panel.component';

@Component({
  selector: 'app-shell',
  imports: [UserInfoPanelComponent],
  template: ` <app-user-info-panel /> `
})
export class ShellComponent {}
