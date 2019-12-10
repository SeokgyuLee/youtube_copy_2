import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅ Server Listening on : http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
