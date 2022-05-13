import React, {useEffect, useState} from 'react';

export const ChatComponent = (props: any) => {

    const URL = 'ws://127.0.0.1:8000';
    const [ws, setWs] = useState(new WebSocket(URL));
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""]);

    const sendMessage=()=>{

        try {
            ws.send(message) //send data to the server
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
            const incomingMessage = evt.data;
            setMessages([incomingMessage, ...messages]);
            console.log('my messages', messages)
        }
    }, [ws, setMessages, messages]);

    return <>
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
