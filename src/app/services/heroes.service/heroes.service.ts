import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';

import { environment as env } from './../../../environments/environment'
import { CharacterDataWrapper } from '../../../../models/';

export const MAX_FAVORITES = new InjectionToken('Max Favorites');

@Injectable()
export class HeroesService {
  protected host = `${env.apiHost.protocol}://${env.apiHost.name}:${env.apiHost.port}`;
  protected apiKey: string = env.apiKey;
  protected favorites: number[] = [ 1009150 ];
  protected updateFavorites = new BehaviorSubject<number[]>([ 1009150 ]);

  loadingHero = new Subject<number | null>();

  constructor(protected http: HttpClient, @Inject(MAX_FAVORITES) protected maxFavorites: number) { }

  getHeroesList(limit: number, offset: number): Observable<CharacterDataWrapper> {
    const path = `v1/public/characters?limit=${limit}&offset=${offset}&apikey=${this.apiKey}`;
    return this.http.get<CharacterDataWrapper>(`${this.host}/${path}`);
  }

  getHero(heroId: number): Observable<CharacterDataWrapper> {
    this.loadingHero.next(heroId);
    const path = `v1/public/characters/${heroId}?apikey=${this.apiKey}`;
    return this.http.get<CharacterDataWrapper>(`${this.host}/${path}`)
     .pipe(tap(() => this.loadingHero.next(null)));
  }

  getFavoritesUpdates() {
    return this.updateFavorites.asObservable();
  }

  getFavorites() {
    return [ ...this.favorites ];
  }

  addToFavorites(heroId: number) {
    if (!this.inFavorites(heroId)) {
      if (this.favorites.length >= this.maxFavorites) {
        this.favorites.pop();
      }

      this.favorites.unshift(heroId);
      this.favorites = [ heroId ].concat(this.favorites);
      this.updateFavorites.next(this.favorites);
    }

    return of(true);
  }

  removeFromFavorites(heroId: number) {
    if (this.inFavorites(heroId)) {
      this.favorites = this.favorites.filter(f => f !== heroId);
      this.updateFavorites.next(this.favorites);
    }

    return of(true);
  }

  inFavorites(heroId: number) {
    return !!this.favorites.find(f => f === heroId);
  }

}
