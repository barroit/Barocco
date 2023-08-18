import { REST, Routes } from "discord.js";
import { BOT_TOKEN, APPLICATION_ID, GUILD_ID, DEV_GUILD_ID, isDevelopment } from "~/variable";

const rest = new REST().setToken(BOT_TOKEN);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(APPLICATION_ID, isDevelopment() ? DEV_GUILD_ID : GUILD_ID), { body: [] })
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(console.error);

// for global commands
isDevelopment() && rest.put(Routes.applicationCommands(APPLICATION_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
