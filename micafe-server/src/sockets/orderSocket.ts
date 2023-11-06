import { Server as SocketIOServer, Socket } from 'socket.io';
import { io } from './index';

const initialize = (): void => {
  io.on('connection', (socket: Socket) => {
    console.log('Socket connected:', socket.id);
  });
}

export default { initialize };
