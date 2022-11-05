require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');

const server = http.createServer(app);
const websocket = require("ws");
const wss = new websocket.Server({server: server});

const db = require('./db');
const {router} = require('./routes/index');
const { updateHandler, insertHandler} = require('./controller/steps.js');

db.connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/',router);

// socket handlers
wss.on('connection', (ws, req) => {
    const { query: { userId } } = url.parse(req.url, true);
    
    ws.on('message', (msg) => {
        const parsedMsg = JSON.parse(msg);
        updateHandler(parsedMsg, userId);
        ws.send('success');
    });

    ws.on('close', () => {
        insertHandler(userId);
        ws.send('success');
    });
});

server.listen(process.env.PORT, () => {
    console.log("server is up at port", process.env.PORT);
});
