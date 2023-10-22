(function (d) {
    d.oncontextmenu = function () {
        return false
    };
    d.ondragstart = function () {
        return false;
    };
})(document);

(<any>window).gzyyou = Object.create(null);

function gAlert(message?: any) {
    alert.call(window, message);
}