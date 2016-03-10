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
        let icon = document.createElement('i');
        let nameEl = document.createElement('span');
        icon.className = 'fa fa-server';
        nameEl.textContent = machine.name;
        el.className = "item";
        el.setAttribute('data-id', i);
        el.appendChild(icon);
        el.appendChild(nameEl)
        this.shadowRoot.appendChild(el);
      }
    });
  }

  bindEvents() {
    this.shadowRoot.addEventListener('click', (e) => {
      let currentTarget = (e.target.classList.contains('item')) ? e.target : e.target.parentElement;
      currentTarget.className += ' active';
      this.onSelect(config.machines[currentTarget.getAttribute('data-id')]);
    });
  }
}

module.exports = Navigation;
