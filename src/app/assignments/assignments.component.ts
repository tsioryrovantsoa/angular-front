import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  imports: [CommonModule, MatCardModule, MatPaginatorModule],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  page = 1;
  limit = 2;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    private assignmentsService: AssignmentsService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getAssignmentsFromService();
  }

  getAssignmentsFromService() {
    console.log("this.page", this.page);
    console.log("this.limit", this.limit);
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        console.log(
          data.data
        );
        this.assignments = data.data.docs;
        this.totalDocs = data.data.totalDocs;
        this.totalPages = data.data.totalPages;
        this.nextPage = data.data.nextPage;
        this.prevPage = data.data.prevPage;
        this.hasNextPage = data.data.hasNextPage;
        this.hasPrevPage = data.data.hasPrevPage;
      });
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromService();
  }
}
