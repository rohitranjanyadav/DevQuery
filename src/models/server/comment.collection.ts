import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { tablesDB } from "./config";

export default async function createCommentCollection() {
  // Creating Collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: commentCollection,
    name: commentCollection,
    permissions: [
      Permission.create("users"),
      Permission.read("any"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Comment Collection Created");

  // Creating Attributes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "type",
      elements: ["answer", "question"],
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "typeId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: commentCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
  ]);
  console.log("Comment Attributes Created");
}
