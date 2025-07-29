import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { fakeBackendProvider } from './fake-backend-interceptor.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  providers: [fakeBackendProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
