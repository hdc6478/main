namespace game.scene {

    //NPC
    export class NPC extends BaseActor {

        protected onAdded(): void {
            super.onAdded();
            this.showModel();
        }

        protected showModel() {
            let vo: NPCVo = <NPCVo>this.vo;
            let self = this;
            if (!vo.cfg) return;
            if (vo.cfg.res_id) {
                self.avatar.resType = ConfigHead.Creature;
                self.setBody(vo.cfg.res_id);
            } else if (vo.cfg.outlook) {//todo
                let type = vo.cfg.outlook[0][0];
                self.avatar.resType = type == ConfigHead.Body ? null : type;
                for (let i = 0, len = vo.cfg.outlook.length; i < len; i++) {
                    let info = vo.cfg.outlook[i];
                    //let src: string = ResUtil.getSrcByOutlook(info);
                    //self.avatar.setPart(i == 0 ? SurfaceType.Body : info[0], src);
                }
                if (DEBUG) {
                    if (vo.cfg.outlook[0][0] == ConfigHead.Body && vo.cfg.outlook[0][3] == null) {
                        console.error(`NPC index：${vo.cfg.index} 没有配性别`)
                    }
                }
            }
            // let title = vo.cfg.title ? ResUtil.getTitleSrcByRes(vo.cfg.title) : null;
            // self.headMgr.setTitle(title);
        }

        protected _tmpHp: any = {};

        protected changeCampShow(): void {
            let self = this;
            let t = self._tmpHp;
            t.name = self.vo.name;
            //t.owner_name = self.vo.owner_name;
            t.camp = self.vo.camp;
            (<Scene>self.parent).dispatcher.dispatchEventWith(SceneEvent.ON_NPC_CAMP, false, t);
            //delete t.owner_name;
            delete t.camp;
            delete t.name;
        }

        updateVo() {
            super.updateVo();
            let self = this;
            //self.clickArea.clickEnabled = self.vo && self.vo.type == ObjectType.COLLECT;
        }

        public onAlloc(): void {
            super.onAlloc();
        }

        advanceTime(elapseTime: number) {
            super.advanceTime(elapseTime);
            let self = this;
            self.showByDis();
        }

        protected showByDis() {
            let self = this;
            let scene = this.parent as Scene;
            if (scene == null) return;
            let focusPt = scene.getFocusPt();
            let dis = PointUtil.distance(focusPt.x, focusPt.y, self.x, self.y);
            let isShowBody = self.avatar.dsp.parent != null;
            let range = 700;
            if (dis >= range && isShowBody) {
                self.avatar.dsp.parent.removeChild(self.avatar.dsp);
            } else if (dis < range && !isShowBody) {
                self.dsp.addChildAt(self.avatar.dsp, 1);
            }
        }

        public get dir(): number {
            return this._dir;
        }

        public set dir(value: number) {
            if (!value) {
                return;
            }

            if (this.vo && this.vo.cfg.index) {
            }
            this._dir = value;
            this.avatar.setDir(value);
        }
    }
}