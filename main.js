const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const DataStore = require('./renderer/MusicDataStore')

const myStore = new DataStore({'name': 'Music Data'})

class AppWindow extends BrowserWindow {
  constructor (config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        // 允许使用 node
        nodeIntegration: true
      }
    }

    const finalConfig = Object.assign(basicConfig, config)
    // 触发父类构造函数
    super(finalConfig)
    this.loadFile(fileLocation)

    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  mainWindow.loadFile('./renderer/index.html')
  ipcMain.on('add-music-window', () => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })
  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelection'],
      filters: [{
        name: 'Music',
        extensions: ['mp3']
      }]
    }, (files) => {
      if (files) {
        event.sender.send('selected-file', files)
      }
    })
  })
  ipcMain.on('add-tracks', (event, tracks) => {
    const updatedTracks = myStore.addTracks(tracks).getTracks()
  })
})
