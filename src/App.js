import * as Colyseus from "colyseus.js";
import { useState, useEffect } from "react";

import MessageWindow from "./components/MessageWindow";

function App() {
  const [room, setRoom] = useState(undefined);

  console.log(room);

  useEffect(() => {
    const client = new Colyseus.Client("ws://localhost:2567/");

    // Join a room or create on if it hasn't yet been created
    const joinOrCreateRoom = async () => {
      const room = await client.joinOrCreate("my_room");

      setRoom(room);
    };
    joinOrCreateRoom();
  }, []);

  return (
    <div className="App">
      <MessageWindow room={room} />
    </div>
  );
}

export default App;
