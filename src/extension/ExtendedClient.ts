import { Awaitable, CacheType, ChatInputCommandInteraction, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { commandIterator, eventIterator } from "~/utils/IterableLoader";
import ExtendedSlashCommand from "~/extension/ExtendedSlashCommand";

export interface Event<K extends keyof ClientEvents = never> {
  type: K;
  timing: "once" | "on";
  execute: (...args: ClientEvents[K]) => Awaitable<void>;
}

export class ExtendedClient<Ready extends boolean = boolean> extends Client<Ready> {
  commands: Collection<string, ExtendedSlashCommand>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }

  /**
   * @deprecated not very flexible
   */
  static getCommand<Cached extends CacheType = "cached">(
    name: string,
    description: string,
    execute: (interaction: ChatInputCommandInteraction<Cached>) => Awaitable<void>,
  ): ExtendedSlashCommand<Cached> {
    return new ExtendedSlashCommand<Cached>()
      .setName(name)
      .setDescription(description)
      .setExecute(execute);
  }

  registerCommands(commands_path: string): void {
    commandIterator(commands_path, command => this.commands.set(command.name, command));
  }

  static getEvent<K extends keyof ClientEvents>(
    type: K,
    timing: "once" | "on",
    execute: (...args: ClientEvents[K]) => Awaitable<void>,
  ): Event<K> {
    return {
      type,
      timing,
      execute,
    };
  }

  registerEvents(events_path: string): void {
    eventIterator(events_path, event => this[event.timing](event.type, (...args) => event.execute(...args)));
  }

  addCommand(command: ExtendedSlashCommand): void {
    this.commands.set(command.name, command);
  }

  getCommand(name: string): ExtendedSlashCommand | undefined {
    return this.commands.get(name);
  }

  deleteCommand(name: string): boolean {
    return this.commands.delete(name);
  }
}
