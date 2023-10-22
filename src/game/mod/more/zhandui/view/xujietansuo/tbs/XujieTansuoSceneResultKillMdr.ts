namespace game.mod.more {

    import Handler = base.Handler;
    import s2c_zhandui_legion_result_info = msg.s2c_zhandui_legion_result_info;
    import LanDef = game.localization.LanDef;

    export class XujieTansuoSceneResultKillMdr extends MdrBase {
        private _view: XujieTansuoSceneResultKillView = this.mark("_view", XujieTansuoSceneResultKillView);
        private _proxy: XujieTansuoProxy;
        _showArgs: s2c_zhandui_legion_result_info;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            super.onHide();
            this.sendNt(MoreEvent.ON_TBS_FIGHT_HIDE);//todo
        }

        private updateView(): void {
            let data = this._showArgs;

            let name = data.role_info ? data.role_info.name : '';
            let targetName = data.target_name;
            let str = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips25), [TextUtil.addColor(name, BlackColor.ORANGE), targetName]);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
            this._view.lb_damage.text = data.damage_value.toString();

            //挑战奖励
            this._view.resultReward0.updateRewardList(data.challenge_rewards || []);
            //击杀奖励
            this._view.resultReward1.updateRewardList(data.kill_rewards || []);
        }
    }
}