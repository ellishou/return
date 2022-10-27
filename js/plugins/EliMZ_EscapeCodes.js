//============================================================================
// EliMZ_EscapeCodes.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.1♦ Adds replacer's escape codes to be used on any window!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-escape-codes-for-rpg-maker-mv

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

Add several escape codes to windows that can show a lot of game 
information!

============================================================================
How to use
============================================================================

Plugin Parameters

Now you can choose the escape codes you want. 
You can replace the default ones(those already set on the plugin parameter), 
with something you like. 
But you can't add more to the plugin parameter. 
Just change the existing ones.

But, before doing that, please take a look below to understand how it 
works.

Instructions

Almost plug and play!
All you need to know is the escape codes. But first I will give you a list 
to help you memorize what every escape codes mean:

AC      = Refers to actor
MB      = Refers to a party member
CL      = Refers to class
NK      = Nickname
LV      = Level
XP      = Current Xp
XP?     = Next required Exp
PR      = Default parameters
PRC     = Current parameters
PRX     = X parameters
PRS     = Special parameters
PRO     = Profile
SK      = Skills
EQ      = Equipments
MT      = Meta
IC      = Icon
IT      = Item
WE      = Weapon
AR      = Armor
EN      = Enemy
ST      = State
MAP     = Map
DN      = Display name
EV      = Event
QT      = Quantity
OBJ     = Refers to a property of the current object
BTNUM   = Battles Fought
BTWIN   = Battles Win
BTESC   = Battles escape
TLT   = Game title
STEP    = Step numbers
ALMB    = Alive members
PRTSZ   = Party Size
PLTM    = Play Time
EVAL    = Formula. Can be any valid javascript code.

Knowing that will help you using the plugin. Below contains how you can use
the escape codes in the windows and every possible combination of them.

• Actors: Always start with AC.
• Members: Always start with MB.
\AcCl[ID] - Returns the name of this class for this actor id.
\AcNk[ID] - Nickname of this actor.
\AcLv[ID] - Level of this actor.
\AcXp[ID] - Current Exp.
\AcXp?[ID] - Next required Exp.

\AcPr[ActorId, ParamId] - The value of the parameter of the actor id 
specified.
0 --> Max HP (MHP)
1 --> Max MP (MMP)
2 --> Attack (ATK)
3 --> Defense (DEF)
4 --> Magic Attack Power (MAT)
5 --> Magic Defense Power (MDF)
6 --> Agility (AGI)
7 --> Luck (LUK)

\AcPrX[ActorId, ParamId] - The value(%) of the Ex parameter of the actor id 
specified.
0 --> Hit Rate (HIT)
1 --> Evasion Rate (EVA)
2 --> Critical Rate (CRI)
3 --> Critical Evasion (CEV)
4 --> Magic Evasion (MEV)
5 --> Magic Reflection (MRF)
6 --> Counter Attack (CNT)
7 --> HP Regeneration (HRG)
8 --> MP Regeneration (MRG)
9 --> TP Regeneration (TRG)

\AcPrS[ActorId, ParamId] - The value(%) of the Special parameter of the 
actor id specified.
0 --> Target Rate (TGR)
1 --> Guard Effect (GRD)
2 --> Recovery Effect (REC)
3 --> Pharmacology (PHA)
4 --> MP Cost Rate (MCR)
5 --> TP Charge Rate (TCR)
6 --> Physical Damage Rate (PDR)
7 --> Magical Damage Rate (MDR)
8 --> Floor Damage Rate (FDR)
9 --> Experience Rate (EXR)

\AcPrC[ActorId, ParamId] - This is for current parameters.
0 --> Current Hp
1 --> Current Mp
2 --> Current Tp

\AcPro[ID] - The profile.
\AcSk[ActorId, SkillIndex] - It will return the skill of the actor in the 
specified index.
\AcEq[ActorId, EquipSlot] - The equipment name on the specified slot.
\AcMt[ActorId, MetaName] - It will return the value of the meta tag of this
actor.
\AcObj[ID, Property] - Means that you can show a property of an object 
using their names. Ex: \AcObj[1, _hp]

NOTE: You can safely replace AC(for actors) with MB(For party members).
The difference is that using MB you will have to reference not for the ID,
but instead, with the party position/index.
Ex:
\MbCl[INDEX] 
\MbPro[INDEX]

• Class:
\Cl[ID] - Return the name of the Class id.
\ClMt[classId, MetaName] - It will return the value of the meta tag of this 
class.

• Skills:
\Sk[ID] - The name of this skill id.
\SkIc[ID] - The name of this skill id with icon.
\SkMt[SkillId, MetaName] - It will return the value of the meta tag of this 
skill.

• Items:
\It[ID] - The name of this item id.
\ItIc[ID] - The name of this item id with icon.
\ItMt[ItemId, MetaName] - It will return the value of the meta tag of this 
item.
\ItQt[ID] - Item number.

• Weapons:
\We[ID] - The name of this weapon id.
\WeIc[ID] - The name of this weapon id with icon.
\WeMt[WeaponId, MetaName] - It will return the value of the meta tag of 
this weapon.
\WeQt[ID] - Weapon number.

• Armors:
\Ar[ID] - The name of this armor id.
\ArIc[ID] - The name of this armor id with icon.
\ArMt[ArmorId, MetaName] - It will return the value of the meta tag of this 
armor.
\ArQt[ID] - Armor number.

• Enemy:
\En[ID] - The name of this enemy id.
\EnPr[EnemyId, ParamId] - The default parameter of this enemy id.
\EnMt[EnemyId, MetaName] - It will return the value of the meta tag of this 
enemy.

• States:
\St[ID] - The name of this state id.
\StIc[ID] - The name of this state id with icon.
\StMt[StateId, MetaName] - It will return the value of the meta tag of this 
state.

• Map:
\Map[ID] - The name of the map id. If zero, will return the current map 
name.
\MapDn - The display name of the current map.
\MapMt[MetaName] - It will return the value of the meta tag of current map.

• Event:
\EvNm[ID] - The name of the event id. If the ID is zero, it will return the 
name of the current event.
\EvX[ID] - The X position.
\EvY[ID] - The X position.
\EvPos[ID] - The X and Y position.
\EvDir[ID] - The direction.

• Misc:
\BtNum - Returns the number of battles already fought.
\BtWin - Returns the number of battles won.
\BtEsc - The number of battle escapes.
\TLT - The game title.
\Step - The number of steps.
\AlMb - The number of alive members.
\PrtSz - The size of the party.
\PlTm - The playtime.
\Var[ID, Index] - Show a value from an array of a game variable.
\Eval[formula] - You can show anything in the message using formulas.
This is an advanced one and you have to know a minimum of javascript or
at least the script calls of MZ.
\SV[VARID, EventId, MapId] - Return the value of the self variable informed.
Optionally, you can set a MapId and EventId. But if leave empty, it will 
be set automatically.
* Requires EliMZ_SelfVariables.

• Custom Parameters(Only works with Eli Custom Parameters):
\AcCtPr[ID] - Returns the custom parameter value for the correponding Id.
\AcCtPrC[ID] - Returns the current value of a custom parameter HP/MP/TP 
like.
\MbCtPr[ID] - Returns the custom parameter value for the correponding Id.
\MbCtPrC[ID] - Returns the current value of a custom parameter HP/MP/TP 
like.

Now there are two new special escape codes, that needs a better 
explanation:

• The new Eval escape code 

I had to create a new one, because if you use the older like below, it 
will not properly eval the code:
\Eval[ $gameParty.members()[0].name() ]
Because there is another bracket character in the formula "[0]"
So now, you can use this one instead:

=|YourText|= - This will Eval the text between =| |=

Example:

=| $gameParty.members()[0].name() |=

NOTE²: The old one was not removed.

• The conditional message escape code:

?{condition ? result1 : result2}? - This is a conditional message.
If the condition is true, then it will return result1. 
Otherwise, result 2.

Example:

?{$gameVariables.value(1) > 0 ? Is greater than zero : Is less than zero}?

If the variable 1 is higher than 0, it will return the message "Is greater 
than zero".
Otherwise, it will return the message "Is less than zero".

The only thing you should now about these two, is that you cannot use a 
formula together with a escape code. If you use, the text will not 
convert properly:

?{$gameVariables.value(1) > 0 ? scriptCall \v[1] : scriptCall \i[34]}?

=|scriptCall \i[24]|=

============================================================================
Update Log
============================================================================

https://tinyurl.com/escapeCodesLog

============================================================================

@param iconOrder
@text Icon after name
@type boolean
@desc True to drawn the icon after the name. False otherwise.
@default true

@param actorCodes
@text Actor
@type struct<escapeCodes>[]
@desc Actor escape codes
@default ["{\"name\":\"Class\",\"reg\":\"ACCL\"}","{\"name\":\"Nickname\",\"reg\":\"ACNK\"}","{\"name\":\"Level\",\"reg\":\"ACLV\"}","{\"name\":\"Current Exp\",\"reg\":\"ACXP\"}","{\"name\":\"Next required Exp\",\"reg\":\"ACXP\\\\?\"}","{\"name\":\"Profile\",\"reg\":\"ACPRO\"}","{\"name\":\"Skills\",\"reg\":\"ACSK\"}","{\"name\":\"Equip\",\"reg\":\"ACEQ\"}","{\"name\":\"Normal Parameters\",\"reg\":\"ACPR\"}","{\"name\":\"X Parameters\",\"reg\":\"ACPRX\"}","{\"name\":\"S Parameters\",\"reg\":\"ACPRS\"}","{\"name\":\"Current Normal Parameters(HP/MP/TP)\",\"reg\":\"ACPRC\"}","{\"name\":\"Meta\",\"reg\":\"ACMT\"}","{\"name\":\"Object / Property\",\"reg\":\"ACOBJ\"}"]

@param classCodes
@text Class
@type struct<escapeCodes>[]
@desc Class Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"CL\"}","{\"name\":\"Meta\",\"reg\":\"CLMT\"}"]

@param skillCodes
@text Skill
@type struct<escapeCodes>[]
@desc Skill Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"SK\"}","{\"name\":\"Name with icon\",\"reg\":\"SKIC\"}","{\"name\":\"Meta\",\"reg\":\"SKMT\"}","{\"name\":\"Description\",\"reg\":\"SKDCR\"}"]

@param itemCodes
@text Item
@type struct<escapeCodes>[]
@desc Items Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"IT\"}","{\"name\":\"Name with icon\",\"reg\":\"ITIC\"}","{\"name\":\"Meta\",\"reg\":\"ITMT\"}","{\"name\":\"Item amount\",\"reg\":\"ITQT\"}","{\"name\":\"Description\",\"reg\":\"ITDCR\"}"]

@param weaponCodes
@text Weapon
@type struct<escapeCodes>[]
@desc Weapon Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"WE\"}","{\"name\":\"Name with icon\",\"reg\":\"WEIC\"}","{\"name\":\"Meta\",\"reg\":\"WEMT\"}","{\"name\":\"Amount\",\"reg\":\"WEQT\"}","{\"name\":\"Description\",\"reg\":\"WEDCR\"}"]

@param armorCodes
@text Armor
@type struct<escapeCodes>[]
@desc Armor Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"AR\"}","{\"name\":\"Name with icon\",\"reg\":\"ARIC\"}","{\"name\":\"Meta\",\"reg\":\"ARMT\"}","{\"name\":\"Amount\",\"reg\":\"ARQT\"}","{\"name\":\"Description\",\"reg\":\"ARDCR\"}"]

@param enemyCodes
@text Enemy
@type struct<escapeCodes>[]
@desc Enemy Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"EN\"}","{\"name\":\"Normal Parameters\",\"reg\":\"ENPR\"}","{\"name\":\"Meta\",\"reg\":\"ENMT\"}"]

@param stateCodes
@text States
@type struct<escapeCodes>[]
@desc State Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"ST\"}","{\"name\":\"Name with icon\",\"reg\":\"STIC\"}","{\"name\":\"Meta\",\"reg\":\"STMT\"}"]

@param mapCodes
@text Map
@type struct<escapeCodes>[]
@desc Map Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"MAP\"}","{\"name\":\"Display Name\",\"reg\":\"MAPDN\"}","{\"name\":\"Meta\",\"reg\":\"MAPMT\"}"]

@param eventCodes
@text Event
@type struct<escapeCodes>[]
@desc Event Escape codes
@default ["{\"name\":\"Name\",\"reg\":\"EVNM\"}","{\"name\":\"Position X\",\"reg\":\"EVX\"}","{\"name\":\"Position Y\",\"reg\":\"EVY\"}","{\"name\":\"Position X & Y\",\"reg\":\"EVPOS\"}","{\"name\":\"Direction\",\"reg\":\"EVDIR\"}"]

@param partyCodes
@text Party
@type struct<escapeCodes>[]
@desc Party Escape codes
@default ["{\"name\":\"Class\",\"reg\":\"MBCL\"}","{\"name\":\"Nickname\",\"reg\":\"MBNK\"}","{\"name\":\"Level\",\"reg\":\"MBLV\"}","{\"name\":\"Current Exp\",\"reg\":\"MBXP\"}","{\"name\":\"Next required exp\",\"reg\":\"MBXP\\\\?\"}","{\"name\":\"Profile\",\"reg\":\"MBPRO\"}","{\"name\":\"Skills\",\"reg\":\"MBSK\"}","{\"name\":\"Equips\",\"reg\":\"MBEQ\"}","{\"name\":\"Normal Parameters\",\"reg\":\"MBPR\"}","{\"name\":\"X Parameters\",\"reg\":\"MBPRX\"}","{\"name\":\"S Parameters\",\"reg\":\"MBPRS\"}","{\"name\":\"Current Parameter Value(HP/MP/TP)\",\"reg\":\"MBPRC\"}","{\"name\":\"Meta\",\"reg\":\"MBMT\"}","{\"name\":\"Object / Property\",\"reg\":\"MBOBJ\"}"]

@param miscCodes
@text Others
@type struct<escapeCodes>[]
@desc Other Escape codes
@default ["{\"name\":\"Battle Numbers\",\"reg\":\"BTNUM\"}","{\"name\":\"Battles Won\",\"reg\":\"BTWIN\"}","{\"name\":\"Battles Escape\",\"reg\":\"BTESC\"}","{\"name\":\"Game Title\",\"reg\":\"TLT\"}","{\"name\":\"Steps\",\"reg\":\"STEP\"}","{\"name\":\"Alive Members\",\"reg\":\"ALMB\"}","{\"name\":\"Party Size\",\"reg\":\"PRTSZ\"}","{\"name\":\"Play Time\",\"reg\":\"PLTM\"}","{\"name\":\"Variable Array\",\"reg\":\"VAR\"}"]

@param customParametersCodes
@text Custom Parameters
@type struct<escapeCodes>[]
@desc Custom Parameter Escape codes. Only works with Eli Custom Parameters.
@default ["{\"name\":\"Actor Parameter\",\"reg\":\"ACCTPR\"}","{\"name\":\"Actor Current Parameter(HP TYPES)\",\"reg\":\"ACCTPRC\"}","{\"name\":\"Party Member Parameter\",\"reg\":\"MBCTPR\"}","{\"name\":\"Party Member Current Parameter(HP TYPES)\",\"reg\":\"MBCTPRC\"}"]

*/

/* ------------------------------ ESCAPE CODES ------------------------------ */
{
/*~struct~escapeCodes:

@param name
@text Name
@type name
@desc The name of the escape code. Do nothing, is just a label.
@default

@param reg
@text Code
@type name
@desc The letter used to execute this escape code.
Only A-Z. Not case sensitive.
@default

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EscapeCodes = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.EscapeCodes = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-escape-codes-for-rpg-maker-mv",
    parameters: {
        iconOrder: true,
        codes: {
            actor: [ {name:'', reg:''} ],
            class: [ {name:'', reg:''} ],
            skill: [ {name:'', reg:''} ],
            item:  [ {name:'', reg:''} ],
            weapon: [ {name:'', reg:''} ],
            armor: [ {name:'', reg:''} ],
            enemy: [ {name:'', reg:''} ],
            state: [ {name:'', reg:''} ],
            map:   [ {name:'', reg:''} ],
            event: [ {name:'', reg:''} ],
            party: [ {name:'', reg:''} ],
            misc:  [ {name:'', reg:''} ],
            customParameters: [ {name:'', reg:''} ],
        },
    },
    alias: {},
    openIf: '?{',
    closeIf: '}?',
    openEval: '=|',
    closeEval: '|=',
    currentParam: ['_hp', '_mp', '_tp'],
    currentCustomParams: [],
    list: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        if(Imported.Eli_CustomParameter){
            this.initializeCustomParameters()
        }
        this.initAllCodes()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters.iconOrder = parameters.iconOrder
        this.parameters.codes = {
            actor: parameters.actorCodes,
            class: parameters.classCodes,
            skill: parameters.skillCodes,
            item:  parameters.itemCodes,
            weapon: parameters.weaponCodes,
            armor: parameters.armorCodes,
            enemy: parameters.enemyCodes,
            state: parameters.stateCodes,
            map:   parameters.mapCodes,
            event: parameters.eventCodes,
            party: parameters.partyCodes,
            misc:  parameters.miscCodes,
            customParameters: parameters.customParametersCodes
        } 
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    initializeCustomParameters(){    
        const CParamPlugin = Eli.CustomParameter
        for(let i = 0; i < CParamPlugin.cParamsLength(); i++){

            if(CParamPlugin.isHpType(i)){
                const _name = CParamPlugin.get_name(i)
                this.currentCustomParams.push(_name)
            }else{
                const name = CParamPlugin.getShortName(i)
                this.currentCustomParams.push(name)
            }
        }
        
    },

    initAllCodes(){
        this.actorCodes()
        this.classCodes()
        this.skillCodes()
        this.itemCodes()
        this.weaponCodes()
        this.armorCodes()
        this.enemyCodes()
        this.statesCodes()
        this.mapCodes()
        this.eventCodes()
        this.partyCodes()
        this.miscCodes()
        this.customParameterCodes()
        this.finalCodes()
        this.selfVarEscape = this.list.filter(item => item.functionName === "getSelfVar").shift()
    },

    getCodes(){
        return this.parameters.codes
    },

    actorCodes(){
        const regs = this.getCodes().actor.map(item => item.reg)
        this.list.push(
            {functionName: 'getActorData',      reg: this.createRegex(regs[0], 1),  tag: 'class'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[1], 1),  tag: 'nick'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[2], 1),  tag: 'level'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[3], 1),  tag: 'currentExp'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[4], 1),  tag: 'nextRequireExp'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[5], 1),  tag: 'profile'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[6], 1),  tag: 'skills'},
            {functionName: 'getActorData',      reg: this.createRegex(regs[7], 1),  tag: 'equips'},
            {functionName: 'getActorParams',    reg: this.createRegex(regs[8], 1),  tag: 'params'},
            {functionName: 'getActorParams',    reg: this.createRegex(regs[9], 1),  tag: 'xParams'},
            {functionName: 'getActorParams',    reg: this.createRegex(regs[10], 1), tag: 'sParams'},
            {functionName: 'getActorParams',    reg: this.createRegex(regs[11], 1), tag: 'currentParamValue'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[12], 1), tag: 'actor'},
            {functionName: 'getActorObject',    reg: this.createRegex(regs[13], 1), tag: 'none'},
        )
    },

    classCodes(){
        const regs = this.getCodes().class.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'class'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[1], 1),  tag: 'class'},
        )
    },

    skillCodes(){
        const regs = this.getCodes().skill.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'skill'},
            {functionName: 'getDataNameIcon',   reg: this.createRegex(regs[1], 1),  tag: 'skill'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'skill'},
            {functionName: 'getDescription',    reg: this.createRegex(regs[3], 1),  tag: 'skill'},
        )
    },

    itemCodes(){
        const regs = this.getCodes().item.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'item'},
            {functionName: 'getDataNameIcon',   reg: this.createRegex(regs[1], 1),  tag: 'item'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'item'},
            {functionName: 'getItemNumber',     reg: this.createRegex(regs[3], 1),  tag: 'item'},
            {functionName: 'getDescription',    reg: this.createRegex(regs[4], 1),  tag: 'item'},
        );
    },

    weaponCodes(){
        const regs = this.getCodes().weapon.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'weapon'},
            {functionName: 'getDataNameIcon',   reg: this.createRegex(regs[1], 1),  tag: 'weapon'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'weapon'},
            {functionName: 'getItemNumber',     reg: this.createRegex(regs[3], 1),  tag: 'weapon'},
            {functionName: 'getDescription',    reg: this.createRegex(regs[4], 1),  tag: 'weapon'},
        )
    },

    armorCodes(){
        const regs = this.getCodes().armor.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'armor'},
            {functionName: 'getDataNameIcon',   reg: this.createRegex(regs[1], 1),  tag: 'armor'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'armor'},
            {functionName: 'getItemNumber',     reg: this.createRegex(regs[3], 1),  tag: 'armor'},
            {functionName: 'getDescription',    reg: this.createRegex(regs[4], 1),  tag: 'armor'},
        )
    },

    enemyCodes(){
        const regs = this.getCodes().enemy.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'enemy'},
            {functionName: 'getEnemyParams',    reg: this.createRegex(regs[1], 1),  tag: 'none'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'enemy'},
        );
    },

    statesCodes(){
        const regs = this.getCodes().state.map(item => item.reg)
        this.list.push(
            {functionName: 'getDataName',       reg: this.createRegex(regs[0], 1),  tag: 'state'},
            {functionName: 'getDataNameIcon',   reg: this.createRegex(regs[1], 1),  tag: 'state'},
            {functionName: 'getMetaFromData',   reg: this.createRegex(regs[2], 1),  tag: 'state'},
        );
    },

    mapCodes(){
        const regs = this.getCodes().map.map(item => item.reg)
        this.list.push(
            {functionName: 'getMapName',        reg: this.createRegex(regs[0], 1),  tag: 'none'},
            {functionName: 'getMapDisplayName', reg: this.createRegex(regs[1], 0),  tag: 'none'},
            {functionName: 'getMapMeta',        reg: this.createRegex(regs[2], 1),  tag: 'none'},
        );
    },

    eventCodes(){
        const regs = this.getCodes().event.map(item => item.reg)
        this.list.push(
            {functionName: 'getEventData',      reg: this.createRegex(regs[0], 1),  tag: 'name'},
            {functionName: 'getEventData',      reg: this.createRegex(regs[1], 1),  tag: 'x'},
            {functionName: 'getEventData',      reg: this.createRegex(regs[2], 1),  tag: 'y'},
            {functionName: 'getEventData',      reg: this.createRegex(regs[3], 1),  tag: 'pos'},
            {functionName: 'getEventData',      reg: this.createRegex(regs[4], 1),  tag: 'dir'},
        );
    },

    partyCodes(){
        const regs = this.getCodes().party.map(item => item.reg)
        this.list.push(
            {functionName: 'getMemberData',         reg: this.createRegex(regs[0], 1),  tag: 'class'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[1], 1),  tag: 'nick'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[2], 1),  tag: 'level'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[3], 1),  tag: 'currentExp'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[4], 1),  tag: 'nextRequireExp'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[5], 1),  tag: 'profile'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[6], 1),  tag: 'skills'},
            {functionName: 'getMemberData',         reg: this.createRegex(regs[7], 1),  tag: 'equips'},
            {functionName: 'getMemberParams',       reg: this.createRegex(regs[8], 1),  tag: 'params'},
            {functionName: 'getMemberParams',       reg: this.createRegex(regs[9], 1),  tag: 'xParams'},
            {functionName: 'getMemberParams',       reg: this.createRegex(regs[10], 1), tag: 'sParams'},
            {functionName: 'getMemberParams',       reg: this.createRegex(regs[11], 1), tag: 'currentParamValue'},
            {functionName: 'getMemberMetaFromData', reg: this.createRegex(regs[12], 1), tag: 'actor'},
            {functionName: 'getMemberObject',       reg: this.createRegex(regs[13], 1), tag: 'none'},
        )
    },

    miscCodes(){
        const regs = this.getCodes().misc.map(item => item.reg)
        this.list.push(
            {functionName: 'getBattlesNumbers', reg: this.createRegex(regs[0], 0),  tag: 'none'},
            {functionName: 'getBattlesWon',     reg: this.createRegex(regs[1], 0),  tag: 'none'},
            {functionName: 'getBattlesEscape',  reg: this.createRegex(regs[2], 0),  tag: 'none'},
            {functionName: 'getGameTitle',      reg: this.createRegex(regs[3], 0),  tag: 'none'},
            {functionName: 'getStepNumbers',    reg: this.createRegex(regs[4], 0),  tag: 'none'},
            {functionName: 'getAliveMembers',   reg: this.createRegex(regs[5], 0),  tag: 'none'},
            {functionName: 'getPartySize',      reg: this.createRegex(regs[6], 0),  tag: 'none'},
            {functionName: 'getPlayTime',       reg: this.createRegex(regs[7], 0),  tag: 'none'},
            {functionName: 'getVarArray',       reg: this.createRegex(regs[8], 1),  tag: 'none'},
            {functionName: 'getSelfVar',        reg: this.createRegex(regs[9], 1),  tag: 'none'},
        )
    },

    customParameterCodes(){
        if(Imported.Eli_CustomParameter){
            const regs = this.getCodes().customParameters.map(item => item.reg)
            this.list.push(
                {functionName: 'getActorCParams',   reg: this.createRegex(regs[0], 1),  tag: 'params'},
                {functionName: 'getActorCParams',   reg: this.createRegex(regs[1], 1),  tag: 'currentParamValue'},
                {functionName: 'getMemberCParams',  reg: this.createRegex(regs[2], 1),  tag: 'params'},
                {functionName: 'getMemberCParams',  reg: this.createRegex(regs[3], 1),  tag: 'currentParamValue'},
            )
        }
    },

    finalCodes(){
        this.list.unshift(
            {functionName: 'getEval',   reg: this.createRegex('EVAL', 1),   tag: 'none'}
        )
    },

    createRegex(escapeChar, args){
        switch(args){
            case 0: return new RegExp(`\\x1b${escapeChar}`, 'gi')
            case 1: return new RegExp(`\\x1b${escapeChar}\\[([^\\[]*)\\]`, 'gi')
            case 2: return new RegExp(`\\x1b${escapeChar}\\[([^\\[]*)\\[([^\\[]*)\\]\\]`, 'gi')
        }
    },

    getGlobalDataObject(type){
        const dataList = {
            actor: "$dataActors",
            class: "$dataClasses",
            skill: "$dataSkills",
            item: "$dataItems",
            weapon: "$dataWeapons",
            armor: "$dataArmors",
            enemy: "$dataEnemies",
            state: "$dataStates"
        }
        const data = dataList[type]

        return window[data]
    },

    getDescription(id, type){
        const data = this.getGlobalDataObject(type)
        const currentData = data[id]

        return currentData.description
    },

    getActorData(rawData, obj){
        let [actorId, id2] = Eli.String.removeSpaces(rawData).split(",")
        id2 = Number(id2)
        const actor = $gameActors.actor(Number(actorId))
        const actorInfo = {
            class: () => actor.currentClass().name,
            nick: () => actor.nickname(),
            level: () => actor.level,
            currentExp: () => actor.currentExp(),
            nextRequireExp: () => actor.nextRequiredExp(),
            profile: () => actor.profile(),
            skills: () => actor.skills()[id2] ? actor.skills()[id2].name : 'Empty',
            equips: () => actor.equips()[id2] ? actor.equips()[id2].name : 'Empty'
        }

        return actorInfo[obj]()
    },

    getActorParams(rawData, obj){
        let [actorId, paramId] = Eli.String.removeSpaces(rawData).split(",")
        paramId = Number(paramId)
        const actor = $gameActors.actor(Number(actorId))
        const currentParam = this.currentParam
        const actorInfo = {
            params: () => actor.param(paramId),
            xParams: () => actor.xparam(paramId) * 100 + '%',
            sParams: () => actor.sparam(paramId) * 100 + '%',
            currentParamValue: () => actor[currentParam[paramId]],
        }

        return actorInfo[obj]()
    },

    getActorObject(rawData, tag){
        let [actorId, anyObject] = Eli.String.removeSpaces(rawData).split(",")
        const actor = $gameActors.actor(Number(actorId))
        const object = actor[anyObject]

        return typeof(object) === 'function' ? actor[anyObject]() : object
    },

    getMemberData(rawData, obj){
        let [memberIndex, id2] = Eli.String.removeSpaces(rawData).split(",")
        id2 = Number(id2)
        const member = $gameParty.members()[Number(memberIndex)]
        const memberInfo = {
            class: () => member.currentClass().name,
            nick: () => member.nickname(),
            level: () => member.level,
            currentExp: () => member.currentExp(),
            nextRequireExp: () => member.nextRequiredExp(),
            profile: () => member.profile(),
            skills: () => member.skills()[id2] ? member.skills()[id2].name : 'Empty',
            equips: () => member.equips()[id2] ? member.equips()[id2].name : 'Empty'
        }

        return memberInfo[obj]()
    },

    getMemberParams(rawData, paramType){
        let [memberIndex, paramId] = Eli.String.removeSpaces(rawData).split(",")
        paramId = Number(paramId)
        const member = $gameParty.members()[+memberIndex]
        const currentParam = this.currentParam
        const memberInfo = {
            params: () => member.param(paramId),
            xParams: () => member.xparam(paramId) * 100 + '%',
            sParams: () => member.sparam(paramId) * 100 + '%',
            currentParamValue: () => member[currentParam[paramId]],
        }

        return memberInfo[paramType]()
    },

    getMemberObject(rawData, obj){
        let [memberIndex, anyObject] = Eli.String.removeSpaces(rawData).split(",")
        const member = $gameParty.members()[Number(memberIndex)]
        const property = member[anyObject]

        return typeof(property) === 'function' ? member[anyObject]() : property
    },

    getMemberMetaFromData(rawData, type){
        const [id, metaName] = Eli.String.removeSpaces(rawData).split(",")
        const data = this.getGlobalDataObject(type)
        const actorId = $gameParty.members()[id]._actorId
        const member = data[actorId]

        if(member && member.meta[metaName]){
            return member.meta[metaName]
        }else{
            return `This data ${type} doens't exist`
        }
    },

    getMetaFromData(rawData, type){
        const [id, metaName] = Eli.String.removeSpaces(rawData).split(",")
        const data = this.getGlobalDataObject(type)
        const thisData = data[id]

        if(thisData && thisData.meta[metaName]){
            return thisData.meta[metaName]
        }else{
            return `This data ${type} doens't exist`
        }
    },

    getDataName(rawData, type){
        const id = Number(rawData)
        const data = this.getGlobalDataObject(type)

        return data[id].name
    },

    getDataNameIcon(rawData, type){
        const id = Number(rawData)
        const data = this.getGlobalDataObject(type)
        const currentData = data[id]
        const iconBefore = `\x1bi[${currentData.iconIndex}] ${currentData.name} `
        const iconAfter = `${currentData.name} \x1bi[${currentData.iconIndex}]`
        const text = Eli.EscapeCodes.parameters.iconOrder ? iconBefore : iconAfter

        return text
    },

    getItemNumber(rawData, type){
        const id = Number(rawData)
        const item = this.getGlobalDataObject(type)[id]

        return $gameParty.numItems(item)
    },

    getEnemyParams(rawData){
        const [enemyId, paramId] = Eli.String.removeSpaces(rawData).split(",")
        return $dataEnemies[enemyId].params[paramId]
    },

    getMapName(id){
        id = Number(id)
        const mapId = id || $gameMap.mapId()
        
        return $dataMapInfos[mapId].name
    },

    getMapDisplayName(){
        return $dataMap.displayName
    },

    getMapMeta(metaName){
        return $dataMap.meta[metaName] ? $dataMap.meta[metaName] : `This meta doens't exist`
    },

    getEventData(id, tag){
        id = Number(id)
        const eventId = id || $gameMap._interpreter._eventId
        const event = $gameMap.events().find(item => item._eventId === eventId)

        if(event){
            const eventInfo = {
                name: () => event.event().name,
                x: () => event._x,
                y: () => event._y,
                pos: () => `${event._x},${event._y}`,
                dir: () => event._direction
            }

            return eventInfo[tag]()
        }

        return 'Not found'
    },

    getBattlesNumbers(){
        return $gameSystem.battleCount()
    },

    getBattlesWon(){
        return $gameSystem.winCount()
    },

    getBattlesEscape(){
        return $gameSystem.escapeCount()
    },

    getGameTitle(){
        return $dataSystem.gameTitle
    },

    getStepNumbers(){
        return $gameParty.steps()
    },

    getAliveMembers(){
        return $gameParty.aliveMembers().length
    },

    getPartySize(){
        return $gameParty.size()
    },

    getPlayTime(){
        return $gameSystem.playtimeText()
    },

    getVarArray(rawData){
        const [varId, index] = Eli.String.removeSpaces(rawData).split(",")
        const id = Number(varId)
        
        return $gameVariables.value(id)[Number(index)]
    },

    getSelfVar(selfVarKey){
        let [varId, eventId = 0, mapId = 0] = Eli.String.removeSpaces(selfVarKey).split(",")
        mapId = Number(mapId) || $gameMap._interpreter.getTargetMapIdSelfVariable() || $gameMap.mapId()
        eventId = Number(eventId) || $gameMap._interpreter.getTargetEventIdSelfVariable()
        const id = Number(varId)
        const key = [mapId, eventId, id]

        return $gameVariables.selfValue(key)
    },

    getIfRawText(text){
        const start = text.indexOf(this.openIf)
        const end = text.indexOf(this.closeIf) + 2

        return text.substring(start, end)
    },

    getIfFormula(text){
        const start = text.indexOf(this.openIf) + 2
        const end = text.indexOf(this.closeIf)
        
        return text.substring(start, end)
    },

    getCondition(formula){
        const end = formula.indexOf('?')

        return formula.substring(0, end)
    },

    getIfResult(formula){
        const start = formula.indexOf('?') + 1
        const end = formula.indexOf(':')
        let result = formula.substring(start, end)
        result = Eli.String.removeSpaces(result)

        try {
            return eval(result)
        }catch(e){
            return result
        }
    },

    getElseResult(formula){
        const start = formula.indexOf(':') + 1
        let result = formula.substring(start)
        result = Eli.String.removeSpaces(result)

        try {
            return eval(result)
        }catch(e){
            return result
        }
    },

    evalTernary(text){ 
        const rawText = this.getIfRawText(text)
        const formula = this.getIfFormula(rawText)
        const condition = this.getCondition(formula)
        const result1 = this.getIfResult(formula)
        const result2 = this.getElseResult(formula)
        const final = eval(condition) ? result1 : result2

        text = text.replace(rawText, final)

        return text
    },

    getEval(formula){
        return eval(formula)
    },

    getRawEvalText(text){
        const start = text.indexOf(this.openEval)
        const end = text.indexOf(this.closeEval) + 2
        const finalText = text.substring(start, end)

        return finalText
    },

    getEvalFormula(text){
        const start = text.indexOf(this.openEval) + 2
        const end = text.indexOf(this.closeEval)
        const finalText = text.substring(start, end)

        return finalText
    },

    getNewEval(text){
        const rawText = this.getRawEvalText(text)
        const formula = this.getEvalFormula(text)

        var result = formula
        try{
            var result = eval(formula)
        }catch(e){}

        text = text.replace(rawText, result)

        return text
    },

    getActorCParams(rawData, obj){
        const [actorId, paramId] = Eli.String.removeSpaces(rawData).split(",")
        const actor = $gameActors.actor(Number(actorId))
        const currentParam = this.currentCustomParams
        const actorInfo = {
            params: () => actor.cparam(Number(paramId)),
            currentParamValue: () => actor[currentParam[paramId]],
        }

        return actorInfo[obj]()
    },

    getMemberCParams(rawData, paramType){
        const [memberIndex, paramId] = Eli.String.removeSpaces(rawData).split(",")
        const member = $gameParty.members()[Number(memberIndex)]
        const currentParam = this.currentCustomParams
        const memberInfo = {
            params: () => member.cparam(Number(paramId)),
            currentParamValue: () => member[currentParam[paramId]],
        }

        return memberInfo[paramType]()
    },
    
    convertEscapeCharacters(text){
        const escapeCodes = this.list

        if(text){

            let maxLoop = 0
            while(text.includes(Plugin.openIf) && maxLoop < 5){
                text = this.evalTernary(text)
                maxLoop++
            }

            maxLoop = 0
            while(text.includes(Plugin.openEval) && maxLoop < 5){
                text = this.getNewEval(text)
                maxLoop++
            }
        }

        for(const {reg, functionName, tag} of escapeCodes){
            text = text.replace(reg, function(){
                    return this[functionName](arguments[1], tag)
            }.bind(this))
        }

        return text
    },

    convertSvVarOnly(text){
        const {reg, functionName, tag} = this.selfVarEscape
        text = text.replace(reg, function(){
            return this[functionName](arguments[1], tag)
        }.bind(this))

        return text
    },

}

const Plugin = Eli.EscapeCodes
const Alias = Eli.EscapeCodes.alias

Plugin.initialize()

/* -------------------------------- ELI UTILS ------------------------------- */
if(Imported.Eli_SelfVariables){

Alias.Eli_Utils_convertEscapeVariablesOnly = Eli.Utils.convertEscapeVariablesOnly
Eli.Utils.convertEscapeVariablesOnly = function(text){
    text = Alias.Eli_Utils_convertEscapeVariablesOnly.call(this, text)
    text = Plugin.convertSvVarOnly(text)

    return text
}

}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = Alias.Window_Base_convertEscapeCharacters.call(this, text)
    text = Plugin.convertEscapeCharacters(text)

    return text
}

}

/* ------------------------------ COMPATIBILITY ----------------------------- */
/* 
    Talvez isso seja inútil. Não lembro porque coloquei isso. 
    Talvez para converter escape codes de variáveis dentro de variáveis.
    Mas desabilitando isso, o Word Wrap do Yanfly funciona.
*/
if(!Imported.Eli_GlobalText){

// Alias.Window_Base_drawTextEx = Window_Base.prototype.drawTextEx
// Window_Base.prototype.drawTextEx = function(text, x, y) {
//     if(text){
//         text = this.convertEscapeCharacters(text)
//     }

//     return Alias.Window_Base_drawTextEx.call(this, text, x, y)
// }

Alias.Game_Message_add = Game_Message.prototype.add
Game_Message.prototype.add = function(text) {
    text = Eli.Utils.convertEscapeVariablesOnly(text)
    Alias.Game_Message_add.call(this, text)
}

}

}