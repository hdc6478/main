var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliWishBoxItemRender = /** @class */ (function (_super) {
                __extends(YouliWishBoxItemRender, _super);
                function YouliWishBoxItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YouliWishBoxItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                YouliWishBoxItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.currentState = this.data.status;
                    this.img_desc.source = this.data.descUrl;
                    if (this.data.reward) {
                        this.icon.setData(this.data.reward);
                    }
                };
                return YouliWishBoxItemRender;
            }(mod.BaseListenerRenderer));
            compete.YouliWishBoxItemRender = YouliWishBoxItemRender;
            __reflect(YouliWishBoxItemRender.prototype, "game.mod.compete.YouliWishBoxItemRender");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var CompeteMod = /** @class */ (function (_super) {
                __extends(CompeteMod, _super);
                function CompeteMod() {
                    return _super.call(this, "52" /* Compete */) || this;
                }
                CompeteMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                CompeteMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(200 /* Compete */, compete.CompeteProxy);
                };
                CompeteMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* CompeteMain */, compete.CompeteMainMdr);
                    this.regMdr("02" /* YouliMain */, compete.YouliMainMdr);
                    this.regMdr("03" /* YouliAwardMain */, compete.YouliAwardMainMdr);
                    this.regMdr("04" /* YouliScoreMain */, compete.YouliScoreMainMdr);
                    this.regMdr("05" /* YouliRankMain */, compete.YouliRankMainMdr);
                    this.regMdr("06" /* YouliWishBox */, compete.YouliWishBoxMdr);
                    this.regMdr("07" /* YouliTreasure */, compete.YouliTreasureMdr);
                    this.regMdr("09" /* YouliScoreKiller */, compete.YouliScoreKillerMdr);
                    this.regMdr("08" /* YouliSpecialKiller */, compete.YouliSpecialKillerMdr);
                    this.regMdr("10" /* YouliKillerFight */, compete.YouliKillerFightMdr);
                    this.regMdr("11" /* YouliDati */, compete.YouliDatiMdr);
                    this.regMdr("12" /* YouliDatiResult */, compete.YouliDatiResultMdr);
                    this.regMdr("19" /* DoufaMain */, compete.DoufaMainMdr);
                    this.regMdr("21" /* DoufaVs */, compete.DoufaVsMdr);
                    this.regMdr("22" /* DoufaQuickWin */, compete.DoufaQuickWinMdr);
                    this.regMdr("20" /* DoufaRewardMain */, compete.DoufaRewardMainMdr);
                    this.regMdr("24" /* DoufaRecord */, compete.DoufaRecordMdr);
                    this.regMdr("23" /* DoufaRankMain */, compete.DoufaRankMainMdr);
                    this.regMdr("25" /* DoufaWin */, compete.DoufaWinMdr);
                    this.regMdr("26" /* DoufaFail */, compete.DoufaFailMdr);
                    this.regMdr("27" /* DoufaFinals */, compete.DoufaFinalsMdr);
                    this.regMdr("28" /* DoufaGuess */, compete.DoufaGuessMdr);
                    this.regMdr("41" /* KuafuDoufaAchieve */, compete.KuafuDoufaAchieveMdr);
                    this.regMdr("42" /* KuafuDoufaRank */, compete.KuafuDoufaRankMdr);
                    this.regMdr("43" /* KuafuDoufaScore */, compete.KuafuDoufaScoreMdr);
                    this.regMdr("44" /* KuafuDoufaSkill */, compete.KuafuDoufaSkillMdr);
                    this.regMdr("46" /* KuafuDoufaTips */, compete.KuafuDoufaTipsMdr);
                    this.regMdr("40" /* KuafuDoufaRankMain */, compete.KuafuDoufaRankMainMdr);
                    this.regMdr("45" /* KuafuDoufaScene */, compete.KuafuDoufaSceneMdr);
                };
                return CompeteMod;
            }(game.ModBase));
            compete.CompeteMod = CompeteMod;
            __reflect(CompeteMod.prototype, "game.mod.compete.CompeteMod");
            gso.modCls.push(CompeteMod);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var s2c_tour_update_list = msg.s2c_tour_update_list;
            var s2c_tour_wish_get_list = msg.s2c_tour_wish_get_list;
            var c2s_tour_refresh_defender = msg.c2s_tour_refresh_defender;
            var c2s_tour_challenge = msg.c2s_tour_challenge;
            var c2s_tour_buy_times = msg.c2s_tour_buy_times;
            var c2s_tour_stage_get_list = msg.c2s_tour_stage_get_list;
            var s2c_tour_stage_get_list = msg.s2c_tour_stage_get_list;
            var c2s_tour_stage_buy = msg.c2s_tour_stage_buy;
            var c2s_tour_fuli_get_list = msg.c2s_tour_fuli_get_list;
            var s2c_tour_fuli_get_list = msg.s2c_tour_fuli_get_list;
            var c2s_tour_fuli_buy = msg.c2s_tour_fuli_buy;
            var s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
            var c2s_pvp_battle_get_player_challenge_info = msg.c2s_pvp_battle_get_player_challenge_info;
            var c2s_pvp_battle_rank_challenge = msg.c2s_pvp_battle_rank_challenge;
            var c2s_pvp_battle_keep_win_rewards = msg.c2s_pvp_battle_keep_win_rewards;
            var c2s_pvp_battle_win_count_rewards = msg.c2s_pvp_battle_win_count_rewards;
            var c2s_pvp_battle_buy_count = msg.c2s_pvp_battle_buy_count;
            var c2s_pvp_battle_get_rank_info = msg.c2s_pvp_battle_get_rank_info;
            var c2s_pvp_battle_get_pk_info = msg.c2s_pvp_battle_get_pk_info;
            var s2c_pvp_battle_get_player_challenge_info = msg.s2c_pvp_battle_get_player_challenge_info;
            var s2c_pvp_battle_more_power_end = msg.s2c_pvp_battle_more_power_end;
            var s2c_pvp_battle_base_info = msg.s2c_pvp_battle_base_info;
            var s2c_pvp_battle_rank_info = msg.s2c_pvp_battle_rank_info;
            var s2c_pvp_battle_pk_info = msg.s2c_pvp_battle_pk_info;
            var facade = base.facade;
            var c2s_pvp_battle_group_pk_info = msg.c2s_pvp_battle_group_pk_info;
            var s2c_pvp_battle_group_pk = msg.s2c_pvp_battle_group_pk;
            var c2s_pvp_battle_guess = msg.c2s_pvp_battle_guess;
            var s2c_pvp_battle_guess_list = msg.s2c_pvp_battle_guess_list;
            var TimeMgr = base.TimeMgr;
            var c2s_tour_win_get_list = msg.c2s_tour_win_get_list;
            var c2s_tour_dati_select = msg.c2s_tour_dati_select;
            var s2c_tour_dati_select = msg.s2c_tour_dati_select;
            var Handler = base.Handler;
            var c2s_kuafudoufa_click = msg.c2s_kuafudoufa_click;
            var s2c_kuafudoufa_rank_info = msg.s2c_kuafudoufa_rank_info;
            var s2c_kuafudoufa_zhanchang_paiming = msg.s2c_kuafudoufa_zhanchang_paiming;
            var s2c_kuafudoufa_base_info = msg.s2c_kuafudoufa_base_info;
            var s2c_kuafudoufa_score_info = msg.s2c_kuafudoufa_score_info;
            var s2c_kuafudoufa_zhanchang_jifen = msg.s2c_kuafudoufa_zhanchang_jifen;
            var s2c_kuafudoufa_boss_info = msg.s2c_kuafudoufa_boss_info;
            var s2c_kuafudoufa_attack_status = msg.s2c_kuafudoufa_attack_status;
            var s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
            var c2s_kuafudoufa_scene_use_buff = msg.c2s_kuafudoufa_scene_use_buff;
            var s2c_kuafudoufa_scene_buff_index_cd = msg.s2c_kuafudoufa_scene_buff_index_cd;
            var CompeteProxy = /** @class */ (function (_super) {
                __extends(CompeteProxy, _super);
                function CompeteProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // public getModel(): CompeteModel {
                //     return this._model;
                // }
                CompeteProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new compete.CompeteModel();
                    this.onProto(s2c_tour_update_list, this.s2c_tour_update_list, this);
                    this.onProto(s2c_tour_wish_get_list, this.s2c_tour_wish_get_list, this);
                    this.onProto(s2c_tour_stage_get_list, this.s2c_tour_stage_get_list, this);
                    this.onProto(s2c_tour_fuli_get_list, this.s2c_tour_fuli_get_list, this);
                    this.onProto(s2c_city_war_fight_update, this.s2c_city_war_fight_update, this);
                    this.onProto(s2c_tour_dati_select, this.s2c_tour_dati_select, this);
                    this.onProto(s2c_pvp_battle_get_player_challenge_info, this.s2c_pvp_battle_get_player_challenge_info, this);
                    this.onProto(s2c_pvp_battle_more_power_end, this.s2c_pvp_battle_more_power_end, this);
                    this.onProto(s2c_pvp_battle_base_info, this.s2c_pvp_battle_base_info, this);
                    this.onProto(s2c_pvp_battle_rank_info, this.s2c_pvp_battle_rank_info, this);
                    this.onProto(s2c_pvp_battle_pk_info, this.s2c_pvp_battle_pk_info, this);
                    this.onProto(s2c_pvp_battle_group_pk, this.s2c_pvp_battle_group_pk, this);
                    this.onProto(s2c_pvp_battle_guess_list, this.s2c_pvp_battle_guess_list, this);
                    this.onProto(s2c_kuafudoufa_rank_info, this.s2c_kuafudoufa_rank_info, this);
                    this.onProto(s2c_kuafudoufa_zhanchang_paiming, this.s2c_kuafudoufa_zhanchang_paiming, this);
                    this.onProto(s2c_kuafudoufa_base_info, this.s2c_kuafudoufa_base_info, this);
                    this.onProto(s2c_kuafudoufa_score_info, this.s2c_kuafudoufa_score_info, this);
                    this.onProto(s2c_kuafudoufa_zhanchang_jifen, this.s2c_kuafudoufa_zhanchang_jifen, this);
                    this.onProto(s2c_kuafudoufa_boss_info, this.s2c_kuafudoufa_boss_info, this);
                    this.onProto(s2c_kuafudoufa_attack_status, this.s2c_kuafudoufa_attack_status, this);
                    this.onProto(s2c_scene_kill_notice, this.s2c_scene_kill_notice, this);
                    this.onProto(s2c_kuafudoufa_scene_buff_index_cd, this.s2c_kuafudoufa_scene_buff_index_cd, this);
                };
                CompeteProxy.prototype.c2s_tour_win_get_list = function (index) {
                    var msg = new c2s_tour_win_get_list();
                    msg.index = index;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_tour_update_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.curBuyCnt = msg.buy;
                    this._model.curFightTimes = msg.done_times;
                    this._model.nextFightTime = msg.next_time;
                    this._model.rankEndTime = msg.rank_end_time;
                    this._model.youliWinCnt = msg.today_win_cnt;
                    this._model.youliWinList = msg.award_list || [];
                    if (msg.top_rank) {
                        for (var _i = 0, _a = msg.top_rank; _i < _a.length; _i++) {
                            var rank = _a[_i];
                            this._model.topRank[rank.pos] = rank;
                        }
                    }
                    this._model.type = msg.type;
                    this._model.giftIndex = msg.gift_index;
                    this.checkAutoChallengeYouli();
                    this.updateYouliHint();
                    this.sendNt("update_youli_info" /* UPDATE_YOULI_INFO */);
                };
                Object.defineProperty(CompeteProxy.prototype, "youliWinCnt", {
                    get: function () {
                        return this._model.youliWinCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getYouliWinRewardStatus = function (cfg) {
                    var rewards = this._model.youliWinList;
                    var index = cfg.index;
                    if (rewards.indexOf(index) >= 0) {
                        return 2 /* Draw */;
                    }
                    if (this.youliWinCnt >= cfg.count) {
                        return 1 /* Finish */;
                    }
                    return 0 /* NotFinish */;
                };
                CompeteProxy.prototype.s2c_tour_wish_get_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.wishBoxAwardArr = msg.list;
                    this.sendNt("update_youli_wish_box" /* UPDATE_YOULI_WISH_BOX */);
                };
                CompeteProxy.prototype.c2s_tour_challenge = function (pos, type) {
                    if (type === void 0) { type = 0 /* Normal */; }
                    var req = new c2s_tour_challenge();
                    req.rank_no = pos;
                    req.type = type;
                    this.sendProto(req);
                };
                CompeteProxy.prototype.c2s_tour_refresh_defender = function () {
                    var req = new c2s_tour_refresh_defender();
                    this.sendProto(req);
                };
                CompeteProxy.prototype.c2s_tour_buy_times = function (cnt) {
                    var req = new c2s_tour_buy_times();
                    req.cnt = cnt;
                    this.sendProto(req);
                };
                CompeteProxy.prototype.c2s_tour_stage_get_list = function () {
                    var req = new c2s_tour_stage_get_list();
                    this.sendProto(req);
                };
                CompeteProxy.prototype.s2c_tour_stage_get_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.challengeCnt = msg.challenge_cnt;
                    if (msg.list) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var awd = _a[_i];
                            this._model.stepAwards[awd.index.toString()] = awd;
                        }
                    }
                    this.updateYouliHint();
                    this.sendNt("update_youli_award" /* UPDATE_YOULI_AWARD */);
                };
                CompeteProxy.prototype.c2s_tour_stage_buy = function (index) {
                    var req = new c2s_tour_stage_buy();
                    req.index = index;
                    this.sendProto(req);
                };
                CompeteProxy.prototype.c2s_tour_fuli_get_list = function () {
                    var req = new c2s_tour_fuli_get_list();
                    this.sendProto(req);
                };
                CompeteProxy.prototype.s2c_tour_fuli_get_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.dayScore = msg.tourpvp_day_score;
                    if (msg.list) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var awd = _a[_i];
                            this._model.scoreAwards[awd.index.toString()] = awd;
                        }
                    }
                    this.updateYouliHint();
                    this.sendNt("update_youli_score" /* UPDATE_YOULI_SCORE */);
                };
                CompeteProxy.prototype.c2s_tour_fuli_buy = function (index) {
                    var req = new c2s_tour_fuli_buy();
                    req.index = index;
                    this.sendProto(req);
                };
                CompeteProxy.prototype.s2c_city_war_fight_update = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.fightData = msg;
                    this.sendNt("update_youli_killer_fight" /* UPDATE_YOULI_KILLER_FIGHT */);
                };
                Object.defineProperty(CompeteProxy.prototype, "curBuyCnt", {
                    /**
                     * 今日已购买次数
                     */
                    get: function () {
                        return this._model.curBuyCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "curFightTimes", {
                    /**
                     * 已挑战次数
                     */
                    get: function () {
                        return this._model.curFightTimes;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "refreshCost", {
                    /**
                     * 刷新1次的花费
                     */
                    get: function () {
                        var cfg = game.GameConfig.getParamConfigById("youli_buy_cost");
                        return cfg.value[0][1];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "maxBuyFightTimes", {
                    /**
                     * 最大可购买挑战次数
                     */
                    get: function () {
                        var cfg = game.GameConfig.getParamConfigById("youli_value");
                        return cfg.value[2];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "maxFightTimes", {
                    /**
                     * 最大挑战次数
                     */
                    get: function () {
                        var cfg = game.GameConfig.getParamConfigById("youli_value");
                        return cfg.value[1]; // + this._model.curBuyCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "remainTimes", {
                    get: function () {
                        return this.maxFightTimes - this.curFightTimes || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getRankCfg = function (rankNo) {
                    var rankCfg = game.getConfigListByName("tourpvp_paiming.json" /* TourpvpPaiming */);
                    for (var _i = 0, rankCfg_1 = rankCfg; _i < rankCfg_1.length; _i++) {
                        var rank = rankCfg_1[_i];
                        if (rankNo >= rank.rank_section[0] && rankNo <= rank.rank_section[1]) {
                            return rank;
                        }
                    }
                    return null;
                };
                CompeteProxy.prototype.getChallengeCfg = function (id) {
                    var cfg = game.getConfigByNameId("tourpvp_challenge.json" /* TourpvpChallenge */, id);
                    return cfg;
                };
                CompeteProxy.prototype.getPreciousCfg = function (id) {
                    var cfg = game.getConfigByNameId("tourpvp_precious.json" /* TourpvpPrecious */, id);
                    return cfg;
                };
                Object.defineProperty(CompeteProxy.prototype, "nextFightTime", {
                    /**
                     * 下次挑战次数恢复1次的时间
                     */
                    get: function () {
                        return this._model.nextFightTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "rankEndTime", {
                    /**
                     * 排行榜结束时间戳
                     */
                    get: function () {
                        return this._model.rankEndTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "myRank", {
                    /**
                     * 我的名次
                     */
                    get: function () {
                        var rankInfo = mod.RankUtil.getRankInfo(1002 /* Type4 */);
                        var rankNo = rankInfo && rankInfo.my_info ? rankInfo.my_info.rank_no : 0;
                        return rankNo;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 站位信息
                 */
                CompeteProxy.prototype.getTopRank = function (pos) {
                    return this._model.topRank[pos];
                };
                Object.defineProperty(CompeteProxy.prototype, "type", {
                    /**
                     * 玩法类型，0 正常 1 宝箱  2宝藏 3异形 4杀手
                     */
                    get: function () {
                        return this._model.type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "giftIndex", {
                    /**
                     * 奖励宝藏对应的礼包id
                     */
                    get: function () {
                        return this._model.giftIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "challengeCnt", {
                    /**
                     * 累计完成游历次数
                     */
                    get: function () {
                        return this._model.challengeCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 可领取、已领取的阶段奖励列表
                 */
                CompeteProxy.prototype.getStepAward = function (index) {
                    return this._model.stepAwards[index];
                };
                Object.defineProperty(CompeteProxy.prototype, "dayScore", {
                    /**
                     * 今日获得的分数
                     */
                    get: function () {
                        return this._model.dayScore || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 可领取、已领取的积分奖励列表
                 */
                CompeteProxy.prototype.getScoreAward = function (index) {
                    return this._model.scoreAwards[index];
                };
                /**
                 * 已领取的许愿奖励列表
                 */
                CompeteProxy.prototype.getWishBoxAwardArr = function () {
                    return this._model.wishBoxAwardArr;
                };
                CompeteProxy.prototype.clearWishBoxAwardArr = function () {
                    this._model.wishBoxAwardArr = [];
                };
                Object.defineProperty(CompeteProxy.prototype, "datiCfg", {
                    get: function () {
                        return this._model.datiCfg;
                    },
                    set: function (cfg) {
                        this._model.datiCfg = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "fightData", {
                    /**
                     * 异形、积分杀手战斗数据
                     */
                    get: function () {
                        return this._model.fightData;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.updateYouliHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670121 /* Youli */)) {
                        return;
                    }
                    var challengeHint = this.remainTimes > 0;
                    mod.HintMgr.setHint(challengeHint, this._model.youliChallengeHint, 1041670121 /* Youli */);
                    var hint = this.getYouliHint() || challengeHint;
                    mod.HintMgr.setHint(hint, this._model.youliHint);
                };
                CompeteProxy.prototype.getYouliHint = function () {
                    var hint = this.getYouliAwardHint() || this.getYouliScoreHint() || this.checkYouliWinRewardHint();
                    return hint;
                };
                CompeteProxy.prototype.getYouliAwardHint = function () {
                    var hint = false;
                    var awds = this._model.stepAwards;
                    for (var idx in awds) {
                        var awd = awds[idx];
                        if (awd.status == 1 /* Finish */) { // 可领取
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                CompeteProxy.prototype.getYouliScoreHint = function () {
                    var hint = false;
                    var awds = this._model.scoreAwards;
                    for (var idx in awds) {
                        var awd = awds[idx];
                        if (awd.status == 1 /* Finish */) { // 可领取
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                CompeteProxy.prototype.checkYouliWinRewardHint = function () {
                    var cfgList = game.getConfigListByName("tourpvp_win.json" /* TourpvpWin */);
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        var status = this.getYouliWinRewardStatus(cfg);
                        var canDraw = status == 1 /* Finish */;
                        if (canDraw) {
                            return true;
                        }
                    }
                    return false;
                };
                CompeteProxy.prototype.c2s_tour_dati_select = function (index) {
                    var msg = new c2s_tour_dati_select();
                    msg.index = index;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_tour_dati_select = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.sendNt("update_youli_dati" /* UPDATE_YOULI_DATI */);
                    facade.showView("52" /* Compete */, "12" /* YouliDatiResult */, msg);
                };
                //玩法总次数获取
                CompeteProxy.prototype.getCurVal = function () {
                    return this.remainTimes + mod.BagUtil.getPropCntByIdx(1450705001 /* YouliJuanzhou */); //每日剩余次数+物品剩余数量
                };
                CompeteProxy.prototype.getCurValDoufa = function () {
                    return this.cnt + mod.BagUtil.getPropCntByIdx(1450706001 /* DoufaJuanzhou */); //每日剩余次数+物品剩余数量
                };
                /************************** 斗法 *************************/
                CompeteProxy.prototype.c2s_pvp_battle_get_player_challenge_info = function () {
                    var msg = new c2s_pvp_battle_get_player_challenge_info();
                    this.sendProto(msg);
                    this.clearRecordList(); //挑战时清除战报信息
                };
                CompeteProxy.prototype.c2s_pvp_battle_rank_challenge = function () {
                    var msg = new c2s_pvp_battle_rank_challenge();
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_keep_win_rewards = function (index) {
                    var msg = new c2s_pvp_battle_keep_win_rewards();
                    msg.index = index;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_win_count_rewards = function (index) {
                    var msg = new c2s_pvp_battle_win_count_rewards();
                    msg.index = index;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_buy_count = function (count) {
                    var msg = new c2s_pvp_battle_buy_count();
                    msg.buycount = count;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_get_rank_info = function (rankType) {
                    var msg = new c2s_pvp_battle_get_rank_info();
                    msg.rank_type = rankType;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_get_pk_info = function () {
                    if (this.recordList && this.recordList.length) {
                        return; //存在战报时不请求新战报
                    }
                    var msg = new c2s_pvp_battle_get_pk_info();
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.c2s_pvp_battle_group_pk_info = function () {
                    var msg = new c2s_pvp_battle_group_pk_info();
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_pvp_battle_get_player_challenge_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.is_success) {
                        this.sendNt("doufa_reset_challenge" /* DOUFA_RESET_CHALLENGE */);
                        this.resetAutoChallengeDoufa();
                        return;
                    }
                    facade.showView("52" /* Compete */, "21" /* DoufaVs */, msg.player_info);
                };
                CompeteProxy.prototype.s2c_pvp_battle_more_power_end = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    facade.showView("52" /* Compete */, "22" /* DoufaQuickWin */, msg);
                };
                CompeteProxy.prototype.s2c_pvp_battle_base_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (!this._model.info || msg.oper == 1) {
                        this._model.info = msg;
                    }
                    else {
                        for (var k in msg) {
                            this._model.info[k] = msg[k];
                        }
                    }
                    this.checkAutoChallengeDoufa();
                    this.updateDoufaHint();
                    this.sendNt("update_doufa_info" /* UPDATE_DOUFA_INFO */);
                };
                Object.defineProperty(CompeteProxy.prototype, "score", {
                    // public get info(): s2c_pvp_battle_base_info {
                    //     return this._model.info;
                    // }
                    //我的积分
                    get: function () {
                        return this._model.info && this._model.info.score || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "lv", {
                    //我的段位
                    get: function () {
                        return this.getLv(this.score);
                    },
                    enumerable: true,
                    configurable: true
                });
                //通过积分获取段位
                CompeteProxy.prototype.getLv = function (score) {
                    var cfgList = game.getConfigListByName("magic_up.json" /* MagicUp */);
                    var len = cfgList.length;
                    for (var i = len - 1; i >= 0; --i) {
                        var cfg = cfgList[i];
                        if (score >= cfg.score) {
                            return cfg.index;
                        }
                    }
                    return 1;
                };
                //获取段位最大积分
                CompeteProxy.prototype.getMaxScore = function () {
                    var lv = this.lv;
                    var cfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, lv);
                    var nextLv = lv + 1;
                    var nextCfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, nextLv);
                    var isMaxLv = !nextCfg; //最高段位
                    return isMaxLv ? cfg.score : nextCfg.score;
                };
                Object.defineProperty(CompeteProxy.prototype, "winCnt", {
                    get: function () {
                        return this._model.info && this._model.info.keepwin_num || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "curCnt", {
                    get: function () {
                        return this._model.info && this._model.info.use_count || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "cnt", {
                    get: function () {
                        return this._model.info && this._model.info.count || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "buyCnt", {
                    get: function () {
                        return this._model.info && this._model.info.buycount || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "winRewards", {
                    get: function () {
                        return this._model.info && this._model.info.keep_win_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "rewards", {
                    get: function () {
                        return this._model.info && this._model.info.count_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getRewardStatus = function (index) {
                    var rewards = this.rewards;
                    for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                        var info = rewards_1[_i];
                        if (info.index.toNumber() == index) {
                            return info.status;
                        }
                    }
                    return 0 /* NotFinish */;
                };
                CompeteProxy.prototype.getWinRewardStatus = function (index) {
                    var rewards = this.winRewards;
                    for (var _i = 0, rewards_2 = rewards; _i < rewards_2.length; _i++) {
                        var info = rewards_2[_i];
                        if (info.index.toNumber() == index) {
                            return info.status;
                        }
                    }
                    return 0 /* NotFinish */;
                };
                CompeteProxy.prototype.s2c_pvp_battle_rank_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    //数据分开储存，巅峰排行榜数据不做频繁请求
                    switch (msg.rank_type) {
                        case 1 /* Type1 */:
                            this._model.rankList1 = msg.server_player_ranks || [];
                            this._model.topInfo1 = msg.top_one;
                            if (msg.endtime) {
                                this._model.endTime1 = msg.endtime.toNumber();
                            }
                            break;
                        case 2 /* Type2 */:
                            this._model.rankList2 = msg.server_player_ranks || [];
                            this._model.topInfo2 = msg.top_one;
                            if (msg.endtime) {
                                this._model.endTime2 = msg.endtime.toNumber();
                            }
                            break;
                        case 3 /* Type3 */:
                            this._model.rankList3 = msg.server_player_ranks || [];
                            this._model.topInfo3 = msg.top_one;
                            if (msg.endtime) {
                                this._model.endTime3 = msg.endtime.toNumber();
                            }
                            break;
                    }
                    this.sendNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */);
                };
                CompeteProxy.prototype.getRankList = function (type) {
                    switch (type) {
                        case 1 /* Type1 */:
                            return this._model.rankList1;
                        case 2 /* Type2 */:
                            return this._model.rankList2;
                    }
                    return this._model.rankList3;
                };
                CompeteProxy.prototype.getMyRankInfo = function (type) {
                    var ranks = this.getRankList(type);
                    for (var _i = 0, ranks_1 = ranks; _i < ranks_1.length; _i++) {
                        var info = ranks_1[_i];
                        if (info.role_id.eq(game.RoleVo.ins.role_id)) {
                            return info;
                        }
                    }
                    return null;
                };
                //重置巅峰排行榜数据
                CompeteProxy.prototype.resetTopRank = function () {
                    this._model.rankList3 = [];
                };
                CompeteProxy.prototype.getTopInfo = function (type) {
                    switch (type) {
                        case 1 /* Type1 */:
                            return this._model.topInfo1;
                        case 2 /* Type2 */:
                            return this._model.topInfo2;
                    }
                    return this._model.topInfo3;
                };
                CompeteProxy.prototype.getEndTime = function (type) {
                    switch (type) {
                        case 1 /* Type1 */:
                            // if(!this._model.endTime1){
                            //     this.c2s_pvp_battle_get_rank_info(type);
                            // }
                            return this._model.endTime1;
                        case 2 /* Type2 */:
                            return this._model.endTime2;
                    }
                    return this._model.endTime3;
                };
                CompeteProxy.prototype.s2c_pvp_battle_pk_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.recordList = msg.list || [];
                    this.sendNt("update_doufa_record" /* UPDATE_DOUFA_RECORD */);
                };
                Object.defineProperty(CompeteProxy.prototype, "recordList", {
                    get: function () {
                        return this._model.recordList;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.clearRecordList = function () {
                    this._model.recordList = [];
                };
                /**更新红点*/
                CompeteProxy.prototype.updateDoufaHint = function () {
                    this.updateChallengeHint();
                    this.updateRewardHint();
                    this.updateWinRewardHint();
                };
                CompeteProxy.prototype.updateChallengeHint = function () {
                    var hint = this.checkChallengeHint();
                    var hintType = this._model.challengeHint;
                    mod.HintMgr.setHint(hint, hintType, 1041670122 /* Doufa */);
                };
                CompeteProxy.prototype.checkChallengeHint = function () {
                    if (this.groupStatus != 0 /* Score */) {
                        return false;
                    }
                    return this.cnt > 0;
                };
                Object.defineProperty(CompeteProxy.prototype, "rewardHint", {
                    get: function () {
                        return this._model.rewardHint;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.updateRewardHint = function () {
                    var hint = this.checkRewardHint();
                    var hintType = this._model.rewardHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                CompeteProxy.prototype.checkRewardHint = function () {
                    var curCnt = this.curCnt;
                    var cfgList = game.getConfigListByName("magic_target.json" /* MagicTarget */);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        var cnt = cfg.count;
                        if (curCnt < cnt) {
                            continue;
                        }
                        var index = cfg.index;
                        var status = this.getRewardStatus(index);
                        var hasBuy = status == 2 /* Draw */;
                        if (hasBuy) {
                            continue;
                        }
                        var cost = cfg.cost;
                        var costIdx = cost[0];
                        var indexKey = game.PropIndexToKey[costIdx];
                        if (this._model.rewardCostIndexs.indexOf(indexKey) < 0) {
                            this._model.rewardCostIndexs.push(indexKey); //缓存消耗道具
                        }
                        if (mod.BagUtil.checkPropCnt(costIdx, cost[1])) {
                            return true;
                        }
                    }
                    return false;
                };
                CompeteProxy.prototype.updateWinRewardHint = function () {
                    var hint = this.checkWinRewardHint();
                    var hintType = this._model.winRewardHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                CompeteProxy.prototype.checkWinRewardHint = function () {
                    var cfgList = game.getConfigListByName("magic_win.json" /* MagicWin */);
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        var status = this.getWinRewardStatus(cfg.index);
                        var canDraw = status == 1 /* Finish */;
                        if (canDraw) {
                            return true;
                        }
                    }
                    return false;
                };
                CompeteProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        if (this._model.rewardCostIndexs.indexOf(k) >= 0) {
                            this.updateRewardHint();
                            break;
                        }
                    }
                };
                Object.defineProperty(CompeteProxy.prototype, "auto", {
                    get: function () {
                        return this._model.auto;
                    },
                    set: function (auto) {
                        this._model.auto = auto;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.c2s_pvp_battle_guess = function (roleId) {
                    var msg = new c2s_pvp_battle_guess();
                    msg.role_id = roleId;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_pvp_battle_guess_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.guessList = msg.role_id_list;
                    this.sendNt("update_doufa_guess_info" /* UPDATE_DOUFA_GUESS_INFO */);
                };
                CompeteProxy.prototype.s2c_pvp_battle_group_pk = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.type != undefined) {
                        this._model.groupStatus = msg.type;
                    }
                    if (msg.pktime) {
                        this._model.groupTime = msg.pktime.toNumber();
                    }
                    if (msg.list) {
                        this._model.groupList = msg.list;
                    }
                    this.sendNt("update_doufa_group_info" /* UPDATE_DOUFA_GROUP_INFO */);
                };
                CompeteProxy.prototype.getGroupInfo = function (type) {
                    if (!this._model.groupList || !this._model.groupList.length) {
                        return null;
                    }
                    for (var _i = 0, _a = this._model.groupList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.group_type == type) {
                            return info;
                        }
                    }
                    return null;
                };
                Object.defineProperty(CompeteProxy.prototype, "groupStatus", {
                    get: function () {
                        return this._model.groupStatus;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "groupTime", {
                    get: function () {
                        return this._model.groupTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "guessMaxCnt", {
                    get: function () {
                        return 1; //最大次数为1
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getGuessCnt = function () {
                    if (this.hasGuess()) {
                        return 0;
                    }
                    return 1; //次数为1
                };
                //是否押注
                CompeteProxy.prototype.isGuess = function (roleId) {
                    if (!this._model.guessList || !this._model.guessList.length) {
                        return false;
                    }
                    for (var _i = 0, _a = this._model.guessList; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (i.eq(roleId)) {
                            return true;
                        }
                    }
                    return false;
                };
                //已押注
                CompeteProxy.prototype.hasGuess = function () {
                    return this._model.guessList && !!this._model.guessList.length;
                };
                //可押注
                CompeteProxy.prototype.canGuess = function () {
                    if (this.groupStatus == 0 /* Score */) {
                        //积分赛不可押注
                        return false;
                    }
                    var cnt = this.getGuessCnt();
                    if (cnt <= 0) {
                        //没有押注次数不可押注(已押注)
                        return false;
                    }
                    if (TimeMgr.time.serverTimeSecond >= this.groupTime) {
                        //战斗已开始不可押注
                        return false;
                    }
                    if (this.isEnterGroup()) {
                        //参赛的玩家不可押注
                        return false;
                    }
                    return false;
                };
                //是否进入决赛分组
                CompeteProxy.prototype.isEnterGroup = function () {
                    if (!this._model.groupList || !this._model.groupList.length) {
                        return false;
                    }
                    var roleId = game.RoleVo.ins.role_id;
                    for (var _i = 0, _a = this._model.groupList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        for (var _b = 0, _c = info.info; _b < _c.length; _b++) {
                            var i = _c[_b];
                            if (i.role_info1 && i.role_info1.role_id.eq(roleId)) {
                                return true;
                            }
                            if (i.role_info2 && i.role_info2.role_id.eq(roleId)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                /************************** 斗法 *************************/
                /**============== 修仙女仆自动挂机 ==============*/
                CompeteProxy.prototype.getAutoChallengeYouliRankInfo = function () {
                    for (var i = 1; i <= 4; i++) {
                        var data = this.getTopRank(i);
                        if (!data) {
                            continue;
                        }
                        if (data.pos != 1 || this.type == 0 /* Normal */) {
                            return data;
                        }
                    }
                    return null;
                };
                CompeteProxy.prototype.canAutoChallengeYouli = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670121 /* Youli */)) {
                        return false;
                    }
                    var remainTimes = this.remainTimes;
                    if (remainTimes <= 0) {
                        return false;
                    }
                    var rankInfo = this.getAutoChallengeYouliRankInfo();
                    return !!rankInfo;
                };
                CompeteProxy.prototype.sendAutoChallengeYouli = function () {
                    var rankInfo = this.getAutoChallengeYouliRankInfo();
                    if (rankInfo) {
                        this.c2s_tour_challenge(rankInfo.pos);
                    }
                };
                //自动挑战游历
                CompeteProxy.prototype.checkAutoChallengeYouli = function () {
                    if (this.canAutoChallengeYouli()) {
                        mod.RoleUtil.addAutoChallengeEvent(4 /* Youli */, Handler.alloc(this, this.sendAutoChallengeYouli));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(4 /* Youli */);
                    }
                };
                //有挑战次数是皮肤状态1的情况
                CompeteProxy.prototype.canAutoChallengeDoufa = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670122 /* Doufa */)) {
                        return false;
                    }
                    return this.groupStatus == 0 /* Score */ && this.cnt > 0;
                };
                //自动挑战斗法
                CompeteProxy.prototype.checkAutoChallengeDoufa = function () {
                    if (this.canAutoChallengeDoufa()) {
                        mod.RoleUtil.addAutoChallengeEvent(5 /* Doufa */, Handler.alloc(this, this.c2s_pvp_battle_get_player_challenge_info));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(5 /* Doufa */);
                    }
                };
                //斗法匹配失败
                CompeteProxy.prototype.resetAutoChallengeDoufa = function () {
                    mod.RoleUtil.removeAutoChallengeEvent(5 /* Doufa */);
                };
                /**============== 修仙女仆自动挂机 ==============*/
                /**============== 跨服斗法 ==============*/
                CompeteProxy.prototype.c2s_kuafudoufa_click = function (type) {
                    var msg = new c2s_kuafudoufa_click();
                    msg.button_type = type;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_rank_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.button_type != undefined) {
                        this._model.rankList[msg.button_type] = msg.all_ranks || [];
                        this._model.myRank[msg.button_type] = msg.my_rank || null;
                        this.sendNt("kuafu_doufa_rank_update" /* KUAFU_DOUFA_RANK_UPDATE */);
                    }
                };
                CompeteProxy.prototype.c2s_kuafudoufa_scene_use_buff = function (index) {
                    var msg = new c2s_kuafudoufa_scene_use_buff();
                    msg.index = index;
                    this.sendProto(msg);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_zhanchang_paiming = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.sendNt("kuafu_doufa_scene_rank_update" /* KUAFU_DOUFA_SCENE_RANK_UPDATE */, msg.rank_list);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_base_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.is_join != undefined) {
                        this._model.isJoin = !!msg.is_join;
                    }
                    if (msg.count != undefined) {
                        this._model.leftCnt = msg.count;
                        this.sendNt("kuafu_doufa_count_update" /* KUAFU_DOUFA_COUNT_UPDATE */);
                    }
                    if (msg.status != undefined) {
                        this._model.state = msg.status;
                        if (this._model.state == 3 /* Open */) {
                            var endTime = this.getNextTime(); //计算时间
                            mod.PropTipsMgr.getIns().showBoss(3 /* KuafuDoufa */, endTime);
                        }
                        this.sendNt("kuafu_doufa_state_update" /* KUAFU_DOUFA_STATE_UPDATE */);
                    }
                    if (msg.is_sgin != undefined) {
                        this._model.hasEnroll = !!msg.is_sgin;
                        this.sendNt("kuafu_doufa_enroll_update" /* KUAFU_DOUFA_ENROLL_UPDATE */);
                    }
                    this.updateKuafuDoufaHint();
                };
                CompeteProxy.prototype.s2c_kuafudoufa_score_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.my_score != undefined) {
                        this._model.myScore = msg.my_score;
                        this.sendNt("kuafu_doufa_my_score_update" /* KUAFU_DOUFA_MY_SCORE_UPDATE */); //积分奖励界面用
                    }
                    if (msg.red_camp_score != undefined) {
                        this._model.redCampScore = msg.red_camp_score;
                    }
                    if (msg.red_camp_num != undefined) {
                        this._model.redCampNum = msg.red_camp_num;
                    }
                    if (msg.blue_camp_score != undefined) {
                        this._model.blueCampScore = msg.blue_camp_score;
                    }
                    if (msg.blue_camp_num != undefined) {
                        this._model.blueCampNum = msg.blue_camp_num;
                    }
                    this.sendNt("kuafu_doufa_score_update" /* KUAFU_DOUFA_SCORE_UPDATE */);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_zhanchang_jifen = function (n) {
                    var msg = n.body;
                    this._model.scoreList = msg && msg.ids || [];
                    this.sendNt("kuafu_doufa_score_reward_update" /* KUAFU_DOUFA_SCORE_REWARD_UPDATE */);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_boss_info = function (n) {
                    var msg = n.body;
                    if (msg.boss_list) {
                        for (var _i = 0, _a = msg.boss_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.bossHpInfos[info.index.toNumber()] = info.percent;
                        }
                    }
                    else {
                        this._model.bossHpInfos = {};
                    }
                    this.sendNt("kuafu_doufa_boss_update" /* KUAFU_DOUFA_BOSS_UPDATE */);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_attack_status = function (n) {
                    var msg = n.body;
                    this._model.attackStatus = msg.status;
                    this.sendNt("kuafu_doufa_attack_update" /* KUAFU_DOUFA_ATTACK_UPDATE */);
                };
                CompeteProxy.prototype.s2c_scene_kill_notice = function (n) {
                    var msg = n.body;
                    this._model.noticeList.push(msg);
                    this.sendNt("kuafu_doufa_notice_update" /* KUAFU_DOUFA_NOTICE_UPDATE */);
                };
                CompeteProxy.prototype.s2c_kuafudoufa_scene_buff_index_cd = function (n) {
                    var msg = n.body;
                    if (msg.idx_cds != null) {
                        for (var _i = 0, _a = msg.idx_cds; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.idx_cds[item.index] = item;
                        }
                    }
                    this.sendNt("kuafu_doufa_skill_cd_update" /* KUAFU_DOUFA_SKILL_CD_UPDATE */);
                };
                //技能cd时间
                CompeteProxy.prototype.getSkillCd = function (index) {
                    var info = this._model.idx_cds[index];
                    var endTime = info && info.cd_time ? info.cd_time.toNumber() : 0;
                    if (endTime <= TimeMgr.time.serverTimeSecond) {
                        return 0;
                    }
                    return endTime;
                };
                //有技能cd倒计时
                CompeteProxy.prototype.haveSkillCd = function () {
                    var info = this._model.idx_cds;
                    return Object.keys(info).length > 0;
                };
                CompeteProxy.prototype.getNextTime = function () {
                    var nextTime = 0;
                    //10_30_7200，10:30开启，提前报名时间7200
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_open_time");
                    var timeInfos = cfg && cfg.value;
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var zeroTime = game.TimeUtil.getNextDayTime(curTime); //今天0点时间戳
                    var curStartTime = 0; //当前活动开启的时间戳
                    var nextStartTime = 0; //下一次活动开启的时间戳
                    var enrollTime = 0; //提前报名时间
                    for (var _i = 0, timeInfos_1 = timeInfos; _i < timeInfos_1.length; _i++) {
                        var i = timeInfos_1[_i];
                        var h = i[0];
                        var m = i[1];
                        var startTime = h * 3600 + m * 60 + zeroTime; //开启时间
                        if (startTime > curTime) {
                            nextStartTime = startTime;
                            enrollTime = i[2];
                            break;
                        }
                        else {
                            curStartTime = startTime;
                        }
                    }
                    switch (this._model.state) {
                        case 1 /* Enroll */:
                            //报名阶段，取报名结束时间，下一次活动开启时间-提前报名时间-一分钟
                            nextTime = nextStartTime - enrollTime - game.KuafuDoufaWaitTime;
                            break;
                        case 2 /* Wait */:
                            //等待阶段，取战场开启时间
                            nextTime = nextStartTime;
                            break;
                        case 3 /* Open */:
                            //开启阶段，取战场结束时间
                            var continueCfg = game.GameConfig.getParamConfigById("kuafu_doufa_continue_time");
                            var continueTime = continueCfg && continueCfg.value; //活动持续时间
                            nextTime = curStartTime + continueTime;
                            break;
                        case 4 /* End */:
                            //结束阶段，取下一次报名开启时间
                            //6,7，周六日开启
                            var dayCfg = game.GameConfig.getParamConfigById("kuafu_doufa_open_day");
                            var dayInfos = dayCfg && dayCfg.value;
                            var curDay = mod.RoleUtil.getCurWeekDay(); //今天星期几
                            var isTodayOpen = dayInfos.indexOf(curDay) > -1; //是否今天开启
                            var nextDay = 0; //下一次活动星期几开
                            if (isTodayOpen && nextStartTime) {
                                //今日是活动日，且当天还有活动，则取当天下一次活动,下一次活动开启时间-提前报名时间
                                nextTime = nextStartTime - enrollTime;
                            }
                            else {
                                //否则取下一次活动日的第一个活动开启时间
                                for (var _a = 0, dayInfos_1 = dayInfos; _a < dayInfos_1.length; _a++) {
                                    var d = dayInfos_1[_a];
                                    if (d > curDay) {
                                        nextDay = d;
                                        break;
                                    }
                                }
                                var leftDay = //几天后开启下一次活动
                                 void 0; //几天后开启下一次活动
                                if (nextDay == 0) {
                                    nextDay = dayInfos[0]; //当前星期没有活动，则取下一周星期几
                                    leftDay = 7 - curDay + nextDay; //当前周剩余天数+下一周星期几
                                }
                                else {
                                    leftDay = nextDay - curDay;
                                }
                                var nextZeroTime = game.TimeUtil.getNextDayTime(curTime, false, leftDay); //几天后0点时间戳
                                var h = timeInfos[0][0];
                                var m = timeInfos[0][1];
                                nextTime = h * 3600 + m * 60 + nextZeroTime - enrollTime; //当天最小开启时间,下一次活动开启时间-提前报名时间
                            }
                            break;
                    }
                    return nextTime;
                };
                Object.defineProperty(CompeteProxy.prototype, "state", {
                    get: function () {
                        return this._model.state;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "hasEnroll", {
                    get: function () {
                        return this._model.hasEnroll;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "leftCnt", {
                    get: function () {
                        return this._model.leftCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "isJoin", {
                    get: function () {
                        return this._model.isJoin;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getRanks = function (type) {
                    return this._model.rankList[type] || [];
                };
                CompeteProxy.prototype.getMyRank = function (type) {
                    return this._model.myRank[type] || null;
                };
                CompeteProxy.prototype.getScoreHint = function () {
                    var cfgList = game.getConfigListByName("doufa_jifen.json" /* DoufaJifen */);
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        var status = this.getScoreStatus(cfg);
                        if (status == 1 /* Finish */) {
                            return true;
                        }
                    }
                    return false;
                };
                CompeteProxy.prototype.getScoreStatus = function (cfg) {
                    if (this._model.scoreList.indexOf(cfg.index) > -1) {
                        return 2 /* Draw */;
                    }
                    if (this._model.myScore >= cfg.count) {
                        return 1 /* Finish */;
                    }
                    return 0 /* NotFinish */;
                };
                Object.defineProperty(CompeteProxy.prototype, "myScore", {
                    get: function () {
                        return this._model.myScore;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "redCampScore", {
                    get: function () {
                        return this._model.redCampScore;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "redCampNum", {
                    get: function () {
                        return this._model.redCampNum;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "blueCampScore", {
                    get: function () {
                        return this._model.blueCampScore;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "blueCampNum", {
                    get: function () {
                        return this._model.blueCampNum;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.getBossHp = function (index) {
                    return this._model.bossHpInfos[index] || 0;
                };
                //寻找当前可攻击的怪物index
                CompeteProxy.prototype.findCurMonsterIndex = function (camp) {
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao" + camp);
                    var infos = cfg && cfg.value;
                    for (var i = 0; i < infos.length; ++i) {
                        var index = infos[i][0];
                        var hp = this.getBossHp(index);
                        if (hp > 0) {
                            return index;
                        }
                    }
                    return 0;
                };
                Object.defineProperty(CompeteProxy.prototype, "attackStatus", {
                    get: function () {
                        return this._model.attackStatus;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CompeteProxy.prototype, "noticeList", {
                    get: function () {
                        return this._model.noticeList;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.clearNotice = function () {
                    this._model.noticeList = [];
                };
                CompeteProxy.prototype.updateKuafuDoufaHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670251 /* KuafuDoufa */)) {
                        return;
                    }
                    var hint = mod.TaskUtil.getTaskHint(53 /* KuafuDoufa */);
                    var hintType = this._model.taskHint;
                    // HintMgr.setHint(hint, hintType);
                    var hintType2 = this._model.taskHint2;
                    mod.HintMgr.setHint(hint, hintType2);
                    //可进入或者报名红点（从KuafuDoufaMdr.updateState复制）
                    var state = this.state;
                    var hasEnroll = this.hasEnroll; //是否报名
                    var showEnroll = state == 1 /* Enroll */ && !hasEnroll; //是否显示报名
                    var hint1 = state == 3 /* Open */ || showEnroll;
                    mod.HintMgr.setHint(hint1 || hint, hintType);
                };
                Object.defineProperty(CompeteProxy.prototype, "taskHint", {
                    get: function () {
                        return this._model.taskHint;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompeteProxy.prototype.onTaskHint = function (n) {
                    var types = n.body;
                    if (types.indexOf(53 /* KuafuDoufa */) >= 0) {
                        this.updateKuafuDoufaHint();
                    }
                };
                return CompeteProxy;
            }(game.ProxyBase));
            compete.CompeteProxy = CompeteProxy;
            __reflect(CompeteProxy.prototype, "game.mod.compete.CompeteProxy", ["game.mod.ICompeteProxy", "base.IProxy"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var CompeteRewardView = /** @class */ (function (_super) {
                __extends(CompeteRewardView, _super);
                function CompeteRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.CompeteRewardSkin";
                    return _this;
                }
                return CompeteRewardView;
            }(eui.Component));
            compete.CompeteRewardView = CompeteRewardView;
            __reflect(CompeteRewardView.prototype, "game.mod.compete.CompeteRewardView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var CompeteView = /** @class */ (function (_super) {
                __extends(CompeteView, _super);
                function CompeteView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.CompeteSkin";
                    return _this;
                }
                return CompeteView;
            }(eui.Component));
            compete.CompeteView = CompeteView;
            __reflect(CompeteView.prototype, "game.mod.compete.CompeteView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaFailView = /** @class */ (function (_super) {
                __extends(DoufaFailView, _super);
                function DoufaFailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaFailSkin";
                    return _this;
                }
                return DoufaFailView;
            }(eui.Component));
            compete.DoufaFailView = DoufaFailView;
            __reflect(DoufaFailView.prototype, "game.mod.compete.DoufaFailView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaFinalsView = /** @class */ (function (_super) {
                __extends(DoufaFinalsView, _super);
                function DoufaFinalsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaFinalsSkin";
                    return _this;
                }
                return DoufaFinalsView;
            }(eui.Component));
            compete.DoufaFinalsView = DoufaFinalsView;
            __reflect(DoufaFinalsView.prototype, "game.mod.compete.DoufaFinalsView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaGuessView = /** @class */ (function (_super) {
                __extends(DoufaGuessView, _super);
                function DoufaGuessView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaGuessSkin";
                    return _this;
                }
                return DoufaGuessView;
            }(eui.Component));
            compete.DoufaGuessView = DoufaGuessView;
            __reflect(DoufaGuessView.prototype, "game.mod.compete.DoufaGuessView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaPlayerItem = /** @class */ (function (_super) {
                __extends(DoufaPlayerItem, _super);
                function DoufaPlayerItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DoufaPlayerItem.prototype.updateShow = function (info, winRoleId, isFirst, isGuess, isEmpty) {
                    this.info = info;
                    if (!winRoleId || winRoleId.toNumber() == 0 || !info || !info.role_id) {
                        //没有赢家,或者没有玩家
                        this.currentState = "no";
                    }
                    else if (winRoleId.eq(info.role_id)) {
                        //赢家
                        this.currentState = "win";
                    }
                    else {
                        //败家
                        this.currentState = "fail";
                    }
                    if (info && info.role_id) {
                        //有玩家
                        this.img_name_di.visible = true;
                        this.img_head.source = game.ResUtil.getDressUpIcon(info.head.toNumber(), info.sex);
                        this.lab_name.text = info.name;
                    }
                    else {
                        //没有玩家
                        this.img_name_di.visible = false;
                        this.img_head.source = "doufa_head";
                        this.lab_name.text = "";
                    }
                    this.img_di.source = isFirst ? "doufa_first_head_frame" : "doufa_head_frame"; //第一名底
                    this.img_has.visible = !!isGuess; //已下注
                    this.lab_no.visible = !!isEmpty; //轮空
                };
                return DoufaPlayerItem;
            }(eui.Component));
            compete.DoufaPlayerItem = DoufaPlayerItem;
            __reflect(DoufaPlayerItem.prototype, "game.mod.compete.DoufaPlayerItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var Event = egret.Event;
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var DoufaPlayerView = /** @class */ (function (_super) {
                __extends(DoufaPlayerView, _super);
                function DoufaPlayerView() {
                    var _this = _super.call(this) || this;
                    _this._eftId = 0;
                    _this.skinName = "skins.compete.DoufaPlayerSkin";
                    _this._effHub = new game.UIEftHub(_this);
                    _this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                DoufaPlayerView.prototype.onAddToStage = function () {
                    this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    for (var i = 0; i <= 3; ++i) {
                        this["item" + i].addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                };
                DoufaPlayerView.prototype.onRemoveFromStage = function () {
                    this.removeTitle();
                    for (var i = 0; i <= 3; ++i) {
                        this["item" + i].removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    }
                };
                DoufaPlayerView.prototype.onClick = function (e) {
                    if (!this._proxy.canGuess()) {
                        //不可押注
                        return;
                    }
                    var imgHead = e.target;
                    for (var i = 0; i <= 3; ++i) {
                        var item = this["item" + i];
                        if (imgHead == item.img_head) {
                            if (item.info && item.info.role_id) {
                                mod.ViewMgr.getIns().showSecondPop("52" /* Compete */, "28" /* DoufaGuess */, item.info);
                            }
                            break;
                        }
                    }
                };
                DoufaPlayerView.prototype.removeTitle = function () {
                    if (this._eftId) {
                        this._effHub.removeEffect(this._eftId);
                    }
                };
                DoufaPlayerView.prototype.updateTitle = function () {
                    var type = this._info && this._info.group_type ? this._info.group_type : this._type;
                    var index = 0;
                    if (type == 5 /* Type5 */) {
                        // let pCfg: ParamConfig = GameConfig.getParamConfigById("doufa_runk_reward");
                        // let reward: number[] = pCfg.value;
                        // index = reward[0];
                        var cfg = game.getConfigByNameId("magic_top_rank.json" /* MagicTopRank */, 1); //取第一名奖励
                        index = cfg.reward[0][0];
                    }
                    else {
                        var cfg = game.getConfigByNameId("magic_top_rank.json" /* MagicTopRank */, type);
                        index = cfg.reward[0][0];
                    }
                    this.removeTitle();
                    this._eftId = this._effHub.add(game.ResUtil.getTitleSrc(index), 0, 0, null, 0, this.grp_title, -1);
                };
                DoufaPlayerView.prototype.updateMatch = function (num, item1, item2, isGuess) {
                    var matchInfo = this.getMatchInfo(num);
                    var roleInfo1 = matchInfo ? matchInfo.role_info1 : null;
                    var roleInfo2 = matchInfo ? matchInfo.role_info2 : null;
                    var winRoleId = matchInfo ? matchInfo.win_roleid : null;
                    var isGuess1 = false;
                    var isGuess2 = false;
                    if (isGuess) {
                        if (roleInfo1) {
                            isGuess1 = this._proxy.isGuess(roleInfo1.role_id);
                        }
                        if (roleInfo2) {
                            isGuess2 = this._proxy.isGuess(roleInfo2.role_id);
                        }
                    }
                    //只有小组赛，决赛才有轮空状态，轮空的前提是存在一方玩家
                    var isEmpty1 = false;
                    var isEmpty2 = false;
                    if (this._proxy.groupStatus != 0 /* Score */) {
                        isEmpty1 = !roleInfo1 && !!roleInfo2; //存在玩家2
                        isEmpty2 = !roleInfo2 && !!roleInfo1; //存在玩家1
                    }
                    item1.updateShow(roleInfo1, winRoleId, false, isGuess1, isEmpty1);
                    item2.updateShow(roleInfo2, winRoleId, false, isGuess2, isEmpty2);
                };
                DoufaPlayerView.prototype.updateMatch1 = function () {
                    this.updateMatch(1 /* Num1 */, this.item0, this.item1, true);
                };
                DoufaPlayerView.prototype.updateMatch2 = function () {
                    this.updateMatch(2 /* Num2 */, this.item2, this.item3, true);
                };
                DoufaPlayerView.prototype.updateMatch3 = function () {
                    this.updateMatch(3 /* Num3 */, this.item4, this.item5);
                };
                DoufaPlayerView.prototype.updateMatchWin = function () {
                    var matchInfo = this.getMatchInfo(3 /* Num3 */);
                    var roleInfo1 = matchInfo ? matchInfo.role_info1 : null;
                    var roleInfo2 = matchInfo ? matchInfo.role_info2 : null;
                    var winRoleId = matchInfo ? matchInfo.win_roleid : null;
                    var winInfo = null;
                    if (winRoleId && winRoleId.toNumber() != 0) {
                        if (roleInfo1 && winRoleId.eq(roleInfo1.role_id)) {
                            winInfo = roleInfo1;
                        }
                        else if (roleInfo2 && winRoleId.eq(roleInfo2.role_id)) {
                            winInfo = roleInfo2;
                        }
                    }
                    this.item6.updateShow(winInfo, null, true);
                };
                DoufaPlayerView.prototype.getMatchInfo = function (num) {
                    if (!this._info || !this._info.info) {
                        return null;
                    }
                    for (var _i = 0, _a = this._info.info; _i < _a.length; _i++) {
                        var matchInfo = _a[_i];
                        if (matchInfo.match_num == num) {
                            return matchInfo;
                        }
                    }
                    return null;
                };
                DoufaPlayerView.prototype.updateShow = function (type) {
                    this._type = type;
                    this._info = this._proxy.getGroupInfo(type);
                    this.updateTitle();
                    this.updateMatch1();
                    this.updateMatch2();
                    this.updateMatch3();
                    this.updateMatchWin();
                };
                return DoufaPlayerView;
            }(eui.Component));
            compete.DoufaPlayerView = DoufaPlayerView;
            __reflect(DoufaPlayerView.prototype, "game.mod.compete.DoufaPlayerView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaQuickWinView = /** @class */ (function (_super) {
                __extends(DoufaQuickWinView, _super);
                function DoufaQuickWinView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaQuickWinSkin";
                    return _this;
                }
                return DoufaQuickWinView;
            }(eui.Component));
            compete.DoufaQuickWinView = DoufaQuickWinView;
            __reflect(DoufaQuickWinView.prototype, "game.mod.compete.DoufaQuickWinView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaRecordItem = /** @class */ (function (_super) {
                __extends(DoufaRecordItem, _super);
                function DoufaRecordItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DoufaRecordItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    var successStr = game.TextUtil.addColor(info.result ? game.getLanById("success" /* success */) : game.getLanById("fail" /* fail */), 16719376 /* RED */);
                    var scoreStr = game.TextUtil.addColor(info.result || info.addscore == 0 ? "+" + info.addscore : "-" + info.addscore, 2330156 /* GREEN */);
                    var descStr = game.getLanById("tishi_30" /* tishi_30 */) + info.name + successStr + "\n" + game.getLanById("doufa_tips2" /* doufa_tips2 */) + scoreStr;
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(descStr);
                    this.lab_time.text = game.TimeUtil.getLeaveTime(info.pktime.toNumber());
                };
                return DoufaRecordItem;
            }(eui.ItemRenderer));
            compete.DoufaRecordItem = DoufaRecordItem;
            __reflect(DoufaRecordItem.prototype, "game.mod.compete.DoufaRecordItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaRecordView = /** @class */ (function (_super) {
                __extends(DoufaRecordView, _super);
                function DoufaRecordView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaRecordSkin";
                    return _this;
                }
                return DoufaRecordView;
            }(eui.Component));
            compete.DoufaRecordView = DoufaRecordView;
            __reflect(DoufaRecordView.prototype, "game.mod.compete.DoufaRecordView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var DoufaRewardItemRender = /** @class */ (function (_super) {
                __extends(DoufaRewardItemRender, _super);
                function DoufaRewardItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._canBuy = false;
                    return _this;
                }
                DoufaRewardItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.btn_buy.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                DoufaRewardItemRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn_buy.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                DoufaRewardItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    var cnt = this.data.count;
                    var curCnt = this._proxy.curCnt;
                    var desc = game.StringUtil.substitute(game.getLanById("doufa_tips5" /* doufa_tips5 */), [cnt])
                        + game.TextUtil.addColor("（" + curCnt + "/" + cnt + "）", curCnt >= cnt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    var rewards = this.data.reward;
                    this._rewardList.source = rewards.slice(0, 3); //显示前三个
                    var status = this._proxy.getRewardStatus(index);
                    var hasBuy = status == 2 /* Draw */;
                    this._canBuy = curCnt >= cnt;
                    this.btn_buy.visible = !hasBuy;
                    this.img_buy.visible = hasBuy;
                    if (this.btn_buy.visible) {
                        if (this._canBuy) {
                            this.btn_buy.setYellow();
                            this._cost = this.data.cost;
                            this.btn_buy.setCost(this._cost);
                            this.btn_buy.labelDisplay.text = "";
                        }
                        else {
                            this.btn_buy.setBlue();
                            this.btn_buy.resetCost();
                            this.btn_buy.labelDisplay.text = game.getLanById("goto" /* goto */);
                        }
                        this.btn_buy.redPoint.visible = this._canBuy && mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    }
                };
                DoufaRewardItemRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    if (!this._canBuy) {
                        facade.sendNt("on_common_back" /* ON_COMMON_BACK */);
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._proxy.c2s_pvp_battle_win_count_rewards(index);
                };
                return DoufaRewardItemRender;
            }(mod.BaseRenderer));
            compete.DoufaRewardItemRender = DoufaRewardItemRender;
            __reflect(DoufaRewardItemRender.prototype, "game.mod.compete.DoufaRewardItemRender");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaTabItem = /** @class */ (function (_super) {
                __extends(DoufaTabItem, _super);
                function DoufaTabItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DoufaTabItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var type = this.data;
                    this.labelDisplay.text = game.getLanById("doufa_group" + type);
                };
                return DoufaTabItem;
            }(eui.ItemRenderer));
            compete.DoufaTabItem = DoufaTabItem;
            __reflect(DoufaTabItem.prototype, "game.mod.compete.DoufaTabItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaTopRankItem = /** @class */ (function (_super) {
                __extends(DoufaTopRankItem, _super);
                function DoufaTopRankItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DoufaTopRankItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var rankNo = this.itemIndex + 2; //排名2开始
                    if (rankNo <= 3) {
                        //前三名显示图标
                        this.img_rank.visible = true;
                        this.img_rank.source = 'rank' + rankNo;
                        this.lab_rank.text = "";
                    }
                    else {
                        this.img_rank.visible = false;
                        this.lab_rank.text = "" + rankNo;
                    }
                    var rankInfo = this.data.rankInfo;
                    var cfg = this.data.cfg;
                    var name = "";
                    if (!!rankInfo) {
                        this.head.updateShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.vip, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                        name = rankInfo.name;
                    }
                    else {
                        this.head.defaultHeadShow();
                        name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                    }
                    this.lab_name.text = name;
                    this.removeEft();
                    var index = cfg.reward[0][0];
                    this.addEftByParent(game.ResUtil.getTitleSrc(index), this.grp_title);
                };
                return DoufaTopRankItem;
            }(mod.BaseRenderer));
            compete.DoufaTopRankItem = DoufaTopRankItem;
            __reflect(DoufaTopRankItem.prototype, "game.mod.compete.DoufaTopRankItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaTopRankView = /** @class */ (function (_super) {
                __extends(DoufaTopRankView, _super);
                function DoufaTopRankView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaTopRankSkin";
                    return _this;
                }
                return DoufaTopRankView;
            }(eui.Component));
            compete.DoufaTopRankView = DoufaTopRankView;
            __reflect(DoufaTopRankView.prototype, "game.mod.compete.DoufaTopRankView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaView = /** @class */ (function (_super) {
                __extends(DoufaView, _super);
                function DoufaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaSkin";
                    return _this;
                }
                return DoufaView;
            }(eui.Component));
            compete.DoufaView = DoufaView;
            __reflect(DoufaView.prototype, "game.mod.compete.DoufaView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaVsView = /** @class */ (function (_super) {
                __extends(DoufaVsView, _super);
                function DoufaVsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaVsSkin";
                    return _this;
                }
                return DoufaVsView;
            }(eui.Component));
            compete.DoufaVsView = DoufaVsView;
            __reflect(DoufaVsView.prototype, "game.mod.compete.DoufaVsView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var DoufaWinRewardItem = /** @class */ (function (_super) {
                __extends(DoufaWinRewardItem, _super);
                function DoufaWinRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DoufaWinRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClick, this);
                };
                DoufaWinRewardItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    if (this._canDraw) {
                        this._proxy.c2s_pvp_battle_keep_win_rewards(cfg.index);
                        return;
                    }
                    var tips = game.StringUtil.substitute(game.getLanById("doufa_tips6" /* doufa_tips6 */), [cfg.count]);
                    mod.ViewMgr.getIns().showBoxReward(tips, cfg.reward);
                };
                DoufaWinRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.currentState = (this.itemIndex + 1).toString();
                    var cfg = this.data;
                    this.lab_value.text = cfg.count + "";
                    var status = this._proxy.getWinRewardStatus(cfg.index);
                    var canDraw = status == 1 /* Finish */;
                    this._canDraw = canDraw;
                    var hasDraw = status == 2 /* Draw */;
                    this.redPoint.visible = canDraw;
                    this.img_got.visible = hasDraw;
                    this.removeEft();
                    if (canDraw) {
                        this.addEftByParent("tongyongbaoxiang" /* CommonBox */, this.btn_box.group_eft);
                    }
                };
                return DoufaWinRewardItem;
            }(mod.BaseRenderer));
            compete.DoufaWinRewardItem = DoufaWinRewardItem;
            __reflect(DoufaWinRewardItem.prototype, "game.mod.compete.DoufaWinRewardItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaWinView = /** @class */ (function (_super) {
                __extends(DoufaWinView, _super);
                function DoufaWinView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.DoufaWinSkin";
                    return _this;
                }
                return DoufaWinView;
            }(eui.Component));
            compete.DoufaWinView = DoufaWinView;
            __reflect(DoufaWinView.prototype, "game.mod.compete.DoufaWinView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var KuafuDoufaAchieveItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaAchieveItem, _super);
                function KuafuDoufaAchieveItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaAchieveItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                KuafuDoufaAchieveItem.prototype.dataChanged = function () {
                    var task = this.data;
                    if (!task) {
                        return;
                    }
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(mod.TaskUtil.getTaskDesc(task));
                    var cfg = mod.TaskUtil.getCfg(task.task_id);
                    this._rewardList.source = cfg.rewards.slice(0, 3);
                    var canDraw = mod.TaskUtil.canRewardDraw(task);
                    var hasDraw = mod.TaskUtil.hasRewardDraw(task);
                    var notFinish = !canDraw && !hasDraw;
                    this.img_not.visible = notFinish;
                    this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
                    this.img_draw.visible = hasDraw;
                };
                KuafuDoufaAchieveItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    mod.TaskUtil.clickTask(this.data);
                };
                return KuafuDoufaAchieveItem;
            }(mod.BaseListenerRenderer));
            compete.KuafuDoufaAchieveItem = KuafuDoufaAchieveItem;
            __reflect(KuafuDoufaAchieveItem.prototype, "game.mod.compete.KuafuDoufaAchieveItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaAchieveView = /** @class */ (function (_super) {
                __extends(KuafuDoufaAchieveView, _super);
                function KuafuDoufaAchieveView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.KuafuDoufaAchieveSkin";
                    return _this;
                }
                return KuafuDoufaAchieveView;
            }(eui.Component));
            compete.KuafuDoufaAchieveView = KuafuDoufaAchieveView;
            __reflect(KuafuDoufaAchieveView.prototype, "game.mod.compete.KuafuDoufaAchieveView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var KuafuDoufaBossItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaBossItem, _super);
                function KuafuDoufaBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var camp = this.data.camp;
                    var monsterIndex = this.data.monsterIndex;
                    this.img_camp.source = "kuafu_doufa_icon" + camp;
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    var hp = proxy.getBossHp(monsterIndex);
                    this.updateHp(hp);
                };
                /**更新血量*/
                KuafuDoufaBossItem.prototype.updateHp = function (percent) {
                    if (!this.data) {
                        return;
                    }
                    this.bar.show(percent, 10000, false, 0, false, 0 /* Percent */); //血量
                    var isDied = percent <= 0; //已死亡
                    this.img_died.visible = isDied;
                };
                return KuafuDoufaBossItem;
            }(eui.ItemRenderer));
            compete.KuafuDoufaBossItem = KuafuDoufaBossItem;
            __reflect(KuafuDoufaBossItem.prototype, "game.mod.compete.KuafuDoufaBossItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaKillItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaKillItem, _super);
                function KuafuDoufaKillItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaKillItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data.info;
                    var beKill = this.data.beKill;
                    this.img_frame.source = beKill ? "touxiangkuang_hongse" : "touxiangkuang_lanse";
                    if (info.head) {
                        this.img_head.source = game.ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
                    }
                    this.lab_name.text = info && info.name || '';
                    this.lab_name.textColor = beKill ? 0xff574c : 0x35bfe6;
                };
                KuafuDoufaKillItem.prototype.setData = function (info, beKill) {
                    this.data = { info: info, beKill: beKill };
                };
                return KuafuDoufaKillItem;
            }(eui.ItemRenderer));
            compete.KuafuDoufaKillItem = KuafuDoufaKillItem;
            __reflect(KuafuDoufaKillItem.prototype, "game.mod.compete.KuafuDoufaKillItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaRankItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaRankItem, _super);
                function KuafuDoufaRankItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaRankItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var rankNo = this.itemIndex + 1;
                    this.img_mvp.visible = rankNo == 1;
                    this.lab_rank.text = rankNo + "";
                    var nameStr = game.TextUtil.addColor(this.data.name, this.data.camp == 1 /* RED */ ? 16719376 /* RED */ : 2904685 /* DEFAULT2 */);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(nameStr);
                    this.lab_kill.text = this.data.kill_num + "";
                    this.lab_num.text = this.data.help_kill_num + "";
                    this.lab_score.text = this.data.score + "";
                };
                return KuafuDoufaRankItem;
            }(eui.ItemRenderer));
            compete.KuafuDoufaRankItem = KuafuDoufaRankItem;
            __reflect(KuafuDoufaRankItem.prototype, "game.mod.compete.KuafuDoufaRankItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaRankView = /** @class */ (function (_super) {
                __extends(KuafuDoufaRankView, _super);
                function KuafuDoufaRankView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.KuafuDoufaRankSkin";
                    return _this;
                }
                return KuafuDoufaRankView;
            }(eui.Component));
            compete.KuafuDoufaRankView = KuafuDoufaRankView;
            __reflect(KuafuDoufaRankView.prototype, "game.mod.compete.KuafuDoufaRankView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var KuafuDoufaSceneSkillItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaSceneSkillItem, _super);
                function KuafuDoufaSceneSkillItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaSceneSkillItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this._shape = new egret.Shape();
                    this._shape.x = this.width * 0.5;
                    this._shape.y = this.height * 0.5;
                    this.addChild(this._shape);
                    this.img_mark.mask = this._shape;
                };
                KuafuDoufaSceneSkillItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var buffId = this.data.buffid;
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                    if (!cfg) {
                        console.error("buff 表缺少配置 id = " + buffId);
                        return;
                    }
                    this.img_icon.source = cfg.icon;
                    this.lab_cnt.text = this.data.cost[1] + "";
                    var cdTime = this._proxy.getSkillCd(this.data.index);
                    //限制cd超过配置时间，点击时候后定时器一直存在，可能存在cd超过配置时间
                    var leftTime = Math.min(cdTime - TimeMgr.time.serverTimeSecond, this.data.cd_time);
                    if (leftTime > 0) {
                        this.img_mark.visible = true;
                        this.lab_time.text = leftTime + '';
                        this.changeMask();
                    }
                    else {
                        this.lab_time.text = '';
                        this.img_mark.visible = false;
                    }
                };
                //绘制cd动画
                KuafuDoufaSceneSkillItem.prototype.changeMask = function () {
                    var cdTime = this._proxy.getSkillCd(this.data.index);
                    var cfgCdTime = this.data.cd_time;
                    var leftTime = Math.min(cdTime - TimeMgr.time.serverTimeSecond, cfgCdTime);
                    var angle = leftTime / cfgCdTime * 360;
                    var radius = this.img_mark.height * 0.5;
                    var shape = this._shape;
                    shape.graphics.clear();
                    shape.graphics.beginFill(0xffffff, 1);
                    shape.graphics.moveTo(0, 0);
                    shape.graphics.lineTo(0, radius);
                    shape.graphics.drawArc(0, 0, radius, -90 * Math.PI / 180, (angle - 90) * Math.PI / 180, false); //顺时针绘制
                    shape.graphics.lineTo(0, 0);
                    shape.graphics.endFill();
                };
                return KuafuDoufaSceneSkillItem;
            }(mod.BaseListenerRenderer));
            compete.KuafuDoufaSceneSkillItem = KuafuDoufaSceneSkillItem;
            __reflect(KuafuDoufaSceneSkillItem.prototype, "game.mod.compete.KuafuDoufaSceneSkillItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaSceneView = /** @class */ (function (_super) {
                __extends(KuafuDoufaSceneView, _super);
                function KuafuDoufaSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.KuafuDoufaSceneSkin";
                    return _this;
                }
                return KuafuDoufaSceneView;
            }(eui.Component));
            compete.KuafuDoufaSceneView = KuafuDoufaSceneView;
            __reflect(KuafuDoufaSceneView.prototype, "game.mod.compete.KuafuDoufaSceneView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var KuafuDoufaScoreItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaScoreItem, _super);
                function KuafuDoufaScoreItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaScoreItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                KuafuDoufaScoreItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    var status = this.data.status;
                    var maxCnt = cfg.count;
                    var curCnt = this._proxy.myScore;
                    var desc = game.StringUtil.substitute(game.getLanById("kuafu_doufa_tips9" /* kuafu_doufa_tips9 */), [maxCnt])
                        + game.TextUtil.addColor("（" + curCnt + "/" + maxCnt + "）", curCnt >= maxCnt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    this._rewardList.source = cfg.reward.slice(0, 3);
                    var notFinish = status == 0 /* NotFinish */;
                    var canDraw = status == 1 /* Finish */;
                    var hasDraw = status == 2 /* Draw */;
                    this.img_not.visible = notFinish;
                    this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
                    this.img_draw.visible = hasDraw;
                };
                KuafuDoufaScoreItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    this._proxy.c2s_kuafudoufa_click(5 /* ScoreReward */);
                };
                return KuafuDoufaScoreItem;
            }(mod.BaseListenerRenderer));
            compete.KuafuDoufaScoreItem = KuafuDoufaScoreItem;
            __reflect(KuafuDoufaScoreItem.prototype, "game.mod.compete.KuafuDoufaScoreItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var KuafuDoufaSkillItem = /** @class */ (function (_super) {
                __extends(KuafuDoufaSkillItem, _super);
                function KuafuDoufaSkillItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KuafuDoufaSkillItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                };
                KuafuDoufaSkillItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    //let index = this.data.index;
                    this._cost = this.data.cost;
                    //let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, index);
                    var buffId = this.data.buffid;
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                    if (!cfg) {
                        console.error("buff 表缺少配置 id = " + buffId);
                        return;
                    }
                    this.img_icon.source = cfg.icon;
                    this.lab_name.text = cfg.name;
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.des);
                    this.btn_buy.setCost(this._cost);
                };
                KuafuDoufaSkillItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    var index = this.data.index;
                    // this._proxy.c2s_new_cross_boss_hurt_reward(index);
                    this._proxy.c2s_kuafudoufa_scene_use_buff(index);
                };
                return KuafuDoufaSkillItem;
            }(mod.BaseListenerRenderer));
            compete.KuafuDoufaSkillItem = KuafuDoufaSkillItem;
            __reflect(KuafuDoufaSkillItem.prototype, "game.mod.compete.KuafuDoufaSkillItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaView = /** @class */ (function (_super) {
                __extends(KuafuDoufaView, _super);
                function KuafuDoufaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.KuafuDoufaSkin";
                    return _this;
                }
                return KuafuDoufaView;
            }(eui.Component));
            compete.KuafuDoufaView = KuafuDoufaView;
            __reflect(KuafuDoufaView.prototype, "game.mod.compete.KuafuDoufaView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var YouliAwardItemRender = /** @class */ (function (_super) {
                __extends(YouliAwardItemRender, _super);
                function YouliAwardItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**
                     * 状态，0-前往，1-可领取，2-已领取
                     */
                    _this._status = 0;
                    return _this;
                }
                YouliAwardItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                    this.img_buy.source = "lvseyilingqu"; // 已领取
                };
                YouliAwardItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var needCnt = this.data.count;
                    var curCnt = this._proxy.challengeCnt;
                    var desc = "\u5B8C\u6210" + needCnt + "\u6B21\u6E38\u5386\u6311\u6218" + game.TextUtil.addColor("（" + curCnt + "/" + needCnt + "）", curCnt >= needCnt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    this._rewardList.source = this.data.reward.slice(0, 3);
                    var awd = this._proxy.getStepAward(this.data.index);
                    if (curCnt < needCnt) { // 前往
                        this._status = 0;
                        this.btn_buy.visible = true;
                        this.img_buy.visible = false;
                        this.btn_buy.setBlue();
                        this.btn_buy.labelDisplay.text = "前往";
                        this.btn_buy.resetCost();
                        this.btn_buy.redPoint.visible = false;
                    }
                    else if (awd && awd.status == 1 /* Finish */) { // 可领取
                        this._status = 1;
                        this.btn_buy.visible = true;
                        this.img_buy.visible = false;
                        this.btn_buy.setYellow();
                        this.btn_buy.labelDisplay.text = "";
                        this._cost = this.data.cost;
                        this.btn_buy.setCost(this._cost);
                        this.btn_buy.redPoint.visible = mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    }
                    else { // 已领取
                        this._status = 2;
                        this.btn_buy.visible = false;
                        this.img_buy.visible = true;
                    }
                };
                YouliAwardItemRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this._status == 0) {
                        facade.sendNt("on_common_back" /* ON_COMMON_BACK */);
                    }
                    else if (this._status == 1) {
                        if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                            return;
                        }
                        this._proxy.c2s_tour_stage_buy(this.data.index);
                    }
                };
                return YouliAwardItemRender;
            }(mod.BaseListenerRenderer));
            compete.YouliAwardItemRender = YouliAwardItemRender;
            __reflect(YouliAwardItemRender.prototype, "game.mod.compete.YouliAwardItemRender");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var YouliDatiItem = /** @class */ (function (_super) {
                __extends(YouliDatiItem, _super);
                function YouliDatiItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YouliDatiItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data;
                    var _proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    var cfg = _proxy.datiCfg;
                    this.lab_desc.text = cfg["option_" + index];
                    this.img_sel.visible = mod.RoleUtil.hasPrivilege("wander_answer" /* wander_answer */) && index == cfg.ture_option; //答题特权查看答案
                };
                return YouliDatiItem;
            }(eui.ItemRenderer));
            compete.YouliDatiItem = YouliDatiItem;
            __reflect(YouliDatiItem.prototype, "game.mod.compete.YouliDatiItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliDatiResultView = /** @class */ (function (_super) {
                __extends(YouliDatiResultView, _super);
                function YouliDatiResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliDatiResultSkin";
                    return _this;
                }
                return YouliDatiResultView;
            }(eui.Component));
            compete.YouliDatiResultView = YouliDatiResultView;
            __reflect(YouliDatiResultView.prototype, "game.mod.compete.YouliDatiResultView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliDatiView = /** @class */ (function (_super) {
                __extends(YouliDatiView, _super);
                function YouliDatiView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliDatiSkin";
                    return _this;
                }
                return YouliDatiView;
            }(eui.Component));
            compete.YouliDatiView = YouliDatiView;
            __reflect(YouliDatiView.prototype, "game.mod.compete.YouliDatiView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var YouliItem = /** @class */ (function (_super) {
                __extends(YouliItem, _super);
                function YouliItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliItemSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                YouliItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                };
                YouliItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    if (!this.data) {
                        return;
                    }
                    this._isNormal = (this.data.pos != 1 || this._proxy.type == 0 /* Normal */);
                    this.currentState = this._isNormal ? "normal" : "wanfa";
                    this.removeAllEffects();
                    if (this._isNormal) {
                        this.lab_power.text = this.data.showpower.toString();
                        this.addRoleModel();
                    }
                    else {
                        var index = this._proxy.type + 4; //取配置时需要加上4个宝箱占位id
                        var cfg = game.getConfigByNameId("tourpvp_challenge.json" /* TourpvpChallenge */, index);
                        var nameStr = cfg.name;
                        switch (this._proxy.type) {
                            case 1 /* WishBox */:
                            case 2 /* Treasure */:
                            case 5 /* Dati */: //todo，答题
                                this.addBoxModel();
                                break;
                            case 3 /* SpecialKiller */:
                                //异形杀手
                                this.addMonsterModel();
                                break;
                            case 4 /* ScoreKiller */:
                                var killerIndex = this.data.param1[0];
                                var killerCfg = game.getConfigByNameId("tourpvp_killer.json" /* TourpvpKiller */, killerIndex);
                                nameStr = killerCfg ? killerCfg.name : "积分杀手";
                                this.addRoleModel();
                                break;
                        }
                        this.lab_power.text = nameStr;
                    }
                    this.lab_name.text = this.data.name;
                    this.lab_score.text = "\u79EF\u5206+" + (this.data.score || 0);
                };
                YouliItem.prototype.addRoleModel = function () {
                    var data = this.data;
                    var rankInfo = { fashion: data.fashion, weapon: data.weapon, sex: data.sex, wing: data.wing };
                    this.updateRankUIRole(this.grp_role_eff, rankInfo, 0.6);
                };
                YouliItem.prototype.addBoxModel = function () {
                    this.addEftByParent(game.ResUtil.getEffectUI("box" /* Box */), this.grp_role_eff, 0, -100);
                };
                YouliItem.prototype.addMonsterModel = function () {
                    this.addMonster(140100004, this.grp_role_eff);
                };
                YouliItem.prototype.onClick = function (e) {
                    if (this._proxy.curFightTimes >= this._proxy.maxFightTimes) {
                        facade.sendNt("common_click_add" /* COMMON_CLICK_ADD */);
                        return;
                    }
                    if (this._isNormal) {
                        this._proxy.c2s_tour_challenge(this.data.pos);
                    }
                    else {
                        switch (this._proxy.type) {
                            case 1 /* WishBox */:
                                facade.showView("52" /* Compete */, "06" /* YouliWishBox */, this.data);
                                break;
                            case 2 /* Treasure */:
                                facade.showView("52" /* Compete */, "07" /* YouliTreasure */, this.data.index);
                                break;
                            case 3 /* SpecialKiller */:
                                facade.showView("52" /* Compete */, "08" /* YouliSpecialKiller */, this.data);
                                break;
                            case 4 /* ScoreKiller */:
                                facade.showView("52" /* Compete */, "09" /* YouliScoreKiller */, this.data);
                                break;
                            case 5 /* Dati */:
                                facade.showView("52" /* Compete */, "11" /* YouliDati */, this.data);
                                break;
                        }
                    }
                };
                return YouliItem;
            }(mod.BaseRenderer));
            compete.YouliItem = YouliItem;
            __reflect(YouliItem.prototype, "game.mod.compete.YouliItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliKillerView = /** @class */ (function (_super) {
                __extends(YouliKillerView, _super);
                function YouliKillerView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliKillerSkin";
                    return _this;
                }
                return YouliKillerView;
            }(eui.Component));
            compete.YouliKillerView = YouliKillerView;
            __reflect(YouliKillerView.prototype, "game.mod.compete.YouliKillerView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var YouliScoreItemRender = /** @class */ (function (_super) {
                __extends(YouliScoreItemRender, _super);
                function YouliScoreItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**
                     * 状态，0-不可领取，1-可领取，2-已领取
                     */
                    _this._status = 0;
                    return _this;
                }
                YouliScoreItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                    this.btn_buy.labelDisplay.text = "领取";
                    this.img_buy.source = "lvseyilingqu"; // 已领取
                };
                YouliScoreItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var needCnt = this.data.count;
                    var curScore = this._proxy.dayScore;
                    var desc = "\u6E38\u5386\u79EF\u5206\u8FBE\u5230" + needCnt + "\u53EF\u9886\u53D6" + game.TextUtil.addColor("（" + curScore + "/" + needCnt + "）", curScore >= needCnt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    this._rewardList.source = this.data.reward;
                    var awd = this._proxy.getScoreAward(this.data.index);
                    if (awd && awd.status == 2 /* Draw */) { // 已领取
                        this._status = 2;
                        this.btn_buy.visible = false;
                        this.img_buy.visible = true;
                    }
                    else if (curScore >= needCnt) { // 可领取
                        this._status = 1;
                        this.btn_buy.visible = true;
                        this.img_buy.visible = false;
                        this.btn_buy.redPoint.visible = true;
                    }
                    else { // 不可领取
                        this._status = 0;
                        this.btn_buy.visible = true;
                        this.img_buy.visible = false;
                        this.btn_buy.redPoint.visible = false;
                    }
                };
                YouliScoreItemRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this._status == 1) {
                        this._proxy.c2s_tour_fuli_buy(this.data.index);
                    }
                };
                return YouliScoreItemRender;
            }(mod.BaseListenerRenderer));
            compete.YouliScoreItemRender = YouliScoreItemRender;
            __reflect(YouliScoreItemRender.prototype, "game.mod.compete.YouliScoreItemRender");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliScoreView = /** @class */ (function (_super) {
                __extends(YouliScoreView, _super);
                function YouliScoreView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliScoreSkin";
                    return _this;
                }
                return YouliScoreView;
            }(eui.Component));
            compete.YouliScoreView = YouliScoreView;
            __reflect(YouliScoreView.prototype, "game.mod.compete.YouliScoreView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliTreasureView = /** @class */ (function (_super) {
                __extends(YouliTreasureView, _super);
                function YouliTreasureView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliTreasureSkin";
                    return _this;
                }
                return YouliTreasureView;
            }(eui.Component));
            compete.YouliTreasureView = YouliTreasureView;
            __reflect(YouliTreasureView.prototype, "game.mod.compete.YouliTreasureView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliView = /** @class */ (function (_super) {
                __extends(YouliView, _super);
                function YouliView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliViewSkin";
                    return _this;
                }
                return YouliView;
            }(eui.Component));
            compete.YouliView = YouliView;
            __reflect(YouliView.prototype, "game.mod.compete.YouliView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var YouliWinRewardItem = /** @class */ (function (_super) {
                __extends(YouliWinRewardItem, _super);
                function YouliWinRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YouliWinRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClick, this);
                };
                YouliWinRewardItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    if (this._canDraw) {
                        this._proxy.c2s_tour_win_get_list(cfg.index);
                        return;
                    }
                    var tips = game.StringUtil.substitute(game.getLanById("youli_award_tips" /* youli_award_tips */), [cfg.count]);
                    mod.ViewMgr.getIns().showBoxReward(tips, cfg.reward);
                };
                YouliWinRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.currentState = (this.itemIndex + 1).toString();
                    var cfg = this.data;
                    this.lab_value.text = cfg.count + "";
                    var status = this._proxy.getYouliWinRewardStatus(cfg);
                    var canDraw = status == 1 /* Finish */;
                    this._canDraw = canDraw;
                    var hasDraw = status == 2 /* Draw */;
                    this.redPoint.visible = canDraw;
                    this.img_got.visible = hasDraw;
                    this.removeEft();
                    if (canDraw) {
                        this.addEftByParent("tongyongbaoxiang" /* CommonBox */, this.btn_box.group_eft);
                    }
                };
                return YouliWinRewardItem;
            }(mod.BaseRenderer));
            compete.YouliWinRewardItem = YouliWinRewardItem;
            __reflect(YouliWinRewardItem.prototype, "game.mod.compete.YouliWinRewardItem");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var CompeteModel = /** @class */ (function () {
                function CompeteModel() {
                    this.topRank = {};
                    this.youliWinCnt = 0; // 今日胜利次数
                    this.youliWinList = []; // 今日已领取胜利奖励
                    // 阶段奖励
                    this.challengeCnt = 0; // 累计完成游历次数
                    this.stepAwards = {}; // 可领取、已领取的阶段奖励列表
                    // 积分福利
                    this.dayScore = 0; // 今日获得的分数
                    this.scoreAwards = {}; // 可领取、已领取的积分奖励列表
                    // 许愿宝箱
                    this.wishBoxAwardArr = []; // 已领取的许愿奖励列表
                    this.youliHint = ["52" /* Compete */, "01" /* CompeteMain */, "01" /* Youli */]; //入口、标签页红点
                    this.youliChallengeHint = ["52" /* Compete */, "01" /* CompeteMain */, "01" /* Youli */, "111" /* YouliChallenge */]; //挑战红点
                    this.rankList1 = [];
                    this.endTime1 = 0;
                    this.rankList2 = [];
                    this.endTime2 = 0;
                    this.rankList3 = [];
                    this.endTime3 = 0;
                    this.challengeHint = ["52" /* Compete */, "01" /* CompeteMain */, "02" /* Doufa */, "83" /* DoufaChallenge */]; //挑战匹配红点
                    this.rewardHint = ["52" /* Compete */, "01" /* CompeteMain */, "02" /* Doufa */, "84" /* DoufaReward */]; //阶段奖励红点
                    this.winRewardHint = ["52" /* Compete */, "01" /* CompeteMain */, "02" /* Doufa */, "85" /* DoufaWinReward */]; //连胜奖励红点
                    this.rewardCostIndexs = []; //阶段奖励购买时消耗的道具,角色身上属性字段
                    this.auto = false; //自动挑战
                    this.groupStatus = 0 /* Score */;
                    /************************** 跨服斗法 *************************/
                    this.state = 4 /* End */;
                    this.hasEnroll = false;
                    this.leftCnt = 0;
                    this.isJoin = false;
                    this.rankList = {};
                    this.myRank = {};
                    this.scoreList = [];
                    this.myScore = 0;
                    this.redCampScore = 0;
                    this.redCampNum = 0;
                    this.blueCampScore = 0;
                    this.blueCampNum = 0;
                    this.bossHpInfos = {};
                    this.attackStatus = 1 /* Attack */;
                    this.noticeList = [];
                    this.taskHint = ["52" /* Compete */, "01" /* CompeteMain */, "03" /* KuafuDoufa */];
                    this.taskHint2 = ["61" /* More */, "30" /* HuangguMain */, "01" /* Huanggu */, "150" /* KuafuDoufa */]; //荒古入口也设置下
                    this.idx_cds = {};
                }
                return CompeteModel;
            }());
            compete.CompeteModel = CompeteModel;
            __reflect(CompeteModel.prototype, "game.mod.compete.CompeteModel");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliWishBoxView = /** @class */ (function (_super) {
                __extends(YouliWishBoxView, _super);
                function YouliWishBoxView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.compete.YouliWishBoxSkin";
                    return _this;
                }
                return YouliWishBoxView;
            }(eui.Component));
            compete.YouliWishBoxView = YouliWishBoxView;
            __reflect(YouliWishBoxView.prototype, "game.mod.compete.YouliWishBoxView");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var CompeteMainMdr = /** @class */ (function (_super) {
                __extends(CompeteMainMdr, _super);
                function CompeteMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "compete_tab",
                            mdr: compete.CompeteMdr,
                            title: "compete" /* compete */,
                            hintTypes: ["52" /* Compete */, "01" /* CompeteMain */],
                        }
                    ];
                    return _this;
                }
                return CompeteMainMdr;
            }(mod.WndBaseMdr));
            compete.CompeteMainMdr = CompeteMainMdr;
            __reflect(CompeteMainMdr.prototype, "game.mod.compete.CompeteMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var CompeteMdr = /** @class */ (function (_super) {
                __extends(CompeteMdr, _super);
                function CompeteMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.CompeteView);
                    return _this;
                }
                CompeteMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                CompeteMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.grp1, TouchEvent.TOUCH_TAP, this.onClickYouli);
                    addEventListener(this._view.grp2, TouchEvent.TOUCH_TAP, this.onClickDoufa);
                    addEventListener(this._view.grp3, TouchEvent.TOUCH_TAP, this.onClickXianjiezhengba);
                    addEventListener(this._view.btn_shop, TouchEvent.TOUCH_TAP, this.onClickShop);
                    this.onNt("on_rank_info_update" /* ON_RANK_INFO_UPDATE */, this.updateYouliRank, this);
                    this.onNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */, this.onDoufaRankUpdate, this);
                    this.onNt("update_doufa_info" /* UPDATE_DOUFA_INFO */, this.updateDoufaCnt, this);
                };
                CompeteMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateYouli();
                    this.updateDoufa();
                    this.updateShop();
                    this.showGuide();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                CompeteMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(21 /* CompeteYouli */); //清除指引
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                /****************************************游历**************************************/
                CompeteMdr.prototype.onClickYouli = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "02" /* YouliMain */);
                };
                CompeteMdr.prototype.updateYouli = function () {
                    this.reqYouliRankInfo();
                    this.updateYouliTime();
                    this.updateYouliRank();
                    this.updateYouliCnt();
                    this.updateYouliHint();
                };
                CompeteMdr.prototype.reqYouliRankInfo = function () {
                    mod.RankUtil.c2s_new_rank_req_rank(1002 /* Type4 */);
                };
                CompeteMdr.prototype.updateYouliTime = function () {
                    var endTime = this._proxy.rankEndTime;
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem1.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                CompeteMdr.prototype.updateYouliRank = function () {
                    var rankInfo = mod.RankUtil.getRankInfo(1002 /* Type4 */);
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    var rankStr2 = rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= game.MAX_RANK_NUM ? rankInfo.my_info.rank_no + "" : game.MAX_RANK_NUM + "+"; //20+
                    rankStr += game.TextUtil.addColor(rankStr2, 8585074 /* GREEN */);
                    this._view.lab_rank1.textFlow = game.TextUtil.parseHtml(rankStr);
                };
                CompeteMdr.prototype.updateYouliCnt = function () {
                    var remainTimes = this._proxy.maxFightTimes - this._proxy.curFightTimes || 0;
                    var timesStr = game.getLanById("exp_tip0" /* exp_tip0 */) + "：" + game.TextUtil.addColor(remainTimes + "/" + this._proxy.maxFightTimes, 8585074 /* GREEN */);
                    this._view.lab_cnt1.textFlow = game.TextUtil.parseHtml(timesStr);
                };
                CompeteMdr.prototype.updateYouliHint = function () {
                    this._view.redPoint1.visible = mod.HintMgr.getHint(["52" /* Compete */, "01" /* CompeteMain */, "01" /* Youli */]);
                };
                /****************************************斗法**************************************/
                CompeteMdr.prototype.onClickDoufa = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670122 /* Doufa */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "19" /* DoufaMain */);
                };
                CompeteMdr.prototype.onDoufaRankUpdate = function () {
                    this.updateDoufaTime();
                    this.updateDoufaRank();
                };
                CompeteMdr.prototype.updateDoufa = function () {
                    this._isDoufaOpen = mod.ViewMgr.getIns().checkViewOpen(1041670122 /* Doufa */);
                    this.reqDoufaRankInfo();
                    this.updateDoufaTime(); //返回后刷新
                    this.updateDoufaRank();
                    this.updateDoufaCnt();
                    this.updateDoufaOpen();
                    this.updateDoufaHint();
                };
                CompeteMdr.prototype.reqDoufaRankInfo = function () {
                    if (!this._isDoufaOpen) {
                        return;
                    }
                    this._proxy.c2s_pvp_battle_get_rank_info(1 /* Type1 */);
                };
                CompeteMdr.prototype.updateDoufaTime = function () {
                    if (!this._isDoufaOpen) {
                        this._view.timeItem2.visible = false;
                        return;
                    }
                    this._view.timeItem2.visible = true;
                    var endTime = this._proxy.getEndTime(1 /* Type1 */);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem2.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                CompeteMdr.prototype.updateDoufaRank = function () {
                    if (!this._isDoufaOpen) {
                        this._view.lab_rank2.text = "";
                        return;
                    }
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    var myRankInfo = this._proxy.getMyRankInfo(1 /* Type1 */);
                    var rankStr2 = myRankInfo && myRankInfo.rank_num <= game.MAX_RANK_NUM ? myRankInfo.rank_num + "" : game.MAX_RANK_NUM + "+"; //20+
                    rankStr += game.TextUtil.addColor(rankStr2, 8585074 /* GREEN */);
                    this._view.lab_rank2.textFlow = game.TextUtil.parseHtml(rankStr);
                };
                CompeteMdr.prototype.updateDoufaCnt = function () {
                    if (!this._isDoufaOpen) {
                        this._view.lab_cnt2.text = "";
                        return;
                    }
                    var cfg = game.GameConfig.getParamConfigById("doufa_count");
                    var maxCnt = cfg && cfg.value;
                    var cnt = this._proxy.cnt;
                    var cntStr = game.getLanById("exp_tip0" /* exp_tip0 */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 8585074 /* GREEN */);
                    this._view.lab_cnt2.textFlow = game.TextUtil.parseHtml(cntStr);
                };
                CompeteMdr.prototype.updateDoufaOpen = function () {
                    if (this._isDoufaOpen) {
                        this._view.lab_open2.text = "";
                        return;
                    }
                    this._view.lab_open2.text = mod.ViewMgr.getIns().getOpenFuncShow(1041670122 /* Doufa */);
                };
                CompeteMdr.prototype.updateDoufaHint = function () {
                    this._view.redPoint2.visible = mod.HintMgr.getHint(["52" /* Compete */, "01" /* CompeteMain */, "02" /* Doufa */]);
                };
                /****************************************仙界争霸**************************************/
                CompeteMdr.prototype.onClickXianjiezhengba = function () {
                    game.PromptBox.getIns().show("敬请期待");
                };
                /****************************************公共**************************************/
                CompeteMdr.prototype.onClickShop = function () {
                    mod.ViewMgr.getIns().showViewByID(56 /* ExchangeType3 */);
                };
                CompeteMdr.prototype.updateShop = function () {
                    this._view.item.setData(1450000011 /* Jingjibi */);
                };
                CompeteMdr.prototype.update = function (time) {
                    this.updateYouliTime();
                    this.updateDoufaTime();
                };
                CompeteMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(21 /* CompeteYouli */, this._view.grp1, Handler.alloc(this, this.onClickYouli)); //指引
                };
                return CompeteMdr;
            }(game.EffectMdrBase));
            compete.CompeteMdr = CompeteMdr;
            __reflect(CompeteMdr.prototype, "game.mod.compete.CompeteMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var DoufaFailMdr = /** @class */ (function (_super) {
                __extends(DoufaFailMdr, _super);
                function DoufaFailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaFailView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                DoufaFailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaFailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateScore();
                    this.removeEft();
                    this.addEftByParent("default" /* Default */, this._view.gr_eft, 0, 0, 0, null, 1, 1, false);
                };
                DoufaFailMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    _super.prototype.onHide.call(this);
                };
                //显示奖励
                DoufaFailMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                DoufaFailMdr.prototype.updateScore = function () {
                    var info = this._showArgs;
                    var name = game.TextUtil.addColor(info.name, 8585074 /* GREEN */);
                    var tips = game.StringUtil.substitute(game.getLanById("doufa_tips14" /* doufa_tips14 */), [name]);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tips);
                    var addScore = info.value;
                    this._view.lab_score.text = game.getLanById("zmFight_tips3" /* zmFight_tips3 */) + "-" + addScore;
                    var score = this._proxy.score - addScore;
                    var maxScore = this._proxy.getMaxScore();
                    this._view.bar.show(score, maxScore, false, 0, false);
                    var lv = this._proxy.lv;
                    this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                DoufaFailMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return DoufaFailMdr;
            }(game.EffectMdrBase));
            compete.DoufaFailMdr = DoufaFailMdr;
            __reflect(DoufaFailMdr.prototype, "game.mod.compete.DoufaFailMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var DoufaFinalsMdr = /** @class */ (function (_super) {
                __extends(DoufaFinalsMdr, _super);
                function DoufaFinalsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaFinalsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                DoufaFinalsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = compete.DoufaTabItem;
                    this._view.list_type.dataProvider = this._btnList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaFinalsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    this.onNt("update_doufa_group_info" /* UPDATE_DOUFA_GROUP_INFO */, this.onInfoUpdate, this);
                };
                DoufaFinalsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    //this.typeUpdateInfo();
                    this._proxy.c2s_pvp_battle_group_pk_info();
                };
                DoufaFinalsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                DoufaFinalsMdr.prototype.onClickType = function (e) {
                    var type = e.itemIndex + 1;
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this.typeUpdateInfo();
                };
                DoufaFinalsMdr.prototype.onInfoUpdate = function () {
                    this.typeUpdateInfo();
                };
                DoufaFinalsMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 1; i <= 4 /* Type4 */; ++i) {
                        datas.push(i);
                    }
                    this._btnList.source = datas;
                    this._selType = datas[0];
                    this._view.list_type.selectedIndex = this._selType - 1;
                };
                DoufaFinalsMdr.prototype.typeUpdateInfo = function () {
                    this._view.player.updateShow(this._selType);
                };
                return DoufaFinalsMdr;
            }(game.MdrBase));
            compete.DoufaFinalsMdr = DoufaFinalsMdr;
            __reflect(DoufaFinalsMdr.prototype, "game.mod.compete.DoufaFinalsMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var DoufaGuessMdr = /** @class */ (function (_super) {
                __extends(DoufaGuessMdr, _super);
                function DoufaGuessMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaGuessView);
                    _this.isEasyHide = true;
                    return _this;
                }
                DoufaGuessMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaGuessMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_guess, TouchEvent.TOUCH_TAP, this.onClickGuess);
                };
                DoufaGuessMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                };
                DoufaGuessMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                DoufaGuessMdr.prototype.onClickGuess = function () {
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    var info = this._showArgs;
                    this._proxy.c2s_pvp_battle_guess(info.role_id);
                };
                DoufaGuessMdr.prototype.updateShow = function () {
                    var info = this._showArgs;
                    this._view.img_head.source = game.ResUtil.getDressUpIcon(info.head.toNumber(), info.sex);
                    this._view.lab_name.text = info.name;
                    this._view.power.setPowerValue(info.showpower, 3496307 /* DEFAULT */);
                    var cfg = game.GameConfig.getParamConfigById("doufa_times");
                    var costInfoList = cfg.value;
                    var costInfo = []; //倍率_货币_货币数量
                    if (this._proxy.groupStatus == 1 /* First */) {
                        //小组赛
                        costInfo = costInfoList[0];
                    }
                    else {
                        costInfo = costInfoList[1];
                    }
                    var doubleValue = costInfo[0];
                    var doubleStr = game.getLanById("doufa_tips17" /* doufa_tips17 */) + "：" + game.TextUtil.addColor(doubleValue + "%", 2330156 /* GREEN */);
                    this._view.lab_double.textFlow = game.TextUtil.parseHtml(doubleStr);
                    var idx = costInfo[1];
                    var cnt = costInfo[2];
                    this._cost = [idx, cnt];
                    this._view.costIcon.updateShow(this._cost);
                    //2.5倍仙玉
                    var propCfg = game.GameConfig.getPropConfigById(idx);
                    var tips1 = (doubleValue / 100) + "";
                    var tips2 = propCfg.name;
                    var tipsStr = game.StringUtil.substitute(game.getLanById("doufa_tips18" /* doufa_tips18 */), [tips1, tips2]); //竞猜成功获%s倍%s，竞猜失败原额返还
                    this._view.lab_tips.text = tipsStr;
                };
                return DoufaGuessMdr;
            }(game.MdrBase));
            compete.DoufaGuessMdr = DoufaGuessMdr;
            __reflect(DoufaGuessMdr.prototype, "game.mod.compete.DoufaGuessMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaMainMdr = /** @class */ (function (_super) {
                __extends(DoufaMainMdr, _super);
                function DoufaMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "02" /* Doufa */,
                            icon: "doufa_tab",
                            mdr: compete.DoufaMdr,
                            title: "doufa_tips19" /* doufa_tips19 */,
                            bg: "doufa_bg1",
                            hintTypes: ["52" /* Compete */, "01" /* CompeteMain */, "02" /* Doufa */],
                        },
                        {
                            btnType: "03" /* KuafuDoufa */,
                            icon: "kuafu_doufa_tab",
                            mdr: compete.KuafuDoufaMdr,
                            openIdx: 1041670251 /* KuafuDoufa */,
                            title: "kuafu_doufa_tips" /* kuafu_doufa_tips */,
                            bg: "kuafu_doufa_bg",
                            hintTypes: ["52" /* Compete */, "01" /* CompeteMain */, "03" /* KuafuDoufa */],
                        }
                    ];
                    return _this;
                }
                return DoufaMainMdr;
            }(mod.WndBaseMdr));
            compete.DoufaMainMdr = DoufaMainMdr;
            __reflect(DoufaMainMdr.prototype, "game.mod.compete.DoufaMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var ItemTapEvent = eui.ItemTapEvent;
            var DoufaMdr = /** @class */ (function (_super) {
                __extends(DoufaMdr, _super);
                function DoufaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.DoufaView);
                    _this.TIME_TICK = 3;
                    _this._autoFlag = false; //自动挑战成功的标志
                    return _this;
                }
                DoufaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._winList = new ArrayCollection();
                    this._view.reward_view.list_win.itemRenderer = compete.DoufaWinRewardItem;
                    this._view.reward_view.list_win.dataProvider = this._winList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = compete.DoufaTabItem;
                    this._view.list_type.dataProvider = this._btnList;
                    this._view.reward_view.img_tips.source = "shenglicishu";
                };
                DoufaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
                    addEventListener(this._view.btn_rule2, TouchEvent.TOUCH_TAP, this.onClickRule);
                    addEventListener(this._view.btn_finals, TouchEvent.TOUCH_TAP, this.onClickFinals);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_rank2, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_record, TouchEvent.TOUCH_TAP, this.onClickRecord);
                    addEventListener(this._view.btn_record2, TouchEvent.TOUCH_TAP, this.onClickRecord);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckBox);
                    addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    this.onNt("update_doufa_info" /* UPDATE_DOUFA_INFO */, this.updateFirst, this);
                    this.onNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */, this.updateTime, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("doufa_reset_challenge" /* DOUFA_RESET_CHALLENGE */, this.resetCheckBox, this);
                    this.onNt("update_doufa_group_info" /* UPDATE_DOUFA_GROUP_INFO */, this.onInfoUpdate, this);
                    this.onNt("update_doufa_guess_info" /* UPDATE_DOUFA_GUESS_INFO */, this.onGuessUpdate, this);
                };
                DoufaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateViewState();
                    this.updateHint();
                };
                DoufaMdr.prototype.onHide = function () {
                    this._autoFlag = false;
                    this._eftStrRank = null;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                DoufaMdr.prototype.removeEffectRank = function () {
                    if (this._eftIdRank) {
                        this.removeEffect(this._eftIdRank);
                        this._eftIdRank = null;
                    }
                };
                DoufaMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("doufa_wanfa" /* doufa_wanfa */));
                };
                DoufaMdr.prototype.onClickFinals = function () {
                    mod.ViewMgr.getIns().showSecondPop("52" /* Compete */, "27" /* DoufaFinals */);
                };
                DoufaMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "23" /* DoufaRankMain */);
                };
                DoufaMdr.prototype.onClickRecord = function () {
                    mod.ViewMgr.getIns().showSecondPop("52" /* Compete */, "24" /* DoufaRecord */);
                };
                DoufaMdr.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "20" /* DoufaRewardMain */);
                };
                DoufaMdr.prototype.onClickChallenge = function () {
                    this._autoFlag = true;
                    var cnt = this._proxy.cnt;
                    if (!cnt) {
                        var showTips = game.getLanById("guaji_shouyi_tips07" /* guaji_shouyi_tips07 */);
                        this.onAdd(showTips);
                        return;
                    }
                    this._proxy.c2s_pvp_battle_get_player_challenge_info();
                };
                DoufaMdr.prototype.onClickAdd = function () {
                    this.onAdd();
                };
                DoufaMdr.prototype.onAdd = function (showTips) {
                    if (!this._maxBuyCnt) {
                        /**挑战次数已达上限*/
                        if (!showTips) {
                            showTips = game.getLanById("compete_mars_8" /* compete_mars_8 */);
                        }
                        game.PromptBox.getIns().show(showTips);
                        return;
                    }
                    // 1、有道具的时候，优先使用道具，再购买次数
                    // 2、没有购买次数时候，弹道具获取途径
                    var index = 1450706001 /* DoufaJuanzhou */;
                    var propCnt = mod.BagUtil.getPropCntByIdx(index);
                    if (propCnt > 0) {
                        //使用道具
                        mod.ViewMgr.getIns().showPropTips(index, 2 /* Bag */);
                        return;
                    }
                    var cfg1 = game.GameConfig.getParamConfigById("doufa_count_buy");
                    var maxCnt = cfg1.value;
                    var cnt = maxCnt - this._proxy.buyCnt;
                    if (cnt <= 0) {
                        // if(!showTips){
                        //     showTips = getLanById(LanDef.compete_mars_9);
                        // }
                        // PromptBox.getIns().show(showTips);
                        //弹道具获取途径
                        mod.ViewMgr.getIns().showGainWaysTips(index);
                        return;
                    }
                    var tips = game.getLanById("doufa_tips7" /* doufa_tips7 */);
                    var cfg2 = game.GameConfig.getParamConfigById("doufacount_consume");
                    var cost = cfg2.value;
                    //购买次数
                    mod.ViewMgr.getIns().showBuyTimes(tips, cost, cnt, this._maxBuyCnt, maxCnt, Handler.alloc(this._proxy, this._proxy.c2s_pvp_battle_buy_count));
                };
                DoufaMdr.prototype.onClickCheckBox = function () {
                    var cnt = this._proxy.cnt;
                    if (!cnt) {
                        var showTips = game.getLanById("guaji_shouyi_tips07" /* guaji_shouyi_tips07 */);
                        game.PromptBox.getIns().show(showTips);
                    }
                    else {
                        var auto = this._proxy.auto;
                        this._proxy.auto = !auto;
                    }
                    this._autoFlag = false;
                    this.updateCheckBox();
                };
                /** 通用红点事件监听 */
                DoufaMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._proxy.rewardHint)) {
                        this.updateRewardHint(data.value);
                    }
                };
                DoufaMdr.prototype.updateViewState = function () {
                    if (this._proxy.groupStatus == 0 /* Score */) {
                        this._view.currentState = "1";
                        this.updateFirst();
                        if (!TimeMgr.hasUpdateItem(this)) {
                            TimeMgr.addUpdateItem(this, 1000);
                        }
                    }
                    else {
                        this._view.currentState = "2";
                        this.updateSecond();
                    }
                };
                DoufaMdr.prototype.updateFirst = function () {
                    this.updateScore();
                    this.updateWin();
                    this.updateCnt();
                    this.updateCheckBox();
                    this.updateTime();
                };
                DoufaMdr.prototype.updateScore = function () {
                    var score = this._proxy.score;
                    var maxScore = this._proxy.getMaxScore();
                    var lv = this._proxy.lv;
                    var nextLv = lv + 1;
                    var nextCfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, nextLv);
                    var isMaxLv = !nextCfg; //最高段位
                    this._view.img_lv.source = "doufa_lv" + lv;
                    //this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
                    var uiEftSrc = "doufa_rank" + lv;
                    if (this._eftStrRank != uiEftSrc) {
                        this._eftStrRank = uiEftSrc;
                        this.removeEffectRank();
                        this._eftIdRank = this.addEftByParent(uiEftSrc, this._view.grp_eft);
                    }
                    this._view.bar.show(score, maxScore, false, 0, false);
                    this._view.lab_max.visible = isMaxLv;
                    this._view.list_reward.visible = !isMaxLv;
                    if (this._view.list_reward.visible) {
                        this._itemList.source = nextCfg.reward;
                    }
                };
                DoufaMdr.prototype.updateWin = function () {
                    var winCnt = this._proxy.winCnt;
                    this._view.reward_view.lab_win.text = winCnt + "";
                    var cfgList = game.getConfigListByName("magic_win.json" /* MagicWin */);
                    this._winList.source = cfgList;
                    var cfg = cfgList[cfgList.length - 1];
                    var maxCnt = cfg.count;
                    this._view.reward_view.bar2.show(winCnt, maxCnt, false, 0, false, 2 /* NoValue */);
                };
                DoufaMdr.prototype.updateCnt = function () {
                    var cfg = game.GameConfig.getParamConfigById("doufa_count");
                    var maxCnt = cfg && cfg.value;
                    var cnt = this._proxy.cnt;
                    this._maxBuyCnt = maxCnt - cnt;
                    var cntStr = game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.btn_challenge.redPoint.visible = cnt > 0;
                };
                DoufaMdr.prototype.updateCheckBox = function () {
                    var auto = this._proxy.auto;
                    var cnt = this._proxy.cnt;
                    if (!cnt && auto) {
                        this._proxy.auto = auto = false; //没有次数时重置自动挑战
                    }
                    this._view.checkbox.selected = auto;
                    if (auto && !this._autoFlag) {
                        this._time = this.TIME_TICK;
                        this.updateCheckBoxShow();
                    }
                    else {
                        this._view.checkbox.labelDisplay.text = "自动挑战";
                    }
                };
                DoufaMdr.prototype.updateCheckBoxShow = function () {
                    var str = this._time + "S后自动挑战";
                    this._view.checkbox.labelDisplay.text = str;
                };
                DoufaMdr.prototype.resetCheckBox = function () {
                    //匹配失败时重置倒计时
                    this._autoFlag = false;
                    this._time = this.TIME_TICK;
                };
                DoufaMdr.prototype.update = function (time) {
                    if (this._proxy.auto && !this._autoFlag) {
                        this._time--;
                        this.updateCheckBoxShow();
                        if (this._time <= 0) {
                            this.onClickChallenge(); //自动挑战
                        }
                    }
                    this.updateTime();
                };
                /** 更新红点 */
                DoufaMdr.prototype.updateHint = function () {
                    this.updateRewardHint(mod.HintMgr.getHint(this._proxy.rewardHint));
                };
                DoufaMdr.prototype.updateRewardHint = function (hint) {
                    this._view.btn_reward.redPoint.visible = hint;
                };
                DoufaMdr.prototype.updateTime = function () {
                    var endTime = this._proxy.getEndTime(1 /* Type1 */);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                /****************************决赛********************************/
                DoufaMdr.prototype.updateSecond = function () {
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.updateGuessCnt();
                    this.updateTips();
                };
                DoufaMdr.prototype.onClickBattle = function () {
                    //todo
                    game.PromptBox.getIns().show("待处理");
                };
                DoufaMdr.prototype.onClickType = function (e) {
                    var type = e.itemIndex + 1;
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this.typeUpdateInfo();
                };
                DoufaMdr.prototype.onInfoUpdate = function () {
                    this.updateViewState();
                };
                DoufaMdr.prototype.onGuessUpdate = function () {
                    this.typeUpdateInfo();
                    this.updateGuessCnt();
                };
                DoufaMdr.prototype.initTypeList = function () {
                    var datas = [];
                    var groupStatus = this._proxy.groupStatus;
                    if (groupStatus == 1 /* First */) {
                        //小组赛
                        for (var i = 1; i <= 4 /* Type4 */; ++i) {
                            datas.push(i);
                        }
                    }
                    else {
                        //决赛
                        datas.push(5 /* Type5 */);
                    }
                    this._btnList.source = datas;
                    this._selType = datas[0];
                    this._view.list_type.selectedIndex = this._selType - 1;
                };
                DoufaMdr.prototype.typeUpdateInfo = function () {
                    this._view.player.updateShow(this._selType);
                };
                DoufaMdr.prototype.updateGuessCnt = function () {
                    var cnt = this._proxy.getGuessCnt();
                    var maxCnt = this._proxy.guessMaxCnt;
                    var cntStr = game.getLanById("doufa_tips16" /* doufa_tips16 */) + game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 8585074 /* GREEN */);
                    this._view.lab_guessCnt.textFlow = game.TextUtil.parseHtml(cntStr);
                };
                DoufaMdr.prototype.updateTips = function () {
                    var status = this._proxy.groupStatus;
                    //小组赛
                    //未开启时显示：本届众仙斗法将于周日12:00开启战斗
                    var tipsStr = game.getLanById("doufa_open_tips1" /* doufa_open_tips1 */);
                    //开启时显示：“进入战斗”按钮，todo
                    this._view.btn_battle.visible = false;
                    //决赛
                    if (status == 2 /* Second */) {
                        var isEnd = TimeMgr.time.serverTimeSecond >= this._proxy.groupTime;
                        if (isEnd) {
                            //结束后显示：下一届众仙斗法将于明日0点开启
                            tipsStr = game.getLanById("doufa_open_tips3" /* doufa_open_tips3 */);
                        }
                        else {
                            //未开启时显示：本轮比赛将在周日18：00开启
                            tipsStr = game.getLanById("doufa_open_tips2" /* doufa_open_tips2 */);
                            //开启时显示：“进入战斗”按钮，todo
                        }
                    }
                    this._view.lab_tips.text = tipsStr;
                };
                return DoufaMdr;
            }(game.EffectMdrBase));
            compete.DoufaMdr = DoufaMdr;
            __reflect(DoufaMdr.prototype, "game.mod.compete.DoufaMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var Handler = base.Handler;
            var facade = base.facade;
            var delayCall = base.delayCall;
            var DoufaQuickWinMdr = /** @class */ (function (_super) {
                __extends(DoufaQuickWinMdr, _super);
                function DoufaQuickWinMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaQuickWinView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                DoufaQuickWinMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaQuickWinMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateScore();
                };
                DoufaQuickWinMdr.prototype.onHide = function () {
                    facade.sendNt("doufa_reset_challenge" /* DOUFA_RESET_CHALLENGE */);
                    _super.prototype.onHide.call(this);
                };
                //显示奖励
                DoufaQuickWinMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                DoufaQuickWinMdr.prototype.updateScore = function () {
                    var info = this._showArgs;
                    var addScore = info.addscore;
                    var score = this._proxy.score + addScore;
                    var maxScore = this._proxy.getMaxScore();
                    this._view.bar.show(score, maxScore, false, 0, false);
                    this._view.lab_score.text = game.getLanById("zmFight_tips3" /* zmFight_tips3 */) + "+" + addScore;
                    var lv = this._proxy.lv;
                    this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                DoufaQuickWinMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return DoufaQuickWinMdr;
            }(game.EffectMdrBase));
            compete.DoufaQuickWinMdr = DoufaQuickWinMdr;
            __reflect(DoufaQuickWinMdr.prototype, "game.mod.compete.DoufaQuickWinMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaRankMainMdr = /** @class */ (function (_super) {
                __extends(DoufaRankMainMdr, _super);
                function DoufaRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "benfupaimingbiaoqian",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: compete.DoufaRankMdr1,
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "kuafu_rank_tab",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: compete.DoufaRankMdr2,
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "dianfengpaimingbiaoqiantubiao",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: compete.DoufaRankMdr3,
                        },
                    ];
                    return _this;
                }
                return DoufaRankMainMdr;
            }(mod.WndBaseMdr));
            compete.DoufaRankMainMdr = DoufaRankMainMdr;
            __reflect(DoufaRankMainMdr.prototype, "game.mod.compete.DoufaRankMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var DoufaRankMdr1 = /** @class */ (function (_super) {
                __extends(DoufaRankMdr1, _super);
                function DoufaRankMdr1() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._rankType = 1 /* Type1 */;
                    return _this;
                }
                DoufaRankMdr1.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                DoufaRankMdr1.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */, this.onRankUpdate, this);
                };
                DoufaRankMdr1.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.onRankUpdate(); //不确定服务端会不会返回数据
                    this.reqRankInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                DoufaRankMdr1.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                DoufaRankMdr1.prototype.onRankUpdate = function () {
                    this.updateShow();
                    this.updateTime();
                };
                DoufaRankMdr1.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.source = "jifen";
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.img_myRank.visible = false;
                    this._view.lab_rank.x = this._view.img_myRank.x;
                    this._view.timeItem.visible = true;
                    var pCfg = game.GameConfig.getParamConfigById("doufa_runk_condition");
                    var rankLimit = pCfg.value;
                    var upCfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, rankLimit);
                    var rankStr = game.StringUtil.substitute(game.getLanById("doufa_tips9" /* doufa_tips9 */), [upCfg.name]);
                    this._view.lab_rank.text = rankStr;
                    var firstRankCfg = game.getConfigByNameId("magic_rank.json" /* MagicRank */, 1);
                    var firstLimit = firstRankCfg.limit;
                    var firstUpCfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, firstLimit);
                    var index = firstRankCfg.other_reward[0][0];
                    var propCfg = game.getConfigById(index);
                    var propName = "“" + propCfg.name + "”";
                    var tipsStr = game.StringUtil.substitute(game.getLanById("doufa_tips8" /* doufa_tips8 */), [firstUpCfg.name, propName]);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(tipsStr, 2330156 /* GREEN */));
                };
                DoufaRankMdr1.prototype.updateShow = function () {
                    var ranks = this._proxy.getRankList(this._rankType);
                    var topInfo = this._proxy.getTopInfo(this._rankType);
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var lv = this._proxy.lv;
                    var cfg = game.getConfigByNameId("magic_up.json" /* MagicUp */, lv);
                    this._view.lab_num.text = game.getLanById("doufa_tips10" /* doufa_tips10 */) + "：" + cfg.name; //我的段位：白银
                    var infos = [];
                    for (var i = 0; i < game.MAX_RANK_SHOW; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var reward = this.getReward(rank);
                        // let rankInfo = this.getRankInfo(rank, ranks);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo) {
                            name = rankInfo.name;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var rankStr = void 0;
                        if (rank == game.MAX_RANK_SHOW) {
                            //21名不显示名称和积分
                            name = hurtStr = "";
                            rankStr = game.MAX_RANK_SHOW + "+";
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward,
                            rankStr: rankStr
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                DoufaRankMdr1.prototype.getReward = function (rank) {
                    var cfgList = game.getConfigListByName("magic_rank.json" /* MagicRank */);
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        var rankStart = cfg.rank_section[0];
                        var rankEnd = cfg.rank_section[1];
                        if (rank >= rankStart && rank <= rankEnd) {
                            var reward = cfg.reward;
                            if (cfg.other_reward && cfg.other_reward.length) {
                                reward = reward.concat(cfg.other_reward);
                            }
                            return reward.slice(0, 2);
                        }
                    }
                    return [];
                };
                DoufaRankMdr1.prototype.update = function (time) {
                    this.updateTime();
                };
                DoufaRankMdr1.prototype.updateTime = function () {
                    var endTime = this._proxy.getEndTime(this._rankType);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime == 0) {
                        this.reqRankInfo();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                DoufaRankMdr1.prototype.reqRankInfo = function () {
                    this._proxy.c2s_pvp_battle_get_rank_info(this._rankType);
                };
                return DoufaRankMdr1;
            }(game.EffectMdrBase));
            compete.DoufaRankMdr1 = DoufaRankMdr1;
            __reflect(DoufaRankMdr1.prototype, "game.mod.compete.DoufaRankMdr1", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var DoufaRankMdr2 = /** @class */ (function (_super) {
                __extends(DoufaRankMdr2, _super);
                function DoufaRankMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._maxRank = 16; //显示前16名
                    _this._rankType = 2 /* Type2 */;
                    return _this;
                }
                DoufaRankMdr2.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankCommonRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                DoufaRankMdr2.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */, this.onRankUpdate, this);
                };
                DoufaRankMdr2.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.onRankUpdate(); //不确定服务端会不会返回数据
                    this.reqRankInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                DoufaRankMdr2.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                DoufaRankMdr2.prototype.onRankUpdate = function () {
                    this.updateShow();
                    this.updateTime();
                };
                DoufaRankMdr2.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.visible = false;
                    this._view.img_type3.source = "jifen";
                    this._view.timeItem.visible = true;
                    var tipsStr = game.StringUtil.substitute(game.getLanById("doufa_tips11" /* doufa_tips11 */), [this._maxRank]);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(tipsStr, 2330156 /* GREEN */));
                };
                DoufaRankMdr2.prototype.updateShow = function () {
                    var ranks = this._proxy.getRankList(this._rankType);
                    var topInfo = this._proxy.getTopInfo(this._rankType);
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    var myRankInfo = this.getMyRankInfo(ranks);
                    rankStr += myRankInfo && myRankInfo.rank_num <= this._maxRank ? myRankInfo.rank_num : this._maxRank + "+"; //16+
                    this._view.lab_rank.text = rankStr;
                    var score = this._proxy.score;
                    this._view.lab_num.text = game.getLanById("battle_cue46" /* battle_cue46 */) + "：" + score; //我的积分：0
                    var infos = [];
                    for (var i = 0; i < this._maxRank; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var powerStr = "";
                        var hurtStr = "";
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo) {
                            name = rankInfo.name;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            powerStr: powerStr,
                            hurtStr: hurtStr
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                DoufaRankMdr2.prototype.getMyRankInfo = function (ranks) {
                    for (var _i = 0, ranks_2 = ranks; _i < ranks_2.length; _i++) {
                        var info = ranks_2[_i];
                        if (info.role_id.eq(game.RoleVo.ins.role_id)) {
                            return info;
                        }
                    }
                    return null;
                };
                DoufaRankMdr2.prototype.update = function (time) {
                    this.updateTime();
                };
                DoufaRankMdr2.prototype.updateTime = function () {
                    var endTime = this._proxy.getEndTime(this._rankType);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime == 0) {
                        this.reqRankInfo();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                DoufaRankMdr2.prototype.reqRankInfo = function () {
                    this._proxy.c2s_pvp_battle_get_rank_info(this._rankType);
                };
                return DoufaRankMdr2;
            }(game.EffectMdrBase));
            compete.DoufaRankMdr2 = DoufaRankMdr2;
            __reflect(DoufaRankMdr2.prototype, "game.mod.compete.DoufaRankMdr2", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var DoufaRankMdr3 = /** @class */ (function (_super) {
                __extends(DoufaRankMdr3, _super);
                function DoufaRankMdr3() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.DoufaTopRankView);
                    _this._maxRank = 4; //显示前4名
                    _this._rankType = 3 /* Type3 */;
                    return _this;
                }
                DoufaRankMdr3.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = compete.DoufaTopRankItem;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                DoufaRankMdr3.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.grp_first, TouchEvent.TOUCH_TAP, this.onClickFirst);
                    this.onNt("update_doufa_rank" /* UPDATE_DOUFA_RANK */, this.onRankUpdate, this);
                };
                DoufaRankMdr3.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.onRankUpdate(); //不确定服务端会不会返回数据
                    this.reqRankInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                DoufaRankMdr3.prototype.onHide = function () {
                    this._topInfo = null;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                DoufaRankMdr3.prototype.onClickFirst = function () {
                    if (!this._topInfo) {
                        return;
                    }
                    mod.ViewMgr.getIns().showRoleTips(this._topInfo.role_id, this._topInfo.server_id, this._topInfo.is_robot);
                };
                DoufaRankMdr3.prototype.onRankUpdate = function () {
                    this.updateShow();
                    this.updateTime();
                };
                DoufaRankMdr3.prototype.initShow = function () {
                    var cfg = game.getConfigByNameId("magic_top_rank.json" /* MagicTopRank */, 1);
                    var index = cfg.reward[0][0];
                    this.removeEft();
                    this.addEftByParent(game.ResUtil.getTitleSrc(index), this._view.grp_title);
                    var tipsStr = game.StringUtil.substitute(game.getLanById("doufa_tips12" /* doufa_tips12 */), [this._maxRank]);
                    this._view.lab_tips.text = tipsStr;
                };
                DoufaRankMdr3.prototype.updateShow = function () {
                    var ranks = this._proxy.getRankList(this._rankType);
                    var topInfo = this._proxy.getTopInfo(this._rankType);
                    var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                        name = topInfo.name;
                        this._topInfo = topInfo;
                    }
                    this._view.lab_name.text = name;
                    var infos = [];
                    /**从第2名开始*/
                    for (var i = 1; i < this._maxRank; ++i) {
                        var rank = i + 1;
                        var cfg = game.getConfigByNameId("magic_top_rank.json" /* MagicTopRank */, rank);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        var info = {
                            cfg: cfg,
                            rankInfo: rankInfo
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                DoufaRankMdr3.prototype.update = function (time) {
                    this.updateTime();
                };
                DoufaRankMdr3.prototype.updateTime = function () {
                    var endTime = this._proxy.getEndTime(this._rankType);
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime == 0) {
                        this._proxy.resetTopRank();
                        this.reqRankInfo();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                DoufaRankMdr3.prototype.reqRankInfo = function () {
                    var ranks = this._proxy.getRankList(this._rankType);
                    if (!ranks.length) {
                        //巅峰排行榜存在数据时，不进行请求
                        this._proxy.c2s_pvp_battle_get_rank_info(this._rankType);
                    }
                };
                return DoufaRankMdr3;
            }(game.EffectMdrBase));
            compete.DoufaRankMdr3 = DoufaRankMdr3;
            __reflect(DoufaRankMdr3.prototype, "game.mod.compete.DoufaRankMdr3", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var DoufaRecordMdr = /** @class */ (function (_super) {
                __extends(DoufaRecordMdr, _super);
                function DoufaRecordMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaRecordView);
                    _this.isEasyHide = true;
                    return _this;
                }
                DoufaRecordMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = compete.DoufaRecordItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaRecordMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_doufa_record" /* UPDATE_DOUFA_RECORD */, this.onInfoUpdate, this);
                };
                DoufaRecordMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_pvp_battle_get_pk_info();
                    var recordList = this._proxy.recordList;
                    if (recordList && recordList.length) {
                        this.updateItemList(recordList);
                    }
                };
                DoufaRecordMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                DoufaRecordMdr.prototype.onInfoUpdate = function () {
                    var recordList = this._proxy.recordList;
                    this.updateItemList(recordList);
                };
                DoufaRecordMdr.prototype.updateItemList = function (recordList) {
                    var items = recordList ? recordList : this._proxy.recordList;
                    game.SortTools.sortMap(items, "pktime", 2 /* LOWER */); //排序
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(items);
                    }
                    else {
                        this._itemList.source = items;
                    }
                };
                return DoufaRecordMdr;
            }(game.MdrBase));
            compete.DoufaRecordMdr = DoufaRecordMdr;
            __reflect(DoufaRecordMdr.prototype, "game.mod.compete.DoufaRecordMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var DoufaRewardMainMdr = /** @class */ (function (_super) {
                __extends(DoufaRewardMainMdr, _super);
                function DoufaRewardMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "youli_award_tab",
                            mdr: compete.DoufaRewardMdr,
                            title: "youli_award" /* youli_award */,
                            bg: "p1_del_bg",
                        }
                    ];
                    return _this;
                }
                return DoufaRewardMainMdr;
            }(mod.WndBaseMdr));
            compete.DoufaRewardMainMdr = DoufaRewardMainMdr;
            __reflect(DoufaRewardMainMdr.prototype, "game.mod.compete.DoufaRewardMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var DoufaRewardMdr = /** @class */ (function (_super) {
                __extends(DoufaRewardMdr, _super);
                function DoufaRewardMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.SurfaceGiftView);
                    return _this;
                }
                DoufaRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = compete.DoufaRewardItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                DoufaRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_doufa_info" /* UPDATE_DOUFA_INFO */, this.updateItemList, this);
                };
                DoufaRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_bg.source = game.ResUtil.getUiPng("youli_award_bg");
                    this.updateReward();
                    this.updateItemList();
                };
                DoufaRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                DoufaRewardMdr.prototype.updateReward = function () {
                    var items = game.getConfigListByName("magic_target.json" /* MagicTarget */);
                    var cfg = items[items.length - 1];
                    this._view.icon.setData(cfg.reward[0]);
                };
                DoufaRewardMdr.prototype.updateItemList = function () {
                    var items = game.getConfigListByName("magic_target.json" /* MagicTarget */);
                    var tmps = [];
                    for (var i = 0, len = items.length; i < len; ++i) {
                        var cfg = items[i];
                        var sort = i;
                        var status = this._proxy.getRewardStatus(cfg.index);
                        if (status == 2 /* Draw */) { // 已领取
                            sort += 10000;
                        }
                        tmps.push({ cfg: cfg, sort: sort });
                    }
                    tmps.sort(game.SortTools.sortByRort);
                    items = [];
                    for (var _i = 0, tmps_1 = tmps; _i < tmps_1.length; _i++) {
                        var i = tmps_1[_i];
                        items.push(i.cfg);
                    }
                    this._itemList.replaceAll(items);
                };
                return DoufaRewardMdr;
            }(game.MdrBase));
            compete.DoufaRewardMdr = DoufaRewardMdr;
            __reflect(DoufaRewardMdr.prototype, "game.mod.compete.DoufaRewardMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var DoufaVsMdr = /** @class */ (function (_super) {
                __extends(DoufaVsMdr, _super);
                function DoufaVsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaVsView);
                    _this.MAX_NUM = 5; //5个虚假玩家
                    _this.isEasyHide = false;
                    return _this;
                }
                DoufaVsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaVsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                DoufaVsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initNameList();
                    this.updateSelf();
                    this.updateEnemy();
                    TimeMgr.addUpdateItem(this, 600);
                };
                DoufaVsMdr.prototype.onHide = function () {
                    this._proxy.c2s_pvp_battle_rank_challenge();
                    TimeMgr.removeUpdateItem(this);
                    Tween.remove(this._view.grp_player2);
                    _super.prototype.onHide.call(this);
                };
                /**更新自己*/
                DoufaVsMdr.prototype.updateSelf = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.img_player1.source = "doufa_palyer" + game.RoleVo.ins.sex;
                };
                DoufaVsMdr.prototype.initNameList = function () {
                    this._nameList = [this._showArgs.name];
                    this._timeCnt = this.MAX_NUM;
                    for (var i = 0; i < this.MAX_NUM; ++i) {
                        var name = game.TextUtil.getRandomName();
                        this._nameList.push(name);
                    }
                };
                /**更新敌人*/
                DoufaVsMdr.prototype.updateEnemy = function () {
                    var _this = this;
                    this._view.grp_player2.visible = false;
                    Tween.remove(this._view.grp_player2);
                    Tween.get(this._view.grp_player2)
                        .delay(100)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_player2.visible = true;
                    }));
                    var name = this._nameList.pop();
                    this._view.lab_name2.text = name;
                    var isFinal = this._nameList.length <= 0;
                    this._view.powerLabel2.visible = isFinal;
                    this._view.powerLabel2.setPowerValue(this._showArgs.showpower || 0);
                    var sex = Math.random() < 0.5 ? 1 /* Male */ : 2 /* Female */;
                    this._view.img_player2.source = "doufa_palyer" + sex;
                };
                DoufaVsMdr.prototype.update = function (time) {
                    this._timeCnt--;
                    if (this._timeCnt < 0) {
                        this.hide();
                        return;
                    }
                    this.updateEnemy();
                };
                return DoufaVsMdr;
            }(game.MdrBase));
            compete.DoufaVsMdr = DoufaVsMdr;
            __reflect(DoufaVsMdr.prototype, "game.mod.compete.DoufaVsMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var DoufaWinMdr = /** @class */ (function (_super) {
                __extends(DoufaWinMdr, _super);
                function DoufaWinMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.DoufaWinView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                DoufaWinMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                DoufaWinMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateHurtList();
                    this.updateScore();
                    this.removeEft();
                    this.addEftByParent("victory" /* Victory */, this._view.gr_eft, 0, 0, 0, null, 1, 1, false);
                    this.addEftByParent("zhandoushengli1" /* ZhanDouShengli1 */, this._view.gr_eft2);
                };
                DoufaWinMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    _super.prototype.onHide.call(this);
                };
                //显示奖励
                DoufaWinMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                //显示伤害
                DoufaWinMdr.prototype.updateHurtList = function () {
                    var info = this._showArgs;
                    this._view.resultHurt.updateHurtList(info.damage_list);
                };
                DoufaWinMdr.prototype.updateScore = function () {
                    var info = this._showArgs;
                    var tips = game.getLanById("doufa_tips13" /* doufa_tips13 */) + game.TextUtil.addColor(info.name, 8585074 /* GREEN */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tips);
                    var addScore = info.value;
                    this._view.lab_score.text = game.getLanById("zmFight_tips3" /* zmFight_tips3 */) + "+" + addScore;
                    var score = this._proxy.score + addScore;
                    var maxScore = this._proxy.getMaxScore();
                    this._view.bar.show(score, maxScore, false, 0, false);
                    var lv = this._proxy.lv;
                    this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                DoufaWinMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return DoufaWinMdr;
            }(game.EffectMdrBase));
            compete.DoufaWinMdr = DoufaWinMdr;
            __reflect(DoufaWinMdr.prototype, "game.mod.compete.DoufaWinMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var KuafuDoufaAchieveMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaAchieveMdr, _super);
                function KuafuDoufaAchieveMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.KuafuDoufaAchieveView);
                    _this.isEasyHide = true;
                    return _this;
                }
                KuafuDoufaAchieveMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = compete.KuafuDoufaAchieveItem;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                KuafuDoufaAchieveMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                };
                KuafuDoufaAchieveMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                };
                KuafuDoufaAchieveMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaAchieveMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(53 /* KuafuDoufa */) > -1) {
                        this.updateItemList();
                    }
                };
                KuafuDoufaAchieveMdr.prototype.updateItemList = function () {
                    var tasks = mod.TaskUtil.getTaskList(53 /* KuafuDoufa */);
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(tasks);
                    }
                    else {
                        this._itemList.source = tasks;
                    }
                };
                return KuafuDoufaAchieveMdr;
            }(game.MdrBase));
            compete.KuafuDoufaAchieveMdr = KuafuDoufaAchieveMdr;
            __reflect(KuafuDoufaAchieveMdr.prototype, "game.mod.compete.KuafuDoufaAchieveMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var KuafuDoufaGuildRankMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaGuildRankMdr, _super);
                function KuafuDoufaGuildRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._type = 2 /* GuildRank */;
                    return _this;
                }
                KuafuDoufaGuildRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                KuafuDoufaGuildRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("kuafu_doufa_rank_update" /* KUAFU_DOUFA_RANK_UPDATE */, this.updateShow, this);
                };
                KuafuDoufaGuildRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateShow();
                };
                KuafuDoufaGuildRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaGuildRankMdr.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.source = "jifen"; //todo
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.img_myRank.visible = false;
                    this._view.lab_rank.x = this._view.img_myRank.x;
                    this._proxy.c2s_kuafudoufa_click(2 /* GuildRank */);
                };
                KuafuDoufaGuildRankMdr.prototype.updateShow = function () {
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_xianzong_paiming");
                    var limit = cfg && cfg.value;
                    var rankStr = game.StringUtil.substitute(game.getLanById("kuafu_doufa_tips13" /* kuafu_doufa_tips13 */), [game.StringUtil.getHurtNumStr(limit)]);
                    this._view.lab_rank.text = rankStr;
                    var ranks = this._proxy.getRanks(this._type);
                    var topInfo = ranks && ranks.length ? ranks[0] : null;
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var myRankInfo = this._proxy.getMyRank(this._type);
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_num.text = game.getLanById("kuafu_doufa_tips15" /* kuafu_doufa_tips15 */) + "：" + game.StringUtil.getHurtNumStr(count); //宗门伤害：0
                    var infos = [];
                    for (var i = 0; i < game.MAX_RANK_NUM; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var reward = this.getReward(rank);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo) {
                            name = rankInfo.guild_name + "\n" + game.getLanById("cross_boss_tips10" /* cross_boss_tips10 */) + "：" + rankInfo.name;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                KuafuDoufaGuildRankMdr.prototype.getReward = function (rank) {
                    var cfgList = game.getConfigListByName("doufa_xianzong_paiming.json" /* DoufaXianzongPaiming */);
                    for (var _i = 0, cfgList_6 = cfgList; _i < cfgList_6.length; _i++) {
                        var cfg = cfgList_6[_i];
                        var rankStart = cfg.rank_section[0];
                        var rankEnd = cfg.rank_section[1];
                        if (rank >= rankStart && rank <= rankEnd) {
                            return cfg.reward.slice(0, 3);
                        }
                    }
                    return [];
                };
                return KuafuDoufaGuildRankMdr;
            }(game.EffectMdrBase));
            compete.KuafuDoufaGuildRankMdr = KuafuDoufaGuildRankMdr;
            __reflect(KuafuDoufaGuildRankMdr.prototype, "game.mod.compete.KuafuDoufaGuildRankMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var KuafuDoufaMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaMdr, _super);
                function KuafuDoufaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.KuafuDoufaView);
                    return _this;
                }
                KuafuDoufaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                KuafuDoufaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_achieve, TouchEvent.TOUCH_TAP, this.onClickAchieve);
                    addEventListener(this._view.btn_enter, TouchEvent.TOUCH_TAP, this.onClickEnter);
                    this.onNt("kuafu_doufa_count_update" /* KUAFU_DOUFA_COUNT_UPDATE */, this.updateCnt, this);
                    this.onNt("kuafu_doufa_state_update" /* KUAFU_DOUFA_STATE_UPDATE */, this.updateState, this);
                    this.onNt("kuafu_doufa_enroll_update" /* KUAFU_DOUFA_ENROLL_UPDATE */, this.updateState, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                KuafuDoufaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateState();
                    this.updateTime();
                    this.updateRankTime();
                    this.updateTaskHint(mod.HintMgr.getHint(this._proxy.taskHint));
                    TimeMgr.addUpdateItem(this, 1000);
                };
                KuafuDoufaMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("kuafu_doufa_rule_tips" /* kuafu_doufa_rule_tips */));
                };
                KuafuDoufaMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "40" /* KuafuDoufaRankMain */);
                };
                KuafuDoufaMdr.prototype.onClickAchieve = function () {
                    facade.showView("52" /* Compete */, "41" /* KuafuDoufaAchieve */);
                };
                KuafuDoufaMdr.prototype.onClickEnter = function () {
                    var state = this._proxy.state;
                    if ((state == 3 /* Open */ || state == 1 /* Enroll */) && this._proxy.leftCnt <= 0 && !this._proxy.isJoin) {
                        game.PromptBox.getIns().show(game.getLanById("kuafu_doufa_tips4" /* kuafu_doufa_tips4 */));
                        return;
                    }
                    this._proxy.c2s_kuafudoufa_click(1 /* Enroll */);
                };
                KuafuDoufaMdr.prototype.initShow = function () {
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_reward");
                    var list = cfg.value;
                    this._itemList.source = list;
                };
                KuafuDoufaMdr.prototype.updateState = function () {
                    var state = this._proxy.state;
                    var hasEnroll = this._proxy.hasEnroll; //是否报名
                    this._endTime = this._proxy.getNextTime(); //计算时间
                    var showEnroll = state == 1 /* Enroll */ && !hasEnroll; //是否显示报名
                    this._view.btn_enter.visible = state == 3 /* Open */ || showEnroll;
                    this._view.btn_enter.labelDisplay.text = showEnroll ? "报名" : "进入";
                    this._view.btn_enter.redPoint.visible = state == 3 /* Open */ || showEnroll;
                    this._view.img_state.visible = !this._view.btn_enter.visible;
                    //已结束，已报名，未报名
                    this._view.img_state.source = state == 4 /* End */ ? "yijieshu" : (hasEnroll ? "yibaoming" : "weibaoming");
                    this._view.lab_cnt.visible = state == 3 /* Open */;
                    this._view.img_tips.visible = state != 3 /* Open */;
                    this.updateCnt();
                };
                KuafuDoufaMdr.prototype.updateCnt = function () {
                    if (this._view.lab_cnt.visible) {
                        var leftCnt = this._proxy.leftCnt;
                        var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_count");
                        var maxCnt = cfg && cfg.value;
                        this._view.lab_cnt.text = game.getLanById("kuafu_doufa_tips3" /* kuafu_doufa_tips3 */) + "：" + "（" + leftCnt + "/" + maxCnt + "）";
                    }
                };
                KuafuDoufaMdr.prototype.update = function (time) {
                    this.updateTime();
                    this.updateRankTime();
                };
                KuafuDoufaMdr.prototype.updateTime = function () {
                    var state = this._proxy.state;
                    var sufStr = game.getLanById("kuafu_doufa_tips1" /* kuafu_doufa_tips1 */) + game.getLanById("kuafu_doufa_state_tips" + state);
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem2.updateLeftTime(leftTime, sufStr);
                };
                KuafuDoufaMdr.prototype.updateRankTime = function () {
                    var endTime = game.TimeUtil.getNextWeekTime();
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                /** 通用红点事件监听 */
                KuafuDoufaMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._proxy.taskHint)) {
                        this.updateTaskHint(data.value);
                    }
                };
                KuafuDoufaMdr.prototype.updateTaskHint = function (hint) {
                    this._view.btn_achieve.redPoint.visible = hint;
                };
                return KuafuDoufaMdr;
            }(game.EffectMdrBase));
            compete.KuafuDoufaMdr = KuafuDoufaMdr;
            __reflect(KuafuDoufaMdr.prototype, "game.mod.compete.KuafuDoufaMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var KuafuDoufaPersonalRankMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaPersonalRankMdr, _super);
                function KuafuDoufaPersonalRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._type = 3 /* PersonalRank */;
                    return _this;
                }
                KuafuDoufaPersonalRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                KuafuDoufaPersonalRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("kuafu_doufa_rank_update" /* KUAFU_DOUFA_RANK_UPDATE */, this.updateShow, this);
                };
                KuafuDoufaPersonalRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateShow();
                };
                KuafuDoufaPersonalRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaPersonalRankMdr.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.source = "jifen";
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.img_myRank.visible = false;
                    this._view.lab_rank.x = this._view.img_myRank.x;
                    this._proxy.c2s_kuafudoufa_click(this._type);
                };
                KuafuDoufaPersonalRankMdr.prototype.updateShow = function () {
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_geren_paiming");
                    var limit = cfg && cfg.value;
                    var rankStr = game.StringUtil.substitute(game.getLanById("kuafu_doufa_tips12" /* kuafu_doufa_tips12 */), [game.StringUtil.getHurtNumStr(limit)]);
                    this._view.lab_rank.text = rankStr;
                    var ranks = this._proxy.getRanks(this._type);
                    var topInfo = ranks && ranks.length ? ranks[0] : null;
                    if (topInfo && topInfo.value) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var myRankInfo = this._proxy.getMyRank(this._type);
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_num.text = game.getLanById("kuafu_doufa_tips14" /* kuafu_doufa_tips14 */) + "：" + game.StringUtil.getHurtNumStr(count); //个人伤害：0
                    var infos = [];
                    for (var i = 0; i < game.MAX_RANK_NUM; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var reward = this.getReward(rank);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo) {
                            var guildName = rankInfo.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                            name = rankInfo.name + "\n" + game.getLanById("zongmen" /* zongmen */) + "：" + guildName;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                KuafuDoufaPersonalRankMdr.prototype.getReward = function (rank) {
                    var cfgList = game.getConfigListByName("doufa_geren_paiming.json" /* DoufaGerenPaiming */);
                    for (var _i = 0, cfgList_7 = cfgList; _i < cfgList_7.length; _i++) {
                        var cfg = cfgList_7[_i];
                        var rankStart = cfg.rank_section[0];
                        var rankEnd = cfg.rank_section[1];
                        if (rank >= rankStart && rank <= rankEnd) {
                            return cfg.reward.slice(0, 3);
                        }
                    }
                    return [];
                };
                return KuafuDoufaPersonalRankMdr;
            }(game.EffectMdrBase));
            compete.KuafuDoufaPersonalRankMdr = KuafuDoufaPersonalRankMdr;
            __reflect(KuafuDoufaPersonalRankMdr.prototype, "game.mod.compete.KuafuDoufaPersonalRankMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var KuafuDoufaRankMainMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaRankMainMdr, _super);
                function KuafuDoufaRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianzongpaimingbiaoqiantubiao",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: compete.KuafuDoufaGuildRankMdr,
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "personal_rank_",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: compete.KuafuDoufaPersonalRankMdr,
                        }
                    ];
                    return _this;
                }
                return KuafuDoufaRankMainMdr;
            }(mod.WndBaseMdr));
            compete.KuafuDoufaRankMainMdr = KuafuDoufaRankMainMdr;
            __reflect(KuafuDoufaRankMainMdr.prototype, "game.mod.compete.KuafuDoufaRankMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var KuafuDoufaRankMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaRankMdr, _super);
                function KuafuDoufaRankMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.KuafuDoufaRankView);
                    _this.TIME_TICK = 3; //定时请求信息
                    _this.isEasyHide = true;
                    return _this;
                }
                KuafuDoufaRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = compete.KuafuDoufaRankItem;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                KuafuDoufaRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("kuafu_doufa_scene_rank_update" /* KUAFU_DOUFA_SCENE_RANK_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                KuafuDoufaRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.reqInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                KuafuDoufaRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaRankMdr.prototype.onInfoUpdate = function (n) {
                    var rankList = n.body;
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(rankList);
                    }
                    else {
                        this._itemList.source = rankList;
                    }
                };
                KuafuDoufaRankMdr.prototype.update = function (time) {
                    this._time--;
                    if (this._time <= 0) {
                        this.reqInfo();
                    }
                };
                KuafuDoufaRankMdr.prototype.reqInfo = function () {
                    this._proxy.c2s_kuafudoufa_click(4 /* SceneRank */);
                    this._time = this.TIME_TICK;
                };
                return KuafuDoufaRankMdr;
            }(game.MdrBase));
            compete.KuafuDoufaRankMdr = KuafuDoufaRankMdr;
            __reflect(KuafuDoufaRankMdr.prototype, "game.mod.compete.KuafuDoufaRankMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var GPlayerVo = game.scene.GPlayerVo;
            var ArrayCollection = eui.ArrayCollection;
            var TextEvent = egret.TextEvent;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var ItemTapEvent = eui.ItemTapEvent;
            var MoveAct = game.scene.MoveAct;
            var KuafuDoufaSceneMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaSceneMdr, _super);
                function KuafuDoufaSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", compete.KuafuDoufaSceneView);
                    _this.START_TIME = 30; //30秒倒计时
                    _this._reliveTime = 0; //复活时间戳
                    _this.ATTACK_TIME_TICK = 3; //切换攻击状态，限制3秒
                    _this._attackTime = 0;
                    _this._isNoticeShowing = false; //是否正在公吿
                    _this.NOTICE_TIME = 200; //公告出现时间
                    _this.NOTICE_SHOW = 2000; //公告暂停时间
                    _this._bmpDanceHeadIdx = 0;
                    return _this;
                }
                KuafuDoufaSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this._redList = new ArrayCollection();
                    this._view.list_redBoss.itemRenderer = compete.KuafuDoufaBossItem;
                    this._view.list_redBoss.dataProvider = this._redList;
                    this._blueList = new ArrayCollection();
                    this._view.list_blueBoss.itemRenderer = compete.KuafuDoufaBossItem;
                    this._view.list_blueBoss.dataProvider = this._blueList;
                    this._skillList = new ArrayCollection();
                    this._view.list_skill.itemRenderer = compete.KuafuDoufaSceneSkillItem;
                    this._view.list_skill.dataProvider = this._skillList;
                };
                KuafuDoufaSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.head1, TouchEvent.TOUCH_TAP, this.onClickMaxHurt);
                    addEventListener(this._view.head2, TouchEvent.TOUCH_TAP, this.onClickEnemy);
                    addEventListener(this._view.head3, TouchEvent.TOUCH_TAP, this.onClickMinHp);
                    addEventListener(this._view.btn_enemy, TouchEvent.TOUCH_TAP, this.onClickEnemyList);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_score, TouchEvent.TOUCH_TAP, this.onClickScore);
                    addEventListener(this._view.btn_attack, TouchEvent.TOUCH_TAP, this.onClickAttack);
                    addEventListener(this._view.lab_revive, TextEvent.LINK, this.onClickRevive);
                    addEventListener(this._view.list_redBoss, ItemTapEvent.ITEM_TAP, this.onClickBoss);
                    addEventListener(this._view.list_blueBoss, ItemTapEvent.ITEM_TAP, this.onClickBoss);
                    addEventListener(this._view.skill_item, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkillList);
                    this.onNt("on_scene_max_hurt_update" /* ON_SCENE_MAX_HURT_UPDATE */, this.updateMaxHurt, this); //最高伤害者更新
                    this.onNt("on_display_add" /* ON_OBJ_ADD */, this.onObjAdd, this);
                    this.onNt("on_display_del" /* ON_OBJ_DEL */, this.onObjDel, this);
                    this.onNt("kuafu_doufa_score_update" /* KUAFU_DOUFA_SCORE_UPDATE */, this.updateScore, this); //积分人数更新
                    this.onNt("kuafu_doufa_score_reward_update" /* KUAFU_DOUFA_SCORE_REWARD_UPDATE */, this.updateScoreHint, this); //积分奖励更新
                    this.onNt("on_role_relive" /* ON_ROLE_RELIVE */, this.onRoleRelive, this);
                    this.onNt("on_role_die" /* ON_ROLE_DIE */, this.onRoleDie, this);
                    this.onNt("kuafu_doufa_boss_update" /* KUAFU_DOUFA_BOSS_UPDATE */, this.updateBossHp, this); //BOSS血量更新
                    this.onNt("kuafu_doufa_attack_update" /* KUAFU_DOUFA_ATTACK_UPDATE */, this.updateAttackStatus, this); //攻击驻守更新
                    this.onNt("kuafu_doufa_notice_update" /* KUAFU_DOUFA_NOTICE_UPDATE */, this.updateKill, this); //击杀公告更新
                    this.onNt("foe_target_change" /* FOE_TARGET_CHANGE */, this.updateAttack, this); //切换攻击目标
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("kuafu_doufa_skill_cd_update" /* KUAFU_DOUFA_SKILL_CD_UPDATE */, this.updateSkill, this);
                };
                KuafuDoufaSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateTime();
                    this.updateScore();
                    this.updateBoss();
                    this.updateMaxHurt();
                    this.updateEnemy();
                    this.updateAttackStatus();
                    this.updateSkill();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                KuafuDoufaSceneMdr.prototype.onHide = function () {
                    this._curEnemyVo = null;
                    this._minHpEnemyVo = null;
                    this._targetVo = null;
                    this._proxy.clearNotice();
                    Tween.remove(this._view.grp_kill);
                    TimeMgr.removeUpdateItem(this);
                    if (this._bmpDanceGrp) {
                        this._bmpDanceGrp.removeChildren();
                    }
                    this._bmpDanceGrp = null;
                    this._bmpDanceHeadIdx = 0;
                    _super.prototype.onHide.call(this);
                };
                /**反击敌人*/
                KuafuDoufaSceneMdr.prototype.onClickMaxHurt = function () {
                    if (!this._sceneProxy.maxHurt) {
                        return;
                    }
                    this._bmpDanceHeadIdx = 1;
                    this.attackTarget(this._sceneProxy.maxHurt.entity_id); //设置敌人为攻击目标
                };
                /**点击敌人*/
                KuafuDoufaSceneMdr.prototype.onClickEnemy = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    this._bmpDanceHeadIdx = 2;
                    this.attackTarget(this._curEnemyVo.entity_id); //设置敌人为攻击目标
                };
                /**点击最低血量敌人*/
                KuafuDoufaSceneMdr.prototype.onClickMinHp = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    this._bmpDanceHeadIdx = 3;
                    this.attackTarget(this._curEnemyVo.entity_id); //设置敌人为攻击目标
                };
                KuafuDoufaSceneMdr.prototype.attackTarget = function (foeTargetId) {
                    var mainPlayer = this._sceneProxy.mainPlayerObj;
                    if (mainPlayer) {
                        //玩家正在移动的话，清除移动动作
                        mainPlayer.actMgr.removeAllActByCls(MoveAct);
                    }
                    this._sceneProxy.foeTargetId = foeTargetId;
                    this._sceneProxy.requestMonster(foeTargetId); //请求挑战
                };
                /**打开敌人列表*/
                KuafuDoufaSceneMdr.prototype.onClickEnemyList = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("03" /* Scene */, "04" /* Enemy */);
                };
                KuafuDoufaSceneMdr.prototype.onObjAdd = function (n) {
                    this.updateEnemy();
                };
                KuafuDoufaSceneMdr.prototype.onObjDel = function (n) {
                    var body = n.body;
                    if (body instanceof GPlayerVo) {
                        //攻击玩家情况下，打死玩家了，继续寻怪或玩家 @zpj
                        var entityId = body.entity_id;
                        var foeTargetId = this._sceneProxy.foeTargetId;
                        if (foeTargetId && entityId && foeTargetId.eq(entityId)) {
                            this._sceneProxy.foeTargetId = null;
                        }
                    }
                    this.updateEnemy();
                };
                KuafuDoufaSceneMdr.prototype.initShow = function () {
                    this._endTime = this._proxy.getNextTime();
                    this.setDiedShow(false); //默认关闭
                    this._view.lab_revive.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("立即复活", 8585074 /* GREEN */, ""));
                    this.setKillShow(false);
                    this.setAttackShow(false);
                };
                /**更新复仇敌人*/
                KuafuDoufaSceneMdr.prototype.updateMaxHurt = function () {
                    var info = this._sceneProxy.maxHurt;
                    if (!info) {
                        this._view.head1.defaultHeadShow();
                        this._view.img_fanji.visible = false;
                    }
                    else {
                        this._view.head1.updateHeadShow(info.head, info.head_frame, info.sex);
                        this._view.img_fanji.visible = true;
                    }
                    this.updateMaxHurtHp();
                };
                /**更新复仇敌人血量*/
                KuafuDoufaSceneMdr.prototype.updateMaxHurtHp = function () {
                    if (!this._sceneProxy.maxHurt) {
                        this._view.bar1.show(0, 100, false, 0, false, 0 /* Percent */);
                        return;
                    }
                    var info = this._sceneProxy.maxHurt;
                    var maxHurtVo = this._sceneProxy.getVoById(info.entity_id);
                    var value = maxHurtVo && maxHurtVo.percent || 0;
                    this._view.bar1.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                /**更新附近敌人*/
                KuafuDoufaSceneMdr.prototype.updateEnemy = function () {
                    var enemies = this._sceneProxy.getEnemyVos(1 /* PLAYER */); //获取所有敌对玩家
                    this._curEnemyVo = enemies && enemies.length ? enemies[0] : null; //取第一个敌人
                    if (this._curEnemyVo) {
                        this._view.head2.updateHeadShow(this._curEnemyVo.head, this._curEnemyVo.head_frame, this._curEnemyVo.sex);
                    }
                    else {
                        this._view.head2.defaultHeadShow();
                    }
                    this.updateEnemyHp();
                    if (!enemies.length) {
                        this._minHpEnemyVo = null;
                    }
                    else {
                        for (var _i = 0, enemies_1 = enemies; _i < enemies_1.length; _i++) {
                            var i = enemies_1[_i];
                            if (!this._minHpEnemyVo || this._minHpEnemyVo.percent > i.percent) {
                                this._minHpEnemyVo = i;
                            }
                        }
                    }
                    if (this._minHpEnemyVo) {
                        this._view.head3.updateHeadShow(this._minHpEnemyVo.head, this._minHpEnemyVo.head_frame, this._minHpEnemyVo.sex);
                    }
                    else {
                        this._view.head3.defaultHeadShow();
                    }
                    this.updateEnemyMinHp();
                    this.updateAttack(); //@zpj
                };
                /**更新敌人血量*/
                KuafuDoufaSceneMdr.prototype.updateEnemyHp = function () {
                    if (!this._curEnemyVo) {
                        this._view.bar2.show(0, 100, false, 0, false, 0 /* Percent */);
                        return;
                    }
                    var value = this._curEnemyVo.percent || 0;
                    this._view.bar2.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                /**更新血量最低敌人血量*/
                KuafuDoufaSceneMdr.prototype.updateEnemyMinHp = function () {
                    if (!this._minHpEnemyVo) {
                        this._view.bar3.show(0, 100, false, 0, false, 0 /* Percent */);
                        return;
                    }
                    var value = this._minHpEnemyVo.percent || 0;
                    this._view.bar3.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                KuafuDoufaSceneMdr.prototype.onClickRank = function () {
                    facade.showView("52" /* Compete */, "42" /* KuafuDoufaRank */);
                };
                KuafuDoufaSceneMdr.prototype.onClickScore = function () {
                    facade.showView("52" /* Compete */, "43" /* KuafuDoufaScore */);
                };
                /**切换攻击驻守状态*/
                KuafuDoufaSceneMdr.prototype.onClickAttack = function () {
                    var curTime = TimeMgr.time.serverTimeSecond;
                    if (this._attackTime) {
                        var passTime = curTime - this._attackTime;
                        var leftTime = this.ATTACK_TIME_TICK - passTime;
                        if (leftTime > 0) {
                            game.PromptBox.getIns().show(leftTime + "秒后可切换状态");
                            return;
                        }
                    }
                    this._attackTime = curTime;
                    this.attackTarget(null); //切换状态时，清除攻击目标
                    this._proxy.c2s_kuafudoufa_click(6 /* Attack */);
                };
                KuafuDoufaSceneMdr.prototype.onClickRevive = function () {
                    //todo，立即复活
                    var reviveIdx = 4;
                    var cfg = game.getConfigByNameId("doufa_jineng.json" /* DoufaJineng */, reviveIdx);
                    var cost = cfg.cost;
                    if (cost && mod.BagUtil.checkPropCntUp(cost[0], cost[1])) {
                        this._proxy.c2s_kuafudoufa_scene_use_buff(reviveIdx);
                    }
                };
                KuafuDoufaSceneMdr.prototype.update = function (time) {
                    this.updateMaxHurtHp();
                    this.updateEnemyHp();
                    this.updateEnemyMinHp();
                    this.updateTargetHp();
                    this.updateTime();
                    this.updateReliveTime();
                    this.updateSkillCd();
                };
                KuafuDoufaSceneMdr.prototype.updateTime = function () {
                    var state = this._proxy.state;
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    var timeStr = game.TimeUtil.formatSecond(leftTime, "mm:ss");
                    this._view.lab_time.text = timeStr;
                    var continueCfg = game.GameConfig.getParamConfigById("kuafu_doufa_continue_time");
                    var continueTime = continueCfg && continueCfg.value; //活动持续时间
                    var startTime = continueTime - leftTime; //已经开启了多长时间，持续时间-剩余时间
                    var startLeftTime = this.START_TIME - startTime; //剩余倒计时时间
                    if (startLeftTime >= 0) {
                        //30秒倒计时
                        this._view.grp_start.visible = true;
                        var timeStr_1 = startLeftTime + "";
                        this.addBmpFont(timeStr_1, game.BmpTextCfg[206 /* Layer */], this._view.grp_time);
                    }
                    else {
                        this._view.grp_start.visible = false;
                    }
                    if (leftTime <= 0 || state != 3 /* Open */) {
                        // TimeMgr.removeUpdateItem(this);
                    }
                };
                KuafuDoufaSceneMdr.prototype.updateScore = function () {
                    this._view.lab_redScore.text = "积分：" + this._proxy.redCampScore;
                    this._view.lab_redCnt.text = "" + this._proxy.redCampNum;
                    this._view.lab_blueScore.text = "积分：" + this._proxy.blueCampScore;
                    this._view.lab_blueCnt.text = "" + this._proxy.blueCampNum;
                    this.updateScoreHint();
                };
                KuafuDoufaSceneMdr.prototype.updateScoreHint = function () {
                    this._view.btn_score.redPoint.visible = this._proxy.getScoreHint();
                };
                /*********************BOSS显示**************************/
                KuafuDoufaSceneMdr.prototype.onClickBoss = function (e) {
                    var data = e.item;
                    var camp = data.camp;
                    var monsterIndex = data.monsterIndex;
                    //检测BOSS是否可攻击
                    var myCamp = this._sceneProxy.mainPlayerVo && this._sceneProxy.mainPlayerVo.camp;
                    if (camp == myCamp) {
                        return; //自己阵营的则返回
                    }
                    var hp = this._proxy.getBossHp(monsterIndex);
                    if (hp <= 0) {
                        return; //已死亡
                    }
                    //敌方阵营的话，检测上一只BOSS是否击杀
                    var curIndex = this._proxy.findCurMonsterIndex(camp);
                    if (curIndex != monsterIndex) {
                        game.PromptBox.getIns().show(game.getLanById("kuafu_doufa_tips11" /* kuafu_doufa_tips11 */));
                        return;
                    }
                    //如果玩家是驻守状态，此时要切换到攻击状态
                    var status = this._proxy.attackStatus;
                    if (status == 2 /* Defense */) {
                        this.onClickAttack();
                    }
                    this._sceneProxy.requestMonster(); //请求挑战BOSS
                };
                KuafuDoufaSceneMdr.prototype.updateBoss = function () {
                    var redCfg = game.GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao1");
                    var redInfos = redCfg && redCfg.value;
                    var redDatas = [];
                    //红阵营boss反转
                    for (var i = redInfos.length - 1; i >= 0; --i) {
                        var info = redInfos[i];
                        redDatas.push({ camp: 1 /* RED */, monsterIndex: info[0] });
                    }
                    this._redList.source = redDatas;
                    var blueCfg = game.GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao2");
                    var blueInfos = blueCfg && blueCfg.value;
                    var blueDatas = [];
                    for (var _i = 0, blueInfos_1 = blueInfos; _i < blueInfos_1.length; _i++) {
                        var info = blueInfos_1[_i];
                        blueDatas.push({ camp: 2 /* BLUE */, monsterIndex: info[0] });
                    }
                    this._blueList.source = blueDatas;
                    this.updateBossHp();
                };
                KuafuDoufaSceneMdr.prototype.updateBossHp = function () {
                    this.updateBossHpList(this._view.list_redBoss);
                    this.updateBossHpList(this._view.list_blueBoss);
                };
                KuafuDoufaSceneMdr.prototype.updateBossHpList = function (bossList) {
                    if (!bossList.numChildren) {
                        return;
                    }
                    var len = bossList.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = bossList.getChildAt(i);
                        var monsterIndex = item.data.monsterIndex;
                        var hp = this._proxy.getBossHp(monsterIndex);
                        item.updateHp(hp);
                    }
                };
                /*********************死亡提示**************************/
                KuafuDoufaSceneMdr.prototype.onRoleRelive = function () {
                    this.setDiedShow(false);
                };
                KuafuDoufaSceneMdr.prototype.onRoleDie = function () {
                    this.setDiedShow(true);
                };
                KuafuDoufaSceneMdr.prototype.setDiedShow = function (show) {
                    this._view.grp_died.visible = show;
                    if (show) {
                        var diedInfo = this._sceneProxy.diedInfo;
                        this._reliveTime = diedInfo.relife_time;
                        this.updateReliveTime();
                    }
                };
                KuafuDoufaSceneMdr.prototype.updateReliveTime = function () {
                    if (this._view.grp_died.visible) {
                        var leftTime = this._reliveTime - TimeMgr.time.serverTimeSecond;
                        this._view.lab_reviveTime.text = leftTime + "秒后复活";
                    }
                };
                /*********************攻击驻守状态**************************/
                KuafuDoufaSceneMdr.prototype.updateAttackStatus = function () {
                    var status = this._proxy.attackStatus;
                    this._view.btn_attack.icon = status == 1 /* Attack */ ? "zhushou" : "gongji";
                };
                /*********************击杀公告**************************/
                KuafuDoufaSceneMdr.prototype.setKillShow = function (show) {
                    this._view.grp_kill.visible = show;
                };
                KuafuDoufaSceneMdr.prototype.updateKill = function () {
                    var infoList = this._proxy.noticeList;
                    if (!this._isNoticeShowing && infoList.length) {
                        //不在公告表现，且存在公告信息时
                        this.showKill(infoList.shift());
                    }
                    this.updateAttack(); //公告更新时，更新攻击信息 @zpj
                };
                KuafuDoufaSceneMdr.prototype.showKill = function (info) {
                    this._isNoticeShowing = true;
                    this.setKillShow(true);
                    this._view.kill1.setData(info.kill_info, false);
                    var killStr = "kuafu_doufa_kill_tips" + Math.min(info.kill_num, 5);
                    this._view.img_kill.source = killStr;
                    this._view.kill2.setData(info.be_kill_info, true);
                    Tween.remove(this._view.grp_kill);
                    this._view.grp_kill.scaleX = this._view.grp_kill.scaleY = 0;
                    Tween.get(this._view.grp_kill)
                        .to({ scaleX: 1, scaleY: 1 }, this.NOTICE_TIME)
                        .delay(this.NOTICE_SHOW) //显示2秒钟
                        .to({ scaleX: 0, scaleY: 0 }, this.NOTICE_TIME)
                        .exec(Handler.alloc(this, this.checkNextKill));
                };
                KuafuDoufaSceneMdr.prototype.checkNextKill = function () {
                    var infoList = this._proxy.noticeList;
                    if (!infoList.length) {
                        this._isNoticeShowing = false;
                        this.setKillShow(false);
                        return;
                    }
                    this.showKill(infoList.shift());
                };
                /*********************当前攻击目标**************************/
                KuafuDoufaSceneMdr.prototype.setAttackShow = function (show) {
                    this._view.grp_attack.visible = show;
                };
                KuafuDoufaSceneMdr.prototype.updateAttack = function () {
                    var foeTargetId = this._sceneProxy.foeTargetId;
                    if (foeTargetId) {
                        var targetVo = this._sceneProxy.getVoById(foeTargetId);
                        if (targetVo && targetVo.percent > 0) { //@zpj
                            this._targetVo = targetVo ? targetVo : null;
                        }
                    }
                    else {
                        this._targetVo = null;
                    }
                    console.info("--kuafudoufan_updateAttack--  foeTargetId:" + foeTargetId + ", this._targetVo:", this._targetVo);
                    if (this._targetVo) {
                        this._view.lab_name_attack.text = this._targetVo.name;
                        if (this._targetVo.type == 3 /* MONSTER */) {
                            //攻击的是怪物
                            var vo = this._targetVo;
                            this._view.head_attack.updateBossHeadShow(vo.index, 0);
                        }
                        else {
                            //攻击的是玩家
                            var vo = this._targetVo;
                            this._view.head_attack.updateHeadShow(vo.head, vo.head_frame, vo.sex);
                        }
                        this.updateTargetHp();
                        this.setAttackShow(true);
                    }
                    else {
                        this.setAttackShow(false);
                    }
                    this.updateBmpDanceFunc();
                };
                /**更新攻击目标血量*/
                KuafuDoufaSceneMdr.prototype.updateTargetHp = function () {
                    if (!this._targetVo) {
                        this.setAttackShow(false);
                        return;
                    }
                    var value = this._targetVo.percent || 0;
                    this._view.bar_attack.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                /*********************技能**************************/
                /** 通用背包事件监听 */
                KuafuDoufaSceneMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    var index = this._costIndex;
                    if (index && indexs.indexOf(index) > -1) {
                        this.updateSkillCost();
                    }
                };
                KuafuDoufaSceneMdr.prototype.onClickSkill = function (e) {
                    facade.showView("52" /* Compete */, "44" /* KuafuDoufaSkill */);
                };
                KuafuDoufaSceneMdr.prototype.onClickSkillList = function (e) {
                    var data = e.item;
                    //todo
                    var cdTime = this._proxy.getSkillCd(data.index);
                    if (cdTime > 0) {
                        game.PromptBox.getIns().show("CD\u51B7\u5374\u4E2D");
                        return;
                    }
                    if (data && data.cost && !mod.BagUtil.checkPropCntUp(data.cost[0], data.cost[1])) {
                        return;
                    }
                    this._proxy.c2s_kuafudoufa_scene_use_buff(data.index);
                };
                KuafuDoufaSceneMdr.prototype.updateSkill = function () {
                    var items = game.getConfigListByName("doufa_jineng.json" /* DoufaJineng */);
                    var cost = items[0].cost;
                    this._costIndex = cost[0];
                    this._view.skill_item.img_icon.source = "kuafu_doufa_skill";
                    this._view.skill_item.img_mark.visible = false;
                    this._view.skill_item.lab_time.text = "";
                    this.updateSkillCost();
                    this._skillList.source = items;
                };
                KuafuDoufaSceneMdr.prototype.updateSkillCost = function () {
                    var cntStr = mod.BagUtil.getPropCntByIdx(this._costIndex) + "";
                    this._view.skill_item.lab_cnt.text = cntStr;
                };
                KuafuDoufaSceneMdr.prototype.updateSkillCd = function () {
                    if (!this._proxy.haveSkillCd()) {
                        return;
                    }
                    var items = game.getConfigListByName("doufa_jineng.json" /* DoufaJineng */);
                    this._skillList.source = items;
                };
                //攻击中文本处理 @zpj todo
                KuafuDoufaSceneMdr.prototype.updateBmpDanceFunc = function () {
                    console.info("--kuafudoufan_updateBmpDanceFunc111-- foeTargetId:" + (this._targetVo ? this._targetVo.entity_id : null));
                    //没有攻击对象或者攻击对象是怪物
                    if (!this._targetVo || this._targetVo.type == 3 /* MONSTER */) {
                        if (this._bmpDanceGrp) {
                            this._bmpDanceGrp.removeChildren();
                        }
                        this._bmpDanceGrp = null;
                        return;
                    }
                    var targetId = this._targetVo.entity_id;
                    var grp; //播放字体跳动的group
                    if (this._sceneProxy.maxHurt && this._bmpDanceHeadIdx == 1) {
                        var entityId = this._sceneProxy.maxHurt.entity_id;
                        if (entityId && targetId.eq(entityId)) {
                            grp = this._view.grp_attactEft1;
                            console.info("--kuafudoufan_attack1--", entityId);
                        }
                    }
                    if (this._curEnemyVo && this._bmpDanceHeadIdx == 2) {
                        var entityId = this._curEnemyVo.entity_id;
                        if (entityId && targetId.eq(entityId)) {
                            grp = this._view.grp_attactEft2;
                            console.info("--kuafudoufan_attack2--", entityId);
                        }
                    }
                    if (this._minHpEnemyVo && this._bmpDanceHeadIdx == 3) {
                        var entityId = this._minHpEnemyVo.entity_id;
                        if (entityId && targetId.eq(entityId)) {
                            grp = this._view.grp_attactEft3;
                            console.info("--kuafudoufan_attack3--", entityId);
                        }
                    }
                    //已在动画中
                    if (this._bmpDanceGrp && grp && this._bmpDanceGrp.hashCode == grp.hashCode) {
                        return;
                    }
                    console.info("--kuafudoufan_updateBmpDanceFunc222-- targetId:" + (this._targetVo ? this._targetVo.entity_id : null));
                    if (this._bmpDanceGrp) {
                        this._bmpDanceGrp.removeChildren();
                    }
                    this._bmpDanceGrp = grp;
                    if (grp) {
                        grp.removeChildren();
                        this.getEffHub().addBmpDance('攻击中', grp);
                    }
                };
                return KuafuDoufaSceneMdr;
            }(game.EffectMdrBase));
            compete.KuafuDoufaSceneMdr = KuafuDoufaSceneMdr;
            __reflect(KuafuDoufaSceneMdr.prototype, "game.mod.compete.KuafuDoufaSceneMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var KuafuDoufaScoreMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaScoreMdr, _super);
                function KuafuDoufaScoreMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.KuafuDoufaScoreView);
                    _this.isEasyHide = true;
                    return _this;
                }
                KuafuDoufaScoreMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = compete.KuafuDoufaScoreItem;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                KuafuDoufaScoreMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("kuafu_doufa_my_score_update" /* KUAFU_DOUFA_MY_SCORE_UPDATE */, this.updateItemList, this);
                    this.onNt("kuafu_doufa_score_reward_update" /* KUAFU_DOUFA_SCORE_REWARD_UPDATE */, this.updateItemList, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                KuafuDoufaScoreMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                };
                KuafuDoufaScoreMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                KuafuDoufaScoreMdr.prototype.updateItemList = function () {
                    var cfgList = game.getConfigListByName("doufa_jifen.json" /* DoufaJifen */);
                    var tmps = [];
                    for (var _i = 0, cfgList_8 = cfgList; _i < cfgList_8.length; _i++) {
                        var cfg = cfgList_8[_i];
                        var sort = cfg.index;
                        var status = this._proxy.getScoreStatus(cfg);
                        if (status == 0 /* NotFinish */) {
                            sort += 10000;
                        }
                        else if (status == 2 /* Draw */) {
                            sort += 10000000;
                        }
                        tmps.push({ item: { cfg: cfg, status: status }, order: sort });
                    }
                    tmps.sort(function (v1, v2) {
                        return v1.order - v2.order;
                    });
                    var items = [];
                    for (var _a = 0, tmps_2 = tmps; _a < tmps_2.length; _a++) {
                        var i = tmps_2[_a];
                        items.push(i.item);
                    }
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(items);
                    }
                    else {
                        this._itemList.source = items;
                    }
                };
                return KuafuDoufaScoreMdr;
            }(game.MdrBase));
            compete.KuafuDoufaScoreMdr = KuafuDoufaScoreMdr;
            __reflect(KuafuDoufaScoreMdr.prototype, "game.mod.compete.KuafuDoufaScoreMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var KuafuDoufaSkillMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaSkillMdr, _super);
                function KuafuDoufaSkillMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.KuafuDoufaSkillView);
                    _this.isEasyHide = true;
                    return _this;
                }
                KuafuDoufaSkillMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = compete.KuafuDoufaSkillItem;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                KuafuDoufaSkillMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                KuafuDoufaSkillMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                    this.updateCost();
                };
                KuafuDoufaSkillMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 通用背包事件监听 */
                KuafuDoufaSkillMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    var index = this._costIndex;
                    if (index && indexs.indexOf(index) > -1) {
                        this.updateCost();
                    }
                };
                KuafuDoufaSkillMdr.prototype.updateItemList = function () {
                    var items = game.getConfigListByName("doufa_jineng.json" /* DoufaJineng */);
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(items);
                    }
                    else {
                        this._itemList.source = items;
                    }
                };
                KuafuDoufaSkillMdr.prototype.updateCost = function () {
                    var items = game.getConfigListByName("doufa_jineng.json" /* DoufaJineng */);
                    var cost = items[0].cost;
                    this._costIndex = cost[0];
                    this._view.cost.setData(this._costIndex);
                };
                return KuafuDoufaSkillMdr;
            }(game.MdrBase));
            compete.KuafuDoufaSkillMdr = KuafuDoufaSkillMdr;
            __reflect(KuafuDoufaSkillMdr.prototype, "game.mod.compete.KuafuDoufaSkillMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var KuafuDoufaTipsMdr = /** @class */ (function (_super) {
                __extends(KuafuDoufaTipsMdr, _super);
                function KuafuDoufaTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.BossTipsView);
                    _this._itemList = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                KuafuDoufaTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                KuafuDoufaTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
                };
                KuafuDoufaTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.updateLeftTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                KuafuDoufaTipsMdr.prototype.onUpdateView = function () {
                    this._endTime = this._proxy.getNextTime();
                    var cfg = game.GameConfig.getParamConfigById("kuafu_doufa_reward");
                    var list = cfg.value;
                    this._itemList.source = list;
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(game.getLanById("kuafu_doufa_tips10" /* kuafu_doufa_tips10 */));
                    this._view.btn_get.setEffect("tiaozhan" /* Tiaozhan */);
                };
                KuafuDoufaTipsMdr.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showViewByID(128 /* KuafuDoufa */);
                    this.hide();
                };
                KuafuDoufaTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                    mod.PropTipsMgr.getIns().closeBoss(); //继续boss弹窗
                };
                KuafuDoufaTipsMdr.prototype.update = function (time) {
                    this.updateLeftTime();
                };
                KuafuDoufaTipsMdr.prototype.updateLeftTime = function () {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.hide();
                        return;
                    }
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                return KuafuDoufaTipsMdr;
            }(game.EffectMdrBase));
            compete.KuafuDoufaTipsMdr = KuafuDoufaTipsMdr;
            __reflect(KuafuDoufaTipsMdr.prototype, "game.mod.compete.KuafuDoufaTipsMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliAwardMainMdr = /** @class */ (function (_super) {
                __extends(YouliAwardMainMdr, _super);
                function YouliAwardMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "youli_award_tab",
                            mdr: compete.YouliAwardMdr,
                            title: "youli_award" /* youli_award */,
                            bg: "p1_del_bg",
                            hintTypes: ["52" /* Compete */, "03" /* YouliAwardMain */ + "01" /* Step */],
                        }
                    ];
                    return _this;
                }
                return YouliAwardMainMdr;
            }(mod.WndBaseMdr));
            compete.YouliAwardMainMdr = YouliAwardMainMdr;
            __reflect(YouliAwardMainMdr.prototype, "game.mod.compete.YouliAwardMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var YouliAwardMdr = /** @class */ (function (_super) {
                __extends(YouliAwardMdr, _super);
                function YouliAwardMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.SurfaceGiftView);
                    return _this;
                }
                YouliAwardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = compete.YouliAwardItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                YouliAwardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_award" /* UPDATE_YOULI_AWARD */, this.updateItemList, this);
                };
                YouliAwardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_bg.source = game.ResUtil.getUiPng("youli_award_bg");
                    this.updateReward();
                    this.updateItemList();
                };
                YouliAwardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliAwardMdr.prototype.updateReward = function () {
                    var items = game.getConfigListByName("tourpvp_target.json" /* TourpvpTarget */);
                    var cfg = items[items.length - 1];
                    this._view.icon.setData(cfg.reward[0]);
                };
                YouliAwardMdr.prototype.updateItemList = function () {
                    var items = game.getConfigListByName("tourpvp_target.json" /* TourpvpTarget */);
                    var tmps = [];
                    for (var i = 0, len = items.length; i < len; ++i) {
                        var cfg = items[i];
                        var sort = i;
                        var info = this._proxy.getStepAward(cfg.index);
                        if (info && info.status == 2 /* Draw */) { // 已领取
                            sort += 10000;
                        }
                        tmps.push({ cfg: cfg, sort: sort });
                    }
                    tmps.sort(game.SortTools.sortByRort);
                    items = [];
                    for (var _i = 0, tmps_3 = tmps; _i < tmps_3.length; _i++) {
                        var i = tmps_3[_i];
                        items.push(i.cfg);
                    }
                    this._itemList.replaceAll(items);
                };
                return YouliAwardMdr;
            }(game.MdrBase));
            compete.YouliAwardMdr = YouliAwardMdr;
            __reflect(YouliAwardMdr.prototype, "game.mod.compete.YouliAwardMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var YouliDatiMdr = /** @class */ (function (_super) {
                __extends(YouliDatiMdr, _super);
                function YouliDatiMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliDatiView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliDatiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = compete.YouliDatiItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliDatiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    this.onNt("update_youli_dati" /* UPDATE_YOULI_DATI */, this.hide, this);
                };
                YouliDatiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                };
                YouliDatiMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliDatiMdr.prototype.onClickItem = function (e) {
                    var index = e.item;
                    this._proxy.c2s_tour_dati_select(index);
                };
                YouliDatiMdr.prototype.updateShow = function () {
                    this._view.lab_tip.text = game.getLanById("tourpvp_dati_tips" /* tourpvp_dati_tips */);
                    var infos = this._showArgs.param1;
                    var index = infos[0]; //第一个是题目索引
                    var optionList = infos.slice(1, infos.length); //后面的是选项
                    var cfg = game.getConfigByNameId("tourpvp_dati.json" /* TourpvpDati */, index);
                    this._proxy.datiCfg = cfg;
                    this._view.lab_desc.text = cfg.ques;
                    this._itemList.source = optionList;
                };
                return YouliDatiMdr;
            }(game.EffectMdrBase));
            compete.YouliDatiMdr = YouliDatiMdr;
            __reflect(YouliDatiMdr.prototype, "game.mod.compete.YouliDatiMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var Handler = base.Handler;
            var YouliDatiResultMdr = /** @class */ (function (_super) {
                __extends(YouliDatiResultMdr, _super);
                function YouliDatiResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliDatiResultView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliDatiResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliDatiResultMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                YouliDatiResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                };
                YouliDatiResultMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliDatiResultMdr.prototype.updateShow = function () {
                    var isTrue = this._showArgs.is_true;
                    var tipStr = isTrue ? game.getLanById("tourpvp_dati_tips1" /* tourpvp_dati_tips1 */) : game.getLanById("tourpvp_dati_tips2" /* tourpvp_dati_tips2 */);
                    var cfg = this._proxy.datiCfg;
                    tipStr += "：" + game.TextUtil.addColor(cfg["option_" + cfg.ture_option], 8585074 /* GREEN */);
                    this._view.lab_tip.textFlow = game.TextUtil.parseHtml(tipStr);
                    //答对两个都给，答错只给积分
                    var rewards = [];
                    if (isTrue) {
                        rewards = cfg.reward_option.concat();
                    }
                    rewards.push([1451000001 /* Jingjichangjifen */, cfg.reward]); //积分奖励
                    this._itemList.source = rewards;
                };
                return YouliDatiResultMdr;
            }(game.EffectMdrBase));
            compete.YouliDatiResultMdr = YouliDatiResultMdr;
            __reflect(YouliDatiResultMdr.prototype, "game.mod.compete.YouliDatiResultMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var facade = base.facade;
            var YouliKillerFightMdr = /** @class */ (function (_super) {
                __extends(YouliKillerFightMdr, _super);
                function YouliKillerFightMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.YouliKillerFightView);
                    _this.HP_WIDTH = 350; //血条宽度
                    return _this;
                }
                YouliKillerFightMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliKillerFightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_killer_fight" /* UPDATE_YOULI_KILLER_FIGHT */, this.updateInfo, this);
                };
                YouliKillerFightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    this.updateInfo();
                };
                YouliKillerFightMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliKillerFightMdr.prototype.hide = function (disposeImmediately) {
                    var type = this._proxy.type;
                    if (type == 3 /* SpecialKiller */) {
                        facade.hideView("52" /* Compete */, "08" /* YouliSpecialKiller */);
                    }
                    else if (type == 4 /* ScoreKiller */) {
                        facade.hideView("52" /* Compete */, "09" /* YouliScoreKiller */);
                    }
                    _super.prototype.hide.call(this);
                };
                YouliKillerFightMdr.prototype.updateInfo = function () {
                    this._fightData = this._proxy.fightData;
                    if (!this._fightData) {
                        return;
                    }
                    if (this._fightData.my_hp <= 0 || this._fightData.enemy_hp <= 0) {
                        delayCall(Handler.alloc(this, this.hide), 1000); // 延迟，防止秒杀时看不到界面
                        return;
                    }
                    this.updateSelf();
                    this.updateEnemy();
                    if (this._fightData.my_hp >= 0) {
                        this.updateSelfHp();
                    }
                    if (this._fightData.enemy_hp >= 0) {
                        this.updateEnemyHp();
                    }
                };
                /**更新自己*/
                YouliKillerFightMdr.prototype.updateSelf = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateHeadShow(vo.head, vo.head_frame, vo.sex);
                };
                /**更新自己血量*/
                YouliKillerFightMdr.prototype.updateSelfHp = function () {
                    var percent = this._fightData.my_hp;
                    this._view.img_hp1.width = percent / 10000 * this.HP_WIDTH;
                };
                /**更新敌人*/
                YouliKillerFightMdr.prototype.updateEnemy = function () {
                    var enemies = this._fightData.enemy_info;
                    if (!enemies) {
                        return;
                    }
                    this._view.lab_name2.text = enemies.name;
                    this._view.powerLabel2.setPowerValue(enemies.showpower);
                    this._view.head2.updateHeadShow(enemies.head, enemies.head_frame, enemies.sex);
                };
                /**更新敌人血量*/
                YouliKillerFightMdr.prototype.updateEnemyHp = function () {
                    var percent = this._fightData.enemy_hp;
                    this._view.img_hp2.width = percent / 10000 * this.HP_WIDTH;
                };
                return YouliKillerFightMdr;
            }(game.MdrBase));
            compete.YouliKillerFightMdr = YouliKillerFightMdr;
            __reflect(YouliKillerFightMdr.prototype, "game.mod.compete.YouliKillerFightMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliMainMdr = /** @class */ (function (_super) {
                __extends(YouliMainMdr, _super);
                function YouliMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Youli */,
                            icon: "youli_tab",
                            mdr: compete.YouliMdr,
                            title: "youli" /* youli */,
                            bg: "youli_bg",
                            hintTypes: ["52" /* Compete */, "01" /* CompeteMain */, "01" /* Youli */],
                        }
                    ];
                    return _this;
                }
                return YouliMainMdr;
            }(mod.WndBaseMdr));
            compete.YouliMainMdr = YouliMainMdr;
            __reflect(YouliMainMdr.prototype, "game.mod.compete.YouliMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var YouliMdr = /** @class */ (function (_super) {
                __extends(YouliMdr, _super);
                function YouliMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.YouliView);
                    _this._endTime = 0;
                    _this._rankType = 1002 /* Type4 */;
                    return _this;
                }
                YouliMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._winList = new ArrayCollection();
                    this._view.reward_view.list_win.itemRenderer = compete.YouliWinRewardItem;
                    this._view.reward_view.list_win.dataProvider = this._winList;
                    this._view.reward_view.img_tips.source = "shenglicishu";
                    this._view.reward_view.lab_title.text = game.getLanById("youli_day_award_tips" /* youli_day_award_tips */);
                };
                YouliMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_youli_info" /* UPDATE_YOULI_INFO */, this.updateInfo, this);
                    this.onNt("on_rank_info_update" /* ON_RANK_INFO_UPDATE */, this.onRankUpdate, this);
                    this.onNt("common_click_add" /* COMMON_CLICK_ADD */, this.onCommonClickAdd, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this); //属性刷新，有货币
                    // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
                    addEventListener(this._view.btn_refresh, TouchEvent.TOUCH_TAP, this.onRefresh);
                    addEventListener(this._view.lab_rank_jump, TouchEvent.TOUCH_TAP, this.onRank);
                    addEventListener(this._view.btn_award, TouchEvent.TOUCH_TAP, this.onAward);
                    addEventListener(this._view.btn_score, TouchEvent.TOUCH_TAP, this.onScore);
                    addEventListener(this._view.btn_add_times, TouchEvent.TOUCH_TAP, this.onClickAdd);
                };
                YouliMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    mod.RankUtil.c2s_new_rank_req_rank(this._rankType);
                    game.TextUtil.addLinkHtmlTxt2(this._view.lab_rank_jump, "排行榜", 8585074 /* GREEN */, "");
                    this.updateInfo();
                    this.showGuide();
                };
                YouliMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    mod.GuideMgr.getIns().clear(37 /* YouliChallenge */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                YouliMdr.prototype.initShow = function () {
                    this.addEftByParent("youlibeijing" /* YouliBg */, this._view.grp_eft);
                };
                YouliMdr.prototype.update = function (time) {
                    var rcTime = this.updateRecoverTime();
                    if (rcTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                YouliMdr.prototype.updateInfo = function () {
                    this.updateMyScore();
                    this.updateCurTypeInfo();
                    this.updateMyRank();
                    this.updateRankInfo();
                    this.updateWin();
                };
                /**
                 * 更新当前选中类型数据
                 */
                YouliMdr.prototype.updateCurTypeInfo = function () {
                    var remainTimes = this._proxy.remainTimes;
                    var timesStr = game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(remainTimes + "/" + this._proxy.maxFightTimes, 8585074 /* GREEN */);
                    this._view.lab_times.textFlow = game.TextUtil.parseHtml(timesStr);
                    this._maxBuyCnt = this._proxy.maxFightTimes - remainTimes;
                    for (var i = 1; i <= 4; i++) {
                        this._view["item" + i].data = this._proxy.getTopRank(i);
                    }
                    var cfg;
                    var fuliCfgs = game.getConfigListByName("tourpvp_fuli.json" /* TourpvpFuli */);
                    for (var _i = 0, fuliCfgs_1 = fuliCfgs; _i < fuliCfgs_1.length; _i++) {
                        cfg = fuliCfgs_1[_i];
                        var info = this._proxy.getScoreAward(cfg.index);
                        if (!info) {
                            break;
                        }
                    }
                    this._view.pro_rate.show(this._proxy.dayScore, cfg.count, false, 0, false);
                    this._view.lab_recover_time.visible = !!this._proxy.curFightTimes;
                    if (!!this._proxy.curFightTimes) {
                        this._endTime = this._proxy.nextFightTime;
                        this.updateRecoverTime();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    this._view.btn_award.redPoint.visible = this._proxy.getYouliAwardHint();
                    this._view.btn_score.redPoint.visible = this._proxy.getYouliScoreHint();
                };
                YouliMdr.prototype.updateMyScore = function () {
                    var score = mod.BagUtil.getPropCntByIdx(1450000013 /* Ylcoin */);
                    this._view.lab_my_score.text = "我的游历积分: " + score;
                };
                YouliMdr.prototype.updateRecoverTime = function () {
                    var rmTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (rmTime > 0) {
                        var timeStr = game.TimeUtil.formatSecond(rmTime, "mm:ss");
                        this._view.lab_recover_time.text = timeStr + "恢复1次";
                    }
                    return rmTime;
                };
                YouliMdr.prototype.updateMyRank = function () {
                    var paraCfg1 = game.GameConfig.getParamConfigById("youli_runk_min"); // 上榜积分最低要求
                    var paraCfg2 = game.GameConfig.getParamConfigById("youli_runk_cond"); // 游历排行榜上榜显示条件（小于1001名）
                    // 玩家积分是否大于等于500：
                    // 否，显示：再接再厉
                    // 是，判断玩家排名是否大于等于1000：
                    // 是，显示：未上榜
                    // 否，显示具体排名
                    var myRankStr = "";
                    var score = mod.BagUtil.getPropCntByIdx(1450000013 /* Ylcoin */);
                    if (score < paraCfg1.value) {
                        myRankStr = "再接再厉";
                    }
                    else if (!this._proxy.myRank || this._proxy.myRank >= paraCfg2.value) {
                        myRankStr = "暂未上榜";
                    }
                    else {
                        myRankStr = this._proxy.myRank + "";
                    }
                    this._view.lab_my_rank.text = "我的排名: " + myRankStr;
                };
                YouliMdr.prototype.updateRankInfo = function () {
                    var rankInfo = mod.RankUtil.getRankInfo(this._rankType);
                    if (rankInfo && rankInfo.top_info) {
                        var nameStr = rankInfo.top_info.name;
                        var cntStr = "积分：" + rankInfo.info_list[0].count;
                        var str = nameStr ? nameStr + "\n" + cntStr : game.getLanById("tishi_2" /* tishi_2 */);
                        this._view.lab_top_rank.text = str;
                    }
                    else {
                        this._view.lab_top_rank.text = game.getLanById("tishi_2" /* tishi_2 */);
                    }
                };
                YouliMdr.prototype.onRankUpdate = function () {
                    this.updateMyRank();
                    this.updateRankInfo();
                };
                YouliMdr.prototype.onRefresh = function () {
                    var _this = this;
                    var str = "";
                    if (this._proxy.type != 0 /* Normal */) {
                        str += "当前遇到奇遇事件，是否跳过？";
                    }
                    var paraCfg = game.GameConfig.getParamConfigById("youli_buy_item");
                    var propCfg = game.GameConfig.getPropConfigById(paraCfg.value);
                    var cost = this._proxy.refreshCost;
                    if (str != "") {
                        str += "\n";
                    }
                    str += "\u662F\u5426\u82B1\u8D39" + cost + propCfg.name + "\u5237\u65B0\uFF1F";
                    var data = {
                        lab: str,
                        confirm: Handler.alloc(this, function () {
                            _this._proxy.c2s_tour_refresh_defender();
                        }),
                        cancel: Handler.alloc(this, function () {
                        }),
                        checkType: 1 /* Youli */
                    };
                    facade.showView("02" /* Login */, "06" /* Alert */, data);
                };
                YouliMdr.prototype.onRank = function (evt) {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "05" /* YouliRankMain */);
                };
                YouliMdr.prototype.onAward = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "03" /* YouliAwardMain */);
                };
                YouliMdr.prototype.onScore = function () {
                    mod.ViewMgr.getIns().showView("52" /* Compete */, "04" /* YouliScoreMain */);
                };
                YouliMdr.prototype.onClickAdd = function () {
                    this.onAddTimes();
                };
                /**
                 * 增加挑战次数
                 */
                YouliMdr.prototype.onAddTimes = function (showTips) {
                    if (!this._maxBuyCnt) {
                        /**挑战次数已达上限*/
                        if (!showTips) {
                            showTips = game.getLanById("compete_mars_8" /* compete_mars_8 */);
                        }
                        game.PromptBox.getIns().show(showTips);
                        return;
                    }
                    // 1、有道具的时候，优先使用道具，再购买次数
                    // 2、没有购买次数时候，弹道具获取途径
                    var index = 1450705001 /* YouliJuanzhou */;
                    var propCnt = mod.BagUtil.getPropCntByIdx(index);
                    if (propCnt > 0) {
                        //使用道具
                        mod.ViewMgr.getIns().showPropTips(index, 2 /* Bag */);
                        return;
                    }
                    var maxCnt = this._proxy.maxBuyFightTimes;
                    var cnt = maxCnt - this._proxy.curBuyCnt;
                    if (cnt <= 0) {
                        /**超过每日可购买上限*/
                        // if(!showTips){
                        //     showTips = getLanById(LanDef.compete_mars_9);
                        // }
                        // PromptBox.getIns().show(showTips);
                        //弹道具获取途径
                        mod.ViewMgr.getIns().showGainWaysTips(index);
                        return;
                    }
                    var tips = "是否花费%s购买%s次游历挑战次数？";
                    var cfg = game.GameConfig.getParamConfigById("youli_buy");
                    var cost = cfg.value;
                    //购买次数
                    mod.ViewMgr.getIns().showBuyTimes(tips, cost, cnt, this._maxBuyCnt, maxCnt, Handler.alloc(this._proxy, this._proxy.c2s_tour_buy_times));
                };
                YouliMdr.prototype.onCommonClickAdd = function () {
                    var showTips = game.getLanById("guaji_shouyi_tips07" /* guaji_shouyi_tips07 */);
                    this.onAddTimes(showTips);
                };
                YouliMdr.prototype.updateWin = function () {
                    var winCnt = this._proxy.youliWinCnt;
                    this._view.reward_view.lab_win.text = winCnt + "";
                    var cfgList = game.getConfigListByName("tourpvp_win.json" /* TourpvpWin */);
                    this._winList.source = cfgList; //最多显示4个
                    var cfg = cfgList[cfgList.length - 1];
                    var maxCnt = cfg.count;
                    this._view.reward_view.bar2.show(winCnt, maxCnt, false, 0, false, 2 /* NoValue */);
                };
                YouliMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(37 /* YouliChallenge */, this._view.item2, Handler.alloc(this._view.item2, this._view.item2.onClick)); //任务指引
                };
                YouliMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("ylcoin" /* Ylcoin */) > -1) {
                        this.updateMyScore();
                        this.updateMyRank();
                    }
                };
                return YouliMdr;
            }(game.EffectMdrBase));
            compete.YouliMdr = YouliMdr;
            __reflect(YouliMdr.prototype, "game.mod.compete.YouliMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliRankMainMdr = /** @class */ (function (_super) {
                __extends(YouliRankMainMdr, _super);
                function YouliRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "ui_tab_rank_",
                            mdr: compete.YouliRankMdr,
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                        }
                    ];
                    return _this;
                }
                return YouliRankMainMdr;
            }(mod.WndBaseMdr));
            compete.YouliRankMainMdr = YouliRankMainMdr;
            __reflect(YouliRankMainMdr.prototype, "game.mod.compete.YouliRankMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var YouliRankMdr = /** @class */ (function (_super) {
                __extends(YouliRankMdr, _super);
                function YouliRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._rankType = 1002 /* Type4 */;
                    return _this;
                }
                YouliRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._view.btn_god.visible = false;
                };
                YouliRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                YouliRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    mod.RankUtil.c2s_new_rank_req_rank(1002 /* Type4 */);
                    this.updateShow();
                    this.updateTime();
                    this._view.timeItem.visible = true;
                    TimeMgr.addUpdateItem(this, 1000);
                };
                YouliRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YouliRankMdr.prototype.updateShow = function () {
                    var rankInfo = mod.RankUtil.getRankInfo(this._rankType);
                    var topInfo = rankInfo ? rankInfo.top_info : null;
                    if (topInfo) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var param = game.getConfigByNameId("param.json" /* Param */, "youli_runk_min");
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    if (rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= game.MAX_RANK_NUM) {
                        rankStr += rankInfo.my_info.rank_no;
                        this._view.lab_rank.text = rankStr;
                    }
                    else {
                        rankStr = "\u6E38\u5386\u79EF\u5206" + param.value + "\u4E0A\u699C";
                        this._view.lab_rank.text = rankStr;
                    }
                    var infos = rankInfo && rankInfo.info_list ? rankInfo.info_list : [];
                    var len = infos.length;
                    var infos1 = [];
                    for (var i = 0; i < game.MAX_RANK_SHOW; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var rankInfo_1 = i < len ? infos[i] : null;
                        if (rankInfo_1) {
                            rank = rankInfo_1.rank_no;
                            name = rankInfo_1.name;
                            hurtStr = rankInfo_1.count + "";
                        }
                        var rankCfg = this._proxy.getRankCfg(rank);
                        var reward = rankCfg.reward;
                        var rankStr_1 = void 0;
                        if (rank == game.MAX_RANK_SHOW) {
                            //21名不显示名称和积分
                            name = hurtStr = "";
                            rankStr_1 = game.MAX_RANK_NUM + "+";
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward,
                            rankStr: rankStr_1
                        };
                        infos1.push(info);
                    }
                    this._itemList.replaceAll(infos1);
                    var count = rankInfo && rankInfo.my_info && rankInfo.my_info.count ? rankInfo.my_info.count : 0;
                    this._view.img_type2.source = "youlijifen";
                    this._view.img_type3.source = "paimingjiangli";
                    var score = mod.BagUtil.getPropCntByIdx(1450000013 /* Ylcoin */); //改成读角色身上的货币
                    this._view.lab_num.text = game.getLanById("immortal12" /* immortal12 */) + score; //我的积分：0
                };
                YouliRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                YouliRankMdr.prototype.updateTime = function () {
                    var endTime = this._proxy.rankEndTime;
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                return YouliRankMdr;
            }(game.EffectMdrBase));
            compete.YouliRankMdr = YouliRankMdr;
            __reflect(YouliRankMdr.prototype, "game.mod.compete.YouliRankMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var YouliScoreKillerMdr = /** @class */ (function (_super) {
                __extends(YouliScoreKillerMdr, _super);
                function YouliScoreKillerMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliKillerView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliScoreKillerMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._awardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._awardDatas;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliScoreKillerMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_info" /* UPDATE_YOULI_INFO */, this.updateInfo, this);
                    this.onNt("update_youli_killer_fight" /* UPDATE_YOULI_KILLER_FIGHT */, this.openFight, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
                };
                YouliScoreKillerMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    this._view.img_bg.source = game.ResUtil.getUiPng("youli_score_killer_bg");
                    this._view.img_title.source = "youli_score_killer";
                    this.updateInfo();
                };
                YouliScoreKillerMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliScoreKillerMdr.prototype.updateInfo = function () {
                    if (!this._data) {
                        return;
                    }
                    var isMoreThan = this._data.showpower.gt(game.RoleVo.ins.showpower); //原本是3倍，改成大于当前战力
                    this._view.currentState = isMoreThan ? "more_than_power" : "power";
                    if (!isMoreThan) {
                        this.addBmpFont(this._data.showpower.toNumber() + "", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_power);
                    }
                    var index = this._data.param1[0];
                    var cfg = game.getConfigByNameId("tourpvp_killer.json" /* TourpvpKiller */, index);
                    this._view.lab_desc.text = cfg.desc;
                    this._awardDatas.replaceAll(cfg.reward_big);
                };
                YouliScoreKillerMdr.prototype.onGetBtnClick = function (e) {
                    this._clickBtn = true;
                    this._proxy.c2s_tour_challenge(0, 4 /* ScoreKiller */);
                    this.hide();
                };
                YouliScoreKillerMdr.prototype.openFight = function (e) {
                    if (!this._clickBtn) {
                        return;
                    }
                    this._clickBtn = false;
                    facade.showView("52" /* Compete */, "10" /* YouliKillerFight */, this._data);
                    this.hide();
                };
                return YouliScoreKillerMdr;
            }(game.EffectMdrBase));
            compete.YouliScoreKillerMdr = YouliScoreKillerMdr;
            __reflect(YouliScoreKillerMdr.prototype, "game.mod.compete.YouliScoreKillerMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var YouliScoreMainMdr = /** @class */ (function (_super) {
                __extends(YouliScoreMainMdr, _super);
                function YouliScoreMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "youli_score_tab",
                            mdr: compete.YouliScoreMdr,
                            title: "youli_score" /* youli_score */,
                            bg: "p1_del_bg",
                            hintTypes: ["52" /* Compete */, "04" /* YouliScoreMain */ + "01" /* Score */],
                        }
                    ];
                    return _this;
                }
                return YouliScoreMainMdr;
            }(mod.WndBaseMdr));
            compete.YouliScoreMainMdr = YouliScoreMainMdr;
            __reflect(YouliScoreMainMdr.prototype, "game.mod.compete.YouliScoreMainMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var YouliScoreMdr = /** @class */ (function (_super) {
                __extends(YouliScoreMdr, _super);
                function YouliScoreMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", compete.YouliScoreView);
                    return _this;
                }
                YouliScoreMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(200 /* Compete */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = compete.YouliScoreItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                YouliScoreMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_score" /* UPDATE_YOULI_SCORE */, this.updateItemList, this);
                };
                YouliScoreMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.lab_score.text = this._proxy.dayScore + "";
                    var date = new Date(TimeMgr.time.serverTime);
                    var cur = date.getTime();
                    var next = date.setHours(0, 0, 0, 0) + 24 * 3600 * 1000;
                    this._time = (next - cur) / 1000;
                    if (this._time > 0) { // 下次重置时间
                        this.update(null);
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        this._view.lab_time.text = "";
                    }
                    this.updateItemList();
                };
                YouliScoreMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YouliScoreMdr.prototype.update = function (time) {
                    this._time--;
                    var timeStr = game.TimeUtil.formatSecond(this._time, "HH" + game.getLanById("shijian_2" /* shijian_2 */)
                        + "mm" + game.getLanById("shijian_3" /* shijian_3 */) + "ss" + game.getLanById("shijian_4" /* shijian_4 */));
                    this._view.lab_time.text = timeStr;
                    if (this._time <= 0) {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                YouliScoreMdr.prototype.updateItemList = function () {
                    var items = game.getConfigListByName("tourpvp_fuli.json" /* TourpvpFuli */);
                    var tmps = [];
                    for (var i = 0, len = items.length; i < len; ++i) {
                        var cfg = items[i];
                        var sort = i;
                        var info = this._proxy.getScoreAward(cfg.index);
                        if (info && info.status == 2 /* Draw */) { // 已领取
                            sort += 10000;
                        }
                        tmps.push({ cfg: cfg, sort: sort });
                    }
                    tmps.sort(game.SortTools.sortByRort);
                    items = [];
                    for (var _i = 0, tmps_4 = tmps; _i < tmps_4.length; _i++) {
                        var i = tmps_4[_i];
                        items.push(i.cfg);
                    }
                    this._itemList.replaceAll(items);
                };
                return YouliScoreMdr;
            }(game.MdrBase));
            compete.YouliScoreMdr = YouliScoreMdr;
            __reflect(YouliScoreMdr.prototype, "game.mod.compete.YouliScoreMdr", ["base.UpdateItem"]);
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var YouliSpecialKillerMdr = /** @class */ (function (_super) {
                __extends(YouliSpecialKillerMdr, _super);
                function YouliSpecialKillerMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliKillerView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliSpecialKillerMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._awardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._awardDatas;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliSpecialKillerMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_info" /* UPDATE_YOULI_INFO */, this.updateInfo, this);
                    this.onNt("update_youli_killer_fight" /* UPDATE_YOULI_KILLER_FIGHT */, this.openFight, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
                };
                YouliSpecialKillerMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    this._view.img_bg.source = game.ResUtil.getUiPng("youli_special_killer_bg");
                    this._view.img_title.source = "youli_special_killer";
                    this.updateInfo();
                };
                YouliSpecialKillerMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliSpecialKillerMdr.prototype.updateInfo = function () {
                    if (!this._data) {
                        return;
                    }
                    var isMoreThan = this._data.showpower.toNumber() > game.RoleVo.ins.showpower.toNumber();
                    this._view.currentState = isMoreThan ? "more_than_power" : "power";
                    if (!isMoreThan) {
                        this.addBmpFont(this._data.showpower.toNumber() + "", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_power);
                    }
                    var chaCfg = this._proxy.getChallengeCfg(this._data.index);
                    this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
                    this._awardDatas.replaceAll(chaCfg.reward_big);
                    this._view.btn_get.labelDisplay.text = "狩猎";
                };
                YouliSpecialKillerMdr.prototype.onGetBtnClick = function (e) {
                    this._clickBtn = true;
                    this._proxy.c2s_tour_challenge(0, 3 /* SpecialKiller */);
                    this.hide();
                };
                YouliSpecialKillerMdr.prototype.openFight = function (e) {
                    if (!this._clickBtn) {
                        return;
                    }
                    this._clickBtn = false;
                    facade.showView("52" /* Compete */, "10" /* YouliKillerFight */, this._data);
                    this.hide();
                };
                return YouliSpecialKillerMdr;
            }(game.EffectMdrBase));
            compete.YouliSpecialKillerMdr = YouliSpecialKillerMdr;
            __reflect(YouliSpecialKillerMdr.prototype, "game.mod.compete.YouliSpecialKillerMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var YouliTreasureMdr = /** @class */ (function (_super) {
                __extends(YouliTreasureMdr, _super);
                function YouliTreasureMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliTreasureView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliTreasureMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._awardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._awardDatas;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliTreasureMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_youli_info" /* UPDATE_YOULI_INFO */, this.updateInfo, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
                };
                YouliTreasureMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._index = this._showArgs;
                    this.updateInfo();
                };
                YouliTreasureMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YouliTreasureMdr.prototype.updateInfo = function () {
                    if (!this._index) {
                        return;
                    }
                    var chaCfg = this._proxy.getChallengeCfg(this._index);
                    this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
                    var preCfg = this._proxy.getPreciousCfg(this._proxy.giftIndex);
                    this._awardDatas.replaceAll(preCfg.gift_award);
                    this._view.btn_get.labelDisplay.text = ""; // getLanById(LanDef.tishi_29);
                    this._view.btn_get.setCost(preCfg.price);
                };
                YouliTreasureMdr.prototype.onGetBtnClick = function (e) {
                    this._proxy.c2s_tour_challenge(0, 2 /* Treasure */);
                    this.hide();
                };
                return YouliTreasureMdr;
            }(game.MdrBase));
            compete.YouliTreasureMdr = YouliTreasureMdr;
            __reflect(YouliTreasureMdr.prototype, "game.mod.compete.YouliTreasureMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var compete;
        (function (compete) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var YouliWishBoxMdr = /** @class */ (function (_super) {
                __extends(YouliWishBoxMdr, _super);
                function YouliWishBoxMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", compete.YouliWishBoxView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YouliWishBoxMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._itemDatas = new ArrayCollection();
                    this._view.list_award.itemRenderer = compete.YouliWishBoxItemRender;
                    this._view.list_award.dataProvider = this._itemDatas;
                    this._proxy = this.retProxy(200 /* Compete */);
                };
                YouliWishBoxMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    // this.onNt(CompeteEvent.UPDATE_YOULI_INFO, this.updateInfo, this);
                    this.onNt("update_youli_wish_box" /* UPDATE_YOULI_WISH_BOX */, this.updateInfo, this);
                    addEventListener(this._view.list_award, ItemTapEvent.ITEM_TAP, this.onClickItem);
                };
                YouliWishBoxMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateInfo();
                };
                YouliWishBoxMdr.prototype.onHide = function () {
                    this._proxy.clearWishBoxAwardArr();
                    _super.prototype.onHide.call(this);
                };
                YouliWishBoxMdr.prototype.initShow = function () {
                    var info = this._showArgs;
                    var index = info.index;
                    var chaCfg = this._proxy.getChallengeCfg(index);
                    this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
                    this._view.lab_tip.text = game.getLanById("tourpvp_baoxiang_tips" /* tourpvp_baoxiang_tips */);
                };
                YouliWishBoxMdr.prototype.updateInfo = function () {
                    var info = this._showArgs;
                    var boxList = info.param1;
                    var len = boxList.length;
                    var rewards = this._proxy.getWishBoxAwardArr();
                    var datas = [];
                    for (var i = 0; i < len; i++) {
                        var index = boxList[i];
                        var cfg = game.getConfigByNameId("tourpvp_baoxiang.json" /* TourpvpBaoxiang */, index);
                        var reward = rewards.length > i ? rewards[i] : null;
                        var status = void 0;
                        if (!reward) {
                            status = "not_open" /* NOT_OPEN */;
                        }
                        else if (reward.status == 0 /* NotFinish */) {
                            status = "open" /* OPEN */;
                        }
                        else {
                            status = "open_got" /* OPEN_GOT */;
                        }
                        var data = {
                            index: index,
                            status: status,
                            descUrl: cfg.show,
                            reward: reward ? reward.props : null
                        };
                        datas.push(data);
                    }
                    this._itemDatas.replaceAll(datas);
                };
                YouliWishBoxMdr.prototype.onClickItem = function (e) {
                    var itemData = e.item;
                    if (itemData.status != "not_open" /* NOT_OPEN */) {
                        return;
                    }
                    this._proxy.c2s_tour_challenge(itemData.index, 1 /* WishBox */);
                };
                return YouliWishBoxMdr;
            }(game.MdrBase));
            compete.YouliWishBoxMdr = YouliWishBoxMdr;
            __reflect(YouliWishBoxMdr.prototype, "game.mod.compete.YouliWishBoxMdr");
        })(compete = mod.compete || (mod.compete = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=compete.js.map