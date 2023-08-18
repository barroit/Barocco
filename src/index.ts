import path from "path";
import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { ExtendedClient } from "~/extension/ExtendedClient";
import { BOT_TOKEN } from "~/variable";

const client = new ExtendedClient({ intents: [ GatewayIntentBits.Guilds ] });

client.registerCommands(path.join(__dirname, "commands"));

client.registerEvents(path.join(__dirname, "events"));

client.login(BOT_TOKEN);
