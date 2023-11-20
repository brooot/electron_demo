const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('sayHello', () => 'hei, i got ur message')
  createWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('message-from-renderer', (event, arg) => {
  console.log(arg);  // 当主进程回复时，打印消息
  event.reply('message-from-main', '我是主进程，收到消息，你好，渲染进程！');
});