//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.40;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.40] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x165665=_0x11fa;(function(_0x1aef91,_0x3d5933){const _0x1d556a=_0x11fa,_0x2f5dd0=_0x1aef91();while(!![]){try{const _0x272db1=-parseInt(_0x1d556a(0x546))/0x1+-parseInt(_0x1d556a(0x321))/0x2+-parseInt(_0x1d556a(0x4da))/0x3+parseInt(_0x1d556a(0x2a5))/0x4+-parseInt(_0x1d556a(0x2ce))/0x5+parseInt(_0x1d556a(0x62f))/0x6*(-parseInt(_0x1d556a(0x2d1))/0x7)+parseInt(_0x1d556a(0x4e8))/0x8;if(_0x272db1===_0x3d5933)break;else _0x2f5dd0['push'](_0x2f5dd0['shift']());}catch(_0x123950){_0x2f5dd0['push'](_0x2f5dd0['shift']());}}}(_0x1f20,0xcbcde));function _0x1f20(){const _0x2cf28d=['Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','_eventIconSprite','isPosing','TbHEv','deleteEventLocation','Game_Map_events','FollowerSetGlobalChase','approach','createSaveEventLocationData','horizontal\x20mirror','Game_CommonEvent_isActive','Game_Map_parallelCommonEvents','setDashingEnabled','ubNMX','dmyXO','Map\x20%1\x20Variable\x20%2','setPattern','clear','OrIhF','JjWKw','mirror\x20vertical','GVudK','_tilemap','isMoving','TurnInPlaceDelay','length','registerSelfEvent','processMoveRouteTeleportToCharacter','push','onClickTrigger','GDzcE','_eventId','TOGGLE','remove','VariableGetSelfVariableID','indexOf','isAdvancedVariable','IconBufferX','MapVariables','nRImq','deleteSavedEventLocation','_counter','DashModifier','posNt','_expireCommonEvent','match','backY','fWiBi','isAirship','processMoveRouteJumpToCharacter','updateTilt','SuccessSwitchId','Game_Followers_isVisible','LEFT\x20TO\x20RIGHT','hasStepAnime','fontFace','ShowShadows','processMoveRouteJumpTo','DefaultShadow','HNSve','Game_Vehicle_initMoveSpeed','eventId','isDashingAndMoving','isPlaytest','_seconds','contents','_spriteset','Window_NumberInput_processOk','FcRiE','processMoveRouteSetIndex','getLastPluginCommandInterpreter','cVWlN','page','autosaveEventLocation','Game_Switches_value','Step1EventId','STR','List','Game_CharacterBase_realMoveSpeed','PostSpawnJS','PlayerIconChange','_eventOverload','ifigM','ARRAYJSON','DssGE','_isObjectCharacter','clearSpriteOffsets','_realX','yJvKl','oQPHc','clearSelfTarget','SpawnEventDespawnRegions','DjYOR','SpawnEventAtRegion','getAttachPictureBitmapWidth','IyoNz','updateShadowChanges','umKMB','isAdvancedSwitch','FollowerID','yJsmD','variableId','USER-DEFINED\x202','addLoadListener','clearCarrying','standing','EventTimerExpireEvent','setCharacterBitmap','processMoveRouteStepFrom','OperateValues','moveTowardPoint','XHvwk','Game_Event_initialize','Game_Troop_meetsConditions','process_VisuMZ_EventsMoveCore_Switches_Variables','Operation','processMoveRouteBalloon','COBWEB','setupSpawnedEvents','MoveAllSynchTargets','FavorHorz','_DisablePlayerControl','AirshipSpeed','xSLtd','setStopFollowerChasing','xpyfW','hfLAC','RegionTouch','GDWbX','Game_CharacterBase_moveDiagonally','processMoveRouteStepToCharacter','player','VehicleDock','moveDiagonally','lthYv','SelfSwitchABCD','SPIN\x20CCW','_mapId','_data','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','variableValid','Game_Message_setItemChoice','Boat','pageId','VisuMZ_0_CoreEngine','Game_Player_executeMove','Game_Map_setupEvents','GrQxk','adjustDir8MovementSpeed','despawnEverything','PlayerAllow','RZBhu','column','cuqEc','event','autoEventIconBuffer','_pageIndex','PDeMK','ConvertParams','vehicle','_advancedSwitchVariable','setupPlayerVisibilityOverrides','Label','nXCtA','findDiagonalDirectionTo','destinationX','switch2Id','max','variables','isMapVariable','checkActivationProximity','ZhbfE','GetMoveSynchTarget','switch1Id','isBoat','DiagonalSpeedMultiplier','executeCommand','mirror\x20horizontal','CarryPose','SelfSwitches','_spriteOffsetX','changeSpeed','processMoveSynchCustom','_cacheVisibility','LIGHT\x20BULB','TiltLeft','ANNOYED','VUYjg','LOVE','xtDUa','setControlledFollowerID','isSmartEventCollisionOn','_eventLabelOffsetY','vFuts','right','Rope','areFollowersForceHidden','updateEventsMoveCoreTagChanges','isJumping','characterPatternY','createContents','getPosingCharacterDirection','mainFontSize','Game_Interpreter_character','SpawnEventDespawnEventID','unlock','Game_Troop_meetsConditionsCPC','useCarryPoseForIcons','pNNDR','EventAllow','byYrt','_paused','isValid','isAnyEventStarting','PosX','SpawnEventDespawnAtXY','moveAwayFromPoint','initEventsMoveCoreEffects','IconSet','updatePosition','_patternLocked','Window_ScrollText_startMessage','uuYyc','ivxFH','initEventsMoveCore','Window_EventItem_onOk','Stop','HOhNd','USER-DEFINED\x201','All','IconBlendMode','setMovementSuccess','isSpriteVS8dir','TerrainTags','follower','gTTzY','getInputDir8','updatePattern','getEventIconIndex','turnLeft90','iTOZm','StopAutoMoveEvents','Step2Preserve','_event','Game_Map_update','maPlf','PreSpawnJS','_commonEventId','qkPjR','processMoveRouteStepTo','FUNC','_diagonalSupport','pJbEi','isStopFollowerChasing','Game_CharacterBase_characterIndex','airship','lastMovedDirection','MUSIC\x20NOTE','Game_Player_isDashing','resizeWindow','EventTimerFramesGain','_vehicleType','shadowFilename','Game_Variables_setValue','isDiagonalDirection','aCPkN','_activationProximityAutoTriggerBypass','wkynD','code','setupSaveEventLocations','visibleRange','setPlayerControlDisable','startMapCommonEventOnOK','GhdhC','constructor','mapValue','slice','Game_Event_updateSelfMovement','Icon','checkEventTriggerHere','meetsConditions','_randomHomeY','SILENCE','DnhJa','ARRAYSTRUCT','HURT','parameters','maxSize','convertVariableValuesInScriptCall','jFIaW','updateEventsAndMovementCore','processMoveRouteTeleportTo','RegionOk','MapId','LOWER\x20RIGHT','Game_Temp_setDestination','PlayerForbid','OfyEe','RandomMoveWeight','Settings','Game_Event_updateParallel','setFrame','wghtK','loadCPC','requestRefresh','PlayerMovementDiagonal','tileWidth','_cacheSystemVisible','clearDestination','Vehicle','moveAwayFromCharacter','IconIndex','isSaveEventLocations','VehicleAllow','SwitchId','Game_Vehicle_isLandOk','isPressed','SWEAT','moveTypeRandom','Direction','Game_Event_start','needsUpdate','_scene','isInVehicle','XfVTS','isDestinationValid','_hidden','turnAwayFromPoint','updateAttachPictureSprite','boxWidth','VFELg','Game_Message_setNumberInput','floor','setupPageSettings','isEventTest','HEART','vertical\x20mirror','EGgYL','pattern','BzRyN','clearDashing','createShadows','MorphEventRemove','moveTowardCharacter','createBitmap','isOnLadder','prepareSpawnedEventAtXY','split','EnableDashTilt','updatePeriodicRefresh','isSupportDiagonalMovement','switches','SwitchGetSelfSwitchID','updateAttachPictureBitmap','PreMorphJS','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','Hours','checkNeedForPeriodicRefresh','_followerChaseOff','YSVVC','frontX','_erased','_activationProximity','apply','tjTrG','bitmap','isPreventSelfMovement','needsAttachPictureUpdate','VTvFo','deleteIconsOnEventsDataKey','getPose','updateMoveSynch','Game_CharacterBase_isTransparent','_shadowGraphic','Game_Character_processMoveCommand','VS8','hasClickTrigger','horz\x20mirror','3702756tInbqv','processMoveCommand','_selfEvent','setupCopyEvent','dRYwG','SpawnEventDespawnEverything','updateEventCustomZ','dNqvm','Game_CharacterBase_isDashing','HDLmc','aIhOu','characterIndexVS8','TiltRight','ZUJUI','isPassable','offsetY','evdji','QUESTION','Game_Map_refresh','zKbPu','_saveEventLocation','_EventsMoveCoreSettings','kHjpk','Rakne','disable','hasAdvancedSwitchVariable','dhjNJ','setupFollowerVisibilityOverrides','initEventsMoveCoreSettings','processMoveRouteMoveRepeat','_commonEvents','kXfrS','isMoveOnlyRegionPassable','custom','isPlayerForceShown','type','processMoveSynchApproach','createIconSprite','processMoveSynchRandom','down','isCollidedWithPlayerCharacters','6720770pYvCTP','destinationY','Scene_Map_startEncounterEffect','6690005xqOgsR','Map%1.json','_speed','Game_CharacterBase_updatePattern','heYpR','isDashing','opacityDelta','_chaseOff','checkEventsMoveCoreStringTags','onLoadAttachPicture','vert\x20mirror','isDashDisabled','_customZ','getSelfTarget','NIQDN','ISJty','erase','EventLabelRefresh','_eventIcon','aCjIF','exit','requestAnimation','QdpAH','Game_CharacterBase_hasStepAnime','deleteIconsOnEventsData','distance','_eventCache','copy','oxYPk','Game_Timer_start','attachPictureBlendMode','FastForwardKey','pQzrl','TargetSwitchId','cPOoN','Seconds','UrsTW','processMoveSynchReverseMimic','_lastAttachPictureMaxSize','events','nkwdk','makeDeepCopy','hTDkB','Movement','prepareSpawnedEventAtRegion','processDrawIcon','_proxyWindow','MoveRouteIndex','meetActivationProximityConditions','FIMwP','Game_CharacterBase_moveStraight','_attachPicture','startMapCommonEventOnOKTarget','ARRAYEVAL','deltaXFrom','AllAllow','_moveOnlyRegions','isBigCharacter','Player','isSpawnHitboxCollisionOk','qcQBr','lbMtP','BFIjc','oOWxL','initFollowerController','loadDataFile','_working','Visible','_eventMorphData','MUSICNOTE','ZFsjM','Game_Player_checkEventTriggerHere','increaseSteps','DeIPm','KpNzn','SCREEN','FBFoF','_shadowOpacity','Game_Map_isDashDisabled','attachPictureOffsetX','1540752fPoyKg','zbnBk','deltaX','metCPC','omhzE','_needsRefresh','_PlayerDiagonalSetting','isNearTheScreen','%1Allow','VisuMZ_Setup_Preload_Map','firstSpawnedEventID','VariableId','nUseF','startMapCommonEventOnTouch','Enable','cuGRE','Game_SelfSwitches_value','eraseEvent','setEventLabelsVisible','kIrFX','Hidden','characterPatternYBasic','AllForbid','Game_Character_forceMoveRoute','sJaDO','canMove','MkeNW','DashingEnable','setup','ARRAYFUNC','areFollowersForceShown','createCharacterShadow','UPPER\x20LEFT','isEventsMoveCoreInvisible','anchor','iconWidth','unsSf','initMembers','includes','_lastPluginCommandInterpreter','Game_Follower_initialize','switch1Valid','updateSelfMovement','checkRegionEventTrigger','_mirrorSprite','_comments','setLastPluginCommandInterpreter','aDHcR','Game_Interpreter_PluginCommand','isSpawnedEvent','LOWER\x20LEFT','_dragonbones','nwoIp','xEZDR','jump','setupEvents','createProxyWindow','setPlayerDiagonalSetting','hasMoveOnlyRegions','_PreservedEventMorphData','findTargetSprite','morphIntoTemplate','CHEkz','iSVnj','stop','Game_CharacterBase_pattern','EnableDir8','dJXPf','CPC','absDistance','isRegionDockable','_frames','EventID','getInputDirection','PageId','timerText','isObjectCharacter','Game_Character_setMoveRoute','EventId','ZlDdf','Game_Player_isMapPassable','loadPicture','itemPadding','frontY','filename','OffsetX','isPlayerForceHidden','LSlkp','vissZ','removeChild','BitmapSmoothing','screenY','Game_CharacterBase_setDirection','characterName','StrictCollision','HXCKk','Dock','Game_Event_clearPageSettings','randomInt','hasEventIcon','hasDragonbones','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isRegionAllowPass','iconSize','parallelCommonEvents','PHjEP','turnAwayFromCharacter','eventsXy','Game_System_initialize','bind','savePreservedMorphEventDataKey','refresh','command357','isMapSwitch','processMoveRouteHugWall','Region%1','oTPuu','IconSize','deletePreservedMorphEventDataKey','_spriteOffsetY','Step1MapId','ARRAYNUM','updateEventMirrorSprite','move','BlendMode','startEncounterEffect','qyeSK','return\x20%1','_moveSynch','moveByInput','_moveRouteIndex','innerWidth','KQsYs','updateMove','wgybO','round','xNyix','turnRight90','attachPictureSettings','_forceHideFollower','zoomScale','removeTemporaryMapSpawnedEvents','SlhJA','FALSE','FRUSTRATION','Sprite_Character_setCharacterBitmap','Game_Player_checkEventTriggerThere','kYHJM','attachPictureMaxSize','PostCopyJS','resetFontSettings','SelfVariables','isLabelVisible','Game_Map_event','turnTowardPoint','KZiih','Step2MapId','update','selfValue','isTurnInPlace','switchId','Sprite_Balloon_updatePosition','removeMorph','gBLNZ','Frames','processMoveRouteFadeIn','KsjxA','note','forceDashing','isAirshipPassable','convertSelfVariableValuesInScriptCall','eWXtl','ljmUP','VisibleEventLabels','_selfTarget','SelfVariableID','activationRegionList','fittingHeight','aUSQB','checkSmartEventCollision','updateBitmapSmoothing','left','BufferY','executeMove','Game_CharacterBase_opacity','KTpnX','replace','charAt','processMoveRouteSelfVariable','name','_clickTrigger','list','setNumberInput','_type','XPiUz','ship','Template','vtNfp','_characterSprites','tileHeight','qDyor','drawTextEx','moveForward','meetsCPC','isWorking','resume','format','setOpacity','createShadow','CustomPageConditions','Window_NumberInput_start','mirror\x20horz','_opacity','attachPictureFilename','CSQJW','parse','BEFWf','%1Dock','directionOnLadderSpriteVS8dir','_character','TemplateName','forceMoveRoute','USER-DEFINED\x204','$preloadedMap_%1','processMoveCommandEventsMoveCore','isRegionForbidPass','SPIN\x20CW','findDirectionTo','SwitchGetSelfSwitchABCD','_eventErased','mirror\x20vert','gPtKg','version','qYFwj','Game_Follower_chaseCharacter','deltaY','setValue','meetActivationRegionConditions','rotation','reserveCommonEvent','MGnCn','_periodicRefreshTimer','_MapSpawnedEventData','checkEventTriggerEventsMoveCore','onDatabaseLoaded','start','_forceCarrying','NsxCS','EventLabelVisible','of\x20Preloaded\x20Maps.\x0a\x0a','EventTimerExpireClear','OpacitySpeed','Name','Szafc','goEFZ','vyCUS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','DstqJ','Minutes','refreshIfNeeded','mduKG','_spawnData','_lastAttachPictureFilename','_regionRules','clearEventCache','nDkSu','updateShadow','NpBMx','dashSpeedModifier','getPreservedMorphEventData','VCFeL','labelWindowRange','WalkForbid','_text','_pattern','isOnRope','processMoveSynchMimic','checkAdvancedSwitchVariablePresent','pages','LOqOd','ZfpxE','MapSwitches','Sprite_Balloon_setup','AutoBalloon','timer','trim','setupChild','terrainTag','bGmKQ','min','HYzad','checkExistingEntitiesAt','TAZIG','_interpreter','bDPqp','kZcqB','setCommonEvent','determineEventOverload','isMapPassable','despawnEventId','lastSpawnedEventID','processMoveRoutePatternLock','row','activationProximityDistance','Speed','posEventsMoveCore','IIHki','_forceShowFollower','Game_Event_locate','some','clamp','PlayerIconDelete','%1DockRegionOnly','conditions','Disable','isPassableByAnyDirection','Allow','random','eventsXyNt','_CPCs','AdvancedVariables','execute','BalloonOffsetY','createLabelWindowForTarget','add','_reflection','emlde','IZxsp','blendMode','_eventCopyData','text','initMembersEventsMoveCore','EXCLAMATION','JSON','DAxqv','switch2Valid','EventTimerSpeed','updatePose','isBattleTest','_eventSpawnData','Chase','OffsetY','despawnAtXY','createLowerLayer','VlMtm','moveSynchType','setTileBitmap','turnTowardCharacter','getSavedEventLocation','moveRouteIndex','updateRoutineMove','hasCPCs','spriteId','ARRAYSTR','TerrainTag','ROUTE_SCRIPT','clearAttachPictureSettings','Game_Timer_onExpire','shadowY','isSelfSwitch','yQYEP','setFrames','Game_Event_setupPageSettings','OHdul','processMoveSynch','_addedHitbox','SLEEP','UuQCb','realMoveSpeed','KgrhB','Game_Interpreter_executeCommand','processMoveRouteSelfSwitch','Forbid','Game_CharacterBase_increaseSteps','updateOpacity','_attachPictureSprite','SelfSwitchID','scale','mapId','prototype','spawnEventId','LEFT','onLoadSuccess','canPassDiagonally','square','lastSpawnedEvent','front','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','isActive','opacitySpeed','CommonEventID','isTransparent','_eventLabelOffsetX','map','setDirection','hoNLS','Collision','eventLabelsVisible','_lastMovedDirection','target','fXUYW','FollowerSetControl','CNvDZ','EnableTurnInPlace','attachPictureScale','_stopCount','toUpperCase','labelWindowText','adjustMoveSynchOpacityDelta','setBalloonPose','height','purbW','ODuvn','bePmw','_callEventMap','setDiagonalDirection','PreloadedMaps','Map\x20%1\x20Switch\x20%2','advancedFunc','_labelWindow','_selfTargetItemChoice','BFRjb','Game_CharacterBase_direction','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','sBaLD','call','KNEEL','isAllowEventAutoMovement','NMcKg','toLowerCase','%1:%2','_callEventData','Game_CharacterBase_canPass','DoUwa','Game_Event_checkEventTriggerAuto','createAttachPictureSprite','deleteSavedEventLocationKey','VEDJL','_randomHomeX','ZeDNC','COLLAPSE','88014dpDapk','AdvancedSwitches','setupSpawnTest','splice','VICTORY','_selfTargetNumberInput','isShadowVisible','MWCkZ','UNTITLED','_EventIcons','HSKDm','EHmEo','LineHeight','isVisible','34996256lzFPyx','SPIN\x20ANTICLOCKWISE','SpawnEventAtTerrainTag','Window_EventItem_onCancel','IlSyq','processMoveRouteFadeOut','enable','Game_Variables_value','hsajG','MVGke','isTile','setupDiagonalSupport','qxKtu','setupRegionRestrictions','ANGER','MdpYF','gainFrames','hXbAG','JGkhS','setEventIconData','shadowX','_labelWindows','setupMorphEvent','clearPose','Self\x20Switch\x20%1','Toggle','ZycCL','reverse\x20copy','_moveAllowPlayerCollision','_eventScreenY','checkCollisionKeywords','AutoMoveEvents','Map%1-Event%2','pageIndex','fontSize','isCollidedWithEvents','roundXWithDirection','Game_Event_meetsConditionsCPC','getDirectionFromPoint','JYmoz','checkEventTriggerAuto','Passability','EIFIx','roundY','hideShadows','morphInto','PreCopyJS','MgYCv','getPosingCharacterIndex','value','filter','pause','checkEventTriggerThere','unlockEvent','processMoveSynchAway','setupSpawn','regionId','%1%2','setupEventsMoveCoreEffects','MEeIt','isDashingEnabled','PosY','GilxO','delay','ruVZP','isEventRunning','AkjSP','IKwMg','Game_Event_event','Step2EventId','_shadowSprite','processMoveRouteMoveTo','getPosingCharacterPattern','cXlnc','registerCommand','setPose','kDdbH','visible','startCallEvent','setupEventsMoveCoreCommentTags','Ymdfr','isTargetEventValidForLabelWindow','region','Self\x20Variable\x20%1','moveBackToRandomHome','advancedValue','setChaseOff','isEmptyCharacter','isSaveEventLocation','EventTimerResume','boat','followers','MapID','PlayerMovementChange','1365856buDOGX','activationProximityType','createSpawnedEvent','updateEventIconSprite','characterPatternYVS8','drawing','EventsMoveCore','roundYWithDirection','setupAttachPictureBitmap','MessageCore','getMapSpawnedEventData','Game_CharacterBase_screenY','LTicS','checkValidEventerMap','setItemChoice','CJgEx','_lastAttachPictureScale','_visiblePlayerY','updateVisibility','log','Region','_randomMoveWeight','_forceDashing','nhJEQ','_screenZoomScale','CallEvent','moveSynchTarget','_duration','NORMAL','txLOJ','template','OLqzH','Game_Map_unlockEvent','XHAuB','ShiftY','_realY','EventIconChange','padZero','isNormalPriority','FontSize','updateParallel','Game_Timer_initialize','Game_Switches_setValue','DEFAULT_SHIFT_Y','default','initMoveSpeed','command108','Preserve','nyxdM','BOpwd','getDirectionToPoint','bufferX','lineHeight','_direction','%1Forbid','Game_CharacterBase_update','Game_CharacterBase_initMembers','startMessage','setupEventsMoveCoreNotetags','ZZZ','ZMsbp','_encounterEffectDuration','heIcb','gKiKe','DXDfn','Sprite_Character_setTileBitmap','VisibleRange','Game_Event_findProperPageIndex','Value','saveEventLocation','turn180','characterIndex','windowPadding','lNvYP','locate','roundX','loadSystem','EventAutoMovement','canStartLocalEvents','addChild','restoreSavedEventPosition','Scene_Boot_onDatabaseLoaded','forceCarrying','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','Window_Message_startMessage','updateVS8BalloonOffsets','WKKiH','regionList','clearPageSettings','Game_Timer_stop','VrPrd','contentsOpacity','_visiblePlayerX','MZMZy','_cpc','_forceShowPlayer','EventTemplates','_spawnedEvents','clearStepPattern','vlMCP','_stepPattern','iconIndex','meetsSwitchCondition','Letter','_forceHidePlayer','_filename','reverse','offsetX','processOk','YRVYN','findProperPageIndex','setAllowEventAutoMovement','XVgeJ','STRUCT','getControlledFollowerID','IelVR','registerSelfTarget','Game_Player_getInputDirection','PreloadMaps','foSMh','vmNUs','correctFacingDirection','canPass','AgJHS','Sprite_Character_update','drawIcon','isPlayerControlDisabled','inqwY','uzOWu','DavrO','jgDlR','setEventIconDataKey','opacity','updateScale','direction','_eventScreenX','jOIHL','BoatSpeed','Eeobt','screenX','updatePatternEventsMoveCore','abs','attachPictureOffsetY','VisuMZ_1_MessageCore','XGjSN','setDestination','setMoveRoute','UPPER\x20RIGHT','EventLocationDelete','ITEM','setImage','away','YDGIw','despawnRegions','setMoveSpeed','BufferX','UkRno','_alwaysUpdateMove','processMoveSynchMirrorHorz','concat','_visibleEventX','ohVrv','width','isEventClickTriggered','qGZim','_inputTime','Game_Enemy_meetsSwitchCondition','MsCcu','ypCoS','_poseDuration','setSelfValue','executeMoveDir8','StopAutoMoveMessages','processMoveRouteMoveUntilStop','xbIdj','vRqwL','create','PostMorphJS','AaQOs','BalloonOffsetX','_pose','isMovementSucceeded','_SavedEventLocations','none','RIGHT\x20TO\x20LEFT','moveStraight','textSizeEx','SPIN\x20ACW','_spawnPreserved','processMoveRouteMoveToCharacter','Game_Interpreter_updateWaitMode','_saveEventLocations','Button','AWfYX','createLabelWindows','BjnYM','IkpfF','BULB','Spriteset_Map_createShadow','_visibleEventY','xmFgj','smooth','Scene_Load_onLoadSuccess','isEventOverloaded','requestBalloon','shiftY','WalkAllow','zwhFS','Game_Message_add','getAttachPictureBitmapHeight','DoBlb','rdmSa','VisuMZ_2_DragonbonesUnion','_target','bufferY','updateWaitMode','pluginCommandCallEvent','return\x200','processMoveRouteJumpForward','_moveSpeed','inBattle','isTriggerIn','initialize','CPCsMet','Game_Event_moveTypeRandom','description','Setting','WciOH','referEvent','EqRqp','EventForbid','string','_eventOverloadThreshold','6GyBlQI','setMapValue','getEventIconData','prepareSpawnedEventAtTerrainTag','updateText','parent','radius','IconBufferY','OEFkx','chaseCharacter','onOk','ADDITIVE','iiyPt','processMoveRouteAnimation','deltaYFrom','aTXUw','reverseDir','MUSIC','_followerControlID','aKExA','onExpire','jBmFq','isShadowShrink','isAutoBufferIcon','_eventPageIndex','MULTIPLY','ZrcBG','VFSMq','HMPH','_characterName','General','Spriteset_Map_createLowerLayer','OFF','firstSpawnedEvent','createSpawnedEventWithData','_needsPeriodicRefresh','FollowerSetTargetChase','Game_Event_isCollidedWithPlayerCharacters','Game_Vehicle_isMapPassable','_waitMode'];_0x1f20=function(){return _0x2cf28d;};return _0x1f20();}function _0x11fa(_0x2f9f6b,_0xe3ef5){const _0x1f2076=_0x1f20();return _0x11fa=function(_0x11fa41,_0x537a06){_0x11fa41=_0x11fa41-0x1b4;let _0xc30015=_0x1f2076[_0x11fa41];return _0xc30015;},_0x11fa(_0x2f9f6b,_0xe3ef5);}var label=_0x165665(0x54c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x165665(0x51a)](function(_0x3c738f){const _0x18362d=_0x165665;return _0x3c738f['status']&&_0x3c738f['description'][_0x18362d(0x347)]('['+label+']');})[0x0];VisuMZ[label][_0x165665(0x256)]=VisuMZ[label][_0x165665(0x256)]||{},VisuMZ['ConvertParams']=function(_0x4f9f97,_0x28d614){const _0x226e20=_0x165665;for(const _0x200dc8 in _0x28d614){if(_0x226e20(0x1d6)==='ZhbfE'){if(_0x200dc8['match'](/(.*):(.*)/i)){if(_0x226e20(0x2f5)!==_0x226e20(0x2f5)){_0x27e330[_0x226e20(0x54c)][_0x226e20(0x59f)][_0x226e20(0x4ca)](this);if(this[_0x226e20(0x1fe)]===_0x1ac915)this['initEventsMoveCore']();this[_0x226e20(0x1fe)]=![];}else{const _0x46d4a6=String(RegExp['$1']),_0x3d8569=String(RegExp['$2'])['toUpperCase']()[_0x226e20(0x43e)]();let _0x196373,_0x513af2,_0x28dbab;switch(_0x3d8569){case'NUM':_0x196373=_0x28d614[_0x200dc8]!==''?Number(_0x28d614[_0x200dc8]):0x0;break;case _0x226e20(0x39a):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2[_0x226e20(0x4aa)](_0x596cb8=>Number(_0x596cb8));break;case'EVAL':_0x196373=_0x28d614[_0x200dc8]!==''?eval(_0x28d614[_0x200dc8]):null;break;case _0x226e20(0x306):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2['map'](_0x4e7c5a=>eval(_0x4e7c5a));break;case _0x226e20(0x46e):_0x196373=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):'';break;case _0x226e20(0x6aa):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2['map'](_0x26f0b4=>JSON[_0x226e20(0x3f8)](_0x26f0b4));break;case _0x226e20(0x225):_0x196373=_0x28d614[_0x200dc8]!==''?new Function(JSON['parse'](_0x28d614[_0x200dc8])):new Function(_0x226e20(0x61f));break;case _0x226e20(0x33e):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2[_0x226e20(0x4aa)](_0x4e54b7=>new Function(JSON[_0x226e20(0x3f8)](_0x4e54b7)));break;case _0x226e20(0x6a3):_0x196373=_0x28d614[_0x200dc8]!==''?String(_0x28d614[_0x200dc8]):'';break;case _0x226e20(0x482):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2[_0x226e20(0x4aa)](_0x2a4721=>String(_0x2a4721));break;case _0x226e20(0x5b7):_0x28dbab=_0x28d614[_0x200dc8]!==''?JSON['parse'](_0x28d614[_0x200dc8]):{},_0x4f9f97[_0x46d4a6]={},VisuMZ[_0x226e20(0x1c9)](_0x4f9f97[_0x46d4a6],_0x28dbab);continue;case _0x226e20(0x247):_0x513af2=_0x28d614[_0x200dc8]!==''?JSON[_0x226e20(0x3f8)](_0x28d614[_0x200dc8]):[],_0x196373=_0x513af2[_0x226e20(0x4aa)](_0x4a0337=>VisuMZ[_0x226e20(0x1c9)]({},JSON[_0x226e20(0x3f8)](_0x4a0337)));break;default:continue;}_0x4f9f97[_0x46d4a6]=_0x196373;}}}else{const _0x181961=_0x4b2ebf[_0x226e20(0x1d0)](),_0x85c37a=_0x488225[_0x226e20(0x2cf)](),_0x287e5a=_0x1e3876['isSupportDiagonalMovement'](),_0x204a9f=_0x54cf64[_0x226e20(0x45c)](_0x181961,_0x85c37a),_0x525efb=_0x41b3e7[_0x226e20(0x45f)](_0x181961,_0x85c37a)[_0x226e20(0x670)]<=0x0;_0x287e5a&&_0x204a9f&&_0x525efb?_0x5d512e=this[_0x226e20(0x1cf)](_0x181961,_0x85c37a):_0x501b4a=this[_0x226e20(0x404)](_0x181961,_0x85c37a);}}return _0x4f9f97;},(_0x3ee4dd=>{const _0xecf4a8=_0x165665,_0x377704=_0x3ee4dd[_0xecf4a8(0x3de)];for(const _0x12be01 of dependencies){if(_0xecf4a8(0x5ed)===_0xecf4a8(0x408))this[_0xecf4a8(0x1df)]=0x0,this[_0xecf4a8(0x398)]=0x0;else{if(!Imported[_0x12be01]){if(_0xecf4a8(0x297)===_0xecf4a8(0x297)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xecf4a8(0x3ef)](_0x377704,_0x12be01)),SceneManager[_0xecf4a8(0x2e5)]();break;}else _0x18f180[_0xecf4a8(0x35e)](_0x525d46[_0xecf4a8(0x3fd)]);}}}const _0x1cf34a=_0x3ee4dd[_0xecf4a8(0x627)];if(_0x1cf34a[_0xecf4a8(0x684)](/\[Version[ ](.*?)\]/i)){const _0x7ead3d=Number(RegExp['$1']);_0x7ead3d!==VisuMZ[label][_0xecf4a8(0x409)]&&(_0xecf4a8(0x552)!=='xsfkF'?(alert(_0xecf4a8(0x386)[_0xecf4a8(0x3ef)](_0x377704,_0x7ead3d)),SceneManager[_0xecf4a8(0x2e5)]()):this[_0xecf4a8(0x5a4)]=!![]);}if(_0x1cf34a[_0xecf4a8(0x684)](/\[Tier[ ](\d+)\]/i)){const _0x4ce576=Number(RegExp['$1']);_0x4ce576<tier?(alert(_0xecf4a8(0x421)[_0xecf4a8(0x3ef)](_0x377704,_0x4ce576,tier)),SceneManager['exit']()):tier=Math[_0xecf4a8(0x1d2)](_0x4ce576,tier);}VisuMZ[_0xecf4a8(0x1c9)](VisuMZ[label][_0xecf4a8(0x256)],_0x3ee4dd[_0xecf4a8(0x249)]);})(pluginData),VisuMZ[_0x165665(0x6c4)]=function(_0x2a8946,_0x3e3bc9,_0x4c0ca9){switch(_0x4c0ca9){case'=':return _0x3e3bc9;break;case'+':return _0x2a8946+_0x3e3bc9;break;case'-':return _0x2a8946-_0x3e3bc9;break;case'*':return _0x2a8946*_0x3e3bc9;break;case'/':return _0x2a8946/_0x3e3bc9;break;case'%':return _0x2a8946%_0x3e3bc9;break;}return _0x2a8946;},PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x507),_0x5d6daa=>{const _0x3f6639=_0x165665;VisuMZ[_0x3f6639(0x1c9)](_0x5d6daa,_0x5d6daa);switch(_0x5d6daa[_0x3f6639(0x58a)]){case _0x3f6639(0x45d):$gameSystem[_0x3f6639(0x5b5)](!![]);break;case _0x3f6639(0x20d):$gameSystem['setAllowEventAutoMovement'](![]);break;case'Toggle':$gameSystem[_0x3f6639(0x5b5)](!$gameSystem[_0x3f6639(0x4cc)]());break;}}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x55f),_0x21d907=>{const _0x55ba53=_0x165665;VisuMZ[_0x55ba53(0x1c9)](_0x21d907,_0x21d907);const _0x408ef7=$gameTemp[_0x55ba53(0x69d)](),_0x51b413={'mapId':_0x21d907[_0x55ba53(0x250)],'eventId':_0x21d907[_0x55ba53(0x36f)]||_0x408ef7['eventId'](),'pageId':_0x21d907[_0x55ba53(0x36b)]};if(_0x51b413[_0x55ba53(0x49b)]<=0x0)_0x51b413[_0x55ba53(0x49b)]=$gameMap?$gameMap[_0x55ba53(0x49b)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x55ba53(0x61e)](_0x51b413);}),PluginManager[_0x165665(0x532)](pluginData['name'],'DashEnableToggle',_0x3fd8d8=>{const _0x2d74a2=_0x165665;VisuMZ[_0x2d74a2(0x1c9)](_0x3fd8d8,_0x3fd8d8);switch(_0x3fd8d8['Value']){case _0x2d74a2(0x32f):$gameSystem['setDashingEnabled'](!![]);break;case _0x2d74a2(0x45b):$gameSystem[_0x2d74a2(0x663)](![]);break;case _0x2d74a2(0x501):$gameSystem[_0x2d74a2(0x663)](!$gameSystem['isDashingEnabled']());break;}}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x56a),_0x3b1a91=>{const _0x2f8600=_0x165665;VisuMZ[_0x2f8600(0x1c9)](_0x3b1a91,_0x3b1a91);const _0x76b228=$gameTemp[_0x2f8600(0x69d)]();_0x3b1a91[_0x2f8600(0x250)]=_0x3b1a91[_0x2f8600(0x250)]||$gameMap['mapId'](),$gameSystem[_0x2f8600(0x5c9)](_0x3b1a91[_0x2f8600(0x250)],_0x3b1a91['EventId']||_0x76b228[_0x2f8600(0x694)](),_0x3b1a91[_0x2f8600(0x262)],_0x3b1a91[_0x2f8600(0x67c)],_0x3b1a91[_0x2f8600(0x636)],_0x3b1a91[_0x2f8600(0x211)]);}),PluginManager[_0x165665(0x532)](pluginData['name'],'EventIconDelete',_0x4ad87a=>{const _0x5e3d65=_0x165665;VisuMZ['ConvertParams'](_0x4ad87a,_0x4ad87a);const _0x2781fe=$gameTemp['getLastPluginCommandInterpreter']();_0x4ad87a[_0x5e3d65(0x250)]=_0x4ad87a[_0x5e3d65(0x250)]||$gameMap['mapId'](),$gameSystem[_0x5e3d65(0x29c)](_0x4ad87a[_0x5e3d65(0x250)],_0x4ad87a[_0x5e3d65(0x36f)]||_0x2781fe[_0x5e3d65(0x694)]());}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x2e2),_0x2bcc37=>{const _0x3e64d6=_0x165665;if($gameMap)for(const _0x3a9cb0 of $gameMap[_0x3e64d6(0x2f8)]()){if('nkPte'!==_0x3e64d6(0x586))_0x3a9cb0[_0x3e64d6(0x390)]();else{if(this[_0x3e64d6(0x641)]===_0x59ee65)this['initFollowerController']();return this['_followerControlID'];}}}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x419),_0x4f519f=>{const _0x5706b6=_0x165665;VisuMZ[_0x5706b6(0x1c9)](_0x4f519f,_0x4f519f);switch(_0x4f519f['Visibility']){case _0x5706b6(0x314):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x5706b6(0x335):$gameSystem['setEventLabelsVisible'](![]);break;case _0x5706b6(0x501):$gameSystem[_0x5706b6(0x333)](!$gameSystem[_0x5706b6(0x4ae)]());break;}}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'EventLocationSave',_0x33c653=>{const _0x1d460f=_0x165665;VisuMZ[_0x1d460f(0x1c9)](_0x33c653,_0x33c653);const _0xe71dba=$gameTemp[_0x1d460f(0x69d)]();if(!$gameMap)return;const _0x166c89=$gameMap[_0x1d460f(0x1c5)](_0x33c653[_0x1d460f(0x36f)]||_0xe71dba[_0x1d460f(0x694)]());if(_0x166c89)_0x166c89['saveEventLocation']();}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'EventLocationCreate',_0x1ecece=>{const _0x57c7f1=_0x165665;VisuMZ['ConvertParams'](_0x1ecece,_0x1ecece);const _0x2b186a=$gameTemp['getLastPluginCommandInterpreter'](),_0x3eef0e=_0x1ecece[_0x57c7f1(0x250)]||$gameMap[_0x57c7f1(0x49b)](),_0x22e0f5=_0x1ecece[_0x57c7f1(0x36f)]||_0x2b186a['eventId'](),_0x5da964=_0x1ecece['PosX']||0x0,_0x4e66a6=_0x1ecece[_0x57c7f1(0x525)]||0x0,_0x45be50=_0x1ecece[_0x57c7f1(0x26a)]||0x2,_0x109c1a=((_0x1ecece[_0x57c7f1(0x36b)]||0x1)-0x1)[_0x57c7f1(0x457)](0x0,0x13),_0x2f58f8=_0x1ecece[_0x57c7f1(0x300)]||0x0;$gameSystem[_0x57c7f1(0x65f)](_0x3eef0e,_0x22e0f5,_0x5da964,_0x4e66a6,_0x45be50,_0x109c1a,_0x2f58f8);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x5da),_0x3462e8=>{const _0x3d6890=_0x165665;VisuMZ[_0x3d6890(0x1c9)](_0x3462e8,_0x3462e8);const _0x3c5a0b=$gameTemp[_0x3d6890(0x69d)](),_0x4e3b7e=_0x3462e8[_0x3d6890(0x250)]||$gameMap[_0x3d6890(0x49b)](),_0x1d892f=_0x3462e8['EventId']||_0x3c5a0b[_0x3d6890(0x694)]();$gameSystem[_0x3d6890(0x4d5)](_0x4e3b7e,_0x1d892f);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x6c1),_0x453773=>{const _0x47590f=_0x165665;VisuMZ[_0x47590f(0x1c9)](_0x453773,_0x453773);const _0x1ba5f1=_0x453773['CommonEventID'];$gameTimer[_0x47590f(0x449)](_0x1ba5f1);}),PluginManager['registerCommand'](pluginData['name'],_0x165665(0x41b),_0x50246c=>{const _0x288627=_0x165665;$gameTimer[_0x288627(0x449)](0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x165665(0x22f),_0x1898f3=>{const _0x372d64=_0x165665;if(!$gameTimer[_0x372d64(0x3ed)]())return;VisuMZ[_0x372d64(0x1c9)](_0x1898f3,_0x1898f3);let _0x1fbce7=0x0;_0x1fbce7+=_0x1898f3[_0x372d64(0x3c5)],_0x1fbce7+=_0x1898f3[_0x372d64(0x2f4)]*0x3c,_0x1fbce7+=_0x1898f3[_0x372d64(0x423)]*0x3c*0x3c,_0x1fbce7+=_0x1898f3[_0x372d64(0x28f)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x1fbce7);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'EventTimerFramesSet',_0x7048a7=>{const _0x112605=_0x165665;if(!$gameTimer[_0x112605(0x3ed)]())return;VisuMZ['ConvertParams'](_0x7048a7,_0x7048a7);let _0x2e153a=0x0;_0x2e153a+=_0x7048a7[_0x112605(0x3c5)],_0x2e153a+=_0x7048a7[_0x112605(0x2f4)]*0x3c,_0x2e153a+=_0x7048a7['Minutes']*0x3c*0x3c,_0x2e153a+=_0x7048a7[_0x112605(0x28f)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x2e153a);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'EventTimerPause',_0xc6b4ca=>{const _0xe26bb9=_0x165665;if(!$gameTimer[_0xe26bb9(0x3ed)]())return;$gameTimer[_0xe26bb9(0x51b)]();}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x541),_0x48ffe3=>{const _0x3e1bb6=_0x165665;if(!$gameTimer[_0x3e1bb6(0x3ed)]())return;$gameTimer[_0x3e1bb6(0x3ee)]();}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x471),_0x4ccaef=>{const _0x59dcd2=_0x165665;VisuMZ[_0x59dcd2(0x1c9)](_0x4ccaef,_0x4ccaef);const _0x224a47=_0x4ccaef[_0x59dcd2(0x451)]||0x0;$gameTimer[_0x59dcd2(0x1e0)](_0x224a47);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x65d),_0xa93144=>{const _0x4ef71a=_0x165665;VisuMZ[_0x4ef71a(0x1c9)](_0xa93144,_0xa93144);const _0xa4d3e1=!_0xa93144[_0x4ef71a(0x475)];$gameSystem[_0x4ef71a(0x6d3)](_0xa4d3e1);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x653),_0x82ebf7=>{const _0x16ba99=_0x165665;VisuMZ['ConvertParams'](_0x82ebf7,_0x82ebf7);const _0x53e9b5=(_0x82ebf7[_0x16ba99(0x6ba)]||0x0)-0x1,_0x246173=!_0x82ebf7[_0x16ba99(0x475)],_0x29e1e3=$gamePlayer[_0x16ba99(0x543)]()[_0x16ba99(0x215)](_0x53e9b5);if(_0x29e1e3)_0x29e1e3[_0x16ba99(0x53e)](_0x246173);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x4b2),_0x183759=>{const _0x5e94b7=_0x165665;VisuMZ[_0x5e94b7(0x1c9)](_0x183759,_0x183759);const _0x479c5c=_0x183759[_0x5e94b7(0x6ba)];$gameSystem[_0x5e94b7(0x1e9)](_0x479c5c);}),PluginManager['registerCommand'](pluginData[_0x165665(0x3de)],'FollowerReset',_0x16f0f0=>{const _0x1eed27=_0x165665;VisuMZ[_0x1eed27(0x1c9)](_0x16f0f0,_0x16f0f0),$gameSystem[_0x1eed27(0x1e9)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x5a1911 of $gamePlayer['followers']()[_0x1eed27(0x1b5)]){if(_0x5a1911)_0x5a1911[_0x1eed27(0x53e)](![]);}}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x405),_0x407472=>{const _0xf82e07=_0x165665;VisuMZ[_0xf82e07(0x1c9)](_0x407472,_0x407472);const _0x561c71=$gameTemp[_0xf82e07(0x69d)]();_0x407472[_0xf82e07(0x250)]=_0x407472[_0xf82e07(0x250)]||$gameMap[_0xf82e07(0x49b)]();const _0x10ac59=[_0x407472['MapId'],_0x407472[_0xf82e07(0x36f)]||_0x561c71[_0xf82e07(0x694)](),_0x407472[_0xf82e07(0x5ad)]],_0x2e5c2f=_0x407472[_0xf82e07(0x2f2)],_0x17959a=$gameSelfSwitches['value'](_0x10ac59)||![];$gameSwitches[_0xf82e07(0x40d)](_0x2e5c2f,_0x17959a);}),PluginManager['registerCommand'](pluginData[_0x165665(0x3de)],_0x165665(0x28b),_0x12ac50=>{const _0x10b8fd=_0x165665;VisuMZ[_0x10b8fd(0x1c9)](_0x12ac50,_0x12ac50);const _0x4365be=$gameTemp[_0x10b8fd(0x69d)]();_0x12ac50[_0x10b8fd(0x250)]=_0x12ac50[_0x10b8fd(0x250)]||$gameMap['mapId']();const _0x1920cb=[_0x12ac50[_0x10b8fd(0x250)],_0x12ac50['EventId']||_0x4365be[_0x10b8fd(0x694)](),'Self\x20Switch\x20%1'['format'](_0x12ac50[_0x10b8fd(0x265)])],_0x3acac6=_0x12ac50[_0x10b8fd(0x2f2)],_0x316de5=$gameSelfSwitches['value'](_0x1920cb)||![];$gameSwitches[_0x10b8fd(0x40d)](_0x3acac6,_0x316de5);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x679),_0x472bd4=>{const _0x3d3f7a=_0x165665;VisuMZ[_0x3d3f7a(0x1c9)](_0x472bd4,_0x472bd4);const _0x50a4f3=$gameTemp[_0x3d3f7a(0x69d)]();_0x472bd4['MapId']=_0x472bd4[_0x3d3f7a(0x250)]||$gameMap[_0x3d3f7a(0x49b)]();const _0x16196f=[_0x472bd4[_0x3d3f7a(0x250)],_0x472bd4[_0x3d3f7a(0x36f)]||_0x50a4f3[_0x3d3f7a(0x694)](),_0x3d3f7a(0x53b)[_0x3d3f7a(0x3ef)](_0x472bd4[_0x3d3f7a(0x32c)])],_0x2e8791=_0x472bd4['TargetVariableId'],_0x2a3bf0=$gameSelfSwitches[_0x3d3f7a(0x519)](_0x16196f)||![];$gameVariables[_0x3d3f7a(0x40d)](_0x2e8791,_0x2a3bf0);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'MorphEventTo',_0x1349bf=>{const _0x180df0=_0x165665;VisuMZ[_0x180df0(0x1c9)](_0x1349bf,_0x1349bf);if(!$gameMap)return;const _0x4d281f=$gameTemp[_0x180df0(0x69d)](),_0x498e54=_0x1349bf[_0x180df0(0x21d)];_0x1349bf[_0x180df0(0x399)]=_0x1349bf['Step1MapId']||$gameMap[_0x180df0(0x49b)](),_0x1349bf[_0x180df0(0x3bd)]=_0x1349bf[_0x180df0(0x3bd)]||$gameMap[_0x180df0(0x49b)](),_0x1349bf['TemplateName']=_0x1349bf[_0x180df0(0x3fd)][_0x180df0(0x4b7)]()[_0x180df0(0x43e)]();if(!_0x498e54&&_0x1349bf[_0x180df0(0x399)]!==$gameMap[_0x180df0(0x49b)]())return;if($gameMap[_0x180df0(0x49b)]()===_0x1349bf[_0x180df0(0x399)]){if(_0x180df0(0x339)===_0x180df0(0x48c))this[_0x180df0(0x515)](_0x1582fe[_0x180df0(0x49b)],_0x3af8f6[_0x180df0(0x694)],!![]);else{const _0x11879e=$gameMap[_0x180df0(0x1c5)](_0x1349bf[_0x180df0(0x6a2)]||_0x4d281f['eventId']());if(!_0x11879e)return;_0x1349bf[_0x180df0(0x3fd)]!==_0x180df0(0x4e2)?_0x180df0(0x67e)!==_0x180df0(0x67e)?(_0x17b72f=_0x435300[_0x180df0(0x2fa)](_0x2054d9),_0x4ae4dd[_0x180df0(0x54c)][_0x180df0(0x36e)][_0x180df0(0x4ca)](this,_0x941786)):_0x11879e['morphIntoTemplate'](_0x1349bf[_0x180df0(0x3fd)]):_0x11879e['morphInto'](_0x1349bf[_0x180df0(0x3bd)],_0x1349bf['Step2EventId']||_0x4d281f[_0x180df0(0x694)]());}}if(_0x498e54){if(_0x180df0(0x467)!==_0x180df0(0x692))$gameSystem[_0x180df0(0x38f)](_0x1349bf[_0x180df0(0x399)],_0x1349bf['Step1EventId'],_0x1349bf[_0x180df0(0x3fd)],_0x1349bf[_0x180df0(0x3bd)],_0x1349bf[_0x180df0(0x52d)]);else{if(_0x311fbd[_0x180df0(0x1bb)]&&this[_0x180df0(0x1ea)]())return this[_0x180df0(0x3d4)](_0x58e7ce,_0x183a6a);else{const _0xdaf28b=_0x32ca0c['eventsXyNt'](_0x42c938,_0x33d0c7)[_0x180df0(0x51a)](_0x3f4575=>_0x3f4575!==this);return _0xdaf28b[_0x180df0(0x670)]>0x0;}}}}),PluginManager['registerCommand'](pluginData[_0x165665(0x3de)],_0x165665(0x281),_0x58a377=>{const _0x9a5df=_0x165665;VisuMZ[_0x9a5df(0x1c9)](_0x58a377,_0x58a377);if(!$gameMap)return;const _0x1ea03e=$gameTemp[_0x9a5df(0x69d)]();_0x58a377[_0x9a5df(0x250)]=_0x58a377['MapId']||$gameMap[_0x9a5df(0x49b)]();if($gameMap[_0x9a5df(0x49b)]()===_0x58a377[_0x9a5df(0x250)]){const _0x1a23d7=$gameMap[_0x9a5df(0x1c5)](_0x58a377[_0x9a5df(0x36f)]||_0x1ea03e[_0x9a5df(0x694)]());_0x1a23d7[_0x9a5df(0x3c3)]();}_0x58a377['RemovePreserve']&&$gameSystem[_0x9a5df(0x397)](_0x58a377[_0x9a5df(0x250)],_0x58a377[_0x9a5df(0x36f)]||_0x1ea03e['eventId']());}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x545),_0x11d9fe=>{const _0x425d47=_0x165665;VisuMZ[_0x425d47(0x1c9)](_0x11d9fe,_0x11d9fe),$gameSystem['setPlayerControlDisable'](!_0x11d9fe[_0x425d47(0x32f)]);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x25c),_0x474e53=>{const _0x906fe0=_0x165665;VisuMZ[_0x906fe0(0x1c9)](_0x474e53,_0x474e53),$gameSystem[_0x906fe0(0x35a)](_0x474e53[_0x906fe0(0x628)]);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x6a7),_0x3699f5=>{const _0x18f7a2=_0x165665;VisuMZ[_0x18f7a2(0x1c9)](_0x3699f5,_0x3699f5),$gameSystem[_0x18f7a2(0x4fb)]($gamePlayer,_0x3699f5[_0x18f7a2(0x262)],_0x3699f5[_0x18f7a2(0x67c)],_0x3699f5[_0x18f7a2(0x636)],_0x3699f5[_0x18f7a2(0x211)]);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x458),_0x192163=>{VisuMZ['ConvertParams'](_0x192163,_0x192163),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x6de),_0x55b49b=>{const _0x286367=_0x165665;VisuMZ[_0x286367(0x1c9)](_0x55b49b,_0x55b49b);const _0x3986e5=$gameTemp[_0x286367(0x69d)]();_0x55b49b['MapId']=_0x55b49b[_0x286367(0x250)]||$gameMap[_0x286367(0x49b)]();const _0x436800=[_0x55b49b[_0x286367(0x250)],_0x55b49b[_0x286367(0x36f)]||_0x3986e5[_0x286367(0x694)](),_0x55b49b[_0x286367(0x5ad)]];switch(_0x55b49b[_0x286367(0x58a)]){case'ON':$gameSelfSwitches[_0x286367(0x40d)](_0x436800,!![]);break;case _0x286367(0x64f):$gameSelfSwitches[_0x286367(0x40d)](_0x436800,![]);break;case _0x286367(0x501):$gameSelfSwitches[_0x286367(0x40d)](_0x436800,!$gameSelfSwitches[_0x286367(0x519)](_0x436800));break;}}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x499),_0x2d58d2=>{const _0x2af937=_0x165665;VisuMZ[_0x2af937(0x1c9)](_0x2d58d2,_0x2d58d2);const _0x2605fd=$gameTemp[_0x2af937(0x69d)]();_0x2d58d2[_0x2af937(0x250)]=_0x2d58d2[_0x2af937(0x250)]||$gameMap[_0x2af937(0x49b)]();const _0x199fe4=[_0x2d58d2[_0x2af937(0x250)],_0x2d58d2[_0x2af937(0x36f)]||_0x2605fd[_0x2af937(0x694)](),_0x2af937(0x500)['format'](_0x2d58d2[_0x2af937(0x265)])];switch(_0x2d58d2[_0x2af937(0x58a)]){case'ON':$gameSelfSwitches['setValue'](_0x199fe4,!![]);break;case _0x2af937(0x64f):$gameSelfSwitches[_0x2af937(0x40d)](_0x199fe4,![]);break;case _0x2af937(0x501):$gameSelfSwitches['setValue'](_0x199fe4,!$gameSelfSwitches[_0x2af937(0x519)](_0x199fe4));break;}}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x3d0),_0x307ec7=>{const _0x5cacbd=_0x165665;VisuMZ['ConvertParams'](_0x307ec7,_0x307ec7);const _0x2c82fe=$gameTemp[_0x5cacbd(0x69d)]();_0x307ec7['MapId']=_0x307ec7[_0x5cacbd(0x250)]||$gameMap[_0x5cacbd(0x49b)]();const _0x174939=[_0x307ec7['MapId'],_0x307ec7[_0x5cacbd(0x36f)]||_0x2c82fe[_0x5cacbd(0x694)](),_0x5cacbd(0x53b)[_0x5cacbd(0x3ef)](_0x307ec7['VariableId'])],_0x4c420d=VisuMZ[_0x5cacbd(0x6c4)]($gameSelfSwitches[_0x5cacbd(0x519)](_0x174939),_0x307ec7[_0x5cacbd(0x58a)],_0x307ec7[_0x5cacbd(0x6ca)]);$gameSelfSwitches['setValue'](_0x174939,_0x4c420d);}),PluginManager['registerCommand'](pluginData[_0x165665(0x3de)],'SpawnEventAtXY',_0x2932c9=>{const _0x22512d=_0x165665;VisuMZ['ConvertParams'](_0x2932c9,_0x2932c9);const _0x9ba820=$gameTemp[_0x22512d(0x69d)](),_0x5a0b52={'template':_0x2932c9[_0x22512d(0x3fd)],'mapId':_0x2932c9[_0x22512d(0x250)]||$gameMap[_0x22512d(0x49b)](),'eventId':_0x2932c9['EventId']||_0x9ba820[_0x22512d(0x694)](),'x':_0x2932c9[_0x22512d(0x201)],'y':_0x2932c9[_0x22512d(0x525)],'spawnPreserved':_0x2932c9[_0x22512d(0x575)],'spawnEventId':$gameMap[_0x22512d(0x5a7)][_0x22512d(0x670)]+0x3e8},_0x120342=_0x2932c9[_0x22512d(0x68a)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x5a0b52[_0x22512d(0x49b)]]&&_0x5a0b52[_0x22512d(0x49b)]!==$gameMap[_0x22512d(0x49b)]()){let _0x11b6e5=_0x22512d(0x28e)[_0x22512d(0x3ef)](_0x5a0b52[_0x22512d(0x49b)]);_0x11b6e5+=_0x22512d(0x41a),_0x11b6e5+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x11b6e5+=_0x22512d(0x4a4),_0x11b6e5+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x22512d(0x3ef)](_0x5a0b52[_0x22512d(0x49b)]),alert(_0x11b6e5);return;}const _0x4a4ce5=$gameMap['prepareSpawnedEventAtXY'](_0x5a0b52,_0x2932c9[_0x22512d(0x4ad)],_0x2932c9[_0x22512d(0x511)]);_0x120342&&(_0x22512d(0x52a)===_0x22512d(0x538)?(this['_forceShowPlayer']=![],this['_forceHidePlayer']=!![]):$gameSwitches[_0x22512d(0x40d)](_0x120342,!!_0x4a4ce5));}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x6b4),_0x405eea=>{const _0x1c990c=_0x165665;VisuMZ[_0x1c990c(0x1c9)](_0x405eea,_0x405eea);const _0x339b5a=$gameTemp[_0x1c990c(0x69d)](),_0x3d4d9d={'template':_0x405eea['TemplateName'],'mapId':_0x405eea['MapId']||$gameMap[_0x1c990c(0x49b)](),'eventId':_0x405eea[_0x1c990c(0x36f)]||_0x339b5a[_0x1c990c(0x694)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x405eea[_0x1c990c(0x575)],'spawnEventId':$gameMap['_spawnedEvents'][_0x1c990c(0x670)]+0x3e8},_0x32e92f=_0x405eea[_0x1c990c(0x68a)]||0x0;if(!VisuMZ[_0x1c990c(0x4c1)][_0x3d4d9d[_0x1c990c(0x49b)]]&&_0x3d4d9d[_0x1c990c(0x49b)]!==$gameMap['mapId']()){let _0x2b9b29='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x1c990c(0x3ef)](_0x3d4d9d['mapId']);_0x2b9b29+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2b9b29+=_0x1c990c(0x657),_0x2b9b29+=_0x1c990c(0x4a4),_0x2b9b29+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x3d4d9d[_0x1c990c(0x49b)]),alert(_0x2b9b29);return;}const _0x2c97e0=$gameMap[_0x1c990c(0x2fd)](_0x3d4d9d,_0x405eea[_0x1c990c(0x55a)],_0x405eea[_0x1c990c(0x4ad)],_0x405eea['Passability']);_0x32e92f&&$gameSwitches[_0x1c990c(0x40d)](_0x32e92f,!!_0x2c97e0);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x4ea),_0x26b7f9=>{const _0x5e5d3c=_0x165665;VisuMZ[_0x5e5d3c(0x1c9)](_0x26b7f9,_0x26b7f9);const _0x462aae=$gameTemp[_0x5e5d3c(0x69d)](),_0x146701={'template':_0x26b7f9['TemplateName'],'mapId':_0x26b7f9[_0x5e5d3c(0x250)]||$gameMap['mapId'](),'eventId':_0x26b7f9[_0x5e5d3c(0x36f)]||_0x462aae[_0x5e5d3c(0x694)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x26b7f9[_0x5e5d3c(0x575)],'spawnEventId':$gameMap[_0x5e5d3c(0x5a7)][_0x5e5d3c(0x670)]+0x3e8},_0x2ffc9b=_0x26b7f9[_0x5e5d3c(0x68a)]||0x0;if(!VisuMZ[_0x5e5d3c(0x4c1)][_0x146701['mapId']]&&_0x146701['mapId']!==$gameMap[_0x5e5d3c(0x49b)]()){if('ZeDNC'===_0x5e5d3c(0x4d8)){let _0x48dfd3='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'['format'](_0x146701[_0x5e5d3c(0x49b)]);_0x48dfd3+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x48dfd3+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x48dfd3+=_0x5e5d3c(0x4a4),_0x48dfd3+=_0x5e5d3c(0x1b6)[_0x5e5d3c(0x3ef)](_0x146701[_0x5e5d3c(0x49b)]),alert(_0x48dfd3);return;}else _0x38ea31[0x2]=_0x17ee79(_0x2a3190)[_0x5e5d3c(0x3dc)](0x0)[_0x5e5d3c(0x4b7)]()[_0x5e5d3c(0x43e)]();}const _0x4e787b=$gameMap[_0x5e5d3c(0x632)](_0x146701,_0x26b7f9[_0x5e5d3c(0x214)],_0x26b7f9[_0x5e5d3c(0x4ad)],_0x26b7f9[_0x5e5d3c(0x511)]);if(_0x2ffc9b){if(_0x5e5d3c(0x526)===_0x5e5d3c(0x4d2))return _0x2d2301[_0x5e5d3c(0x54c)][_0x5e5d3c(0x3f2)]['metCPC'](_0x4820db[_0x5e5d3c(0x365)],0x0);else $gameSwitches['setValue'](_0x2ffc9b,!!_0x4e787b);}}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x1f7),_0x39eeed=>{const _0x711dec=_0x165665;VisuMZ[_0x711dec(0x1c9)](_0x39eeed,_0x39eeed);const _0x39d0a6=$gameTemp[_0x711dec(0x69d)]();$gameMap[_0x711dec(0x44c)](_0x39eeed[_0x711dec(0x369)]||_0x39d0a6['eventId']());}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],_0x165665(0x202),_0x21e2bc=>{const _0xc47d2a=_0x165665;VisuMZ['ConvertParams'](_0x21e2bc,_0x21e2bc);const _0x4e2274=_0x21e2bc[_0xc47d2a(0x201)],_0x366535=_0x21e2bc[_0xc47d2a(0x525)];$gameMap[_0xc47d2a(0x477)](_0x4e2274,_0x366535);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x6b2),_0x3a396e=>{const _0x329bf7=_0x165665;VisuMZ[_0x329bf7(0x1c9)](_0x3a396e,_0x3a396e),$gameMap[_0x329bf7(0x5df)](_0x3a396e[_0x329bf7(0x55a)]);}),PluginManager[_0x165665(0x532)](pluginData[_0x165665(0x3de)],'SpawnEventDespawnTerrainTags',_0x28ed6a=>{const _0x2116e3=_0x165665;VisuMZ['ConvertParams'](_0x28ed6a,_0x28ed6a),$gameMap['despawnTerrainTags'](_0x28ed6a[_0x2116e3(0x214)]);}),PluginManager[_0x165665(0x532)](pluginData['name'],_0x165665(0x2aa),_0x2e7dab=>{const _0xb12de3=_0x165665;VisuMZ['ConvertParams'](_0x2e7dab,_0x2e7dab),$gameMap[_0xb12de3(0x1c0)]();}),VisuMZ[_0x165665(0x54c)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x165665(0x49c)]['onDatabaseLoaded'],Scene_Boot[_0x165665(0x49c)][_0x165665(0x415)]=function(){const _0x32b76d=_0x165665;VisuMZ[_0x32b76d(0x54c)][_0x32b76d(0x597)][_0x32b76d(0x4ca)](this),this[_0x32b76d(0x599)](),this[_0x32b76d(0x6c9)]();if(VisuMZ['EventsMoveCore'][_0x32b76d(0x3f2)])VisuMZ[_0x32b76d(0x54c)]['CustomPageConditions'][_0x32b76d(0x624)]();},VisuMZ[_0x165665(0x4c1)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x165665(0x49c)][_0x165665(0x599)]=function(){const _0x4a703e=_0x165665;if(DataManager['isBattleTest']()||DataManager[_0x4a703e(0x279)]())return;const _0x4d61a4=VisuMZ['EventsMoveCore'][_0x4a703e(0x256)][_0x4a703e(0x3e5)],_0x5afce8=_0x4d61a4[_0x4a703e(0x5bc)][_0x4a703e(0x23f)](0x0);for(const _0x2eb10a of _0x4d61a4[_0x4a703e(0x6a4)]){_0x2eb10a[_0x4a703e(0x41d)]=_0x2eb10a[_0x4a703e(0x41d)][_0x4a703e(0x4b7)]()[_0x4a703e(0x43e)](),VisuMZ[_0x4a703e(0x5a6)][_0x2eb10a[_0x4a703e(0x41d)]]=_0x2eb10a;if(!_0x5afce8[_0x4a703e(0x347)](_0x2eb10a[_0x4a703e(0x544)]))_0x5afce8[_0x4a703e(0x673)](_0x2eb10a[_0x4a703e(0x544)]);}for(const _0x2ae882 of _0x5afce8){if(VisuMZ[_0x4a703e(0x4c1)][_0x2ae882])continue;const _0x1f9e34=_0x4a703e(0x2d2)[_0x4a703e(0x3ef)](_0x2ae882[_0x4a703e(0x56b)](0x3)),_0xfe0036=_0x4a703e(0x400)[_0x4a703e(0x3ef)](_0x2ae882);DataManager[_0x4a703e(0x312)](_0xfe0036,_0x1f9e34),setTimeout(this[_0x4a703e(0x32a)][_0x4a703e(0x38e)](this,_0x2ae882,_0xfe0036),0x64);}},Scene_Boot[_0x165665(0x49c)]['VisuMZ_Setup_Preload_Map']=function(_0xf4f20e,_0x16f107){const _0x54f96d=_0x165665;if(window[_0x16f107]){if(_0x54f96d(0x6bb)===_0x54f96d(0x6bb))VisuMZ[_0x54f96d(0x4c1)][_0xf4f20e]=window[_0x16f107],window[_0x16f107]=undefined;else return this[_0x54f96d(0x6d0)]===_0x234088&&(this['_DisablePlayerControl']=![]),this['_DisablePlayerControl'];}else setTimeout(this[_0x54f96d(0x32a)]['bind'](this,_0xf4f20e,_0x16f107),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x165665(0x1de)]=[],VisuMZ[_0x165665(0x43a)]=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x165665(0x3b8)]=[],VisuMZ[_0x165665(0x67d)]=[],Scene_Boot[_0x165665(0x49c)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x16e6e2=_0x165665;for(let _0x14cd35=0x1;_0x14cd35<$dataSystem[_0x16e6e2(0x28a)][_0x16e6e2(0x670)];_0x14cd35++){if($dataSystem[_0x16e6e2(0x28a)][_0x14cd35][_0x16e6e2(0x684)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x16e6e2(0x4db)][_0x16e6e2(0x673)](_0x14cd35);if($dataSystem['switches'][_0x14cd35][_0x16e6e2(0x684)](/<SELF>/i))VisuMZ[_0x16e6e2(0x1de)][_0x16e6e2(0x673)](_0x14cd35);if($dataSystem[_0x16e6e2(0x28a)][_0x14cd35][_0x16e6e2(0x684)](/<MAP>/i))VisuMZ[_0x16e6e2(0x43a)][_0x16e6e2(0x673)](_0x14cd35);}for(let _0x303d12=0x1;_0x303d12<$dataSystem[_0x16e6e2(0x1d3)][_0x16e6e2(0x670)];_0x303d12++){if($dataSystem[_0x16e6e2(0x1d3)][_0x303d12][_0x16e6e2(0x684)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x16e6e2(0x461)]['push'](_0x303d12);if($dataSystem[_0x16e6e2(0x1d3)][_0x303d12][_0x16e6e2(0x684)](/<SELF>/i))VisuMZ[_0x16e6e2(0x3b8)][_0x16e6e2(0x673)](_0x303d12);if($dataSystem[_0x16e6e2(0x1d3)][_0x303d12][_0x16e6e2(0x684)](/<MAP>/i))VisuMZ[_0x16e6e2(0x67d)][_0x16e6e2(0x673)](_0x303d12);}},VisuMZ['EventsMoveCore']['CustomPageConditions']={},VisuMZ[_0x165665(0x54c)][_0x165665(0x3f2)][_0x165665(0x624)]=function(){const _0x514157=_0x165665;this[_0x514157(0x446)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x165665(0x54c)]['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x14b5c9=_0x165665;this[_0x14b5c9(0x2c3)]=[];for(const _0x43527c of $dataCommonEvents){if(!_0x43527c)continue;VisuMZ['EventsMoveCore'][_0x14b5c9(0x3f2)][_0x14b5c9(0x25a)](_0x43527c);if(_0x43527c[_0x14b5c9(0x365)][_0x14b5c9(0x670)]>0x0)this[_0x14b5c9(0x2c3)][_0x14b5c9(0x673)](_0x43527c['id']);}},VisuMZ['EventsMoveCore'][_0x165665(0x3f2)][_0x165665(0x324)]=function(_0x8b374f,_0x303b99){const _0x1a1ec9=_0x165665;return this[_0x1a1ec9(0x446)]['setup'](_0x8b374f,_0x303b99),this['_interpreter'][_0x1a1ec9(0x462)](),this[_0x1a1ec9(0x446)]['_cpc'];},VisuMZ['EventsMoveCore'][_0x165665(0x3f2)][_0x165665(0x25a)]=function(_0x413786){const _0x564174=_0x165665;let _0x166214=![];_0x413786[_0x564174(0x365)]=[];for(const _0x3d4006 of _0x413786['list']){if(_0x564174(0x6af)===_0x564174(0x619))_0x2ba010[_0x564174(0x1c9)](_0x1a1731,_0x495215),_0x2de723[_0x564174(0x35a)](_0x40dab3['Setting']);else{if([0x6c,0x198]['includes'](_0x3d4006['code'])){const _0x259b3a=_0x3d4006['parameters'][0x0];if(_0x259b3a[_0x564174(0x684)](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if('wrqRJ'!==_0x564174(0x563))_0x166214=!![];else{_0x487039['switches'][_0x5ce2be][_0x564174(0x684)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x218a01=_0x564174(0x3a0)[_0x564174(0x3ef)](_0x3cef1c(_0x189bbb['$1']));_0x293142[_0x564174(0x4c3)][_0x2dd1d2]=new _0x5c9e26(_0x564174(0x3c1),_0x218a01);}}else{if(_0x259b3a[_0x564174(0x684)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x564174(0x29b)!==_0x564174(0x29b)){const _0x57aec8=this[_0x564174(0x498)];_0x57aec8['x']=this[_0x564174(0x3fc)][_0x564174(0x320)](),_0x57aec8['y']=this[_0x564174(0x3fc)][_0x564174(0x5d4)](),_0x57aec8[_0x564174(0x469)]=this[_0x564174(0x3fc)][_0x564174(0x2ef)]();}else _0x166214=![];}}}_0x166214&&('SZLKV'===_0x564174(0x24c)?this['morphIntoTemplate'](_0x20a0fc,!![]):_0x413786[_0x564174(0x365)]['push'](_0x3d4006));}}},getSelfSwitchValue=function(_0x1f2b31,_0x5c0053,_0xd2b3ae){const _0x278b67=_0x165665;let _0x4fd529=[_0x1f2b31,_0x5c0053,_0x278b67(0x500)[_0x278b67(0x3ef)](_0xd2b3ae)];return typeof _0xd2b3ae===_0x278b67(0x62d)&&(_0x4fd529=[_0x1f2b31,_0x5c0053,_0xd2b3ae[_0x278b67(0x4b7)]()[_0x278b67(0x43e)]()]),$gameSelfSwitches[_0x278b67(0x519)](_0x4fd529);},getMapSwitchValue=function(_0x599e84,_0x4b09ab){const _0xbc1fcf=_0x165665;let _0x3f5bb=[0x0,0x0,_0xbc1fcf(0x4c2)['format'](_0x599e84,_0x4b09ab)];return $gameSelfSwitches[_0xbc1fcf(0x519)](_0x3f5bb);},getMapVariableValue=function(_0x277bcf,_0x26bde1){const _0x32b7c6=_0x165665;let _0x38f9d5=[0x0,0x0,_0x32b7c6(0x666)['format'](_0x277bcf,_0x26bde1)];return $gameSelfSwitches['value'](_0x38f9d5);},getSelfVariableValue=function(_0x4f751a,_0x45ea36,_0x3a40db){const _0x3d914e=_0x165665,_0x5cbf96=[_0x4f751a,_0x45ea36,_0x3d914e(0x53b)[_0x3d914e(0x3ef)](_0x3a40db)];return $gameSelfSwitches['value'](_0x5cbf96);},setSelfSwitchValue=function(_0x4afd6f,_0x113926,_0x1ab0d2,_0x749ddc){const _0x4124f5=_0x165665;let _0x3c5918=[_0x4afd6f,_0x113926,_0x4124f5(0x500)[_0x4124f5(0x3ef)](_0x1ab0d2)];typeof _0x1ab0d2===_0x4124f5(0x62d)&&(_0x3c5918=[_0x4afd6f,_0x113926,_0x1ab0d2[_0x4124f5(0x4b7)]()[_0x4124f5(0x43e)]()]),$gameSelfSwitches[_0x4124f5(0x40d)](_0x3c5918,_0x749ddc);},setSelfVariableValue=function(_0x369cbc,_0x383b92,_0xffa3a1,_0x242d06){const _0x14e75c=_0x165665,_0x58a92f=[_0x369cbc,_0x383b92,_0x14e75c(0x53b)['format'](_0xffa3a1)];$gameSelfSwitches[_0x14e75c(0x40d)](_0x58a92f,_0x242d06);},setMapSwitchValue=function(_0x24f78a,_0x45ea0a,_0x7f396){const _0x6b67b0=_0x165665;let _0x4bb377=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x6b67b0(0x3ef)](_0x24f78a,_0x45ea0a)];$gameSelfSwitches[_0x6b67b0(0x40d)](_0x4bb377,_0x7f396);},setMapVariableValue=function(_0xae3109,_0x493230,_0xe84bb0){const _0x350025=_0x165665;let _0x15cabd=[0x0,0x0,_0x350025(0x666)[_0x350025(0x3ef)](_0xae3109,_0x493230)];$gameSelfSwitches['setValue'](_0x15cabd,_0xe84bb0);},DataManager[_0x165665(0x6b9)]=function(_0x7fb9f0){const _0x3417fb=_0x165665;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x3417fb(0x347)](_0x7fb9f0);},DataManager[_0x165665(0x67b)]=function(_0x38688c){const _0x295592=_0x165665;if(SceneManager[_0x295592(0x26d)][_0x295592(0x23d)]===Scene_Debug)return![];return VisuMZ[_0x295592(0x461)][_0x295592(0x347)](_0x38688c);},DataManager[_0x165665(0x488)]=function(_0x4e1a21){const _0x8bb27d=_0x165665;if(SceneManager[_0x8bb27d(0x26d)][_0x8bb27d(0x23d)]===Scene_Debug)return![];return VisuMZ[_0x8bb27d(0x1de)][_0x8bb27d(0x347)](_0x4e1a21);},DataManager['isSelfVariable']=function(_0x2ea7c1){const _0x44567a=_0x165665;if(SceneManager[_0x44567a(0x26d)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x44567a(0x3b8)]['includes'](_0x2ea7c1);},DataManager[_0x165665(0x392)]=function(_0x13262f){const _0x341a31=_0x165665;if(BattleManager['isBattleTest']())return![];return VisuMZ['MapSwitches'][_0x341a31(0x347)](_0x13262f);},DataManager[_0x165665(0x1d4)]=function(_0x44b515){const _0x103d7b=_0x165665;if(BattleManager[_0x103d7b(0x473)]())return![];return VisuMZ[_0x103d7b(0x67d)][_0x103d7b(0x347)](_0x44b515);},VisuMZ[_0x165665(0x54c)][_0x165665(0x252)]=Game_Temp[_0x165665(0x49c)][_0x165665(0x5d7)],Game_Temp[_0x165665(0x49c)]['setDestination']=function(_0xeea42d,_0x31fc7e){const _0x4711ac=_0x165665;if(this[_0x4711ac(0x5e9)](_0xeea42d,_0x31fc7e))return;VisuMZ['EventsMoveCore'][_0x4711ac(0x252)][_0x4711ac(0x4ca)](this,_0xeea42d,_0x31fc7e);},Game_Temp[_0x165665(0x49c)][_0x165665(0x5e9)]=function(_0x3bcb28,_0xf6b5bd){const _0x1c2920=_0x165665,_0x3a36d0=$gameMap['eventsXy'](_0x3bcb28,_0xf6b5bd);for(const _0xf35e77 of _0x3a36d0){if(_0xf35e77&&_0xf35e77[_0x1c2920(0x2a3)]())return _0xf35e77['onClickTrigger'](),!![];}return![];},Game_Temp[_0x165665(0x49c)][_0x165665(0x34f)]=function(_0x1e2a0a){this['_lastPluginCommandInterpreter']=_0x1e2a0a;},Game_Temp[_0x165665(0x49c)][_0x165665(0x69d)]=function(){const _0x24796b=_0x165665;return this[_0x24796b(0x348)];},Game_Temp[_0x165665(0x49c)][_0x165665(0x5ba)]=function(_0x1ba730){const _0x27c9c9=_0x165665;this[_0x27c9c9(0x3cf)]=_0x1ba730;},Game_Temp['prototype'][_0x165665(0x6b1)]=function(){const _0x2d8b41=_0x165665;this[_0x2d8b41(0x3cf)]=undefined;},Game_Temp[_0x165665(0x49c)][_0x165665(0x2de)]=function(){const _0x248253=_0x165665;return this[_0x248253(0x3cf)];},VisuMZ['EventsMoveCore']['Game_System_initialize']=Game_System[_0x165665(0x49c)][_0x165665(0x624)],Game_System[_0x165665(0x49c)]['initialize']=function(){const _0x39b94b=_0x165665;VisuMZ[_0x39b94b(0x54c)][_0x39b94b(0x38d)][_0x39b94b(0x4ca)](this),this['initEventsMoveCore'](),this[_0x39b94b(0x311)]();},Game_System[_0x165665(0x49c)][_0x165665(0x20b)]=function(){const _0x29e1d3=_0x165665;this[_0x29e1d3(0x2ba)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x29e1d3(0x413)]=[],this[_0x29e1d3(0x35c)]={},this['_SavedEventLocations']={},this[_0x29e1d3(0x6d0)]=![],this[_0x29e1d3(0x327)]=_0x29e1d3(0x572);},Game_System[_0x165665(0x49c)][_0x165665(0x524)]=function(){const _0x40109d=_0x165665;if(this[_0x40109d(0x2ba)]===undefined)this['initEventsMoveCore']();if(this[_0x40109d(0x2ba)][_0x40109d(0x33c)]===undefined)this[_0x40109d(0x20b)]();return this[_0x40109d(0x2ba)]['DashingEnable'];},Game_System[_0x165665(0x49c)][_0x165665(0x663)]=function(_0x1937b7){const _0x109b55=_0x165665;if(this[_0x109b55(0x2ba)]===undefined)this[_0x109b55(0x20b)]();if(this[_0x109b55(0x2ba)][_0x109b55(0x33c)]===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings']['DashingEnable']=_0x1937b7;},Game_System[_0x165665(0x49c)][_0x165665(0x4cc)]=function(){const _0x29fd7e=_0x165665;if(this[_0x29fd7e(0x2ba)]===undefined)this[_0x29fd7e(0x20b)]();if(this[_0x29fd7e(0x2ba)][_0x29fd7e(0x593)]===undefined)this[_0x29fd7e(0x20b)]();return this[_0x29fd7e(0x2ba)][_0x29fd7e(0x593)];},Game_System['prototype'][_0x165665(0x5b5)]=function(_0x42e050){const _0x9e4efc=_0x165665;if(this[_0x9e4efc(0x2ba)]===undefined)this[_0x9e4efc(0x20b)]();if(this[_0x9e4efc(0x2ba)][_0x9e4efc(0x593)]===undefined)this[_0x9e4efc(0x20b)]();this[_0x9e4efc(0x2ba)][_0x9e4efc(0x593)]=_0x42e050;},Game_System[_0x165665(0x49c)][_0x165665(0x4ae)]=function(){const _0x3171ee=_0x165665;if(this[_0x3171ee(0x2ba)]===undefined)this[_0x3171ee(0x20b)]();if(this[_0x3171ee(0x2ba)][_0x3171ee(0x3ce)]===undefined)this[_0x3171ee(0x20b)]();return this[_0x3171ee(0x2ba)][_0x3171ee(0x3ce)];},Game_System[_0x165665(0x49c)][_0x165665(0x333)]=function(_0x2fcfb1){const _0x3d9387=_0x165665;if(this[_0x3d9387(0x2ba)]===undefined)this[_0x3d9387(0x20b)]();if(this[_0x3d9387(0x2ba)][_0x3d9387(0x3ce)]===undefined)this[_0x3d9387(0x20b)]();this['_EventsMoveCoreSettings'][_0x3d9387(0x3ce)]=_0x2fcfb1;},Game_System[_0x165665(0x49c)][_0x165665(0x5c4)]=function(){const _0x551514=_0x165665;return this[_0x551514(0x6d0)]===undefined&&(this[_0x551514(0x6d0)]=![]),this[_0x551514(0x6d0)];},Game_System[_0x165665(0x49c)][_0x165665(0x23a)]=function(_0x4d904b){const _0x4a7eb8=_0x165665;this[_0x4a7eb8(0x6d0)]=_0x4d904b;},Game_System[_0x165665(0x49c)]['getPlayerDiagonalSetting']=function(){const _0x226c30=_0x165665;return this[_0x226c30(0x327)];},Game_System['prototype'][_0x165665(0x35a)]=function(_0x3dbbb4){const _0x16d92d=_0x165665;this[_0x16d92d(0x327)]=String(_0x3dbbb4)[_0x16d92d(0x4ce)]()[_0x16d92d(0x43e)]();},Game_System[_0x165665(0x49c)][_0x165665(0x631)]=function(_0x53cac6){const _0x524dfd=_0x165665;if(this[_0x524dfd(0x4e3)]===undefined)this[_0x524dfd(0x20b)]();if(!_0x53cac6)return null;if(_0x53cac6===$gamePlayer){if('hFANR'===_0x524dfd(0x27e)){if(this['_EventIcons']===_0x1a3448)this[_0x524dfd(0x20b)]();if(!_0x2deb27)return null;_0x24e9a2===_0x42dbc1?delete this[_0x524dfd(0x4e3)][_0x524dfd(0x30b)]:this['deleteIconsOnEventsDataKey'](_0x3d319f[_0x524dfd(0x1b4)],_0x1e3107[_0x524dfd(0x676)]);}else return this[_0x524dfd(0x4e3)][_0x524dfd(0x30b)];}else{const _0x4bc83b=VisuMZ[_0x524dfd(0x54c)]['Settings'],_0x4a2e8e=_0x524dfd(0x508)[_0x524dfd(0x3ef)](_0x53cac6[_0x524dfd(0x1b4)],_0x53cac6[_0x524dfd(0x676)]);return this[_0x524dfd(0x4e3)][_0x4a2e8e]=this[_0x524dfd(0x4e3)][_0x4a2e8e]||{'iconIndex':0x0,'bufferX':_0x4bc83b['Icon'][_0x524dfd(0x5e1)],'bufferY':_0x4bc83b[_0x524dfd(0x241)][_0x524dfd(0x3d7)],'blendMode':_0x4bc83b[_0x524dfd(0x241)]['BlendMode']},this['_EventIcons'][_0x4a2e8e];}},Game_System[_0x165665(0x49c)]['setEventIconData']=function(_0x1281a6,_0x437b2e,_0x4313e0,_0x287a7c,_0x33533a){const _0x33a0f9=_0x165665;if(this[_0x33a0f9(0x4e3)]===undefined)this[_0x33a0f9(0x20b)]();const _0x23c147=_0x1281a6===$gamePlayer?_0x33a0f9(0x30b):_0x33a0f9(0x508)[_0x33a0f9(0x3ef)](_0x1281a6[_0x33a0f9(0x1b4)],_0x1281a6['_eventId']);this[_0x33a0f9(0x4e3)][_0x23c147]={'iconIndex':_0x437b2e,'bufferX':_0x4313e0,'bufferY':_0x287a7c,'blendMode':_0x33533a};},Game_System[_0x165665(0x49c)][_0x165665(0x5c9)]=function(_0xd668e0,_0x2be0c,_0x45252c,_0x224909,_0x56db42,_0x3a0108){const _0x418c25=_0x165665;if(this[_0x418c25(0x4e3)]===undefined)this['initEventsMoveCore']();const _0xed5f62=_0x418c25(0x508)['format'](_0xd668e0,_0x2be0c);this[_0x418c25(0x4e3)][_0xed5f62]={'iconIndex':_0x45252c,'bufferX':_0x224909,'bufferY':_0x56db42,'blendMode':_0x3a0108};},Game_System['prototype'][_0x165665(0x2e9)]=function(_0x1ddac8){const _0x9f57c4=_0x165665;if(this[_0x9f57c4(0x4e3)]===undefined)this[_0x9f57c4(0x20b)]();if(!_0x1ddac8)return null;_0x1ddac8===$gamePlayer?delete this['_EventIcons'][_0x9f57c4(0x30b)]:this[_0x9f57c4(0x29c)](_0x1ddac8[_0x9f57c4(0x1b4)],_0x1ddac8[_0x9f57c4(0x676)]);},Game_System[_0x165665(0x49c)]['deleteIconsOnEventsDataKey']=function(_0x202874,_0x2c5dfe){const _0x5b4220=_0x165665;if(this[_0x5b4220(0x4e3)]===undefined)this['initEventsMoveCore']();const _0x11287c=_0x5b4220(0x508)[_0x5b4220(0x3ef)](_0x202874,_0x2c5dfe);delete this[_0x5b4220(0x4e3)][_0x11287c];},Game_System[_0x165665(0x49c)]['getSavedEventLocation']=function(_0x1dd46f){const _0x464b2a=_0x165665;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x1dd46f)return null;const _0x22d307=_0x464b2a(0x508)[_0x464b2a(0x3ef)](_0x1dd46f[_0x464b2a(0x1b4)],_0x1dd46f['_eventId']);return this[_0x464b2a(0x5fc)][_0x22d307];},Game_System[_0x165665(0x49c)][_0x165665(0x58b)]=function(_0x3e15c0){const _0x352891=_0x165665;if(this[_0x352891(0x5fc)]===undefined)this['initEventsMoveCore']();if(!_0x3e15c0)return;const _0x570f4a=_0x352891(0x508)[_0x352891(0x3ef)](_0x3e15c0[_0x352891(0x1b4)],_0x3e15c0[_0x352891(0x676)]);this[_0x352891(0x5fc)][_0x570f4a]={'direction':_0x3e15c0[_0x352891(0x5cc)](),'x':Math[_0x352891(0x3a8)](_0x3e15c0['x']),'y':Math[_0x352891(0x3a8)](_0x3e15c0['y']),'pageIndex':_0x3e15c0[_0x352891(0x1c7)],'moveRouteIndex':_0x3e15c0[_0x352891(0x3a3)]};},Game_System[_0x165665(0x49c)]['deleteSavedEventLocation']=function(_0x54ca3e){const _0x4069d6=_0x165665;if(this[_0x4069d6(0x5fc)]===undefined)this[_0x4069d6(0x20b)]();if(!_0x54ca3e)return;this['deleteSavedEventLocationKey'](_0x54ca3e[_0x4069d6(0x1b4)],_0x54ca3e[_0x4069d6(0x676)]);},Game_System[_0x165665(0x49c)][_0x165665(0x4d5)]=function(_0x10dea4,_0x13fd30){const _0x128901=_0x165665;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();const _0x4dceed=_0x128901(0x508)[_0x128901(0x3ef)](_0x10dea4,_0x13fd30);delete this[_0x128901(0x5fc)][_0x4dceed];},Game_System['prototype'][_0x165665(0x65f)]=function(_0x2f0808,_0x1a2585,_0x1345a9,_0x2c0aed,_0x179e61,_0x55c424,_0x45d794){const _0x56f2e7=_0x165665;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();const _0x21c8b3='Map%1-Event%2'[_0x56f2e7(0x3ef)](_0x2f0808,_0x1a2585);this['_SavedEventLocations'][_0x21c8b3]={'direction':_0x179e61,'x':Math[_0x56f2e7(0x3a8)](_0x1345a9),'y':Math['round'](_0x2c0aed),'pageIndex':_0x55c424,'moveRouteIndex':_0x45d794};},Game_System[_0x165665(0x49c)][_0x165665(0x42e)]=function(_0x21cbb0){const _0xbc0040=_0x165665;if(this[_0xbc0040(0x35c)]===undefined)this[_0xbc0040(0x20b)]();if(!_0x21cbb0)return;const _0x49403f=_0xbc0040(0x508)[_0xbc0040(0x3ef)](_0x21cbb0[_0xbc0040(0x1b4)],_0x21cbb0[_0xbc0040(0x676)]);return this[_0xbc0040(0x35c)][_0x49403f];},Game_System[_0x165665(0x49c)][_0x165665(0x38f)]=function(_0x244ae0,_0x4275ee,_0x1d7a00,_0x5520fd,_0x30104d){const _0x46995b=_0x165665;if(this[_0x46995b(0x35c)]===undefined)this[_0x46995b(0x20b)]();const _0x94d869=_0x46995b(0x508)[_0x46995b(0x3ef)](_0x244ae0,_0x4275ee);this[_0x46995b(0x35c)][_0x94d869]={'template':_0x1d7a00,'mapId':_0x5520fd,'eventId':_0x30104d};},Game_System[_0x165665(0x49c)][_0x165665(0x397)]=function(_0x5ccc1d,_0xe1b62){const _0x595725=_0x165665;if(this[_0x595725(0x35c)]===undefined)this[_0x595725(0x20b)]();const _0x421259=_0x595725(0x508)['format'](_0x5ccc1d,_0xe1b62);delete this[_0x595725(0x35c)][_0x421259];},Game_System[_0x165665(0x49c)]['getMapSpawnedEventData']=function(_0x5580f9){const _0x445d49=_0x165665;if(this[_0x445d49(0x413)]===undefined)this[_0x445d49(0x20b)]();return this['_MapSpawnedEventData'][_0x5580f9]=this[_0x445d49(0x413)][_0x5580f9]||[],this[_0x445d49(0x413)][_0x5580f9];},Game_System[_0x165665(0x49c)][_0x165665(0x3ae)]=function(_0x64e64d){const _0x80dca1=_0x165665,_0x1ea585=this['getMapSpawnedEventData'](_0x64e64d);for(const _0x5317ef of _0x1ea585){if(!_0x5317ef)continue;if(_0x5317ef[_0x80dca1(0x602)])continue;const _0x5eb7f1=_0x1ea585[_0x80dca1(0x67a)](_0x5317ef);_0x1ea585[_0x5eb7f1]=null;}},Game_System[_0x165665(0x49c)][_0x165665(0x311)]=function(){const _0x42b31f=_0x165665;this[_0x42b31f(0x641)]=0x0,this['_followerChaseOff']=![];},Game_System[_0x165665(0x49c)][_0x165665(0x5b8)]=function(){const _0x9a363c=_0x165665;if(this[_0x9a363c(0x641)]===undefined)this['initFollowerController']();return this['_followerControlID'];},Game_System['prototype'][_0x165665(0x1e9)]=function(_0x17a73c){const _0x5f0a23=_0x165665;if(this[_0x5f0a23(0x641)]===undefined)this[_0x5f0a23(0x311)]();this[_0x5f0a23(0x641)]=_0x17a73c;;},VisuMZ['EventsMoveCore'][_0x165665(0x1f6)]=Game_Interpreter[_0x165665(0x49c)]['character'],Game_Interpreter['prototype']['character']=function(_0x3b4df6){const _0x959e88=_0x165665;if(!$gameParty[_0x959e88(0x622)]()&&_0x3b4df6<0x0){let _0x1c3dac=$gameSystem[_0x959e88(0x5b8)]();if(_0x1c3dac>0x0)return $gamePlayer[_0x959e88(0x543)]()[_0x959e88(0x215)](_0x1c3dac-0x1);}return VisuMZ[_0x959e88(0x54c)][_0x959e88(0x1f6)][_0x959e88(0x4ca)](this,_0x3b4df6);},Game_System[_0x165665(0x49c)][_0x165665(0x228)]=function(){const _0x45e6e1=_0x165665;if(this[_0x45e6e1(0x291)]===undefined)this[_0x45e6e1(0x311)]();return this[_0x45e6e1(0x291)];},Game_System[_0x165665(0x49c)][_0x165665(0x6d3)]=function(_0x102105){const _0x473da8=_0x165665;if(this[_0x473da8(0x291)]===undefined)this[_0x473da8(0x311)]();this[_0x473da8(0x291)]=_0x102105;;},VisuMZ[_0x165665(0x54c)][_0x165665(0x56f)]=Game_Timer['prototype'][_0x165665(0x624)],Game_Timer['prototype'][_0x165665(0x624)]=function(){const _0x4f00ce=_0x165665;VisuMZ[_0x4f00ce(0x54c)][_0x4f00ce(0x56f)]['call'](this),this[_0x4f00ce(0x20b)]();},Game_Timer[_0x165665(0x49c)]['initEventsMoveCore']=function(){const _0x52bb3b=_0x165665;this['_paused']=![],this['_speed']=-0x1,this[_0x52bb3b(0x683)]=0x0;},Game_Timer[_0x165665(0x49c)][_0x165665(0x3be)]=function(_0x12b415){const _0x3cf256=_0x165665;if(!_0x12b415)return;if(!this[_0x3cf256(0x313)])return;if(this[_0x3cf256(0x1fe)])return;if(this[_0x3cf256(0x368)]<=0x0)return;if(this[_0x3cf256(0x2d3)]===undefined)this[_0x3cf256(0x20b)]();this[_0x3cf256(0x368)]+=this[_0x3cf256(0x2d3)];if(this[_0x3cf256(0x368)]<=0x0){if(_0x3cf256(0x5a3)===_0x3cf256(0x1e6)){if(this['_chaseOff'])return;if(_0x385a8d[_0x3cf256(0x228)]())return;_0x36c324[_0x3cf256(0x54c)][_0x3cf256(0x40b)][_0x3cf256(0x4ca)](this,_0x56a0a2);}else this[_0x3cf256(0x643)]();}},VisuMZ[_0x165665(0x54c)][_0x165665(0x2ee)]=Game_Timer['prototype'][_0x165665(0x416)],Game_Timer[_0x165665(0x49c)][_0x165665(0x416)]=function(_0x40ad06){const _0x54c843=_0x165665;VisuMZ[_0x54c843(0x54c)][_0x54c843(0x2ee)][_0x54c843(0x4ca)](this,_0x40ad06);if(this[_0x54c843(0x1fe)]===undefined)this[_0x54c843(0x20b)]();this[_0x54c843(0x1fe)]=![];},VisuMZ[_0x165665(0x54c)]['Game_Timer_stop']=Game_Timer[_0x165665(0x49c)][_0x165665(0x361)],Game_Timer[_0x165665(0x49c)]['stop']=function(){const _0x3c8fb5=_0x165665;VisuMZ[_0x3c8fb5(0x54c)]['Game_Timer_stop'][_0x3c8fb5(0x4ca)](this);if(this[_0x3c8fb5(0x1fe)]===undefined)this[_0x3c8fb5(0x20b)]();this[_0x3c8fb5(0x1fe)]=![];},Game_Timer[_0x165665(0x49c)][_0x165665(0x51b)]=function(){const _0x90d5d9=_0x165665;if(this[_0x90d5d9(0x368)]<=0x0)return;this[_0x90d5d9(0x1fe)]=!![],this['_working']=!![];},Game_Timer[_0x165665(0x49c)][_0x165665(0x3ee)]=function(){const _0x48e476=_0x165665;if(this['_frames']<=0x0)return;this[_0x48e476(0x1fe)]=![],this[_0x48e476(0x313)]=!![];},Game_Timer[_0x165665(0x49c)][_0x165665(0x4f8)]=function(_0x155aaf){const _0x2a6fa1=_0x165665;this[_0x2a6fa1(0x368)]=this[_0x2a6fa1(0x368)]||0x0,this['_frames']+=_0x155aaf,this['_working']=!![],this[_0x2a6fa1(0x368)]=Math[_0x2a6fa1(0x1d2)](0x1,this[_0x2a6fa1(0x368)]);},Game_Timer[_0x165665(0x49c)][_0x165665(0x48a)]=function(_0x3b6da6){const _0x1fcc9e=_0x165665;this[_0x1fcc9e(0x368)]=this['_frames']||0x0,this['_frames']=_0x3b6da6,this[_0x1fcc9e(0x313)]=!![],this['_frames']=Math['max'](0x1,this[_0x1fcc9e(0x368)]);},Game_Timer[_0x165665(0x49c)][_0x165665(0x1e0)]=function(_0x27791c){const _0x21b0c9=_0x165665;this['_speed']=_0x27791c,this[_0x21b0c9(0x313)]=!![];if(_0x27791c>0x0){if(_0x21b0c9(0x3e6)!==_0x21b0c9(0x3e6))return this[_0x21b0c9(0x446)][_0x21b0c9(0x33d)](_0x2ba177,_0x4212d4),this['_interpreter']['execute'](),this['_interpreter'][_0x21b0c9(0x5a4)];else this['_frames']=Math[_0x21b0c9(0x1d2)](this['_frames'],0x1);}},Game_Timer[_0x165665(0x49c)][_0x165665(0x449)]=function(_0x2b54c5){const _0x4ebca4=_0x165665;if(this[_0x4ebca4(0x683)]===undefined)this[_0x4ebca4(0x20b)]();this[_0x4ebca4(0x683)]=_0x2b54c5;},VisuMZ[_0x165665(0x54c)][_0x165665(0x486)]=Game_Timer[_0x165665(0x49c)][_0x165665(0x643)],Game_Timer[_0x165665(0x49c)]['onExpire']=function(){const _0x3b0df8=_0x165665;if(this[_0x3b0df8(0x683)]===undefined)this[_0x3b0df8(0x20b)]();this[_0x3b0df8(0x683)]?$gameTemp[_0x3b0df8(0x410)](this[_0x3b0df8(0x683)]):VisuMZ[_0x3b0df8(0x54c)][_0x3b0df8(0x486)][_0x3b0df8(0x4ca)](this);},VisuMZ['EventsMoveCore'][_0x165665(0x616)]=Game_Message[_0x165665(0x49c)][_0x165665(0x465)],Game_Message['prototype'][_0x165665(0x465)]=function(_0x5663ac){const _0x3e18fd=_0x165665;VisuMZ[_0x3e18fd(0x54c)][_0x3e18fd(0x616)]['call'](this,_0x5663ac),this[_0x3e18fd(0x2a7)]=$gameTemp[_0x3e18fd(0x2de)]();},Game_Message[_0x165665(0x49c)][_0x165665(0x671)]=function(){const _0xb7424a=_0x165665;$gameTemp['registerSelfTarget'](this[_0xb7424a(0x2a7)]);},VisuMZ[_0x165665(0x54c)]['Game_Switches_value']=Game_Switches['prototype']['value'],Game_Switches[_0x165665(0x49c)][_0x165665(0x519)]=function(_0x24bc18){const _0x103144=_0x165665;if(DataManager[_0x103144(0x6b9)](_0x24bc18)){if('Orwbm'==='Orwbm')return!!this[_0x103144(0x53d)](_0x24bc18);else _0x53d2b1(_0x103144(0x421)[_0x103144(0x3ef)](_0x29307a,_0x92aac2,_0x171d64)),_0x360c32[_0x103144(0x2e5)]();}else{if(DataManager['isSelfSwitch'](_0x24bc18))return!!this[_0x103144(0x3bf)](_0x24bc18);else{if(DataManager['isMapSwitch'](_0x24bc18))return!!this[_0x103144(0x23e)](_0x24bc18);else{if(_0x103144(0x629)!==_0x103144(0x629)){const _0x2c1fd9=this['_spawnedEvents'][_0x103144(0x23f)](0x0)[_0x103144(0x5b0)]();for(const _0x325d3d of _0x2c1fd9){if(_0x325d3d)return _0x325d3d;}return null;}else return VisuMZ['EventsMoveCore']['Game_Switches_value'][_0x103144(0x4ca)](this,_0x24bc18);}}}},Game_Switches[_0x165665(0x4c3)]={},Game_Switches[_0x165665(0x49c)][_0x165665(0x53d)]=function(_0x409be1){const _0x70374=_0x165665;if(!Game_Switches[_0x70374(0x4c3)][_0x409be1]){if(_0x70374(0x4bc)!=='purbW')this[_0x70374(0x658)]=new _0x5c157c(),this[_0x70374(0x658)]['bitmap']=_0x441cd4['loadSystem'](_0x70374(0x205)),this[_0x70374(0x658)][_0x70374(0x298)][_0x70374(0x60f)]=![],this[_0x70374(0x658)]['setFrame'](0x0,0x0,0x0,0x0),this[_0x70374(0x658)][_0x70374(0x343)]['x']=0.5,this[_0x70374(0x658)]['anchor']['y']=0x1,this[_0x70374(0x595)](this[_0x70374(0x658)]);else{$dataSystem['switches'][_0x409be1]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x26fd4a=_0x70374(0x3a0)['format'](String(RegExp['$1']));Game_Switches[_0x70374(0x4c3)][_0x409be1]=new Function(_0x70374(0x3c1),_0x26fd4a);}}const _0x4498e4=$gameTemp[_0x70374(0x2de)]()||this;return Game_Switches[_0x70374(0x4c3)][_0x409be1][_0x70374(0x4ca)](_0x4498e4,_0x409be1);},Game_Switches[_0x165665(0x49c)][_0x165665(0x3bf)]=function(_0x5eb0cf){const _0xc60048=_0x165665,_0x15d5a5=$gameTemp[_0xc60048(0x2de)]()||this;if(_0x15d5a5[_0xc60048(0x23d)]!==Game_Event){if(_0xc60048(0x489)===_0xc60048(0x50f))_0x548306[_0xc60048(0x397)](_0x202a62['MapId'],_0x1c11a1[_0xc60048(0x36f)]||_0x4d6e9d[_0xc60048(0x694)]());else return VisuMZ['EventsMoveCore'][_0xc60048(0x6a1)][_0xc60048(0x4ca)](this,_0x5eb0cf);}else{const _0x2f2caf=[_0x15d5a5[_0xc60048(0x1b4)],_0x15d5a5[_0xc60048(0x676)],_0xc60048(0x500)['format'](_0x5eb0cf)];return $gameSelfSwitches['value'](_0x2f2caf);}},Game_Switches[_0x165665(0x49c)]['mapValue']=function(_0x324070){const _0x28a187=_0x165665,_0x93ff70=$gameMap?$gameMap[_0x28a187(0x49b)]():0x0,_0x15a2c1=[0x0,0x0,_0x28a187(0x4c2)['format'](_0x93ff70,_0x324070)];return $gameSelfSwitches[_0x28a187(0x519)](_0x15a2c1);},VisuMZ[_0x165665(0x54c)]['Game_Switches_setValue']=Game_Switches[_0x165665(0x49c)][_0x165665(0x40d)],Game_Switches['prototype'][_0x165665(0x40d)]=function(_0x59f89a,_0x4b543f){const _0x38eaa1=_0x165665;if(DataManager['isSelfSwitch'](_0x59f89a))this[_0x38eaa1(0x5f0)](_0x59f89a,_0x4b543f);else{if(DataManager[_0x38eaa1(0x392)](_0x59f89a)){if(_0x38eaa1(0x4f9)!=='hXbAG'){const _0x10f85d=_0x1a37df(_0x4f23f8['$1']);_0x10f85d<_0xeb658?(_0x427d99(_0x38eaa1(0x421)[_0x38eaa1(0x3ef)](_0x1149eb,_0x10f85d,_0xb6de46)),_0x114010[_0x38eaa1(0x2e5)]()):_0xa1d45e=_0x49b185[_0x38eaa1(0x1d2)](_0x10f85d,_0x3f12f7);}else this[_0x38eaa1(0x630)](_0x59f89a,_0x4b543f);}else'mduKG'!==_0x38eaa1(0x425)?_0x1040c8[_0x38eaa1(0x410)](_0x4e7ed8[_0x41167c]):VisuMZ[_0x38eaa1(0x54c)]['Game_Switches_setValue'][_0x38eaa1(0x4ca)](this,_0x59f89a,_0x4b543f);}},Game_Switches[_0x165665(0x49c)]['setSelfValue']=function(_0x36e981,_0x6b40ff){const _0x5928c3=_0x165665,_0x44432b=$gameTemp[_0x5928c3(0x2de)]()||this;if(_0x44432b[_0x5928c3(0x23d)]!==Game_Event){if(_0x5928c3(0x330)!==_0x5928c3(0x1c8))VisuMZ[_0x5928c3(0x54c)][_0x5928c3(0x570)][_0x5928c3(0x4ca)](this,_0x36e981,_0x6b40ff);else{const _0x3332f0=_0x542ddb[_0x5928c3(0x1d7)](this['moveSynchTarget']());if(_0x3332f0){const _0x5b15c8=_0x580540['distance'](this[_0x5928c3(0x6ae)],this[_0x5928c3(0x569)],_0x3332f0['_realX'],_0x3332f0[_0x5928c3(0x569)])-0x1,_0xff4307=_0x5b9e39['min'](_0x29d4af[_0x5928c3(0x25d)](),_0x21cfbd[_0x5928c3(0x3e8)]()),_0x2111ea=this['_moveSynch'][_0x5928c3(0x2d7)]||0x0;_0xc9586b-=_0x1c4239[_0x5928c3(0x1d2)](0x0,_0x5b15c8)*_0xff4307*_0x2111ea;}}}else{if(_0x5928c3(0x2e0)!=='WOZCJ'){const _0x869752=[_0x44432b[_0x5928c3(0x1b4)],_0x44432b[_0x5928c3(0x676)],'Self\x20Switch\x20%1'[_0x5928c3(0x3ef)](_0x36e981)];$gameSelfSwitches[_0x5928c3(0x40d)](_0x869752,_0x6b40ff);}else this['_selfTarget']=_0x3eb3a2;}},Game_Switches['prototype'][_0x165665(0x630)]=function(_0x59c84b,_0x1dd920){const _0x265390=_0x165665,_0x2a21bb=$gameMap?$gameMap['mapId']():0x0,_0x399234=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x265390(0x3ef)](_0x2a21bb,_0x59c84b)];return $gameSelfSwitches['setValue'](_0x399234,_0x1dd920);},VisuMZ['EventsMoveCore'][_0x165665(0x4ef)]=Game_Variables[_0x165665(0x49c)][_0x165665(0x519)],Game_Variables[_0x165665(0x49c)][_0x165665(0x519)]=function(_0x4cec87){const _0x5d2ccc=_0x165665;if(DataManager[_0x5d2ccc(0x67b)](_0x4cec87))return this[_0x5d2ccc(0x53d)](_0x4cec87);else{if(DataManager['isSelfVariable'](_0x4cec87)){if(_0x5d2ccc(0x2e7)!==_0x5d2ccc(0x2e7)){if(_0x15d806[_0x5d2ccc(0x263)]())return!![];return this['_saveEventLocation'];}else return this['selfValue'](_0x4cec87);}else return DataManager[_0x5d2ccc(0x1d4)](_0x4cec87)?this[_0x5d2ccc(0x23e)](_0x4cec87):VisuMZ[_0x5d2ccc(0x54c)][_0x5d2ccc(0x4ef)][_0x5d2ccc(0x4ca)](this,_0x4cec87);}},Game_Variables[_0x165665(0x4c3)]={},Game_Variables[_0x165665(0x49c)][_0x165665(0x53d)]=function(_0x152012){const _0x43465f=_0x165665;if(!Game_Variables[_0x43465f(0x4c3)][_0x152012]){$dataSystem['variables'][_0x152012]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2e718e='return\x20%1'['format'](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x152012]=new Function(_0x43465f(0x6bc),_0x2e718e);}const _0x4d6f00=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x43465f(0x4c3)][_0x152012]['call'](_0x4d6f00,_0x152012);},Game_Variables[_0x165665(0x49c)][_0x165665(0x3bf)]=function(_0x125fe2){const _0x5cacd8=_0x165665,_0x4d1016=$gameTemp[_0x5cacd8(0x2de)]()||this;if(_0x4d1016[_0x5cacd8(0x23d)]!==Game_Event){if(_0x5cacd8(0x234)==='aCPkN')return VisuMZ[_0x5cacd8(0x54c)]['Game_Variables_value'][_0x5cacd8(0x4ca)](this,_0x125fe2);else{if(!this['event']())return;this['initEventsMoveCoreEffects'](),this['setupEventsMoveCoreNotetags'](),this[_0x5cacd8(0x537)](),this['updateEventsMoveCoreTagChanges']();}}else{const _0x3bc56b=[_0x4d1016[_0x5cacd8(0x1b4)],_0x4d1016[_0x5cacd8(0x676)],_0x5cacd8(0x53b)['format'](_0x125fe2)];return $gameSelfSwitches['value'](_0x3bc56b);}},Game_Variables[_0x165665(0x49c)]['mapValue']=function(_0x39e0e6){const _0x5c9d55=_0x165665,_0x1a1494=$gameMap?$gameMap[_0x5c9d55(0x49b)]():0x0,_0x41d8b0=[0x0,0x0,_0x5c9d55(0x666)[_0x5c9d55(0x3ef)](_0x1a1494,_0x39e0e6)];return $gameSelfSwitches[_0x5c9d55(0x519)](_0x41d8b0)||0x0;},VisuMZ['EventsMoveCore'][_0x165665(0x232)]=Game_Variables[_0x165665(0x49c)]['setValue'],Game_Variables['prototype'][_0x165665(0x40d)]=function(_0x2e775b,_0x146d2e){const _0x1fd95e=_0x165665;if(DataManager['isSelfVariable'](_0x2e775b)){if(_0x1fd95e(0x4b1)==='fXUYW')this['setSelfValue'](_0x2e775b,_0x146d2e);else{if(this[_0x1fd95e(0x213)]()){const _0x128114=['',_0x1fd95e(0x46d),_0x1fd95e(0x2b6),'MUSIC\x20NOTE',_0x1fd95e(0x27a),_0x1fd95e(0x4f6),_0x1fd95e(0x268),'COBWEB',_0x1fd95e(0x245),_0x1fd95e(0x1e3),_0x1fd95e(0x581),'','','','',''][_0x2ba57f];this[_0x1fd95e(0x533)](_0x128114,_0x56e75b);}}}else DataManager['isMapVariable'](_0x2e775b)?this[_0x1fd95e(0x630)](_0x2e775b,_0x146d2e):VisuMZ[_0x1fd95e(0x54c)][_0x1fd95e(0x232)][_0x1fd95e(0x4ca)](this,_0x2e775b,_0x146d2e);},Game_Variables[_0x165665(0x49c)][_0x165665(0x5f0)]=function(_0x22ed3a,_0x405b0b){const _0x33d47b=_0x165665,_0x16cd14=$gameTemp['getSelfTarget']()||this;if(_0x16cd14[_0x33d47b(0x23d)]!==Game_Event){if('Qifhh'==='Qifhh')VisuMZ[_0x33d47b(0x54c)]['Game_Variables_setValue'][_0x33d47b(0x4ca)](this,_0x22ed3a,_0x405b0b);else{if(this['_EventIcons']===_0x6582fa)this[_0x33d47b(0x20b)]();if(!_0x2b0779)return null;if(_0x3e994d===_0x1cf96b)return this[_0x33d47b(0x4e3)][_0x33d47b(0x30b)];else{const _0x3deb95=_0x1a0f26[_0x33d47b(0x54c)][_0x33d47b(0x256)],_0x374e5a=_0x33d47b(0x508)[_0x33d47b(0x3ef)](_0x2fcdf2[_0x33d47b(0x1b4)],_0x30a735[_0x33d47b(0x676)]);return this[_0x33d47b(0x4e3)][_0x374e5a]=this[_0x33d47b(0x4e3)][_0x374e5a]||{'iconIndex':0x0,'bufferX':_0x3deb95['Icon']['BufferX'],'bufferY':_0x3deb95[_0x33d47b(0x241)][_0x33d47b(0x3d7)],'blendMode':_0x3deb95[_0x33d47b(0x241)][_0x33d47b(0x39d)]},this[_0x33d47b(0x4e3)][_0x374e5a];}}}else{const _0x1abd14=[_0x16cd14['_mapId'],_0x16cd14[_0x33d47b(0x676)],_0x33d47b(0x53b)[_0x33d47b(0x3ef)](_0x22ed3a)];$gameSelfSwitches['setValue'](_0x1abd14,_0x405b0b);}},Game_Variables['prototype'][_0x165665(0x630)]=function(_0x2f04f0,_0x4f930f){const _0x100dc5=_0x165665,_0x2e28f2=$gameMap?$gameMap[_0x100dc5(0x49b)]():0x0,_0x5c88b8=[0x0,0x0,_0x100dc5(0x666)[_0x100dc5(0x3ef)](_0x2e28f2,_0x2f04f0)];$gameSelfSwitches[_0x100dc5(0x40d)](_0x5c88b8,_0x4f930f);},VisuMZ[_0x165665(0x54c)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x165665(0x49c)]['value'],Game_SelfSwitches[_0x165665(0x49c)][_0x165665(0x519)]=function(_0x3bee28){const _0x2fba23=_0x165665;if(_0x3bee28[0x2][_0x2fba23(0x684)](/(?:SELF|MAP)/i))return this[_0x2fba23(0x3bf)](_0x3bee28);else{return VisuMZ[_0x2fba23(0x54c)][_0x2fba23(0x331)][_0x2fba23(0x4ca)](this,_0x3bee28);;}},Game_SelfSwitches[_0x165665(0x49c)][_0x165665(0x3bf)]=function(_0x286461){const _0x4a1a01=_0x165665;return _0x286461[0x2][_0x4a1a01(0x684)](/VAR/i)?this['_data'][_0x286461]||0x0:!!this[_0x4a1a01(0x1b5)][_0x286461];},VisuMZ[_0x165665(0x54c)]['Game_SelfSwitches_setValue']=Game_SelfSwitches['prototype']['setValue'],Game_SelfSwitches[_0x165665(0x49c)][_0x165665(0x40d)]=function(_0x35fcc1,_0x8a7f0d){const _0x291aa1=_0x165665;if(_0x35fcc1[0x2]['match'](/(?:SELF|MAP)/i))this[_0x291aa1(0x5f0)](_0x35fcc1,_0x8a7f0d);else{if(_0x291aa1(0x492)===_0x291aa1(0x492))VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue'][_0x291aa1(0x4ca)](this,_0x35fcc1,_0x8a7f0d);else return _0x28e7a2['getEventIconData'](this);}},Game_SelfSwitches[_0x165665(0x49c)][_0x165665(0x5f0)]=function(_0x8d9653,_0x3d91e5){const _0xe04ea4=_0x165665;this[_0xe04ea4(0x1b5)][_0x8d9653]=_0x8d9653[0x2][_0xe04ea4(0x684)](/VAR/i)?_0x3d91e5:!!_0x3d91e5,this['onChange']();},VisuMZ[_0x165665(0x54c)][_0x165665(0x5ec)]=Game_Enemy['prototype'][_0x165665(0x5ac)],Game_Enemy[_0x165665(0x49c)][_0x165665(0x5ac)]=function(_0x43e881){const _0x9ce597=_0x165665;$gameTemp['registerSelfTarget'](this);const _0x117ece=VisuMZ[_0x9ce597(0x54c)]['Game_Enemy_meetsSwitchCondition'][_0x9ce597(0x4ca)](this,_0x43e881);return $gameTemp[_0x9ce597(0x6b1)](),_0x117ece;},VisuMZ[_0x165665(0x54c)][_0x165665(0x6c8)]=Game_Troop[_0x165665(0x49c)]['meetsConditions'],Game_Troop[_0x165665(0x49c)]['meetsConditions']=function(_0x42c48c){const _0x36ad55=_0x165665;$gameTemp[_0x36ad55(0x5ba)](this);const _0x22e9de=VisuMZ[_0x36ad55(0x54c)][_0x36ad55(0x6c8)][_0x36ad55(0x4ca)](this,_0x42c48c);return $gameTemp[_0x36ad55(0x6b1)](),_0x22e9de;},VisuMZ[_0x165665(0x54c)]['Game_Map_setup']=Game_Map[_0x165665(0x49c)][_0x165665(0x33d)],Game_Map[_0x165665(0x49c)][_0x165665(0x33d)]=function(_0x3a79d3){const _0x51cebc=_0x165665;this[_0x51cebc(0x3ae)](_0x3a79d3),this[_0x51cebc(0x429)](),VisuMZ[_0x51cebc(0x54c)]['Game_Map_setup'][_0x51cebc(0x4ca)](this,_0x3a79d3),this[_0x51cebc(0x429)](),this[_0x51cebc(0x4f3)](),this[_0x51cebc(0x4f5)](),this['setupSaveEventLocations'](),this[_0x51cebc(0x6cd)](),this[_0x51cebc(0x1cc)](),this['setupFollowerVisibilityOverrides'](),this[_0x51cebc(0x429)]();},VisuMZ[_0x165665(0x54c)][_0x165665(0x1bd)]=Game_Map[_0x165665(0x49c)][_0x165665(0x358)],Game_Map[_0x165665(0x49c)][_0x165665(0x358)]=function(){const _0x5f1625=_0x165665;VisuMZ[_0x5f1625(0x54c)]['Game_Map_setupEvents'][_0x5f1625(0x4ca)](this),this['refreshIfNeeded']();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x165665(0x49c)][_0x165665(0x44a)]=function(){const _0x3531dc=_0x165665,_0x170ce8=Game_Map[_0x3531dc(0x62e)];this['_eventOverload']=this[_0x3531dc(0x2f8)]()['length']>_0x170ce8;if(this[_0x3531dc(0x6a8)]&&$gameTemp[_0x3531dc(0x696)]()){}},Game_Map[_0x165665(0x49c)][_0x165665(0x611)]=function(){const _0x322283=_0x165665;return this[_0x322283(0x6a8)];},Game_Map[_0x165665(0x49c)][_0x165665(0x429)]=function(){this['_eventCache']=undefined;},Game_Map[_0x165665(0x49c)][_0x165665(0x4f3)]=function(){const _0x4ef95f=_0x165665;this['_diagonalSupport']=VisuMZ[_0x4ef95f(0x54c)][_0x4ef95f(0x256)][_0x4ef95f(0x2fc)][_0x4ef95f(0x363)];const _0x2cd134=$dataMap[_0x4ef95f(0x3c8)]||'';if(_0x2cd134['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x4ef95f(0x226)]=!![];else{if(_0x2cd134[_0x4ef95f(0x684)](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0x4ef95f(0x490)!==_0x4ef95f(0x675))this[_0x4ef95f(0x226)]=![];else{const _0x5ce166=_0x35257b[_0x4ef95f(0x47d)](this);if(!_0x5ce166)return;this[_0x4ef95f(0x590)](_0x5ce166['x'],_0x5ce166['y']),this[_0x4ef95f(0x4ab)](_0x5ce166[_0x4ef95f(0x5cc)]),this[_0x4ef95f(0x1c7)]===_0x5ce166[_0x4ef95f(0x509)]&&(this[_0x4ef95f(0x3a3)]=_0x5ce166[_0x4ef95f(0x47e)]);}}}},Game_Map[_0x165665(0x49c)][_0x165665(0x289)]=function(){const _0x5de429=_0x165665,_0x5134e0=$gameSystem['getPlayerDiagonalSetting']();if(_0x5134e0===_0x5de429(0x4ee))return!![];if(_0x5134e0===_0x5de429(0x2bd))return![];if(this['_diagonalSupport']===undefined)this[_0x5de429(0x4f3)]();return this[_0x5de429(0x226)];},Game_Map[_0x165665(0x49c)][_0x165665(0x50c)]=function(_0x575b2e,_0x424c81){const _0x5de7b1=_0x165665;if([0x1,0x4,0x7][_0x5de7b1(0x347)](_0x424c81))_0x575b2e-=0x1;if([0x3,0x6,0x9][_0x5de7b1(0x347)](_0x424c81))_0x575b2e+=0x1;return this[_0x5de7b1(0x591)](_0x575b2e);},Game_Map['prototype'][_0x165665(0x54d)]=function(_0x34dba9,_0x3d5f76){const _0x917ebc=_0x165665;if([0x1,0x2,0x3][_0x917ebc(0x347)](_0x3d5f76))_0x34dba9+=0x1;if([0x7,0x8,0x9][_0x917ebc(0x347)](_0x3d5f76))_0x34dba9-=0x1;return this[_0x917ebc(0x513)](_0x34dba9);},Game_Map[_0x165665(0x49c)][_0x165665(0x366)]=function(_0x28fedc,_0x1cc2a5,_0x69b35a,_0x206c33){const _0x3eb8af=_0x165665;return Math['max'](Math[_0x3eb8af(0x5d3)](this['deltaX'](_0x28fedc,_0x69b35a)),Math[_0x3eb8af(0x5d3)](this[_0x3eb8af(0x40c)](_0x1cc2a5,_0x206c33)));},Game_Map[_0x165665(0x49c)][_0x165665(0x4f5)]=function(){const _0x37ce73=_0x165665,_0x372197=VisuMZ[_0x37ce73(0x54c)][_0x37ce73(0x256)][_0x37ce73(0x55a)],_0x239686={},_0x475f6e=['Allow',_0x37ce73(0x495),_0x37ce73(0x381)],_0x5d93a8=[_0x37ce73(0x210),'Walk',_0x37ce73(0x30b),'Event',_0x37ce73(0x260),_0x37ce73(0x1b9),'Ship','Airship'];for(const _0x5929e4 of _0x475f6e){if('nXCtA'!==_0x37ce73(0x1ce))return this['forceCarrying']();else for(const _0x46904c of _0x5d93a8){const _0x9f2ad9=_0x37ce73(0x521)[_0x37ce73(0x3ef)](_0x46904c,_0x5929e4);_0x372197[_0x9f2ad9]&&(_0x239686[_0x9f2ad9]=_0x372197[_0x9f2ad9][_0x37ce73(0x23f)](0x0));}}const _0x566178=$dataMap['note']||'',_0x10dabd=_0x566178['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x10dabd){if('QsTjZ'==='TVeNG')return this[_0x37ce73(0x1e2)]=![],![];else for(const _0x5a56cd of _0x10dabd){if(_0x37ce73(0x607)===_0x37ce73(0x607)){_0x5a56cd['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x141037=String(RegExp['$1'])[_0x37ce73(0x4ce)]()[_0x37ce73(0x43e)](),_0x5bb812=String(RegExp['$2'])[_0x37ce73(0x4ce)]()[_0x37ce73(0x43e)]();const _0x5079c2=JSON[_0x37ce73(0x3f8)]('['+RegExp['$3'][_0x37ce73(0x684)](/\d+/g)+']');_0x141037=_0x141037[_0x37ce73(0x3dc)](0x0)[_0x37ce73(0x4b7)]()+_0x141037[_0x37ce73(0x23f)](0x1),_0x5bb812=_0x5bb812[_0x37ce73(0x3dc)](0x0)[_0x37ce73(0x4b7)]()+_0x5bb812[_0x37ce73(0x23f)](0x1);const _0x288c31=_0x37ce73(0x521)[_0x37ce73(0x3ef)](_0x141037,_0x5bb812);if(_0x239686[_0x288c31])_0x239686[_0x288c31]=_0x239686[_0x288c31][_0x37ce73(0x5e5)](_0x5079c2);}else{const _0x52f32c=_0x576a87[_0x37ce73(0x45a)];if(_0x52f32c[_0x37ce73(0x34a)]&&_0x3459e9['isAdvancedSwitch'](_0x52f32c[_0x37ce73(0x1d8)]))this[_0x37ce73(0x1cb)]=!![];else{if(_0x52f32c[_0x37ce73(0x470)]&&_0x264421['isAdvancedSwitch'](_0x52f32c[_0x37ce73(0x1d1)]))this[_0x37ce73(0x1cb)]=!![];else _0x52f32c[_0x37ce73(0x1b7)]&&_0x1c1646[_0x37ce73(0x67b)](_0x52f32c['variableId'])&&(this['_advancedSwitchVariable']=!![]);}}}}this[_0x37ce73(0x428)]=_0x239686;},Game_Map[_0x165665(0x49c)][_0x165665(0x387)]=function(_0x3a40e1,_0x1377cc,_0x1eff77,_0x54299e){const _0x13c966=_0x165665,_0x39136d=this[_0x13c966(0x50c)](_0x3a40e1,_0x1eff77),_0x6351a=this['roundYWithDirection'](_0x1377cc,_0x1eff77),_0x3320ba=this[_0x13c966(0x520)](_0x39136d,_0x6351a),_0x5d2815=this[_0x13c966(0x428)];if(_0x5d2815[_0x13c966(0x308)][_0x13c966(0x347)](_0x3320ba))return!![];else{if(_0x54299e===_0x13c966(0x6da)){if('LvVnA'===_0x13c966(0x275))_0x3769ea(this[_0x13c966(0x32a)][_0x13c966(0x38e)](this,_0x4df322,_0x124833),0x64);else return _0x5d2815[_0x13c966(0x1c1)][_0x13c966(0x347)](_0x3320ba)||_0x5d2815[_0x13c966(0x614)][_0x13c966(0x347)](_0x3320ba);}else{if(_0x54299e===_0x13c966(0x1c5))return _0x5d2815[_0x13c966(0x1fc)][_0x13c966(0x347)](_0x3320ba)||_0x5d2815[_0x13c966(0x614)][_0x13c966(0x347)](_0x3320ba);else{if(_0x5d2815[_0x13c966(0x264)]['includes'](_0x3320ba)){if(_0x13c966(0x31b)===_0x13c966(0x31b))return!![];else{_0x218e18[_0x13c966(0x1c9)](_0xd4dec4,_0x16c990);const _0x32fdff=_0xdaf26[_0x13c966(0x4a7)];_0x477dc3['setCommonEvent'](_0x32fdff);}}else{const _0x3a0bd3=_0x13c966(0x329)[_0x13c966(0x3ef)](_0x54299e[_0x13c966(0x3dc)](0x0)[_0x13c966(0x4b7)]()+_0x54299e['slice'](0x1));if(_0x5d2815[_0x3a0bd3])return _0x5d2815[_0x3a0bd3][_0x13c966(0x347)](_0x3320ba);}}}}return![];},Game_Map[_0x165665(0x49c)][_0x165665(0x402)]=function(_0x23a663,_0x38cb0d,_0x28f209,_0x98c254){const _0x255900=_0x165665,_0x54f6d8=this[_0x255900(0x50c)](_0x23a663,_0x28f209),_0x10fad3=this['roundYWithDirection'](_0x38cb0d,_0x28f209),_0x28cd62=this[_0x255900(0x520)](_0x54f6d8,_0x10fad3),_0x485ffd=this[_0x255900(0x428)];if(_0x485ffd[_0x255900(0x337)][_0x255900(0x347)](_0x28cd62)){if(_0x255900(0x2e4)===_0x255900(0x2e4))return!![];else this[_0x255900(0x432)]=this[_0x255900(0x21e)][_0x255900(0x4b8)](),this[_0x255900(0x390)]();}else{if(_0x98c254===_0x255900(0x6da))return _0x485ffd[_0x255900(0x253)][_0x255900(0x347)](_0x28cd62)||_0x485ffd[_0x255900(0x431)]['includes'](_0x28cd62);else{if(_0x98c254===_0x255900(0x1c5))return _0x485ffd[_0x255900(0x62c)][_0x255900(0x347)](_0x28cd62)||_0x485ffd['WalkForbid'][_0x255900(0x347)](_0x28cd62);else{if(_0x485ffd['VehicleForbid']['includes'](_0x28cd62)){if(_0x255900(0x5ce)==='pwZlB')this['updateRoutineMove']();else return!![];}else{if(_0x255900(0x584)===_0x255900(0x584)){const _0x1258f4=_0x255900(0x57c)[_0x255900(0x3ef)](_0x98c254[_0x255900(0x3dc)](0x0)[_0x255900(0x4b7)]()+_0x98c254[_0x255900(0x23f)](0x1));if(_0x485ffd[_0x1258f4])return _0x485ffd[_0x1258f4]['includes'](_0x28cd62);}else return this[_0x255900(0x3ab)]()[_0x255900(0x2b4)]??0x0;}}}}return![];},Game_Map['prototype'][_0x165665(0x367)]=function(_0x266727,_0x369ebb,_0x2a3f93,_0x2fd0db){const _0x3832e7=_0x165665;_0x2a3f93=_0x2fd0db===_0x3832e7(0x22a)?0x5:_0x2a3f93;const _0x511100=this[_0x3832e7(0x50c)](_0x266727,_0x2a3f93),_0x35a4f0=this[_0x3832e7(0x54d)](_0x369ebb,_0x2a3f93),_0x38ce1b=this[_0x3832e7(0x520)](_0x511100,_0x35a4f0),_0x5b37b9=this['_regionRules'];if(_0x5b37b9[_0x3832e7(0x6db)][_0x3832e7(0x347)](_0x38ce1b))return!![];else{if('WvdTv'===_0x3832e7(0x42f)){const _0x3d3272=['',_0x3832e7(0x46d),_0x3832e7(0x2b6),_0x3832e7(0x22c),_0x3832e7(0x27a),_0x3832e7(0x4f6),'SWEAT','COBWEB','SILENCE',_0x3832e7(0x1e3),'ZZZ','','','','',''][_0x10c0e3];this[_0x3832e7(0x533)](_0x3d3272,_0x2153d6);}else{const _0x2ddba4=_0x3832e7(0x3fa)[_0x3832e7(0x3ef)](_0x2fd0db[_0x3832e7(0x3dc)](0x0)[_0x3832e7(0x4b7)]()+_0x2fd0db['slice'](0x1));if(_0x5b37b9[_0x2ddba4])return _0x5b37b9[_0x2ddba4][_0x3832e7(0x347)](_0x38ce1b);}}return![];},VisuMZ['EventsMoveCore'][_0x165665(0x2b7)]=Game_Map[_0x165665(0x49c)]['refresh'],Game_Map['prototype']['refresh']=function(){const _0x50b340=_0x165665;VisuMZ['EventsMoveCore']['Game_Map_refresh'][_0x50b340(0x4ca)](this),this[_0x50b340(0x290)]();},Game_Map['prototype']['checkNeedForPeriodicRefresh']=function(){const _0xb0b8f4=_0x165665;this['_needsPeriodicRefresh']=![];if(this['events']()[_0xb0b8f4(0x456)](_0xf6ab01=>_0xf6ab01[_0xb0b8f4(0x2be)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0xb0b8f4(0x2f8)]()[_0xb0b8f4(0x456)](_0x1c57fc=>_0x1c57fc['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0xb0b8f4(0x2c3)][_0xb0b8f4(0x456)](_0x3be090=>_0x3be090[_0xb0b8f4(0x2be)]())){if(_0xb0b8f4(0x26f)===_0xb0b8f4(0x52b))this[_0xb0b8f4(0x21a)]();else{this[_0xb0b8f4(0x652)]=!![];return;}}if(this[_0xb0b8f4(0x2c3)]['some'](_0x30e022=>_0x30e022[_0xb0b8f4(0x480)]())){if(_0xb0b8f4(0x439)!=='HuPev'){this['_needsPeriodicRefresh']=!![];return;}else{const _0xe463f5=_0x2280a6(_0xf2feea['$1'])['toUpperCase']()['trim'](),_0x17704d=['NORMAL',_0xb0b8f4(0x63a),'MULTIPLY',_0xb0b8f4(0x31c)];this[_0xb0b8f4(0x304)][_0xb0b8f4(0x469)]=_0x17704d[_0xb0b8f4(0x67a)](_0xe463f5)[_0xb0b8f4(0x457)](0x0,0x3);}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x21f)]=Game_Map['prototype']['update'],Game_Map['prototype']['update']=function(_0x295758){const _0x37e005=_0x165665;this[_0x37e005(0x288)](),VisuMZ[_0x37e005(0x54c)][_0x37e005(0x21f)]['call'](this,_0x295758);},Game_Map[_0x165665(0x49c)][_0x165665(0x288)]=function(){const _0x431f23=_0x165665;if(!this[_0x431f23(0x652)])return;this[_0x431f23(0x412)]=this[_0x431f23(0x412)]||0x3c,this['_periodicRefreshTimer']--,this[_0x431f23(0x412)]<=0x0&&(_0x431f23(0x64a)!==_0x431f23(0x46f)?(this[_0x431f23(0x25b)](),this[_0x431f23(0x412)]=0x3c):this[_0x431f23(0x3a3)]=_0x3bb033[_0x431f23(0x47e)]);},VisuMZ[_0x165665(0x54c)][_0x165665(0x31f)]=Game_Map['prototype'][_0x165665(0x2dc)],Game_Map[_0x165665(0x49c)][_0x165665(0x2dc)]=function(){const _0x3526e1=_0x165665;if(!$gameSystem[_0x3526e1(0x524)]())return!![];return VisuMZ[_0x3526e1(0x54c)][_0x3526e1(0x31f)][_0x3526e1(0x4ca)](this);},Game_Map[_0x165665(0x49c)][_0x165665(0x238)]=function(){const _0x47b29f=_0x165665;this['_saveEventLocations']=![];const _0x391c93=$dataMap['note']||'';_0x391c93[_0x47b29f(0x684)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(_0x47b29f(0x62b)!==_0x47b29f(0x4b3)?this[_0x47b29f(0x605)]=!![]:(this['_pose']='',this[_0x47b29f(0x5ef)]=0x0));},Game_Map[_0x165665(0x49c)][_0x165665(0x263)]=function(){const _0x4ef96a=_0x165665;if(this['_saveEventLocations']===undefined)this[_0x4ef96a(0x238)]();return this['_saveEventLocations'];},Game_Map[_0x165665(0x49c)][_0x165665(0x3ae)]=function(_0x590610){const _0x5566ba=_0x165665;_0x590610!==this[_0x5566ba(0x49b)]()&&$gamePlayer&&('WNxAz'==='DmeYK'?(_0x3e9a09[_0x5566ba(0x671)](),_0xedae58[_0x5566ba(0x54c)][_0x5566ba(0x59a)][_0x5566ba(0x4ca)](this),_0x553e93['clearSelfTarget']()):$gameSystem[_0x5566ba(0x3ae)](this['mapId']()));},Game_Map[_0x165665(0x49c)][_0x165665(0x6cd)]=function(){const _0x511467=_0x165665;this[_0x511467(0x5a7)]=$gameSystem[_0x511467(0x550)](this[_0x511467(0x49b)]()),this[_0x511467(0x326)]=!![];},VisuMZ[_0x165665(0x54c)][_0x165665(0x65c)]=Game_Map[_0x165665(0x49c)][_0x165665(0x2f8)],Game_Map['prototype'][_0x165665(0x2f8)]=function(){const _0x1e4f43=_0x165665;if(this[_0x1e4f43(0x2eb)])return this[_0x1e4f43(0x2eb)];const _0x880703=VisuMZ['EventsMoveCore']['Game_Map_events'][_0x1e4f43(0x4ca)](this),_0x5f5df4=_0x880703[_0x1e4f43(0x5e5)](this[_0x1e4f43(0x5a7)]||[]);return this['_eventCache']=_0x5f5df4[_0x1e4f43(0x51a)](_0x9b2c1d=>!!_0x9b2c1d),this[_0x1e4f43(0x2eb)];},VisuMZ[_0x165665(0x54c)]['Game_Map_event']=Game_Map['prototype'][_0x165665(0x1c5)],Game_Map[_0x165665(0x49c)]['event']=function(_0xd20458){const _0x3095d0=_0x165665;if(_0xd20458>=0x3e8)return _0x3095d0(0x3a9)!==_0x3095d0(0x3a9)?this['selfValue'](_0xe9266b):(_0xd20458-=0x3e8,this[_0x3095d0(0x5a7)][_0xd20458]);else{if(_0x3095d0(0x5be)!==_0x3095d0(0x448))return VisuMZ[_0x3095d0(0x54c)][_0x3095d0(0x3ba)]['call'](this,_0xd20458);else{const _0x399c0a=_0x7ed242(_0xd27558['$1'])['toUpperCase']()['trim']();_0x5eba43=_0x562677['EventTemplates'][_0x399c0a];if(!_0x5cf086)return;_0x58ad49=_0x5c04a1[_0x3095d0(0x544)],_0x327e39=_0x555810[_0x3095d0(0x369)];}}},Game_Map[_0x165665(0x49c)][_0x165665(0x332)]=function(_0x4fe600){const _0x4a1409=_0x165665,_0x10993a=this[_0x4a1409(0x1c5)](_0x4fe600);if(_0x10993a)_0x10993a['erase']();},Game_Map[_0x165665(0x49c)][_0x165665(0x4dc)]=function(){const _0x550627=_0x165665,_0x2a1a4a={'template':_0x550627(0x606),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x550627(0x5a7)][_0x550627(0x670)]+0x3e8};this['createSpawnedEventWithData'](_0x2a1a4a);},Game_Map['prototype']['checkExistingEntitiesAt']=function(_0x10e271,_0xd0e6e){const _0x289c17=_0x165665;if(this[_0x289c17(0x38c)](_0x10e271,_0xd0e6e)[_0x289c17(0x670)]>0x0)return!![];if($gamePlayer['x']===_0x10e271&&$gamePlayer['y']===_0xd0e6e)return!![];if(this[_0x289c17(0x542)]()[_0x289c17(0x682)](_0x10e271,_0xd0e6e))return!![];if(this[_0x289c17(0x3e4)]()[_0x289c17(0x682)](_0x10e271,_0xd0e6e))return!![];return![];},Game_Map[_0x165665(0x49c)][_0x165665(0x30c)]=function(_0x345827,_0x5523f4,_0x5b8a5a){const _0x1a945f=_0x165665;$gameTemp[_0x1a945f(0x426)]=_0x345827;const _0x2517cb=new Game_Event(_0x345827[_0x1a945f(0x49b)],_0x345827[_0x1a945f(0x694)]);$gameTemp['_spawnData']=undefined,_0x2517cb[_0x1a945f(0x390)]();let _0xb36223=_0x5523f4-_0x2517cb[_0x1a945f(0x48e)][_0x1a945f(0x3d6)],_0x22dfc2=_0x5523f4+_0x2517cb[_0x1a945f(0x48e)][_0x1a945f(0x3d6)],_0x3a7eb9=_0x5b8a5a-_0x2517cb[_0x1a945f(0x48e)]['up'],_0xabf33e=_0x5b8a5a+_0x2517cb['_addedHitbox'][_0x1a945f(0x2cc)];for(let _0x35fcc3=_0xb36223;_0x35fcc3<=_0x22dfc2;_0x35fcc3++){if('rmBOt'!=='Twrhx')for(let _0x26a03e=_0x3a7eb9;_0x26a03e<=_0xabf33e;_0x26a03e++){if(_0x1a945f(0x31a)===_0x1a945f(0x378)){const _0x1aa3f9=[_0x5dbb2d[_0x1a945f(0x1b4)],_0x2fae9b[_0x1a945f(0x676)],_0x1a945f(0x53b)[_0x1a945f(0x3ef)](_0x17ae99)];return _0x39ec7d[_0x1a945f(0x519)](_0x1aa3f9);}else{if(this[_0x1a945f(0x444)](_0x35fcc3,_0x26a03e))return![];}}else{var _0x17a9ab=this['x']-this[_0x1a945f(0x48e)][_0x1a945f(0x3d6)],_0x1fcd47=this['x']+this[_0x1a945f(0x48e)][_0x1a945f(0x1ed)],_0x2798db=this['y']-this[_0x1a945f(0x48e)]['up'],_0x40c1d7=this['y']+this['_addedHitbox'][_0x1a945f(0x2cc)];return _0x17a9ab<=_0x5984c1&&_0x4a352e<=_0x1fcd47&&_0x2798db<=_0x360755&&_0x4836f3<=_0x40c1d7;}}return!![];},Game_Map[_0x165665(0x49c)]['createSpawnedEventWithData']=function(_0x1ea912){const _0x53a9fb=_0x165665;$gameTemp['_spawnData']=_0x1ea912;const _0x54606c=new Game_Event(_0x1ea912['mapId'],_0x1ea912[_0x53a9fb(0x694)]);$gameTemp[_0x53a9fb(0x426)]=undefined,this[_0x53a9fb(0x5a7)][_0x53a9fb(0x673)](_0x54606c),_0x54606c['setupSpawn'](_0x1ea912),this[_0x53a9fb(0x429)]();},Game_Map[_0x165665(0x49c)][_0x165665(0x285)]=function(_0x326e01,_0x22c416,_0x543686){const _0x5aee81=_0x165665,_0x3ac24c=_0x326e01['template'][_0x5aee81(0x4b7)]()[_0x5aee81(0x43e)]();if(_0x3ac24c!==_0x5aee81(0x4e2)){if(_0x5aee81(0x6d2)==='GrOXz')this['x']+=_0x103690[_0x5aee81(0x54c)][_0x5aee81(0x256)][_0x5aee81(0x2a2)][_0x5aee81(0x5f9)],this['y']+=_0x59a1e9[_0x5aee81(0x54c)]['Settings']['VS8']['BalloonOffsetY'];else{const _0x54a32e=VisuMZ[_0x5aee81(0x5a6)][_0x3ac24c];_0x54a32e&&(_0x5aee81(0x65a)===_0x5aee81(0x65a)?(_0x326e01[_0x5aee81(0x49b)]=_0x54a32e['MapID'],_0x326e01['eventId']=_0x54a32e[_0x5aee81(0x369)]):(this[_0x5aee81(0x432)]=this[_0x5aee81(0x21e)][_0x5aee81(0x4b8)](),this[_0x5aee81(0x390)]()));}}const _0x50ec35=_0x326e01['x'],_0x2f49f1=_0x326e01['y'];if(!this[_0x5aee81(0x1ff)](_0x50ec35,_0x2f49f1))return![];if(_0x22c416){if(this['checkExistingEntitiesAt'](_0x50ec35,_0x2f49f1))return![];if(!this[_0x5aee81(0x30c)](_0x326e01,_0x50ec35,_0x2f49f1))return![];}if(_0x543686){if(!this['isPassableByAnyDirection'](_0x50ec35,_0x2f49f1))return![];}return this[_0x5aee81(0x651)](_0x326e01),!![];},Game_Map[_0x165665(0x49c)][_0x165665(0x2fd)]=function(_0x34b00d,_0x267d24,_0x28ae5a,_0x1bc0b0){const _0x29fda0=_0x165665,_0x3d3f9a=[],_0x45057b=this['width'](),_0x134613=this[_0x29fda0(0x4bb)]();for(let _0x2c4349=0x0;_0x2c4349<_0x45057b;_0x2c4349++){if(_0x29fda0(0x23c)!==_0x29fda0(0x523))for(let _0x102d42=0x0;_0x102d42<_0x134613;_0x102d42++){if(!_0x267d24[_0x29fda0(0x347)](this[_0x29fda0(0x520)](_0x2c4349,_0x102d42)))continue;if(!this['isValid'](_0x2c4349,_0x102d42))continue;if(_0x28ae5a){if(this[_0x29fda0(0x444)](_0x2c4349,_0x102d42))continue;if(!this[_0x29fda0(0x30c)](_0x34b00d,_0x2c4349,_0x102d42))continue;}if(_0x1bc0b0){if(!this[_0x29fda0(0x45c)](_0x2c4349,_0x102d42))continue;}_0x3d3f9a[_0x29fda0(0x673)]([_0x2c4349,_0x102d42]);}else this['_diagonalSupport']=!![];}if(_0x3d3f9a[_0x29fda0(0x670)]>0x0){const _0x4f05c4=_0x3d3f9a[Math[_0x29fda0(0x383)](_0x3d3f9a[_0x29fda0(0x670)])];return _0x34b00d['x']=_0x4f05c4[0x0],_0x34b00d['y']=_0x4f05c4[0x1],this[_0x29fda0(0x651)](_0x34b00d),!![];}return![];},Game_Map['prototype']['prepareSpawnedEventAtTerrainTag']=function(_0x45f591,_0x2dfd77,_0x24a9c5,_0x459bd6){const _0x379095=_0x165665,_0x4aefb6=[],_0x4c1e40=this[_0x379095(0x5e8)](),_0x202214=this[_0x379095(0x4bb)]();for(let _0x1f7374=0x0;_0x1f7374<_0x4c1e40;_0x1f7374++){if(_0x379095(0x41e)===_0x379095(0x3f9)){if(_0x221c65[this[_0x379095(0x4bf)]])this[_0x379095(0x656)]='',this['startCallEvent']();else return!![];}else for(let _0x2b3828=0x0;_0x2b3828<_0x202214;_0x2b3828++){if(!_0x2dfd77['includes'](this[_0x379095(0x440)](_0x1f7374,_0x2b3828)))continue;if(!this[_0x379095(0x1ff)](_0x1f7374,_0x2b3828))continue;if(_0x24a9c5){if(this[_0x379095(0x444)](_0x1f7374,_0x2b3828))continue;if(!this['isSpawnHitboxCollisionOk'](_0x45f591,_0x1f7374,_0x2b3828))continue;}if(_0x459bd6){if(_0x379095(0x2b8)!==_0x379095(0x2b8))this[_0x379095(0x2a0)][_0x379095(0x375)]=_0x53ba7c(_0x195a2d['$1']);else{if(!this['isPassableByAnyDirection'](_0x1f7374,_0x2b3828))continue;}}_0x4aefb6['push']([_0x1f7374,_0x2b3828]);}}if(_0x4aefb6[_0x379095(0x670)]>0x0){if('XHzFB'!=='nHJns'){const _0x4420c7=_0x4aefb6[Math[_0x379095(0x383)](_0x4aefb6[_0x379095(0x670)])];return _0x45f591['x']=_0x4420c7[0x0],_0x45f591['y']=_0x4420c7[0x1],this['createSpawnedEventWithData'](_0x45f591),!![];}else{if(_0x5e2b21)for(const _0x261598 of _0x5dfd7a['events']()){_0x261598[_0x379095(0x390)]();}}}return![];},Game_Map[_0x165665(0x49c)]['isPassableByAnyDirection']=function(_0x23fb45,_0x5cb783){const _0x39db0e=_0x165665;if(this[_0x39db0e(0x2b3)](_0x23fb45,_0x5cb783,0x2))return!![];if(this[_0x39db0e(0x2b3)](_0x23fb45,_0x5cb783,0x4))return!![];if(this[_0x39db0e(0x2b3)](_0x23fb45,_0x5cb783,0x6))return!![];if(this[_0x39db0e(0x2b3)](_0x23fb45,_0x5cb783,0x8))return!![];return![];},Game_Map[_0x165665(0x49c)][_0x165665(0x44c)]=function(_0x3451ba){const _0x570743=_0x165665;if(_0x3451ba<0x3e8)return;if(!this[_0x570743(0x5a7)])return;const _0x21cf77=this[_0x570743(0x1c5)](_0x3451ba);_0x21cf77['locate'](-0x1,-0x1),_0x21cf77['erase'](),this['_spawnedEvents'][_0x3451ba-0x3e8]=null,this[_0x570743(0x429)]();},Game_Map[_0x165665(0x49c)]['firstSpawnedEvent']=function(){const _0x17ebc1=_0x165665;for(const _0x20463 of this[_0x17ebc1(0x5a7)]){if(_0x20463)return _0x20463;}return null;},Game_Map['prototype'][_0x165665(0x32b)]=function(){const _0x1b89bb=_0x165665,_0x1562d2=this[_0x1b89bb(0x650)]();return _0x1562d2?_0x1562d2[_0x1b89bb(0x676)]:0x0;},Game_Map[_0x165665(0x49c)][_0x165665(0x4a2)]=function(){const _0x15dff0=_0x165665,_0x7d98ca=this['_spawnedEvents'][_0x15dff0(0x23f)](0x0)[_0x15dff0(0x5b0)]();for(const _0x1dfb1f of _0x7d98ca){if(_0x1dfb1f)return _0x1dfb1f;}return null;},Game_Map[_0x165665(0x49c)][_0x165665(0x44d)]=function(){const _0x364c72=_0x165665,_0xeaaeea=this['lastSpawnedEvent']();return _0xeaaeea?_0xeaaeea[_0x364c72(0x676)]:0x0;},Game_Map[_0x165665(0x49c)][_0x165665(0x477)]=function(_0x5b7fc0,_0x58bd19){const _0x10c10f=_0x165665,_0x1d386c=this[_0x10c10f(0x38c)](_0x5b7fc0,_0x58bd19);for(const _0x1e844a of _0x1d386c){if(!_0x1e844a)continue;if(_0x1e844a[_0x10c10f(0x352)]())this['despawnEventId'](_0x1e844a[_0x10c10f(0x676)]);}},Game_Map[_0x165665(0x49c)][_0x165665(0x5df)]=function(_0x2a0d63){const _0x153c38=_0x165665;for(const _0x8606b6 of this[_0x153c38(0x5a7)]){if(_0x153c38(0x42a)!==_0x153c38(0x5b6)){if(!_0x8606b6)continue;_0x2a0d63['includes'](_0x8606b6[_0x153c38(0x520)]())&&this[_0x153c38(0x44c)](_0x8606b6[_0x153c38(0x676)]);}else return this[_0x153c38(0x6a8)];}},Game_Map['prototype']['despawnTerrainTags']=function(_0x231ec4){const _0x2638e2=_0x165665;for(const _0x344ce1 of this[_0x2638e2(0x5a7)]){if(!_0x344ce1)continue;_0x231ec4[_0x2638e2(0x347)](_0x344ce1[_0x2638e2(0x440)]())&&this[_0x2638e2(0x44c)](_0x344ce1['_eventId']);}},Game_Map[_0x165665(0x49c)]['despawnEverything']=function(){const _0xd56325=_0x165665;for(const _0x5a025c of this[_0xd56325(0x5a7)]){if(_0xd56325(0x2bb)===_0xd56325(0x2bb)){if(!_0x5a025c)continue;this[_0xd56325(0x44c)](_0x5a025c[_0xd56325(0x676)]);}else{if(!_0x5bf710&&_0x43ad07[_0xd56325(0x529)]())return![];if(!_0x4e3945&&_0x192d62[_0xd56325(0x200)]())return![];if(this[_0xd56325(0x3d1)]()<=0x0)return!![];return _0x30dbce['meetActivationRegionConditions'](this);}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x566)]=Game_Map['prototype'][_0x165665(0x51d)],Game_Map[_0x165665(0x49c)][_0x165665(0x51d)]=function(_0x47e039){const _0x469eaa=_0x165665;VisuMZ[_0x469eaa(0x54c)][_0x469eaa(0x566)][_0x469eaa(0x4ca)](this,_0x47e039);if(_0x47e039>=0x3e8){if(_0x469eaa(0x355)===_0x469eaa(0x355)){const _0x26d5a9=this['event'](_0x47e039);if(_0x26d5a9)_0x26d5a9[_0x469eaa(0x1f8)]();}else{_0x574228[_0x469eaa(0x1c9)](_0x4c15e4,_0x5f56ad);const _0x37a5cf=_0x3a60e9[_0x469eaa(0x201)],_0x37e412=_0x3701fa['PosY'];_0x4e0c9b[_0x469eaa(0x477)](_0x37a5cf,_0x37e412);}}},Game_Map['prototype']['setupPlayerVisibilityOverrides']=function(){const _0x576381=_0x165665;this[_0x576381(0x5a5)]=![],this[_0x576381(0x5ae)]=![];if(!$dataMap)return;const _0x38ff7a=$dataMap[_0x576381(0x3c8)]||'';if(_0x38ff7a[_0x576381(0x684)](/<HIDE PLAYER>/i)){if(_0x576381(0x4cd)!==_0x576381(0x3a5))this['_forceShowPlayer']=![],this[_0x576381(0x5ae)]=!![];else return this[_0x576381(0x6c5)](_0x5ef3d3(_0x50e11c['$1']),_0x6f2711(_0x33c7ad['$2']));}else _0x38ff7a[_0x576381(0x684)](/<SHOW PLAYER>/i)&&(this[_0x576381(0x5a5)]=!![],this[_0x576381(0x5ae)]=![]);},Game_Map['prototype']['isPlayerForceShown']=function(){const _0x338e01=_0x165665;return this[_0x338e01(0x5a5)]===undefined&&this[_0x338e01(0x1cc)](),this[_0x338e01(0x5a5)];},Game_Map[_0x165665(0x49c)]['isPlayerForceHidden']=function(){const _0x47034f=_0x165665;return this['_forceHidePlayer']===undefined&&this[_0x47034f(0x1cc)](),this[_0x47034f(0x5ae)];},VisuMZ[_0x165665(0x54c)][_0x165665(0x29f)]=Game_CharacterBase['prototype'][_0x165665(0x4a8)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4a8)]=function(){const _0xf1e43=_0x165665;if(this===$gamePlayer){if($gameMap[_0xf1e43(0x2c7)]())return![];if($gameMap[_0xf1e43(0x377)]())return!![];}return VisuMZ[_0xf1e43(0x54c)]['Game_CharacterBase_isTransparent'][_0xf1e43(0x4ca)](this);},Game_Map['prototype'][_0x165665(0x2c0)]=function(){const _0x812f22=_0x165665;this[_0x812f22(0x454)]=![],this['_forceHideFollower']=![];if(!$dataMap)return;const _0xaa5b5a=$dataMap[_0x812f22(0x3c8)]||'';if(_0xaa5b5a[_0x812f22(0x684)](/<HIDE FOLLOWERS>/i))this[_0x812f22(0x454)]=![],this[_0x812f22(0x3ac)]=!![];else{if(_0xaa5b5a[_0x812f22(0x684)](/<SHOW FOLLOWERS>/i)){if('BYHFe'!==_0x812f22(0x6d5))this[_0x812f22(0x454)]=!![],this['_forceHideFollower']=![];else return this['_shadowGraphic']['filename'];}}},Game_Map['prototype'][_0x165665(0x33f)]=function(){const _0x287d53=_0x165665;return this['_forceShowFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x287d53(0x454)];},Game_Map[_0x165665(0x49c)][_0x165665(0x1ef)]=function(){const _0x13d7d1=_0x165665;return this[_0x13d7d1(0x3ac)]===undefined&&('ODuvn'!==_0x13d7d1(0x4bd)?this['_attachPicture'][_0x13d7d1(0x375)]=_0x26459(_0x3f4861['$1']):this[_0x13d7d1(0x2c0)]()),this[_0x13d7d1(0x3ac)];},VisuMZ[_0x165665(0x54c)][_0x165665(0x68b)]=Game_Followers['prototype'][_0x165665(0x4e7)],Game_Followers['prototype'][_0x165665(0x4e7)]=function(){const _0x51da13=_0x165665;if($gameMap[_0x51da13(0x33f)]())return!![];if($gameMap[_0x51da13(0x1ef)]())return![];return VisuMZ[_0x51da13(0x54c)][_0x51da13(0x68b)][_0x51da13(0x4ca)](this);},Game_CommonEvent[_0x165665(0x49c)][_0x165665(0x2be)]=function(){const _0x53f625=_0x165665,_0x49df6e=this[_0x53f625(0x1c5)]();return this[_0x53f625(0x4a5)]()&&_0x49df6e['trigger']>=0x1&&DataManager['isAdvancedSwitch'](_0x49df6e[_0x53f625(0x3c1)]);},Game_CommonEvent[_0x165665(0x49c)]['hasCPCs']=function(){const _0x4e28a8=_0x165665;return VisuMZ[_0x4e28a8(0x54c)][_0x4e28a8(0x3f2)]['_commonEvents'][_0x4e28a8(0x347)](this[_0x4e28a8(0x222)]);},VisuMZ[_0x165665(0x54c)][_0x165665(0x661)]=Game_CommonEvent[_0x165665(0x49c)]['isActive'],Game_CommonEvent['prototype']['isActive']=function(){const _0x1c9747=_0x165665;if(VisuMZ[_0x1c9747(0x54c)][_0x1c9747(0x661)][_0x1c9747(0x4ca)](this))return!![];else{if('XzYqT'!==_0x1c9747(0x2bf))return VisuMZ['EventsMoveCore'][_0x1c9747(0x3f2)][_0x1c9747(0x324)](this[_0x1c9747(0x1c5)]()[_0x1c9747(0x365)],this[_0x1c9747(0x222)]);else{_0xbe99aa[_0x1c9747(0x1c9)](_0x4a27ee,_0x52e5ce);const _0x25f345=_0x4bfc51[_0x1c9747(0x69d)]();_0x1072bc[_0x1c9747(0x250)]=_0x161b20['MapId']||_0x1fe8f3[_0x1c9747(0x49b)]();const _0x191d05=[_0x3766d3[_0x1c9747(0x250)],_0x33dc92[_0x1c9747(0x36f)]||_0x25f345[_0x1c9747(0x694)](),_0x1c9747(0x500)[_0x1c9747(0x3ef)](_0x572dde['SwitchId'])],_0x577cda=_0x50cb80[_0x1c9747(0x2f2)],_0x4127e9=_0xe3a1bd[_0x1c9747(0x519)](_0x191d05)||![];_0x82c9fb['setValue'](_0x577cda,_0x4127e9);}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x662)]=Game_Map[_0x165665(0x49c)][_0x165665(0x389)],Game_Map[_0x165665(0x49c)][_0x165665(0x389)]=function(){const _0x541ace=_0x165665,_0xa89a43=VisuMZ[_0x541ace(0x54c)][_0x541ace(0x662)][_0x541ace(0x4ca)](this),_0x274e3b=VisuMZ[_0x541ace(0x54c)][_0x541ace(0x3f2)][_0x541ace(0x2c3)]['map'](_0x4b520e=>$dataCommonEvents[_0x4b520e]);return _0xa89a43[_0x541ace(0x5e5)](_0x274e3b)[_0x541ace(0x51a)]((_0x5cfaea,_0x3ffa9f,_0x4c95c7)=>_0x4c95c7[_0x541ace(0x67a)](_0x5cfaea)===_0x3ffa9f);},VisuMZ[_0x165665(0x54c)][_0x165665(0x57e)]=Game_CharacterBase['prototype'][_0x165665(0x346)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x346)]=function(){const _0x43cbee=_0x165665;VisuMZ['EventsMoveCore'][_0x43cbee(0x57e)]['call'](this),this[_0x43cbee(0x2c1)]();},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x2c1)]=function(){const _0x25d65f=_0x165665;this[_0x25d65f(0x207)]=![],this['clearPose'](),this[_0x25d65f(0x27f)](),this[_0x25d65f(0x6ad)](),this['clearStepPattern']();},VisuMZ[_0x165665(0x54c)][_0x165665(0x3d9)]=Game_CharacterBase['prototype'][_0x165665(0x5ca)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5ca)]=function(){const _0x2a47a9=_0x165665;let _0x59e14d=VisuMZ['EventsMoveCore'][_0x2a47a9(0x3d9)][_0x2a47a9(0x4ca)](this);return _0x59e14d=this[_0x2a47a9(0x4b9)](_0x59e14d),_0x59e14d;},Game_CharacterBase['prototype']['adjustMoveSynchOpacityDelta']=function(_0x4ec26f){return _0x4ec26f;},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x213)]=function(){const _0x4e71dd=_0x165665;if(this['constructor']===Game_Player&&this[_0x4e71dd(0x26e)]()){if('nUEZq'!==_0x4e71dd(0x1c4))return this[_0x4e71dd(0x1ca)]()['characterName']()[_0x4e71dd(0x684)](/\[VS8\]/i);else{if(_0xab104d[_0x4e71dd(0x26d)][_0x4e71dd(0x23d)]===_0x487150)return![];return _0x2afb86[_0x4e71dd(0x1de)][_0x4e71dd(0x347)](_0x49bb86);}}else return Imported[_0x4e71dd(0x61a)]&&this[_0x4e71dd(0x385)]()?!![]:this[_0x4e71dd(0x37e)]()[_0x4e71dd(0x684)](/\[VS8\]/i);},VisuMZ['EventsMoveCore'][_0x165665(0x4c7)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5cc)],Game_CharacterBase['prototype']['direction']=function(){const _0xe5d308=_0x165665;if(!$dataMap)return this[_0xe5d308(0x57b)]||0x2;if(this[_0xe5d308(0x284)]()&&!this[_0xe5d308(0x1f1)]()&&this[_0xe5d308(0x213)]())return this[_0xe5d308(0x3fb)]();else{if(this[_0xe5d308(0x284)]()&&!this[_0xe5d308(0x1f1)]())return 0x8;else return this[_0xe5d308(0x659)]()&&this[_0xe5d308(0x213)]()?this[_0xe5d308(0x1f4)]():VisuMZ['EventsMoveCore'][_0xe5d308(0x4c7)][_0xe5d308(0x4ca)](this);}},VisuMZ[_0x165665(0x54c)][_0x165665(0x37d)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4ab)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4ab)]=function(_0x958532){const _0x1b27a7=_0x165665;if(!this[_0x1b27a7(0x213)]())_0x958532=this[_0x1b27a7(0x5bf)](_0x958532);VisuMZ[_0x1b27a7(0x54c)]['Game_CharacterBase_setDirection'][_0x1b27a7(0x4ca)](this,_0x958532);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5bf)]=function(_0x33f9fb){const _0x388c43=_0x165665;if(_0x33f9fb===0x1)return this[_0x388c43(0x5c0)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x33f9fb===0x3)return this[_0x388c43(0x5c0)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x33f9fb===0x7)return this[_0x388c43(0x5c0)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x33f9fb===0x9)return this[_0x388c43(0x5c0)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x33f9fb;},Game_CharacterBase['prototype'][_0x165665(0x233)]=function(_0x28b963){const _0x3ece7b=_0x165665;return[0x1,0x3,0x5,0x7,0x9][_0x3ece7b(0x347)](_0x28b963);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x22b)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5ff)],Game_CharacterBase['prototype'][_0x165665(0x5ff)]=function(_0x3182c9){const _0xda158d=_0x165665;this['_lastMovedDirection']=_0x3182c9,VisuMZ['EventsMoveCore'][_0xda158d(0x303)][_0xda158d(0x4ca)](this,_0x3182c9);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5f1)]=function(_0x27d8b4){const _0x40914f=_0x165665;if(!this[_0x40914f(0x233)](_0x27d8b4))return this[_0x40914f(0x5ff)](_0x27d8b4);let _0x11b2c5=0x0,_0x38c425=0x0;switch(_0x27d8b4){case 0x1:_0x11b2c5=0x4,_0x38c425=0x2;break;case 0x3:_0x11b2c5=0x6,_0x38c425=0x2;break;case 0x7:_0x11b2c5=0x4,_0x38c425=0x8;break;case 0x9:_0x11b2c5=0x6,_0x38c425=0x8;break;}if(VisuMZ[_0x40914f(0x54c)][_0x40914f(0x256)]['Movement'][_0x40914f(0x37f)]){if(!this[_0x40914f(0x5c0)](this['_x'],this['_y'],_0x11b2c5))return this['moveStraight'](_0x38c425);if(!this[_0x40914f(0x5c0)](this['_x'],this['_y'],_0x38c425)){if(_0x40914f(0x2b2)===_0x40914f(0x40a)){if(_0x366279[0x2][_0x40914f(0x684)](/(?:SELF|MAP)/i))return this[_0x40914f(0x3bf)](_0x367237);else{return _0x3729c3[_0x40914f(0x54c)][_0x40914f(0x331)]['call'](this,_0x11f410);;}}else return this[_0x40914f(0x5ff)](_0x11b2c5);}if(!this[_0x40914f(0x4a0)](this['_x'],this['_y'],_0x11b2c5,_0x38c425)){let _0x2840a3=VisuMZ[_0x40914f(0x54c)][_0x40914f(0x256)][_0x40914f(0x2fc)][_0x40914f(0x6cf)]?_0x11b2c5:_0x38c425;return this[_0x40914f(0x5ff)](_0x2840a3);}}this[_0x40914f(0x4af)]=_0x27d8b4,this[_0x40914f(0x6dc)](_0x11b2c5,_0x38c425);},VisuMZ[_0x165665(0x54c)][_0x165665(0x6a5)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x491)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x491)]=function(){const _0x4c1235=_0x165665;let _0x106740=this[_0x4c1235(0x621)];if(this[_0x4c1235(0x2d6)]()){if(_0x4c1235(0x6b3)===_0x4c1235(0x6b3))_0x106740+=this[_0x4c1235(0x42d)]();else{if(this[_0x4c1235(0x368)]<=0x0)return;this[_0x4c1235(0x1fe)]=![],this[_0x4c1235(0x313)]=!![];}}return this[_0x4c1235(0x1bf)](_0x106740);},Game_CharacterBase[_0x165665(0x49c)]['dashSpeedModifier']=function(){const _0x256d66=_0x165665,_0x343e2c=VisuMZ['EventsMoveCore'][_0x256d66(0x256)][_0x256d66(0x2fc)];return _0x343e2c[_0x256d66(0x681)]!==undefined?_0x343e2c[_0x256d66(0x681)]:_0x256d66(0x3c4)!==_0x256d66(0x3c4)?this[_0x256d66(0x63c)](_0x26d524(_0x19257b['$1'])):VisuMZ[_0x256d66(0x54c)][_0x256d66(0x6a5)]['call'](this)-this[_0x256d66(0x621)];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x1bf)]=function(_0x957b7e){const _0x553808=_0x165665,_0x236cd7=VisuMZ['EventsMoveCore'][_0x553808(0x256)][_0x553808(0x2fc)];if(!_0x236cd7['SlowerSpeed'])return _0x957b7e;return[0x1,0x3,0x7,0x9]['includes'](this[_0x553808(0x4af)])&&(_0x957b7e*=_0x236cd7[_0x553808(0x1da)]||0.01),_0x957b7e;},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x2d6)],Game_CharacterBase['prototype'][_0x165665(0x2d6)]=function(){const _0x2a2602=_0x165665;if(this['_forceDashing'])return!![];return VisuMZ[_0x2a2602(0x54c)]['Game_CharacterBase_isDashing'][_0x2a2602(0x4ca)](this);},Game_CharacterBase[_0x165665(0x49c)]['isDashingAndMoving']=function(){const _0x2a48a5=_0x165665;return this['isDashing']()&&this[_0x2a48a5(0x4b6)]===0x0;},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x165665(0x49c)]['pattern'],Game_CharacterBase['prototype'][_0x165665(0x27d)]=function(){const _0x27a692=_0x165665;return this[_0x27a692(0x659)]()?this[_0x27a692(0x530)]():VisuMZ[_0x27a692(0x54c)][_0x27a692(0x362)][_0x27a692(0x4ca)](this);},VisuMZ[_0x165665(0x54c)][_0x165665(0x496)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x319)],Game_CharacterBase[_0x165665(0x49c)]['increaseSteps']=function(){const _0x396f3d=_0x165665;VisuMZ[_0x396f3d(0x54c)][_0x396f3d(0x496)][_0x396f3d(0x4ca)](this),this['clearPose']();},VisuMZ[_0x165665(0x54c)][_0x165665(0x229)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x58d)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x58d)]=function(){const _0x223879=_0x165665;if(this[_0x223879(0x213)]())return this[_0x223879(0x2b0)]();return VisuMZ['EventsMoveCore'][_0x223879(0x229)][_0x223879(0x4ca)](this);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x2b0)]=function(){const _0x108ab9=_0x165665,_0x5ce3ba=this['direction']();if(this[_0x108ab9(0x1f1)]()){if([0x2,0x4,0x6,0x8][_0x108ab9(0x347)](_0x5ce3ba))return 0x4;if([0x1,0x3,0x7,0x9][_0x108ab9(0x347)](_0x5ce3ba))return 0x5;}else{if(this[_0x108ab9(0x284)]()){if(_0x108ab9(0x395)===_0x108ab9(0x395))return 0x6;else{const _0x5860f7=_0x316a48['GetMoveSynchTarget'](this[_0x108ab9(0x560)]()),_0x5aa89c=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x5860f7[_0x108ab9(0x22b)]()];this[_0x108ab9(0x5f1)](_0x5aa89c);}}else{if(this[_0x108ab9(0x659)]()){if(_0x108ab9(0x55d)!=='UygBc')return this[_0x108ab9(0x518)]();else _0x39fa63[_0x108ab9(0x54c)][_0x108ab9(0x5c2)][_0x108ab9(0x4ca)](this),this[_0x108ab9(0x24d)]();}else{if(this[_0x108ab9(0x417)]){if(_0x108ab9(0x317)!==_0x108ab9(0x3bc)){if([0x2,0x4,0x6,0x8][_0x108ab9(0x347)](_0x5ce3ba))return 0x4;if([0x1,0x3,0x7,0x9][_0x108ab9(0x347)](_0x5ce3ba))return 0x5;}else{const _0x40e16b=_0x5edbd2[_0x108ab9(0x1d7)](this['moveSynchTarget']()),_0x11c344=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x40e16b[_0x108ab9(0x22b)]()];this[_0x108ab9(0x5f1)](_0x11c344);}}else{if(this['hasEventIcon']()&&this[_0x108ab9(0x1fa)]()){if(_0x108ab9(0x6dd)===_0x108ab9(0x364))return![];else{if([0x2,0x4,0x6,0x8][_0x108ab9(0x347)](_0x5ce3ba))return 0x4;if([0x1,0x3,0x7,0x9][_0x108ab9(0x347)](_0x5ce3ba))return 0x5;}}else{if(this[_0x108ab9(0x695)]()){if(_0x108ab9(0x5c1)!=='fFfIY'){if([0x2,0x4,0x6,0x8][_0x108ab9(0x347)](_0x5ce3ba))return 0x2;if([0x1,0x3,0x7,0x9][_0x108ab9(0x347)](_0x5ce3ba))return 0x3;}else _0x2286ce[_0x108ab9(0x54c)][_0x108ab9(0x2a1)][_0x108ab9(0x4ca)](this,_0x1e82ba);}else{if([0x2,0x4,0x6,0x8][_0x108ab9(0x347)](_0x5ce3ba))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x5ce3ba))return 0x1;}}}}}}},Game_CharacterBase[_0x165665(0x49c)]['useCarryPoseForIcons']=function(){const _0x45fdb2=_0x165665;return VisuMZ[_0x45fdb2(0x54c)][_0x45fdb2(0x256)]['VS8'][_0x45fdb2(0x1dd)];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x434)]=function(){const _0x449e87=_0x165665;return this[_0x449e87(0x284)]()&&this[_0x449e87(0x440)]()===VisuMZ['EventsMoveCore'][_0x449e87(0x256)][_0x449e87(0x483)][_0x449e87(0x1ee)];},Game_CharacterBase['prototype'][_0x165665(0x3fb)]=function(){const _0x229428=_0x165665;if(this[_0x229428(0x434)]()){if('IkpfF'!==_0x229428(0x60a)){if(_0x3411f2[_0x229428(0x26d)][_0x229428(0x23d)]===_0x4192d0)return![];return _0x28ed51[_0x229428(0x4db)][_0x229428(0x347)](_0x1ddc8a);}else return 0x4;}else return 0x2;},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_update']=Game_CharacterBase['prototype']['update'],Game_CharacterBase[_0x165665(0x49c)]['update']=function(){const _0x283982=_0x165665;VisuMZ[_0x283982(0x54c)][_0x283982(0x57d)][_0x283982(0x4ca)](this),this[_0x283982(0x472)]();},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x472)]=function(){const _0x3cb5bb=_0x165665;this[_0x3cb5bb(0x5ef)]=this[_0x3cb5bb(0x5ef)]||0x0;if(this[_0x3cb5bb(0x5ef)]>0x0){this[_0x3cb5bb(0x5ef)]--;if(this[_0x3cb5bb(0x5ef)]<=0x0&&this[_0x3cb5bb(0x5fa)]!==_0x3cb5bb(0x581))this[_0x3cb5bb(0x4ff)]();}},VisuMZ[_0x165665(0x54c)][_0x165665(0x6d8)]=Game_CharacterBase['prototype'][_0x165665(0x6dc)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x6dc)]=function(_0x147853,_0x5aab17){const _0x2c6e2a=_0x165665;VisuMZ[_0x2c6e2a(0x54c)]['Game_CharacterBase_moveDiagonally'][_0x2c6e2a(0x4ca)](this,_0x147853,_0x5aab17);if(this[_0x2c6e2a(0x213)]())this[_0x2c6e2a(0x4c0)](_0x147853,_0x5aab17);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4c0)]=function(_0x3d330a,_0x112ac6){const _0x18b122=_0x165665;if(_0x3d330a===0x4&&_0x112ac6===0x2)this[_0x18b122(0x4ab)](0x1);if(_0x3d330a===0x6&&_0x112ac6===0x2)this[_0x18b122(0x4ab)](0x3);if(_0x3d330a===0x4&&_0x112ac6===0x8)this[_0x18b122(0x4ab)](0x7);if(_0x3d330a===0x6&&_0x112ac6===0x8)this[_0x18b122(0x4ab)](0x9);},VisuMZ[_0x165665(0x54c)][_0x165665(0x2e8)]=Game_CharacterBase['prototype'][_0x165665(0x68d)],Game_CharacterBase[_0x165665(0x49c)]['hasStepAnime']=function(){const _0x14b401=_0x165665;if(this['isPosing']()&&this['getPose']()===_0x14b401(0x581))return!![];return VisuMZ[_0x14b401(0x54c)][_0x14b401(0x2e8)][_0x14b401(0x4ca)](this);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x533)]=function(_0x23b9e5,_0x6a0ad4){const _0x2b2ae0=_0x165665;if(_0x23b9e5[_0x2b2ae0(0x684)](/Z/i))_0x23b9e5='ZZZ';if(_0x23b9e5[_0x2b2ae0(0x684)](/SLEEP/i))_0x23b9e5=_0x2b2ae0(0x581);if(this[_0x2b2ae0(0x213)]()){if(_0x2b2ae0(0x5e2)===_0x2b2ae0(0x618)){if(this[_0x2b2ae0(0x4e3)]===_0x22e495)this['initEventsMoveCore']();const _0x358281=_0x2ac868===_0x36b501?'Player':_0x2b2ae0(0x508)[_0x2b2ae0(0x3ef)](_0x40f626[_0x2b2ae0(0x1b4)],_0x51697e[_0x2b2ae0(0x676)]);this['_EventIcons'][_0x358281]={'iconIndex':_0x2eedd5,'bufferX':_0x4797be,'bufferY':_0x3e483a,'blendMode':_0x22962b};}else this[_0x2b2ae0(0x5fa)]=_0x23b9e5[_0x2b2ae0(0x4b7)]()['trim'](),this[_0x2b2ae0(0x5ef)]=_0x6a0ad4||Infinity;}},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x29d)]=function(){const _0x23ef2e=_0x165665;if(this['isSpriteVS8dir']())return(this[_0x23ef2e(0x5fa)]||'')[_0x23ef2e(0x4b7)]()[_0x23ef2e(0x43e)]();else{if(_0x23ef2e(0x2f1)!==_0x23ef2e(0x2f1)){let _0x42ce44=this[_0x23ef2e(0x6b5)]()||0x1,_0x10234e=this['getAttachPictureBitmapHeight']()||0x1;const _0x39f63c=_0x4843ca[_0x23ef2e(0x1d2)](0x1,_0x42ce44,_0x10234e);_0x4f13ec=_0x12395c/_0x39f63c;}else return''[_0x23ef2e(0x4b7)]()[_0x23ef2e(0x43e)]();}},Game_CharacterBase[_0x165665(0x49c)]['setBalloonPose']=function(_0xbd7e04,_0x25185b){const _0x57bdc8=_0x165665;if(this['isSpriteVS8dir']()){if(_0x57bdc8(0x1ec)!==_0x57bdc8(0x4f7)){const _0x587f69=['',_0x57bdc8(0x46d),_0x57bdc8(0x2b6),_0x57bdc8(0x22c),_0x57bdc8(0x27a),'ANGER',_0x57bdc8(0x268),_0x57bdc8(0x6cc),'SILENCE',_0x57bdc8(0x1e3),'ZZZ','','','','',''][_0xbd7e04];this['setPose'](_0x587f69,_0x25185b);}else{if(!this['isNormalPriority']())return![];else{const _0x372719=_0x46e368[_0x57bdc8(0x45f)](_0x5145c7,_0x173e05)['filter'](_0x169397=>_0x169397!==this&&_0x169397[_0x57bdc8(0x56c)]());return _0x372719[_0x57bdc8(0x670)]>0x0;}}}},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4ff)]=function(){const _0x4a5028=_0x165665;this[_0x4a5028(0x5fa)]='',this[_0x4a5028(0x5ef)]=0x0;},Game_CharacterBase['prototype'][_0x165665(0x659)]=function(){const _0xec1b11=_0x165665;return this[_0xec1b11(0x213)]()&&!!this[_0xec1b11(0x5fa)];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x518)]=function(){const _0x52cc71=_0x165665,_0x19dc63=this[_0x52cc71(0x5fa)][_0x52cc71(0x4b7)]();switch(this[_0x52cc71(0x5fa)]['toUpperCase']()[_0x52cc71(0x43e)]()){case _0x52cc71(0x5db):case _0x52cc71(0x64b):case _0x52cc71(0x4de):case _0x52cc71(0x248):case'KNEEL':case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype']['getPosingCharacterDirection']=function(){const _0x3af245=_0x165665;switch(this[_0x3af245(0x5fa)][_0x3af245(0x4b7)]()){case _0x3af245(0x46d):case _0x3af245(0x2b6):case _0x3af245(0x22c):case'!':case'?':return 0x2;break;case _0x3af245(0x27a):case _0x3af245(0x4f6):case _0x3af245(0x268):return 0x4;break;case _0x3af245(0x5db):case'HMPH':case _0x3af245(0x4de):case _0x3af245(0x6cc):case _0x3af245(0x245):case _0x3af245(0x1e3):return 0x6;break;case'HURT':case _0x3af245(0x4cb):case _0x3af245(0x4d9):case _0x3af245(0x581):case _0x3af245(0x48f):return 0x8;break;default:return VisuMZ[_0x3af245(0x54c)]['Game_CharacterBase_setDirection'][_0x3af245(0x4ca)](this);break;}},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x530)]=function(){const _0x5d2a45=_0x165665;switch(this['_pose'][_0x5d2a45(0x4b7)]()){case _0x5d2a45(0x5db):case'HURT':case _0x5d2a45(0x46d):case'!':case'HEART':case'COBWEB':return 0x0;break;case _0x5d2a45(0x64b):case _0x5d2a45(0x4cb):case _0x5d2a45(0x2b6):case'?':case'ANGER':case _0x5d2a45(0x245):return 0x1;break;case'VICTORY':case'COLLAPSE':case _0x5d2a45(0x22c):case _0x5d2a45(0x268):case _0x5d2a45(0x1e3):return 0x2;break;default:return VisuMZ[_0x5d2a45(0x54c)][_0x5d2a45(0x362)][_0x5d2a45(0x4ca)](this);break;}},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x598)]=function(){const _0x2be2a4=_0x165665;this[_0x2be2a4(0x417)]=!![];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x6bf)]=function(){const _0x35f963=_0x165665;this[_0x35f963(0x417)]=![];},Game_CharacterBase[_0x165665(0x49c)]['forceDashing']=function(){const _0x19ab3f=_0x165665;this[_0x19ab3f(0x55c)]=!![];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x27f)]=function(){const _0x415945=_0x165665;this[_0x415945(0x55c)]=![];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4e0)]=function(){const _0x11d1e8=_0x165665;if(this[_0x11d1e8(0x4f2)]())return![];if(this[_0x11d1e8(0x6ac)])return![];if(this[_0x11d1e8(0x64c)]==='')return![];if(this[_0x11d1e8(0x23d)]===Game_Vehicle)return![];if(this[_0x11d1e8(0x4a8)]())return![];return!![];},Game_CharacterBase['prototype'][_0x165665(0x645)]=function(){const _0x36d8f6=_0x165665;if(this[_0x36d8f6(0x284)]())return!![];if(this[_0x36d8f6(0x23d)]===Game_Player&&this[_0x36d8f6(0x26e)]())return!![];return![];},Game_CharacterBase[_0x165665(0x49c)]['shadowFilename']=function(){const _0x3bea8c=_0x165665;return VisuMZ[_0x3bea8c(0x54c)][_0x3bea8c(0x256)][_0x3bea8c(0x2fc)][_0x3bea8c(0x691)];},Game_CharacterBase['prototype']['shadowX']=function(){return this['screenX']();},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x487)]=function(){const _0x45ed61=_0x165665,_0x4b6735=$gameMap[_0x45ed61(0x3e8)]();return Math[_0x45ed61(0x277)](this['scrolledY']()*_0x4b6735+_0x4b6735);},Game_Character[_0x165665(0x49c)][_0x165665(0x1cf)]=function(_0x398dbb,_0x855a23){const _0x340eff=_0x165665,_0x26ce05=this['searchLimit'](),_0x21f562=$gameMap[_0x340eff(0x5e8)](),_0x5428f0=[],_0x695570=[],_0x3b1df3=[],_0x4f3e62={};let _0x32551a=_0x4f3e62;if(this['x']===_0x398dbb&&this['y']===_0x855a23){if(_0x340eff(0x209)!==_0x340eff(0x5c8))return 0x0;else _0x2535ec=this[_0x340eff(0x404)](_0x2dbe8c,_0x43c0cb);}_0x4f3e62[_0x340eff(0x634)]=null,_0x4f3e62['x']=this['x'],_0x4f3e62['y']=this['y'],_0x4f3e62['g']=0x0,_0x4f3e62['f']=$gameMap[_0x340eff(0x2ea)](_0x4f3e62['x'],_0x4f3e62['y'],_0x398dbb,_0x855a23),_0x5428f0['push'](_0x4f3e62),_0x695570[_0x340eff(0x673)](_0x4f3e62['y']*_0x21f562+_0x4f3e62['x']);while(_0x5428f0[_0x340eff(0x670)]>0x0){let _0x5ad5b7=0x0;for(let _0x2b903c=0x0;_0x2b903c<_0x5428f0[_0x340eff(0x670)];_0x2b903c++){_0x5428f0[_0x2b903c]['f']<_0x5428f0[_0x5ad5b7]['f']&&(_0x5ad5b7=_0x2b903c);}const _0x18fd33=_0x5428f0[_0x5ad5b7],_0xe39f27=_0x18fd33['x'],_0x25a6e3=_0x18fd33['y'],_0x494252=_0x25a6e3*_0x21f562+_0xe39f27,_0x259d57=_0x18fd33['g'];_0x5428f0['splice'](_0x5ad5b7,0x1),_0x695570[_0x340eff(0x4dd)](_0x695570[_0x340eff(0x67a)](_0x494252),0x1),_0x3b1df3[_0x340eff(0x673)](_0x494252);if(_0x18fd33['x']===_0x398dbb&&_0x18fd33['y']===_0x855a23){_0x32551a=_0x18fd33;break;}if(_0x259d57>=_0x26ce05)continue;const _0x436142=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x3655f1=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x4f47bf=0x1;_0x4f47bf<0xa;_0x4f47bf++){if(_0x340eff(0x322)!==_0x340eff(0x322)){const _0x277f58=_0x25a892?_0x2d47c7[_0x340eff(0x49b)]():0x0,_0x1c9aec=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x340eff(0x3ef)](_0x277f58,_0x239119)];_0x356d5d[_0x340eff(0x40d)](_0x1c9aec,_0x3e436c);}else{if(_0x4f47bf===0x5)continue;const _0x378d0c=_0x4f47bf,_0x2926cb=_0x436142[_0x4f47bf],_0x53c6b0=_0x3655f1[_0x4f47bf],_0x340ac1=$gameMap['roundXWithDirection'](_0xe39f27,_0x378d0c),_0x203e31=$gameMap['roundYWithDirection'](_0x25a6e3,_0x378d0c),_0x4cba2e=_0x203e31*_0x21f562+_0x340ac1;if(_0x3b1df3[_0x340eff(0x347)](_0x4cba2e))continue;if(this['constructor']===Game_Player&&VisuMZ[_0x340eff(0x54c)][_0x340eff(0x256)][_0x340eff(0x2fc)][_0x340eff(0x37f)]){if(_0x340eff(0x3e9)!=='qDyor')return _0x3c11de['PreloadedMaps'][_0x5ea14f][_0x340eff(0x2f8)][_0x3a3f71];else{if(!this['canPass'](_0xe39f27,_0x25a6e3,_0x2926cb))continue;if(!this[_0x340eff(0x5c0)](_0xe39f27,_0x25a6e3,_0x53c6b0))continue;}}if(!this['canPassDiagonally'](_0xe39f27,_0x25a6e3,_0x2926cb,_0x53c6b0))continue;const _0x75fe8=_0x259d57+0x1,_0x90c7fe=_0x695570[_0x340eff(0x67a)](_0x4cba2e);if(_0x90c7fe<0x0||_0x75fe8<_0x5428f0[_0x90c7fe]['g']){let _0x3eb9c6={};_0x90c7fe>=0x0?_0x3eb9c6=_0x5428f0[_0x90c7fe]:(_0x5428f0[_0x340eff(0x673)](_0x3eb9c6),_0x695570['push'](_0x4cba2e)),_0x3eb9c6[_0x340eff(0x634)]=_0x18fd33,_0x3eb9c6['x']=_0x340ac1,_0x3eb9c6['y']=_0x203e31,_0x3eb9c6['g']=_0x75fe8,_0x3eb9c6['f']=_0x75fe8+$gameMap[_0x340eff(0x2ea)](_0x340ac1,_0x203e31,_0x398dbb,_0x855a23),(!_0x32551a||_0x3eb9c6['f']-_0x3eb9c6['g']<_0x32551a['f']-_0x32551a['g'])&&('KFlWL'!==_0x340eff(0x1fb)?_0x32551a=_0x3eb9c6:this['contentsOpacity']+=this['opacitySpeed']());}}}}let _0xe544a=_0x32551a;while(_0xe544a['parent']&&_0xe544a['parent']!==_0x4f3e62){_0xe544a=_0xe544a[_0x340eff(0x634)];}const _0x544a69=$gameMap[_0x340eff(0x323)](_0xe544a['x'],_0x4f3e62['x']),_0x117879=$gameMap[_0x340eff(0x40c)](_0xe544a['y'],_0x4f3e62['y']);if(_0x544a69<0x0&&_0x117879>0x0)return 0x1;if(_0x544a69>0x0&&_0x117879>0x0)return 0x3;if(_0x544a69<0x0&&_0x117879<0x0)return 0x7;if(_0x544a69>0x0&&_0x117879<0x0)return 0x9;if(_0x117879>0x0)return 0x2;if(_0x544a69<0x0)return 0x4;if(_0x544a69>0x0)return 0x6;if(_0x117879<0x0)return 0x8;const _0x37f2bb=this[_0x340eff(0x307)](_0x398dbb),_0x3b4229=this['deltaYFrom'](_0x855a23);if(Math[_0x340eff(0x5d3)](_0x37f2bb)>Math['abs'](_0x3b4229))return _0x37f2bb>0x0?0x4:0x6;else{if(_0x3b4229!==0x0){if(_0x340eff(0x259)==='wghtK')return _0x3b4229>0x0?0x8:0x2;else{const _0x55d784=this['_character'][_0x340eff(0x5cc)]();let _0x5bee4e=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x340eff(0x3fc)]['_mirrorSprite']&&(_0x5bee4e=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x5bee4e[_0x55d784]-0x2)/0x2;}}}return 0x0;},VisuMZ[_0x165665(0x54c)][_0x165665(0x4d1)]=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5c0)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5c0)]=function(_0xe2c1ca,_0x7d115,_0x445725){const _0x2751d6=_0x165665;if(this[_0x2751d6(0x230)]==='airship')return this[_0x2751d6(0x1ca)]()[_0x2751d6(0x3ca)](_0xe2c1ca,_0x7d115,_0x445725);else{if('heYpR'!==_0x2751d6(0x2d5)){if(_0x5bd4ba[_0x2751d6(0x473)]())return![];return _0x26364a['MapSwitches'][_0x2751d6(0x347)](_0x13714a);}else return VisuMZ['EventsMoveCore'][_0x2751d6(0x4d1)]['call'](this,_0xe2c1ca,_0x7d115,_0x445725);}},Game_CharacterBase['prototype']['clearSpriteOffsets']=function(){const _0x35f429=_0x165665;this[_0x35f429(0x1df)]=0x0,this[_0x35f429(0x398)]=0x0;},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x165665(0x49c)]['screenX'],Game_CharacterBase[_0x165665(0x49c)]['screenX']=function(){const _0x374ce6=_0x165665;return VisuMZ[_0x374ce6(0x54c)]['Game_CharacterBase_screenX'][_0x374ce6(0x4ca)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x165665(0x54c)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x37c)],Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x37c)]=function(){const _0x8f2a82=_0x165665;return VisuMZ[_0x8f2a82(0x54c)][_0x8f2a82(0x551)][_0x8f2a82(0x4ca)](this)+(this[_0x8f2a82(0x398)]||0x0);},Game_CharacterBase[_0x165665(0x571)]=VisuMZ[_0x165665(0x54c)]['Settings'][_0x165665(0x2fc)][_0x165665(0x568)]??-0x6,Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x613)]=function(){const _0x34c4a4=_0x165665;return this[_0x34c4a4(0x36d)]()?0x0:-Game_CharacterBase[_0x34c4a4(0x571)];},Game_CharacterBase['prototype'][_0x165665(0x5a8)]=function(){const _0x40c036=_0x165665;this[_0x40c036(0x5aa)]='';},VisuMZ[_0x165665(0x54c)][_0x165665(0x2d4)]=Game_CharacterBase[_0x165665(0x49c)]['updatePattern'],Game_CharacterBase['prototype'][_0x165665(0x218)]=function(){const _0x2a3dd3=_0x165665;if(this[_0x2a3dd3(0x207)])return;if(this[_0x2a3dd3(0x5d2)]())return;VisuMZ[_0x2a3dd3(0x54c)][_0x2a3dd3(0x2d4)][_0x2a3dd3(0x4ca)](this);},Game_CharacterBase['prototype'][_0x165665(0x5d2)]=function(){const _0x2bf9e5=_0x165665;if(!this[_0x2bf9e5(0x68d)]()&&this[_0x2bf9e5(0x4b6)]>0x0)return![];switch(String(this['_stepPattern'])[_0x2bf9e5(0x4b7)]()['trim']()){case _0x2bf9e5(0x68c):this[_0x2bf9e5(0x433)]+=0x1;if(this[_0x2bf9e5(0x433)]>0x2)this[_0x2bf9e5(0x667)](0x0);break;case _0x2bf9e5(0x5fe):this['_pattern']-=0x1;if(this['_pattern']<0x0)this[_0x2bf9e5(0x667)](0x2);break;case'SPIN\x20CLOCKWISE':case _0x2bf9e5(0x403):this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x2bf9e5(0x6df):case _0x2bf9e5(0x4e9):case _0x2bf9e5(0x601):this[_0x2bf9e5(0x21a)]();break;default:return![];}return!![];},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x631)]=function(){const _0x2b2f21=_0x165665;return $gameSystem[_0x2b2f21(0x631)](this);},Game_CharacterBase['prototype'][_0x165665(0x384)]=function(){const _0x279183=_0x165665,_0xbabc5c=this['getEventIconData']();if(!_0xbabc5c)return![];return _0xbabc5c[_0x279183(0x5ab)]>0x0;},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x293)]=function(){const _0x1d390d=_0x165665,_0x3d4c03=this['direction']();return $gameMap[_0x1d390d(0x50c)](this['x'],_0x3d4c03);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x374)]=function(){const _0x51abbe=_0x165665,_0x3b1d11=this[_0x51abbe(0x5cc)]();return $gameMap[_0x51abbe(0x54d)](this['y'],_0x3b1d11);},Game_CharacterBase[_0x165665(0x49c)]['backX']=function(){const _0x38b1e7=_0x165665,_0x2edd7f=this[_0x38b1e7(0x63f)](this[_0x38b1e7(0x5cc)]());return $gameMap[_0x38b1e7(0x50c)](this['x'],_0x2edd7f);},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x685)]=function(){const _0x24e442=_0x165665,_0x1b80f8=this['reverseDir'](this[_0x24e442(0x5cc)]());return $gameMap[_0x24e442(0x54d)](this['y'],_0x1b80f8);},VisuMZ[_0x165665(0x54c)][_0x165665(0x36e)]=Game_Character[_0x165665(0x49c)][_0x165665(0x5d8)],Game_Character[_0x165665(0x49c)][_0x165665(0x5d8)]=function(_0x1e4581){const _0x50766c=_0x165665;route=JsonEx['makeDeepCopy'](_0x1e4581),VisuMZ[_0x50766c(0x54c)][_0x50766c(0x36e)][_0x50766c(0x4ca)](this,route);},VisuMZ[_0x165665(0x54c)][_0x165665(0x338)]=Game_Character[_0x165665(0x49c)][_0x165665(0x3fe)],Game_Character[_0x165665(0x49c)][_0x165665(0x3fe)]=function(_0x4f9b5a){const _0x3421ae=_0x165665;route=JsonEx[_0x3421ae(0x2fa)](_0x4f9b5a),VisuMZ[_0x3421ae(0x54c)][_0x3421ae(0x338)][_0x3421ae(0x4ca)](this,route);},VisuMZ['EventsMoveCore'][_0x165665(0x2a1)]=Game_Character['prototype'][_0x165665(0x2a6)],Game_Character['prototype'][_0x165665(0x2a6)]=function(_0xbab862){const _0x4b331d=_0x165665,_0x59eb9d=Game_Character,_0x218b3b=_0xbab862['parameters'];if(_0xbab862['code']===_0x59eb9d[_0x4b331d(0x484)]){if(_0x4b331d(0x30d)!==_0x4b331d(0x5d0)){let _0x411fec=_0xbab862[_0x4b331d(0x249)][0x0];_0x411fec=this[_0x4b331d(0x24b)](_0x411fec),_0x411fec=this[_0x4b331d(0x3cb)](_0x411fec),this[_0x4b331d(0x401)](_0xbab862,_0x411fec);}else{if(!this[_0x4b331d(0x3fc)])return;let _0x1e599b=!!this[_0x4b331d(0x3fc)][_0x4b331d(0x34d)];this['scale']['x']=_0x4261cb['abs'](this[_0x4b331d(0x49a)]['x'])*(_0x1e599b?-0x1:0x1);}}else{if(_0x4b331d(0x6b6)===_0x4b331d(0x6b6))VisuMZ[_0x4b331d(0x54c)][_0x4b331d(0x2a1)][_0x4b331d(0x4ca)](this,_0xbab862);else{_0x28d0ca[_0x4b331d(0x54c)][_0x4b331d(0x318)][_0x4b331d(0x4ca)](this,_0x4fb23d);if(this[_0x4b331d(0x594)]()){this[_0x4b331d(0x414)](_0x63ec69);if(_0x4bb313[_0x4b331d(0x347)](0x0)&&this[_0x4b331d(0x305)]()===_0x4b331d(0x6c0))this[_0x4b331d(0x23b)](this['x'],this['y']);else(_0x23a517['includes'](0x1)||_0x461a71[_0x4b331d(0x347)](0x2))&&this[_0x4b331d(0x32e)]();}}}},Game_Character[_0x165665(0x49c)][_0x165665(0x24b)]=function(_0x791f1c){const _0x3f3a70=_0x165665,_0x691b01=/\$gameVariables\.value\((\d+)\)/gi,_0x36725e=/\\V\[(\d+)\]/gi;while(_0x791f1c['match'](_0x691b01)){if(_0x3f3a70(0x292)!==_0x3f3a70(0x292))return this['attachPictureSettings']()[_0x3f3a70(0x24a)]??0x0;else _0x791f1c=_0x791f1c['replace'](_0x691b01,(_0x26ba3f,_0x245149)=>$gameVariables[_0x3f3a70(0x519)](parseInt(_0x245149)));}while(_0x791f1c['match'](_0x36725e)){_0x791f1c=_0x791f1c['replace'](_0x36725e,(_0x3cce81,_0x3f844c)=>$gameVariables[_0x3f3a70(0x519)](parseInt(_0x3f844c)));}return _0x791f1c;},Game_Character[_0x165665(0x49c)][_0x165665(0x3cb)]=function(_0x57b0af){const _0xa5ce3=_0x165665,_0x1fbb88=/\\SELFVAR\[(\d+)\]/gi;while(_0x57b0af[_0xa5ce3(0x684)](_0x1fbb88)){_0x57b0af=_0x57b0af[_0xa5ce3(0x3db)](_0x1fbb88,(_0x756d1c,_0x28a7c6)=>getSelfVariableValue(this[_0xa5ce3(0x1b4)],this[_0xa5ce3(0x676)],parseInt(_0x28a7c6)));}return _0x57b0af;},Game_Character[_0x165665(0x49c)]['processMoveCommandEventsMoveCore']=function(_0x88b33e,_0x1e2641){const _0x172ede=_0x165665;if(_0x1e2641['match'](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/BALLOON:[ ](.*)/i)){if(_0x172ede(0x4fa)!==_0x172ede(0x4fa))this['_paused']=![],this[_0x172ede(0x2d3)]=-0x1,this['_expireCommonEvent']=0x0;else return this[_0x172ede(0x6cb)](String(RegExp['$1']));}if(_0x1e2641[_0x172ede(0x684)](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/FADE OUT:[ ](\d+)/i)){if(_0x172ede(0x6b8)!=='mVTsl')return this['processMoveRouteFadeOut'](Number(RegExp['$1']));else{let _0x103cce=_0x4af950[_0x172ede(0x54c)][_0x172ede(0x256)][_0x172ede(0x2fc)][_0x172ede(0x6cf)]?_0xc14225:_0x101fd5;return this[_0x172ede(0x5ff)](_0x103cce);}}if(_0x1e2641[_0x172ede(0x684)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x172ede(0x4be)!=='gclQY')return this['forceCarrying']();else{_0xf6277b[_0x172ede(0x1c9)](_0x18f8f2,_0x2eba85);const _0x1d977e=_0x2c05f0['getLastPluginCommandInterpreter']();if(!_0x1db5ee)return;const _0x2e5ed7=_0x1841d3[_0x172ede(0x1c5)](_0x5dd34a[_0x172ede(0x36f)]||_0x1d977e[_0x172ede(0x694)]());if(_0x2e5ed7)_0x2e5ed7['saveEventLocation']();}}if(_0x1e2641[_0x172ede(0x684)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x1e2641[_0x172ede(0x684)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0x172ede(0x1c2)!==_0x172ede(0x3d3))return this[_0x172ede(0x3c9)]();else{this['_labelWindows']=[];for(const _0x4e8724 of _0x2107bd['events']()){this[_0x172ede(0x464)](_0x4e8724);}}}if(_0x1e2641[_0x172ede(0x684)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x1e2641[_0x172ede(0x684)](/HUG:[ ]LEFT/i))return this[_0x172ede(0x393)](_0x172ede(0x3d6));if(_0x1e2641[_0x172ede(0x684)](/HUG:[ ]RIGHT/i))return this[_0x172ede(0x393)](_0x172ede(0x1ed));if(_0x1e2641[_0x172ede(0x684)](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x4ba2c4=this['_characterIndex']+Number(RegExp['$1']);return this[_0x172ede(0x69c)](_0x4ba2c4);}if(_0x1e2641[_0x172ede(0x684)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x172ede(0x620)](Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x172ede(0x690)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e2641[_0x172ede(0x684)](/JUMP TO EVENT:[ ](\d+)/i)){if('YDGIw'!==_0x172ede(0x5de)){for(let _0x3d6b45=-this[_0x172ede(0x48e)][_0x172ede(0x3d6)];_0x3d6b45<=this[_0x172ede(0x48e)][_0x172ede(0x1ed)];_0x3d6b45++){for(let _0x53893b=-this[_0x172ede(0x48e)]['up'];_0x53893b<=this[_0x172ede(0x48e)]['down'];_0x53893b++){if(!_0x36b856[_0x172ede(0x49c)][_0x172ede(0x5c0)][_0x172ede(0x4ca)](this,_0x3fa466+_0x3d6b45,_0x2ca599+_0x53893b,_0x12deb2))return![];}}return!![];}else{const _0x56d725=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x56d725);}}if(_0x1e2641['match'](/JUMP TO PLAYER/i)){if('vlMCP'===_0x172ede(0x5a9))return this[_0x172ede(0x688)]($gamePlayer);else this[_0x172ede(0x340)](_0x549363);}if(_0x1e2641[_0x172ede(0x684)](/JUMP TO HOME/i)&&this[_0x172ede(0x694)]){const _0x331af6=this[_0x172ede(0x4d7)],_0x2ab0b2=this['_randomHomeY'];return this[_0x172ede(0x690)](_0x331af6,_0x2ab0b2);}if(_0x1e2641[_0x172ede(0x684)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x5abdd3=String(RegExp['$1']),_0x308dfe=this['checkCollisionKeywords'](_0x1e2641);return this[_0x172ede(0x5f3)](_0x5abdd3,_0x308dfe);}if(_0x1e2641[_0x172ede(0x684)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x3de265=Number(RegExp['$1']),_0x43a32d=Number(RegExp['$2']),_0x13268a=this['checkCollisionKeywords'](_0x1e2641);return this[_0x172ede(0x52f)](_0x3de265,_0x43a32d,_0x13268a);}if(_0x1e2641['match'](/MOVE TO EVENT:[ ](\d+)/i)){if('KPDRV'!=='Tmbmy'){const _0x356029=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1'])),_0x5c23f1=this[_0x172ede(0x506)](_0x1e2641);return this[_0x172ede(0x603)](_0x356029,_0x5c23f1);}else return this[_0x172ede(0x4ab)](0x1);}if(_0x1e2641[_0x172ede(0x684)](/MOVE TO PLAYER/i)){const _0x18e1a5=this[_0x172ede(0x506)](_0x1e2641);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x18e1a5);}if(_0x1e2641[_0x172ede(0x684)](/MOVE TO HOME/i)&&this[_0x172ede(0x694)]){const _0x3fa18a=this[_0x172ede(0x4d7)],_0xbaf8d2=this['_randomHomeY'],_0x571857=this[_0x172ede(0x506)](_0x1e2641);return this['processMoveRouteMoveTo'](_0x3fa18a,_0xbaf8d2,_0x571857);}if(_0x1e2641[_0x172ede(0x684)](/MOVE LOWER LEFT:[ ](\d+)/i)){if(_0x172ede(0x3a7)!==_0x172ede(0x3a7)){if(_0xe4b23[_0x172ede(0x473)]())return![];return _0xf10c39[_0x172ede(0x67d)][_0x172ede(0x347)](_0x40325c);}else return this[_0x172ede(0x2c2)](0x1,Number(RegExp['$1']));}if(_0x1e2641[_0x172ede(0x684)](/MOVE DOWN:[ ](\d+)/i))return this[_0x172ede(0x2c2)](0x2,Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x172ede(0x609)!==_0x172ede(0x5a0))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));else _0x431391[0x2]='Self\x20Switch\x20%1'[_0x172ede(0x3ef)](_0x438b24);}if(_0x1e2641['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x172ede(0x2c2)](0x4,Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/MOVE UPPER LEFT:[ ](\d+)/i)){if('kHfnw'!==_0x172ede(0x3da))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));else _0x139e83[_0x172ede(0x54c)]['Game_Player_executeMove'][_0x172ede(0x4ca)](this,_0x3da7c5);}if(_0x1e2641[_0x172ede(0x684)](/MOVE UP:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if(_0x172ede(0x2a9)==='dRYwG')return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));else{const _0x4c2d2a=this['_character'][_0x172ede(0x3ab)]();if(_0x4c2d2a){if(this[_0x172ede(0x427)]!==_0x4c2d2a[_0x172ede(0x375)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x4c2d2a[_0x172ede(0x24a)])return!![];if(this['_lastAttachPictureScale']!==_0x4c2d2a[_0x172ede(0x49a)])return!![];}return![];}}if(_0x1e2641['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x397d7b=Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x172ede(0x3f0)](_0x397d7b[_0x172ede(0x457)](0x0,0xff));}if(_0x1e2641[_0x172ede(0x684)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x1a1ec6=this[_0x172ede(0x3f5)]+Math[_0x172ede(0x3a8)](Number(RegExp['$1'])/0x64*0xff);return this[_0x172ede(0x3f0)](_0x1a1ec6[_0x172ede(0x457)](0x0,0xff));}if(_0x1e2641['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x440f80=this['_opacity']+Number(RegExp['$1']);return this[_0x172ede(0x3f0)](_0x440f80['clamp'](0x0,0xff));}if(_0x1e2641[_0x172ede(0x684)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x172ede(0x44e)](Number(RegExp['$1']));if(_0x1e2641[_0x172ede(0x684)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x1e2641[_0x172ede(0x684)](/POSE:[ ](.*)/i)){if(_0x172ede(0x4f4)!==_0x172ede(0x4f4))return _0x3f46c0[_0x172ede(0x2d6)]();else{const _0x2d9c8b=String(RegExp['$1'])[_0x172ede(0x4b7)]()[_0x172ede(0x43e)]();return this[_0x172ede(0x533)](_0x2d9c8b);}}if(_0x1e2641['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x172ede(0x2fb)!==_0x172ede(0x2fb)){if(this[_0x172ede(0x219)]()>0x0)return![];if(this[_0x172ede(0x3fc)]){if(this[_0x172ede(0x3fc)][_0x172ede(0x3f6)]()!=='')return![];}return this['isEmptyCharacter']()||this[_0x172ede(0x3fc)]&&this['_character'][_0x172ede(0x4a8)]();}else{const _0x273e4e=Number(RegExp['$1']),_0x155074=Number(RegExp['$2']);return this[_0x172ede(0x224)](_0x273e4e,_0x155074);}}if(_0x1e2641[_0x172ede(0x684)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x172ede(0x443)===_0x172ede(0x360))return this['isObjectCharacter']()?0x0:-_0x17d68b[_0x172ede(0x571)];else{const _0x58339d=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x58339d);}}if(_0x1e2641[_0x172ede(0x684)](/STEP TOWARD PLAYER/i)){if('AxzIL'!==_0x172ede(0x216))return this[_0x172ede(0x6d9)]($gamePlayer);else{const _0x272903=new _0x4b634f(0x0,0x0,0x1,0x1);this[_0x172ede(0x2ff)]=new _0x4526bb(_0x272903),this[_0x172ede(0x2ff)]['padding']=0x0,this['opacity']=this[_0x172ede(0x3b9)]()?0xff:0x0;}}if(_0x1e2641[_0x172ede(0x684)](/STEP TOWARD HOME/i)&&this[_0x172ede(0x694)]){const _0x418a38=this[_0x172ede(0x4d7)],_0xb316ba=this[_0x172ede(0x244)];return this[_0x172ede(0x224)](_0x418a38,_0xb316ba);}if(_0x1e2641[_0x172ede(0x684)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x172ede(0x203)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e2641[_0x172ede(0x684)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x4e5a99=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this[_0x172ede(0x261)](_0x4e5a99);}if(_0x1e2641[_0x172ede(0x684)](/STEP AWAY FROM PLAYER/i))return this[_0x172ede(0x261)]($gamePlayer);if(_0x1e2641[_0x172ede(0x684)](/STEP AWAY FROM HOME/i)&&this[_0x172ede(0x694)]){const _0x1e6b34=this[_0x172ede(0x4d7)],_0x52ac31=this[_0x172ede(0x244)];return this['moveAwayFromPoint'](_0x1e6b34,_0x52ac31);}if(_0x1e2641[_0x172ede(0x684)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x172ede(0x441)===_0x172ede(0x441))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x172ede(0x417)]=!![];}if(_0x1e2641[_0x172ede(0x684)](/TURN TO EVENT:[ ](\d+)/i)){const _0x5c2395=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this[_0x172ede(0x47c)](_0x5c2395);}if(_0x1e2641['match'](/TURN TO PLAYER/i)){if(_0x172ede(0x41f)!=='jNVIM')return this[_0x172ede(0x47c)]($gamePlayer);else{const _0x34bbac=_0x3551b4[_0x172ede(0x2de)]()||this;if(_0x34bbac[_0x172ede(0x23d)]!==_0x53b416)_0x517433[_0x172ede(0x54c)][_0x172ede(0x570)][_0x172ede(0x4ca)](this,_0x50000a,_0x5ecc3a);else{const _0x5a70e5=[_0x34bbac[_0x172ede(0x1b4)],_0x34bbac[_0x172ede(0x676)],_0x172ede(0x500)[_0x172ede(0x3ef)](_0x4eaa25)];_0x11da15['setValue'](_0x5a70e5,_0x4a44da);}}}if(_0x1e2641['match'](/TURN TO HOME/i)&&this['eventId']){const _0x1d5cbb=this[_0x172ede(0x4d7)],_0x3aaf40=this[_0x172ede(0x244)];return this[_0x172ede(0x3bb)](_0x1d5cbb,_0x3aaf40);}if(_0x1e2641['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e2641[_0x172ede(0x684)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x45bba3=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x45bba3);}if(_0x1e2641[_0x172ede(0x684)](/TURN AWAY FROM PLAYER/i)){if(_0x172ede(0x5f4)!==_0x172ede(0x5f4)){const _0x2b8d0b=_0x2c0b71[_0x172ede(0x437)][_0x4ac59a[_0x172ede(0x1ba)]-0x1]['list'];this[_0x172ede(0x43f)](_0x2b8d0b,this[_0x172ede(0x694)]());}else return this[_0x172ede(0x38b)]($gamePlayer);}if(_0x1e2641['match'](/TURN AWAY FROM HOME/i)&&this[_0x172ede(0x694)]){const _0x428237=this[_0x172ede(0x4d7)],_0x413773=this['_randomHomeY'];return this[_0x172ede(0x272)](_0x428237,_0x413773);}if(_0x1e2641[_0x172ede(0x684)](/TURN LOWER LEFT/i))return _0x172ede(0x567)!==_0x172ede(0x567)?![]:this[_0x172ede(0x4ab)](0x1);if(_0x1e2641['match'](/TURN LOWER RIGHT/i)){if(_0x172ede(0x4ec)==='Ahduv'){if(_0x5a1071[_0x172ede(0x33f)]())return!![];if(_0x30de25[_0x172ede(0x1ef)]())return![];return _0x1c0094['EventsMoveCore'][_0x172ede(0x68b)][_0x172ede(0x4ca)](this);}else return this[_0x172ede(0x4ab)](0x3);}if(_0x1e2641[_0x172ede(0x684)](/TURN UPPER LEFT/i))return _0x172ede(0x686)===_0x172ede(0x686)?this['setDirection'](0x7):_0x547ddb[_0x172ede(0x54c)][_0x172ede(0x6a5)][_0x172ede(0x4ca)](this)-this['_moveSpeed'];if(_0x1e2641[_0x172ede(0x684)](/TURN UPPER RIGHT/i)){if(_0x172ede(0x582)!=='ZMsbp')_0x528839!==this[_0x172ede(0x49b)]()&&_0x9c5ab8&&_0x4ea782['removeTemporaryMapSpawnedEvents'](this[_0x172ede(0x49b)]());else return this['setDirection'](0x9);}if(_0x1e2641[_0x172ede(0x684)](/Self Switch[ ](.*):[ ](.*)/i)){if('BFIjc'!==_0x172ede(0x30f))this[_0x172ede(0x1df)]=_0x42f98a(_0x2741a6['$1']),this['_spriteOffsetY']=_0x58bd22(_0x217826['$2']);else return this[_0x172ede(0x494)](RegExp['$1'],RegExp['$2']);}if(_0x1e2641[_0x172ede(0x684)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x172ede(0x60e)!==_0x172ede(0x642))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);else{if([0x2,0x4,0x6,0x8][_0x172ede(0x347)](_0x4473d3))return 0x4;if([0x1,0x3,0x7,0x9][_0x172ede(0x347)](_0x43d20b))return 0x5;}}if(_0x1e2641['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e2641[_0x172ede(0x684)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x5cf907=$gameMap[_0x172ede(0x1c5)](Number(RegExp['$1']));return this[_0x172ede(0x672)](_0x5cf907);}if(_0x1e2641['match'](/TELEPORT TO PLAYER/i))return this[_0x172ede(0x672)]($gamePlayer);if(_0x1e2641['match'](/TELEPORT TO HOME/i)&&this['eventId']){if(_0x172ede(0x2f3)!==_0x172ede(0x2f3))_0x307846['EventsMoveCore']['Game_Map_setupEvents'][_0x172ede(0x4ca)](this),this[_0x172ede(0x424)]();else{const _0x37d4fe=this[_0x172ede(0x4d7)],_0x177b0b=this['_randomHomeY'];return this[_0x172ede(0x24e)](_0x37d4fe,_0x177b0b);}}try{if('OFaNt'===_0x172ede(0x447))return _0x4d4096[_0x172ede(0x34f)](this),_0x344161[_0x172ede(0x54c)][_0x172ede(0x351)][_0x172ede(0x4ca)](this,_0x34ff37);else VisuMZ[_0x172ede(0x54c)][_0x172ede(0x2a1)][_0x172ede(0x4ca)](this,_0x88b33e);}catch(_0x48cf9d){if(_0x172ede(0x33b)==='MkeNW'){if($gameTemp[_0x172ede(0x696)]())console[_0x172ede(0x559)](_0x48cf9d);}else this[_0x172ede(0x5ca)]+=this['opacitySpeed']();}},Game_Character[_0x165665(0x49c)][_0x165665(0x63c)]=function(_0x552139){const _0x15fbfe=_0x165665;$gameTemp[_0x15fbfe(0x2e6)]([this],_0x552139);},Game_Character[_0x165665(0x49c)]['processMoveRouteBalloon']=function(_0xcdfb38){const _0x54c5f6=_0x165665;let _0x8bc18a=0x0;switch(_0xcdfb38[_0x54c5f6(0x4b7)]()['trim']()){case'!':case _0x54c5f6(0x46d):_0x8bc18a=0x1;break;case'?':case'QUESTION':_0x8bc18a=0x2;break;case _0x54c5f6(0x640):case'NOTE':case _0x54c5f6(0x22c):case'MUSIC-NOTE':case _0x54c5f6(0x316):_0x8bc18a=0x3;break;case _0x54c5f6(0x27a):case _0x54c5f6(0x1e7):_0x8bc18a=0x4;break;case _0x54c5f6(0x4f6):_0x8bc18a=0x5;break;case _0x54c5f6(0x268):_0x8bc18a=0x6;break;case _0x54c5f6(0x6cc):case _0x54c5f6(0x1e5):case _0x54c5f6(0x3b1):_0x8bc18a=0x7;break;case _0x54c5f6(0x245):case'...':_0x8bc18a=0x8;break;case'LIGHT':case _0x54c5f6(0x60b):case _0x54c5f6(0x1e3):case'LIGHT-BULB':case'LIGHTBULB':_0x8bc18a=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x54c5f6(0x48f):_0x8bc18a=0xa;break;case _0x54c5f6(0x20f):_0x8bc18a=0xb;break;case _0x54c5f6(0x6bd):_0x8bc18a=0xc;break;case'USER-DEFINED\x203':_0x8bc18a=0xd;break;case _0x54c5f6(0x3ff):_0x8bc18a=0xe;break;case'USER-DEFINED\x205':_0x8bc18a=0xf;break;}$gameTemp[_0x54c5f6(0x612)](this,_0x8bc18a);},Game_Character[_0x165665(0x49c)][_0x165665(0x3c6)]=function(_0x490a44){const _0x434806=_0x165665;_0x490a44+=this[_0x434806(0x3f5)],this[_0x434806(0x3f0)](_0x490a44[_0x434806(0x457)](0x0,0xff));if(this[_0x434806(0x3f5)]<0xff)this[_0x434806(0x3a3)]--;},Game_Character[_0x165665(0x49c)][_0x165665(0x4ed)]=function(_0x33c113){const _0xd334cf=_0x165665;_0x33c113=this[_0xd334cf(0x3f5)]-_0x33c113,this['setOpacity'](_0x33c113[_0xd334cf(0x457)](0x0,0xff));if(this['_opacity']>0x0)this['_moveRouteIndex']--;},Game_Character[_0x165665(0x49c)][_0x165665(0x393)]=function(_0x4140af){const _0x220000=_0x165665,_0x3e8590=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x47ed08=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x5e9cf1=this[_0x220000(0x5cc)](),_0x2b4e7a=(_0x4140af===_0x220000(0x3d6)?_0x3e8590:_0x47ed08)[_0x5e9cf1],_0x4196bb=(_0x4140af===_0x220000(0x3d6)?_0x47ed08:_0x3e8590)[_0x5e9cf1];if(this['canPass'](this['x'],this['y'],_0x2b4e7a)){if(_0x4140af===_0x220000(0x3d6)){if('IKpWq'!=='IKpWq'){const _0x220bc0=_0x578d08(_0x501412['$1'])[_0x220000(0x4b7)]()['trim']();return this[_0x220000(0x533)](_0x220bc0);}else this['turnLeft90']();}else{if(_0x220000(0x1fd)===_0x220000(0x1fd))this['turnRight90']();else return _0x42c391['EventsMoveCore'][_0x220000(0x6a1)]['call'](this,_0x4749ec);}}else!this['canPass'](this['x'],this['y'],this['direction']())&&(this[_0x220000(0x5c0)](this['x'],this['y'],_0x4196bb)?_0x4140af===_0x220000(0x3d6)?this[_0x220000(0x3aa)]():_0x220000(0x310)!==_0x220000(0x310)?this[_0x220000(0x590)](_0x5c5a36,_0x396abb):this[_0x220000(0x21a)]():this[_0x220000(0x58c)]());this[_0x220000(0x5c0)](this['x'],this['y'],this[_0x220000(0x5cc)]())&&this[_0x220000(0x3eb)]();},Game_Character[_0x165665(0x49c)]['processMoveRouteSetIndex']=function(_0x53aed8){const _0xa645ed=_0x165665;if(ImageManager[_0xa645ed(0x30a)](this[_0xa645ed(0x64c)]))return;_0x53aed8=_0x53aed8['clamp'](0x0,0x7),this[_0xa645ed(0x5dc)](this[_0xa645ed(0x64c)],_0x53aed8);},Game_Character[_0x165665(0x49c)]['processMoveRouteJumpForward']=function(_0x47cf48){const _0x37d652=_0x165665;switch(this['direction']()){case 0x1:this[_0x37d652(0x357)](-_0x47cf48,_0x47cf48);break;case 0x2:this['jump'](0x0,_0x47cf48);break;case 0x3:this[_0x37d652(0x357)](_0x47cf48,_0x47cf48);break;case 0x4:this[_0x37d652(0x357)](-_0x47cf48,0x0);break;case 0x6:this[_0x37d652(0x357)](_0x47cf48,0x0);break;case 0x7:this[_0x37d652(0x357)](-_0x47cf48,-_0x47cf48);break;case 0x8:this['jump'](0x0,-_0x47cf48);break;case 0x9:this[_0x37d652(0x357)](_0x47cf48,-_0x47cf48);break;}},Game_Character[_0x165665(0x49c)][_0x165665(0x690)]=function(_0xdd6649,_0x42f628){const _0x51e18a=_0x165665,_0x41de71=Math[_0x51e18a(0x3a8)](_0xdd6649-this['x']),_0x1f6793=Math[_0x51e18a(0x3a8)](_0x42f628-this['y']);this['jump'](_0x41de71,_0x1f6793);},Game_Character[_0x165665(0x49c)][_0x165665(0x688)]=function(_0xb6a3ea){if(_0xb6a3ea)this['processMoveRouteJumpTo'](_0xb6a3ea['x'],_0xb6a3ea['y']);},Game_Character[_0x165665(0x49c)][_0x165665(0x224)]=function(_0x3e72a5,_0x46ea53,_0x3bebc1){const _0x1a2240=_0x165665;let _0x56044a=0x0;if(_0x3bebc1)$gameTemp['_moveAllowPlayerCollision']=!![];if($gameMap['isSupportDiagonalMovement']())_0x56044a=this[_0x1a2240(0x1cf)](_0x3e72a5,_0x46ea53);else{if(_0x1a2240(0x227)!==_0x1a2240(0x6d7))_0x56044a=this[_0x1a2240(0x404)](_0x3e72a5,_0x46ea53);else{const _0x1a58d4=this[_0x1a2240(0x498)];if(!_0x1a58d4)return 0x0;return _0x1a58d4[_0x1a2240(0x298)][_0x1a2240(0x5e8)];}}if(_0x3bebc1)$gameTemp[_0x1a2240(0x504)]=![];this[_0x1a2240(0x5f1)](_0x56044a),this[_0x1a2240(0x212)](!![]);},Game_Character[_0x165665(0x49c)][_0x165665(0x6d9)]=function(_0x520d30){if(_0x520d30)this['processMoveRouteStepTo'](_0x520d30['x'],_0x520d30['y']);},Game_Character[_0x165665(0x49c)][_0x165665(0x6c3)]=function(_0x2fef60,_0x90e624){const _0xb4fdf7=_0x165665,_0x15d7cf=this['deltaXFrom'](_0x2fef60),_0x12dd4a=this[_0xb4fdf7(0x63d)](_0x90e624);},Game_Character[_0x165665(0x49c)][_0x165665(0x506)]=function(_0x816cc5){const _0x18e968=_0x165665;if(_0x816cc5[_0x18e968(0x684)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x816cc5[_0x18e968(0x684)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ['EventsMoveCore'][_0x165665(0x654)]=Game_Event[_0x165665(0x49c)][_0x165665(0x2cd)],Game_Event[_0x165665(0x49c)][_0x165665(0x2cd)]=function(_0x4d0359,_0x4478ef){const _0x20f728=_0x165665;if($gameTemp[_0x20f728(0x504)])return![];return VisuMZ[_0x20f728(0x54c)]['Game_Event_isCollidedWithPlayerCharacters'][_0x20f728(0x4ca)](this,_0x4d0359,_0x4478ef);},Game_Character[_0x165665(0x49c)][_0x165665(0x5f3)]=function(_0x445933,_0x575cab){const _0x5c341b=_0x165665,_0x214b12=['',_0x5c341b(0x353),'DOWN',_0x5c341b(0x251),_0x5c341b(0x49e),'','RIGHT',_0x5c341b(0x341),'UP',_0x5c341b(0x5d9)],_0x278014=_0x214b12[_0x5c341b(0x67a)](_0x445933[_0x5c341b(0x4b7)]()[_0x5c341b(0x43e)]());if(_0x278014<=0x0)return;if(_0x575cab)$gameTemp[_0x5c341b(0x504)]=!![];if(this['canPass'](this['x'],this['y'],_0x278014)){if(_0x575cab)$gameTemp[_0x5c341b(0x504)]=![];this[_0x5c341b(0x5f1)](_0x278014),this[_0x5c341b(0x3a3)]-=0x1;}if(_0x575cab)$gameTemp[_0x5c341b(0x504)]=![];},Game_Character['prototype'][_0x165665(0x52f)]=function(_0x402f72,_0x210247,_0x30a05e){const _0xffb78c=_0x165665;this[_0xffb78c(0x224)](_0x402f72,_0x210247,_0x30a05e);if(this['x']!==_0x402f72||this['y']!==_0x210247)this[_0xffb78c(0x3a3)]--;},Game_Character['prototype'][_0x165665(0x603)]=function(_0x1778cf,_0x3a95ef){const _0x4e0efe=_0x165665;if(_0x1778cf)this[_0x4e0efe(0x52f)](_0x1778cf['x'],_0x1778cf['y'],_0x3a95ef);},Game_Character[_0x165665(0x49c)][_0x165665(0x2c2)]=function(_0x6bc39d,_0xe111e2){const _0x270575=_0x165665;_0xe111e2=_0xe111e2||0x0;const _0x5d46d3={'code':0x1,'indent':null,'parameters':[]};_0x5d46d3[_0x270575(0x237)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x6bc39d],this['_moveRoute']['list'][this['_moveRouteIndex']][_0x270575(0x249)][0x0]='';while(_0xe111e2--){if(_0x270575(0x345)!==_0x270575(0x5f5))this['_moveRoute'][_0x270575(0x3e0)][_0x270575(0x4dd)](this[_0x270575(0x3a3)]+0x1,0x0,_0x5d46d3);else return _0x24a884;}},Game_Character[_0x165665(0x49c)][_0x165665(0x44e)]=function(_0xa3b4fd){const _0x576e02=_0x165665;this[_0x576e02(0x207)]=!![],this['setPattern'](_0xa3b4fd);},Game_Character['prototype'][_0x165665(0x494)]=function(_0x2213eb,_0x5f0cac){const _0x5ad863=_0x165665;if(this===$gamePlayer)return;const _0x2f3ee7=[this[_0x5ad863(0x1b4)],this[_0x5ad863(0x676)],'A'];if(_0x2213eb[_0x5ad863(0x684)](/\b[ABCD]\b/i))_0x2f3ee7[0x2]=String(_0x2213eb)['charAt'](0x0)[_0x5ad863(0x4b7)]()[_0x5ad863(0x43e)]();else{if(_0x5ad863(0x4e4)!==_0x5ad863(0x1e8))_0x2f3ee7[0x2]=_0x5ad863(0x500)['format'](_0x2213eb);else return _0x1582a9[_0x5ad863(0x289)]()?this[_0x5ad863(0x217)]():_0x3ebbb9[_0x5ad863(0x54c)][_0x5ad863(0x5bb)][_0x5ad863(0x4ca)](this);}switch(_0x5f0cac[_0x5ad863(0x4b7)]()[_0x5ad863(0x43e)]()){case'ON':case'TRUE':$gameSelfSwitches['setValue'](_0x2f3ee7,!![]);break;case'OFF':case _0x5ad863(0x3b0):$gameSelfSwitches['setValue'](_0x2f3ee7,![]);break;case _0x5ad863(0x677):$gameSelfSwitches[_0x5ad863(0x40d)](_0x2f3ee7,!$gameSelfSwitches[_0x5ad863(0x519)](_0x2f3ee7));break;}},Game_Character[_0x165665(0x49c)][_0x165665(0x3dd)]=function(_0x3428c7,_0x2e5ac6){const _0x3fedf1=_0x165665;if(this===$gamePlayer)return;const _0x3a2e8e=[this[_0x3fedf1(0x1b4)],this[_0x3fedf1(0x676)],_0x3fedf1(0x53b)[_0x3fedf1(0x3ef)](_0x3428c7)];$gameSelfSwitches[_0x3fedf1(0x40d)](_0x3a2e8e,Number(_0x2e5ac6));},Game_Character[_0x165665(0x49c)][_0x165665(0x24e)]=function(_0x130eb4,_0x166514){const _0x4082e8=_0x165665;this[_0x4082e8(0x590)](_0x130eb4,_0x166514);},Game_Character['prototype'][_0x165665(0x672)]=function(_0x169638){const _0x48e7f0=_0x165665;if(_0x169638)this[_0x48e7f0(0x24e)](_0x169638['x'],_0x169638['y']);},Game_Character['prototype'][_0x165665(0x3aa)]=function(){const _0x2c4803=_0x165665;switch(this[_0x2c4803(0x5cc)]()){case 0x1:this[_0x2c4803(0x4ab)](0x7);break;case 0x2:this[_0x2c4803(0x4ab)](0x4);break;case 0x3:this[_0x2c4803(0x4ab)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x2c4803(0x4ab)](0x2);break;case 0x7:this[_0x2c4803(0x4ab)](0x9);break;case 0x8:this[_0x2c4803(0x4ab)](0x6);break;case 0x9:this[_0x2c4803(0x4ab)](0x3);break;}},Game_Character['prototype']['turnLeft90']=function(){const _0x168530=_0x165665;switch(this[_0x168530(0x5cc)]()){case 0x1:this[_0x168530(0x4ab)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x168530(0x4ab)](0x9);break;case 0x4:this[_0x168530(0x4ab)](0x2);break;case 0x6:this[_0x168530(0x4ab)](0x8);break;case 0x7:this[_0x168530(0x4ab)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x168530(0x4ab)](0x7);break;}},Game_Character['prototype']['getDirectionToPoint']=function(_0x4c7384,_0x4d66db,_0x11f4b4){const _0x505789=_0x165665,_0x1c1ce8=this[_0x505789(0x307)](_0x4c7384),_0x14be2f=this[_0x505789(0x63d)](_0x4d66db);if($gameMap[_0x505789(0x289)]()){if(_0x505789(0x69b)!=='FcRiE')return this[_0x505789(0x47c)](_0x10ee7c);else{if(_0x11f4b4||this[_0x505789(0x213)]()){if(_0x1c1ce8>0x0&&_0x14be2f<0x0)return 0x1;if(_0x1c1ce8<0x0&&_0x14be2f<0x0)return 0x3;if(_0x1c1ce8>0x0&&_0x14be2f>0x0)return 0x7;if(_0x1c1ce8<0x0&&_0x14be2f>0x0)return 0x9;}}}if(Math['abs'](_0x1c1ce8)>Math[_0x505789(0x5d3)](_0x14be2f))return _0x1c1ce8>0x0?0x4:0x6;else{if(_0x14be2f!==0x0){if(_0x505789(0x3e3)===_0x505789(0x517))_0x307abd[_0x505789(0x673)](_0x46033d),_0x45c8cc[_0x505789(0x673)](_0x4f4e4e);else return _0x14be2f>0x0?0x8:0x2;}}return 0x0;},Game_Character[_0x165665(0x49c)][_0x165665(0x50e)]=function(_0x254d9c,_0x3051f8,_0x1f6494){const _0x5c5b84=_0x165665,_0x52b4c3=this[_0x5c5b84(0x307)](_0x254d9c),_0x4f75e2=this[_0x5c5b84(0x63d)](_0x3051f8);if($gameMap['isSupportDiagonalMovement']()){if('cVWlN'!==_0x5c5b84(0x69e))return this[_0x5c5b84(0x37e)]()['match'](/\[VS8\]/i);else{if(_0x1f6494||this[_0x5c5b84(0x213)]()){if(_0x52b4c3>0x0&&_0x4f75e2<0x0)return 0x9;if(_0x52b4c3<0x0&&_0x4f75e2<0x0)return 0x7;if(_0x52b4c3>0x0&&_0x4f75e2>0x0)return 0x3;if(_0x52b4c3<0x0&&_0x4f75e2>0x0)return 0x1;}}}if(Math['abs'](_0x52b4c3)>Math[_0x5c5b84(0x5d3)](_0x4f75e2)){if(_0x5c5b84(0x4e5)===_0x5c5b84(0x325))this[_0x5c5b84(0x235)]=!![],_0x377f1b['EventsMoveCore'][_0x5c5b84(0x48b)][_0x5c5b84(0x4ca)](this),this[_0x5c5b84(0x522)](),this[_0x5c5b84(0x235)]=![];else return _0x52b4c3>0x0?0x6:0x4;}else{if(_0x4f75e2!==0x0)return _0x5c5b84(0x5f8)===_0x5c5b84(0x5f8)?_0x4f75e2>0x0?0x2:0x8:_0x3e6a25['EventsMoveCore'][_0x5c5b84(0x256)]['Label'][_0x5c5b84(0x396)];}return 0x0;},Game_Character[_0x165665(0x49c)][_0x165665(0x6c5)]=function(_0x78035f,_0xcdc7b8){const _0x38d07b=_0x165665,_0x2ba40d=this[_0x38d07b(0x578)](_0x78035f,_0xcdc7b8,!![]);if(_0x2ba40d)this[_0x38d07b(0x5f1)](_0x2ba40d);},Game_Character[_0x165665(0x49c)][_0x165665(0x203)]=function(_0x5c0df6,_0x1a094b){const _0x5c4adf=_0x165665,_0x40ca13=this[_0x5c4adf(0x50e)](_0x5c0df6,_0x1a094b,!![]);if(_0x40ca13)this[_0x5c4adf(0x5f1)](_0x40ca13);},Game_Character['prototype'][_0x165665(0x3bb)]=function(_0x40dd6f,_0x3fbde7){const _0x2f3e61=_0x165665,_0x5ef373=this[_0x2f3e61(0x578)](_0x40dd6f,_0x3fbde7,![]);if(_0x5ef373)this['setDirection'](_0x5ef373);},Game_Character[_0x165665(0x49c)][_0x165665(0x272)]=function(_0x500071,_0x5918b5){const _0x1658a9=_0x165665,_0x3b4562=this[_0x1658a9(0x50e)](_0x500071,_0x5918b5,![]);if(_0x3b4562)this[_0x1658a9(0x4ab)](_0x3b4562);},Game_Character[_0x165665(0x49c)][_0x165665(0x282)]=function(_0x57319e){if(_0x57319e)this['moveTowardPoint'](_0x57319e['x'],_0x57319e['y']);},Game_Character[_0x165665(0x49c)][_0x165665(0x261)]=function(_0x26a637){const _0x2149c3=_0x165665;if(_0x26a637)this[_0x2149c3(0x203)](_0x26a637['x'],_0x26a637['y']);},Game_Character[_0x165665(0x49c)][_0x165665(0x47c)]=function(_0x1df714){if(_0x1df714)this['turnTowardPoint'](_0x1df714['x'],_0x1df714['y']);},Game_Character['prototype']['turnAwayFromCharacter']=function(_0xe31dd1){const _0x20eb38=_0x165665;if(_0xe31dd1)this[_0x20eb38(0x272)](_0xe31dd1['x'],_0xe31dd1['y']);},VisuMZ[_0x165665(0x54c)]['Game_Player_isDashing']=Game_Player[_0x165665(0x49c)][_0x165665(0x2d6)],Game_Player[_0x165665(0x49c)][_0x165665(0x2d6)]=function(){const _0xfe98b0=_0x165665;if(this[_0xfe98b0(0x55c)])return!![];return VisuMZ[_0xfe98b0(0x54c)][_0xfe98b0(0x22d)][_0xfe98b0(0x4ca)](this);},VisuMZ[_0x165665(0x54c)][_0x165665(0x5bb)]=Game_Player[_0x165665(0x49c)][_0x165665(0x36a)],Game_Player[_0x165665(0x49c)][_0x165665(0x36a)]=function(){const _0x102189=_0x165665;return $gameMap[_0x102189(0x289)]()?this[_0x102189(0x217)]():VisuMZ[_0x102189(0x54c)][_0x102189(0x5bb)][_0x102189(0x4ca)](this);},Game_Player['prototype'][_0x165665(0x217)]=function(){return Input['dir8'];},Game_Player['prototype'][_0x165665(0x3a2)]=function(){const _0x7b28ef=_0x165665;if($gameSystem[_0x7b28ef(0x5c4)]())return 0x0;if(!this[_0x7b28ef(0x66e)]()&&this[_0x7b28ef(0x33a)]()){let _0x45f983=this[_0x7b28ef(0x36a)]();if(_0x45f983>0x0){if(_0x7b28ef(0x577)===_0x7b28ef(0x2bc))return this[_0x7b28ef(0x4c4)][_0x7b28ef(0x239)];else $gameTemp[_0x7b28ef(0x25f)]();}else{if($gameTemp[_0x7b28ef(0x270)]()){if(_0x7b28ef(0x6c6)===_0x7b28ef(0x6c6)){const _0xa9dc67=$gameTemp[_0x7b28ef(0x1d0)](),_0x454d6c=$gameTemp[_0x7b28ef(0x2cf)](),_0x28d935=$gameMap[_0x7b28ef(0x289)](),_0x4f6b3b=$gameMap[_0x7b28ef(0x45c)](_0xa9dc67,_0x454d6c),_0x459ea1=$gameMap['eventsXyNt'](_0xa9dc67,_0x454d6c)[_0x7b28ef(0x670)]<=0x0;if(_0x28d935&&_0x4f6b3b&&_0x459ea1)_0x7b28ef(0x644)!==_0x7b28ef(0x6ab)?_0x45f983=this[_0x7b28ef(0x1cf)](_0xa9dc67,_0x454d6c):_0x163d67['CPC'][_0x7b28ef(0x673)](_0x39d4ed);else{if(_0x7b28ef(0x5b3)!==_0x7b28ef(0x4c9))_0x45f983=this[_0x7b28ef(0x404)](_0xa9dc67,_0x454d6c);else return _0x5145e2[_0x7b28ef(0x253)][_0x7b28ef(0x347)](_0x304d19)||_0x512a8d[_0x7b28ef(0x431)]['includes'](_0x2f72fb);}}else _0x2f25a9=_0x375fcc['makeDeepCopy'](_0x58ba8a),_0x5371bb[_0x7b28ef(0x54c)][_0x7b28ef(0x338)]['call'](this,_0x1ebde9);}}if(_0x45f983>0x0){this[_0x7b28ef(0x5eb)]=this[_0x7b28ef(0x5eb)]||0x0;if(this['isTurnInPlace']()){if(_0x7b28ef(0x379)!=='vissZ'){if(!_0x5944cd[_0x7b28ef(0x4c3)][_0x3076ba]){_0x35baee[_0x7b28ef(0x28a)][_0x5bc3ee]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x516160=_0x7b28ef(0x3a0)[_0x7b28ef(0x3ef)](_0x3d1794(_0x1f6c07['$1']));_0x5ec7af[_0x7b28ef(0x4c3)][_0x6617ce]=new _0x37c4ed(_0x7b28ef(0x3c1),_0x516160);}const _0x479c61=_0x564433[_0x7b28ef(0x2de)]()||this;return _0x5e004e['advancedFunc'][_0x37c722][_0x7b28ef(0x4ca)](_0x479c61,_0x9c66bf);}else this['setDirection'](_0x45f983);}else'OpHwR'===_0x7b28ef(0x63b)?this['turnLeft90']():this[_0x7b28ef(0x3d8)](_0x45f983);this[_0x7b28ef(0x5eb)]++;}else this['_inputTime']=0x0;}},Game_Player[_0x165665(0x49c)][_0x165665(0x3c0)]=function(){const _0x52850c=_0x165665,_0x2ecb26=VisuMZ['EventsMoveCore'][_0x52850c(0x256)]['Movement'];if(!_0x2ecb26[_0x52850c(0x4b4)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x52850c(0x2d6)]()||this[_0x52850c(0x66e)]()||this['isOnLadder']())return![];return this[_0x52850c(0x5eb)]<_0x2ecb26[_0x52850c(0x66f)];},VisuMZ[_0x165665(0x54c)][_0x165665(0x1bc)]=Game_Player[_0x165665(0x49c)][_0x165665(0x3d8)],Game_Player[_0x165665(0x49c)][_0x165665(0x3d8)]=function(_0x5b3574){const _0x147d8a=_0x165665;if($gameMap[_0x147d8a(0x289)]())this[_0x147d8a(0x5f1)](_0x5b3574);else{if(_0x147d8a(0x220)===_0x147d8a(0x220))VisuMZ[_0x147d8a(0x54c)][_0x147d8a(0x1bc)][_0x147d8a(0x4ca)](this,_0x5b3574);else{if(this[_0x147d8a(0x683)]===_0x36eb08)this['initEventsMoveCore']();this['_expireCommonEvent']=_0x4765c4;}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x371)]=Game_Player[_0x165665(0x49c)]['isMapPassable'],Game_Player[_0x165665(0x49c)][_0x165665(0x44b)]=function(_0x3d8d8b,_0x5813d3,_0x4bc64b){const _0x55602f=_0x165665;if($gameMap['isRegionAllowPass'](_0x3d8d8b,_0x5813d3,_0x4bc64b,_0x55602f(0x6da))){if(_0x55602f(0x585)!==_0x55602f(0x585)){if(!_0x552954[_0x55602f(0x4c3)][_0x2fb6fb]){_0x5a639b[_0x55602f(0x1d3)][_0xf0dd68][_0x55602f(0x684)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x56fac8='return\x20%1'[_0x55602f(0x3ef)](_0x2cd444(_0x5c96cd['$1']));_0x4c27f2['advancedFunc'][_0x5beefe]=new _0x40970e('variableId',_0x56fac8);}const _0x3bc412=_0x4137e7[_0x55602f(0x2de)]()||this;return _0x30b09c[_0x55602f(0x4c3)][_0xf0fd2b][_0x55602f(0x4ca)](_0x3bc412,_0x40ab4c);}else return this[_0x55602f(0x26e)]()&&this['vehicle']()?_0x55602f(0x534)!=='kDdbH'?_0x45364b>0x0?0x8:0x2:this[_0x55602f(0x1ca)]()['isMapPassable'](_0x3d8d8b,_0x5813d3,_0x4bc64b):!![];}if($gameMap[_0x55602f(0x402)](_0x3d8d8b,_0x5813d3,_0x4bc64b,_0x55602f(0x6da)))return![];return VisuMZ[_0x55602f(0x54c)][_0x55602f(0x371)]['call'](this,_0x3d8d8b,_0x5813d3,_0x4bc64b);},VisuMZ['EventsMoveCore'][_0x165665(0x318)]=Game_Player[_0x165665(0x49c)][_0x165665(0x242)],Game_Player['prototype']['checkEventTriggerHere']=function(_0x30126b){const _0x24da40=_0x165665;VisuMZ[_0x24da40(0x54c)][_0x24da40(0x318)][_0x24da40(0x4ca)](this,_0x30126b);if(this[_0x24da40(0x594)]()){if(_0x24da40(0x42c)===_0x24da40(0x236))_0x53cd29[_0x24da40(0x54c)][_0x24da40(0x587)]['call'](this),this['bitmap'][_0x24da40(0x6be)](this[_0x24da40(0x3d5)][_0x24da40(0x38e)](this));else{this['checkEventTriggerEventsMoveCore'](_0x30126b);if(_0x30126b[_0x24da40(0x347)](0x0)&&this[_0x24da40(0x305)]()==='standing')this[_0x24da40(0x23b)](this['x'],this['y']);else{if(_0x30126b[_0x24da40(0x347)](0x1)||_0x30126b[_0x24da40(0x347)](0x2)){if(_0x24da40(0x370)===_0x24da40(0x4e1))return!![];else this['startMapCommonEventOnTouch']();}}}}},VisuMZ[_0x165665(0x54c)]['Game_Player_checkEventTriggerThere']=Game_Player[_0x165665(0x49c)][_0x165665(0x51c)],Game_Player[_0x165665(0x49c)][_0x165665(0x51c)]=function(_0xb91cc1){const _0x2d6a23=_0x165665;VisuMZ['EventsMoveCore'][_0x2d6a23(0x3b3)][_0x2d6a23(0x4ca)](this,_0xb91cc1);if(this[_0x2d6a23(0x594)]()&&_0xb91cc1[_0x2d6a23(0x347)](0x0)&&this[_0x2d6a23(0x305)]()===_0x2d6a23(0x4a3)){const _0xc0ff0=this['direction'](),_0xbb77b8=$gameMap[_0x2d6a23(0x50c)](this['x'],_0xc0ff0),_0x17467f=$gameMap[_0x2d6a23(0x54d)](this['y'],_0xc0ff0);this[_0x2d6a23(0x23b)](_0xbb77b8,_0x17467f);}},Game_Player['prototype'][_0x165665(0x414)]=function(_0x167d00){const _0xf7eb7e=_0x165665;if($gameMap['isEventRunning']())return;if($gameMap[_0xf7eb7e(0x200)]())return;const _0x5a7621=$gameMap[_0xf7eb7e(0x2f8)]();for(const _0xeb4d14 of _0x5a7621){if(_0xf7eb7e(0x5ea)===_0xf7eb7e(0x5ea)){if(!_0xeb4d14)continue;if(!_0xeb4d14[_0xf7eb7e(0x623)](_0x167d00))continue;if(this[_0xf7eb7e(0x40e)](_0xeb4d14))return _0xeb4d14[_0xf7eb7e(0x416)]();if(this[_0xf7eb7e(0x301)](_0xeb4d14))return _0xeb4d14['start']();}else return _0x5b47f2['EventsMoveCore']['Game_CommonEvent_isActive'][_0xf7eb7e(0x4ca)](this)?!![]:_0x3cb8fb['EventsMoveCore'][_0xf7eb7e(0x3f2)]['metCPC'](this[_0xf7eb7e(0x1c5)]()[_0xf7eb7e(0x365)],this[_0xf7eb7e(0x222)]);}},Game_Player[_0x165665(0x49c)][_0x165665(0x40e)]=function(_0xb6141b){const _0x3e40e8=_0x165665;if($gameMap[_0x3e40e8(0x529)]())return![];if($gameMap['isAnyEventStarting']())return![];return _0xb6141b[_0x3e40e8(0x3d1)]()[_0x3e40e8(0x347)](this[_0x3e40e8(0x520)]());},Game_Player[_0x165665(0x49c)][_0x165665(0x301)]=function(_0x18a018){const _0x4e909f=_0x165665;if($gameMap[_0x4e909f(0x529)]())return![];if($gameMap[_0x4e909f(0x200)]())return![];if([_0x4e909f(0x5fd),_0x4e909f(0x53a)][_0x4e909f(0x347)](_0x18a018[_0x4e909f(0x547)]()))return![];const _0x3a43ed=_0x18a018[_0x4e909f(0x547)](),_0x31abf3=_0x18a018[_0x4e909f(0x450)]();switch(_0x3a43ed){case _0x4e909f(0x635):const _0x1eb673=$gameMap[_0x4e909f(0x2ea)](this['x'],this['y'],_0x18a018['x'],_0x18a018['y']);return _0x18a018['activationProximityDistance']()>=_0x1eb673;break;case _0x4e909f(0x4a1):return _0x31abf3>=Math[_0x4e909f(0x5d3)](_0x18a018[_0x4e909f(0x307)](this['x']))&&_0x31abf3>=Math[_0x4e909f(0x5d3)](_0x18a018['deltaYFrom'](this['y']));break;case _0x4e909f(0x44f):return _0x31abf3>=Math[_0x4e909f(0x5d3)](_0x18a018['deltaYFrom'](this['y']));break;case _0x4e909f(0x1c3):return _0x31abf3>=Math[_0x4e909f(0x5d3)](_0x18a018[_0x4e909f(0x307)](this['x']));break;case _0x4e909f(0x572):return![];break;}},Game_Player['prototype'][_0x165665(0x23b)]=function(_0x1b9985,_0xb9cb3f){const _0x266fbc=_0x165665;if($gameMap[_0x266fbc(0x529)]())return;if($gameMap[_0x266fbc(0x200)]())return;let _0x3aac26=VisuMZ[_0x266fbc(0x54c)][_0x266fbc(0x256)][_0x266fbc(0x24f)],_0x2ed283=$gameMap[_0x266fbc(0x520)](_0x1b9985,_0xb9cb3f);const _0x1dad0e='Region%1'[_0x266fbc(0x3ef)](_0x2ed283);if(_0x3aac26[_0x1dad0e]){if(_0x266fbc(0x6d4)!==_0x266fbc(0x21b))$gameTemp[_0x266fbc(0x410)](_0x3aac26[_0x1dad0e]);else{if(this[_0x266fbc(0x55c)])return!![];return _0xa25d8d[_0x266fbc(0x54c)][_0x266fbc(0x2ad)]['call'](this);}}},Game_Player['prototype'][_0x165665(0x305)]=function(){const _0x52e5d7=_0x165665;return VisuMZ[_0x52e5d7(0x54c)][_0x52e5d7(0x256)]['RegionOkTarget'];},Game_Player[_0x165665(0x49c)][_0x165665(0x32e)]=function(){const _0x5f199c=_0x165665;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;let _0x4653b8=VisuMZ[_0x5f199c(0x54c)][_0x5f199c(0x256)][_0x5f199c(0x6d6)];const _0x454eaa=_0x5f199c(0x394)[_0x5f199c(0x3ef)](this[_0x5f199c(0x520)]());if(_0x4653b8[_0x454eaa]){if('RYkGK'!=='RYkGK'){const _0x4d9d41=this[_0x5f199c(0x578)](_0x561a32,_0x5bfef3,!![]);if(_0x4d9d41)this['executeMoveDir8'](_0x4d9d41);}else $gameTemp['reserveCommonEvent'](_0x4653b8[_0x454eaa]);}},VisuMZ[_0x165665(0x54c)]['Game_Player_increaseSteps']=Game_Player[_0x165665(0x49c)]['increaseSteps'],Game_Player['prototype'][_0x165665(0x319)]=function(){const _0x749b22=_0x165665;VisuMZ[_0x749b22(0x54c)]['Game_Player_increaseSteps']['call'](this),VisuMZ['MoveAllSynchTargets'](0x0);},VisuMZ[_0x165665(0x54c)][_0x165665(0x349)]=Game_Follower[_0x165665(0x49c)][_0x165665(0x624)],Game_Follower[_0x165665(0x49c)]['initialize']=function(_0xcd2400){const _0x30feb6=_0x165665;VisuMZ[_0x30feb6(0x54c)][_0x30feb6(0x349)][_0x30feb6(0x4ca)](this,_0xcd2400),this[_0x30feb6(0x2d8)]=![];},Game_Follower[_0x165665(0x49c)][_0x165665(0x2d6)]=function(){const _0x59aa12=_0x165665;return $gamePlayer[_0x59aa12(0x2d6)]();},Game_Follower[_0x165665(0x49c)][_0x165665(0x695)]=function(){const _0x2c008f=_0x165665;return $gamePlayer[_0x2c008f(0x695)]();},Game_Follower[_0x165665(0x49c)][_0x165665(0x491)]=function(){const _0x2cdacc=_0x165665;return $gamePlayer[_0x2cdacc(0x491)]();},Game_Follower['prototype'][_0x165665(0x53e)]=function(_0x19b8c6){const _0x9fc05f=_0x165665;this[_0x9fc05f(0x2d8)]=_0x19b8c6;},VisuMZ[_0x165665(0x54c)]['Game_Follower_chaseCharacter']=Game_Follower[_0x165665(0x49c)][_0x165665(0x638)],Game_Follower[_0x165665(0x49c)]['chaseCharacter']=function(_0x5a1a3c){const _0x2c58a6=_0x165665;if(this['_chaseOff'])return;if($gameSystem[_0x2c58a6(0x228)]())return;VisuMZ[_0x2c58a6(0x54c)]['Game_Follower_chaseCharacter'][_0x2c58a6(0x4ca)](this,_0x5a1a3c);},VisuMZ[_0x165665(0x54c)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x165665(0x49c)]['isMapPassable'],Game_Vehicle[_0x165665(0x49c)]['isMapPassable']=function(_0x4ddb4a,_0x49aa1a,_0x147651){const _0x564836=_0x165665;if($gameMap['isRegionAllowPass'](_0x4ddb4a,_0x49aa1a,_0x147651,this[_0x564836(0x3e2)]))return!![];if($gameMap[_0x564836(0x402)](_0x4ddb4a,_0x49aa1a,_0x147651,this[_0x564836(0x3e2)]))return![];return VisuMZ['EventsMoveCore'][_0x564836(0x655)]['call'](this,_0x4ddb4a,_0x49aa1a,_0x147651);},Game_Vehicle[_0x165665(0x49c)]['isAirshipPassable']=function(_0x57490d,_0x287449,_0x1d0d77){const _0x14e30e=_0x165665;if($gameMap[_0x14e30e(0x387)](_0x57490d,_0x287449,_0x1d0d77,this['_type']))return!![];if($gameMap[_0x14e30e(0x402)](_0x57490d,_0x287449,_0x1d0d77,this[_0x14e30e(0x3e2)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass']['call']($gamePlayer,_0x57490d,_0x287449,_0x1d0d77);},VisuMZ[_0x165665(0x54c)][_0x165665(0x266)]=Game_Vehicle[_0x165665(0x49c)]['isLandOk'],Game_Vehicle[_0x165665(0x49c)]['isLandOk']=function(_0x15394b,_0x5eca83,_0x14877b){const _0x4a531b=_0x165665;if($gameMap['isRegionDockable'](_0x15394b,_0x5eca83,_0x14877b,this['_type']))return!![];const _0x508e18=this[_0x4a531b(0x3e2)][_0x4a531b(0x3dc)](0x0)[_0x4a531b(0x4b7)]()+this[_0x4a531b(0x3e2)][_0x4a531b(0x23f)](0x1),_0x5c42c1=_0x4a531b(0x459)[_0x4a531b(0x3ef)](_0x508e18);if(VisuMZ['EventsMoveCore'][_0x4a531b(0x256)][_0x4a531b(0x55a)][_0x5c42c1])return![];else{if(_0x4a531b(0x5b9)===_0x4a531b(0x5b9))return VisuMZ[_0x4a531b(0x54c)][_0x4a531b(0x266)]['call'](this,_0x15394b,_0x5eca83,_0x14877b);else{if(this['_PreservedEventMorphData']===_0x5df9a4)this['initEventsMoveCore']();const _0x5e24d5=_0x4a531b(0x508)[_0x4a531b(0x3ef)](_0x3d38b3,_0x1e0100);delete this[_0x4a531b(0x35c)][_0x5e24d5];}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x693)]=Game_Vehicle[_0x165665(0x49c)][_0x165665(0x573)],Game_Vehicle[_0x165665(0x49c)][_0x165665(0x573)]=function(){const _0x5e807c=_0x165665;VisuMZ[_0x5e807c(0x54c)][_0x5e807c(0x693)]['call'](this);const _0x56453a=VisuMZ['EventsMoveCore']['Settings'][_0x5e807c(0x2fc)];if(this[_0x5e807c(0x1d9)]()){if(_0x56453a['BoatSpeed'])this[_0x5e807c(0x5e0)](_0x56453a[_0x5e807c(0x5cf)]);}else{if(this['isShip']()){if(_0x56453a['ShipSpeed'])this['setMoveSpeed'](_0x56453a['ShipSpeed']);}else{if(this[_0x5e807c(0x687)]()){if(_0x56453a[_0x5e807c(0x6d1)])this[_0x5e807c(0x5e0)](_0x56453a[_0x5e807c(0x6d1)]);}}}},VisuMZ[_0x165665(0x54c)][_0x165665(0x6c7)]=Game_Event[_0x165665(0x49c)][_0x165665(0x624)],Game_Event[_0x165665(0x49c)][_0x165665(0x624)]=function(_0x15c43d,_0x207c14){const _0x2cb825=_0x165665;VisuMZ[_0x2cb825(0x54c)]['Game_Event_initialize'][_0x2cb825(0x4ca)](this,_0x15c43d,_0x207c14),this[_0x2cb825(0x2a8)](),this[_0x2cb825(0x4fe)](),this[_0x2cb825(0x596)]();},Game_Map[_0x165665(0x49c)][_0x165665(0x62a)]=function(_0x16cd52,_0x391b64){const _0x2e754b=_0x165665;if(_0x16cd52===$gameMap[_0x2e754b(0x49b)]()){if(_0x2e754b(0x223)==='skhPM'){const _0x5de29e=this[_0x2e754b(0x498)];if(!_0x5de29e)return 0x0;return _0x5de29e[_0x2e754b(0x298)][_0x2e754b(0x4bb)];}else return $dataMap['events'][_0x391b64];}else return VisuMZ[_0x2e754b(0x4c1)][_0x16cd52]['events'][_0x391b64];},VisuMZ[_0x165665(0x54c)][_0x165665(0x52c)]=Game_Event[_0x165665(0x49c)][_0x165665(0x1c5)],Game_Event[_0x165665(0x49c)][_0x165665(0x1c5)]=function(){const _0x26fe4f=_0x165665;if(this[_0x26fe4f(0x315)]!==undefined){if(_0x26fe4f(0x31d)==='FBFoF'){const _0x4c5b9f=this[_0x26fe4f(0x315)]['mapId'],_0x2e7925=this['_eventMorphData'][_0x26fe4f(0x694)];return $gameMap[_0x26fe4f(0x62a)](_0x4c5b9f,_0x2e7925);}else _0x4f7b0a[_0x26fe4f(0x67f)](this);}if(this['_eventCopyData']!==undefined){const _0x394522=this[_0x26fe4f(0x46a)]['mapId'],_0x692b2f=this[_0x26fe4f(0x46a)][_0x26fe4f(0x694)];return $gameMap[_0x26fe4f(0x62a)](_0x394522,_0x692b2f);}if(this[_0x26fe4f(0x474)]!==undefined){const _0x53ee43=this[_0x26fe4f(0x474)][_0x26fe4f(0x49b)],_0x28c13b=this['_eventSpawnData'][_0x26fe4f(0x694)];return $gameMap[_0x26fe4f(0x62a)](_0x53ee43,_0x28c13b);}if($gameTemp[_0x26fe4f(0x426)]!==undefined){if('KsjxA'===_0x26fe4f(0x3c7)){const _0x3d3646=$gameTemp[_0x26fe4f(0x426)][_0x26fe4f(0x49b)],_0xcc7be=$gameTemp[_0x26fe4f(0x426)][_0x26fe4f(0x694)];return $gameMap[_0x26fe4f(0x62a)](_0x3d3646,_0xcc7be);}else{const _0x34a89a=_0x6ab165[_0x26fe4f(0x45f)](_0x30339c,_0x5d9d19)[_0x26fe4f(0x51a)](_0x15363c=>_0x15363c!==this&&_0x15363c[_0x26fe4f(0x56c)]());return _0x34a89a[_0x26fe4f(0x670)]>0x0;}}return VisuMZ[_0x26fe4f(0x54c)]['Game_Event_event'][_0x26fe4f(0x4ca)](this);},Game_Event[_0x165665(0x49c)][_0x165665(0x553)]=function(_0x1ba927,_0x2bd12f){const _0x5a917d=_0x165665;if(_0x1ba927===0x0||_0x2bd12f===0x0)return![];if(!VisuMZ['PreloadedMaps'][_0x1ba927]&&_0x1ba927!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&console[_0x5a917d(0x559)](_0x5a917d(0x4c8)[_0x5a917d(0x3ef)](_0x1ba927)),![];return!![];},VisuMZ[_0x165665(0x54c)][_0x165665(0x26b)]=Game_Event[_0x165665(0x49c)][_0x165665(0x416)],Game_Event[_0x165665(0x49c)][_0x165665(0x416)]=function(){const _0x4dc5f7=_0x165665;VisuMZ[_0x4dc5f7(0x54c)]['Game_Event_start'][_0x4dc5f7(0x4ca)](this),Imported[_0x4dc5f7(0x5d5)]&&Input[_0x4dc5f7(0x267)](VisuMZ[_0x4dc5f7(0x54f)][_0x4dc5f7(0x256)][_0x4dc5f7(0x64d)][_0x4dc5f7(0x2f0)])&&('kiKOR'!==_0x4dc5f7(0x576)?Input['clear']():this[_0x4dc5f7(0x3a1)][_0x4dc5f7(0x4b0)]=_0x2cffd7(_0x22e3fa['$1']));},Game_Event[_0x165665(0x49c)][_0x165665(0x2a8)]=function(){const _0x37578e=_0x165665,_0x4ef6ac=this['event']()[_0x37578e(0x3c8)];if(_0x4ef6ac==='')return;if(DataManager['isBattleTest']()||DataManager[_0x37578e(0x279)]())return;const _0x3a4177=VisuMZ[_0x37578e(0x54c)][_0x37578e(0x256)][_0x37578e(0x3e5)];let _0x300a91=null,_0x50e7d4=0x0,_0xb77aca=0x0;if(_0x4ef6ac[_0x37578e(0x684)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x50e7d4=Number(RegExp['$1']),_0xb77aca=Number(RegExp['$2']);else{if(_0x4ef6ac['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if('oQPHc'===_0x37578e(0x6b0))_0x50e7d4=Number(RegExp['$1']),_0xb77aca=Number(RegExp['$2']);else{if(_0x362826<0x3e8)return;if(!this[_0x37578e(0x5a7)])return;const _0x13ddc9=this[_0x37578e(0x1c5)](_0x5da056);_0x13ddc9[_0x37578e(0x590)](-0x1,-0x1),_0x13ddc9[_0x37578e(0x2e1)](),this[_0x37578e(0x5a7)][_0x4580b0-0x3e8]=null,this[_0x37578e(0x429)]();}}else{if(_0x4ef6ac[_0x37578e(0x684)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2822af=String(RegExp['$1'])[_0x37578e(0x4b7)]()[_0x37578e(0x43e)]();_0x300a91=VisuMZ['EventTemplates'][_0x2822af];if(!_0x300a91)return;_0x50e7d4=_0x300a91['MapID'],_0xb77aca=_0x300a91[_0x37578e(0x369)];}}}if(!this[_0x37578e(0x553)](_0x50e7d4,_0xb77aca))return;_0x3a4177['PreCopyJS'][_0x37578e(0x4ca)](this,_0x50e7d4,_0xb77aca,this);if(_0x300a91)_0x300a91[_0x37578e(0x516)][_0x37578e(0x4ca)](this,_0x50e7d4,_0xb77aca,this);this[_0x37578e(0x46a)]={'mapId':_0x50e7d4,'eventId':_0xb77aca},this[_0x37578e(0x1c7)]=-0x2,this['refresh'](),_0x3a4177[_0x37578e(0x3b6)][_0x37578e(0x4ca)](this,_0x50e7d4,_0xb77aca,this);if(_0x300a91)_0x300a91[_0x37578e(0x3b6)][_0x37578e(0x4ca)](this,_0x50e7d4,_0xb77aca,this);$gameMap[_0x37578e(0x429)]();},Game_Event[_0x165665(0x49c)][_0x165665(0x4fe)]=function(){const _0x209083=_0x165665,_0x2b417d=$gameSystem[_0x209083(0x42e)](this);if(!_0x2b417d)return;const _0x5bb24e=_0x2b417d[_0x209083(0x564)][_0x209083(0x4b7)]()[_0x209083(0x43e)]();if(_0x5bb24e!==_0x209083(0x4e2)){if(_0x209083(0x3af)!==_0x209083(0x3af))return _0x42e2a1[_0x209083(0x54c)]['CustomPageConditions'][_0x209083(0x324)](this[_0x209083(0x1c5)]()[_0x209083(0x365)],this['_commonEventId']);else this[_0x209083(0x35e)](_0x5bb24e,!![]);}else this[_0x209083(0x515)](_0x2b417d[_0x209083(0x49b)],_0x2b417d[_0x209083(0x694)],!![]);},Game_Event[_0x165665(0x49c)]['morphInto']=function(_0x21f5f6,_0x579cc4,_0x5904c8){const _0x49e2bb=_0x165665;if(!this['checkValidEventerMap'](_0x21f5f6,_0x579cc4))return;const _0x4e4841=VisuMZ['EventsMoveCore'][_0x49e2bb(0x256)][_0x49e2bb(0x3e5)];if(!_0x5904c8)_0x4e4841[_0x49e2bb(0x28d)]['call'](this,_0x21f5f6,_0x579cc4,this);this[_0x49e2bb(0x315)]={'mapId':_0x21f5f6,'eventId':_0x579cc4},this[_0x49e2bb(0x1c7)]=-0x2,this[_0x49e2bb(0x390)]();if(!_0x5904c8)_0x4e4841[_0x49e2bb(0x5f7)][_0x49e2bb(0x4ca)](this,_0x21f5f6,_0x579cc4,this);$gameMap[_0x49e2bb(0x429)]();},Game_Event[_0x165665(0x49c)]['morphIntoTemplate']=function(_0x12ad6b,_0x527048){const _0x52b063=_0x165665;_0x12ad6b=_0x12ad6b['toUpperCase']()[_0x52b063(0x43e)]();const _0x4cd12b=VisuMZ[_0x52b063(0x5a6)][_0x12ad6b];if(!_0x4cd12b)return;const _0x2ce0c2=_0x4cd12b[_0x52b063(0x544)],_0x5ed6ad=_0x4cd12b[_0x52b063(0x369)];if(!this['checkValidEventerMap'](_0x2ce0c2,_0x5ed6ad))return;if(!_0x527048)_0x4cd12b[_0x52b063(0x28d)][_0x52b063(0x4ca)](this,_0x2ce0c2,_0x5ed6ad,this);this[_0x52b063(0x515)](_0x2ce0c2,_0x5ed6ad,_0x527048);if(!_0x527048)_0x4cd12b[_0x52b063(0x5f7)][_0x52b063(0x4ca)](this,_0x2ce0c2,_0x5ed6ad,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event['prototype'][_0x165665(0x3c3)]=function(){const _0x584d02=_0x165665;this[_0x584d02(0x315)]=undefined,this[_0x584d02(0x1c7)]=-0x2,this['refresh']();},Game_Event[_0x165665(0x49c)][_0x165665(0x51f)]=function(_0x516cd0){const _0x1c8057=_0x165665,_0x480546=VisuMZ[_0x1c8057(0x54c)][_0x1c8057(0x256)][_0x1c8057(0x3e5)],_0x2a03ef=_0x516cd0[_0x1c8057(0x564)][_0x1c8057(0x4b7)]()[_0x1c8057(0x43e)](),_0xdb1375=!['',_0x1c8057(0x4e2)]['includes'](_0x2a03ef);let _0x30829f=0x0,_0x120a8c=0x0;if(_0xdb1375){if(_0x1c8057(0x380)===_0x1c8057(0x380)){const _0x23bb49=VisuMZ[_0x1c8057(0x5a6)][_0x2a03ef];if(!_0x23bb49)return;_0x30829f=_0x23bb49[_0x1c8057(0x544)],_0x120a8c=_0x23bb49['EventID'];}else return this['processMoveRouteSelfSwitch'](_0x3092c1['$1'],_0xb8cf72['$2']);}else _0x30829f=_0x516cd0[_0x1c8057(0x49b)],_0x120a8c=_0x516cd0[_0x1c8057(0x694)];if(!this[_0x1c8057(0x553)](_0x30829f,_0x120a8c))return;if(_0xdb1375){const _0x2d014f=VisuMZ[_0x1c8057(0x5a6)][_0x2a03ef];_0x2d014f[_0x1c8057(0x221)][_0x1c8057(0x4ca)](this,_0x30829f,_0x120a8c,this);}_0x480546[_0x1c8057(0x221)][_0x1c8057(0x4ca)](this,_0x30829f,_0x120a8c,this),this['_eventSpawnData']=_0x516cd0,this['_pageIndex']=-0x2,this[_0x1c8057(0x1b4)]=$gameMap[_0x1c8057(0x49b)](),this[_0x1c8057(0x676)]=_0x516cd0[_0x1c8057(0x49d)],this[_0x1c8057(0x602)]=_0x516cd0['spawnPreserved'],this[_0x1c8057(0x590)](_0x516cd0['x'],_0x516cd0['y']),this['setDirection'](_0x516cd0[_0x1c8057(0x5cc)]),this['refresh']();if(_0xdb1375){const _0x482ddf=VisuMZ['EventTemplates'][_0x2a03ef];if(!_0x482ddf)return;_0x482ddf[_0x1c8057(0x6a6)][_0x1c8057(0x4ca)](this,_0x30829f,_0x120a8c,this);}_0x480546[_0x1c8057(0x6a6)][_0x1c8057(0x4ca)](this,_0x30829f,_0x120a8c,this);const _0x2e4065=SceneManager[_0x1c8057(0x26d)];if(_0x2e4065&&_0x2e4065[_0x1c8057(0x699)])_0x2e4065[_0x1c8057(0x699)][_0x1c8057(0x548)](this);},Game_Event[_0x165665(0x49c)][_0x165665(0x352)]=function(){return!!this['_eventSpawnData'];},VisuMZ[_0x165665(0x54c)][_0x165665(0x382)]=Game_Event[_0x165665(0x49c)][_0x165665(0x59e)],Game_Event[_0x165665(0x49c)][_0x165665(0x59e)]=function(){const _0x1948af=_0x165665;VisuMZ[_0x1948af(0x54c)][_0x1948af(0x382)][_0x1948af(0x4ca)](this),this[_0x1948af(0x204)]();},VisuMZ['EventsMoveCore'][_0x165665(0x48b)]=Game_Event[_0x165665(0x49c)][_0x165665(0x278)],Game_Event['prototype'][_0x165665(0x278)]=function(){const _0x42eb51=_0x165665;this[_0x42eb51(0x235)]=!![],VisuMZ[_0x42eb51(0x54c)][_0x42eb51(0x48b)][_0x42eb51(0x4ca)](this),this[_0x42eb51(0x522)](),this[_0x42eb51(0x235)]=![];},Game_Event['prototype'][_0x165665(0x522)]=function(){const _0x2b93d0=_0x165665;if(!this['event']())return;this['initEventsMoveCoreEffects'](),this[_0x2b93d0(0x580)](),this[_0x2b93d0(0x537)](),this[_0x2b93d0(0x1f0)]();},Game_Event[_0x165665(0x49c)]['setupEventsMoveCoreNotetags']=function(){const _0x513aeb=_0x165665,_0x1bdf19=this[_0x513aeb(0x1c5)]()[_0x513aeb(0x3c8)];if(_0x1bdf19==='')return;this['checkEventsMoveCoreStringTags'](_0x1bdf19);},Game_Event['prototype']['setupEventsMoveCoreCommentTags']=function(){const _0x1b86f6=_0x165665;if(!this[_0x1b86f6(0x69f)]())return;const _0x33789d=this[_0x1b86f6(0x3e0)]();let _0x526953='';for(const _0x2b2527 of _0x33789d){if(_0x1b86f6(0x479)===_0x1b86f6(0x334))this[_0x1b86f6(0x689)](),this[_0x1b86f6(0x42b)](),this[_0x1b86f6(0x549)](),this[_0x1b86f6(0x2ab)](),this[_0x1b86f6(0x39b)](),this[_0x1b86f6(0x273)]();else{if([0x6c,0x198][_0x1b86f6(0x347)](_0x2b2527[_0x1b86f6(0x237)])){if(_0x526953!=='')_0x526953+='\x0a';_0x526953+=_0x2b2527[_0x1b86f6(0x249)][0x0];}}}this[_0x1b86f6(0x2d9)](_0x526953);},Game_Event[_0x165665(0x49c)][_0x165665(0x204)]=function(){const _0x37706d=_0x165665,_0x403e92=VisuMZ[_0x37706d(0x54c)][_0x37706d(0x256)];this[_0x37706d(0x295)]={'type':_0x37706d(0x5fd),'distance':0x0,'regionList':[]},this[_0x37706d(0x5e3)]=![],this[_0x37706d(0x485)](),this[_0x37706d(0x3df)]=![],this[_0x37706d(0x2dd)]=![],this[_0x37706d(0x48e)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x37706d(0x2e3)]=$gameSystem[_0x37706d(0x631)](this),this['_labelWindow']={'text':'','visibleRange':_0x403e92[_0x37706d(0x1cd)][_0x37706d(0x588)],'offsetX':_0x403e92[_0x37706d(0x1cd)][_0x37706d(0x376)],'offsetY':_0x403e92[_0x37706d(0x1cd)][_0x37706d(0x476)]},this['_mirrorSprite']=![],this[_0x37706d(0x309)]=[],this[_0x37706d(0x3a1)]={'target':-0x1,'type':_0x37706d(0x45e),'delay':0x1,'opacityDelta':0x0},this[_0x37706d(0x55b)]=_0x403e92['Movement'][_0x37706d(0x255)]??0x0,this[_0x37706d(0x2b9)]=![],this[_0x37706d(0x2a0)]={'visible':!![],'filename':_0x403e92[_0x37706d(0x2fc)][_0x37706d(0x691)]},this[_0x37706d(0x6ad)](),this[_0x37706d(0x5a8)]();},Game_Event[_0x165665(0x49c)]['checkEventsMoveCoreStringTags']=function(_0x51e989){const _0x208a81=_0x165665;if(_0x51e989[_0x208a81(0x684)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x208a81(0x295)][_0x208a81(0x59d)]=JSON[_0x208a81(0x3f8)]('['+RegExp['$1'][_0x208a81(0x684)](/\d+/g)+']'),this[_0x208a81(0x295)][_0x208a81(0x2c8)]=_0x208a81(0x53a);else _0x51e989['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x208a81(0x43e)](),this[_0x208a81(0x295)][_0x208a81(0x2c8)]=type,this[_0x208a81(0x295)][_0x208a81(0x2ea)]=Number(RegExp['$2']));_0x51e989[_0x208a81(0x684)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x208a81(0x304)][_0x208a81(0x375)]=String(RegExp['$1']));if(_0x51e989[_0x208a81(0x684)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if(_0x208a81(0x453)===_0x208a81(0x356))_0x36d5c9[_0x208a81(0x54c)][_0x208a81(0x56f)][_0x208a81(0x4ca)](this),this[_0x208a81(0x20b)]();else{const _0x1f9704=String(RegExp['$1'])[_0x208a81(0x4b7)]()[_0x208a81(0x43e)](),_0x5cb655=[_0x208a81(0x562),_0x208a81(0x63a),'MULTIPLY',_0x208a81(0x31c)];this[_0x208a81(0x304)]['blendMode']=_0x5cb655['indexOf'](_0x1f9704)[_0x208a81(0x457)](0x0,0x3);}}_0x51e989['match'](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(_0x208a81(0x20e)==='HOhNd'?this['_attachPicture'][_0x208a81(0x24a)]=Number(RegExp['$1']):(this[_0x208a81(0x295)][_0x208a81(0x59d)]=_0x47cb66[_0x208a81(0x3f8)]('['+_0x5b121c['$1'][_0x208a81(0x684)](/\d+/g)+']'),this[_0x208a81(0x295)][_0x208a81(0x2c8)]='region'));_0x51e989[_0x208a81(0x684)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture']['offsetX']=Number(RegExp['$1']));_0x51e989[_0x208a81(0x684)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x208a81(0x304)][_0x208a81(0x2b4)]=Number(RegExp['$1']));if(_0x51e989['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x208a81(0x32d)===_0x208a81(0x32d))this['_attachPicture']['offsetX']=Number(RegExp['$1']),this[_0x208a81(0x304)][_0x208a81(0x2b4)]=Number(RegExp['$2']);else return this[_0x208a81(0x213)]()?(this[_0x208a81(0x5fa)]||'')[_0x208a81(0x4b7)]()['trim']():''[_0x208a81(0x4b7)]()[_0x208a81(0x43e)]();}_0x51e989[_0x208a81(0x684)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&('leNSX'!==_0x208a81(0x468)?this['_attachPicture']['scale']=Number(RegExp['$1'])*0.01:this['onExpire']());_0x51e989[_0x208a81(0x684)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x208a81(0x5e3)]=!![]);_0x51e989['match'](/<CLICK TRIGGER>/i)&&(this[_0x208a81(0x3df)]=!![]);_0x51e989[_0x208a81(0x684)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x208a81(0x2dd)]=Number(RegExp['$1'])||0x0);const _0x5b58c0=_0x51e989[_0x208a81(0x684)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x5b58c0){if(_0x208a81(0x66a)==='PGPOS')return this['_activationProximity']['regionList']||[];else for(const _0x4f5436 of _0x5b58c0){if(_0x4f5436[_0x208a81(0x684)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x195e56=String(RegExp['$1'])[_0x208a81(0x4ce)]()[_0x208a81(0x43e)](),_0x185030=Number(RegExp['$2']);this[_0x208a81(0x48e)][_0x195e56]=_0x185030;}}}_0x51e989[_0x208a81(0x684)](/<ICON:[ ](\d+)>/i)&&(this[_0x208a81(0x2e3)][_0x208a81(0x5ab)]=Number(RegExp['$1']));_0x51e989[_0x208a81(0x684)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&('fbsRf'===_0x208a81(0x2df)?_0x2b6d15===_0x208a81(0x3d6)?this['turnRight90']():this['turnLeft90']():this[_0x208a81(0x2e3)][_0x208a81(0x579)]=Number(RegExp['$1']));_0x51e989[_0x208a81(0x684)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x208a81(0x2e3)][_0x208a81(0x61c)]=Number(RegExp['$1']));if(_0x51e989['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x208a81(0x35f)!==_0x208a81(0x35f)){if(this[_0x208a81(0x213)]())return this[_0x208a81(0x2b0)]();return _0xbe2edd[_0x208a81(0x54c)][_0x208a81(0x229)]['call'](this);}else this['_eventIcon'][_0x208a81(0x579)]=Number(RegExp['$1']),this[_0x208a81(0x2e3)][_0x208a81(0x61c)]=Number(RegExp['$2']);}if(_0x51e989[_0x208a81(0x684)](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x208a81(0x3b4)===_0x208a81(0x30e)){const _0x2d2601=this[_0x208a81(0x4a2)]();return _0x2d2601?_0x2d2601[_0x208a81(0x676)]:0x0;}else{const _0x4a5521=String(RegExp['$1'])['toUpperCase']()[_0x208a81(0x43e)](),_0x507291=[_0x208a81(0x562),_0x208a81(0x63a),_0x208a81(0x648),_0x208a81(0x31c)];this['_eventIcon'][_0x208a81(0x469)]=_0x507291[_0x208a81(0x67a)](_0x4a5521)[_0x208a81(0x457)](0x0,0x3);}}_0x51e989[_0x208a81(0x684)](/<LABEL:[ ](.*?)>/i)&&(this[_0x208a81(0x4c4)][_0x208a81(0x46b)]=String(RegExp['$1'])[_0x208a81(0x43e)]());_0x51e989[_0x208a81(0x684)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this['_labelWindow']['text']=String(RegExp['$1'])['trim']());_0x51e989['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x208a81(0x4c4)]['offsetX']=Number(RegExp['$1']));_0x51e989[_0x208a81(0x684)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x208a81(0x2b4)]=Number(RegExp['$1']));_0x51e989['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x208a81(0x4c4)]['offsetX']=Number(RegExp['$1']),this[_0x208a81(0x4c4)][_0x208a81(0x2b4)]=Number(RegExp['$2']));$gameTemp[_0x208a81(0x5ba)](this);for(;;){if(this['_labelWindow'][_0x208a81(0x46b)]['match'](/\\V\[(\d+)\]/gi))_0x208a81(0x418)===_0x208a81(0x2c4)?_0x49b8ea['setValue'](_0x164601,!!_0xb54920):this['_labelWindow']['text']=this['_labelWindow'][_0x208a81(0x46b)][_0x208a81(0x3db)](/\\V\[(\d+)\]/gi,(_0x3a1d17,_0x19ebe1)=>$gameVariables['value'](parseInt(_0x19ebe1)));else{if(_0x208a81(0x4ac)==='hoNLS')break;else{if(_0x16b3e7['_moveAllowPlayerCollision'])return![];return _0x1c8b2d[_0x208a81(0x54c)][_0x208a81(0x654)][_0x208a81(0x4ca)](this,_0x31da4f,_0x59999e);}}}$gameTemp[_0x208a81(0x6b1)]();_0x51e989[_0x208a81(0x684)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x208a81(0x4c4)][_0x208a81(0x239)]=Number(RegExp['$1']));_0x51e989[_0x208a81(0x684)](/<MIRROR SPRITE>/i)&&('Mdxxu'!==_0x208a81(0x5c6)?this[_0x208a81(0x34d)]=!![]:this[_0x208a81(0x1df)]=_0x4579e7(_0x2aef3b['$1']));if(_0x51e989[_0x208a81(0x684)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x208a81(0x664)==='ubNMX'){const _0x24e7ce=JSON[_0x208a81(0x3f8)]('['+RegExp['$1']['match'](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x208a81(0x309)][_0x208a81(0x5e5)](_0x24e7ce),this[_0x208a81(0x309)]['remove'](0x0);}else{const _0x475ef1=_0x4f4419['EventsMoveCore']['Game_Event_meetsConditionsCPC'][_0x208a81(0x4ca)](this,_0x151658);if(!_0x475ef1)return![];return this[_0x208a81(0x3ec)](_0x50abd2);}}if(_0x51e989['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x2c554a=String(RegExp['$1']);if(_0x2c554a[_0x208a81(0x684)](/PLAYER/i))this[_0x208a81(0x3a1)][_0x208a81(0x4b0)]=0x0;else{if(_0x2c554a[_0x208a81(0x684)](/EVENT[ ](\d+)/i)){if('ZwVhK'!=='ZwVhK'){let _0x316625=this[_0x208a81(0x621)];return this[_0x208a81(0x2d6)]()&&(_0x316625+=this[_0x208a81(0x42d)]()),this[_0x208a81(0x1bf)](_0x316625);}else this[_0x208a81(0x3a1)]['target']=Number(RegExp['$1']);}}}if(_0x51e989['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x208a81(0x3cd)!==_0x208a81(0x3cd)){if(this[_0x208a81(0x659)]()&&this[_0x208a81(0x29d)]()===_0x208a81(0x581))return!![];return _0x4cf653[_0x208a81(0x54c)]['Game_CharacterBase_hasStepAnime'][_0x208a81(0x4ca)](this);}else this[_0x208a81(0x3a1)][_0x208a81(0x2c8)]=String(RegExp['$1'])[_0x208a81(0x4ce)]()[_0x208a81(0x43e)]();}if(_0x51e989[_0x208a81(0x684)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x208a81(0x302)===_0x208a81(0x615)){this[_0x208a81(0x5a5)]=![],this[_0x208a81(0x5ae)]=![];if(!_0x31cebe)return;const _0x3188b5=_0x2c6cb2[_0x208a81(0x3c8)]||'';if(_0x3188b5[_0x208a81(0x684)](/<HIDE PLAYER>/i))this['_forceShowPlayer']=![],this['_forceHidePlayer']=!![];else _0x3188b5[_0x208a81(0x684)](/<SHOW PLAYER>/i)&&(this[_0x208a81(0x5a5)]=!![],this['_forceHidePlayer']=![]);}else this[_0x208a81(0x3a1)][_0x208a81(0x527)]=Number(RegExp['$1']);}if(_0x51e989[_0x208a81(0x684)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)){if(_0x208a81(0x4d6)!=='aigMs')this[_0x208a81(0x3a1)][_0x208a81(0x2d7)]=Number(RegExp['$1']);else return _0x4ca303[_0x208a81(0x491)]();}if(_0x51e989[_0x208a81(0x684)](/<TRUE RANDOM MOVE>/i))this[_0x208a81(0x55b)]=0x0;else{if(_0x51e989['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x208a81(0x512)!==_0x208a81(0x2b5))this[_0x208a81(0x55b)]=Number(RegExp['$1'])||0x0;else{if(!this[_0x208a81(0x21e)])return![];if(!this[_0x208a81(0x21e)][_0x208a81(0x4c4)])return![];if(this[_0x208a81(0x647)]!==this[_0x208a81(0x21e)][_0x208a81(0x1c7)])return!![];if(this[_0x208a81(0x21e)][_0x208a81(0x294)]&&!this[_0x208a81(0x406)])return!![];if(this[_0x208a81(0x21e)][_0x208a81(0x4c4)][_0x208a81(0x46b)]==='')return![];if(this[_0x208a81(0x55e)]!==_0x103d79[_0x208a81(0x3ad)]())return!![];if(this[_0x208a81(0x5cd)]!==this['_event'][_0x208a81(0x5d1)]())return!![];if(this[_0x208a81(0x505)]!==this['_event'][_0x208a81(0x37c)]())return!![];if(this[_0x208a81(0x4a9)]!==this[_0x208a81(0x21e)][_0x208a81(0x4c4)][_0x208a81(0x5b1)])return!![];if(this[_0x208a81(0x1eb)]!==this[_0x208a81(0x21e)][_0x208a81(0x4c4)][_0x208a81(0x2b4)])return!![];if(this['_visiblePlayerX']!==_0x51a80b['x'])return!![];if(this['_visiblePlayerY']!==_0x458a2d['y'])return!![];if(this[_0x208a81(0x5e6)]!==this['_event']['x'])return!![];if(this['_visibleEventY']!==this[_0x208a81(0x21e)]['y'])return!![];if(this['_cacheSystemVisible']!==_0x48c8e6[_0x208a81(0x4ae)]())return!![];if(this[_0x208a81(0x1e2)]&&this[_0x208a81(0x5a1)]<0xff)return!![];if(!this[_0x208a81(0x1e2)]&&this[_0x208a81(0x5a1)]>0x0)return!![];if(_0x25b0f1[_0x208a81(0x26d)][_0x208a81(0x583)]>0x0)return!![];return![];}}}_0x51e989['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x208a81(0x2b9)]=!![]);_0x51e989['match'](/<HIDE SHADOW>/i)&&('lXtmT'!=='lXtmT'?this[_0x208a81(0x61b)][_0x208a81(0x3fc)]['isSpriteVS8dir']()&&(this['x']+=_0x3a0d6a['EventsMoveCore'][_0x208a81(0x256)][_0x208a81(0x2a2)][_0x208a81(0x5f9)],this['y']+=_0x568d7e[_0x208a81(0x54c)][_0x208a81(0x256)]['VS8'][_0x208a81(0x463)]):this['_shadowGraphic'][_0x208a81(0x535)]=![]);_0x51e989[_0x208a81(0x684)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic'][_0x208a81(0x375)]=String(RegExp['$1']));if(_0x51e989['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x208a81(0x27c)!=='DxfPN')this[_0x208a81(0x1df)]=Number(RegExp['$1']);else{if([0x1,0x4,0x7][_0x208a81(0x347)](_0x54c1fd))_0x49728e-=0x1;if([0x3,0x6,0x9][_0x208a81(0x347)](_0x2fcaba))_0x27260e+=0x1;return this['roundX'](_0xcd5a23);}}_0x51e989[_0x208a81(0x684)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1'])),_0x51e989[_0x208a81(0x684)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x208a81(0x1df)]=Number(RegExp['$1']),this[_0x208a81(0x398)]=Number(RegExp['$2'])),_0x51e989[_0x208a81(0x684)](/<STEP PATTERN:[ ](.*)>/i)&&(this['_stepPattern']=String(RegExp['$1'])[_0x208a81(0x4b7)]()[_0x208a81(0x43e)]());},Game_Event['prototype'][_0x165665(0x1f0)]=function(){const _0x533c8e=_0x165665;this[_0x533c8e(0x6b7)]();},Game_Event['prototype'][_0x165665(0x328)]=function(){const _0x5387c5=_0x165665;if(this[_0x5387c5(0x5e3)])return!![];return Game_Character[_0x5387c5(0x49c)]['isNearTheScreen'][_0x5387c5(0x4ca)](this);},VisuMZ[_0x165665(0x54c)][_0x165665(0x240)]=Game_Event[_0x165665(0x49c)][_0x165665(0x34b)],Game_Event[_0x165665(0x49c)][_0x165665(0x34b)]=function(){const _0x118911=_0x165665;if(this[_0x118911(0x299)]())return;VisuMZ[_0x118911(0x54c)][_0x118911(0x240)][_0x118911(0x4ca)](this),this[_0x118911(0x66e)]()&&VisuMZ[_0x118911(0x6ce)](this[_0x118911(0x676)]);},Game_Event['prototype'][_0x165665(0x299)]=function(){const _0x3b6833=_0x165665,_0x438110=VisuMZ[_0x3b6833(0x54c)][_0x3b6833(0x256)][_0x3b6833(0x2fc)];if($gameMap[_0x3b6833(0x529)]()&&_0x438110[_0x3b6833(0x21c)])return!![];if($gameMessage['isBusy']()&&_0x438110[_0x3b6833(0x5f2)])return!![];if(!$gameSystem[_0x3b6833(0x4cc)]())return!![];if(this[_0x3b6833(0x560)]()>=0x0)return!![];return![];},Game_Event['prototype'][_0x165665(0x6b7)]=function(){const _0xd85879=_0x165665,_0x3c675e=SceneManager[_0xd85879(0x26d)][_0xd85879(0x699)];if(_0x3c675e){if(_0xd85879(0x4f0)!==_0xd85879(0x4f0))return!![];else{const _0x10d09a=_0x3c675e[_0xd85879(0x35d)](this);if(_0x10d09a&&_0x10d09a[_0xd85879(0x52e)]&&_0x10d09a[_0xd85879(0x52e)][_0xd85879(0x5af)]!==this[_0xd85879(0x231)]()){if(_0xd85879(0x66c)===_0xd85879(0x66c))_0x10d09a[_0xd85879(0x52e)]['_filename']=this[_0xd85879(0x231)](),_0x10d09a[_0xd85879(0x52e)][_0xd85879(0x298)]=ImageManager['loadSystem'](_0x10d09a[_0xd85879(0x52e)][_0xd85879(0x5af)]);else{if(_0x3c72ca===0x4)_0x27bf4b=0x6;else _0x5d4ce6===0x6&&(_0x4c214b=0x4);}}}}},Game_Event[_0x165665(0x49c)][_0x165665(0x231)]=function(){const _0x179aa6=_0x165665;return this[_0x179aa6(0x2a0)][_0x179aa6(0x375)];},Game_Event[_0x165665(0x49c)][_0x165665(0x4e0)]=function(){const _0x2b89d3=_0x165665;if(!this[_0x2b89d3(0x2a0)][_0x2b89d3(0x535)])return![];return Game_CharacterBase['prototype']['isShadowVisible'][_0x2b89d3(0x4ca)](this);},Game_Event[_0x165665(0x49c)]['labelWindowText']=function(){const _0x4f595c=_0x165665;return this[_0x4f595c(0x4c4)][_0x4f595c(0x46b)];},Game_Event['prototype'][_0x165665(0x430)]=function(){const _0x168925=_0x165665;return this['_labelWindow'][_0x168925(0x239)];},Game_Event[_0x165665(0x49c)]['isMapPassable']=function(_0x54ccc1,_0x2e0a2c,_0x41d025){const _0x9a5c6=_0x165665;if(this[_0x9a5c6(0x35b)]())return this[_0x9a5c6(0x2c5)](_0x54ccc1,_0x2e0a2c,_0x41d025);if($gameMap[_0x9a5c6(0x387)](_0x54ccc1,_0x2e0a2c,_0x41d025,_0x9a5c6(0x1c5)))return!![];if($gameMap[_0x9a5c6(0x402)](_0x54ccc1,_0x2e0a2c,_0x41d025,_0x9a5c6(0x1c5)))return![];return Game_Character[_0x9a5c6(0x49c)][_0x9a5c6(0x44b)][_0x9a5c6(0x4ca)](this,_0x54ccc1,_0x2e0a2c,_0x41d025);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x3d3b50=_0x165665;if(this[_0x3d3b50(0x309)]===undefined)this[_0x3d3b50(0x204)]();return this['_moveOnlyRegions'][_0x3d3b50(0x670)]>0x0;},Game_Event[_0x165665(0x49c)][_0x165665(0x2c5)]=function(_0x5c6d7c,_0x4d38f9,_0x56f9d6){const _0x84d5e6=_0x165665,_0x1b8b8a=$gameMap[_0x84d5e6(0x50c)](_0x5c6d7c,_0x56f9d6),_0xd1c955=$gameMap[_0x84d5e6(0x54d)](_0x4d38f9,_0x56f9d6),_0x2efef9=$gameMap[_0x84d5e6(0x520)](_0x1b8b8a,_0xd1c955);return this[_0x84d5e6(0x309)][_0x84d5e6(0x347)](_0x2efef9);},VisuMZ[_0x165665(0x54c)][_0x165665(0x589)]=Game_Event[_0x165665(0x49c)][_0x165665(0x5b4)],Game_Event[_0x165665(0x49c)][_0x165665(0x5b4)]=function(){const _0x2c3bd2=_0x165665;return this[_0x2c3bd2(0x1cb)]=![],this[_0x2c3bd2(0x460)]=![],this[_0x2c3bd2(0x1c5)]()?VisuMZ['EventsMoveCore'][_0x2c3bd2(0x589)][_0x2c3bd2(0x4ca)](this):-0x1;},VisuMZ[_0x165665(0x54c)]['Game_Event_meetsConditions']=Game_Event[_0x165665(0x49c)][_0x165665(0x243)],Game_Event[_0x165665(0x49c)]['meetsConditions']=function(_0x2a8aad){const _0x4dedba=_0x165665;this[_0x4dedba(0x436)](_0x2a8aad),$gameTemp[_0x4dedba(0x5ba)](this);const _0x4e87ae=VisuMZ[_0x4dedba(0x54c)]['Game_Event_meetsConditions']['call'](this,_0x2a8aad);return $gameTemp[_0x4dedba(0x6b1)](),_0x4e87ae;},Game_Event[_0x165665(0x49c)][_0x165665(0x2be)]=function(){const _0x220488=_0x165665;return this[_0x220488(0x1cb)];},Game_Event[_0x165665(0x49c)][_0x165665(0x436)]=function(_0x47a815){const _0x29a3d3=_0x165665,_0x8b6d2f=_0x47a815[_0x29a3d3(0x45a)];if(_0x8b6d2f[_0x29a3d3(0x34a)]&&DataManager[_0x29a3d3(0x6b9)](_0x8b6d2f[_0x29a3d3(0x1d8)])){if(_0x29a3d3(0x39f)===_0x29a3d3(0x39f))this[_0x29a3d3(0x1cb)]=!![];else{if(this[_0x29a3d3(0x2ba)]===_0x15d648)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x29a3d3(0x33c)]===_0x261b71)this[_0x29a3d3(0x20b)]();return this[_0x29a3d3(0x2ba)][_0x29a3d3(0x33c)];}}else{if(_0x8b6d2f[_0x29a3d3(0x470)]&&DataManager[_0x29a3d3(0x6b9)](_0x8b6d2f[_0x29a3d3(0x1d1)]))_0x29a3d3(0x58f)!==_0x29a3d3(0x58f)?this[_0x29a3d3(0x4c4)]['text']=this['_labelWindow'][_0x29a3d3(0x46b)][_0x29a3d3(0x3db)](/\\V\[(\d+)\]/gi,(_0x50a86d,_0x856f7e)=>_0x2dfcef[_0x29a3d3(0x519)](_0x44e7e2(_0x856f7e))):this['_advancedSwitchVariable']=!![];else _0x8b6d2f[_0x29a3d3(0x1b7)]&&DataManager[_0x29a3d3(0x67b)](_0x8b6d2f['variableId'])&&(this[_0x29a3d3(0x1cb)]=!![]);}},Game_Event['prototype'][_0x165665(0x2a3)]=function(){const _0x388b9c=_0x165665;if(this[_0x388b9c(0x294)])return![];return this[_0x388b9c(0x3df)];},Game_Event[_0x165665(0x49c)][_0x165665(0x674)]=function(){const _0x16eee0=_0x165665;$gameTemp[_0x16eee0(0x25f)](),this[_0x16eee0(0x416)]();},Game_Event[_0x165665(0x49c)]['pos']=function(_0x315707,_0x2b52cb){const _0x495aa2=_0x165665;if(this[_0x495aa2(0x48e)]){if(_0x495aa2(0x445)!==_0x495aa2(0x445)){const _0x4eb556=_0x4f332f?_0x4ab10d[_0x495aa2(0x49b)]():0x0,_0x11f837=[0x0,0x0,_0x495aa2(0x4c2)[_0x495aa2(0x3ef)](_0x4eb556,_0x5b4831)];return _0x5890b7['setValue'](_0x11f837,_0x20b90f);}else return this[_0x495aa2(0x452)](_0x315707,_0x2b52cb);}else return Game_Character['prototype']['pos']['call'](this,_0x315707,_0x2b52cb);},Game_Event[_0x165665(0x49c)][_0x165665(0x452)]=function(_0x118dde,_0x412e3b){const _0x4043ea=_0x165665;var _0x1bccce=this['x']-this[_0x4043ea(0x48e)][_0x4043ea(0x3d6)],_0x400711=this['x']+this[_0x4043ea(0x48e)]['right'],_0x4c1ae6=this['y']-this['_addedHitbox']['up'],_0x433d99=this['y']+this['_addedHitbox'][_0x4043ea(0x2cc)];return _0x1bccce<=_0x118dde&&_0x118dde<=_0x400711&&_0x4c1ae6<=_0x412e3b&&_0x412e3b<=_0x433d99;},Game_Event[_0x165665(0x49c)][_0x165665(0x5c0)]=function(_0xa9f196,_0x3d0875,_0x58371c){const _0x369054=_0x165665;for(let _0x504a5e=-this[_0x369054(0x48e)]['left'];_0x504a5e<=this[_0x369054(0x48e)][_0x369054(0x1ed)];_0x504a5e++){for(let _0x457ebf=-this[_0x369054(0x48e)]['up'];_0x457ebf<=this[_0x369054(0x48e)]['down'];_0x457ebf++){if(!Game_Character['prototype']['canPass'][_0x369054(0x4ca)](this,_0xa9f196+_0x504a5e,_0x3d0875+_0x457ebf,_0x58371c)){if(_0x369054(0x4f1)===_0x369054(0x4f1))return![];else{_0x2132d2=_0x41b2fe[_0x369054(0x4b7)]()[_0x369054(0x43e)]();const _0xadbc14=_0x27a8c8[_0x369054(0x5a6)][_0xb3104a];if(!_0xadbc14)return;const _0x428cb8=_0xadbc14['MapID'],_0x647e19=_0xadbc14[_0x369054(0x369)];if(!this[_0x369054(0x553)](_0x428cb8,_0x647e19))return;if(!_0x46dcbc)_0xadbc14[_0x369054(0x28d)][_0x369054(0x4ca)](this,_0x428cb8,_0x647e19,this);this[_0x369054(0x515)](_0x428cb8,_0x647e19,_0x59ef12);if(!_0x2c5143)_0xadbc14[_0x369054(0x5f7)]['call'](this,_0x428cb8,_0x647e19,this);if(_0x2b5ffa)_0x30a9d4['clearEventCache']();}}}}return!![];},Game_Event[_0x165665(0x49c)][_0x165665(0x50b)]=function(_0x1f869e,_0xe6e3d3){const _0x18eeb2=_0x165665;if(Imported[_0x18eeb2(0x1bb)]&&this['isSmartEventCollisionOn']())return this[_0x18eeb2(0x3d4)](_0x1f869e,_0xe6e3d3);else{const _0x5e9a37=$gameMap[_0x18eeb2(0x45f)](_0x1f869e,_0xe6e3d3)['filter'](_0x353b84=>_0x353b84!==this);return _0x5e9a37[_0x18eeb2(0x670)]>0x0;}},Game_Event['prototype']['checkSmartEventCollision']=function(_0x8805c1,_0x1b0ee0){const _0xe96c72=_0x165665;if(!this[_0xe96c72(0x56c)]()){if(_0xe96c72(0x649)!=='ZrcBG'){const _0xa2b6e6=_0x5f1d60[_0xe96c72(0x2ea)](this['_realX'],this[_0xe96c72(0x569)],_0x246fb7[_0xe96c72(0x6ae)],_0x2f24d4[_0xe96c72(0x569)])-0x1,_0x539b52=_0x18ab79[_0xe96c72(0x442)](_0x1ce7d8[_0xe96c72(0x25d)](),_0x1a4fb0[_0xe96c72(0x3e8)]()),_0x36df0d=this[_0xe96c72(0x3a1)][_0xe96c72(0x2d7)]||0x0;_0x65fe52-=_0x1e1b05['max'](0x0,_0xa2b6e6)*_0x539b52*_0x36df0d;}else return![];}else{const _0x3091cf=$gameMap[_0xe96c72(0x45f)](_0x8805c1,_0x1b0ee0)[_0xe96c72(0x51a)](_0x38438f=>_0x38438f!==this&&_0x38438f[_0xe96c72(0x56c)]());return _0x3091cf[_0xe96c72(0x670)]>0x0;}},Game_Event[_0x165665(0x49c)][_0x165665(0x547)]=function(){const _0x3af5ba=_0x165665;return this[_0x3af5ba(0x295)][_0x3af5ba(0x2c8)]||_0x3af5ba(0x5fd);},Game_Event[_0x165665(0x49c)][_0x165665(0x450)]=function(){const _0x507775=_0x165665;return this[_0x507775(0x295)][_0x507775(0x2ea)]||0x0;},Game_Event[_0x165665(0x49c)][_0x165665(0x3d1)]=function(){const _0x20a3df=_0x165665;return this[_0x20a3df(0x295)]['regionList']||[];},Game_Event[_0x165665(0x49c)]['increaseSteps']=function(){const _0x364aca=_0x165665;Game_Character['prototype']['increaseSteps'][_0x364aca(0x4ca)](this);if(['none',_0x364aca(0x53a)][_0x364aca(0x347)](this['activationProximityType']()))return;$gamePlayer[_0x364aca(0x414)]([0x2]);},VisuMZ[_0x165665(0x54c)][_0x165665(0x4d3)]=Game_Event[_0x165665(0x49c)][_0x165665(0x510)],Game_Event[_0x165665(0x49c)][_0x165665(0x510)]=function(){const _0x16ec4c=_0x165665;if(this['_trigger']!==0x3)return;if(this[_0x16ec4c(0x235)])return;if(!this[_0x16ec4c(0x34c)](![]))return;if(!this[_0x16ec4c(0x1d5)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x16ec4c(0x4ca)](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event[_0x165665(0x49c)]['updateParallel'],Game_Event[_0x165665(0x49c)][_0x165665(0x56e)]=function(){const _0x51d275=_0x165665;if(!this[_0x51d275(0x446)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x51d275(0x1d5)](!![]))return;VisuMZ['EventsMoveCore'][_0x51d275(0x257)][_0x51d275(0x4ca)](this);},Game_Event[_0x165665(0x49c)][_0x165665(0x34c)]=function(_0x2765cc){const _0x2ebde7=_0x165665;if(!_0x2765cc&&$gameMap['isEventRunning']())return![];if(!_0x2765cc&&$gameMap[_0x2ebde7(0x200)]())return![];if(this[_0x2ebde7(0x3d1)]()<=0x0)return!![];return $gamePlayer[_0x2ebde7(0x40e)](this);},Game_Event[_0x165665(0x49c)]['checkActivationProximity']=function(_0xada3a9){const _0x4b3e12=_0x165665;if(!_0xada3a9&&$gameMap[_0x4b3e12(0x529)]())return![];if(!_0xada3a9&&$gameMap[_0x4b3e12(0x200)]())return![];if(['none','region'][_0x4b3e12(0x347)](this[_0x4b3e12(0x547)]()))return!![];return $gamePlayer[_0x4b3e12(0x301)](this);},VisuMZ[_0x165665(0x6ce)]=function(_0x189569){const _0x32c077=_0x165665;for(const _0x1a5538 of $gameMap[_0x32c077(0x2f8)]()){if(!_0x1a5538)continue;_0x1a5538[_0x32c077(0x560)]()===_0x189569&&_0x1a5538['updateMoveSynch']();}},VisuMZ[_0x165665(0x1d7)]=function(_0x547559){const _0x5f6da3=_0x165665;if(_0x547559===0x0)return $gamePlayer;return $gameMap[_0x5f6da3(0x1c5)](_0x547559);},Game_Event[_0x165665(0x49c)][_0x165665(0x560)]=function(){const _0x1406c1=_0x165665;return this[_0x1406c1(0x3a1)]['target'];},Game_Event[_0x165665(0x49c)][_0x165665(0x47a)]=function(){const _0x2e8422=_0x165665;return this[_0x2e8422(0x3a1)]['type'];},Game_Event[_0x165665(0x49c)]['realMoveSpeed']=function(){const _0x46e83b=_0x165665;if(this['moveSynchTarget']()>=0x0){if(_0x46e83b(0x59c)!==_0x46e83b(0x59c)){if(_0x433b1f)this[_0x46e83b(0x24e)](_0x357136['x'],_0x83f116['y']);}else{const _0x218dd8=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());if(_0x218dd8)return _0x218dd8['realMoveSpeed']();}}return Game_Character['prototype'][_0x46e83b(0x491)][_0x46e83b(0x4ca)](this);},Game_Event[_0x165665(0x49c)][_0x165665(0x29e)]=function(){const _0x41b5b2=_0x165665;this['_moveSynch'][_0x41b5b2(0x43d)]=this['_moveSynch']['timer']||0x0,this[_0x41b5b2(0x3a1)]['timer']--;if(this['_moveSynch'][_0x41b5b2(0x43d)]>0x0)return;this[_0x41b5b2(0x3a1)][_0x41b5b2(0x43d)]=this[_0x41b5b2(0x3a1)][_0x41b5b2(0x527)],this['processMoveSynch']();},Game_Event[_0x165665(0x49c)][_0x165665(0x4b9)]=function(_0x1414ea){const _0x5f1150=_0x165665;if(this[_0x5f1150(0x560)]()>=0x0){const _0x3a1e74=VisuMZ[_0x5f1150(0x1d7)](this['moveSynchTarget']());if(_0x3a1e74){if('BMGZK'==='KCmyY'){if(!this[_0x5f1150(0x298)])return;this['bitmap'][_0x5f1150(0x60f)]=!!_0x2b6b89[_0x5f1150(0x54c)][_0x5f1150(0x256)][_0x5f1150(0x2fc)][_0x5f1150(0x37b)];}else{const _0x733b5b=$gameMap[_0x5f1150(0x2ea)](this[_0x5f1150(0x6ae)],this[_0x5f1150(0x569)],_0x3a1e74[_0x5f1150(0x6ae)],_0x3a1e74['_realY'])-0x1,_0x426fab=Math[_0x5f1150(0x442)]($gameMap[_0x5f1150(0x25d)](),$gameMap[_0x5f1150(0x3e8)]()),_0x376267=this['_moveSynch']['opacityDelta']||0x0;_0x1414ea-=Math[_0x5f1150(0x1d2)](0x0,_0x733b5b)*_0x426fab*_0x376267;}}}return _0x1414ea;},Game_Event[_0x165665(0x49c)][_0x165665(0x48d)]=function(){const _0x285c91=_0x165665;switch(this[_0x285c91(0x47a)]()){case'random':this[_0x285c91(0x2cb)]();break;case _0x285c91(0x65e):this[_0x285c91(0x2c9)]();break;case _0x285c91(0x5dd):this[_0x285c91(0x51e)]();break;case _0x285c91(0x2c6):this[_0x285c91(0x1e1)]();break;case'mimic':case _0x285c91(0x2ec):this[_0x285c91(0x435)]();break;case'reverse\x20mimic':case _0x285c91(0x503):this['processMoveSynchReverseMimic']();break;case _0x285c91(0x1dc):case _0x285c91(0x660):case _0x285c91(0x3f4):case _0x285c91(0x2a4):this[_0x285c91(0x5e4)]();break;case _0x285c91(0x66b):case _0x285c91(0x27b):case _0x285c91(0x407):case _0x285c91(0x2db):this['processMoveSynchMirrorVert']();break;default:this[_0x285c91(0x2cb)]();break;}this[_0x285c91(0x3be)]();},Game_Event[_0x165665(0x49c)][_0x165665(0x2cb)]=function(){const _0x1317aa=_0x165665,_0x3ac944=[0x2,0x4,0x6,0x8];if($gameMap[_0x1317aa(0x289)]()){if(_0x1317aa(0x63e)===_0x1317aa(0x63e))_0x3ac944['push'](0x1,0x3,0x7,0x9);else{if(this['isPassable'](_0x2f235b,_0x59613c,0x2))return!![];if(this['isPassable'](_0x347031,_0x3a9327,0x4))return!![];if(this[_0x1317aa(0x2b3)](_0x37c0f7,_0xc41d66,0x6))return!![];if(this[_0x1317aa(0x2b3)](_0x197709,_0x300572,0x8))return!![];return![];}}const _0x2235d4=[];for(const _0x44143b of _0x3ac944){if(this[_0x1317aa(0x5c0)](this['x'],this['y'],_0x44143b))_0x2235d4[_0x1317aa(0x673)](_0x44143b);}if(_0x2235d4['length']>0x0){const _0x4fcf1c=_0x2235d4[Math['randomInt'](_0x2235d4['length'])];this['executeMoveDir8'](_0x4fcf1c);}},Game_Event[_0x165665(0x49c)]['processMoveSynchApproach']=function(){const _0x2fe36c=_0x165665,_0x3aba3a=VisuMZ[_0x2fe36c(0x1d7)](this[_0x2fe36c(0x560)]());this['moveTowardCharacter'](_0x3aba3a);},Game_Event[_0x165665(0x49c)][_0x165665(0x51e)]=function(){const _0x21320e=_0x165665,_0x360ec5=VisuMZ[_0x21320e(0x1d7)](this['moveSynchTarget']());this[_0x21320e(0x261)](_0x360ec5);},Game_Event[_0x165665(0x49c)]['processMoveSynchCustom']=function(){const _0x268ce7=_0x165665;this[_0x268ce7(0x47f)]();},Game_Event[_0x165665(0x49c)]['processMoveSynchMimic']=function(){const _0x2db57d=_0x165665,_0x506736=VisuMZ['GetMoveSynchTarget'](this[_0x2db57d(0x560)]());this[_0x2db57d(0x5f1)](_0x506736[_0x2db57d(0x22b)]());},Game_Event[_0x165665(0x49c)][_0x165665(0x2f6)]=function(){const _0x4f3d8d=_0x165665,_0x1edb23=VisuMZ[_0x4f3d8d(0x1d7)](this[_0x4f3d8d(0x560)]());this['executeMoveDir8'](this['reverseDir'](_0x1edb23[_0x4f3d8d(0x22b)]()));},Game_Event[_0x165665(0x49c)][_0x165665(0x5e4)]=function(){const _0x1e9de9=_0x165665,_0x181a47=VisuMZ[_0x1e9de9(0x1d7)](this[_0x1e9de9(0x560)]()),_0x511bef=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x181a47[_0x1e9de9(0x22b)]()];this[_0x1e9de9(0x5f1)](_0x511bef);},Game_Event['prototype']['processMoveSynchMirrorVert']=function(){const _0x5d0d22=_0x165665,_0x8d8312=VisuMZ[_0x5d0d22(0x1d7)](this[_0x5d0d22(0x560)]()),_0xb21e3=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x8d8312[_0x5d0d22(0x22b)]()];this[_0x5d0d22(0x5f1)](_0xb21e3);},Game_Event[_0x165665(0x49c)][_0x165665(0x596)]=function(){const _0x5a62a6=_0x165665,_0x50ae53=$gameSystem[_0x5a62a6(0x47d)](this);if(!_0x50ae53)return;this[_0x5a62a6(0x590)](_0x50ae53['x'],_0x50ae53['y']),this[_0x5a62a6(0x4ab)](_0x50ae53['direction']),this['_pageIndex']===_0x50ae53['pageIndex']&&(_0x5a62a6(0x246)==='RxmyC'?this['opacity']-=this[_0x5a62a6(0x4a6)]():this['_moveRouteIndex']=_0x50ae53['moveRouteIndex']);},Game_Event['prototype'][_0x165665(0x3a6)]=function(){const _0x2ef8af=_0x165665;Game_Character[_0x2ef8af(0x49c)][_0x2ef8af(0x3a6)][_0x2ef8af(0x4ca)](this),this['autosaveEventLocation']();},Game_Event[_0x165665(0x49c)][_0x165665(0x540)]=function(){const _0x1f7c4b=_0x165665;if($gameMap[_0x1f7c4b(0x263)]())return!![];return this[_0x1f7c4b(0x2b9)];},Game_Event[_0x165665(0x49c)][_0x165665(0x6a0)]=function(){const _0xb5ef5d=_0x165665;if(!this[_0xb5ef5d(0x540)]())return;this[_0xb5ef5d(0x58b)]();},Game_Event[_0x165665(0x49c)]['saveEventLocation']=function(){const _0x5a1ecf=_0x165665;$gameSystem[_0x5a1ecf(0x58b)](this);},Game_Event[_0x165665(0x49c)][_0x165665(0x65b)]=function(){const _0x116887=_0x165665;$gameSystem[_0x116887(0x67f)](this);},Game_Event[_0x165665(0x49c)]['getEventIconData']=function(){const _0x4da393=_0x165665;if($gameSystem[_0x4da393(0x631)](this))return Game_Character[_0x4da393(0x49c)][_0x4da393(0x631)][_0x4da393(0x4ca)](this);else{if('lhVnE'==='lhVnE')return{'iconIndex':0x0,'bufferX':settings[_0x4da393(0x241)][_0x4da393(0x5e1)],'bufferY':settings[_0x4da393(0x241)]['BufferY'],'blendMode':settings[_0x4da393(0x241)][_0x4da393(0x39d)]};else{if(this[_0x4da393(0x35b)]())return this[_0x4da393(0x2c5)](_0x192b8e,_0x4c49ca,_0x17578e);if(_0x941a5b[_0x4da393(0x387)](_0x266477,_0x341bf7,_0x57b0d9,_0x4da393(0x1c5)))return!![];if(_0x10e48e['isRegionForbidPass'](_0x214807,_0x5783cd,_0x38634d,_0x4da393(0x1c5)))return![];return _0x4976fa['prototype']['isMapPassable'][_0x4da393(0x4ca)](this,_0xc31373,_0x102137,_0x1a74df);}}},Game_Event[_0x165665(0x49c)]['hasCPCs']=function(){const _0x4148d0=_0x165665;return this[_0x4148d0(0x460)];},VisuMZ[_0x165665(0x54c)]['Game_Event_meetsConditionsCPC']=Game_Event['prototype']['meetsConditions'],Game_Event[_0x165665(0x49c)][_0x165665(0x243)]=function(_0x50ab3a){const _0x366e34=_0x165665,_0x4d5232=VisuMZ['EventsMoveCore'][_0x366e34(0x50d)][_0x366e34(0x4ca)](this,_0x50ab3a);if(!_0x4d5232)return![];return this[_0x366e34(0x3ec)](_0x50ab3a);},Game_Event['prototype']['meetsCPC']=function(_0x4a57ef){const _0x333cd0=_0x165665;VisuMZ['EventsMoveCore'][_0x333cd0(0x3f2)]['loadCPC'](_0x4a57ef),this[_0x333cd0(0x460)]=_0x4a57ef[_0x333cd0(0x365)]['length']>0x0;if(_0x4a57ef[_0x333cd0(0x365)]===undefined){if('BzRgL'==='QgFjg'){_0x227aa6[_0x333cd0(0x54c)][_0x333cd0(0x6d8)]['call'](this,_0x202696,_0x391911);if(this['isSpriteVS8dir']())this[_0x333cd0(0x4c0)](_0x2a4d99,_0x77bd35);}else VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x333cd0(0x25a)](_0x4a57ef);}if(_0x4a57ef['CPC'][_0x333cd0(0x670)]>0x0){if(_0x333cd0(0x637)!==_0x333cd0(0x637)){const _0x30f003=_0x61c355&&this[_0x333cd0(0x676)]?_0x58ad5e[_0x333cd0(0x1c5)](this[_0x333cd0(0x676)]):null;_0x123962['registerSelfTarget'](_0x30f003);const _0x2b16a0=_0x549bd9[_0x333cd0(0x54c)][_0x333cd0(0x493)][_0x333cd0(0x4ca)](this);return _0x54c701[_0x333cd0(0x6b1)](),_0x2b16a0;}else return $gameMap[_0x333cd0(0x1c5)](this[_0x333cd0(0x676)])&&VisuMZ['EventsMoveCore'][_0x333cd0(0x3f2)][_0x333cd0(0x324)](_0x4a57ef[_0x333cd0(0x365)],this[_0x333cd0(0x676)]);}return!![];},VisuMZ['EventsMoveCore'][_0x165665(0x1f9)]=Game_Troop['prototype'][_0x165665(0x243)],Game_Troop[_0x165665(0x49c)][_0x165665(0x243)]=function(_0x41d0c0){const _0x3c562d=_0x165665;var _0x2a7bcc=VisuMZ[_0x3c562d(0x54c)]['Game_Troop_meetsConditionsCPC'][_0x3c562d(0x4ca)](this,_0x41d0c0);return _0x2a7bcc&&this['CPCsMet'](_0x41d0c0);},Game_Troop[_0x165665(0x49c)][_0x165665(0x625)]=function(_0x38aee0){const _0x42a623=_0x165665;if(_0x38aee0[_0x42a623(0x365)]===undefined){if(_0x42a623(0x2f9)===_0x42a623(0x2f9))VisuMZ[_0x42a623(0x54c)][_0x42a623(0x3f2)][_0x42a623(0x25a)](_0x38aee0);else return this['isOnLadder']()&&this['terrainTag']()===_0x47eb7c[_0x42a623(0x54c)][_0x42a623(0x256)][_0x42a623(0x483)][_0x42a623(0x1ee)];}if(_0x38aee0['CPC'][_0x42a623(0x670)]>0x0){if('vijRr'==='uIelB'){if(!_0x1e8cdb[_0x42a623(0x3ed)]())return;_0x174b7b[_0x42a623(0x1c9)](_0xaee2c8,_0x5568fb);let _0x474fc9=0x0;_0x474fc9+=_0x45698f['Frames'],_0x474fc9+=_0x476284['Seconds']*0x3c,_0x474fc9+=_0x26ff89[_0x42a623(0x423)]*0x3c*0x3c,_0x474fc9+=_0x500d7a['Hours']*0x3c*0x3c*0x3c,_0x2a8ca7['gainFrames'](_0x474fc9);}else return VisuMZ[_0x42a623(0x54c)][_0x42a623(0x3f2)][_0x42a623(0x324)](_0x38aee0[_0x42a623(0x365)],0x0);}return!![];},VisuMZ[_0x165665(0x54c)][_0x165665(0x455)]=Game_Event['prototype'][_0x165665(0x590)],Game_Event[_0x165665(0x49c)][_0x165665(0x590)]=function(_0x48147e,_0x3b836d){const _0x218c88=_0x165665;VisuMZ[_0x218c88(0x54c)][_0x218c88(0x455)]['call'](this,_0x48147e,_0x3b836d),this[_0x218c88(0x4d7)]=_0x48147e,this[_0x218c88(0x244)]=_0x3b836d,this[_0x218c88(0x6a0)]();},VisuMZ[_0x165665(0x54c)]['Game_Event_moveTypeRandom']=Game_Event[_0x165665(0x49c)][_0x165665(0x269)],Game_Event[_0x165665(0x49c)][_0x165665(0x269)]=function(){const _0x265899=_0x165665,_0x17e283=$gameMap[_0x265899(0x2ea)](this['x'],this['y'],this[_0x265899(0x4d7)],this['_randomHomeY']),_0x46ff6a=_0x17e283*(this[_0x265899(0x55b)]||0x0);Math['random']()>=_0x46ff6a?VisuMZ['EventsMoveCore'][_0x265899(0x626)]['call'](this):this[_0x265899(0x53c)]();},Game_Event[_0x165665(0x49c)][_0x165665(0x53c)]=function(){const _0x2095bd=_0x165665,_0x67f8fb=this[_0x2095bd(0x307)](this[_0x2095bd(0x4d7)]),_0x5536ad=this[_0x2095bd(0x63d)](this[_0x2095bd(0x244)]);if(Math['abs'](_0x67f8fb)>Math['abs'](_0x5536ad))this[_0x2095bd(0x5ff)](_0x67f8fb>0x0?0x4:0x6),!this[_0x2095bd(0x5fb)]()&&_0x5536ad!==0x0&&this[_0x2095bd(0x5ff)](_0x5536ad>0x0?0x8:0x2);else _0x5536ad!==0x0&&(this['moveStraight'](_0x5536ad>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0x67f8fb!==0x0&&this[_0x2095bd(0x5ff)](_0x67f8fb>0x0?0x4:0x6));},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x485)]=function(){const _0x2176b7=_0x165665;this[_0x2176b7(0x304)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x165665(0x49c)]['attachPictureSettings']=function(){const _0x2b1b38=_0x165665;if(this[_0x2b1b38(0x304)]===undefined)this[_0x2b1b38(0x485)]();return this[_0x2b1b38(0x304)];},Game_CharacterBase[_0x165665(0x49c)]['attachPictureFilename']=function(){const _0x41265c=_0x165665;return this[_0x41265c(0x3ab)]()['filename']??'';},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x2ef)]=function(){const _0x45fd1f=_0x165665;return this[_0x45fd1f(0x3ab)]()[_0x45fd1f(0x469)]??0x0;},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x3b5)]=function(){const _0x357d99=_0x165665;return this[_0x357d99(0x3ab)]()['maxSize']??0x0;},Game_CharacterBase[_0x165665(0x49c)]['attachPictureOffsetX']=function(){const _0x1d000f=_0x165665;return this[_0x1d000f(0x3ab)]()[_0x1d000f(0x5b1)]??0x0;},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x5d4)]=function(){const _0x184fb6=_0x165665;return this[_0x184fb6(0x3ab)]()['offsetY']??0x0;},Game_CharacterBase[_0x165665(0x49c)][_0x165665(0x4b5)]=function(){const _0x57e5cf=_0x165665;return this[_0x57e5cf(0x3ab)]()['scale']??0x1;},VisuMZ[_0x165665(0x54c)][_0x165665(0x604)]=Game_Interpreter['prototype'][_0x165665(0x61d)],Game_Interpreter[_0x165665(0x49c)][_0x165665(0x61d)]=function(){const _0x258a9f=_0x165665;if(this[_0x258a9f(0x656)]===_0x258a9f(0x55f)){if(window[this[_0x258a9f(0x4bf)]])_0x258a9f(0x422)!==_0x258a9f(0x422)?(this[_0x258a9f(0x343)]['x']=0.5,this[_0x258a9f(0x343)]['y']=0x1):(this[_0x258a9f(0x656)]='',this[_0x258a9f(0x536)]());else return!![];}else return'qfyyQ'!=='qfyyQ'?_0x3332cf['DashModifier']:VisuMZ[_0x258a9f(0x54c)][_0x258a9f(0x604)][_0x258a9f(0x4ca)](this);},VisuMZ['EventsMoveCore'][_0x165665(0x493)]=Game_Interpreter[_0x165665(0x49c)]['executeCommand'],Game_Interpreter[_0x165665(0x49c)][_0x165665(0x1db)]=function(){const _0x4d9e95=_0x165665,_0x11ce06=$gameMap&&this['_eventId']?$gameMap[_0x4d9e95(0x1c5)](this[_0x4d9e95(0x676)]):null;$gameTemp[_0x4d9e95(0x5ba)](_0x11ce06);const _0x2b1620=VisuMZ[_0x4d9e95(0x54c)][_0x4d9e95(0x493)][_0x4d9e95(0x4ca)](this);return $gameTemp[_0x4d9e95(0x6b1)](),_0x2b1620;},VisuMZ[_0x165665(0x54c)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype']['command357'],Game_Interpreter[_0x165665(0x49c)][_0x165665(0x391)]=function(_0x55494e){const _0x5f3d3e=_0x165665;return $gameTemp[_0x5f3d3e(0x34f)](this),VisuMZ[_0x5f3d3e(0x54c)]['Game_Interpreter_PluginCommand']['call'](this,_0x55494e);},Game_Interpreter[_0x165665(0x49c)][_0x165665(0x61e)]=function(_0x13c13c){const _0x5b8e64=_0x165665;this[_0x5b8e64(0x4d0)]=_0x13c13c;const _0x293938=_0x5b8e64(0x2d2)[_0x5b8e64(0x3ef)](_0x13c13c[_0x5b8e64(0x49b)]['padZero'](0x3));this[_0x5b8e64(0x4bf)]='$callEventMap'+Graphics['frameCount']+'_'+this['eventId'](),DataManager[_0x5b8e64(0x312)](this['_callEventMap'],_0x293938),window[this[_0x5b8e64(0x4bf)]]?this[_0x5b8e64(0x536)]():this['setWaitMode']('CallEvent');},Game_Interpreter['prototype'][_0x165665(0x536)]=function(){const _0x4a4548=_0x165665,_0x5ee743=this[_0x4a4548(0x4d0)],_0x57979d=window[this[_0x4a4548(0x4bf)]],_0x317c54=_0x57979d[_0x4a4548(0x2f8)][_0x5ee743[_0x4a4548(0x694)]];if(_0x317c54&&_0x317c54['pages'][_0x5ee743[_0x4a4548(0x1ba)]-0x1]){const _0x407f75=_0x317c54[_0x4a4548(0x437)][_0x5ee743['pageId']-0x1][_0x4a4548(0x3e0)];this[_0x4a4548(0x43f)](_0x407f75,this[_0x4a4548(0x694)]());}window[this[_0x4a4548(0x4bf)]]=undefined,this['_callEventMap']=undefined,this[_0x4a4548(0x4d0)]=undefined;};function Game_CPCInterpreter(){const _0x1bb0c4=_0x165665;this[_0x1bb0c4(0x624)][_0x1bb0c4(0x296)](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x165665(0x5f6)](Game_Interpreter[_0x165665(0x49c)]),Game_CPCInterpreter['prototype'][_0x165665(0x23d)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x165665(0x49c)][_0x165665(0x668)]=function(){const _0x41d281=_0x165665;Game_Interpreter[_0x41d281(0x49c)][_0x41d281(0x668)]['call'](this),this['_cpc']=![];},Game_CPCInterpreter[_0x165665(0x49c)][_0x165665(0x462)]=function(){const _0x47a5a6=_0x165665;while(this['isRunning']()){if(_0x47a5a6(0x5bd)===_0x47a5a6(0x5bd))this[_0x47a5a6(0x1db)]();else return _0x53a886[_0x47a5a6(0x1c5)](this[_0x47a5a6(0x676)])&&_0x239d4c[_0x47a5a6(0x54c)][_0x47a5a6(0x3f2)][_0x47a5a6(0x324)](_0x350ae5[_0x47a5a6(0x365)],this['_eventId']);}},Game_CPCInterpreter[_0x165665(0x49c)][_0x165665(0x574)]=function(_0x4698e4){const _0x44110d=_0x165665;return Game_Interpreter[_0x44110d(0x49c)][_0x44110d(0x574)][_0x44110d(0x4ca)](this,_0x4698e4),this[_0x44110d(0x34e)][_0x44110d(0x456)](_0x9b8371=>_0x9b8371[_0x44110d(0x684)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x44110d(0x5a4)]=!![]),!![];},VisuMZ[_0x165665(0x54c)][_0x165665(0x2d0)]=Scene_Map[_0x165665(0x49c)][_0x165665(0x39e)],Scene_Map[_0x165665(0x49c)][_0x165665(0x39e)]=function(){const _0x20c38f=_0x165665;VisuMZ[_0x20c38f(0x54c)][_0x20c38f(0x2d0)][_0x20c38f(0x4ca)](this),this[_0x20c38f(0x699)][_0x20c38f(0x514)]();},VisuMZ[_0x165665(0x54c)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x165665(0x49c)][_0x165665(0x49f)],Scene_Load[_0x165665(0x49c)][_0x165665(0x49f)]=function(){const _0x2da116=_0x165665;if($gameMap)$gameMap[_0x2da116(0x429)]();VisuMZ['EventsMoveCore'][_0x2da116(0x610)][_0x2da116(0x4ca)](this);},VisuMZ[_0x165665(0x54c)]['Sprite_Character_initMembers']=Sprite_Character[_0x165665(0x49c)][_0x165665(0x346)],Sprite_Character['prototype'][_0x165665(0x346)]=function(){const _0x34fcc1=_0x165665;VisuMZ[_0x34fcc1(0x54c)]['Sprite_Character_initMembers'][_0x34fcc1(0x4ca)](this),this[_0x34fcc1(0x46c)](),this[_0x34fcc1(0x4d4)](),this[_0x34fcc1(0x2ca)]();},Sprite_Character[_0x165665(0x49c)][_0x165665(0x46c)]=function(){const _0x5a5104=_0x165665;this[_0x5a5104(0x31e)]=0xff;},Sprite_Character[_0x165665(0x49c)][_0x165665(0x4d4)]=function(){const _0x16fd6a=_0x165665;this[_0x16fd6a(0x498)]=new Sprite(),this['_attachPictureSprite'][_0x16fd6a(0x343)]['x']=0.5,this['_attachPictureSprite'][_0x16fd6a(0x343)]['y']=0x1,this[_0x16fd6a(0x595)](this[_0x16fd6a(0x498)]),this[_0x16fd6a(0x273)]();},Sprite_Character[_0x165665(0x49c)][_0x165665(0x2ca)]=function(){const _0xe9cf38=_0x165665;this[_0xe9cf38(0x658)]=new Sprite(),this[_0xe9cf38(0x658)][_0xe9cf38(0x298)]=ImageManager[_0xe9cf38(0x592)](_0xe9cf38(0x205)),this[_0xe9cf38(0x658)][_0xe9cf38(0x298)][_0xe9cf38(0x60f)]=![],this[_0xe9cf38(0x658)][_0xe9cf38(0x258)](0x0,0x0,0x0,0x0),this[_0xe9cf38(0x658)][_0xe9cf38(0x343)]['x']=0.5,this['_eventIconSprite'][_0xe9cf38(0x343)]['y']=0x1,this[_0xe9cf38(0x595)](this[_0xe9cf38(0x658)]);},Sprite_Character[_0x165665(0x49c)][_0x165665(0x213)]=function(){const _0xae8c6d=_0x165665;return this['_characterName']&&this[_0xae8c6d(0x64c)][_0xae8c6d(0x684)](/\[VS8\]/i);},Sprite_Character[_0x165665(0x49c)][_0x165665(0x646)]=function(){const _0x1c9e5b=_0x165665;return this[_0x1c9e5b(0x213)]()&&VisuMZ[_0x1c9e5b(0x54c)][_0x1c9e5b(0x256)][_0x1c9e5b(0x2a2)]['AutoBuffer'];},VisuMZ[_0x165665(0x54c)][_0x165665(0x5c2)]=Sprite_Character[_0x165665(0x49c)][_0x165665(0x3be)],Sprite_Character[_0x165665(0x49c)][_0x165665(0x3be)]=function(){const _0x475c9c=_0x165665;VisuMZ[_0x475c9c(0x54c)][_0x475c9c(0x5c2)]['call'](this),this[_0x475c9c(0x24d)]();},Sprite_Character[_0x165665(0x49c)][_0x165665(0x558)]=function(){const _0x463c3f=_0x165665;Sprite['prototype'][_0x463c3f(0x558)][_0x463c3f(0x4ca)](this),this[_0x463c3f(0x342)]()&&(this[_0x463c3f(0x535)]=![]);},Sprite_Character['prototype'][_0x165665(0x342)]=function(){const _0x11f579=_0x165665;if(this[_0x11f579(0x219)]()>0x0)return![];if(this[_0x11f579(0x3fc)]){if('vyCUS'!==_0x11f579(0x420)){const _0x3ac440=_0x11f579(0x3fa)[_0x11f579(0x3ef)](_0xbff0c3[_0x11f579(0x3dc)](0x0)[_0x11f579(0x4b7)]()+_0x280c99[_0x11f579(0x23f)](0x1));if(_0x3cf985[_0x3ac440])return _0x2ea5c4[_0x3ac440][_0x11f579(0x347)](_0x1b09f4);}else{if(this[_0x11f579(0x3fc)][_0x11f579(0x3f6)]()!=='')return![];}}return this[_0x11f579(0x53f)]()||this[_0x11f579(0x3fc)]&&this['_character']['isTransparent']();},Sprite_Character[_0x165665(0x49c)]['updateEventsAndMovementCore']=function(){const _0x3b1738=_0x165665;this[_0x3b1738(0x689)](),this['updateShadow'](),this[_0x3b1738(0x549)](),this[_0x3b1738(0x2ab)](),this[_0x3b1738(0x39b)](),this['updateAttachPictureSprite']();},VisuMZ[_0x165665(0x54c)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0x165665(0x49c)][_0x165665(0x47b)],Sprite_Character['prototype']['setTileBitmap']=function(){const _0x241511=_0x165665;VisuMZ[_0x241511(0x54c)]['Sprite_Character_setTileBitmap']['call'](this),this[_0x241511(0x298)][_0x241511(0x6be)](this[_0x241511(0x3d5)][_0x241511(0x38e)](this));},VisuMZ[_0x165665(0x54c)][_0x165665(0x3b2)]=Sprite_Character[_0x165665(0x49c)][_0x165665(0x6c2)],Sprite_Character[_0x165665(0x49c)][_0x165665(0x6c2)]=function(){const _0x49d69f=_0x165665;VisuMZ['EventsMoveCore'][_0x49d69f(0x3b2)][_0x49d69f(0x4ca)](this),this['bitmap'][_0x49d69f(0x6be)](this[_0x49d69f(0x3d5)]['bind'](this));},Sprite_Character['prototype']['updateBitmapSmoothing']=function(){const _0x34b5eb=_0x165665;if(!this[_0x34b5eb(0x298)])return;this['bitmap'][_0x34b5eb(0x60f)]=!!VisuMZ[_0x34b5eb(0x54c)][_0x34b5eb(0x256)][_0x34b5eb(0x2fc)][_0x34b5eb(0x37b)];},VisuMZ[_0x165665(0x54c)]['Sprite_Character_characterPatternY']=Sprite_Character['prototype'][_0x165665(0x1f2)],Sprite_Character[_0x165665(0x49c)][_0x165665(0x1f2)]=function(){const _0x26135e=_0x165665;return this[_0x26135e(0x213)]()?_0x26135e(0x555)!=='xmTha'?this[_0x26135e(0x54a)]():_0xc6f2ac>0x0?0x8:0x2:'dNqvm'!==_0x26135e(0x2ac)?this[_0x26135e(0x460)]:this[_0x26135e(0x336)]();},Sprite_Character[_0x165665(0x49c)]['characterPatternYVS8']=function(){const _0x4fe987=_0x165665,_0xf745c8=this[_0x4fe987(0x3fc)]['direction']();let _0x23e516=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x4fe987(0x3fc)][_0x4fe987(0x34d)]&&(_0x23e516=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x23e516[_0xf745c8]-0x2)/0x2;},Sprite_Character[_0x165665(0x49c)][_0x165665(0x336)]=function(){const _0x5b6192=_0x165665;let _0x27cd4d=this[_0x5b6192(0x3fc)][_0x5b6192(0x5cc)]();if(this[_0x5b6192(0x3fc)][_0x5b6192(0x34d)]){if(_0x27cd4d===0x4)'vcxHR'!=='vcxHR'?_0x46b753[_0x5b6192(0x54c)]['Game_Switches_setValue']['call'](this,_0x305355,_0xfe3764):_0x27cd4d=0x6;else{if(_0x27cd4d===0x6){if(_0x5b6192(0x528)!==_0x5b6192(0x528)){const _0x373817=_0x3ce1f8['parameters'][0x0];if(_0x373817[_0x5b6192(0x684)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x339007=!![];else _0x373817[_0x5b6192(0x684)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x5733f8=![]);}else _0x27cd4d=0x4;}}}return(_0x27cd4d-0x2)/0x2;},Sprite_Character[_0x165665(0x49c)][_0x165665(0x689)]=function(){const _0xbb83e5=_0x165665;if(!VisuMZ['EventsMoveCore'][_0xbb83e5(0x256)][_0xbb83e5(0x2fc)][_0xbb83e5(0x287)])return;this['rotation']=0x0;if(this['isAllowCharacterTilt']()){if(_0xbb83e5(0x1be)!=='LYPAA'){const _0x4360f3=VisuMZ[_0xbb83e5(0x54c)][_0xbb83e5(0x256)][_0xbb83e5(0x2fc)],_0x3a1316=this[_0xbb83e5(0x3fc)][_0xbb83e5(0x5cc)]();let _0x5f434a=0x0;if([0x1,0x4,0x7][_0xbb83e5(0x347)](_0x3a1316))_0x5f434a=_0x4360f3[_0xbb83e5(0x1e4)];if([0x3,0x6,0x9]['includes'](_0x3a1316))_0x5f434a=_0x4360f3[_0xbb83e5(0x2b1)];[0x2,0x8]['includes'](_0x3a1316)&&(_0xbb83e5(0x20a)!==_0xbb83e5(0x20a)?_0x34cf66=this[_0xbb83e5(0x404)](_0xe59ed4,_0x3b1bc1):_0x5f434a=[-_0x4360f3['TiltVert'],0x0,_0x4360f3['TiltVert']][this[_0xbb83e5(0x3fc)][_0xbb83e5(0x27d)]()]);if(this[_0xbb83e5(0x466)])_0x5f434a*=-0x1;this[_0xbb83e5(0x40f)]=_0x5f434a;}else{if(!_0x24a885[_0xbb83e5(0x54c)][_0xbb83e5(0x256)][_0xbb83e5(0x2fc)][_0xbb83e5(0x68f)])return;for(const _0xe7b300 of this[_0xbb83e5(0x3e7)]){this[_0xbb83e5(0x340)](_0xe7b300);}}}},Sprite_Character[_0x165665(0x49c)]['isAllowCharacterTilt']=function(){const _0x3510ba=_0x165665;if(this[_0x3510ba(0x354)])return![];return this['_character'][_0x3510ba(0x695)]()&&!this['_character'][_0x3510ba(0x284)]()&&!this[_0x3510ba(0x3fc)]['isPosing']()&&this[_0x3510ba(0x219)]()===0x0;},Sprite_Character[_0x165665(0x49c)]['updateShadow']=function(){const _0x12d364=_0x165665;if(!this[_0x12d364(0x52e)])return;this[_0x12d364(0x52e)]['x']=this[_0x12d364(0x3fc)][_0x12d364(0x4fc)](),this[_0x12d364(0x52e)]['y']=this[_0x12d364(0x3fc)][_0x12d364(0x487)](),this[_0x12d364(0x52e)][_0x12d364(0x5ca)]=this['opacity'],this[_0x12d364(0x52e)]['visible']=this[_0x12d364(0x3fc)][_0x12d364(0x4e0)](),this[_0x12d364(0x52e)][_0x12d364(0x271)]=this['_hidden'],!this[_0x12d364(0x3fc)][_0x12d364(0x645)]()?_0x12d364(0x3cc)==='tjWjv'?this['_stepPattern']=_0x51d580(_0x593c81['$1'])[_0x12d364(0x4b7)]()[_0x12d364(0x43e)]():(this['_shadowSprite'][_0x12d364(0x49a)]['x']=Math[_0x12d364(0x442)](0x1,this[_0x12d364(0x52e)]['scale']['x']+0.1),this['_shadowSprite'][_0x12d364(0x49a)]['y']=Math['min'](0x1,this['_shadowSprite'][_0x12d364(0x49a)]['y']+0.1)):(this[_0x12d364(0x52e)][_0x12d364(0x49a)]['x']=Math[_0x12d364(0x1d2)](0x0,this[_0x12d364(0x52e)]['scale']['x']-0.1),this[_0x12d364(0x52e)][_0x12d364(0x49a)]['y']=Math['max'](0x0,this['_shadowSprite'][_0x12d364(0x49a)]['y']-0.1));},Sprite_Character[_0x165665(0x49c)][_0x165665(0x549)]=function(){const _0x329989=_0x165665;if(!this['_eventIconSprite'])return;const _0x3e426e=this[_0x329989(0x658)],_0x4f5219=this[_0x329989(0x219)]();if(_0x4f5219<=0x0)return _0x3e426e['setFrame'](0x0,0x0,0x0,0x0);else{const _0x58f0f3=ImageManager[_0x329989(0x344)],_0x1f4e0a=ImageManager['iconHeight'],_0x3107ce=_0x4f5219%0x10*_0x58f0f3,_0x1c649f=Math[_0x329989(0x277)](_0x4f5219/0x10)*_0x1f4e0a;_0x3e426e['setFrame'](_0x3107ce,_0x1c649f,_0x58f0f3,_0x1f4e0a),this[_0x329989(0x535)]=!![];}const _0x123110=this[_0x329989(0x3fc)][_0x329989(0x631)]();if(this[_0x329989(0x646)]())this[_0x329989(0x1c6)](_0x3e426e);else{if(_0x329989(0x350)!==_0x329989(0x350)){if(_0x3a1464===0x4&&_0xde5749===0x2)this[_0x329989(0x4ab)](0x1);if(_0x3f47a2===0x6&&_0x1de1fe===0x2)this[_0x329989(0x4ab)](0x3);if(_0x5a1953===0x4&&_0x130a10===0x8)this[_0x329989(0x4ab)](0x7);if(_0x30268f===0x6&&_0xa73769===0x8)this[_0x329989(0x4ab)](0x9);}else _0x3e426e['x']=_0x123110?_0x123110[_0x329989(0x579)]:0x0,_0x3e426e['y']=_0x123110?-this['height']+_0x123110[_0x329989(0x61c)]:0x0;}_0x3e426e[_0x329989(0x469)]=_0x123110?_0x123110['blendMode']:0x0,this[_0x329989(0x37a)](_0x3e426e),this[_0x329989(0x595)](_0x3e426e),_0x3e426e[_0x329989(0x40f)]=-this[_0x329989(0x40f)];},Sprite_Character[_0x165665(0x49c)][_0x165665(0x2ab)]=function(){const _0x5b55b1=_0x165665;if(!this['_character'])return;if(this[_0x5b55b1(0x3fc)][_0x5b55b1(0x2dd)]===undefined)return;if(this[_0x5b55b1(0x3fc)][_0x5b55b1(0x2dd)]===![])return;this['z']=this[_0x5b55b1(0x3fc)][_0x5b55b1(0x2dd)];if(this['z']<0x0){if(_0x5b55b1(0x531)!==_0x5b55b1(0x531)){_0x26f746[_0x5b55b1(0x54c)][_0x5b55b1(0x597)][_0x5b55b1(0x4ca)](this),this[_0x5b55b1(0x599)](),this[_0x5b55b1(0x6c9)]();if(_0x2b6196[_0x5b55b1(0x54c)][_0x5b55b1(0x3f2)])_0x5f2029[_0x5b55b1(0x54c)][_0x5b55b1(0x3f2)]['initialize']();}else this[_0x5b55b1(0x52e)]['z']=this['z']-0x1;}else'erihW'!==_0x5b55b1(0x6a9)?this[_0x5b55b1(0x52e)]['z']=0x0:this['_advancedSwitchVariable']=!![];},Sprite_Character[_0x165665(0x49c)]['updateEventMirrorSprite']=function(){const _0x402ffa=_0x165665;if(!this[_0x402ffa(0x3fc)])return;let _0x4c8c66=!!this[_0x402ffa(0x3fc)]['_mirrorSprite'];this[_0x402ffa(0x49a)]['x']=Math[_0x402ffa(0x5d3)](this[_0x402ffa(0x49a)]['x'])*(_0x4c8c66?-0x1:0x1);},Sprite_Character[_0x165665(0x49c)][_0x165665(0x1c6)]=function(_0x2ad3a2){const _0x2a9cc5=_0x165665;_0x2ad3a2['x']=0x0,_0x2ad3a2['y']=-this[_0x2a9cc5(0x4bb)]+this[_0x2a9cc5(0x4bb)]*0x2/0x5,this[_0x2a9cc5(0x3fc)][_0x2a9cc5(0x27d)]()!==0x1&&(_0x2a9cc5(0x3f7)!=='IpSMD'?_0x2ad3a2['y']+=0x1:this['_DisablePlayerControl']=_0x4f3027);},Sprite_Character['prototype'][_0x165665(0x219)]=function(){const _0x3431f8=_0x165665;if(!this[_0x3431f8(0x3fc)])return 0x0;if(this[_0x3431f8(0x3fc)]['_erased'])return 0x0;const _0x53df85=this[_0x3431f8(0x3fc)][_0x3431f8(0x631)]();return _0x53df85?_0x53df85['iconIndex']||0x0:0x0;},Sprite_Character['prototype']['updateAttachPictureSprite']=function(){const _0x42ddc9=_0x165665;if(!this[_0x42ddc9(0x498)])return;if(!this['_character'])return;this[_0x42ddc9(0x54e)](),this[_0x42ddc9(0x28c)]();},Sprite_Character['prototype'][_0x165665(0x54e)]=function(){const _0x14a02f=_0x165665;if(!this[_0x14a02f(0x29a)]())return;const _0x5f7d88=this['_character'][_0x14a02f(0x3ab)]();this[_0x14a02f(0x427)]=_0x5f7d88[_0x14a02f(0x375)],this[_0x14a02f(0x2f7)]=_0x5f7d88[_0x14a02f(0x24a)],this['_lastAttachPictureScale']=_0x5f7d88[_0x14a02f(0x49a)];if(_0x5f7d88[_0x14a02f(0x375)]!==''){const _0x3d46a7=ImageManager[_0x14a02f(0x372)](_0x5f7d88['filename']);_0x3d46a7[_0x14a02f(0x6be)](this[_0x14a02f(0x2da)]['bind'](this,_0x3d46a7));}else this[_0x14a02f(0x498)]['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character[_0x165665(0x49c)][_0x165665(0x28c)]=function(){const _0x228c8c=_0x165665,_0x172035=this['_attachPictureSprite'];_0x172035['x']=this[_0x228c8c(0x3fc)][_0x228c8c(0x320)](),_0x172035['y']=this['_character'][_0x228c8c(0x5d4)](),_0x172035['blendMode']=this[_0x228c8c(0x3fc)][_0x228c8c(0x2ef)]();},Sprite_Character[_0x165665(0x49c)][_0x165665(0x29a)]=function(){const _0x2279a2=_0x165665,_0x38a34c=this[_0x2279a2(0x3fc)][_0x2279a2(0x3ab)]();if(_0x38a34c){if(_0x2279a2(0x5e7)!==_0x2279a2(0x5e7))this[_0x2279a2(0x641)]=0x0,this[_0x2279a2(0x291)]=![];else{if(this[_0x2279a2(0x427)]!==_0x38a34c[_0x2279a2(0x375)])return!![];if(this[_0x2279a2(0x2f7)]!==_0x38a34c[_0x2279a2(0x24a)])return!![];if(this[_0x2279a2(0x556)]!==_0x38a34c[_0x2279a2(0x49a)])return!![];}}return![];},Sprite_Character[_0x165665(0x49c)][_0x165665(0x2da)]=function(_0x4b604e){const _0x3a1cf4=_0x165665,_0xcb9375=this[_0x3a1cf4(0x498)];_0xcb9375[_0x3a1cf4(0x298)]=_0x4b604e;const _0x19e8d9=this['_character'][_0x3a1cf4(0x3ab)](),_0x107377=_0x19e8d9[_0x3a1cf4(0x24a)],_0x482e58=_0x19e8d9[_0x3a1cf4(0x49a)];let _0x44cc17=0x1;if(_0x107377>0x0){let _0x2a24e5=this[_0x3a1cf4(0x6b5)]()||0x1,_0x568002=this[_0x3a1cf4(0x617)]()||0x1;const _0x232786=Math['max'](0x1,_0x2a24e5,_0x568002);_0x44cc17=_0x107377/_0x232786;}_0x44cc17*=_0x482e58,_0x44cc17!==0x1&&(_0x3a1cf4(0x502)===_0x3a1cf4(0x5ee)?this[_0x3a1cf4(0x5ca)]=0x0:this[_0x3a1cf4(0x498)][_0x3a1cf4(0x298)]['smooth']=!![]),_0xcb9375['scale']['x']=_0x44cc17,_0xcb9375[_0x3a1cf4(0x49a)]['y']=_0x44cc17,this[_0x3a1cf4(0x535)]=!![],this[_0x3a1cf4(0x28c)]();},Sprite_Character[_0x165665(0x49c)]['getAttachPictureBitmapWidth']=function(){const _0x452dde=_0x165665,_0x3e518b=this[_0x452dde(0x498)];if(!_0x3e518b)return 0x0;return _0x3e518b[_0x452dde(0x298)][_0x452dde(0x5e8)];},Sprite_Character[_0x165665(0x49c)][_0x165665(0x617)]=function(){const _0x4c4245=_0x165665,_0x3a4f26=this[_0x4c4245(0x498)];if(!_0x3a4f26)return 0x0;return _0x3a4f26[_0x4c4245(0x298)][_0x4c4245(0x4bb)];},VisuMZ[_0x165665(0x54c)][_0x165665(0x43b)]=Sprite_Balloon[_0x165665(0x49c)][_0x165665(0x33d)],Sprite_Balloon[_0x165665(0x49c)][_0x165665(0x33d)]=function(_0x56f9d7,_0x5a53ce){const _0x8c41ba=_0x165665;VisuMZ[_0x8c41ba(0x54c)][_0x8c41ba(0x43b)]['call'](this,_0x56f9d7,_0x5a53ce),VisuMZ[_0x8c41ba(0x54c)]['Settings'][_0x8c41ba(0x2a2)][_0x8c41ba(0x43c)]&&this['_target'][_0x8c41ba(0x3fc)][_0x8c41ba(0x4ba)](_0x5a53ce,this[_0x8c41ba(0x561)]);},VisuMZ[_0x165665(0x54c)][_0x165665(0x3c2)]=Sprite_Balloon[_0x165665(0x49c)][_0x165665(0x206)],Sprite_Balloon[_0x165665(0x49c)]['updatePosition']=function(){const _0x2aaa29=_0x165665;VisuMZ['EventsMoveCore'][_0x2aaa29(0x3c2)][_0x2aaa29(0x4ca)](this),this[_0x2aaa29(0x59b)]();},Sprite_Balloon['prototype'][_0x165665(0x59b)]=function(){const _0x43140e=_0x165665;if(this[_0x43140e(0x61b)]['_character'][_0x43140e(0x213)]()){if(_0x43140e(0x5c5)===_0x43140e(0x2ed)){const _0x5c9b00=this[_0x43140e(0x50e)](_0x38f3ef,_0x573054,![]);if(_0x5c9b00)this[_0x43140e(0x4ab)](_0x5c9b00);}else this['x']+=VisuMZ[_0x43140e(0x54c)][_0x43140e(0x256)][_0x43140e(0x2a2)][_0x43140e(0x5f9)],this['y']+=VisuMZ[_0x43140e(0x54c)][_0x43140e(0x256)][_0x43140e(0x2a2)][_0x43140e(0x463)];}},Sprite_Timer['prototype'][_0x165665(0x283)]=function(){const _0x3a4dc3=_0x165665;this['bitmap']=new Bitmap(Math[_0x3a4dc3(0x3a8)](Graphics[_0x3a4dc3(0x274)]/0x2),0x30),this['bitmap'][_0x3a4dc3(0x68e)]=this['fontFace'](),this['bitmap'][_0x3a4dc3(0x50a)]=this[_0x3a4dc3(0x50a)](),this[_0x3a4dc3(0x298)]['outlineColor']=ColorManager['outlineColor']();},Sprite_Timer[_0x165665(0x49c)][_0x165665(0x36c)]=function(){const _0x4b9fad=_0x165665,_0x598d11=Math[_0x4b9fad(0x277)](this[_0x4b9fad(0x697)]/0x3c/0x3c),_0x267068=Math[_0x4b9fad(0x277)](this[_0x4b9fad(0x697)]/0x3c)%0x3c,_0x3bb25b=this[_0x4b9fad(0x697)]%0x3c;let _0x540776=_0x267068[_0x4b9fad(0x56b)](0x2)+':'+_0x3bb25b['padZero'](0x2);if(_0x598d11>0x0)_0x540776=_0x4b9fad(0x4cf)[_0x4b9fad(0x3ef)](_0x598d11,_0x540776);return _0x540776;};function Sprite_EventLabel(){const _0x392a9e=_0x165665;this[_0x392a9e(0x624)](...arguments);}Sprite_EventLabel[_0x165665(0x49c)]=Object[_0x165665(0x5f6)](Sprite[_0x165665(0x49c)]),Sprite_EventLabel['prototype'][_0x165665(0x23d)]=Sprite_EventLabel,Sprite_EventLabel['prototype']['initialize']=function(_0x529a3e){const _0x4bcc9a=_0x165665;this[_0x4bcc9a(0x21e)]=_0x529a3e,Sprite['prototype'][_0x4bcc9a(0x624)]['call'](this),this[_0x4bcc9a(0x346)](),this[_0x4bcc9a(0x359)]();},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x346)]=function(){const _0x3f406e=_0x165665;this['anchor']['x']=0.5,this[_0x3f406e(0x343)]['y']=0x1;},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x359)]=function(){const _0x530a0c=_0x165665,_0x227af1=new Rectangle(0x0,0x0,0x1,0x1);this[_0x530a0c(0x2ff)]=new Window_Base(_0x227af1),this['_proxyWindow']['padding']=0x0,this['opacity']=this[_0x530a0c(0x3b9)]()?0xff:0x0;},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x3be)]=function(){const _0x59e60d=_0x165665;Sprite[_0x59e60d(0x49c)][_0x59e60d(0x3be)][_0x59e60d(0x4ca)](this),this[_0x59e60d(0x633)](),this['updateScale'](),this[_0x59e60d(0x206)](),this[_0x59e60d(0x497)]();},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x633)]=function(){const _0x331967=_0x165665;if(this[_0x331967(0x21e)]['labelWindowText']()!==this['_text']){if('BFRjb'!==_0x331967(0x4c6)){_0x38a05b+=this[_0x331967(0x3f5)],this[_0x331967(0x3f0)](_0x39c4f6[_0x331967(0x457)](0x0,0xff));if(this[_0x331967(0x3f5)]<0xff)this[_0x331967(0x3a3)]--;}else this[_0x331967(0x432)]=this[_0x331967(0x21e)]['labelWindowText'](),this[_0x331967(0x390)]();}},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x390)]=function(){const _0x44ca55=_0x165665;if(!this[_0x44ca55(0x2ff)])return;this['resizeWindow'](),this['drawText']();},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x22e)]=function(){const _0x37ae5a=_0x165665,_0x36c875=this['_proxyWindow'][_0x37ae5a(0x600)](this[_0x37ae5a(0x432)]),_0x3ac563=this[_0x37ae5a(0x2ff)]['itemPadding'](),_0x2e6aaa=_0x36c875['width']+_0x3ac563*0x2,_0x308776=_0x36c875[_0x37ae5a(0x4bb)];this[_0x37ae5a(0x2ff)][_0x37ae5a(0x39c)](0x0,0x0,_0x2e6aaa,_0x308776),this['_proxyWindow'][_0x37ae5a(0x1f3)](),this[_0x37ae5a(0x298)]=this[_0x37ae5a(0x2ff)][_0x37ae5a(0x698)];},Sprite_EventLabel[_0x165665(0x49c)]['drawText']=function(){const _0x58860d=_0x165665,_0x59e19c=this[_0x58860d(0x2ff)][_0x58860d(0x373)]();this[_0x58860d(0x2ff)][_0x58860d(0x3ea)](this[_0x58860d(0x432)],_0x59e19c,0x0);},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x5cb)]=function(){const _0x1b8ae7=_0x165665,_0x36f91f=VisuMZ[_0x1b8ae7(0x54c)][_0x1b8ae7(0x256)][_0x1b8ae7(0x1cd)][_0x1b8ae7(0x56d)],_0x5108d7=$gameSystem[_0x1b8ae7(0x1f5)]()||0x1;this[_0x1b8ae7(0x49a)]['x']=this['scale']['y']=_0x36f91f/_0x5108d7;},Sprite_EventLabel['prototype']['updatePosition']=function(){const _0x511bc0=_0x165665;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x511bc0(0x699)])return;const _0x5488c8=SceneManager[_0x511bc0(0x26d)]['_spriteset'][_0x511bc0(0x35d)](this[_0x511bc0(0x21e)]);if(!_0x5488c8)return;this['x']=this[_0x511bc0(0x21e)]['screenX'](),this['x']+=this['_event']['_labelWindow']['offsetX'],this['y']=this[_0x511bc0(0x21e)][_0x511bc0(0x37c)]()-_0x5488c8[_0x511bc0(0x4bb)],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this['_event'][_0x511bc0(0x4c4)]['offsetY'];},Sprite_EventLabel['prototype'][_0x165665(0x497)]=function(){const _0x5e09e9=_0x165665;if(this[_0x5e09e9(0x3b9)]())this[_0x5e09e9(0x5ca)]+=this['opacitySpeed']();else{if(SceneManager[_0x5e09e9(0x26d)][_0x5e09e9(0x583)]>0x0)this[_0x5e09e9(0x5ca)]=0x0;else{if('XGjSN'===_0x5e09e9(0x5d6))this[_0x5e09e9(0x5ca)]-=this[_0x5e09e9(0x4a6)]();else{const _0x29ebd1=_0x1273ad[_0x5e09e9(0x3f8)]('['+_0x4a1b3c['$1']['match'](/\d+/g)+']');this[_0x5e09e9(0x309)]=this[_0x5e09e9(0x309)]['concat'](_0x29ebd1),this[_0x5e09e9(0x309)][_0x5e09e9(0x678)](0x0);}}}},Sprite_EventLabel[_0x165665(0x49c)]['isLabelVisible']=function(){const _0x5cf6f4=_0x165665;if(!$gameSystem[_0x5cf6f4(0x4ae)]())return![];if(this[_0x5cf6f4(0x21e)]?.[_0x5cf6f4(0x294)])return![];if(this[_0x5cf6f4(0x21e)]&&this[_0x5cf6f4(0x21e)]['_pageIndex']<0x0)return![];if(SceneManager[_0x5cf6f4(0x26d)][_0x5cf6f4(0x583)]>0x0)return![];const _0x51b710=$gamePlayer['x'],_0x210fc3=$gamePlayer['y'],_0x2381df=this['_event']['x'],_0x4ce002=this['_event']['y'];if(this['_visiblePlayerX']===_0x51b710&&this[_0x5cf6f4(0x557)]===_0x210fc3&&this[_0x5cf6f4(0x5e6)]===_0x2381df&&this['_visibleEventY']===_0x4ce002){if('bKkJB'===_0x5cf6f4(0x565)){_0x3249cc[_0x5cf6f4(0x54c)]['Game_Player_checkEventTriggerThere'][_0x5cf6f4(0x4ca)](this,_0x24b87a);if(this[_0x5cf6f4(0x594)]()&&_0x37606d[_0x5cf6f4(0x347)](0x0)&&this[_0x5cf6f4(0x305)]()===_0x5cf6f4(0x4a3)){const _0x26879d=this[_0x5cf6f4(0x5cc)](),_0xbedd5e=_0x3bd6a5[_0x5cf6f4(0x50c)](this['x'],_0x26879d),_0x43d822=_0x3d8ca3[_0x5cf6f4(0x54d)](this['y'],_0x26879d);this[_0x5cf6f4(0x23b)](_0xbedd5e,_0x43d822);}}else return this['_cacheVisibility'];}this[_0x5cf6f4(0x5a2)]=$gamePlayer['x'],this[_0x5cf6f4(0x557)]=$gamePlayer['y'],this[_0x5cf6f4(0x5e6)]=this['_event']['x'],this[_0x5cf6f4(0x60d)]=this[_0x5cf6f4(0x21e)]['y'];if($gameMap[_0x5cf6f4(0x366)](_0x51b710,_0x210fc3,_0x2381df,_0x4ce002)>this[_0x5cf6f4(0x21e)][_0x5cf6f4(0x430)]())return this[_0x5cf6f4(0x1e2)]=![],![];return this[_0x5cf6f4(0x1e2)]=!![],!![];},Sprite_EventLabel[_0x165665(0x49c)][_0x165665(0x4a6)]=function(){const _0x446992=_0x165665;return VisuMZ[_0x446992(0x54c)][_0x446992(0x256)][_0x446992(0x1cd)][_0x446992(0x41c)];},VisuMZ[_0x165665(0x54c)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x165665(0x49c)][_0x165665(0x478)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x220735=_0x165665;VisuMZ['EventsMoveCore'][_0x220735(0x64e)]['call'](this),this[_0x220735(0x608)]();},VisuMZ[_0x165665(0x54c)][_0x165665(0x60c)]=Spriteset_Map[_0x165665(0x49c)][_0x165665(0x3f1)],Spriteset_Map[_0x165665(0x49c)][_0x165665(0x3f1)]=function(){const _0x158a02=_0x165665;VisuMZ[_0x158a02(0x54c)]['Spriteset_Map_createShadow'][_0x158a02(0x4ca)](this),this[_0x158a02(0x280)]();},Spriteset_Map[_0x165665(0x49c)]['createShadows']=function(){const _0x19ba4f=_0x165665;if(!VisuMZ[_0x19ba4f(0x54c)][_0x19ba4f(0x256)][_0x19ba4f(0x2fc)][_0x19ba4f(0x68f)])return;for(const _0x396881 of this['_characterSprites']){if('HDLmc'===_0x19ba4f(0x2ae))this[_0x19ba4f(0x340)](_0x396881);else{for(const _0x288722 of this[_0x19ba4f(0x5a7)]){if(_0x288722)return _0x288722;}return null;}}},Spriteset_Map[_0x165665(0x49c)][_0x165665(0x340)]=function(_0x38ca35){const _0x57bca4=_0x165665;_0x38ca35[_0x57bca4(0x52e)]=new Sprite(),_0x38ca35[_0x57bca4(0x52e)][_0x57bca4(0x5af)]=_0x38ca35[_0x57bca4(0x3fc)]['shadowFilename'](),_0x38ca35[_0x57bca4(0x52e)]['bitmap']=ImageManager[_0x57bca4(0x592)](_0x38ca35[_0x57bca4(0x52e)][_0x57bca4(0x5af)]),_0x38ca35['_shadowSprite'][_0x57bca4(0x343)]['x']=0.5,_0x38ca35['_shadowSprite'][_0x57bca4(0x343)]['y']=0x1,_0x38ca35[_0x57bca4(0x52e)]['z']=0x0,this['_tilemap'][_0x57bca4(0x595)](_0x38ca35[_0x57bca4(0x52e)]);},Spriteset_Map[_0x165665(0x49c)]['hideShadows']=function(){const _0x255734=_0x165665;if(!VisuMZ['EventsMoveCore'][_0x255734(0x256)][_0x255734(0x2fc)][_0x255734(0x68f)])return;for(const _0x2e230c of this['_characterSprites']){this[_0x255734(0x66d)][_0x255734(0x37a)](_0x2e230c[_0x255734(0x52e)]);}},Spriteset_Map[_0x165665(0x49c)]['createLabelWindows']=function(){const _0x19c228=_0x165665;this[_0x19c228(0x4fd)]=[];for(const _0x1b65fe of $gameMap[_0x19c228(0x2f8)]()){this['createLabelWindowForTarget'](_0x1b65fe);}},Spriteset_Map[_0x165665(0x49c)]['createLabelWindowForTarget']=function(_0x23601b){const _0x116d75=_0x165665;if(!this[_0x116d75(0x539)](_0x23601b))return;let _0x40c071;const _0x11753b=VisuMZ['EventsMoveCore']['Settings'][_0x116d75(0x1cd)]['SpriteBased']??!![];_0x40c071=_0x11753b?new Sprite_EventLabel(_0x23601b):new Window_EventLabel(_0x23601b),_0x40c071['z']=0x8,_0x40c071[_0x116d75(0x481)]=Sprite[_0x116d75(0x680)]++,this['_tilemap'][_0x116d75(0x595)](_0x40c071),this[_0x116d75(0x4fd)][_0x116d75(0x673)](_0x40c071);},Spriteset_Map[_0x165665(0x49c)][_0x165665(0x539)]=function(_0xe56fe1){const _0x253eb9=_0x165665,_0x31b4df=_0xe56fe1['event']();if(_0x31b4df['note'][_0x253eb9(0x684)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x31b4df[_0x253eb9(0x3c8)][_0x253eb9(0x684)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x460a7d of _0x31b4df[_0x253eb9(0x437)]){if(_0x253eb9(0x2af)!==_0x253eb9(0x254)){let _0x24e96d='';for(const _0x4b302c of _0x460a7d[_0x253eb9(0x3e0)]){[0x6c,0x198][_0x253eb9(0x347)](_0x4b302c[_0x253eb9(0x237)])&&(_0x24e96d+=_0x4b302c['parameters'][0x0]);}if(_0x24e96d[_0x253eb9(0x684)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x24e96d[_0x253eb9(0x684)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x253eb9(0x38a)!=='PHjEP')this[_0x253eb9(0x226)]=![];else return!![];}}else{let _0x2825f9=_0x31a88b[_0x253eb9(0x54c)][_0x253eb9(0x3d9)][_0x253eb9(0x4ca)](this);return _0x2825f9=this['adjustMoveSynchOpacityDelta'](_0x2825f9),_0x2825f9;}}return![];},Spriteset_Map[_0x165665(0x49c)][_0x165665(0x548)]=function(_0x17f2d7){const _0x39f506=_0x165665;this['_characterSprites']=this[_0x39f506(0x3e7)]||[];const _0x4d3118=new Sprite_Character(_0x17f2d7);this[_0x39f506(0x3e7)]['push'](_0x4d3118),this['_tilemap'][_0x39f506(0x595)](_0x4d3118),this[_0x39f506(0x340)](_0x4d3118),this[_0x39f506(0x464)](_0x17f2d7),_0x4d3118[_0x39f506(0x3be)]();},VisuMZ[_0x165665(0x54c)][_0x165665(0x276)]=Game_Message[_0x165665(0x49c)][_0x165665(0x3e1)],Game_Message[_0x165665(0x49c)][_0x165665(0x3e1)]=function(_0x1b77ef,_0xf07701){const _0x1eab9e=_0x165665;this['_selfTargetNumberInput']=$gameTemp[_0x1eab9e(0x2de)](),VisuMZ[_0x1eab9e(0x54c)]['Game_Message_setNumberInput'][_0x1eab9e(0x4ca)](this,_0x1b77ef,_0xf07701);},VisuMZ[_0x165665(0x54c)]['Window_NumberInput_start']=Window_NumberInput[_0x165665(0x49c)][_0x165665(0x416)],Window_NumberInput[_0x165665(0x49c)]['start']=function(){const _0x521dc5=_0x165665;$gameTemp[_0x521dc5(0x5ba)]($gameMessage[_0x521dc5(0x4df)]),VisuMZ['EventsMoveCore'][_0x521dc5(0x3f3)][_0x521dc5(0x4ca)](this),$gameTemp[_0x521dc5(0x6b1)]();},VisuMZ[_0x165665(0x54c)][_0x165665(0x69a)]=Window_NumberInput[_0x165665(0x49c)][_0x165665(0x5b2)],Window_NumberInput['prototype']['processOk']=function(){const _0x1d5b68=_0x165665;$gameTemp['registerSelfTarget']($gameMessage[_0x1d5b68(0x4df)]),VisuMZ[_0x1d5b68(0x54c)][_0x1d5b68(0x69a)]['call'](this),$gameTemp[_0x1d5b68(0x6b1)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ['EventsMoveCore'][_0x165665(0x1b8)]=Game_Message[_0x165665(0x49c)][_0x165665(0x554)],Game_Message[_0x165665(0x49c)][_0x165665(0x554)]=function(_0x50f0b1,_0x321d58){const _0x4b0c4b=_0x165665;this[_0x4b0c4b(0x4c5)]=$gameTemp[_0x4b0c4b(0x2de)](),VisuMZ[_0x4b0c4b(0x54c)][_0x4b0c4b(0x1b8)][_0x4b0c4b(0x4ca)](this,_0x50f0b1,_0x321d58);},VisuMZ['EventsMoveCore'][_0x165665(0x20c)]=Window_EventItem[_0x165665(0x49c)][_0x165665(0x639)],Window_EventItem[_0x165665(0x49c)][_0x165665(0x639)]=function(){const _0x1fd40c=_0x165665;$gameTemp['registerSelfTarget']($gameMessage[_0x1fd40c(0x4c5)]),VisuMZ[_0x1fd40c(0x54c)][_0x1fd40c(0x20c)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x1fd40c(0x4c5)]=undefined;},VisuMZ['EventsMoveCore'][_0x165665(0x4eb)]=Window_EventItem['prototype']['onCancel'],Window_EventItem[_0x165665(0x49c)]['onCancel']=function(){const _0x4b842a=_0x165665;$gameTemp[_0x4b842a(0x5ba)]($gameMessage[_0x4b842a(0x4c5)]),VisuMZ[_0x4b842a(0x54c)][_0x4b842a(0x4eb)][_0x4b842a(0x4ca)](this),$gameTemp[_0x4b842a(0x6b1)](),$gameMessage[_0x4b842a(0x4c5)]=undefined;},VisuMZ['EventsMoveCore'][_0x165665(0x59a)]=Window_Message[_0x165665(0x49c)][_0x165665(0x57f)],Window_Message[_0x165665(0x49c)]['startMessage']=function(){const _0x17873c=_0x165665;$gameMessage[_0x17873c(0x671)](),VisuMZ[_0x17873c(0x54c)][_0x17873c(0x59a)][_0x17873c(0x4ca)](this),$gameTemp[_0x17873c(0x6b1)]();},VisuMZ['EventsMoveCore'][_0x165665(0x208)]=Window_ScrollText[_0x165665(0x49c)]['startMessage'],Window_ScrollText[_0x165665(0x49c)][_0x165665(0x57f)]=function(){const _0x12542a=_0x165665;$gameMessage[_0x12542a(0x671)](),VisuMZ['EventsMoveCore'][_0x12542a(0x208)][_0x12542a(0x4ca)](this),$gameTemp[_0x12542a(0x6b1)]();};function Window_EventLabel(){const _0x308825=_0x165665;this[_0x308825(0x624)](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0x165665(0x49c)]),Window_EventLabel[_0x165665(0x49c)][_0x165665(0x23d)]=Window_EventLabel,Window_EventLabel[_0x165665(0x49c)]['initialize']=function(_0x28360c){const _0xc9f2fa=_0x165665;this[_0xc9f2fa(0x21e)]=_0x28360c;const _0x4ff5de=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this[_0xc9f2fa(0x3d2)](0x1));this['initMembers'](),Window_Base[_0xc9f2fa(0x49c)][_0xc9f2fa(0x624)][_0xc9f2fa(0x4ca)](this,_0x4ff5de),this[_0xc9f2fa(0x5a1)]=0x0,this['setBackgroundType'](0x2),this[_0xc9f2fa(0x432)]='';},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x346)]=function(){const _0x100eeb=_0x165665;this[_0x100eeb(0x406)]=![],this[_0x100eeb(0x55e)]=$gameScreen[_0x100eeb(0x3ad)](),this[_0x100eeb(0x5cd)]=this[_0x100eeb(0x21e)][_0x100eeb(0x5d1)](),this[_0x100eeb(0x505)]=this[_0x100eeb(0x21e)]['screenY'](),this[_0x100eeb(0x4a9)]=this[_0x100eeb(0x21e)][_0x100eeb(0x4c4)][_0x100eeb(0x5b1)],this[_0x100eeb(0x1eb)]=this[_0x100eeb(0x21e)][_0x100eeb(0x4c4)]['offsetY'],this['_eventPageIndex']=this['_event'][_0x100eeb(0x1c7)],this['_cacheVisibility']=this[_0x100eeb(0x3b9)](),this['_cacheSystemVisible']=$gameSystem[_0x100eeb(0x4ae)](),this[_0x100eeb(0x5a2)]=$gamePlayer['x'],this[_0x100eeb(0x557)]=$gamePlayer['y'],this[_0x100eeb(0x5e6)]=this[_0x100eeb(0x21e)]['x'],this[_0x100eeb(0x60d)]=this[_0x100eeb(0x21e)]['y'];},Window_EventLabel['prototype'][_0x165665(0x3be)]=function(){const _0x822b5d=_0x165665;Window_Base[_0x822b5d(0x49c)][_0x822b5d(0x3be)][_0x822b5d(0x4ca)](this);if(!this[_0x822b5d(0x26c)]())return;this['updateText'](),this[_0x822b5d(0x5cb)](),this[_0x822b5d(0x206)](),this['updateOpacity']();},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x26c)]=function(){const _0x96a5a4=_0x165665;if(!this[_0x96a5a4(0x21e)])return![];if(!this[_0x96a5a4(0x21e)]['_labelWindow'])return![];if(this[_0x96a5a4(0x647)]!==this['_event']['_pageIndex'])return!![];if(this[_0x96a5a4(0x21e)][_0x96a5a4(0x294)]&&!this['_eventErased'])return!![];if(this[_0x96a5a4(0x21e)][_0x96a5a4(0x4c4)][_0x96a5a4(0x46b)]==='')return![];if(this[_0x96a5a4(0x55e)]!==$gameScreen[_0x96a5a4(0x3ad)]())return!![];if(this[_0x96a5a4(0x5cd)]!==this[_0x96a5a4(0x21e)][_0x96a5a4(0x5d1)]())return!![];if(this[_0x96a5a4(0x505)]!==this[_0x96a5a4(0x21e)]['screenY']())return!![];if(this['_eventLabelOffsetX']!==this[_0x96a5a4(0x21e)][_0x96a5a4(0x4c4)][_0x96a5a4(0x5b1)])return!![];if(this[_0x96a5a4(0x1eb)]!==this[_0x96a5a4(0x21e)][_0x96a5a4(0x4c4)][_0x96a5a4(0x2b4)])return!![];if(this[_0x96a5a4(0x5a2)]!==$gamePlayer['x'])return!![];if(this[_0x96a5a4(0x557)]!==$gamePlayer['y'])return!![];if(this[_0x96a5a4(0x5e6)]!==this['_event']['x'])return!![];if(this[_0x96a5a4(0x60d)]!==this['_event']['y'])return!![];if(this[_0x96a5a4(0x25e)]!==$gameSystem['eventLabelsVisible']())return!![];if(this['_cacheVisibility']&&this[_0x96a5a4(0x5a1)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x96a5a4(0x5a1)]>0x0)return!![];if(SceneManager[_0x96a5a4(0x26d)][_0x96a5a4(0x583)]>0x0)return!![];return![];},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x633)]=function(){const _0x205090=_0x165665;if(this[_0x205090(0x21e)]['labelWindowText']()!==this[_0x205090(0x432)]){if('OrIhF'===_0x205090(0x669))this[_0x205090(0x432)]=this[_0x205090(0x21e)][_0x205090(0x4b8)](),this[_0x205090(0x390)]();else return _0x12594c[_0x205090(0x54c)]['Game_CharacterBase_direction']['call'](this);}},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x5cb)]=function(){const _0x50594f=_0x165665;this['scale']['x']=0x1/$gameScreen[_0x50594f(0x3ad)](),this[_0x50594f(0x49a)]['y']=0x1/$gameScreen[_0x50594f(0x3ad)](),this[_0x50594f(0x55e)]=$gameScreen[_0x50594f(0x3ad)]();},Window_EventLabel['prototype']['updatePosition']=function(){const _0x2d8e80=_0x165665;if(!SceneManager[_0x2d8e80(0x26d)])return;if(!SceneManager['_scene'][_0x2d8e80(0x699)])return;const _0x114e9e=SceneManager[_0x2d8e80(0x26d)]['_spriteset'][_0x2d8e80(0x35d)](this[_0x2d8e80(0x21e)]);if(!_0x114e9e)return;this['x']=Math[_0x2d8e80(0x3a8)](this[_0x2d8e80(0x21e)][_0x2d8e80(0x5d1)]()-Math['floor'](this[_0x2d8e80(0x5e8)]*this[_0x2d8e80(0x49a)]['x']/0x2)),this['x']+=this[_0x2d8e80(0x21e)][_0x2d8e80(0x4c4)][_0x2d8e80(0x5b1)],this['y']=this['_event'][_0x2d8e80(0x37c)]()-_0x114e9e[_0x2d8e80(0x4bb)],this['y']+=Math['round']($gameSystem[_0x2d8e80(0x58e)]()*0.5),this['y']-=Math[_0x2d8e80(0x3a8)](this[_0x2d8e80(0x4bb)]*this[_0x2d8e80(0x49a)]['y']),this['y']+=this[_0x2d8e80(0x21e)][_0x2d8e80(0x4c4)][_0x2d8e80(0x2b4)],this[_0x2d8e80(0x406)]=this[_0x2d8e80(0x21e)]['_erased'],this[_0x2d8e80(0x5cd)]=this['_event'][_0x2d8e80(0x5d1)](),this[_0x2d8e80(0x505)]=this['_event'][_0x2d8e80(0x37c)](),this[_0x2d8e80(0x4a9)]=this[_0x2d8e80(0x21e)][_0x2d8e80(0x4c4)]['offsetX'],this[_0x2d8e80(0x1eb)]=this[_0x2d8e80(0x21e)][_0x2d8e80(0x4c4)][_0x2d8e80(0x2b4)],this['_eventPageIndex']=this[_0x2d8e80(0x21e)][_0x2d8e80(0x1c7)],this['_eventErased']&&(this[_0x2d8e80(0x5a1)]=0x0);},Window_EventLabel[_0x165665(0x49c)]['updateOpacity']=function(){const _0x41051b=_0x165665;if(this[_0x41051b(0x3b9)]()){if(_0x41051b(0x665)!==_0x41051b(0x438))this[_0x41051b(0x5a1)]+=this[_0x41051b(0x4a6)]();else{const _0x31df8c=this['event']()[_0x41051b(0x3c8)];if(_0x31df8c==='')return;this['checkEventsMoveCoreStringTags'](_0x31df8c);}}else SceneManager[_0x41051b(0x26d)]['_encounterEffectDuration']>0x0?this[_0x41051b(0x5a1)]=0x0:this['contentsOpacity']-=this[_0x41051b(0x4a6)]();},Window_EventLabel[_0x165665(0x49c)]['isLabelVisible']=function(){const _0x123036=_0x165665;if(!$gameSystem[_0x123036(0x4ae)]())return![];if(this['_event']?.[_0x123036(0x294)])return![];if(SceneManager[_0x123036(0x26d)][_0x123036(0x583)]>0x0)return![];const _0x3bc19b=$gamePlayer['x'],_0x340ce5=$gamePlayer['y'],_0x3135bd=this['_event']['x'],_0x1af96d=this[_0x123036(0x21e)]['y'];if(this['_visiblePlayerX']===_0x3bc19b&&this[_0x123036(0x557)]===_0x340ce5&&this[_0x123036(0x5e6)]===_0x3135bd&&this['_visibleEventY']===_0x1af96d)return _0x123036(0x5c7)==='yRJsJ'?this['processMoveRouteMoveRepeat'](0x8,_0x5838ff(_0x3388a6['$1'])):this[_0x123036(0x1e2)];this[_0x123036(0x5a2)]=$gamePlayer['x'],this[_0x123036(0x557)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x123036(0x21e)]['x'],this[_0x123036(0x60d)]=this[_0x123036(0x21e)]['y'];if($gameMap[_0x123036(0x366)](_0x3bc19b,_0x340ce5,_0x3135bd,_0x1af96d)>this[_0x123036(0x21e)][_0x123036(0x430)]())return this['_cacheVisibility']=![],![];return this[_0x123036(0x1e2)]=!![],!![];},Window_EventLabel['prototype'][_0x165665(0x4a6)]=function(){const _0x142efc=_0x165665;return VisuMZ[_0x142efc(0x54c)][_0x142efc(0x256)][_0x142efc(0x1cd)][_0x142efc(0x41c)];},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x22e)]=function(){const _0x3f300d=_0x165665,_0x48d342=this['textSizeEx'](this[_0x3f300d(0x432)]);this[_0x3f300d(0x5e8)]=_0x48d342[_0x3f300d(0x5e8)]+($gameSystem['windowPadding']()+this[_0x3f300d(0x373)]())*0x2,this['height']=Math[_0x3f300d(0x1d2)](this['lineHeight'](),_0x48d342['height'])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel['prototype'][_0x165665(0x57a)]=function(){const _0x18f927=_0x165665;return VisuMZ[_0x18f927(0x54c)][_0x18f927(0x256)][_0x18f927(0x1cd)][_0x18f927(0x4e6)];},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x3b7)]=function(){const _0x34daad=_0x165665;Window_Base[_0x34daad(0x49c)][_0x34daad(0x3b7)]['call'](this),this['contents'][_0x34daad(0x50a)]=this['defaultFontSize']();},Window_EventLabel['prototype']['defaultFontSize']=function(){const _0x19e448=_0x165665;return VisuMZ['EventsMoveCore'][_0x19e448(0x256)][_0x19e448(0x1cd)]['FontSize'];},Window_EventLabel['prototype']['refresh']=function(){const _0x58243c=_0x165665;this[_0x58243c(0x22e)](),this[_0x58243c(0x698)][_0x58243c(0x668)]();const _0xf11e49=this[_0x58243c(0x432)][_0x58243c(0x286)](/[\r\n]+/);let _0x1383cc=0x0;for(const _0x3826cb of _0xf11e49){const _0x2b0b81=this['textSizeEx'](_0x3826cb),_0x4d6e7c=Math[_0x58243c(0x277)]((this[_0x58243c(0x3a4)]-_0x2b0b81[_0x58243c(0x5e8)])/0x2);this[_0x58243c(0x3ea)](_0x3826cb,_0x4d6e7c,_0x1383cc),_0x1383cc+=_0x2b0b81[_0x58243c(0x4bb)];}},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x2fe)]=function(_0xb54d7b,_0x3d5d51){const _0xf33834=_0x165665;if(_0x3d5d51[_0xf33834(0x54b)]){if(_0xf33834(0x411)==='MGnCn')this[_0xf33834(0x5c3)](_0xb54d7b,_0x3d5d51['x']+0x2,_0x3d5d51['y']);else{if(!_0x5dda79['isDashingEnabled']())return!![];return _0x5e113b['EventsMoveCore'][_0xf33834(0x31f)][_0xf33834(0x4ca)](this);}}_0x3d5d51['x']+=Math[_0xf33834(0x442)](this[_0xf33834(0x388)](),ImageManager[_0xf33834(0x344)])+0x4;},Window_EventLabel[_0x165665(0x49c)][_0x165665(0x5c3)]=function(_0x3b736b,_0x2a1861,_0x2b90f7){const _0x47b501=_0x165665,_0xa1d65a=ImageManager[_0x47b501(0x592)]('IconSet'),_0x1da420=ImageManager[_0x47b501(0x344)],_0x5c6412=ImageManager['iconHeight'],_0x386a06=_0x3b736b%0x10*_0x1da420,_0x4b6214=Math[_0x47b501(0x277)](_0x3b736b/0x10)*_0x5c6412,_0x448a80=Math['min'](this[_0x47b501(0x388)]()),_0x5e7c6e=Math[_0x47b501(0x442)](this[_0x47b501(0x388)]());this[_0x47b501(0x698)]['blt'](_0xa1d65a,_0x386a06,_0x4b6214,_0x1da420,_0x5c6412,_0x2a1861,_0x2b90f7,_0x448a80,_0x5e7c6e);},Window_EventLabel['prototype'][_0x165665(0x388)]=function(){const _0x45c56e=_0x165665;return VisuMZ[_0x45c56e(0x54c)][_0x45c56e(0x256)][_0x45c56e(0x1cd)][_0x45c56e(0x396)];};