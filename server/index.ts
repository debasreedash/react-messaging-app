import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Websocket from 'ws';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const wsServer = new Websocket.Server({ server });

wsServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === Websocket.OPEN) {
                client.send(String(data));
            }
        })
    })
})
