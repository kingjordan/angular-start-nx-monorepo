import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 't3-training';
}
