import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/dataService/data.service';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss']
})
export class DebateComponent implements OnInit {
  title: String;
  description: String;
  topic: String;
  author: String;
  minUserType: Number;
  debateId: Number;

  results: any;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getDebateById(params.id).subscribe((data: any) => {
        this.title = data.title;
        this.description = data.description;
        this.topic = data.topicName;
        this.author = data.authorUsername;
        this.minUserType = data.minUserType;
      });

      this.dataService.getResults(params.id).subscribe((data: any) => {
        data.votes.forEach(function(el) {
          el.vote = data.ballot[el.vote].name;
        });

        this.results = data.votes;
      });

      this.debateId = params.id;
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  vote(val) {
    let v = {
      debateId: this.debateId,
      vote: val
    }

    this.dataService.vote(v).subscribe(data => {
      this.dataService.getResults(this.debateId).subscribe((data: any) => {
        data.votes.forEach(function(el) {
          el.vote = data.ballot[el.vote].name;
        });

        this.results = data.votes;
      });
    });
  }
}
