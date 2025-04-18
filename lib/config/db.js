import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://0202sent:galo123atlas@cluster0.daddpdz.mongodb.net/blog-app"
  );
  console.log("DB connected");
};
