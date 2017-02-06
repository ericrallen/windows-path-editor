// shelljs will allow us to execute Windows cmd commands
require('shelljs/global');

const electron = require('electron');
const Hapi = require('hapi');
const Path = require('path');
const open = require('open');
const inert = require('inert');
const joi = require('joi');
const uuid = require('uuid-lib');

const {
  app,
  BrowserWindow,
  dialog,
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
        const paths = {};

        // use a Set to filter out duplicates so we don't end up polluting the $PATH
        // run Array.prototype.filter() to remove any empty items (usually caused by the split character appearing at the end of the string)
        // iterate through items
        [...new Set(env.Path.split(';').filter(item => !!item))].forEach((item) => {
          // generate a UUID for each item
          const ID = uuid.create();

          // store path with UUID as key
          paths[ID.value] = Path.normalize(item);
        });

        // return path JSON
        reply({ paths });
      },
    });

    // update $PATH
    server.route({
      method: 'POST',
      path: '/path',
      handler({ payload: { paths } }, reply) {
        const pathArray = [];

        const pathObject = JSON.parse(paths);

        Object.keys(pathObject).forEach(key => pathArray.push(Path.normalize(pathObject[key])));

        // we use setx to make the $PATH modification after combining the pathArray into a single $PATH string
        // we'll add an extra ";" at the end to deal with a final path that ends in a special character
        exec(`setx Path "${pathArray.join(';')};"`, { async: true }, (status) => {
          if (status === 0) {
            reply({ ok: 1 });
          } else {
            reply({ ok: 0 });
          }
        });
      },
      config: {
        validate: {
          params: {
            paths: joi.object(),
          },
        },
      },
    });

    // get new UUID for adding item to $PATH
    server.route({
      method: 'GET',
      path: '/new',
      handler(request, reply) {
        // genereate new UUID
        const ID = uuid.create();

        reply({ ID });
      },
    });

    // allow the app to call a reboot
    // we need to reboot after updating the $PATH or it won't be available
    server.route({
      method: 'GET',
      path: '/reboot',
      handler(response, reply) {
        dialog.showMessageBox(
          {
            type: 'warning',
            buttons: ['Cancel', 'Restart'],
            defaultId: 0,
            cancelId: 0,
            title: 'Reboot Warning',
            message: 'This will restart your computer so that $PATH changes can take effect. Save any work in other open applications before doing this.\n\n Would you like to continue?',
            noLink: true,
          },
          (choice) => {
            if (choice === 1) {
              exec('shutdown -r -t 30', { async: true });
            }

            reply({ ok: choice });
          })
        ;
      },
    });

    server.route({
      method: 'GET',
      path: '/quit',
      handler(request, reply) {
        dialog.showMessageBox(
          {
            type: 'warning',
            buttons: ['Cancel', 'OK'],
            defaultId: 0,
            cancelId: 0,
            title: 'Reboot Warning',
            message: 'Any $PATH changes will not take effect until you restart your computer.',
          },
          (choice) => {
            if (choice === 1) {
              mainWindow.close();
            }

            reply({ ok: choice });
          })
        ;
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
