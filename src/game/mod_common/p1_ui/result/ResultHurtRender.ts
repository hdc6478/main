namespace game.mod {

    import boss_srefresh_damage = msg.boss_srefresh_damage;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class ResultWinRender extends BaseRenderer {

        public img_icon: eui.Image;
        public img_shuxing: eui.Image;
        public img_mvp: eui.Image;
        public lab_act: eui.Label;
        public progress: ProgressBarComp;
        public labelDisplay: eui.Label;

        public data: {type: number, hurt?: boss_srefresh_damage, maxHurt?: boss_srefresh_damage};//神灵类型，伤害，是否MVP

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let type = this.data.type;
            let hurt = this.data.hurt;
            let maxHurt = this.data.maxHurt;
            let isMvp: boolean = !!(hurt && maxHurt && hurt.damage.eq(maxHurt.damage));

            this.img_shuxing.source = `shuxingtubiao_${type}`;
            this.img_mvp.visible = isMvp;

            let index = hurt ? hurt.index.toNumber() : 0;
            if(!index){
                //服务端未下发伤害时，需要取神灵系统数据
                let _proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let info = _proxy.getTypeInfo(type);
                index = info ? info.upindex : 0;
            }

            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            this.img_icon.source = cfg ? cfg.icon : 'icon_jia';
            this.lab_act.visible = !index;
            this.progress.visible = this.labelDisplay.visible = !!index;
            if(!!index){
                let curVal = hurt && hurt.damage ? hurt.damage.toNumber() : 0;
                let maxVal = maxHurt && maxHurt.damage ? maxHurt.damage.toNumber() : 0;
                let tweenTime = curVal / maxVal * 1000;
                this.progress.show(0, maxVal, false, 0, false, ProgressBarType.NoValue);
                this.progress.show(curVal, maxVal, true, 0, false, ProgressBarType.NoValue, null, tweenTime);
                this.labelDisplay.text = StringUtil.getHurtNumStr(curVal);
            }
        }
    }
}