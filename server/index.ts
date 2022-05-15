import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Websocket from 'ws';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

interface WebSocketExt extends Websocket {
    id: number;
    name: string;
}

interface MessageRequest extends Request {
    userName: string;
    message: string | null;
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req: Request<MessageRequest>, res: Response) => {
    res.send('Express + TypeScript Server');
});

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const wsServer = new Websocket.Server({ port: 8080 });

wsServer.on('connection', function connection(ws: WebSocketExt) {
    ws.id = Math.floor(1000 + Math.random() * 9000);
    ws.on('message', function incoming(data) {
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === Websocket.OPEN) {
                client.send(String(data));
            }
        })
    })
})
