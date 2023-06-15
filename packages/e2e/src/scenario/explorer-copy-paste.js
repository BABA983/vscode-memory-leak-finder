export const beforeSetup = async ({
  tmpDir,
  userDataDir,
  writeFile,
  join,
  writeJson,
}) => {
  await writeFile(join(tmpDir, "file-1.txt"), ``);
  await writeJson(join(userDataDir, "User", "settings.json"), {
    "window.titleBarStyle": "custom",
    "explorer.confirmDelete": false,
  });
};

export const run = async ({ Explorer }) => {
  await Explorer.focus();
  await Explorer.copy("file-1.txt");
  await Explorer.paste();
  await Explorer.shouldHaveFocusedItem("file-1 copy.txt");
  await Explorer.delete("file-1 copy.txt");
  await Explorer.shouldHaveFocusedItem("file-1.txt");
};