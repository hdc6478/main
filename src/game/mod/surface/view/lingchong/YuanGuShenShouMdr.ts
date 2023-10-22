namespace game.mod.surface {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class YuanGuShenShouMdr extends LingChongMdr {
        protected _type = 2;
        protected _littleType = 1;

        protected addListeners() {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_treasure, TouchEvent.TOUCH_TAP, this.onClickTreasure, this);
            addEventListener(this._view.btn_task, TouchEvent.TOUCH_TAP, this.onClickTask, this);
        }

        protected updateAttrView() {

        }

        protected updateTaskView() {
            let cfg = this._proxy.getConfig(this._curIndex);
            if (!cfg || cfg.type != this._type || cfg.type_little != this._littleType || !cfg.taskid) {
                this._view.gr_treasure.visible = false;
                return;
            }
            let reinLv = RoleUtil.getRebirthLv();

            let task_list = this._proxy.getTaskInfo(this._curIndex);
            let curTaskIdx: number;//默认当前第一条的任务，然后根据转数变化

            for (let id of cfg.taskid) {
                let taskCfg = this._proxy.getTaskConfig(id);
                if (!taskCfg || !taskCfg.params || taskCfg.params[0] != 1) {//非转数过滤，1表示转数
                    continue;
                }
                if (taskCfg.params[1] >= reinLv) { //找出当前转数，或者比这个转数大的最接近的那一转
                    curTaskIdx = taskCfg.index;
                    break;
                }
            }
            if (!curTaskIdx) {
                curTaskIdx = cfg.taskid[0];
            }

            let curTaskCfg = this._proxy.getTaskConfig(curTaskIdx);
            if (!curTaskCfg) {
                return;
            }
            let curTaskInfo = task_list ? task_list[curTaskIdx] : null;
            let step = curTaskInfo ? curTaskInfo.step : 0;
            let curGetCnt = Math.floor(step / curTaskCfg.target);//当前可领取次数
            let gottenCnt = curTaskInfo ? curTaskInfo.get_count : 0;//统计的已领取次数
            let getCnt: number;//可领取次数
            if (curTaskCfg.maxlimit) {
                getCnt = Math.min(curTaskCfg.maxlimit - gottenCnt, curGetCnt);//有领取上限
            } else {
                getCnt = curGetCnt;
            }
            let txt = TextUtil.addColor(`${step}/${curTaskCfg.target}`, BlackColor.ORANGE);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(StringUtil.substitute(curTaskCfg.desc, [curTaskCfg.target]) + ': ' + txt + '\n'
                + StringUtil.substitute(getLanById(LanDef.lingchong_tips7), [TextUtil.addColor(getCnt + '', BlackColor.ORANGE)]));

            this._view.gr_treasure.visible = true;
            this._view.btn_treasure.setTip(this._proxy.getTreasureReceiveCnt(this._curIndex));
        }

        protected onClickTreasure() {
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.LingChongTreasure, this._curIndex);
        }

        protected onClickTask(): void {
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.LingChongTask, this._curIndex);
        }

        //跳到远古神兽
        protected jumpSecondTab() {
            if (this._proxy.getActOrUpHintByType(this._type, 2)) {
                ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.LingChongMain, [LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Yuangushenshou]);
            }
        }
    }

    export class YuanGuShenShou2Mdr extends YuanGuShenShouMdr {
        protected _type = 2;
        protected _littleType = 2;

        //跳到四神兽
        protected jumpSecondTab() {
            if (this._proxy.getActOrUpHintByType(this._type, 1)) {
                ViewMgr.getIns().showView(ModName.Surface, SurfaceViewType.LingChongMain, [LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Sishenshou]);
            }
        }
    }
}