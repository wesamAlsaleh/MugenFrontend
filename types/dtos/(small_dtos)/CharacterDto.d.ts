import { CharacterNodeDto } from "./CharacterNodeDto";
import { VoiceActorDto } from "./VoiceActorDto";

export type CharacterDto = {
  role: string;
  node: CharacterNodeDto;
  voiceActors: VoiceActorDto[]; // Array of VoiceActorDto objects
};
