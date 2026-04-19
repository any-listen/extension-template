declare global {
  interface IPCIsolateObject {
    hello: (name: string) => Promise<string>
  }
  interface IPCEXtensionRequestOptions {
    url: string
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH'
    query?: Record<string, string | number | null | undefined | boolean>
    headers?: Record<string, string>
    timeout?: number
    maxRedirect?: number
    json?: Record<string, unknown>
    form?: Record<string, string | number | null | undefined | boolean>
    binary?: Uint8Array
    text?: string
    formdata?: Record<string, string | Uint8Array>
    xml?: string
    needRaw?: boolean
  }
  interface IPCExtensionObject {
    request: (options: IPCEXtensionRequestOptions) => Promise<{
      statusCode?: number
      // statusMessage?: string
      headers: Record<string, string | string[] | undefined>
      body: unknown
    }>
    log: (...args: unknown[]) => Promise<void>
    error: (...args: unknown[]) => Promise<void>
  }
}

export {}
