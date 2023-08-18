import fs from "fs";
import path from "path";
import { Event } from "~/extension/ExtendedClient";
import ExtendedSlashCommand from "~/extension/ExtendedSlashCommand";

function baseIterator(dir_path: string, callback: (current_path: string) => void) {
  (function _baseIterator(current_path: string) {
    if (fs.statSync(current_path).isDirectory())
      for (const sub_path of fs.readdirSync(current_path).map(sub_path => path.join(current_path, sub_path)))
        _baseIterator(sub_path);
    else
      callback(current_path);
  })(dir_path);
}

export function commandIterator(commands_path: string, callback: (command: ExtendedSlashCommand, current_path: string) => void) {
  baseIterator(commands_path, current_path => callback(require(current_path).default, current_path));
}

export function eventIterator(events_path: string, callback: (event: Event) => void) {
  baseIterator(events_path, current_path => callback(require(current_path).default));
}
