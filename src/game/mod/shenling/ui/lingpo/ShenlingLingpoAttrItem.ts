namespace game.mod.shenling {

    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;

    export class ShenlingLingpoAttrItem extends BaseRenderer {
        public baseNameItem: game.mod.BaseNameItem;
        public lb_desc: eui.Label;
        public attrList: game.mod.AttrListImgView;

        private _proxy: ShenlingLingpoProxy;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoAttrItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingpo);
        }

        //当前
        public updateInfo(id: number, attr: attributes): void {
            let isActed = this._proxy.isSuitActed(id);
            let suitLv = this._proxy.getSuitLevel(id);
            let lv = isActed ? suitLv : 1;
            let title = isActed ? LanDef.general9 : LanDef.bagua_txt3;
            let desc = StringUtil.substitute(getLanById(LanDef.lingpo_tips2), [lv])
                + (isActed ? `(${getLanById(LanDef.actived)})` : `(${this._proxy.getSuitLevelProgressCnt(id, lv)}/${LingPoMaxCnt})`);
            desc = TextUtil.addColor(desc, isActed ? BlackColor.GREEN : BlackColor.RED);

            this.updateView(getLanById(title), desc, attr,
                isActed ? BlackColor.GREEN : BlackColor.GRAY,
                isActed ? BlackColor.DEFAULT : BlackColor.GRAY);
        }

        //下阶
        public updateNextInfo(id: number, attr: attributes): void {
            let title = getLanById(LanDef.lingpo_tips3);
            let lv = this._proxy.getSuitLevel(id);
            let progressCnt = this._proxy.getSuitLevelProgressCnt(id, lv + 1);
            let str = StringUtil.substitute(getLanById(LanDef.lingpo_tips2), [lv + 1]);
            let desc = TextUtil.addColor(str + `(${progressCnt}/${LingPoMaxCnt})`, progressCnt >= LingPoMaxCnt ? BlackColor.GREEN : BlackColor.RED);

            this.updateView(title, desc, attr, BlackColor.GRAY, BlackColor.GRAY);
        }

        private updateView(title: string, desc: string, attr: attributes, color: number = WhiteColor.GREEN, defaultColor?: number): void {
            this.baseNameItem.setTitle(title);
            this.lb_desc.textFlow = TextUtil.parseHtml(desc);
            this.attrList.updateAttrAdd(attr, color, '\n', ' +', defaultColor, 'zhuangshi1');
        }
    }
}