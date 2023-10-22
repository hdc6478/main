namespace game.mod.hint {
    export class HintModel {
        /**
         * 红点树
         */
        public tree: HintTree;

        public openIdxToNode: {[openIdx: number] : string[]} = {};//功能idx关联红点
    }
}