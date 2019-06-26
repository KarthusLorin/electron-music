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
  mainWindow.loadFile('./renderer/index.html')
  ipcMain.on('add-music-window', () => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        // 允许使用 node
        nodeIntegration: true
      },
      parent: mainWindow
    })
    addWindow.loadFile('./renderer/add.html')
  })
})
