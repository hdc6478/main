namespace game.scene {
    import Pool = base.Pool;

    export class HeadMgr extends BaseDraw {

        public get adTitle(): AdTitle {
            return this._adTitle;
        }

        protected _itemName: ComName;
        protected _partnerName: BaseName;
        protected _hpItem: BaseHp;
        protected _teamName: TeamName;
        protected _title: BaseTitle;
        protected _campName: CampName;
        protected _flag: TopDuelFlag;

        private _adTitle: AdTitle;
        private _height: number;
        private _sort: boolean;
        private _widthChanged: boolean;

        public set sort(value: boolean) {
            this._sort = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            if (value == this._height) {
                return;
            }
            this._height = +value | 0;
            (<BaseActor>this.parent).updateHeadMgrY();
        }

        public get updateEnabled(): boolean {
            return this._updateEnabled && ((this._widthChanged || this._sort) || this._title != null);
        }

        public set updateEnabled(value: boolean) {
            this._updateEnabled = value;
        }

        public setName(name?: string, color?: number) {
            let self = this;
            if (!self._itemName) {
                self._itemName = Pool.alloc(ComName);
                self.add(self._itemName);
            }
            self._itemName.setName(name);
            if (color) {
                self._itemName.color = color;
            }
            self._widthChanged = true;
        }

        public setNameColor(color: UIColor) {
            let self = this;
            if (!self._itemName) return;
            self._itemName.color = color;
        }

        public setTeamName(name?: string, color?: number) {
            let self = this;
            if (!name) {
                if (self._teamName) {
                    self.remove(self._teamName);
                    self._teamName = null;
                }
            } else {
                if (!self._teamName) {
                    self._teamName = Pool.alloc(TeamName);
                    self.add(self._teamName);
                }
                self._teamName.setName(name);

                if (color) {
                    self._teamName.color = color;
                }
            }
            self._widthChanged = true;
        }

        public setPartnerName(name: string, color = UIColor.WHITE) {
            if (!this._partnerName) {
                this._partnerName = Pool.alloc(BaseName);
                this.add(this._partnerName);
            }
            this._partnerName.color = color;
            this._partnerName.text = name;
            this._widthChanged = true;
        }

        public setPartnerNameColor(color: UIColor) {
            if (!this._partnerName) {
                return;
            }
            this._partnerName.color = color;
        }

        public removeParnerName() {
            if (this._partnerName && this._partnerName.parent) {
                this._partnerName.parent.remove(this._partnerName);
                this._partnerName = null;
            }
        }

        /** 巅峰对决旗显示*/
        public setFlagShow(src: string) {
            if (!src) {
                this.removeFlag();
                return;
            }
            if (!this._flag) {
                this._flag = Pool.alloc(TopDuelFlag);
                this.add(this._flag);
            }
            this._flag.setTitle(src);
        }

        public removeFlag(): void {
            if (this._flag && this._flag.parent) {
                this.remove(this._flag);
                this._flag = null;
            }
        }

        public setCampName(name?: string, color?: number) {
            let self = this;
            if (!name) {
                if (self._campName) {
                    self.remove(self._campName);
                    self._campName = null;
                }
            } else {
                if (!self._campName) {
                    self._campName = Pool.alloc(CampName);
                    self.add(self._campName);
                }
                self._campName.setName(name);
                if (color) {
                    self._campName.color = color;
                }
            }
            self._widthChanged = true;
        }

        public add(child: BaseItem): void {
            super.add(child);
            this._sort = true;
        }

        public remove(child: BaseItem): void {
            super.remove(child);
            this._sort = true;
        }

        public setHp(hpPercent: number) {
            if (!this._hpItem) {
                this.initHp();
            }
            this._hpItem.setHp(hpPercent);
        }

        public setGridHp(maxHp: Long) {
            this._hpItem.setGridHp(maxHp);
        }

        public setAdTitle(lv: number) {
            let _limit: number[] = AdTitle.getShowVipAdLimit(lv);
            if (lv == null || _limit == null) {
                if (this._adTitle && this._adTitle.parent) {
                    this._adTitle.parent.remove(this._adTitle);
                }
                this._adTitle = null;
                this.sort = true;
                return;
            }
            if (!this._adTitle) {
                this._adTitle = Pool.alloc(AdTitle);
            }
            this.add(this._adTitle);
            this._adTitle.setTitle(_limit);
        }

        public removeHp() {
            if (this._hpItem && this._hpItem.parent) {
                this._hpItem.dispose();
                this._hpItem = null;
            }
        }

        public setTitle(src: string) {
            if (!src) {
                this.removeTitle();
                return;
            }
            if (!this._title) {
                this._title = Pool.alloc(BaseTitle);
                this.add(this._title);
            }
            this._title.setTitle(src);
        }

        public removeTitle() {
            if (this._title && this._title.parent) {
                this._title.dispose();
                this._title = null;
            }
        }

        private initHp() {
            let actor = <BaseActor>this.parent;
            let vo = actor.vo;
            this._hpItem = Pool.alloc(SceneTools.isEnemy(vo) ? MonsterHp : PlayerHp);
            this.add(this._hpItem);
            this._hpItem.x = -this._hpItem.width * this._hpItem.scale / 2;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (self._widthChanged) {
                self.updateWidth();
                self._widthChanged = false;
            }
            if (self._sort) {
                self.sortChild();
                self._sort = false;
            }
        }

        private updateWidth() {
            for (let child of this.children) {
                let c: BaseName = <BaseName>child;
                if (c.width) {
                    c.x = -c.width / 2;
                }
            }
        }

        private sortChild() {
            let sortList = [this._adTitle, this._title, this._flag, this._campName, this._teamName, this._partnerName, this._itemName, this._hpItem];
            let h = 0;
            for (let i = 0, l = sortList.length; i < l; ++i) {
                let c = sortList[i];
                if (c) {
                    c.y = h;
                    h += +c.height | 0;
                }
            }
            this.height = h;
        }

        protected onAdded(): void {
            super.onAdded();
            this.sortChild();
        }


        public onRelease(): void {
            super.onRelease();
            this._itemName = undefined;
            this._partnerName = undefined;
            this._teamName = undefined;
            this._hpItem = undefined;
            this._height = undefined;
            this._campName = undefined;
            this._flag = undefined;
        }
    }
}