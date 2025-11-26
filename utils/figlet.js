import chalk from "chalk";
import figlet from "figlet";
import { log } from "./print.js";

export async function figletMessage(msg) {
  const text = await figlet.text(msg);
  log(chalk.green(text));
}
