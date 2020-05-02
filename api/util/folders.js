/* eslint-disable no-console */

const path = require('path')
const fs = require('fs-extra')
const hiddenPrefix = '.'
const isPlatformWindows = process.platform.indexOf('win') === 0
const winattr = require('@akryum/winattr')

function isDirectory(file) {
  file = file.replace(/\\/g, path.sep)
  try {
    return fs.statSync(file).isDirectory()
  } catch (e) {
    if (process.env.APP_DEBUG) {
      console.warn(e.message)
    }
  }
  return false
}

async function listDir(base, context) {
  let dir = base
  if (isPlatformWindows) {
    if (base.match(/^([A-Z]{1}:)$/)) {
      dir = path.join(base, '\\')
    }
  }
  const files = await fs.readdir(dir, 'utf8')
  return files
    .map((file) => {
      const folderPath = path.join(base, file)
      return {
        path: folderPath,
        name: file,
        isDir: isDirectory(folderPath),
        hidden: isHidden(folderPath)
      }
    })
    .filter((file) => !isDirectory(file.path))
}

async function list(base, context) {
  let dir = base
  if (isPlatformWindows) {
    if (base.match(/^([A-Z]{1}:)$/)) {
      dir = path.join(base, '\\')
    }
  }
  const files = await fs.readdir(dir, 'utf8')
  return files
    .map((file) => {
      const folderPath = path.join(base, file)
      return {
        path: folderPath,
        name: file,
        isDir: isDirectory(folderPath),
        hidden: isHidden(folderPath)
      }
    })
    .filter((file) => isDirectory(file.path))
}

function isHidden(file) {
  try {
    const prefixed = path.basename(file).charAt(0) === hiddenPrefix
    const result = {
      unix: prefixed,
      windows: false
    }

    if (isPlatformWindows) {
      const windowsFile = file.replace(/\\/g, '\\\\')
      result.windows = winattr.getSync(windowsFile).hidden
    }

    return (
      (!isPlatformWindows && result.unix) ||
      (isPlatformWindows && result.windows)
    )
  } catch (e) {
    if (process.env.APP_DEBUG) {
      console.log('file:', file)
      console.error(e)
    }
  }
}

module.exports = {
  isDirectory,
  list,
  listDir
}
