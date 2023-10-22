namespace game.mod.daily {

    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import TimeMgr = base.TimeMgr;
    import s2c_limit_act_info = msg.s2c_limit_act_info;
    import GameNT = base.GameNT;

    /**
     * @description 日常限时活动
     */
    export class DailyLimitTimeActProxy extends ProxyBase implements IDailyLimitTimeActProxy{
        private _model: DailyLimitTimeActModel;

        initialize() {
            super.initialize();
            this._model = new DailyLimitTimeActModel();
            this.onProto(s2c_limit_act_info, this.s2c_limit_act_info, this);
        }

        public s2c_limit_act_info(n: GameNT): void {
            let msg = n.body as s2c_limit_act_info;
            let hasMsg = msg && msg.indexs && msg.indexs.length;
            if (hasMsg) {
                if (msg.oper == 1) {
                    this._model.indexs = msg.indexs;
                } else {
                    for (let index of msg.indexs) {
                        let idx = this._model.indexs.indexOf(index);
                        if (idx < 0 && msg.oper == 3) {
                            this._model.indexs.push(index);
                        } else if (idx > -1 && msg.oper == 2) {
                            this._model.indexs.splice(idx, 1);
                        }
                    }
                }
            }
            this.updateHint();
            if(hasMsg){
                let types = this.changeIndexs(msg.indexs);
                this._model.types = types;
                this.sendNt(DailyLimitTimeEvent.UPDATE_LIMIT_ACT_INFO, types);
            }
        }

        public getConfig(index: number): DailyLimitTimeConfig {
            return getConfigByNameId(ConfigName.DailyLimitTime, index);
        }

        /**当天的活动数据*/
        private _curDay: number;
        private _curList: DailyLimitTimeConfig[] = [];

        private getConfigListByToday(): DailyLimitTimeConfig[] {
            let day = RoleUtil.getCurWeekDay();
            if (this._curDay && day == this._curDay) {
                return this._curList;
            }
            this._curDay = day;
            let cfgs: DailyLimitTimeConfig[] = getConfigListByName(ConfigName.DailyLimitTime);
            let cfgList: DailyLimitTimeConfig[] = [];
            for (let cfg of cfgs) {
                if (cfg && cfg.week_day && (cfg.week_day.indexOf(day) > -1 || cfg.week_day.indexOf(8) > -1)) {
                    cfgList.push(cfg);
                }
            }
            this._curList = cfgList;
            return cfgList;
        }

        /**从后端index获取前端index*/
        private getTypes(): number[] {
            return this._model.types || [];
        }

        private changeIndexs(indexs: number[]): number[] {
            let types: number[] = [];
            for (let idx of indexs) {
                let type = +(idx + '').slice(4, 6);
                if (types.indexOf(type) < 0) {
                    types.push(type);
                }
            }
            return types;
        }

        /**是否是今天的活动*/
        public isTodayAct(cfg: DailyLimitTimeConfig): boolean {
            if (!cfg || !cfg.week_day) {
                return false;
            }
            return cfg.week_day.indexOf(RoleUtil.getCurWeekDay()) > -1 || cfg.week_day.indexOf(8) > -1;
        }

        public getConfigList(): IDailyLimitActData[] {
            let cfgs: DailyLimitTimeConfig[] = getConfigListByName(ConfigName.DailyLimitTime);
            let topList: IDailyLimitActData[] = [];//置顶活动，已开启的
            let notList: IDailyLimitActData[] = [];//开启但不置顶活动，未开启活动
            let endList: IDailyLimitActData[] = [];//已结束活动
            let curTime = TimeMgr.time.serverTime;//当前时间
            let types = this.getTypes();//在开启中的前端index
            for (let cfg of cfgs) {
                let date = TimeUtil.getServerTime();
                let startTime = 0;
                let endTime = 0;
                let endTimeAry = cfg.act_time[cfg.act_time.length - 1];//最后一个结束时间
                date.setHours(endTimeAry[0], endTimeAry[1], 0, 0);
                endTime = date.getTime();
                let isToday = this.isTodayAct(cfg);//是否今天的活动
                //已结束的活动
                if (isToday && curTime >= endTime) {
                    endList.push({
                        cfg,
                        showHint: false,
                        endTime: 0,
                        startTime: 0,
                        state: 0
                    });
                    continue;
                }
                //不是今天的活动，不在进行中的活动，玩家未达条件的活动
                if (!isToday || types.indexOf(cfg.index) < 0 || (cfg.open_id && !ViewMgr.getIns().checkViewOpen(cfg.open_id))) {
                    notList.push({
                        cfg,
                        showHint: false,
                        startTime: 0,
                        endTime: 0,
                        state: 2
                    });
                    continue;
                }
                //正在进行的活动
                for (let i = 0; i < cfg.act_time.length; i += 2) {
                    date.setHours(cfg.act_time[i][0], cfg.act_time[i][1], 0, 0);
                    startTime = date.getTime();
                    date.setHours(cfg.act_time[i + 1][0], cfg.act_time[i + 1][1], 0, 0);
                    endTime = date.getTime();
                    if (startTime <= curTime && curTime <= endTime) {
                        let d = {
                            cfg,
                            showHint: !this.getClickHint(cfg.index),
                            startTime,
                            endTime,
                            state: 1
                        };
                        topList.push(d);
                        // if (cfg.is_top) {
                        //     topList.push(d);
                        // } else {
                        //     notList.push(d);
                        // }
                    }
                }
            }
            if (topList && topList.length) {
                topList.sort((a, b) => a.startTime - b.startTime);
            }
            return topList.concat(notList, endList);
        }

        /**活动是否正在进行*/
        public isOpen(type: number): boolean {
            let types = this.getTypes();//在开启中的前端index
            return types.indexOf(type) > -1;
        }
        /**活动下一次开启时间，返回的是秒*/
        public getNextStartTime(type: number): number {
            let cfg = this.getConfig(type);
            let nextStartTime = 0;
            let curTime = TimeMgr.time.serverTime;//当前时间
            let date = TimeUtil.getServerTime();

            let isToday = this.isTodayAct(cfg);//是否今天的活动
            if(isToday){
                //今天的活动，取下一次开启时间
                for (let i = 0; i < cfg.act_time.length; i += 2) {
                    date.setHours(cfg.act_time[i][0], cfg.act_time[i][1], 0, 0);
                    let startTime = date.getTime();
                    if (startTime > curTime) {
                        nextStartTime = startTime;//取到下一次开启时间，则跳出循环
                        break;
                    }
                }
            }
            if(!nextStartTime){
                //取不到下一次开启时间，则往下一个活动日取时间
                let curDay = RoleUtil.getCurWeekDay();
                let nextDay = 0;//下一次活动在几天后开启
                if(cfg.week_day.indexOf(8) > -1){
                    //每天开启的活动
                    nextDay = 1;
                }
                else {
                    //周几开启的活动
                    for(let d of cfg.week_day){
                        if(d > curDay){
                            //大于当前活动日
                            nextDay = d - curDay;
                            break;
                        }
                    }
                    if(!nextDay){
                        //当前周取不到下一个活动日，则往下一周的第一个活动日取时间
                        nextDay = cfg.week_day[0] + 7 - curDay;
                    }
                }
                let nextDayTime = TimeUtil.getNextDayTime(curTime, true, nextDay);//下一个活动日的0点时间
                date.setTime(nextDayTime * 1000);//设置为0点时间
                date.setHours(cfg.act_time[0][0], cfg.act_time[0][1], 0, 0);//下一个活动日的第一个时间
                nextStartTime = date.getTime();
            }
            return nextStartTime / 1000;
        }

        public getClickHint(index: number): boolean {
            return this._model.clickHint.indexOf(index) > -1;
        }

        public setClickHint(index: number): void {
            if (this._model.clickHint.indexOf(index) > -1) {
                return;
            }
            this._model.clickHint.push(index);
            this.updateHint();
        }

        public updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.DailyLimitTime)) {
                return;
            }
            let list = this.getConfigList() || [];
            let isHint = false;
            for (let data of list) {
                if (data && data.showHint) {
                    isHint = true;
                    break;
                }
            }
            HintMgr.setHint(isHint, this._model.hintPath);
        }
    }
}