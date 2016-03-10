"use strict";
let exec = require('child_process').exec;
let config = require('../config.js');
let Navigation = require('./navigation/Navigation.js');

class Interface {

  constructor() {
    this.navigation = new Navigation(document.querySelector('.nav'));
    this.bindEvents();
  }

  buildMain(machine) {
    this.nameEl = document.querySelector('.bar .name');
    this.diskUsageEl = document.querySelector('.bar .disk-usage');
    this.nameEl.textContent = machine.name;
    const diskUsage = "df -h / | grep -v Filesystem | awk '{ print $3,$2,$5 }'";
    let ls = exec('ssh ' + machine.user + '@' + machine.host + ' ' + diskUsage, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let parts = data.split(' ');
      this.diskUsageEl.innerHTML = 'Disk Usage: ' + parts[0] + ' / ' + parts[1] + ' - ' + parts[2];
    });
  }

  bindEvents() {
    this.navigation.onSelect = (machine) => {
      this.buildMain(machine);
    };
  }
}

module.exports = Interface;
