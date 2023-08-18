import { ExtendedClient } from "~/extension/ExtendedClient";
import { Events } from "discord.js";

export default ExtendedClient.getEvent(Events.ClientReady, "once", client => {
  console.log(`Ready! Logged in as ${ client.user.tag }`);
});
