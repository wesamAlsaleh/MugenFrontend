import { CharacterImageDto } from "./CharacterImageDto";
import { CharacterNameDto } from "./CharacterNameDto";

export type CharacterNodeDto = {
  id: number;
  name: CharacterNameDto;
  age: string;
  gender: string;
  description: string;
  image: CharacterImageDto;
  siteUrl: string;
};
