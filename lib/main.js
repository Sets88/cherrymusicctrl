var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var panel = require("sdk/panel");
var { Hotkey } = require("sdk/hotkeys");


var infopanel = require("sdk/panel").Panel({
  width: 500,
  height: 70,
  contentURL: data.url("infopanel.html"),
  position: {
    bottom: 0,
    right: 0
  },
//  contentScriptFile: data.url("get-text.js")
});

var widget = widgets.Widget({
    id: "cherrymusic-player",
    label: "CherryMusic Control",
    width: 100,
    contentURL: data.url("buttons.html"),
});

var cherrymusictab

function endswith(str, suffix){
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function findcherrymusictab() {
    for each (var tab in tabs) {
        if (endswith(tab.title, "CherryMusic")) {
            cherrymusictab = tab
            cherrymusictab.on("close", function onClose(tab) {
                    cherrymusictab = undefined;
                }
            );
        }
    }
}


widget.port.on("play", function(){
    if (cherrymusictab === undefined) {
        findcherrymusictab()
    }
    if (cherrymusictab != undefined) {
        cherrymusictab.attach({
            contentScript: 'document.getElementsByClassName("jp-play")[0].click();'
        });
    }
});


widget.port.on("pause", function(){
   if (cherrymusictab === undefined) {
        findcherrymusictab()
    }
    if (cherrymusictab != undefined) {
        cherrymusictab.attach({
            contentScriptFile: data.url("pause.js")
        })
    }
});


widget.port.on("prev", function(){
   if (cherrymusictab === undefined) {
        findcherrymusictab()
    }
    if (cherrymusictab != undefined) {
        cherrymusictab.attach({
            contentScript: 'document.getElementsByClassName("jp-previous")[0].click();'
        })
    }
});


widget.port.on("next", function(){
   if (cherrymusictab === undefined) {
        findcherrymusictab()
    }
    if (cherrymusictab != undefined) {
        cherrymusictab.attach({
            contentScript: 'document.getElementsByClassName("jp-next")[0].click();'
        })
    }
});


var showHotKey = Hotkey({
    combo: "accel-ctrl-space",
    onPress: function() {
        if (cherrymusictab === undefined) {
            findcherrymusictab()
        }
        if (cherrymusictab != undefined) {
            cherrymusictab.attach({
                contentScriptFile: data.url("pause.js")
            })
        }
    }
});


widget.port.on("infoshow", function(){
    infopanel.show();
    if (cherrymusictab === undefined) {
        findcherrymusictab()
    }
    if (cherrymusictab != undefined) {
        cherrymusictab.attach({
            contentScriptFile: data.url('getinfo.js'),
            onMessage: function(message) {
                infopanel.port.emit("changecontent", [message[0], message[1]]);
            }
        })
    }
    else {
        infopanel.port.emit("changecontent", ["CherryMusic is not opened yet", ""]);
    }

});

widget.port.on("infohide", function(){
    infopanel.hide();
});
