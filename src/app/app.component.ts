import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(router: Router) {
    if (router.url === '/') {
      router.navigate(['', 6])
    }
  }
}
