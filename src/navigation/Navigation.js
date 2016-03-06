"use strict";
let config = require('../../config.js');
let fs = require('fs');

class Navigation {

  constructor(el) {
    this.el = el;
    this.shadowRoot = el.createShadowRoot();
    this.onSelect = () => {};
    this.buildNav();
    this.bindEvents();
  }

  buildNav() {
    fs.readFile(__dirname + '/view.html', (err, data) => {
      if (err)
        return;
      this.shadowRoot.innerHTML += data;

      for (let i = 0; i < config.machines.length; i++) {
        let machine = config.machines[i];
        let el = document.createElement('div');
        el.className = "item";
        el.setAttribute('data-id', i);
        el.textContent = machine.name;
        this.shadowRoot.appendChild(el);
      }
    });
  }

  bindEvents() {
    this.shadowRoot.addEventListener('click', (e) => {
      e.target.className += ' active';
      this.onSelect(config.machines[e.target.getAttribute('data-id')]);
    });
  }
}

module.exports = Navigation;
