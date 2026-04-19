import type { ExtensionConfig } from '@any-listen/extension-kit/config'

import pkg from './package.json' with { type: 'json' }

const config: ExtensionConfig = {
  id: '{name}',
  name: '{projectName}',
  description: '{description}',
  version: pkg.version,
  homepage: pkg.homepage,
  license: pkg.license,
  author: pkg.author,
  target_engine: '1.1.0',
  categories: [],
  tags: [],
  download_url_template: 'https://github.com/{githubName}/releases/download/v{version}',
  icon: './resources/icon.png',
  grant: ['internet', 'isolate_context'],
  buildConfig: {
    isIsolateMode: true,
  },
}

export default config
