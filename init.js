import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅ Server Listening on : http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
