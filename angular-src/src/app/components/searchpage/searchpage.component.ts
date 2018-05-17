import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  searchVal: String;

  results: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.searchVal);
    this.dataService.searchDebates(this.searchVal, 10, 0).subscribe((data: any) => {
      this.results = data.debates;
    });
  }
}
