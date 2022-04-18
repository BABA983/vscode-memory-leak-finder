import { expect } from "@playwright/test";
import * as ChromeDevtoolsProtocol from "../ChromeDevtoolsProtocol/ChromeDevtoolsProtocol.js";
import * as Electron from "../Electron/Electron.js";

const getScenario = (scenarioId) => {
  switch (scenarioId) {
    case "Base":
      return import("../Scenarios/ScenarioBase.js");
    case "QuickPick":
      return import("../Scenarios/ScenarioQuickPick.js");
    default:
      throw new Error(`unknown scenario ${scenarioId}`);
  }
};

export const runScenario = async (scenarioId) => {
  try {
    const child = await Electron.launch();
    const { page, session } = await ChromeDevtoolsProtocol.connect(child);
    await page.waitForLoadState("networkidle");
    const main = page.locator('[role="main"]');
    await expect(main).toBeVisible();
    const scenario = await getScenario(scenarioId);
    await scenario.run(page, session);
    await scenario.run(page, session);
    console.info(`Scenario ${scenarioId} exited with code 0`);
  } catch (error) {
    console.error(error);
    console.info(`Scenario ${scenarioId} exited with code 1`);
  }
  // child.close();
};
