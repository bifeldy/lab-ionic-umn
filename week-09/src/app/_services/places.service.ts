import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      '1',
      'Serpong M-Town',
      '2BR apartment near Summarecon Mal Serpong.',
      'http://www.summareconbekasi.com/public/images/gallery/article/7082/IMG_3293-25.jpg',
      700000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      '2',
      'Scientia Residence',
      'Near UMN with many choices of foods around.',
      'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3' ,
      1000000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p1',
      'Gading Apartment',
      '2BR, Luas dan Cozy',
      'http://www.desertsun.co.uk/blog/images/Apartment%201.jpg',
      100000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2',
      'Serpong Apartment',
      'Apartemen Romantis',
      'https://static3.businessinsider.com/image/5681799ce6183e55008b526d-480/carmel-place-nyc-micro-apartment.jpg',
      125000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p3',
      'BSD Apartment',
      'Apartemen Murah',
      'https://lh3.googleusercontent.com/-F5aY6yinaiA/TW_NzlRJppI/AAAAAAAAABo/fewLnztPeDU/s1600/apartment+building+designs...jpg',
      50000000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
  ];

  constructor() { }

  getAllPlaces() {
    return [...this._places];
  }

  getPlace(placeId: string) {
    return {
      ...this._places.find(p => p.id === placeId)
    };
  }
}
