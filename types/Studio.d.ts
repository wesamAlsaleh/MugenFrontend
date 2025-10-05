import { Anime } from "./Anime";

export type Studio = {
  data: {
    name: string | null;
    media: {
      edges: StudioEdges | null; // Array of edges
    } | null;
    isAnimationStudio: boolean | null;
  } | null;
};

// Array of objects that contain node property which holds the anime details and isMainStudio property
export type StudioEdges = Array<{
  node: StudioNode; // Each edge contains a node with anime details
  isMainStudio: boolean | null;
}>;

// Specific type for StudioNode which extends Anime type
export type StudioNode = Anime & {
  season: string | null;
  format: MediaFormat | string | null;
  startDate: StartDateDto | null;
};

// media = {nodes = [{anime details such as Id, title }, {}, {}]}
