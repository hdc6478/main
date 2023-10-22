declare module game.config {
	interface AchievementConfig {
		/**成就阶数*/
		readonly order_level: number;
		/**阶数奖励*/
		readonly rewards: number[][];
		/**达标阶数所需积分*/
		readonly value: number;

	}

	interface ActiveAwardConfig {
		/**奖励ID*/
		readonly index: number;
		/**需要历练值*/
		readonly activation: number;
		/**奖励内容*/
		readonly award: number[][];

	}

	interface AdvanceLvConfig {
		/**装备阶数*/
		readonly index: number;
		/**阶数名称*/
		readonly name: string;

	}

	interface AdventureMedalConfig {
		/**勋章ID*/
		readonly index: number;
		/**勋章名称*/
		readonly name: string;
		/**勋章品质*/
		readonly quality: number;
		/**勋章形象*/
		readonly icon: string;
		/**模型*/
		readonly model: string;
		/**解锁历练值*/
		readonly activation_exp: number;
		/**解锁等级*/
		readonly activation_level: number;
		/**勋章属性*/
		readonly medal: number;

	}

	interface AmassConfig {
		/**图鉴ID*/
		readonly index: number;
		/**图鉴名称*/
		readonly name: string;
		/**图鉴类型*/
		readonly type: number;
		/**属性ID升阶属性*/
		readonly attr_id: number[];
		/**升阶消耗的数量*/
		readonly cost_num: number[];
		/**图鉴描述*/
		readonly desc: string;

	}

	interface AmassSuitConfig {
		/**图鉴类型*/
		readonly type: number;
		/**图鉴图标和名称*/
		readonly icon: string;
		/**数量_套装buffID*/
		readonly suit: number[][];
		/**图鉴类型*/
		readonly type_name: string;
		/**使用跳转ID*/
		readonly jump_id: number;
		/**是否默认显示*/
		readonly show: number;

	}

	interface AtticChallengeConfig {
		/**奖励索引*/
		readonly index: number;
		/**轮次*/
		readonly stage: number;
		/**次数*/
		readonly cnt: number;
		/**奖励*/
		readonly reward: number[][];
		/**阶段奖励*/
		readonly stage_reward: number[][];

	}

	interface AtticExchangeConfig {
		/**层数索引*/
		readonly index: number;
		/**获得道具*/
		readonly give_items: number[][];
		/**消耗道具*/
		readonly cost_items: number[][];

	}

	interface AtticGiftConfig {
		/**索引*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**商店索引id*/
		readonly shop_index: number;

	}

	interface AtticLoginConfig {
		/**索引*/
		readonly index: number;
		/**登录类型*/
		readonly type: number;
		/**充值额度*/
		readonly cost: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface AyahEventFuncConfig {
		/**编号*/
		readonly index: number;
		/**功能开启id*/
		readonly open_func: number;
		/**优先级高的先执行*/
		readonly rank: number;
		/**限时活动实时插队副本*/
		readonly limit_activity: number;

	}

	interface AyahLevelConfig {
		/**等级编号*/
		readonly level: number;
		/**升满该级所需经验*/
		readonly exp: number;
		/**副本事件解锁*/
		readonly event_list: number[];

	}

	interface AyahOfflineConfig {
		/**副本类型*/
		readonly type: number;
		/**离线挂机条件（天帝神灵id）_完成挑战的时间(秒)*/
		readonly time: number[];

	}

	interface AyahTargetConfig {
		/**编号*/
		readonly index: number;
		/**购买类型*/
		readonly type: number;
		/**等级条件达成*/
		readonly level: number;
		/**购买道具消耗*/
		readonly cost: number[];
		/**购买获得奖励*/
		readonly reward: number[][];
		/**充值id*/
		readonly product_id: number;

	}

	interface BagTypeConfig {
		/**大类编号*/
		readonly index: number;
		/**排序优先级*/
		readonly sort: number;

	}

	interface BattleFigureConfig {
		/**伤害类型ID*/
		readonly index: number;
		/**字体名称*/
		readonly font_name: string;
		/**层级*/
		readonly layer: number;
		/**是否有文字*/
		readonly has_word: number;
		/**初始状态*/
		readonly start_status: number;
		/**飘字逻辑引用*/
		readonly actAtr: string;
		/**动作字符串*/
		readonly act_json: string;

	}

	interface BattleSkillConfig {
		/**技能编号*/
		readonly index: number;
		/**技能替换*/
		readonly skill_replace: number;
		/**技能特效*/
		readonly skillshow: number;
		/**施放间隔*/
		readonly next_cd: number;
		/**技能类型1*/
		readonly type1: number;
		/**技能类型2*/
		readonly type2: number;
		/**展示类型*/
		readonly show_type: number;
		/**技能名称*/
		readonly name: string;
		/**技能描述*/
		readonly describe: string;
		/**获取途径（简略）*/
		readonly getaway: string;
		/**图标*/
		readonly icon: string;
		/**技能冷却*/
		readonly cd: number;
		/**影响人数上限*/
		readonly max_count: number;
		/**范围形状*/
		readonly shape: number;
		/**最大施放距离*/
		readonly max_distance: number;
		/**技能品质*/
		readonly quality: number;
		/**技能开启条件*/
		readonly open_condition: number[];
		/**技能进阶材料*/
		readonly advanced_material: number[];
		/**技能进阶伤害加成*/
		readonly advanced_hurt: number;
		/**前置技能*/
		readonly skill_condition: number;
		/**前置技能需要X级*/
		readonly skillmax_condition: number;
		/**技能所在格子*/
		readonly skill_position: number[];
		/**技能连线*/
		readonly skill_connect: number[];
		/**触发任务ID*/
		readonly task: number;
		/**附带战力*/
		readonly powershow: number;
		/**激活消耗材料*/
		readonly act_material: number[][];
		/**飘字*/
		readonly battle_figure: number;
		/**飘字延迟*/
		readonly delay: number;
		/**释放优先级*/
		readonly precedence: number;
		/**飘字*/
		readonly battle_figure2: number;

	}

	interface BlessMainConfig {
		/**品质*/
		readonly quality: number;
		/**权重(万分比*/
		readonly weight: number;
		/**界面展示*/
		readonly show: number[][];

	}

	interface BodyConfig {
		/**时装ID*/
		readonly index: number;
		/**时装名称*/
		readonly name: string;
		/**时装类型*/
		readonly type: number;
		/**神兵外显和图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**羁绊幻化跳转VIP等级*/
		readonly gain_vip: number;

	}

	interface BodyJibanConfig {
		/**编号*/
		readonly index: number;
		/**套装名称*/
		readonly name: string;
		/**套装组成*/
		readonly fashion_part: number[];
		/**属性*/
		readonly attribute: number[][];
		/**图标*/
		readonly icon: string;
		/**显示顺序*/
		readonly order: number;
		/**羁绊属性*/
		readonly once_property: number;
		/**套装品质*/
		readonly quality: number;

	}

	interface BuffConfig {
		/**编号*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**品质*/
		readonly buff_quality: number;
		/**图标*/
		readonly icon: string;
		/**触发概率*/
		readonly probability: number;
		/**描述*/
		readonly des: string;
		/**飘字*/
		readonly battle_figure: number;
		/**标识*/
		readonly logo: string;
		/**战力*/
		readonly powershow: number;

	}

	interface CanzhengeConfig {
		/**奖励索引*/
		readonly index: number;
		/**奖池掉落id*/
		readonly drop_id: number[];
		/**大奖道具id*/
		readonly prix_id: number[];
		/**开启消耗*/
		readonly costs: number[][];
		/**开服天数*/
		readonly server_day: number;

	}

	interface ChapterawardConfig {
		/**奖励索引*/
		readonly index: number;
		/**全服首个达到第几关*/
		readonly level: number;
		/**奖励*/
		readonly award: number[][];

	}

	interface ChatLimitConfig {
		/**频道类型*/
		readonly channel_type: number;
		/**频道名字*/
		readonly channel_name: string;
		/**功能开启ID*/
		readonly open_id: number;
		/**时间CD（秒）*/
		readonly CD: number[][];
		/**基本表情条件*/
		readonly emoji_lv: number;
		/**VIP表情条件*/
		readonly vip_index: number;
		/**表情发送时间CD(秒）*/
		readonly emoji_cd: number;
		/**限制等级，VIP配置*/
		readonly limits: number[];
		/**累计充值金额*/
		readonly chargeMoney: number;

	}

	interface ChildConfig {
		/**子女ID*/
		readonly index: number;
		/**子女名称*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**界面模型缩放(万分比)*/
		readonly scale: number;
		/**模型，icon*/
		readonly icon: string;
		/**类型*/
		readonly type: number;
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**被动技能（前端）*/
		readonly passive_skill_idc: number[][];
		/**单个激活属性*/
		readonly once_property: number;
		/**跳转*/
		readonly gain_id: number[];

	}

	interface ChildJibanConfig {
		/**羁绊id*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**icon*/
		readonly icon: string;
		/**子女id*/
		readonly partners: number[];
		/**套装属性*/
		readonly property: number;
		/**技能加成*/
		readonly skill_enhance: number;

	}

	interface ChildLingyiConfig {
		/**羽翼ID*/
		readonly index: number;
		/**羽翼名称*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**模型，icon*/
		readonly icon: string;
		/**类型*/
		readonly type: number;
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**跳转*/
		readonly gain_id: number[];
		/**是否默认显示*/
		readonly show: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**激活或升星消耗*/
		readonly material: number[][];
		/**升星战力*/
		readonly star_power: number[];

	}

	interface ChildShenbingConfig {
		/**神兵ID*/
		readonly index: number;
		/**神兵名称*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**模型，icon*/
		readonly icon: string;
		/**类型*/
		readonly type: number;
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**跳转*/
		readonly gain_id: number[];
		/**是否默认显示*/
		readonly show: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**激活或升星消耗*/
		readonly material: number[][];
		/**升星战力*/
		readonly star_power: number[];

	}

	interface ChildShengxingConfig {
		/**星级*/
		readonly star: number;
		/**属性*/
		readonly attr: number[];
		/**消耗*/
		readonly star_consume: number[];
		/**升星战力*/
		readonly star_power: number;

	}

	interface ChonglistGiftConfig {
		/**索引*/
		readonly index: number;
		/**vip购买条件*/
		readonly vip_cond: number;
		/**购买类型*/
		readonly buy_type: number;
		/**商店索引id*/
		readonly shop_index: number;
		/**商品描述*/
		readonly desc: string;

	}

	interface ChonglistRankConfig {
		/**索引*/
		readonly index: number;
		/**名次*/
		readonly rank_no: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface ChonglistTargetConfig {
		/**索引*/
		readonly index: number;
		/**奖励*/
		readonly reward: number[][];
		/**目标积分*/
		readonly cnt: number;

	}

	interface CrossBossConfig {
		/**副本编号*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**开启条件*/
		readonly open: number[];
		/**奖励预览*/
		readonly reward_big: number;
		/**宗门排行奖励预览*/
		readonly rank_reward_show1: number[][];
		/**宗门排行上榜限制*/
		readonly rank_limit1: number;
		/**个人排行奖励预览*/
		readonly rank_reward_show2: number[][];
		/**个人排行上榜限制*/
		readonly rank_limit2: number;
		/**伤害奖励预览*/
		readonly hurt_reward_show: number[][];
		/**幸运奖励*/
		readonly lucky_reward: number[][];
		/**最后一击奖励*/
		readonly finally_atk: number[][];

	}

	interface DabiaojiangliConfig {
		/**索引*/
		readonly index: number;
		/**奖励购买消耗*/
		readonly award_buy: number[][];
		/**达标条件*/
		readonly target: number[];
		/**奖励*/
		readonly award: number[][];
		/**文本*/
		readonly desc: string;

	}

	interface DailyLimitTimeConfig {
		/**编号*/
		readonly index: number;
		/**类型*/
		readonly act_type: number;
		/**活动日*/
		readonly week_day: number[];
		/**功能开启id*/
		readonly open_id: number;
		/**活动时间*/
		readonly act_time: number[][];
		/**奖励预览*/
		readonly reward: number[][];
		/**开始前提示*/
		readonly show_time: number;
		/**使用跳转ID*/
		readonly jump_id: number;
		/**活动描述*/
		readonly desc: string;
		/**活动说明*/
		readonly desc1: string;
		/**活动banner*/
		readonly banner: string;
		/**活动推荐*/
		readonly is_top: number;

	}

	interface DailySignConfig {
		/**编号*/
		readonly index: number;
		/**签到奖励*/
		readonly reward: number[];

	}

	interface DailyWanfaConfig {
		/**索引*/
		readonly index: number;
		/**功能开启id*/
		readonly open_id: number;
		/**目标值*/
		readonly target: number;
		/**UI跳转*/
		readonly jump: number;
		/**状态*/
		readonly status: number;

	}

	interface DaolvShopConfig {
		/**商品编号*/
		readonly index: number;
		/**道具ID*/
		readonly prop: number[][];
		/**消耗货币id*/
		readonly coin_type: number;
		/**原价*/
		readonly price: number;
		/**限购类型*/
		readonly lmt_type: number;
		/**限购次数*/
		readonly lmt_cnt: number;
		/**周_终生*/
		readonly cnts: number[];
		/**排序*/
		readonly sort: number;
		/**商品描述*/
		readonly des: string;
		/**角标*/
		readonly tag: string;

	}

	interface DemonRewardConfig {
		/**副本编号*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**全服首杀*/
		readonly first_skill_reward: number[][];
		/**个人首杀*/
		readonly personal_kill_reward: number[][];
		/**最后一击*/
		readonly end_skill_reward: number[][];

	}

	interface DirectShopConfig {
		/**商品ID*/
		readonly product_id: number;
		/**参数1*/
		readonly param1: number;
		/**排序*/
		readonly sort: number;

	}

	interface DoufaChengjiuConfig {
		/**索引ID*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**目标次数*/
		readonly count: number;
		/**奖励列表*/
		readonly reward: number[][];

	}

	interface DoufaGerenPaimingConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**排名奖励*/
		readonly reward: number[][];

	}

	interface DoufaJifenConfig {
		/**索引ID*/
		readonly index: number;
		/**所需积分*/
		readonly count: number;
		/**奖励列表*/
		readonly reward: number[][];

	}

	interface DoufaJinengConfig {
		/**索引*/
		readonly index: number;
		/**buffid*/
		readonly buffid: number;
		/**消耗*/
		readonly cost: number[];
		/**CD时间*/
		readonly cd_time: number;

	}

	interface DoufaXianzongPaimingConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**排名奖励*/
		readonly reward: number[][];

	}

	interface DrawCountRewardsConfig {
		/**索引*/
		readonly index: number;
		/**达标召唤次数目标*/
		readonly count: number;
		/**奖励*/
		readonly rewards: number[][];

	}

	interface DrawGiftConfig {
		/**索引*/
		readonly index: number;
		/**限购次数*/
		readonly count: number;
		/**道具*/
		readonly items: number[];
		/**价格*/
		readonly cost: number[];

	}

	interface DrawLuckGiftConfig {
		/**索引*/
		readonly index: number;
		/**条件*/
		readonly condition: number[];
		/**道具*/
		readonly items: number[][];
		/**价格(可选,填0表示不需要消耗道具购买)*/
		readonly cost: number[];

	}

	interface DrawMainConfig {
		/**品质*/
		readonly quality: number;
		/**权重(万分比*/
		readonly weight: number;
		/**显示*/
		readonly award: number[][];

	}

	interface DrawRankConfig {
		/**索引*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**奖励*/
		readonly rewards: number[];

	}

	interface DressConfig {
		/**装扮ID*/
		readonly index: number;
		/**装扮名称*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**区分男女*/
		readonly minute: number;
		/**装扮图标*/
		readonly icon: string;
		/**客户端资源*/
		readonly resource: string;
		/**属性ID（激活属性,星级属性）*/
		readonly attr_id: number[];
		/**道具描述*/
		readonly desc: string;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**获动态时星级*/
		readonly dynamic_condition: number;
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**使用跳转ID*/
		readonly jump_id: number;
		/**最大叠加数量*/
		readonly max_count: number;
		/**智能使用*/
		readonly easyuse: number;
		/**是否可以使用*/
		readonly usable: number;
		/**选择最大数量*/
		readonly max_number: number;
		/**类型*/
		readonly type: number;
		/**是否默认显示*/
		readonly show: number;
		/**激活条件*/
		readonly activation_param: number[];
		/**显示条件*/
		readonly show_param: number[];

	}

	interface EffectConfig {
		/**编号*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**持续时间*/
		readonly life_time: number;
		/**冷却时间*/
		readonly cooldown: number;
		/**表现特效*/
		readonly client_effect: number;
		/**图标*/
		readonly icon: string;
		/**描述*/
		readonly des: string;
		/**飘字*/
		readonly battle_figure: number;

	}

	interface EffectSubConfig {
		/**特效名称*/
		readonly index: string;
		/**子合图数*/
		readonly subNumber: number;

	}

	interface ElixirBuffConfig {
		/**丹药类型*/
		readonly typeID: number;
		/**修为*/
		readonly age: number[];
		/**buffid*/
		readonly buff_index: number[];

	}

	interface ElixirInitConfig {
		/**id*/
		readonly index: number;
		/**丹药类型*/
		readonly type: number;
		/**吞噬限制转生等级*/
		readonly eat_limit: number;
		/**道具id*/
		readonly itemid: number;
		/**属性*/
		readonly ability_index: number;
		/**提升修为*/
		readonly age: number;

	}

	interface ElixirLimitConfig {
		/**吞噬限制转生等级*/
		readonly index: number;
		/**限制吞噬数量*/
		readonly limit_num: number;
		/**限制吞噬数量*/
		readonly limit_num2: number;
		/**限制吞噬数量*/
		readonly limit_num3: number;

	}

	interface EquipmentConfig {
		/***/
		readonly index: number;
		/**装备名称*/
		readonly name: string;
		/**图标名称*/
		readonly icon: string;
		/**装备阶级*/
		readonly equip_lv: number;
		/**装备穿戴条件*/
		readonly wear_condition: number[];
		/**转生等级索引*/
		readonly rebirth_limit: number;
		/**道具品质*/
		readonly quality: number;
		/**职业要求*/
		readonly job_demand: number;
		/**等级要求*/
		readonly level_demand: number;
		/**增幅属性*/
		readonly zengfu: number[][];
		/**极品属性数*/
		readonly jiping: number[][];
		/**极品属性库ID*/
		readonly jiping_index: number;
		/**基础属性ID*/
		readonly attr_id: number;
		/**稀有掉落*/
		readonly tips: number;
		/**装备价格*/
		readonly price: number[];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**合成消耗*/
		readonly compose: number[][];
		/**分解获得*/
		readonly resolve: number[][];
		/**词条描述*/
		readonly entry_des: string;
		/**道具描述*/
		readonly desc: string;
		/**参数*/
		readonly parm1: number[];
		/**智能使用*/
		readonly easyuse: number;
		/**宗门捐献或兑换消耗*/
		readonly guild_donate: number[];

	}

	interface FengmoDamageRewardConfig {
		/**编号*/
		readonly index: number;
		/**伤害要求，单位W*/
		readonly damage_value: number;
		/**奖励道具*/
		readonly damage_awards: number[][];

	}

	interface FengmoRankConfig {
		/**索引*/
		readonly index: number;
		/**名次区间*/
		readonly rank_no: number[];
		/**奖励*/
		readonly awards: number[][];

	}

	interface FengmoTiaozhanRewardConfig {
		/**编号*/
		readonly index: number;
		/**次数要求*/
		readonly tiaozhan_times: number;
		/**奖励道具*/
		readonly tiaozhan_awards: number[][];

	}

	interface FightpowerConfig {
		/**参数名称*/
		readonly index: string;
		/**中文内容*/
		readonly content: string;
		/**战斗力*/
		readonly fightpower: number;
		/**排序*/
		readonly sort: number;
		/**客户端是否隐藏*/
		readonly ishide: number;
		/**结果是否为系数*/
		readonly isfloat: number;
		/**特殊属性标识*/
		readonly specialflag: number;

	}

	interface ForbiddenFubenConfig {
		/**大关id*/
		readonly index: number;
		/**开启条件*/
		readonly open: number[];
		/**是否支持扫荡*/
		readonly is_sweep: number;
		/**每日免费扫荡次数*/
		readonly free: number;
		/**扫荡奖励*/
		readonly sweep_award: number[][];
		/**bossId*/
		readonly bossId: number[];
		/**所属页签*/
		readonly tabid: number;
		/**关卡顺序*/
		readonly order: number;

	}

	interface ForbiddenGateConfig {
		/**小关id*/
		readonly gate_id: number;
		/**展示物品*/
		readonly show_reward: number;
		/**推荐战力*/
		readonly show_power: number;
		/**显示的通关奖励*/
		readonly gate_show_reward: number;

	}

	interface FriendGiftConfig {
		/**编号*/
		readonly index: number;
		/**获得的道具*/
		readonly give_item: number[];
		/**情谊值*/
		readonly value: number;

	}

	interface GameOrderConfig {
		/**索引ID*/
		readonly index: number;
		/**目标条件*/
		readonly target: number;
		/**普通奖励*/
		readonly reward: number[];
		/**充值奖励*/
		readonly rewad_1: number[][];

	}

	interface GameOrderTypeConfig {
		/**索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**大奖展示（不配就是没有需要展示的）*/
		readonly target: number[][];
		/**战令充值id(每个类型的第一行数据填id即可*/
		readonly recharge_id: number;
		/**是否重置(数据填重置天数即可.填0不重置)*/
		readonly reset: number[];
		/**跳转*/
		readonly jump: number;
		/**功能开启id*/
		readonly funcopen: number;

	}

	interface Gate1Config {
		/**关卡编号*/
		readonly index: number;
		/**场景ID*/
		readonly scene_index: number;
		/**预览ID*/
		readonly preview_id: number;
		/**怪物ID*/
		readonly monster_id: number;
		/**推荐战力*/
		readonly fighting_capacitv: number;
		/**挂机收益*/
		readonly eamings: number[][];
		/**挂机收益展示*/
		readonly drop_show: number[][];
		/**特殊关卡资源*/
		readonly icon: string;
		/**关卡名称*/
		readonly gate_name: string;
		/**关卡显示奖励*/
		readonly show_award: number[][];
		/**战败提示*/
		readonly faulttips: number[];

	}

	interface GatherConfig {
		/**编号*/
		readonly index: number;
		/**套装名称*/
		readonly name: string;
		/**套装组成*/
		readonly fashion_part: number[];
		/**属性*/
		readonly attribute: number[][];
		/**图标*/
		readonly icon: string;
		/**显示顺序*/
		readonly order: number;
		/**大奖*/
		readonly award: number[];
		/**转生数*/
		readonly level: number;

	}

	interface GiftBagConfig {
		/**商品ID*/
		readonly product_id: number;
		/**礼包类型*/
		readonly type: number;
		/**礼包名称*/
		readonly name: string;
		/**奖励内容*/
		readonly awards: number[][];
		/**充值多少钱开启*/
		readonly open_charge: number;
		/**开服天数开启*/
		readonly day_up: number;
		/**开服天数结束*/
		readonly day_out: number;
		/**功能开启*/
		readonly funcopen: number;
		/**礼包图片*/
		readonly icon: string;

	}

	interface GodpowerConfig {
		/**仙魄等级*/
		readonly index: number;
		/**转生等级限制*/
		readonly advance_limit: number;
		/**仙力效果（万分比）*/
		readonly god_rate: number;

	}

	interface GongfengRewardConfig {
		/**索引ID*/
		readonly index: number;
		/**奖励列表*/
		readonly reward: number[];

	}

	interface GongfengShowConfig {
		/**奖励ID*/
		readonly index: number;
		/**奖励*/
		readonly award: number[][];
		/**奖池名称*/
		readonly name: string;

	}

	interface GridConfig {
		/**灵池索引*/
		readonly index: number;
		/**灵池开启条件*/
		readonly pool_condition: number;
		/**格子开启条件*/
		readonly grid_condition: number[];

	}

	interface GuideConfig {
		/**指引ID*/
		readonly index: number;

	}

	interface GuiidRandomConfig {
		/**奖励ID*/
		readonly index: number;
		/**权重(万分比)*/
		readonly weight: number;
		/**奖励*/
		readonly award: number[][];
		/**奖池名称*/
		readonly name: string;

	}

	interface GuildAuctionConfig {
		/**拍卖道具id*/
		readonly item_id: number;
		/**拍卖消耗*/
		readonly cost: number[];

	}

	interface GuildBaoKuConfig {
		/**索引*/
		readonly index: number;
		/**次数*/
		readonly count: number;
		/**消耗*/
		readonly cost: number[];
		/**获得道具*/
		readonly reward: number[];

	}

	interface GuildChargeConfig {
		/**编号*/
		readonly index: number;
		/**类型区分*/
		readonly type: number;
		/**充值目标*/
		readonly charge_num: number;
		/**获得奖励*/
		readonly rewards: number[][];

	}

	interface GuildCreateDataConfig {
		/**编号*/
		readonly index: number;
		/**宗门等级*/
		readonly level: number;
		/**vip等级条件*/
		readonly vip_lv: number;
		/**消耗道具*/
		readonly cost: number[];

	}

	interface GuildDonateConfig {
		/**编号*/
		readonly index: number;
		/**宗门等级*/
		readonly level: number;
		/**宗门经验*/
		readonly exp: number;
		/**每日领取奖励*/
		readonly daily_reward: number[][];
		/**捐献消耗*/
		readonly cost: number[][];
		/**捐献奖励*/
		readonly donate_reward: number[][];
		/**捐献获得宗门经验奖励*/
		readonly donate_exp: number[][];
		/**职位上限*/
		readonly job_num: number[][];
		/**总人数上限*/
		readonly num: number;

	}

	interface GuildDrawConfig {
		/**索引*/
		readonly index: number;
		/**奖励次数*/
		readonly num: number;
		/**奖励*/
		readonly reward: number[];
		/**是否大奖*/
		readonly max_reward: number;

	}

	interface GuildJobDataConfig {
		/**编号*/
		readonly index: number;
		/**踢出任意成员权限*/
		readonly del_member: number;
		/**修改宗门名权限*/
		readonly change_name: number;
		/**修改职务权限*/
		readonly change_job: number;
		/**同意加入权限*/
		readonly agree_join: number;
		/**战力权限*/
		readonly open_set: number;
		/**是否有招募权限*/
		readonly change_invita: number;
		/**回收仓库道具权限*/
		readonly recover_ware_item: number;
		/**进阶仙兽权限*/
		readonly xiaoshou_up_level: number;
		/**仙兽额外属性权限*/
		readonly xiaoshou_attr: number;
		/**宗门pk队伍替换权限*/
		readonly guild_pk: number;

	}

	interface GuildMibaoConfig {
		/**索引*/
		readonly index: number;
		/**神灵id*/
		readonly id: number;
		/**获得道具id*/
		readonly give_item: number;
		/**获得数量*/
		readonly give_count: number;
		/**兑换消耗道具id*/
		readonly cost_item: number;
		/**兑换消耗道具数量*/
		readonly cost_count: number;

	}

	interface GuildPkSkillConfig {
		/**技能索引*/
		readonly index: number;
		/**释放技能消耗道具*/
		readonly cost: number[][];
		/**技能CD时间*/
		readonly cd: number;
		/**技能ID*/
		readonly skill_id: number;

	}

	interface GuildStudyConfig {
		/**书斋索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**道具品质*/
		readonly quality: number;
		/**激活条件*/
		readonly activate_condition: number;
		/**突破消耗道具*/
		readonly break_item: number[][];
		/**buffID*/
		readonly break_property: number[];

	}

	interface GuildStudyLevelConfig {
		/**阶数*/
		readonly splevel: number;
		/**等级升级消耗道具*/
		readonly grade_item: number[][];

	}

	interface GuildWareConfig {
		/**固定奖励道具id*/
		readonly item_id: number;
		/**兑换初始次数*/
		readonly count: number;
		/**兑换消耗*/
		readonly cost: number[];
		/**仓库内容排序*/
		readonly sort: number;

	}

	interface GuildXianshouConfig {
		/**等级索引*/
		readonly level: number;
		/**积分*/
		readonly score: number;
		/**基本属性*/
		readonly attr_id: number;
		/**额外属性*/
		readonly extra_attr_id: number;

	}

	interface GuildXianshouRankConfig {
		/**索引*/
		readonly index: number;
		/**名次*/
		readonly rank_no: number[];
		/**奖励*/
		readonly reward: number[][];

	}

	interface GuildXianshouTargetConfig {
		/**索引*/
		readonly index: number;
		/**分数*/
		readonly score: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface GuildXianshouTaskConfig {
		/**索引*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**任务列表*/
		readonly task_list: number[];
		/**经验*/
		readonly exp: number;

	}

	interface GuildYibaoBoxConfig {
		/**怪物索引*/
		readonly boss_index: number;
		/**怪物血量*/
		readonly boss_hp: number;
		/**攻击一次扣除的血量*/
		readonly cost_hp: number;
		/**攻击一次的消耗*/
		readonly boss_cost: number[];
		/**攻击一次给的奖励*/
		readonly rewards1: number[][];
		/**解锁时间(秒)*/
		readonly time: number;
		/**奖励*/
		readonly rewards2: number[][];
		/**瞬间解锁所需VIP等级*/
		readonly limit_vip: number;
		/**boss外观*/
		readonly boss_model: number;
		/**刷新权重*/
		readonly weight: number;
		/**宝箱名字*/
		readonly box_name: string;
		/**宝箱品质*/
		readonly box_quality: number;

	}

	interface GuildYibaoRankConfig {
		/**索引*/
		readonly index: number;
		/**排名区间*/
		readonly ranks: number[];
		/**排名奖励*/
		readonly rewards: number[][];

	}

	interface GuildYibaoTaskConfig {
		/**索引*/
		readonly index: number;
		/**任务ID*/
		readonly event_type: number;
		/**目标数量*/
		readonly target_num: number;
		/**任务描述*/
		readonly task: string;

	}

	interface GuildZhanyaotaiConfig {
		/**召唤怪索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**召唤次数 0为不限制次数, 配置大于0的x表示限制x次*/
		readonly count: number;
		/**VIP召唤限制等级(配置为0表示不限制VIP)*/
		readonly vip_limit: number;
		/**召唤消耗道具*/
		readonly costs: number[][];
		/**斩妖一次消耗*/
		readonly atk_cost: number[][];
		/**boss血量*/
		readonly boss_hp: number;
		/**攻击一次扣除血量*/
		readonly atk_cost_hp: number;
		/**boss存在时长(秒)*/
		readonly alive_time: number;
		/**召唤奖励*/
		readonly rewards1: number[][];
		/**斩妖一次奖励*/
		readonly reward2: number[][];
		/**击杀奖励*/
		readonly rewards3: number[][];
		/**召唤一次积分*/
		readonly score1: number;
		/**每轮第一次斩妖积分*/
		readonly score2: number;
		/**boss外观配置*/
		readonly BOSS: number;

	}

	interface GuildZhanyaotaiRankConfig {
		/**索引*/
		readonly index: number;
		/**排名区间*/
		readonly ranks: number[];
		/**排名奖励*/
		readonly rewards: number[][];

	}

	interface HelotCallRewardConfig {
		/**索引*/
		readonly index: number;
		/**权重*/
		readonly weight: number;
		/**奖励*/
		readonly reward: number[];

	}

	interface HelotOperateConfig {
		/**奴隶操作类型*/
		readonly type: number;
		/**数值*/
		readonly value: number;
		/**消耗的道具*/
		readonly cost_item: number[];
		/**自己获得的奖励*/
		readonly oneself_reward: number[];
		/**战队成员获得的奖励*/
		readonly team_reward: number[];
		/**奴隶获得的奖励*/
		readonly helot_rewards: number[];

	}

	interface HelotTargetConfig {
		/**索引*/
		readonly index: number;
		/**权重*/
		readonly weight: number;
		/**奖励*/
		readonly reward: number[];

	}

	interface HelotTargetRewardConfig {
		/**索引*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**购买消耗*/
		readonly cost: number[];
		/**奖励*/
		readonly reward: number[][];
		/**任务*/
		readonly task_id: number;

	}

	interface HelotTextConfig {
		/**索引*/
		readonly index: number;
		/**战报内容*/
		readonly text: string;

	}

	interface HonourConfig {
		/**index*/
		readonly index: number;
		/**人数限制*/
		readonly person_limit: number;
		/**目标条件（任务id）*/
		readonly target: number;
		/**奖励*/
		readonly rewards: number[][];

	}

	interface HorseConfig {
		/**坐骑ID*/
		readonly index: number;
		/**坐骑名称*/
		readonly name: string;
		/**坐骑类型*/
		readonly type: number;
		/**外显和图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**是否为双层坐骑*/
		readonly is_double: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**BUFF字段*/
		readonly buff_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**模型缩放(万分比)*/
		readonly scale: number;
		/**获取途径跳转ID*/
		readonly gain_id: number[];

	}

	interface HorseDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface HorseJibanConfig {
		/**index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**坐骑ID*/
		readonly partners: number[];
		/**羁绊描述*/
		readonly desc: string;
		/**套装属性*/
		readonly property: number;
		/**技能加成*/
		readonly skill_enhance: number;
		/**羁绊品质*/
		readonly quality: number;

	}

	interface HuangguGiftConfig {
		/**序列index*/
		readonly index: number;
		/**供奉x次可领取奖励*/
		readonly times: number;
		/**奖励*/
		readonly reward: number[][];
		/**商品id，不充值填0*/
		readonly gift_id: number;
		/**礼包售价*/
		readonly cost: number[][];
		/**礼包奖励*/
		readonly reward2: number[][];

	}

	interface HuangguGongfengConfig {
		/**供奉等级*/
		readonly level: number;
		/**次数，满了可升级*/
		readonly exp: number;
		/**供奉面板显示战力*/
		readonly ability_index: number;

	}

	interface HuangguHaoganConfig {
		/**好感等级*/
		readonly level: number;
		/**互动奖励*/
		readonly reward: number[][];
		/**次数，满了可升级*/
		readonly exp: number;

	}

	interface HuangguHaoganDuihuaConfig {
		/**对话索引*/
		readonly index: number;
		/**对话类型*/
		readonly type: number;
		/**对话文本*/
		readonly desc: string;

	}

	interface HuangguRewardConfig {
		/**索引*/
		readonly index: number;
		/**道具*/
		readonly item: number[][];

	}

	interface HuangguShenqiConfig {
		/**神器id*/
		readonly index: number;
		/**神器名称*/
		readonly name: string;
		/**神器品质*/
		readonly quality: number;
		/**套装等级升级条件（全部部位达到X阶)*/
		readonly level_condition: number[];
		/**初始技能id*/
		readonly skill_id: number[];

	}

	interface HuangguShenqiBuweiConfig {
		/**部位等级，1级为激活*/
		readonly level: number;
		/**属性id*/
		readonly attr_id: number[];
		/**升阶消耗*/
		readonly material: number[][];

	}

	interface HuangguShenqiSkillConfig {
		/**技能等级*/
		readonly index: number;
		/**技能升级条件（套装等级到X级）*/
		readonly condition: number[];

	}

	interface HuangguShijianConfig {
		/**阶段*/
		readonly stage: number;
		/**推荐军团仙力*/
		readonly god: number;
		/**掉落预览*/
		readonly show_reward: number[][];
		/**bossId*/
		readonly bossId: number;
		/**怪物军团属性*/
		readonly ability_index: number;
		/**任务ID*/
		readonly taskid: number;

	}

	interface HuangguShijianTypeConfig {
		/**事件index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**介绍文本*/
		readonly desc: string;
		/**对话前置条件*/
		readonly condition: number;

	}

	interface HuangguShuijingConfig {
		/**索引*/
		readonly index: number;
		/**道具*/
		readonly item: number[][];

	}

	interface HuanjinHuanlingConfig {
		/**索引*/
		readonly index: number;
		/**升阶消耗*/
		readonly cost: number[];
		/**buff（下面的那个技能）*/
		readonly buff_id: number;
		/**属性id*/
		readonly attr_id: number;

	}

	interface HuanjinParamConfig {
		/**功能编号*/
		readonly system_id: number;
		/**进阶技能id*/
		readonly stage_skill: number;
		/**升星获得套装属性最大进度*/
		readonly star_max_pos: number;
		/**升星获得阶级套装属性buff*/
		readonly star_buff: number[];
		/**幻灵名*/
		readonly name2: string;
		/**幻灵被动技能激活条件*/
		readonly huanling_skill: number[][];
		/**幻灵被动特殊属性id*/
		readonly huanling_spe_id: number[][];
		/**驻神的被动技能*/
		readonly zushen_skill: number[];
		/**驻神生效的套装属性*/
		readonly zushen_attr: number[];
		/**驻神套装给与的技能触发率*/
		readonly zushen_skill_attr: number[];
		/**功能开启id*/
		readonly open_id: number;
		/**区域名*/
		readonly name: string;
		/**神器名*/
		readonly name1: string;
		/**激活需求外显*/
		readonly outlook: number[];
		/**激活获得道具*/
		readonly active_reward: number[];

	}

	interface HuanjinStageConfig {
		/**等级编号*/
		readonly level: number;
		/**升星消耗*/
		readonly cost: number[];
		/**属性id*/
		readonly attr_id: number;
		/**属性技能id(用于增加触发率）*/
		readonly skill_attr_id: number[];

	}

	interface HuanjinStarConfig {
		/**索引*/
		readonly index: number;
		/**升阶消耗*/
		readonly cost: number[][];
		/**属性id*/
		readonly attr_id: number;
		/**星级效果*/
		readonly starlevel_buff: number;

	}

	interface HuanjinZushenConfig {
		/**索引*/
		readonly index: number;
		/**升阶消耗*/
		readonly cost: number[];
		/**属性id*/
		readonly attr_id: number;
		/**驻神特殊属性id*/
		readonly zushen_spe_id: number;

	}

	interface HuanjingBaozangConfig {
		/**序列index*/
		readonly index: number;
		/**召唤x次目标*/
		readonly times: number;
		/**目标免费奖励*/
		readonly reward: number[][];
		/**商品id，不充值填0*/
		readonly gift_id: number;
		/**礼包售价*/
		readonly cost: number[][];
		/**礼包奖励*/
		readonly reward2: number[][];

	}

	interface HuanjingGiftConfig {
		/**索引*/
		readonly index: number;
		/**购买类型,道具购买or充值id*/
		readonly type: number;
		/**商品id，道具购买不填*/
		readonly product_id: number;
		/**道具购买消耗*/
		readonly cost: number[];
		/**限购次数*/
		readonly count: number;
		/**礼包奖励*/
		readonly reward2: number[][];
		/**每日或周期重置*/
		readonly reset_type: number;
		/**标题*/
		readonly title: string;

	}

	interface HuanjingLeichongConfig {
		/**索引*/
		readonly index: number;
		/**累充金额*/
		readonly value: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface HuanjingZengliConfig {
		/**序列index*/
		readonly index: number;
		/**召唤x次可领取奖励*/
		readonly times: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface HuanjingzhihaiBossConfig {
		/**关卡boss索引*/
		readonly boss_index: number;
		/**boss血量*/
		readonly boss_hp: number;
		/**区域每个神灵1星加成伤害*/
		readonly damage_shenling: number;
		/**boss形象资源*/
		readonly res_id: string;
		/**掉落预览*/
		readonly show_reward: number[][];

	}

	interface HuanjingzhihaiBossRankConfig {
		/**排行榜索引*/
		readonly rank_index: number;
		/**排名区间*/
		readonly ranks: number[];
		/**排名奖励*/
		readonly rewards: number[][];

	}

	interface HuanjingzhihaiGateConfig {
		/**小关id*/
		readonly small_gate: number;
		/**通关挂机收益（每小时）*/
		readonly pass_reward: number[][];
		/**推荐战力*/
		readonly show_power: number;
		/**怪物属性*/
		readonly monster_attr: number;
		/**掉落预览*/
		readonly show_reward: number[][];

	}

	interface HuanjingzhihaiIndexConfig {
		/**唯一索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**激活消耗道具*/
		readonly active_cost: number[][];
		/**挂机收益解锁所需关卡*/
		readonly gate: number[];
		/**挂机收益解锁描述*/
		readonly desc: string;
		/**挂机收益时间上限(小时)*/
		readonly max_time: number;
		/**挂机收益领取时间(小时)*/
		readonly per_time: number;
		/**幻境boss神灵索引*/
		readonly shenling: number[];
		/**上榜关卡限制(boss索引)*/
		readonly rank_limit: number;

	}

	interface HuanjingzhihaiTypeConfig {
		/**大关id*/
		readonly big_gate: number;
		/**名称*/
		readonly name: string;
		/**大奖展示*/
		readonly show_bigreward: number[];

	}

	interface HuashenConfig {
		/**化神ID*/
		readonly index: number;
		/**化神名称*/
		readonly name: string;
		/**化神类型*/
		readonly type: number;
		/**外显和图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**是否有武器*/
		readonly is_double: number;
		/**化神技（主动技能）*/
		readonly skill: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**军团BUFF_id*/
		readonly legion_buff: number;
		/**界面模型缩放(万分比)*/
		readonly scale: number;
		/**场景模型缩放(万分比)*/
		readonly scene_scale: number;
		/**激活任务*/
		readonly task: number[];
		/**特殊属性前置描述*/
		readonly special_desc: string;

	}

	interface HuashenDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface HuashenTianfuConfig {
		/**天赋ID*/
		readonly index: number;
		/**前置开启条件*/
		readonly premise: number[][];
		/**天赋名字*/
		readonly name: string;
		/**天赋属性*/
		readonly buff_index: number[];
		/**天赋升级消耗*/
		readonly upgrade_item: number[][];

	}

	interface HuashenTianfuLeixingConfig {
		/**天赋类型*/
		readonly type: number;
		/**开启条件*/
		readonly activate_condition: number;
		/**天赋ID*/
		readonly tianfu_index: number[];

	}

	interface HuashenZhiluConfig {
		/**index*/
		readonly index: number;
		/**节点奖励*/
		readonly reward: number[][];
		/**所需点数*/
		readonly point: number;

	}

	interface JianfaConfig {
		/**剑法部位*/
		readonly pos: number;
		/**进阶消耗*/
		readonly cost: number[][];
		/**属性id*/
		readonly attrs: number[];

	}

	interface JianzhenConfig {
		/**剑阵位置*/
		readonly pos: number;
		/**解锁类型*/
		readonly unlock_type: number;
		/**解锁条件*/
		readonly unlock_value: number;

	}

	interface JinjiejiangliConfig {
		/**等阶*/
		readonly index: number;
		/**奖励购买消耗*/
		readonly award_buy: number[][];
		/**坐骑进阶奖励*/
		readonly horse_award: number[][];
		/**元灵进阶奖励*/
		readonly yuanling_award: number[][];
		/**元灵试炼成就奖励*/
		readonly ylteam_award: number[][];
		/**元灵试炼成就购买条件*/
		readonly ylteam_cond: number[];
		/**羽翼进阶奖励*/
		readonly wing_award: number[][];
		/**时装进阶奖励*/
		readonly body_award: number[][];
		/**神兵进阶奖励*/
		readonly weapon_award: number[][];
		/**元灵试炼奖励购买消耗*/
		readonly yuanling_award_buy: number[][];

	}

	interface JumpConfig {
		/**ID*/
		readonly index: number;
		/**跳转名字*/
		readonly name: string;
		/**图标*/
		readonly icon: string;

	}

	interface LegionBuffConfig {
		/**军团buffid*/
		readonly buff_id: number;
		/**buff描述*/
		readonly desc: string;

	}

	interface LevelConfig {
		/**等级ID*/
		readonly index: number;
		/**升级经验*/
		readonly levelup_exp: number;
		/**升级属性ID*/
		readonly level_attr: number;
		/**材料ID*/
		readonly goods_id: number[][];

	}

	interface LinggenConfig {
		/**灵根ID*/
		readonly index: number;
		/**前置开启条件*/
		readonly premise: number[][];
		/**灵根名字*/
		readonly name: string;
		/**灵根属性*/
		readonly buff_index: number[];
		/**灵根升级消耗*/
		readonly upgrade_item: number[][];

	}

	interface LinggenLeixingConfig {
		/**灵根类型*/
		readonly type: number;
		/**开启条件*/
		readonly activate_condition: number;
		/**灵根ID*/
		readonly linggen_index: number[];

	}

	interface LinghuExtraBoxConfig {
		/**索引*/
		readonly index: number;
		/**道具*/
		readonly items: number[];

	}

	interface LinghuQualityConfig {
		/**品质*/
		readonly quality: number;
		/**权重(万分比*/
		readonly weight: number;
		/**显示*/
		readonly award: number[][];

	}

	interface LingmaiConfig {
		/**灵脉索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**激活条件*/
		readonly activate_condition: number[][];
		/**突破道具*/
		readonly break_item: number[][];
		/**属性*/
		readonly break_property: number[][];

	}

	interface LingmaiLevelConfig {
		/**重数*/
		readonly splevel: number;
		/**等级升级道具*/
		readonly grade_item: number[][];

	}

	interface MagicRankConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**本服排名奖励*/
		readonly reward: number[][];
		/**额外奖励限制*/
		readonly limit: number;
		/**本服排名额外奖励*/
		readonly other_reward: number[][];

	}

	interface MagicTargetConfig {
		/**索引ID*/
		readonly index: number;
		/**目标次数*/
		readonly count: number;
		/**阶段奖励列表*/
		readonly reward: number[][];
		/**消耗*/
		readonly cost: number[];

	}

	interface MagicTopRankConfig {
		/**排名*/
		readonly index: number;
		/**巅峰排名奖励*/
		readonly reward: number[][];

	}

	interface MagicUpConfig {
		/**段位ID*/
		readonly index: number;
		/**段位名称*/
		readonly name: string;
		/**段位所需积分*/
		readonly score: number;
		/**段位晋级奖励*/
		readonly reward: number[][];

	}

	interface MagicWinConfig {
		/**索引ID*/
		readonly index: number;
		/**连胜次数*/
		readonly count: number;
		/**连胜奖励列表*/
		readonly reward: number[][];

	}

	interface MainTask1Config {
		/**编号*/
		readonly index: number;
		/**任务类型*/
		readonly task_type: number;
		/**任务合并（配置时需找下程序支持下）*/
		readonly merge: number;
		/**标题*/
		readonly title: string;
		/**任务描述*/
		readonly desc: string;
		/**任务额外描述*/
		readonly desc2: string;
		/**参数3
（类型参数3）
（选填）*/
		readonly param3: string;
		/**UI跳转*/
		readonly jump: number;
		/**UI跳转道具*/
		readonly jump_prop: number;
		/**任务指引（指引ID_指引类型）*/
		readonly arrow: number[][];
		/**引导类型*/
		readonly arrow_type: number;
		/**任务奖励*/
		readonly rewards: number[][];
		/**快速完成消耗*/
		readonly quick_cost: number[];
		/**成就特殊任务，显示在最上方*/
		readonly is_special: number;

	}

	interface MaterialFubenConfig {
		/**副本类型*/
		readonly type: number;
		/**副本名称*/
		readonly name: string;
		/**功能开启id*/
		readonly copy_open: number;
		/**开启扫荡层数*/
		readonly mopup_open: number;
		/**重置消耗*/
		readonly cost: number[][];
		/**每天免费重置次数*/
		readonly day_count: number;
		/**副本时间*/
		readonly time: number;
		/**直购充值id*/
		readonly buyId: number;

	}

	interface MaterialSceneConfig {
		/**层数*/
		readonly lvl: number;
		/**奖励预览*/
		readonly reward: number;
		/**推荐战力*/
		readonly show_power: number;

	}

	interface Monster1Config {
		/**怪物编号*/
		readonly index: number;
		/**形象资源*/
		readonly res_id: string;
		/**怪物受击范围*/
		readonly hit_scope: number;
		/**怪物名称*/
		readonly name: string;
		/**怪物等级*/
		readonly monster_level: number;
		/**能否移动*/
		readonly move_oper: number;

	}

	interface NewMultipleBossConfig {
		/**副本编号*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**开启条件*/
		readonly open: number[];
		/**奖励预览*/
		readonly reward_big: number;

	}

	interface NewPrivilegeConfig {
		/**编号*/
		readonly index: number;
		/**描述*/
		readonly desc: string;
		/**模块特权区别类型*/
		readonly type: number;
		/**每天赠送多人BOSS幸运掉落次数+x*/
		readonly multiple_boss_count: number;
		/**挂机元宝+x%*/
		readonly online_yuenbo: number;
		/**挂机仙气+x%*/
		readonly online_xianqi: number;
		/**挂机灵气+x%*/
		readonly online_lingqi: number;
		/**灵池修炼神灵精华+x%*/
		readonly lingchi_income: number;
		/**封魔圣殿收益+x%*/
		readonly fenmo_income: number;
		/**金龟宝穴收益+x%*/
		readonly jingui_income: number;
		/**蓬莱仙境收益+x%*/
		readonly penglai_income: number;
		/**挂机自动熔炼多余装备*/
		readonly item_auto: number;
		/**熔炼时有x%概率获得双倍熔炼仙晶*/
		readonly smelt_item: number;
		/**可碾压战力低于自身x%的敌人*/
		readonly repress_enemy: number;
		/**开启VIP BOSS*/
		readonly vip_boss: number;
		/**仙玉商城次数+x*/
		readonly jade_store: number;
		/**挂机经验+x%*/
		readonly online_gain: number;
		/**背包装备容量增加x*/
		readonly equ_bag: number;
		/**每日熔炼晶币获取上限+x%*/
		readonly smelt_count: number;
		/**宗门夺宝宝箱栏位+x*/
		readonly zong_seat: number;
		/**开启宗门夺宝妖圣宝箱*/
		readonly zong_box: number;
		/**云游可跳过战斗*/
		readonly wander_skip: number;
		/**宗门封妖妖皇免费召唤次数+x*/
		readonly zong_free: number;
		/**开启云游答题特权*/
		readonly wander_answer: number;
		/**开启传说宝石槽位*/
		readonly gem_seat: number;
		/**云游神龙许愿奖励一键全零*/
		readonly wander_vow: number;
		/**材料背包容量+x*/
		readonly prop_bag: number;
		/**开启传承神器*/
		readonly artifact: number;
		/**摘星楼自动盖楼*/
		readonly pick_star: number;
		/**飞剑剑阵上阵位+x*/
		readonly sword_seat: number;
		/**快速开启背包宝箱*/
		readonly bag_box: number;
		/**神龙许愿一键许愿，自动召唤*/
		readonly shen_long: number;
		/**仙宗遗宝宝箱开启一键扫荡*/
		readonly zong_sweep: number;
		/**仙位争霸尚未时间+4小时(秒)*/
		readonly hegemony_time: number;
		/**个人BOSS扫荡次数*/
		readonly single_boss_sweep: number;
		/**开启供奉抽奖*/
		readonly gongfeng_lottery: number;
		/**异界仙宠*/
		readonly yijie_xianchong_count: number;
		/**供奉女神奖励+万分比*/
		readonly huanggu_reward: number;
		/**是否开启荒古水晶召唤*/
		readonly huanggu_shuijing: number;
		/**荒古女神契约属性+万分比*/
		readonly huanggu_qiyue_attr: number;
		/**开启创世女神许愿*/
		readonly cs_nvshen_open: number;
		/**创世女神供奉加速*/
		readonly cs_nvshen_jiasu: number;
		/**荒古-仙门圣坛抽奖消耗减少*/
		readonly xianditequan1: number;
		/**混沌-镇妖洞收益加成*/
		readonly xianditequan2: number;
		/**混沌-蓬莱岛收益加成*/
		readonly xianditequan3: number;
		/**击杀幻境boss奖励增加万分比*/
		readonly kill_huanjingboss: number;
		/**攻击幻境boss概率2倍伤害万分比*/
		readonly atk_huanjingboss_hurt: number;
		/**攻击幻境boss概率获得额外奖励(万分比概率,id_数量)*/
		readonly atk_huanjingboss_reward: number[][];
		/**击杀幻境boss额外奖励（id_数量）*/
		readonly kill_huanjingboss_ex_reward: number[];

	}

	interface NewVipBossConfig {
		/**关卡id*/
		readonly index: number;
		/**开启条件*/
		readonly open: number[];
		/**奖励预览*/
		readonly reward_big: number;

	}

	interface NewVipBossFubenConfig {
		/**小关*/
		readonly index: number;
		/**bossId*/
		readonly bossId: number[];
		/**VIP等级*/
		readonly VIP_lv: number;
		/**CD*/
		readonly cd_time: number;

	}

	interface NvshenAttrConfig {
		/**类型属性*/
		readonly itype: number;
		/**类型属性描述*/
		readonly type_name: string;

	}

	interface NvshenChoujiangConfig {
		/**抽奖类型索引*/
		readonly index: number;
		/**抽奖类型*/
		readonly name: string;
		/**抽奖消耗*/
		readonly costs: number[][];
		/**抽奖奖励池*/
		readonly rewards: number[][];

	}

	interface NvshenDuihuaConfig {
		/**对话索引*/
		readonly index: number;
		/**对话类型*/
		readonly type: number;
		/**对话文本*/
		readonly desc: string;

	}

	interface NvshenDuihuaLevelConfig {
		/**对话等级*/
		readonly level: number;
		/**所需事件index*/
		readonly index: number;
		/**所需事件阶段*/
		readonly stage: number;
		/**互动奖励*/
		readonly reward: number[][];

	}

	interface NvshenGudingAttrConfig {
		/**类型属性*/
		readonly itype: number;
		/**属性名称*/
		readonly type_name: string;

	}

	interface NvshenHunkaConfig {
		/**魂卡部位*/
		readonly pos: number;
		/**解锁仙力限制*/
		readonly god: number;
		/**解锁消耗*/
		readonly costs: number[][];

	}

	interface NvshenHunkaScoreConfig {
		/**评价*/
		readonly lv: number;
		/**所需评分*/
		readonly score: number;
		/**描述*/
		readonly desc: string;

	}

	interface NvshenIndexConfig {
		/**女神索引*/
		readonly index: number;
		/**激活消耗道具*/
		readonly active_cost: number[][];
		/**名字*/
		readonly name: string;

	}

	interface NvshenLevelConfig {
		/**亲密度等级*/
		readonly level: number;
		/**次数，满了可升级*/
		readonly exp: number;

	}

	interface NvshenShijianConfig {
		/**阶段*/
		readonly stage: number;
		/**推荐军团仙力*/
		readonly god: number;
		/**掉落预览*/
		readonly show_reward: number[][];
		/**bossId*/
		readonly bossId: number;

	}

	interface NvshenShijianTypeConfig {
		/**事件index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**介绍文本*/
		readonly desc: string;

	}

	interface OpenFunctionConfig {
		/**功能ID*/
		readonly index: number;
		/**功能名称*/
		readonly name: string;
		/**优先级*/
		readonly sort_num: number;
		/**未开启是否隐藏*/
		readonly is_hide: number;
		/**提示敬请期待*/
		readonly attendre: number;
		/**开服天数*/
		readonly svr_open: number;
		/**通关关卡*/
		readonly mainline: number;
		/**角色等级*/
		readonly open_level: number;
		/**转生等级*/
		readonly rebirth: number;
		/**vip等级*/
		readonly vip_index: number;
		/**主线任务*/
		readonly main_task_index: number;
		/**战力条件*/
		readonly power: number;
		/**通关通灵塔层数*/
		readonly fight_soul_tower: number;
		/**首充开启*/
		readonly first_charge: number;
		/**是否有指引*/
		readonly guid: number;
		/**是否提示语显示*/
		readonly is_show_tips: number;
		/**功能图标*/
		readonly icon: string;
		/**收缩后还显示*/
		readonly always_show: number;
		/**开启描述*/
		readonly desc: string;
		/**禁地关卡条件*/
		readonly wear_condition: number[];
		/**累充金额*/
		readonly total_recharge: number;
		/**图标特效环绕*/
		readonly effType: number;
		/**图标扫光*/
		readonly sweepType: number;

	}

	interface ParamConfig {
		/**参数名称*/
		readonly name: string;
		/**内容*/
		readonly value: any;

	}

	interface PersonalBossConfig {
		/**关卡id*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**开启条件*/
		readonly open: number[];
		/**奖励预览*/
		readonly reward_big: number;

	}

	interface PoolConfig {
		/**灵池索引*/
		readonly index: number;
		/**灵池类型*/
		readonly type: number;
		/**灵池等级*/
		readonly lv: number;
		/**升级消耗*/
		readonly upgrade: number[][];
		/**产出材料基础数据*/
		readonly output: number[][];
		/**产出特殊材料基础概率*/
		readonly special_probability: number;
		/**产出特殊材料*/
		readonly special_item: number[][];

	}

	interface PowerDiaRewardConfig {
		/**奖励ID*/
		readonly index: number;
		/**奖励*/
		readonly award: number[];
		/**是否大奖*/
		readonly luxury: number;

	}

	interface PowerDiaTargetConfig {
		/**达成ID*/
		readonly index: number;
		/**战力目标*/
		readonly power_target: number;

	}

	interface PreviewConfig {
		/**索引*/
		readonly index: number;
		/**开启功能ID*/
		readonly type: number;
		/**关卡获取限制*/
		readonly scence_limit: number;
		/**礼包*/
		readonly reward: number[][];
		/**购买消耗*/
		readonly cost: number[][];
		/**图标*/
		readonly icon: string;
		/**跳转ID*/
		readonly jumpid: number;

	}

	interface ProductIdConfig {
		/**唯一商品ID*/
		readonly product_id: number;
		/**唯一价格*/
		readonly rmb: number;
		/**商品名称（渠道反馈显示）*/
		readonly name: string;
		/**原价*/
		readonly fake_rmb: number;

	}

	interface PropConfig {
		/**道具编号*/
		readonly index: number;
		/**道具名称*/
		readonly name: string;
		/**道具类型名称*/
		readonly type_name: string;
		/**道具品质*/
		readonly quality: number;
		/**品质角标*/
		readonly quality_title: number;
		/**道具品级*/
		readonly grade: number;
		/**图标名称*/
		readonly icon: string;
		/**道具描述*/
		readonly desc: string;
		/**最大叠加数量*/
		readonly max_count: number;
		/**稀有掉落*/
		readonly tips: number;
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**自动购买商品编号ID*/
		readonly shop_id: number;
		/**参数（程序）*/
		readonly param1: number[][];
		/**智能使用*/
		readonly easyuse: number;
		/**是否可以使用*/
		readonly usable: number;
		/**使用跳转ID（在背包跳转）*/
		readonly jump_id: number;
		/**分解*/
		readonly resolve: number[][];
		/**激活仙力*/
		readonly god: number;
		/**激活战力*/
		readonly showPower: number;
		/**背包使用条件*/
		readonly condition: number[][];
		/**自选最大数量*/
		readonly max_number: number;
		/**展示的奖励*/
		readonly show_reward: number[][];

	}

	interface QiyuanConfig {
		/**任务ID*/
		readonly index: number;
		/**任务类型*/
		readonly event_type: number;
		/**任务icon*/
		readonly picture: string;
		/**关卡限制*/
		readonly limit: number;
		/**参数*/
		readonly param1: number[];
		/**副本大奖*/
		readonly last_reward: number[];
		/**排序*/
		readonly rank: number;

	}

	interface QiyuanFubenConfig {
		/**副本编号*/
		readonly index: number;
		/**副本名称*/
		readonly name: string;
		/**副本时间(s)*/
		readonly dungeon_time: number;
		/**怪物ID*/
		readonly monster: number;
		/**奖励展示*/
		readonly show_rewards: number[][];
		/**副本描述*/
		readonly dec: string;
		/**推荐战力*/
		readonly power: number;

	}

	interface RankConfConfig {
		/**排行榜类型*/
		readonly index: number;
		/**显示最大人数*/
		readonly max_num: number;
		/**显示文本*/
		readonly desc: string;
		/**大神文本*/
		readonly god_desc: string;
		/**称号id*/
		readonly title_id: number;

	}

	interface RankRewardConfig {
		/**奖励索引*/
		readonly index: number;
		/**达标条件*/
		readonly level: number;
		/**奖励*/
		readonly award: number[][];

	}

	interface RebirthConfig {
		/**转生*/
		readonly index: number;
		/**下一级转生id*/
		readonly next_index: number;
		/**转数*/
		readonly relv: number;
		/**重数*/
		readonly relv2: number;
		/**转生名称*/
		readonly name: string;
		/**属性编号*/
		readonly attr_index: number;
		/**功能展示*/
		readonly open_show2: string;
		/**进阶奖励*/
		readonly advance_reward: number[][];
		/**功能图标1*/
		readonly icon1: string;
		/**功能描述1*/
		readonly desc1: string;
		/**功能图标2*/
		readonly icon2: string;
		/**功能描述2*/
		readonly desc2: string;

	}

	interface RepetitionTaskConfig {
		/**任务id*/
		readonly index: number;
		/**任务描述*/
		readonly desc: string;
		/**场景类型*/
		readonly eventtype: number;
		/**条件参数*/
		readonly params: number[];
		/**目标数量*/
		readonly target: number;
		/**上限*/
		readonly maxlimit: number;
		/**任务奖励*/
		readonly reward: number[][];

	}

	interface RewardFindConfig {
		/**类型*/
		readonly type: number;
		/**图标*/
		readonly icon: string;

	}

	interface RewardPreviewConfig {
		/**预览编号*/
		readonly index: number;
		/**标题*/
		readonly title: string;
		/**文案描述*/
		readonly des: string;
		/**奖励内容*/
		readonly content: number[][];

	}

	interface RingConfig {
		/**戒指ID*/
		readonly index: number;
		/**戒指名称*/
		readonly name: string;
		/**戒指类型*/
		readonly type: number;
		/**戒指图标*/
		readonly icon: string;
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**是否默认显示*/
		readonly show: number;
		/**升星战力*/
		readonly star_power: number[];
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**激活礼包*/
		readonly reward: number[][];

	}

	interface RingDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly consume: number[];
		/**升级属性*/
		readonly property: number;
		/**升级所需次数*/
		readonly exp: number;

	}

	interface RoleNameConfig {
		/**索引*/
		readonly id: number;
		/**形容词*/
		readonly adv: string;
		/**姓*/
		readonly name_f: string;
		/**男名*/
		readonly name_1: string;
		/**女名*/
		readonly name_2: string;
		/**宗门*/
		readonly name_3: string;

	}

	interface SceneConfig {
		/**场景编号*/
		readonly index: number;
		/***/
		readonly map_id: number;
		/**名称*/
		readonly name: string;
		/**是否显示左侧活动按钮*/
		readonly show_left: number;
		/**是否使用冲刺AI*/
		readonly sprint_ai: number;
		/**场景类型*/
		readonly map_type: number;
		/**点击类型*/
		readonly click_type: number[];
		/**手动移动*/
		readonly manual_move: number;
		/**战斗分类*/
		readonly fight_type: number;
		/**是否生成坐骑*/
		readonly riding_warfare: number;
		/**场景BGM*/
		readonly music: string;
		/**攻击延迟厘秒*/
		readonly atk_delay: number;
		/**BOSS来袭*/
		readonly boss: number;
		/**标题*/
		readonly headline: string;

	}

	interface ShengtanItemConfig {
		/**编号*/
		readonly index: number;
		/**道具类型*/
		readonly item_type: number;
		/**奖励区分*/
		readonly reward_type: number;
		/**触发类型*/
		readonly trigger_type: number;
		/**奖品*/
		readonly reward: number[];
		/**触发人获得的奖励*/
		readonly incite_reward: number[];
		/**触发道具的说明*/
		readonly trigger_name: string;

	}

	interface ShengtanScoreConfig {
		/**编号*/
		readonly index: number;
		/**积分*/
		readonly score: number;
		/**获得奖励*/
		readonly reward: number[][];

	}

	interface ShenlingConfig {
		/**武将ID*/
		readonly index: number;
		/**武将名称*/
		readonly name: string;
		/**武将图标和外显*/
		readonly icon: string;
		/**是否默认显示*/
		readonly show: number;
		/**道具品质*/
		readonly quality: number;
		/**天赋（前端）*/
		readonly talent1: number[][];
		/**类型*/
		readonly type: number;
		/**普攻*/
		readonly common: number;
		/**模型缩放（万分比）*/
		readonly scale: number;
		/**类型(1为可进化特殊神灵)*/
		readonly subtype: number;
		/**神灵进化获得的属性id*/
		readonly attr: number[];
		/**神灵进化初始品质，神灵进化最高品质*/
		readonly character: number[];
		/**任务1_任务2_任务3_任务4，任务1_任务2_任务3_任务4，*/
		readonly task_id: number[][];
		/**名字*/
		readonly names: string;
		/**icon和外显*/
		readonly icons: string;

	}

	interface ShenlingDengjiConfig {
		/**等级index*/
		readonly index: number;
		/**消耗*/
		readonly star_consume: number[][];
		/**突破消耗*/
		readonly tupo_consume: number[][];
		/**经验值*/
		readonly exp: number;

	}

	interface ShenlingJibanConfig {
		/**index*/
		readonly index: number;
		/**羁绊ID*/
		readonly jibanid: number;
		/**名称*/
		readonly name: string;
		/**武将ID*/
		readonly partners: number[];
		/**武将星级*/
		readonly star: number;
		/**羁绊奖励*/
		readonly prop: number[][];
		/**羁绊效果描述*/
		readonly desc: string;
		/**属性*/
		readonly property: number;

	}

	interface ShenlingLeixingConfig {
		/**羁绊ID*/
		readonly index: number;
		/**合击id*/
		readonly heji_id: number;
		/**灵宝技能数组*/
		readonly skill_array: number[];

	}

	interface ShenlingLingliConfig {
		/**等级*/
		readonly level: number;
		/**主动技能*/
		readonly main_skill: number;
		/**主动消耗*/
		readonly main_cost: number[];
		/**被动buff列表*/
		readonly buff_skills: number[];
		/**被动消耗*/
		readonly buff_costs: number[][];
		/**被动buff前置关系映射*/
		readonly condition: number[][];

	}

	interface ShenlingLingpoConfig {
		/**等级*/
		readonly index: number;
		/**消耗*/
		readonly cost: number[][];
		/**基础属性*/
		readonly attr_base: number[][];
		/**套装*/
		readonly suit_attr: number[];

	}

	interface ShenlingLingpoTypeConfig {
		/**灵魄id*/
		readonly id: number;
		/**灵魄类型*/
		readonly itype: number;
		/**是否默认显示*/
		readonly show: number;
		/**图标和外显*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**套装名字*/
		readonly name: string;
		/**跳转*/
		readonly gain_id: number[];

	}

	interface ShenlingLingqiConfig {
		/**星级*/
		readonly index: number;
		/**神灵星级限制*/
		readonly lmt_star: number;
		/**消耗*/
		readonly cost: number[][];
		/**基础属性*/
		readonly attr_base: number[][];
		/**封印属性*/
		readonly attr_fengyin: number[][];
		/**套装效果1*/
		readonly suit_attr: number[];
		/**套装效果2*/
		readonly suit_buff: number[];

	}

	interface ShenlingXingjiConfig {
		/**index*/
		readonly index: number;
		/**神灵id*/
		readonly shenling_index: number;
		/**星级*/
		readonly shenling_star: number;
		/**消耗*/
		readonly star_consume: number[][];
		/**星级属性*/
		readonly star_property: number[];
		/**奖励*/
		readonly star_award: number[][];
		/**觉醒标识*/
		readonly awaken: number;
		/**升星战力*/
		readonly star_power: number;
		/**军团BUFF_id*/
		readonly legion_buff: number;

	}

	interface ShopConfig {
		/**商品编号*/
		readonly index: number;
		/**道具ID*/
		readonly prop: number[][];
		/**商店类型*/
		readonly type: number;
		/**消耗货币id*/
		readonly coin_type: number;
		/**原价*/
		readonly price: number;
		/**折扣万分比*/
		readonly discount: number;
		/**会员（荣耀、至尊）*/
		readonly glory_member: number;
		/**限时价格*/
		readonly time_price: number;
		/**限购类型*/
		readonly lmt_type: number;
		/**限购次数*/
		readonly lmt_cnt: number;
		/**解锁类型*/
		readonly unlock_type: number;
		/**解锁条件*/
		readonly unlock: number;
		/**排序*/
		readonly sort: number;
		/**商品描述*/
		readonly des: string;
		/**角标*/
		readonly tag: string;
		/**礼包图片*/
		readonly icon: string;

	}

	interface ShouchongConfig {
		/**活动编号*/
		readonly index: number;
		/**广告牌描述*/
		readonly ad_desc: string;
		/**消费金额*/
		readonly cost: number;
		/**第一天奖励*/
		readonly day1: number[][];
		/**第二天奖励*/
		readonly day2: number[][];
		/**第三天奖励*/
		readonly day3: number[][];

	}

	interface SkillLayerConfig {
		/**特效名称*/
		readonly index: string;
		/**层级*/
		readonly layer: number;

	}

	interface SkillLevelConfig {
		/**技能升级ID*/
		readonly index: number;
		/**技能等级*/
		readonly skill_grade: number;
		/**技能五行属性*/
		readonly skill_attribute: number[];
		/**技能效果类型*/
		readonly type_effect: number;
		/**buff效果（buff表ID）*/
		readonly buff_effect: number[];
		/**升级消耗材料*/
		readonly upgrade_material: number[][];
		/**技能倍率*/
		readonly skill_coefs: number[];
		/**技能附加伤害*/
		readonly fixdma: number[];
		/**技能附加伤害(客户端显示用）*/
		readonly fixdma_show: number[];
		/**技能tips显示*/
		readonly skill_tips: number;
		/**技能描述*/
		readonly describe: string;

	}

	interface SkillShowConfig {
		/**表现编号*/
		readonly index: number;
		/**起始动作*/
		readonly act1: number;
		/**持续动作*/
		readonly act2: number;
		/**收尾动作*/
		readonly act3: number;
		/**技能刀光*/
		readonly act_effect: string;
		/**临时特效资源名*/
		readonly temporary: string;
		/**特效资源名*/
		readonly res: string;
		/**技能层级*/
		readonly layer: number;
		/**可否旋转*/
		readonly isrotate: number;
		/**播放类型*/
		readonly focus: number;
		/**是否增加震屏*/
		readonly shake: number[];
		/**是否隐藏角色*/
		readonly hide_role: number;
		/**强行停止施放特效*/
		readonly cast_stop: number;
		/**技能音效*/
		readonly sound: string;

	}

	interface SpecialAttrConfig {
		/**特殊属性id*/
		readonly specialindex: number;
		/**备注*/
		readonly desc: string;
		/**目标数量*/
		readonly target: number;
		/**上限*/
		readonly maxlimit: number;
		/**显示战斗力*/
		readonly showpower: number;
		/**仙力*/
		readonly god: number;

	}

	interface SpecialGuideConfig {
		/**特殊指引ID*/
		readonly index: number;
		/**条件1*/
		readonly condition1: number[];
		/**条件2*/
		readonly condition2: number[];
		/**执行步骤（需要引导玩家点击的guide表id）*/
		readonly arrow: number[][];

	}

	interface StrongerConfig {
		/**编号*/
		readonly index: number;
		/**图标*/
		readonly icon: string;
		/**推荐星数*/
		readonly star: number;
		/**描述*/
		readonly desc: string;
		/**跳转ID*/
		readonly jump: number;

	}

	interface SubsectionConfig {
		/**血条编号*/
		readonly index: number;
		/**boss血量*/
		readonly boss_hp: number;
		/**血条数量*/
		readonly hp_subsection: number;

	}

	interface SuitEffectConfig {
		/**index*/
		readonly index: number;
		/**效果类型*/
		readonly type: number;
		/**效果参数*/
		readonly effect_value: number[][];
		/**效果描述*/
		readonly effect_show: string;

	}

	interface SuitPartConfig {
		/**编号*/
		readonly index: number;
		/**套装名称*/
		readonly name: string;
		/**套装组成*/
		readonly pos: number[];
		/**属性ID*/
		readonly attribute_id: number[][];
		/**BUFFID*/
		readonly buff_id: number[][];
		/**技能ID*/
		readonly skill_id: number[][];
		/**图标*/
		readonly icon: string;

	}

	interface SuitStageConfig {
		/**等级*/
		readonly lv: number;
		/**全身进阶*/
		readonly stage: number;
		/**属性id*/
		readonly attr_id: number;
		/**buffID*/
		readonly buff_id: number;

	}

	interface SuitStrengthConfig {
		/**等级*/
		readonly lv: number;
		/**全身强化*/
		readonly strength: number;
		/**属性id*/
		readonly attr_id: number;
		/**buffID*/
		readonly buff_id: number;

	}

	interface SuitTypeConfig {
		/**套装类型*/
		readonly suit_type: number;
		/**最大阶*/
		readonly maxLv: number;
		/**进阶套装组成*/
		readonly suit_part: number[][];

	}

	interface SynthesisConfig {
		/**道具编号*/
		readonly index: number;
		/**合成材料*/
		readonly synthesis_prop: number[][];
		/**消耗*/
		readonly consume: number[][];
		/**合成标题*/
		readonly title: string;

	}

	interface SynthesisTypeConfig {
		/**类型*/
		readonly index: number;
		/**道具*/
		readonly prop: number[];
		/**合成标题*/
		readonly title: string;
		/**是否道具*/
		readonly is_prop: number;
		/**转生开启等级*/
		readonly open_level: number;

	}

	interface TiandiFengduBaiguiluConfig {
		/**索引*/
		readonly index: number;
		/**名字*/
		readonly name: string;
		/**激活属性*/
		readonly attrs: number[];
		/**品质*/
		readonly quality: number;
		/**挑战所需战力*/
		readonly limit_power: number;
		/**怪物ID*/
		readonly monster_id: number;
		/**挑战奖励*/
		readonly challenge_award: number[][];
		/**显示增加战力*/
		readonly power: number;
		/**文本*/
		readonly text: string;

	}

	interface TiandiFengduTaozhuangConfig {
		/**套装索引*/
		readonly index: number;
		/**达标件数*/
		readonly num: number;
		/**套装描述*/
		readonly describe: string;

	}

	interface TiandiLevelConfig {
		/**等级*/
		readonly sp_level: number;
		/**单次升级消耗*/
		readonly cost: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface TiandiLevelrewardsConfig {
		/**索引*/
		readonly index: number;
		/**达标品级（等级）*/
		readonly condtion: number;
		/**达标奖励*/
		readonly rewards: number[][];

	}

	interface TiandiRandomConfig {
		/**奖励ID*/
		readonly index: number;
		/**权重(万分比)*/
		readonly weight: number;
		/**奖励*/
		readonly award: number[][];
		/**奖池名称*/
		readonly name: string;

	}

	interface TiandiShifangConfig {
		/**十方类型*/
		readonly itype: number;
		/**十方名字*/
		readonly name: string;
		/**激活属性*/
		readonly attrs: number;
		/**激活达标条件转生index*/
		readonly condtion: number;
		/**天赋技能(技能buffid_解锁等级,技能buffid_解锁等级,技能buffid_解锁等级 )*/
		readonly buffs: number[][];

	}

	interface TiandiShifangYouliConfig {
		/**游历地图类型*/
		readonly map_type: number;
		/**地图名字*/
		readonly name: string;
		/**开启条件*/
		readonly condtions: number;
		/**游历秒数*/
		readonly use_time: number;
		/**奖励*/
		readonly rewards: number[][];

	}

	interface TiandiShifnagLevelConfig {
		/**等级*/
		readonly sp_level: number;
		/**单次升级消耗*/
		readonly cost: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface TiandiTianlongConfig {
		/**等级*/
		readonly sp_level: number;
		/**单次升级消耗*/
		readonly cost: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface TiandiTianlongJihuoConfig {
		/**图鉴类型*/
		readonly itype: number;
		/**图鉴名字*/
		readonly name: string;
		/**激活属性_激活等级*/
		readonly attrs: number[][];
		/**激活达标条件(仙力*/
		readonly condtion: number;
		/**天赋技能(1_buffid_激活等级) 高等级技能buff覆盖低等级*/
		readonly buffs: number[][];

	}

	interface TiandiTypeConfig {
		/**天帝类型*/
		readonly itype: number;
		/**天帝名字*/
		readonly name: string;
		/**激活奖励*/
		readonly rewards: number[][];
		/**激活所需供奉值*/
		readonly value: number;
		/**每充值x元加供奉道具*/
		readonly recharge_num: number;
		/**充值得到供奉道具*/
		readonly items: number[][];
		/**供奉消耗道具*/
		readonly costs: number[];
		/**供奉一次给与x点供奉值*/
		readonly add_value: number;
		/**外显ID*/
		readonly image_id: number;
		/**描述文本1*/
		readonly desc: string;
		/**描述文本2*/
		readonly text: string;
		/**特权ID*/
		readonly privilege_id: number;

	}

	interface TiandiXianqiFubenConfig {
		/**仙器阶级序列*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**属性id*/
		readonly attr_id: number;
		/**推荐战力显示*/
		readonly power_show: number;

	}

	interface TiandiYuhuangQiandaoConfig {
		/**签到天数索引*/
		readonly index: number;
		/**签到奖励*/
		readonly rewards: number[][];
		/**vip额外奖励条件(默认取第一行的vip达标条件, 其余的配置填0即可)*/
		readonly condtion: number;
		/**额外奖励(达标次数才配置奖励,其余不配置)*/
		readonly other_rewards: number[][];

	}

	interface TiannvchargeWealConfig {
		/**索引*/
		readonly index: number;
		/**累充金额*/
		readonly value: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface TipsConfig {
		/**参数名称*/
		readonly index: string;
		/**中文内容*/
		readonly content: string;

	}

	interface TitleConfig {
		/**称号ID*/
		readonly index: number;
		/**称号名称*/
		readonly name: string;
		/**客户端资源*/
		readonly resource: string;
		/**图标资源名称*/
		readonly icon: string;
		/**称号类型*/
		readonly type: number;
		/**星级称号*/
		readonly eft_star: number;
		/**道具品质*/
		readonly quality: number;
		/**品级*/
		readonly grade: number;
		/**品质角标*/
		readonly quality_title: number;
		/**称号时效*/
		readonly title_time: number;
		/**称号获得条件*/
		readonly title_condition: number[];
		/**特殊称号激活和升星材料*/
		readonly skin_material: number[][];
		/**称号最大星级*/
		readonly star_max: number;
		/**属性ID（基础属性,特殊属性）*/
		readonly attr_id: number[];
		/**称号技能（穿戴效果）*/
		readonly title_skill: number;
		/**穿戴效果与道具描述*/
		readonly desc: string;
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**使用跳转ID*/
		readonly jump_id: number;
		/**是否默认显示*/
		readonly show: number;
		/**最大叠加数量*/
		readonly max_count: number;
		/**文本描述*/
		readonly text: string;

	}

	interface TotalCumulativeConfig {
		/**序列*/
		readonly index: number;
		/**对应充值金额*/
		readonly main_index: number;
		/**累充对应奖励*/
		readonly cumulative_reward: number[][];

	}

	interface TotalFubenConfig {
		/**关卡id*/
		readonly barrier_index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**奖励预览*/
		readonly reward_big: number;
		/**vip等级碾压*/
		readonly vip_level: number;
		/**推荐战力显示*/
		readonly power_show: number;

	}

	interface TotalMainConfig {
		/**活动序列*/
		readonly index: number;
		/**标题*/
		readonly name: string;
		/**任务1奖励（最后一个为大奖）*/
		readonly gift_list: number[][];
		/**任务2奖励（最后一个为大奖）*/
		readonly gift2_list: number[][];
		/**兑换商城类型*/
		readonly reward_list: number;
		/**对应战令*/
		readonly order_index: number;

	}

	interface TotalTargetConfig {
		/**序列*/
		readonly index: number;
		/**任务id*/
		readonly quest_list: number[];
		/**额外购买类型*/
		readonly pay_type: number;
		/**额外购买内容*/
		readonly pay_index: number;

	}

	interface TotalTaskConfig {
		/**任务序列（类型1）*/
		readonly index: number;
		/**对应天数*/
		readonly days: number;
		/**任务列表*/
		readonly quest_list: number[];

	}

	interface TotalTask2Config {
		/**任务序列（类型2）*/
		readonly index: number;
		/**阶段*/
		readonly main_index: number;
		/**任务列表*/
		readonly quest_list: number[];

	}

	interface TourpvpBaoxiangConfig {
		/**索引ID*/
		readonly index: number;
		/**icon*/
		readonly show: string;

	}

	interface TourpvpChallengeConfig {
		/**索引ID*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**预览*/
		readonly reward_big: number[][];
		/**名字*/
		readonly name: string;
		/**描述*/
		readonly desc: string;

	}

	interface TourpvpDatiConfig {
		/**索引ID*/
		readonly index: number;
		/**题目*/
		readonly ques: string;
		/**答案1*/
		readonly option_1: string;
		/**答案2*/
		readonly option_2: string;
		/**答案3*/
		readonly option_3: string;
		/**答案4*/
		readonly option_4: string;
		/**正确答案*/
		readonly ture_option: number;
		/**奖励*/
		readonly reward_option: number[][];
		/**积分*/
		readonly reward: number;

	}

	interface TourpvpFuliConfig {
		/**索引ID*/
		readonly index: number;
		/**目标分数*/
		readonly count: number;
		/**奖励列表*/
		readonly reward: number[][];

	}

	interface TourpvpKillerConfig {
		/**索引ID*/
		readonly index: number;
		/**杀手名称*/
		readonly name: string;
		/**奖励预览（缺积分图标）*/
		readonly reward_big: number[][];
		/**描述*/
		readonly desc: string;

	}

	interface TourpvpPaimingConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**排名奖励*/
		readonly reward: number[][];

	}

	interface TourpvpPreciousConfig {
		/**礼包ID*/
		readonly gift_index: number;
		/**礼包奖励*/
		readonly gift_award: number[][];
		/**价格*/
		readonly price: number[];

	}

	interface TourpvpTargetConfig {
		/**索引ID*/
		readonly index: number;
		/**目标次数*/
		readonly count: number;
		/**奖励列表*/
		readonly reward: number[][];
		/**消耗*/
		readonly cost: number[];

	}

	interface TourpvpWinConfig {
		/**索引ID*/
		readonly index: number;
		/**目标次数*/
		readonly count: number;
		/**奖励列表*/
		readonly reward: number[][];

	}

	interface TreasureboxConfig {
		/**品质*/
		readonly index: number;
		/**图片*/
		readonly picture: string;
		/**宝箱名*/
		readonly name: string;
		/**宝箱碎片*/
		readonly itemid: number;
		/**开启消耗*/
		readonly cost: number;

	}

	interface TunshiConfig {
		/**星级*/
		readonly advance: number;
		/**坐骑道具id_吞噬上限*/
		readonly horse_cost: number[][];
		/**元灵道具id_吞噬上限*/
		readonly yuanling_cost: number[][];
		/**神兵道具id_吞噬上限*/
		readonly weapon_cost: number[][];
		/**羽翼道具id_吞噬上限*/
		readonly wing_cost: number[][];
		/**时装道具id_吞噬上限*/
		readonly body_cost: number[][];
		/**化神道具id_吞噬上限*/
		readonly huashen_cost: number[][];

	}

	interface VipConfig {
		/**VIP编号*/
		readonly index: number;
		/**vip等级*/
		readonly level: number;
		/**升级条件*/
		readonly levelup_exp: number;
		/**购买礼包消耗道具*/
		readonly cost_item: number[][];
		/**购买后续礼包CD(s)*/
		readonly buy_cd: number;
		/**特权礼包*/
		readonly privilege_gift_bag: number[][];
		/**后续礼包购买价格*/
		readonly daily_cost_item: number[][];
		/**后续礼包*/
		readonly daily_gift_bag: number[][];
		/**特权说明*/
		readonly explain: string;
		/**模型展示*/
		readonly showmodel: string;
		/**y轴偏移*/
		readonly modelY: number;
		/**模型大小*/
		readonly modelSize: number;
		/**宣传语*/
		readonly advertisement: string;
		/**特权ID*/
		readonly privilege_id: number;
		/**气泡资源*/
		readonly tagline1: string;
		/**宣传语资源*/
		readonly tagline2: string;

	}

	interface VipChargeConfig {
		/**索引*/
		readonly index: number;
		/**累充金额*/
		readonly value: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface WeaponConfig {
		/**神兵ID*/
		readonly index: number;
		/**神兵名称*/
		readonly name: string;
		/**神兵类型*/
		readonly type: number;
		/**神兵外显和图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**羁绊幻化跳转VIP等级*/
		readonly gain_vip: number;

	}

	interface WeaponDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface WingConfig {
		/**羽翼ID*/
		readonly index: number;
		/**羽翼名称*/
		readonly name: string;
		/**羽翼类型*/
		readonly type: number;
		/**羽翼图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**羁绊幻化跳转VIP等级*/
		readonly gain_vip: number;

	}

	interface WingDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface WorldmapConfig {
		/**章节编号*/
		readonly index: number;
		/**章节名称*/
		readonly name: string;
		/**关卡区间*/
		readonly gate: number[];
		/**奖励*/
		readonly award: number[][];
		/**挂机资源显示*/
		readonly show_award: number[][];
		/**新增奖励预览*/
		readonly add_award: number[][];
		/**描述*/
		readonly dec: string;
		/**任务*/
		readonly task: number[];

	}

	interface XianchiRewardConfig {
		/**索引*/
		readonly index: number;
		/**大奖*/
		readonly rewards: number[][];

	}

	interface XianchongConfig {
		/**id*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**小类*/
		readonly type_little: number;
		/**消耗*/
		readonly cost: number[][];
		/**激活升星属性*/
		readonly active_attr: number[];
		/**激活礼包*/
		readonly reward: number[][];
		/**品质*/
		readonly quality: number;
		/**名字*/
		readonly name: string;
		/**外显和图标*/
		readonly icon: string;
		/**是否默认显示*/
		readonly show: number;
		/**升星战力*/
		readonly star_power: number[];
		/**buffID*/
		readonly taskid: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number[][];
		/**特权id*/
		readonly privilege_id: number[][];
		/**特殊属性前置描述*/
		readonly special_desc: string;
		/**模型缩放（万分比）*/
		readonly scale: number;

	}

	interface XiandiRankConfig {
		/**索引*/
		readonly index: number;
		/**名次区间*/
		readonly rank_no: number[];
		/**奖励*/
		readonly awards: number[][];

	}

	interface XiandiXianqiConfig {
		/**仙器阶级序列*/
		readonly index: number;
		/**属性id*/
		readonly attr_id: number;
		/**buff*/
		readonly buff_id: number;
		/**属性描述*/
		readonly attr_desc: string;
		/**开服天数*/
		readonly open_day: number;

	}

	interface XianfaSkillCultivateConfig {
		/**研习等级*/
		readonly cultivate_level: number;
		/**加成系数*/
		readonly update_rate: number;
		/**研习消耗*/
		readonly yanxi_cost: number[][];
		/**研习条件*/
		readonly yanxi_condition: number[];
		/**研习效果*/
		readonly xianfa_jingyan: number;

	}

	interface XianfaSkillInitConfig {
		/**技能索引*/
		readonly index: number;
		/**技能名字*/
		readonly name: string;
		/**下一个技能id*/
		readonly next_id: number;
		/**技能种类*/
		readonly type: number;
		/**技能星级*/
		readonly skill_advance: number;
		/**技能类型*/
		readonly skill_type: number;
		/**技能大类*/
		readonly skill_heading: number;
		/**是否默认显示*/
		readonly show: number;
		/**技能等级上限*/
		readonly max_level: number;
		/**技能五行属性*/
		readonly skill_attribute: number[];
		/**技能倍率*/
		readonly skill_coefs: number;
		/**buff效果（buff表ID）*/
		readonly buff_effect: number[];
		/**激活消耗*/
		readonly activate_material: number[][];
		/**升级消耗材料*/
		readonly upgrade_material: number[][];
		/**技能描述*/
		readonly describe: string;
		/**技能品质*/
		readonly skill_quality: number;
		/**技能战力*/
		readonly skill_fightpower: number;
		/**跳转UI*/
		readonly skip_ui: number;
		/**跳转文本*/
		readonly skip_txt: string;
		/**未激活仙法排序*/
		readonly sort: number;
		/**释放特效*/
		readonly effects: number;
		/**自身增加的buffid*/
		readonly self_effect: number[];
		/**给目标增加的debuff*/
		readonly tar_effect: number[];

	}

	interface XianfaSkillLevelConfig {
		/**技能等级*/
		readonly index: number;
		/**技能等级属性*/
		readonly level_value: number[];
		/**技能升级消耗*/
		readonly level_cost: number[][];
		/**技能等级战力*/
		readonly skill_level_fightpower: number[];

	}

	interface XianjianConfig {
		/**仙剑ID*/
		readonly index: number;
		/**仙剑名称*/
		readonly name: string;
		/**仙剑类型*/
		readonly type: number;
		/**仙剑图标*/
		readonly icon: string;
		/**仙剑品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**主动技能id*/
		readonly skill: number;
		/**技能升级条件（全部部位达到X阶*/
		readonly condition: number[];
		/**被动技能解锁条件（仙剑等级X级*/
		readonly skill_condition: number[][];
		/**技能图标*/
		readonly skill_icon: string;

	}

	interface XianjianDengjiConfig {
		/**等级*/
		readonly level: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface XianjianJibanConfig {
		/**index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**飞剑ID*/
		readonly partners: number[];
		/**羁绊描述*/
		readonly desc: string;
		/**套装属性*/
		readonly property: number;
		/**技能加成*/
		readonly skill_enhance: number;
		/**羁绊品质*/
		readonly quality: number;

	}

	interface XianjianSkillCostConfig {
		/**仙剑品质*/
		readonly quality: number;
		/**铸炼技能进阶消耗*/
		readonly cost: number[][];

	}

	interface XianjianSkillPosConfig {
		/**铸炼技能等级*/
		readonly level: number;
		/**铸炼技能升级属性*/
		readonly skills: number[];

	}

	interface XianjiebrawlBaseConfig {
		/**编号*/
		readonly index: number;
		/**灵石类型*/
		readonly lingshi_type: number;
		/**副本怪物ID*/
		readonly monster_index: number[];

	}

	interface XianjiebrawlOutcomeConfig {
		/**索引*/
		readonly index: number;
		/**胜负奖励*/
		readonly outcome_award: number[][];

	}

	interface XianjiebrawlRankConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**排名奖励*/
		readonly reward: number[][];

	}

	interface XianjiebrawlScoreConfig {
		/**索引*/
		readonly index: number;
		/**所需积分*/
		readonly scroe: number;
		/**奖励*/
		readonly award: number[][];

	}

	interface XianlvJifenConfig {
		/**编号*/
		readonly index: number;
		/**积分*/
		readonly score: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface XianlvRankConfig {
		/**编号*/
		readonly index: number;
		/**排名区间*/
		readonly rank_section: number[];
		/**排名奖励*/
		readonly reward: number[][];

	}

	interface XianlvShilianFubenConfig {
		/**副本类型*/
		readonly type: number;
		/**副本名称*/
		readonly name: string;
		/**bossId*/
		readonly bossId: number[][];

	}

	interface XianlvShilianSceneConfig {
		/**层数*/
		readonly lvl: number;
		/**属性id*/
		readonly attr_id: number;
		/**入场消耗*/
		readonly cost: number;
		/**通关奖励*/
		readonly big_reward: number[][];
		/**通关积分*/
		readonly big_rewardscore: number;
		/**挑战时长（秒）*/
		readonly challenge_time: number;

	}

	interface XianlvdoufaRankConfig {
		/**排行榜索引*/
		readonly rank_index: number;
		/**排名区间*/
		readonly ranks: number[];
		/**排名奖励*/
		readonly rewards: number[][];

	}

	interface XianlvdoufaRewardConfig {
		/**序号*/
		readonly index: number;
		/**连胜次数*/
		readonly win_time: number;
		/**奖励*/
		readonly reward: number[][];

	}

	interface XianmaiRankRewardConfig {
		/**索引*/
		readonly index: number;
		/**名次*/
		readonly rank_no: number[];
		/**奖励*/
		readonly reward: number[][];

	}

	interface XianmaiStageConfig {
		/**编号*/
		readonly index: number;
		/**总的蓬莱积分道具*/
		readonly score_item: number[];
		/**总的蓬莱灵石道具*/
		readonly lingshi_item: number[];

	}

	interface XiantaFubenConfig {
		/**副本类型*/
		readonly type: number;
		/**副本名称*/
		readonly name: string;
		/**功能开启id*/
		readonly copy_open: number;
		/**每日免费扫荡次数*/
		readonly free: number;

	}

	interface XiantaRewardConfig {
		/**奖励索引*/
		readonly index: number;
		/**全服首个达到第几关*/
		readonly level: number;
		/**奖励*/
		readonly award: number[][];

	}

	interface XiantaSceneConfig {
		/**层数*/
		readonly lvl: number;
		/**大奖奖励*/
		readonly big_reward: number[][];
		/**奖励预览*/
		readonly reward: number;
		/**推荐战力*/
		readonly show_power: number;

	}

	interface XianweiBaseConfig {
		/**索引*/
		readonly index: number;
		/**仙位名称*/
		readonly name: string;
		/**仙位数量*/
		readonly position_quantity: number;
		/**积分*/
		readonly score: number[];
		/**历练币*/
		readonly coin: number[];
		/**机器人战力*/
		readonly rebot_power: number;
		/**头像和头像框*/
		readonly head_frame: number[][];

	}

	interface XianweiRankRewardConfig {
		/**索引*/
		readonly index: number;
		/**名次*/
		readonly rank_no: number[];
		/**奖励*/
		readonly reward: number[][];

	}

	interface YaodiConfig {
		/**编号*/
		readonly index: number;
		/**妖帝妖气经验值*/
		readonly up_exp: number;
		/**妖帝妖气达成领取奖励*/
		readonly reward: number[];
		/**妖帝一键培育消耗*/
		readonly cost_item: number[];
		/**每次培育增加妖帝的妖气*/
		readonly value: number;

	}

	interface YaodiRandomConfig {
		/**奖励ID*/
		readonly index: number;
		/**权重(万分比)*/
		readonly weight: number;
		/**奖励*/
		readonly award: number[][];
		/**奖池名称*/
		readonly name: string;

	}

	interface YaoshenConfig {
		/**编号*/
		readonly index: number;
		/**妖神经验值*/
		readonly up_exp: number;
		/**妖神妖气达成领取奖励*/
		readonly reward: number[];
		/**妖神妖气一键培育消耗*/
		readonly cost_item: number[];
		/**妖神每次培育增加妖气*/
		readonly value: number;

	}

	interface YaoshenRandomConfig {
		/**奖励ID*/
		readonly index: number;
		/**权重(万分比)*/
		readonly weight: number;
		/**奖励*/
		readonly award: number[][];
		/**奖池名称*/
		readonly name: string;

	}

	interface YijieConfig {
		/**编号*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**开启条件*/
		readonly open: number;
		/**稀有boss奖励展示用*/
		readonly rare_reward_show: number;
		/**奖励预览*/
		readonly reward_big: number;
		/**战斗分类*/
		readonly fight_type: number;
		/**退出副本cd*/
		readonly quit_cd: number;

	}

	interface YishouConfig {
		/**类型*/
		readonly type: number;
		/**类型名字*/
		readonly type_name: string;
		/**开启条件--转生等级*/
		readonly open: number;
		/**技能（兽骨）*/
		readonly skill: number;
		/**被动技能id（兽魂）*/
		readonly skill_list: number[][];
		/**背包上限*/
		readonly bag_num: number;
		/**进阶条件*/
		readonly skill_stage: number[][];

	}

	interface YishouShouhunConfig {
		/**index*/
		readonly level: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface YishouShoulingConfig {
		/**兽灵ID*/
		readonly index: number;
		/**类型*/
		readonly type: number;
		/**icon或模型*/
		readonly icon: string;
		/**quality*/
		readonly quality: number;
		/**特殊属性*/
		readonly special_attr_id: number;
		/**技能名*/
		readonly skill_name: string;
		/**图标*/
		readonly skill_icon: string;
		/**展示类型*/
		readonly skill_type: number;

	}

	interface YishouShoulingEquipConfig {
		/**星级*/
		readonly star: number;
		/**消耗*/
		readonly cost: number[][];
		/**属性*/
		readonly attr: number;

	}

	interface YishouShouyingConfig {
		/**兽印ID*/
		readonly index: number;
		/**兽印名称*/
		readonly name: string;
		/**兽印类型*/
		readonly type: number;
		/**外显和图标*/
		readonly icon: string;
		/**道具描述*/
		readonly desc: string;
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**激活或升星消耗*/
		readonly material: number[][];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**是否默认显示*/
		readonly show: number;
		/**升星战力*/
		readonly star_power: number[];

	}

	interface YishouShouyingSuitConfig {
		/**index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**外显和图标*/
		readonly icon: string;
		/**兽印羁绊组合*/
		readonly partners: number[];
		/**激活全部组件获得属性*/
		readonly group_id: number;
		/**羁绊描述*/
		readonly desc: string;
		/**套装属性*/
		readonly attr_id: number[];
		/**单个激活属性*/
		readonly once_property: number;
		/**羁绊品质*/
		readonly quality: number;

	}

	interface YishouSynthesisTypeConfig {
		/**品质*/
		readonly quality: number;
		/**星级*/
		readonly star: number[];

	}

	interface YonghengConfig {
		/**副本编号*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**开启条件*/
		readonly open: number;
		/**奖励预览*/
		readonly reward_big: number;
		/**战斗分类*/
		readonly fight_type: number;
		/**退出副本cd*/
		readonly quit_cd: number;

	}

	interface YuanlingConfig {
		/**元灵ID*/
		readonly index: number;
		/**元灵名称*/
		readonly name: string;
		/**元灵类型*/
		readonly type: number;
		/**外显和图标*/
		readonly icon: string;
		/**道具品质*/
		readonly quality: number;
		/**属性ID星级属性*/
		readonly attr_id: number[];
		/**特殊属性字段*/
		readonly special_attr_id: number;
		/**激活或升星消耗*/
		readonly material: number[][];
		/**是否默认显示*/
		readonly show: number;
		/**单个激活属性*/
		readonly once_property: number;
		/**升星战力*/
		readonly star_power: number[];
		/**模型缩放（万分比）*/
		readonly scale: number;

	}

	interface YuanlingDengjiConfig {
		/**index*/
		readonly index: number;
		/**单次升级消耗*/
		readonly star_consume: number[][];
		/**升级所需次数*/
		readonly exp: number;

	}

	interface YuanlingFubenConfig {
		/**副本难度*/
		readonly id: number;
		/**难度*/
		readonly des: string;
		/**场景id*/
		readonly scene_id: number;
		/**显示奖励*/
		readonly show_reward: number[][];
		/**副本时间(秒)*/
		readonly time: number;
		/**时间评分区间*/
		readonly time_score: number[][];
		/**层数评分区间*/
		readonly layer_score: number[][];
		/**可购买buff*/
		readonly buff_info: number[][];
		/**怪物坐标点*/
		readonly monsters: number[][];
		/**怪物属性*/
		readonly monster_attr: number[];

	}

	interface YuanlingJibanConfig {
		/**index*/
		readonly index: number;
		/**名称*/
		readonly name: string;
		/**元灵id*/
		readonly partners: number[];
		/**羁绊描述*/
		readonly desc: string;
		/**套装属性*/
		readonly property: number;
		/**技能加成*/
		readonly skill_enhance: number;
		/**羁绊品质*/
		readonly quality: number;

	}

	interface YuanlingTaozhuangConfig {
		/**套装ID*/
		readonly suit_id: number;
		/**名字*/
		readonly name: string;
		/**外显和图标*/
		readonly icon: string;
		/**穿戴件数*/
		readonly wear_quantity: number;
		/**达标阶数*/
		readonly reach_class: number;
		/**属性*/
		readonly property: number;
		/**特殊属性*/
		readonly special_property: number;
		/**技能特殊属性*/
		readonly skill_attr: number;
		/**等级*/
		readonly lv: number;
		/**描述*/
		readonly desc: string;

	}

	interface YuanlingZhuangbeiConfig {
		/**索引*/
		readonly index: number;
		/**消耗材料*/
		readonly consume: number[][];
		/**穿戴属性*/
		readonly wear_property: number;
		/**下一级ID*/
		readonly next_id: number;

	}

	interface YuhuoRewardConfig {
		/**索引ID*/
		readonly index: number;
		/**开服天数*/
		readonly open_day: number;
		/**奖励列表*/
		readonly reward: number[][];

	}

	interface ZcxCoinsBankConfig {
		/**索引*/
		readonly index: number;
		/**存放数量*/
		readonly base_value: number;
		/**货币奖励*/
		readonly rewards: number[];
		/**货币奖励*/
		readonly rewards2: number[];

	}

	interface ZcxExchangeConfig {
		/**索引*/
		readonly index: number;
		/**每周兑换次数*/
		readonly count: number;
		/**兑换奖励*/
		readonly rewards: number[][];
		/**消耗材料*/
		readonly costs: number[][];

	}

	interface ZcxFubenConfig {
		/**编号*/
		readonly index: number;
		/**等级条件（转生等级）*/
		readonly level_condition: number;
		/**奖励预览*/
		readonly show_rewards: number[][];

	}

	interface ZcxFundConfig {
		/**索引天数*/
		readonly index: number;
		/**签到奖励*/
		readonly reward: number[];

	}

	interface ZcxLuckNumberConfig {
		/**索引*/
		readonly index: number;
		/**奖励人数(0表示不限制人数)*/
		readonly num: number;
		/**奖励*/
		readonly rewards: number[][];
		/**中奖标识*/
		readonly flag: number;

	}

	interface ZeroBuyConfig {
		/**礼包id*/
		readonly index: number;
		/**广告牌描述*/
		readonly ad_desc: string;
		/**外显id*/
		readonly surface: number[];
		/**VIP等级*/
		readonly vip_idx: number;
		/**消耗*/
		readonly cost: number[];
		/**奖励*/
		readonly reward: number[][];

	}

	interface ZhanduiDengjiConfig {
		/**等级*/
		readonly level: number;
		/**所需活跃点*/
		readonly point: number;
		/**等级对应每日奖励*/
		readonly day_rewards: number[][];
		/**获取途径跳转ID*/
		readonly gain_id: number[];
		/**特殊跳转*/
		readonly special_gain: number[];

	}

	interface ZhanduiJitanDengjiConfig {
		/**等级*/
		readonly level: number;
		/**升级所需*/
		readonly cost: number[];
		/**buff*/
		readonly buff_ids: number[];
		/**特权id*/
		readonly special_ids: number[];

	}

	interface ZhanduiJitanHuanhuaConfig {
		/**id*/
		readonly index: number;
		/**图标和外显*/
		readonly icon: string;
		/**名字*/
		readonly name: string;
		/**品质*/
		readonly quality: number;
		/**描述介绍对话*/
		readonly desc: string;
		/**激活升星消耗*/
		readonly costs: number[][];
		/**buff*/
		readonly buff_ids: number[];
		/**特权id*/
		readonly special_ids: number[];

	}

	interface ZhanduiJitanLibaoConfig {
		/**礼包索引*/
		readonly index: number;
		/**达标等级*/
		readonly level: number;
		/**奖励*/
		readonly rewards: number[][];

	}

	interface ZhanduiQizhiConfig {
		/**索引*/
		readonly index: number;
		/**购买消耗*/
		readonly costs: number[][];
		/**激活条件（战队等级）*/
		readonly cond: number;
		/**名字*/
		readonly name: string;

	}

	interface ZhanduiTansuoMapConfig {
		/**层数*100+排*/
		readonly layer: number;
		/**区域进度增加量*/
		readonly jindu: string;
		/**每排格子配置*/
		readonly grid: number[][];

	}

	interface ZhanduiTansuoTypeConfig {
		/**区域*/
		readonly type: number;
		/**名字*/
		readonly name: string;
		/**奖励展示*/
		readonly rewards: number[][];

	}

	interface ZhuimoBossConfig {
		/**编号*/
		readonly index: number;
		/**副本怪物ID*/
		readonly monster_index: number[];
		/**奖励预览*/
		readonly rare_reward_show: number;

	}

	interface ZhuimoKillRewardConfig {
		/**转生索引*/
		readonly reinc_id: number;

	}

}