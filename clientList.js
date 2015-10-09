class ClientList {
  constructor () {
    this._clients = {};
    this._socketOwners = {};
  }

  get () {
    return this._clients;
  }

  add (client) {
    this._clients[client.uuid] = client;
    this._socketOwners[client.socket.id] = client;
  }

  removeByUUID (uuid) {
    var client = this._clients[uuid];
    delete this._clients[uuid];
    delete this._socketOwners[client.socket.id];
    return client;
  }

  removeBySocket (socket) {
    return this.removeByUUID(this._socketOwners[socket.id].uuid);
  }
}

module.exports = ClientList;
