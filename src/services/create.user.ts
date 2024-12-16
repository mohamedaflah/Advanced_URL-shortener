import { eventsEmitter } from "../configurations/eventEmitter";
import User from "../models/user.model";

eventsEmitter.on("create-user-req", async (user) => {
  console.log("Received create user request:", user);
  const newUser = new User(user);
  newUser.save();
  eventsEmitter.emit("create-user-res", newUser);
});
