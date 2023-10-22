namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class KuafuDoufaScoreItem extends BaseListenerRenderer {
    private lab_desc: eui.Label;
    private list_reward: eui.List;
    private img_not: eui.Image;
    private img_draw: eui.Image;
    private btn_draw: game.mod.Btn;

    private _proxy: CompeteProxy;
    private _rewardList: ArrayCollection;

    public data: KuafuScoreData;

    protected onAddToStage(): void {
        super.onAddToStage();
        this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
        this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClick, this);

        this._rewardList = new ArrayCollection();
        this.list_reward.itemRenderer = Icon;
        this.list_reward.dataProvider = this._rewardList;
    }

    protected dataChanged(): void {
            if(!this.data){
            return;
        }

        let cfg = this.data.cfg;
        let status = this.data.status;

        let maxCnt = cfg.count;
        let curCnt = this._proxy.myScore;
        let desc = StringUtil.substitute(getLanById(LanDef.kuafu_doufa_tips9), [maxCnt])
            +TextUtil.addColor("（" + curCnt + "/" + maxCnt + "）", curCnt >= maxCnt ? WhiteColor.GREEN : WhiteColor.RED);
        this.lab_desc.textFlow = TextUtil.parseHtml(desc);

        this._rewardList.source = cfg.reward.slice(0, 3);

        let notFinish = status == RewardStatus.NotFinish;
        let canDraw = status == RewardStatus.Finish;
        let hasDraw = status == RewardStatus.Draw;
        this.img_not.visible = notFinish;
        this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
        this.img_draw.visible = hasDraw;
    }

    private onClick(): void {
            if(!this.data){
            return;
        }
        this._proxy.c2s_kuafudoufa_click(KuafuDoufaOpType.ScoreReward);
    }
    }
}
