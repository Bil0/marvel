import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeroPreview } from '../../../models/';

const apikey = 'f6ef908792f697973acc37c5f0f89c4d';
const host = 'https://gateway.marvel.com/v1/pubic/'

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {
  @Input() heroes: HeroPreview[] = [
    {
      id: 1009489,
      name: 'Ben Parker',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/8/c0/4c003d00c8ed9.jpg'
    },
    {
      id: 1011346,
      name: 'Ben Reilly',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/2/20/4ce5a6abaea69.jpg'
    },
    {
      id: 1010782,
      name: 'Ben Urich',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/5/90/4c00373d10e5e.jpg'
    },
    {
      id: 1010829,
      name: 'Bengal',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/70/5269523ee6c03.jpg'
    },
    {
      id: 1009180,
      name: 'Beta-Ray Bill',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/90/52602f3e88d25.jpg'
    },
    {
      id: 1010325,
      name: 'Betty Brant',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4c7c644f453fb.jpg'
    },
    {
      id: 1009548,
      name: 'Betty Ross',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/2/b0/4ce5a12071562.jpg'
    },
    {
      id: 1011138,
      name: 'Beyonder',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/7/10/528d31df87c49.jpg'
    },
    {
      id: 1011296,
      name: 'Bi-Beast',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      id: 1010843,
      name: 'Big Bertha',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/d0/4c0035cfca8b6.jpg'
    },
    {
      id: 1009181,
      name: 'Big Wheel',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/00/4c0040b26877d.jpg'
    },
    {
      id: 1011262,
      name: 'Bill Hollister',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      id: 1009182,
      name: 'Bishop',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/70/52602f4b42d98.jpg'
    },
    {
      id: 1011224,
      name: 'Bishop (Ultimate)',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      id: 1009183,
      name: 'Black Bird',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      id: 1009184,
      name: 'Black Bolt',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/1/20/52696929dc721.jpg'
    },
    {
      id: 1017330,
      name: 'Black Bolt (Marvel War of Heroes)',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/5239c021b3bfc.jpg'
    },
    {
      id: 1009185,
      name: 'Black Cat',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/e/03/526952357d91c.jpg'
    },
    {
      id: 1010910,
      name: 'Black Cat (Ultimate)',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/5/80/4c00357da502e.jpg'
    },
    {
      id: 1010859,
      name: 'Black Crow',
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    }
  ];

  constructor(protected http: HttpClient) { }

  ngOnInit() {
  }

}
