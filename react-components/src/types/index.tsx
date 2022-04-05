export interface ICard {
  id: number;
  name: string;
  image: string;
  img: string;
  status: string;
  gender: string;
  species: string;
  origin: {
    name: string;
  };
}

export interface IUser {
  id: number;
  name: string;
  birthDate: string;
  birthPlace: string;
  sex: 'male' | 'female' | any;
  img: string | ArrayBuffer | null;
}
