import { CharacterImageDto } from "./CharacterImageDto";
import { CharacterNameDto } from "./CharacterNameDto";

export type VoiceActorDto = {
  id: number;
  name: CharacterNameDto;
  image: CharacterImageDto;
  siteUrl: string;
};
