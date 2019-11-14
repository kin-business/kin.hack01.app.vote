export interface IPoll {
  name: string;
  voteItem: IPollItem[];
  isPublished?: boolean;
  votes?: number;
}

export interface ISavedPoll extends IPoll {
  id: string;
}

export interface IPollItem {
  description: string;
  cost?: number;
  link?: string;
  image?: string;
  starFeature?: string;
  votes?: number;
}
