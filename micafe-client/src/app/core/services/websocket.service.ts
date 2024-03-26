/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;
  constructor() {
    
  }

  connect(){
    this.socket = io(environment.baseUrl);
  }

  joinRoom(roomName: string){
    this.socket.emit('joinRoom', { roomId: roomName });
  }
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      const handler = (data: any) => {
        subscriber.next(data);
      };

      this.socket.on(event, handler);

      return () => {
        this.socket.off(event, handler);
      };
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
