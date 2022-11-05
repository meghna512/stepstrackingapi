const app = require('express')();
const bodyParser = require('body-parser');
const queryString = require('query-string');
const session = require('express-session');
const http = require('http')
require('dotenv').config();
const db = require('./db');
const {router} = require('./routes/index');
const WebSocket = require('ws');
const { updateHandler, insertHandler} = require('./controller/steps.js');
const map = require('./helper')

db.connectDB();
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
  });
app.use(sessionParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.query = queryString.parse(req._parsedUrl.query, { parseNumbers: true, parseBooleans: true });
    return next();
});
app.use('/',router);

const wss = new WebSocket.Server({ port: 8080 });

const server = http.createServer(app);
server.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');
  
    sessionParser(request, {}, () => {
      if (!request.session.userId) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      console.log('Session is parsed!');
  
      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
      });
    });
  });
wss.on('connection', async (ws, request) => {
    const userId = request.session.userId;
    map.set(userId, ws);
    ws.on('message',async (msg) => {      
        const parsedMsg = JSON.parse(msg);
        updateHandler(parsedMsg, userId);
        ws.send('success');
    })
    ws.on('close',async () => {
        insertHandler(userId);
        map.delete(userId);
        ws.send('success');
    })
})

app.listen(process.env.PORT, () => {
    console.log("server is up at port", process.env.PORT);
});
