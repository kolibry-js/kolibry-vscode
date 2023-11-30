import { existsSync, promises as fs } from 'node:fs'
import { join } from 'node:path'
import type { ExtensionContext } from 'vscode'
import { commands, workspace } from 'vscode'
import { config } from './config'
import { ctx } from './ctx'
import { configEditor } from './editor'

export async function activate(ext: ExtensionContext) {
   ctx.ext = ext

   const userRoot = workspace.workspaceFolders?.[0].uri.fsPath

   if (!userRoot || !existsSync(join(userRoot, 'package.json')))
      return

   let enabled = config.enabled

   if (!enabled) {
      const json = JSON.parse(await fs.readFile(join(userRoot, 'package.json'), 'utf-8'))
      enabled = json?.dependencies?.['@kolibry/cli'] || json?.devDependencies?.['@kolibry/cli']
   }

   if (enabled) {
      commands.executeCommand('setContext', 'kolibry-enabled', true)
      configEditor()
   }
}

export async function deactivate() {
}
