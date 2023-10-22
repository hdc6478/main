namespace game.mod.xianyuan {

    import s2c_instance_fin = msg.s2c_instance_fin;

    export class XianlvDoufaFailMdr extends XianlvDoufaWinMdr {
        protected _view: XianlvDoufaFailView = this.mark("_view", XianlvDoufaFailView);

        protected _type: ResultType = ResultType.Fail;
    }
}