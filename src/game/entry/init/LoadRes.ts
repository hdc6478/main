namespace game {
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    let _cur: number;
    let _total: number;

    export function loadRes(): void {
        _cur = 0;
        _total = 0;

        let callTime = 0;
        let totalCallTime = 6;
        let onGotNum = (num: number) => {
            callTime++;
            _total += num;
            if (callTime == totalCallTime) {
                delayCall(Handler.alloc(null, startLoad));
            }
        };

        if (gso.configList) {
            _total += gso.configList.length;
        }
        onGotNum(1);
        InitMap.getNum(Handler.alloc(null, onGotNum));
        InitAnim.getNum(Handler.alloc(null, onGotNum));
        InitTheme.getNum(Handler.alloc(null, onGotNum));
        InitCfg.getNum(Handler.alloc(null, onGotNum));
        InitPreload.getNum(Handler.alloc(null, onGotNum));
    }

    function startLoad(): void {
        if (gso.configList) {
            LoadMgr.ins.loadJsonList(gso.configList,
                Handler.alloc(null, () => resLoaded()),
                Handler.alloc(null, () => InitTheme.newTheme())
            );
        }
        // loadWinBg();
        resLoaded();
        InitMap.load();
        InitAnim.load();
        InitTheme.load();
        InitCfg.load();
        InitPreload.load();
    }

    export function resLoaded(): void {
        _cur++;
        PreloadMgr.onResPro(Math.floor(_cur / _total * 100));
        //console.info("resLoaded，_cur：", _cur, "_total:", _total)
        if (_cur >= _total) {
            base.delayCall(Handler.alloc(PreloadMgr, PreloadMgr.onResComp));
        }
    }

}
