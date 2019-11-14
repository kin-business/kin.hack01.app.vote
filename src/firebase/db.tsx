import { db, incrementIt } from "./firebase";
import { IPoll, ISavedPoll, IPollItem } from "../types/vote";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const observePoll = (id: string, callBack: (poll: ISavedPoll) => void) =>
  db
    .collection("polls")
    .doc(id)
    .onSnapshot(x => {
      var poll = {
        id: x.id,
        name: x.get("name"),
        voteItem: x.get("voteItem"),
        isPublished: x.get("isPublished") === true,
        voteCount: x.get("voteCount"),
        votes: x.get("votes")
      };
      poll.voteItem.forEach((item: any) => {
        item.votes = 0;
      });
      poll.votes.forEach((vote: any) => {
        poll.voteItem[vote.i].votes!++;
      });

      callBack(poll);
    });

export const addPoll = (poll: IPoll) => {
  poll.voteCount = 0;
  poll.votes = [];
  return db.collection("polls").add(poll);
};
export const updatePoll = (poll: ISavedPoll) => {
  var savePoll = { ...poll };
  savePoll.voteCount = 0;
  savePoll.votes = [];
  return db
    .collection("polls")
    .doc(savePoll.id)
    .update(savePoll);
};

export const voteItem = (poll: ISavedPoll, forItem: IPollItem) => {
  var index = poll.voteItem.indexOf(forItem);
  var store = {
    i: index,
    d: Date.now()
  };
  console.log(store);
  return db
    .collection("polls")
    .doc(poll.id)
    .update({
      voteCount: incrementIt,
      votes: firebase.firestore.FieldValue.arrayUnion(store)
    });
};
