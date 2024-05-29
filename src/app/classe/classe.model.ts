import { Matiere } from "../matiere/matiere.model";

export interface Classe {
  _id: string;
  nom: string;
  niveau: string;
  eleves: string[];
  matieres: Matiere[];
}
