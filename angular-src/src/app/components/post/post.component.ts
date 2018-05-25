import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';
import { FlashService } from '../../services/flashService/flash.service';
import { Router } from '@angular/router';

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

  constructor(private dataService: DataService,
              private flashService: FlashService,
              private router: Router) { }

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

    this.dataService.postDebate(newDebate).subscribe((data: any) => {
      if(data.success) {
        this.flashService.show('Successfully Posted New Debate', 'success', 3000);
        this.router.navigate(['/debate', data.debateId]);
      }
    }, err => {
      if(err) {
        if(err.error == 'Error')
          this.flashService.show('Server Error', 'danger', 4000);
        else if(err.error == 'IncompleteDebateObject')
          this.flashService.show('Please Fill In All Fields', 'warning', 4000);
        else
          this.flashService.show('Unknown Error', 'danger', 4000);
      }
    });
  }
}
