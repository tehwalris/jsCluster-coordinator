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
    var client = this._socketOwners[socket.id];
    if(client)
      return this.removeByUUID(client.uuid);
  }

  getSocketOwner (socket) {
    return this._socketOwners[socket.id];
  }
}

module.exports = ClientList;
