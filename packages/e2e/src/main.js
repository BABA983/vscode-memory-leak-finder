import { runScenario } from "core";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const main = async () => {
  const scenario = process.env.SCENARIO || "Base";
  const scenarioPath = join(root, "src", "scenario", scenario + ".js");
  await runScenario(scenarioPath);
};

main();