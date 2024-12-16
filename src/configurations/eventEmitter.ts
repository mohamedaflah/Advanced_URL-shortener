import { EventEmitter } from "events";
import { IUser } from "../models/user.model";

interface CustomeEvents {
  "create-user-req": {
    googleId: string;
    email: string;
    username: string;
    profileUrl: string;
  };
  "create-user-res": IUser;
}

class CustomeEventEmiitter extends EventEmitter {
  emit<T extends keyof CustomeEvents>(
    event: T,
    ...args: [CustomeEvents[T]]
  ): boolean {
    return super.emit(event, ...args);
  }
  on<T extends keyof CustomeEvents>(
    event: T,
    listener: (arg: CustomeEvents[T]) => void
  ): this {
    return super.on(event, listener);
  }
}

export const eventsEmitter = new CustomeEventEmiitter();
