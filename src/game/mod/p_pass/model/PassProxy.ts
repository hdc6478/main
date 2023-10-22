namespace game.mod.pass {

    import c2s_mainline_open_ui = msg.c2s_mainline_open_ui;
    import s2c_mainline_open_ui = msg.s2c_mainline_open_ui;
    import GameNT = base.GameNT;
    import c2s_mainline_rank = msg.c2s_mainline_rank;
    import s2c_mainline_rank = msg.s2c_mainline_rank;
    import c2s_mainline_rank_server_award = msg.c2s_mainline_rank_server_award;
    import s2c_mainline_rank_server_award = msg.s2c_mainline_rank_server_award;
    import c2s_mainline_rank_award = msg.c2s_mainline_rank_award;
    import s2c_mainline_rank_award = msg.s2c_mainline_rank_award;
    import c2s_mainline_enter = msg.c2s_mainline_enter;
    import c2s_mainline_task_auto = msg.c2s_mainline_task_auto;
    import s2c_mainline_challenge_stage = msg.s2c_mainline_challenge_stage;
    import c2s_mainline_wroldmap = msg.c2s_mainline_wroldmap;
    import s2c_mainline_wroldmap = msg.s2c_mainline_wroldmap;
    import c2s_mainline_topthree = msg.c2s_mainline_topthree;
    import s2c_mainline_topthree = msg.s2c_mainline_topthree;
    import c2s_qiyuan_enter = msg.c2s_qiyuan_enter;
    import s2c_qiyuan_award = msg.s2c_qiyuan_award;
    import WorldmapConfig = game.config.WorldmapConfig;
    import QiyuanConfig = game.config.QiyuanConfig;
    import task_data = msg.task_data;
    import s2c_preview_online_request = msg.s2c_preview_online_request;
    import s2c_preview_ret = msg.s2c_preview_ret;
    import c2s_preview = msg.c2s_preview;
    import s2c_mainline_first_lose = msg.s2c_mainline_first_lose;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import PreviewConfig = game.config.PreviewConfig;
    import Gate1Config = game.config.Gate1Config;
    import ParamConfig = game.config.ParamConfig;

    export class PassProxy extends ProxyBase implements IPassProxy {

        private _model: PassModel;

        private _tmpIdx: number = 0;

        public getModel(): PassModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new PassModel();

            this.onProto(s2c_mainline_open_ui, this.s2c_mainline_open_ui, this);
            this.onProto(s2c_mainline_rank, this.s2c_mainline_rank, this);
            this.onProto(s2c_mainline_rank_server_award, this.s2c_mainline_rank_server_award, this);
            this.onProto(s2c_mainline_rank_award, this.s2c_mainline_rank_award, this);
            this.onProto(s2c_mainline_challenge_stage, this.s2c_mainline_challenge_stage, this);
            this.onProto(s2c_mainline_wroldmap, this.s2c_mainline_wroldmap, this);
            this.onProto(s2c_mainline_topthree, this.s2c_mainline_topthree, this);
            this.onProto(s2c_qiyuan_award, this.s2c_qiyuan_award, this);

            this.onProto(s2c_preview_online_request, this.s2c_preview_online_request, this);
            this.onProto(s2c_preview_ret, this.s2c_preview_ret, this);
            this.onProto(s2c_mainline_first_lose,this.s2c_mainline_first_lose,this);
        }

        public s2c_mainline_first_lose(n: GameNT):void{
            console.info("s2c_mainline_first_lose 第一次闯关失败");
            GuideMgr.getIns().firstFailedPass = true;
            this.sendNt( GuideEvent.ON_GUIDE_UPDATE);
        }

        /**打开闯关界面*/
        public c2s_mainline_open_ui(): void {
            this.sendProto(new c2s_mainline_open_ui());
        }

        private s2c_mainline_open_ui(n: GameNT) {
            let msg: s2c_mainline_open_ui = n.body;
            if (msg.cur_index != undefined) {
                this._model.curIndex = msg.cur_index;
                this.updateWorldMapHint();
                //this.checkFunctionNotice();
                this.sendNt(PassEvent.MAIN_PASS_GUANQIA_UPDATE);//其他系统需要监听
            }
            if (msg.target_wave_cnt != undefined) {
                this._model.targetWaveCnt = msg.target_wave_cnt;
            }
            if (msg.now_wave_cnt != undefined) {
                this._model.nowWaveCnt = msg.now_wave_cnt;
            }
            if (msg.is_auto_fin != undefined) {
                this._model.passIsAuto = msg.is_auto_fin;
            }
            if (msg.max_mainline_idx != undefined) {
                this._model.maxMainlineIdx = msg.max_mainline_idx;
            }
            this.onUpdateHintOfPreview();
            this.sendNt(PassEvent.UPDATE_MAIN_PASS_INFO);
        }

        /**排行榜*/
        public c2s_mainline_rank(): void {
            let msg: c2s_mainline_rank = new c2s_mainline_rank();
            this.sendProto(msg);
        }

        private s2c_mainline_rank(n: GameNT) {
            let msg: s2c_mainline_rank = n.body;
            this.sendNt(PassEvent.UPDATE_PASS_RANK_INFO, msg);
        }

        /**大神榜*/
        public c2s_mainline_rank_server_award(): void {
            let msg: c2s_mainline_rank_server_award = new c2s_mainline_rank_server_award();
            this.sendProto(msg);
        }

        private s2c_mainline_rank_server_award(n: GameNT) {
            let msg: s2c_mainline_rank_server_award = n.body;
            if (msg.infos) {
                for (let info of msg.infos) {
                    this._model.godRankInfos[info.index] = info;
                }
                this.sendNt(PassEvent.UPDATE_PASS_GOD_RANK_INFO);
            }
        }

        /**大神榜领奖*/
        public c2s_mainline_rank_award(idx: number): void {
            let msg: c2s_mainline_rank_award = new c2s_mainline_rank_award();
            msg.index = idx;
            this.sendProto(msg);
        }

        private s2c_mainline_rank_award(n: GameNT) {
            let msg: s2c_mainline_rank_award = n.body;
            if (msg.server_award) {
                this._model.godRankAwdGotIds = msg.server_award;
                this.sendNt(PassEvent.UPDATE_PASS_GOD_RANK_AWD_GOT_INFO);
            }
        }

        /**开始战斗*/
        public c2s_mainline_enter(): void {
            let msg: c2s_mainline_enter = new c2s_mainline_enter();
            msg.index = this._model.curIndex;
            this.sendProto(msg);
        }

        /** 场景信息 */
        private s2c_mainline_challenge_stage(n: GameNT) {
            let msg: s2c_mainline_challenge_stage = n.body;
            if (msg.challenge_stage != undefined) {
                this._model.curChallengeIdx = msg.challenge_stage;
                //挑战挂机boss
                this.challengeBoss = true;
            }
        }

        //重置挑战挂机boss
        public set challengeBoss(val: boolean) {
            if (this._model.challengeBoss != val) {
                this._model.challengeBoss = val;
                this.sendNt(PassEvent.CHALLENGE_HANGUP_BOSS);
            }
        }

        public get challengeBoss(): boolean {
            return this._model.challengeBoss;
        }

        /** 自动闯关 */
        public c2s_mainline_task_auto(bool: boolean) {
            let msg: c2s_mainline_task_auto = new c2s_mainline_task_auto();
            msg.is_auto_fin = bool;
            this.sendProto(msg);
        }

        /**
         * 世界地图请求
         * @param idx
         */
        public c2s_mainline_wroldmap(idx: number): void {
            let msg: c2s_mainline_wroldmap = new c2s_mainline_wroldmap();
            msg.index = idx;
            this.sendProto(msg);
        }

        private s2c_mainline_wroldmap(n: GameNT) {
            let msg: s2c_mainline_wroldmap = n.body;
            this._model.worldMapAwardGotIds = msg.award;
            this.updateWorldMapHint();
            this.sendNt(PassEvent.UPDATE_PASS_MAP_AWD_GOT_INFO);
        }

        /**
         * 世界地图详情请求
         * @param idx
         */
        public c2s_mainline_topthree(idx: number): void {
            let msg: c2s_mainline_topthree = new c2s_mainline_topthree();
            msg.index = idx;
            this._tmpIdx = idx;

            this.sendProto(msg);
        }

        private s2c_mainline_topthree(n: GameNT) {
            let msg: s2c_mainline_topthree = n.body;
            if (msg.infos) {
                this._model.worldMapTopInfos[this._tmpIdx] = msg.infos;
                this.sendNt(PassEvent.UPDATE_PASS_WORLD_MAP_TOP_INFO);
            }
        }

        /**
         * 副本奇缘挑战请求
         * @param idx
         */
        public c2s_qiyuan_enter(idx: number): void {
            let msg: c2s_qiyuan_enter = new c2s_qiyuan_enter();
            msg.index = idx;
            this._tmpIdx = idx;

            this.sendProto(msg);
        }

        private s2c_qiyuan_award(n: GameNT) {
            let msg: s2c_qiyuan_award = n.body;
            if (msg.award) {
                this._model.qyFbFinishIds = msg.award;
            }
            this._model.list = msg.list || [];
            this.sendNt(PassEvent.UPDATE_PASS_FB_QI_YUAN_INFO);
            this.onUpdateHint();
        }

        ////////////////////////////other/////////////////////////////////

        public updateWorldMapHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.WorldMap)) {
                return;
            }
            let cfgs: WorldmapConfig[] = getConfigListByName(ConfigName.WorldMap);
            let hint = false;
            for (let i = 0, len = cfgs.length; i < len; i++) {
                hint = this.getWorldMapHint(cfgs[i]);
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.WMBoxRewardHint);
        }

        /**
         * 地图红点
         * @param idx 地图id
         * @returns
         */
        public getWorldMapHint(cfg: WorldmapConfig): boolean {
            if (!this.isPass(cfg)) {           // 未通关
                return false;
            }
            let hint = !(this._model.worldMapAwardGotIds && this._model.worldMapAwardGotIds.length > 0
                && this._model.worldMapAwardGotIds.indexOf(cfg.index) != -1);
            return hint;
        }

        public get passNextIdx(): number {
            return this._model.curIndex;
        }

        public get passSceneChan(): number {
            return this._model.curChallengeIdx;
        }

        public get passMaxIdx(): number {
            return this._model.maxMainlineIdx;
        }

        public get passIsAuto(): boolean {
            return this._model.passIsAuto;
        }

        public set passIsAuto(v: boolean) {
            this._model.passIsAuto = v;
        }

        public get target_wave_cnt(): number {
            return this._model.targetWaveCnt;
        }

        public get now_wave_cnt(): number {
            return this._model.nowWaveCnt;
        }

        public set curIndex(value: number) {
            this._model.curIndex = value;
            this.sendNt(PassEvent.UPDATE_MAIN_PASS_INFO);
        }

        public get curIndex() {
            return this._model.curIndex;
        }

        public changeIdxToNum(idx: number): number {
            let sNum: number = idx % 100;
            let bNum: number = this.getStepByIdx(idx);
            sNum = sNum > 20 ? 20 : sNum;
            return (bNum - 1) * 20 + sNum;
        }

        public getChapterByIdx(chapterIdx: number): number {
            return chapterIdx % 10000;
        }

        public isCurChapter(mapCfg: WorldmapConfig): boolean {
            let curStep = this._model.curStep;
            return curStep >= this.getStepByIdx(mapCfg.gate[0]) && curStep <= this.getStepByIdx(mapCfg.gate[1]);
        }

        /**
         * 是否已通关指定章节
         * @param mapCfg
         * @returns
         */
        public isPass(mapCfg: WorldmapConfig): boolean {
            let curStep = this._model.curStep;
            return curStep > this.getStepByIdx(mapCfg.gate[1]);
        }

        public getStepByIdx(stepIdx: number): number {
            return stepIdx % 10000;
        }

        /**闯关关卡数*/
        public get curStep(): number {
            return this._model.curStep;
        }

        public getIndexByCfgIndex(index: number): number {
            for (let info of this._model.list) {
                if (info.index == index) {
                    return info.raid_count
                }
            }
            return 0;
        }

        private onUpdateHint(): void {
            let cfgs = getConfigListByName(ConfigName.Qiyuan);
            for (let cfg of cfgs) {
                let task = TaskUtil.getTask(cfg.param1[0]);
                let isInStep: boolean = (cfg.limit <= this._model.curStep);
                if (task && task.status == 1 && task.schedule >= task.target && isInStep) {
                    HintMgr.setHint(true, [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Qiyuan]);
                    return;
                }
            }
            HintMgr.setHint(false, [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Qiyuan]);
        }

        protected onTaskUpdate(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Qiyuan;
            if (types.indexOf(type) < 0) {
                return;
            }
            this.onUpdateHint();
        }

        //-------------------------功能预览-----------------------------

        public c2s_preview(index: number): void {
            let msg: c2s_preview = new c2s_preview();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_preview_online_request(n: GameNT): void {
            let msg: s2c_preview_online_request = n.body;
            if (msg.unreward) {
                this._model.indexs = msg.unreward;
            }
            this.sendNt(PassEvent.ON_UPDATE_PREVIEW_INFO);
        }

        private s2c_preview_ret(n: GameNT): void {
            let msg: s2c_preview_ret = n.body;
            if (msg.index && msg.state) {
                this._model.indexs.push(msg.index);
            }
            this.onUpdateHintOfPreview();
            if (this._model.index) {
                this.sendNt(PassEvent.ON_UPDATE_PREVIEW_SELECT, this._model.index);
            } else {
                this.sendNt(PassEvent.ON_UPDATE_PREVIEW_INFO);
            }
        }

        public getShowIndex(): number {
            let cfgArr: PreviewConfig[] = getConfigListByName(ConfigName.Preview);
            let index: number;
            for (let cfg of cfgArr) {
                index = cfg.index;
                if (!ViewMgr.getIns().checkMainLine(cfg.scence_limit)) {
                    return cfg.index;
                }
            }
            return index;
        }

        public getIcon(index: number): string {
            let cfg: PreviewConfig = getConfigByNameId(ConfigName.Preview, index);
            if (cfg) {
                return cfg.icon
            }
            return ""
        }

        public getOpenTxt(index: number): string {
            let cfg: PreviewConfig = getConfigByNameId(ConfigName.Preview, index);
            // let open_cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, cfg.type);
            // let line_cfg: Gate1Config = getConfigByNameId(ConfigName.Gate, open_cfg.mainline);
            let gate: Gate1Config = getConfigByNameId(ConfigName.Gate, cfg.scence_limit + 1);
            if (!ViewMgr.getIns().checkMainLine(cfg.scence_limit)) {
                return StringUtil.substitute("%s开启", [gate.gate_name]);
            }
            return "";
        }

        public checkBought(index: number): boolean {
            if (!this._model.indexs) {
                return false;
            }
            return this._model.indexs.indexOf(index) > -1;
        }

        private onUpdateHintOfPreview(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Pass)) {
                return;
            }
            let cfgArr: PreviewConfig[] = getConfigListByName(ConfigName.Preview);
            this._model.index = 0;
            let i: number = 0;
            for (let cfg of cfgArr) {
                let open: boolean = ViewMgr.getIns().checkMainLine(cfg.scence_limit);
                let bought: boolean = this.checkBought(cfg.index);
                let enough: boolean = BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1]);
                if (open && !bought && enough) {
                    this._model.index = i;
                    HintMgr.setHint(true, [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Main, PassViewType.Preview]);
                    return;
                }
                i++;
            }
            HintMgr.setHint(false, [ModName.Pass, PassViewType.PassMain + PassMainBtnType.Main, PassViewType.Preview]);
        }

        /**主页展示功能预览 */
        public onCheckMainShow(): boolean {
            let param: ParamConfig = GameConfig.getParamConfigById("gnkq_tiaojian");
            let cfg: PreviewConfig = getConfigByNameId(ConfigName.Preview, param.value);
            return !ViewMgr.getIns().checkMainLine(cfg.scence_limit);
        }

        //-------------------------功能预览-----------------------------

        // //检测功能预告气泡
        // private checkFunctionNotice(): void {
        //     let index = this._model.curIndex;
        //     FunctionNoticeMgr.getIns().updateNotice(index);
        // }
    }

    export interface IPassWorldMapData {
        cfg: WorldmapConfig;
        isCurMap: boolean;
        isPass: boolean;
        hint: boolean;
    }

    export interface IPassQiyuanData {
        cfg: QiyuanConfig;
        task: task_data;
        state: number;              // ui 状态
        isFinish: boolean;
        isInStep: boolean;          // 已达到闯关条件
        desc: string;
    }

}