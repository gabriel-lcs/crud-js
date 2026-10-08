import { pool } from "./database/database.js";
import { mainMenu } from "./menus/main.js";

console.log("\n-- LISTA DE TAREFAS --")

await mainMenu();
await pool.end();