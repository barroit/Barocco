import { ExtendedClient } from "~/extension/ExtendedClient";
import { Events } from "discord.js";

export default ExtendedClient.getEvent(Events.InteractionCreate, "on", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as ExtendedClient).getCommand(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${ interaction.commandName } was found.`);
    return;
  }

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred)
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
    else
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});
