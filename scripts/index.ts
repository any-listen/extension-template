import fs from 'node:fs'
import path from 'node:path'

import { c } from 'tar'

const packFile = async ({
  gzip,
  cwd,
  files,
  dist,
  filter,
}: {
  gzip: boolean
  cwd: string
  files: string[]
  dist: string
  filter?: string[]
}) => {
  return new Promise<void>((resolve, reject) => {
    c(
      {
        gzip,
        cwd,
        filter: filter
          ? (p) => {
              const paths = p.split(path.sep)
              return !paths.some((p) => filter.includes(p))
            }
          : undefined,
      },
      files
    )
      .pipe(fs.createWriteStream(dist))
      .on('finish', () => {
        resolve()
      })
      .on('error', reject)
  })
}

const main = async () => {
  const distDir = path.join(import.meta.dirname, '../dist')
  await fs.promises.rm(distDir, { recursive: true, force: true })
  await fs.promises.mkdir(distDir, { recursive: true })
  const templates = await fs.promises.readdir(path.join(import.meta.dirname, '../packages'))
  for (const name of templates) {
    const cwd = path.join(import.meta.dirname, `../packages/${name}`)
    const ignoreFiles = await fs.promises
      .readFile(path.join(cwd, '.gitignore'), 'utf-8')
      .then((res) => res.split('\n').filter((s) => s && !s.startsWith('#')))
    await packFile({
      gzip: true,
      cwd,
      files: await fs.promises.readdir(cwd),
      dist: path.join(distDir, `${name}.tar.gz`),
      filter: ignoreFiles,
    })
  }
}

main()
