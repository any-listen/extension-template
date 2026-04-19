export const exposeObject: IPCIsolateObject = {
  async hello(name) {
    return `Hello, ${name}`
  },
}
