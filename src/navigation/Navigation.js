"use strict";
let config = require('../../config.js');
let fs = require('fs');
let Machine = require('../Machine.js');

class Navigation {

  constructor(el) {
    this.el = el;
    this.shadowRoot = el.createShadowRoot();
    this.onSelect = () => {};
    this.buildNav();
    this.bindEvents();
    this.checkStatus();
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
        let statusIcon = document.createElement('i');
        statusIcon.className = "status";
        icon.className = 'server';
        nameEl.textContent = machine.name;
        nameEl.className = 'name';
        el.className = "item";
        el.setAttribute('data-id', i);
        el.appendChild(icon);
        el.appendChild(nameEl);
        el.appendChild(statusIcon);
        this.shadowRoot.appendChild(el);
      }
    });
  }

  bindEvents() {
    this.shadowRoot.addEventListener('click', (e) => {
      let currentTarget = (e.target.classList.contains('item')) ? e.target : e.target.parentElement;
      let items = this.shadowRoot.querySelectorAll('.item');
      Array.prototype.forEach.call(items, (item) => {
        item.classList.remove('active');
      });
      currentTarget.classList.add('active');
      this.onSelect(config.machines[currentTarget.getAttribute('data-id')]);
    });
  }

  checkStatus() {
      for (let i = 0; i < config.machines.length; i++) {
        let machine = new Machine(config.machines[i]);
        machine.ping((err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          let itemStatus = this.shadowRoot.querySelector('.item[data-id="' + i + '"] i.status');
          if (data.alive === true) {
            itemStatus.classList.add('on');
          } else {
            itemStatus.classList.remove('on');
          }
        });
      }
  }
}

module.exports = Navigation;
