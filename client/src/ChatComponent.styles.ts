import styled from 'styled-components';

const StyledContainer = styled.div`
    height: 500px;
    width: 300px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
`

const StyledInputContainer = styled.div`
    display:flex;
    flex-direction: row;
    margin-top: 470px;
    border-radius:5px;
    height:30px;
    position: absolute;
    width:100%;
`

const StyledInput = styled.input`
    width:80%;
`

const StyledButton = styled.button`
    width:20%
`

const StyledChatMessageContainer = styled.div`
    height:470px;
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
`

const StyledMessage = styled.div`
    width: 100%;
    margin-bottom: 5px;
`

export {
    StyledContainer,
    StyledButton,
    StyledInput,
    StyledChatMessageContainer,
    StyledMessage,
    StyledInputContainer,
}
