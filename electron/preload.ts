import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld("api", {
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: string | number) => ipcRenderer.invoke("store:set", key, value),
  clearFinished: () => ipcRenderer.invoke("store:finished:clear"),
  addFinished: (learnKey: string, item: any) =>
    ipcRenderer.invoke("store:finished:add", learnKey, item),
  removeFinished: (learnKey: string, item: any) =>
    ipcRenderer.invoke("store:finished:remove", learnKey, item),

  getModule: (learnKey: string) => ipcRenderer.invoke("store:module:get", learnKey),
});