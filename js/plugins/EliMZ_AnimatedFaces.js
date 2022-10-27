//==========================================================================
// EliMZ_AnimatedFaces.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_FaceWindow

@plugindesc ♦5.0.1♦ Animate the face image of the message box.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-animated-faces-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Animated faces in the message box.
● Different animations for when the message box is writing and when it is 
not (Idle and Talk animations).

============================================================================
How to use
============================================================================

You can use the face image in the same way that RPG Maker does. However, 
it is necessary to understand that each row of the image must represent 
only 1 character.
(I never tested with more than 1. Test it at your own risk).

Unlike the standard RPG Maker, you can have as many faces as you want in 
each row and also as many columns as you want.
For example, the default pattern works like this:

0 | 1 | 2 | 3
4 | 5 | 6 | 7

Each number represents a face. However, with this plugin, you can extend 
this (although maybe the editor will not show more than 4 faces per row), 
so that it can look like this:

0  | 1  | 2  | 3  | 4  | 5
6  | 7  | 8  | 9  | 10 | 11
12 | 13 | 14 | 15 | 16 | 17

(Use wisely. A very large image may take longer to load into memory and 
take up more space).

After creating your image, you must configure the plugin parameters.

♦ Face Settings ♦

• Image - This is the image file you will be targeting.

• Start Index - The position of the face at which the animation will start.

• Middle Index - When the message box is no longer writing, the face 
animation will only repeat up to this number. Useful for creating Idle 
face animations. 
If you don't want to use it, leave it with the same value as the End Index.

• End Index - When the message box is writing, the face animation will 
repeat up to this number. It must be equal to or greater than the 
Middle Index.

• Frame Speed ​​- How fast the face will change index.

Example:

Start index = 0
Middle Index = 1
End Index = 3

If the message box is writing, the face will repeat the index in this 
order:
0, 1, 0, 1, 0, 1...etc.

Otherwise, it will repeat the index in this order:
0, 1, 2, 3, 0, 1, 2, 3, etc...

============================================================================

@param switchId
@text Disable Switch Id
@type switch
@desc If this switch is on, the face will not animate.
@default 0

@param faceSettings
@text Face Settings
@type struct<faceSettingsSt>[]
@desc Set here all your animated face settings.
@default

*/

/* --------------------------- FACE IMAGE SETTINGS -------------------------- */
{

/*~struct~faceSettingsSt:

@param image
@text Face image
@type file
@dir img/faces
@desc The first index of this animated face.
@default
    
@param startIndex
@text Start Index
@type number
@desc The first index of this animated face.
@default 0

@param middleIndex
@text Idle Index
@type number
@desc The last index of the animated face when message is not writting.
@default 0

@param endIndex
@text Talking Index
@type number
@desc The last index of the animated face when message is writting. Must be equal or higher than Idle.
@default 0

@param frameSpeed
@text Frame Speed
@type number
@desc How fast, in frames, the face will change from start index to endIndex.
@default 30

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_AnimatedFaces = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

/* -------------------------- ANIMATED FACE SPRITE -------------------------- */
class Sprite_AnimatedFace extends Sprite{

    initialize(bitmap){
        super.initialize(bitmap)
        this.frameCount = 0
        this.faceIndex = 0
        this.updateVisibilityFunction = () => undefined
        this.setFrame(0, 0, ImageManager.faceWidth, ImageManager.faceHeight)
        this.move(4, 4)
        this.setUpdateVisibilityFunction()
    }

    setUpdateVisibilityFunction(){
        if(Imported.Eli_FaceWindow){
            this.updateVisibilityFunction = this.updateVisibilityWithFaceWindow
        }else{
            this.updateVisibilityFunction = this.updateVisibilityWithoutFaceWindow
        }
    }

    updateVisibilityWithFaceWindow(){
        return Eli.FaceWindow.isFaceWindowDisabled() && Plugin.isAnimationEnabled() 
    }

    updateVisibilityWithoutFaceWindow(){
        return Plugin.isAnimationEnabled()
    }

    refreshSettings(){
        this.faceIndex = $gameMessage.faceIndex()
        this.frameCount = 0
    }

    refreshFaceFrame(){
        const faceWidth = ImageManager.faceWidth
        const faceHeight = ImageManager.faceHeight
        const rows = this.bitmap.height / faceWidth
        const cols = this.bitmap.width / faceHeight
        const index = this.faceIndex
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
    
        this.setFrame(x, y, faceWidth, faceHeight)
    }

    refreshFaceBitmap(){
        const faceName = $gameMessage.faceName()
        const faceIndex = $gameMessage.faceIndex()

        this.refreshSettings()
        this.bitmap = ImageManager.loadFace(faceName)
        this.bitmap.addLoadListener(this.refreshFaceFrame.bind(this))
        Plugin.setFaceSettings(faceName, faceIndex)
    }

    updateAnimation(maxIndex){
        if(this.canUpdateAnimation()){
            this.frameCount++
    
            if(this.canChangeFaceIndex()){
                this.changeFaceIndex(maxIndex)
                this.refreshFaceFrame()
                this.frameCount = 0
            }
        }
    }

    canChangeFaceIndex(){
        return this.frameCount >= Plugin.getFaceSettings().frameSpeed
    }

    changeFaceIndex(limitIndex){
        if(this.faceIndex >= limitIndex){
            this.faceIndex = Plugin.getFaceSettings().startIndex
        }else{
            this.faceIndex += 1
        }
    }

    canUpdateAnimation(){
        return $gameMessage.faceName()
    }

    update(){
        super.update()
        this.updateVisibility()
    }

    updateVisibility(){
        this.visible = this.updateVisibilityFunction()
    }

}

/* ------------------------------ PLUGIN OBJECT ----------------------------- */
Eli.AnimatedFaces = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-animated-faces-for-rpg-maker-mz",
    parameters: {
        switchId: 0,
        faceSettings: [{
            endIndex: 0,
            frameSpeed: 0,
            image: '',
            middleIndex: 0,
            startIndex: 0,
        }],
    },
    alias: {},
    settings: {
        endIndex: 0,
        frameSpeed: Infinity,
        image: "",
        middleIndex: 0,
        startIndex: 0,
    },
    Sprite_AnimatedFace: Sprite_AnimatedFace,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        let parameters = this.parameters
        parameters = PluginManager.parameters("EliMZ_AnimatedFaces")
        parameters.switchId = Number(parameters.switchId)
        parameters.faceSettings = JSON.parse(parameters.faceSettings)

        for(let i = 0; i < parameters.faceSettings.length; i++){
            parameters.faceSettings[i] = this.parseFaceSettings(parameters.faceSettings[i])
        }

        this.parameters = parameters
    },

    parseFaceSettings(settings){
        const param = JSON.parse(settings)
        param.startIndex = Number(param.startIndex)
        param.middleIndex = Number(param.middleIndex)
        param.endIndex = Number(param.endIndex)
        param.frameSpeed = Number(param.frameSpeed)

        return param
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    createEmptyFaceSetting(faceName, faceIndex){
        return {
            endIndex: 0,
            frameSpeed: Infinity,
            image: faceName,
            middleIndex: 0,
            startIndex: faceIndex,
        }
    },

    getFaceSettings(){
        return this.settings
    },

    setFaceSettings(faceName, faceIndex){
        const getSettings =  item => item.image === faceName && item.startIndex === faceIndex
        this.settings =  this.param().faceSettings.find(getSettings) || 
                                    this.createEmptyFaceSetting(faceName, faceIndex)
    },

    isAnimationDisabled(){
        const switchId = this.param().switchId
        return $gameSwitches.value(switchId)
    },

    isAnimationEnabled(){
        return !this.isAnimationDisabled()
    }
}

const Plugin = Eli.AnimatedFaces
const Alias = Eli.AnimatedFaces.alias

Plugin.initialize()

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
{

/* ------------------------------ DEFAULT CODE ------------------------------ */

Alias.Window_Message_initialize = Window_Message.prototype.initialize
Window_Message.prototype.initialize = function(rect) {
    Alias.Window_Message_initialize.call(this, rect)
    this.createFaceSprite()
}

Alias.Window_Message_initMembers = Window_Message.prototype.initMembers 
Window_Message.prototype.initMembers = function() {
    this.faceSprite = null
    Alias.Window_Message_initMembers.call(this)
}

Alias.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    if($gameMessage.faceName()){
        this.getFaceSprite().refreshFaceBitmap()
    }
    Alias.Window_Message_startMessage.call(this)
}

Alias.Window_Message_updateInput = Window_Message.prototype.updateInput
Window_Message.prototype.updateInput = function() {
    const alias = Alias.Window_Message_updateInput.call(this)
    if(alias){
        this.updateIdleFaceAnimation()
    }
    
    return alias
}

Alias.Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace
Window_Message.prototype.loadMessageFace = function() {
    Alias.Window_Message_loadMessageFace.call(this)
    if(Plugin.isAnimationEnabled()){
        this._faceBitmap = null
    }
    this.getFaceSprite().refreshFaceBitmap()
}

/* -------------------------------- INHERITED ------------------------------- */

Alias.Window_Message_processCharacter = Window_Message.prototype.processCharacter
Window_Message.prototype.processCharacter = function(textState) {
    Alias.Window_Message_processCharacter.call(this, textState)
    this.updateTalkingFaceAnimation()
}

/* ----------------------------------- NEW ---------------------------------- */

Window_Message.prototype.createFaceSprite = function(){
    this.faceSprite = new Sprite_AnimatedFace()
    this.addInnerChild(this.faceSprite)
}

Window_Message.prototype.getFaceSprite = function(){
    return this.faceSprite
}

Window_Message.prototype.updateIdleFaceAnimation = function() {
    this.getFaceSprite().updateAnimation(Plugin.getFaceSettings().middleIndex)
}

Window_Message.prototype.updateTalkingFaceAnimation = function() {
    this.getFaceSprite().updateAnimation(Plugin.getFaceSettings().endIndex)
}

}

}