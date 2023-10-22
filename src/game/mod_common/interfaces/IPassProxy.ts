namespace game.mod {

    import IProxy = base.IProxy;

    export interface IPassProxy extends IProxy {

        
        readonly passNextIdx: number;
        
        readonly passSceneChan: number;
        
        readonly passMaxIdx: number;

        readonly target_wave_cnt: number;
        
        readonly now_wave_cnt: number;
        
        curIndex: number;
        
        passIsAuto: boolean;

        c2s_mainline_task_auto(bool: boolean): void;

        readonly curStep: number;/**闯关关卡数*/

        changeIdxToNum(idx: number): number;

        getStepByIdx(stepIdx: number): number;

        challengeBoss: boolean;//重置挑战挂机boss

        c2s_mainline_enter(): void;

        getShowIndex():number;

        getIcon(index:number):string;

        getOpenTxt(index:number):string;

        onCheckMainShow():boolean;
    }

}