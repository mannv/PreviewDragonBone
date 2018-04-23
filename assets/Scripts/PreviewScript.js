// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		lbtxttest: cc.Label,
	},

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {},

	start () {
		this.domain = window.location.origin + '/dragon';
		// this.filename = 'Rooster_Ani';
		this.filename = window.location.search.substr(5);
		this.lbtxttest.string = "";
		this.loadDragonBone();
	},

	loadDragonBone: function () {
		this._factory = new dragonBones.CCFactory();
		var pathjson = this.domain + '/' + this.filename + '/' + this.filename + '_ske.json';
		cc.loader.load(pathjson, (err, res) => {
			if (err != null) {
				cc.log("---cccc-err: %s", err.message);
				return;
			}
			if (typeof(res) == "string") {
				res = JSON.parse(res);
			}
			this.objNode = res;
			this.strJS2 = JSON.stringify(res);
			this.loadTextureDragonBone(res);
		});
	},

	loadTextureDragonBone: function (res) {
		// console.log(this.objNode);
		var dragonBonesData = this.objNode.ske;

		var textureAtlasData = this.objNode.tex;

		console.log(dragonBonesData);
		console.log(textureAtlasData);
		// return;

		var pathtexture = this.domain + '/' + this.filename + '/' + this.filename + '_tex.png';

		cc.loader.load(pathtexture, (err, res) => {

			if (err != null) {
				cc.log("---cccc-err: %s", err.message);
				return;
			}
			// console.log(this._factory);
			this._dragonBonesData = this._factory.parseDragonBonesData(dragonBonesData);
			this._factory.parseTextureAtlasData(textureAtlasData, res);

			this.dragonBonesNode = this._factory.buildArmatureDisplay(dragonBonesData.armature[0].name);//nhaycao
			//
			this.dragonBonesNode.setPosition(cc.p(0, 0));
			this.node._sgNode.addChild(this.dragonBonesNode);
			this.dragonBonesNode.animation().play("dungim", -1);
			this.dragonBonesNode.scale = 0.5;

		});
	}

	// update (dt) {},
});
