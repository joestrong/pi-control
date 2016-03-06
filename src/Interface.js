"use strict";
let exec = require('child_process').exec;
let config = require('../config.js');

class Interface {

  constructor() {
    this.buildNav();
  }

  buildNav() {
    let navEl = document.querySelector('.nav');
    for (let i = 0; i < config.machines.length; i++) {
      let machine = config.machines[i];
      let el = document.createElement('div');
      el.className = "nav__item";
      el.textContent = machine.name;
      el.addEventListener('click', (e) => {
        this.buildMain(machine);
      });
      navEl.appendChild(el);
    }
  }

  buildMain(machine) {
    this.nameEl = document.querySelector('.bar .name');
    this.diskUsageEl = document.querySelector('.bar .disk-usage');
    const diskUsage = "df -h / | grep -v Filesystem | awk '{ print $3,$2,$5 }'";
    let ls = exec('ssh ' + machine.host + ' ' + diskUsage, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let parts = data.split(' ');
      this.nameEl.textContent = machine.name;
      this.diskUsageEl.innerHTML = 'Disk Usage: ' + parts[0] + ' / ' + parts[1] + ' - ' + parts[2];
    });
  }
}

new Interface();
