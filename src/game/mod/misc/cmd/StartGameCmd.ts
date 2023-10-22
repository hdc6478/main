namespace game.mod.misc {
    import BgMgr = game.BgMgr;
    import facade = base.facade;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class StartGameCmd extends CmdBase implements UpdateItem {
        private _list: string[];

        public exec(n: GameNT): void {
            //gAlert("....StartGameCmd....");
            BgMgr.getIns().setBg(null);
            // BgMgr.getIns().setBigBg(null);
            this.initSetInfo();

            this._list = [
                MainViewType.MainLeft,
                MainViewType.MainRight,
                MainViewType.MainTop,
                MainViewType.MainMenu,
                MainViewType.MainBottom,
            ];
            TimeMgr.addUpdateItem(this);

            //迁移到MainProxy请求协议
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            mainProxy.init();
        }

        public update(): void {
            if (this._list.length == 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            if (this._list.length) {
                let type = this._list.shift();
                facade.showView(ModName.Main, type);
            }
        }

        private initSetInfo() {

            // let proxy: MiscProxy = this.retProxy(ProxyType.Misc);
            // let json = proxy.getSetting(SettingKey.SetInfo);
            // let arr;
            // if (json) {
            //     arr = JSON.parse(json);
            // } else {
            //     if(gzyyou.sdk.checkIsCurChannel && gzyyou.sdk.checkIsCurChannel(CHANNEL_NAME.SHENGYE)){
            //         arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];//盛也不自动执行任务
            //     }
            //     else {
            //         arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];//设置左边竖着保存
            //     }
            // }

            SoundMgr.ins.enableSound(!gso.isBgMusic);
            SoundMgr.ins.soundEftEnabled = !gso.isGameMusic;
            if(gso.autoHuashen == undefined){
                //未设值时，默认设置为勾选
                let proxy: MiscProxy = this.retProxy(ProxyType.Misc);
                proxy.setSetting(SettingKey.autoHuashen, "1");
            }

            // gso.isCloseBgSound = !!arr[0];
            // gso.isCloseSoundEft = !!arr[1];
            // gso.isHideOtherPlayer = !!arr[2];
            // gso.isHideOtherPartner = !!arr[3];
            // gso.isHideOtherEft = !!arr[4];
            // gso.isHideSelfEft = !!arr[5];
            // gso.isHideSceneShake = !!arr[6];

            // gso.isAutoUseGodSkill = !!arr[7];
            // gso.isAutoTask = !!arr[8];

            // let t_proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
            // t_proxy.stopMainTaskFlag = !gso.isAutoTask;
        }

    }
}
