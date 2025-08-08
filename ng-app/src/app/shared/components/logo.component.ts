import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: ` <img alt="Locally" src="/assets/locally-logo.svg" /> `,
  host: {
    class: 'block'
  }
})
export class LogoComponent {}
