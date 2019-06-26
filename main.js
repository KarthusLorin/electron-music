const {app, BrowserWindow, ipcMain} = require('electron')
// import {app, BrowserWindow} from 'electron'

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 允许使用 node
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  ipcMain.on('message', (event, arg) => {
    event.sender.send('reply', 'hello from main')
  })
})
