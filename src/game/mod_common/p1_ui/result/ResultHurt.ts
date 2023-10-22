namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;
    import boss_srefresh_damage = msg.boss_srefresh_damage;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class ResultHurt extends eui.Component {

        public list_hurt: eui.List;
        private _hurtList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.result.ResultHurtSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.initHurtList();
        }

        private onRemove() {
        }

        private initHurtList(): void {
            if(!this._hurtList){
                this._hurtList = new ArrayCollection();
            }
            this.list_hurt.itemRenderer = ResultWinRender;
            this.list_hurt.dataProvider = this._hurtList;
        }

        // 伤害统计列表
        public updateHurtList(hurtList: boss_srefresh_damage[]): void {
            this.initHurtList();

            if(!hurtList || !hurtList.length){
                hurtList = [];
            }

            let maxHurt: boss_srefresh_damage;//最高伤害
            for(let i of hurtList){
                if(!maxHurt || maxHurt.damage.lt(i.damage)){
                    maxHurt = i;
                }
            }

            let infos: {type: number, hurt?: boss_srefresh_damage, maxHurt?: boss_srefresh_damage}[] = [];//神灵类型，伤害，是否MVP
            for(let type of ShenLingTypeAry){
                let hurt: boss_srefresh_damage;
                for(let i of hurtList){
                    let index = i.index;
                    let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index.toNumber());
                    if(cfg.type == type){
                        hurt = i;
                        break;
                    }
                }
                let info: {type: number, hurt?: boss_srefresh_damage, maxHurt?: boss_srefresh_damage} = {type: type, hurt: hurt, maxHurt: maxHurt};
                infos.push(info);
            }
            this._hurtList.source = infos;
        }
    }

}