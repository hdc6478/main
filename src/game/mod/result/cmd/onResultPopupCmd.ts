namespace game.mod.result {


    import s2c_instance_fin = msg.s2c_instance_fin;
    import facade = base.facade;

    export class onResultPopupCmd extends CmdBase {

        private execDict: { [scene_type: number]: Function; } = {
            [SceneType.Fuben]: this.result_fuben,/**个人副本结算界面特殊*/
            [SceneType.Doufa]: this.result_doufa,/**斗法结算界面特殊*/
            [SceneType.Yijie]: this.result_yijie,/**异界结算界面特殊*/
            [SceneType.YonghengYijie]: this.result_yijie,/**永恒异界结算界面特殊*/
            [SceneType.XianlvShilian]: this.result_xianvlShilian,//仙侣试炼
            [SceneType.Friend]: this.result_friend,/**好友切磋结算*/
            [SceneType.Abyss]: this.result_abyss,
            [SceneType.Fengmo]: this.result_fengmo,
            [SceneType.XianlvDoufa]: this.result_xianlvdoufa,
        };

        private _continueScene: number[] = [SceneType.Forbidden, SceneType.Xianta];

        /**显示继续挑战的副本， ResultWinContinueMdr需要处理下*/

        exec(n: base.GameNT): void {
            let msg: s2c_instance_fin = n.body;
            let cur_type: number = msg.type; // 场景类型
            let func = this.execDict[cur_type];
            if (func) {
                func.apply(null, [msg]);//特殊的结算界面
                return;
            }
            if (!msg.is_success) {
                gso.isBackMain = false;
                //失败统一界面
                facade.showView(ModName.Result, ResultViewType.ResultFail);
                return;
            }
            if (msg.owner) {
                //归属统一界面
                facade.showView(ModName.Result, ResultViewType.ResultBelong, msg);
                return;
            }
            this.result_win(msg)
        }

        /** 战斗胜利默认界面*/
        private result_win(msg: s2c_instance_fin): void {
            if (this._continueScene.indexOf(msg.type) > -1) {
                facade.showView(ModName.Result, ResultViewType.ResultWinContinue, msg);
                return;
            } else if (msg.type == SceneType.Yuanling) {
                // todo 元灵试炼
                facade.showView(ModName.Shilian, ShilianViewType.YuanLingResult, msg);
                return;
            }
            facade.showView(ModName.Result, ResultViewType.ResultWin, msg);/** 战斗胜利默认界面*/
        }

        /** 个人副本*/
        private result_fuben(msg: s2c_instance_fin): void {
            facade.showView(ModName.Shilian, ShilianViewType.ResultFuben, msg);
        }

        /** 斗法*/
        private result_doufa(msg: s2c_instance_fin): void {
            if (msg.is_success) {
                //胜利界面
                facade.showView(ModName.Compete, CompeteViewType.DoufaWin, msg);
            } else {
                //失败界面
                facade.showView(ModName.Compete, CompeteViewType.DoufaFail, msg);
            }
        }

        /** 异界*/
        private result_yijie(msg: s2c_instance_fin): void {
            if (!msg.reward) {
                return;
            }
            if (msg.value == 2) {
                //结算界面2
                facade.showView(ModName.Yijie, YijieViewType.YijieResult2, msg);
            } else {
                facade.showView(ModName.Yijie, YijieViewType.YijieResult, msg);
            }
        }

        /**仙侣试炼*/
        private result_xianvlShilian(msg: s2c_instance_fin): void {
            facade.showView(ModName.Xianyuan, XianyuanViewType.ShilianResult, msg);
        }

        /** 好友切磋*/
        private result_friend(msg: s2c_instance_fin): void {
            facade.showView(ModName.Friend, FriendViewType.FriendResult, msg);
        }

        private result_abyss(msg: s2c_instance_fin): void {

        }

        private result_fengmo(msg: s2c_instance_fin): void {
            facade.showView(ModName.More, MoreViewType.FengmoResult, msg);
        }

        private result_xianlvdoufa(msg: s2c_instance_fin): void {
            if (msg.is_success) {
                facade.showView(ModName.Xianyuan, XianyuanViewType.XianlvDoufaWin, msg);
            } else {
                facade.showView(ModName.Xianyuan, XianyuanViewType.XianlvDoufaFail, msg);
            }
        }
    }
}