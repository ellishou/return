//=============================================================================
// BattleSplashFadeMZ.js
//=============================================================================
// [update history]
// BattleSplashFade.js for RMMV
// 2016.Sep.30 Ver1.0.0 first release for RMMV
// BattleSplashFadeMZ.js
// 2021.Feb.25 Ver1.0.0 first release for RMMZ

/*:
 * @target MZ
 * @plugindesc set splash fadeout/fadein effect at launch battle.
 * @author Sasuke KANNAZUKI (thx to Mokusei Penguin)
 *
 * @param Apply FadeOut
 * @desc whether to apply splash effect at fade out(1=yes, 0=no)
 * @type select
 * @option YES
 * @value 1
 * @option NO
 * @value 0
 * @default 1
 *
 * @param FadeOut Frames
 * @parent Apply FadeOut
 * @desc duration for fadeout(60frame = 1sec)
 * @type number
 * @default 100
 *
 * @param Apply FadeIn
 * @desc whether to apply splash effect at fade in(1=yes, 0=no)
 * @type select
 * @option YES
 * @value 1
 * @option NO
 * @value 0
 * @default 0
 *
 * @param FadeIn Frames
 * @parent Apply FadeIn
 * @desc duration for fadein(60frame = 1sec)
 * @type number
 * @default 80
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ
 *
 * This plugin enables splash fade on the start of battle.
 * This plugin cannot use with other plugin for fadein effect.
 *
 * Copyright:
 * This plugin is based on a Mokusei Penguin's RGSS3 material.
 * Thanks to Mokusei Penguin( http://woodpenguin.blog.fc2.com/ ).
 * (Mokusei means 'wooden' and 'Jupiter' in Japanese)
 *
 * Rikudo worked to enables to use on RMMZ.
 * Thanks to Rikudo.
 *
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘開始時のフェードをスプラッシュに変更します。
 * @author 神無月サスケ (原案:木星ペンギン)
 *
 * @param Apply FadeOut
 * @text フェードアウト適用？
 * @desc 戦闘突入時のフェードアウトに適用するか(1=する, 0=しない)
 * @type select
 * @option する
 * @value 1
 * @option しない
 * @value 0
 * @default 1
 *
 * @param FadeOut Frames
 * @parent Apply FadeOut
 * @text F.O.フレーム数
 * @desc フェードアウトにかかるフレーム数(60フレーム = 1秒)
 * @type number
 * @default 100
 *
 * @param Apply FadeIn
 * @text フェードイン適用？
 * @desc 戦闘突入時のフェードインに適用するか(1=する, 0=しない)
 * @type select
 * @option する
 * @value 1
 * @option しない
 * @value 0
 * @default 0
 *
 * @param FadeIn Frames
 * @text F.I.フレーム数
 * @parent Apply FadeIn
 * @desc フェードインにかかるフレーム数(60フレーム = 1秒)
 * @type number
 * @default 80
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZ に対応しています。
 *
 * このプラグインは、戦闘開始時にガラスの割れるようなフェードを行います。
 * 他の戦闘フェードインを変更するプラグインとの併用はできません。
 *
 * 著作権表示：
 * プラグイン作成にあたって、木星ペンギン様.の RGSS3 素材を
 * 参考にさせていただきました。
 * 木星ペンギン様( http://woodpenguin.blog.fc2.com/ )に感謝します。
 *
 * MZ版作成にあたって、リクドウ様のパッチを参考にさせていただきました。
 * リクドウ様に感謝します。
 * 
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // process parameter(s)
  //
  const parameters = PluginManager.parameters('BattleSplashFadeMZ');
  const fadeOutFrames = Number(parameters['FadeOut Frames'] || 100);
  const fadeInFrames = Number(parameters['FadeIn Frames'] || 100);
  const _applyFadeOut = !!Number(parameters['Apply FadeOut']);
  const _applyFadeIn = !!Number(parameters['Apply FadeIn']);

  const applyFadeOut = () => _applyFadeOut;
  const applyFadeIn = () => _applyFadeIn;

  // ----------------------------------------
  // BattleFadeManager
  // ----------------------------------------
  function BattleFadeManager() {
    throw new Error('This is a static class');
  }

  //
  // start fadeout/fadein
  //
  BattleFadeManager.startFadeout = function() {
    this.startSplashFade();
  };

  BattleFadeManager.startFadeIn = function() {
    if (!BattleFadeManager.isSnapped()) {  // for battle test
      BattleFadeManager.snap();
    }
    this.startSplashFade();
  };

  BattleFadeManager.startSplashFade = function() {
    this.effectSprites = this.makeBreakSprites(14, 9);
    this.effectData = [];
    for (let i = 0; i < this.effectSprites.length; i++) {
      this.effectData.push(this.makeEffectData(this.effectSprites[i]));
    }
  };

  //
  // add children
  //
  BattleFadeManager.addChildren = function(parent) {
    for (let i = 0; i < this.effectSprites.length; i++) {
      parent.addChild(this.effectSprites[i]);
    }
  };

  //
  // update fadeout/fadein
  //
  BattleFadeManager.updateFadeout = function(i, frames) {
    this.updateSprashFade(i * 180.0 / (frames || 180));
  };

  BattleFadeManager.updateFadeIn = function(i, frames) {
    this.updateSprashFade(i * 180.0 / (frames || 180));
  };

  BattleFadeManager.updateSprashFade = function(i) {
    let d;
    if (i < 90) {
      d = (Math.pow(45, 2) - Math.pow((i - 45), 2)) / 40.0;
    } else {
      d = (90 - i) * 2.0;
    }
    for (let n = 0; n < this.effectSprites.length; n++ ) {
      const sprite = this.effectSprites[n];
      const data = this.effectData[n];
      const m = i - data[0];
      if (m < 0) {
        continue;
      }
      var zoom = data[1] - (data[1] - 1.0) * Math.pow((179 - m), 2) /
        Math.pow(180, 2);
      if (zoom > 6) {
        sprite.visible = false;
        continue;
      }
      sprite.x = data[2] + data[3] * (Math.pow((179 - m), 2) /
        Math.pow(180, 2) * 1.5);
      sprite.y = data[4] + data[5] * (Math.pow((179 - m), 2) /
        Math.pow(180, 2) * 1.5);
      if(data[1] < 16) {
        sprite.y -= d * zoom;
      }
      const zoom_x = zoom * Math.cos(m * data[7] * Math.PI / 360);
      const zoom_y = zoom * Math.cos(m * data[8] * Math.PI / 360);
      sprite.mirror = (zoom_x < 0) != (zoom_y < 0);
      sprite.anchor.x = sprite.mirror ? 1.0-data[9] : data[9];
      sprite.scale.x = Math.abs(zoom_x);
      sprite.scale.y = Math.abs(zoom_y);
      sprite.rotation = (m * data[6] / 2 + (zoom_y < 0 ? 180 : 0)) *
        Math.PI / 180;
    }
  };

  //
  // utility functions
  //
  BattleFadeManager.makeBreakSprites = function(col, row) {
    const sprites = [];
    const rect = new Rectangle();
    for (let x = 0; x < col; x++) {
      rect.x = Graphics.width * x / col * 1.0;
      rect.width = Graphics.width * (x + 1.0) / col - rect.x;
      for (let y = 0; y < row; y++) {
        rect.y = rect.y = Graphics.height * y / row * 1.0;
        rect.height = Graphics.height * (y + 1.0) / row - rect.y;
        sprites.push(this.makeEffectSprites2(rect, 0));
        sprites.push(this.makeEffectSprites2(rect, 2));
      }
    }
    return sprites;
  };

  BattleFadeManager.makeEffectSprites2 = function(rect, pos) {
    const sprite = new Sprite();
    sprite.bitmap = new Bitmap(rect.width, rect.height);
    sprite.bitmap.blt(this.effectBitmap, rect.x, rect.y, rect.width,
     rect.height, 0, 0);
    const d = Math.max(rect.width, rect.height);
    if (pos === 0) {
      for (let i = 0 ; i < d ; i++) {
        sprite.bitmap.clearRect(rect.width * (d - i) / d, i, i, 1);
      }
    } else {
      for (let i = 0 ; i < d ; i++) {
        sprite.bitmap.clearRect(0, i, rect.width * (d - i) / d, 1);
      }
    }
    sprite.anchor.x = sprite.anchor.y = (pos + 1) / 4.0;
    sprite.x = rect.x + rect.width * sprite.anchor.x;
    sprite.y = rect.y + rect.height * sprite.anchor.y;
    return sprite;
  };

  BattleFadeManager.makeEffectData = function(sprite) {
    const sx = sprite.x - Graphics.width / 2.0;
    const sy = sprite.y - Graphics.height / 2.0;
    let zoom =  Math.asin(1 - Math.sqrt(sx * sx + sy * sy) / 360.0) *
      Math.pow(Math.randomInt(6), 2) / 10 + 1;
    let rate = 3.5;
    if (zoom >= 2.5 && Math.randomInt(3) === 0) {
      zoom = rate = 20.0;
    }
    const tx = (sx - Math.randomInt(25) + 12) * rate + Graphics.width / 2;
    const ty = (sy - Math.randomInt(20) + 9) * rate + Graphics.height / 2;
    const angle = (Math.randomInt(48) + 1) *
      (Math.randomInt(2) === 0 ? 1 : -1) / 4.0;
    const ax = (Math.randomInt(48) + 1) *
      (Math.randomInt(2) === 0 ? 1 : -1) / 4.0;
    const ay = Math.randomInt(50) * (Math.randomInt(2) === 0 ? 1 : -1) / 4.0;
    return [Math.randomInt(3), zoom, tx, sprite.x - tx, ty, sprite.y - ty,
     angle, ax, ay, sprite.anchor.x];
  };

  //]
  // process effect bitmap
  //
  BattleFadeManager.isSnapped = function() {
    return !!this.effectBitmap;
  };

  BattleFadeManager.snap = function() {
    this.effectBitmap = SceneManager.snap();
  };

  BattleFadeManager.disposeBitmap = function() {
    this.effectBitmap = null;
    this.effectData = null;
    this.effectSprites = null;
  };

  // ----------------------------------------
  // Scene_Map
  // ----------------------------------------

  const _Scene_Map_startEncounterEffect =
   Scene_Map.prototype.startEncounterEffect;
  Scene_Map.prototype.startEncounterEffect = function() {
    _Scene_Map_startEncounterEffect.call(this);
    if (applyFadeOut() || applyFadeIn()) {
      BattleFadeManager.snap();
    }
    if (applyFadeOut()) {
      BattleFadeManager.startFadeout();
      this._encounterEffectDuration = fadeOutFrames;
    }
  };

  const _Scene_Map_updateEncounterEffect =
   Scene_Map.prototype.updateEncounterEffect;
  Scene_Map.prototype.updateEncounterEffect = function() {
    if (applyFadeOut()) {
      // at first
      if (this._encounterEffectDuration === fadeOutFrames) {
        this.snapForBattleBackground();
        this.createFadeSprite();
        BattleFadeManager.addChildren(this._fadeSprite);
        this.startFadeOut(1);
      }
      if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        const speed = fadeOutFrames;
        const n = speed - this._encounterEffectDuration;
        BattleFadeManager.updateFadeout(n, fadeOutFrames);
        if (n === Math.floor(speed / 2))
        {
          BattleManager.playBattleBgm();
        }
        if (!applyFadeIn()) {
          if (this._encounterEffectDuration === 0) {
            BattleFadeManager.disposeBitmap();
          }
        }
      }
    } else {
      _Scene_Map_updateEncounterEffect.call(this);
    }
  };

  //
  // Rikudo's modification to enable fadeout on MZ.
  //
  Scene_Map.prototype.startFadeIn = function(duration, white) {
    this.createFadeSprite(white);
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;
    this._fadeSprite.opacity = 255;
  };

  const _Scene_Map_startFadeOut = Scene_Map.prototype.startFadeOut;
  Scene_Map.prototype.startFadeOut = function(duration, white) {
    this.createFadeSprite(white);
    _Scene_Map_startFadeOut.call(this, duration, white);
  };

  Scene_Map.prototype.createFadeSprite = function(white) {
    if (!this._fadeSprite) {
      this._fadeSprite = new ScreenSprite();
      this.addChild(this._fadeSprite);
    }
    if (white) {
      this._fadeSprite.setWhite();
    } else {
      this._fadeSprite.setBlack();
    }
  };

  Scene_Map.prototype.updateFade = function() {
    if (this._fadeDuration > 0) {
      const d = this._fadeDuration;
      if (this._fadeSign > 0) {
        this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
      } else {
        this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
      }
        this._fadeDuration--;
    }
  };

  // ----------------------------------------
  // Scene_Battle
  // ----------------------------------------

  const _Scene_Battle_startFadeIn = Scene_Battle.prototype.startFadeIn;
  Scene_Battle.prototype.startFadeIn = function(duration, white) {
    if (applyFadeIn()) {
      this._fadeSprite = new Sprite();
      this.addChild(this._fadeSprite);
      this._fadeSign = 1;
      this._fadeDuration = fadeInFrames;
      this._fadeSprite.opacity = 255;
      BattleFadeManager.startFadeIn();
    } else {
      _Scene_Battle_startFadeIn.call(this, duration, white);
    }
  };

  const _Scene_Battle_startFadeOut = Scene_Battle.prototype.startFadeOut;
  Scene_Battle.prototype.startFadeOut = function(duration, white) {
    if (applyFadeIn()) {
      this.removeChild(this._fadeSprite);
      this._fadeSprite = null;
    }
    _Scene_Battle_startFadeOut.call(this, duration, white);
  };


  const _Scene_Battle_updateFade = Scene_Battle.prototype.updateFade;
  Scene_Battle.prototype.updateFade = function() {
    if (applyFadeIn()) {
      if (this._fadeDuration > 0 && this._fadeSign === 1) { // fadein
        if (this._fadeDuration === fadeInFrames) { // at first
          BattleFadeManager.addChildren(this._fadeSprite);
        }
        this._fadeDuration--;
        var n = fadeInFrames - this._fadeDuration;
        BattleFadeManager.updateFadeIn(n, fadeInFrames);
        if (this._fadeDuration === 0) {
          this._fadeSprite.opacity = 0;
          BattleFadeManager.disposeBitmap();
        }
      } else {
        _Scene_Battle_updateFade.call(this);
      }
    } else {
      _Scene_Battle_updateFade.call(this);
    }
  };

})();
