export interface IPoll {
  name: string;
  voteItem: IPollItem[];
  isPublished?: boolean;
  voteCount?: number;
  votes?: IVote[];
}

export interface ISavedPoll extends IPoll {
  id: string;
}

export interface IVote {
  i: number;
  d: number;
}

export interface IPollItem {
  description: string;
  cost?: number;
  link?: string;
  image?: string;
  starFeature?: string;
  votes?: number;
}
