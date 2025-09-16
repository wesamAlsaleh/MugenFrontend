import { RelationNodeDto } from "./RelationNodeDto";

export type RelationDto = {
  relationType: string; // Type of relation (e.g., "SEQUEL", "PREQUEL", etc.)
  node: RelationNodeDto; // The related anime/manga node
};
