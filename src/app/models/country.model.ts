interface Flag {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}

export interface Country {
  flags: Flag;
  name: Name;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  capital: string[];
  languages: { [key: string]: string };
  borders: string[];
  area: number;
  population: number;
}

export interface FavCountry {
  name: string;
  flag: string;
  cca2: string;
}
