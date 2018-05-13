import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  pop: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPopular(1).subscribe(data => {
      this.pop = data;
    });
  }

}
