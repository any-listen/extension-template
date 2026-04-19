import { runScript } from './isolate'

const initScripts = async () => {
  await runScript('console.log("Hello from Isolate!");')
}

void initScripts()
