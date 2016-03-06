"use strict";
let config = require('../../config.js');
let fs = require('fs');

class Navigation {

  constructor(el) {
    this.shadowRoot = el.createShadowRoot();
    this.buildNav();
  }

  buildNav() {
    let navEl = document.querySelector('.nav');
    for (let i = 0; i < config.machines.length; i++) {
      let machine = config.machines[i];
      let el = document.createElement('div');
      el.className = "item";
      el.textContent = machine.name;
      el.addEventListener('click', (e) => {
        this.buildMain(machine);
      });
      this.shadowRoot.appendChild(el);
    }
    fs.readFile(__dirname + '/view.html', (err, data) => {
      if (err)
        return;

      this.shadowRoot.innerHTML += data;
    })
  }
}

module.exports = Navigation;
