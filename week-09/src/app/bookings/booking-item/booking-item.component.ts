import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/_services/place.model';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
})
export class BookingItemComponent implements OnInit {

  @Input() booking: Place;

  constructor() { }

  ngOnInit() {}

}
