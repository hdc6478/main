namespace game.mod.scene {

    import boss_srefresh_damage = msg.boss_srefresh_damage;
    import LanDef = game.localization.LanDef;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class SceneDamageItem extends eui.ItemRenderer {
        public lab_rank: eui.Label;
        public lab_allDamage: eui.Label;
        public lab_perDamage: eui.Label;

        public data: boss_srefresh_damage;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let nameStr = "";
            let isRole = this.data.index.eq(RoleVo.ins.role_id);
            if(isRole){
                nameStr = getLanById(LanDef.role);
            }
            else {
                let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, this.data.index.toNumber());
                nameStr = getLanById(ShenlingTypeName[cfg.type]) + getLanById(LanDef.general_tips);//火神灵
            }
            this.lab_rank.text = nameStr;
            this.lab_allDamage.text = StringUtil.getHurtNumStr(this.data.damage.toNumber());
            this.lab_perDamage.text = StringUtil.getHurtNumStr(this.data.damage_s.toNumber()) + "/" + getLanById(LanDef.shijian_4);
        }

    }
}
