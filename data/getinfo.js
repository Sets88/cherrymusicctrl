var pause = document.getElementsByClassName("jp-pause")[0];
var songtitle = document.getElementsByClassName("cm-songtitle")[0].textContent
if (pause.style.display != 'none') {
    self.postMessage([songtitle, "Playing"]);
}
else {
    self.postMessage([songtitle, "Paused"]);
}
