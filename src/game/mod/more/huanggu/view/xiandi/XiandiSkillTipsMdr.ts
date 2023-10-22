namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;

    export class XiandiSkillTipsMdr extends MdrBase {
        protected _view: XiandiSkillTipsView = this.mark("_view", XiandiSkillTipsView);

        private _proxy: XiandiProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xiandi);

            this._view.list.itemRenderer = BaseDescItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let datas: {
                desc: string;
                title: string;
            }[] = [];
            let level: number = this._proxy.skill_lv;
            let huanggu_nvshen_buff = this._proxy.huanggu_nvshen_buff;
            let info = this._proxy.tiandi_info;
            let power: number = info && info.showpower && info.showpower.toNumber() || 0;
            for (let info of huanggu_nvshen_buff) {
                let title: string = `${info[0]}阶效果 `;
                if (power < info[2]) {
                    let limit: string = `(需要天帝战力${StringUtil.getPowerNumStr(info[2])})`;
                    let color: string = TextUtil.addColor(limit, BlackColor.RED);
                    title += color;
                }
                let buff: BuffConfig = getConfigByNameId(ConfigName.Buff, info[1]);
                let desc: string = buff.des;
                if (!level && info[0] == level + 1 || info[0] == level) {
                    this._view.skill.setData(info[1]);
                    this._view.lab_name.text = buff.name;
                }
                datas.push({ desc, title });
            }
            this._listData.replaceAll(datas);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}