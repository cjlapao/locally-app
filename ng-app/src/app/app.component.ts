import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { fakeBackendProvider } from './fake-backend-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WelcomeComponent],
  providers: [fakeBackendProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
