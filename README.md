# fireblaze

*But don't play with me, cause you're playing with fire.*

> My ~~top-notch~~ Nuxt.js project

I made a simple wtf tool to list files and folder on the server then zip and upload them on firebase storage for backup purpose by using the Firebase Admin SDK.


I recommend running it on docker so that the host filesystem will never get exposed/listed, mount only a specific host filesystem as Read-only on docker. See [Usage with Docker](#usage-with-docker)

## Screenshots and Demo Video

<a href="https://coffeekitkat.keybase.pub/static/fireblaze-demo-video.mp4" target="_blank"><img src="./docs/assets/Screenshot_from_fireblaze-demo.png" 
alt="demo-video"/></a>

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

Create a `.env` file. Example `.env` file:

```ini
BASE_URL=http://localhost:3000

# This is your starting admin login credential
APP_ACCESS_KEY=fireblaze
APP_SECRET_KEY=fireblaze123

# enable this to login using `demo` as username and `demo` as password
FIREBLAZE_TEST_DEV=1

# Should we print some console.logs ?
APP_DEBUG=true

ENABLE_ZIP=
ENABLE_FIREBASE=

# This is where we save the zip files
# Please manually create a subfolder name `artifact`
# Absolute path
ARTIFACTS_PATH=

## Firebase Admin
## path to your firebase-app-admin-sdk.json
GOOGLE_APPLICATION_CREDENTIALS=
```

## Usage with Docker

NOTE: Everything inside the container can be browsed (list only files and directories), zipped and uploaded.

```yml
version: '3.4'

services:
  app:
    image: node:10.16.3-slim
    working_dir: /nuxt-app
    volumes:
      - node_modules:/nuxt-app/node_modules
      - ./app:/nuxt-app
      - ./volumes:/fireblaze/artifacts
      - /some/path/on/server/:/blaze/storage:ro
    command: "yarn start"
    expose:
     - 3000
    ports:
     - "3000:3000"
volumes:
  node_modules:
```

```
fireblaze
├── app
│   ├── keys
│   ├── node_modules
│   ├── nuxt.config.js
│   ├── package.json
│   ├── server
│   ├── static
│   └── yarn.lock
├── docker-compose.prod.yml
```

`/some/path/on/server/` is the path on your host that you want to be read by the file browser. Files and directory exposed here can 
be zipped and can be uploaded to your firebase storage.

#### Firebase Admin Keys

Place your firebase admin.json keys inside the `app/keys` folder.
Your own firebase admin.json keys will only upload to your own firebase admin account.