namespace game.mod.union {

    import BuffConfig = game.config.BuffConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class UnionBookSkillView extends eui.Component {

        private lab_desc: eui.Label;
        private lab_name: eui.Label;
        private lab_cnt: eui.Label;
        private img_icon: eui.Image;

        public setData(index: number, stage: number): void {
            this.lab_cnt.text = `${stage}阶`;

            let buff: BuffConfig = getConfigByNameId(ConfigName.Buff, index);
            if (buff) {
                this.lab_name.text = buff.name;
                this.lab_desc.text = buff.des;
                this.img_icon.source = buff.icon;
            }
        }
    }

}