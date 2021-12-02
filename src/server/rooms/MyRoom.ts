import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room {
  onCreate(options: any) {
    this.setState(new MyRoomState());

    // Receiving the message from the client
    // this.onMessage("keydown", (client, message) => {
    //   /* A broadcast is being sent to all clients except the client
    //   that sent the messae to the server*/
    //   this.broadcast("keydown", message, {
    //     except: client,
    //   });
    // });

    this.onMessage("message", (client, message) => {
      console.log(message);
      // this.broadcast("message", message, {
      //   except: client,
      // });
      this.broadcast("message", { message, client: client.id });
    });
  }

  onJoin(client: Client, options: any) {}

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}
}
