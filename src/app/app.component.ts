import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    if (router.url === '/') {
  //    router.navigate(['', 6])
    }

    [ 'favorite', 'list' ].forEach(icon => {
      const url = `assets/ic_${icon}_white_24px.svg`;
      iconRegistry.addSvgIcon( icon, sanitizer.bypassSecurityTrustResourceUrl(url));
    });

  }
}
