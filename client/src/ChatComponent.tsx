import React, {useEffect, useState} from 'react';

export const ChatComponent = (props: any) => {

    const URL = 'ws://127.0.0.1:8080';
    const [ws, setWs] = useState(new WebSocket(URL));
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);

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

        ws.onmessage = (evt: { data: string; }) => {
            // listen to data sent from the websocket server
            console.log('hello maded it here');
            const message = JSON.parse(evt.data);
            setMessages([...messages]);
            console.log(messages)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            setWs(new WebSocket(URL));
        }
    }, [message, messages]);

    return <>
        <input
            type="text"
            placeholder={'Type a message ...'}
            value={message}
            onChange={handleChange}
        />
        <button onClick={sendMessage}>Send</button>

    </>;
}
