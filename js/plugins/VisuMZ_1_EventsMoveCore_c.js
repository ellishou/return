//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.20] [EventsMoveCore][翻譯版本:1]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Notetags
 * ============================================================================
 * === Map Notetags ===
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - 啟用/禁用那些地圖的對角線移動。
 * - 如果沒有notetag，請使用“插件參數"設置。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 將“type"替換為“全部"，“步行"，“玩家"，“事件"，“交通工具"，“船"，“船"或“飛艇"。
 * - 'Allow"註釋標籤變體使該類型可以通過它們，而無論其他適當的可設置性如何。
 * - “Forbid"註釋標籤變體完全禁止該類型通過。
 * - “Dock"便簽變體允許交通工具停靠在那裡。 船隻必鬚麵向區域方向，而飛艇必須直接降落在上面。
 * ------ ------ ------ ------ ------ ------ 
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - 將所有事件的位置保存在地圖上，以便稍後再返回該地圖時，事件將位於其最後一個位置。
 * ------ ------ ------ ------ ------ ------  
 * === Page Comment Tags ===
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - 這使你可以使用條件分支事件命令創建自定義頁面條件，以查看是否滿足其他頁面條件。
 * ------ ------ ------ ------ ------ ------ 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - 如果在<Page Conditions>和</Page Conditions>註釋標記之間使用，到達事件命令列表的此部分時，將視為已滿足自定義頁面條件。
 * ------ ------ ------ ------ ------ ------ 
 * Example:
 * 
 * ◆Comment: <Page Conditions>
 * ◆If: Reid has equipped Potion Sword
 *   ◆Comment: If Reid has equipped the Potion Sword
 * :        : <Condition Met>
 *   ◆
 * : End
 * ◆Comment: </Page Conditions>
 * 
 * 如果Reid裝備了“Potion Sword"武器，則將滿足其他自定義頁面條件，並且事件頁面將存在/處於活動狀態。
 * 
 * 如果這是部隊條件，則將激活部隊頁面事件。
 * 
 * 如果這是一個公共事件，那麼將有一個並行的公共事件處於活動狀態。
 * ------ ------ ------ ------ ------ ------ 
 * === Event and Event Page Notetags ===
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 只要玩家站在指定區域標記的圖塊內，就可以遠程激活此事件。
 * - 將"x"替換為你希望在其中遠程激活此事件的區域。
 *   - 動作按鈕: 玩家在該區域時必須按OK。
 *   - 玩家/事件觸摸: 玩家必須踏入該區域。
 *   - 自動運行/並行: 玩家在該區域中。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * - 注意: 這不能與任何其他激活標籤一起使用。
 * ------ ------ ------ ------ ------ ------ 
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 只要玩家處於其激活類型範圍內，就可以遠程激活此事件。
 * - 將"x"替換為在圖塊中說明範圍的數字。
 *   - Square: 事件處於中心的正方形範圍。
 *   - Radius: 鑽石形狀的活動範圍以活動為中心。
 *   - Row: 在地圖上水平跨越。 "x"向上和向下擴展。
 *   - Column: 垂直跨越地圖。 "x"向左和向右擴展。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * - 注意: 這不能與任何其他激活標籤一起使用。
 * ------ ------ ------ ------ ------ ------ 
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 事件通常必須在屏幕範圍內，以便它們更新自身運動。 如果存在此標記，則事件始終在更新。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 允許在使用鼠標單擊時激活此事件。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - 使此事件複製可在不同地圖上找到的不同事件的所有事件設置
 *   （只要該地圖已在插件參數=>事件模板設置=>預載地圖中註冊）。
 * - 將"x"替換為代表複製的事件的地圖ID的數字。
 * - 將"y"替換為代表複製的事件的事件ID的數字。
 * - 對於'template'變體，將'template'替換為在Plugin Parameters => Event Template Settings => Event Template List中創建的模板名稱。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 將"x"替換為一個數字，以將事件的命中框向列出的方向擴展那麼多的圖塊。
 * - 使用此便簽標籤的倍數將它們擴展到不同的方向。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 如果要在此事件上方放置圖標IF，請替換為"x"。
 * - 這不會覆蓋通過插件命令指定給ID的任何圖標。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 允許你通過緩衝區調整圖標在envent上的位置。
 * - 用值替換"x"和"y"以調整位置緩衝區。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 設置事件上圖標的混合模式。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 在事件的頭部放置一個標籤，顯示“text"。
 * - 可以使用文本代碼。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 在事件的頭部放置一個標籤，顯示“text"。
 * - 這可以顯示多行。
 * - 可以使用文本代碼。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 設置玩家的範圍要求，以使事件的標籤出現。
 * - 將"x"替換為描述值（以圖塊為單位）的數字值。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 允許你通過偏移量來調整標籤在標籤上的位置。
 * - 用值替換"x"和"y"以調整位置偏移量。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------  
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 將此事件的移動範圍設置為僅由註釋標籤或註釋標籤標記的區域。
 * - 這將繞過地形的通過性。
 * - 這不會繞過事件衝突。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 將此事件的移動與目標（玩家或其他事件）同步。 僅當同步目標移動時，此事件才會移動。
 * - 對於“Event x"變體，將"x"替換為要同步到的事件ID。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 選擇事件與目標同步後將具有的移動類型。
 *   - Random: 隨機: 移動到隨機位置。
 *   - Approach: 接近目標。
 *   - Away: 逃離目標。
 *   - Custom: 遵循自定義移動路線。
 *   - Mimic: 模仿目標的運動風格。
 *   - Reverse Mimic: 與目標運動相反。
 *   - Mirror Horizontal: 如同將鏡子水平放置一樣移動。
 *   - Mirror Vertical: 如同垂直放置鏡子一樣移動。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 如果存在此標記，則事件在每次移動後會稍等一會再移動。
 * - Replace 'x' with the number of movement instances in between.
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------  
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 如果在具有隨機類型的自主移動的事件上使用此標籤，則該事件將更加靠近其原始位置（它們在地圖上生成時所位於的位置）。
 *   他們堅持到自己家附近的距離取決於加權的"x"值。
 * - 用0到1之間的數字替換"x"。數字越接近0，則在隨機移動時為事件提供了更大的自由度；
 *   數字越接近1，則使事件越靠近其原始位置。
 * ------ ------ ------ ------ ------ ------ 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 如果將此標籤用於具有隨機類型自主運動的事件，則該事件將忽略加權隨機運動的影響。
 * ------ ------ ------ ------ ------ ------ 
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - 將事件的位置保存在地圖上，以便稍後再返回該地圖時，該事件將位於其最後一次出現的位置。
 * ------ ------ ------ ------ ------ ------ 
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 隱藏事件的陰影。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - 將在img/system/ project文件夾中找到的陰影圖形替換為“文件名"。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 更改事件的精靈被明顯偏移的數量。
 * - 將"x"和"y"替換為指示偏移量的數字（以像素為單位）。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * - 如果存在標籤，則更改事件動畫的方式。
 *   - Left to Right: 使事件精靈的步進行為從第0幀變為第1幀到第2幀，然後返回到0而不是向後循環。
 *   - Right to Left: 使事件精靈的步進行為從第2幀變為1到0，然後返回2，而不是向前循環。
 *   - Spin Clockwise: 使事件精靈的步進行為旋轉CW。
 *   - Spin CounterClockwise: 使事件精靈的步進行為旋轉CCW。
 * - 如果將其放在便簽標籤中，則效果將出現在所有使用的事件頁面上。
 * - 如果將其放置在頁面的註釋內，則僅當該事件頁面當前處於活動狀態時，才會產生效果。
 * ------ ------ ------ ------ ------ ------ 
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
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
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
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
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
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
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
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
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
 * @command AutoMoveEvents
 * @text 自動移動: 事件
 * @desc 允許/停止自動移動的事件。
 *
 * @arg Value:str
 * @text 值
 * @type select
 * @option 允許
 * @value Allow
 * @option 停止
 * @value Stop
 * @option 切換
 * @value Toggle
 * @desc 允許事件自動移動？
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text 呼叫事件: 遠程激活
 * @desc 遠程運行其他事件的頁面。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 目標事件的地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 要遠程運行的事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg PageId:eval
 * @text 頁面 ID
 * @desc 要運行的遠程事件的頁面。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text 啟用衝刺: 切換
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text 值
 * @type select
 * @option 啟用
 * @value Enable
 * @option 禁用
 * @value Disable
 * @option 切換
 * @value Toggle
 * @desc 你希望將衝刺更改為什麼？
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text 事件圖示: 改變
 * @desc 更改事件上顯示的圖標。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent MapId:eval
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg IconIndex:eval
 * @text 圖標索引
 * @desc 用於圖標的圖標索引。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text 緩衝X
 * @parent IconIndex:eval
 * @desc 將X位置移動多少？
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text 緩衝Y
 * @parent IconIndex:eval
 * @desc 將Y位置移動多少？
 * 你可以使用JavaScript代碼。
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text 混合模式
 * @parent IconIndex:eval
 * @type select
 * @option 0 - 一般 Normal
 * @value 0
 * @option 1 - 添加 Additive
 * @value 1
 * @option 2 - 乘 Multiply
 * @value 2
 * @option 3 - 螢幕 Screen
 * @value 3
 * @desc 你希望將哪種混合模式應用於圖標精靈？
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text 事件圖標: 刪除
 * @desc 刪除事件上顯示的圖標。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent MapId:eval
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text 事件標籤: 刷新
 * @desc 刷新屏幕上的所有事件標籤。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text 事件標籤: 可見的
 * @desc 更改事件標籤的可見性。
 *
 * @arg Visibility:str
 * @text 能見度
 * @type select
 * @option 能見
 * @value Visible
 * @option 隱藏
 * @value Hidden
 * @option 切換
 * @value Toggle
 * @desc 你希望將可見性更改為什麼？
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text 事件位置: 紀錄
 * @desc 記住事件的地圖位置，以便下次加載地圖時重新出現在該位置。
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 目標事件的ID。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text 事件位置: 創建
 * @desc 為特定地圖的事件創建自定義生成位置，以便下次加載地圖時顯示在該位置。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent MapId:eval
 * @desc 目標事件的ID。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg PosX:eval
 * @text X 座標
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg PosY:eval
 * @text Y 座標
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Direction:num
 * @text 方向
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
 * @desc 事件將面對的方向。
 * *與鍵盤數字鍵相同
 * @default 2
 *
 * @arg Optional
 * @text 自選的
 *
 * @arg PageId:eval
 * @text 頁面 ID
 * @parent Optional
 * @desc 要設置移動路線的事件頁面。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text 移動路線索引
 * @parent Optional
 * @desc 如果頁面ID與其餘頁麵條件匹配，則此事件在移動路線中的位置為。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text 事件位置: 刪除
 * @desc 刪除事件的已保存地圖位置。
 * 該事件將重新出現在其默認位置。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text 事件計時器: 過期事件分配
 * @desc 將通用事件設置為在到期時運行。
 * 如果設置了一個，則繞過默認代碼。
 *
 * @arg CommonEventID:num
 * @text 常見事件ID
 * @type common_event
 * @desc 選擇"公共事件"以在計時器到期時運行。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text 事件計時器: 改變速度
 * @desc 更改計時器幀降低（或提高）速度。
 *
 * @arg Speed:eval
 * @text Speed
 * @desc 每幀增加或減少幾分之一/ 60秒？
 * 負數減少。 正數增長。
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text 事件計時器: 過期事件清除
 * @desc 清除任何設置以使"公共事件"到期，而是運行默認的Game_Timer到期代碼。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text 事件計時器: 幀增益
 * @desc 選擇為事件計時器獲取或丟失多少幀，秒，分鐘或小時。
 *
 * @arg Frames:eval
 * @text 幀 Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * 正數增加。 負數減少。 允許使用JavaScript。
 * @default +0
 *
 * @arg Seconds:eval
 * @text 秒 Seconds
 * @desc 獲得/丟失多少秒？
 * 正數增加。 負數減少。 允許使用JavaScript。
 * @default +0
 *
 * @arg Minutes:eval
 * @text 分鐘 Minutes
 * @desc 獲得/丟失了多少分鐘？
 * 正數增加。 負數減少。 允許使用JavaScript。
 * @default +0
 *
 * @arg Hours:eval
 * @text 小時 Hours
 * @desc 獲得/丟失了幾個小時？
 * 正數增加。 負數減少。 允許使用JavaScript。
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text 事件計時器: 框架集
 * @desc 選擇為事件計時器設置多少幀，秒，分鐘或小時。
 *
 * @arg Frames:eval
 * @text 幀 Frames
 * @desc 將幀計數設置為此值。
 * 每幀為1/60秒。 允許使用JavaScript。
 * @default 0
 *
 * @arg Seconds:eval
 * @text 秒 Seconds
 * @desc 將秒設置為此值。
 * 允許使用JavaScript。
 * @default 0
 *
 * @arg Minutes:eval
 * @text 分鐘 Minutes
 * @desc 將分鐘設置為此值。
 * 每分鐘是60秒。 允許使用JavaScript。
 * @default 0
 *
 * @arg Hours:eval
 * @text 小時 Hours
 * @desc 將小時設置為此值。
 * 每小時是60分鐘。 允許使用JavaScript。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text 事件計時器: 暫停
 * @desc 暫停當前事件計時器，但不停止它。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text 事件計時器: 恢復
 * @desc 從暫停狀態恢復當前事件計時器。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text 追隨者: 設置全局追逐
 * @desc 禁止所有關注者追踪玩家或重新啟用玩家。
 *
 * @arg Chase:eval
 * @text 追趕
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc 設置所有追隨者是否追逐玩家。
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text 追隨者: 設定目標追逐
 * @desc 禁止目標追隨者追逐玩家或重新啟用它。
 *
 * @arg FollowerID:eval
 * @text 跟隨者 ID
 * @desc 選擇要禁用/啟用追隨的跟隨者ID。
 * @default 1
 *
 * @arg Chase:eval
 * @text 追趕
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc 設置目標追隨者是否追逐其目標。
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text 追隨者: 設定控制
 * @desc 當選擇"玩家"作為目標時，將事件命令設置為以跟隨者為目標。
 *
 * @arg FollowerID:eval
 * @text 跟隨者 ID
 * @desc 選擇要控制的跟隨者ID。
 * 0是玩家。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text 追隨者: 重置
 * @desc 重置所有關注者控件。 以"玩家"為目標的事件命令將恢復正常，追隨者將再次追逐。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text 全局切換: 獲取自開關A B C D
 * @desc 從自助開關獲取當前的開/關值，並將其存儲到全局開關中。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為源地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 源事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Letter:str
 * @text 字母 (Letter)
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc 要從中獲取數據的目標事件的自我切換的字母。
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text 目標開關ID
 * @type switch
 * @desc 目標開關的ID。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text 全局切換: 獲得自開關ID
 * @desc 從自助開關獲取當前的開/關值，並將其存儲到全局開關中。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為源地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 源事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg SwitchId:num
 * @text 開關 ID
 * @type switch
 * @desc 源開關的ID。
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text 目標開關ID
 * @type switch
 * @desc 目標開關的ID。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text 全局變量: 獲得自變量ID
 * @desc 從自變量獲取當前存儲的值，並將其存儲到全局變量中。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為源地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 源事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg VariableId:num
 * @text 變數 ID
 * @type variable
 * @desc 源變量的ID。
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text 目標變量ID
 * @type variable
 * @desc 目標變量的ID。
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text 變形事件: 改變
 * @desc R遠程取消其他事件的頁面。
 *
 * @arg Step1
 * @text Step 1: 被改變
 *
 * @arg Step1MapId:eval
 * @text 地圖 ID
 * @parent Step1
 * @desc 目標事件的地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text 事件 ID
 * @parent Step1
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Step2
 * @text Step 2: 變成
 *
 * @arg TemplateName:str
 * @text 模板名稱
 * @parent Step2
 * @desc 要變形為的目標事件模板的名稱。
 * 忽略是否稱為"Untitled"。
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text 地圖 ID
 * @parent Step2
 * @desc 目標事件的地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text 事件 ID
 * @parent Step2
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text 保留變形
 * @parent Step2
 * @type boolean
 * @on 保存 Preserve
 * @off 過期 Expires
 * @desc 是否保留了變體效果？
 * 還是在離開地圖後過期？
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text 變形事件: 消除
 * @desc 刪除事件的變形狀態。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @parent Step1
 * @desc 目標事件的地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent Step1
 * @desc 要刪除其變形的事件的ID。 當前事件使用0。 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text 刪除保留
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc 還能去除保存效果嗎？
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text 玩家圖標:  改變
 * @desc 更改玩家上顯示的圖標。
 *
 * @arg IconIndex:eval
 * @text 圖標索引
 * @desc 用於圖標的圖標索引。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text 緩衝X
 * @parent IconIndex:eval
 * @desc 將X位置移動多少？
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text 緩衝Y
 * @parent IconIndex:eval
 * @desc 將Y位置移動多少？
 * 你可以使用JavaScript代碼。
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text 混合模式
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
 * @desc 你希望將哪種混合模式應用於圖標精靈？
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text 玩家圖標:  刪除
 * @desc 刪除玩家上出現的圖標。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text 玩家移動: 控制
 * @desc 啟用或禁用玩家對玩家角色移動的控制。
 *
 * @arg Enable:eval
 * @text 啟用?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 讓玩家控制玩家角色的移動位置嗎？
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text 玩家移動: 對角線
 * @desc 覆蓋設置以使玩家進行對角線移動。
 *
 * @arg Setting:str
 * @text 設定
 * @type select
 * @option 默認值：無論地圖使用什麼
 * @value default
 * @option 強制禁用對角運動
 * @value disable
 * @option 強制啟用對角運動
 * @value enable
 * @desc 你想如何改變對角線運動？
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text 自開關: A B C D
 * @desc 更改其他事件的"自開關"。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 目標事件的ID。 使用0表示當前事件。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg Letter:str
 * @text 字母
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
 * @text 值
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
 * @text 自開關: 開關 ID
 * @desc 更改其他事件的"自開關"。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg SwitchId:num
 * @text 開關 ID
 * @type switch
 * @desc 目標開關的ID。
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text 值
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc 你要將"自開關"設置為什麼值？
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text 自變量: 變量ID
 * @desc 更改其他事件的自變量。
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @desc 該地圖為目標地圖。 使用0作為當前地圖。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @desc 目標事件的ID。 當前事件使用0。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @arg VariableId:num
 * @text 變量 ID
 * @type variable
 * @desc 目標變量的ID。
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text 操作 (Operation)
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
 * @desc 設置使用的操作。
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text 值
 * @desc 插入值以修改自變量。
 * 你可以使用JavaScript代碼。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text 產生事件: 產生在 X, Y
 * @desc 在當前地圖的X，Y位置生成所需事件。
 *
 * @arg Step1
 * @text Step 1: 產生事件
 *
 * @arg TemplateName:str
 * @text 模板名稱
 * @parent Step1
 * @desc 要作為其生成的目標事件模板的名稱。
 * 忽略是否稱為"Untitled"。
 * @default Untitled
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @parent Step1
 * @desc 目標事件的地圖將用作參考。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent Step1
 * @desc 要用作參考的目標事件的ID。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg Step2
 * @text Step 2: 地點
 *
 * @arg PosX:eval
 * @text X 坐標
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc 產生的目標位置。
 * 你可以使用JavaScript代碼。
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y 坐標
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc 產生的目標位置。
 * 你可以使用JavaScript代碼。
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text 檢查事件衝突
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查與其他事件和玩家的碰撞嗎？
 * @default true
 *
 * @arg Passability:eval
 * @text 檢查通過性
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查目標位置的可通過性。
 * @default true
 *
 * @arg Preserve:eval
 * @text 保留繁殖
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc 生成的事件是否保留？
 * 還是在離開地圖後過期？
 * @default true
 *
 * @arg Step3
 * @text Step 3: 成功檢查
 *
 * @arg SuccessSwitchId:num
 * @text 成功開關 ID
 * @parent Step3
 * @type switch
 * @desc 定位開關ID以記錄生成成功。
 * 忽略ID是否為0。Off表示失敗。 On表示成功。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text 產生事件: 在區域產生
 * @desc 在當前地圖上的隨機區域標記位置生成所需事件。
 *
 * @arg Step1
 * @text Step 1: 產生事件
 *
 * @arg TemplateName:str
 * @text 模板名稱
 * @parent Step1
 * @desc 要作為其生成的目標事件模板的名稱。
 * 忽略是否稱為"無標題"。
 * @default Untitled
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @parent Step1
 * @desc 目標事件的地圖。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent Step1
 * @desc 目標事件的ID。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg Step2
 * @text Step 2: 位置
 *
 * @arg Region:arraynum
 * @text 區域ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc 選擇要產生此事件的區域。
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text 檢查事件衝突
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查是否與其他事件和玩家發生衝突？
 * @default true
 *
 * @arg Passability:eval
 * @text 檢查通過性
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查目標位置的可通過性。
 * @default true
 *
 * @arg Preserve:eval
 * @text 保留生成
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc 生成的事件是否保留？
 * 還是在離開地圖後過期？
 * @default true
 *
 * @arg Step3
 * @text Step 3: 成功檢查
 *
 * @arg SuccessSwitchId:num
 * @text 成功開關 ID
 * @parent Step3
 * @type switch
 * @desc 定位開關ID以記錄生成成功。
 * 忽略ID是否為0。Off表示失敗。 On表示成功。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text 產生事件: 產生於地形標籤
 * @desc 在當前地圖的隨機地形標記位置生成所需事件。
 *
 * @arg Step1
 * @text Step 1: 產生事件
 *
 * @arg TemplateName:str
 * @text 模板名稱
 * @parent Step1
 * @desc 要作為其生成的目標事件模板的名稱。
 * 忽略是否稱為"無標題"。
 * @default Untitled
 *
 * @arg MapId:eval
 * @text 地圖 ID
 * @parent Step1
 * @desc 目標事件的地圖。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg EventId:eval
 * @text 事件 ID
 * @parent Step1
 * @desc 目標事件的ID。
 * 你可以使用JavaScript代碼。
 * @default 1
 *
 * @arg Step2
 * @text Step 2: 位置
 *
 * @arg TerrainTags:arraynum
 * @text 地形標籤
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc 選擇地形標籤以生成該事件。
 * 在0到7之間插入數字。
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text 檢查事件衝突
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查是否與其他事件和玩家發生衝突？
 * @default true
 *
 * @arg Passability:eval
 * @text 檢查通過性
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc 檢查目標位置的可通過性。
 * @default true
 *
 * @arg Preserve:eval
 * @text 保留生成
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc 生成的事件是否保留？
 * 還是在離開地圖後過期？
 * @default true
 *
 * @arg Step3
 * @text Step 3: 成功檢查
 *
 * @arg SuccessSwitchId:num
 * @text 成功開關 ID
 * @parent Step3
 * @type switch
 * @desc 定位開關ID以記錄生成成功。
 * 忽略ID是否為0。Off表示失敗。 On表示成功。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text 產生事件: 派生事件ID
 * @desc 在當前地圖上派生所選的事件ID。
 *
 * @arg EventID:eval
 * @text 事件 ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc 目標事件的ID。
 * 你可以使用JavaScript代碼。
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text 產生事件: 產生於 X, Y
 * @desc 在當前地圖的X，Y位置生成所有生成的事件。
 *
 * @arg PosX:eval
 * @text X 座標
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc 派生到的目標位置。
 * 你可以使用JavaScript代碼。
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y 座標
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc 派生到的目標位置。
 * 你可以使用JavaScript代碼。
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text 產生事件: 產卵區
 * @desc 在當前地圖上生成選定的區域。
 *
 * @arg Region:arraynum
 * @text 區域ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc 選擇區域並派生其中的所有東西。
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text 產生事件: 派生地形標籤
 * @desc 在當前地圖上生成選定的地形標籤。
 *
 * @arg TerrainTags:arraynum
 * @text 地形標籤
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc 選擇地形標籤並派生其中的所有物品。
 * 在0到7之間插入數字。
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text 產生事件: 消滅一切
 * @desc 滅絕當前地圖上所有派生的事件。
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
 * @text 事件標籤設置
 * @type struct<Label>
 * @desc 選擇有關事件標籤的設置。
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text 事件圖標設置
 * @type struct<Icon>
 * @desc 選擇有關事件圖標的設置。
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text 事件模板設置
 * @type struct<Template>
 * @desc 選擇有關事件模板的設置。
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text 動作設定
 * @type struct<Movement>
 * @desc 更改有關遊戲中移動的規則。
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir 設置
 * @type struct<VS8>
 * @desc 選擇有關VisuStella 8方向精靈的設置。
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text 地區判定
 * @type struct<Region>
 * @desc 選擇有關區域的設置。
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text OK按鈕上的常見事件
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc 設置公共事件，當它們站在指定區域的頂部時，按OK按鈕可激活這些事件。
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text 目標地圖塊
 * @parent RegionOk:struct
 * @type select
 * @option 在玩家面前平鋪。
 * @value front
 * @option 玩家站在地圖塊頂部。
 * @value standing
 * @desc 在"確定"按鈕上應檢查哪個磁貼上的"公共事件"？
 * @default front
 *
 * @param RegionTouch:struct
 * @text 觸碰共同事件
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc 設置在踩踏由指定區域標記的圖塊時激活的公共事件。
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text 地形標籤設置
 * @type struct<TerrainTag>
 * @desc 選擇有關地形標籤的設置。
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
 * @param FontSize:num
 * @text 字體大小
 * @type number
 * @min 1
 * @desc 事件標籤使用的字體大小。
 * @default 22
 *
 * @param IconSize:num
 * @text 圖標大小
 * @type number
 * @min 1
 * @desc 事件標籤中使用的圖標的大小。
 * @default 26
 *
 * @param LineHeight:num
 * @text 線高
 * @type number
 * @min 1
 * @desc 用於事件標籤的線高。
 * @default 26
 *
 * @param OffsetX:num
 * @text 偏移 X
 * @type number
 * @min 0
 * @desc 全局將所有標籤水平偏移此量。
 * @default 0
 *
 * @param OffsetY:num
 * @text 偏移 Y
 * @type number
 * @min 0
 * @desc 全局將所有標籤垂直偏移此量。
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text 漸隱速度
 * @type number
 * @min 1
 * @desc 標籤的淡入速度。
 * @default 16
 *
 * @param VisibleRange:num
 * @text 可見範圍
 * @type number
 * @min 1
 * @desc 玩家必須在事件範圍內才能使其標籤可見。
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
 * @text 緩衝區 X
 * @desc 事件圖標的默認X位置緩衝區。
 * @default 0
 *
 * @param BufferY:num
 * @text 緩衝區 Y
 * @desc 事件圖標的默認Y位置緩衝區。
 * @default 12
 *
 * @param BlendMode:num
 * @text 混合模式
 * @type select
 * @option 0 - 普通 (Normal)
 * @value 0
 * @option 1 - 添加 (Additive)
 * @value 1
 * @option 2 - 乘 (Multiply)
 * @value 2
 * @option 3 - 屏幕 (Screen)
 * @value 3
 * @desc 偶數圖標的默認混合模式。
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
 * @text 設定
 *
 * @param PreloadMaps:arraynum
 * @text 預載的地圖
 * @parent Settings
 * @type number[]
 * @desc 映射的所有ID的列表，這些ID將被預加載以用作此插件的模板映射。
 * @default ["1"]
 *
 * @param Templates
 * @text 模板
 *
 * @param List:arraystruct
 * @text 事件模板列表
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc 此項目使用的所有事件模板的列表。
 * 用於便籤和插件命令。
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy 預複製
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy 複製後
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph 變形前
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph 變形後
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn 預先生成
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn 生成後
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
 * @text 名稱
 * @desc 模板名稱。 它將用作便籤和插件命令的錨點。
 * @default Untitled
 *
 * @param MapID:num
 * @text 地圖 ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc 模板事件存儲在的地圖的ID。
 * 這將自動將此ID添加到預加載列表中。
 * @default 1
 *
 * @param EventID:num
 * @text 事件 ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc 模板事件所基於的事件的ID。
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
 * @text 8方位移動
 *
 * @param EnableDir8:eval
 * @text 啟用
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc 默認情況下允許8向移動嗎？ 玩家可以對角移動。
 * @default true
 *
 * @param StrictCollision:eval
 * @text 嚴格碰撞
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc 在玩家必須能夠通過兩個基本方向的地方執行嚴格的碰撞規則？
 * @default true
 *
 * @param FavorHorz:eval
 * @text 偏向水平
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc 如果不能對角線通過但可以水平和垂直通過，則偏愛水平嗎？
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text 對角線較慢？
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc 對角移動時會降低移動速度嗎？
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text 速度倍增器
 * @parent SlowerSpeed:eval
 * @desc 對角移動時調節移動速度的乘數是多少？
 * @default 0.85
 *
 * @param AutoMove
 * @text 自動移動
 *
 * @param StopAutoMoveEvents:eval
 * @text 事件期間停止
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc 在事件運行時停止自動事件移動。
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text 在消息中停止
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc 消息運行時停止自動事件移動。
 * @default true
 *
 * @param Bitmap
 * @text 位圖(Bitmap)
 *
 * @param BitmapSmoothing:eval
 * @text 平滑處理
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc 你要平滑還是像素化地圖精靈？
 * 對它們進行像素化處理更適合縮放和傾斜。
 * @default false
 *
 * @param Dash
 * @text 衝刺
 *
 * @param DashModifier:num
 * @text 衝刺修改器
 * @parent Dash
 * @desc 更改衝刺速度修改器。
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text 啟用衝刺傾斜嗎？
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc 傾斜當前正在飛濺的所有精靈嗎？
 * @default true
 *
 * @param TiltLeft:num
 * @text 左傾斜量
 * @parent EnableDashTilt:eval
 * @desc 向左移動時的弧度（左上，左，左下）。(upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text 右傾斜量
 * @parent EnableDashTilt:eval
 * @desc 向右移動時的弧度（右上，右，右下）。(upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text 垂直傾斜量
 * @parent EnableDashTilt:eval
 * @desc 垂直移動時的弧度值（上，下）。 (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text 事件移動
 *
 * @param RandomMoveWeight:num
 * @text 隨機移動權重
 * @parent EventMove
 * @desc 使用0到1之間的數字。接近1的數字保持更接近其原始位置。 0禁用它。
 * @default 0.10
 *
 * @param Shadows
 * @text 陰影
 *
 * @param ShowShadows:eval
 * @text 顯示
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc 在所有事件和與玩家相關的精靈上顯示陰影。
 * @default true
 *
 * @param DefaultShadow:str
 * @text 默認文件名
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc 在img/system/ folder中找到陰影的默認文件名。
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text 原地旋轉/到位 (Turn in Place)
 *
 * @param EnableTurnInPlace:eval
 * @text 啟用
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc 不衝刺時，玩家將在移動之前就位。
 * 僅適用於鍵盤輸入。
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text 延遲幀
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc 移動前要等待的幀數。
 * @default 10
 *
 * @param Vehicle
 * @text 交通工具
 *
 * @param BoatSpeed:num
 * @text 船速 Boat
 * @parent Vehicle
 * @desc 使你可以調整船(Boat)的基本速度。
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text 船速 Ship
 * @parent Vehicle
 * @desc 使你可以調整船舶(Ship)的基本速度。
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text 飛船速 Airship
 * @parent Vehicle
 * @desc 使你可以調整飛艇(Airship)的基本速度。
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
 * @text 允許區域
 *
 * @param AllAllow:arraynum
 * @text 全部允許
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入區域ID，玩家可以在其中輸入。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text 步行允許
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 在步行單位可以輸入的地方插入地區ID。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text 玩家允許
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入區域ID，玩家可以在其中輸入。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param EventAllow:arraynum
 * @text 事件允許
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入可以輸入事件的Region ID。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text 交通工具允許
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入任何交通工具均可進入的地區ID。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text 船允許 Boat
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text 船允許 Ship
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text 飛艇允許
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param Forbid
 * @text 禁區
 *
 * @param AllForbid:arraynum
 * @text 全部禁止
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text 禁止步行
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text 玩家禁止
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param EventForbid:arraynum
 * @text 事件禁止
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text 交通工具禁止
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text 船禁止 Boat
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text 船禁止 Ship
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text 飛艇禁止
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param Dock
 * @text 碼頭區
 *
 * @param VehicleDock:arraynum
 * @text 交通工具碼頭
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入任何交通工具均可停靠的地區ID。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param BoatDock:arraynum
 * @text 船塢 Boat
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入地區ID，船隻可以停靠在該地區。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text 僅區域可停靠 Boat
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc 船隻只能在指定區域停靠。
 * @default false
 *
 * @param ShipDock:arraynum
 * @text 船塢 Ship
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入區域ID，船隻可以停靠在該區域。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text 僅區域可停靠 Ship
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc 船舶只能在指定區域停靠。
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text 飛艇碼頭
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入地區ID，飛艇可以停靠在該地區。
 * 區域ID的範圍是0到255。
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text 僅區域可停靠
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc 飛艇只能停靠在指定區域。
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
 * @text 區域1
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region2:num
 * @text 區域2
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region3:num
 * @text 區域3
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region4:num
 * @text 區域4
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region5:num
 * @text 區域5
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region6:num
 * @text 區域6
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region7:num
 * @text 區域7
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region8:num
 * @text 區域8
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region9:num
 * @text 區域9
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region10:num
 * @text 區域10
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region11:num
 * @text 區域11
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region12:num
 * @text 區域12
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region13:num
 * @text 區域13
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region14:num
 * @text 區域14
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region15:num
 * @text 區域15
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region16:num
 * @text 區域16
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region17:num
 * @text 區域17
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region18:num
 * @text 區域18
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region19:num
 * @text 區域19
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region20:num
 * @text 區域20
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region21:num
 * @text 區域21
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region22:num
 * @text 區域22
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region23:num
 * @text 區域23
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region24:num
 * @text 區域24
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region25:num
 * @text 區域25
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region26:num
 * @text 區域26
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region27:num
 * @text 區域27
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region28:num
 * @text 區域28
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region29:num
 * @text 區域29
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region30:num
 * @text 區域30
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region31:num
 * @text 區域31
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region32:num
 * @text 區域32
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region33:num
 * @text 區域33
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region34:num
 * @text 區域34
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region35:num
 * @text 區域35
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region36:num
 * @text 區域36
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region37:num
 * @text 區域37
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region38:num
 * @text 區域38
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region39:num
 * @text 區域39
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region40:num
 * @text 區域40
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region41:num
 * @text 區域41
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region42:num
 * @text 區域42
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region43:num
 * @text 區域43
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region44:num
 * @text 區域44
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region45:num
 * @text 區域45
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region46:num
 * @text 區域46
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region47:num
 * @text 區域47
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region48:num
 * @text 區域48
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region49:num
 * @text 區域49
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region50:num
 * @text 區域50
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region51:num
 * @text 區域51
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region52:num
 * @text 區域52
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region53:num
 * @text 區域53
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region54:num
 * @text 區域54
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region55:num
 * @text 區域55
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region56:num
 * @text 區域56
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region57:num
 * @text 區域57
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region58:num
 * @text 區域58
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region59:num
 * @text 區域59
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region60:num
 * @text 區域60
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region61:num
 * @text 區域61
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region62:num
 * @text 區域62
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region63:num
 * @text 區域63
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region64:num
 * @text 區域64
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region65:num
 * @text 區域65
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region66:num
 * @text 區域66
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region67:num
 * @text 區域67
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region68:num
 * @text 區域68
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region69:num
 * @text 區域69
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region70:num
 * @text 區域70
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region71:num
 * @text 區域71
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region72:num
 * @text 區域72
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region73:num
 * @text 區域73
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region74:num
 * @text 區域74
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region75:num
 * @text 區域75
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region76:num
 * @text 區域76
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region77:num
 * @text 區域77
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region78:num
 * @text 區域78
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region79:num
 * @text 區域79
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region80:num
 * @text 區域70
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region81:num
 * @text 區域71
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region82:num
 * @text 區域72
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region83:num
 * @text 區域73
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region84:num
 * @text 區域74
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region85:num
 * @text 區域75
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region86:num
 * @text 區域76
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region87:num
 * @text 區域77
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region88:num
 * @text 區域78
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region89:num
 * @text 區域79
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region80:num
 * @text 區域80
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region81:num
 * @text 區域81
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region82:num
 * @text 區域82
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region83:num
 * @text 區域83
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region84:num
 * @text 區域84
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region85:num
 * @text 區域85
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region86:num
 * @text 區域86
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region87:num
 * @text 區域87
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region88:num
 * @text 區域88
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region89:num
 * @text 區域89
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region90:num
 * @text 區域80
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region91:num
 * @text 區域81
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region92:num
 * @text 區域82
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region93:num
 * @text 區域83
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region94:num
 * @text 區域84
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region95:num
 * @text 區域85
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region96:num
 * @text 區域86
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region97:num
 * @text 區域87
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region98:num
 * @text 區域88
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region99:num
 * @text 區域89
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region90:num
 * @text 區域90
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region91:num
 * @text 區域91
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region92:num
 * @text 區域92
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region93:num
 * @text 區域93
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region94:num
 * @text 區域94
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region95:num
 * @text 區域95
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region96:num
 * @text 區域96
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region97:num
 * @text 區域97
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region98:num
 * @text 區域98
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region99:num
 * @text 區域99
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region100:num
 * @text 區域100
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region101:num
 * @text 區域101
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region102:num
 * @text 區域102
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region103:num
 * @text 區域103
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region104:num
 * @text 區域104
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region105:num
 * @text 區域105
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region106:num
 * @text 區域106
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region107:num
 * @text 區域107
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region108:num
 * @text 區域108
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region109:num
 * @text 區域109
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region110:num
 * @text 區域110
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region111:num
 * @text 區域111
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region112:num
 * @text 區域112
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region113:num
 * @text 區域113
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region114:num
 * @text 區域114
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region115:num
 * @text 區域115
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region116:num
 * @text 區域116
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region117:num
 * @text 區域117
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region118:num
 * @text 區域118
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region119:num
 * @text 區域119
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region120:num
 * @text 區域120
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region121:num
 * @text 區域121
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region122:num
 * @text 區域122
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region123:num
 * @text 區域123
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region124:num
 * @text 區域124
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region125:num
 * @text 區域125
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region126:num
 * @text 區域126
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region127:num
 * @text 區域127
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region128:num
 * @text 區域128
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region129:num
 * @text 區域129
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region130:num
 * @text 區域130
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region131:num
 * @text 區域131
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region132:num
 * @text 區域132
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region133:num
 * @text 區域133
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region134:num
 * @text 區域134
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region135:num
 * @text 區域135
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region136:num
 * @text 區域136
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region137:num
 * @text 區域137
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region138:num
 * @text 區域138
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region139:num
 * @text 區域139
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region140:num
 * @text 區域140
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region141:num
 * @text 區域141
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region142:num
 * @text 區域142
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region143:num
 * @text 區域143
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region144:num
 * @text 區域144
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region145:num
 * @text 區域145
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region146:num
 * @text 區域146
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region147:num
 * @text 區域147
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region148:num
 * @text 區域148
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region149:num
 * @text 區域149
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region150:num
 * @text 區域150
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region151:num
 * @text 區域151
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region152:num
 * @text 區域152
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region153:num
 * @text 區域153
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region154:num
 * @text 區域154
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region155:num
 * @text 區域155
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region156:num
 * @text 區域156
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region157:num
 * @text 區域157
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region158:num
 * @text 區域158
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region159:num
 * @text 區域159
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region160:num
 * @text 區域160
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region161:num
 * @text 區域161
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region162:num
 * @text 區域162
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region163:num
 * @text 區域163
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region164:num
 * @text 區域164
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region165:num
 * @text 區域165
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region166:num
 * @text 區域166
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region167:num
 * @text 區域167
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region168:num
 * @text 區域168
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region169:num
 * @text 區域169
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region170:num
 * @text 區域170
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region171:num
 * @text 區域171
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region172:num
 * @text 區域172
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region173:num
 * @text 區域173
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region174:num
 * @text 區域174
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region175:num
 * @text 區域175
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region176:num
 * @text 區域176
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region177:num
 * @text 區域177
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region178:num
 * @text 區域178
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region179:num
 * @text 區域179
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region180:num
 * @text 區域170
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region181:num
 * @text 區域171
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region182:num
 * @text 區域172
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region183:num
 * @text 區域173
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region184:num
 * @text 區域174
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region185:num
 * @text 區域175
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region186:num
 * @text 區域176
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region187:num
 * @text 區域177
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region188:num
 * @text 區域178
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region189:num
 * @text 區域179
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region180:num
 * @text 區域180
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region181:num
 * @text 區域181
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region182:num
 * @text 區域182
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region183:num
 * @text 區域183
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region184:num
 * @text 區域184
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region185:num
 * @text 區域185
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region186:num
 * @text 區域186
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region187:num
 * @text 區域187
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region188:num
 * @text 區域188
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region189:num
 * @text 區域189
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region190:num
 * @text 區域180
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region191:num
 * @text 區域181
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region192:num
 * @text 區域182
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region193:num
 * @text 區域183
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region194:num
 * @text 區域184
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region195:num
 * @text 區域185
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region196:num
 * @text 區域186
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region197:num
 * @text 區域187
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region198:num
 * @text 區域188
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region199:num
 * @text 區域189
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region190:num
 * @text 區域190
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region191:num
 * @text 區域191
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region192:num
 * @text 區域192
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region193:num
 * @text 區域193
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region194:num
 * @text 區域194
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region195:num
 * @text 區域195
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region196:num
 * @text 區域196
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region197:num
 * @text 區域197
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region198:num
 * @text 區域198
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region199:num
 * @text 區域199
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region200:num
 * @text 區域200
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region201:num
 * @text 區域201
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region202:num
 * @text 區域202
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region203:num
 * @text 區域203
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region204:num
 * @text 區域204
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region205:num
 * @text 區域205
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region206:num
 * @text 區域206
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region207:num
 * @text 區域207
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region208:num
 * @text 區域208
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region209:num
 * @text 區域209
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region210:num
 * @text 區域210
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region211:num
 * @text 區域211
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region212:num
 * @text 區域212
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region213:num
 * @text 區域213
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region214:num
 * @text 區域214
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region215:num
 * @text 區域215
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region216:num
 * @text 區域216
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region217:num
 * @text 區域217
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region218:num
 * @text 區域218
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region219:num
 * @text 區域219
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region220:num
 * @text 區域220
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region221:num
 * @text 區域221
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region222:num
 * @text 區域222
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region223:num
 * @text 區域223
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region224:num
 * @text 區域224
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region225:num
 * @text 區域225
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region226:num
 * @text 區域226
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region227:num
 * @text 區域227
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region228:num
 * @text 區域228
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region229:num
 * @text 區域229
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region230:num
 * @text 區域230
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region231:num
 * @text 區域231
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region232:num
 * @text 區域232
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region233:num
 * @text 區域233
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region234:num
 * @text 區域234
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region235:num
 * @text 區域235
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region236:num
 * @text 區域236
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region237:num
 * @text 區域237
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region238:num
 * @text 區域238
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region239:num
 * @text 區域239
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region240:num
 * @text 區域240
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region241:num
 * @text 區域241
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region242:num
 * @text 區域242
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region243:num
 * @text 區域243
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region244:num
 * @text 區域244
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region245:num
 * @text 區域245
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region246:num
 * @text 區域246
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region247:num
 * @text 區域247
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region248:num
 * @text 區域248
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region249:num
 * @text 區域249
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region250:num
 * @text 區域250
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region251:num
 * @text 區域251
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region252:num
 * @text 區域252
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region253:num
 * @text 區域253
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region254:num
 * @text 區域254
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
 * @default 0
 *
 * @param Region255:num
 * @text 區域255
 * @type common_event
 * @desc 該區域激活哪個公共事件？
 * 使用0不激活任何公共事件。
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
 * @text 地形標籤ID
 *
 * @param Rope:num
 * @text 繩索
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc 繩索使用哪個地形標籤號？
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
 * @text 氣球圖標設置
 *
 * @param AutoBalloon:eval
 * @text 自動氣球姿勢
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc 使用氣球圖標時，自動擺姿勢VS8精靈。
 * Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text 氣球偏移 X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text 氣球偏移 Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * @text 圖示
 * 
 * @param AutoBuffer:eval
 * @text 自動緩衝
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc 自動緩衝VS8精靈的X和Y坐標？
 * @default true
 * 
 * @param CarryPose:eval
 * @text 使用攜帶姿勢
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc 當頭頂移動圖標時，請使用隨身姿勢。
 * @default true
 *
 */
//=============================================================================

const _0x1f8e=['useCarryPoseForIcons','createSpawnedEventWithData','setControlledFollowerID','initEventsMoveCore','clearEventCache','TiltVert','forceMoveRoute','MUSICNOTE','copy','createShadow','removeChild','updateVS8BalloonOffsets','DefaultShadow','isDashing','setupEventsMoveCoreEffects','checkAdvancedSwitchVariablePresent','_needsRefresh','Game_Player_isMapPassable','BlendMode','getDirectionToPoint','constructor','setup','SILENCE','processMoveSynchCustom','Self\x20Variable\x20%1','Game_CharacterBase_realMoveSpeed','11zdBqTW','ARRAYEVAL','Game_Map_refresh','Game_Timer_initialize','loadSystem','labelWindowText','isBattleTest','939721duziyA','mirror\x20horizontal','EventID','Game_Map_unlockEvent','isAutoBufferIcon','BufferY','format','setItemChoice','_dragonbones','_alwaysUpdateMove','_SavedEventLocations','BoatSpeed','padZero','Value','_characterName','_callEventMap','_periodicRefreshTimer','prepareSpawnedEventAtTerrainTag','isMapPassable','outlineColor','LineHeight','startMapCommonEventOnOK','spriteId','determineCommonEventsWithCPC','Map%1.json','MorphEventRemove','default','meetsCPC','update','_visibleEventX','processMoveRouteStepToCharacter','onClickTrigger','RemovePreserve','UPPER\x20LEFT','pageIndex','PlayerIconChange','clearDashing','string','SelfVariableID','_expireCommonEvent','_characterIndex','Game_Troop_meetsConditions','isOnRope','turnAwayFromPoint','processMoveRouteSelfVariable','EXCLAMATION','FollowerSetTargetChase','switchId','_eventId','clamp','innerWidth','SPIN\x20ACW','Window_ScrollText_startMessage','prepareSpawnedEventAtRegion','isMovementSucceeded','setupMorphEvent','LIGHT-BULB','enable','switches','offsetY','setEventLabelsVisible','mirror\x20vert','Region%1','PostMorphJS','EventLocationCreate','checkNeedForPeriodicRefresh','Template','locate','494292rOJzoW','pause','dir8','deleteEventLocation','hasClickTrigger','_poseDuration','findDiagonalDirectionTo','addLoadListener','moveDiagonally','concat','checkEventsMoveCoreStringTags','Game_Event_findProperPageIndex','reverse','isDashingAndMoving','Game_Player_executeMove','MapID','AutoBalloon','_saveEventLocations','switch2Valid','Game_Timer_stop','loadCPC','updateParallel','IconIndex','%1Forbid','FALSE','isBoat','eventsXy','removeTemporaryMapSpawnedEvents','reverseDir','_spawnedEvents','isShip','%1Allow','anchor','MULTIPLY','OffsetX','charAt','distance','getPreservedMorphEventData','realMoveSpeed','makeDeepCopy','bitmap','turn180','defaultFontSize','Game_Event_checkEventTriggerAuto','MUSIC','_cpc','offsetX','registerCommand','destinationY','createContents','getControlledFollowerID','getPosingCharacterDirection','_scene','correctFacingDirection','VariableGetSelfVariableID','setupSpawn','setPose','isEventRunning','_spriteset','onExpire','isSaveEventLocations','createSaveEventLocationData','NOTE','processMoveSynchMimic','isRegionForbidPass','follower','_chaseOff','SpawnEventDespawnRegions','unlock','setPlayerControlDisable','abs','clearCarrying','_eventErased','_waitMode','IconBufferY','clearStepPattern','CPCsMet','EventTimerPause','IconBlendMode','VisuMZ_2_DragonbonesUnion','ARRAYFUNC','isDashDisabled','despawnEverything','setCommonEvent','processOk','radius','findTargetSprite','needsUpdate','destinationX','isCollidedWithEvents','map','frameCount','Game_System_initialize','labelWindowRange','BufferX','setMoveSpeed','down','processMoveSynchMirrorVert','Name','DOWN','processMoveRouteTeleportToCharacter','isMoving','updatePosition','switch1Id','push','ShipSpeed','Disable','custom','Letter','Vehicle','checkSmartEventCollision','Game_CharacterBase_screenX','_saveEventLocation','Enable','Game_Event_clearPageSettings','isJumping','lastSpawnedEvent','determineEventOverload','target','VisibleEventLabels','Airship','Game_SelfSwitches_setValue','roundXWithDirection','Game_Follower_chaseCharacter','start','USER-DEFINED\x201','ARRAYJSON','updateRoutineMove','eventsXyNt','requestBalloon','createLowerLayer','moveSynchTarget','autoEventIconBuffer','PageId','mimic','AllForbid','_eventCopyData','randomInt','isMoveOnlyRegionPassable','Game_Event_start','ANNOYED','clearSpriteOffsets','_selfTargetItemChoice','setupCopyEvent','ShowShadows','_moveOnlyRegions','Step2Preserve','note','opacitySpeed','characterPatternYVS8','iconHeight','setBackgroundType','return\x20%1','WalkForbid','HURT','drawing','Game_CharacterBase_direction','onDatabaseLoaded','isSupportDiagonalMovement','_callEventData','isShadowShrink','Seconds','PreloadedMaps','_commonEvents','characterPatternY','startCallEvent','AirshipSpeed','isPressed','processMoveRouteTeleportTo','Game_CharacterBase_screenY','setDiagonalDirection','switch1Valid','SwitchGetSelfSwitchABCD','trim','convertVariableValuesInScriptCall','updateEventIconSprite','_tilemap','regionList','hasDragonbones','reverse\x20copy','checkRegionEventTrigger','_PlayerDiagonalSetting','OperateValues','processMoveRoutePatternLock','Game_Timer_start','template','processMoveSynchApproach','Direction','onOk','player','processMoveRouteJumpForward','setEventIconData','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','initEventsMoveCoreEffects','GetMoveSynchTarget','screenY','MapId','_eventOverloadThreshold','onLoadSuccess','filename','findProperPageIndex','isPlaytest','_pageIndex','TemplateName','setStopFollowerChasing','Toggle','_duration','remove','roundY','pos','deltaYFrom','_clickTrigger','Game_CharacterBase_moveDiagonally','processMoveRouteFadeIn','lastMovedDirection','73957fReejW','Game_CharacterBase_setDirection','updatePattern','_text','EventTimerFramesGain','updateScale','iconIndex','isPosing','USER-DEFINED\x202','addChild','SPIN\x20COUNTERCLOCKWISE','PreCopyJS','_activationProximityAutoTriggerBypass','RegionTouch','General','CommonEventID','VisibleRange','EventsMoveCore','getDirectionFromPoint','_forceDashing','Self\x20Switch\x20%1','getPosingCharacterPattern','setupSaveEventLocations','processMoveRouteJumpToCharacter','_eventLabelOffsetY','Game_Player_checkEventTriggerThere','isAirshipPassable','isSpawnHitboxCollisionOk','Game_CharacterBase_updatePattern','autosaveEventLocation','Window_NumberInput_start','findDirectionTo','_character','SelfSwitchID','Chase','_screenZoomScale','turnTowardPoint','floor','clearPageSettings','_transparent','updatePose','moveAwayFromCharacter','isPassable','random','updateSelfMovement','dashSpeedModifier','setAllowEventAutoMovement','PostSpawnJS','getInputDirection','StopAutoMoveEvents','Sprite_Character_setTileBitmap','log','shadowX','_reflection','roundYWithDirection','_randomHomeY','setMovementSuccess','initMembersEventsMoveCore','%1Dock','PosY','processMoveSynchRandom','SPIN\x20CW','isPlayerControlDisabled','Game_Message_setItemChoice','fittingHeight','hasStepAnime','Player','processMoveSynchReverseMimic','delay','moveStraight','Scene_Load_onLoadSuccess','code','setChaseOff','startMapCommonEventOnTouch','_randomMoveWeight','setDirection','frontX','FollowerSetControl','min','checkValidEventerMap','Game_Map_parallelCommonEvents','Label','toLowerCase','isAnyEventStarting','EventForbid','MUSIC\x20NOTE','Game_Troop_meetsConditionsCPC','zoomScale','updateMove','...','_data','Game_CharacterBase_moveStraight','Game_CommonEvent_isActive','region','EventId','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','ConvertParams','FastForwardKey','Game_Player_isDashing','Sprite_Balloon_updatePosition','isSaveEventLocation','ZZZ','_event','page','2022401SrlPTc','_inputTime','processMoveRouteBalloon','_spawnData','canPassDiagonally','_randomHomeX','column','replace','FollowerID','bind','_patternLocked','processMoveRouteSelfSwitch','absDistance','PlayerForbid','setDashingEnabled','contents','_trigger','isOnLadder','Spriteset_Map_createShadow','_lastPluginCommandInterpreter','executeMoveDir8','IconBufferX','EventLabelVisible','MoveRouteIndex','status','max','windowPadding','Game_Timer_onExpire','searchLimit','timerText','Game_Player_checkEventTriggerHere','checkEventTriggerAuto','_stepPattern','updatePatternEventsMoveCore','events','processMoveRouteSetIndex','jump','VisuMZ_0_CoreEngine','checkEventTriggerEventsMoveCore','boxWidth','%1%2','vehicle','width','_EventsMoveCoreSettings','Step1EventId','characterName','createLabelWindows','CustomPageConditions','variables','refresh','turnLeft90','LEFT\x20TO\x20RIGHT','updateBitmapSmoothing','createBitmap','_moveRouteIndex','TerrainTag','Forbid','erase','VehicleAllow','smooth','_eventSpawnData','regionId','getPosingCharacterIndex','initEventsMoveCoreSettings','Collision','_regionRules','Game_Message_setNumberInput','description','EventTimerSpeed','PosX','Game_CharacterBase_isDashing','activationRegionList','isEventClickTriggered','Window_EventItem_onCancel','_shadowGraphic','filter','Window_Message_startMessage','isEventTest','moveTowardPoint','JSON','Game_Event_setupPageSettings','Spriteset_Map_createLowerLayer','return\x200','setupDiagonalSupport','SLEEP','SlowerSpeed','onCancel','Window_NumberInput_processOk','left','eventLabelsVisible','deltaX','Settings','_pose','Game_Map_setupEvents','updateOpacity','IconSize','OFF','backY','despawnTerrainTags','UNTITLED','IconSet','_addedHitbox','Passability','_visiblePlayerX','deltaXFrom','processMoveSynchAway','Game_Enemy_meetsSwitchCondition','Game_Event_locate','_cacheVisibility','Movement','WalkAllow','Stop','isAllowCharacterTilt','Game_Vehicle_isLandOk','isRegionAllowPass','Allow','createIconSprite','chaseCharacter','list','isNearTheScreen','2iOdokl','LIGHTBULB','CallEvent','standing','Game_SelfSwitches_value','posNt','Game_CharacterBase_hasStepAnime','moveSynchType','StrictCollision','Game_Map_isDashDisabled','EventTemplates','isValid','setFrame','pageId','_selfTarget','screenX','_labelWindow','PreMorphJS','Step2EventId','processMoveRouteMoveRepeat','getInputDir8','updatePeriodicRefresh','setSelfValue','EventAutoMovement','EnableDir8','Button','clearSelfTarget','DashModifier','Hidden','_opacity','%1:%2','moveRouteIndex','moveBackToRandomHome','Icon','frontY','setOpacity','createSpawnedEvent','Game_Message_add','_seconds','Sprite_Character_initMembers','PlayerMovementChange','Scene_Boot_onDatabaseLoaded','executeCommand','_diagonalSupport','processMoveSynchMirrorHorz','away','OffsetY','shiftY','_moveRoute','_advancedSwitchVariable','isSelfSwitch','Game_Character_processMoveCommand','clearPose','deltaY','VisuMZ_1_MessageCore','ITEM','pattern','isInVehicle','processMoveRouteHugWall','LIGHT','EventLocationDelete','initFollowerController','getPlayerDiagonalSetting','isPassableByAnyDirection','isWorking','Game_Map_setup','EnableDashTilt','parse','spawnEventId','STRUCT','PlayerIconDelete','EventLocationSave','deleteSavedEventLocation','inBattle','getEventIconIndex','HEART','setBalloonPose','turnAwayFromCharacter','registerSelfTarget','startMapCommonEventOnOKTarget','Game_Map_events','_eventMorphData','List','blt','isSpriteVS8dir','TiltLeft','KNEEL','updateShadow','Preserve','round','Game_Event_updateParallel','roundX','setTileBitmap','SWEAT','startMessage','_eventIconSprite','FontSize','_eventPageIndex','isBusy','textSizeEx','_spriteOffsetY','Game_Map_update','_spriteOffsetX','AdvancedSwitches','Game_Event_initialize','name','mirror\x20vertical','isNormalPriority','_speed','setDestination','_labelWindows','Game_Vehicle_initMoveSpeed','OpacitySpeed','Visible','USER-DEFINED\x205','isSelfVariable','SPIN\x20CCW','checkEventTriggerThere','canStartLocalEvents','SCREEN','Game_Player_getInputDirection','Game_Event_updateSelfMovement','increaseSteps','metCPC','Region','Game_Vehicle_isMapPassable','3WmEJlT','TargetSwitchId','_eventIcon','Game_CharacterBase_characterIndex','_selfEvent','Game_Switches_setValue','Game_CharacterBase_canPass','updateEventsMoveCoreTagChanges','moveAwayFromPoint','setupEvents','Sprite_Balloon_setup','VS8','ARRAYNUM','activationProximityDistance','right','resetFontSettings','_followerChaseOff','lastSpawnedEventID','command108','Game_Interpreter_executeCommand','contentsOpacity','Game_Event_event','LEFT','SpawnEventAtTerrainTag','event','isPreventSelfMovement','changeSpeed','_interpreter','Game_Character_forceMoveRoute','Setting','trigger','boat','setCharacterBitmap','createShadows','updateTilt','_hidden','execute','Game_CharacterBase_update','terrainTag','deletePreservedMorphEventDataKey','setEventIconDataKey','isDiagonalDirection','ARRAYSTR','apply','meetsSwitchCondition','process_VisuMZ_EventsMoveCore_Switches_Variables','shadowFilename','UPPER\x20RIGHT','deleteIconsOnEventsData','prototype','initMembers','_EventIcons','processMoveCommand','_activationProximity','directionOnLadderSpriteVS8dir','reserveCommonEvent','_PreservedEventMorphData','resizeWindow','iconSize','FUNC','Game_Interpreter_updateWaitMode','unlockEvent','advancedValue','parameters','Hours','QUESTION','conditions','_DisablePlayerControl','pluginCommandCallEvent','Game_Switches_value','pages','morphInto','EventTimerExpireClear','approach','rotation','VariableId','EventTimerExpireEvent','scale','disable','add','BalloonOffsetY','activationProximityType','isBigCharacter','MessageCore','TRUE','EventTimerFramesSet','_eventScreenX','getMapSpawnedEventData','DiagonalSpeedMultiplier','FollowerReset','isDashingEnabled','getSelfTarget','USER-DEFINED\x204','version','canPass','_selfTargetNumberInput','setValue','hasMoveOnlyRegions','TiltRight','Game_Follower_initialize','setMoveRoute','vert\x20mirror','forceDashing','fontFace','createLabelWindowForTarget','_needsPeriodicRefresh','startEncounterEffect','_MapSpawnedEventData','USER-DEFINED\x203','splice','VICTORY','call','isRegionDockable','_forceCarrying','ANGER','_moveSpeed','TargetVariableId','create','557114EVJdQO','parallelCommonEvents','COBWEB','_erased','isTargetEventValidForLabelWindow','Game_Variables_setValue','Sprite_Character_setCharacterBitmap','Sprite_Character_characterPatternY','_paused','meetActivationProximityConditions','none','parent','_frames','DashingEnable','_followerControlID','AllAllow','executeMove','_mapId','mapId','blendMode','moveForward','slice','isShadowVisible','refreshIfNeeded','SelfSwitches','moveTowardCharacter','MoveAllSynchTargets','prepareSpawnedEventAtXY','Game_Map_event','direction','isAllowEventAutoMovement','_visibleEventY','processMoveRouteMoveToCharacter','length','processMoveRouteStepTo','setupEventsMoveCoreCommentTags','checkExistingEntitiesAt','setupRegionRestrictions','hasEventIcon','RegionOk','setPlayerDiagonalSetting','PostCopyJS','COLLAPSE','includes','horizontal\x20mirror','ROUTE_SCRIPT','deleteSavedEventLocationKey','_shadowOpacity','turnRight90','visibleRange','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','opacity','processMoveRouteAnimation','Game_Interpreter_character','setNumberInput','switch2Id','Game_Event_meetsConditionsCPC','_working','processMoveCommandEventsMoveCore','restoreSavedEventPosition','registerSelfEvent','VisuMZ_Setup_Preload_Map','text','_eventOverload','124903SJsikA','height','Window_EventItem_onOk','processMoveRouteMoveTo','Game_Event_refresh','SpawnEventAtXY','_type','ADDITIVE','spawnPreserved','_counter','despawnEventId','hasAdvancedSwitchVariable','isAirship','some','saveEventLocation','canMove','SwitchGetSelfSwitchID','AutoBuffer','EventLabelRefresh','HMPH','savePreservedMorphEventDataKey','meetsConditions','isAdvancedSwitch','SpawnEventAtRegion','convertSelfVariableValuesInScriptCall','stop','getSavedEventLocation','initialize','_filename','Walk','characterIndex','advancedFunc','Step1MapId','Map%1-Event%2','Operation','getEventIconData','processMoveRouteFadeOut','fontSize','FollowerSetGlobalChase','type','isLandOk','PreSpawnJS','backX','turnTowardCharacter','checkEventTriggerHere','adjustDir8MovementSpeed','getLastPluginCommandInterpreter','$preloadedMap_%1','Ship','initMoveSpeed','processMoveRouteJumpTo','_spawnPreserved','STR','setLastPluginCommandInterpreter','_CPCs','drawTextEx','_eventLabelOffsetX','Sprite_Character_update','itemPadding','$callEventMap','visible','VehicleForbid','_pattern','Step2MapId','updateText','TurnInPlaceDelay','RIGHT','timer','_visiblePlayerY','isTurnInPlace','indexOf','_shadowSprite','SuccessSwitchId','StopAutoMoveMessages','_encounterEffectDuration','_commonEventId','loadDataFile','match','followers','hasCPCs','_lastMovedDirection','Game_Event_meetsConditions','value','Event','Speed','clear','ship','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_target','character','setupPageSettings','processMoveRouteStepFrom','firstSpawnedEventID','Game_Temp_setDestination','setupSpawnedEvents','isActive','_comments','checkActivationProximity','_eventScreenY','PlayerMovementDiagonal','TerrainTags','hideShadows','SelfSwitchABCD','Game_Player_increaseSteps','LIGHT\x20BULB','updateMoveSynch','isLabelVisible','bufferX','moveTypeRandom','eventId','isStopFollowerChasing','isEventOverloaded','_moveSynch','deleteIconsOnEventsDataKey','processMoveRouteMoveUntilStop','Game_Interpreter_PluginCommand','isSpawnedEvent','943260aEESng','Game_Variables_value','selfValue','bufferY','AdvancedVariables','toUpperCase','command357','CPC','getPose','_characterSprites','moveByInput','variableId','Boat','SpawnEventDespawnAtXY','Game_CharacterBase_pattern','VehicleDock','setPattern','LOWER\x20LEFT','removeMorph','Visibility','_eventCache','SpawnEventDespawnTerrainTags','Game_CharacterBase_increaseSteps','setupEventsMoveCoreNotetags'];const _0x2a6e=function(_0x19c8b2,_0x436d22){_0x19c8b2=_0x19c8b2-0x19c;let _0x1f8ebe=_0x1f8e[_0x19c8b2];return _0x1f8ebe;};const _0x21d116=_0x2a6e;(function(_0x20bc45,_0x381b36){const _0x279568=_0x2a6e;while(!![]){try{const _0x5c8d7b=parseInt(_0x279568(0x3ef))+-parseInt(_0x279568(0x247))*parseInt(_0x279568(0x2fd))+-parseInt(_0x279568(0x4c6))*parseInt(_0x279568(0x3a4))+parseInt(_0x279568(0x1c9))*parseInt(_0x279568(0x2bd))+-parseInt(_0x279568(0x372))+-parseInt(_0x279568(0x3ab))+parseInt(_0x279568(0x52e));if(_0x5c8d7b===_0x381b36)break;else _0x20bc45['push'](_0x20bc45['shift']());}catch(_0x4c97ee){_0x20bc45['push'](_0x20bc45['shift']());}}}(_0x1f8e,0x88a58));var label=_0x21d116(0x4d7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x39010e){const _0x3c43bf=_0x21d116;return _0x39010e[_0x3c43bf(0x546)]&&_0x39010e[_0x3c43bf(0x571)][_0x3c43bf(0x2e8)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x21d116(0x1ac)]||{},VisuMZ[_0x21d116(0x526)]=function(_0xe78a18,_0x54b1da){const _0x282005=_0x21d116;for(const _0x23f7fe in _0x54b1da){if(_0x23f7fe[_0x282005(0x34a)](/(.*):(.*)/i)){const _0x2c397a=String(RegExp['$1']),_0xe98225=String(RegExp['$2'])[_0x282005(0x377)]()[_0x282005(0x49c)]();let _0x8fb30b,_0x2cad13,_0x53bed9;switch(_0xe98225){case'NUM':_0x8fb30b=_0x54b1da[_0x23f7fe]!==''?Number(_0x54b1da[_0x23f7fe]):0x0;break;case _0x282005(0x253):_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON['parse'](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x289171=>Number(_0x289171));break;case'EVAL':_0x8fb30b=_0x54b1da[_0x23f7fe]!==''?eval(_0x54b1da[_0x23f7fe]):null;break;case _0x282005(0x3a5):_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON['parse'](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x5b3bd0=>eval(_0x5b3bd0));break;case _0x282005(0x1a0):_0x8fb30b=_0x54b1da[_0x23f7fe]!==''?JSON['parse'](_0x54b1da[_0x23f7fe]):'';break;case _0x282005(0x46d):_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x2158fe=>JSON['parse'](_0x2158fe));break;case _0x282005(0x282):_0x8fb30b=_0x54b1da[_0x23f7fe]!==''?new Function(JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe])):new Function(_0x282005(0x1a3));break;case _0x282005(0x43f):_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x130c85=>new Function(JSON[_0x282005(0x20c)](_0x130c85)));break;case _0x282005(0x331):_0x8fb30b=_0x54b1da[_0x23f7fe]!==''?String(_0x54b1da[_0x23f7fe]):'';break;case _0x282005(0x271):_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x16a056=>String(_0x16a056));break;case _0x282005(0x20e):_0x53bed9=_0x54b1da[_0x23f7fe]!==''?JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe]):{},_0xe78a18[_0x2c397a]={},VisuMZ[_0x282005(0x526)](_0xe78a18[_0x2c397a],_0x53bed9);continue;case'ARRAYSTRUCT':_0x2cad13=_0x54b1da[_0x23f7fe]!==''?JSON[_0x282005(0x20c)](_0x54b1da[_0x23f7fe]):[],_0x8fb30b=_0x2cad13[_0x282005(0x449)](_0x4f112f=>VisuMZ['ConvertParams']({},JSON[_0x282005(0x20c)](_0x4f112f)));break;default:continue;}_0xe78a18[_0x2c397a]=_0x8fb30b;}}return _0xe78a18;},(_0x2c7c64=>{const _0x412203=_0x21d116,_0xc9440c=_0x2c7c64[_0x412203(0x232)];for(const _0x3b3689 of dependencies){if(!Imported[_0x3b3689]){alert(_0x412203(0x2ef)['format'](_0xc9440c,_0x3b3689)),SceneManager['exit']();break;}}const _0x42d8ae=_0x2c7c64['description'];if(_0x42d8ae[_0x412203(0x34a)](/\[Version[ ](.*?)\]/i)){const _0x154307=Number(RegExp['$1']);_0x154307!==VisuMZ[label][_0x412203(0x2a4)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x412203(0x3b1)](_0xc9440c,_0x154307)),SceneManager['exit']());}if(_0x42d8ae[_0x412203(0x34a)](/\[Tier[ ](\d+)\]/i)){const _0x823cfd=Number(RegExp['$1']);_0x823cfd<tier?(alert(_0x412203(0x4af)[_0x412203(0x3b1)](_0xc9440c,_0x823cfd,tier)),SceneManager['exit']()):tier=Math[_0x412203(0x547)](_0x823cfd,tier);}VisuMZ[_0x412203(0x526)](VisuMZ[label][_0x412203(0x1ac)],_0x2c7c64[_0x412203(0x286)]);})(pluginData),VisuMZ[_0x21d116(0x4a5)]=function(_0x19293b,_0x2457e9,_0x38dd6b){switch(_0x38dd6b){case'=':return _0x2457e9;break;case'+':return _0x19293b+_0x2457e9;break;case'-':return _0x19293b-_0x2457e9;break;case'*':return _0x19293b*_0x2457e9;break;case'/':return _0x19293b/_0x2457e9;break;case'%':return _0x19293b%_0x2457e9;break;}return _0x19293b;},PluginManager[_0x21d116(0x41e)](pluginData['name'],'AutoMoveEvents',_0x2c7292=>{const _0x1cd719=_0x21d116;VisuMZ[_0x1cd719(0x526)](_0x2c7292,_0x2c7292);switch(_0x2c7292['Value']){case _0x1cd719(0x1c4):$gameSystem[_0x1cd719(0x4f4)](!![]);break;case _0x1cd719(0x1c0):$gameSystem[_0x1cd719(0x4f4)](![]);break;case _0x1cd719(0x4bc):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x1cd719(0x2db)]());break;}}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],'CallEvent',_0x779cd5=>{const _0x29a246=_0x21d116;VisuMZ['ConvertParams'](_0x779cd5,_0x779cd5);const _0x5b8108=$gameTemp['getLastPluginCommandInterpreter'](),_0x12db3c={'mapId':_0x779cd5[_0x29a246(0x4b3)],'eventId':_0x779cd5['EventId']||_0x5b8108[_0x29a246(0x36a)](),'pageId':_0x779cd5[_0x29a246(0x474)]};if(_0x12db3c[_0x29a246(0x2cf)]<=0x0)_0x12db3c['mapId']=$gameMap?$gameMap[_0x29a246(0x2cf)]():0x1;$gameTemp[_0x29a246(0x32b)]()['pluginCommandCallEvent'](_0x12db3c);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'DashEnableToggle',_0x328452=>{const _0x39355c=_0x21d116;VisuMZ['ConvertParams'](_0x328452,_0x328452);switch(_0x328452['Value']){case _0x39355c(0x460):$gameSystem[_0x39355c(0x53c)](!![]);break;case _0x39355c(0x459):$gameSystem['setDashingEnabled'](![]);break;case _0x39355c(0x4bc):$gameSystem[_0x39355c(0x53c)](!$gameSystem[_0x39355c(0x2a1)]());break;}}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'EventIconChange',_0x4c962e=>{const _0x56477a=_0x21d116;VisuMZ[_0x56477a(0x526)](_0x4c962e,_0x4c962e);const _0xcc09a1=$gameTemp[_0x56477a(0x32b)]();_0x4c962e[_0x56477a(0x4b3)]=_0x4c962e[_0x56477a(0x4b3)]||$gameMap[_0x56477a(0x2cf)](),$gameSystem['setEventIconDataKey'](_0x4c962e['MapId'],_0x4c962e[_0x56477a(0x524)]||_0xcc09a1[_0x56477a(0x36a)](),_0x4c962e[_0x56477a(0x405)],_0x4c962e[_0x56477a(0x543)],_0x4c962e[_0x56477a(0x439)],_0x4c962e['IconBlendMode']);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'EventIconDelete',_0x4d9f3a=>{const _0x14afbb=_0x21d116;VisuMZ['ConvertParams'](_0x4d9f3a,_0x4d9f3a);const _0xef15f2=$gameTemp['getLastPluginCommandInterpreter']();_0x4d9f3a[_0x14afbb(0x4b3)]=_0x4d9f3a[_0x14afbb(0x4b3)]||$gameMap[_0x14afbb(0x2cf)](),$gameSystem[_0x14afbb(0x36e)](_0x4d9f3a[_0x14afbb(0x4b3)],_0x4d9f3a[_0x14afbb(0x524)]||_0xef15f2[_0x14afbb(0x36a)]());}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x30f),_0x1ba663=>{const _0x3b4bdb=_0x21d116;if($gameMap)for(const _0x55330c of $gameMap[_0x3b4bdb(0x550)]()){_0x55330c[_0x3b4bdb(0x55f)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x21d116(0x544),_0x6d5ce7=>{const _0x4315dd=_0x21d116;VisuMZ[_0x4315dd(0x526)](_0x6d5ce7,_0x6d5ce7);switch(_0x6d5ce7[_0x4315dd(0x385)]){case _0x4315dd(0x23a):$gameSystem[_0x4315dd(0x3e7)](!![]);break;case _0x4315dd(0x1e5):$gameSystem[_0x4315dd(0x3e7)](![]);break;case _0x4315dd(0x4bc):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x4315dd(0x1aa)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x21d116(0x210),_0x48757b=>{const _0x1cbf75=_0x21d116;VisuMZ[_0x1cbf75(0x526)](_0x48757b,_0x48757b);const _0x5aa058=$gameTemp[_0x1cbf75(0x32b)]();if(!$gameMap)return;const _0x34163f=$gameMap[_0x1cbf75(0x25f)](_0x48757b[_0x1cbf75(0x524)]||_0x5aa058['eventId']());if(_0x34163f)_0x34163f[_0x1cbf75(0x30b)]();}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x3eb),_0x29677f=>{const _0x42566c=_0x21d116;VisuMZ[_0x42566c(0x526)](_0x29677f,_0x29677f);const _0x2b63fa=$gameTemp[_0x42566c(0x32b)](),_0x450197=_0x29677f['MapId']||$gameMap['mapId'](),_0x51dba9=_0x29677f[_0x42566c(0x524)]||_0x2b63fa[_0x42566c(0x36a)](),_0x23693a=_0x29677f[_0x42566c(0x573)]||0x0,_0x434d4c=_0x29677f[_0x42566c(0x501)]||0x0,_0x5ca268=_0x29677f[_0x42566c(0x4aa)]||0x2,_0x129a03=((_0x29677f[_0x42566c(0x474)]||0x1)-0x1)[_0x42566c(0x3dc)](0x0,0x13),_0x4a0c08=_0x29677f[_0x42566c(0x545)]||0x0;$gameSystem[_0x42566c(0x42c)](_0x450197,_0x51dba9,_0x23693a,_0x434d4c,_0x5ca268,_0x129a03,_0x4a0c08);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x205),_0x3c32bf=>{const _0x287e26=_0x21d116;VisuMZ['ConvertParams'](_0x3c32bf,_0x3c32bf);const _0x2b6d04=$gameTemp[_0x287e26(0x32b)](),_0x575f78=_0x3c32bf['MapId']||$gameMap[_0x287e26(0x2cf)](),_0x3d7b22=_0x3c32bf['EventId']||_0x2b6d04['eventId']();$gameSystem[_0x287e26(0x2eb)](_0x575f78,_0x3d7b22);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x293),_0x52446e=>{const _0x164bd9=_0x21d116;VisuMZ[_0x164bd9(0x526)](_0x52446e,_0x52446e);const _0x2ffced=_0x52446e[_0x164bd9(0x4d5)];$gameTimer[_0x164bd9(0x442)](_0x2ffced);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x28f),_0x92f4a=>{const _0x166694=_0x21d116;$gameTimer[_0x166694(0x442)](0x0);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x4ca),_0x4cdd45=>{const _0x3427af=_0x21d116;if(!$gameTimer[_0x3427af(0x209)]())return;VisuMZ[_0x3427af(0x526)](_0x4cdd45,_0x4cdd45);let _0x1969ad=0x0;_0x1969ad+=_0x4cdd45['Frames'],_0x1969ad+=_0x4cdd45[_0x3427af(0x490)]*0x3c,_0x1969ad+=_0x4cdd45['Minutes']*0x3c*0x3c,_0x1969ad+=_0x4cdd45[_0x3427af(0x287)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x1969ad);}),PluginManager[_0x21d116(0x41e)](pluginData['name'],_0x21d116(0x29c),_0x273281=>{const _0x3b5ce0=_0x21d116;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x273281,_0x273281);let _0x919d4d=0x0;_0x919d4d+=_0x273281['Frames'],_0x919d4d+=_0x273281[_0x3b5ce0(0x490)]*0x3c,_0x919d4d+=_0x273281['Minutes']*0x3c*0x3c,_0x919d4d+=_0x273281[_0x3b5ce0(0x287)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x919d4d);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x43c),_0xa7677b=>{const _0x27b208=_0x21d116;if(!$gameTimer[_0x27b208(0x209)]())return;$gameTimer[_0x27b208(0x3f0)]();}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'EventTimerResume',_0x9d80b7=>{const _0x452340=_0x21d116;if(!$gameTimer[_0x452340(0x209)]())return;$gameTimer['resume']();}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x572),_0x10fc43=>{const _0x140ce1=_0x21d116;VisuMZ[_0x140ce1(0x526)](_0x10fc43,_0x10fc43);const _0x313453=_0x10fc43[_0x140ce1(0x351)]||0x0;$gameTimer[_0x140ce1(0x261)](_0x313453);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x323),_0xd59e08=>{const _0x4f2841=_0x21d116;VisuMZ[_0x4f2841(0x526)](_0xd59e08,_0xd59e08);const _0x25f898=!_0xd59e08[_0x4f2841(0x4e8)];$gameSystem[_0x4f2841(0x4bb)](_0x25f898);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x3d9),_0x4313d8=>{const _0xcd4963=_0x21d116;VisuMZ[_0xcd4963(0x526)](_0x4313d8,_0x4313d8);const _0x43ba06=(_0x4313d8[_0xcd4963(0x536)]||0x0)-0x1,_0xdc5354=!_0x4313d8[_0xcd4963(0x4e8)],_0x4cb8c2=$gamePlayer[_0xcd4963(0x34b)]()[_0xcd4963(0x430)](_0x43ba06);if(_0x4cb8c2)_0x4cb8c2['setChaseOff'](_0xdc5354);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x513),_0x214ac6=>{const _0x16b048=_0x21d116;VisuMZ[_0x16b048(0x526)](_0x214ac6,_0x214ac6);const _0x4e5a3f=_0x214ac6['FollowerID'];$gameSystem[_0x16b048(0x38c)](_0x4e5a3f);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x2a0),_0x32350d=>{const _0x220a05=_0x21d116;VisuMZ[_0x220a05(0x526)](_0x32350d,_0x32350d),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x220a05(0x4bb)](![]);for(const _0x5a4d32 of $gamePlayer[_0x220a05(0x34b)]()['_data']){if(_0x5a4d32)_0x5a4d32[_0x220a05(0x50e)](![]);}}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x49b),_0xd40543=>{const _0x3b0f3c=_0x21d116;VisuMZ[_0x3b0f3c(0x526)](_0xd40543,_0xd40543);const _0x44a49a=$gameTemp[_0x3b0f3c(0x32b)]();_0xd40543[_0x3b0f3c(0x4b3)]=_0xd40543[_0x3b0f3c(0x4b3)]||$gameMap['mapId']();const _0x1b464a=[_0xd40543[_0x3b0f3c(0x4b3)],_0xd40543[_0x3b0f3c(0x524)]||_0x44a49a[_0x3b0f3c(0x36a)](),_0xd40543[_0x3b0f3c(0x45b)]],_0x4b285c=_0xd40543[_0x3b0f3c(0x248)],_0x5285da=$gameSelfSwitches[_0x3b0f3c(0x34f)](_0x1b464a)||![];$gameSwitches[_0x3b0f3c(0x2a7)](_0x4b285c,_0x5285da);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x30d),_0x45f983=>{const _0x1344a6=_0x21d116;VisuMZ['ConvertParams'](_0x45f983,_0x45f983);const _0xb5508d=$gameTemp['getLastPluginCommandInterpreter']();_0x45f983['MapId']=_0x45f983[_0x1344a6(0x4b3)]||$gameMap[_0x1344a6(0x2cf)]();const _0x373635=[_0x45f983[_0x1344a6(0x4b3)],_0x45f983[_0x1344a6(0x524)]||_0xb5508d[_0x1344a6(0x36a)](),_0x1344a6(0x4da)[_0x1344a6(0x3b1)](_0x45f983['SwitchId'])],_0x223b79=_0x45f983[_0x1344a6(0x248)],_0x18fcd3=$gameSelfSwitches[_0x1344a6(0x34f)](_0x373635)||![];$gameSwitches[_0x1344a6(0x2a7)](_0x223b79,_0x18fcd3);}),PluginManager['registerCommand'](pluginData['name'],_0x21d116(0x425),_0x309640=>{const _0x5247fd=_0x21d116;VisuMZ[_0x5247fd(0x526)](_0x309640,_0x309640);const _0x34be15=$gameTemp[_0x5247fd(0x32b)]();_0x309640[_0x5247fd(0x4b3)]=_0x309640[_0x5247fd(0x4b3)]||$gameMap[_0x5247fd(0x2cf)]();const _0x3b557b=[_0x309640[_0x5247fd(0x4b3)],_0x309640[_0x5247fd(0x524)]||_0x34be15[_0x5247fd(0x36a)](),'Self\x20Variable\x20%1'[_0x5247fd(0x3b1)](_0x309640['VariableId'])],_0x330c62=_0x309640[_0x5247fd(0x2bb)],_0x16163a=$gameSelfSwitches['value'](_0x3b557b)||![];$gameVariables[_0x5247fd(0x2a7)](_0x330c62,_0x16163a);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'MorphEventTo',_0x5b967f=>{const _0x4940bd=_0x21d116;VisuMZ['ConvertParams'](_0x5b967f,_0x5b967f);if(!$gameMap)return;const _0x11956b=$gameTemp[_0x4940bd(0x32b)](),_0x30c030=_0x5b967f[_0x4940bd(0x481)];_0x5b967f[_0x4940bd(0x31d)]=_0x5b967f[_0x4940bd(0x31d)]||$gameMap[_0x4940bd(0x2cf)](),_0x5b967f[_0x4940bd(0x33c)]=_0x5b967f[_0x4940bd(0x33c)]||$gameMap[_0x4940bd(0x2cf)](),_0x5b967f[_0x4940bd(0x4ba)]=_0x5b967f[_0x4940bd(0x4ba)][_0x4940bd(0x377)]()[_0x4940bd(0x49c)]();if(!_0x30c030&&_0x5b967f[_0x4940bd(0x31d)]!==$gameMap[_0x4940bd(0x2cf)]())return;if($gameMap['mapId']()===_0x5b967f[_0x4940bd(0x31d)]){const _0x42f9ba=$gameMap[_0x4940bd(0x25f)](_0x5b967f[_0x4940bd(0x55a)]||_0x11956b[_0x4940bd(0x36a)]());if(!_0x42f9ba)return;_0x5b967f['TemplateName']!==_0x4940bd(0x1b4)?_0x42f9ba['morphIntoTemplate'](_0x5b967f[_0x4940bd(0x4ba)]):_0x42f9ba[_0x4940bd(0x28e)](_0x5b967f[_0x4940bd(0x33c)],_0x5b967f[_0x4940bd(0x1db)]||_0x11956b[_0x4940bd(0x36a)]());}_0x30c030&&$gameSystem['savePreservedMorphEventDataKey'](_0x5b967f[_0x4940bd(0x31d)],_0x5b967f[_0x4940bd(0x55a)],_0x5b967f['TemplateName'],_0x5b967f[_0x4940bd(0x33c)],_0x5b967f['Step2EventId']);}),PluginManager[_0x21d116(0x41e)](pluginData['name'],_0x21d116(0x3c4),_0x5891d4=>{const _0x5b7533=_0x21d116;VisuMZ[_0x5b7533(0x526)](_0x5891d4,_0x5891d4);if(!$gameMap)return;const _0x478416=$gameTemp[_0x5b7533(0x32b)]();_0x5891d4['MapId']=_0x5891d4['MapId']||$gameMap[_0x5b7533(0x2cf)]();if($gameMap[_0x5b7533(0x2cf)]()===_0x5891d4['MapId']){const _0x3ee314=$gameMap[_0x5b7533(0x25f)](_0x5891d4[_0x5b7533(0x524)]||_0x478416['eventId']());_0x3ee314['removeMorph']();}_0x5891d4[_0x5b7533(0x3cb)]&&$gameSystem[_0x5b7533(0x26e)](_0x5891d4[_0x5b7533(0x4b3)],_0x5891d4['EventId']||_0x478416[_0x5b7533(0x36a)]());}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x1f1),_0x15923f=>{const _0x3b5cb8=_0x21d116;VisuMZ[_0x3b5cb8(0x526)](_0x15923f,_0x15923f),$gameSystem[_0x3b5cb8(0x434)](!_0x15923f[_0x3b5cb8(0x460)]);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x360),_0xca7c78=>{const _0x2cc21d=_0x21d116;VisuMZ[_0x2cc21d(0x526)](_0xca7c78,_0xca7c78),$gameSystem[_0x2cc21d(0x2e5)](_0xca7c78[_0x2cc21d(0x264)]);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x3ce),_0x479e6f=>{const _0x330f8e=_0x21d116;VisuMZ[_0x330f8e(0x526)](_0x479e6f,_0x479e6f),$gameSystem['setEventIconData']($gamePlayer,_0x479e6f[_0x330f8e(0x405)],_0x479e6f[_0x330f8e(0x543)],_0x479e6f[_0x330f8e(0x439)],_0x479e6f[_0x330f8e(0x43d)]);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x20f),_0x52e136=>{VisuMZ['ConvertParams'](_0x52e136,_0x52e136),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x21d116(0x41e)](pluginData['name'],_0x21d116(0x363),_0x5d3642=>{const _0x190310=_0x21d116;VisuMZ[_0x190310(0x526)](_0x5d3642,_0x5d3642);const _0x40618e=$gameTemp['getLastPluginCommandInterpreter']();_0x5d3642[_0x190310(0x4b3)]=_0x5d3642[_0x190310(0x4b3)]||$gameMap[_0x190310(0x2cf)]();const _0x19ed70=[_0x5d3642[_0x190310(0x4b3)],_0x5d3642[_0x190310(0x524)]||_0x40618e[_0x190310(0x36a)](),_0x5d3642[_0x190310(0x45b)]];switch(_0x5d3642['Value']){case'ON':$gameSelfSwitches[_0x190310(0x2a7)](_0x19ed70,!![]);break;case _0x190310(0x1b1):$gameSelfSwitches[_0x190310(0x2a7)](_0x19ed70,![]);break;case _0x190310(0x4bc):$gameSelfSwitches[_0x190310(0x2a7)](_0x19ed70,!$gameSelfSwitches[_0x190310(0x34f)](_0x19ed70));break;}}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x4e7),_0x30be59=>{const _0xe1d10c=_0x21d116;VisuMZ[_0xe1d10c(0x526)](_0x30be59,_0x30be59);const _0x1e7642=$gameTemp[_0xe1d10c(0x32b)]();_0x30be59['MapId']=_0x30be59[_0xe1d10c(0x4b3)]||$gameMap[_0xe1d10c(0x2cf)]();const _0x3463b0=[_0x30be59['MapId'],_0x30be59['EventId']||_0x1e7642['eventId'](),_0xe1d10c(0x4da)[_0xe1d10c(0x3b1)](_0x30be59['SwitchId'])];switch(_0x30be59[_0xe1d10c(0x3b8)]){case'ON':$gameSelfSwitches[_0xe1d10c(0x2a7)](_0x3463b0,!![]);break;case'OFF':$gameSelfSwitches[_0xe1d10c(0x2a7)](_0x3463b0,![]);break;case'Toggle':$gameSelfSwitches[_0xe1d10c(0x2a7)](_0x3463b0,!$gameSelfSwitches['value'](_0x3463b0));break;}}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x3d1),_0x205c26=>{const _0x44a958=_0x21d116;VisuMZ[_0x44a958(0x526)](_0x205c26,_0x205c26);const _0x35a872=$gameTemp[_0x44a958(0x32b)]();_0x205c26[_0x44a958(0x4b3)]=_0x205c26[_0x44a958(0x4b3)]||$gameMap[_0x44a958(0x2cf)]();const _0x369635=[_0x205c26[_0x44a958(0x4b3)],_0x205c26[_0x44a958(0x524)]||_0x35a872[_0x44a958(0x36a)](),'Self\x20Variable\x20%1'['format'](_0x205c26[_0x44a958(0x292)])],_0x399008=VisuMZ[_0x44a958(0x4a5)]($gameSelfSwitches[_0x44a958(0x34f)](_0x369635),_0x205c26['Value'],_0x205c26[_0x44a958(0x31f)]);$gameSelfSwitches['setValue'](_0x369635,_0x399008);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x302),_0x4007a0=>{const _0x35e8b3=_0x21d116;VisuMZ[_0x35e8b3(0x526)](_0x4007a0,_0x4007a0);const _0x3b755a=$gameTemp[_0x35e8b3(0x32b)](),_0x42eee5={'template':_0x4007a0[_0x35e8b3(0x4ba)],'mapId':_0x4007a0['MapId']||$gameMap['mapId'](),'eventId':_0x4007a0['EventId']||_0x3b755a[_0x35e8b3(0x36a)](),'x':_0x4007a0[_0x35e8b3(0x573)],'y':_0x4007a0[_0x35e8b3(0x501)],'spawnPreserved':_0x4007a0[_0x35e8b3(0x221)],'spawnEventId':$gameMap[_0x35e8b3(0x40c)]['length']+0x3e8},_0x296d84=_0x4007a0[_0x35e8b3(0x345)]||0x0,_0x598b7b=$gameMap[_0x35e8b3(0x2d8)](_0x42eee5,_0x4007a0[_0x35e8b3(0x56e)],_0x4007a0[_0x35e8b3(0x1b7)]);_0x296d84&&$gameSwitches[_0x35e8b3(0x2a7)](_0x296d84,!!_0x598b7b);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x314),_0x306ade=>{const _0x386f97=_0x21d116;VisuMZ[_0x386f97(0x526)](_0x306ade,_0x306ade);const _0x8a2978=$gameTemp[_0x386f97(0x32b)](),_0x14dedf={'template':_0x306ade[_0x386f97(0x4ba)],'mapId':_0x306ade['MapId']||$gameMap[_0x386f97(0x2cf)](),'eventId':_0x306ade[_0x386f97(0x524)]||_0x8a2978[_0x386f97(0x36a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x306ade[_0x386f97(0x221)],'spawnEventId':$gameMap['_spawnedEvents']['length']+0x3e8},_0x55771f=_0x306ade[_0x386f97(0x345)]||0x0,_0x3b9782=$gameMap[_0x386f97(0x3e0)](_0x14dedf,_0x306ade[_0x386f97(0x245)],_0x306ade[_0x386f97(0x56e)],_0x306ade[_0x386f97(0x1b7)]);_0x55771f&&$gameSwitches[_0x386f97(0x2a7)](_0x55771f,!!_0x3b9782);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x25e),_0x31be93=>{const _0x4206a8=_0x21d116;VisuMZ['ConvertParams'](_0x31be93,_0x31be93);const _0x5de491=$gameTemp['getLastPluginCommandInterpreter'](),_0x3a8ccf={'template':_0x31be93['TemplateName'],'mapId':_0x31be93[_0x4206a8(0x4b3)]||$gameMap[_0x4206a8(0x2cf)](),'eventId':_0x31be93[_0x4206a8(0x524)]||_0x5de491[_0x4206a8(0x36a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x31be93['Preserve'],'spawnEventId':$gameMap[_0x4206a8(0x40c)][_0x4206a8(0x2de)]+0x3e8},_0x2d79da=_0x31be93['SuccessSwitchId']||0x0,_0x20b824=$gameMap[_0x4206a8(0x3bc)](_0x3a8ccf,_0x31be93[_0x4206a8(0x361)],_0x31be93['Collision'],_0x31be93[_0x4206a8(0x1b7)]);_0x2d79da&&$gameSwitches[_0x4206a8(0x2a7)](_0x2d79da,!!_0x20b824);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],'SpawnEventDespawnEventID',_0x5cd6ca=>{const _0x267cb5=_0x21d116;VisuMZ['ConvertParams'](_0x5cd6ca,_0x5cd6ca);const _0x409ba5=$gameTemp[_0x267cb5(0x32b)]();$gameMap['despawnEventId'](_0x5cd6ca[_0x267cb5(0x3ad)]||_0x409ba5[_0x267cb5(0x36a)]());}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],_0x21d116(0x37f),_0x15f699=>{const _0x1894c1=_0x21d116;VisuMZ[_0x1894c1(0x526)](_0x15f699,_0x15f699);const _0x1af6cf=_0x15f699[_0x1894c1(0x573)],_0x3335fd=_0x15f699[_0x1894c1(0x501)];$gameMap['despawnAtXY'](_0x1af6cf,_0x3335fd);}),PluginManager[_0x21d116(0x41e)](pluginData['name'],_0x21d116(0x432),_0x15dcbe=>{const _0x1298d8=_0x21d116;VisuMZ['ConvertParams'](_0x15dcbe,_0x15dcbe),$gameMap['despawnRegions'](_0x15dcbe[_0x1298d8(0x245)]);}),PluginManager['registerCommand'](pluginData[_0x21d116(0x232)],_0x21d116(0x387),_0x14c431=>{const _0x3d0481=_0x21d116;VisuMZ['ConvertParams'](_0x14c431,_0x14c431),$gameMap['despawnTerrainTags'](_0x14c431[_0x3d0481(0x361)]);}),PluginManager[_0x21d116(0x41e)](pluginData[_0x21d116(0x232)],'SpawnEventDespawnEverything',_0x3f2274=>{const _0x52b713=_0x21d116;VisuMZ[_0x52b713(0x526)](_0x3f2274,_0x3f2274),$gameMap[_0x52b713(0x441)]();}),VisuMZ['EventsMoveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x21d116(0x48c)],Scene_Boot['prototype'][_0x21d116(0x48c)]=function(){const _0x23d528=_0x21d116;VisuMZ[_0x23d528(0x4d7)][_0x23d528(0x1f2)][_0x23d528(0x2b6)](this),this[_0x23d528(0x354)](),this[_0x23d528(0x274)]();if(VisuMZ[_0x23d528(0x4d7)][_0x23d528(0x55d)])VisuMZ[_0x23d528(0x4d7)][_0x23d528(0x55d)][_0x23d528(0x318)]();},VisuMZ[_0x21d116(0x491)]=[],VisuMZ[_0x21d116(0x1d3)]={},Scene_Boot[_0x21d116(0x278)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x4cf3ba=_0x21d116;if(DataManager[_0x4cf3ba(0x3aa)]()||DataManager[_0x4cf3ba(0x19e)]())return;const _0xf74405=VisuMZ[_0x4cf3ba(0x4d7)][_0x4cf3ba(0x1ac)][_0x4cf3ba(0x3ed)],_0x474e08=_0xf74405['PreloadMaps'][_0x4cf3ba(0x2d2)](0x0);for(const _0x298974 of _0xf74405[_0x4cf3ba(0x21b)]){_0x298974[_0x4cf3ba(0x451)]=_0x298974[_0x4cf3ba(0x451)][_0x4cf3ba(0x377)]()['trim'](),VisuMZ['EventTemplates'][_0x298974['Name']]=_0x298974;if(!_0x474e08[_0x4cf3ba(0x2e8)](_0x298974[_0x4cf3ba(0x3fe)]))_0x474e08[_0x4cf3ba(0x457)](_0x298974[_0x4cf3ba(0x3fe)]);}for(const _0x2ea765 of _0x474e08){if(VisuMZ[_0x4cf3ba(0x491)][_0x2ea765])continue;const _0x406c53=_0x4cf3ba(0x3c3)[_0x4cf3ba(0x3b1)](_0x2ea765[_0x4cf3ba(0x3b7)](0x3)),_0xeffac=_0x4cf3ba(0x32c)[_0x4cf3ba(0x3b1)](_0x2ea765);DataManager[_0x4cf3ba(0x349)](_0xeffac,_0x406c53),setTimeout(this[_0x4cf3ba(0x2fa)][_0x4cf3ba(0x537)](this,_0x2ea765,_0xeffac),0x64);}},Scene_Boot['prototype'][_0x21d116(0x2fa)]=function(_0x2240d7,_0x411625){const _0x5682db=_0x21d116;window[_0x411625]?(VisuMZ[_0x5682db(0x491)][_0x2240d7]=window[_0x411625],window[_0x411625]=undefined):setTimeout(this[_0x5682db(0x2fa)]['bind'](this,_0x2240d7,_0x411625),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x21d116(0x2d5)]=[],VisuMZ[_0x21d116(0x376)]=[],VisuMZ['SelfVariables']=[],Scene_Boot['prototype'][_0x21d116(0x274)]=function(){const _0x2990af=_0x21d116;for(let _0x354510=0x1;_0x354510<$dataSystem[_0x2990af(0x3e5)]['length'];_0x354510++){if($dataSystem[_0x2990af(0x3e5)][_0x354510]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2990af(0x230)][_0x2990af(0x457)](_0x354510);if($dataSystem['switches'][_0x354510][_0x2990af(0x34a)](/<SELF>/i))VisuMZ[_0x2990af(0x2d5)][_0x2990af(0x457)](_0x354510);}for(let _0xa13ad2=0x1;_0xa13ad2<$dataSystem['variables']['length'];_0xa13ad2++){if($dataSystem[_0x2990af(0x55e)][_0xa13ad2][_0x2990af(0x34a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2990af(0x376)]['push'](_0xa13ad2);if($dataSystem[_0x2990af(0x55e)][_0xa13ad2][_0x2990af(0x34a)](/<SELF>/i))VisuMZ['SelfVariables'][_0x2990af(0x457)](_0xa13ad2);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x55d)]={},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x55d)][_0x21d116(0x318)]=function(){const _0x2b66f5=_0x21d116;this[_0x2b66f5(0x262)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x55d)][_0x21d116(0x3c2)]=function(){const _0x15aa64=_0x21d116;this[_0x15aa64(0x492)]=[];for(const _0x29ae09 of $dataCommonEvents){if(!_0x29ae09)continue;VisuMZ[_0x15aa64(0x4d7)][_0x15aa64(0x55d)]['loadCPC'](_0x29ae09);if(_0x29ae09['CPC'][_0x15aa64(0x2de)]>0x0)this[_0x15aa64(0x492)][_0x15aa64(0x457)](_0x29ae09['id']);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x55d)][_0x21d116(0x244)]=function(_0x27f6af,_0x38696b){const _0x33adf6=_0x21d116;return this['_interpreter'][_0x33adf6(0x39f)](_0x27f6af,_0x38696b),this['_interpreter'][_0x33adf6(0x26b)](),this[_0x33adf6(0x262)][_0x33adf6(0x41c)];},VisuMZ['EventsMoveCore'][_0x21d116(0x55d)][_0x21d116(0x403)]=function(_0x5aaa95){const _0xa4eba7=_0x21d116;let _0x22e327=![];_0x5aaa95[_0xa4eba7(0x379)]=[];for(const _0x5993f8 of _0x5aaa95[_0xa4eba7(0x1c7)]){if([0x6c,0x198]['includes'](_0x5993f8[_0xa4eba7(0x50d)])){const _0x3b4f10=_0x5993f8[_0xa4eba7(0x286)][0x0];if(_0x3b4f10[_0xa4eba7(0x34a)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x22e327=!![];else _0x3b4f10[_0xa4eba7(0x34a)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x22e327=![]);}_0x22e327&&_0x5aaa95[_0xa4eba7(0x379)][_0xa4eba7(0x457)](_0x5993f8);}},getSelfSwitchValue=function(_0xafc7d0,_0x367e9b,_0x540c0a){const _0xe101ae=_0x21d116;let _0x2a3b5c=[_0xafc7d0,_0x367e9b,_0xe101ae(0x4da)['format'](_0x540c0a)];return typeof _0x540c0a===_0xe101ae(0x3d0)&&(_0x2a3b5c=[_0xafc7d0,_0x367e9b,_0x540c0a['toUpperCase']()[_0xe101ae(0x49c)]()]),$gameSelfSwitches['value'](_0x2a3b5c);},getSelfVariableValue=function(_0x3353e9,_0x2e4bc1,_0x1db0c4){const _0x12c1bc=_0x21d116,_0x16dd14=[_0x3353e9,_0x2e4bc1,_0x12c1bc(0x3a2)['format'](_0x1db0c4)];return $gameSelfSwitches[_0x12c1bc(0x34f)](_0x16dd14);},setSelfSwitchValue=function(_0x2fc7db,_0x3db554,_0x4c6bcc,_0x1f13be){const _0x1bef3d=_0x21d116;let _0x187261=[_0x2fc7db,_0x3db554,_0x1bef3d(0x4da)['format'](_0x4c6bcc)];typeof _0x4c6bcc===_0x1bef3d(0x3d0)&&(_0x187261=[_0x2fc7db,_0x3db554,_0x4c6bcc[_0x1bef3d(0x377)]()[_0x1bef3d(0x49c)]()]);},setSelfVariableValue=function(_0x3a8a44,_0x46219a,_0x3383c6,_0x57816f){const _0x23e370=_0x21d116,_0x25c4d5=[_0x3a8a44,_0x46219a,_0x23e370(0x3a2)[_0x23e370(0x3b1)](_0x3383c6)];},DataManager[_0x21d116(0x313)]=function(_0x4f22f3){const _0x22e107=_0x21d116;if(SceneManager[_0x22e107(0x423)][_0x22e107(0x39e)]===Scene_Debug)return![];return VisuMZ[_0x22e107(0x230)][_0x22e107(0x2e8)](_0x4f22f3);},DataManager['isAdvancedVariable']=function(_0x59be19){const _0x11cedc=_0x21d116;if(SceneManager[_0x11cedc(0x423)][_0x11cedc(0x39e)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables']['includes'](_0x59be19);},DataManager['isSelfSwitch']=function(_0x1b856a){const _0x53d97a=_0x21d116;if(SceneManager[_0x53d97a(0x423)][_0x53d97a(0x39e)]===Scene_Debug)return![];return VisuMZ[_0x53d97a(0x2d5)]['includes'](_0x1b856a);},DataManager[_0x21d116(0x23c)]=function(_0x10741d){const _0xd2fda9=_0x21d116;if(SceneManager['_scene'][_0xd2fda9(0x39e)]===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0xd2fda9(0x2e8)](_0x10741d);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x35a)]=Game_Temp['prototype'][_0x21d116(0x236)],Game_Temp['prototype'][_0x21d116(0x236)]=function(_0xa5e933,_0x280cc3){const _0x22f89a=_0x21d116;if(this[_0x22f89a(0x576)](_0xa5e933,_0x280cc3))return;VisuMZ['EventsMoveCore'][_0x22f89a(0x35a)][_0x22f89a(0x2b6)](this,_0xa5e933,_0x280cc3);},Game_Temp[_0x21d116(0x278)][_0x21d116(0x576)]=function(_0x1b1942,_0x2bf88c){const _0x2ad38d=_0x21d116,_0x5a281=$gameMap[_0x2ad38d(0x409)](_0x1b1942,_0x2bf88c);for(const _0x442b6e of _0x5a281){if(_0x442b6e&&_0x442b6e['hasClickTrigger']())return _0x442b6e[_0x2ad38d(0x3ca)](),!![];}return![];},Game_Temp['prototype'][_0x21d116(0x332)]=function(_0x39944d){this['_lastPluginCommandInterpreter']=_0x39944d;},Game_Temp[_0x21d116(0x278)][_0x21d116(0x32b)]=function(){const _0x2f31b2=_0x21d116;return this[_0x2f31b2(0x541)];},Game_Temp[_0x21d116(0x278)][_0x21d116(0x217)]=function(_0x54e5d3){const _0x1d0dd5=_0x21d116;this[_0x1d0dd5(0x1d7)]=_0x54e5d3;},Game_Temp['prototype'][_0x21d116(0x1e3)]=function(){const _0x503d77=_0x21d116;this[_0x503d77(0x1d7)]=undefined;},Game_Temp['prototype'][_0x21d116(0x2a2)]=function(){return this['_selfTarget'];},VisuMZ[_0x21d116(0x4d7)]['Game_System_initialize']=Game_System[_0x21d116(0x278)][_0x21d116(0x318)],Game_System['prototype'][_0x21d116(0x318)]=function(){const _0x21240c=_0x21d116;VisuMZ[_0x21240c(0x4d7)][_0x21240c(0x44b)][_0x21240c(0x2b6)](this),this[_0x21240c(0x38d)](),this[_0x21240c(0x206)]();},Game_System[_0x21d116(0x278)][_0x21d116(0x38d)]=function(){const _0x39ce9b=_0x21d116;this[_0x39ce9b(0x559)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x39ce9b(0x27a)]={},this['_MapSpawnedEventData']=[],this['_PreservedEventMorphData']={},this[_0x39ce9b(0x3b5)]={},this['_DisablePlayerControl']=![],this[_0x39ce9b(0x4a4)]=_0x39ce9b(0x3c5);},Game_System['prototype'][_0x21d116(0x2a1)]=function(){const _0x70d5b9=_0x21d116;if(this[_0x70d5b9(0x559)]===undefined)this['initEventsMoveCore']();if(this[_0x70d5b9(0x559)][_0x70d5b9(0x2ca)]===undefined)this[_0x70d5b9(0x38d)]();return this[_0x70d5b9(0x559)]['DashingEnable'];},Game_System[_0x21d116(0x278)][_0x21d116(0x53c)]=function(_0x3dd403){const _0x4f3e12=_0x21d116;if(this['_EventsMoveCoreSettings']===undefined)this[_0x4f3e12(0x38d)]();if(this[_0x4f3e12(0x559)]['DashingEnable']===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x4f3e12(0x2ca)]=_0x3dd403;},Game_System[_0x21d116(0x278)][_0x21d116(0x2db)]=function(){const _0xaa56a8=_0x21d116;if(this[_0xaa56a8(0x559)]===undefined)this['initEventsMoveCore']();if(this[_0xaa56a8(0x559)]['EventAutoMovement']===undefined)this[_0xaa56a8(0x38d)]();return this[_0xaa56a8(0x559)]['EventAutoMovement'];},Game_System[_0x21d116(0x278)]['setAllowEventAutoMovement']=function(_0x49e265){const _0x5d6c0d=_0x21d116;if(this[_0x5d6c0d(0x559)]===undefined)this[_0x5d6c0d(0x38d)]();if(this[_0x5d6c0d(0x559)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();this[_0x5d6c0d(0x559)][_0x5d6c0d(0x1e0)]=_0x49e265;},Game_System[_0x21d116(0x278)]['eventLabelsVisible']=function(){const _0x277fbd=_0x21d116;if(this['_EventsMoveCoreSettings']===undefined)this[_0x277fbd(0x38d)]();if(this[_0x277fbd(0x559)][_0x277fbd(0x466)]===undefined)this[_0x277fbd(0x38d)]();return this[_0x277fbd(0x559)][_0x277fbd(0x466)];},Game_System[_0x21d116(0x278)]['setEventLabelsVisible']=function(_0x147b06){const _0x43c593=_0x21d116;if(this[_0x43c593(0x559)]===undefined)this[_0x43c593(0x38d)]();if(this['_EventsMoveCoreSettings'][_0x43c593(0x466)]===undefined)this['initEventsMoveCore']();this[_0x43c593(0x559)][_0x43c593(0x466)]=_0x147b06;},Game_System[_0x21d116(0x278)]['isPlayerControlDisabled']=function(){const _0x40b6ec=_0x21d116;return this[_0x40b6ec(0x28a)]===undefined&&(this['_DisablePlayerControl']=![]),this[_0x40b6ec(0x28a)];},Game_System['prototype']['setPlayerControlDisable']=function(_0x35b239){const _0x3edf2e=_0x21d116;this[_0x3edf2e(0x28a)]=_0x35b239;},Game_System[_0x21d116(0x278)]['getPlayerDiagonalSetting']=function(){const _0x2c5cf0=_0x21d116;return this[_0x2c5cf0(0x4a4)];},Game_System[_0x21d116(0x278)][_0x21d116(0x2e5)]=function(_0x37de3a){const _0x102bdf=_0x21d116;this['_PlayerDiagonalSetting']=String(_0x37de3a)[_0x102bdf(0x518)]()[_0x102bdf(0x49c)]();},Game_System[_0x21d116(0x278)]['getEventIconData']=function(_0x575f82){const _0x5c3c85=_0x21d116;if(this[_0x5c3c85(0x27a)]===undefined)this['initEventsMoveCore']();if(!_0x575f82)return null;if(_0x575f82===$gamePlayer)return this[_0x5c3c85(0x27a)][_0x5c3c85(0x508)];else{const _0xb8a7a0=VisuMZ['EventsMoveCore'][_0x5c3c85(0x1ac)],_0x4f943e=_0x5c3c85(0x31e)[_0x5c3c85(0x3b1)](_0x575f82[_0x5c3c85(0x2ce)],_0x575f82['_eventId']);return this[_0x5c3c85(0x27a)][_0x4f943e]=this['_EventIcons'][_0x4f943e]||{'iconIndex':0x0,'bufferX':_0xb8a7a0[_0x5c3c85(0x1ea)][_0x5c3c85(0x44d)],'bufferY':_0xb8a7a0['Icon'][_0x5c3c85(0x3b0)],'blendMode':_0xb8a7a0[_0x5c3c85(0x1ea)][_0x5c3c85(0x39c)]},this[_0x5c3c85(0x27a)][_0x4f943e];}},Game_System['prototype'][_0x21d116(0x4ae)]=function(_0xa8b6d6,_0x13cf79,_0x47c6a2,_0x8ae871,_0x113eeb){const _0x3ad69a=_0x21d116;if(this['_EventIcons']===undefined)this[_0x3ad69a(0x38d)]();const _0x35d3f2=_0xa8b6d6===$gamePlayer?_0x3ad69a(0x508):_0x3ad69a(0x31e)[_0x3ad69a(0x3b1)](_0xa8b6d6[_0x3ad69a(0x2ce)],_0xa8b6d6['_eventId']);this[_0x3ad69a(0x27a)][_0x35d3f2]={'iconIndex':_0x13cf79,'bufferX':_0x47c6a2,'bufferY':_0x8ae871,'blendMode':_0x113eeb};},Game_System[_0x21d116(0x278)][_0x21d116(0x26f)]=function(_0x4b500a,_0x2a2eaa,_0x444273,_0x1a0d19,_0x3058e4,_0x55194f){const _0x33d05b=_0x21d116;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x598eb1=_0x33d05b(0x31e)['format'](_0x4b500a,_0x2a2eaa);this[_0x33d05b(0x27a)][_0x598eb1]={'iconIndex':_0x444273,'bufferX':_0x1a0d19,'bufferY':_0x3058e4,'blendMode':_0x55194f};},Game_System[_0x21d116(0x278)][_0x21d116(0x277)]=function(_0x54eeab){const _0x3691f2=_0x21d116;if(this[_0x3691f2(0x27a)]===undefined)this[_0x3691f2(0x38d)]();if(!_0x54eeab)return null;_0x54eeab===$gamePlayer?delete this[_0x3691f2(0x27a)][_0x3691f2(0x508)]:this['deleteIconsOnEventsDataKey'](_0x54eeab[_0x3691f2(0x2ce)],_0x54eeab[_0x3691f2(0x3db)]);},Game_System[_0x21d116(0x278)]['deleteIconsOnEventsDataKey']=function(_0x5ad587,_0x3cacb0){const _0x5deb83=_0x21d116;if(this['_EventIcons']===undefined)this[_0x5deb83(0x38d)]();const _0x178acf=_0x5deb83(0x31e)[_0x5deb83(0x3b1)](_0x5ad587,_0x3cacb0);delete this['_EventIcons'][_0x178acf];},Game_System[_0x21d116(0x278)][_0x21d116(0x317)]=function(_0x4786fc){const _0x25ef0b=_0x21d116;if(this[_0x25ef0b(0x3b5)]===undefined)this['initEventsMoveCore']();if(!_0x4786fc)return null;const _0x1ac065=_0x25ef0b(0x31e)[_0x25ef0b(0x3b1)](_0x4786fc[_0x25ef0b(0x2ce)],_0x4786fc[_0x25ef0b(0x3db)]);return this[_0x25ef0b(0x3b5)][_0x1ac065];},Game_System['prototype'][_0x21d116(0x30b)]=function(_0x4bfda9){const _0x44f72a=_0x21d116;if(this[_0x44f72a(0x3b5)]===undefined)this['initEventsMoveCore']();if(!_0x4bfda9)return;const _0x35898d='Map%1-Event%2'[_0x44f72a(0x3b1)](_0x4bfda9['_mapId'],_0x4bfda9[_0x44f72a(0x3db)]);this[_0x44f72a(0x3b5)][_0x35898d]={'direction':_0x4bfda9['direction'](),'x':Math[_0x44f72a(0x222)](_0x4bfda9['x']),'y':Math[_0x44f72a(0x222)](_0x4bfda9['y']),'pageIndex':_0x4bfda9[_0x44f72a(0x4b9)],'moveRouteIndex':_0x4bfda9[_0x44f72a(0x564)]};},Game_System[_0x21d116(0x278)][_0x21d116(0x211)]=function(_0x4a1754){if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x4a1754)return;this['deleteSavedEventLocationKey'](_0x4a1754['_mapId'],_0x4a1754['_eventId']);},Game_System['prototype'][_0x21d116(0x2eb)]=function(_0x25cfdc,_0x4413e9){const _0x1166da=_0x21d116;if(this[_0x1166da(0x3b5)]===undefined)this[_0x1166da(0x38d)]();const _0x2d3b7c=_0x1166da(0x31e)[_0x1166da(0x3b1)](_0x25cfdc,_0x4413e9);delete this[_0x1166da(0x3b5)][_0x2d3b7c];},Game_System['prototype'][_0x21d116(0x42c)]=function(_0x4476f4,_0x18fc84,_0x59c2aa,_0x3425c2,_0x3aa644,_0x44fc0d,_0x26b0a9){const _0x2b85a5=_0x21d116;if(this[_0x2b85a5(0x3b5)]===undefined)this['initEventsMoveCore']();const _0x544901='Map%1-Event%2'['format'](_0x4476f4,_0x18fc84);this[_0x2b85a5(0x3b5)][_0x544901]={'direction':_0x3aa644,'x':Math[_0x2b85a5(0x222)](_0x59c2aa),'y':Math['round'](_0x3425c2),'pageIndex':_0x44fc0d,'moveRouteIndex':_0x26b0a9};},Game_System[_0x21d116(0x278)][_0x21d116(0x414)]=function(_0x41dc44){const _0x2e74b3=_0x21d116;if(this[_0x2e74b3(0x27f)]===undefined)this[_0x2e74b3(0x38d)]();if(!_0x41dc44)return;const _0x3ead87=_0x2e74b3(0x31e)[_0x2e74b3(0x3b1)](_0x41dc44[_0x2e74b3(0x2ce)],_0x41dc44[_0x2e74b3(0x3db)]);return this[_0x2e74b3(0x27f)][_0x3ead87];},Game_System[_0x21d116(0x278)][_0x21d116(0x311)]=function(_0x19b5de,_0xc0a386,_0x23c7b3,_0x157ffd,_0x9454cc){const _0x340a33=_0x21d116;if(this[_0x340a33(0x27f)]===undefined)this[_0x340a33(0x38d)]();const _0x19f8db=_0x340a33(0x31e)[_0x340a33(0x3b1)](_0x19b5de,_0xc0a386);this['_PreservedEventMorphData'][_0x19f8db]={'template':_0x23c7b3,'mapId':_0x157ffd,'eventId':_0x9454cc};},Game_System[_0x21d116(0x278)]['deletePreservedMorphEventDataKey']=function(_0x450ad1,_0x41b9da){const _0xea7ced=_0x21d116;if(this[_0xea7ced(0x27f)]===undefined)this[_0xea7ced(0x38d)]();const _0x321c37=_0xea7ced(0x31e)[_0xea7ced(0x3b1)](_0x450ad1,_0x41b9da);delete this[_0xea7ced(0x27f)][_0x321c37];},Game_System[_0x21d116(0x278)][_0x21d116(0x29e)]=function(_0x2699d5){const _0x3295b7=_0x21d116;if(this[_0x3295b7(0x2b2)]===undefined)this[_0x3295b7(0x38d)]();return this[_0x3295b7(0x2b2)][_0x2699d5]=this[_0x3295b7(0x2b2)][_0x2699d5]||[],this['_MapSpawnedEventData'][_0x2699d5];},Game_System[_0x21d116(0x278)][_0x21d116(0x40a)]=function(_0x24e59b){const _0x42ee55=_0x21d116,_0x5deb33=this['getMapSpawnedEventData'](_0x24e59b);for(const _0x4520dc of _0x5deb33){if(!_0x4520dc)continue;if(_0x4520dc[_0x42ee55(0x330)])continue;const _0x485c83=_0x5deb33[_0x42ee55(0x343)](_0x4520dc);_0x5deb33[_0x485c83]=null;}},Game_System[_0x21d116(0x278)][_0x21d116(0x206)]=function(){const _0x20d1fe=_0x21d116;this[_0x20d1fe(0x2cb)]=0x0,this[_0x20d1fe(0x257)]=![];},Game_System[_0x21d116(0x278)]['getControlledFollowerID']=function(){const _0x5cedb0=_0x21d116;if(this[_0x5cedb0(0x2cb)]===undefined)this['initFollowerController']();return this[_0x5cedb0(0x2cb)];},Game_System[_0x21d116(0x278)][_0x21d116(0x38c)]=function(_0x5b7e50){const _0x231583=_0x21d116;if(this[_0x231583(0x2cb)]===undefined)this['initFollowerController']();this['_followerControlID']=_0x5b7e50;;},VisuMZ['EventsMoveCore'][_0x21d116(0x2f2)]=Game_Interpreter[_0x21d116(0x278)][_0x21d116(0x356)],Game_Interpreter[_0x21d116(0x278)]['character']=function(_0x4feebd){const _0x260f64=_0x21d116;if(!$gameParty[_0x260f64(0x212)]()&&_0x4feebd<0x0){let _0x104c33=$gameSystem[_0x260f64(0x421)]();if(_0x104c33>0x0)return $gamePlayer['followers']()[_0x260f64(0x430)](_0x104c33-0x1);}return VisuMZ['EventsMoveCore'][_0x260f64(0x2f2)][_0x260f64(0x2b6)](this,_0x4feebd);},Game_System[_0x21d116(0x278)][_0x21d116(0x36b)]=function(){const _0x5cb1b6=_0x21d116;if(this[_0x5cb1b6(0x257)]===undefined)this[_0x5cb1b6(0x206)]();return this[_0x5cb1b6(0x257)];},Game_System[_0x21d116(0x278)][_0x21d116(0x4bb)]=function(_0x43e9bf){const _0x1ad8cc=_0x21d116;if(this[_0x1ad8cc(0x257)]===undefined)this['initFollowerController']();this[_0x1ad8cc(0x257)]=_0x43e9bf;;},VisuMZ['EventsMoveCore'][_0x21d116(0x3a7)]=Game_Timer['prototype'][_0x21d116(0x318)],Game_Timer[_0x21d116(0x278)][_0x21d116(0x318)]=function(){const _0x52f09d=_0x21d116;VisuMZ[_0x52f09d(0x4d7)]['Game_Timer_initialize']['call'](this),this[_0x52f09d(0x38d)]();},Game_Timer[_0x21d116(0x278)]['initEventsMoveCore']=function(){const _0x120c8b=_0x21d116;this['_paused']=![],this[_0x120c8b(0x235)]=-0x1,this[_0x120c8b(0x3d2)]=0x0;},Game_Timer[_0x21d116(0x278)][_0x21d116(0x3c7)]=function(_0x3cc7dd){const _0x3803c2=_0x21d116;if(!_0x3cc7dd)return;if(!this[_0x3803c2(0x2f6)])return;if(this[_0x3803c2(0x2c5)])return;if(this['_frames']<=0x0)return;if(this[_0x3803c2(0x235)]===undefined)this[_0x3803c2(0x38d)]();this['_frames']+=this[_0x3803c2(0x235)],this[_0x3803c2(0x2c9)]<=0x0&&this[_0x3803c2(0x42a)]();},VisuMZ['EventsMoveCore']['Game_Timer_start']=Game_Timer[_0x21d116(0x278)][_0x21d116(0x46b)],Game_Timer['prototype'][_0x21d116(0x46b)]=function(_0x52422f){const _0x571e43=_0x21d116;VisuMZ[_0x571e43(0x4d7)][_0x571e43(0x4a7)][_0x571e43(0x2b6)](this,_0x52422f);if(this['_paused']===undefined)this[_0x571e43(0x38d)]();this[_0x571e43(0x2c5)]=![];},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x402)]=Game_Timer[_0x21d116(0x278)][_0x21d116(0x316)],Game_Timer[_0x21d116(0x278)][_0x21d116(0x316)]=function(){const _0x5ad030=_0x21d116;VisuMZ[_0x5ad030(0x4d7)][_0x5ad030(0x402)][_0x5ad030(0x2b6)](this);if(this[_0x5ad030(0x2c5)]===undefined)this[_0x5ad030(0x38d)]();this['_paused']=![];},Game_Timer[_0x21d116(0x278)][_0x21d116(0x3f0)]=function(){const _0x44f07a=_0x21d116;if(this[_0x44f07a(0x2c9)]<=0x0)return;this[_0x44f07a(0x2c5)]=!![],this[_0x44f07a(0x2f6)]=!![];},Game_Timer[_0x21d116(0x278)]['resume']=function(){const _0x29b8ce=_0x21d116;if(this['_frames']<=0x0)return;this[_0x29b8ce(0x2c5)]=![],this[_0x29b8ce(0x2f6)]=!![];},Game_Timer[_0x21d116(0x278)]['gainFrames']=function(_0x587f6e){const _0x250d6e=_0x21d116;this[_0x250d6e(0x2c9)]=this['_frames']||0x0,this[_0x250d6e(0x2c9)]+=_0x587f6e,this[_0x250d6e(0x2f6)]=!![],this[_0x250d6e(0x2c9)]=Math['max'](0x1,this[_0x250d6e(0x2c9)]);},Game_Timer[_0x21d116(0x278)]['setFrames']=function(_0x44c704){const _0x3a21f0=_0x21d116;this[_0x3a21f0(0x2c9)]=this[_0x3a21f0(0x2c9)]||0x0,this[_0x3a21f0(0x2c9)]=_0x44c704,this[_0x3a21f0(0x2f6)]=!![],this[_0x3a21f0(0x2c9)]=Math[_0x3a21f0(0x547)](0x1,this[_0x3a21f0(0x2c9)]);},Game_Timer[_0x21d116(0x278)]['changeSpeed']=function(_0x4d6e39){const _0x50bd63=_0x21d116;this['_speed']=_0x4d6e39,this[_0x50bd63(0x2f6)]=!![],_0x4d6e39>0x0&&(this[_0x50bd63(0x2c9)]=Math[_0x50bd63(0x547)](this[_0x50bd63(0x2c9)],0x1));},Game_Timer[_0x21d116(0x278)]['setCommonEvent']=function(_0x3680d2){const _0x49490f=_0x21d116;if(this['_expireCommonEvent']===undefined)this[_0x49490f(0x38d)]();this['_expireCommonEvent']=_0x3680d2;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x549)]=Game_Timer[_0x21d116(0x278)][_0x21d116(0x42a)],Game_Timer[_0x21d116(0x278)][_0x21d116(0x42a)]=function(){const _0x19e3e0=_0x21d116;if(this[_0x19e3e0(0x3d2)]===undefined)this['initEventsMoveCore']();this[_0x19e3e0(0x3d2)]?$gameTemp[_0x19e3e0(0x27e)](this['_expireCommonEvent']):VisuMZ[_0x19e3e0(0x4d7)][_0x19e3e0(0x549)][_0x19e3e0(0x2b6)](this);},VisuMZ['EventsMoveCore'][_0x21d116(0x1ee)]=Game_Message[_0x21d116(0x278)][_0x21d116(0x296)],Game_Message[_0x21d116(0x278)][_0x21d116(0x296)]=function(_0x72ea70){const _0x4e732e=_0x21d116;VisuMZ['EventsMoveCore'][_0x4e732e(0x1ee)]['call'](this,_0x72ea70),this['_selfEvent']=$gameTemp[_0x4e732e(0x2a2)]();},Game_Message['prototype']['registerSelfEvent']=function(){const _0x2a246c=_0x21d116;$gameTemp['registerSelfTarget'](this[_0x2a246c(0x24b)]);},VisuMZ['EventsMoveCore'][_0x21d116(0x28c)]=Game_Switches[_0x21d116(0x278)]['value'],Game_Switches[_0x21d116(0x278)]['value']=function(_0x42d1b0){const _0x370fb4=_0x21d116;if(DataManager['isAdvancedSwitch'](_0x42d1b0))return!!this['advancedValue'](_0x42d1b0);else return DataManager[_0x370fb4(0x1fb)](_0x42d1b0)?!!this[_0x370fb4(0x374)](_0x42d1b0):VisuMZ[_0x370fb4(0x4d7)][_0x370fb4(0x28c)]['call'](this,_0x42d1b0);},Game_Switches[_0x21d116(0x31c)]={},Game_Switches[_0x21d116(0x278)]['advancedValue']=function(_0x40e14a){const _0x29c0fc=_0x21d116;if(!Game_Switches[_0x29c0fc(0x31c)][_0x40e14a]){$dataSystem[_0x29c0fc(0x3e5)][_0x40e14a][_0x29c0fc(0x34a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1656f4=_0x29c0fc(0x487)['format'](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x40e14a]=new Function(_0x29c0fc(0x3da),_0x1656f4);}const _0x4e8011=$gameTemp[_0x29c0fc(0x2a2)]()||this;return Game_Switches['advancedFunc'][_0x40e14a][_0x29c0fc(0x2b6)](_0x4e8011,_0x40e14a);},Game_Switches[_0x21d116(0x278)][_0x21d116(0x374)]=function(_0x17d1e4){const _0x58b5a6=_0x21d116,_0x4d54f6=$gameTemp['getSelfTarget']()||this;if(_0x4d54f6['constructor']!==Game_Event)return VisuMZ[_0x58b5a6(0x4d7)]['Game_Switches_value'][_0x58b5a6(0x2b6)](this,_0x17d1e4);else{const _0x5e7549=[_0x4d54f6['_mapId'],_0x4d54f6['_eventId'],'Self\x20Switch\x20%1'[_0x58b5a6(0x3b1)](_0x17d1e4)];return $gameSelfSwitches[_0x58b5a6(0x34f)](_0x5e7549);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x24c)]=Game_Switches[_0x21d116(0x278)][_0x21d116(0x2a7)],Game_Switches[_0x21d116(0x278)][_0x21d116(0x2a7)]=function(_0x480381,_0x3b12ed){const _0x38cbe1=_0x21d116;DataManager['isSelfSwitch'](_0x480381)?this['setSelfValue'](_0x480381,_0x3b12ed):VisuMZ['EventsMoveCore']['Game_Switches_setValue'][_0x38cbe1(0x2b6)](this,_0x480381,_0x3b12ed);},Game_Switches[_0x21d116(0x278)][_0x21d116(0x1df)]=function(_0x3d8d57,_0x1c79b7){const _0xe9e81b=_0x21d116,_0x5937a1=$gameTemp[_0xe9e81b(0x2a2)]()||this;if(_0x5937a1['constructor']!==Game_Event)VisuMZ[_0xe9e81b(0x4d7)][_0xe9e81b(0x24c)]['call'](this,_0x3d8d57,_0x1c79b7);else{const _0xd8b8d0=[_0x5937a1[_0xe9e81b(0x2ce)],_0x5937a1['_eventId'],_0xe9e81b(0x4da)[_0xe9e81b(0x3b1)](_0x3d8d57)];$gameSelfSwitches['setValue'](_0xd8b8d0,_0x1c79b7);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x373)]=Game_Variables['prototype']['value'],Game_Variables[_0x21d116(0x278)][_0x21d116(0x34f)]=function(_0x12b696){const _0x2feed5=_0x21d116;if(DataManager['isAdvancedVariable'](_0x12b696))return this[_0x2feed5(0x285)](_0x12b696);else return DataManager[_0x2feed5(0x23c)](_0x12b696)?this[_0x2feed5(0x374)](_0x12b696):VisuMZ[_0x2feed5(0x4d7)][_0x2feed5(0x373)][_0x2feed5(0x2b6)](this,_0x12b696);},Game_Variables[_0x21d116(0x31c)]={},Game_Variables['prototype']['advancedValue']=function(_0x390405){const _0x301e3a=_0x21d116;if(!Game_Variables[_0x301e3a(0x31c)][_0x390405]){$dataSystem[_0x301e3a(0x55e)][_0x390405][_0x301e3a(0x34a)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3a0f8b=_0x301e3a(0x487)[_0x301e3a(0x3b1)](String(RegExp['$1']));Game_Variables[_0x301e3a(0x31c)][_0x390405]=new Function(_0x301e3a(0x37d),_0x3a0f8b);}const _0x574c9e=$gameTemp[_0x301e3a(0x2a2)]()||this;return Game_Variables[_0x301e3a(0x31c)][_0x390405][_0x301e3a(0x2b6)](_0x574c9e,_0x390405);},Game_Variables[_0x21d116(0x278)][_0x21d116(0x374)]=function(_0x509349){const _0x40a061=_0x21d116,_0x3d263d=$gameTemp[_0x40a061(0x2a2)]()||this;if(_0x3d263d[_0x40a061(0x39e)]!==Game_Event)return VisuMZ[_0x40a061(0x4d7)]['Game_Variables_value'][_0x40a061(0x2b6)](this,_0x509349);else{const _0x3df082=[_0x3d263d[_0x40a061(0x2ce)],_0x3d263d['_eventId'],_0x40a061(0x3a2)['format'](_0x509349)];return $gameSelfSwitches[_0x40a061(0x34f)](_0x3df082);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x2c2)]=Game_Variables[_0x21d116(0x278)]['setValue'],Game_Variables[_0x21d116(0x278)][_0x21d116(0x2a7)]=function(_0x42a2e4,_0x5408e6){const _0x41aec9=_0x21d116;DataManager['isSelfVariable'](_0x42a2e4)?this['setSelfValue'](_0x42a2e4,_0x5408e6):VisuMZ['EventsMoveCore']['Game_Variables_setValue'][_0x41aec9(0x2b6)](this,_0x42a2e4,_0x5408e6);},Game_Variables[_0x21d116(0x278)][_0x21d116(0x1df)]=function(_0x3610e1,_0x523206){const _0x308fe9=_0x21d116,_0x27c4bf=$gameTemp[_0x308fe9(0x2a2)]()||this;if(_0x27c4bf[_0x308fe9(0x39e)]!==Game_Event)VisuMZ[_0x308fe9(0x4d7)]['Game_Variables_setValue'][_0x308fe9(0x2b6)](this,_0x3610e1,_0x523206);else{const _0x26734c=[_0x27c4bf[_0x308fe9(0x2ce)],_0x27c4bf[_0x308fe9(0x3db)],_0x308fe9(0x3a2)[_0x308fe9(0x3b1)](_0x3610e1)];$gameSelfSwitches['setValue'](_0x26734c,_0x523206);}},VisuMZ[_0x21d116(0x4d7)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x21d116(0x278)]['value'],Game_SelfSwitches[_0x21d116(0x278)][_0x21d116(0x34f)]=function(_0x14b6d8){const _0x3622dc=_0x21d116;if(_0x14b6d8[0x2][_0x3622dc(0x34a)](/SELF/i))return this['selfValue'](_0x14b6d8);else{return VisuMZ[_0x3622dc(0x4d7)][_0x3622dc(0x1cd)]['call'](this,_0x14b6d8);;}},Game_SelfSwitches[_0x21d116(0x278)]['selfValue']=function(_0x5ea99a){const _0x434410=_0x21d116;return _0x5ea99a[0x2][_0x434410(0x34a)](/VAR/i)?this['_data'][_0x5ea99a]||0x0:!!this[_0x434410(0x520)][_0x5ea99a];},VisuMZ[_0x21d116(0x4d7)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x21d116(0x278)][_0x21d116(0x2a7)],Game_SelfSwitches['prototype'][_0x21d116(0x2a7)]=function(_0x50cf33,_0x3203fd){const _0x2ee5c4=_0x21d116;_0x50cf33[0x2][_0x2ee5c4(0x34a)](/SELF/i)?this[_0x2ee5c4(0x1df)](_0x50cf33,_0x3203fd):VisuMZ[_0x2ee5c4(0x4d7)][_0x2ee5c4(0x468)][_0x2ee5c4(0x2b6)](this,_0x50cf33,_0x3203fd);},Game_SelfSwitches[_0x21d116(0x278)][_0x21d116(0x1df)]=function(_0x3dc72d,_0x4b5f97){this['_data'][_0x3dc72d]=_0x3dc72d[0x2]['match'](/VAR/i)?_0x4b5f97:!!_0x4b5f97,this['onChange']();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x1bb)]=Game_Enemy[_0x21d116(0x278)][_0x21d116(0x273)],Game_Enemy[_0x21d116(0x278)][_0x21d116(0x273)]=function(_0x51ffb9){const _0x402bc9=_0x21d116;$gameTemp[_0x402bc9(0x217)](this);const _0xf2e7d3=VisuMZ[_0x402bc9(0x4d7)][_0x402bc9(0x1bb)]['call'](this,_0x51ffb9);return $gameTemp[_0x402bc9(0x1e3)](),_0xf2e7d3;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x3d4)]=Game_Troop['prototype'][_0x21d116(0x312)],Game_Troop[_0x21d116(0x278)][_0x21d116(0x312)]=function(_0x35f302){const _0x549c50=_0x21d116;$gameTemp[_0x549c50(0x217)](this);const _0x5b21e1=VisuMZ['EventsMoveCore'][_0x549c50(0x3d4)][_0x549c50(0x2b6)](this,_0x35f302);return $gameTemp[_0x549c50(0x1e3)](),_0x5b21e1;},VisuMZ[_0x21d116(0x4d7)]['Game_Map_setup']=Game_Map[_0x21d116(0x278)][_0x21d116(0x39f)],Game_Map[_0x21d116(0x278)]['setup']=function(_0x5495a5){const _0x1f58c0=_0x21d116;this[_0x1f58c0(0x40a)](_0x5495a5),this[_0x1f58c0(0x38e)](),VisuMZ[_0x1f58c0(0x4d7)][_0x1f58c0(0x20a)][_0x1f58c0(0x2b6)](this,_0x5495a5),this[_0x1f58c0(0x38e)](),this[_0x1f58c0(0x1a4)](),this[_0x1f58c0(0x2e2)](),this[_0x1f58c0(0x4dc)](),this[_0x1f58c0(0x35b)](),this[_0x1f58c0(0x38e)]();},VisuMZ['EventsMoveCore'][_0x21d116(0x1ae)]=Game_Map[_0x21d116(0x278)][_0x21d116(0x250)],Game_Map[_0x21d116(0x278)][_0x21d116(0x250)]=function(){const _0x13eb1a=_0x21d116;VisuMZ[_0x13eb1a(0x4d7)]['Game_Map_setupEvents'][_0x13eb1a(0x2b6)](this),this[_0x13eb1a(0x2d4)]();},Game_Map[_0x21d116(0x4b4)]=0xc8,Game_Map[_0x21d116(0x278)][_0x21d116(0x464)]=function(){const _0x3e2f50=_0x21d116,_0x40342d=Game_Map[_0x3e2f50(0x4b4)];this[_0x3e2f50(0x2fc)]=this[_0x3e2f50(0x550)]()[_0x3e2f50(0x2de)]>_0x40342d;if(this[_0x3e2f50(0x2fc)]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x21d116(0x278)][_0x21d116(0x36c)]=function(){const _0x3e3b2f=_0x21d116;return this[_0x3e3b2f(0x2fc)];},Game_Map[_0x21d116(0x278)][_0x21d116(0x38e)]=function(){this['_eventCache']=undefined;},Game_Map[_0x21d116(0x278)][_0x21d116(0x1a4)]=function(){const _0xa7a24e=_0x21d116;this[_0xa7a24e(0x1f4)]=VisuMZ[_0xa7a24e(0x4d7)][_0xa7a24e(0x1ac)][_0xa7a24e(0x1be)][_0xa7a24e(0x1e1)];const _0x4ffece=$dataMap[_0xa7a24e(0x482)]||'';if(_0x4ffece[_0xa7a24e(0x34a)](/<DIAGONAL MOVEMENT: ON>/i))this[_0xa7a24e(0x1f4)]=!![];else _0x4ffece['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0xa7a24e(0x1f4)]=![]);},Game_Map[_0x21d116(0x278)]['isSupportDiagonalMovement']=function(){const _0x30aa19=_0x21d116,_0x2541b3=$gameSystem[_0x30aa19(0x207)]();if(_0x2541b3===_0x30aa19(0x3e4))return!![];if(_0x2541b3===_0x30aa19(0x295))return![];if(this[_0x30aa19(0x1f4)]===undefined)this[_0x30aa19(0x1a4)]();return this[_0x30aa19(0x1f4)];},Game_Map[_0x21d116(0x278)][_0x21d116(0x469)]=function(_0x418bde,_0x1adf22){const _0x528948=_0x21d116;if([0x1,0x4,0x7][_0x528948(0x2e8)](_0x1adf22))_0x418bde-=0x1;if([0x3,0x6,0x9][_0x528948(0x2e8)](_0x1adf22))_0x418bde+=0x1;return this[_0x528948(0x224)](_0x418bde);},Game_Map[_0x21d116(0x278)][_0x21d116(0x4fc)]=function(_0x51a200,_0x35fa89){const _0x1dae35=_0x21d116;if([0x1,0x2,0x3][_0x1dae35(0x2e8)](_0x35fa89))_0x51a200+=0x1;if([0x7,0x8,0x9][_0x1dae35(0x2e8)](_0x35fa89))_0x51a200-=0x1;return this[_0x1dae35(0x4bf)](_0x51a200);},Game_Map[_0x21d116(0x278)][_0x21d116(0x53a)]=function(_0x507fa7,_0x502cc7,_0x2e1223,_0x1f7bb4){const _0xdd3b09=_0x21d116;return Math[_0xdd3b09(0x547)](Math[_0xdd3b09(0x435)](this[_0xdd3b09(0x1ab)](_0x507fa7,_0x2e1223)),Math[_0xdd3b09(0x435)](this[_0xdd3b09(0x1fe)](_0x502cc7,_0x1f7bb4)));},Game_Map[_0x21d116(0x278)][_0x21d116(0x2e2)]=function(){const _0x492aa2=_0x21d116,_0x1e4877=VisuMZ['EventsMoveCore'][_0x492aa2(0x1ac)][_0x492aa2(0x245)],_0x225352={},_0x65eb56=[_0x492aa2(0x1c4),_0x492aa2(0x566),'Dock'],_0x3fd20a=['All',_0x492aa2(0x31a),_0x492aa2(0x508),_0x492aa2(0x350),_0x492aa2(0x45c),_0x492aa2(0x37e),_0x492aa2(0x32d),_0x492aa2(0x467)];for(const _0x40b297 of _0x65eb56){for(const _0x345d20 of _0x3fd20a){const _0x4112e0=_0x492aa2(0x556)['format'](_0x345d20,_0x40b297);_0x1e4877[_0x4112e0]&&(_0x225352[_0x4112e0]=_0x1e4877[_0x4112e0][_0x492aa2(0x2d2)](0x0));}}const _0x1fc020=$dataMap['note']||'',_0x3778d3=_0x1fc020['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x3778d3)for(const _0x37fc44 of _0x3778d3){_0x37fc44['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3c8282=String(RegExp['$1'])[_0x492aa2(0x518)]()['trim'](),_0xbf943b=String(RegExp['$2'])[_0x492aa2(0x518)]()['trim']();const _0x42abd3=JSON[_0x492aa2(0x20c)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x3c8282=_0x3c8282[_0x492aa2(0x412)](0x0)[_0x492aa2(0x377)]()+_0x3c8282[_0x492aa2(0x2d2)](0x1),_0xbf943b=_0xbf943b['charAt'](0x0)[_0x492aa2(0x377)]()+_0xbf943b[_0x492aa2(0x2d2)](0x1);const _0x9f1005='%1%2'[_0x492aa2(0x3b1)](_0x3c8282,_0xbf943b);if(_0x225352[_0x9f1005])_0x225352[_0x9f1005]=_0x225352[_0x9f1005][_0x492aa2(0x3f8)](_0x42abd3);}this[_0x492aa2(0x56f)]=_0x225352;},Game_Map[_0x21d116(0x278)][_0x21d116(0x1c3)]=function(_0xd21391,_0x3c25b9,_0x2170ec,_0x15f7e2){const _0xdc2d89=_0x21d116,_0x3ca7e0=this[_0xdc2d89(0x469)](_0xd21391,_0x2170ec),_0x1f6f5b=this[_0xdc2d89(0x4fc)](_0x3c25b9,_0x2170ec),_0x5841ce=this[_0xdc2d89(0x56b)](_0x3ca7e0,_0x1f6f5b),_0x465d9e=this['_regionRules'];if(_0x465d9e[_0xdc2d89(0x2cc)][_0xdc2d89(0x2e8)](_0x5841ce))return!![];else{if(_0x15f7e2===_0xdc2d89(0x4ac))return _0x465d9e['PlayerAllow'][_0xdc2d89(0x2e8)](_0x5841ce)||_0x465d9e[_0xdc2d89(0x1bf)][_0xdc2d89(0x2e8)](_0x5841ce);else{if(_0x15f7e2===_0xdc2d89(0x25f))return _0x465d9e['EventAllow'][_0xdc2d89(0x2e8)](_0x5841ce)||_0x465d9e[_0xdc2d89(0x1bf)][_0xdc2d89(0x2e8)](_0x5841ce);else{if(_0x465d9e[_0xdc2d89(0x568)][_0xdc2d89(0x2e8)](_0x5841ce))return!![];else{const _0x31a221=_0xdc2d89(0x40e)[_0xdc2d89(0x3b1)](_0x15f7e2[_0xdc2d89(0x412)](0x0)[_0xdc2d89(0x377)]()+_0x15f7e2[_0xdc2d89(0x2d2)](0x1));if(_0x465d9e[_0x31a221])return _0x465d9e[_0x31a221][_0xdc2d89(0x2e8)](_0x5841ce);}}}}return![];},Game_Map['prototype']['isRegionForbidPass']=function(_0x588f65,_0x13b5fe,_0x4ba803,_0x3e4626){const _0x267d38=_0x21d116,_0x4453fb=this['roundXWithDirection'](_0x588f65,_0x4ba803),_0x1a2f77=this[_0x267d38(0x4fc)](_0x13b5fe,_0x4ba803),_0x32ad80=this[_0x267d38(0x56b)](_0x4453fb,_0x1a2f77),_0x453504=this[_0x267d38(0x56f)];if(_0x453504[_0x267d38(0x476)][_0x267d38(0x2e8)](_0x32ad80))return!![];else{if(_0x3e4626===_0x267d38(0x4ac))return _0x453504[_0x267d38(0x53b)][_0x267d38(0x2e8)](_0x32ad80)||_0x453504[_0x267d38(0x488)][_0x267d38(0x2e8)](_0x32ad80);else{if(_0x3e4626===_0x267d38(0x25f))return _0x453504[_0x267d38(0x51a)]['includes'](_0x32ad80)||_0x453504['WalkForbid'][_0x267d38(0x2e8)](_0x32ad80);else{if(_0x453504[_0x267d38(0x33a)][_0x267d38(0x2e8)](_0x32ad80))return!![];else{const _0x1ece7f=_0x267d38(0x406)[_0x267d38(0x3b1)](_0x3e4626[_0x267d38(0x412)](0x0)[_0x267d38(0x377)]()+_0x3e4626[_0x267d38(0x2d2)](0x1));if(_0x453504[_0x1ece7f])return _0x453504[_0x1ece7f][_0x267d38(0x2e8)](_0x32ad80);}}}}return![];},Game_Map['prototype'][_0x21d116(0x2b7)]=function(_0x405d98,_0x2cb23f,_0x419798,_0xd1dcb1){const _0x37d8d3=_0x21d116;_0x419798=_0xd1dcb1==='airship'?0x5:_0x419798;const _0x6c0a0a=this['roundXWithDirection'](_0x405d98,_0x419798),_0x5cdc4f=this[_0x37d8d3(0x4fc)](_0x2cb23f,_0x419798),_0x3b83bd=this[_0x37d8d3(0x56b)](_0x6c0a0a,_0x5cdc4f),_0x4cf662=this[_0x37d8d3(0x56f)];if(_0x4cf662[_0x37d8d3(0x381)]['includes'](_0x3b83bd))return!![];else{const _0x510f2c=_0x37d8d3(0x500)['format'](_0xd1dcb1[_0x37d8d3(0x412)](0x0)[_0x37d8d3(0x377)]()+_0xd1dcb1['slice'](0x1));if(_0x4cf662[_0x510f2c])return _0x4cf662[_0x510f2c][_0x37d8d3(0x2e8)](_0x3b83bd);}return![];},VisuMZ[_0x21d116(0x4d7)]['Game_Map_refresh']=Game_Map[_0x21d116(0x278)][_0x21d116(0x55f)],Game_Map[_0x21d116(0x278)]['refresh']=function(){const _0x2b65f6=_0x21d116;VisuMZ[_0x2b65f6(0x4d7)][_0x2b65f6(0x3a6)][_0x2b65f6(0x2b6)](this),this[_0x2b65f6(0x3ec)]();},Game_Map['prototype'][_0x21d116(0x3ec)]=function(){const _0x531b49=_0x21d116;this['_needsPeriodicRefresh']=![];if(this[_0x531b49(0x550)]()[_0x531b49(0x30a)](_0xd26553=>_0xd26553[_0x531b49(0x308)]())){this[_0x531b49(0x2b0)]=!![];return;}if(this['events']()[_0x531b49(0x30a)](_0x148abe=>_0x148abe[_0x531b49(0x34c)]())){this[_0x531b49(0x2b0)]=!![];return;}if(this[_0x531b49(0x492)][_0x531b49(0x30a)](_0xbb3c95=>_0xbb3c95[_0x531b49(0x308)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x531b49(0x492)][_0x531b49(0x30a)](_0x3d43af=>_0x3d43af[_0x531b49(0x34c)]())){this[_0x531b49(0x2b0)]=!![];return;}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x22e)]=Game_Map[_0x21d116(0x278)][_0x21d116(0x3c7)],Game_Map['prototype'][_0x21d116(0x3c7)]=function(_0x6b7324){const _0x1609fa=_0x21d116;this[_0x1609fa(0x1de)](),VisuMZ[_0x1609fa(0x4d7)][_0x1609fa(0x22e)][_0x1609fa(0x2b6)](this,_0x6b7324);},Game_Map[_0x21d116(0x278)][_0x21d116(0x1de)]=function(){const _0xb8eee2=_0x21d116;if(!this[_0xb8eee2(0x2b0)])return;this[_0xb8eee2(0x3bb)]=this[_0xb8eee2(0x3bb)]||0x3c,this['_periodicRefreshTimer']--,this[_0xb8eee2(0x3bb)]<=0x0&&(this['requestRefresh'](),this[_0xb8eee2(0x3bb)]=0x3c);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x1d2)]=Game_Map['prototype'][_0x21d116(0x440)],Game_Map[_0x21d116(0x278)][_0x21d116(0x440)]=function(){const _0x13cf64=_0x21d116;if(!$gameSystem[_0x13cf64(0x2a1)]())return!![];return VisuMZ[_0x13cf64(0x4d7)][_0x13cf64(0x1d2)][_0x13cf64(0x2b6)](this);},Game_Map[_0x21d116(0x278)][_0x21d116(0x4dc)]=function(){const _0x36dca8=_0x21d116;this['_saveEventLocations']=![];const _0x56cd30=$dataMap[_0x36dca8(0x482)]||'';_0x56cd30[_0x36dca8(0x34a)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x36dca8(0x400)]=!![]);},Game_Map[_0x21d116(0x278)][_0x21d116(0x42b)]=function(){const _0x307e2b=_0x21d116;if(this[_0x307e2b(0x400)]===undefined)this['setupSaveEventLocations']();return this[_0x307e2b(0x400)];},Game_Map['prototype'][_0x21d116(0x40a)]=function(_0xc4ed79){const _0x475259=_0x21d116;_0xc4ed79!==this[_0x475259(0x2cf)]()&&$gamePlayer&&$gameSystem['removeTemporaryMapSpawnedEvents'](this['mapId']());},Game_Map[_0x21d116(0x278)]['setupSpawnedEvents']=function(){const _0x1b741f=_0x21d116;this[_0x1b741f(0x40c)]=$gameSystem[_0x1b741f(0x29e)](this[_0x1b741f(0x2cf)]()),this[_0x1b741f(0x39a)]=!![];},VisuMZ['EventsMoveCore'][_0x21d116(0x219)]=Game_Map[_0x21d116(0x278)][_0x21d116(0x550)],Game_Map[_0x21d116(0x278)][_0x21d116(0x550)]=function(){const _0x5053a8=_0x21d116;if(this[_0x5053a8(0x386)])return this[_0x5053a8(0x386)];const _0x1a2e39=VisuMZ['EventsMoveCore'][_0x5053a8(0x219)][_0x5053a8(0x2b6)](this),_0x5e5bce=_0x1a2e39['concat'](this[_0x5053a8(0x40c)]||[]);return this[_0x5053a8(0x386)]=_0x5e5bce['filter'](_0x2ec78e=>!!_0x2ec78e),this[_0x5053a8(0x386)];},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x2d9)]=Game_Map[_0x21d116(0x278)][_0x21d116(0x25f)],Game_Map['prototype'][_0x21d116(0x25f)]=function(_0x21e74f){const _0x3b32db=_0x21d116;return _0x21e74f>=0x3e8?(_0x21e74f-=0x3e8,this[_0x3b32db(0x40c)][_0x21e74f]):VisuMZ[_0x3b32db(0x4d7)][_0x3b32db(0x2d9)][_0x3b32db(0x2b6)](this,_0x21e74f);},Game_Map['prototype']['eraseEvent']=function(_0x5889da){const _0x264a6f=_0x21d116,_0x20b923=this['event'](_0x5889da);if(_0x20b923)_0x20b923[_0x264a6f(0x567)]();},Game_Map[_0x21d116(0x278)]['setupSpawnTest']=function(){const _0xba7187=_0x21d116,_0x2ee472={'template':_0xba7187(0x1e2),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0xba7187(0x40c)]['length']+0x3e8};this[_0xba7187(0x38b)](_0x2ee472);},Game_Map[_0x21d116(0x278)][_0x21d116(0x2e1)]=function(_0x363d94,_0x498ba1){const _0x1fd354=_0x21d116;if(this[_0x1fd354(0x409)](_0x363d94,_0x498ba1)[_0x1fd354(0x2de)]>0x0)return!![];if($gamePlayer['x']===_0x363d94&&$gamePlayer['y']===_0x498ba1)return!![];if(this[_0x1fd354(0x266)]()[_0x1fd354(0x1ce)](_0x363d94,_0x498ba1))return!![];if(this[_0x1fd354(0x353)]()[_0x1fd354(0x1ce)](_0x363d94,_0x498ba1))return!![];return![];},Game_Map[_0x21d116(0x278)][_0x21d116(0x4e1)]=function(_0x34f2c3,_0x2e1452,_0x327c1a){const _0x45e1f0=_0x21d116;$gameTemp[_0x45e1f0(0x531)]=_0x34f2c3;const _0x2f9831=new Game_Event(_0x34f2c3[_0x45e1f0(0x2cf)],_0x34f2c3[_0x45e1f0(0x36a)]);$gameTemp[_0x45e1f0(0x531)]=undefined,_0x2f9831['refresh']();let _0x5e503f=_0x2e1452-_0x2f9831['_addedHitbox']['left'],_0x2b2555=_0x2e1452+_0x2f9831['_addedHitbox'][_0x45e1f0(0x1a9)],_0x361ab9=_0x327c1a-_0x2f9831[_0x45e1f0(0x1b6)]['up'],_0x2b8a40=_0x327c1a+_0x2f9831[_0x45e1f0(0x1b6)][_0x45e1f0(0x44f)];for(let _0x7a1395=_0x5e503f;_0x7a1395<=_0x2b2555;_0x7a1395++){for(let _0x521b21=_0x361ab9;_0x521b21<=_0x2b8a40;_0x521b21++){if(this[_0x45e1f0(0x2e1)](_0x7a1395,_0x521b21))return![];}}return!![];},Game_Map[_0x21d116(0x278)][_0x21d116(0x38b)]=function(_0x3d3b4b){const _0x2aadb5=_0x21d116;$gameTemp[_0x2aadb5(0x531)]=_0x3d3b4b;const _0x35800b=new Game_Event(_0x3d3b4b['mapId'],_0x3d3b4b['eventId']);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x2aadb5(0x457)](_0x35800b),_0x35800b[_0x2aadb5(0x426)](_0x3d3b4b),this[_0x2aadb5(0x38e)]();},Game_Map[_0x21d116(0x278)][_0x21d116(0x2d8)]=function(_0x530717,_0x522362,_0x5ef8a5){const _0x521b0c=_0x21d116,_0x477ea2=_0x530717['x'],_0x39145d=_0x530717['y'];if(!this[_0x521b0c(0x1d4)](_0x477ea2,_0x39145d))return![];if(_0x522362){if(this[_0x521b0c(0x2e1)](_0x477ea2,_0x39145d))return![];if(!this[_0x521b0c(0x4e1)](_0x530717,_0x477ea2,_0x39145d))return![];}if(_0x5ef8a5){if(!this[_0x521b0c(0x208)](_0x477ea2,_0x39145d))return![];}return this['createSpawnedEventWithData'](_0x530717),!![];},Game_Map['prototype'][_0x21d116(0x3e0)]=function(_0x5f04cd,_0x49a117,_0x33fe6e,_0x1b9327){const _0x38b7fc=_0x21d116,_0x245d78=[],_0x7da202=this[_0x38b7fc(0x558)](),_0x4fd3bd=this[_0x38b7fc(0x2fe)]();for(let _0x15e2d1=0x0;_0x15e2d1<_0x7da202;_0x15e2d1++){for(let _0x38f517=0x0;_0x38f517<_0x4fd3bd;_0x38f517++){if(!_0x49a117[_0x38b7fc(0x2e8)](this[_0x38b7fc(0x56b)](_0x15e2d1,_0x38f517)))continue;if(!this[_0x38b7fc(0x1d4)](_0x15e2d1,_0x38f517))continue;if(_0x33fe6e){if(this[_0x38b7fc(0x2e1)](_0x15e2d1,_0x38f517))continue;if(!this[_0x38b7fc(0x4e1)](_0x5f04cd,_0x15e2d1,_0x38f517))continue;}if(_0x1b9327){if(!this[_0x38b7fc(0x208)](_0x15e2d1,_0x38f517))continue;}_0x245d78[_0x38b7fc(0x457)]([_0x15e2d1,_0x38f517]);}}if(_0x245d78[_0x38b7fc(0x2de)]>0x0){const _0x52af52=_0x245d78[Math[_0x38b7fc(0x478)](_0x245d78[_0x38b7fc(0x2de)])];return _0x5f04cd['x']=_0x52af52[0x0],_0x5f04cd['y']=_0x52af52[0x1],this[_0x38b7fc(0x38b)](_0x5f04cd),!![];}return![];},Game_Map[_0x21d116(0x278)][_0x21d116(0x3bc)]=function(_0x2e473d,_0x4ac342,_0xb72f56,_0x1a21c8){const _0x3c409c=_0x21d116,_0x199d9a=[],_0x8c5d44=this['width'](),_0xb6e0f4=this['height']();for(let _0x243cbc=0x0;_0x243cbc<_0x8c5d44;_0x243cbc++){for(let _0x595bd5=0x0;_0x595bd5<_0xb6e0f4;_0x595bd5++){if(!_0x4ac342[_0x3c409c(0x2e8)](this['terrainTag'](_0x243cbc,_0x595bd5)))continue;if(!this[_0x3c409c(0x1d4)](_0x243cbc,_0x595bd5))continue;if(_0xb72f56){if(this[_0x3c409c(0x2e1)](_0x243cbc,_0x595bd5))continue;if(!this[_0x3c409c(0x4e1)](_0x2e473d,_0x243cbc,_0x595bd5))continue;}if(_0x1a21c8){if(!this[_0x3c409c(0x208)](_0x243cbc,_0x595bd5))continue;}_0x199d9a[_0x3c409c(0x457)]([_0x243cbc,_0x595bd5]);}}if(_0x199d9a[_0x3c409c(0x2de)]>0x0){const _0x58d593=_0x199d9a[Math['randomInt'](_0x199d9a['length'])];return _0x2e473d['x']=_0x58d593[0x0],_0x2e473d['y']=_0x58d593[0x1],this['createSpawnedEventWithData'](_0x2e473d),!![];}return![];},Game_Map[_0x21d116(0x278)]['isPassableByAnyDirection']=function(_0x7a8a30,_0x4e6cac){const _0x8ac00d=_0x21d116;if(this[_0x8ac00d(0x4f0)](_0x7a8a30,_0x4e6cac,0x2))return!![];if(this[_0x8ac00d(0x4f0)](_0x7a8a30,_0x4e6cac,0x4))return!![];if(this[_0x8ac00d(0x4f0)](_0x7a8a30,_0x4e6cac,0x6))return!![];if(this[_0x8ac00d(0x4f0)](_0x7a8a30,_0x4e6cac,0x8))return!![];return![];},Game_Map[_0x21d116(0x278)]['despawnEventId']=function(_0x4a60df){const _0x3da78d=_0x21d116;if(_0x4a60df<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x4bbe65=this[_0x3da78d(0x25f)](_0x4a60df);_0x4bbe65['locate'](-0x1,-0x1),_0x4bbe65[_0x3da78d(0x567)](),this[_0x3da78d(0x40c)][_0x4a60df-0x3e8]=null,this[_0x3da78d(0x38e)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0x5ceaf8=_0x21d116;for(const _0x1a31de of this[_0x5ceaf8(0x40c)]){if(_0x1a31de)return _0x1a31de;}return null;},Game_Map[_0x21d116(0x278)][_0x21d116(0x359)]=function(){const _0x3ff63b=_0x21d116,_0x147cef=this['firstSpawnedEvent']();return _0x147cef?_0x147cef[_0x3ff63b(0x3db)]:0x0;},Game_Map[_0x21d116(0x278)][_0x21d116(0x463)]=function(){const _0x22c199=_0x21d116,_0x3b1674=this[_0x22c199(0x40c)]['slice'](0x0)[_0x22c199(0x3fb)]();for(const _0xb37fdc of _0x3b1674){if(_0xb37fdc)return _0xb37fdc;}return null;},Game_Map[_0x21d116(0x278)][_0x21d116(0x258)]=function(){const _0x2108cd=_0x21d116,_0x4a2670=this[_0x2108cd(0x463)]();return _0x4a2670?_0x4a2670[_0x2108cd(0x3db)]:0x0;},Game_Map[_0x21d116(0x278)]['despawnAtXY']=function(_0x3caf70,_0x50a0ee){const _0x5a45a6=_0x21d116,_0x5149ad=this[_0x5a45a6(0x409)](_0x3caf70,_0x50a0ee);for(const _0x215a3e of _0x5149ad){if(!_0x215a3e)continue;if(_0x215a3e[_0x5a45a6(0x371)]())this[_0x5a45a6(0x307)](_0x215a3e[_0x5a45a6(0x3db)]);}},Game_Map[_0x21d116(0x278)]['despawnRegions']=function(_0xe3306e){const _0x3abe06=_0x21d116;for(const _0x50bbbd of this[_0x3abe06(0x40c)]){if(!_0x50bbbd)continue;_0xe3306e[_0x3abe06(0x2e8)](_0x50bbbd[_0x3abe06(0x56b)]())&&this['despawnEventId'](_0x50bbbd[_0x3abe06(0x3db)]);}},Game_Map['prototype'][_0x21d116(0x1b3)]=function(_0x4abc01){const _0x1e777d=_0x21d116;for(const _0x5f20bd of this[_0x1e777d(0x40c)]){if(!_0x5f20bd)continue;_0x4abc01[_0x1e777d(0x2e8)](_0x5f20bd[_0x1e777d(0x26d)]())&&this[_0x1e777d(0x307)](_0x5f20bd[_0x1e777d(0x3db)]);}},Game_Map[_0x21d116(0x278)]['despawnEverything']=function(){const _0x5be900=_0x21d116;for(const _0x4e1492 of this[_0x5be900(0x40c)]){if(!_0x4e1492)continue;this[_0x5be900(0x307)](_0x4e1492[_0x5be900(0x3db)]);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x3ae)]=Game_Map[_0x21d116(0x278)][_0x21d116(0x284)],Game_Map[_0x21d116(0x278)][_0x21d116(0x284)]=function(_0x517015){const _0x556737=_0x21d116;VisuMZ['EventsMoveCore'][_0x556737(0x3ae)][_0x556737(0x2b6)](this,_0x517015);if(_0x517015>=0x3e8){const _0x825cad=this['event'](_0x517015);if(_0x825cad)_0x825cad[_0x556737(0x433)]();}},Game_CommonEvent['prototype'][_0x21d116(0x308)]=function(){const _0x5a1a07=_0x21d116,_0x3e2be5=this[_0x5a1a07(0x25f)]();return this[_0x5a1a07(0x35c)]()&&_0x3e2be5[_0x5a1a07(0x265)]>=0x1&&DataManager[_0x5a1a07(0x313)](_0x3e2be5['switchId']);},Game_CommonEvent[_0x21d116(0x278)]['hasCPCs']=function(){const _0x38e01b=_0x21d116;return VisuMZ[_0x38e01b(0x4d7)][_0x38e01b(0x55d)][_0x38e01b(0x492)]['includes'](this[_0x38e01b(0x348)]);},VisuMZ[_0x21d116(0x4d7)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x21d116(0x278)][_0x21d116(0x35c)],Game_CommonEvent[_0x21d116(0x278)][_0x21d116(0x35c)]=function(){const _0x14a139=_0x21d116;return VisuMZ[_0x14a139(0x4d7)][_0x14a139(0x522)][_0x14a139(0x2b6)](this)?!![]:VisuMZ[_0x14a139(0x4d7)][_0x14a139(0x55d)][_0x14a139(0x244)](this[_0x14a139(0x25f)]()[_0x14a139(0x379)],this[_0x14a139(0x348)]);},VisuMZ['EventsMoveCore']['Game_Map_parallelCommonEvents']=Game_Map['prototype'][_0x21d116(0x2be)],Game_Map[_0x21d116(0x278)][_0x21d116(0x2be)]=function(){const _0x22b0dc=_0x21d116,_0xc968f7=VisuMZ[_0x22b0dc(0x4d7)][_0x22b0dc(0x516)][_0x22b0dc(0x2b6)](this),_0x4c5a49=VisuMZ[_0x22b0dc(0x4d7)][_0x22b0dc(0x55d)]['_commonEvents'][_0x22b0dc(0x449)](_0x20f4f9=>$dataCommonEvents[_0x20f4f9]);return _0xc968f7[_0x22b0dc(0x3f8)](_0x4c5a49)[_0x22b0dc(0x19c)]((_0x53ed60,_0x1b5f92,_0x3776a5)=>_0x3776a5[_0x22b0dc(0x343)](_0x53ed60)===_0x1b5f92);},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x21d116(0x278)]['initMembers'],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x279)]=function(){const _0x50897c=_0x21d116;VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers'][_0x50897c(0x2b6)](this),this[_0x50897c(0x56d)]();},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x56d)]=function(){const _0x2af5c4=_0x21d116;this[_0x2af5c4(0x538)]=![],this[_0x2af5c4(0x1fd)](),this[_0x2af5c4(0x3cf)](),this[_0x2af5c4(0x47c)](),this['clearStepPattern']();},Game_CharacterBase['prototype'][_0x21d116(0x21d)]=function(){const _0x112353=_0x21d116;if(this[_0x112353(0x39e)]===Game_Player&&this[_0x112353(0x202)]())return this[_0x112353(0x557)]()['characterName']()[_0x112353(0x34a)](/\[VS8\]/i);else return Imported[_0x112353(0x43e)]&&this[_0x112353(0x4a1)]()?!![]:this[_0x112353(0x55b)]()[_0x112353(0x34a)](/\[VS8\]/i);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x48b)]=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x2da)],Game_CharacterBase['prototype']['direction']=function(){const _0xf08b3c=_0x21d116;if(this[_0xf08b3c(0x53f)]()&&!this['isJumping']()&&this['isSpriteVS8dir']())return this[_0xf08b3c(0x27d)]();else{if(this[_0xf08b3c(0x53f)]()&&!this['isJumping']())return 0x8;else return this[_0xf08b3c(0x4cd)]()&&this[_0xf08b3c(0x21d)]()?this['getPosingCharacterDirection']():VisuMZ[_0xf08b3c(0x4d7)][_0xf08b3c(0x48b)]['call'](this);}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x4c7)]=Game_CharacterBase['prototype'][_0x21d116(0x511)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x511)]=function(_0x4cedf8){const _0x360942=_0x21d116;if(!this['isSpriteVS8dir']())_0x4cedf8=this[_0x360942(0x424)](_0x4cedf8);VisuMZ[_0x360942(0x4d7)][_0x360942(0x4c7)][_0x360942(0x2b6)](this,_0x4cedf8);},Game_CharacterBase['prototype'][_0x21d116(0x424)]=function(_0x2b3037){const _0x2ee19b=_0x21d116;if(_0x2b3037===0x1)return this[_0x2ee19b(0x2a5)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x2b3037===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x2b3037===0x7)return this[_0x2ee19b(0x2a5)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x2b3037===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x2b3037;},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x270)]=function(_0x40ed54){const _0x36dc7d=_0x21d116;return[0x1,0x3,0x5,0x7,0x9][_0x36dc7d(0x2e8)](_0x40ed54);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4c5)]=function(){const _0x1723b1=_0x21d116;return this[_0x1723b1(0x34d)]||0x0;},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x50b)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x50b)]=function(_0x12fbe8){const _0x4cd1a7=_0x21d116;this[_0x4cd1a7(0x34d)]=_0x12fbe8,VisuMZ[_0x4cd1a7(0x4d7)][_0x4cd1a7(0x521)][_0x4cd1a7(0x2b6)](this,_0x12fbe8);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x542)]=function(_0x8b969f){const _0x8b7d15=_0x21d116;if(!this[_0x8b7d15(0x270)](_0x8b969f))return this[_0x8b7d15(0x50b)](_0x8b969f);let _0x269736=0x0,_0x14954c=0x0;switch(_0x8b969f){case 0x1:_0x269736=0x4,_0x14954c=0x2;break;case 0x3:_0x269736=0x6,_0x14954c=0x2;break;case 0x7:_0x269736=0x4,_0x14954c=0x8;break;case 0x9:_0x269736=0x6,_0x14954c=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x8b7d15(0x1ac)][_0x8b7d15(0x1be)][_0x8b7d15(0x1d1)]){if(!this[_0x8b7d15(0x2a5)](this['_x'],this['_y'],_0x269736))return this[_0x8b7d15(0x50b)](_0x14954c);if(!this[_0x8b7d15(0x2a5)](this['_x'],this['_y'],_0x14954c))return this[_0x8b7d15(0x50b)](_0x269736);if(!this[_0x8b7d15(0x532)](this['_x'],this['_y'],_0x269736,_0x14954c)){let _0x3dd68c=VisuMZ[_0x8b7d15(0x4d7)][_0x8b7d15(0x1ac)]['Movement']['FavorHorz']?_0x269736:_0x14954c;return this[_0x8b7d15(0x50b)](_0x3dd68c);}}this[_0x8b7d15(0x34d)]=_0x8b969f,this[_0x8b7d15(0x3f7)](_0x269736,_0x14954c);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x3a3)]=Game_CharacterBase[_0x21d116(0x278)]['realMoveSpeed'],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x415)]=function(){const _0x2160e4=_0x21d116;let _0x5f4680=this[_0x2160e4(0x2ba)];return this[_0x2160e4(0x397)]()&&(_0x5f4680+=this[_0x2160e4(0x4f3)]()),this['adjustDir8MovementSpeed'](_0x5f4680);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4f3)]=function(){const _0x48826f=_0x21d116,_0x55e3d5=VisuMZ[_0x48826f(0x4d7)][_0x48826f(0x1ac)][_0x48826f(0x1be)];return _0x55e3d5[_0x48826f(0x1e4)]!==undefined?_0x55e3d5[_0x48826f(0x1e4)]:VisuMZ[_0x48826f(0x4d7)][_0x48826f(0x3a3)][_0x48826f(0x2b6)](this)-this[_0x48826f(0x2ba)];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x32a)]=function(_0x3e2f61){const _0x393a5c=_0x21d116,_0x2c684b=VisuMZ[_0x393a5c(0x4d7)][_0x393a5c(0x1ac)][_0x393a5c(0x1be)];if(!_0x2c684b[_0x393a5c(0x1a6)])return _0x3e2f61;return[0x1,0x3,0x7,0x9][_0x393a5c(0x2e8)](this[_0x393a5c(0x34d)])&&(_0x3e2f61*=_0x2c684b[_0x393a5c(0x29f)]||0.01),_0x3e2f61;},VisuMZ['EventsMoveCore'][_0x21d116(0x574)]=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x397)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x397)]=function(){const _0x1edb6d=_0x21d116;if(this[_0x1edb6d(0x4d9)])return!![];return VisuMZ[_0x1edb6d(0x4d7)]['Game_CharacterBase_isDashing'][_0x1edb6d(0x2b6)](this);},Game_CharacterBase['prototype'][_0x21d116(0x3fc)]=function(){const _0x375e6c=_0x21d116;return this[_0x375e6c(0x397)]();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x380)]=Game_CharacterBase['prototype']['pattern'],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x201)]=function(){const _0x171df2=_0x21d116;return this[_0x171df2(0x4cd)]()?this[_0x171df2(0x4db)]():VisuMZ[_0x171df2(0x4d7)][_0x171df2(0x380)][_0x171df2(0x2b6)](this);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x388)]=Game_CharacterBase['prototype'][_0x21d116(0x243)],Game_CharacterBase[_0x21d116(0x278)]['increaseSteps']=function(){const _0x10859f=_0x21d116;VisuMZ[_0x10859f(0x4d7)]['Game_CharacterBase_increaseSteps'][_0x10859f(0x2b6)](this),this['clearPose']();},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_characterIndex']=Game_CharacterBase['prototype'][_0x21d116(0x31b)],Game_CharacterBase['prototype'][_0x21d116(0x31b)]=function(){const _0x1d0e05=_0x21d116;if(this[_0x1d0e05(0x21d)]())return this['characterIndexVS8']();return VisuMZ[_0x1d0e05(0x4d7)][_0x1d0e05(0x24a)][_0x1d0e05(0x2b6)](this);},Game_CharacterBase[_0x21d116(0x278)]['characterIndexVS8']=function(){const _0x21f50b=_0x21d116,_0x1127fd=this[_0x21f50b(0x2da)]();if(this[_0x21f50b(0x462)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x1127fd))return 0x4;if([0x1,0x3,0x7,0x9][_0x21f50b(0x2e8)](_0x1127fd))return 0x5;}else{if(this[_0x21f50b(0x53f)]())return 0x6;else{if(this['isPosing']())return this[_0x21f50b(0x56c)]();else{if(this[_0x21f50b(0x2b8)]){if([0x2,0x4,0x6,0x8]['includes'](_0x1127fd))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x1127fd))return 0x5;}else{if(this[_0x21f50b(0x2e3)]()&&this[_0x21f50b(0x38a)]()){if([0x2,0x4,0x6,0x8][_0x21f50b(0x2e8)](_0x1127fd))return 0x4;if([0x1,0x3,0x7,0x9][_0x21f50b(0x2e8)](_0x1127fd))return 0x5;}else{if(this['isDashingAndMoving']()){if([0x2,0x4,0x6,0x8][_0x21f50b(0x2e8)](_0x1127fd))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x1127fd))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x21f50b(0x2e8)](_0x1127fd))return 0x0;if([0x1,0x3,0x7,0x9][_0x21f50b(0x2e8)](_0x1127fd))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x21d116(0x38a)]=function(){const _0x1cafd5=_0x21d116;return VisuMZ[_0x1cafd5(0x4d7)][_0x1cafd5(0x1ac)][_0x1cafd5(0x252)]['CarryPose'];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x3d5)]=function(){const _0x532f41=_0x21d116;return this[_0x532f41(0x53f)]()&&this[_0x532f41(0x26d)]()===VisuMZ[_0x532f41(0x4d7)][_0x532f41(0x1ac)][_0x532f41(0x565)]['Rope'];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x27d)]=function(){const _0x3c47bf=_0x21d116;return this[_0x3c47bf(0x3d5)]()?0x4:0x2;},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_update']=Game_CharacterBase[_0x21d116(0x278)]['update'],Game_CharacterBase['prototype'][_0x21d116(0x3c7)]=function(){const _0x1534f7=_0x21d116;VisuMZ[_0x1534f7(0x4d7)][_0x1534f7(0x26c)][_0x1534f7(0x2b6)](this),this[_0x1534f7(0x4ee)]();},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4ee)]=function(){const _0x1106a3=_0x21d116;this[_0x1106a3(0x3f4)]=this[_0x1106a3(0x3f4)]||0x0;if(this[_0x1106a3(0x3f4)]>0x0){this['_poseDuration']--;if(this[_0x1106a3(0x3f4)]<=0x0&&this['_pose']!==_0x1106a3(0x52b))this[_0x1106a3(0x1fd)]();}},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x4c3)]=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x3f7)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x3f7)]=function(_0x5b8bcf,_0x34ab3f){const _0x361fdc=_0x21d116;VisuMZ[_0x361fdc(0x4d7)][_0x361fdc(0x4c3)][_0x361fdc(0x2b6)](this,_0x5b8bcf,_0x34ab3f);if(this['isSpriteVS8dir']())this[_0x361fdc(0x499)](_0x5b8bcf,_0x34ab3f);},Game_CharacterBase['prototype'][_0x21d116(0x499)]=function(_0x324156,_0x562c28){const _0x219bb6=_0x21d116;if(_0x324156===0x4&&_0x562c28===0x2)this['setDirection'](0x1);if(_0x324156===0x6&&_0x562c28===0x2)this[_0x219bb6(0x511)](0x3);if(_0x324156===0x4&&_0x562c28===0x8)this[_0x219bb6(0x511)](0x7);if(_0x324156===0x6&&_0x562c28===0x8)this['setDirection'](0x9);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x1cf)]=Game_CharacterBase['prototype'][_0x21d116(0x507)],Game_CharacterBase['prototype'][_0x21d116(0x507)]=function(){const _0x23fd35=_0x21d116;if(this[_0x23fd35(0x4cd)]()&&this[_0x23fd35(0x37a)]()==='ZZZ')return!![];return VisuMZ['EventsMoveCore'][_0x23fd35(0x1cf)][_0x23fd35(0x2b6)](this);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x427)]=function(_0x1bb2e2,_0x54981c){const _0x3526e3=_0x21d116;if(_0x1bb2e2[_0x3526e3(0x34a)](/Z/i))_0x1bb2e2=_0x3526e3(0x52b);if(_0x1bb2e2['match'](/SLEEP/i))_0x1bb2e2=_0x3526e3(0x52b);this[_0x3526e3(0x21d)]()&&(this[_0x3526e3(0x1ad)]=_0x1bb2e2[_0x3526e3(0x377)]()[_0x3526e3(0x49c)](),this['_poseDuration']=_0x54981c||Infinity);},Game_CharacterBase['prototype'][_0x21d116(0x37a)]=function(){const _0x5bc09a=_0x21d116;return this[_0x5bc09a(0x21d)]()?(this[_0x5bc09a(0x1ad)]||'')['toUpperCase']()[_0x5bc09a(0x49c)]():''['toUpperCase']()[_0x5bc09a(0x49c)]();},Game_CharacterBase['prototype']['setBalloonPose']=function(_0x37e048,_0x21f320){const _0x268f38=_0x21d116;if(this[_0x268f38(0x21d)]()){const _0x41850f=['',_0x268f38(0x3d8),'QUESTION',_0x268f38(0x51b),_0x268f38(0x214),_0x268f38(0x2b9),_0x268f38(0x226),_0x268f38(0x2bf),_0x268f38(0x3a0),_0x268f38(0x365),_0x268f38(0x52b),'','','','',''][_0x37e048];this[_0x268f38(0x427)](_0x41850f,_0x21f320);}},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x1fd)]=function(){const _0x59a923=_0x21d116;this[_0x59a923(0x1ad)]='',this[_0x59a923(0x3f4)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x45cff2=_0x21d116;return this[_0x45cff2(0x21d)]()&&!!this['_pose'];},Game_CharacterBase['prototype'][_0x21d116(0x56c)]=function(){const _0x1f9db4=_0x21d116,_0xd91003=this[_0x1f9db4(0x1ad)]['toUpperCase']();switch(this['_pose'][_0x1f9db4(0x377)]()[_0x1f9db4(0x49c)]()){case _0x1f9db4(0x200):case'HMPH':case _0x1f9db4(0x2b5):case _0x1f9db4(0x489):case _0x1f9db4(0x21f):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x21d116(0x422)]=function(){const _0x414477=_0x21d116;switch(this[_0x414477(0x1ad)][_0x414477(0x377)]()){case _0x414477(0x3d8):case'QUESTION':case _0x414477(0x51b):case'!':case'?':return 0x2;break;case'HEART':case _0x414477(0x2b9):case _0x414477(0x226):return 0x4;break;case'ITEM':case'HMPH':case _0x414477(0x2b5):case _0x414477(0x2bf):case _0x414477(0x3a0):case _0x414477(0x365):return 0x6;break;case'HURT':case'KNEEL':case'COLLAPSE':case _0x414477(0x52b):case _0x414477(0x1a5):return 0x8;break;default:return VisuMZ[_0x414477(0x4d7)][_0x414477(0x4c7)][_0x414477(0x2b6)](this);break;}},Game_CharacterBase[_0x21d116(0x278)]['getPosingCharacterPattern']=function(){const _0x47ec3c=_0x21d116;switch(this[_0x47ec3c(0x1ad)][_0x47ec3c(0x377)]()){case'ITEM':case _0x47ec3c(0x489):case'EXCLAMATION':case'!':case _0x47ec3c(0x214):case _0x47ec3c(0x2bf):return 0x0;break;case _0x47ec3c(0x310):case _0x47ec3c(0x21f):case'QUESTION':case'?':case'ANGER':case'SILENCE':return 0x1;break;case _0x47ec3c(0x2b5):case _0x47ec3c(0x2e7):case'MUSIC\x20NOTE':case'SWEAT':case _0x47ec3c(0x365):return 0x2;break;default:return VisuMZ[_0x47ec3c(0x4d7)]['Game_CharacterBase_pattern'][_0x47ec3c(0x2b6)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x2d4897=_0x21d116;this[_0x2d4897(0x2b8)]=!![];},Game_CharacterBase['prototype'][_0x21d116(0x436)]=function(){const _0x4bad64=_0x21d116;this[_0x4bad64(0x2b8)]=![];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x2ad)]=function(){this['_forceDashing']=!![];},Game_CharacterBase['prototype']['clearDashing']=function(){const _0x5a1efe=_0x21d116;this[_0x5a1efe(0x4d9)]=![];},Game_CharacterBase[_0x21d116(0x278)]['isShadowVisible']=function(){const _0x20cee7=_0x21d116;if(this['isTile']())return![];if(this['_isObjectCharacter'])return![];if(this[_0x20cee7(0x4ed)])return![];if(this['_characterName']==='')return![];if(this[_0x20cee7(0x39e)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype'][_0x21d116(0x48f)]=function(){const _0x4b3178=_0x21d116;if(this[_0x4b3178(0x53f)]())return!![];if(this[_0x4b3178(0x39e)]===Game_Player&&this[_0x4b3178(0x202)]())return!![];return![];},Game_CharacterBase['prototype'][_0x21d116(0x275)]=function(){const _0x31c109=_0x21d116;return VisuMZ[_0x31c109(0x4d7)][_0x31c109(0x1ac)][_0x31c109(0x1be)][_0x31c109(0x396)];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4fa)]=function(){const _0x51049f=_0x21d116;return this[_0x51049f(0x1d8)]();},Game_CharacterBase[_0x21d116(0x278)]['shadowY']=function(){const _0x135af7=_0x21d116;return this[_0x135af7(0x4b2)]()+this[_0x135af7(0x1f8)]()+this['jumpHeight']();},Game_Character['prototype'][_0x21d116(0x3f5)]=function(_0x21cf49,_0x5bc29c){const _0x4ed187=_0x21d116,_0x5329bc=this[_0x4ed187(0x54a)](),_0x2b3328=$gameMap[_0x4ed187(0x558)](),_0x40ba52=[],_0x5f2589=[],_0x42b505=[],_0x47650b={};let _0x5e2c86=_0x47650b;if(this['x']===_0x21cf49&&this['y']===_0x5bc29c)return 0x0;_0x47650b[_0x4ed187(0x2c8)]=null,_0x47650b['x']=this['x'],_0x47650b['y']=this['y'],_0x47650b['g']=0x0,_0x47650b['f']=$gameMap['distance'](_0x47650b['x'],_0x47650b['y'],_0x21cf49,_0x5bc29c),_0x40ba52[_0x4ed187(0x457)](_0x47650b),_0x5f2589[_0x4ed187(0x457)](_0x47650b['y']*_0x2b3328+_0x47650b['x']);while(_0x40ba52['length']>0x0){let _0x3bd27c=0x0;for(let _0xe82548=0x0;_0xe82548<_0x40ba52[_0x4ed187(0x2de)];_0xe82548++){_0x40ba52[_0xe82548]['f']<_0x40ba52[_0x3bd27c]['f']&&(_0x3bd27c=_0xe82548);}const _0x29ece1=_0x40ba52[_0x3bd27c],_0x52e1b4=_0x29ece1['x'],_0x49ef50=_0x29ece1['y'],_0x47cbcf=_0x49ef50*_0x2b3328+_0x52e1b4,_0x3f89ce=_0x29ece1['g'];_0x40ba52['splice'](_0x3bd27c,0x1),_0x5f2589[_0x4ed187(0x2b4)](_0x5f2589[_0x4ed187(0x343)](_0x47cbcf),0x1),_0x42b505[_0x4ed187(0x457)](_0x47cbcf);if(_0x29ece1['x']===_0x21cf49&&_0x29ece1['y']===_0x5bc29c){_0x5e2c86=_0x29ece1;break;}if(_0x3f89ce>=_0x5329bc)continue;const _0x42cd75=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0xbabd48=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0xd004d0=0x1;_0xd004d0<0xa;_0xd004d0++){if(_0xd004d0===0x5)continue;const _0x1f23a6=_0xd004d0,_0x3763cd=_0x42cd75[_0xd004d0],_0x23f20f=_0xbabd48[_0xd004d0],_0x3df3f1=$gameMap['roundXWithDirection'](_0x52e1b4,_0x1f23a6),_0x21788e=$gameMap['roundYWithDirection'](_0x49ef50,_0x1f23a6),_0x3d9be7=_0x21788e*_0x2b3328+_0x3df3f1;if(_0x42b505[_0x4ed187(0x2e8)](_0x3d9be7))continue;if(this[_0x4ed187(0x39e)]===Game_Player&&VisuMZ['EventsMoveCore'][_0x4ed187(0x1ac)]['Movement']['StrictCollision']){if(!this[_0x4ed187(0x2a5)](_0x52e1b4,_0x49ef50,_0x3763cd))continue;if(!this[_0x4ed187(0x2a5)](_0x52e1b4,_0x49ef50,_0x23f20f))continue;}if(!this[_0x4ed187(0x532)](_0x52e1b4,_0x49ef50,_0x3763cd,_0x23f20f))continue;const _0x361d52=_0x3f89ce+0x1,_0x977fbe=_0x5f2589[_0x4ed187(0x343)](_0x3d9be7);if(_0x977fbe<0x0||_0x361d52<_0x40ba52[_0x977fbe]['g']){let _0x462fca={};_0x977fbe>=0x0?_0x462fca=_0x40ba52[_0x977fbe]:(_0x40ba52[_0x4ed187(0x457)](_0x462fca),_0x5f2589[_0x4ed187(0x457)](_0x3d9be7)),_0x462fca['parent']=_0x29ece1,_0x462fca['x']=_0x3df3f1,_0x462fca['y']=_0x21788e,_0x462fca['g']=_0x361d52,_0x462fca['f']=_0x361d52+$gameMap[_0x4ed187(0x413)](_0x3df3f1,_0x21788e,_0x21cf49,_0x5bc29c),(!_0x5e2c86||_0x462fca['f']-_0x462fca['g']<_0x5e2c86['f']-_0x5e2c86['g'])&&(_0x5e2c86=_0x462fca);}}}let _0x4cfe45=_0x5e2c86;while(_0x4cfe45[_0x4ed187(0x2c8)]&&_0x4cfe45[_0x4ed187(0x2c8)]!==_0x47650b){_0x4cfe45=_0x4cfe45[_0x4ed187(0x2c8)];}const _0x5f199b=$gameMap[_0x4ed187(0x1ab)](_0x4cfe45['x'],_0x47650b['x']),_0x44c71b=$gameMap[_0x4ed187(0x1fe)](_0x4cfe45['y'],_0x47650b['y']);if(_0x5f199b<0x0&&_0x44c71b>0x0)return 0x1;if(_0x5f199b>0x0&&_0x44c71b>0x0)return 0x3;if(_0x5f199b<0x0&&_0x44c71b<0x0)return 0x7;if(_0x5f199b>0x0&&_0x44c71b<0x0)return 0x9;if(_0x44c71b>0x0)return 0x2;if(_0x5f199b<0x0)return 0x4;if(_0x5f199b>0x0)return 0x6;if(_0x44c71b<0x0)return 0x8;const _0x249b48=this['deltaXFrom'](_0x21cf49),_0x1f51f7=this[_0x4ed187(0x4c1)](_0x5bc29c);if(Math[_0x4ed187(0x435)](_0x249b48)>Math['abs'](_0x1f51f7))return _0x249b48>0x0?0x4:0x6;else{if(_0x1f51f7!==0x0)return _0x1f51f7>0x0?0x8:0x2;}return 0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass']=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x2a5)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x2a5)]=function(_0x3c2ffe,_0x3249e4,_0x36cfd0){const _0x3d8f6c=_0x21d116;return this['_vehicleType']==='airship'?this[_0x3d8f6c(0x557)]()[_0x3d8f6c(0x4e0)](_0x3c2ffe,_0x3249e4,_0x36cfd0):VisuMZ['EventsMoveCore'][_0x3d8f6c(0x24d)][_0x3d8f6c(0x2b6)](this,_0x3c2ffe,_0x3249e4,_0x36cfd0);},Game_CharacterBase['prototype'][_0x21d116(0x47c)]=function(){const _0x1c4209=_0x21d116;this[_0x1c4209(0x22f)]=0x0,this[_0x1c4209(0x22d)]=0x0;},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x1d8)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x1d8)]=function(){const _0x4d15d0=_0x21d116;return VisuMZ['EventsMoveCore'][_0x4d15d0(0x45e)]['call'](this)+(this[_0x4d15d0(0x22f)]||0x0);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x498)]=Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4b2)],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4b2)]=function(){const _0x5bef1f=_0x21d116;return VisuMZ['EventsMoveCore'][_0x5bef1f(0x498)][_0x5bef1f(0x2b6)](this)+(this[_0x5bef1f(0x22d)]||0x0);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x43a)]=function(){this['_stepPattern']='';},VisuMZ[_0x21d116(0x4d7)]['Game_CharacterBase_updatePattern']=Game_CharacterBase['prototype']['updatePattern'],Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x4c8)]=function(){const _0x239f6a=_0x21d116;if(this[_0x239f6a(0x538)])return;if(this[_0x239f6a(0x54f)]())return;VisuMZ['EventsMoveCore'][_0x239f6a(0x4e2)][_0x239f6a(0x2b6)](this);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x54f)]=function(){const _0x1400b3=_0x21d116;if(!this['hasStepAnime']()&&this['_stopCount']>0x0)return![];switch(String(this[_0x1400b3(0x54e)])['toUpperCase']()['trim']()){case _0x1400b3(0x561):this['_pattern']+=0x1;if(this['_pattern']>0x2)this[_0x1400b3(0x382)](0x0);break;case'RIGHT\x20TO\x20LEFT':this[_0x1400b3(0x33b)]-=0x1;if(this['_pattern']<0x0)this[_0x1400b3(0x382)](0x2);break;case'SPIN\x20CLOCKWISE':case _0x1400b3(0x503):this[_0x1400b3(0x2ed)]();break;case _0x1400b3(0x4d0):case _0x1400b3(0x23d):case'SPIN\x20ANTICLOCKWISE':case _0x1400b3(0x3de):this[_0x1400b3(0x560)]();break;default:return![];}return!![];},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x320)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x2e3)]=function(){const _0x3a4573=_0x21d116,_0x5d70e7=this['getEventIconData']();if(!_0x5d70e7)return![];return _0x5d70e7[_0x3a4573(0x4cc)]>0x0;},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x512)]=function(){const _0x5b417c=_0x21d116,_0x273d54=this[_0x5b417c(0x2da)]();return $gameMap[_0x5b417c(0x469)](this['x'],_0x273d54);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x1eb)]=function(){const _0x351382=_0x21d116,_0x330eb0=this[_0x351382(0x2da)]();return $gameMap[_0x351382(0x4fc)](this['y'],_0x330eb0);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x327)]=function(){const _0x94118b=_0x21d116,_0x1c3bc8=this[_0x94118b(0x40b)](this['direction']());return $gameMap[_0x94118b(0x469)](this['x'],_0x1c3bc8);},Game_CharacterBase[_0x21d116(0x278)][_0x21d116(0x1b2)]=function(){const _0x3fd8df=_0x21d116,_0x38b694=this[_0x3fd8df(0x40b)](this[_0x3fd8df(0x2da)]());return $gameMap['roundYWithDirection'](this['y'],_0x38b694);},VisuMZ[_0x21d116(0x4d7)]['Game_Character_setMoveRoute']=Game_Character['prototype'][_0x21d116(0x2ab)],Game_Character['prototype']['setMoveRoute']=function(_0xfc4281){const _0x252c06=_0x21d116;route=JsonEx[_0x252c06(0x416)](_0xfc4281),VisuMZ[_0x252c06(0x4d7)]['Game_Character_setMoveRoute']['call'](this,route);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x263)]=Game_Character[_0x21d116(0x278)][_0x21d116(0x390)],Game_Character[_0x21d116(0x278)]['forceMoveRoute']=function(_0x582456){const _0x5c91d7=_0x21d116;route=JsonEx[_0x5c91d7(0x416)](_0x582456),VisuMZ[_0x5c91d7(0x4d7)]['Game_Character_forceMoveRoute'][_0x5c91d7(0x2b6)](this,route);},VisuMZ['EventsMoveCore'][_0x21d116(0x1fc)]=Game_Character[_0x21d116(0x278)][_0x21d116(0x27b)],Game_Character[_0x21d116(0x278)]['processMoveCommand']=function(_0x401d26){const _0x3ef7e7=_0x21d116,_0x356d41=Game_Character,_0x20ef87=_0x401d26['parameters'];if(_0x401d26[_0x3ef7e7(0x50d)]===_0x356d41[_0x3ef7e7(0x2ea)]){let _0x370807=_0x401d26[_0x3ef7e7(0x286)][0x0];_0x370807=this[_0x3ef7e7(0x49d)](_0x370807),_0x370807=this[_0x3ef7e7(0x315)](_0x370807),this[_0x3ef7e7(0x2f7)](_0x401d26,_0x370807);}else VisuMZ[_0x3ef7e7(0x4d7)]['Game_Character_processMoveCommand'][_0x3ef7e7(0x2b6)](this,_0x401d26);},Game_Character[_0x21d116(0x278)][_0x21d116(0x49d)]=function(_0x47ec2f){const _0x8da6b3=_0x21d116,_0x396d81=/\$gameVariables\.value\((\d+)\)/gi,_0x558a8b=/\\V\[(\d+)\]/gi;while(_0x47ec2f[_0x8da6b3(0x34a)](_0x396d81)){_0x47ec2f=_0x47ec2f[_0x8da6b3(0x535)](_0x396d81,(_0x29e0c0,_0x58f2cb)=>$gameVariables[_0x8da6b3(0x34f)](parseInt(_0x58f2cb)));}while(_0x47ec2f['match'](_0x558a8b)){_0x47ec2f=_0x47ec2f['replace'](_0x558a8b,(_0x311fa4,_0x11cf4a)=>$gameVariables[_0x8da6b3(0x34f)](parseInt(_0x11cf4a)));}return _0x47ec2f;},Game_Character[_0x21d116(0x278)][_0x21d116(0x315)]=function(_0x2c49df){const _0x12903c=_0x21d116,_0x5a0903=/\\SELFVAR\[(\d+)\]/gi;while(_0x2c49df[_0x12903c(0x34a)](_0x5a0903)){_0x2c49df=_0x2c49df['replace'](_0x5a0903,(_0x37c7a5,_0x51a192)=>getSelfVariableValue(this['_mapId'],this[_0x12903c(0x3db)],parseInt(_0x51a192)));}return _0x2c49df;},Game_Character['prototype'][_0x21d116(0x2f7)]=function(_0x12687f,_0x15226e){const _0x20233b=_0x21d116;if(_0x15226e[_0x20233b(0x34a)](/ANIMATION:[ ](\d+)/i))return this[_0x20233b(0x2f1)](Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/BALLOON:[ ](.*)/i))return this[_0x20233b(0x530)](String(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/FADE IN:[ ](\d+)/i))return this[_0x20233b(0x4c4)](Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/FADE OUT:[ ](\d+)/i))return this[_0x20233b(0x321)](Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x15226e[_0x20233b(0x34a)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x20233b(0x436)]();if(_0x15226e[_0x20233b(0x34a)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x20233b(0x2ad)]();if(_0x15226e[_0x20233b(0x34a)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x20233b(0x3cf)]();if(_0x15226e[_0x20233b(0x34a)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall'](_0x20233b(0x1a9));if(_0x15226e[_0x20233b(0x34a)](/HUG:[ ]RIGHT/i))return this[_0x20233b(0x203)](_0x20233b(0x255));if(_0x15226e[_0x20233b(0x34a)](/INDEX:[ ](\d+)/i))return this[_0x20233b(0x551)](Number(RegExp['$1']));if(_0x15226e['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x33293f=this[_0x20233b(0x3d3)]+Number(RegExp['$1']);return this[_0x20233b(0x551)](_0x33293f);}if(_0x15226e[_0x20233b(0x34a)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x20233b(0x4ad)](Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20233b(0x32f)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x15226e[_0x20233b(0x34a)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x5a2da0=$gameMap[_0x20233b(0x25f)](Number(RegExp['$1']));return this[_0x20233b(0x4dd)](_0x5a2da0);}if(_0x15226e[_0x20233b(0x34a)](/JUMP TO PLAYER/i))return this[_0x20233b(0x4dd)]($gamePlayer);if(_0x15226e[_0x20233b(0x34a)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x327028=String(RegExp['$1']);return this['processMoveRouteMoveUntilStop'](_0x327028);}if(_0x15226e[_0x20233b(0x34a)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x3bf951=Number(RegExp['$1']),_0x474d58=Number(RegExp['$2']);return this[_0x20233b(0x300)](_0x3bf951,_0x474d58);}if(_0x15226e[_0x20233b(0x34a)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x1e2b98=$gameMap[_0x20233b(0x25f)](Number(RegExp['$1']));return this[_0x20233b(0x2dd)](_0x1e2b98);}if(_0x15226e[_0x20233b(0x34a)](/MOVE TO PLAYER/i))return this[_0x20233b(0x2dd)]($gamePlayer);if(_0x15226e['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x1,Number(RegExp['$1']));if(_0x15226e['match'](/MOVE DOWN:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x2,Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x3,Number(RegExp['$1']));if(_0x15226e['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x4,Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x6,Number(RegExp['$1']));if(_0x15226e['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x7,Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/MOVE UP:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x8,Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x20233b(0x1dc)](0x9,Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/OPACITY:[ ](\d+)([%％])/i)){const _0x465a42=Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x20233b(0x1ec)](_0x465a42[_0x20233b(0x3dc)](0x0,0xff));}if(_0x15226e['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x32fbf3=this['_opacity']+Math[_0x20233b(0x222)](Number(RegExp['$1'])/0x64*0xff);return this[_0x20233b(0x1ec)](_0x32fbf3[_0x20233b(0x3dc)](0x0,0xff));}if(_0x15226e[_0x20233b(0x34a)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x19978b=this[_0x20233b(0x1e6)]+Number(RegExp['$1']);return this[_0x20233b(0x1ec)](_0x19978b['clamp'](0x0,0xff));}if(_0x15226e['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x20233b(0x4a6)](Number(RegExp['$1']));if(_0x15226e[_0x20233b(0x34a)](/PATTERN UNLOCK/i))return this[_0x20233b(0x538)]=![];if(_0x15226e['match'](/POSE:[ ](.*)/i)){const _0x38be85=String(RegExp['$1'])[_0x20233b(0x377)]()['trim']();return this['setPose'](_0x38be85);}if(_0x15226e['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x298777=Number(RegExp['$1']),_0x3ebf61=Number(RegExp['$2']);return this[_0x20233b(0x2df)](_0x298777,_0x3ebf61);}if(_0x15226e[_0x20233b(0x34a)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0xce220e=$gameMap[_0x20233b(0x25f)](Number(RegExp['$1']));return this[_0x20233b(0x3c9)](_0xce220e);}if(_0x15226e[_0x20233b(0x34a)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToPlayer']($gamePlayer);if(_0x15226e[_0x20233b(0x34a)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x15226e[_0x20233b(0x34a)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x1d7067=$gameMap['event'](Number(RegExp['$1']));return this[_0x20233b(0x4ef)](_0x1d7067);}if(_0x15226e[_0x20233b(0x34a)](/STEP AWAY FROM PLAYER/i))return this[_0x20233b(0x4ef)]($gamePlayer);if(_0x15226e[_0x20233b(0x34a)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20233b(0x19f)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x15226e[_0x20233b(0x34a)](/TURN TO EVENT:[ ](\d+)/i)){const _0x36bbe6=$gameMap[_0x20233b(0x25f)](Number(RegExp['$1']));return this[_0x20233b(0x328)](_0x36bbe6);}if(_0x15226e[_0x20233b(0x34a)](/TURN TO PLAYER/i))return this[_0x20233b(0x328)]($gamePlayer);if(_0x15226e[_0x20233b(0x34a)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x15226e[_0x20233b(0x34a)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x1fc076=$gameMap['event'](Number(RegExp['$1']));return this[_0x20233b(0x216)](_0x1fc076);}if(_0x15226e['match'](/TURN AWAY FROM PLAYER/i))return this[_0x20233b(0x216)]($gamePlayer);if(_0x15226e[_0x20233b(0x34a)](/TURN LOWER LEFT/i))return this[_0x20233b(0x511)](0x1);if(_0x15226e[_0x20233b(0x34a)](/TURN LOWER RIGHT/i))return this[_0x20233b(0x511)](0x3);if(_0x15226e['match'](/TURN UPPER LEFT/i))return this[_0x20233b(0x511)](0x7);if(_0x15226e[_0x20233b(0x34a)](/TURN UPPER RIGHT/i))return this[_0x20233b(0x511)](0x9);if(_0x15226e[_0x20233b(0x34a)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x20233b(0x539)](RegExp['$1'],RegExp['$2']);if(_0x15226e[_0x20233b(0x34a)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x20233b(0x3d7)](RegExp['$1'],RegExp['$2']);if(_0x15226e[_0x20233b(0x34a)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x20233b(0x497)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x15226e['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x3ecd72=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x3ecd72);}if(_0x15226e['match'](/TELEPORT TO PLAYER/i))return this[_0x20233b(0x453)]($gamePlayer);try{VisuMZ[_0x20233b(0x4d7)][_0x20233b(0x1fc)][_0x20233b(0x2b6)](this,_0x12687f);}catch(_0x2d7f0a){if($gameTemp[_0x20233b(0x4b8)]())console[_0x20233b(0x4f9)](_0x2d7f0a);}},Game_Character[_0x21d116(0x278)]['processMoveRouteAnimation']=function(_0x3f278f){$gameTemp['requestAnimation']([this],_0x3f278f);},Game_Character[_0x21d116(0x278)]['processMoveRouteBalloon']=function(_0xb5fa09){const _0x3fd430=_0x21d116;let _0x44d5df=0x0;switch(_0xb5fa09['toUpperCase']()[_0x3fd430(0x49c)]()){case'!':case _0x3fd430(0x3d8):_0x44d5df=0x1;break;case'?':case _0x3fd430(0x288):_0x44d5df=0x2;break;case _0x3fd430(0x41b):case _0x3fd430(0x42d):case _0x3fd430(0x51b):case'MUSIC-NOTE':case _0x3fd430(0x391):_0x44d5df=0x3;break;case _0x3fd430(0x214):case'LOVE':_0x44d5df=0x4;break;case _0x3fd430(0x2b9):_0x44d5df=0x5;break;case _0x3fd430(0x226):_0x44d5df=0x6;break;case _0x3fd430(0x2bf):case _0x3fd430(0x47b):case'FRUSTRATION':_0x44d5df=0x7;break;case _0x3fd430(0x3a0):case _0x3fd430(0x51f):_0x44d5df=0x8;break;case _0x3fd430(0x204):case'BULB':case _0x3fd430(0x365):case _0x3fd430(0x3e3):case _0x3fd430(0x1ca):_0x44d5df=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x3fd430(0x1a5):_0x44d5df=0xa;break;case _0x3fd430(0x46c):_0x44d5df=0xb;break;case _0x3fd430(0x4ce):_0x44d5df=0xc;break;case _0x3fd430(0x2b3):_0x44d5df=0xd;break;case _0x3fd430(0x2a3):_0x44d5df=0xe;break;case _0x3fd430(0x23b):_0x44d5df=0xf;break;}$gameTemp[_0x3fd430(0x470)](this,_0x44d5df);},Game_Character[_0x21d116(0x278)][_0x21d116(0x4c4)]=function(_0x307558){const _0x3a4640=_0x21d116;_0x307558+=this[_0x3a4640(0x1e6)],this[_0x3a4640(0x1ec)](_0x307558[_0x3a4640(0x3dc)](0x0,0xff));if(this[_0x3a4640(0x1e6)]<0xff)this[_0x3a4640(0x564)]--;},Game_Character[_0x21d116(0x278)]['processMoveRouteFadeOut']=function(_0x37e024){const _0x312fe8=_0x21d116;_0x37e024=this[_0x312fe8(0x1e6)]-_0x37e024,this['setOpacity'](_0x37e024[_0x312fe8(0x3dc)](0x0,0xff));if(this[_0x312fe8(0x1e6)]>0x0)this[_0x312fe8(0x564)]--;},Game_Character[_0x21d116(0x278)][_0x21d116(0x203)]=function(_0x29f659){const _0xea03c0=_0x21d116,_0x27d1c0=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x494c33=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1fbff5=this[_0xea03c0(0x2da)](),_0x2c8f20=(_0x29f659==='left'?_0x27d1c0:_0x494c33)[_0x1fbff5],_0x6b9a04=(_0x29f659===_0xea03c0(0x1a9)?_0x494c33:_0x27d1c0)[_0x1fbff5];if(this[_0xea03c0(0x2a5)](this['x'],this['y'],_0x2c8f20))_0x29f659==='left'?this['turnLeft90']():this[_0xea03c0(0x2ed)]();else!this['canPass'](this['x'],this['y'],this['direction']())&&(this[_0xea03c0(0x2a5)](this['x'],this['y'],_0x6b9a04)?_0x29f659===_0xea03c0(0x1a9)?this['turnRight90']():this['turnLeft90']():this[_0xea03c0(0x418)]());this[_0xea03c0(0x2a5)](this['x'],this['y'],this[_0xea03c0(0x2da)]())&&this[_0xea03c0(0x2d1)]();},Game_Character[_0x21d116(0x278)]['processMoveRouteSetIndex']=function(_0x1ee590){const _0x48ec3f=_0x21d116;if(ImageManager[_0x48ec3f(0x299)](this[_0x48ec3f(0x3b9)]))return;_0x1ee590=_0x1ee590[_0x48ec3f(0x3dc)](0x0,0x7),this['setImage'](this[_0x48ec3f(0x3b9)],_0x1ee590);},Game_Character['prototype'][_0x21d116(0x4ad)]=function(_0x22471a){const _0x1a419a=_0x21d116;switch(this[_0x1a419a(0x2da)]()){case 0x1:this[_0x1a419a(0x552)](-_0x22471a,_0x22471a);break;case 0x2:this[_0x1a419a(0x552)](0x0,_0x22471a);break;case 0x3:this['jump'](_0x22471a,_0x22471a);break;case 0x4:this[_0x1a419a(0x552)](-_0x22471a,0x0);break;case 0x6:this[_0x1a419a(0x552)](_0x22471a,0x0);break;case 0x7:this[_0x1a419a(0x552)](-_0x22471a,-_0x22471a);break;case 0x8:this[_0x1a419a(0x552)](0x0,-_0x22471a);break;case 0x9:this[_0x1a419a(0x552)](_0x22471a,-_0x22471a);break;}},Game_Character[_0x21d116(0x278)][_0x21d116(0x32f)]=function(_0x149a60,_0x32256c){const _0x36234f=_0x21d116,_0x5f0d99=Math[_0x36234f(0x222)](_0x149a60-this['x']),_0x460429=Math[_0x36234f(0x222)](_0x32256c-this['y']);this[_0x36234f(0x552)](_0x5f0d99,_0x460429);},Game_Character['prototype']['processMoveRouteJumpToCharacter']=function(_0x5eb6bf){const _0x3b2fba=_0x21d116;if(_0x5eb6bf)this[_0x3b2fba(0x32f)](_0x5eb6bf['x'],_0x5eb6bf['y']);},Game_Character[_0x21d116(0x278)][_0x21d116(0x2df)]=function(_0x552934,_0x25f8e0){const _0x324560=_0x21d116;let _0x4f6433=0x0;$gameMap[_0x324560(0x48d)]()?_0x4f6433=this[_0x324560(0x3f5)](_0x552934,_0x25f8e0):_0x4f6433=this[_0x324560(0x4e5)](_0x552934,_0x25f8e0),this[_0x324560(0x542)](_0x4f6433),this[_0x324560(0x4fe)](!![]);},Game_Character[_0x21d116(0x278)]['processMoveRouteStepToCharacter']=function(_0x45ae6e){const _0x1edd5f=_0x21d116;if(_0x45ae6e)this[_0x1edd5f(0x2df)](_0x45ae6e['x'],_0x45ae6e['y']);},Game_Character[_0x21d116(0x278)][_0x21d116(0x358)]=function(_0x537f01,_0x47dd1d){const _0x4047a2=_0x21d116,_0x59479c=this[_0x4047a2(0x1b9)](_0x537f01),_0x57514e=this[_0x4047a2(0x4c1)](_0x47dd1d);},Game_Character[_0x21d116(0x278)][_0x21d116(0x36f)]=function(_0x29487d){const _0x366144=_0x21d116,_0x303f7e=['',_0x366144(0x383),_0x366144(0x452),'LOWER\x20RIGHT',_0x366144(0x25d),'',_0x366144(0x33f),_0x366144(0x3cc),'UP',_0x366144(0x276)],_0x1a6a9e=_0x303f7e['indexOf'](_0x29487d['toUpperCase']()[_0x366144(0x49c)]());if(directioin<=0x0)return;this['canPass'](this['x'],this['y'],_0x1a6a9e)&&(this['executeMoveDir8'](_0x1a6a9e),this[_0x366144(0x564)]-=0x1);},Game_Character[_0x21d116(0x278)][_0x21d116(0x300)]=function(_0x386fb7,_0x4699cc){const _0xa07457=_0x21d116;this['processMoveRouteStepTo'](_0x386fb7,_0x4699cc);if(this['x']!==_0x386fb7||this['y']!==_0x4699cc)this[_0xa07457(0x564)]--;},Game_Character['prototype']['processMoveRouteMoveToCharacter']=function(_0x47da0a){const _0x20eaa3=_0x21d116;if(_0x47da0a)this[_0x20eaa3(0x300)](_0x47da0a['x'],_0x47da0a['y']);},Game_Character['prototype'][_0x21d116(0x1dc)]=function(_0x4d9598,_0x31bd87){const _0x2b4bbc=_0x21d116;_0x31bd87=_0x31bd87||0x0;const _0x50b93d={'code':0x1,'indent':null,'parameters':[]};_0x50b93d[_0x2b4bbc(0x50d)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x4d9598],this['_moveRoute'][_0x2b4bbc(0x1c7)][this[_0x2b4bbc(0x564)]][_0x2b4bbc(0x286)][0x0]='';while(_0x31bd87--){this[_0x2b4bbc(0x1f9)]['list'][_0x2b4bbc(0x2b4)](this[_0x2b4bbc(0x564)]+0x1,0x0,_0x50b93d);}},Game_Character[_0x21d116(0x278)][_0x21d116(0x4a6)]=function(_0x4d7309){this['_patternLocked']=!![],this['setPattern'](_0x4d7309);},Game_Character[_0x21d116(0x278)][_0x21d116(0x539)]=function(_0x3b8d6a,_0x1fd0a2){const _0x5b3008=_0x21d116;if(this===$gamePlayer)return;const _0x56080a=[this['_mapId'],this[_0x5b3008(0x3db)],'A'];_0x3b8d6a[_0x5b3008(0x34a)](/\b[ABCD]\b/i)?_0x56080a[0x2]=String(_0x3b8d6a)[_0x5b3008(0x412)](0x0)['toUpperCase']()[_0x5b3008(0x49c)]():_0x56080a[0x2]=_0x5b3008(0x4da)[_0x5b3008(0x3b1)](_0x3b8d6a);switch(_0x1fd0a2['toUpperCase']()[_0x5b3008(0x49c)]()){case'ON':case _0x5b3008(0x29b):$gameSelfSwitches[_0x5b3008(0x2a7)](_0x56080a,!![]);break;case _0x5b3008(0x1b1):case _0x5b3008(0x407):$gameSelfSwitches['setValue'](_0x56080a,![]);break;case'Toggle':$gameSelfSwitches[_0x5b3008(0x2a7)](_0x56080a,!$gameSelfSwitches['value'](_0x56080a));break;}},Game_Character[_0x21d116(0x278)][_0x21d116(0x3d7)]=function(_0x23a0b3,_0x1b468a){const _0x5be005=_0x21d116;if(this===$gamePlayer)return;const _0x10af32=[this['_mapId'],this[_0x5be005(0x3db)],'Self\x20Variable\x20%1'['format'](switchId)];$gameSelfSwitches['setValue'](_0x10af32,Number(_0x1b468a));},Game_Character[_0x21d116(0x278)][_0x21d116(0x497)]=function(_0x4af5a1,_0x3012ac){const _0x1db2ff=_0x21d116;this[_0x1db2ff(0x3ee)](_0x4af5a1,_0x3012ac);},Game_Character[_0x21d116(0x278)][_0x21d116(0x453)]=function(_0xfb1ed4){if(_0xfb1ed4)this['processMoveRouteTeleportTo'](_0xfb1ed4['x'],_0xfb1ed4['y']);},Game_Character['prototype']['turnRight90']=function(){const _0x3a75c8=_0x21d116;switch(this[_0x3a75c8(0x2da)]()){case 0x1:this[_0x3a75c8(0x511)](0x7);break;case 0x2:this[_0x3a75c8(0x511)](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this[_0x3a75c8(0x511)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0x3a75c8(0x511)](0x9);break;case 0x8:this[_0x3a75c8(0x511)](0x6);break;case 0x9:this[_0x3a75c8(0x511)](0x3);break;}},Game_Character['prototype'][_0x21d116(0x560)]=function(){const _0x399831=_0x21d116;switch(this[_0x399831(0x2da)]()){case 0x1:this[_0x399831(0x511)](0x3);break;case 0x2:this[_0x399831(0x511)](0x6);break;case 0x3:this[_0x399831(0x511)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this['setDirection'](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x399831(0x511)](0x4);break;case 0x9:this[_0x399831(0x511)](0x7);break;}},Game_Character[_0x21d116(0x278)][_0x21d116(0x39d)]=function(_0x5bb0ea,_0x88845d,_0x21cfa6){const _0x262a16=_0x21d116,_0x470dba=this[_0x262a16(0x1b9)](_0x5bb0ea),_0x43fed6=this[_0x262a16(0x4c1)](_0x88845d);if($gameMap[_0x262a16(0x48d)]()){if(_0x21cfa6||this[_0x262a16(0x21d)]()){if(_0x470dba>0x0&&_0x43fed6<0x0)return 0x1;if(_0x470dba<0x0&&_0x43fed6<0x0)return 0x3;if(_0x470dba>0x0&&_0x43fed6>0x0)return 0x7;if(_0x470dba<0x0&&_0x43fed6>0x0)return 0x9;}}if(Math[_0x262a16(0x435)](_0x470dba)>Math['abs'](_0x43fed6))return _0x470dba>0x0?0x4:0x6;else{if(_0x43fed6!==0x0)return _0x43fed6>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x21d116(0x278)]['getDirectionFromPoint']=function(_0x1f6f1e,_0x2f3bf7,_0x554aa1){const _0x41077f=_0x21d116,_0x1342d5=this[_0x41077f(0x1b9)](_0x1f6f1e),_0x336f06=this[_0x41077f(0x4c1)](_0x2f3bf7);if($gameMap[_0x41077f(0x48d)]()){if(_0x554aa1||this[_0x41077f(0x21d)]()){if(_0x1342d5>0x0&&_0x336f06<0x0)return 0x9;if(_0x1342d5<0x0&&_0x336f06<0x0)return 0x7;if(_0x1342d5>0x0&&_0x336f06>0x0)return 0x3;if(_0x1342d5<0x0&&_0x336f06>0x0)return 0x1;}}if(Math[_0x41077f(0x435)](_0x1342d5)>Math[_0x41077f(0x435)](_0x336f06))return _0x1342d5>0x0?0x6:0x4;else{if(_0x336f06!==0x0)return _0x336f06>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x21d116(0x278)][_0x21d116(0x19f)]=function(_0x3ab511,_0xb6b240){const _0x6d56ce=_0x21d116,_0xcdd48a=this[_0x6d56ce(0x39d)](_0x3ab511,_0xb6b240,!![]);if(_0xcdd48a)this['executeMoveDir8'](_0xcdd48a);},Game_Character[_0x21d116(0x278)][_0x21d116(0x24f)]=function(_0x38005a,_0x333d27){const _0x20cec6=_0x21d116,_0x120ee3=this[_0x20cec6(0x4d8)](_0x38005a,_0x333d27,!![]);if(_0x120ee3)this['executeMoveDir8'](_0x120ee3);},Game_Character['prototype'][_0x21d116(0x4ea)]=function(_0x403fd3,_0x28626f){const _0x2c0d5e=_0x21d116,_0x3a5275=this[_0x2c0d5e(0x39d)](_0x403fd3,_0x28626f,![]);if(_0x3a5275)this[_0x2c0d5e(0x511)](_0x3a5275);},Game_Character[_0x21d116(0x278)][_0x21d116(0x3d6)]=function(_0x5a63b0,_0x4cabdc){const _0x45ccf7=_0x21d116,_0x5dcadf=this['getDirectionFromPoint'](_0x5a63b0,_0x4cabdc,![]);if(_0x5dcadf)this[_0x45ccf7(0x511)](_0x5dcadf);},Game_Character['prototype'][_0x21d116(0x2d6)]=function(_0x1bb68b){const _0x45d01a=_0x21d116;if(_0x1bb68b)this[_0x45d01a(0x19f)](_0x1bb68b['x'],_0x1bb68b['y']);},Game_Character[_0x21d116(0x278)]['moveAwayFromCharacter']=function(_0x528585){if(_0x528585)this['moveAwayFromPoint'](_0x528585['x'],_0x528585['y']);},Game_Character[_0x21d116(0x278)]['turnTowardCharacter']=function(_0x305804){const _0x50057b=_0x21d116;if(_0x305804)this[_0x50057b(0x4ea)](_0x305804['x'],_0x305804['y']);},Game_Character[_0x21d116(0x278)][_0x21d116(0x216)]=function(_0xbe382c){const _0x3fe3f6=_0x21d116;if(_0xbe382c)this[_0x3fe3f6(0x3d6)](_0xbe382c['x'],_0xbe382c['y']);},VisuMZ[_0x21d116(0x4d7)]['Game_Player_isDashing']=Game_Player[_0x21d116(0x278)][_0x21d116(0x397)],Game_Player[_0x21d116(0x278)]['isDashing']=function(){const _0x437dba=_0x21d116;if(this[_0x437dba(0x4d9)])return!![];return VisuMZ[_0x437dba(0x4d7)][_0x437dba(0x528)][_0x437dba(0x2b6)](this);},Game_Player[_0x21d116(0x278)][_0x21d116(0x3fc)]=function(){const _0x5c84ec=_0x21d116;return this[_0x5c84ec(0x397)]()&&(this[_0x5c84ec(0x454)]()||this[_0x5c84ec(0x4f6)]()!==0x0&&this['canPass'](this['_x'],this['_y'],this['getInputDirection']())||$gameTemp['isDestinationValid']());},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x241)]=Game_Player[_0x21d116(0x278)][_0x21d116(0x4f6)],Game_Player['prototype'][_0x21d116(0x4f6)]=function(){const _0x16bf62=_0x21d116;return $gameMap['isSupportDiagonalMovement']()?this[_0x16bf62(0x1dd)]():VisuMZ['EventsMoveCore'][_0x16bf62(0x241)][_0x16bf62(0x2b6)](this);},Game_Player[_0x21d116(0x278)][_0x21d116(0x1dd)]=function(){const _0x3cebe1=_0x21d116;return Input[_0x3cebe1(0x3f1)];},Game_Player[_0x21d116(0x278)][_0x21d116(0x37c)]=function(){const _0x38ceb1=_0x21d116;if($gameSystem[_0x38ceb1(0x504)]())return 0x0;if(!this[_0x38ceb1(0x454)]()&&this[_0x38ceb1(0x30c)]()){let _0x3f4459=this[_0x38ceb1(0x4f6)]();if(_0x3f4459>0x0)$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){const _0x36e89e=$gameTemp[_0x38ceb1(0x447)](),_0x576003=$gameTemp[_0x38ceb1(0x41f)](),_0x15442b=$gameMap['isSupportDiagonalMovement'](),_0x43a926=$gameMap['isPassableByAnyDirection'](_0x36e89e,_0x576003),_0x55b5ab=$gameMap['eventsXyNt'](_0x36e89e,_0x576003)[_0x38ceb1(0x2de)]<=0x0;_0x15442b&&_0x43a926&&_0x55b5ab?_0x3f4459=this['findDiagonalDirectionTo'](_0x36e89e,_0x576003):_0x3f4459=this[_0x38ceb1(0x4e5)](_0x36e89e,_0x576003);}}_0x3f4459>0x0?(this[_0x38ceb1(0x52f)]=this[_0x38ceb1(0x52f)]||0x0,this[_0x38ceb1(0x342)]()?this[_0x38ceb1(0x511)](_0x3f4459):this[_0x38ceb1(0x2cd)](_0x3f4459),this[_0x38ceb1(0x52f)]++):this[_0x38ceb1(0x52f)]=0x0;}},Game_Player['prototype'][_0x21d116(0x342)]=function(){const _0x44fcbb=_0x21d116,_0xc91ad4=VisuMZ['EventsMoveCore']['Settings'][_0x44fcbb(0x1be)];if(!_0xc91ad4['EnableTurnInPlace'])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x44fcbb(0x397)]()||this[_0x44fcbb(0x454)]()||this[_0x44fcbb(0x53f)]())return![];return this[_0x44fcbb(0x52f)]<_0xc91ad4[_0x44fcbb(0x33e)];},VisuMZ[_0x21d116(0x4d7)]['Game_Player_executeMove']=Game_Player[_0x21d116(0x278)]['executeMove'],Game_Player['prototype'][_0x21d116(0x2cd)]=function(_0x4d8834){const _0x5d95b4=_0x21d116;$gameMap[_0x5d95b4(0x48d)]()?this['executeMoveDir8'](_0x4d8834):VisuMZ[_0x5d95b4(0x4d7)][_0x5d95b4(0x3fd)][_0x5d95b4(0x2b6)](this,_0x4d8834);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x39b)]=Game_Player[_0x21d116(0x278)][_0x21d116(0x3bd)],Game_Player['prototype']['isMapPassable']=function(_0x38d3da,_0x45a854,_0x5e1997){const _0x10b9f1=_0x21d116;if($gameMap['isRegionAllowPass'](_0x38d3da,_0x45a854,_0x5e1997,'player'))return this[_0x10b9f1(0x202)]()&&this[_0x10b9f1(0x557)]()?this[_0x10b9f1(0x557)]()[_0x10b9f1(0x3bd)](_0x38d3da,_0x45a854,_0x5e1997):!![];if($gameMap[_0x10b9f1(0x42f)](_0x38d3da,_0x45a854,_0x5e1997,'player'))return![];return VisuMZ[_0x10b9f1(0x4d7)]['Game_Player_isMapPassable']['call'](this,_0x38d3da,_0x45a854,_0x5e1997);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x54c)]=Game_Player[_0x21d116(0x278)][_0x21d116(0x329)],Game_Player['prototype']['checkEventTriggerHere']=function(_0x43a5b9){const _0x5c6348=_0x21d116;VisuMZ[_0x5c6348(0x4d7)]['Game_Player_checkEventTriggerHere'][_0x5c6348(0x2b6)](this,_0x43a5b9);if(this[_0x5c6348(0x23f)]()){this[_0x5c6348(0x554)](_0x43a5b9);if(_0x43a5b9['includes'](0x0)&&this[_0x5c6348(0x218)]()===_0x5c6348(0x1cc))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x43a5b9[_0x5c6348(0x2e8)](0x1)||_0x43a5b9[_0x5c6348(0x2e8)](0x2))&&this[_0x5c6348(0x50f)]();}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player['prototype'][_0x21d116(0x23e)],Game_Player[_0x21d116(0x278)][_0x21d116(0x23e)]=function(_0x3177be){const _0x4098c1=_0x21d116;VisuMZ[_0x4098c1(0x4d7)][_0x4098c1(0x4df)]['call'](this,_0x3177be);if(this[_0x4098c1(0x23f)]()&&_0x3177be['includes'](0x0)&&this[_0x4098c1(0x218)]()==='front'){const _0x58fedd=this[_0x4098c1(0x2da)](),_0x24088a=$gameMap['roundXWithDirection'](this['x'],_0x58fedd),_0x2e5fde=$gameMap[_0x4098c1(0x4fc)](this['y'],_0x58fedd);this[_0x4098c1(0x3c0)](_0x24088a,_0x2e5fde);}},Game_Player['prototype'][_0x21d116(0x554)]=function(_0x5d0327){const _0x22f277=_0x21d116;if($gameMap[_0x22f277(0x428)]())return;if($gameMap[_0x22f277(0x519)]())return;const _0x224b09=$gameMap[_0x22f277(0x550)]();for(const _0x27f3b2 of _0x224b09){if(!_0x27f3b2)continue;if(!_0x27f3b2['isTriggerIn'](_0x5d0327))continue;if(this['meetActivationRegionConditions'](_0x27f3b2))return _0x27f3b2['start']();if(this[_0x22f277(0x2c6)](_0x27f3b2))return _0x27f3b2['start']();}},Game_Player[_0x21d116(0x278)]['meetActivationRegionConditions']=function(_0x9e8e83){const _0x10e4fd=_0x21d116;if($gameMap[_0x10e4fd(0x428)]())return![];if($gameMap[_0x10e4fd(0x519)]())return![];return _0x9e8e83[_0x10e4fd(0x575)]()['includes'](this[_0x10e4fd(0x56b)]());},Game_Player['prototype'][_0x21d116(0x2c6)]=function(_0x7e7b0b){const _0x5ac4ff=_0x21d116;if($gameMap['isEventRunning']())return![];if($gameMap[_0x5ac4ff(0x519)]())return![];if([_0x5ac4ff(0x2c7),'region'][_0x5ac4ff(0x2e8)](_0x7e7b0b['activationProximityType']()))return![];const _0x22bcc9=_0x7e7b0b['activationProximityType'](),_0x46d316=_0x7e7b0b['activationProximityDistance']();switch(_0x22bcc9){case _0x5ac4ff(0x444):const _0x1c3149=$gameMap[_0x5ac4ff(0x413)](this['x'],this['y'],_0x7e7b0b['x'],_0x7e7b0b['y']);return _0x7e7b0b[_0x5ac4ff(0x254)]()>=_0x1c3149;break;case'square':return _0x46d316>=Math[_0x5ac4ff(0x435)](_0x7e7b0b[_0x5ac4ff(0x1b9)](this['x']))&&_0x46d316>=Math[_0x5ac4ff(0x435)](_0x7e7b0b[_0x5ac4ff(0x4c1)](this['y']));break;case'row':return _0x46d316>=Math[_0x5ac4ff(0x435)](_0x7e7b0b[_0x5ac4ff(0x4c1)](this['y']));break;case _0x5ac4ff(0x534):return _0x46d316>=Math[_0x5ac4ff(0x435)](_0x7e7b0b[_0x5ac4ff(0x1b9)](this['x']));break;case _0x5ac4ff(0x3c5):return![];break;}},Game_Player[_0x21d116(0x278)]['startMapCommonEventOnOK']=function(_0x21e324,_0x1b5a1c){const _0x3fd52c=_0x21d116;if($gameMap[_0x3fd52c(0x428)]())return;if($gameMap[_0x3fd52c(0x519)]())return;let _0x3dc262=VisuMZ['EventsMoveCore'][_0x3fd52c(0x1ac)][_0x3fd52c(0x2e4)],_0x5b0e68=$gameMap[_0x3fd52c(0x56b)](_0x21e324,_0x1b5a1c);const _0x268e88=_0x3fd52c(0x3e9)[_0x3fd52c(0x3b1)](_0x5b0e68);_0x3dc262[_0x268e88]&&$gameTemp[_0x3fd52c(0x27e)](_0x3dc262[_0x268e88]);},Game_Player['prototype'][_0x21d116(0x218)]=function(){const _0x30cefa=_0x21d116;return VisuMZ[_0x30cefa(0x4d7)][_0x30cefa(0x1ac)]['RegionOkTarget'];},Game_Player[_0x21d116(0x278)][_0x21d116(0x50f)]=function(){const _0x5539a9=_0x21d116;if($gameMap[_0x5539a9(0x428)]())return;if($gameMap[_0x5539a9(0x519)]())return;let _0x187326=VisuMZ[_0x5539a9(0x4d7)]['Settings'][_0x5539a9(0x4d3)];const _0x3f6280=_0x5539a9(0x3e9)[_0x5539a9(0x3b1)](this['regionId']());_0x187326[_0x3f6280]&&$gameTemp[_0x5539a9(0x27e)](_0x187326[_0x3f6280]);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x364)]=Game_Player[_0x21d116(0x278)][_0x21d116(0x243)],Game_Player[_0x21d116(0x278)][_0x21d116(0x243)]=function(){const _0x892d93=_0x21d116;VisuMZ['EventsMoveCore'][_0x892d93(0x364)][_0x892d93(0x2b6)](this),VisuMZ[_0x892d93(0x2d7)](0x0);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x2aa)]=Game_Follower[_0x21d116(0x278)]['initialize'],Game_Follower['prototype'][_0x21d116(0x318)]=function(_0x154972){const _0x483f64=_0x21d116;VisuMZ[_0x483f64(0x4d7)][_0x483f64(0x2aa)][_0x483f64(0x2b6)](this,_0x154972),this[_0x483f64(0x431)]=![];},Game_Follower[_0x21d116(0x278)]['isDashing']=function(){const _0x27991a=_0x21d116;return $gamePlayer[_0x27991a(0x397)]();},Game_Follower[_0x21d116(0x278)][_0x21d116(0x3fc)]=function(){const _0x3e38d0=_0x21d116;return $gamePlayer[_0x3e38d0(0x3fc)]();},Game_Follower[_0x21d116(0x278)][_0x21d116(0x415)]=function(){const _0x15d916=_0x21d116;return $gamePlayer[_0x15d916(0x415)]();},Game_Follower[_0x21d116(0x278)]['setChaseOff']=function(_0x8d7777){const _0x5c16aa=_0x21d116;this[_0x5c16aa(0x431)]=_0x8d7777;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x46a)]=Game_Follower[_0x21d116(0x278)][_0x21d116(0x1c6)],Game_Follower[_0x21d116(0x278)]['chaseCharacter']=function(_0x54b765){const _0x227b00=_0x21d116;if(this[_0x227b00(0x431)])return;if($gameSystem[_0x227b00(0x36b)]())return;VisuMZ[_0x227b00(0x4d7)][_0x227b00(0x46a)][_0x227b00(0x2b6)](this,_0x54b765);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x246)]=Game_Vehicle[_0x21d116(0x278)]['isMapPassable'],Game_Vehicle[_0x21d116(0x278)][_0x21d116(0x3bd)]=function(_0x588fc8,_0x4863e4,_0x24a7f5){const _0x2e503d=_0x21d116;if($gameMap['isRegionAllowPass'](_0x588fc8,_0x4863e4,_0x24a7f5,this[_0x2e503d(0x303)]))return!![];if($gameMap[_0x2e503d(0x42f)](_0x588fc8,_0x4863e4,_0x24a7f5,this[_0x2e503d(0x303)]))return![];return VisuMZ[_0x2e503d(0x4d7)][_0x2e503d(0x246)][_0x2e503d(0x2b6)](this,_0x588fc8,_0x4863e4,_0x24a7f5);},Game_Vehicle[_0x21d116(0x278)][_0x21d116(0x4e0)]=function(_0x49c18d,_0x11c12d,_0x53118d){const _0x49e2e5=_0x21d116;if($gameMap[_0x49e2e5(0x1c3)](_0x49c18d,_0x11c12d,_0x53118d,this[_0x49e2e5(0x303)]))return!![];if($gameMap[_0x49e2e5(0x42f)](_0x49c18d,_0x11c12d,_0x53118d,this[_0x49e2e5(0x303)]))return![];return VisuMZ[_0x49e2e5(0x4d7)][_0x49e2e5(0x24d)][_0x49e2e5(0x2b6)]($gamePlayer,_0x49c18d,_0x11c12d,_0x53118d);},VisuMZ[_0x21d116(0x4d7)]['Game_Vehicle_isLandOk']=Game_Vehicle[_0x21d116(0x278)][_0x21d116(0x325)],Game_Vehicle[_0x21d116(0x278)]['isLandOk']=function(_0xa8676f,_0x174d6b,_0x2b7bcd){const _0x43388b=_0x21d116;if($gameMap[_0x43388b(0x2b7)](_0xa8676f,_0x174d6b,_0x2b7bcd,this[_0x43388b(0x303)]))return!![];const _0xed6183=this[_0x43388b(0x303)][_0x43388b(0x412)](0x0)[_0x43388b(0x377)]()+this[_0x43388b(0x303)][_0x43388b(0x2d2)](0x1),_0x5a522a='%1DockRegionOnly'['format'](_0xed6183);return VisuMZ['EventsMoveCore']['Settings'][_0x43388b(0x245)][_0x5a522a]?![]:VisuMZ[_0x43388b(0x4d7)][_0x43388b(0x1c2)][_0x43388b(0x2b6)](this,_0xa8676f,_0x174d6b,_0x2b7bcd);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x238)]=Game_Vehicle[_0x21d116(0x278)][_0x21d116(0x32e)],Game_Vehicle['prototype'][_0x21d116(0x32e)]=function(){const _0x4f342a=_0x21d116;VisuMZ[_0x4f342a(0x4d7)]['Game_Vehicle_initMoveSpeed'][_0x4f342a(0x2b6)](this);const _0x4c3d86=VisuMZ[_0x4f342a(0x4d7)]['Settings'][_0x4f342a(0x1be)];if(this[_0x4f342a(0x408)]()){if(_0x4c3d86[_0x4f342a(0x3b6)])this[_0x4f342a(0x44e)](_0x4c3d86[_0x4f342a(0x3b6)]);}else{if(this[_0x4f342a(0x40d)]()){if(_0x4c3d86[_0x4f342a(0x458)])this[_0x4f342a(0x44e)](_0x4c3d86[_0x4f342a(0x458)]);}else{if(this[_0x4f342a(0x309)]()){if(_0x4c3d86[_0x4f342a(0x495)])this[_0x4f342a(0x44e)](_0x4c3d86[_0x4f342a(0x495)]);}}}},VisuMZ['EventsMoveCore'][_0x21d116(0x231)]=Game_Event['prototype'][_0x21d116(0x318)],Game_Event[_0x21d116(0x278)]['initialize']=function(_0x2e1032,_0x2196b2){const _0x370f52=_0x21d116;VisuMZ['EventsMoveCore'][_0x370f52(0x231)][_0x370f52(0x2b6)](this,_0x2e1032,_0x2196b2),this[_0x370f52(0x47e)](),this[_0x370f52(0x3e2)](),this[_0x370f52(0x2f8)]();},VisuMZ['EventsMoveCore'][_0x21d116(0x25c)]=Game_Event[_0x21d116(0x278)][_0x21d116(0x25f)],Game_Event[_0x21d116(0x278)][_0x21d116(0x25f)]=function(){const _0x501d88=_0x21d116;if(this[_0x501d88(0x21a)]!==undefined){const _0x5a2b9f=this[_0x501d88(0x21a)]['mapId'],_0xedda9b=this[_0x501d88(0x21a)][_0x501d88(0x36a)];return VisuMZ['PreloadedMaps'][_0x5a2b9f][_0x501d88(0x550)][_0xedda9b];}if(this[_0x501d88(0x477)]!==undefined){const _0x337828=this[_0x501d88(0x477)][_0x501d88(0x2cf)],_0x385296=this['_eventCopyData'][_0x501d88(0x36a)];return VisuMZ[_0x501d88(0x491)][_0x337828]['events'][_0x385296];}if(this[_0x501d88(0x56a)]!==undefined){const _0x3f57da=this[_0x501d88(0x56a)][_0x501d88(0x2cf)],_0x5db14d=this[_0x501d88(0x56a)]['eventId'];return VisuMZ[_0x501d88(0x491)][_0x3f57da]['events'][_0x5db14d];}if($gameTemp[_0x501d88(0x531)]!==undefined){const _0x140bc1=$gameTemp[_0x501d88(0x531)]['mapId'],_0x5cffbc=$gameTemp['_spawnData'][_0x501d88(0x36a)];return VisuMZ['PreloadedMaps'][_0x140bc1]['events'][_0x5cffbc];}return VisuMZ['EventsMoveCore'][_0x501d88(0x25c)][_0x501d88(0x2b6)](this);},Game_Event['prototype'][_0x21d116(0x515)]=function(_0x772c3e,_0x2d0b66){const _0x2f0892=_0x21d116;if(_0x772c3e===0x0||_0x2d0b66===0x0)return![];if(!VisuMZ['PreloadedMaps'][_0x772c3e])return $gameTemp['isPlaytest']()&&console['log'](_0x2f0892(0x525)['format'](_0x772c3e)),![];return!![];},VisuMZ['EventsMoveCore'][_0x21d116(0x47a)]=Game_Event[_0x21d116(0x278)][_0x21d116(0x46b)],Game_Event[_0x21d116(0x278)][_0x21d116(0x46b)]=function(){const _0xee5cae=_0x21d116;VisuMZ[_0xee5cae(0x4d7)][_0xee5cae(0x47a)][_0xee5cae(0x2b6)](this),Imported[_0xee5cae(0x1ff)]&&Input[_0xee5cae(0x496)](VisuMZ[_0xee5cae(0x29a)][_0xee5cae(0x1ac)][_0xee5cae(0x4d4)][_0xee5cae(0x527)])&&Input[_0xee5cae(0x352)]();},Game_Event['prototype'][_0x21d116(0x47e)]=function(){const _0x49e76c=_0x21d116,_0xe5e012=this[_0x49e76c(0x25f)]()[_0x49e76c(0x482)];if(_0xe5e012==='')return;if(DataManager['isBattleTest']()||DataManager[_0x49e76c(0x19e)]())return;const _0x32f9d9=VisuMZ[_0x49e76c(0x4d7)][_0x49e76c(0x1ac)][_0x49e76c(0x3ed)];let _0x37a59c=null,_0xf4949a=0x0,_0xd9a234=0x0;if(_0xe5e012[_0x49e76c(0x34a)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0xf4949a=Number(RegExp['$1']),_0xd9a234=Number(RegExp['$2']);else{if(_0xe5e012[_0x49e76c(0x34a)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0xf4949a=Number(RegExp['$1']),_0xd9a234=Number(RegExp['$2']);else{if(_0xe5e012[_0x49e76c(0x34a)](/<COPY EVENT:[ ](.*?)>/i)){const _0x13f1a3=String(RegExp['$1'])['toUpperCase']()[_0x49e76c(0x49c)]();_0x37a59c=VisuMZ[_0x49e76c(0x1d3)][_0x13f1a3];if(!_0x37a59c)return;_0xf4949a=_0x37a59c[_0x49e76c(0x3fe)],_0xd9a234=_0x37a59c['EventID'];}}}if(!this[_0x49e76c(0x515)](_0xf4949a,_0xd9a234))return;_0x32f9d9[_0x49e76c(0x4d1)][_0x49e76c(0x2b6)](this,_0xf4949a,_0xd9a234,this);if(_0x37a59c)_0x37a59c[_0x49e76c(0x4d1)]['call'](this,_0xf4949a,_0xd9a234,this);this[_0x49e76c(0x477)]={'mapId':_0xf4949a,'eventId':_0xd9a234},this[_0x49e76c(0x4b9)]=-0x2,this[_0x49e76c(0x55f)](),_0x32f9d9['PostCopyJS'][_0x49e76c(0x2b6)](this,_0xf4949a,_0xd9a234,this);if(_0x37a59c)_0x37a59c[_0x49e76c(0x2e6)][_0x49e76c(0x2b6)](this,_0xf4949a,_0xd9a234,this);$gameMap[_0x49e76c(0x38e)]();},Game_Event[_0x21d116(0x278)]['setupMorphEvent']=function(){const _0x46af35=_0x21d116,_0x2c562a=$gameSystem['getPreservedMorphEventData'](this);if(!_0x2c562a)return;const _0x4e2bba=_0x2c562a[_0x46af35(0x4a8)]['toUpperCase']()['trim']();_0x4e2bba!=='UNTITLED'?this['morphIntoTemplate'](_0x4e2bba,!![]):this['morphInto'](_0x2c562a[_0x46af35(0x2cf)],_0x2c562a[_0x46af35(0x36a)],!![]);},Game_Event['prototype'][_0x21d116(0x28e)]=function(_0x49bb00,_0x1a9663,_0x4af779){const _0x5a64ec=_0x21d116;if(!this[_0x5a64ec(0x515)](_0x49bb00,_0x1a9663))return;const _0x15e814=VisuMZ['EventsMoveCore'][_0x5a64ec(0x1ac)][_0x5a64ec(0x3ed)];if(!_0x4af779)_0x15e814[_0x5a64ec(0x1da)][_0x5a64ec(0x2b6)](this,_0x49bb00,_0x1a9663,this);this[_0x5a64ec(0x21a)]={'mapId':_0x49bb00,'eventId':_0x1a9663},this[_0x5a64ec(0x4b9)]=-0x2,this[_0x5a64ec(0x55f)]();if(!_0x4af779)_0x15e814[_0x5a64ec(0x3ea)][_0x5a64ec(0x2b6)](this,_0x49bb00,_0x1a9663,this);$gameMap[_0x5a64ec(0x38e)]();},Game_Event['prototype']['morphIntoTemplate']=function(_0x1c653c,_0x27b1ce){const _0x3cd04b=_0x21d116;_0x1c653c=_0x1c653c['toUpperCase']()[_0x3cd04b(0x49c)]();const _0x7d3f6d=VisuMZ['EventTemplates'][_0x1c653c];if(!_0x7d3f6d)return;const _0x408e01=_0x7d3f6d[_0x3cd04b(0x3fe)],_0x2e76da=_0x7d3f6d[_0x3cd04b(0x3ad)];if(!this['checkValidEventerMap'](_0x408e01,_0x2e76da))return;if(!_0x27b1ce)_0x7d3f6d[_0x3cd04b(0x1da)][_0x3cd04b(0x2b6)](this,_0x408e01,_0x2e76da,this);this[_0x3cd04b(0x28e)](_0x408e01,_0x2e76da,_0x27b1ce);if(!_0x27b1ce)_0x7d3f6d[_0x3cd04b(0x3ea)][_0x3cd04b(0x2b6)](this,_0x408e01,_0x2e76da,this);this[_0x3cd04b(0x38e)]();},Game_Event['prototype'][_0x21d116(0x384)]=function(){const _0xf3a2c=_0x21d116;this[_0xf3a2c(0x21a)]=undefined,this[_0xf3a2c(0x4b9)]=-0x2,this[_0xf3a2c(0x55f)]();},Game_Event[_0x21d116(0x278)][_0x21d116(0x426)]=function(_0x15fc8b){const _0x1c349a=_0x21d116,_0x528601=VisuMZ['EventsMoveCore'][_0x1c349a(0x1ac)]['Template'],_0x1628da=_0x15fc8b[_0x1c349a(0x4a8)]['toUpperCase']()[_0x1c349a(0x49c)](),_0x4e1a67=!['',_0x1c349a(0x1b4)][_0x1c349a(0x2e8)](_0x1628da);let _0x2cb551=0x0,_0xd48b37=0x0;if(_0x4e1a67){const _0x1d3f01=VisuMZ['EventTemplates'][_0x1628da];if(!_0x1d3f01)return;_0x2cb551=_0x1d3f01[_0x1c349a(0x3fe)],_0xd48b37=_0x1d3f01[_0x1c349a(0x3ad)];}else _0x2cb551=_0x15fc8b[_0x1c349a(0x2cf)],_0xd48b37=_0x15fc8b['eventId'];if(!this[_0x1c349a(0x515)](_0x2cb551,_0xd48b37))return;if(_0x4e1a67){const _0x3d5498=VisuMZ[_0x1c349a(0x1d3)][_0x1628da];_0x3d5498[_0x1c349a(0x326)][_0x1c349a(0x2b6)](this,_0x2cb551,_0xd48b37,this);}_0x528601[_0x1c349a(0x326)][_0x1c349a(0x2b6)](this,_0x2cb551,_0xd48b37,this),this[_0x1c349a(0x56a)]=_0x15fc8b,this[_0x1c349a(0x4b9)]=-0x2,this['_mapId']=$gameMap[_0x1c349a(0x2cf)](),this['_eventId']=_0x15fc8b[_0x1c349a(0x20d)],this[_0x1c349a(0x330)]=_0x15fc8b[_0x1c349a(0x305)],this[_0x1c349a(0x3ee)](_0x15fc8b['x'],_0x15fc8b['y']),this['setDirection'](_0x15fc8b['direction']),this[_0x1c349a(0x55f)]();if(_0x4e1a67){const _0x283232=VisuMZ['EventTemplates'][_0x1628da];if(!_0x283232)return;_0x283232[_0x1c349a(0x4f5)][_0x1c349a(0x2b6)](this,_0x2cb551,_0xd48b37,this);}_0x528601[_0x1c349a(0x4f5)][_0x1c349a(0x2b6)](this,_0x2cb551,_0xd48b37,this);const _0x4155bd=SceneManager[_0x1c349a(0x423)];if(_0x4155bd&&_0x4155bd[_0x1c349a(0x429)])_0x4155bd[_0x1c349a(0x429)][_0x1c349a(0x1ed)](this);},Game_Event['prototype'][_0x21d116(0x371)]=function(){const _0x215ee6=_0x21d116;return!!this[_0x215ee6(0x56a)];},VisuMZ['EventsMoveCore'][_0x21d116(0x301)]=Game_Event[_0x21d116(0x278)][_0x21d116(0x55f)],Game_Event[_0x21d116(0x278)][_0x21d116(0x55f)]=function(){const _0x1be3be=_0x21d116,_0x597cf7=this['_pageIndex'];VisuMZ[_0x1be3be(0x4d7)]['Game_Event_refresh']['call'](this),_0x597cf7!==this['_pageIndex']&&this[_0x1be3be(0x398)]();},VisuMZ[_0x21d116(0x4d7)]['Game_Event_clearPageSettings']=Game_Event[_0x21d116(0x278)][_0x21d116(0x4ec)],Game_Event[_0x21d116(0x278)][_0x21d116(0x4ec)]=function(){const _0x67cb3=_0x21d116;VisuMZ[_0x67cb3(0x4d7)][_0x67cb3(0x461)]['call'](this),this['initEventsMoveCoreEffects']();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x1a1)]=Game_Event[_0x21d116(0x278)]['setupPageSettings'],Game_Event[_0x21d116(0x278)][_0x21d116(0x357)]=function(){const _0x2915d0=_0x21d116;this[_0x2915d0(0x4d2)]=!![],VisuMZ['EventsMoveCore'][_0x2915d0(0x1a1)][_0x2915d0(0x2b6)](this),this[_0x2915d0(0x398)](),this[_0x2915d0(0x4d2)]=![];},Game_Event[_0x21d116(0x278)][_0x21d116(0x398)]=function(){const _0x3d68be=_0x21d116;if(!this[_0x3d68be(0x25f)]())return;this[_0x3d68be(0x4b0)](),this[_0x3d68be(0x389)](),this[_0x3d68be(0x2e0)](),this['updateEventsMoveCoreTagChanges']();},Game_Event['prototype'][_0x21d116(0x389)]=function(){const _0x21558c=_0x21d116,_0xee794=this[_0x21558c(0x25f)]()[_0x21558c(0x482)];if(_0xee794==='')return;this[_0x21558c(0x3f9)](_0xee794);},Game_Event[_0x21d116(0x278)]['setupEventsMoveCoreCommentTags']=function(){const _0x3c991a=_0x21d116;if(!this[_0x3c991a(0x52d)]())return;const _0x425de2=this[_0x3c991a(0x1c7)]();let _0x2d34c6='';for(const _0x2e448c of _0x425de2){if([0x6c,0x198][_0x3c991a(0x2e8)](_0x2e448c[_0x3c991a(0x50d)])){if(_0x2d34c6!=='')_0x2d34c6+='\x0a';_0x2d34c6+=_0x2e448c[_0x3c991a(0x286)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x2d34c6);},Game_Event[_0x21d116(0x278)][_0x21d116(0x4b0)]=function(){const _0x4e6712=_0x21d116,_0x35776b=VisuMZ[_0x4e6712(0x4d7)][_0x4e6712(0x1ac)];this[_0x4e6712(0x27c)]={'type':_0x4e6712(0x2c7),'distance':0x0,'regionList':[]},this[_0x4e6712(0x3b4)]=![],this[_0x4e6712(0x4c2)]=![],this[_0x4e6712(0x1b6)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x4e6712(0x249)]=$gameSystem[_0x4e6712(0x320)](this),this[_0x4e6712(0x1d9)]={'text':'','visibleRange':_0x35776b[_0x4e6712(0x517)][_0x4e6712(0x4d6)],'offsetX':_0x35776b[_0x4e6712(0x517)][_0x4e6712(0x411)],'offsetY':_0x35776b['Label'][_0x4e6712(0x1f7)]},this[_0x4e6712(0x480)]=[],this[_0x4e6712(0x36d)]={'target':-0x1,'type':_0x4e6712(0x4f1),'delay':0x1},this[_0x4e6712(0x510)]=_0x35776b[_0x4e6712(0x1be)]['RandomMoveWeight']??0x0,this[_0x4e6712(0x45f)]=![],this[_0x4e6712(0x578)]={'visible':!![],'filename':_0x35776b[_0x4e6712(0x1be)][_0x4e6712(0x396)]},this[_0x4e6712(0x47c)](),this[_0x4e6712(0x43a)]();},Game_Event[_0x21d116(0x278)][_0x21d116(0x3f9)]=function(_0x5ba851){const _0x2428f6=_0x21d116;if(_0x5ba851[_0x2428f6(0x34a)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x2428f6(0x27c)][_0x2428f6(0x4a0)]=JSON[_0x2428f6(0x20c)]('['+RegExp['$1'][_0x2428f6(0x34a)](/\d+/g)+']'),this[_0x2428f6(0x27c)][_0x2428f6(0x324)]=_0x2428f6(0x523);else _0x5ba851['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x2428f6(0x518)]()['trim'](),this[_0x2428f6(0x27c)][_0x2428f6(0x324)]=type,this[_0x2428f6(0x27c)]['distance']=Number(RegExp['$2']));_0x5ba851['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x2428f6(0x3b4)]=!![]);_0x5ba851['match'](/<CLICK TRIGGER>/i)&&(this[_0x2428f6(0x4c2)]=!![]);const _0x48a7da=_0x5ba851[_0x2428f6(0x34a)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x48a7da)for(const _0xa86630 of _0x48a7da){if(_0xa86630[_0x2428f6(0x34a)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1df68c=String(RegExp['$1'])[_0x2428f6(0x518)]()[_0x2428f6(0x49c)](),_0x2dfa13=Number(RegExp['$2']);this[_0x2428f6(0x1b6)][_0x1df68c]=_0x2dfa13;}}_0x5ba851[_0x2428f6(0x34a)](/<ICON:[ ](\d+)>/i)&&(this[_0x2428f6(0x249)][_0x2428f6(0x4cc)]=Number(RegExp['$1']));_0x5ba851[_0x2428f6(0x34a)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x249)]['bufferX']=Number(RegExp['$1']));_0x5ba851[_0x2428f6(0x34a)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x249)]['bufferY']=Number(RegExp['$1']));_0x5ba851[_0x2428f6(0x34a)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x2428f6(0x368)]=Number(RegExp['$1']),this[_0x2428f6(0x249)][_0x2428f6(0x375)]=Number(RegExp['$2']));if(_0x5ba851[_0x2428f6(0x34a)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x5baa3e=String(RegExp['$1'])[_0x2428f6(0x377)]()['trim'](),_0x20ba4c=['NORMAL',_0x2428f6(0x304),_0x2428f6(0x410),_0x2428f6(0x240)];this[_0x2428f6(0x249)]['blendMode']=_0x20ba4c['indexOf'](_0x5baa3e)[_0x2428f6(0x3dc)](0x0,0x3);}_0x5ba851[_0x2428f6(0x34a)](/<LABEL:[ ](.*?)>/i)&&(this[_0x2428f6(0x1d9)]['text']=String(RegExp['$1'])[_0x2428f6(0x49c)]());_0x5ba851[_0x2428f6(0x34a)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x2428f6(0x1d9)]['text']=String(RegExp['$1'])['trim']());_0x5ba851[_0x2428f6(0x34a)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x1d9)]['offsetX']=Number(RegExp['$1']));_0x5ba851['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x1d9)][_0x2428f6(0x3e6)]=Number(RegExp['$1']));_0x5ba851[_0x2428f6(0x34a)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x1d9)][_0x2428f6(0x41d)]=Number(RegExp['$1']),this[_0x2428f6(0x1d9)][_0x2428f6(0x3e6)]=Number(RegExp['$2']));$gameTemp[_0x2428f6(0x217)](this);for(;;){if(this[_0x2428f6(0x1d9)][_0x2428f6(0x2fb)][_0x2428f6(0x34a)](/\\V\[(\d+)\]/gi))this[_0x2428f6(0x1d9)][_0x2428f6(0x2fb)]=this[_0x2428f6(0x1d9)][_0x2428f6(0x2fb)][_0x2428f6(0x535)](/\\V\[(\d+)\]/gi,(_0x4f5ddb,_0x42649e)=>$gameVariables['value'](parseInt(_0x42649e)));else break;}$gameTemp[_0x2428f6(0x1e3)]();_0x5ba851['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x2428f6(0x1d9)]['visibleRange']=Number(RegExp['$1']));if(_0x5ba851[_0x2428f6(0x34a)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d3b82=JSON['parse']('['+RegExp['$1'][_0x2428f6(0x34a)](/\d+/g)+']');this[_0x2428f6(0x480)]=this[_0x2428f6(0x480)]['concat'](_0x4d3b82),this[_0x2428f6(0x480)][_0x2428f6(0x4be)](0x0);}if(_0x5ba851[_0x2428f6(0x34a)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x4713c7=String(RegExp['$1']);if(_0x4713c7[_0x2428f6(0x34a)](/PLAYER/i))this[_0x2428f6(0x36d)][_0x2428f6(0x465)]=0x0;else _0x4713c7[_0x2428f6(0x34a)](/EVENT[ ](\d+)/i)&&(this[_0x2428f6(0x36d)][_0x2428f6(0x465)]=Number(RegExp['$1']));}_0x5ba851[_0x2428f6(0x34a)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x2428f6(0x36d)][_0x2428f6(0x324)]=String(RegExp['$1'])[_0x2428f6(0x518)]()['trim']());_0x5ba851[_0x2428f6(0x34a)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x2428f6(0x36d)]['delay']=Number(RegExp['$1']));if(_0x5ba851[_0x2428f6(0x34a)](/<TRUE RANDOM MOVE>/i))this[_0x2428f6(0x510)]=0x0;else _0x5ba851['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x2428f6(0x510)]=Number(RegExp['$1'])||0x0);_0x5ba851[_0x2428f6(0x34a)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x2428f6(0x45f)]=!![]),_0x5ba851[_0x2428f6(0x34a)](/<HIDE SHADOW>/i)&&(this[_0x2428f6(0x578)][_0x2428f6(0x339)]=![]),_0x5ba851[_0x2428f6(0x34a)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic'][_0x2428f6(0x4b6)]=String(RegExp['$1'])),_0x5ba851['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x22f)]=Number(RegExp['$1'])),_0x5ba851['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2428f6(0x22d)]=Number(RegExp['$1'])),_0x5ba851[_0x2428f6(0x34a)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x2428f6(0x22d)]=Number(RegExp['$2'])),_0x5ba851['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x2428f6(0x54e)]=String(RegExp['$1'])[_0x2428f6(0x377)]()['trim']());},Game_Event['prototype'][_0x21d116(0x24e)]=function(){this['updateShadowChanges']();},Game_Event[_0x21d116(0x278)][_0x21d116(0x1c8)]=function(){const _0x404971=_0x21d116;if(this[_0x404971(0x3b4)])return!![];return Game_Character[_0x404971(0x278)]['isNearTheScreen']['call'](this);},VisuMZ[_0x21d116(0x4d7)]['Game_Event_updateSelfMovement']=Game_Event[_0x21d116(0x278)][_0x21d116(0x4f2)],Game_Event[_0x21d116(0x278)][_0x21d116(0x4f2)]=function(){const _0x35c0b1=_0x21d116;if(this[_0x35c0b1(0x260)]())return;VisuMZ['EventsMoveCore'][_0x35c0b1(0x242)][_0x35c0b1(0x2b6)](this),this[_0x35c0b1(0x454)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x35c0b1(0x3db)]);},Game_Event[_0x21d116(0x278)][_0x21d116(0x260)]=function(){const _0x1ec0c7=_0x21d116,_0x5caeb0=VisuMZ[_0x1ec0c7(0x4d7)][_0x1ec0c7(0x1ac)]['Movement'];if($gameMap[_0x1ec0c7(0x428)]()&&_0x5caeb0[_0x1ec0c7(0x4f7)])return!![];if($gameMessage[_0x1ec0c7(0x22b)]()&&_0x5caeb0[_0x1ec0c7(0x346)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0x1ec0c7(0x472)]()>=0x0)return!![];return![];},Game_Event[_0x21d116(0x278)]['updateShadowChanges']=function(){const _0x32804a=_0x21d116,_0x386041=SceneManager['_scene']['_spriteset'];if(_0x386041){const _0x23903b=_0x386041['findTargetSprite'](this);_0x23903b&&_0x23903b[_0x32804a(0x344)]&&_0x23903b['_shadowSprite'][_0x32804a(0x319)]!==this['shadowFilename']()&&(_0x23903b['_shadowSprite'][_0x32804a(0x319)]=this[_0x32804a(0x275)](),_0x23903b[_0x32804a(0x344)][_0x32804a(0x417)]=ImageManager[_0x32804a(0x3a8)](_0x23903b[_0x32804a(0x344)][_0x32804a(0x319)]));}},Game_Event[_0x21d116(0x278)][_0x21d116(0x275)]=function(){const _0x12bea7=_0x21d116;return this[_0x12bea7(0x578)][_0x12bea7(0x4b6)];},Game_Event[_0x21d116(0x278)]['isShadowVisible']=function(){const _0x2bb2d=_0x21d116;if(!this[_0x2bb2d(0x578)][_0x2bb2d(0x339)])return![];return Game_CharacterBase[_0x2bb2d(0x278)]['isShadowVisible'][_0x2bb2d(0x2b6)](this);},Game_Event[_0x21d116(0x278)][_0x21d116(0x3a9)]=function(){const _0x51c821=_0x21d116;return this[_0x51c821(0x1d9)][_0x51c821(0x2fb)];},Game_Event[_0x21d116(0x278)][_0x21d116(0x44c)]=function(){const _0x4a7682=_0x21d116;return this['_labelWindow'][_0x4a7682(0x2ee)];},Game_Event[_0x21d116(0x278)][_0x21d116(0x3bd)]=function(_0x53cb54,_0x171f55,_0x153d94){const _0x406aab=_0x21d116;if(this[_0x406aab(0x2a8)]())return this[_0x406aab(0x479)](_0x53cb54,_0x171f55,_0x153d94);if($gameMap['isRegionAllowPass'](_0x53cb54,_0x171f55,_0x153d94,_0x406aab(0x25f)))return!![];if($gameMap[_0x406aab(0x42f)](_0x53cb54,_0x171f55,_0x153d94,_0x406aab(0x25f)))return![];return Game_Character[_0x406aab(0x278)][_0x406aab(0x3bd)]['call'](this,_0x53cb54,_0x171f55,_0x153d94);},Game_Event[_0x21d116(0x278)][_0x21d116(0x2a8)]=function(){const _0x309864=_0x21d116;if(this[_0x309864(0x480)]===undefined)this[_0x309864(0x4b0)]();return this[_0x309864(0x480)]['length']>0x0;},Game_Event[_0x21d116(0x278)][_0x21d116(0x479)]=function(_0xe10dad,_0x1c3789,_0x1f05d2){const _0x294e92=_0x21d116,_0x1e5990=$gameMap[_0x294e92(0x469)](_0xe10dad,_0x1f05d2),_0x5c1014=$gameMap[_0x294e92(0x4fc)](_0x1c3789,_0x1f05d2),_0x5e6f71=$gameMap[_0x294e92(0x56b)](_0x1e5990,_0x5c1014);return this['_moveOnlyRegions'][_0x294e92(0x2e8)](_0x5e6f71);},VisuMZ['EventsMoveCore'][_0x21d116(0x3fa)]=Game_Event['prototype'][_0x21d116(0x4b7)],Game_Event[_0x21d116(0x278)][_0x21d116(0x4b7)]=function(){const _0x543eea=_0x21d116;return this[_0x543eea(0x1fa)]=![],this[_0x543eea(0x333)]=![],this[_0x543eea(0x25f)]()?VisuMZ['EventsMoveCore'][_0x543eea(0x3fa)][_0x543eea(0x2b6)](this):-0x1;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x34e)]=Game_Event[_0x21d116(0x278)][_0x21d116(0x312)],Game_Event[_0x21d116(0x278)][_0x21d116(0x312)]=function(_0x4ede2b){const _0x4f846e=_0x21d116;this['checkAdvancedSwitchVariablePresent'](_0x4ede2b),$gameTemp[_0x4f846e(0x217)](this);const _0x193848=VisuMZ['EventsMoveCore'][_0x4f846e(0x34e)][_0x4f846e(0x2b6)](this,_0x4ede2b);return $gameTemp['clearSelfTarget'](),_0x193848;},Game_Event[_0x21d116(0x278)][_0x21d116(0x308)]=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x21d116(0x278)][_0x21d116(0x399)]=function(_0x22907a){const _0x3b1027=_0x21d116,_0x45c4b2=_0x22907a[_0x3b1027(0x289)];if(_0x45c4b2[_0x3b1027(0x49a)]&&DataManager[_0x3b1027(0x313)](_0x45c4b2[_0x3b1027(0x456)]))this['_advancedSwitchVariable']=!![];else{if(_0x45c4b2[_0x3b1027(0x401)]&&DataManager[_0x3b1027(0x313)](_0x45c4b2[_0x3b1027(0x2f4)]))this[_0x3b1027(0x1fa)]=!![];else _0x45c4b2['variableValid']&&DataManager['isAdvancedVariable'](_0x45c4b2['variableId'])&&(this[_0x3b1027(0x1fa)]=!![]);}},Game_Event[_0x21d116(0x278)][_0x21d116(0x3f3)]=function(){const _0x39b35e=_0x21d116;if(this[_0x39b35e(0x2c0)])return![];return this[_0x39b35e(0x4c2)];},Game_Event[_0x21d116(0x278)][_0x21d116(0x3ca)]=function(){const _0x278c23=_0x21d116;$gameTemp['clearDestination'](),this[_0x278c23(0x46b)]();},Game_Event[_0x21d116(0x278)]['pos']=function(_0x2eae5a,_0x5b7d6a){const _0x2f4d81=_0x21d116;return this['_addedHitbox']?this['posEventsMoveCore'](_0x2eae5a,_0x5b7d6a):Game_Character[_0x2f4d81(0x278)][_0x2f4d81(0x4c0)][_0x2f4d81(0x2b6)](this,_0x2eae5a,_0x5b7d6a);},Game_Event[_0x21d116(0x278)]['posEventsMoveCore']=function(_0x14f603,_0x424deb){const _0x591c25=_0x21d116;var _0x49396f=this['x']-this['_addedHitbox'][_0x591c25(0x1a9)],_0x2ca821=this['x']+this[_0x591c25(0x1b6)][_0x591c25(0x255)],_0xfc0aac=this['y']-this['_addedHitbox']['up'],_0x3a23f5=this['y']+this[_0x591c25(0x1b6)][_0x591c25(0x44f)];return _0x49396f<=_0x14f603&&_0x14f603<=_0x2ca821&&_0xfc0aac<=_0x424deb&&_0x424deb<=_0x3a23f5;},Game_Event[_0x21d116(0x278)][_0x21d116(0x2a5)]=function(_0xa8727f,_0x1b25eb,_0x27a2fe){const _0x171e13=_0x21d116;for(let _0x33a8fc=-this[_0x171e13(0x1b6)][_0x171e13(0x1a9)];_0x33a8fc<=this[_0x171e13(0x1b6)]['right'];_0x33a8fc++){for(let _0x5819c5=-this[_0x171e13(0x1b6)]['up'];_0x5819c5<=this[_0x171e13(0x1b6)]['down'];_0x5819c5++){if(!Game_Character[_0x171e13(0x278)][_0x171e13(0x2a5)][_0x171e13(0x2b6)](this,_0xa8727f+_0x33a8fc,_0x1b25eb+_0x5819c5,_0x27a2fe))return![];}}return!![];},Game_Event[_0x21d116(0x278)][_0x21d116(0x448)]=function(_0x58ea0a,_0x52e43d){const _0x3ea60d=_0x21d116;if(Imported[_0x3ea60d(0x553)]&&this['isSmartEventCollisionOn']())return this[_0x3ea60d(0x45d)](_0x58ea0a,_0x52e43d);else{const _0x55ac73=$gameMap[_0x3ea60d(0x46f)](_0x58ea0a,_0x52e43d)[_0x3ea60d(0x19c)](_0x32e082=>_0x32e082!==this);return _0x55ac73[_0x3ea60d(0x2de)]>0x0;}},Game_Event[_0x21d116(0x278)]['checkSmartEventCollision']=function(_0x3a34da,_0x42f953){const _0x3050a6=_0x21d116;if(!this[_0x3050a6(0x234)]())return![];else{const _0x95b57c=$gameMap[_0x3050a6(0x46f)](_0x3a34da,_0x42f953)[_0x3050a6(0x19c)](_0x582317=>_0x582317!==this&&_0x582317[_0x3050a6(0x234)]());return _0x95b57c['length']>0x0;}},Game_Event[_0x21d116(0x278)][_0x21d116(0x298)]=function(){const _0x109125=_0x21d116;return this[_0x109125(0x27c)][_0x109125(0x324)]||_0x109125(0x2c7);},Game_Event[_0x21d116(0x278)][_0x21d116(0x254)]=function(){const _0x9f4793=_0x21d116;return this[_0x9f4793(0x27c)][_0x9f4793(0x413)]||0x0;},Game_Event[_0x21d116(0x278)]['activationRegionList']=function(){return this['_activationProximity']['regionList']||[];},Game_Event[_0x21d116(0x278)][_0x21d116(0x243)]=function(){const _0x414837=_0x21d116;Game_Character['prototype']['increaseSteps'][_0x414837(0x2b6)](this);if([_0x414837(0x2c7),'region'][_0x414837(0x2e8)](this[_0x414837(0x298)]()))return;$gamePlayer[_0x414837(0x554)]([0x2]);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x41a)]=Game_Event['prototype'][_0x21d116(0x54d)],Game_Event[_0x21d116(0x278)]['checkEventTriggerAuto']=function(){const _0x4ee0bb=_0x21d116;if(this[_0x4ee0bb(0x53e)]!==0x3)return;if(this[_0x4ee0bb(0x4d2)])return;if(!this[_0x4ee0bb(0x4a3)](![]))return;if(!this[_0x4ee0bb(0x35e)](![]))return;VisuMZ[_0x4ee0bb(0x4d7)][_0x4ee0bb(0x41a)][_0x4ee0bb(0x2b6)](this);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x223)]=Game_Event['prototype'][_0x21d116(0x404)],Game_Event[_0x21d116(0x278)][_0x21d116(0x404)]=function(){const _0x36227c=_0x21d116;if(!this[_0x36227c(0x262)])return;if(!this[_0x36227c(0x4a3)](!![]))return;if(!this[_0x36227c(0x35e)](!![]))return;VisuMZ[_0x36227c(0x4d7)][_0x36227c(0x223)]['call'](this);},Game_Event[_0x21d116(0x278)]['checkRegionEventTrigger']=function(_0x1f73a0){const _0x3e5b53=_0x21d116;if(!_0x1f73a0&&$gameMap[_0x3e5b53(0x428)]())return![];if(!_0x1f73a0&&$gameMap[_0x3e5b53(0x519)]())return![];if(this[_0x3e5b53(0x575)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event[_0x21d116(0x278)]['checkActivationProximity']=function(_0x416ea5){const _0x9538b0=_0x21d116;if(!_0x416ea5&&$gameMap['isEventRunning']())return![];if(!_0x416ea5&&$gameMap[_0x9538b0(0x519)]())return![];if([_0x9538b0(0x2c7),_0x9538b0(0x523)][_0x9538b0(0x2e8)](this[_0x9538b0(0x298)]()))return!![];return $gamePlayer[_0x9538b0(0x2c6)](this);},VisuMZ[_0x21d116(0x2d7)]=function(_0x5eca8f){const _0x409eda=_0x21d116;for(const _0x26fc06 of $gameMap[_0x409eda(0x550)]()){if(!_0x26fc06)continue;_0x26fc06['moveSynchTarget']()===_0x5eca8f&&_0x26fc06[_0x409eda(0x366)]();}},VisuMZ['GetMoveSynchTarget']=function(_0x1fd740){const _0x485a31=_0x21d116;if(_0x1fd740===0x0)return $gamePlayer;return $gameMap[_0x485a31(0x25f)](_0x1fd740);},Game_Event['prototype'][_0x21d116(0x472)]=function(){const _0x20eb69=_0x21d116;return this[_0x20eb69(0x36d)]['target'];},Game_Event['prototype'][_0x21d116(0x1d0)]=function(){const _0xf7a062=_0x21d116;return this[_0xf7a062(0x36d)]['type'];},Game_Event[_0x21d116(0x278)][_0x21d116(0x415)]=function(){const _0x52147f=_0x21d116;if(this[_0x52147f(0x472)]()>=0x0){const _0x2b1f7f=VisuMZ[_0x52147f(0x4b1)](this[_0x52147f(0x472)]());if(_0x2b1f7f)return _0x2b1f7f[_0x52147f(0x415)]();}return Game_Character[_0x52147f(0x278)][_0x52147f(0x415)][_0x52147f(0x2b6)](this);},Game_Event[_0x21d116(0x278)][_0x21d116(0x366)]=function(){const _0x40bcee=_0x21d116;this[_0x40bcee(0x36d)][_0x40bcee(0x340)]=this[_0x40bcee(0x36d)]['timer']||0x0,this[_0x40bcee(0x36d)]['timer']--;if(this['_moveSynch'][_0x40bcee(0x340)]>0x0)return;this[_0x40bcee(0x36d)]['timer']=this['_moveSynch'][_0x40bcee(0x50a)],this['processMoveSynch']();},Game_Event[_0x21d116(0x278)]['processMoveSynch']=function(){const _0x13b404=_0x21d116;switch(this[_0x13b404(0x1d0)]()){case _0x13b404(0x4f1):this[_0x13b404(0x502)]();break;case _0x13b404(0x290):this[_0x13b404(0x4a9)]();break;case _0x13b404(0x1f6):this[_0x13b404(0x1ba)]();break;case _0x13b404(0x45a):this[_0x13b404(0x3a1)]();break;case _0x13b404(0x475):case _0x13b404(0x392):this[_0x13b404(0x42e)]();break;case'reverse\x20mimic':case _0x13b404(0x4a2):this[_0x13b404(0x509)]();break;case _0x13b404(0x3ac):case _0x13b404(0x2e9):case'mirror\x20horz':case'horz\x20mirror':this[_0x13b404(0x1f5)]();break;case _0x13b404(0x233):case'vertical\x20mirror':case _0x13b404(0x3e8):case _0x13b404(0x2ac):this[_0x13b404(0x450)]();break;default:this[_0x13b404(0x502)]();break;}this[_0x13b404(0x3c7)]();},Game_Event[_0x21d116(0x278)][_0x21d116(0x502)]=function(){const _0x3bfbb7=_0x21d116,_0x1d6853=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x1d6853[_0x3bfbb7(0x457)](0x1,0x3,0x7,0x9);const _0x485a8a=[];for(const _0x47cdb5 of _0x1d6853){if(this['canPass'](this['x'],this['y'],_0x47cdb5))_0x485a8a[_0x3bfbb7(0x457)](_0x47cdb5);}if(_0x485a8a['length']>0x0){const _0x10017c=_0x485a8a[Math[_0x3bfbb7(0x478)](_0x485a8a['length'])];this[_0x3bfbb7(0x542)](_0x10017c);}},Game_Event['prototype']['processMoveSynchApproach']=function(){const _0x123d13=_0x21d116,_0x336a9d=VisuMZ[_0x123d13(0x4b1)](this['moveSynchTarget']());this[_0x123d13(0x2d6)](_0x336a9d);},Game_Event[_0x21d116(0x278)][_0x21d116(0x1ba)]=function(){const _0x3cdfc5=_0x21d116,_0x34655f=VisuMZ[_0x3cdfc5(0x4b1)](this[_0x3cdfc5(0x472)]());this[_0x3cdfc5(0x4ef)](_0x34655f);},Game_Event[_0x21d116(0x278)][_0x21d116(0x3a1)]=function(){const _0x22c308=_0x21d116;this[_0x22c308(0x46e)]();},Game_Event[_0x21d116(0x278)]['processMoveSynchMimic']=function(){const _0x3794c5=_0x21d116,_0xbfb4fb=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x3794c5(0x542)](_0xbfb4fb[_0x3794c5(0x4c5)]());},Game_Event[_0x21d116(0x278)][_0x21d116(0x509)]=function(){const _0x5d6763=_0x21d116,_0x416831=VisuMZ[_0x5d6763(0x4b1)](this[_0x5d6763(0x472)]()),_0x1b97a5=this[_0x5d6763(0x40b)](_0x416831[_0x5d6763(0x4c5)]());this[_0x5d6763(0x542)](this[_0x5d6763(0x40b)](_0x416831[_0x5d6763(0x2da)]()));},Game_Event['prototype'][_0x21d116(0x1f5)]=function(){const _0x55db9e=_0x21d116,_0x233528=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x2fb259=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x233528[_0x55db9e(0x4c5)]()];this[_0x55db9e(0x542)](_0x2fb259);},Game_Event[_0x21d116(0x278)][_0x21d116(0x450)]=function(){const _0xc01741=_0x21d116,_0xb35428=VisuMZ[_0xc01741(0x4b1)](this[_0xc01741(0x472)]()),_0x14c1d8=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0xb35428[_0xc01741(0x4c5)]()];this[_0xc01741(0x542)](_0x14c1d8);},Game_Event[_0x21d116(0x278)][_0x21d116(0x2f8)]=function(){const _0x506228=_0x21d116,_0x244903=$gameSystem[_0x506228(0x317)](this);if(!_0x244903)return;this[_0x506228(0x3ee)](_0x244903['x'],_0x244903['y']),this[_0x506228(0x511)](_0x244903[_0x506228(0x2da)]),this[_0x506228(0x4b9)]===_0x244903[_0x506228(0x3cd)]&&(this[_0x506228(0x564)]=_0x244903[_0x506228(0x1e8)]);},Game_Event[_0x21d116(0x278)][_0x21d116(0x51e)]=function(){const _0x2d1bae=_0x21d116;Game_Character[_0x2d1bae(0x278)][_0x2d1bae(0x51e)][_0x2d1bae(0x2b6)](this),this['autosaveEventLocation']();},Game_Event[_0x21d116(0x278)][_0x21d116(0x52a)]=function(){const _0x23ae1c=_0x21d116;if($gameMap[_0x23ae1c(0x42b)]())return!![];return this[_0x23ae1c(0x45f)];},Game_Event['prototype'][_0x21d116(0x4e3)]=function(){const _0x5d4698=_0x21d116;if(!this[_0x5d4698(0x52a)]())return;this[_0x5d4698(0x30b)]();},Game_Event[_0x21d116(0x278)][_0x21d116(0x30b)]=function(){const _0x10d1f7=_0x21d116;$gameSystem[_0x10d1f7(0x30b)](this);},Game_Event[_0x21d116(0x278)][_0x21d116(0x3f2)]=function(){const _0x536861=_0x21d116;$gameSystem[_0x536861(0x211)](this);},Game_Event[_0x21d116(0x278)][_0x21d116(0x320)]=function(){const _0x17955d=_0x21d116;return $gameSystem[_0x17955d(0x320)](this)?Game_Character[_0x17955d(0x278)][_0x17955d(0x320)][_0x17955d(0x2b6)](this):{'iconIndex':0x0,'bufferX':settings[_0x17955d(0x1ea)][_0x17955d(0x44d)],'bufferY':settings[_0x17955d(0x1ea)]['BufferY'],'blendMode':settings[_0x17955d(0x1ea)][_0x17955d(0x39c)]};},Game_Event[_0x21d116(0x278)][_0x21d116(0x34c)]=function(){const _0x57532a=_0x21d116;return this[_0x57532a(0x333)];},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x2f5)]=Game_Event['prototype'][_0x21d116(0x312)],Game_Event['prototype'][_0x21d116(0x312)]=function(_0x4ba32e){const _0x4580d5=_0x21d116,_0x49fb40=VisuMZ[_0x4580d5(0x4d7)]['Game_Event_meetsConditionsCPC'][_0x4580d5(0x2b6)](this,_0x4ba32e);if(!_0x49fb40)return![];return this[_0x4580d5(0x3c6)](_0x4ba32e);},Game_Event[_0x21d116(0x278)][_0x21d116(0x3c6)]=function(_0x165b8b){const _0x487e57=_0x21d116;VisuMZ['EventsMoveCore'][_0x487e57(0x55d)][_0x487e57(0x403)](_0x165b8b),this[_0x487e57(0x333)]=_0x165b8b[_0x487e57(0x379)][_0x487e57(0x2de)]>0x0;_0x165b8b[_0x487e57(0x379)]===undefined&&VisuMZ['EventsMoveCore'][_0x487e57(0x55d)]['loadCPC'](_0x165b8b);if(_0x165b8b[_0x487e57(0x379)][_0x487e57(0x2de)]>0x0)return $gameMap[_0x487e57(0x25f)](this[_0x487e57(0x3db)])&&VisuMZ['EventsMoveCore'][_0x487e57(0x55d)]['metCPC'](_0x165b8b['CPC'],this[_0x487e57(0x3db)]);return!![];},VisuMZ['EventsMoveCore'][_0x21d116(0x51c)]=Game_Troop['prototype'][_0x21d116(0x312)],Game_Troop['prototype'][_0x21d116(0x312)]=function(_0x3db356){const _0x1db7c1=_0x21d116;var _0x456236=VisuMZ[_0x1db7c1(0x4d7)]['Game_Troop_meetsConditionsCPC']['call'](this,_0x3db356);return _0x456236&&this[_0x1db7c1(0x43b)](_0x3db356);},Game_Troop[_0x21d116(0x278)][_0x21d116(0x43b)]=function(_0x44902a){const _0x59607d=_0x21d116;_0x44902a['CPC']===undefined&&VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x59607d(0x403)](_0x44902a);if(_0x44902a[_0x59607d(0x379)][_0x59607d(0x2de)]>0x0)return VisuMZ[_0x59607d(0x4d7)][_0x59607d(0x55d)]['metCPC'](_0x44902a[_0x59607d(0x379)],0x0);return!![];},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x1bc)]=Game_Event['prototype']['locate'],Game_Event[_0x21d116(0x278)][_0x21d116(0x3ee)]=function(_0x274de9,_0x276c42){const _0xebbae5=_0x21d116;VisuMZ['EventsMoveCore'][_0xebbae5(0x1bc)][_0xebbae5(0x2b6)](this,_0x274de9,_0x276c42),this['_randomHomeX']=_0x274de9,this['_randomHomeY']=_0x276c42;},VisuMZ[_0x21d116(0x4d7)]['Game_Event_moveTypeRandom']=Game_Event[_0x21d116(0x278)][_0x21d116(0x369)],Game_Event[_0x21d116(0x278)][_0x21d116(0x369)]=function(){const _0x3a4b00=_0x21d116,_0x2579b5=$gameMap[_0x3a4b00(0x413)](this['x'],this['y'],this[_0x3a4b00(0x533)],this[_0x3a4b00(0x4fd)]),_0x1f678f=_0x2579b5*(this[_0x3a4b00(0x510)]||0x0);Math[_0x3a4b00(0x4f1)]()>=_0x1f678f?VisuMZ[_0x3a4b00(0x4d7)]['Game_Event_moveTypeRandom'][_0x3a4b00(0x2b6)](this):this[_0x3a4b00(0x1e9)]();},Game_Event[_0x21d116(0x278)]['moveBackToRandomHome']=function(){const _0x3ae779=_0x21d116,_0x7afeb=this[_0x3ae779(0x1b9)](this['_randomHomeX']),_0xbe2321=this[_0x3ae779(0x4c1)](this['_randomHomeY']);if(Math[_0x3ae779(0x435)](_0x7afeb)>Math[_0x3ae779(0x435)](_0xbe2321))this[_0x3ae779(0x50b)](_0x7afeb>0x0?0x4:0x6),!this[_0x3ae779(0x3e1)]()&&_0xbe2321!==0x0&&this[_0x3ae779(0x50b)](_0xbe2321>0x0?0x8:0x2);else _0xbe2321!==0x0&&(this['moveStraight'](_0xbe2321>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0x7afeb!==0x0&&this[_0x3ae779(0x50b)](_0x7afeb>0x0?0x4:0x6));},VisuMZ[_0x21d116(0x4d7)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter[_0x21d116(0x278)]['updateWaitMode']=function(){const _0x454489=_0x21d116;if(this['_waitMode']===_0x454489(0x1cb)){if(window[this[_0x454489(0x3ba)]])this[_0x454489(0x438)]='',this['startCallEvent']();else return!![];}else return VisuMZ[_0x454489(0x4d7)][_0x454489(0x283)][_0x454489(0x2b6)](this);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x25a)]=Game_Interpreter[_0x21d116(0x278)][_0x21d116(0x1f3)],Game_Interpreter[_0x21d116(0x278)][_0x21d116(0x1f3)]=function(){const _0x12adaa=_0x21d116,_0x277154=$gameMap&&this[_0x12adaa(0x3db)]?$gameMap[_0x12adaa(0x25f)](this['_eventId']):null;$gameTemp['registerSelfTarget'](_0x277154);const _0x39af86=VisuMZ[_0x12adaa(0x4d7)]['Game_Interpreter_executeCommand'][_0x12adaa(0x2b6)](this);return $gameTemp[_0x12adaa(0x1e3)](),_0x39af86;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x370)]=Game_Interpreter[_0x21d116(0x278)][_0x21d116(0x378)],Game_Interpreter[_0x21d116(0x278)]['command357']=function(_0x57b54c){const _0x281227=_0x21d116;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['EventsMoveCore'][_0x281227(0x370)][_0x281227(0x2b6)](this,_0x57b54c);},Game_Interpreter['prototype'][_0x21d116(0x28b)]=function(_0x4d5a1f){const _0x44d7ea=_0x21d116;this['_callEventData']=_0x4d5a1f;const _0x3fe3d9=_0x44d7ea(0x3c3)[_0x44d7ea(0x3b1)](_0x4d5a1f[_0x44d7ea(0x2cf)][_0x44d7ea(0x3b7)](0x3));this[_0x44d7ea(0x3ba)]=_0x44d7ea(0x338)+Graphics[_0x44d7ea(0x44a)]+'_'+this[_0x44d7ea(0x36a)](),DataManager['loadDataFile'](this[_0x44d7ea(0x3ba)],_0x3fe3d9),window[this[_0x44d7ea(0x3ba)]]?this['startCallEvent']():this['setWaitMode'](_0x44d7ea(0x1cb));},Game_Interpreter[_0x21d116(0x278)][_0x21d116(0x494)]=function(){const _0xe766b=_0x21d116,_0x2a3590=this['_callEventData'],_0x1d346e=window[this[_0xe766b(0x3ba)]],_0x370c93=_0x1d346e[_0xe766b(0x550)][_0x2a3590[_0xe766b(0x36a)]];if(_0x370c93&&_0x370c93['pages'][_0x2a3590[_0xe766b(0x1d6)]-0x1]){const _0x57e938=_0x370c93[_0xe766b(0x28d)][_0x2a3590[_0xe766b(0x1d6)]-0x1][_0xe766b(0x1c7)];this['setupChild'](_0x57e938,this['eventId']());}window[this[_0xe766b(0x3ba)]]=undefined,this[_0xe766b(0x3ba)]=undefined,this[_0xe766b(0x48e)]=undefined;};function Game_CPCInterpreter(){const _0x441043=_0x21d116;this['initialize'][_0x441043(0x272)](this,arguments);};Game_CPCInterpreter[_0x21d116(0x278)]=Object[_0x21d116(0x2bc)](Game_Interpreter[_0x21d116(0x278)]),Game_CPCInterpreter[_0x21d116(0x278)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x21d116(0x278)][_0x21d116(0x352)]=function(){const _0x2e5777=_0x21d116;Game_Interpreter[_0x2e5777(0x278)][_0x2e5777(0x352)]['call'](this),this['_cpc']=![];},Game_CPCInterpreter[_0x21d116(0x278)][_0x21d116(0x26b)]=function(){const _0x3fb653=_0x21d116;while(this['isRunning']()){this[_0x3fb653(0x1f3)]();}},Game_CPCInterpreter[_0x21d116(0x278)][_0x21d116(0x259)]=function(_0x27df96){const _0x49fd82=_0x21d116;return Game_Interpreter[_0x49fd82(0x278)][_0x49fd82(0x259)][_0x49fd82(0x2b6)](this,_0x27df96),this[_0x49fd82(0x35d)]['some'](_0x350b36=>_0x350b36[_0x49fd82(0x34a)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x49fd82(0x41c)]=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map['prototype']['startEncounterEffect'],Scene_Map[_0x21d116(0x278)][_0x21d116(0x2b1)]=function(){const _0x292e6a=_0x21d116;VisuMZ[_0x292e6a(0x4d7)]['Scene_Map_startEncounterEffect']['call'](this),this['_spriteset'][_0x292e6a(0x362)]();},VisuMZ[_0x21d116(0x4d7)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x21d116(0x278)]['onLoadSuccess'],Scene_Load[_0x21d116(0x278)][_0x21d116(0x4b5)]=function(){const _0x1eeb2d=_0x21d116;if($gameMap)$gameMap[_0x1eeb2d(0x38e)]();VisuMZ[_0x1eeb2d(0x4d7)][_0x1eeb2d(0x50c)]['call'](this);},VisuMZ[_0x21d116(0x4d7)]['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x21d116(0x279)],Sprite_Character['prototype']['initMembers']=function(){const _0x3e5f5a=_0x21d116;VisuMZ[_0x3e5f5a(0x4d7)][_0x3e5f5a(0x1f0)][_0x3e5f5a(0x2b6)](this),this[_0x3e5f5a(0x4ff)](),this[_0x3e5f5a(0x1c5)]();},Sprite_Character['prototype'][_0x21d116(0x4ff)]=function(){const _0x788a7b=_0x21d116;this[_0x788a7b(0x2ec)]=0xff;},Sprite_Character[_0x21d116(0x278)][_0x21d116(0x1c5)]=function(){const _0x4ba63c=_0x21d116;this[_0x4ba63c(0x228)]=new Sprite(),this[_0x4ba63c(0x228)]['bitmap']=ImageManager[_0x4ba63c(0x3a8)](_0x4ba63c(0x1b5)),this[_0x4ba63c(0x228)][_0x4ba63c(0x417)][_0x4ba63c(0x569)]=![],this[_0x4ba63c(0x228)]['setFrame'](0x0,0x0,0x0,0x0),this[_0x4ba63c(0x228)][_0x4ba63c(0x40f)]['x']=0.5,this[_0x4ba63c(0x228)][_0x4ba63c(0x40f)]['y']=0x1,this[_0x4ba63c(0x4cf)](this[_0x4ba63c(0x228)]);},Sprite_Character[_0x21d116(0x278)]['isSpriteVS8dir']=function(){const _0x309981=_0x21d116;return this['_characterName']&&this['_characterName'][_0x309981(0x34a)](/\[VS8\]/i);},Sprite_Character[_0x21d116(0x278)][_0x21d116(0x3af)]=function(){const _0x52b893=_0x21d116;return this[_0x52b893(0x21d)]()&&VisuMZ['EventsMoveCore'][_0x52b893(0x1ac)][_0x52b893(0x252)][_0x52b893(0x30e)];},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x336)]=Sprite_Character[_0x21d116(0x278)]['update'],Sprite_Character['prototype']['update']=function(){const _0x5cdfe4=_0x21d116;VisuMZ[_0x5cdfe4(0x4d7)][_0x5cdfe4(0x336)][_0x5cdfe4(0x2b6)](this),VisuMZ['EventsMoveCore']['Settings'][_0x5cdfe4(0x1be)][_0x5cdfe4(0x20b)]&&this[_0x5cdfe4(0x269)](),this['_shadowSprite']&&this[_0x5cdfe4(0x220)](),this[_0x5cdfe4(0x228)]&&this[_0x5cdfe4(0x49e)]();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x4f8)]=Sprite_Character[_0x21d116(0x278)][_0x21d116(0x225)],Sprite_Character['prototype'][_0x21d116(0x225)]=function(){const _0xa65171=_0x21d116;VisuMZ[_0xa65171(0x4d7)][_0xa65171(0x4f8)][_0xa65171(0x2b6)](this),this[_0xa65171(0x417)][_0xa65171(0x3f6)](this['updateBitmapSmoothing'][_0xa65171(0x537)](this));},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x2c3)]=Sprite_Character['prototype']['setCharacterBitmap'],Sprite_Character[_0x21d116(0x278)][_0x21d116(0x267)]=function(){const _0x4b8345=_0x21d116;VisuMZ[_0x4b8345(0x4d7)][_0x4b8345(0x2c3)][_0x4b8345(0x2b6)](this),this[_0x4b8345(0x417)]['addLoadListener'](this[_0x4b8345(0x562)][_0x4b8345(0x537)](this));},Sprite_Character[_0x21d116(0x278)]['updateBitmapSmoothing']=function(){const _0x1df057=_0x21d116;if(!this['bitmap'])return;this[_0x1df057(0x417)][_0x1df057(0x569)]=!!VisuMZ[_0x1df057(0x4d7)]['Settings'][_0x1df057(0x1be)]['BitmapSmoothing'];},VisuMZ['EventsMoveCore'][_0x21d116(0x2c4)]=Sprite_Character[_0x21d116(0x278)][_0x21d116(0x493)],Sprite_Character[_0x21d116(0x278)][_0x21d116(0x493)]=function(){const _0x3e4456=_0x21d116;return this[_0x3e4456(0x21d)]()?this[_0x3e4456(0x484)]():VisuMZ[_0x3e4456(0x4d7)]['Sprite_Character_characterPatternY'][_0x3e4456(0x2b6)](this);},Sprite_Character['prototype']['characterPatternYVS8']=function(){const _0x289208=_0x21d116,_0x3b8e76=this[_0x289208(0x4e6)][_0x289208(0x2da)](),_0x4b74c9=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x4b74c9[_0x3b8e76]-0x2)/0x2;},Sprite_Character[_0x21d116(0x278)][_0x21d116(0x269)]=function(){const _0x323026=_0x21d116;this[_0x323026(0x291)]=0x0;if(this[_0x323026(0x1c1)]()){const _0x244783=VisuMZ[_0x323026(0x4d7)][_0x323026(0x1ac)][_0x323026(0x1be)],_0x561b0e=this[_0x323026(0x4e6)][_0x323026(0x2da)]();let _0x5b39ae=0x0;if([0x1,0x4,0x7]['includes'](_0x561b0e))_0x5b39ae=_0x244783[_0x323026(0x21e)];if([0x3,0x6,0x9]['includes'](_0x561b0e))_0x5b39ae=_0x244783[_0x323026(0x2a9)];[0x2,0x8]['includes'](_0x561b0e)&&(_0x5b39ae=[-_0x244783[_0x323026(0x38f)],0x0,_0x244783[_0x323026(0x38f)]][this['_character']['pattern']()]);if(this[_0x323026(0x4fb)])_0x5b39ae*=-0x1;this[_0x323026(0x291)]=_0x5b39ae;}},Sprite_Character[_0x21d116(0x278)][_0x21d116(0x1c1)]=function(){const _0x1e3f9f=_0x21d116;if(this[_0x1e3f9f(0x3b3)])return![];return this[_0x1e3f9f(0x4e6)][_0x1e3f9f(0x3fc)]()&&!this[_0x1e3f9f(0x4e6)][_0x1e3f9f(0x53f)]()&&!this[_0x1e3f9f(0x4e6)][_0x1e3f9f(0x4cd)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x21d116(0x278)]['updateShadow']=function(){const _0x48badf=_0x21d116;this[_0x48badf(0x344)]['x']=this['_character']['shadowX'](),this['_shadowSprite']['y']=this[_0x48badf(0x4e6)]['shadowY'](),this[_0x48badf(0x344)][_0x48badf(0x2f0)]=this['opacity'],this[_0x48badf(0x344)][_0x48badf(0x339)]=this[_0x48badf(0x4e6)][_0x48badf(0x2d3)](),this[_0x48badf(0x344)][_0x48badf(0x26a)]=this[_0x48badf(0x26a)],!this[_0x48badf(0x4e6)][_0x48badf(0x48f)]()?(this[_0x48badf(0x344)][_0x48badf(0x294)]['x']=Math[_0x48badf(0x514)](0x1,this[_0x48badf(0x344)][_0x48badf(0x294)]['x']+0.1),this[_0x48badf(0x344)][_0x48badf(0x294)]['y']=Math[_0x48badf(0x514)](0x1,this[_0x48badf(0x344)]['scale']['y']+0.1)):(this[_0x48badf(0x344)][_0x48badf(0x294)]['x']=Math[_0x48badf(0x547)](0x0,this['_shadowSprite'][_0x48badf(0x294)]['x']-0.1),this['_shadowSprite'][_0x48badf(0x294)]['y']=Math['max'](0x0,this[_0x48badf(0x344)][_0x48badf(0x294)]['y']-0.1));},Sprite_Character['prototype'][_0x21d116(0x49e)]=function(){const _0x7e4ee6=_0x21d116,_0x153891=this[_0x7e4ee6(0x228)],_0x14b704=this[_0x7e4ee6(0x213)]();if(_0x14b704<=0x0)return _0x153891[_0x7e4ee6(0x1d5)](0x0,0x0,0x0,0x0);else{const _0x435f8a=ImageManager['iconWidth'],_0x3393ad=ImageManager[_0x7e4ee6(0x485)],_0x45d142=_0x14b704%0x10*_0x435f8a,_0x26dd9b=Math[_0x7e4ee6(0x4eb)](_0x14b704/0x10)*_0x3393ad;_0x153891[_0x7e4ee6(0x1d5)](_0x45d142,_0x26dd9b,_0x435f8a,_0x3393ad),this['visible']=!![];}const _0x4e8908=this['_character'][_0x7e4ee6(0x320)]();this[_0x7e4ee6(0x3af)]()?this[_0x7e4ee6(0x473)](_0x153891):(_0x153891['x']=_0x4e8908?_0x4e8908[_0x7e4ee6(0x368)]:0x0,_0x153891['y']=_0x4e8908?-this[_0x7e4ee6(0x2fe)]+_0x4e8908[_0x7e4ee6(0x375)]:0x0),_0x153891['blendMode']=_0x4e8908?_0x4e8908[_0x7e4ee6(0x2d0)]:0x0,this[_0x7e4ee6(0x394)](_0x153891),this['addChild'](_0x153891),_0x153891[_0x7e4ee6(0x291)]=-this[_0x7e4ee6(0x291)];},Sprite_Character[_0x21d116(0x278)][_0x21d116(0x473)]=function(_0x38b397){const _0xc30084=_0x21d116;_0x38b397['x']=0x0,_0x38b397['y']=-this['height']+this[_0xc30084(0x2fe)]*0x2/0x5,this['_character']['pattern']()!==0x1&&(_0x38b397['y']+=0x1);},Sprite_Character[_0x21d116(0x278)]['getEventIconIndex']=function(){const _0x1c3dfb=_0x21d116;if(!this[_0x1c3dfb(0x4e6)])return 0x0;if(this[_0x1c3dfb(0x4e6)][_0x1c3dfb(0x2c0)])return 0x0;const _0x4e9fd2=this[_0x1c3dfb(0x4e6)][_0x1c3dfb(0x320)]();return _0x4e9fd2?_0x4e9fd2[_0x1c3dfb(0x4cc)]||0x0:0x0;},VisuMZ[_0x21d116(0x4d7)]['Sprite_Balloon_setup']=Sprite_Balloon[_0x21d116(0x278)][_0x21d116(0x39f)],Sprite_Balloon[_0x21d116(0x278)][_0x21d116(0x39f)]=function(_0x1710a1,_0xbf95f1){const _0x4a51df=_0x21d116;VisuMZ[_0x4a51df(0x4d7)][_0x4a51df(0x251)][_0x4a51df(0x2b6)](this,_0x1710a1,_0xbf95f1),VisuMZ[_0x4a51df(0x4d7)][_0x4a51df(0x1ac)][_0x4a51df(0x252)][_0x4a51df(0x3ff)]&&this[_0x4a51df(0x355)][_0x4a51df(0x4e6)][_0x4a51df(0x215)](_0xbf95f1,this[_0x4a51df(0x4bd)]);},VisuMZ[_0x21d116(0x4d7)]['Sprite_Balloon_updatePosition']=Sprite_Balloon[_0x21d116(0x278)][_0x21d116(0x455)],Sprite_Balloon['prototype'][_0x21d116(0x455)]=function(){const _0x3295f0=_0x21d116;VisuMZ[_0x3295f0(0x4d7)][_0x3295f0(0x529)][_0x3295f0(0x2b6)](this),this[_0x3295f0(0x395)]();},Sprite_Balloon[_0x21d116(0x278)][_0x21d116(0x395)]=function(){const _0x3663f1=_0x21d116;this['_target']['_character']['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x3663f1(0x4d7)][_0x3663f1(0x1ac)][_0x3663f1(0x252)]['BalloonOffsetX'],this['y']+=VisuMZ[_0x3663f1(0x4d7)][_0x3663f1(0x1ac)][_0x3663f1(0x252)][_0x3663f1(0x297)]);},Sprite_Timer[_0x21d116(0x278)][_0x21d116(0x563)]=function(){const _0x484fe6=_0x21d116;this[_0x484fe6(0x417)]=new Bitmap(Math[_0x484fe6(0x222)](Graphics[_0x484fe6(0x555)]/0x2),0x30),this[_0x484fe6(0x417)]['fontFace']=this[_0x484fe6(0x2ae)](),this[_0x484fe6(0x417)]['fontSize']=this['fontSize'](),this[_0x484fe6(0x417)]['outlineColor']=ColorManager[_0x484fe6(0x3be)]();},Sprite_Timer[_0x21d116(0x278)][_0x21d116(0x54b)]=function(){const _0x15b1ca=_0x21d116,_0x3b0d59=Math[_0x15b1ca(0x4eb)](this[_0x15b1ca(0x1ef)]/0x3c/0x3c),_0x2530bd=Math[_0x15b1ca(0x4eb)](this[_0x15b1ca(0x1ef)]/0x3c)%0x3c,_0x16022c=this[_0x15b1ca(0x1ef)]%0x3c;let _0x132895=_0x2530bd['padZero'](0x2)+':'+_0x16022c[_0x15b1ca(0x3b7)](0x2);if(_0x3b0d59>0x0)_0x132895=_0x15b1ca(0x1e7)[_0x15b1ca(0x3b1)](_0x3b0d59,_0x132895);return _0x132895;},VisuMZ['EventsMoveCore'][_0x21d116(0x1a2)]=Spriteset_Map[_0x21d116(0x278)][_0x21d116(0x471)],Spriteset_Map['prototype'][_0x21d116(0x471)]=function(){const _0x413bab=_0x21d116;VisuMZ[_0x413bab(0x4d7)][_0x413bab(0x1a2)][_0x413bab(0x2b6)](this),this[_0x413bab(0x55c)]();},VisuMZ['EventsMoveCore'][_0x21d116(0x540)]=Spriteset_Map['prototype'][_0x21d116(0x393)],Spriteset_Map[_0x21d116(0x278)][_0x21d116(0x393)]=function(){const _0x476d4a=_0x21d116;VisuMZ[_0x476d4a(0x4d7)]['Spriteset_Map_createShadow'][_0x476d4a(0x2b6)](this),this[_0x476d4a(0x268)]();},Spriteset_Map[_0x21d116(0x278)]['createShadows']=function(){const _0x2e81c7=_0x21d116;if(!VisuMZ[_0x2e81c7(0x4d7)][_0x2e81c7(0x1ac)][_0x2e81c7(0x1be)]['ShowShadows'])return;for(const _0x234306 of this[_0x2e81c7(0x37b)]){this['createCharacterShadow'](_0x234306);}},Spriteset_Map[_0x21d116(0x278)]['createCharacterShadow']=function(_0x19a81c){const _0x2ec2a1=_0x21d116;_0x19a81c[_0x2ec2a1(0x344)]=new Sprite(),_0x19a81c['_shadowSprite'][_0x2ec2a1(0x319)]=_0x19a81c[_0x2ec2a1(0x4e6)][_0x2ec2a1(0x275)](),_0x19a81c[_0x2ec2a1(0x344)]['bitmap']=ImageManager['loadSystem'](_0x19a81c[_0x2ec2a1(0x344)][_0x2ec2a1(0x319)]),_0x19a81c['_shadowSprite'][_0x2ec2a1(0x40f)]['x']=0.5,_0x19a81c['_shadowSprite'][_0x2ec2a1(0x40f)]['y']=0x1,_0x19a81c[_0x2ec2a1(0x344)]['z']=0x0,this[_0x2ec2a1(0x49f)][_0x2ec2a1(0x4cf)](_0x19a81c[_0x2ec2a1(0x344)]);},Spriteset_Map[_0x21d116(0x278)]['hideShadows']=function(){const _0x2b3b02=_0x21d116;if(!VisuMZ[_0x2b3b02(0x4d7)][_0x2b3b02(0x1ac)][_0x2b3b02(0x1be)][_0x2b3b02(0x47f)])return;for(const _0x1a3961 of this[_0x2b3b02(0x37b)]){this[_0x2b3b02(0x49f)][_0x2b3b02(0x394)](_0x1a3961[_0x2b3b02(0x344)]);}},Spriteset_Map[_0x21d116(0x278)]['createLabelWindows']=function(){const _0x2cced1=_0x21d116;this['_labelWindows']=[];for(const _0x452601 of $gameMap[_0x2cced1(0x550)]()){this[_0x2cced1(0x2af)](_0x452601);}},Spriteset_Map['prototype']['createLabelWindowForTarget']=function(_0x21eb00){const _0xa3e655=_0x21d116;if(!this[_0xa3e655(0x2c1)](_0x21eb00))return;const _0x14ed64=new Window_EventLabel(_0x21eb00);_0x14ed64['z']=0x8,_0x14ed64[_0xa3e655(0x3c1)]=Sprite[_0xa3e655(0x306)]++,this[_0xa3e655(0x49f)][_0xa3e655(0x4cf)](_0x14ed64),this[_0xa3e655(0x237)]['push'](_0x14ed64);},Spriteset_Map[_0x21d116(0x278)][_0x21d116(0x2c1)]=function(_0x1c798f){const _0x3fe733=_0x21d116,_0x4e8824=_0x1c798f[_0x3fe733(0x25f)]();if(_0x4e8824['note'][_0x3fe733(0x34a)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x4e8824[_0x3fe733(0x482)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x5bd6cf of _0x4e8824[_0x3fe733(0x28d)]){let _0x1dc824='';for(const _0x2fb78c of _0x5bd6cf[_0x3fe733(0x1c7)]){[0x6c,0x198][_0x3fe733(0x2e8)](_0x2fb78c[_0x3fe733(0x50d)])&&(_0x1dc824+=_0x2fb78c[_0x3fe733(0x286)][0x0]);}if(_0x1dc824[_0x3fe733(0x34a)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1dc824[_0x3fe733(0x34a)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x21d116(0x278)][_0x21d116(0x1ed)]=function(_0x4a2e86){const _0x2d732c=_0x21d116;this[_0x2d732c(0x37b)]=this['_characterSprites']||[];const _0x122e51=new Sprite_Character(_0x4a2e86);this[_0x2d732c(0x37b)][_0x2d732c(0x457)](_0x122e51),this['_tilemap'][_0x2d732c(0x4cf)](_0x122e51),this['createCharacterShadow'](_0x122e51),this[_0x2d732c(0x2af)](_0x4a2e86),_0x122e51[_0x2d732c(0x3c7)]();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x570)]=Game_Message[_0x21d116(0x278)][_0x21d116(0x2f3)],Game_Message[_0x21d116(0x278)]['setNumberInput']=function(_0x4040ae,_0x4c48bd){const _0x277ba0=_0x21d116;this[_0x277ba0(0x2a6)]=$gameTemp['getSelfTarget'](),VisuMZ['EventsMoveCore'][_0x277ba0(0x570)][_0x277ba0(0x2b6)](this,_0x4040ae,_0x4c48bd);},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x4e4)]=Window_NumberInput[_0x21d116(0x278)][_0x21d116(0x46b)],Window_NumberInput[_0x21d116(0x278)]['start']=function(){const _0x5d4af8=_0x21d116;$gameTemp['registerSelfTarget']($gameMessage[_0x5d4af8(0x2a6)]),VisuMZ[_0x5d4af8(0x4d7)][_0x5d4af8(0x4e4)][_0x5d4af8(0x2b6)](this),$gameTemp[_0x5d4af8(0x1e3)]();},VisuMZ['EventsMoveCore'][_0x21d116(0x1a8)]=Window_NumberInput[_0x21d116(0x278)][_0x21d116(0x443)],Window_NumberInput['prototype']['processOk']=function(){const _0x67c75a=_0x21d116;$gameTemp[_0x67c75a(0x217)]($gameMessage[_0x67c75a(0x2a6)]),VisuMZ[_0x67c75a(0x4d7)][_0x67c75a(0x1a8)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x67c75a(0x2a6)]=undefined;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x505)]=Game_Message[_0x21d116(0x278)][_0x21d116(0x3b2)],Game_Message['prototype'][_0x21d116(0x3b2)]=function(_0x1ca042,_0x5a48be){const _0x4c5e06=_0x21d116;this[_0x4c5e06(0x47d)]=$gameTemp[_0x4c5e06(0x2a2)](),VisuMZ[_0x4c5e06(0x4d7)][_0x4c5e06(0x505)]['call'](this,_0x1ca042,_0x5a48be);},VisuMZ['EventsMoveCore'][_0x21d116(0x2ff)]=Window_EventItem[_0x21d116(0x278)][_0x21d116(0x4ab)],Window_EventItem['prototype'][_0x21d116(0x4ab)]=function(){const _0x526f64=_0x21d116;$gameTemp[_0x526f64(0x217)]($gameMessage[_0x526f64(0x47d)]),VisuMZ[_0x526f64(0x4d7)][_0x526f64(0x2ff)]['call'](this),$gameTemp[_0x526f64(0x1e3)](),$gameMessage[_0x526f64(0x47d)]=undefined;},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x577)]=Window_EventItem[_0x21d116(0x278)][_0x21d116(0x1a7)],Window_EventItem[_0x21d116(0x278)][_0x21d116(0x1a7)]=function(){const _0x2cc8cf=_0x21d116;$gameTemp[_0x2cc8cf(0x217)]($gameMessage[_0x2cc8cf(0x47d)]),VisuMZ[_0x2cc8cf(0x4d7)][_0x2cc8cf(0x577)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore'][_0x21d116(0x19d)]=Window_Message[_0x21d116(0x278)][_0x21d116(0x227)],Window_Message[_0x21d116(0x278)]['startMessage']=function(){const _0x240696=_0x21d116;$gameMessage[_0x240696(0x2f9)](),VisuMZ[_0x240696(0x4d7)][_0x240696(0x19d)][_0x240696(0x2b6)](this),$gameTemp[_0x240696(0x1e3)]();},VisuMZ[_0x21d116(0x4d7)][_0x21d116(0x3df)]=Window_ScrollText['prototype'][_0x21d116(0x227)],Window_ScrollText[_0x21d116(0x278)]['startMessage']=function(){const _0x524413=_0x21d116;$gameMessage[_0x524413(0x2f9)](),VisuMZ['EventsMoveCore'][_0x524413(0x3df)][_0x524413(0x2b6)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x75f04a=_0x21d116;this[_0x75f04a(0x318)](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0x21d116(0x278)]),Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x39e)]=Window_EventLabel,Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x318)]=function(_0x197f6c){const _0x3efe3c=_0x21d116;this[_0x3efe3c(0x52c)]=_0x197f6c;const _0x38e4ac=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this[_0x3efe3c(0x506)](0x1));this[_0x3efe3c(0x279)](),Window_Base[_0x3efe3c(0x278)][_0x3efe3c(0x318)][_0x3efe3c(0x2b6)](this,_0x38e4ac),this[_0x3efe3c(0x25b)]=0x0,this[_0x3efe3c(0x486)](0x2),this[_0x3efe3c(0x4c9)]='';},Window_EventLabel['prototype']['initMembers']=function(){const _0x25efa3=_0x21d116;this[_0x25efa3(0x437)]=![],this['_screenZoomScale']=$gameScreen[_0x25efa3(0x51d)](),this['_eventScreenX']=this[_0x25efa3(0x52c)]['screenX'](),this['_eventScreenY']=this[_0x25efa3(0x52c)][_0x25efa3(0x4b2)](),this[_0x25efa3(0x335)]=this[_0x25efa3(0x52c)]['_labelWindow'][_0x25efa3(0x41d)],this[_0x25efa3(0x4de)]=this[_0x25efa3(0x52c)]['_labelWindow'][_0x25efa3(0x3e6)],this[_0x25efa3(0x22a)]=this[_0x25efa3(0x52c)][_0x25efa3(0x4b9)],this['_cacheVisibility']=this[_0x25efa3(0x367)](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0x25efa3(0x341)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x25efa3(0x52c)]['x'],this[_0x25efa3(0x2dc)]=this[_0x25efa3(0x52c)]['y'];},Window_EventLabel[_0x21d116(0x278)]['update']=function(){const _0x3fd8a2=_0x21d116;Window_Base[_0x3fd8a2(0x278)][_0x3fd8a2(0x3c7)]['call'](this);if(!this[_0x3fd8a2(0x446)]())return;this[_0x3fd8a2(0x33d)](),this[_0x3fd8a2(0x4cb)](),this[_0x3fd8a2(0x455)](),this[_0x3fd8a2(0x1af)]();},Window_EventLabel['prototype'][_0x21d116(0x446)]=function(){const _0x74277e=_0x21d116;if(!this['_event'])return![];if(!this['_event'][_0x74277e(0x1d9)])return![];if(this[_0x74277e(0x22a)]!==this[_0x74277e(0x52c)][_0x74277e(0x4b9)])return!![];if(this[_0x74277e(0x52c)][_0x74277e(0x2c0)]&&!this[_0x74277e(0x437)])return!![];if(this[_0x74277e(0x52c)][_0x74277e(0x1d9)]['text']==='')return![];if(this[_0x74277e(0x4e9)]!==$gameScreen[_0x74277e(0x51d)]())return!![];if(this['_eventScreenX']!==this[_0x74277e(0x52c)]['screenX']())return!![];if(this['_eventScreenY']!==this[_0x74277e(0x52c)][_0x74277e(0x4b2)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x74277e(0x52c)][_0x74277e(0x1d9)]['offsetX'])return!![];if(this['_eventLabelOffsetY']!==this[_0x74277e(0x52c)]['_labelWindow'][_0x74277e(0x3e6)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this[_0x74277e(0x341)]!==$gamePlayer['y'])return!![];if(this[_0x74277e(0x3c8)]!==this[_0x74277e(0x52c)]['x'])return!![];if(this['_visibleEventY']!==this[_0x74277e(0x52c)]['y'])return!![];if(this[_0x74277e(0x1bd)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x74277e(0x1bd)]&&this[_0x74277e(0x25b)]>0x0)return!![];if(SceneManager[_0x74277e(0x423)][_0x74277e(0x347)]>0x0)return!![];return![];},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x33d)]=function(){const _0x4e6b30=_0x21d116;this[_0x4e6b30(0x52c)][_0x4e6b30(0x3a9)]()!==this['_text']&&(this['_text']=this[_0x4e6b30(0x52c)][_0x4e6b30(0x3a9)](),this[_0x4e6b30(0x55f)]());},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x4cb)]=function(){const _0x1d0f50=_0x21d116;this['scale']['x']=0x1/$gameScreen[_0x1d0f50(0x51d)](),this[_0x1d0f50(0x294)]['y']=0x1/$gameScreen[_0x1d0f50(0x51d)](),this[_0x1d0f50(0x4e9)]=$gameScreen[_0x1d0f50(0x51d)]();},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x455)]=function(){const _0x2e556a=_0x21d116;if(!SceneManager['_scene'])return;if(!SceneManager[_0x2e556a(0x423)][_0x2e556a(0x429)])return;const _0x2391ca=SceneManager[_0x2e556a(0x423)]['_spriteset'][_0x2e556a(0x445)](this[_0x2e556a(0x52c)]);if(!_0x2391ca)return;this['x']=Math[_0x2e556a(0x222)](this[_0x2e556a(0x52c)][_0x2e556a(0x1d8)]()-Math[_0x2e556a(0x4eb)](this[_0x2e556a(0x558)]*this[_0x2e556a(0x294)]['x']/0x2)),this['x']+=this[_0x2e556a(0x52c)][_0x2e556a(0x1d9)][_0x2e556a(0x41d)],this['y']=this[_0x2e556a(0x52c)]['screenY']()-_0x2391ca['height'],this['y']+=Math['round']($gameSystem[_0x2e556a(0x548)]()*0.5),this['y']-=Math[_0x2e556a(0x222)](this[_0x2e556a(0x2fe)]*this[_0x2e556a(0x294)]['y']),this['y']+=this[_0x2e556a(0x52c)]['_labelWindow'][_0x2e556a(0x3e6)],this[_0x2e556a(0x437)]=this['_event'][_0x2e556a(0x2c0)],this[_0x2e556a(0x29d)]=this[_0x2e556a(0x52c)]['screenX'](),this[_0x2e556a(0x35f)]=this['_event'][_0x2e556a(0x4b2)](),this['_eventLabelOffsetX']=this['_event']['_labelWindow'][_0x2e556a(0x41d)],this[_0x2e556a(0x4de)]=this[_0x2e556a(0x52c)]['_labelWindow'][_0x2e556a(0x3e6)],this['_eventPageIndex']=this[_0x2e556a(0x52c)][_0x2e556a(0x4b9)],this[_0x2e556a(0x437)]&&(this[_0x2e556a(0x25b)]=0x0);},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x1af)]=function(){const _0x1fdf6e=_0x21d116;if(this[_0x1fdf6e(0x367)]())this['contentsOpacity']+=this[_0x1fdf6e(0x483)]();else SceneManager[_0x1fdf6e(0x423)]['_encounterEffectDuration']>0x0?this[_0x1fdf6e(0x25b)]=0x0:this[_0x1fdf6e(0x25b)]-=this[_0x1fdf6e(0x483)]();},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x367)]=function(){const _0x39f953=_0x21d116;if(!$gameSystem[_0x39f953(0x1aa)]())return![];if(this['_event']?.[_0x39f953(0x2c0)])return![];if(SceneManager['_scene'][_0x39f953(0x347)]>0x0)return![];const _0x9a7ae9=$gamePlayer['x'],_0xc15886=$gamePlayer['y'],_0x319528=this[_0x39f953(0x52c)]['x'],_0x550970=this['_event']['y'];if(this[_0x39f953(0x1b8)]===_0x9a7ae9&&this[_0x39f953(0x341)]===_0xc15886&&this[_0x39f953(0x3c8)]===_0x319528&&this['_visibleEventY']===_0x550970)return this[_0x39f953(0x1bd)];this[_0x39f953(0x1b8)]=$gamePlayer['x'],this[_0x39f953(0x341)]=$gamePlayer['y'],this[_0x39f953(0x3c8)]=this[_0x39f953(0x52c)]['x'],this[_0x39f953(0x2dc)]=this[_0x39f953(0x52c)]['y'];if($gameMap[_0x39f953(0x53a)](_0x9a7ae9,_0xc15886,_0x319528,_0x550970)>this[_0x39f953(0x52c)][_0x39f953(0x44c)]())return this[_0x39f953(0x1bd)]=![],![];return this[_0x39f953(0x1bd)]=!![],!![];},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x483)]=function(){const _0x36896e=_0x21d116;return VisuMZ['EventsMoveCore'][_0x36896e(0x1ac)][_0x36896e(0x517)][_0x36896e(0x239)];},Window_EventLabel['prototype'][_0x21d116(0x280)]=function(){const _0x5909d4=_0x21d116,_0x10bc7c=this[_0x5909d4(0x22c)](this['_text']);this[_0x5909d4(0x558)]=_0x10bc7c[_0x5909d4(0x558)]+($gameSystem[_0x5909d4(0x548)]()+this[_0x5909d4(0x337)]())*0x2,this[_0x5909d4(0x2fe)]=Math[_0x5909d4(0x547)](this['lineHeight'](),_0x10bc7c['height'])+$gameSystem[_0x5909d4(0x548)]()*0x2,this[_0x5909d4(0x420)]();},Window_EventLabel[_0x21d116(0x278)]['lineHeight']=function(){const _0x333c9d=_0x21d116;return VisuMZ[_0x333c9d(0x4d7)][_0x333c9d(0x1ac)][_0x333c9d(0x517)][_0x333c9d(0x3bf)];},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x256)]=function(){const _0x3b6255=_0x21d116;Window_Base[_0x3b6255(0x278)]['resetFontSettings'][_0x3b6255(0x2b6)](this),this[_0x3b6255(0x53d)][_0x3b6255(0x322)]=this[_0x3b6255(0x419)]();},Window_EventLabel[_0x21d116(0x278)]['defaultFontSize']=function(){const _0x365e61=_0x21d116;return VisuMZ[_0x365e61(0x4d7)][_0x365e61(0x1ac)][_0x365e61(0x517)][_0x365e61(0x229)];},Window_EventLabel[_0x21d116(0x278)][_0x21d116(0x55f)]=function(){const _0x3dae8f=_0x21d116;this[_0x3dae8f(0x280)](),this['contents'][_0x3dae8f(0x352)]();const _0x8d1fa=this['_text']['split'](/[\r\n]+/);let _0x502cda=0x0;for(const _0x38c6fd of _0x8d1fa){const _0x34d50d=this[_0x3dae8f(0x22c)](_0x38c6fd),_0x3a3006=Math[_0x3dae8f(0x4eb)]((this[_0x3dae8f(0x3dd)]-_0x34d50d['width'])/0x2);this[_0x3dae8f(0x334)](_0x38c6fd,_0x3a3006,_0x502cda),_0x502cda+=_0x34d50d[_0x3dae8f(0x2fe)];}},Window_EventLabel[_0x21d116(0x278)]['processDrawIcon']=function(_0x51e91b,_0x1f131b){const _0x210557=_0x21d116;_0x1f131b[_0x210557(0x48a)]&&this['drawIcon'](_0x51e91b,_0x1f131b['x']+0x2,_0x1f131b['y']),_0x1f131b['x']+=Math[_0x210557(0x514)](this['iconSize'](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x21d116(0x278)]['drawIcon']=function(_0x451483,_0x55fc09,_0x49a46c){const _0xbf9cb1=_0x21d116,_0x1c274f=ImageManager[_0xbf9cb1(0x3a8)](_0xbf9cb1(0x1b5)),_0xe3214c=ImageManager['iconWidth'],_0x4d698f=ImageManager['iconHeight'],_0xfa46a4=_0x451483%0x10*_0xe3214c,_0x3d9928=Math[_0xbf9cb1(0x4eb)](_0x451483/0x10)*_0x4d698f,_0x40989b=Math[_0xbf9cb1(0x514)](this[_0xbf9cb1(0x281)]()),_0x3b538a=Math[_0xbf9cb1(0x514)](this[_0xbf9cb1(0x281)]());this[_0xbf9cb1(0x53d)][_0xbf9cb1(0x21c)](_0x1c274f,_0xfa46a4,_0x3d9928,_0xe3214c,_0x4d698f,_0x55fc09,_0x49a46c,_0x40989b,_0x3b538a);},Window_EventLabel['prototype'][_0x21d116(0x281)]=function(){const _0x30855e=_0x21d116;return VisuMZ[_0x30855e(0x4d7)][_0x30855e(0x1ac)][_0x30855e(0x517)][_0x30855e(0x1b0)];};