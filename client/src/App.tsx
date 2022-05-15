import React, {useState} from 'react';
import './App.css';
import {ChatComponent} from "./ChatComponent";

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
        <div className="App">
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
        </div>
      );
}

export default App;
