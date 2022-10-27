//=============================================================================
// SoR_MessageExtension_MZ.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.32 (2021/03/10)
//=============================================================================
/*:ja
@plugindesc ＜メッセージウィンドウ拡張＞ v1.32
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help メッセージ入力時の制御文字を追加し、特にストーリーの表現を
豊かにするメッセージウィンドウ表示方式の変更・拡張を行います。
(機能はバージョンアップに従って断続的に拡張されていきます。)

制御文字と機能の概略は以下の通り(詳細はpdfヘルプ参照のこと)。

\nw系 - 名前ウィンドウを設置。MZ追加の標準機能と同等のもので、
(類似プラグインで実装された)MVからのプロジェクト移植を簡易にするためのものです。
\nw[\a<ID>] ... <ID>番のアクターの名前を入れた名前ウィンドウを表示
\nw[<TEXT>] ... 任意の<TEXT>を入れた名前ウィンドウを表示

\msgev - テキスト・顔グラフィックが十分収まる最小限のウィンドウを生成し、
         イベントの頭上にメッセージバルーン形式で表示。
\msgev[<EID>] ... <EID>番のイベント上にメッセージを表示。
<EID> = 0でプレイヤー頭上、-1で実行中イベント自身

\rb - 指定テキストに対してルビを設定します。
\rb[ルビを付すテキスト,ルビ] ... 文章中の「ルビを付すテキスト」の上部に「ルビ」を表示

\CTR系 - メッセージのセンタリング
\msgevと併用のためではなく、デフォルトウィンドウを用いたシネマシーンの演出を想定。
\CTR[<line>] ... <line>行目を中央揃えにする
\CTR[<lineX>-<lineY>] ... <lineX>から<lineY>行を中央揃えにする
\CTR[all] ... 全ての行を中央揃え(最も描画幅の長いものを基準)にする。名前ウィンドウの横位置も調整する。

@param --全般設定--
@param Ruby_FontSize
@desc ルビのフォントサイズ (default: 15)
@default 15
@type number

@param Color_NameWindow
@desc \nwで表示する名前の描画色を指定するRGB値(default: #ffff55)
@default #ffff55
@type string
@param NameWindow_FontSize
@desc \nwで表示する名前のフォントサイズ (default: 20)
@default 20
@type number

@param --バルーン設定--
@param Position_updatePauseSign
@desc バルーンメッセージ改ページ時に表示する、ボタン待ち状態を示すアイコンの位置
@type select
@option バルーン下部中央
@value 0
@option バルーン下部右端
@value 1
@default 0
@param PaddX_updatePauseSign
@desc バルーン改ページ時のアイコンのx座標補正値。使用するスキンにより調整 (default: 0)
@default 0
@type number
@min -9999
@param PaddY_updatePauseSign
@desc バルーン改ページ時のアイコンのy座標補正値。使用するスキンにより調整 (default: 0)
@default 0
@type number
@min -9999

@param --バルーンテール設定--
@param BalloonTails
@desc メッセージバルーン下部に付帯させるテール画像 
@type file[]
@dir img/system/
@default []
@param Initial_BalloonTails
@desc バルーンテール画像の初期設定ID, 0で非表示 (default: 0)
@default 0
@type number
@param PaddX_BalloonTails
@desc バルーンテールの表示位置x座標補正値。テール個数に応じてそれぞれ設定
@default ["-8"]
@type number[]
@min -9999
@param PaddY_BalloonTails
@desc バルーンテールの表示位置y座標補正値。テール個数に応じてそれぞれ設定
@default ["-12"]
@type number[]
@min -9999

@param --名前ウィンドウ関連微調整--
@param PaddX_NameInBalloon
@desc バルーンメッセージ中の名前ウィンドウ位置x座標補正値。(通常ウィンドウスキン,暗転,無背景 で順に列挙)
@default [-8,0,0]
@type string[]
@param PaddY_NameInBalloon
@desc バルーンメッセージ中の名前ウィンドウ位置y座標補正値。(通常ウィンドウスキン,暗転,無背景 で順に列挙)
@default [-43,-47,0]
@type string[]
@param PaddX_NameInCenterizedMesWindow
@desc \ctr[all]使用時の名前ウィンドウ位置x座標補正値。(通常ウィンドウスキン,暗転,無背景 で順に列挙)
@default [0,0,0]
@type string[]
@param PaddY_NameInCenterizedMesWindow
@desc \ctr[all]使用時の名前ウィンドウ位置y座標補正値。(通常ウィンドウスキン,暗転,無背景 で順に列挙)
@default [0,0,0]
@type string[]

@param IsTransparentNameBox_ForDarkenedMesWindow
@desc 「暗くする」ウィンドウ表示の時、名前ウィンドウの背景を非表示化するか。 2項目: バルーン時,\ctr[all]時
@default [false,false]
@type boolean[]
@param Exchange_DrawOrder
@desc メッセージと名前ウィンドウの描画順序を逆転させるか。 (default: false)
@default false
@type boolean

@param PaddY_CenteringMessageCriteria
@desc \ctr[all]使用時の縦方向の中心座標補正。名前ウィンドウy座標補正との兼ね合いで (default: 0)
@default 0
@type number
@min -9999

@param --メッセージ速度/SE--
@param Enable_MessageSpeedAndSE
@desc メッセージスピード調整，効果音再生機能を使用するか (default: false)
@default false
@type boolean

@param DefaultMessageSpeed
@desc メッセージスピード調整設定
@type select
@option とても遅い
@value 0
@option 遅い
@value 1
@option 普通
@value 2
@option 速い
@value 3
@option とても速い
@value 4
@default 2

@param MessageSounds
@desc メッセージ描画時に使用する効果音(の配列) 1番目の指定がデフォルト設定(空欄でSE無し)
@dir audio/se/
@type file[]
@default []

@param --メッセージオプション--
@param Enable_MessageSpeedOption
@desc オプション画面でメッセージ速度を変更する設定を追加するか (default: false)
@default false
@type boolean

@param Texts_MessageSpeedCommand
@desc オプション画面上でのメッセージスピード設定の項目名
@type string
@default メッセージ速度

@param Texts_MessageSpeedOptions
@desc オプション画面上での各メッセージスピードに対応する文字列
@type string[]
@default ["とても遅い","遅い","普通","速い","とても速い"]

@command SetBalloonTail
@text バルーンテール設定[メッセージウィンドウ拡張]
@desc 以後のメッセージバルーン(\msgev)に付加するテール画像のID(プラグインパラメータ"BalloonTails"の登録順に対応), 0でテールなし
@arg tailID
@default 0
@type number
@text TailID

@command SetDefaultMesSE
@text デフォルト時メッセージSE変更[メッセージウィンドウ拡張]
@desc タグ指定等が無い場合のメッセージ表示中の効果音(初期値は1番)の指定を変更します。
@arg arg0
@type number
@min 1
@default 1
@text プラグインパラメータ"MessageSounds"上の番号
@desc 設定した効果音のID(変数指定の場合は、変数番号を記入し変数オプションをtrueにして下さい)
@arg arg0bool
@type boolean
@text →指定した値の変数参照に切り替えるフラグ
@desc trueにすると、「プラグインパラメータ"MessageSounds"上の番号」で指定した番号の変数の値で参照します。
@default false
*/
/*:
@plugindesc <Message Window Extension> v1.32
@author Soryu
@target MZ
@url http://dragonflare.blue/dcave/index_e.php
@help This plugin adds EscapeCharacters to extend message window system,
which will be updated to add more functions for your dramatic game scenes.

Followings are current implemented the EscapeCharacters for additional functions.
to use in message windows (see pdf document in detail).

\nw series - Put a name box, which corresponds to the default function in MZ.
This is supposed to reduce the burden porting a game project from MV with a plugin 
to implement similar function.
\nw[\a<ID>] ... Draw a name box with <ID>-th actor name.
\nw[<TEXT>] ... Draw a name box with arbitrary <TEXT>.

\msgev - Make a minimum size of message window which can accomodate face graphic and 
         messages on the target event. 

\msgev[<EID>] ... Draw a message ballon on the <EID>-th event.
<EID> = 0 means above the player, and -1 is for the current processing event.

\rb - Make ruby (smaller letters) on the designated texts
\rb[text,ruby] ... "ruby" is displayed above "text" with smaller font size.

\CTR series (Experimental) - Conduct centering of messages
This is not for use with \msgev but for helping the default window to express cinematic scenes.

\CTR[<X>] ... Centering of line <X>
\CTR[<X>-<Y>] ... Centering of lines <X> to <Y>
\CTR[all] ... Centering of all messages based on the largest draw width. NameBox is also adjusted.


@param --General--
@param Ruby_FontSize
@desc Font size for ruby displayed above the text (default: 15)
@default 15
@type number

@param Color_NameWindow
@desc Text color for name managed by \nw in RGB(default: #ffff55)
@default #ffff55
@type string
@param NameWindow_FontSize
@desc Font size of text for name managed by \nw (default: 20)
@default 20
@type number

@param --Balloon Setting--
@param Position_updatePauseSign
@desc Position of pause sign for message balloons when the new page is required.
@type select
@option Center 
@value 0
@option Right end
@value 1
@default 0
@param PaddX_updatePauseSign
@desc Padding for pause sign in x-direction. Adjust according to the window skin you use. (default: 0)
@default 0
@type number
@min -9999
@param PaddY_updatePauseSign
@desc Padding for pause sign in y-direction. Adjust according to the window skin you use. (default: 0)
@default 0
@type number
@min -9999

@param --Balloon Tail--
@param BalloonTails
@desc Tail images attached to bottom of message balloons. 
@type file[]
@dir img/system/
@default []
@param Initial_BalloonTails
@desc Initial tail ID. Set 0 for no images. (default: 0)
@default 0
@type number
@param PaddX_BalloonTails
@desc Padding of tails for x-coordinate. Set for each balloon tail image.
@default ["-8"]
@type number[]
@min -9999
@param PaddY_BalloonTails
@desc Padding of tails for y-coordinate. Set for each balloon tail image.
@default ["-8"]
@type number[]
@min -9999

@param --Adjust for Name Box--
@param PaddX_NameInBalloon
@desc Padding for name box (x-coord.) in message balloon. (Enumerate for Default Window, Dim, No Back in order.)
@default [-8,0,0]
@type string[]
@param PaddY_NameInBalloon
@desc Padding for name box (y-coord.) in message balloon. (Enumerate for Default Window, Dim, No Back in order.)
@default [-43,-47,0]
@type string[]
@param PaddX_NameInCenterizedMesWindow
@desc Padding for name box (x-coord.) in centering by \ctr[all]. (Enumerate for Default Window, Dim, No Back in order.)
@default [0,0,0]
@type string[]
@param PaddY_NameInCenterizedMesWindow
@desc Padding for name box (y-coord.) in centering by \ctr[all]. (Enumerate for Default Window, Dim, No Back in order.)
@default [0,0,0]
@type string[]

@param IsTransparentNameBox_ForDarkenedMesWindow
@desc In a dimmed window, disable the back of name window. (Enumerate for balloon, \ctr[all] in order.)
@default [false,false]
@type boolean[]
@param Exchange_DrawOrder
@desc Reverse the order of drawing message window and name box in the game screen. (default: false)
@default false
@type boolean

@param PaddY_CenteringMessageCriteria
@desc Padding for the text (y-coord.) centering by \ctr[all] (default: 0)
@default 0
@type number
@min -9999

@param --Message Speed/Sound--
@param Enable_MessageSpeedAndSE
@desc A flag to enable Message Speed and Message Sound features (default: false)
@default false
@type boolean

@param DefaultMessageSpeed
@desc Message Speed setting in default
@type select
@option Very Slow
@value 0
@option Slow
@value 1
@option Normal (Default in RPGMaker)
@value 2
@option Fast
@value 3
@option Very Fast
@value 4
@default 2

@param MessageSounds
@desc (An array of) SE plays with message text. Default SE is the 1st element. For blank plays no SE.
@dir audio/se/
@type file[]
@default []

@param --Message Options--
@param Enable_MessageSpeedOption
@desc A flag to add a setting in the option window to modify message speed. (default: false)
@default false
@type boolean

@param Texts_MessageSpeedCommand
@desc Text in the option for Message Speed Command
@type string
@default Message Speed

@param Texts_MessageSpeedOptions
@desc Text in the option associated with each message speed value.
@type string[]
@default ["Very Slow","Slow","Normal","Fast","Very Fast"]

@command SetBalloonTail
@text Ballon Tail Setting [Message Window Extension]
@desc Tail image ID (see Parameter "BalloonTails") for Message balloons coming after this command. 0 for No tail.
@arg tailID
@default 0
@type number
@text TailID

@command SetDefaultMesSE
@text Change Default Message SE[Message Extension]
@desc Change Default (Without tag specification) Message SE (default ID:1).
@arg arg0
@min 1
@default 1
@type number
@text ID on "MessageSounds" on plugin parameters
@desc Target SE's ID listed in the paramter (If depends on the game variable, fill the var. ID and set true the following option.)
@arg arg0bool
@type boolean
@text -> Flag to use the game variable for target SE's ID
@desc If true, the SE whose ID is \v["MessageSounds" on plugin parameters"] in the list is targetted.
@default false
*/

var Imported = Imported || {};
Imported.SoR_MessageExtension = true;

(function() {
"use strict";

const pluginName = "SoR_MessageExtension_MZ";
const Param = PluginManager.parameters(pluginName);

const Ruby_FontSize = Number(Param['Ruby_FontSize'] || 0); 
const Color_NameWindow = String(Param['Color_NameWindow'] || ""); 
const NameWindow_FontSize = Number(Param['NameWindow_FontSize'] || 0);
const Position_updatePauseSign = Number(Param['Position_updatePauseSign'] || 0); 
const PaddX_updatePauseSign = Number(Param['PaddX_updatePauseSign'] || 0); 
const PaddY_updatePauseSign = Number(Param['PaddY_updatePauseSign'] || 0); 

//v1.14
const PaddX_NameInBalloon = convertJsonParam(Param['PaddX_NameInBalloon']) || '';
const PaddY_NameInBalloon = convertJsonParam(Param['PaddY_NameInBalloon']) || '';
const PaddX_NameInCenterizedMesWindow = convertJsonParam(Param['PaddX_NameInCenterizedMesWindow']) || '';
const PaddY_NameInCenterizedMesWindow = convertJsonParam(Param['PaddY_NameInCenterizedMesWindow']) || '';
const IsTransparentNameBox_ForDarkenedMesWindow = convertJsonParam2(Param['IsTransparentNameBox_ForDarkenedMesWindow']);
const Exchange_DrawOrder = Boolean(Param['Exchange_DrawOrder'] === 'true') || false;
const PaddY_CenteringMessageCriteria = Number(Param['PaddY_CenteringMessageCriteria'] || 0);

//v1.20
const BalloonTails = convertJsonParam3(Param['BalloonTails']) || '';
const Initial_BalloonTails = Number(Param['Initial_BalloonTails'] || 0);
let MSGX_BalloonTailsID = Initial_BalloonTails;

const PaddX_BalloonTails = convertJsonParam(Param['PaddX_BalloonTails'] || 0); 
const PaddY_BalloonTails = convertJsonParam(Param['PaddY_BalloonTails'] || 0); 
BalloonTails.unshift("");
PaddX_BalloonTails.unshift(0);
PaddY_BalloonTails.unshift(0);

//v1.30
const Enable_MessageSpeedAndSE = Boolean(Param['Enable_MessageSpeedAndSE'] === 'true') || false;
const DefaultMessageSpeed = Number(Param['DefaultMessageSpeed'] || 0);
const MessageSounds = convertJsonParam3(Param['MessageSounds']) || '';

const MessageSpeedList = [];
MessageSpeedList.push({del: 2, fast: 1});
MessageSpeedList.push({del: 1, fast: 1});
MessageSpeedList.push({del: 0, fast: 1});//normal speed
MessageSpeedList.push({del: 0, fast: 2});
MessageSpeedList.push({del: 0, fast: 4});

const Enable_MessageSpeedOption = Boolean(Param['Enable_MessageSpeedOption'] === 'true') || false;
const Texts_MessageSpeedOptions = convertJsonParam3(Param['Texts_MessageSpeedOptions']) || '';
let Default_MessageSEID = 1;

ConfigManager.SoRMesSpeed = Enable_MessageSpeedAndSE ? DefaultMessageSpeed : 2;

//v1.31
const Texts_MessageSpeedCommand = String(Param['Texts_MessageSpeedCommand'] || ""); 





if(Enable_MessageSpeedAndSE && Enable_MessageSpeedOption){

const SoR_ME_CM_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    const config = SoR_ME_CM_makeData.call(this);
    config.SoRMesSpeed = this.SoRMesSpeed;
    return config;
}

const SoR_ME_CM_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
   SoR_ME_CM_applyData.call(this,...arguments);
   this.SoRMesSpeed = this.readSoRMesSpeed(config, "SoRMesSpeed", DefaultMessageSpeed);
}

ConfigManager.readSoRMesSpeed = function(config, name, defaultValue) {
    if (name in config) return config[name];
    return defaultValue;
}

const SoR_ME_WO_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    SoR_ME_WO_makeCommandList.call(this);
    this.addSoR_MSGSpeedOption();
}

Window_Options.prototype.addSoR_MSGSpeedOption = function() {
    this.addCommand(Texts_MessageSpeedCommand, "SoRMesSpeed");
}

const SoR_ME_SO_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    // Increase this value when adding option items.
    return 1 + SoR_ME_SO_maxCommands.call(this);
}

const SoR_ME_WO_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);
    if (this.isSoRMesSpeedSymbol(symbol)) {
        return this.MesSpeedStatusText(value);
    }
    else return SoR_ME_WO_statusText.call(this,...arguments);
}

Window_Options.prototype.isSoRMesSpeedSymbol = function(symbol) {
    return symbol.includes("SoRMesSpeed");
}

Window_Options.prototype.MesSpeedStatusText = function(value) {
    return Texts_MessageSpeedOptions[value];
}


const SoR_ME_WO_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isSoRMesSpeedSymbol(symbol)) {
        this.changeMesSpeedValue(symbol, true, false);
    }
    else SoR_ME_WO_processOk.call(this, ...arguments);
}

const SoR_ME_WO_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isSoRMesSpeedSymbol(symbol)) {
        this.changeMesSpeedValue(symbol, true, false);
    }
    else SoR_ME_WO_cursorRight.call(this, ...arguments);
}


const SoR_ME_WO_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isSoRMesSpeedSymbol(symbol)) {
        this.changeMesSpeedValue(symbol, false, false);
    }
    else SoR_ME_WO_cursorLeft.call(this, ...arguments);
}

Window_Options.prototype.changeMesSpeedValue = function(symbol, forward, wrap) {
    const lastValue = this.getConfigValue(symbol); 
    const offset = 1;
    const value = lastValue + (forward ? offset : -offset);
    if (lastValue !== value) {
        ConfigManager[symbol] = value.clamp(0, 4);
        this.redrawItem(this.findSymbol(symbol));
        this.playCursorSound();
    }
}

}




function convertJsonParam(param) {
    if (param == undefined) return [];
    let arr = [];
        JSON.parse(param).map(function(param) {
            arr.push(Number(param));
        });
    return arr;
}
function convertJsonParam2(param) {
    if (param == undefined) return [];
    let arr = [];
        JSON.parse(param).map(function(param) {
            param = param == "true"? true : false;
            arr.push(param);
        });
    return arr;
}
function convertJsonParam3(param) {
    if (param == undefined) return [];
    let arr = [];
        JSON.parse(param).map(function(param) {
            arr.push(param);
        });
    return arr;
}




Object.defineProperty(Bitmap.prototype, "height", {
    set: function(value) { //add
		const image = this._canvas || this._image;
        image.height = value;
    }
});

const SoR_ME_SM_createMessageWindow = Scene_Message.prototype.createMessageWindow;
Scene_Message.prototype.createMessageWindow = function() {

    if(Exchange_DrawOrder) this.SoR_createNameBoxWindow();
    SoR_ME_SM_createMessageWindow.call(this);
        
    this._messageWindow.OriginalMes_Rect = this.messageWindowRect();
    this._messageWindow.defaultPadd = this._messageWindow.padding;
}

const SoR_ME_WM_initMembers = Window_Message.prototype.initMembers;
Window_Message.prototype.initMembers = function() {
    SoR_ME_WM_initMembers.call(this);
    
    this.initializeBallonTail();
}

Window_Message.prototype.initializeBallonTail = function() {
    if(this.balloonTail) this.removeChild(this.balloonTail);

    if(MSGX_BalloonTailsID == 0) this.balloonTail = new Sprite(new Bitmap());
    else this.balloonTail = new Sprite(ImageManager.loadSystem(BalloonTails[MSGX_BalloonTailsID]));

    this.balloonTail.anchor.x = 0.5;
    this.balloonTail.opacity = 0;
    this.balloonTail_PaddX = 0;
    
    this.addChild(this.balloonTail);
}


const SoR_ME_WB_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	text = SoR_ME_WB_convertEscapeCharacters.call(this,text);

    text = text.replace(/\x1bCTR\[(.*?)\]/gi, (_, p1) => { 
        if(p1=="all"){
            for(let i=0; i<4; i++) this.isCenterizeLine[i] = true;
            this.isCenterizeALL = true;
        }
        else if(p1.match(/(\d+?)-(\d+?)/i) != null){
            const ret = p1.match(/(\d+?)-(\d+?)/i);
            for(let i=ret[1]-1; i<=ret[2]-1; i++) this.isCenterizeLine[i] = true;
        }
        else if(!isNaN(parseInt(p1))){
            this.isCenterizeLine[p1-1] = true;
        }

        return '';
     });
     
    text = text.replace(/\x1bRB\[(.*?),(.*?)\]/gi, (_, p1, p2) => { //ruby
        this.isSoR_MesRuby = true;
        this.SoR_MesRubyarr.push({words: p1, rb: p2});
        return p1;
    });  
    text = text.replace(/\x1bNW\[\x1bA(\d+?)\]/gi, (_, p1) => {
        this.SoR_MesnameWindow = true;
	    $gameMessage.setSpeakerName(this.actorName(parseInt(p1))); return '';
	 });
    text = text.replace(/\x1bNW\[(.*?)\]/gi, (_, p1) => {
        this.SoR_MesnameWindow = true;
		$gameMessage.setSpeakerName(p1); return '';
	 });
    text = text.replace(/\x1bMSGEV\[(-)*(\d+)\]/gi, (_, p1, p2) => {//on map
	    if (!$gameParty.inBattle()) {
          this.requiredMesMod = true;
          this.MesModTarget = "event";
          if(p1 != undefined) p2 = -p2;
          this.linkMsgToEvent(p2);
		}
		return '';
	 });
    text = text.replace(/\x1bMSGACTOR\[(-)*(\d+)\]/gi, (_, p1, p2) => {//in battle
	    if ($gameParty.inBattle()) {
          this.requiredMesMod = true;
          this.MesModTarget = "actor";
          if(p1 != undefined) p2 = -p2;
          this.linkMsgToEvent(p2);
		}
		return '';
	 });
    text = text.replace(/\x1bMSGPARTY\[(-)*(\d+)\]/gi, (_, p1, p2) => {
	    if ($gameParty.inBattle()) {
          this.requiredMesMod = true;
          this.MesModTarget = "party";
          if(p1 != undefined) p2 = -p2;
          this.linkMsgToEvent(p2);
		}
		return '';
	 });
    text = text.replace(/\x1bMSGENEMY\[(-)*(\d+)\]/gi, (_, p1, p2) => {
	    if ($gameParty.inBattle()) {
          this.requiredMesMod = true;
          this.MesModTarget = "enemy";
          if(p1 != undefined) p2 = -p2;
          this.linkMsgToEvent(p2);
		}
		return '';
	 });
	
    return text;
};


Window_Message.prototype.linkMsgToEvent = function(EventID) {
    this.targetMesEvent = EventID;
};

const SoR_ME_WM_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
    if(this.targetMesEvent !== undefined){
        this.MsgBalloonUpdate();
        this.BalloonTailOpen();
    }
    if(this.isClosing() || this.isClosed()) this.BalloonTailClose();

    SoR_ME_WM_update.call(this);
}

Window_Message.prototype.BalloonTailOpen = function() {
    if(this.balloonTail.opacity < 255) this.balloonTail.opacity += 25;
    else this.balloonTail.opacity = 255;
}
Window_Message.prototype.BalloonTailClose = function() {
    if(this.balloonTail.opacity > 0) this.balloonTail.opacity -= 25;
    else this.balloonTail.opacity = 0;
}


const SoR_ME_WM_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this.isCenterizeLine = [false, false, false, false];
    this.isSoR_MesRuby = false;
    this.SoR_MesRubyarr = [];
    this.CalcLineDrawWidth = [0, 0, 0, 0, 0];
    this.Message_CurrentPageline = 0;

    SoR_ME_WM_startMessage.call(this);
    this.CalcMessageStateForTargetMes();
    
    if(this.SoR_MesRubyarr[0] && this.SoR_MesRubyarr[0].length!=0){
        const rbPadd = Ruby_FontSize-3;                
        this._textState.y+=rbPadd;
    }

    if(this.FixedMesforEvent)  this.SetMessageBalloon();
    this.CenteringMessageLineText();
    if(this.isCenterizeALL) this.FixNameBoxCenterToDefaultWindow();
}



Window_Message.prototype.CalcMessageStateForTargetMes = function() {
    const tx = $gameMessage.allText();
    const textState = this.createTextState(tx, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
	
	const text = textState.text;
    const lines = text.split('\n');
	let maxwidth = 0;
	let len;

    const txrec = this.textRect_onMessage(text);
    if(!this.requiredMesMod) return;


    this.width = txrec.width + ($gameMessage.faceName()!== "" ? ImageManager.faceWidth : 0) +80;
    const w_height = txrec.height + lines.length*12 + $gameSystem.windowPadding() * 2;

    const hdiff = Window_Base.prototype.fittingHeight(4) - w_height;
	this.height = w_height;
    this.facepadd_param = {h: txrec.height, len: lines.length, pad: $gameSystem.windowPadding(), hdiff: hdiff};
    this.updateBackground(this._background);

    this.requiredMesMod = false;
    this.FixedMesforEvent = true;
    this.TargetMes_Lines = lines.length;
    
    this.contents._baseTexture.height = 600;
    this.contents.height = 600;
}

 






Window_Message.prototype.textRect_onMessage = function(str_allmes) {
    const orig_fsize = this.contents.fontSize;
    let exp_fsize = orig_fsize;
    let next_fsize = orig_fsize;

    let FontChangeSplitting = false;
    let rubys = [];

    if(this.isSoR_MesRuby){ //make ruby
        rubys = this.SoR_MesRubyarr.slice();
        this.SoR_MesRubyarr = [];

        //words rb
    }

    const str_arr = str_allmes.split('\n');
    let maxwidth = 0;
    let totalHeight = 0;
    let lenwidth = 0;
    for(let row=0; row<str_arr.length;row++){
            let str = RemoveEscapeCharactersForMeasurement(str_arr[row]);

            let ckruby_line = [];
            for(let nrb=0; nrb<rubys.length;nrb++){//rb check
                let idx = str_arr[row].indexOf(rubys[nrb].words);
                while(idx!=-1){
                    ckruby_line.push({wd: rubys[nrb].words, rb: rubys[nrb].rb, idx: idx});
                    idx = str_arr[row].indexOf(rubys[nrb].words,idx+1);
                }
            }
            let ruby1line = [];


            let currentWidth = 0;
            let maxheight = 0;

            let head_idx = 0;
            for(let i=0; i<str.length;i++){
                const c = str[i];
                if (c.charCodeAt(0) < 0x20) { //Is control letter?
                    const code = str[i+1];
                    i++;
                    switch(code){
                        case "{":
                            next_fsize = MkFontBigger(exp_fsize);
                            FontChangeSplitting = true;
                            break;
                        case "}":
                            next_fsize = MkFontSmaller(exp_fsize);
                            FontChangeSplitting = true;
                            break;
                        default:
                        i++;
                        break;
                    }
                }


                //ruby setting
                for(let nrb=0; nrb < ckruby_line.length; nrb++){
                    if(i==ckruby_line[nrb].idx){
                        const idx = ckruby_line[nrb].idx;
                        const wdl = ckruby_line[nrb].wd.length;
                        const prevwd = str.substring(0, idx);
                        const prevarea = this.contents.measureTextRectArea(prevwd);
                        const rbbasewd = str.substring(idx, idx+wdl);
                        const rbbasearea = this.contents.measureTextRectArea(rbbasewd);
                        ruby1line.push({rb: ckruby_line[nrb].rb , xpos: prevarea.x+rbbasearea.x/2, idx: lenwidth+idx , idx2: lenwidth+idx+wdl});
                        break;
                    }
                }
                //font size scaling
                if(FontChangeSplitting === true || i>=str.length-1){
                    let pad_cntchar = -1;
                    if(!FontChangeSplitting && i>=str.length-1) pad_cntchar = 0;//////
                    
                    const test_arr = str.substring(head_idx, i+pad_cntchar);
                    this.contents.fontSize = exp_fsize;
                    const area = this.contents.measureTextRectArea(test_arr);
                    const rowtxwid = area.x;
                    const rowtxhgt = this.calculateTextHeight(test_arr);//area.y;
                    if(maxheight < rowtxhgt) maxheight = rowtxhgt;//height

                    currentWidth += rowtxwid;
                    head_idx = i+1;
                    FontChangeSplitting = false;
                    exp_fsize = next_fsize;
                }
                
            }//for one row
            this.SoR_MesRubyarr.push(ruby1line);
            if(ruby1line.length!=0) totalHeight+= (Ruby_FontSize-2);//rubyfontsize

            this.CalcLineDrawWidth[row] = currentWidth;
            if(currentWidth > maxwidth) maxwidth = currentWidth;
            totalHeight += maxheight;
            lenwidth += str.length;

        }//for entire rows



    this.contents.fontSize = orig_fsize;
    this.CalcLineDrawWidth[4] = {width: maxwidth, height: totalHeight, line: str_arr.length};
    return {width: maxwidth, height: totalHeight};
}

function MkFontBigger (fs) {
    if (fs <= 96) fs += 12;
    return fs;
}
function MkFontSmaller (fs) {
    if (fs >= 24) fs -= 12;
    return fs;
}



Bitmap.prototype.measureTextRectArea = function(text) {
    const context = this.context;
    context.save();
    context.font = this._makeFontNameText();
    const wd = context.measureText(text).width;
    
    let maxhgt = 0;
    for(let i=0; i<text.length;i++){
        const hgt = context.measureText(text[i]).width;
        if (maxhgt < hgt) maxhgt = hgt;
    }

    context.restore();
    return {x: wd, y: maxhgt};
};
Window_Base.prototype.calculateTextHeight = function(text) {
    const lastFontSize = this.contents.fontSize;
    const textHeight = this.maxFontSizeInLine(text);
    this.contents.fontSize = lastFontSize;
    return textHeight;
};



function RemoveEscapeCharactersForMeasurement(text){
//Just remove escape characters to measure the length
    text = text.replace(/\x1bC\[(\d+)\]/gi, "");
    text = text.replace(/\x1bI\[(\d+)\]/gi, "あ");//count as a length for one character
    text = text.replace(/\x1bPX/gi, "");
    text = text.replace(/\x1bPY/gi, "");
    text = text.replace(/\x1bFS/gi, "");

    return text;
}




//For ruby
Window_Message.prototype.flushTextState = function(textState) {
    Window_Base.prototype.flushTextState.call(this,textState);

    if(this.SoR_MesRubyarr.length==0) return;

    if (textState.drawing) {
        const thisline = this.Message_CurrentPageline;

        const vl = this.SoR_MesRubyarr[thisline]? this.SoR_MesRubyarr[thisline].length : 0;
        
        for(let i = 0; i < vl; i++){
            const ruby = this.SoR_MesRubyarr[thisline][i];
            const ck_count = ruby.idx + (thisline*2)+1;
            if(textState.index == ck_count || this._showFast){
                
                let LinePadd = Ruby_FontSize-3;
                const rby = textState.y - LinePadd;
                const tmpf = this.contents.fontSize;
                this.contents.fontSize = Ruby_FontSize;
                
                const rbw = this.textWidth(ruby.rb);

                let rbx = 0;
                if(this.isCenterizeALL){
                    const ww = this.width;
                    const drawing_center = (this.x+ww)/2;
                    rbx = (drawing_center -this.padding*2 - this.CalcLineDrawWidth[4].width/2) + ruby.xpos - rbw/2;
                }
                else if(this.isCenterizeLine[this.Message_CurrentPageline]){
                    const ww = this.width;
                    const drawing_center = (this.x+ww)/2;
                    rbx = (drawing_center -this.padding - this.CalcLineDrawWidth[this.Message_CurrentPageline]/2) + ruby.xpos - rbw;
                }
                else rbx = textState.startX + ruby.xpos - rbw/2;

                this.contents.drawText(ruby.rb, rbx, rby, rbw, Ruby_FontSize+2);
                this.contents.fontSize = tmpf;
            }
        }
    }
}



 









Window_Message.prototype.MsgBalloonUpdate = function() {
    const tarID = this.targetMesEvent;
    let x, y, target = this.BalloonTargetEventObj;
         

      x = target.screenX() - this.width/2;
      y = target.screenY() - target.sprHeight - this.height -5 - this.balloonTail.bitmap.height;
      
      //this._messageWindow.balloonTail.visible = true;
      const balloonDir = target.screenX()<=Graphics.boxWidth*0.51? 1 : -1
      this.balloonTail.x = this.width/2 + PaddX_BalloonTails[MSGX_BalloonTailsID] * balloonDir + this.balloonTail_PaddX;
      this.balloonTail.y = this.height + PaddY_BalloonTails[MSGX_BalloonTailsID];
      this.balloonTail.scale.x = balloonDir;

    if(this.x == x && this.y == y) return;
    this.x = x;
    this.y = y;

    //adjust for window rect
    if(this.x < 0){
         this.balloonTail_PaddX = this.x;
         this.x = 0;
    }
    else if(this.x+this.width > Graphics.width){
         this.balloonTail_PaddX = this.x - (Graphics.width-this.width);
         this.x = Graphics.width-this.width;
    }
    else this.balloonTail_PaddX = 0;

    if(this._nameBoxWindow._name != ""){
        this.FixNameBoxWindowToBalloon();
        
        if(this._nameBoxWindow.y < 0){
          this._nameBoxWindow.y = 36;
          this.y = this._nameBoxWindow.y+50;
        }
      }

    if(this.y < 0) this.y=0;
    else if(this.y+this.height > Graphics.height) this.y = Graphics.height-this.height-8;
}



Window_Message.prototype.SetMessageBalloon = function() {
  const tarID = this.targetMesEvent;
  let x, y, target;

  if(tarID == 0) target = $gamePlayer;
  else if(tarID <= -1) target = $gameMap.event($gameMap._interpreter._eventId);
  else target = $gameMap.event(tarID);
  this.BalloonTargetEventObj = target;

  if(target !== undefined && target !== null){
    x = target.screenX();
    y = target.screenY() - target.CalcSpriteHeight();
  }
  this.XtraPadding_TargetMes = 0;

  //this.balloonTail.visible = true;
  const balloonDir = target.screenX()<=Graphics.boxWidth*0.51? 1 : -1
  this.balloonTail.x = this.width/2 + PaddX_BalloonTails[MSGX_BalloonTailsID] * balloonDir + this.balloonTail_PaddX;
  this.balloonTail.y = this.height + PaddY_BalloonTails[MSGX_BalloonTailsID];
  this.balloonTail.scale.x = balloonDir;

  this.x = x - this.width/2;
  this.y = y - this.height -5 - this.balloonTail.bitmap.height;  // 2:-5

  //adjust for window rect
  if(this.x < 0){
    this.balloonTail_PaddX = this.x;
    this.x = 0;
  }
  else if(this.x+this.width > Graphics.width){
        this.balloonTail_PaddX = this.x - (Graphics.width-this.width);
        this.x = Graphics.width-this.width;
  }
  else this.balloonTail_PaddX = 0;

  if(this._nameBoxWindow._name != ""){
      this.FixNameBoxWindowToBalloon();
      
      if(this._nameBoxWindow.y <0){
        this._nameBoxWindow.y = 36;
        this.y = this._nameBoxWindow.y+50;
      }
    }
  if(this.y < 0) this.y=0;
  else if(this.y+this.height > Graphics.height) this.y = Graphics.height-this.height-8;
}



Window_Message.prototype.FixNameBoxWindowToBalloon = function() {
  const nw = this._nameBoxWindow;
  
  nw.contents.clear();
  const rect = nw.baseTextRect();
  const faceExists = $gameMessage.faceName() !== "";

  nw.drawTextEx_NameBox(nw._name, rect.x, rect.y, rect.width);
 
  let FacePad = ImageManager.faceWidth;
  if(!faceExists) FacePad = 0;

  nw.x = this.x+FacePad +PaddX_NameInBalloon[this._background];
  nw.y = this.y +PaddY_NameInBalloon[this._background];

  //Delete namebox bg for darkened message window
  if(this._background==1 && IsTransparentNameBox_ForDarkenedMesWindow[0]){
    nw.hideBackgroundDimmer();
  }

}


Window_Message.prototype.FixNameBoxCenterToDefaultWindow = function() {
    if(!this.isCenterizeALL || this._nameBoxWindow._name == "") return;

    const nw = this._nameBoxWindow;
    
    nw.contents.clear();
    const rect = nw.baseTextRect();
    const faceExists = $gameMessage.faceName() !== "";
    const w = nw.drawTextEx_NameBox(nw._name, rect.x, rect.y, rect.width);

    nw.x = this.CenterizedTextStartX - nw.width/2 -this.padding*2 + PaddX_NameInCenterizedMesWindow[this._background];
    nw.y = this.y-nw.height-this.padding + PaddY_NameInCenterizedMesWindow[this._background];

    //Delete namebox bg for darkened message window
    if(this._background==1 && IsTransparentNameBox_ForDarkenedMesWindow[1]){
        nw.hideBackgroundDimmer();
    }

}

Window_Base.prototype.drawTextEx_NameBox = function(text, x, y, width) {
	this.contents.clear();
    this.contents.fontSize = NameWindow_FontSize;
    const w = this.textWidth(text);
    const pd = this.padding + this.itemPadding();

    this.changeTextColor(Color_NameWindow);//yellow
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);

    this.resetTextColor();
    this.resetFontSettings();
 
    this.width = textState.outputWidth+pd*2;
    this.updateBackground(this._background);///

    /*
    if(this._background==1) this.width = w+pd*2 -10; //dark
    else this.width = w+pd*2; //normal window or hidden
    */

    this.height = 52;
};



const SoR_ME_WM_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
	
 if(this.targetMesEvent !== undefined){
     const tmp = this.facepadd_param;
    this.target_MesPaddY = 100 - tmp.hdiff +tmp.pad +4;

    const faceName = $gameMessage.faceName();
    const faceIndex = $gameMessage.faceIndex();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = ImageManager.faceHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;

    this.drawFace(faceName, faceIndex, x +104, this.target_MesPaddY, width, height);	//// 2: 54
 }
 else SoR_ME_WM_drawMessageFace.call(this);

};

const SoR_ME_WB_drawFace = Window_Base.prototype.drawFace
Window_Base.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {

   if(this.targetMesEvent == undefined) SoR_ME_WB_drawFace.call(this, ...arguments);
   else{
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = x;
    const dy = y;
    const sx = (faceIndex % 4) * pw;
    const sy = Math.floor(faceIndex/4) * ph;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
   }

};
// prettier-ignore




const SoR_ME_WM_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
	if(this.targetMesEvent !== undefined){
        
		this.XtraPadding_TargetMes = -100;
        this.padding = this.XtraPadding_TargetMes;// 2:-50
        
		//this.contents.width += -this.XtraPadding_TargetMes;
		this.contents.clear();
		this.resetFontSettings();
		this.clearFlags();
		this.updateSpeakerName();
		this.loadMessageFace();
        
        textState.x = textState.startX;
		textState.y = 14-this.XtraPadding_TargetMes;
		textState.height = this.CalcTextHeight_TargetMes(textState);


        if(this.targetMesEvent!=0 && this.MesModTarget=="event"){
            //MessageSE
            let target;
            if(this.targetMesEvent <= -1) target = $gameMap.event($gameMap._interpreter._eventId).event().meta;
            else if(this.targetMesEvent > 0) target = $gameMap.event(this.targetMesEvent).event().meta;
            if(target.MessageSE) textState.MsgSE = Number(target.MessageSE);
        }
    }


    this.CenteringMessageLineText();
    this.mes_heightLine = this.calcTextHeight(textState);

	if(this.targetMesEvent === undefined){
     SoR_ME_WM_newPage.call(this, textState);
     this.ResetTargetWindowSetting();
    }

    textState.timing = 0;   
}

const SoR_ME_WB_processNewLine = Window_Base.prototype.processNewLine;
Window_Message.prototype.processNewLine = function(textState) {
    this.Message_CurrentPageline++;
    SoR_ME_WB_processNewLine.call(this,textState);
    
    const thisline = this.Message_CurrentPageline;
    if(this.SoR_MesRubyarr[thisline] && this.SoR_MesRubyarr[thisline].length!=0){
        const rbPadd = Ruby_FontSize-3;
        textState.y+=rbPadd;
    }
}



Window_Message.prototype.CenteringMessageLineText = function(){
    const textState = this._textState;

    if(this.isCenterizeALL){
         const maxwidth = this.CalcLineDrawWidth[4].width;
         const totalheight = this.CalcLineDrawWidth[4].height;
         const txlines = this.CalcLineDrawWidth[4].line;

         if(this.Message_CurrentPageline == 0){
             //// todo
            textState.startY = (4-txlines)*((totalheight+txlines*8)/txlines)*0.5 + PaddY_CenteringMessageCriteria;
            textState.y = textState.startY;
         }
         const ww = this.width;

         const drawing_center = (this.x+ww)/2;
         textState.startX = drawing_center - maxwidth*0.5 - this.padding*2;
         textState.x = textState.startX;
         
         if(this._nameBoxWindow._name != "") this.CenterizedTextStartX = textState.x;

    }else{//centerize each line
        if(!this.isCenterizeLine[this.Message_CurrentPageline]) return;
        
        const ww = this.width;
        const drawing_center = (this.x+ww)/2;
        textState.startX = drawing_center - this.CalcLineDrawWidth[this.Message_CurrentPageline]/2;
        textState.x = textState.startX - this.padding*2;
    }
}



Window_Message.prototype.CalcTextHeight_TargetMes = function(textState) {
    const lineSpacing = this.lineHeight() - $gameSystem.mainFontSize();
    const lastFontSize = this.contents.fontSize;
    const lines = textState.text.slice(textState.index).split("\n");
    const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;//+ lineSpacing + 50;
    this.contents.fontSize = lastFontSize;
    return textHeight;
};


const SoR_ME_WM_newLineX = Window_Message.prototype.newLineX;
Window_Message.prototype.newLineX = function(textState) {
	 if(this.targetMesEvent !== undefined){
	    const faceExists = $gameMessage.faceName() !== "";
		const faceWidth = ImageManager.faceWidth;
		const spacing = 130;
        const margin = faceExists ? faceWidth + spacing : spacing;

		return textState.rtl ? this.innerWidth - margin : margin;
	 }
     
     return SoR_ME_WM_newLineX.call(this, textState);
}
 


///////////////////////////////////////////////////////
if(Enable_MessageSpeedAndSE){
Window_Message.prototype.updateMessage = function() {
    const textState = this._textState;

    if (textState) {
        this.updateShowFast();
        if(!this._showFast && textState.timing< MessageSpeedList[ConfigManager.SoRMesSpeed].del){
            textState.timing++;
            return true;
        }
        textState.timing = 0;

        while (!this.isEndOfText(textState)) {
            if (this.needsNewPage(textState)) {
                this.newPage(textState);
            }
            this.updateShowFast();
            this.SoRME_processCharacters(textState, MessageSpeedList[ConfigManager.SoRMesSpeed].fast);
            this.processMessageSound(textState);
            
            if (this.shouldBreakHere(textState)) break;
        }

        this.flushTextState(textState);
        if (this.isEndOfText(textState) && !this.pause) this.onEndOfText();
        return true;
    }
    
    return false;    
}

Window_Message.prototype.SoRME_processCharacters = function(textState,n) {
    for(let i=0; i<n; i++){
        if(textState.index >= textState.text.length) break;
        const c = textState.text[textState.index++];
        if (c.charCodeAt(0) < 0x20) {
            this.flushTextState(textState);
            this.processControlCharacter(textState, c);
        } else {
            textState.buffer += c;
        }
    }
}

Window_Message.prototype.processMessageSound = function(textState) {
    let id = Default_MessageSEID-1;
    if(textState.MsgSE && textState.MsgSE >= 1 && textState.MsgSE <= MessageSounds.length) id = textState.MsgSE-1;

    const sound = {"name":MessageSounds[id],"volume":90,"pitch":50,"pan":0};
    AudioManager.playSe(sound);
}

}












////////////////////////////////////////////////////////////////////
const SoR_ME_Window_updatePauseSign = Window.prototype._updatePauseSign;
Window.prototype._updatePauseSign = function() {
	if(this.targetMesEvent !== undefined){
    const sprite = this._pauseSignSprite;
    const x = Math.floor(this._animationCount / 16) % 2;
    const y = Math.floor(this._animationCount / 16 / 2) % 2;
    const sx = 144;
    const sy = 96;
    const p = 24;
    if (!this.pause) sprite.alpha = 0;
    else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx + x * p, sy + y * p, p, p);
    sprite.visible = this.isOpen();

    const tmp = this.facepadd_param;
        if(tmp!==undefined){
          if(Position_updatePauseSign==0) sprite.x = this.width/2 + PaddX_updatePauseSign;
          else sprite.x = this.width + PaddX_updatePauseSign;
          sprite.y = tmp.h +tmp.pad*2 + tmp.len *12 + PaddY_updatePauseSign;
        }
	}
	else SoR_ME_Window_updatePauseSign.call(this);
}
 
const SoR_ME_NB_updatePlacement = Window_NameBox.prototype.updatePlacement;
Window_NameBox.prototype.updatePlacement = function() {
    const nw_f = this._messageWindow.SoR_MesnameWindow && this._name != "";

	if(nw_f && this._messageWindow.targetMesEvent !== undefined){
		this.width = this.SoR_windowWidth();
        this.height = this.windowHeight();
		const messageWindow = this._messageWindow;
		if ($gameMessage.isRTL()) this.x = messageWindow.x + messageWindow.width - this.width;
        else this.x = messageWindow.x;

		if (messageWindow.y > 0) this.y = messageWindow.y - this.height;
        else this.y = messageWindow.y + messageWindow.height;
    }
    else if(this._messageWindow.SoR_MesnameWindow){
        this.width = this.SoR_windowWidth();
        this.height = this.windowHeight()-8;
    }
    else SoR_ME_NB_updatePlacement.call(this);
    
}

Window_NameBox.prototype.SoR_windowWidth = function() {
    this.contents.fontSize = NameWindow_FontSize;
    const w = this.textWidth(this._name);
    const pd = this.padding +8;
    return w+pd*2;
}

Game_CharacterBase.prototype.CalcSpriteHeight = function() {
    if (this.sprHeight !== undefined) return this.sprHeight;
    if (this.tileId() > 0) return $gameMap.tileHeight();
		
    const spr = ImageManager.loadCharacter(this.characterName());
	this.sprHeight = 0;
    if (!spr) return this.sprHeight;
    this.sprHeight = spr.height/(ImageManager.isBigCharacter(this.characterName()) ? 4 : 8); //!$

    return this.sprHeight;
}

////////////////////////////
const SoR_ME_WM_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    SoR_ME_WM_terminateMessage.call(this);

    //this.balloonTail.visible = false;
    this.FixedMesforEvent = false;
    this.targetMesEvent = undefined;
    this.requiredMesMod = false;
    this.MesModTarget = "";
    this.isCenterizeALL = false;
    this.SoR_MesnameWindow = false;
}

Window_Message.prototype.ResetTargetWindowSetting = function() {
    const rect = this.OriginalMes_Rect;
    //this.balloonTail.visible = false;
    this.isCenterizeALL = false;
    if(this.x !== rect.x) this.x = rect.x
    if(this.width !== rect.width)this.width = rect.width;
    if(this.height !== rect.height)this.height = rect.height;
    this.padding = this.defaultPadd;
}


//////////////////////////////////////////////////////////////////


if(Exchange_DrawOrder){
    Scene_Message.prototype.createNameBoxWindow = function() {} //original createNameBoxWindow (Absorbed)
    Scene_Message.prototype.SoR_createNameBoxWindow = function() {
        this._nameBoxWindow = new Window_NameBox();
        this.addWindow(this._nameBoxWindow);
    }
    //Renders the object using the WebGL renderer.
Window_Message.prototype.render = function render(renderer) {
    if (!this.visible) return;

    const graphics = new PIXI.Graphics();
    const gl = renderer.gl;
    const children = this.children.clone();

    renderer.framebuffer.forceStencil();
    graphics.transform = this.transform;
    renderer.batch.flush();
    gl.enable(gl.STENCIL_TEST);
    
    while (children.length > 0) {
        const win = children.pop();
        if (win._isWindow && win.visible && win.openness > 0) {
            win.render(renderer);
        }
    }

    gl.disable(gl.STENCIL_TEST);
    gl.clear(gl.STENCIL_BUFFER_BIT);
    gl.clearStencil(0);
    renderer.batch.flush();

    for (const child of this.children) {
        if (!child._isWindow && child.visible) {
            child.render(renderer);
        }
    }

    renderer.batch.flush();
};
}
else{
    //Renders the object using the WebGL renderer.
Window_NameBox.prototype.render = function render(renderer) {
    if (!this.visible) return;

    const graphics = new PIXI.Graphics();
    const gl = renderer.gl;
    const children = this.children.clone();

    renderer.framebuffer.forceStencil();
    graphics.transform = this.transform;
    renderer.batch.flush();
    gl.enable(gl.STENCIL_TEST);
    
    while (children.length > 0) {
        const win = children.pop();
        if (win._isWindow && win.visible && win.openness > 0) {
            win.render(renderer);
        }
    }

    gl.disable(gl.STENCIL_TEST);
    gl.clear(gl.STENCIL_BUFFER_BIT);
    gl.clearStencil(0);
    renderer.batch.flush();

    for (const child of this.children) {
        if (!child._isWindow && child.visible) {
            child.render(renderer);
        }
    }

    renderer.batch.flush();
};
}




/////////////////////////////////////////////////////////////////
PluginManager.registerCommand(pluginName, "SetBalloonTail", args => {
    if(SceneManager._scene instanceof Scene_Message){
        MSGX_BalloonTailsID = args.tailID;
        SceneManager._scene._messageWindow.initializeBallonTail();
    }
});


PluginManager.registerCommand(pluginName, "SetDefaultMesSE", args => { 
	$gameTemp.SetDefaultMesSE(args.arg0,args.arg0bool);
});

Game_Temp.prototype.SetDefaultMesSE = function(id, flag){
    const vid = ConvertInt2Val(id,flag);
	if(isNaN(vid)) return undefined;
	Default_MessageSEID = vid;
}

function ConvertInt2Val(v,vflag){
	if(vflag === true || vflag == "true") return $gameVariables.value(v);
	else return v;
}
}());