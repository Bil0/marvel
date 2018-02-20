import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import { APIHost, HeroDetails, HeroPreview } from '../../../models/';

const apiKey = 'f6ef908792f697973acc37c5f0f89c4d';

@Injectable()
export class HeroesService {

  constructor(protected http: HttpClient, protected host: APIHost) { }

  getHeroesList(limit: number, offset: number): Observable<HeroPreview[]> {
    const path = `characters?limit=${limit}&offset=${offset}&apiKey=${apiKey}`;
    return this.http.get(`https://${this.host.name}:${this.host.port}/${path}`).pipe(
      map((hero: any) => hero.map(h => ({
         id: hero.id,
         name: hero.name,
         thumbnail: `${hero.thumbnail.path}.${hero.thumbnail.extension}`
      })))
    );
  }

}
