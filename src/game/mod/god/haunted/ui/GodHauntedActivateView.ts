namespace game.mod.god {

    export class GodHauntedActivateView extends eui.Component {

        public grp_desc: eui.Group;
        public lab_desc: eui.Label;
        public img_bg: eui.Image;
        public power: Power;
        public name_item: AvatarNameItem;

        constructor() {
            super();
            this.skinName = "skins.god.GodHauntedActivateSkin";
        }

    }
}