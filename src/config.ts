import { isString } from '@nyxb/utils'
import { ConfigurationTarget, workspace } from 'vscode'

export function getConfig<T>(key: string, v?: T) {
   return workspace.getConfiguration('kolibry').get(key, v)
}

export function setConfig<T>(key: string, v?: T) {
   return workspace.getConfiguration('kolibry').set(key, v, ConfigurationTarget.Workspace)
}

export interface Config {
   root: string
   port: number
   enabled: boolean
   annotations: boolean
}

export const config = new Proxy(
   {
      get root() {
         return workspace.workspaceFolders?.[0]?.uri?.fsPath || ''
      },
   },
   {
      get(target, p, r) {
         if (p in target || !isString(p))
            return Reflect.get(target, p, r)
         return getConfig(p)
      },
      set(target, p, v) {
         setConfig(p as string, v)
         return true
      },
   },
) as Readonly<Config>
