import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const wsConns = {}

// 'connection' when client connects/reconnects for first time
wss.on('connection', function connection(ws, req) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const pmsg = JSON.parse(data)
    switch (pmsg.type) {
      case 'connect': {
        wsConns[pmsg.sender] = ws
        ws.send("registered to server")
        break
      }
      case 'chat': {
        const {sender, to, msg} = pmsg
        console.log("[received]:", pmsg)
        if (to in wsConns) {
          wsConns[to].send(JSON.stringify({sender, msg}))
        }
        break
      }
    }
  });

  ws.send("connected to server")
});
