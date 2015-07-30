/******************************************************************************
 *                            Edison GPIO Example
 ******************************************************************************
 * This example app uses a RESTful API and WebSockets to communicate the state
 * of the hardware to the user. It was built to be a demo for the Edison
 * Ethernet board (https://github.com/LGSInnovations/Edison-Ethernet).
 *
 * This app structure modeled afer https://github.com/plusk01/mean-skeleton.
 *
**/

// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------
var express     = require('express');               // Easy API routing
var app         = express();                        // Create the app
var bodyParser  = require('body-parser');           // Parses POST JSON automagically
var socketio    = require('socket.io');
var morgan      = require('morgan');                // Logging for dev
var path        = require('path');                  // filesystem goodies

var api         = require('./app/api');             // API routes
var hwHandler   = require('./app/hwHandler');		// Hardware stuff
var socket      = require('./app/socket');          // socket

var port        = process.env.PORT || 8080;         // If no env var set, DEV mode

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

global.__base = __dirname + '/';                    // so child modules can access root

app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));                             // For request logging

hwHandler.initStates();

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'public')));        // for the HTML5/JS app

app.use('/api', api);                                           // all API requests will be http://host.com/api/...

// ----------------------------------------------------------------------------
// Listen (start app: `node app.js`)
// ----------------------------------------------------------------------------

var io = socketio.listen(app.listen(port));
console.log('Server started on port ' + port);

// ----------------------------------------------------------------------------
// Socket.io Event Handler
// ----------------------------------------------------------------------------

socket.handle(io);