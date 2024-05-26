import { Prof } from "../prof/prof.model";

export interface Matiere {
professeur: any;
  _id: string;
  nom: string;
  image: string | null;
  prof: Prof;
}
