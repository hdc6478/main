namespace game.mod.role {


    import TitleConfig = game.config.TitleConfig;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;

    export class TitleItem extends BaseRenderer {
        public gr_eft: eui.Group;
        public lb_time: eui.Label;
        public btn_huanHua: game.mod.Btn;
        public lb_desc: eui.Label;
        public btn_act: game.mod.Btn;
        public gr_star: eui.Group;
        public lb_starCount: eui.Label;
        public costItem: game.mod.CostIcon2;
        public img_notAct: eui.Image;
        public img_bg: eui.Image;
        public attr: game.mod.AttrListView;
        public gr_lb: eui.Group;
        public img_using: eui.Image;

        data: TitleConfig;
        info: msg.title_info;

        private _proxy: TitleProxy;

        constructor() {
            super();
            this.skinName = "skins.role.NewTitleItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Role, ProxyType.Title);
            this.costItem.setIconScale(0.5);
            this.img_bg.source = ResUtil.getUiPng('p1_title_item_bg');
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_huanHua, this.onClickHuanHua, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_act, this.onClickAct, this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.removeEft();
        }

        protected dataChanged() {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            let index = cfg.index;
            this.info = this._proxy.getTitleInfoByIdx(cfg.index);
            let notAct = !this.info || this.info.star == 0;//未激活
            let cost = cfg.skin_material && cfg.skin_material[0] || null;
            let isCostEnough = cost ? BagUtil.checkPropCnt(cost[0], cost[1]) : false;//道具足够否

            if (notAct) {
                this.img_notAct.visible = !isCostEnough;
                this.img_notAct.source = 'hongseweijihuo';
                this.costItem.visible = this.btn_act.visible = isCostEnough;
                isCostEnough && this.costItem.updateShow(cost);
                this.btn_act.label = getLanById(LanDef.active);
            } else if (this.info && this.info.star && this.info.star == cfg.star_max) {
                this.img_notAct.visible = true;
                this.img_notAct.source = 'lvseyimanxing';
                this.costItem.visible = this.btn_act.visible = false;
            } else {
                this.img_notAct.visible = false;
                let canUp = cfg.star_max > 0;//能升星
                this.costItem.visible = this.btn_act.visible = canUp;
                this.costItem.updateShow(cost);
                this.btn_act.label = getLanById(LanDef.uplv);
            }

            this.btn_act.visible && this.btn_act.setHint(this._proxy.canActivateOrUpStar(index));

            //激活就能幻化
            this.btn_huanHua.visible = !notAct && this._proxy.using != index;
            this.img_using.visible = this._proxy.using == index;
            this.gr_lb.visible = notAct;
            this.lb_desc.textFlow = TextUtil.parseHtml(cfg.text || '');

            this.updateTime();
            this.updateStar();
            this.updateAttr();

            this.removeEft();
            this.addEftByParent(ResUtil.getTitleSrc(index, 0), this.gr_eft);
        }

        public updateTime(): void {
            let del_time = this.info && this.info.del_time || 0;
            let leftTime = del_time - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.lb_time.text = '';
                return;
            }
            if (!this.lb_time.visible) {
                this.lb_time.visible = true;
            }
            this.lb_time.textFlow = TextUtil.parseHtml(TimeUtil.formatSecond(leftTime, 'd天 HH:mm:ss'));
        }

        private updateStar(): void {
            if (!this.info || !this.info.star) {
                this.gr_star.visible = false;
                return;
            }
            this.gr_star.visible = true;
            this.lb_starCount.text = this.info.star + '';
        }

        private updateAttr(): void {
            let attr: msg.attributes;
            if (this.info && this.info.attrs) {
                attr = this.info.attrs;
            } else {
                let attrs = RoleUtil.getAttrList(this.data.attr_id);
                attr = TextUtil.calcAttrList(attrs);
            }
            attr && this.attr.updateAttr(attr,0x238e2c);
        }

        private onClickHuanHua(): void {
            if (!this.info || !this.info.star) {
                return;
            }
            //卸下
            if (this.data.index == this._proxy.using) {
                this._proxy.c2s_title_operate(this.data.index, 5);
                return;
            }
            //幻化
            this._proxy.c2s_title_operate(this.data.index, 2);
        }

        private onClickAct(): void {
            let data = this.data;
            if (!data || !data.skin_material) {
                return;
            }
            let cost = data.skin_material[0];
            if (cost && !BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Text)) {
                return;
            }
            //激活
            if (!this.info || this.info.star == 0) {
                this._proxy.c2s_title_operate(data.index, 6);
                return;
            }
            // 有时限的称号不可升星
            if (this.info.del_time) {
                return;
            }
            //升星
            this._proxy.c2s_title_operate(data.index, 1);
        }
    }
}