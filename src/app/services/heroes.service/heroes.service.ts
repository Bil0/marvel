import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { environment as env } from './../../../environments/environment'
import { CharacterDataWrapper } from '../../../../models/';

@Injectable()
export class HeroesService {
  protected host = `${env.apiHost.protocol}://${env.apiHost.name}:${env.apiHost.port}`;
  protected apiKey: string = env.apiKey;

  constructor(protected http: HttpClient) { }

  getHeroesList(limit: number, offset: number): Observable<CharacterDataWrapper> {
    const path = `v1/public/characters?limit=${limit}&offset=${offset}&apikey=${this.apiKey}`;
    return this.http.get<CharacterDataWrapper>(`${this.host}/${path}`);
  }

  getHero(heroId: number): Observable<CharacterDataWrapper> {
    const path = `v1/public/characters/${heroId}?apikey=${this.apiKey}`;
    return this.http.get<CharacterDataWrapper>(`${this.host}/${path}`);
  }

}
