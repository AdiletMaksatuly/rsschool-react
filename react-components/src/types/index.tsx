export interface ICard {
  id: number;
  title: string;
  artist: string;
  body: string;
  img: string;
}

export interface IUser {
  id: number;
  name: string;
  birthDate: string;
  birthPlace: string;
  sex: 'male' | 'female' | '';
  img: string;
}
