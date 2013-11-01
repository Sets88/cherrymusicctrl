var pause = document.getElementsByClassName("jp-pause")[0];
var songtitle = document.getElementsByClassName("cm-songtitle")[0].innerHTML
if (pause.style.display != 'none') {
    self.postMessage(songtitle + "</br><b>Playing</b>");
}
else {
    self.postMessage(songtitle + "</br><b>Paused</b>");
}
