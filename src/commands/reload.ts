import ExtendedSlashCommand from "~/extension/ExtendedSlashCommand";
import { ExtendedClient } from "~/extension/ExtendedClient";
import { commandIterator } from "~/utils/IterableLoader";
import path from "path";
import { CacheType } from "discord.js";
import { ROOT_DIR } from "~/variable";

export default ExtendedSlashCommand.getCommand()
  .setName("reload")
  .setDescription("Reloads a command.")
  .addStringOption(option => option.setName("command").setDescription("The command to reload.").setRequired(true))
  .setExecute(async interaction => {
    const command_name = interaction.options.getString("command", true).toLowerCase();
    const client = (interaction.client as ExtendedClient);
    const old_command = client.getCommand(command_name);

    if (!old_command) {
      return interaction.reply(`There is no command with name \`${ command_name }\`!`);
    }

    try {
      let new_command: ExtendedSlashCommand<CacheType> | undefined;

      commandIterator(path.join(ROOT_DIR, "commands"), (_, current_path) => {
        const command_path = require.resolve(current_path);
        if (command_path.split("/").at(-1)!.split(".")[0]! === `${ command_name }`) {
          // remove cache so we can require the updated command
          delete require.cache[command_path];
          // DO NOT FORGET TO RESOLVE THE DEFAULT IMPORT😅
          new_command = require(command_path).default;
        }
      });

      if (!new_command) {
        return interaction.reply(`Command \`${ old_command.name }\` not found on the disk!`);
      }

      client.deleteCommand(old_command.name);
      client.addCommand(new_command);

      await interaction.reply(`Command \`${ new_command.name }\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`There was an error while reloading a command \`${ old_command.name }\``);
    }
  });
