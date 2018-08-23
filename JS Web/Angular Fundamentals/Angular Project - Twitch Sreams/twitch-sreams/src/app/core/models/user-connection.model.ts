const config = {
  serverIp: "192.168.0.104",
  serverPort: 3001
};

export class UserConnection {
  private serverSocket : WebSocket;
  readonly name : string;

  constructor(name : string, streamId : string, onMessage) {
    this.name = name;
    this.serverSocket = new WebSocket(this.getServerPath(`StreamChat/${streamId}`));
    this.serverSocket.onmessage = onMessage;
  }

  send(content) {
    this.serverSocket.send(JSON.stringify({
      sender: this.name,
      content
    }));
  }

  getServerPath(pathname) {
    return `${this.getServerAddress()}/${pathname}`;
  }

  getServerAddress() {
    return `ws://${config.serverIp}:${config.serverPort}`;
  }
}
