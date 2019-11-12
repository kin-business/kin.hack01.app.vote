import { db } from "./firebase";
import { IPoll, ISavedPoll } from "../types/vote";

// User API
// export const doCreateUser = (id: string, username: string, email: string) =>
//   db.ref(`users/${id}`).set({
//     email,
//     username
//   });

// export const onceGetUsers = () => db.ref("users").once("value");

export const observePoll = (id: string, callBack: (poll: ISavedPoll) => void) =>
  db
    .collection("polls")
    .doc(id)
    .onSnapshot(x => {
      console.log(x);
      callBack({
        id: x.id,
        name: x.get("name"),
        voteItem: x.get("voteItem")
      });
    });
export const setPoll = (poll: IPoll) => db.collection("polls").add(poll);
