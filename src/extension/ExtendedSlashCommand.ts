import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class ExtendedSlashCommand<Cached extends CacheType = CacheType> extends SlashCommandBuilder {
  execute: (interaction: ChatInputCommandInteraction<Cached>) => void = () => {};

  setExecute(execute: (interaction: ChatInputCommandInteraction<Cached>) => void): this {
    this.execute = execute;
    return this;
  }

  static getCommand<Cached extends CacheType = "cached">(): ExtendedSlashCommand<Cached> {
    return new ExtendedSlashCommand<Cached>();
  }
}
