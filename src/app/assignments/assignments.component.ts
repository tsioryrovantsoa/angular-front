import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  imports: [
    CommonModule,
    MatCardModule
  ],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  page = 1;
  limit = 10;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    private assignmentsService: AssignmentsService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getAssignmentsFromService();
  }

  getAssignmentsFromService() {
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.data.docs;
      });
  }
}
