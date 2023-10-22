namespace game.scene {


    import facade = base.facade;
    import ViewMgr = game.mod.ViewMgr;

    export class Trigger extends NPC {
        private _lastTriggerTime: number = 0;
        private _triggerState: boolean = false;

        protected _triggerObj: BaseSceneObj; // 检测进入触发的对象，一般是主角

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.resType = ConfigHead.Creature; // 触发点外形 todo
        }

        public advanceTime(elapseTime: number) {
            super.advanceTime(elapseTime);
            let self = this;
            self._lastTriggerTime += elapseTime;
            if (self._lastTriggerTime > 100) {
                self._lastTriggerTime = 0;
                self.updateTrigger();
            }
        }

        /**
         *设置判断对象
         * @param obj
         */
        public setJudgeObj(obj: BaseSceneObj): void {
            this._triggerObj = obj;
        }

        onRelease(): void {
            this._triggerObj = null;
            super.onRelease();
        }

        private updateTrigger(): void {
            let self = this;
            if (!self._triggerObj) {
                return;
            }
            
            let dic = PointUtil.distance(self.x, self.y, self._triggerObj.x, self._triggerObj.y);
            // console.log("距离传送点" + dic);
            //let isShowWalkTo:boolean = ViewMgr.getIns().isShow(ModName.Result, ResultViewType.BeWalkingToTarget);
            let isShowWalkTo:boolean = false;
            // console.info("......updateTrigger......" + self._triggerState + " ...isShowWalkTo "+isShowWalkTo + "...dic... " + dic);
            // if ((dic <= 128 && !self._triggerState && isShowWalkTo) || (dic == 0 && self._triggerState && isShowWalkTo)) {
            //     self._triggerState = true;
            //     facade.sendNt(SceneEvent.ON_TRIGGER_IN, self.vo);
            // } else if (dic > 128 && self._triggerState) {
            //     self._triggerState = false;
            //     facade.sendNt(SceneEvent.ON_TRIGGER_OUR, self.vo);
            // }
        }

        protected showByDis() {
            let self = this;
            let scene = this.parent as Scene;
            if (scene == null) return;
            let focusPt = scene.getFocusPt();
            let dis = PointUtil.distance(focusPt.x, focusPt.y, self.x, self.y);
            let isShowBody = self.avatar.dsp.parent != null && self.avatar.dsp.visible;
            // let isOpen = false;
            // let range = 700;
            // //let isShowWalkTo:boolean = ViewMgr.getIns().isShow(ModName.Result, ResultViewType.BeWalkingToTarget);
            // let isShowWalkTo:boolean = false;
            // if ((dis >= range || !isOpen) && isShowBody) {
            //     // console.debug("触发点清除")
            //     self.avatar.dsp.parent.removeChild(self.avatar.dsp);
            // } else if (dis < range && !isShowBody && isOpen && isShowWalkTo) {
            //     // console.debug("触发点显示")
            //     if (!self.avatar.dsp.parent) {
            //         console.debug("触发点应该显示没显示")
            //     }
            //     // self.dsp.addChildAt(self.avatar.dsp, 1);
            //     self.avatar.dsp.visible = true;
            // }
        }
    }
}
