export async function register() {
  const [{ default: getOrCreateDb }, { default: getOrCreateStorage }] =
    await Promise.all([
      import("./models/server/dbSetup"),
      import("./models/server/storageSetup"),
    ]);

  await Promise.all([getOrCreateDb(), getOrCreateStorage()]);
}