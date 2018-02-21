import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { environment } from './../../../environments/environment'
import { APIHost, CharacterDataWrapper } from '../../../../models/';

@Injectable()
export class HeroesService {
  protected host: APIHost = environment.apiHost;
  protected apiKey: string = environment.apiKey;

  constructor(protected http: HttpClient) { }

  getHeroesList(limit: number, offset: number): Observable<CharacterDataWrapper> {
    const path = `v1/public/characters?limit=${limit}&offset=${offset}&apikey=${this.apiKey}`;
    const host = `${this.host.protocol}://${this.host.name}:${this.host.port}`;

    return this.http.get<CharacterDataWrapper>(`${host}/${path}`);
  }

}
