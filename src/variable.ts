import { ok } from "assert";

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const APPLICATION_ID = process.env.APPLICATION_ID as string;
const GUILD_ID = process.env.GUILD_ID as string;

const NODE_ENV = process.env.NODE_ENV ?? "development";
const DEV_GUILD_ID = process.env.DEV_GUILD_ID as string;

const ROOT_DIR = __dirname;

ok(!!BOT_TOKEN, "BOT_TOKEN must be defined.");
ok(!!APPLICATION_ID, "CLIENT_ID must be defined.");
ok(!!GUILD_ID, "GUILD_ID must be defined.");
ok(isDevelopment() ? !!DEV_GUILD_ID : true, "DEV_GUILD_ID must be defined in dev mode.");

export function isDevelopment() {
  return NODE_ENV === "development";
}

export {
  BOT_TOKEN,
  APPLICATION_ID,
  GUILD_ID,
  DEV_GUILD_ID,
  ROOT_DIR,
};