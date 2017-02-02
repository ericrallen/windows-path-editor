// shelljs will allow us to execute Windows cmd commands
require('shelljs/global');

const electron = require('electron');
const Hapi = require('hapi');
const Path = require('path');
const open = require('open');
const inert = require('inert');
const joi = require('joi');

const {
  app,
  BrowserWindow,
} = electron;

// making this global allows us to work with it in other parts of the Electron app
var mainWindow = null;

// default port to 0 to get a random one
// we'll reassign this for our Electron Window after the server starts
let port = 0;

// start up server
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, ''),
      },
    },
  },
});

server.connection({ port });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', () => {
  server.register(inert, (err) => {
    if (err) {
      throw err;
    }

    // default app route
    server.route({
      method: 'GET',
      path: '/',
      handler(request, reply) {
        reply.file('index.html');
      },
    });

    // get $PATH
    server.route({
      method: 'GET',
      path: '/path',
      handler(request, reply) {
        const paths = env.Path.split(';');

        reply({ paths });
      },
    });

    // updated $PATH
    server.route({
      method: 'POST',
      path: '/path',
      handler(request, reply) {
        const paths = request.payload.paths;

        // we use setx to make the $PATH modification
        exec(`setx Path "${paths.join(';')}"`, (status) => {
          if (status === 0) {
            reply(true);
          } else {
            reply(false);
          }
        });
      },
      config: {
        validate: {
          params: {
            paths: joi.array(),
          },
        },
      },
    });

    // allow the app to call a reboot
    // we need to reboot after updating the $PATH or it won't be available
    server.route({
      method: 'GET',
      path: '/reboot',
      handler(request, reply) {
        exec('shutdown -r -t 30');
      },
    });

    server.route({
      method: 'GET',
      path: '/assets/{filename}',
      handler(request, reply) {
        reply.file(`assets/${request.params.filename}`);
      },
    });

    server.start((e) => {
      if (e) {
        throw e;
      }

      // reassign port
      port = server.info.port;

      console.log(`Hapi server running at: ${server.info.uri}`);
    });
  });
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 768,
    resizable: false,
    fullscreen: false,
  });

  mainWindow.loadURL(`http://localhost:${port}/`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('new-window', (event, url) => {
    event.preventDefault();

    open(url);
  });
});

app.on('will-quit', () => {
  server.stop({ timeout: 60 * 1000 }, () => {
    console.log('Server stopped');
  });
});
