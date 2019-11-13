import { db } from "./firebase";
import { IPoll, ISavedPoll } from "../types/vote";

export const observePoll = (id: string, callBack: (poll: ISavedPoll) => void) =>
  db
    .collection("polls")
    .doc(id)
    .onSnapshot(x => {
      callBack({
        id: x.id,
        name: x.get("name"),
        voteItem: x.get("voteItem")
      });
    });

export const addPoll = (poll: IPoll) => db.collection("polls").add(poll);
export const updatePoll = (poll: ISavedPoll) =>
  db
    .collection("polls")
    .doc(poll.id)
    .update(poll);
