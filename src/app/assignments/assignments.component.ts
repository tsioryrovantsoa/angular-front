import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from '../shared/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

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
    MatProgressSpinnerModule,
    RouterModule
  ],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  pageSize = 9;
  currentPage = 1;
  total =0;
  pagedAssignments: Assignment[] | any = [] ;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private assignmentsService: AssignmentsService,private loadingService:LoadingService
  ) {}

  ngOnInit() {
    this.getAssignmentsFromService();
  }
  isLoading: boolean = false;
  getAssignmentsFromService() {
    this.isLoading = true; // Activer le chargement
    this.assignmentsService
      .getAssignmentsPagines(this.currentPage, this.pageSize)
      .subscribe(
        (data) => {
          this.total = data.data.total;
          this.assignments = data.data.docs;
          this.updatePagedAssignments();
          this.isLoading = false; // Désactiver le chargement une fois les données récupérées
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
          this.isLoading = false; // Désactiver le chargement en cas d'erreur
        }
      );
  }

  updatePagedAssignments() {
    const startIndex = this.paginator.pageIndex * this.pageSize;
    this.pagedAssignments = this.assignments.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.getAssignmentsFromService();
  }

  isDatePassed(date: Date): boolean {
    return new Date(date) <= new Date();
  }
}
