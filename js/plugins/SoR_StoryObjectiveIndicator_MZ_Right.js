//=============================================================================
// SoR_StoryObjectiveIndicator_MZ_Right.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.00 (2020/09/18)
//=============================================================================
/*:ja
* @plugindesc ＜ストーリー目標インジケータ Type-R＞ v1.00
* @author 蒼竜
* @help 画面端にゲームの進行状況・目的を1行のメッセージで
* 表示しておくためのウィンドウを実装します。
* プラグインパラメータで事前に登録、あるいは
* プラグインコマンドで直接入力した文字列を任意に表示できます。
* 
* 画像の用意があれば、画像を用いたUIを構成することも可能で、
* マップ上のゲーム画面に独自のアクセントを設けることができます。
*
* インジケータの表示・非表示や表示物の切替等、
* ゲーム中の操作はプラグインコマンドを用いて行います。
*
* 根幹の描画スタイルによってスクリプトを分けています。
* 好みのスタイルのものを1つだけ選んで導入してください。
* (このスクリプトは、"Type-R"のものです。)
*
* @target MZ
* @url http://dragonflare.blue/dcave/
*
* @param ----表示形式設定----
* @param Window_Style
* @desc ウィンドウ形式 (default: 0)
* @type select
* @option 標準スキンによるウィンドウ
* @value 0
* @option 暗くする
* @value 1
* @option 独自画像を利用
* @value 2
* @default 0
*
* @param Window_OriginalImage
* @desc (Window_Style==2, 独自画像を利用 時のみ有効)           ウィンドウの背景に用いる画像、複数使用＆ゲーム内切り替え可
* @type file[]
* @dir img/system/
* @default []
*
* @param Indicator_Style
* @desc インジケータ描画時の演出形式 (default: 0)
* @type select
* @option 右端からスライド
* @value 0
* @option その場でウィンドウ開閉
* @value 1
* @default 0
*
* @param Indicator_TextFont
* @desc インジケータ内テキストフォントサイズ (default: 16)
* @type number
* @default 16
* @param ----描画位置設定----
* @param Indicator_Y-coordinate
* @desc インジケータ描画を行う画面上のy座標，画像左上端基準 (default: 8)
* @type number
* @default 8
*
* @param Text_Xpadd
* @desc テキスト描画位置x座標補正，独自画像使用時を想定 (default: 10)
* @type number
* @default 10
* @min -9999
* @param Text_Ypadd
* @desc テキスト描画位置y座標補正，独自画像使用時を想定 (default: 0)
* @type number
* @default 0
* @min -9999
* @param ----テキスト設定----
* @param MessagesOnIndiactor
* @desc インジケータに表示するメッセージ(1つずつ入力)、\i[],\c[]などの制御文字使用可
* @type string[]
* @default []
*
* @command UpdateIndicator
* @text 描画文字列更新[ストーリー目標インジケータ]
* @desc インジケータに表示する文字列を、予めプラグインパラメータで登録したものに変更します。
* @arg arg0
* @default 1
* @type number
* @text ID
* @arg arg0bool
* @default false
* @type boolean
* @text 変数参照フラグ
* @desc trueにするとIDに指定した番号の変数(\v[ID])参照に切り替え
* @arg arg1bool
* @default false
* @type boolean
* @text 即表示フラグ
* @desc trueにすると即表示(falseで文字列設定予約のみ。後で明示的にOpenする)
* @command SetIndicator
* @text 描画文字列設定[ストーリー目標インジケータ]
* @desc プラグインパラメータに登録した以外の(一時的な)テキストをインジケータに設定します。
* @arg arg0
* @type string
* @text Texts
* @desc インジケータに表示する任意のテキスト
* @arg arg1bool
* @default false
* @type boolean
* @text 即表示フラグ
* @desc trueにすると即表示(falseで文字列設定予約のみ。後で明示的にOpenする)
* @command OpenIndicator
* @text インジケータ表示[ストーリー目標インジケータ]
* @desc 目標インジケータを表示状態に切り替えます。
* @command CloseIndicator
* @text インジケータ非表示[ストーリー目標インジケータ]
* @desc 目標インジケータを非表示状態に切り替えます。
* @command ChangeBGImg
* @text 背景画像変更[ストーリー目標インジケータ]
* @desc インジケータの背景画像を、指定番号(プラグインパラメータで設定した)のものへ変更します。(画像使用設定時のみ有効)
* @arg arg0
* @default 1
* @type number
* @text ID
* @desc 変更したい画像ID(プラグインパラメータMessagesOnIndiactorでの登録順を参照のこと)
* @arg arg0bool
* @default false
* @type boolean
* @text 変数参照フラグ
* @desc trueにするとIDに指定した番号の変数(\v[ID])参照に切り替え
*/
/*:
* @plugindesc <Story Objective Indicator Type-R> v1.00
* @author Soryu
* @help This plugin implements a guiding message window for the game
* in the map scene. Texts indicated on the window can be registered in the plugin parameter,
* or assigned directly by plugin commands.
* 
* If you prepare your own images, the indicator can be decorated by arbitrary images
* so that you can make own UI for guiding the player.
*
* Any operations for indicator in the game are handled by plugin commands.
*
* Script files are separated by the design.
* Thus, install just ONLY ONE script for your preference. 
* (This file is for "Type-Right".)
*
* @param ----Style setting----
* @param Window_Style
* @desc Style of indicator Window (default: 0)
* @type select
* @option Default window with the skin
* @value 0
* @option Dark
* @value 1
* @option Use original UI images
* @value 2
* @default 0
*
* @param Window_OriginalImage
* @desc (Only effective for Window_Style==2)  Images used in the indicator as background image. (You can use multiple images.)
* @type file[]
* @dir img/system/
* @default []
*
* @param Indicator_Style
* @desc Style of appear/disappear (default: 0)
* @type select
* @option Sliding from outside the screen
* @value 0
* @option Open/Close there
* @value 1
* @default 0
*
* @param Indicator_TextFont
* @desc Font size of texts in the indicator (default: 16)
* @type number
* @default 16
* @param ----Position adjustment----
* @param Indicator_Y-coordinate
* @desc Y-coordinate of the indicator (default: 8)
* @type number
* @default 8
*
* @param Text_Xpadd
* @desc Padding of the text in the indicator for x-coordinate (default: 10)
* @type number
* @default 10
* @min -9999
* @param Text_Ypadd
* @desc Padding of the text in the indicator for y-coordinate (default: 0)
* @type number
* @default 0
* @min -9999
* @param ----Text setting----
* @param MessagesOnIndiactor
* @desc Message texts displayed in the indicator (put each item). Control sequences like \i[],\c[] are available.
* @type string[]
* @default []
*
* @command UpdateIndicator
* @text Update Texts[Story Objective Indicator]
* @desc Switch the indicator text which is registerd in the plugin paramter.
* @arg arg0
* @default 1
* @type number
* @text ID (See the plugin parameter you registered messages.)
* @arg arg0bool
* @default false
* @type boolean
* @text -> Flag to use the variable 
* @desc If true, the event whose ID is \v[ID] is targetted.
* @arg arg1bool
* @default false
* @type boolean
* @text Immediately update
* @desc Set true to update immediately. (False reserves the text. You must explicitly open the window later.)
* @command SetIndicator
* @text Set Texts[Story Objective Indicator]
* @desc Set the indicator text as temporal messages which are not registered. 
* @arg arg0
* @type string
* @text Texts
* @desc Texts to put in the indicator
* @arg arg1bool
* @default false
* @type boolean
* @text Immediately update
* @desc Set true to update immediately. (False reserves the text. You must explicitly open the window later.)
* @command OpenIndicator
* @text Show Indicator[Story Objective Indicator]
* @desc Make visible the indicator
* @command CloseIndicator
* @text Hide Indicator[Story Objective Indicator]
* @desc Make invisible the indicator
* @command ChangeBGImg
* @text Change Back Image[Story Objective Indicator]
* @desc If you use images for the indicator BG, switch the image to call this.
* @arg arg0
* @default 1
* @type number
* @text ID
* @desc ID for the image (See the plugin parameter, MessagesOnIndiactor.)
* @arg arg0bool
* @default false
* @type boolean
* @text -> Flag to use the variable 
* @desc If true, the event whose ID is \v[ID] is targetted.
* 
* @target MZ
* @url http://dragonflare.blue/dcave/index_e.php
*/

var Imported = Imported || {};
if(Imported.SoR_StoryObjectiveIndicatorseries) throw new Error("[SoR_StoryObjectiveIndicator_MZ] Do NOT import more than 2 types of <SoR_StoryObjectiveIndicator> series.");
Imported.SoR_StoryObjectiveIndicatorseries = true;

(function() {
	const pluginName = "SoR_StoryObjectiveIndicator_MZ_Right";
	const Param = PluginManager.parameters(pluginName);
	
    const Window_Style = Number(Param['Window_Style']) || 0;
    const Window_OriginalImage = convertJsonParam(Param['Window_OriginalImage']) || '';

    const Indicator_Style = Number(Param['Indicator_Style']) || 0;
	const MessagesOnIndiactor = convertJsonParam(Param['MessagesOnIndiactor']) || '';
    const SetIndicator = String(Param['SetIndicator']) || ''; 
    const Indicator_Ycoord = Number(Param['Indicator_Y-coordinate']) || 0;


    const Text_Xpadd = Number(Param['Text_Xpadd']) || 0;
    const Text_Ypadd = Number(Param['Text_Ypadd']) || 0;
    const Indicator_TextFont = Number(Param['Indicator_TextFont']) || 0;
    
	function convertJsonParam(param) {
        if (param == undefined) return [];
        let arr = [];
            JSON.parse(param).map(function(param) {
                arr.push(param);
            });
        return arr; 
	};
    
    let SoR_SOI_Isopen = false;
    let SoR_SOI_IndTxt = "";
    let SoR_SOI_BGIdx = 1;
    
///////////////////////////////////////////////////////////////////

	PluginManager.registerCommand(pluginName, "UpdateIndicator", args => {   
		if(SceneManager._scene instanceof Scene_Map){
            if(!Number.isFinite(Number(args.arg0))) return;
            const f = Boolean(args.arg0bool === 'true') || false;
            const f2 = Boolean(args.arg1bool === 'true') || false;
            const v = Number(args.arg0)
    
            const id = f==true ? $gameVariables._data[v] : v; 

			SceneManager._scene.StoryObjIndicatorWindow.SetIndicator(MessagesOnIndiactor[id-1], f2);
		 }
	});
 	
	PluginManager.registerCommand(pluginName, "SetIndicator", args => {
		if(SceneManager._scene instanceof Scene_Map){
            const f2 = Boolean(args.arg1bool === 'true') || false;
			SceneManager._scene.StoryObjIndicatorWindow.SetIndicator(args.arg0, f2);
		 }
    });
    
    
	PluginManager.registerCommand(pluginName, "OpenIndicator", args => { 
		if(SceneManager._scene instanceof Scene_Map){
			SceneManager._scene.StoryObjIndicatorWindow.open();
		 }
	});
	PluginManager.registerCommand(pluginName, "CloseIndicator", args => { 
		if(SceneManager._scene instanceof Scene_Map){
			SceneManager._scene.StoryObjIndicatorWindow.close();
		 }
	});


PluginManager.registerCommand(pluginName, "ChangeBGImg", args => {
    if(SceneManager._scene instanceof Scene_Map){
        if(Window_Style!=2) return;
        const f = Boolean(args.arg0bool === 'true') || false;
        const v = Number(args.arg0)
        const id = f==true ? $gameVariables._data[v] : v;

        SceneManager._scene.StoryObjIndicatorWindow.ChangeBGImg(id);
     }
});

Game_Temp.prototype.SoR_GetStoryObjective = function(idx) {
    if(idx < 1 || idx > MessagesOnIndiactor.length) return undefined;
    return MessagesOnIndiactor[idx-1];
}


///////////////////////////////////////////////////////////////////

const SoR_SOI_SM_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    SoR_SOI_SM_createDisplayObjects.call(this);
    this.createStoryIndicatorwindow();
}

Scene_Map.prototype.createStoryIndicatorwindow = function() {
    const rect = this.SoR_StoryObjIndicatorRect();
    this.StoryObjIndicatorWindow = new SoR_StoryObjIndicator(rect);
    this.addWindow(this.StoryObjIndicatorWindow);
}

Scene_Map.prototype.SoR_StoryObjIndicatorRect = function() {
    const ww = Graphics.width;
    const wh = Graphics.height;
    const wx = Graphics.width;
    const wy = Graphics.height - wh;
    return new Rectangle(wx, wy, ww, wh);
}

const SoR_SOI_SM_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function(){
    SoR_SOI_SM_start.call(this);
    if(SoR_SOI_Isopen == true){
         this.StoryObjIndicatorWindow.SetIndicator(SoR_SOI_IndTxt,true);
    }
}





//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
function SoR_StoryObjIndicator() {
    this.initialize(...arguments);
}
SoR_StoryObjIndicator.prototype = Object.create(Window_Base.prototype);
SoR_StoryObjIndicator.prototype.constructor = SoR_StoryObjIndicator;

Object.defineProperty(SoR_StoryObjIndicator.prototype, "innerWidth", {
    get: function() { return this._width; },
    set: function(value) { this.height = value; },
    configurable: true
});
Object.defineProperty(SoR_StoryObjIndicator.prototype, "innerHeight", {
    get: function() { return this._height; },
    set: function(value) { this.height = value; },
    configurable: true
});

SoR_StoryObjIndicator.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._showCount = 0;

	this._text = "";
	
    this.openness = 255;
    this.visible = true;
    this.opacity = 255;
    this.windowcontrolx = 0;
    this.padding = 4;
    this.isOpeningIndicator = false;
    this.isClosingIndicator = false;
    this.isIndicatorOpen = false;
    
    this.contents.fontSize= Indicator_TextFont;
    const twd = this.textWidth("あ");
    this.height = twd + this.padding*2 + 20;

    this.bgidx = SoR_SOI_BGIdx;
    //original bg image
    if(Window_Style==2){
         this.bgimg_list = loadbgImage();
         this.backWindowImage = this.bgimg_list[this.bgidx-1];
    }
    else {
        this.bgimg_list = this.backWindowImage = undefined;
    }
}

function loadbgImage(){
    let arr = [];
    for(let i=0; i<Window_OriginalImage.length; i++){
        const img = ImageManager.loadSystem(Window_OriginalImage[i]);
        arr.push(img);
    }
    return arr;
}

SoR_StoryObjIndicator.prototype.DrawBackground = function() {	
		const color1 = ColorManager.dimColor1();
        const color2 = ColorManager.dimColor2(); 
        
        const x0 = Math.floor(this.width*0.2);
        const xL = this.width-x0;
        const yL = this.height-8;
		this.contents.fillRect(x0, 0 , xL, yL, color1);
		this.contents.gradientFillRect(0,0,x0,yL, color2, color1);
}



SoR_StoryObjIndicator.prototype.SetIndicator = function(text,flag) {
	if(this._text == text && SoR_SOI_Isopen) return;
    this._text = text;
    SoR_SOI_IndTxt = this._text;

    if(flag==true){
        this.DrawIndicator();
        this.open();
    }
}


SoR_StoryObjIndicator.prototype.ChangeBGImg = function(idx) {
    if(this.bgidx == idx) return;

    if(idx<= 0 || idx > Window_OriginalImage.length) idx = 1;
    this.bgidx = SoR_SOI_BGIdx = idx;
    this.backWindowImage = this.bgimg_list[this.bgidx-1];
    this.DrawIndicator();
}



SoR_StoryObjIndicator.prototype.DrawIndicator = function() {
    this.contents.clear();
	this.contents.fontSize = Indicator_TextFont; 
	 
    const wt = this.CalcDrawLength(this._text);
    this.width = wt + this.padding*2 +36;

    if(Window_Style==2){//original bg image
        this.width = this.backWindowImage.width + this.padding*2;
        this.height = this.backWindowImage.height;
    }


    
    if(Indicator_Style==0){
        this.x = Graphics.width;
        this.moveLength = Graphics.width - this.width;
    }
    else{
        this.x = Graphics.width - this.width;
        this.moveLength = 0;
    }
    this.y = Indicator_Ycoord; 
    
    if(Window_Style==0){//window skin
        this.setBackgroundType(0);
    }
    else{//img
        this.setBackgroundType(2);
    }

    this.UpdateIndicator();
}

SoR_StoryObjIndicator.prototype.UpdateIndicator = function() {
    this.contents.clear();
    this.contents.fontSize = Indicator_TextFont; 

    if(Window_Style==1){//black rect
        this.DrawBackground();
    }
    else if(Window_Style==2){
        const img = this.backWindowImage;
        const pw = img.width;
        const ph = img.height;
        this.contents.blt(img, 0, 0, pw, ph , 0, 0, pw, ph);
    }

    this.DrawIndicatorTextsEx(this._text, this.width -this.padding*2-36);
    this.resetFontSettings();
    this.resetTextColor();
}


SoR_StoryObjIndicator.prototype.CalcDrawLength = function(text) {
	let numIcons = 0;
	text = text.replace(/\\I\[(\d+)\]/gi, () => {
        numIcons++;
		return "";
    });
     
    let len = this.textWidth(text) + this.contents.fontSize*numIcons;
	return len;
}





//////////////////////////////////////////////////////////////////////////////

SoR_StoryObjIndicator.prototype.DrawIndicatorTextsEx = function(text, width) {
    const textState = this.createTextState(text, Text_Xpadd, Text_Ypadd+6, width);
    this.processAllText(textState);
}

SoR_StoryObjIndicator.prototype.processDrawIcon = function(iconIndex, textState) {
    if (textState.drawing) this.drawIconObjInd(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += this.contents.fontSize + 4;
}

SoR_StoryObjIndicator.prototype.drawIconObjInd = function(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
	const sy = Math.floor(iconIndex / 16) * ph;
	const drawSize = this.contents.fontSize;
    this.contents.blt(bitmap, sx, sy, pw, ph, x,y+2, drawSize, drawSize);
}

SoR_StoryObjIndicator.prototype.flushTextState = function(textState) {
    const text = textState.buffer;
    const rtl = textState.rtl;
    const tw = this.textWidth(text);
    const wdpd = this.width -this.padding*2 - Text_Xpadd*2-24; //////////
    const width = tw < wdpd ? tw: wdpd;                        //////////
    const height = textState.height;

    const x = rtl ? textState.x - width : textState.x;
    const y = textState.y;
    if (textState.drawing) {
        this.contents.drawTextWithAlphaOutline(text, x, y, width, height);
    }
    textState.x += rtl ? -width : width;
    textState.buffer = this.createTextBuffer(rtl);
    const outputWidth = Math.abs(textState.x - textState.startX);
    if (textState.outputWidth < outputWidth) {
        textState.outputWidth = outputWidth;
    }
    textState.outputHeight = y - textState.startY + height;
}

Bitmap.prototype.drawTextWithAlphaOutline = function(text, x, y, maxWidth, lineHeight, align) {
    // [Note] Different browser makes different rendering with
    //   textBaseline == 'top'. So we use 'alphabetic' here.
    const context = this.context;
    const alpha = context.globalAlpha;
    maxWidth = maxWidth || 0xffffffff;
    let tx = x;
    let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
    if (align === "center") {
        tx += maxWidth / 2;
    }
    if (align === "right") {
        tx += maxWidth;
    }
    context.save();
    context.font = this._makeFontNameText();
    context.textAlign = align;
    context.textBaseline = "alphabetic";
    context.globalAlpha = alpha;
    this._drawTextOutline(text, tx, ty, maxWidth);
    this._drawTextBody(text, tx, ty, maxWidth);
    context.restore();
    this._baseTexture.update();
}


//////////////////////////////////////////////////////////////////////////////


 


SoR_StoryObjIndicator.prototype.open = function() {
    if(this._text=="") return;
    SoR_SOI_Isopen = true;
    this.DrawIndicator();

    this.isIndicatorOpen = false;
    this.isOpeningIndicator = true;
    this.isClosingIndicator = false;
    if(Indicator_Style==1){
        this.openness = 0;
        this.contents.paintOpacity =0;
        this.visible = true;
   }
   else{
        this.x = Graphics.width;
        this.windowcontrolx = this.width;
   }

};

SoR_StoryObjIndicator.prototype.close = function() {
    SoR_SOI_Isopen = false;
    this.windowcontrolx = this.width;
    this.isOpeningIndicator = false;
    this.isClosingIndicator = true;
};

SoR_StoryObjIndicator.prototype.update = function() {
    Window_Base.prototype.update.call(this); 
    if(Indicator_Style==0){//slide
            if(this.isOpeningIndicator){
                const finX = Graphics.width - this.width;
                this.x -= this.windowcontrolx/4;
                this.windowcontrolx = this.x - finX;
                if(this.windowcontrolx <= 0){
                    this.x = finX;
                    this.isOpeningIndicator = false;
                    this.isIndicatorOpen = true;
                }
            }
            else if(this.isClosingIndicator){
                this.x += this.windowcontrolx/4;
                this.windowcontrolx = Graphics.width - this.x;
                if(this.windowcontrolx <= 0){
                    this.x = Graphics.width;
                    this.isClosingIndicator = false;
                    this.resetIndicator();
                }
            }
    }
    else{//stay
            if(this.isOpeningIndicator){
                this.contents.paintOpacity +=15;
                this.visible = true;
                if(Window_Style==2) this.openness = 255;
                else if(Indicator_Style==1) this.openness += 25;
                this.UpdateIndicator();
                if(this.contents.paintOpacity >= 255){
                    this.contents.paintOpacity = 255;
                    this.isOpeningIndicator = false;
                    this.isIndicatorOpen = true;
                    this.openness = 255;
                }
            }
            else if(this.isClosingIndicator){
                this.contents.paintOpacity -=15;
                if(Window_Style==0 && Indicator_Style==1) this.openness -= 25;
                this.UpdateIndicator();
                if(this.contents.paintOpacity <= 0){
                    this.contents.paintOpacity = 0;
                    this.isClosingIndicator = false;
                    this.visible = false;
                    this.openness = 0;
                    this.resetIndicator();
                }
            }
    }
    
}



SoR_StoryObjIndicator.prototype.resetIndicator = function(tag) {
    //this._text = "";
    this.isIndicatorOpen = false;
}


/////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const SoR_SOI_ST_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    SoR_SOI_Isopen = false;
    SoR_SOI_IndTxt = "";
    SoR_SOI_BGIdx = 1;
    SoR_SOI_ST_commandNewGame.call(this);
}
const SoR_SOI_DM_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = SoR_SOI_DM_makeSaveContents.call(this);
    contents.SoRObjectiveIndW = SoR_SOI_Isopen;
    contents.SoRObjectiveIndT = SoR_SOI_IndTxt;
    contents.SoRObjectiveBGIdx = SoR_SOI_BGIdx;
    return contents;
}
const SoR_MII_DM_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    SoR_MII_DM_extractSaveContents.call(this, contents);
    if(!contents.SoRObjectiveIndW || !contents.SoRObjectiveIndT || !contents.SoRObjectiveBGIdx){
        SoR_SOI_Isopen = false;
        SoR_SOI_IndTxt = "";
        SoR_SOI_BGIdx = 1;
    }
    else{
        SoR_SOI_Isopen = contents.SoRObjectiveIndW;
        SoR_SOI_IndTxt = contents.SoRObjectiveIndT;
        SoR_SOI_BGIdx = contents.SoRObjectiveBGIdx;
    }
}

})();