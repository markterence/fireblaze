import express from 'express'

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
  if (username === 'demo' && password === 'demo') {
    req.session.authUser = { username: 'demo', admin: true }
    return res.json({ username: 'demo' })
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
    return res.status(401)
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
router.post('/fireblaze-start', (req, res) => {
  if (!req.session.authUser) {
    return res.status(401)
  }
  // volume should be a path
  // selectedFiles are array of file and dir to be included on the zip
  console.log(`start blazing`, req.body)
  // eslint-disable-next-line no-unused-vars
  const { volume, selectedFiles } = req.body

  const ARTIFACTS_PATH = path.join(process.env.artifacts_path, 'artifacts')

  const basename = path.basename(volume)
  const artifactFilename = Date.now().toString()
  const savePath = `${ARTIFACTS_PATH}/${basename}_${artifactFilename}.zip`
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
      archive.directory(p + '/', false)
    }
    archive.finalize()
  }

  try {
    // await zip(selectedFiles, savePath)
    // const fileStat = fs.statSync(savePath)
    const fileStat = fs.statSync(
      '/home/coffeekitkat/projects/production/sync-up/.fireblaze-appdata/config.json'
    )
    return res.json(200).json({
      stats: fileStat
    })
  } catch (err) {
    return res.status(500).json({ message: 'Zip failed' })
  }
})
export default {
  path: '/api',
  handler: router
}
