import React, {useEffect, useState} from 'react';
import {
    StyledButton,
    StyledChatMessageContainer,
    StyledContainer,
    StyledInput,
    StyledInputContainer, StyledMessage
} from "./ChatComponent.styles";

const URL = 'ws://127.0.0.1:8080';
const initWebSocket = new WebSocket(URL);

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
            // logging the connection
            console.log('Websocket connected')
        }

        ws.onclose = () => {
            console.log('disconnected')
            setWs(new WebSocket(URL));
        }
    }, [ws, setWs]);

    useEffect(() => {
        ws.onmessage = (evt) => {
            const { message, userName } = JSON.parse(evt.data);
            const incomingMessage = `${userName}: ${message}`;
            setMessages([...messages, incomingMessage]);
            console.log('my messages', messages)
        }
    }, [ws, setMessages, messages]);
    const displayMessages = messages.filter((m) => /\S/g.test(m)).reverse();

    return <StyledContainer>
        <StyledChatMessageContainer>
            {displayMessages.map((message, i) => <StyledMessage key={i}>{message}</StyledMessage>)}
        </StyledChatMessageContainer>
        <StyledInputContainer>
            <StyledInput
                type="text"
                placeholder={'Type a message ...'}
                value={message}
                onChange={handleChange}
            />
            <StyledButton onClick={sendMessage}>Send</StyledButton>
        </StyledInputContainer>
    </StyledContainer>;
}
