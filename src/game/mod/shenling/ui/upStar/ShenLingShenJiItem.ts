namespace game.mod.shenling {

    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    import facade = base.facade;

    export class ShenLingShenJiItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list_reward: eui.List;
        public btn_get: game.mod.Btn;
        public img_statue: eui.Image;
        public skillIcon: game.mod.ShenLingSkillIcon;

        data: ISLShenJiItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: ShenLingProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_get, this.onClick, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.skillIcon, this.onClickSkill, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._listData.removeAll();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            let cfg = this._proxy.getShenLingCfg(data.index);
            let str = TextUtil.addColor(`(${data.curStar}/${data.cfg.shenling_star})`, data.curStar >= data.cfg.shenling_star ? WhiteColor.GREEN : WhiteColor.RED);
            let txt = `${cfg.name}进阶至${data.cfg.shenling_star}可获得${str}`;
            this.lb_desc.textFlow = TextUtil.parseHtml(txt);

            let isGotten = data.status == 2;
            this.img_statue.visible = isGotten;
            this.btn_get.visible = !isGotten;
            this.btn_get.visible && this.btn_get.setHint(data.status == 1);

            this._listData.replaceAll(data.cfg.star_award);

            if (!data.talent_index) {
                this.skillIcon.visible = false;
                return;
            }
            this.skillIcon.visible = true;
            this.skillIcon.data = {
                skill_index: data.talent_index,
                is_act: true,
                skill_type: SLSkillType.Talent
            };
        }

        private onClick(): void {
            let cfg = this.data.cfg;
            if (!cfg || this.data.status != 1) {
                return;
            }
            this._proxy.c2s_god_brother_levelrewards(cfg.shenling_index, cfg.shenling_star);
        }

        private onClickSkill(): void {
            facade.showView(ModName.Shenling, ShenLingViewType.ShenLingSkill, {
                index: this.data.index,
                skill_index: this.data.talent_index,
                skill_type: SLSkillType.Talent
            });
        }
    }

    export interface ISLShenJiItemData {
        index: number;//神灵index
        cfg: ShenlingXingjiConfig;
        status: number;
        talent_index: number;//天赋
        curStar: number;//当前星级
    }
}