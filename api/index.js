import express from 'express'
import { admin as firebaseAdmin } from './firebase/admin'

// Create express router
const router = express.Router()
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  // eslint-disable-next-line no-console
  console.log(req.body)
  let accessKey = process.env.APP_ACCESS_KEY
  let secretKey = process.env.APP_SECRET_KEY

  if (process.env.FIREBLAZE_TEST_DEV) {
    accessKey = 'demo'
    secretKey = 'demo'
  }
  if (username === accessKey && password === secretKey) {
    req.session.authUser = { username: accessKey, admin: true }
    return res.json({ username: accessKey })
  }
  res.status(401).json({ message: 'Bad credentialss' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

const path = require('path')
router.post('/browse', async (req, res) => {
  console.log(req.session.authUser)
  if (!req.session.authUser) {
    return res.status(401).json({ message: 'Bad credentialss' })
  }
  const folder = req.body.folder
  const { listDir, list } = require('./util/folders')

  try {
    const folders = await list(folder)
    const files = await listDir(folder)
    const parentPath = path.resolve(folder, '..')
    const parent = {
      path: parentPath,
      isDir: true,
      name: '..'
    }
    const dir = [...folders, ...files]

    dir.unshift(parent)
    return res.json(dir)
  } catch (error) {
    console.error(error)
    return res.status(404).json({ message: 'Does not exists' })
  }
})

const fs = require('fs')
const { isDirectory } = require('./util/folders')
router.post('/fireblaze-start', async (req, res) => {
  if (!req.session.authUser) {
    return res.status(401).json({ message: 'Bad credentialss' })
  }
  // volume should be a path
  // selectedFiles are array of file and dir to be included on the zip
  console.log(`start blazing`, req.body)
  // eslint-disable-next-line no-unused-vars
  const { volume, selectedFiles } = req.body

  // The path should exist otherwise it will error
  const ARTIFACTS_PATH = path.join(process.env.ARTIFACTS_PATH, 'artifacts')

  let basename = path.basename(volume)
  const artifactFilename = Date.now().toString()
  // ensure no dot on start of name
  basename = basename.replace(/^\.*/, '')

  const savePath = path.join(
    `${ARTIFACTS_PATH}`,
    `${basename}_${artifactFilename}.zip`
  )
  console.log(`SavePath`, savePath)

  // eslint-disable-next-line no-unused-vars
  function zip(zipDirs, outDir) {
    const archiver = require('archiver')
    const output = fs.createWriteStream(outDir)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    })
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes')
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      )
    })
    output.on('end', function() {
      console.log('Data has been drained')
    })
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err
      }
    })
    archive.on('error', function(err) {
      throw err
    })
    archive.pipe(output)

    for (const p of zipDirs) {
      if (isDirectory(p)) {
        archive.directory(p, path.basename(p))
      } else {
        archive.file(p, {
          name: path.basename(p)
        })
      }
    }
    return archive.finalize()
  }

  // eslint-disable-next-line no-unused-vars
  function zip2(zipdirs, outDir) {
    const AdmZip = require('adm-zip')
    const zip = new AdmZip()

    zipdirs.forEach((p) => {
      if (isDirectory(p)) {
        zip.addLocalFolder(p, path.basename(p))
      } else {
        zip.addLocalFile(p)
      }
    })

    zip.writeZip(outDir)
  }

  try {
    if (process.env.ENABLE_ZIP) {
      await zip(selectedFiles, savePath)
      const fileStat = fs.statSync(savePath)
      console.log(`Saved to ${savePath}`)

      if (process.env.ENABLE_FIREBASE) {
        const bucket = firebaseAdmin.storage().bucket()
        await bucket.upload(savePath, {
          resumable: false,
          // Support for HTTP requests made with `Accept-Encoding: gzip`
          gzip: true,
          // By setting the option `destination`, you can change the name of the
          // object you are uploading to a bucket.
          metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000'
          }
        })

        console.log(`${savePath} uploaded to ${bucket.name}.`)
      }

      return res.status(200).json({
        stats: fileStat
      })
    }

    return res.status(200).json({
      // Sorry, I just need to mock the stats.size even on dev mode.
      stats: {
        size:
          'Test Mode: You are seeing this because it seems like `ZIP` and `FIREBASE` is disabled.'
      }
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed' })
  }
})
export default {
  path: '/api',
  handler: router
}
