export class Assignment {
  _id!: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  renduauteur!: boolean;
  auteur!: {
    _id: string;
    nom: string;
    login: string;
    password: string;
    role: string;
    __v: number;
  };
  matiere!: {
    _id: string;
    nom: string;
    image: string | null;
    prof: {
      _id: string;
      nom: string;
      login: string;
      password: string;
      role: string;
      __v: number;
      image: string;
    };
  };
  note!: number | null;
  remarques!: string | null;
  __v!: number;
}
