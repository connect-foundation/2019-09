import io from 'socket.io-client';

class ClientManager {
  constructor() {
    this.socket = io();
  }
}

export default ClientManager;
