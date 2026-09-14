import { OrderBy, Permission, TablesDBIndexType } from "node-appwrite";
import { db, questionCollection } from "../name";
import { tablesDB } from "./config";

async function createIndexWhenReady(columns: string[], key: string) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      await tablesDB.createIndex({
        databaseId: db,
        tableId: questionCollection,
        key,
        type: TablesDBIndexType.Fulltext,
        columns,
        orders: [OrderBy.Asc],
      });
      return;
    } catch (error) {
      const errorType =
        error && typeof error === "object" && "type" in error
          ? error.type
          : undefined;

      if (errorType !== "column_not_available" || attempt === 7) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

export default async function createQuestionCollection() {
  // create collection
  await tablesDB.createTable({
    databaseId: db,
    tableId: questionCollection,
    name: questionCollection,
    permissions: [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ],
  });
  console.log("Question collection is created");

  // creating attributes and indexes
  await Promise.all([
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "title",
      size: 100,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "content",
      size: 10000,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "authorId",
      size: 50,
      required: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "tags",
      size: 50,
      required: true,
      array: true,
    }),
    tablesDB.createStringColumn({
      databaseId: db,
      tableId: questionCollection,
      key: "attachmentId",
      size: 50,
      required: false,
    }),
  ]);

  console.log("Question Attributes created");

  // create indexes
  await createIndexWhenReady(["title"], "title");
  await createIndexWhenReady(["content"], "content");
}
