import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { attachSocket } from './realtime/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

attachSocket(server);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`NovaCart API running on port ${PORT}`);
  });
});
