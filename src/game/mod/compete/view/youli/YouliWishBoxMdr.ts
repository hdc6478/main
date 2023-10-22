namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;
    import tour_role_info = msg.tour_role_info;
    import prop_tips_data = msg.prop_tips_data;
    import TourpvpBaoxiangConfig = game.config.TourpvpBaoxiangConfig;

    export class YouliWishBoxMdr extends MdrBase {
        private _view: YouliWishBoxView = this.mark("_view", YouliWishBoxView);

        private _proxy: CompeteProxy;

        private _itemDatas: ArrayCollection;

        //private _index: number;

        protected _showArgs: tour_role_info;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._itemDatas = new ArrayCollection();
            this._view.list_award.itemRenderer = YouliWishBoxItemRender;
            this._view.list_award.dataProvider = this._itemDatas;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            // this.onNt(CompeteEvent.UPDATE_YOULI_INFO, this.updateInfo, this);
            this.onNt(CompeteEvent.UPDATE_YOULI_WISH_BOX, this.updateInfo, this);
            addEventListener(this._view.list_award, ItemTapEvent.ITEM_TAP, this.onClickItem);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.updateInfo();
        }

        protected onHide(): void {
            this._proxy.clearWishBoxAwardArr();
            super.onHide();
        }

        private initShow(): void {
            let info = this._showArgs;
            let index = info.index;
            let chaCfg: TourpvpChallengeConfig = this._proxy.getChallengeCfg(index);
            this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
            this._view.lab_tip.text = getLanById(LanDef.tourpvp_baoxiang_tips);
        }

        protected updateInfo() {
            let info = this._showArgs;
            let boxList = info.param1;
            let len = boxList.length;

            let rewards = this._proxy.getWishBoxAwardArr();
            let datas: IYouliWishBoxData[] = [];

            for(let i = 0; i < len; i++) {
                let index = boxList[i];
                let cfg: TourpvpBaoxiangConfig = getConfigByNameId(ConfigName.TourpvpBaoxiang, index);
                let reward = rewards.length > i ? rewards[i] : null;
                let status: WishBoxStatus;
                if(!reward) {
                    status = WishBoxStatus.NOT_OPEN;
                } else if(reward.status == RewardStatus.NotFinish) {
                    status = WishBoxStatus.OPEN;
                } else {
                    status = WishBoxStatus.OPEN_GOT;
                }
                let data: IYouliWishBoxData = {
                    index: index,
                    status: status,
                    descUrl: cfg.show,
                    reward: reward ? reward.props : null
                };
                datas.push(data);
            }
            this._itemDatas.replaceAll(datas);
        }

        private onClickItem(e: ItemTapEvent): void {
            let itemData: IYouliWishBoxData = e.item;
            if (itemData.status != WishBoxStatus.NOT_OPEN) {
                return;
            }
            this._proxy.c2s_tour_challenge(itemData.index, YouliType.WishBox)
        }
        
    }

    export interface IYouliWishBoxData {
        index: number;
        status: WishBoxStatus;
        descUrl: string;
        reward: prop_tips_data;
    }
}