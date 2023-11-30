import type { ExtensionContext, TextDocument } from 'vscode'
import { EventEmitter } from 'vscode'
import type { KolibryMarkdown } from '@kolibry/types'

export class Context {
   private _onDataUpdate = new EventEmitter<KolibryMarkdown | undefined>()
   private _data: KolibryMarkdown | undefined

   onDataUpdate = this._onDataUpdate.event

   ext: ExtensionContext = undefined!
   doc: TextDocument | undefined

   get data() {
      return this._data
   }

   set data(data: KolibryMarkdown | undefined) {
      this._data = data
      this._onDataUpdate.fire(data)
   }

   get subscriptions() {
      return this.ext.subscriptions
   }
}

export const ctx = new Context()
