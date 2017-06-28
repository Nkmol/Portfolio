'use strict';

/**
 * Module dependencies.
 */
const config = require('./config');
const express = require('express');
const chalk = require('chalk');
const path = require('path');

module.exports.start = () => {
    const app = express();

    // Point static path to dist
    app.use(express.static(path.join(__dirname, '../app/dist')));

    // Catch all other routes and return the index file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

    // Start the app by listening on <port> at <host>
    const port = process.env.PORT || config.port;
    app.listen(port, config.host)
        .on('listening', onListening)
        .on('error', onError);
};

const onListening = () => {
    // Create server URL
    let server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
    // Logging initialization
    console.log('--');
    console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
    console.log(chalk.green('Server:          ' + server));
    console.log('--');
};

const onError = () => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
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
            throw e;
    }
};
