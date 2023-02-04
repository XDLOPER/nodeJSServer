//server import
import WebSocket,{WebSocketServer} from 'ws';
import * as http from 'http';

//system import
import * as sys from 'systeminformation';
import * as fs from "fs";
import * as math from "mathjs"
import { randomUUID } from 'crypto';


// DEFINE instance
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Jim Smith' },
];

// create HTTPS protocol server
const HTTPserver = http.createServer((req, res) => {
  res.statusCode = 200;
  res.write('hello');
  res.end();
});
HTTPserver.listen(3000,()=>{
  console.log(`\x1b[44m starting https server \x1b[0m`);
});

// create Websoket protocol server
const webSoketServer = new WebSocketServer({host:HOSTNAME, port: 4000 });
webSoketServer.on('connection',(ws)=>{
  ws.on('message',(data)=>{
    console.log('received ' + data);
  });

  setInterval(async ()=>{
    ws.send('hello: ' + math.floor(math.random(2000)));
    //ws.send(JSON.stringify(await sys.cpu()));
    //ws.send('server-' + randomUUID())
  },10)
});

// webSoketServer.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });
