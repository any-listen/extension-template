import { createMessage2Call } from 'message2call'

import { createIsolateContext, constants } from '../shared/hostAPI'
import { exposeObject } from './exposeObject'

const createIsolate = async () => {
  const msg2call = createMessage2Call<IPCIsolateObject>({
    exposeObj: {
      ...exposeObject,
    },
    sendMessage(data) {
      void isolate.sendMessage(data)
    },
    isSendErrorStack: true,
    timeout: 0,
  })
  const isolate = await createIsolateContext((data) => {
    msg2call.message(data)
  })

  await isolate.runFile(`${constants.extensionDir}/resources/isolate-preload.js`)

  return {
    runScript: async (code: string) => isolate.run(code),
    destroy: async () => isolate.destroy(),
    remote: msg2call.remote,
  }
}

export const runScript = async (script: string) => {
  const isolate = await createIsolate()
  await isolate.remote.hello('Isolate ready')
  await isolate.runScript(script)
  await isolate.destroy()
}
