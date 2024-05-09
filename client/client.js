import WebSocket from 'ws';
import {createInterface} from 'node:readline'

const ws = new WebSocket('ws://localhost:8080');

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send(JSON.stringify({ sender, type: "connect" }))
});

ws.on('message', (msg) => {
  console.log("[received]:", msg.toString())
})

const sender = process.env.SENDER

for await (const line of createInterface({ input: process.stdin })) {
  console.log("here")
  const sp = line.split(" ")
  const to = sp[0]
  const msg = sp.slice(1).join(" ")
  ws.send(JSON.stringify({sender, type: 'chat', to, msg }))
}
