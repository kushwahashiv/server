require('babel-register');

const debug = require('debug')('make-sight:server');
const http = require('http');
const app = require('./app');
const config = require('./config');
const models = require('./models');

let server;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

const createServer = () => {
    const port = normalizePort(process.env.PORT || '8080');
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    console.log('Node server is running on port ' + port);

    server.on('error', onError);
    server.on('listening', onListening);
};

const authenticateAndStart = () => {
    const source = models.source;
    source.authenticate().then(() => {
        console.info('Connected to DB, Starting App...');
        source.sync(config.sources.database.options.sync).then(() => {
            try {
                createServer();
            } catch (ex) {
                console.error(`Error while starting server: ${ex}`);
                throw ex;
            }
        });
    }).catch((error) => {
        console.error(error);
        console.error('Not Connected trying again...');
        setTimeout(authenticateAndStart, 2000);
    });
};

authenticateAndStart();
