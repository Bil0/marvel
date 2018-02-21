import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { environment } from './../../../environments/environment'
import { APIHost, HeroDetails, HeroPreview } from '../../../../models/';

@Injectable()
export class HeroesService {
  protected host: APIHost = environment.apiHost;
  protected apiKey: string = environment.apiKey;

  constructor(protected http: HttpClient) { }

  getHeroesList(limit: number, offset: number): Observable<any> {
    const path = `v1/public/characters?limit=${limit}&offset=${offset}&apiKey=${this.apiKey}`;

    return this.http.get(`https://${this.host.name}:${this.host.port}/${path}`);
  }

}
