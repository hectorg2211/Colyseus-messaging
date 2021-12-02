import { Schema, Context, type, ArraySchema } from "@colyseus/schema";

export class Message extends Schema {
  @type("string") client: string;
  @type("string") message: string;
}

export class MyRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
  @type(["string"]) animals = new ArraySchema<string>();
  @type([Message]) messages = new ArraySchema<Message>();
}
