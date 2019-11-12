export interface IPoll {
  name: string;
  voteItem: IPollItem[];
}

export interface ISavedPoll extends IPoll {
  id: string;
}

export interface IPollItem {
  description: string;
  cost?: number;
  link?: number;
  image?: number;
  starFeature?: number;
}
