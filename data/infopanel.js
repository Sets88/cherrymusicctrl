addon.port.on("changecontent", function (message) {
    var statusdiv = self.document.getElementById("status");
    var messagediv = self.document.getElementById("message");
    messagediv.textContent = message[0];
    statusdiv.textContent = message[1];
});