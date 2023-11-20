const { contextBridge, ipcRenderer } = require('electron')

// 指定暴露给渲染进程的内容
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  staticValue: 'I am static value'
})

contextBridge.exposeInMainWorld('ipc', {
  sayHello: () => ipcRenderer.invoke('sayHello'),
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
  }
})