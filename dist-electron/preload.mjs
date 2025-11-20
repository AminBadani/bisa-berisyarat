"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("api", {
  get: (key) => electron.ipcRenderer.invoke("store:get", key),
  set: (key, value) => electron.ipcRenderer.invoke("store:set", key, value),
  clearFinished: () => electron.ipcRenderer.invoke("store:finished:clear"),
  addFinished: (learnKey, item) => electron.ipcRenderer.invoke("store:finished:add", learnKey, item),
  removeFinished: (learnKey, item) => electron.ipcRenderer.invoke("store:finished:remove", learnKey, item),
  getModule: (learnKey) => electron.ipcRenderer.invoke("store:module:get", learnKey)
});
