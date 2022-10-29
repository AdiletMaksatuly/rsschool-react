export type ICard = {
  id: number;
  name: string;
  image: string;
  img: string;
  status: string;
  gender: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
  };
};

export type IUser = {
  id: number | null;
  name: string;
  birthDate: string;
  birthPlace: string;
  sex: 'male' | 'female' | any;
  img: string | ArrayBuffer | null;
};

export type FormInputs = {
  username: string;
  sex: 'male' | 'female' | any;
  birthDate: string;
  agreement: boolean;
  img: File[];
  birthPlace: string;
};
