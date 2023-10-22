namespace game.mod.yijie {

    export class SeaBossSceneView extends eui.Component {
        public img_bg: eui.Image;
        public grp_monster: eui.Group;
        public shenling0: SeaShenlingItem;
        public shenling1: SeaShenlingItem;
        public shenling2: SeaShenlingItem;
        public shenling3: SeaShenlingItem;
        public grp_player: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaBossSceneSkin";
        }

        private _infos: {[pos: number]: number} = {};//存储激活的神灵信息，pos:0~3，存的是神灵index
        private _posXList: {[pos: number]: number} = {};//存储未激活神灵的X坐标

        public setIndex(pos: number, index: number): void {
            this._infos[pos] = index;
        }
        public getInfos(): {[pos: number]: number} {
            return this._infos;
        }
        public getIndex(pos: number): number {
            return this._infos[pos];
        }

        public setPosX(pos: number, posX: number): void {
            this._posXList[pos] = posX;
        }
        public getPosX(pos: number): number {
            return this._posXList[pos];
        }
    }

}