'use strict';

const electron = require('electron');  
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const fs = require("fs");

let mainWindow;

app.on('window-all-closed', function() {  
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {  
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  deleteChromeCache();

  mainWindow.webContents.on('will-navigate',(e,url) => {
  	e.preventDefault();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


var deleteChromeCache = function() {
    var chromeCacheDir = path.join(app.getPath('userData'), 'Cache'); 
    if(fs.existsSync(chromeCacheDir)) {
        var files = fs.readdirSync(chromeCacheDir);
        for(var i=0; i<files.length; i++) {
            var filename = path.join(chromeCacheDir, files[i]);
            if(fs.existsSync(filename)) {
                try {
                    fs.unlinkSync(filename);
                }
                catch(e) {
                    console.log(e);
                }
            }
        }
    }
};