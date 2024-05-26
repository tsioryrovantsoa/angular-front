import { Component, ViewChild } from '@angular/core';
import { Matiere } from '../../matiere.model';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatiereService } from '../../../shared/matiere.service';
import { MatierecardComponent } from '../../component/matierecard/matierecard.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
    MatierecardComponent],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  matieres: Matiere[] = [];
  pageSize = 4;
  pagedMatieres: Matiere[] | any = [] ;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private matiereService: MatiereService, private route: ActivatedRoute) {}

  ngOnInit() {
// '664b91cb072ae93db4ed0f6f'
    this.route.paramMap.subscribe(params => {
      var profId = params.get('id')??"";
      this.matiereService.getMatieres(profId).subscribe((data) => {
        this.matieres = data;
        this.updatePagedMatieres();
      });
    });
  }

  updatePagedMatieres() {
    const startIndex = this.paginator.pageIndex * this.pageSize;
    this.pagedMatieres = this.matieres.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.updatePagedMatieres();
  }
}
