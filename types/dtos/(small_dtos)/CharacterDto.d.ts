import { CharacterNodeDto } from "./CharacterNodeDto";

export type CharacterDto = {
  role: string;
  node: CharacterNodeDto;
  voiceActors: VoiceActorDto[]; // Array of VoiceActorDto objects
};
