namespace game.mod.scene {

    import GPlayerVo = game.scene.GPlayerVo;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;

    export class EnemyItem extends BaseListenerRenderer {
        public head: Head;
        public lab_name: eui.Label;
        public lab_team: eui.Label;
        public lab_power: eui.Label;
        public bar: ProgressBarComp;
        public lab_tips: eui.Label;
        public btn_attack: game.mod.Btn;

        private _proxy: SceneProxy;
        public data: GPlayerVo;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);

        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this._proxy.foeTargetId = info.entity_id;//设置敌人为攻击目标
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;

            this.head.updateHeadShow(info.head, info.head_frame, info.sex);
            this.lab_name.text = getLanById(LanDef.tongtian23) + "：" + info.name;
            let guildName = info.guild_name || getLanById(LanDef.bag_cue20);
            this.lab_team.text = getLanById(LanDef.union_title_2) + "：" + guildName;
            this.lab_power.text = StringUtil.getHurtNumStr(info.showpower.toNumber());
            this.updateEnemyHp(this.data.percent);
        }

        /**更新血量*/
        public updateEnemyHp(percent: number): void {
            if(!this.data){
                return;
            }
            this.bar.show(percent, 10000, false, 0, false, ProgressBarType.Percent);//血量
            let isDied = percent <= 0;//已死亡
            let tipsStr = "";
            if(isDied){
                //已死亡
                tipsStr = TextUtil.addColor(getLanById(LanDef.reviving) + "...", UIColor.GREEN);
                this.btn_attack.visible = false;
            }
            else {
                let isAtack = this._proxy.foeTargetId && this._proxy.foeTargetId.eq(this.data.entity_id);//攻击中
                this.btn_attack.visible = !isAtack;
                tipsStr = TextUtil.addColor(getLanById(LanDef.attacking) + "...", UIColor.RED);
            }
            this.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }


    }
}
