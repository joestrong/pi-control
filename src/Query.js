"use strict";
let exec = require('child_process').exec;
let ping = require('ping');

class Query {

  constructor() {
    if (new.target === Query) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  ping(callback) {
    ping.promise.probe(this.machine.host)
      .then(function (res) {
          callback(null, res);
      });
    }
}

module.exports = Query;
