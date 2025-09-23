import { CharacterImageDto } from "./CharacterImageDto";
import { CharacterNameDto } from "./CharacterNameDto";

export type CharacterNodeDto = {
  id: number;
  name: CharacterNameDto;
  age: string | null;
  gender: string | null;
  description: string | null;
  image: CharacterImageDto | null;
  siteUrl: string | null;
};
