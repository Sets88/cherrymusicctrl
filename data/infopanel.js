addon.port.on("changecontent", function (message) {
    var status = self.document.getElementById("status");
    status.innerHTML = message;
});