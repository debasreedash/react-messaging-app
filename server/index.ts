import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ws from 'ws';
import { IncomingMessage } from 'http';
import { Duplex } from 'stream';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const wsServer = new ws.Server({port: 8080});
wsServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wsServer.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(data);
                console.log('data', String(data));
                // console.log('data', data);
            }
        });
    });
});
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

server.on('upgrade', (request: IncomingMessage, socket: Duplex, head: Buffer) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
