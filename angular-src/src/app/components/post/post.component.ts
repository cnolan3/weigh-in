import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  title: String;
  description: String;
  category: String;

  categories: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  onSubmitBtn() {
    let newDebate = {
      title: this.title,
      description: this.description,
      topic: this.category,
      minUserType: 1,
      ballotSize: 2,
      ballot: [
        {
          vote: 0,
          name: "no"
        },
        {
          vote: 1,
          name: "yes"
        }
      ] 
    }

    this.dataService.postDebate(newDebate).subscribe(data => {

    });
  }
}
