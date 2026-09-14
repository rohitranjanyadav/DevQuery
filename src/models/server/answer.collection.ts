import { Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { tablesDB } from "./config";

export default async function createAnswerCollection() {
  // Creating Collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: answerCollection,
    name: answerCollection,
    permissions: [
      Permission.create("users"),
      Permission.read("any"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Answer Collection Created");

  // Creating Attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "questionId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: answerCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
  ]);
  console.log("Answer Attributes Created");
}
