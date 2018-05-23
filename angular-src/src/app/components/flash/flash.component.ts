import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FlashService } from '../../services/flashService/flash.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
  animations: [
    trigger('messageState', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ])
  ]
})
export class FlashComponent implements OnInit {
  active: boolean = false;
  message: string = '';

  constructor(private flashService: FlashService) { 
    this.flashService.show = this.show.bind(this);
    this.flashService.hide = this.hide.bind(this);
  }

  show(message, duration) {
    this.message = message;
    this.active = true;

    setTimeout(() => {
      this.active = false;
    }, duration);
  }

  hide() {
    this.active = false;
  }

  ngOnInit() {
  }

}
