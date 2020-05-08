const admin = require('firebase-admin')

if (process.env.ENABLE_FIREBASE) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: process.env.STORAGE_BUCKET
    })
  }
}
module.exports = {
  admin
}
