import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@angular-monorepo/utils';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'angular-monorepo-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  template: `
    <div class="container">
      <mat-toolbar color="primary">
        <span class="spacer"></span>
        <button mat-icon-button (click)="authService.logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>
      <h1>You are logged in</h1>
    </div>`,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    mat-toolbar {
      box-shadow: 0px -7px 11px 0px var(--accent-color);
    }
  `,
})
export class HomeComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
