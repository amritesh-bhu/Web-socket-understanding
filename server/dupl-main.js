import { WebSocketServer } from "ws";

const wss = WebSocketServer({ port: 8080 })

const wsConns = {}

wss.on('connection', (ws) => {
    wss.on('error', console.error)

    wss.on('message', (data) => {
        const pmsg = JSON.parse(data)
        switch (pmsg.type) {
            case 'connect':
                wsConns[pmsg.sender] = ws
                ws.send('registered to the server')
                break

            case 'chat':
                const { sender, to, msg } = pmsg
                if (to in wsConns) {
                    wsConns[to].send(JSON.stringify({sender,msg}))
                }
                break
        }

    ws.send('connected to server')
    })
})