import { StudioNodeDto } from "./StudioNodeDto";

export type StudioDto = {
  id: number;
  isMain: boolean;
  node: StudioNodeDto;
};
