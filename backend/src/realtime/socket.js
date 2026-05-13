import { Server } from 'socket.io';

export function attachSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.emit('nova:ready', { message: 'NovaCart realtime channel connected' });
  });

  return io;
}
