"use strict";
let Query = require('./Query.js');

class Machine extends Query {

  constructor(machine) {
    super();
    this.machine = machine;
  }
}

module.exports = Machine;
