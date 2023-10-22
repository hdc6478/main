namespace game.mod.shenling {

    import attributes = msg.attributes;
    import ShenlingConfig = game.config.ShenlingConfig;
    import ShenlingLingqiConfig = game.config.ShenlingLingqiConfig;
    import BuffConfig = game.config.BuffConfig;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class ShenLingLingQiTipsMdr extends EffectMdrBase {
        protected _view: ShenLingLingQiTipsView = this.mark("_view", ShenLingLingQiTipsView);
        protected _proxy: ShenLingLingQiProxy;

        _showArgs: IShenLingLingQiIconData;
        protected _baseAttrIds: number[];
        protected _fengyinAttrIds: number[];
        protected _suitAttrIds: number[];
        protected _suitBuffIds: number[];
        protected _costCnt: number;//单次消耗

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingLingqi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_QI_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.currentState = 'default';
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
            this._baseAttrIds = null;
            this._fengyinAttrIds = null;
            this._suitAttrIds = null;
            this._suitBuffIds = null;
        }

        protected onClickBtn(): void {
            let args = this._showArgs;
            if (!this._proxy.canActOrUp(args.slIndex, args.idx, true)) {
                return;
            }
            if (this._costCnt) {
                this._view.bar.show(this._costCnt, this._costCnt, true, 0, false, ProgressBarType.Value,
                    Handler.alloc(this, this.onceCallBack));
            }
        }

        protected onceCallBack(): void {
            this._proxy.c2s_god_brother_lingqi_click(1, this._showArgs.slIndex, this._showArgs.idx);
        }

        protected updateView(): void {
            let info = this._proxy.getLingQiInfo(this._showArgs.slIndex, this._showArgs.idx);
            this._showArgs.star = info ? info.star : 0;
            this._showArgs.isAct = !!info;

            this.updateTopView();
            this.updateMiddleView();
            this.updateBottomView();
        }

        protected updateTopView(): void {
            let args = this._showArgs;
            let cfg = GameConfig.getEquipmentCfg(args.index);
            if (!cfg) {
                return;
            }
            this._view.qualityTips.updateShow(cfg.quality);
            this._view.lingqiIcon.data = {...this._showArgs, isAct: true, hint: false};
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
        }

        protected updateMiddleView(): void {
            let args = this._showArgs;
            let info = this._proxy.getLingQiInfo(args.slIndex, args.idx);
            let lqCfg = this._proxy.getLingQiCfg(args.slIndex, info && info.star || 1);

            if (info && info.base_attrs) {
                this.updateBaseAttr(info.base_attrs);
            } else {
                if (lqCfg && lqCfg.attr_base) {
                    let attrs = RoleUtil.getAttrList(lqCfg.attr_base[args.idx - 1]);
                    if (attrs && attrs.length) {
                        this.updateBaseAttr(TextUtil.calcAttrList(attrs));
                    } else {
                        this._baseAttrIds = lqCfg.attr_base[args.idx - 1];
                    }
                }
            }

            if (info && info.fengyin_attrs) {
                this.updateFengyinAttr(info.fengyin_attrs);
            } else {
                if (lqCfg && lqCfg.attr_fengyin) {
                    let attrs = RoleUtil.getAttrList(lqCfg.attr_fengyin[args.idx - 1]);
                    if (attrs && attrs.length) {
                        this.updateFengyinAttr(TextUtil.calcAttrList(attrs));
                    } else {
                        this._fengyinAttrIds = lqCfg.attr_fengyin[args.idx - 1];
                    }
                }
            }

            let idList = this._proxy.getLingQiIdList(args.slIndex) || [];
            if (idList && idList.length) {
                let descList: string[][] = [];
                for (let i = 0; i < idList.length; i++) {
                    let info = this._proxy.getLingQiInfo(args.slIndex, i + 1);
                    let cfg = GameConfig.getEquipmentCfg(idList[i]);
                    if (!cfg) {
                        continue;
                    }
                    descList.push([TextUtil.addColor(cfg.name + `（${info ? info.star + getLanById(LanDef.soul2) : getLanById(LanDef.not_active)}）`, info && info.star ? BlackColor.GREEN : BlackColor.GRAY)]);
                }
                this._view.suitDescItem1.updateShow(descList, getLanById(LanDef.lingqi_tips2));
            }

            this._suitAttrIds = [];
            this._suitBuffIds = [];
            let cfgObj = this._proxy.getLingQiCfgObj(args.slIndex);
            for (let key in cfgObj) {
                let cfg: ShenlingLingqiConfig = cfgObj[key];
                if (!cfg) {
                    continue;
                }
                if (cfg.suit_attr) {
                    this._suitAttrIds.push(...cfg.suit_attr);
                } else if (cfg.suit_buff) {
                    this._suitBuffIds.push(...cfg.suit_buff);
                }
            }
            this.updateSuitView();
        }

        protected updateBottomView(): void {
            let args = this._showArgs;
            let nextCfg = this._proxy.getLingQiCfg(args.slIndex, args.star + 1);
            this._view.gr_cost.visible = !!nextCfg;
            this._view.img_max.visible = !this._view.gr_cost.visible;
            if (!nextCfg) {
                //满星状态
                return;
            }
            let cost = nextCfg.cost[args.idx - 1];
            this._view.icon_cost.data = cost;
            this._view.icon_cost.updateCostLab(cost);

            this._view.btn_do.label = args.star == 0 ? getLanById(LanDef.active) : getLanById(LanDef.enhance_3);
            this._view.btn_do.redPoint.visible = this._proxy.canActOrUp(args.slIndex, args.idx);

            this._costCnt = cost[1];
            this._view.bar.show(0, cost[1], false, 0, false, ProgressBarType.Value);
        }

        protected onUpdateAttr(): void {
            let baseAttrs = RoleUtil.getAttrList(this._baseAttrIds);
            if (this._baseAttrIds && baseAttrs && baseAttrs.length) {
                this.updateBaseAttr(TextUtil.calcAttrList(baseAttrs));
                this._baseAttrIds = null;
            }
            let fengyinAttrs = RoleUtil.getAttrList(this._fengyinAttrIds);
            if (this._fengyinAttrIds && fengyinAttrs && fengyinAttrs.length) {
                this.updateFengyinAttr(TextUtil.calcAttrList(fengyinAttrs));
                this._fengyinAttrIds = null;
            }

            this.updateSuitView();
        }

        //防止没有套装效果1的情况下，没有更新到套装效果2
        protected updateSuitView(): void {
            if (this._suitAttrIds && this._suitAttrIds.length) {
                let suitAttrs = RoleUtil.getAttrList(this._suitAttrIds);
                if (suitAttrs && suitAttrs.length) {
                    this.updateSuitAttrBuff();
                }
            } else {
                if (this._suitBuffIds && this._suitBuffIds.length) {
                    this.updateSuitAttrBuff();
                }
            }
        }

        protected updatePower(power: number): void {
            this._view.power.setPowerValue(power);
        }

        protected updateFengyinPower(power: number): void {
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.CommonPower], this._view.gr_power);
        }

        protected updateBaseAttr(attr: attributes): void {
            if (!attr) {
                return;
            }
            let color = this._showArgs.isAct ? BlackColor.GREEN : BlackColor.GRAY;
            let attrStr = TextUtil.getAttrTextInfos(attr, color, '\n', ' +', this._showArgs.isAct ? null : color).join('\n');
            this._view.baseAttrItem.updateShow(attrStr, getLanById(LanDef.ywl_baseAttr));
            this.updatePower(attr && attr.showpower && attr.showpower.toNumber() || 0);
        }

        protected updateFengyinAttr(attr: attributes): void {
            let isSlActed = this._proxy.isShenlingActed(this._showArgs.slIndex);
            let txt: string;
            if (isSlActed) {
                txt = TextUtil.addColor(getLanById(LanDef.lingqi_tips3), BlackColor.GREEN);
            } else {
                let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, this._showArgs.slIndex);
                txt = TextUtil.addColor(StringUtil.substitute(getLanById(LanDef.lingqi_tips4), [cfg.name]), BlackColor.RED);
            }
            let color = this._showArgs.isAct ? BlackColor.GREEN : BlackColor.GRAY;
            let attrStr = TextUtil.getAttrTextInfos(attr, color, '\n', ' +', this._showArgs.isAct ? null : color).join('\n');
            this._view.fengyinAttrItem.updateShow(attrStr, getLanById(LanDef.lingqi_tips5) + txt);

            this._view.gr_jiefengzhanli.visible = !isSlActed;
            if (!isSlActed) {
                this.updateFengyinPower(attr && attr.showpower && attr.showpower.toNumber() || 0);
            } else {
                this.updatePower(attr && attr.showpower && attr.showpower.toNumber() || 0);//已激活的神灵，只需要显示战力即可，这个战力为解封战力。
            }
        }

        protected updateSuitAttrBuff(): void {
            let descList: string[][] = [];
            let cfgObj = this._proxy.getLingQiCfgObj(this._showArgs.slIndex);
            let actedCnt = 0;
            let totalCnt = 0;
            for (let key in cfgObj) {
                let cfg: ShenlingLingqiConfig = cfgObj[key];
                if (!cfg) {
                    continue;
                }
                let isStarActed = this._proxy.isStarAllActed(this._showArgs.slIndex, cfg.index);
                if (isStarActed) {
                    actedCnt++;
                }
                let color = isStarActed ? BlackColor.GREEN : BlackColor.GRAY;
                let desc = '';
                if (cfg.suit_attr) {
                    totalCnt++;
                    let attr = TextUtil.calcAttrList(RoleUtil.getAttrList(cfg.suit_attr));
                    desc = TextUtil.getAttrTextInfos(attr, color, '\n', ' +', isStarActed ? null : color).join('\n');
                } else if (cfg.suit_buff) {
                    totalCnt++;
                    let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.suit_buff[0]);
                    if (!buffCfg) {
                        continue;
                    }
                    desc = TextUtil.addColor(buffCfg.des, isStarActed ? BlackColor.WHITE : BlackColor.GRAY);
                }
                if (!desc) {
                    continue;
                }
                let ary: string[] = [TextUtil.addColor(StringUtil.substitute(getLanById(LanDef.lingqi_tips6), [cfg.index]),
                    isStarActed ? BlackColor.WHITE : color), desc];
                descList.push(ary);
            }
            let title = StringUtil.substitute(getLanById(LanDef.lingqi_tips7), [actedCnt + '/' + totalCnt]);
            this._view.suitDescItem2.updateShow(descList, title);
        }
    }
}