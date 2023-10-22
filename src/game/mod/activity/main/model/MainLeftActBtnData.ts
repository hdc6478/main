namespace game.mod.activity {

    import PoolObject = base.PoolObject;

    /** 左边活动数据（直购、非直购）*/
    export class MainLeftActBtnData implements PoolObject {
        /** 图标 */
        icon: string;
        /** 红点 */
        showHint: boolean;
        /** 是否是直购 */
        isLimit: number;

        isShowEff: boolean;

        /**活动id*/
        index:number;

        dispose(): void {
        }

        onAlloc(): void {
        }

        onRelease(): void {
            let self = this;
            self.icon = null;
            self.showHint = null;
            self.isLimit = null;
            self.isShowEff = null;
            self.index = 0;
        }
    }
}