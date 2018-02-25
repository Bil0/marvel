import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    protected router: Router,
    protected iconRegistry: MatIconRegistry,
    protected sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    [ 'favorite', 'list' ].forEach(icon => {
      const url = `assets/ic_${icon}_white_24px.svg`;
      this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(url));
    });

    if (this.router.url === '/') {
      this.router.navigate([ 'heroes', 6 ])
    }

  }
}
