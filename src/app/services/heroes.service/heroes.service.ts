import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

import { CharacterDataWrapper } from '../../../../models/';

export interface FavoritesResponse {
  sessionId: string;
  favorites: number[];
};

@Injectable()
export class HeroesService {
  protected sessionId: string;
  protected favorites: number[] = [];
  protected updateFavorites: BehaviorSubject<number[]>;

  loadingHero = new Subject<number | null>();

  constructor(protected http: HttpClient) {
    this.sessionId = sessionStorage.getItem('sessionId') || '';
    this.updateFavorites = new BehaviorSubject<number[]>(this.favorites);
    this.updateFavorites.subscribe(favorites => this.favorites = favorites);
    this.getFavorites().subscribe(f => this.updateFavorites.next(f));
  }

  getHeroesList(limit: number, offset: number): Observable<CharacterDataWrapper> {
    return this.http.get<CharacterDataWrapper>(`/api/characters?limit=${limit}&offset=${offset}`);
  }

  getHero(heroId: number, handleLoading = true): Observable<CharacterDataWrapper> {
    if (handleLoading) {
      this.loadingHero.next(heroId);
    }
    return this.http.get<CharacterDataWrapper>(`/api/characters/${heroId}`)
     .pipe(tap(() => this.loadingHero.next(null)));
  }

  getFavoritesUpdates() {
    return this.updateFavorites.asObservable();
  }

  getFavorites() {
    const headers = { sessionId: this.sessionId || '' };
    return this.http.get<FavoritesResponse>('/api/favorites', { headers })
      .pipe(
        tap(r => {
          this.sessionId = r.sessionId;
          sessionStorage.setItem('sessionId', r.sessionId);
        }),
        map(r => r.favorites)
      );
  }

  addToFavorites(heroId: number) {
    const headers = { sessionId: this.sessionId || '' };
    return this.http.post<FavoritesResponse>('/api/favorites', { heroId }, { headers })
      .pipe(
        tap(r => {
          this.sessionId = r.sessionId;
          sessionStorage.setItem('sessionId', r.sessionId);
          this.updateFavorites.next(r.favorites);
        }),
        map(r => r.favorites)
      );
  }

  removeFromFavorites(heroId: number) {
    const headers = { sessionId: this.sessionId || '' };
    return this.http.delete<FavoritesResponse>(`/api/favorites/${heroId}`, { headers })
      .pipe(
        tap(r => {
          this.sessionId = r.sessionId;
          sessionStorage.setItem('sessionId', r.sessionId);
          this.updateFavorites.next(r.favorites);
        }),
        map(r => r.favorites)
      );
  }

  inFavorites(heroId: number) {
    return !!this.favorites.find(f => f === heroId);
  }

}
