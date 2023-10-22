var gso = {
    c_dbg: "1",
    channel: "test",
    token: "token_xzdfasgasg",
    web_login: 1,
    apiHost: "http://192.168.1.22:8195/",
    dbg_addProp: 0,
    dbg_scene: 0,
    // test_mask: "1",
};

var ggo = {
    loadLauncher: function () {
        ggo.webReqGet("manifest.json", null, function (manifest) {
            gso.scriptList = manifest.modules.concat();
            var list = manifest.launcher;
            var count = 0;
            var loadNext = function () {
                ggo.loadSingleScript(list[count], loadComplete);
            };
            var loadComplete = function () {
                count++;
                if (count < list.length) {
                    loadNext();
                } else {
                    ggo.startEgret();
                    var loading = document.getElementById("loading");
                    if (loading) {
                        loading.parentNode.removeChild(loading);
                    }
                }
            };
            loadNext();
        });
    },
    loadLogin: function (src, onComplete) {
        ggo.webReqGet("manifest.json", null, function (manifest) {
            var list = manifest.login;
            var count = 0;
            var loadNext = function () {
                ggo.loadSingleScript(list[count], loadComplete);
            };
            var loadComplete = function () {
                count++;
                if (count < list.length) {
                    loadNext();
                } else {
                    onComplete("gso.scriptLit","gso.scriptLit");
                }
            };
            loadNext();
        });
    },
    checkVersion: function (v) {
        return 0;
    },
};