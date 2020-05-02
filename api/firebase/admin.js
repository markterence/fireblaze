const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: 'vue-free-week.appspot.com'
  })
}
module.exports = {
  admin
}
