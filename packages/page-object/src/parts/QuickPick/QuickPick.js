import * as KeyBindings from '../KeyBindings/KeyBindings.js'

export const create = ({ expect, page, VError }) => {
  return {
    async show(key = KeyBindings.OpenQuickPickFiles) {
      try {
        const quickPick = page.locator('.quick-input-widget')
        await page.pressKeyExponential({
          key: key,
          waitFor: quickPick,
        })
        await expect(quickPick).toBeVisible({
          timeout: 10_000,
        })
        await expect(quickPick).toBeVisible()
        const quickPickInput = quickPick.locator('[role="combobox"]')
        await expect(quickPickInput).toBeVisible()
        await expect(quickPickInput).toBeFocused()
      } catch (error) {
        throw new VError(error, `Failed to show quick pick`)
      }
    },
    async showCommands() {
      try {
        return this.show(KeyBindings.OpenQuickPickCommands)
      } catch (error) {
        throw new VError(error, `Failed to show quick pick`)
      }
    },
    async type(value) {
      try {
        const quickPick = page.locator('.quick-input-widget')
        const quickPickInput = quickPick.locator('[role="combobox"]')
        await expect(quickPickInput).toBeVisible()
        await expect(quickPickInput).toBeFocused({ timeout: 3000 })
        await quickPickInput.type(value)
      } catch (error) {
        throw new VError(error, `Failed to type ${value}`)
      }
    },
    async select(text) {
      try {
        const quickPick = page.locator('.quick-input-widget')
        await expect(quickPick).toBeVisible()
        const option = quickPick.locator('.label-name', {
          hasText: text,
        })
        await option.click()
        await expect(quickPick).toBeHidden()
      } catch (error) {
        throw new VError(error, `Failed to select "${text}"`)
      }
    },
    async executeCommand(command) {
      try {
        await this.showCommands()
        await this.type(command)
        await this.select(command)
      } catch (error) {
        throw new VError(error, `Failed to execute command "${command}"`)
      }
    },
    async openFile(fileName) {
      try {
        await this.show(KeyBindings.OpenQuickPickFiles)
        await this.type(fileName)
        await this.select(fileName)
      } catch (error) {
        throw new VError(error, `Failed to open "${fileName}"`)
      }
    },
    async showColorTheme() {
      try {
        await page.keyboard.press(KeyBindings.OpenQuickPickCommands)
        const quickPick = page.locator('.quick-input-widget')
        await expect(quickPick).toBeVisible()
        const quickPickInput = quickPick.locator('[role="combobox"]')
        // await expect(quickPickInput).toHaveText(">");
        await quickPickInput.type('Preferences: Color Theme')
        const firstOption = quickPick.locator('.monaco-list-row').first()
        const firstOptionLabel = firstOption.locator('.label-name')
        await expect(firstOptionLabel).toHaveText('Preferences: Color Theme')
        await expect(firstOption).toBeVisible()
        await firstOption.click()
      } catch (error) {
        throw new VError(error, `Failed to show quick pick color theme`)
      }
    },
    async focusNext() {
      try {
        // TODO verify that aria active descendant has changed
        await page.keyboard.press(KeyBindings.ArrowDown)
      } catch (error) {
        throw new VError(error, `Failed to focus next quick pick item`)
      }
    },
    async focusPrevious() {
      try {
        // TODO verify that aria active descendant has changed
        await page.keyboard.press(KeyBindings.ArrowUp)
      } catch (error) {
        throw new VError(error, `Failed to focus previous quick pick item`)
      }
    },
    async hide() {
      try {
        const quickPick = page.locator('.quick-input-widget')
        await expect(quickPick).toBeVisible()
        await page.keyboard.press(KeyBindings.Escape)
        await expect(quickPick).toBeHidden()
      } catch (error) {
        throw new VError(error, `Failed to hide quick pick`)
      }
    },
  }
}
