import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { tablesDB } from "./config";

export default async function getOrCreateDb() {
  try {
    await tablesDB.get(db);
    console.log("Database connected");
  } catch {
    try {
      await tablesDB.create({ databaseId: db, name: db });
      console.log("Database created");

      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);

      console.log("Collection created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating db or collection", error);
    }
  }

  return tablesDB;
}
