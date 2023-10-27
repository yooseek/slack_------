import { Manifest } from "deno-slack-sdk/mod.ts";
import { FindGIFFunction } from "./functions/find_gif.ts";
import { GiveCompetitionsWorkflow } from "./workflows/give_competitions.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "project-with-maniddo",
  displayName: "Maniddo",
  description: "A functions that can use maniddo process created by Kyung-Seek Yoo",
  icon: "assets/default_new_app_icon.png",
  functions: [FindGIFFunction],
  workflows: [GiveCompetitionsWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write","chat:write.customize", "chat:write.public"],
});
