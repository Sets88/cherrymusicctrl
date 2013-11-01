function init() {
    var play_button = document.getElementById("play-button");
    play_button.onclick = function() {
        addon.port.emit("play");
    }

    var pause_button = document.getElementById("pause-button");
    pause_button.onclick = function() {
        addon.port.emit("pause");
    }

    var prev_button = document.getElementById("prev-button");
    prev_button.onclick = function() {
        addon.port.emit("prev");
    }

    var next_button = document.getElementById("next-button");
    next_button.onclick = function() {
        addon.port.emit("next");
    }
    var info_button = document.getElementById("info-button");
    info_button.onmouseover = function() {
        addon.port.emit("infoshow");
    }
    info_button.onmouseout = function() {
        addon.port.emit("infohide");
    }
}