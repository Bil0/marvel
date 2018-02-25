import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatIconModule, MatIconRegistry } from '@angular/material';

describe('AppComponent', () => {
  @Component({
    selector: 'app-heroes-list',
    template: '',
  })
  class HeroesListComponent {}

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroesListComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([ { path: 'heroes/:page', component: HeroesListComponent } ]),
        MatIconModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should redirect to the 6th page when first loaded on / route', async(async () => {
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    await fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([ 'heroes', 6 ]);
  }));

  it('should not redirect to the 6th page if route is not on /', async(async () => {
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);

    location.go('/heroes/6');
    await fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.componentInstance.ngOnInit();

    expect(navigateSpy).not.toHaveBeenCalled();

  }));

  it('should load svg icons', async(async () => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const iconRegistryAddSvgIcon = spyOn(iconRegistry, 'addSvgIcon');

    const urlSanitizer = TestBed.get(DomSanitizer);
    const urlSanitizerTrustUrl = spyOn(urlSanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue('');

    await fixture.detectChanges();

    expect(urlSanitizerTrustUrl).toHaveBeenCalledWith('assets/ic_favorite_white_24px.svg');
    expect(urlSanitizerTrustUrl).toHaveBeenCalledWith('assets/ic_list_white_24px.svg');
    expect(iconRegistryAddSvgIcon).toHaveBeenCalledWith('favorite', '');
    expect(iconRegistryAddSvgIcon).toHaveBeenCalledWith('list', '');
  }));
});
