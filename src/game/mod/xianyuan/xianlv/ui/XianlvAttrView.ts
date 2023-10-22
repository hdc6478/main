namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class XianlvAttrView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvAttrSkin";
        }
    }

    export class XianlvAttrItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public lb_attr: eui.Label;

        data: IXianlvAttrItemData;

        constructor() {
            super();
            this.skinName = `skins.xianyuan.XianlvAttrItemSkin`;
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_name.text = data.title == 1 ? getLanById(LanDef.xianlv_tips16) : getLanById(LanDef.xianlv_tips17);
            this.lb_attr.textFlow = TextUtil.parseHtml(data.attrStr);
        }
    }

    export interface IXianlvAttrItemData {
        title: number;
        attrStr: string;
    }
}