import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  pop: any;
  lat: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPopular(3).subscribe(data => {
      this.pop = data;
    });

    this.dataService.getLatest(3).subscribe(data => {
      this.lat = data;
      console.log(data);
    });
  }

}
