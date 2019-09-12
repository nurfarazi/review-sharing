import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  displayedColumns: string[] = ['review', 'userName', 'time', 'downVote', 'upVote'];

  dataSource: MatTableDataSource<any>;

  constructor(private reviewSvc: ReviewService) {
  }

  ngOnInit() {
    this.reviewSvc.fetch().subscribe(data => {
      this.dataSource = data;
    });
  }

  onVote(id: string, formData: string) {
    const vote = {
      vote: formData
    };
    this.reviewSvc.vote(id, vote).subscribe(data => console.log(data));
  }
}
