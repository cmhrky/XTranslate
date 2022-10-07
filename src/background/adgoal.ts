import { createStorageHelper } from "../extension/storage";
import { getURL } from "../extension/runtime";

export const adgoalSkip = createStorageHelper("adskip", {
  defaultValue: false
});

export async function adgoalInit() {
  await adgoalSkip.load();
  if (adgoalSkip.get()) return; // skip integration

  importScripts(getURL("adgoal/background.bundle.js"));

  (globalThis as any).universalSearchCredentials = {
    API_PUBLIC_KEY: 'ADfU2KbHWQ',
    MEMBER_HASH: '1HlP4gKx',
    PANEL_HASH: 'mfje9JoyzV'
  };
}
