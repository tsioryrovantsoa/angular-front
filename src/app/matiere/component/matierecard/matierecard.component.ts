import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-matierecard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './matierecard.component.html',
  styleUrl: './matierecard.component.css'
})
export class MatierecardComponent {
  @Input() nom: string | any;
  @Input() image: string | any | null;
  @Input() profNom: string | any;
  @Input() profImage: string | any | null;
}
