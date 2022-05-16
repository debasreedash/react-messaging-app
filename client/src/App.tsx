import React, {useState} from 'react';
import './App.css';
import {ChatComponent} from "./ChatComponent";
import {AppContainer} from "./App.styles";

interface User {
    userName: string;
}

function App() {

      const [user, setUser] = useState<User>();
      const [userName, setUserName] = useState("");

      const handleUser = (e: any) => {
          setUser({userName: userName})
      }

      return (
        <AppContainer>
            { !user &&
                <form onSubmit={handleUser}>
                    <input
                        type="text"
                        placeholder={'Enter your name...'}
                        value={userName}
                        onInput={(e: any) => setUserName(e.target.value)}
                    />
                    <button type="submit">Enter</button>
                </form>
            }
            {user && <ChatComponent user={user} />}
        </AppContainer>
      );
}

export default App;
