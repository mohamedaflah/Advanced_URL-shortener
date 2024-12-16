import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGOOSE_URI!, { dbName: process.env.DB_NAME! })
  .then(() => console.log(`Mongoose Connected`))
  .catch(() => console.log(`Mongoose Failed to connect`));
