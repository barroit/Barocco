import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import { BOT_TOKEN, APPLICATION_ID, GUILD_ID, DEV_GUILD_ID, isDevelopment, ROOT_DIR } from "~/variable";
import path from "path";
import { commandIterator } from "~/utils/IterableLoader";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

commandIterator(path.join(ROOT_DIR, "commands"), command => {
  delete (command as any).execute;
  commands.push(command.toJSON());
});

const rest = new REST().setToken(BOT_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${ commands.length } application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(APPLICATION_ID, isDevelopment() ? DEV_GUILD_ID : GUILD_ID),
      { body: commands },
    ) as RESTPostAPIChatInputApplicationCommandsJSONBody[];

    console.log(`Successfully reloaded ${ data.length } application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
