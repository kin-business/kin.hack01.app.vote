import { db, incrementIt } from "./firebase";
import { IPoll, ISavedPoll, IPollItem } from "../types/vote";

export const observePoll = (id: string, callBack: (poll: ISavedPoll) => void) =>
  db
    .collection("polls")
    .doc(id)
    .onSnapshot(x => {
      callBack({
        id: x.id,
        name: x.get("name"),
        voteItem: x.get("voteItem"),
        isPublished: x.get("isPublished") === true,
        votes: x.get("votes")
      });
    });

export const addPoll = (poll: IPoll) => db.collection("polls").add(poll);
export const updatePoll = (poll: ISavedPoll) =>
  db
    .collection("polls")
    .doc(poll.id)
    .update(poll);

export const voteItem = (poll: ISavedPoll, forItem: IPollItem) =>
  db
    .collection("polls")
    .doc(poll.id)
    .update({
      votes: incrementIt
    });
