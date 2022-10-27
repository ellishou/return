//============================================================================
// Eli_CheckPoint.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.0♦ Check point system(autosave/load).
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-checkpoint-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

• Autosave / autoload
• Autoload option after game over
• Run a common event after autoload
• It is not possible to save manually in the auto slot

==============================================================================
How to use
==============================================================================

Plugin commands

• AutoSave > autosave the game in the autoslot.
• AutoLoad > autoload the autoslot.

Script calls:
• $checkPoint.save()
• $checkPoint.load()

==============================================================================
Update Log
==============================================================================

https://tinyurl.com/checkPointLog

==============================================================================

@param autoSaveHelp
@text Scene_Save - Help Text
@type text
@desc Choose a description for the autosave slot in Scene_Save.
@default You can't overwrite an autosave file.

@param autoLoadHelp
@text Scene_Load - Help Text
@type text
@desc Choose a description for the autosave slot in Scene_Load.
@default Continue from your autosave.

@param autoCommonEvent
@text Auto Load Common Event
@type common_event
@desc Choose a common event to play when the autosave file gets loaded.
@default 0

@param autoLoadInGameOver
@text AutoLoad in GameOver
@type boolean
@desc Choose if you want to load the game when the game is over.
@default true

@command cmd_save
@text Auto Save
@desc Execute an auto save.

@command cmd_load
@text Auto Load
@desc Execute an auto load.

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CheckPoint = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.CheckPoint = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-checkpoint-rpg-maker-mv",
    parameters: {
        autoSaveHelp: "",
        autoLoadHelp: "",
        autoCommonEvent: 0,
        autoLoadInGameOver: false,
    },
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initPluginCommands(){
        const commands = ["cmd_save", "cmd_load"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    param(){
        return this.parameters
    },

    isAutoLoad(){
        return DataManager.latestSavefileId() === 1
    },

    afterAutoLoad(){  
        this.loadCommonEvent()
        if(Imported.Eli_CheckPointWindow){
            $eliData.contents.checkPointWindow.isLoading = true
        }
    },

    loadCommonEvent() {
        $gameTemp.reserveCommonEvent(this.param().autoCommonEvent)
    },

    cmd_save(args){
        Eli.Utils.scene().executeAutosave()
    },

    cmd_load(args){
        Eli.Utils.scene().executeAutoload()
    },

}

const Plugin = Eli.CheckPoint
const Alias = Eli.CheckPoint.alias
window.$checkPoint = Eli.CheckPoint

Plugin.initialize()

/* ------------------------------- GAME SYSTEM ------------------------------ */
{

Alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad
Game_System.prototype.onAfterLoad = function() {
    Alias.Game_System_onAfterLoad.call(this)
    if(Plugin.isAutoLoad()) {
        Plugin.afterAutoLoad()
    }
}

}

/* ------------------------------- SCENE BASE ------------------------------- */
{

Scene_Base.prototype.executeAutoload = function() {
    DataManager.loadGame(0)
        .then(() => this.onAutoloadSuccess())
        .catch(() => this.onAutoloadFailure())
}

Scene_Base.prototype.onAutoloadSuccess = function() {
    SoundManager.playLoad()
    this.fadeOutAll()
    this.reloadMapIfUpdatedForAutoLoad()
    SceneManager.goto(Scene_Map)
    $gameSystem.onAfterLoad()
}

Scene_Base.prototype.onAutoloadFailure = function() {
    SoundManager.playBuzzer()
}

Scene_Base.prototype.reloadMapIfUpdatedForAutoLoad = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        const mapId = $gameMap.mapId()
        const x = $gamePlayer.x
        const y = $gamePlayer.y
        $gamePlayer.reserveTransfer(mapId, x, y)
        $gamePlayer.requestMapReload()
    }
}

}

/* ------------------------------- SCENE FILE ------------------------------- */
if(!Imported.Eli_HelpWindows){

Alias.Scene_File_create = Scene_File.prototype.create
Scene_File.prototype.create = function() {
    Alias.Scene_File_create.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

}

/* ----------------------------- SCENE GAME OVER ---------------------------- */
{

Alias.Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
Scene_Gameover.prototype.gotoTitle = function() {
    if(Plugin.param().autoLoadInGameOver) {
        Plugin.cmd_load()
    }else{
        Alias.Scene_Gameover_gotoTitle.call(this)
    }
}

}

/* ---------------------------- WINDOW SAVE LIST ---------------------------- */
if(!Imported.Eli_HelpWindows){

Alias.Window_SavefileList_updateHelp = Window_SavefileList.prototype.updateHelp
Window_SavefileList.prototype.updateHelp = function(){
    Alias.Window_SavefileList_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_SavefileList.prototype.updateMoreHelp = function(){
    if(this._mode === 'save'){
        this.updateSaveHelp()

    }else if(this._mode === 'load'){
        this.updateLoadHelp()
    }
}

Window_SavefileList.prototype.updateSaveHelp = function(){
    if(this.index() === 0 && this._autosave){
        console.log('oi')
        const text = Plugin.param().autoSaveHelp
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.saveMessage
        this._helpWindow.setText(text || '')
    }
}

Window_SavefileList.prototype.updateLoadHelp = function(){
    if(this.index() === 0 && this._autosave){
        const text = Plugin.param().autoLoadHelp
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.loadMessage
        this._helpWindow.setText(text || '')
    }
}

}

}