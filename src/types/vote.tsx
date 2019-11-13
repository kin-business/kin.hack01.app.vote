export interface IPoll {
  name: string;
  voteItem: IPollItem[];
  isPublished?: boolean;
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
