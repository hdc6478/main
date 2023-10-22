namespace game.scene {
    import Pool = base.Pool;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import LanDef = game.localization.LanDef;
    import BattleFigureConfig = game.config.BattleFigureConfig;

    //瓢字类管理
    export class STxtMgr implements UpdateItem {
        private static _ins: STxtMgr;

        public static get ins(): STxtMgr {
            let i = this._ins;
            if (i == null) {
                this._ins = i = new STxtMgr();
            }
            return i;
        }

        private _scene: Scene;

        private _queueNum: BaseBmpNum[] = [];

        public static _actArrayMap:{ [key: number]: any } = {};

        public init(scene: Scene): void {
            this._scene = scene;
            TimeMgr.addUpdateItem(this);
        }

        //private time
        public show(dmgStr: string, x: number, y: number, dir: number, types: number[], delay: number,target?:BaseActor): void {
            let self = this;
            if (!self._scene.isShow) {
                return;

            }

            // if(Date.now()-this.time < 10000){
            //     return ;
            // }
            // this.time = Date.now();

            //玩家
            let isMain = false;
            let mainPlayer = MainGPlayer.ins;
            if(target && target.enType == ObjectType.PLAYER){
                y -= 80;
                if(target instanceof MainGPlayer){
                    isMain = true;
                }
            }else if(target && target.enType == ObjectType.MONSTER){
                if((target.vo as MonsterVo).monsterType == MonsterType.Boss){
                    y -= 100;
                }else{
                    y -= 50;
                }
            }else{
                y -= 50;
            }

            // if(isMain){
            //     dir = MathUtil.randomDir(Direction.NONE);
            // }else{
                if(mainPlayer && target.x > mainPlayer.x){
                    dir = 1;
                }else{
                    dir = 2;
                }
            // }

            // if(dmgStr != "0"){
            //     dmgStr += "00"+target.vo.entity_id;
            // }

            let type = 1;
            let maxN = -1;
            let config: BattleFigureConfig;
            for(let i = 0;i < types.length; i++) {
                let t = types[i];
                let cfg = getConfigByNameId(ConfigName.BattleFigure, t);

                //主角收到暴击
                if(isMain && t == BmpTextType.CRITICAL){
                    type = BmpTextType.ROLE_ATK;
                    config = getConfigByNameId(ConfigName.BattleFigure,BmpTextType.ROLE_ATK);
                    break;
                }

                if(cfg.layer > maxN){
                    maxN = cfg.layer;
                    type = t;
                    config = cfg;
                }
            }

            let actArray = STxtMgr._actArrayMap[type];
            if(!actArray && !config.actAtr){
                //例子
                try{
                    //let act_json = "{\"total\":[{\"to\":{\"scale\":11,\"alpha\":1},\"time\":100},{\"delay\":100},{\"parabolic\":{\"scale\":2,\"alpha\":1,\"move\":{\"x\":200,\"y\":200,\"dir\":3}},\"time\":500}]}";
                    //let act_json = "{\"total\":[{\"to\":{\"scale\":0.2,\"alpha\":1},\"time\":100},{\"delay\":1000000}]}";
                    //let act_json = "{\"total\":[{\"to\":{\"scale\":1,\"alpha\":0},\"time\":10000}]}";
                    let atcObj = JSON.parse(config.act_json);
                    actArray = atcObj.total;
                    STxtMgr._actArrayMap[type] = actArray;
                }catch (e) {
                    console.error("战斗瓢字表 伤害类型 "+type+ " act_json 字段填写错了");
                }
            }

            let v: string = dmgStr;

            let bmp: BaseBmpNum = Pool.alloc(BaseBmpNum);
            bmp.setText(v, x, y, dir, type,config.font_name,actArray,config.has_word,isMain,config.actAtr);

            //if (delay > 0) {
                bmp.showTime = TimeMgr.time.serverTime + (delay || 0);
                self._queueNum.push(bmp);
                TimeMgr.addUpdateItem(self);
            // } else {
            //     self.addNum(bmp);
            // }

        }

        public update(time: Time): void {
            if (this._queueNum.length == 0) {
                //TimeMgr.removeUpdateItem(this);
                return;
            }
            let one = 0;
            for (let i = 0; i < this._queueNum.length; ++i) {
                let num = this._queueNum[i];
                if (time.serverTime < num.showTime) {
                    continue;
                }
                this.addNum(num);
                ArrayUtil.removeAt(this._queueNum, i);
                --i;
                one++;
                if(one > 5){
                    break;
                    break;
                }
            }
        }

        private addNum(bmp: BaseBmpNum): void {
            this._scene.add(bmp);
        }

        public clean(): void {
            TimeMgr.removeUpdateItem(this);
            this._queueNum.length = 0;
        }
    }
}
