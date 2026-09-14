"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

let hasPinged = false;

export function AppwritePing() {
  useEffect(() => {
    if (hasPinged) return;

    hasPinged = true;
    void client.ping().then(
      () => console.info("Appwrite connection successful."),
      (error: unknown) => console.error("Appwrite connection failed.", error),
    );
  }, []);

  return null;
}
