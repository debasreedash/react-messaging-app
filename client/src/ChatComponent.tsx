import React, {useEffect, useState} from 'react';

const URL = 'ws://127.0.0.1:8080';
const initWebSocket = new WebSocket(URL);

interface MessageEvent {
    userName: string;
    message: string;
}

export const ChatComponent = (props: any) => {

    const { user } = props;
    const [ws, setWs] = useState(initWebSocket);
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""]);

    const sendMessage=()=>{
        try {
            ws.send(JSON.stringify({ userName: user.userName, message: message })) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    }

    const handleChange: any = (e: any) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            setWs(new WebSocket(URL));
        }
    }, [ws, setWs]);

    useEffect(() => {
        ws.onmessage = (evt) => {
            // listen to data sent from the websocket server
            const { message, userName } = JSON.parse(evt.data);
            const incomingMessage = `${userName}: ${message}`;
            setMessages([incomingMessage, ...messages]);
            console.log('my messages', messages)
        }
    }, [ws, setMessages, messages]);

    return <>
        <div>{user.userName} is in the ChatRoom</div>
        <input
            type="text"
            placeholder={'Type a message ...'}
            value={message}
            onChange={handleChange}
        />
        <button onClick={sendMessage}>Send</button>
        {messages.map((message, i) => <div key={i}>{message}</div>)}
    </>;
}
