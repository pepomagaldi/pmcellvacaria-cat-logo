import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
// Aceita o argumento de porta do ambiente de prévia e do npm run dev.
const args = process.argv.slice(2);
const i = args.findIndex((a) => a === "--port" || a === "-p");
const port = i >= 0 ? args[i + 1] : process.env.PORT || "3000";
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    existsSync(".preview-production") ? "start" : "dev",
    "--hostname",
    "0.0.0.0",
    "--port",
    port,
  ],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
