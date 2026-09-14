import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { tablesDB } from "./config";

export default async function createVoteCollection() {
  // Creating Collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: voteCollection,
    name: voteCollection,
    permissions: [
      Permission.create("users"),
      Permission.read("any"),
      Permission.read("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Vote Collection Created");

  // Creating Attributes
  await Promise.all([
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: voteCollection,
      key: "type",
      elements: ["question", "answer"],
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: voteCollection,
      key: "typeId",
      size: 50,
      required: true,
    }),
    tablesDB.createEnumColumn({
      databaseId: db,
      tableId: voteCollection,
      key: "voteStatus",
      elements: ["upvoted", "downvoted"],
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: voteCollection,
      key: "votedById",
      size: 50,
      required: true,
    }),
  ]);
  console.log("Vote Attributes Created");
}
