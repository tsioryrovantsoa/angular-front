import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
  ],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  pageSize = 3;
  currentPage = 1;
  total =0;
  pagedAssignments: Assignment[] | any = [] ;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private assignmentsService: AssignmentsService,
  ) {}

  ngOnInit() {
    this.getAssignmentsFromService();
  }

  getAssignmentsFromService() {
    this.assignmentsService
      .getAssignmentsPagines(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.total = data.data.total;
        this.assignments = data.data.docs;
        this.updatePagedAssignments();
      });

  }

  updatePagedAssignments() {
    const startIndex = this.paginator.pageIndex * this.pageSize;
    this.pagedAssignments = this.assignments.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.getAssignmentsFromService();
  }
}
