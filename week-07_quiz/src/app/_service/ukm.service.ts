import { Injectable } from '@angular/core';
import { Ukm } from './ukm.model';

@Injectable({
  providedIn: 'root'
})
export class UkmService {

  private _myUkm: Ukm[] = [];
  private _ukmList: Ukm[] = [
    new Ukm(
      1,
      'Basket',
      'Basket adalah UKM Blabla bla..',
      '/assets/shapes.svg'
    ),
    new Ukm(
      2,
      'Drama',
      'Drama adalah UKM Blabla bla..',
      '/assets/shapes.svg'
    ),
    new Ukm(
      3,
      'Volley',
      'Volley adalah UKM Blabla bla..',
      '/assets/shapes.svg'
    ),
    new Ukm(
      4,
      'Futsal',
      'Futsal adalah UKM Blabla bla..',
      '/assets/shapes.svg'
    ),
    new Ukm(
      5,
      'Gaming',
      'Gaming adalah UKM Blabla bla..',
      '/assets/shapes.svg'
    )
  ];

  constructor() { }

  getAllUkm() { return [...this._ukmList]; }

  getUkm(ukmId: number) {
    return { ...this._ukmList.find(p => p.id === ukmId) };
  }

  getAllMyUkm() { return [...this._myUkm]; }

  addMyUkm(ukmId: number) {
    this._myUkm.push(this.getUkm(ukmId));
  }

  removeMyUkm(ukm: any) {
    this._myUkm.splice(this._myUkm.indexOf(ukm), 1);
  }
}
