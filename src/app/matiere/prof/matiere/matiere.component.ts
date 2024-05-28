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
import { Observer } from 'rxjs';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
    MatierecardComponent,
     ],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  profId = this.route.snapshot.paramMap.get('id') ?? "";
  matieres: Matiere[] = [];
  pageSize = 4;
  currentPage = 1;
  total =0;
  pagedMatieres: Matiere[] | any = [];
  loading: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private matiereService: MatiereService, private route: ActivatedRoute) { }

  ngOnInit() {
    // '664b91cb072ae93db4ed0f6f'
    this.route.paramMap.subscribe(params => {

      // this.getMatiereByProfId(profId, this.currentPage, this.pageSize);
      this.matiereService.getMatieres(this.profId, this.currentPage, this.pageSize).subscribe(this.result);

    });
  }

   getMatiereByProfId(profId: string, page: number, limit: number) {
    console.log("haha"+this.matieres.length);
   this.matiereService.getMatieres(profId, page, limit).subscribe(this.result);

    // => {
    //   // this.total=data.total
    //   // this.matieres = data.docs;
    //   // this.updatePagedMatieres();
    //   // console.log("haha 1"+this.matieres.length)
    // });
    // console.log("haha 2 "+this.matieres.length)
  }

  result: Partial<Observer<any>> = {
    next: (data) => {

      // console.log("data"+data.content.length);
      this.total=data.data.total
      this.matieres = data.data.docs;
      this.updatePagedMatieres();

    },
    error: (_) => {
      // this.error();
      // this.loading = false;
    },
    complete: () => {
      this.loading = false;
     console.log( "fyyy"+this.matieres.length);

    },
  };

  updatePagedMatieres() {
    const startIndex = this.paginator.pageIndex * this.pageSize;
    this.pagedMatieres = this.matieres.slice(startIndex, startIndex + this.pageSize);
  }

   onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;

    // console.log("page tay"+this.currentPage)
    // // console.log("limit tay"+this.pageSize)
    // console.log("atpo izy zao")
    this.matiereService.getMatieres(this.profId,this.currentPage,4).subscribe(this.result);
  }
}
