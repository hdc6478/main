namespace game.mod {

    import teammate = msg.teammate;

    export class EnemyInfoView extends eui.Component {
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_guild: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.EnemyInfoSkin";
        }

        /**
         * 更新信息
         * @param info
         */
        public updateShow(info: teammate): void {
            if (info) {
                this.lab_name.text = '昵称：' + info.name;
                let power = info.showpower && info.showpower.toNumber() || 0;
                this.lab_power.text = '战力：' + StringUtil.getPowerNumStr(power);
                this.lab_guild.text = '仙宗：' + (info.guild_name || '无');
            } else {
                this.updateShowDefault();
            }
        }

        /**
         * 更新信息
         * @param vo
         */
        public updateShowByObj(vo: { name: string, showpower: Long, guild_name: string }): void {
            if (!vo) {
                this.updateShowDefault();
                return;
            }
            this.lab_name.text = '昵称：' + vo.name;
            let power = vo.showpower && vo.showpower.toNumber() || 0;
            this.lab_power.text = '战力：' + StringUtil.getPowerNumStr(power);
            this.lab_guild.text = '仙宗：' + vo.guild_name;
        }

        /**
         * 默认展示
         * 昵称：无
         * 战力：0
         * 仙宗：无
         */
        public updateShowDefault(): void {
            this.lab_name.text = '昵称：无';
            this.lab_power.text = '战力：0';
            this.lab_guild.text = '仙宗：无';
        }
    }
}