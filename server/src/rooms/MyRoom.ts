import { Room, Client } from "colyseus";
import { MyRoomState, Message } from "./schema/MyRoomState";
import { ArraySchema } from "@colyseus/schema";

export class MyRoom extends Room<MyRoomState> {
  onCreate(options: any) {
    this.setState(new MyRoomState());

    /* NOTE: When a message event is received it adds the new message to the
    state, this will trigger a change on the client side which will add the client id
    and message to the array of messages */
    this.onMessage("message", (client, message) => {
      const newMessage = new Message({
        client: client.sessionId,
        message: message,
      });
      this.state.messages.push(newMessage);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
