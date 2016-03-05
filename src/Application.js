"use strict";
const electron = require('electron');

class Application {

  constructor() {
    this.app = electron.app;
    this.view = 'file://' + __dirname + '/../view/index.html';
    this.bindEvents();
  }

  createWindow() {
    const BrowserWindow = electron.BrowserWindow;
    const Debug = true;

    this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
    this.mainWindow.loadURL(this.view);
    if (Debug) {
      this.mainWindow.webContents.openDevTools();
    }
    this.mainWindow.on('closed', () => {
     this.mainWindow = null;
    });
  }

  windowAllClosed() {
    if (process.platform !== 'darwin') {
      this.app.quit();
    }
  }

  activate() {
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }

  bindEvents() {
    this.app.on('ready', this.createWindow.bind(this));
    this.app.on('window-all-closed', this.windowAllClosed.bind(this));
    this.app.on('activate', this.activate.bind(this));
  }
}

module.exports = Application;
