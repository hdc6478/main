declare namespace game.mod.result {
    class ResultWinContinueView extends eui.Component {
        resultHurt: ResultHurt;
        resultReward: ResultReward;
        btn_exit: game.mod.Btn;
        btn_go: game.mod.Btn;
        grp_eft: eui.Group;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.result {
    class ResultMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.result {
    class ResultModel {
    }
}
declare namespace game.mod.result {
    import IProxy = base.IProxy;
    class ResultProxy extends ProxyBase implements IProxy {
        private _model;
        is_success: boolean;
        getModel(): ResultModel;
        initialize(): void;
        /**结算信息返回*/
        private onResultBack;
        /**
         * 继续挑战
         */
        c2s_next_scene(): void;
    }
}
declare namespace game.mod.result {
    class ResultBelongView extends eui.Component {
        head: Head;
        lab_name: eui.Label;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        grp_eft: eui.Group;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.result {
    class ResultFailView extends eui.Component {
        closeTips: game.mod.CloseTips;
        icon_group: eui.Group;
        grp_eft: eui.Group;
        constructor();
    }
}
declare namespace game.mod.result {
    class ResultPassView extends eui.Component {
        grp_1: eui.Group;
        grp_2: eui.Group;
        lab_func1: eui.Label;
        lab_func2: eui.Label;
        closeTips: game.mod.CloseTips;
        constructor();
    }
}
declare namespace game.mod.result {
    class onResultPopupCmd extends CmdBase {
        private execDict;
        private _continueScene;
        /**显示继续挑战的副本， ResultWinContinueMdr需要处理下*/
        exec(n: base.GameNT): void;
        /** 战斗胜利默认界面*/
        private result_win;
        /** 个人副本*/
        private result_fuben;
        /** 斗法*/
        private result_doufa;
        /** 异界*/
        private result_yijie;
        /**仙侣试炼*/
        private result_xianvlShilian;
        /** 好友切磋*/
        private result_friend;
        private result_abyss;
        private result_fengmo;
        private result_xianlvdoufa;
    }
}
declare namespace game.mod.result {
    class ResultWinView extends eui.Component {
        resultHurt: ResultHurt;
        resultReward: ResultReward;
        closeTips: game.mod.CloseTips;
        grp_eft: eui.Group;
        grp_eft2: eui.Group;
        constructor();
    }
}
declare namespace game.mod.result {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ResultBelongMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateBelong;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
declare namespace game.mod.result {
    class ResultFailMdr extends EffectMdrBase {
        private _view;
        private _sceneProxy;
        private _btnList;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected addBtn(data: IJumpData, jumpId: number): void;
        protected jumpFunc(e: egret.Event): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.result {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ResultPassMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        private _passProxy;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.result {
    import UpdateItem = base.UpdateItem;
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ResultWinContinueMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        protected _showArgs: s2c_instance_fin;
        private _time;
        private _proxy;
        private _shilianProxy;
        private _showExit;
        private _hasOper;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        update(time: base.Time): void;
        private updateTimeToClose;
        private updateWinPassShow;
        private updateReward;
        private updateHurtList;
        private onClickExit;
        private onClickGo;
        /**是否只显示退出按钮，满级或者小于推荐战力*/
        private isShowExit;
    }
}
declare namespace game.mod.result {
    import s2c_instance_fin = msg.s2c_instance_fin;
    class ResultWinMdr extends EffectMdrBase {
        private _view;
        protected _showArgs: s2c_instance_fin;
        constructor();
        protected onInit(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateReward;
        private updateHurtList;
        /**********************奖励表现相关**********************/
        private onRewardTweenEnd;
    }
}
