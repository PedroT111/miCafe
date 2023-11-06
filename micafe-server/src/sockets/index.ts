import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import orderSocket from './orderSocket';

let io: SocketIOServer;
function initializeSocket(server: Server): SocketIOServer {
   io = new SocketIOServer(server, {
    cors: {
      origin: 'http://localhost:4200', 
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  orderSocket.initialize();

  return io;
}

export {io, initializeSocket};
