import { Injectable } from '@angular/core';

const config = {
  serverIp: "192.168.0.104",
  serverPort: 3001
};

@Injectable({
  providedIn: 'root'
})
export class RegisterStreamService {
  registerStreamSocket : WebSocket;

  constructor() {
    this.registerStreamSocket = new WebSocket(`ws://${config.serverIp}:${config.serverPort}/RegisterStream`);
  }

  registerStream(id) {
    this.registerStreamSocket.send(id);
  }
}
