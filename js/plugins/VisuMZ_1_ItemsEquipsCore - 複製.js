//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.20] [ItemsEquipsCore][翻譯版本:1]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
* Notetags
* ============================================================================
* === General ===
* <Max: x>
* - Used for: Item, Weapon, Armor Notetags
* - 確定此項目可以容納的最大數量。
* - 用數字值替換"x"以確定最大數量。
* ------ ------ ------ ------ ------ ------ 
* <Color: x>
* <Color: #rrggbb>
* - Used for: Item, Weapon, Armor, Skill Notetags
* - 確定遊戲內菜單中對象的顏色。
* - 將"x"替換為描述窗口文本顏色的數字值。
* - 用十六進制顏色代碼替換"rrggbb"以獲得更自定義的顏色。
* ------ ------ ------ ------ ------ ------ 
* <Category: x>
* - Used for: Item, Weapon, Armor Notetags
* - 將項目分為某些/多個類別，以使用"類別插件參數"設置: "Category: x"。
* - 將"x"替換為類別名稱以將該項目標記為。
* ------ ------ ------ ------ ------ ------ 
* <Categories>
*  x
*  x
* </Categories>
* - Used for: Item, Weapon, Armor Notetags
* - 將項目分為某些/多個類別，以使用"類別插件參數"設置: "Category: x"。
* - 將每個"x"替換為類別名稱，以將該項目標記為。
* === Item Accessibility Notetags ===
* <Enable Switch: x>
*
* <Enable All Switches: x,x,x>
* <Enable Any Switches: x,x,x>
*
* - Used for: Item Notetags
* - 根據開關確定項目的啟用狀態。
* - 用交換機ID替換"x"以確定該項目的啟用狀態。
* - 如果使用了"所有"便簽標籤變體，則該項目將被禁用，直到所有開關都打開。 然後，將啟用它。
* - 如果使用"任何"記事標籤變體，則任何一個開關為ON時，將啟用該項目。 否則，它將被禁用。
* ------ ------ ------ ------ ------ ------ 
* <Disable Switch: x>
*
* <Disable All Switches: x,x,x>
* <Disable Any Switches: x,x,x>
*
* - Used for: Item Notetags
* - 根據開關確定項目的啟用狀態。
* - 用交換機ID替換"x"以確定該項目的啟用狀態。
* - 如果使用"全部"便簽變體，則將啟用該項目，直到所有開關都打開。 然後，它將被禁用。
* - 如果使用"任何"記事標籤變體，則任何一個開關為ON時，該項目將被禁用。 否則，它將被啟用。
* === JavaScript Notetags: Item Accessibility ===
* <JS Item Enable>
*  code
*  code
*  enabled = code;
* </JS Item Enable>
*
* - Used for: Item Notetags
* - 根據JavaScript代碼確定項目的啟用狀態。
* - 如果被禁用此角色的角色是唯一的聚會成員，則除非安裝了VisuStella Battle Core，否則它將不會在項目列表中顯示。
* - 如果安裝了VisuStella Battle Core，則即使禁用了所有戰鬥範圍項目，它們也將可見。
* - 替換"code"以確定項目的類型啟用狀態。
* - 'enabled'變量返回一個布爾值（true / false），以確定是否啟用該項目。
* - "user"變量是指擁有該商品的用戶。
* - "item"變量是指要檢查的項目。
* - 必須滿足所有其他項目條件，才能對此進行計數。
* ------ ------ ------ ------ ------ ------ 
* === Equipment Notetags ===
* <Equip Slots>
*  slotName
*  slotName
*  slotName
* </Equip Slots>
*
* - Used for: Class Notetags
* - 更改該級別任何角色的設備插槽裝載。
* - 從數據庫>類型中，用設備類型名稱替換'slotName'。這是區分大小寫的。
* - 根據需要插入或刪除盡可能多的"slotName"設備類型。
* ------ ------ ------ ------ ------ ------ 
* <param: +x>
* <param: -x>
* - Used for: Weapon, Armor Notetags
* - 更改裝備項目的基本參數值。
* - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
*   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
* - 用數字值替換"x"以將參數值設置為。
* - 這使你可以繞過數據庫編輯器的數量限制。
* ------ ------ ------ ------ ------ ------ 
* <Equip Copy Limit: x>
* - Used for: Weapon, Armor Notetags
* - 設置角色可以佩戴此設備的最大副本數。
* - 用數字值替換"x"以確定複印限制。
* - 可以使用事件命令和/或腳本調用來繞過此操作。
* - 使用示例: 儘管環上有一個<Equip Copy Limit: 1>標記，但角色有空的附件插槽，角色們卻隨時只能裝備一個"One-of-a-Kind Ring"副本。
* ------ ------ ------ ------ ------ ------ 
* <Equip Weapon Type Limit: x>
* - Used for: Weapon
* - 一旦達到限制數量，該武器便無法配備其他相同類型的武器。
* - 用數字值替換"x"以確定武器類型限制。
* - 可以使用事件命令和/或腳本調用來繞過此操作。
* - 用法示例: 一名雙持戰士，只能裝備一把劍和匕首，而不能裝備兩把劍或兩把匕首，因為這些劍和匕首都帶有<Equip Weapon Type Limit: 1>便簽。
* ------ ------ ------ ------ ------ ------ 
* <Equip Armor Type Limit: x>
* - Used for: Armor
* - 一旦達到限制數量，該裝甲就無法再裝備其他相同類型的裝甲。
* - 用數字值替換"x"以確定裝甲類型限制。
* - 可以使用事件命令和/或腳本調用來繞過此操作。
* - 使用示例: 人們一次不能安裝兩個以上的手套配件，因為該手套是"手套"裝甲類型，並且每個手套物品上均帶有<Equip Armor Type Limit: 2>便簽。
* ------ ------ ------ ------ ------ ------ 
* === JavaScript Notetags: Equipment ===
* <JS Parameters>
*  MaxHP = code;
*  MaxMP = code;
*  ATK = code;
*  DEF = code;
*  MAT = code;
*  MDF = code;
*  AGI = code;
*  LUK = code;
* </JS Parameters>
*
* - Used for: Weapon, Armor Notetags
* - 使用JavaScript根據用於計算其值的代碼來確定基本參數的值。
* - 變量"MaxHP"，"MaxMP"，"ATK"，"DEF"，"MAT"，"MDF"，"AGI"和"LUK"用於確定參數的最終值。 此變量區分大小寫。
* - 如果不存在參數，則其值將被視為+0。
* ------ ------ ------ ------ ------ ------ 
* === Status Window Notetags ===
* <Status Info>
*  key: data
*  key: data
*  key: data
* </Status Info>
*
* - Used for: Skill, Item, Weapon, Armor Notetags
* - 如果你不喜歡所顯示的生成的數據，則可以使用此便簽標籤對其進行更改，以顯示所需的內容。
* - 將"key"替換為以下之一: 
*   - Consumable 消耗品
*   - Quantity 數量
*   - Occasion 場合
*   - Scope 範圍
*   - Speed 速度
*   - Success Rate 成功率
*   - Repeat 重複
*   - Hit Type 命中類型
*   - Element 元素
*   - Damage Multiplier 傷害倍數
*   - HP Recovery HP恢復
*   - MP Recovery MP恢復
*   - TP Recovery TP恢復
*   - HP Damage HP傷害
*   - MP Damage MP傷害
*   - TP Damage TP傷害
*   - User TP Gain 使用這獲得TP數
*   - Added Effects 增加效果
*   - Removed Effects 移除效果
* - 將"data"替換為你想要直觀顯示的文本數據。 你可以為此使用文本代碼。
* - 這只會影響已經可見並且不會突然出現其他類別的信息條目。
* - 根據需要插入或刪除盡可能多的"key: data"行。
* ------ ------ ------ ------ ------ ------ 
* <Custom Status Info>
*  key: data
*  key: data
*  key: data
* </Custom Status Info>
*
* - Used for: Skill, Item
* - 如果你希望顯示商店狀態窗口信息未提供的商品的自定義類別和數據，則可以使用此便簽標籤添加自己的條目。
* - 將"key"替換為你想要的確切標籤的文本。 你可以為此使用文本代碼。
* - 將"data"替換為所需的確切文本數據的文本。 你可以為此使用文本代碼。
* - 根據需要插入或刪除盡可能多的"key: data"行。
* ------ ------ ------ ------ ------ ------ 
* === Shop Menu Notetags ===
* <Price: x>
*
* - Used for: Item, Weapon, Armor Notetags
* - 調整該商品的購買價格。
* - 將"x"替換為描述所需購買價格值的數字。
* - 這使你可以繞過RPG Maker MZ編輯器的999,999限制。
* ------ ------ ------ ------ ------ ------ 
* <Can Sell>
* <Cannot Sell>
* - Used for: Item, Weapon, Armor Notetags
* - 使物料始終可出售或不可出售。
* - 這會繞過遊戲的內部硬編碼，以防止價格為0的商品被出售。
* - 這繞過了遊戲的內部硬編碼，始終允許價格能夠出售的物品。
* ------ ------ ------ ------ ------ ------ 
* <Sell Price: x>
* - Used for: Item, Weapon, Armor Notetags
* - 將銷售價格更改為與默認金額不同的值。
* - 將"x"替換為描述所需售價的數字。
* ------ ------ ------ ------ ------ ------ 
* <Show Shop Switch: x>
*
* <Show Shop All Switches: x,x,x>
* <Show Shop Any Switches: x,x,x>
*
* - Used for: Item, Weapon, Armor Notetags
* - 根據開關確定商店物料的可見性。
* - 用開關ID替換"x"，以確定商店商品的可見性。
* - 如果使用了"全部"便簽標籤變體，則該項目將被隱藏，直到所有開關都打開。 然後，將顯示它。
* - 如果使用"任何"記事標籤變體，則任何一個開關為ON時，都會顯示該項目。 否則，它將被隱藏。
* ------ ------ ------ ------ ------ ------ 
* <Hide Shop Switch: x>
*
* <Hide Shop All Switches: x,x,x>
* <Hide Shop Any Switches: x,x,x>
*
* - Used for: Item, Weapon, Armor Notetags
* - 根據開關確定商店物料的可見性。
* - 用開關ID替換"x"，以確定商店商品的可見性。
* - 如果使用"全部"便簽變體，則項目將一直顯示，直到所有開關都打開。 然後，它將被隱藏。
* - 如果使用'任何'記事標籤變體，則任何一個開關為ON時，該項目將被隱藏。 否則，將顯示出來。
* ------ ------ ------ ------ ------ ------ 
* <Cannot Sell Switch: x>
*
* <Cannot Sell All Switches: x,x,x>
* <Cannot Sell Any Switches: x,x,x>
*
* - Used for: Item, Weapon, Armor Notetags
* - 根據開關確定商店商品的可銷售性。
* - 用開關ID替換"x"，以確定商店商品的可銷售性。
* - 如果使用了"全部"便簽變體，則在所有開關都打開之前才能出售該物品。 否則，可以出售。
* - 如果使用了"任何"便簽標籤變體，則任何一個開關都打開時，該物品將無法出售。 否則，可以出售。
* ------ ------ ------ ------ ------ ------ 
* === JavaScript Notetags: Shop Menu ===
*
* The following are notetags made for users with JavaScript knowledge. These
* notetags are primarily aimed at Buy and Sell prices.
* ------ ------ ------ ------ ------ ------ 
* <JS Buy Price>
*  code
*  code
*  price = code;
* </JS Buy Price>
*
* - Used for: Item, Weapon, Armor Notetags
* - 替換"code"以確定該物品的購買"Price"。
* - 將最終購買價格插入"Price"變量中。
* - "item"變量是指要購買的物品。
* ------ ------ ------ ------ ------ ------ 
* <JS Sell Price>
*  code
*  code
*  price = code;
* </JS Sell Price>
*
* - Used for: Item, Weapon, Armor Notetags
* - 替換"code"以確定該物品的銷售"Price"。
* - 將最終賣出價格插入"Price"變量中。
* - "item"變量是指要出售的物品。
* ------ ------ ------ ------ ------ ------ 
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text 角色: 更改裝備插槽
 * @desc 強制更改角色的裝備插槽。
 * 這些將通過班級變更而持續存在。
 *
 * @arg Actors:arraynum
 * @text 角色 ID(s)
 * @type actor[]
 * @desc 選擇要影響的角色 ID。
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text 裝備插槽
 * @type string[]
 * @desc 插入你希望角色擁有的裝備插槽。
 * 這些條目區分大小寫。
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text 角色: 重置裝備插槽
 * @desc 重置角色的所有強制裝備插槽。
 * 設備插槽將基於類別。
 *
 * @arg Actors:arraynum
 * @text 角色 ID(s)
 * @type actor[]
 * @desc 選擇要影響的角色 ID。
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text 店鋪: 高級
 * @desc 使商店的庫存匯總更加容易。
 * 警告: 不允許使用特定於事件的價格。
 *
 * @arg Step1
 * @text Step 1: 物品ID
 *
 * @arg Step1Start:num
 * @text 範圍開始
 * @parent Step1
 * @type item
 * @desc 選擇要從哪個物品ID開始。
 * @default 1
 *
 * @arg Step1End:num
 * @text 範圍結束
 * @parent Step1
 * @type item
 * @desc 選擇要結束的物品ID。
 * @default 4
 *
 * @arg Step2
 * @text Step 2: 武器ID
 *
 * @arg Step2Start:num
 * @text 範圍開始
 * @parent Step2
 * @type weapon
 * @desc 選擇從哪個武器ID開始。
 * @default 1
 *
 * @arg Step2End:num
 * @text 範圍結束
 * @parent Step2
 * @type weapon
 * @desc 選擇要結束的武器ID。
 * @default 4
 *
 * @arg Step3
 * @text Step 3: 裝甲ID
 *
 * @arg Step3Start:num
 * @text 範圍開始
 * @parent Step3
 * @type armor
 * @desc 選擇要從哪個裝甲ID開始。
 * @default 1
 *
 * @arg Step3End:num
 * @text 範圍結束
 * @parent Step3
 * @type armor
 * @desc 選擇要結束的裝甲ID。
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: 只購買？
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc 只讓商店購買商品嗎？
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text 列入黑名單的類別
 * @parent Optional
 * @type string[]
 * @desc 商店中要列入黑名單的類別列表。
 * 如果為空，則不使用。 用<Category: x>標記類別
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text 白名單類別
 * @parent Optional
 * @type string[]
 * @desc 商店要列入白名單的類別列表。
 * 如果為空，則不使用。 用<Category: x>標記類別
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text 物品菜單設置
 * @type struct<ItemScene>
 * @desc 更改物品菜單場景設置。
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text 物品類別
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc 更改“物品/商店”菜單中顯示的類別。
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! 標籤
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc 更改NEW!方式。標籤適用於你的遊戲物品
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text 裝備菜單設置
 * @type struct<EquipScene>
 * @desc 調整有關設備菜單場景的設置。
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text 商店菜單設置
 * @type struct<ShopScene>
 * @desc 更改商店菜單場景設置。
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text 商店狀態窗口
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc 更改物品狀態窗口設置。
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 * @text 一般
 *
 * @param EnableLayout:eval
 * @text 使用更新的佈局
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc 使用此插件提供的更新的物品菜單佈局？
 * 這將覆蓋Core Engine窗口設置。
 * @default true
 *
 * @param LayoutStyle:str
 * @text 佈局樣式
 * @parent General
 * @type select
 * @option 上方幫助 Help, 左側輸入 Input
 * @value upper/left
 * @option 上方幫助 Help, 右側輸入 Input
 * @value upper/right
 * @option 下方幫助 Help, 左側輸入 Input
 * @value lower/left
 * @option 下方幫助 Help, 右側輸入 Input
 * @value lower/right
 * @desc 如果使用更新的佈局，則如何設置菜單場景佈局的樣式？
 * @default upper/left
 *
 * @param ListWindow
 * @text 清單視窗
 *
 * @param ListWindowCols:num
 * @text 列
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc 最大列數。
 * @default 1
 *
 * @param ItemQt
 * @text 物品數量
 *
 * @param MaxItems:num
 * @text 物品數量上限
 * @parent ItemQt
 * @desc 對於物品的默認最大數量。
 * @default 99
 *
 * @param MaxWeapons:num
 * @text 武器數量上限
 * @parent ItemQt
 * @desc 武器的默認最大數量。
 * @default 99
 *
 * @param MaxArmors:num
 * @text 裝甲數量上限
 * @parent ItemQt
 * @desc 裝甲的默認最大數量。
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text 數量格式
 * @parent ItemQt
 * @desc 如何顯示物品的數量。
 * %1-商品數量
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text 字體大小
 * @parent ItemQt
 * @desc 物品數量的默認字體大小。
 * @default 22
 *
 * @param ShopStatusWindow
 * @text 商店狀態窗口
 *
 * @param ShowShopStatus:eval
 * @text 在物品菜單中顯示？
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc 在“物品”菜單中顯示“商店狀態”窗口？
 * 如果啟用了更新版式，則啟用此功能。
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text 調整列表窗口？
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc 如果使用“商店狀態”窗口，則在“物品”菜單中自動調整“物品列表”窗口？
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text 背景類型
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc 選擇此窗口的背景類型。
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc 用於在“物品”菜單中確定此“狀態”窗口的尺寸的代碼。
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text 按鈕輔助窗口
 *
 * @param buttonAssistCategory:str
 * @text 開關類別
 * @parent ButtonAssist
 * @desc 用於開關類別的按鈕輔助文本。
 * 適用於VisuStella MZ的Core Engine的按鈕輔助窗口。
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text 列表
 * 
 * @param List:arraystruct
 * @text 類別清單
 * @parent MainList
 * @type struct<Category>[]
 * @desc 在“物品/商店”菜單中顯示的物品類別列表。
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text 類別樣式
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc 你希望如何在“類別”窗口中繪製類別條目？
 * @default icon
 *
 * @param TextAlign:str
 * @text 文字對齊
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 確定你希望文本如何對齊。
 * @default center
 *
 * @param Vocabulary
 * @text 詞彙
 *
 * @param HiddenItemA:str
 * @text 隱藏的物品A
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text 隱藏的物品B
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Unique Items
 *
 * @param Consumable:str
 * @text 消耗品
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text 不消耗品
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text 永遠可用
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Usable
 *
 * @param BattleUsable:str
 * @text 戰鬥可用
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Battle
 *
 * @param FieldUsable:str
 * @text 現場可用
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Field
 *
 * @param NeverUsable:str
 * @text 永不可用
 * @parent Vocabulary
 * @desc 在“物品”菜單中如何命名此類別。
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text 類型
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text 圖示
 * @desc 用於此類別的圖標。
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text 可見性開關
 * @type switch
 * @desc 必須打開此開關才能顯示類別。
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text 使用NEW!標籤？
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc 使用NEW!標籤與否？
 * @default true
 *
 * @param Icon:num
 * @text 圖示
 * @desc 用於表示NEW!的圖標文本索引。
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text 文本
 * @desc 寫在NEW!標籤的文字。
 * @default NEW!
 *
 * @param FontColor:str
 * @text 字體顏色
 * @parent Text:str
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為“窗口外觀”中的文本顏色。
 * @default 17
 *
 * @param FontFace:str
 * @text 字型
 * @parent Text:str
 * @desc NEW!標籤的字型
 * @default Verdana
 *
 * @param FontSize:str
 * @text 字體大小
 * @parent Text:str
 * @desc NEW!標籤的字體大小
 * @default 16
 *
 * @param FadeLimit:num
 * @text 淡入淡出極限
 * @desc 反轉之前的不透明上限是多少？
 * @default 360
 *
 * @param FadeSpeed:num
 * @text 漸隱速度
 * @desc NEW!標籤的漸隱速度
 * @default 4
 *
 * @param OffsetX:num
 * @text 偏移 X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text 偏移 Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 * @text 一般
 *
 * @param EnableLayout:eval
 * @text 使用更新的佈局
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc 使用此插件提供的更新的設備佈局？
 * 這將覆蓋Core Engine窗口設置。
 * @default true
 *
 * @param LayoutStyle:str
 * @text 佈局樣式
 * @parent General
 * @type select
 * @option 上幫助，左輸入 Upper Help, Left Input
 * @value upper/left
 * @option 上幫助，右輸入 Upper Help, Right Input
 * @value upper/right
 * @option 下幫助，左輸入 Lower Help, Left Input
 * @value lower/left
 * @option 下幫助，右輸入 Lower Help, Right Input
 * @value lower/right
 * @desc 如果使用更新的佈局，則如何設置菜單場景佈局的樣式？
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text 參數字體大小
 * @parent EnableLayout:eval
 * @desc 用於參數值的字體大小。
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text 顯示菜單肖像？
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc 如果安裝了Main Menu Core，則在狀態窗口中顯示菜單肖像而不是角色的臉？
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: 人像上 Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: 臉部上 Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: 參數下限 Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text 狀態窗口寬度
 * @parent General
 * @desc 如果使用非更新的設備菜單佈局，則狀態窗口的通常寬度。
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text 顯示後方矩形？
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc 顯示較深的矩形以更好地顯示信息？
 * @default true
 *
 * @param BackRectColor:str
 * @text 後矩形顏色
 * @parent DrawBackRect:eval
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為“窗口外觀”中的文本顏色。
 * @default 19
 *
 * @param Command
 * @text 指令視窗
 *
 * @param CmdStyle:str
 * @text 類型
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc 你希望如何在“命令窗口”中繪製命令？
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text 文本對齊
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text 裝備圖標
 * @parent Command
 * @desc 裝備命令所使用的圖標。
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text 添加優化(Optimize)命令？
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc 將“優化”命令添加到命令窗口？
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text 優化(Optimize)圖標
 * @parent CommandAddOptimize:eval
 * @desc 用於“優化”命令的圖標。
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text 添加清除命令？
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc 將“清除”命令添加到命令窗口？
 * @default true
 *
 * @param CmdIconClear:num
 * @text 清除圖示
 * @parent CommandAddClear:eval
 * @desc 用於“清除”命令的圖標。
 * @default 135
 *
 * @param RemoveEquip
 * @text 刪除裝備
 *
 * @param RemoveEquipIcon:num
 * @text 圖示
 * @parent RemoveEquip
 * @desc 用於設備拆卸的圖標。
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text 文本
 * @parent RemoveEquip
 * @desc 用於設備拆卸的文字。
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text 使用SHIFT快捷方式？
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc 將“ Shift”按鈕添加為刪除項的快捷鍵？
 * @default true

 * @param Rulings
 * @text 判定
 *
 * @param EquipAdjustHpMp:eval
 * @text 裝備調整 HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc 更換具有MaxHP / MaxMP值的設備後，調整HP / MP差異。
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text 不可移動類型
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc 插入設備類型的ID，這些ID必須始終配備有物品，並且不能為空。
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text 非優化類型
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc 插入設備類型的ID，在優化設備時將忽略這些ID。
 * @default []
 *
 * @param ButtonAssist
 * @text 按鈕輔助窗口
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: 消除
 * @parent ButtonAssist
 * @desc 用於SHIFT刪除快捷方式的按鈕輔助文本。
 * 適用於VisuStella MZ的Core Engine的按鈕輔助窗口。
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 * @text 一般
 *
 * @param EnableLayout:eval
 * @text 使用更新的佈局
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc 使用此插件提供的更新的商店佈局？
 * 這將覆蓋Core Engine窗口設置。
 * @default true
 *
 * @param LayoutStyle:str
 * @text 佈局樣式
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 * @text 開關
 *
 * @param SwitchBuy:num
 * @text 開關: 購買
 * @parent Switches
 * @type switch
 * @desc 在“商店場景”中購買物品會將此開關打開。
 * 每當“商店場景”打開時，開關都將開關為OFF。
 * @default 0
 *
 * @param SwitchSell:num
 * @text 開關: 賣出
 * @parent Switches
 * @type switch
 * @desc 在“商店場景”中出售物品會將此開關打開。
  *每當“商店場景”打開時，開關就會恢復為OFF。
 * @default 0
 *
 * @param Command
 * @text 指令視窗
 *
 * @param CmdHideDisabled:eval
 * @text 隱藏不可用？
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc 隱藏所有不可用的命令，例如將商店設置為“僅購買”？
 * @default true
 *
 * @param CmdStyle:str
 * @text 模式
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc 你希望如何在“命令窗口”中繪製命令？
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text 文本對齊
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 命令窗口的文本對齊方式。
 * @default center
 *
 * @param CmdIconBuy:num
 * @text 購買圖標
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text 賣出圖標
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text 取消圖示
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text 重命名“取消”
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 * @text 價格
 *
 * @param SellPriceRate:num
 * @text 賣出價格率
 * @parent Prices
 * @desc 默認賣出價格費率。
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: 買價 Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: 賣價 Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text 按鈕輔助窗口
 *
 * @param buttonAssistSmallIncrement:str
 * @text 小增量
 * @parent ButtonAssist
 * @desc 用於更改購買/出售金額的文字。
 * 適用於VisuStella MZ的Core Engine的按鈕輔助窗口。
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text 大增量
 * @parent ButtonAssist
 * @desc 用於更改購買/出售金額的文字。
 * 適用於VisuStella MZ的Core Engine的按鈕輔助窗口。
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 * @text 一般
 *
 * @param Width:num
 * @text 窗寬
 * @parent General
 * @desc 狀態窗口的通常寬度。
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text 參數字體大小
 * @parent General
 * @desc 用於參數更改的字體大小。
 * @default 22
 *
 * @param Translucent:num
 * @text 半透明的不透明度
 * @parent General
 * @desc 用於半透明窗口對象的不透明度設置。
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text 顯示後方矩形？
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc 顯示較深的矩形以更好地顯示信息？
 * @default true
 *
 * @param BackRectColor:str
 * @text 後矩形顏色
 * @parent DrawBackRect:eval
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為“窗口外觀”中的文本顏色。
 * @default 19
 *
 * @param EquipData
 * @text 裝備數據
 *
 * @param AlreadyEquipMarker:str
 * @text 已配備
 * @parent EquipData
 * @desc 用於顯示角色的標記無法裝備物品。
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text 無法裝備
 * @parent EquipData
 * @desc 用於顯示角色的標記無法裝備物品。
 * @default -
 *
 * @param NoChangeMarker:str
 * @text 沒有變化
 * @parent EquipData
 * @desc 用於顯示未發生更改的標記。
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: 繪製裝備數據 Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc 用於為“商店狀態”窗口繪製設備數據的代碼。
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text 物品數據
 *
 * @param ItemGeneral
 * @text 普通物品
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text 最大狀態/增益圖標
 * @parent ItemGeneral
 * @desc 可為“添加/刪除狀態/增益”顯示的最大圖標數。
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text 乘數標準
 * @parent ItemGeneral
 * @desc 常數標準，用於在計算傷害係數時濾除隨機值。
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: 繪製物品數據 Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc 用於為“商店狀態”窗口繪製物料數據的代碼。
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @text 詞彙
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text 消耗品
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc 用於此數據輸入的詞彙表。
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc 用於此數據輸入的詞彙表。
 * @default ✘
 *
 * @param Occasions
 * @text 場合
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text 總是
 * @parent Occasions
 * @desc 用於此數據輸入的詞彙表。
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text 戰鬥畫面
 * @parent Occasions
 * @desc 用於此數據輸入的詞彙表。
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text 選單畫面
 * @parent Occasions
 * @desc 用於此數據輸入的詞彙表。
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text 從不
 * @parent Occasions
 * @desc 用於此數據輸入的詞彙表。
 * @default -
 *
 * @param Scope
 * @text 範圍
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default No Target
 *
 * @param Scope1:str
 * @text 一個敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text 所有敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default All Foes
 *
 * @param Scope3:str
 * @text 一個隨機敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 兩個隨機敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 三個隨機敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 四個隨機敵人
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 一個隊友
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text 所有隊友
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 一個隊友 (死亡)
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text 所有隊友 (死亡)
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text 使用者
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default User
 *
 * @param Scope12:str
 * @text 一個隊友 (DoA)
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Any Ally
 *
 * @param Scope13:str
 * @text 所有隊友 (DoA)
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default All Allies
 *
 * @param Scope14:str
 * @text 敵人與隊友
 * @parent Scope
 * @desc 用於此數據輸入的詞彙表。
 * @default Everybody
 *
 * @param BattleCore
 * @text 戰鬥核心支持
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text 隨機任何x
 * @parent BattleCore
 * @desc 註釋標籤<Target: x Random Any>所用的詞彙。
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text 隨機敵人x
 * @parent BattleCore
 * @desc 註釋標籤<Target: x Random Enemies>所用的詞彙。
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text 隨機隊友x
 * @parent BattleCore
 * @desc 註釋標籤<Target: x Random Allies>所用的詞彙。
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text 除用戶外的所有隊友
 * @parent BattleCore
 * @desc 註釋標籤<Target: All Allies But User>所用的詞彙。
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text 速度
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 速度
 * @parent LabelSpeed:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text 成功率
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text 重複
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Hits
 *
 * @param LabelHitType:str
 * @text 命中類型
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Type
 *
 * @param HitType0:str
 * @text 一定命中
 * @parent LabelHitType:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Neutral
 *
 * @param HitType1:str
 * @text 自然 (Physical)
 * @parent LabelHitType:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Physical
 *
 * @param HitType2:str
 * @text 神奇 (Magical)
 * @parent LabelHitType:str
 * @desc 用於此數據輸入的詞彙表。
 * @default Magical
 *
 * @param LabelElement:str
 * @text 元素
 * @parent Vocabulary
 * @desc 用於此數據輸入的詞彙表。
 * @default Element
 *
 * @param ElementWeapon:str
 * @text 基於武器
 * @parent LabelElement:str
 * @desc 用於此數據輸入的詞彙表。
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text 無元素
 * @parent LabelElement:str
 * @desc 用於此數據輸入的詞彙表。
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text 傷害類型
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP 傷害
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP 傷害
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP 恢復
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP 恢復
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP 外流 (Drain)
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP 外流 (Drain)
 * @parent DamageType
 * @desc 用於此數據輸入的詞彙表。 
 * 如果安裝了Visu_1_BattleCore，則優先級為其“傷害樣式”設置。
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @text 特效
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text 恢復 HP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text 恢復 MP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text 恢復 TP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text 自身獲得 TP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text 傷害 HP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text 傷害 MP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text 傷害 TP
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text 添加狀態/增強
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default Applies
 *
 * @param LabelRemove:str
 * @text 移除狀態/增強
 * @parent Effects
 * @desc 用於此數據輸入的詞彙表。
 * @default Removes
 *
 */
//=============================================================================

const _0x52b8=['uiHelpPosition','setHelpWindowItem','price','commandWindowRect','setItem','ScopeRandomAllies','visible','clear','processCursorMoveModernControls','numberWindowRectItemsEquipsCore','isClearEquipOk','_doubleTouch','SellPriceRate','resetShopSwitches','itemWindowRect','EFFECT_ADD_DEBUFF','DrawParamJS','playCursorSound','NonOptimizeETypes','EnableLayout','isClearCommandAdded','mainAreaTop','atypeId','drawItemEffectsMpDamage','LabelRemove','Window_ItemList_updateHelp','getNextAvailableEtypeId','+%1%','FadeLimit','addOptimizeCommand','commandWindowRectItemsEquipsCore','isEquipItem','ElementWeapon','BuyPriceJS','equip2','equipSlots','isCommandEnabled','getItemDamageElementLabel','paramPlusItemsEquipsCoreCustomJS','drawActorParamDifference','values','rateMP','isBottomHelpMode','clearEquipments','Game_Actor_discardEquip','ELEMENT','allowCreateStatusWindow','getItemEffectsHpDamageText','show','drawNewLabelText','\x5cb%1\x5cb','smallParamFontSize','getItemsEquipsCoreBackColor1','loadPicture','paintOpacity','STR','elements','_dummyWindow','isSellCommandEnabled','auto','getItemSpeedText','(+%1)','FontFace','itemHasEquipLimit','gaugeBackColor','VisuMZ_1_BattleCore','isHovered','categoryWindowRectItemsEquipsCore','cancel','_itemData','addInnerChild','calcWindowHeight','bitmap','NotConsumable','_newLabelSprites','getItemDamageAmountLabelBattleCore','canConsumeItem','equipTypes','getItemEffectsAddedStatesBuffsLabel','updatedLayoutStyle','addWindow','adjustItemWidthByStatus','possession','weapon-%1','format','CmdIconSell','ActorResetEquipSlots','return\x200','1nKXNkI','indexOf','MaxWeapons','selfTP','_list','_actor','CoreEngine','Settings','_categoryNameWindow','boxWidth','commandBuyItemsEquipsCore','processDrawIcon','ARRAYSTR','577730ynnLjv','loadFaceImages','_buyWindow','successRate','688567enRzfn','Translucent','postCreateSellWindowItemsEquipsCore','\x5cI[%1]','ListWindowCols','Step1Start','Scene_Item_categoryWindowRect','param','Nonconsumable','_goodsCount','drawItemEquipType','Scene_Shop_doSell','AllArmors','loadSystem','isClicked','drawItemNumber','EFFECT_ADD_STATE','LayoutStyle','Window_ItemList_colSpacing','getItemsEquipsCoreBackColor2','getMenuImage','EFFECT_REMOVE_STATE','createItemWindow','getTextColor','Window_Selectable_refresh','%1%','getItemHitTypeText','itemPadding','hpRate','cursorPageup','Scene_Equip_onSlotCancel','BackRectColor','commandStyle','BatchShop','down','Parse_Notetags_EquipSlots','ADDED\x20EFFECTS','Scene_Shop_onSellOk','RegularItems','Scene_Equip_statusWindowRect','Window_ShopCommand_initialize','maxItems','Game_Actor_tradeItemWithParty','Speed1','Game_Actor_paramPlus','processTouchModernControls','_calculatingJSParameters','prepareNewEquipSlotsOnLoad','Game_Party_initialize','LabelConsume','toUpperCase','ParseArmorNotetags','Window_Selectable_setHelpWindowItem','_shopStatusMenuMode','setMp','postCreateItemWindowModernControls','LabelSuccessRate','ParseWeaponNotetags','equips','create','cursorRight','NUM','currencyUnit','getItemEffectsMpDamageText','CommandAddClear','CmdHideDisabled','buyWindowRectItemsEquipsCore','\x5cI[%1]%2','onTouchCancel','constructor','drawItemScope','commandEquip','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','REMOVED\x20EFFECTS','Game_Party_gainItem','categories','buttonAssistOffset3','blt','innerWidth','dataId','getItemEffectsHpRecoveryLabel','getMatchingInitEquip','callUpdateHelp','getItemEffectsHpDamageLabel','addStateBuffChanges','forceChangeEquipSlots','drawUpdatedParamValueDiff','isTriggered','drawItemDamageAmount','EquipScene','floor','ItemMenuStatusBgType','isEquipped','flatMP','speed','mainFontFace','MultiplierStandard','setBackgroundType','pageup','SCOPE','width','isHandled','Scene_Shop_statusWindowRect','FontColor','addCommand','drawItemCustomEntries','max','Scene_Shop_createCategoryWindow','windowPadding','getItemEffectsHpRecoveryText','goldWindowRectItemsEquipsCore','map','paramJS','Scene_Item_createItemWindow','drawItemEffectsAddedStatesBuffs','ParseAllNotetags','SpeedNeg2000','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','REPEAT','isOpenAndActive','DrawFaceJS','shift','Window_Selectable_update','contents','ItemQuantityFmt','geUpdatedLayoutStatusWidth','isWeapon','Game_Actor_forceChangeEquip','popScene','isEquipCommandEnabled','getItemDamageElementText','Slots','LabelDamageHP','Scene_ItemBase_activateItemWindow','Speed1000','LabelDamageMP','DAMAGE\x20MULTIPLIER','Scene_Equip_createSlotWindow','left','HiddenItemA','removeBuff','getItemDamageAmountLabelOriginal','splice','buyWindowRect','SUCCESS\x20RATE','Step3End','1ZWxsFJ','removeState','DamageType%1','setValue','buttonAssistSlotWindowShift','parse','elementId','isArmor','TP\x20DAMAGE','postCreateItemsEquipsCore','_forcedSlots','Scene_Shop_onCategoryCancel','nonRemovableEtypes','prepareRefreshItemsEquipsCoreLayout','#%1','versionId','reloadMapIfUpdated','newLabelEnabled','SpeedNeg999','ShiftShortcutKey','armor','createBitmap','bind','onTouchSelect','addState','drawTextEx','drawItemOccasion','LUK','Scene_Shop_sellWindowRect','drawRemoveItem','Step2End','FadeSpeed','isDrawItemNumber','drawItemCustomEntryLine','index','_tempActorA','fillRect','commandNameWindowDrawBackground','categoryNameWindowDrawText','getItemEffectsRemovedStatesBuffsLabel','filter','canUse','note','Scene_Shop_commandBuy','processCursorHomeEndTrigger','commandNameWindowCenter','iconText','paramchangeTextColor','buttonAssistItemListRequirement','onMenuImageLoad','StatusWindow','OffsetY','Scene_Shop_prepare','MDF','mainAreaBottom','_item','nonOptimizeEtypes','commandName','processCursorSpecialCheckModernControls','icon','buttonAssistText2','NeverUsable','buttonAssistRemove','CmdIconCancel','getItemEffectsMpRecoveryText','ItemsEquipsCore','hideNewLabelSprites','refreshActorEquipSlotsIfUpdated','drawIcon','itemAt','_equips','Scene_Item_createCategoryWindow','_commandNameWindow','getItemEffectsMpRecoveryLabel','Type','drawItemDamage','drawItemEffectsHpRecovery','CmdIconClear','isGoodShown','drawParamText','drawItemQuantity','_slotWindow','Scene_Shop_sellingPrice','VisuMZ_0_CoreEngine','iconIndex','onCategoryCancelItemsEquipsCore','smoothSelect','occasion','textSizeEx','ElementNone','characterName','etypeId','allowShiftScrolling','postCreateCategoryWindowItemsEquipsCore','Scene_Boot_onDatabaseLoaded','_newLabelOpacity','getItemEffectsTpDamageText','right','0000','Whitelist','fontSizeRatio','discardEquip','onSlotOk','addBuyCommand','onCategoryCancel','RegExp','armor-%1','resetFontSettings','drawItemName','EVAL','ScopeRandomAny','AlwaysUsable','drawItemCost','push','drawItemEffectsTpDamage','checkShiftRemoveShortcut','optimize','_sellWindow','forceResetEquipSlots','mpRate','ARRAYSTRUCT','isShiftShortcutKeyForRemove','canEquip','keyItem','Window_ItemList_drawItem','LabelApply','_scene','IncludeShopItem','1reabyW','Scene_Shop_commandWindowRect','paramPlus','buy','defaultItemMax','_purchaseOnly','match','drawItemEffectsSelfTpGain','addClearCommand','Scene_Equip_commandEquip','Width','hitType','isShiftRemoveShortcutEnabled','initNewItemsList','item','Game_BattlerBase_meetsItemConditions','ConvertParams','isOptimizeCommandAdded','ceil','FUNC','setTempActor','ShopMenuStatusStandard','1UOYvNQ','playOkSound','Actors','onTouchSelectModern','196747aDNJqw','593961aqJVRl','damageColor','Window_ShopSell_isEnabled','process_VisuMZ_ItemsEquipsCore_Notetags','sellingPrice','commandSellItemsEquipsCore','isSoleWeaponType','cursorLeft','fill','AllWeapons','Scene_Shop_categoryWindowRect','addSellCommand','TP\x20RECOVERY','ItemSceneAdjustItemList','_categoryWindow','Scene_Shop_goldWindowRect','Icon','includes','repeats','shouldCommandWindowExist','isRepeated','ItemScene','setupItemDamageTempActors','isOptimizeEquipOk','Window_ItemList_maxCols','textColor','removeStateBuffChanges','onBuyCancel','slotWindowRect','makeItemData','hideDisabledCommands','Game_BattlerBase_param','isClearCommandEnabled','code','CONSUMABLE','process_VisuMZ_ItemsEquipsCore_RegExp','updateHelp','_buyWindowLastIndex','isHoverEnabled','version','RemoveEquipIcon','EquipParams','statusWindowRect','members','Scene_Load_reloadMapIfUpdated','resetTextColor','activateItemWindow','commandSell','categoryNameWindowDrawBackground','getItemEffectsRemovedStatesBuffsText','getItemScopeText','LabelSpeed','_tempActorB','helpAreaHeight','Scene_Shop_create','iconWidth','trim','height','buttonAssistKey3','_itemWindow','drawing','categoryItemTypes','categoryWindowRect','colSpacing','getItemHitTypeLabel','MaxIcons','removeDebuff','Window_EquipStatus_refresh','getItemEffectsAddedStatesBuffsText','_slotId','deactivate','sellPriceRate','2694845MAmWsf','FieldUsable','isOptimizeCommandEnabled','description','Scene_Shop_doBuy','drawItemEffectsRemovedStatesBuffs','value2','weaponTypes','helpAreaTop','mainAreaHeight','prototype','adjustHiddenShownGoods','equip','prepareItemCustomData','activate','allowCommandWindowCursorUp','isUseItemsEquipsCoreUpdatedLayout','drawNewLabelIcon','Scope%1','isPlaytest','ScopeRandomEnemies','drawUpdatedParamName','limitedPageUpDownSceneCheck','SPEED','Scene_Equip_slotWindowRect','MANUAL','isCancelled','Scene_Shop_buyWindowRect','rateHP','CmdStyle','New','_newLabelOpacityUpperLimit','createNewLabelSprite','Categories','value','contentsBack','isKeyItem','drawItemStyleIcon','onSellCancel','1YVBxqa','itemTextAlign','currentExt','modifiedBuyPriceItemsEquipsCore','setObject','_category','commandStyleCheck','getItemColor','buttonAssistKey1','Window_EquipItem_includes','EFFECT_RECOVER_MP','A%1','getItemDamageAmountTextOriginal','buttonAssistSmallIncrement','_resetFontSize','drawItemStyleIconText','type','getInputMultiButtonStrings','EFFECT_REMOVE_BUFF','addChild','getItemEffectsSelfTpGainText','Scene_Equip_onSlotOk','isItem','canShiftRemoveEquipment','buttonAssistCategory','refresh','getItemSpeedLabel','ARRAYFUNC','83599mABykw','isEquipChangeOk','BorderRegExp','drawItemSpeed','drawItemConsumable','changeEquipById','DrawBackRect','formula','CmdCancelRename','commandBuy','MaxArmors','processShiftRemoveShortcut','DrawIcons','createSlotWindow','Scene_Shop_activateSellWindow','value1','Window_ItemCategory_initialize','uiInputPosition','process_VisuMZ_ItemsEquipsCore_EquipSlots','helpWindowRectItemsEquipsCore','KeyItems','Scene_Item_itemWindowRect','cursorPagedown','drawItem','Parse_Notetags_Category','getItemEffectsTpRecoveryText','SwitchSell','length','drawItemSuccessRate','getItemSuccessRateLabel','ARRAYJSON','loadCharacter','hide','drawCurrencyValue','nextActor','OCCASION','Parse_Notetags_Prices','fontSize','createCategoryWindow','_bypassNewLabel','pagedown','doSell','_numberWindow','getItemDamageAmountText','itemWindowRectItemsEquipsCore','setNewItem','LabelHitType','playBuzzerSound','Parse_Notetags_ParamJS','NoChangeMarker','5113UADzYS','QUANTITY','replace','forceChangeEquip','ShopScene','equipAdjustHpMp','onActorChange','LabelElement','changeTextColor','_commandWindow','makeCommandList','buffIconIndex','drawItemEffectsTpRecovery','buttonAssistText1','AllItems','setStatusWindow','update','createSellWindow','text','getItemSuccessRateText','+%1','ItemQuantityFontSize','changeEquip','sellWindowRectItemsEquipsCore','maxVisibleItems','iconHeight','Param','powerUpColor','categoryStyle','NonRemoveETypes','onDatabaseLoaded','CommandAddOptimize','drawItemRepeats','getItemRepeatsText','powerDownColor','helpWindowRect','refreshCursor','doBuy','MenuPortraits','cursorDown','ItemMenuStatusRect','currentSymbol','drawParamsItemsEquipsCore','initialize','atk','drawText','drawEquipData','previousActor','registerCommand','drawParamName','_buttonAssistWindow','Scene_Equip_itemWindowRect','Window_ShopBuy_refresh','drawItemDarkRect','addEquipCommand','isCursorMovable','isUseModernControls','call','Scene_Shop_createSellWindow','commandNameWindowDrawText','Scene_Shop_commandSell','numItems','updateCommandNameWindow','Window_EquipItem_isEnabled','clamp','onTouchSelectModernControls','CmdIconEquip','updateNewLabelOpacity','DrawEquipData','_data','lineHeight','createCommandNameWindow','uiMenuStyle','sellWindowRect','DEF','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','isEnabled','Parse_Notetags_EnableJS','VisuMZ_1_MainMenuCore','Scene_Shop_onBuyCancel','_newLabelOpacityChange','changeBuff','buttonAssistLargeIncrement','processCursorMove','USER\x20TP\x20GAIN','Window_EquipCommand_initialize','categoryStyleCheck','maxItemAmount','getItemEffectsTpDamageLabel','getItemOccasionText','Step2Start','updateCategoryNameWindow','parameters','ParseClassNotetags','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','sell','CannotEquipMarker','flatHP','IconSet','bestEquipItem','getItemEffectsMpDamageLabel','makeDeepCopy','checkItemConditionsSwitchNotetags','updateMoneyAmount','mmp','Scene_Equip_commandWindowRect','buttonAssistText3','addItemCategory','setShopStatusWindowMode','SpeedNeg1999','systemColor','getItemEffectsSelfTpGainLabel','2AghMmv','maxCols','categoryNameWindowCenter','Scene_Item_create','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setHandler','normalColor','placeItemNewLabel','wtypeId','actorParams','equipSlotIndex','isEquipCommandAdded','Step1End','currentEquippedItem','isMainMenuCoreMenuImageOptionAvailable','EquipAdjustHpMp','Consumable','Scene_Shop_onSellCancel','opacity','Step3Start','isDualWield','categoryList','ParseItemNotetags','List','getColor','clearNewItem','drawItemEffectsMpRecovery','drawItemDamageElement','%1-%2','HP\x20DAMAGE','active','OffsetX','gainTP','Game_Actor_changeEquip','BattleUsable','addCancelCommand','numberWindowRect','weapon','isSoleArmorType','statusWindowRectItemsEquipsCore','ConvertNumberToString','prepareNextScene','tradeItemWithParty','HP\x20RECOVERY','move','setHp','?????','select','Scene_Shop_numberWindowRect','round','prepare','ExtDisplayedParams','ARRAYNUM','actor','Parse_Notetags_Batch','log','drawPossession','itypeId','isSceneShop','isPressed','_newItemsList','meetsItemConditionsNotetags','Scene_Equip_onActorChange','Window_ShopBuy_price','onCategoryOk','isShowNew','revertGlobalNamespaceVariables','damage','optimizeEquipments','armorTypes','name','setCategory','DrawItemData','drawItemKeyData','convertInitEquipsToItems','Scene_Equip_create','_customItemInfo','getItemQuantityText','deselect','createStatusWindow','MP\x20RECOVERY','getItemEffectsTpRecoveryLabel','Style','isNewItem','onSlotCancel','goldWindowRect','split','refreshItemsEquipsCoreNoMenuImage','processHandling','LabelRepeats','LabelDamageTP','isRightInputMode','hitIndex','drawItemData','_statusWindow','ShowShopStatus','paramValueByName','RemoveEquipText','isUseParamNamesWithIcons','releaseUnequippableItems','_tempActor','CmdTextAlign','getItemDamageAmountLabel','itemLineRect','isBuyCommandEnabled','changePaintOpacity','statusWidth','CmdIconBuy','itemEnableJS','_resetFontColor','isOpen','meetsItemConditions','_shopStatusMenuAlly','initNewLabelSprites','exit','gainItem','category','postCreateSlotWindowItemsEquipsCore','_handlers','item-%1','textWidth','meetsItemConditionsJS','consumable','HiddenItemB','addLoadListener','MP\x20DAMAGE','clearNewLabelFromItem','QoL','SwitchBuy','LabelRecoverHP','tpGain','getItemRepeatsLabel','Window_ItemCategory_setItemWindow','TextAlign','center','getItemConsumableText','itemDataFontSize','mainCommandWidth','buttonAssistKey2','drawItemActorMenuImage','onBuyCancelItemsEquipsCore','fontFace','optKeyItemsNumber','getInputButtonString','determineBaseSellingPrice','AGI'];const _0x4e89=function(_0xe7f2aa,_0x345965){_0xe7f2aa=_0xe7f2aa-0x122;let _0x52b8d8=_0x52b8[_0xe7f2aa];return _0x52b8d8;};const _0x561d2e=_0x4e89;(function(_0x24f22a,_0x2b3232){const _0x8e750d=_0x4e89;while(!![]){try{const _0x261f54=-parseInt(_0x8e750d(0x441))*parseInt(_0x8e750d(0x187))+-parseInt(_0x8e750d(0x1f6))*parseInt(_0x8e750d(0x3ab))+-parseInt(_0x8e750d(0x2b4))*parseInt(_0x8e750d(0x186))+parseInt(_0x8e750d(0x182))*-parseInt(_0x8e750d(0x3af))+parseInt(_0x8e750d(0x212))*-parseInt(_0x8e750d(0x16c))+-parseInt(_0x8e750d(0x244))*parseInt(_0x8e750d(0x39e))+parseInt(_0x8e750d(0x1cf));if(_0x261f54===_0x2b3232)break;else _0x24f22a['push'](_0x24f22a['shift']());}catch(_0x4bbfbd){_0x24f22a['push'](_0x24f22a['shift']());}}}(_0x52b8,0x5607d));var label=_0x561d2e(0x12d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x561d2e(0x469)](function(_0x2d6406){const _0x324a50=_0x561d2e;return _0x2d6406['status']&&_0x2d6406[_0x324a50(0x1d2)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x561d2e(0x3a5)]=VisuMZ[label][_0x561d2e(0x3a5)]||{},VisuMZ[_0x561d2e(0x17c)]=function(_0x5b1f23,_0x1eb816){const _0x4d4ab5=_0x561d2e;for(const _0x4b3910 in _0x1eb816){if(_0x4b3910[_0x4d4ab5(0x172)](/(.*):(.*)/i)){const _0x75cb97=String(RegExp['$1']),_0x234fae=String(RegExp['$2'])[_0x4d4ab5(0x3e1)]()[_0x4d4ab5(0x1bf)]();let _0xfdb5aa,_0x43709c,_0x261288;switch(_0x234fae){case _0x4d4ab5(0x3ec):_0xfdb5aa=_0x1eb816[_0x4b3910]!==''?Number(_0x1eb816[_0x4b3910]):0x0;break;case _0x4d4ab5(0x2e8):_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON['parse'](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x29afcd=>Number(_0x29afcd));break;case _0x4d4ab5(0x159):_0xfdb5aa=_0x1eb816[_0x4b3910]!==''?eval(_0x1eb816[_0x4b3910]):null;break;case'ARRAYEVAL':_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x26acd1=>eval(_0x26acd1));break;case'JSON':_0xfdb5aa=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):'';break;case _0x4d4ab5(0x230):_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON['parse'](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x73f112=>JSON[_0x4d4ab5(0x446)](_0x73f112));break;case _0x4d4ab5(0x17f):_0xfdb5aa=_0x1eb816[_0x4b3910]!==''?new Function(JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910])):new Function(_0x4d4ab5(0x39d));break;case _0x4d4ab5(0x211):_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x5069fd=>new Function(JSON[_0x4d4ab5(0x446)](_0x5069fd)));break;case _0x4d4ab5(0x37d):_0xfdb5aa=_0x1eb816[_0x4b3910]!==''?String(_0x1eb816[_0x4b3910]):'';break;case _0x4d4ab5(0x3aa):_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x3f224a=>String(_0x3f224a));break;case'STRUCT':_0x261288=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):{},_0x5b1f23[_0x75cb97]={},VisuMZ[_0x4d4ab5(0x17c)](_0x5b1f23[_0x75cb97],_0x261288);continue;case _0x4d4ab5(0x164):_0x43709c=_0x1eb816[_0x4b3910]!==''?JSON[_0x4d4ab5(0x446)](_0x1eb816[_0x4b3910]):[],_0xfdb5aa=_0x43709c[_0x4d4ab5(0x41e)](_0x20ccc6=>VisuMZ['ConvertParams']({},JSON[_0x4d4ab5(0x446)](_0x20ccc6)));break;default:continue;}_0x5b1f23[_0x75cb97]=_0xfdb5aa;}}return _0x5b1f23;},(_0x226abe=>{const _0x2ab451=_0x561d2e,_0x3566dc=_0x226abe[_0x2ab451(0x2fa)];for(const _0x5c446c of dependencies){if(!Imported[_0x5c446c]){alert(_0x2ab451(0x3f7)['format'](_0x3566dc,_0x5c446c)),SceneManager[_0x2ab451(0x326)]();break;}}const _0xc6d9c5=_0x226abe[_0x2ab451(0x1d2)];if(_0xc6d9c5['match'](/\[Version[ ](.*?)\]/i)){const _0x15347c=Number(RegExp['$1']);_0x15347c!==VisuMZ[label][_0x2ab451(0x1ae)]&&(alert(_0x2ab451(0x424)[_0x2ab451(0x39a)](_0x3566dc,_0x15347c)),SceneManager[_0x2ab451(0x326)]());}if(_0xc6d9c5[_0x2ab451(0x172)](/\[Tier[ ](\d+)\]/i)){const _0x1b2388=Number(RegExp['$1']);_0x1b2388<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2ab451(0x39a)](_0x3566dc,_0x1b2388,tier)),SceneManager[_0x2ab451(0x326)]()):tier=Math[_0x2ab451(0x419)](_0x1b2388,tier);}VisuMZ[_0x2ab451(0x17c)](VisuMZ[label][_0x2ab451(0x3a5)],_0x226abe[_0x2ab451(0x2a0)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'ActorChangeEquipSlots',_0x3c7b44=>{const _0x2363a5=_0x561d2e;VisuMZ[_0x2363a5(0x17c)](_0x3c7b44,_0x3c7b44);const _0x58e018=_0x3c7b44[_0x2363a5(0x184)][_0x2363a5(0x41e)](_0x1af603=>$gameActors[_0x2363a5(0x2e9)](_0x1af603)),_0x419e39=_0x3c7b44[_0x2363a5(0x432)][_0x2363a5(0x41e)](_0x57b8b8=>$dataSystem['equipTypes'][_0x2363a5(0x39f)](_0x57b8b8[_0x2363a5(0x1bf)]()));for(const _0x456fb7 of _0x58e018){if(!_0x456fb7)continue;_0x456fb7[_0x2363a5(0x404)](_0x419e39);}}),PluginManager[_0x561d2e(0x274)](pluginData[_0x561d2e(0x2fa)],_0x561d2e(0x39c),_0x497b26=>{const _0x22770c=_0x561d2e;VisuMZ[_0x22770c(0x17c)](_0x497b26,_0x497b26);const _0x1b2373=_0x497b26[_0x22770c(0x184)][_0x22770c(0x41e)](_0x27eb43=>$gameActors[_0x22770c(0x2e9)](_0x27eb43));for(const _0x43b255 of _0x1b2373){if(!_0x43b255)continue;_0x43b255[_0x22770c(0x162)]();}}),PluginManager[_0x561d2e(0x274)](pluginData[_0x561d2e(0x2fa)],_0x561d2e(0x3d0),_0x594146=>{const _0x182ad6=_0x561d2e;VisuMZ[_0x182ad6(0x17c)](_0x594146,_0x594146);const _0xd117ea=[],_0x5cfe3a=_0x594146['Blacklist'][_0x182ad6(0x41e)](_0xf32bf=>_0xf32bf['toUpperCase']()[_0x182ad6(0x1bf)]()),_0x45ba01=_0x594146[_0x182ad6(0x14f)][_0x182ad6(0x41e)](_0x5ace35=>_0x5ace35[_0x182ad6(0x3e1)]()[_0x182ad6(0x1bf)]()),_0x400d2f=_0x594146[_0x182ad6(0x2c0)]>=_0x594146[_0x182ad6(0x3b4)]?_0x594146['Step1Start']:_0x594146[_0x182ad6(0x2c0)],_0x427be5=_0x594146['Step1End']>=_0x594146[_0x182ad6(0x3b4)]?_0x594146['Step1End']:_0x594146[_0x182ad6(0x3b4)],_0x49c561=Array(_0x427be5-_0x400d2f+0x1)[_0x182ad6(0x18f)]()[_0x182ad6(0x41e)]((_0x1564b4,_0x590153)=>_0x400d2f+_0x590153);for(const _0x5daf4b of _0x49c561){const _0x2651c4=$dataItems[_0x5daf4b];if(!_0x2651c4)continue;if(!VisuMZ['ItemsEquipsCore'][_0x182ad6(0x16b)](_0x2651c4,_0x5cfe3a,_0x45ba01))continue;_0xd117ea['push']([0x0,_0x5daf4b,0x0,_0x2651c4[_0x182ad6(0x348)]]);}const _0x4ea3b5=_0x594146[_0x182ad6(0x45f)]>=_0x594146[_0x182ad6(0x29e)]?_0x594146['Step2Start']:_0x594146[_0x182ad6(0x45f)],_0x5ae91f=_0x594146['Step2End']>=_0x594146[_0x182ad6(0x29e)]?_0x594146[_0x182ad6(0x45f)]:_0x594146['Step2Start'],_0x434a0b=Array(_0x5ae91f-_0x4ea3b5+0x1)[_0x182ad6(0x18f)]()[_0x182ad6(0x41e)]((_0x2eba0f,_0x4e8ab7)=>_0x4ea3b5+_0x4e8ab7);for(const _0x27bf17 of _0x434a0b){const _0x716736=$dataWeapons[_0x27bf17];if(!_0x716736)continue;if(!VisuMZ[_0x182ad6(0x12d)][_0x182ad6(0x16b)](_0x716736,_0x5cfe3a,_0x45ba01))continue;_0xd117ea['push']([0x1,_0x27bf17,0x0,_0x716736['price']]);}const _0x3edb01=_0x594146[_0x182ad6(0x440)]>=_0x594146[_0x182ad6(0x2c7)]?_0x594146['Step3Start']:_0x594146[_0x182ad6(0x440)],_0x50ef41=_0x594146[_0x182ad6(0x440)]>=_0x594146['Step3Start']?_0x594146[_0x182ad6(0x440)]:_0x594146[_0x182ad6(0x2c7)],_0x484bcb=Array(_0x50ef41-_0x3edb01+0x1)['fill']()[_0x182ad6(0x41e)]((_0x665b7d,_0x3ef694)=>_0x3edb01+_0x3ef694);for(const _0x1cc1d7 of _0x484bcb){const _0x2738b6=$dataArmors[_0x1cc1d7];if(!_0x2738b6)continue;if(!VisuMZ[_0x182ad6(0x12d)][_0x182ad6(0x16b)](_0x2738b6,_0x5cfe3a,_0x45ba01))continue;_0xd117ea[_0x182ad6(0x15d)]([0x2,_0x1cc1d7,0x0,_0x2738b6[_0x182ad6(0x348)]]);}SceneManager[_0x182ad6(0x15d)](Scene_Shop),SceneManager[_0x182ad6(0x2dd)](_0xd117ea,_0x594146['PurchaseOnly']);}),VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x16b)]=function(_0x54a4fa,_0x5a35f6,_0xf46c61){const _0x56c59d=_0x561d2e;if(_0x54a4fa[_0x56c59d(0x2fa)][_0x56c59d(0x1bf)]()==='')return![];if(_0x54a4fa['name'][_0x56c59d(0x172)](/-----/i))return![];const _0x3538f9=_0x54a4fa[_0x56c59d(0x3fa)];if(_0x5a35f6[_0x56c59d(0x22d)]>0x0)for(const _0xc64700 of _0x5a35f6){if(!_0xc64700)continue;if(_0x3538f9[_0x56c59d(0x198)](_0xc64700))return![];}if(_0xf46c61[_0x56c59d(0x22d)]>0x0){for(const _0x189e3f of _0xf46c61){if(!_0x189e3f)continue;if(_0x3538f9[_0x56c59d(0x198)](_0x189e3f))return!![];}return![];}return!![];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x14a)]=Scene_Boot[_0x561d2e(0x1d9)][_0x561d2e(0x262)],Scene_Boot[_0x561d2e(0x1d9)]['onDatabaseLoaded']=function(){const _0x30cd54=_0x561d2e;this[_0x30cd54(0x1aa)](),VisuMZ[_0x30cd54(0x12d)]['Scene_Boot_onDatabaseLoaded'][_0x30cd54(0x27d)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot[_0x561d2e(0x1d9)][_0x561d2e(0x1aa)]=function(){const _0x195127=_0x561d2e;VisuMZ[_0x195127(0x12d)][_0x195127(0x155)]={},VisuMZ['ItemsEquipsCore']['RegExp'][_0x195127(0x1b0)]=[],VisuMZ['ItemsEquipsCore']['RegExp'][_0x195127(0x214)]=[];const _0x24bc0b=['MaxHP','MaxMP','ATK',_0x195127(0x28e),'MAT',_0x195127(0x476),_0x195127(0x345),_0x195127(0x45c)];for(const _0x4e976f of _0x24bc0b){const _0x1dcaa5=_0x195127(0x28f)[_0x195127(0x39a)](_0x4e976f);VisuMZ[_0x195127(0x12d)][_0x195127(0x155)][_0x195127(0x1b0)][_0x195127(0x15d)](new RegExp(_0x1dcaa5,'i'));const _0xd24218=_0x195127(0x378)[_0x195127(0x39a)](_0x4e976f);VisuMZ[_0x195127(0x12d)]['RegExp'][_0x195127(0x214)][_0x195127(0x15d)](new RegExp(_0xd24218,'g'));}},Scene_Boot[_0x561d2e(0x1d9)][_0x561d2e(0x18a)]=function(){const _0x2cd991=_0x561d2e;if(VisuMZ[_0x2cd991(0x422)])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x2f2342=[$dataItems,$dataWeapons,$dataArmors];for(const _0x161081 of _0x2f2342){for(const _0x278456 of _0x161081){if(!_0x278456)continue;VisuMZ[_0x2cd991(0x12d)][_0x2cd991(0x22a)](_0x278456,_0x161081),VisuMZ[_0x2cd991(0x12d)][_0x2cd991(0x236)](_0x278456,_0x161081),VisuMZ[_0x2cd991(0x12d)]['Parse_Notetags_ParamValues'](_0x278456,_0x161081),VisuMZ[_0x2cd991(0x12d)][_0x2cd991(0x242)](_0x278456,_0x161081),VisuMZ[_0x2cd991(0x12d)][_0x2cd991(0x291)](_0x278456,_0x161081);}}},Scene_Boot['prototype'][_0x561d2e(0x224)]=function(){for(const _0x3be398 of $dataClasses){if(!_0x3be398)continue;VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0x3be398);}},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2a1)]=VisuMZ[_0x561d2e(0x2a1)],VisuMZ[_0x561d2e(0x2a1)]=function(_0xdc36c6){const _0x15ca63=_0x561d2e;VisuMZ[_0x15ca63(0x12d)][_0x15ca63(0x2a1)][_0x15ca63(0x27d)](this,_0xdc36c6),VisuMZ[_0x15ca63(0x12d)][_0x15ca63(0x3d2)](_0xdc36c6);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2ca)]=VisuMZ[_0x561d2e(0x2ca)],VisuMZ[_0x561d2e(0x2ca)]=function(_0x119f7f){const _0x20597d=_0x561d2e;VisuMZ[_0x20597d(0x12d)][_0x20597d(0x2ca)][_0x20597d(0x27d)](this,_0x119f7f),VisuMZ['ItemsEquipsCore'][_0x20597d(0x2ea)](_0x119f7f,$dataItems);},VisuMZ['ItemsEquipsCore']['ParseWeaponNotetags']=VisuMZ[_0x561d2e(0x3e8)],VisuMZ[_0x561d2e(0x3e8)]=function(_0x37bbc8){const _0x563821=_0x561d2e;VisuMZ[_0x563821(0x12d)][_0x563821(0x3e8)][_0x563821(0x27d)](this,_0x37bbc8),VisuMZ['ItemsEquipsCore'][_0x563821(0x2ea)](_0x37bbc8,$dataWeapons);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3e2)]=VisuMZ[_0x561d2e(0x3e2)],VisuMZ['ParseArmorNotetags']=function(_0x369f00){const _0x37ff28=_0x561d2e;VisuMZ[_0x37ff28(0x12d)][_0x37ff28(0x3e2)][_0x37ff28(0x27d)](this,_0x369f00),VisuMZ[_0x37ff28(0x12d)]['Parse_Notetags_Batch'](_0x369f00,$dataArmors);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3d2)]=function(_0x45ab1a){const _0x552a48=_0x561d2e;_0x45ab1a[_0x552a48(0x369)]=[];if(_0x45ab1a['note'][_0x552a48(0x172)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x204efe=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x262b9c of _0x204efe){const _0x5ef55f=$dataSystem['equipTypes'][_0x552a48(0x39f)](_0x262b9c[_0x552a48(0x1bf)]());if(_0x5ef55f>0x0)_0x45ab1a[_0x552a48(0x369)][_0x552a48(0x15d)](_0x5ef55f);}}else for(const _0x28060a of $dataSystem[_0x552a48(0x393)]){const _0x43da55=$dataSystem[_0x552a48(0x393)][_0x552a48(0x39f)](_0x28060a['trim']());if(_0x43da55>0x0)_0x45ab1a[_0x552a48(0x369)][_0x552a48(0x15d)](_0x43da55);}},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2ea)]=function(_0x2d5c81,_0x3e4246){const _0x43c6b=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x43c6b(0x22a)](_0x2d5c81,_0x3e4246),VisuMZ[_0x43c6b(0x12d)][_0x43c6b(0x236)](_0x2d5c81,_0x3e4246),VisuMZ[_0x43c6b(0x12d)]['Parse_Notetags_ParamValues'](_0x2d5c81,_0x3e4246),VisuMZ[_0x43c6b(0x12d)][_0x43c6b(0x242)](_0x2d5c81,_0x3e4246),VisuMZ['ItemsEquipsCore'][_0x43c6b(0x291)](_0x2d5c81,_0x3e4246);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x22a)]=function(_0x30411a,_0x289f4b){const _0x410ccb=_0x561d2e;_0x30411a[_0x410ccb(0x3fa)]=[];const _0x2cdc90=_0x30411a[_0x410ccb(0x46b)],_0x1d25c3=_0x2cdc90[_0x410ccb(0x172)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1d25c3)for(const _0x19d2a7 of _0x1d25c3){_0x19d2a7[_0x410ccb(0x172)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x176e09=String(RegExp['$1'])[_0x410ccb(0x3e1)]()['trim']()[_0x410ccb(0x30a)](',');for(const _0x537236 of _0x176e09){_0x30411a[_0x410ccb(0x3fa)]['push'](_0x537236['trim']());}}if(_0x2cdc90[_0x410ccb(0x172)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x37eb95=RegExp['$1']['split'](/[\r\n]+/);for(const _0x181e42 of _0x37eb95){_0x30411a[_0x410ccb(0x3fa)]['push'](_0x181e42['toUpperCase']()[_0x410ccb(0x1bf)]());}}},VisuMZ[_0x561d2e(0x12d)]['Parse_Notetags_Prices']=function(_0x5dd5f1,_0x117589){const _0x5726d2=_0x561d2e;_0x5dd5f1['note'][_0x5726d2(0x172)](/<PRICE:[ ](\d+)>/i)&&(_0x5dd5f1[_0x5726d2(0x348)]=Number(RegExp['$1']));},VisuMZ[_0x561d2e(0x12d)]['Parse_Notetags_ParamValues']=function(_0x2f79e1,_0x1a9e92){const _0x49a9aa=_0x561d2e;if(_0x1a9e92===$dataItems)return;for(let _0x4650f8=0x0;_0x4650f8<0x8;_0x4650f8++){const _0x1c5e31=VisuMZ[_0x49a9aa(0x12d)][_0x49a9aa(0x155)]['EquipParams'][_0x4650f8];_0x2f79e1[_0x49a9aa(0x46b)][_0x49a9aa(0x172)](_0x1c5e31)&&(_0x2f79e1['params'][_0x4650f8]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x41f)]={},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x242)]=function(_0xbc7bcf,_0x426294){const _0x228568=_0x561d2e;if(_0x426294===$dataItems)return;if(_0xbc7bcf[_0x228568(0x46b)][_0x228568(0x172)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x3ff699=String(RegExp['$1']),_0x35fefd=(_0x426294===$dataWeapons?'W%1':_0x228568(0x201))[_0x228568(0x39a)](_0xbc7bcf['id']),_0x5e95aa=_0x228568(0x2a2)[_0x228568(0x39a)](_0x3ff699);for(let _0x380ed0=0x0;_0x380ed0<0x8;_0x380ed0++){if(_0x3ff699['match'](VisuMZ['ItemsEquipsCore'][_0x228568(0x155)][_0x228568(0x214)][_0x380ed0])){const _0x1e3ee8=_0x228568(0x2d0)[_0x228568(0x39a)](_0x35fefd,_0x380ed0);VisuMZ[_0x228568(0x12d)][_0x228568(0x41f)][_0x1e3ee8]=new Function(_0x228568(0x17a),'paramId',_0x5e95aa);}}}},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x320)]={},VisuMZ[_0x561d2e(0x12d)]['Parse_Notetags_EnableJS']=function(_0x19c541,_0x17fc2f){const _0x4be18c=_0x561d2e;if(_0x17fc2f!==$dataItems)return;if(_0x19c541[_0x4be18c(0x46b)][_0x4be18c(0x172)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x48dbed=String(RegExp['$1']),_0x4ee9a9=_0x4be18c(0x2b8)[_0x4be18c(0x39a)](_0x48dbed);VisuMZ[_0x4be18c(0x12d)]['itemEnableJS'][_0x19c541['id']]=new Function(_0x4be18c(0x17a),_0x4ee9a9);}},DataManager[_0x561d2e(0x1f3)]=function(_0x139c1a){const _0x47be4e=_0x561d2e;return this[_0x47be4e(0x20c)](_0x139c1a)&&_0x139c1a[_0x47be4e(0x2ed)]===0x2;},DataManager[_0x561d2e(0x29b)]=function(_0x48ec18){const _0x1efdc6=_0x561d2e;if(!_0x48ec18)return 0x63;else return _0x48ec18[_0x1efdc6(0x46b)][_0x1efdc6(0x172)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x1efdc6(0x170)](_0x48ec18);},DataManager[_0x561d2e(0x170)]=function(_0x22a866){const _0x2ab0ac=_0x561d2e;if(this['isItem'](_0x22a866))return VisuMZ[_0x2ab0ac(0x12d)]['Settings']['ItemScene']['MaxItems'];else{if(this['isWeapon'](_0x22a866))return VisuMZ[_0x2ab0ac(0x12d)]['Settings']['ItemScene'][_0x2ab0ac(0x3a0)];else{if(this['isArmor'](_0x22a866))return VisuMZ[_0x2ab0ac(0x12d)][_0x2ab0ac(0x3a5)]['ItemScene'][_0x2ab0ac(0x21c)];}}},ColorManager[_0x561d2e(0x1fd)]=function(_0x5d9c84){const _0x8cea92=_0x561d2e;if(!_0x5d9c84)return this[_0x8cea92(0x2ba)]();else{if(_0x5d9c84[_0x8cea92(0x46b)]['match'](/<COLOR:[ ](\d+)>/i))return this['textColor'](Number(RegExp['$1'])[_0x8cea92(0x284)](0x0,0x1f));else return _0x5d9c84[_0x8cea92(0x46b)][_0x8cea92(0x172)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x561d2e(0x2cc)]=function(_0x404ba1){const _0x486dbf=_0x561d2e;return _0x404ba1=String(_0x404ba1),_0x404ba1[_0x486dbf(0x172)](/#(.*)/i)?_0x486dbf(0x44f)[_0x486dbf(0x39a)](String(RegExp['$1'])):this[_0x486dbf(0x1a0)](Number(_0x404ba1));},SceneManager[_0x561d2e(0x2ee)]=function(){const _0x4a8b22=_0x561d2e;return this[_0x4a8b22(0x16a)]&&this[_0x4a8b22(0x16a)][_0x4a8b22(0x3f4)]===Scene_Shop;},Game_Temp[_0x561d2e(0x1d9)][_0x561d2e(0x452)]=function(){const _0x4606ea=_0x561d2e;if(this[_0x4606ea(0x239)])return![];return VisuMZ[_0x4606ea(0x12d)]['Settings'][_0x4606ea(0x1ed)]['Enable'];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3a5)][_0x561d2e(0x473)][_0x561d2e(0x40f)],VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x1a6)]=Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x3b6)],Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x3b6)]=function(_0x527006){const _0x4eab30=_0x561d2e;return this[_0x4eab30(0x3e4)]?this[_0x4eab30(0x324)]?VisuMZ[_0x4eab30(0x181)]:0x1:VisuMZ['ItemsEquipsCore'][_0x4eab30(0x1a6)][_0x4eab30(0x27d)](this,_0x527006);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x17b)]=Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x323)],Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x323)]=function(_0x564698){const _0x11a659=_0x561d2e;if(!_0x564698)return![];if(!VisuMZ[_0x11a659(0x12d)][_0x11a659(0x17b)]['call'](this,_0x564698))return![];if(!this['meetsItemConditionsNotetags'](_0x564698))return![];if(!this[_0x11a659(0x32d)](_0x564698))return![];return!![];},Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x2f1)]=function(_0x57706b){const _0x1f0f86=_0x561d2e;if(!this[_0x1f0f86(0x2aa)](_0x57706b))return![];return!![];},Game_BattlerBase[_0x561d2e(0x1d9)][_0x561d2e(0x2aa)]=function(_0x1c0ccb){const _0x3685f3=_0x561d2e,_0x44c81b=_0x1c0ccb['note'];if(_0x44c81b[_0x3685f3(0x172)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x596768=JSON[_0x3685f3(0x446)]('['+RegExp['$1'][_0x3685f3(0x172)](/\d+/g)+']');for(const _0x54bb66 of _0x596768){if(!$gameSwitches[_0x3685f3(0x1f1)](_0x54bb66))return![];}return!![];}if(_0x44c81b['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf5f6c4=JSON[_0x3685f3(0x446)]('['+RegExp['$1'][_0x3685f3(0x172)](/\d+/g)+']');for(const _0x3c17e6 of _0xf5f6c4){if(!$gameSwitches['value'](_0x3c17e6))return![];}return!![];}if(_0x44c81b[_0x3685f3(0x172)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x478b47=JSON[_0x3685f3(0x446)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x240bf5 of _0x478b47){if($gameSwitches[_0x3685f3(0x1f1)](_0x240bf5))return!![];}return![];}if(_0x44c81b['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x503511=JSON[_0x3685f3(0x446)]('['+RegExp['$1'][_0x3685f3(0x172)](/\d+/g)+']');for(const _0x47f9a3 of _0x503511){if(!$gameSwitches[_0x3685f3(0x1f1)](_0x47f9a3))return!![];}return![];}if(_0x44c81b[_0x3685f3(0x172)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c2419=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2c125f of _0x4c2419){if(!$gameSwitches[_0x3685f3(0x1f1)](_0x2c125f))return!![];}return![];}if(_0x44c81b['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x782f86=JSON['parse']('['+RegExp['$1'][_0x3685f3(0x172)](/\d+/g)+']');for(const _0xda4d61 of _0x782f86){if($gameSwitches['value'](_0xda4d61))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x1b409f){const _0xa57b2=_0x561d2e,_0x4a4ee4=_0x1b409f[_0xa57b2(0x46b)],_0x17aa69=VisuMZ[_0xa57b2(0x12d)][_0xa57b2(0x320)];return _0x17aa69[_0x1b409f['id']]?_0x17aa69[_0x1b409f['id']][_0xa57b2(0x27d)](this,_0x1b409f):!![];},Game_Actor[_0x561d2e(0x1d9)]['initEquips']=function(_0x35d61f){const _0x302707=_0x561d2e;_0x35d61f=this['convertInitEquipsToItems'](_0x35d61f);const _0x55a4bb=this['equipSlots']();this['_equips']=[];for(let _0x3ff8d5=0x0;_0x3ff8d5<_0x55a4bb[_0x302707(0x22d)];_0x3ff8d5++){this[_0x302707(0x132)][_0x3ff8d5]=new Game_Item();}for(let _0x49fde1=0x0;_0x49fde1<_0x55a4bb[_0x302707(0x22d)];_0x49fde1++){const _0x55126e=_0x55a4bb[_0x49fde1],_0x50c813=this[_0x302707(0x400)](_0x35d61f,_0x55126e);if(this[_0x302707(0x166)](_0x50c813))this[_0x302707(0x132)][_0x49fde1][_0x302707(0x1fa)](_0x50c813);}this[_0x302707(0x317)](!![]),this[_0x302707(0x20f)]();},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x2fe)]=function(_0x2ee855){const _0xe4660=_0x561d2e,_0x331540=[];for(let _0x15e39c=0x0;_0x15e39c<_0x2ee855['length'];_0x15e39c++){const _0x4c6a58=_0x2ee855[_0x15e39c];if(_0x4c6a58<=0x0)continue;const _0x4a5719=$dataSystem[_0xe4660(0x393)][_0x15e39c+0x1];_0x4a5719===$dataSystem[_0xe4660(0x393)][0x1]||_0x15e39c===0x1&&this[_0xe4660(0x2c8)]()?_0x331540[_0xe4660(0x15d)]($dataWeapons[_0x4c6a58]):_0x331540['push']($dataArmors[_0x4c6a58]);}return _0x331540;},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x400)]=function(_0x46cbeb,_0x4d3a2b){const _0x1081df=_0x561d2e;for(const _0x43c63f of _0x46cbeb){if(!_0x43c63f)continue;if(_0x43c63f[_0x1081df(0x147)]===_0x4d3a2b)return _0x46cbeb[_0x1081df(0x43d)](_0x46cbeb[_0x1081df(0x39f)](_0x43c63f),0x1),_0x43c63f;}return null;},Game_Actor['prototype'][_0x561d2e(0x369)]=function(){const _0x101e75=_0x561d2e,_0x250f38=JsonEx[_0x101e75(0x2a9)](this[_0x101e75(0x44b)]||this['currentClass']()[_0x101e75(0x369)]);if(_0x250f38['length']>=0x2&&this[_0x101e75(0x2c8)]())_0x250f38[0x1]=0x1;return _0x250f38;},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x404)]=function(_0x1253ac){const _0x3d160c=_0x561d2e;_0x1253ac['remove'](0x0),_0x1253ac['remove'](-0x1),this[_0x3d160c(0x44b)]=_0x1253ac,this[_0x3d160c(0x20f)]();},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x162)]=function(){const _0x1b8250=_0x561d2e;this[_0x1b8250(0x44b)]=undefined,this[_0x1b8250(0x20f)]();},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x3de)]=function(){const _0x4fb73a=_0x561d2e,_0x337ecb=this[_0x4fb73a(0x369)]();for(let _0x3af0fc=0x0;_0x3af0fc<_0x337ecb[_0x4fb73a(0x22d)];_0x3af0fc++){if(!this[_0x4fb73a(0x132)][_0x3af0fc])this[_0x4fb73a(0x132)][_0x3af0fc]=new Game_Item();}this[_0x4fb73a(0x317)](![]),this[_0x4fb73a(0x20f)]();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2d5)]=Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x25a)],Game_Actor[_0x561d2e(0x1d9)]['changeEquip']=function(_0x5dd20a,_0x4ef026){const _0x3a0553=_0x561d2e;if(!this[_0x3a0553(0x318)]){const _0x1c0187=JsonEx['makeDeepCopy'](this);_0x1c0187[_0x3a0553(0x318)]=!![],VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip'][_0x3a0553(0x27d)](this,_0x5dd20a,_0x4ef026),this[_0x3a0553(0x249)](_0x1c0187);}else VisuMZ[_0x3a0553(0x12d)][_0x3a0553(0x2d5)][_0x3a0553(0x27d)](this,_0x5dd20a,_0x4ef026);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x42e)]=Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x247)],Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x247)]=function(_0x5de3ec,_0xd62617){const _0x1f034e=_0x561d2e;if(!this['_tempActor']){const _0x2f65d5=JsonEx[_0x1f034e(0x2a9)](this);_0x2f65d5['_tempActor']=!![],VisuMZ[_0x1f034e(0x12d)]['Game_Actor_forceChangeEquip'][_0x1f034e(0x27d)](this,_0x5de3ec,_0xd62617),this[_0x1f034e(0x249)](_0x2f65d5);}else VisuMZ[_0x1f034e(0x12d)]['Game_Actor_forceChangeEquip']['call'](this,_0x5de3ec,_0xd62617);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x372)]=Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x151)],Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x151)]=function(_0x5714ee){const _0x4eb3a3=_0x561d2e;if(!this[_0x4eb3a3(0x318)]){const _0x1cea16=JsonEx['makeDeepCopy'](this);_0x1cea16[_0x4eb3a3(0x318)]=!![],VisuMZ[_0x4eb3a3(0x12d)][_0x4eb3a3(0x372)][_0x4eb3a3(0x27d)](this,_0x5714ee),this['equipAdjustHpMp'](_0x1cea16);}else VisuMZ[_0x4eb3a3(0x12d)][_0x4eb3a3(0x372)][_0x4eb3a3(0x27d)](this,_0x5714ee);},Game_Actor['prototype'][_0x561d2e(0x317)]=function(_0x1aa1f7){const _0xe28f56=_0x561d2e;for(;;){const _0x5a9b45=this[_0xe28f56(0x369)](),_0x46d065=this[_0xe28f56(0x3e9)]();let _0x38bc3e=![];for(let _0x5df4f1=0x0;_0x5df4f1<_0x46d065[_0xe28f56(0x22d)];_0x5df4f1++){const _0x1ce8da=_0x46d065[_0x5df4f1];if(_0x1ce8da&&(!this[_0xe28f56(0x166)](_0x1ce8da)||_0x1ce8da[_0xe28f56(0x147)]!==_0x5a9b45[_0x5df4f1])){!_0x1aa1f7&&this[_0xe28f56(0x2de)](null,_0x1ce8da);if(!this[_0xe28f56(0x318)]){const _0x2d169e=JsonEx['makeDeepCopy'](this);_0x2d169e[_0xe28f56(0x318)]=!![],this['_equips'][_0x5df4f1][_0xe28f56(0x1fa)](null),this[_0xe28f56(0x249)](_0x2d169e);}else this[_0xe28f56(0x132)][_0x5df4f1]['setObject'](null);_0x38bc3e=!![];}}if(!_0x38bc3e)break;}},Game_Actor['prototype'][_0x561d2e(0x249)]=function(_0x454696){const _0x37016e=_0x561d2e;if(this['_tempActor'])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0x37016e(0x408)][_0x37016e(0x2c3)])return;const _0x240198=Math[_0x37016e(0x2e5)](_0x454696[_0x37016e(0x3cb)]()*this['mhp']),_0x2fdb26=Math['round'](_0x454696[_0x37016e(0x163)]()*this[_0x37016e(0x2ac)]);if(this['hp']>0x0)this[_0x37016e(0x2e1)](_0x240198);if(this['mp']>0x0)this[_0x37016e(0x3e5)](_0x2fdb26);},Game_Actor['prototype'][_0x561d2e(0x371)]=function(){const _0x4f177d=_0x561d2e,_0x5c0c73=this['equipSlots']()['length'];for(let _0x35f813=0x0;_0x35f813<_0x5c0c73;_0x35f813++){if(this['isClearEquipOk'](_0x35f813))this[_0x4f177d(0x25a)](_0x35f813,null);}},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x350)]=function(_0x14795c){const _0x146d05=_0x561d2e;return this[_0x146d05(0x44d)]()[_0x146d05(0x198)](this[_0x146d05(0x369)]()[_0x14795c])?![]:this[_0x146d05(0x213)](_0x14795c);},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x44d)]=function(){const _0x319a3a=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x319a3a(0x3a5)][_0x319a3a(0x408)][_0x319a3a(0x261)];},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x2f8)]=function(){const _0x4266c8=_0x561d2e,_0x457999=this[_0x4266c8(0x369)]()[_0x4266c8(0x22d)];for(let _0x293c15=0x0;_0x293c15<_0x457999;_0x293c15++){if(this[_0x4266c8(0x19e)](_0x293c15))this['changeEquip'](_0x293c15,null);}for(let _0x947642=0x0;_0x947642<_0x457999;_0x947642++){if(this['isOptimizeEquipOk'](_0x947642))this[_0x4266c8(0x25a)](_0x947642,this[_0x4266c8(0x2a7)](_0x947642));}},Game_Actor[_0x561d2e(0x1d9)]['isOptimizeEquipOk']=function(_0x2d515a){const _0x376a28=_0x561d2e;return this[_0x376a28(0x124)]()[_0x376a28(0x198)](this[_0x376a28(0x369)]()[_0x2d515a])?![]:this[_0x376a28(0x213)](_0x2d515a);},Game_Actor['prototype'][_0x561d2e(0x124)]=function(){const _0x1a8f87=_0x561d2e;return VisuMZ[_0x1a8f87(0x12d)][_0x1a8f87(0x3a5)][_0x1a8f87(0x408)][_0x1a8f87(0x358)];},VisuMZ[_0x561d2e(0x12d)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x2de)],Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x2de)]=function(_0x28a855,_0xe476bc){const _0x138352=_0x561d2e;if(this[_0x138352(0x318)])return![];$gameTemp[_0x138352(0x239)]=!![];const _0x5c1fdc=VisuMZ[_0x138352(0x12d)][_0x138352(0x3d9)][_0x138352(0x27d)](this,_0x28a855,_0xe476bc);return $gameTemp['_bypassNewLabel']=![],_0x5c1fdc;},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x217)]=function(_0x2caa87,_0x4bd0c1){const _0x51a590=_0x561d2e,_0x3d02e6=this[_0x51a590(0x360)](_0x2caa87);if(_0x3d02e6<0x0)return;const _0x45ce7=_0x2caa87===0x1?$dataWeapons[_0x4bd0c1]:$dataArmors[_0x4bd0c1];this[_0x51a590(0x25a)](_0x3d02e6,_0x45ce7);},Game_Actor[_0x561d2e(0x1d9)]['getNextAvailableEtypeId']=function(_0x59ed3f){const _0x3ca202=_0x561d2e;let _0x4509d7=0x0;const _0x342a22=this[_0x3ca202(0x369)](),_0x5b6f8a=this[_0x3ca202(0x3e9)]();for(let _0x77fd6a=0x0;_0x77fd6a<_0x342a22[_0x3ca202(0x22d)];_0x77fd6a++){if(_0x342a22[_0x77fd6a]===_0x59ed3f){_0x4509d7=_0x77fd6a;if(!_0x5b6f8a[_0x77fd6a])return _0x4509d7;}}return _0x4509d7;},VisuMZ[_0x561d2e(0x12d)]['Game_Actor_paramPlus']=Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x16e)],Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x16e)]=function(_0x3f50fa){const _0x157520=_0x561d2e;let _0x456958=VisuMZ[_0x157520(0x12d)][_0x157520(0x3db)][_0x157520(0x27d)](this,_0x3f50fa);for(const _0x5f2f12 of this[_0x157520(0x3e9)]()){if(_0x5f2f12)_0x456958+=this['paramPlusItemsEquipsCoreCustomJS'](_0x5f2f12,_0x3f50fa);}return _0x456958;},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x36c)]=function(_0x3ec045,_0x515e8e){const _0x431c00=_0x561d2e;if(this['_calculatingJSParameters'])return 0x0;const _0x518ac8=(DataManager[_0x431c00(0x42d)](_0x3ec045)?'W%1':_0x431c00(0x201))[_0x431c00(0x39a)](_0x3ec045['id']),_0x5aa509=_0x431c00(0x2d0)[_0x431c00(0x39a)](_0x518ac8,_0x515e8e);if(VisuMZ[_0x431c00(0x12d)][_0x431c00(0x41f)][_0x5aa509]){this[_0x431c00(0x3dd)]=!![];const _0x435b8d=VisuMZ['ItemsEquipsCore']['paramJS'][_0x5aa509][_0x431c00(0x27d)](this,_0x3ec045,_0x515e8e);return this[_0x431c00(0x3dd)]=![],_0x435b8d;}else return 0x0;},Game_Actor[_0x561d2e(0x1d9)][_0x561d2e(0x2b0)]=function(_0x40ab36){const _0x3ebdb3=_0x561d2e;this[_0x3ebdb3(0x3e4)]=!![],this[_0x3ebdb3(0x324)]=_0x40ab36;},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x3df)]=Game_Party[_0x561d2e(0x1d9)][_0x561d2e(0x26f)],Game_Party['prototype'][_0x561d2e(0x26f)]=function(){const _0x53531a=_0x561d2e;VisuMZ[_0x53531a(0x12d)][_0x53531a(0x3df)]['call'](this),this[_0x53531a(0x179)]();},Game_Party[_0x561d2e(0x1d9)]['initNewItemsList']=function(){const _0x3a9ae2=_0x561d2e;this[_0x3a9ae2(0x2f0)]=[];},Game_Party['prototype']['isNewItem']=function(_0x567bd0){const _0x3f389a=_0x561d2e;if(!$gameTemp[_0x3f389a(0x452)]())return![];if(this[_0x3f389a(0x2f0)]===undefined)this[_0x3f389a(0x179)]();let _0x2f02e5='';if(DataManager[_0x3f389a(0x20c)](_0x567bd0))_0x2f02e5='item-%1'[_0x3f389a(0x39a)](_0x567bd0['id']);else{if(DataManager[_0x3f389a(0x42d)](_0x567bd0))_0x2f02e5=_0x3f389a(0x399)[_0x3f389a(0x39a)](_0x567bd0['id']);else{if(DataManager[_0x3f389a(0x448)](_0x567bd0))_0x2f02e5='armor-%1'[_0x3f389a(0x39a)](_0x567bd0['id']);else return;}}return this['_newItemsList'][_0x3f389a(0x198)](_0x2f02e5);},Game_Party[_0x561d2e(0x1d9)][_0x561d2e(0x23f)]=function(_0xd5d27f){const _0x288f76=_0x561d2e;if(!$gameTemp[_0x288f76(0x452)]())return;if(this[_0x288f76(0x2f0)]===undefined)this['initNewItemsList']();let _0x323c5b='';if(DataManager[_0x288f76(0x20c)](_0xd5d27f))_0x323c5b=_0x288f76(0x32b)[_0x288f76(0x39a)](_0xd5d27f['id']);else{if(DataManager[_0x288f76(0x42d)](_0xd5d27f))_0x323c5b=_0x288f76(0x399)[_0x288f76(0x39a)](_0xd5d27f['id']);else{if(DataManager[_0x288f76(0x448)](_0xd5d27f))_0x323c5b=_0x288f76(0x156)['format'](_0xd5d27f['id']);else return;}}if(!this[_0x288f76(0x2f0)]['includes'](_0x323c5b))this[_0x288f76(0x2f0)][_0x288f76(0x15d)](_0x323c5b);},Game_Party['prototype'][_0x561d2e(0x2cd)]=function(_0x49abf3){const _0x5ec9e1=_0x561d2e;if(!$gameTemp[_0x5ec9e1(0x452)]())return;if(this['_newItemsList']===undefined)this[_0x5ec9e1(0x179)]();let _0x1821fc='';if(DataManager[_0x5ec9e1(0x20c)](_0x49abf3))_0x1821fc=_0x5ec9e1(0x32b)[_0x5ec9e1(0x39a)](_0x49abf3['id']);else{if(DataManager[_0x5ec9e1(0x42d)](_0x49abf3))_0x1821fc=_0x5ec9e1(0x399)[_0x5ec9e1(0x39a)](_0x49abf3['id']);else{if(DataManager[_0x5ec9e1(0x448)](_0x49abf3))_0x1821fc=_0x5ec9e1(0x156)[_0x5ec9e1(0x39a)](_0x49abf3['id']);else return;}}this[_0x5ec9e1(0x2f0)][_0x5ec9e1(0x198)](_0x1821fc)&&this[_0x5ec9e1(0x2f0)]['splice'](this[_0x5ec9e1(0x2f0)][_0x5ec9e1(0x39f)](_0x1821fc),0x1);},VisuMZ[_0x561d2e(0x12d)]['Game_Party_gainItem']=Game_Party['prototype'][_0x561d2e(0x327)],Game_Party['prototype'][_0x561d2e(0x327)]=function(_0x585cb,_0x10f6db,_0x4abb0e){const _0x461ba7=_0x561d2e,_0x1a4c36=this[_0x461ba7(0x281)](_0x585cb);VisuMZ['ItemsEquipsCore'][_0x461ba7(0x3f9)]['call'](this,_0x585cb,_0x10f6db,_0x4abb0e);if(this[_0x461ba7(0x281)](_0x585cb)>_0x1a4c36)this[_0x461ba7(0x23f)](_0x585cb);},Game_Party[_0x561d2e(0x1d9)][_0x561d2e(0x3d8)]=function(_0x5e375e){return DataManager['maxItemAmount'](_0x5e375e);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x434)]=Scene_ItemBase['prototype'][_0x561d2e(0x1b5)],Scene_ItemBase[_0x561d2e(0x1d9)][_0x561d2e(0x1b5)]=function(){const _0x10f564=_0x561d2e;VisuMZ[_0x10f564(0x12d)]['Scene_ItemBase_activateItemWindow']['call'](this),this[_0x10f564(0x1c2)][_0x10f564(0x401)]();},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x370)]=function(){const _0x38992a=_0x561d2e;if(ConfigManager[_0x38992a(0x28c)]&&ConfigManager[_0x38992a(0x346)]!==undefined)return ConfigManager[_0x38992a(0x346)];else{if(this[_0x38992a(0x1df)]())return this[_0x38992a(0x395)]()[_0x38992a(0x172)](/LOWER/i);else Scene_ItemBase[_0x38992a(0x1d9)][_0x38992a(0x30f)][_0x38992a(0x27d)](this);}},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x30f)]=function(){const _0x365196=_0x561d2e;if(ConfigManager[_0x365196(0x28c)]&&ConfigManager[_0x365196(0x223)]!==undefined)return ConfigManager[_0x365196(0x223)];else{if(this[_0x365196(0x1df)]())return this['updatedLayoutStyle']()[_0x365196(0x172)](/RIGHT/i);else Scene_ItemBase[_0x365196(0x1d9)]['isRightInputMode'][_0x365196(0x27d)](this);}},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x395)]=function(){const _0x30d942=_0x561d2e;return VisuMZ['ItemsEquipsCore']['Settings'][_0x30d942(0x19c)][_0x30d942(0x3c0)];},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x5d619f=_0x561d2e;return this[_0x5d619f(0x195)]&&this['_categoryWindow'][_0x5d619f(0x27c)]();},Scene_Item['prototype'][_0x561d2e(0x1df)]=function(){const _0x92e9b3=_0x561d2e;return VisuMZ[_0x92e9b3(0x12d)][_0x92e9b3(0x3a5)][_0x92e9b3(0x19c)][_0x92e9b3(0x359)];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2b7)]=Scene_Item['prototype']['create'],Scene_Item[_0x561d2e(0x1d9)]['create']=function(){const _0x17a92a=_0x561d2e;VisuMZ[_0x17a92a(0x12d)][_0x17a92a(0x2b7)][_0x17a92a(0x27d)](this),this[_0x17a92a(0x27c)]()&&this['onCategoryOk']();},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x267)]=function(){const _0x3ae6be=_0x561d2e;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x3ae6be(0x225)]():Scene_ItemBase[_0x3ae6be(0x1d9)][_0x3ae6be(0x267)][_0x3ae6be(0x27d)](this);},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x225)]=function(){const _0x176ab7=_0x561d2e,_0x108f38=0x0,_0x3c0824=this[_0x176ab7(0x1d7)](),_0x511142=Graphics[_0x176ab7(0x3a7)],_0x49671e=this['helpAreaHeight']();return new Rectangle(_0x108f38,_0x3c0824,_0x511142,_0x49671e);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x133)]=Scene_Item['prototype'][_0x561d2e(0x238)],Scene_Item['prototype'][_0x561d2e(0x238)]=function(){const _0x3599e1=_0x561d2e;VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow'][_0x3599e1(0x27d)](this),this[_0x3599e1(0x27c)]()&&this[_0x3599e1(0x149)]();},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x149)]=function(){const _0x5c6a31=_0x561d2e;delete this[_0x5c6a31(0x195)][_0x5c6a31(0x32a)]['ok'],delete this[_0x5c6a31(0x195)]['_handlers']['cancel'];},VisuMZ['ItemsEquipsCore']['Scene_Item_categoryWindowRect']=Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x1c5)],Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x1c5)]=function(){const _0x3e8da1=_0x561d2e;return this[_0x3e8da1(0x1df)]()?this[_0x3e8da1(0x389)]():VisuMZ[_0x3e8da1(0x12d)][_0x3e8da1(0x3b5)][_0x3e8da1(0x27d)](this);},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x389)]=function(){const _0x369750=_0x561d2e,_0x10918c=0x0,_0x3d1d18=this[_0x369750(0x35b)](),_0x284c8a=Graphics[_0x369750(0x3a7)],_0x3fb4cd=this[_0x369750(0x38d)](0x1,!![]);return new Rectangle(_0x10918c,_0x3d1d18,_0x284c8a,_0x3fb4cd);},VisuMZ[_0x561d2e(0x12d)]['Scene_Item_createItemWindow']=Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x3c5)],Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x3c5)]=function(){const _0x398c27=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x398c27(0x420)][_0x398c27(0x27d)](this),this['isUseModernControls']()&&this[_0x398c27(0x3e6)](),this['allowCreateStatusWindow']()&&this[_0x398c27(0x303)]();},VisuMZ[_0x561d2e(0x12d)]['Scene_Item_itemWindowRect']=Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x354)],Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x354)]=function(){const _0x3d8795=_0x561d2e;if(this[_0x3d8795(0x1df)]())return this[_0x3d8795(0x23e)]();else{const _0x1dd6a4=VisuMZ['ItemsEquipsCore'][_0x3d8795(0x227)][_0x3d8795(0x27d)](this);return this[_0x3d8795(0x374)]()&&this[_0x3d8795(0x397)]()&&(_0x1dd6a4['width']-=this['statusWidth']()),_0x1dd6a4;}},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x23e)]=function(){const _0x3274f9=_0x561d2e,_0x192c81=this[_0x3274f9(0x30f)]()?this[_0x3274f9(0x31e)]():0x0,_0x2f4f56=this['_categoryWindow']['y']+this[_0x3274f9(0x195)][_0x3274f9(0x1c0)],_0x487e02=Graphics['boxWidth']-this[_0x3274f9(0x31e)](),_0x279838=this[_0x3274f9(0x122)]()-_0x2f4f56;return new Rectangle(_0x192c81,_0x2f4f56,_0x487e02,_0x279838);},Scene_Item['prototype'][_0x561d2e(0x3e6)]=function(){const _0x808435=_0x561d2e;this['_itemWindow'][_0x808435(0x2b9)](_0x808435(0x38a),this[_0x808435(0x42f)][_0x808435(0x457)](this));},Scene_Item[_0x561d2e(0x1d9)]['allowCreateStatusWindow']=function(){const _0x19421b=_0x561d2e;return this[_0x19421b(0x1df)]()?!![]:VisuMZ[_0x19421b(0x12d)][_0x19421b(0x3a5)]['ItemScene'][_0x19421b(0x313)];},Scene_Item['prototype'][_0x561d2e(0x397)]=function(){const _0x522f27=_0x561d2e;return VisuMZ[_0x522f27(0x12d)][_0x522f27(0x3a5)][_0x522f27(0x19c)][_0x522f27(0x194)];},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x303)]=function(){const _0x200c2a=_0x561d2e,_0x3f1ce0=this[_0x200c2a(0x1b1)]();this[_0x200c2a(0x312)]=new Window_ShopStatus(_0x3f1ce0),this[_0x200c2a(0x396)](this[_0x200c2a(0x312)]),this[_0x200c2a(0x1c2)][_0x200c2a(0x253)](this[_0x200c2a(0x312)]);const _0x1792cc=VisuMZ[_0x200c2a(0x12d)][_0x200c2a(0x3a5)][_0x200c2a(0x19c)][_0x200c2a(0x40a)];this[_0x200c2a(0x312)][_0x200c2a(0x410)](_0x1792cc||0x0);},Scene_Item['prototype'][_0x561d2e(0x1b1)]=function(){const _0xd13bf6=_0x561d2e;return this[_0xd13bf6(0x1df)]()?this[_0xd13bf6(0x2db)]():VisuMZ[_0xd13bf6(0x12d)][_0xd13bf6(0x3a5)][_0xd13bf6(0x19c)][_0xd13bf6(0x26c)]['call'](this);},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x2db)]=function(){const _0x555fe4=_0x561d2e,_0x39a749=this[_0x555fe4(0x31e)](),_0x1b6342=this[_0x555fe4(0x1c2)][_0x555fe4(0x1c0)],_0x12ee50=this[_0x555fe4(0x30f)]()?0x0:Graphics[_0x555fe4(0x3a7)]-this[_0x555fe4(0x31e)](),_0x296001=this[_0x555fe4(0x1c2)]['y'];return new Rectangle(_0x12ee50,_0x296001,_0x39a749,_0x1b6342);},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x31e)]=function(){const _0x35651e=_0x561d2e;return Scene_Shop[_0x35651e(0x1d9)][_0x35651e(0x31e)]();},Scene_Item[_0x561d2e(0x1d9)]['buttonAssistItemListRequirement']=function(){const _0x575420=_0x561d2e;if(!this['updatedLayoutStyle']())return![];if(!this[_0x575420(0x27c)]())return![];if(!this[_0x575420(0x1c2)])return![];if(!this['_itemWindow'][_0x575420(0x2d2)])return![];return this[_0x575420(0x395)]()&&this[_0x575420(0x27c)]();},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x1fe)]=function(){const _0x15d5d1=_0x561d2e;if(this['buttonAssistItemListRequirement']())return this[_0x15d5d1(0x1c2)]['maxCols']()===0x1?TextManager[_0x15d5d1(0x207)](_0x15d5d1(0x439),_0x15d5d1(0x14d)):TextManager[_0x15d5d1(0x207)](_0x15d5d1(0x411),_0x15d5d1(0x23a));return Scene_ItemBase[_0x15d5d1(0x1d9)][_0x15d5d1(0x1fe)]['call'](this);},Scene_Item[_0x561d2e(0x1d9)][_0x561d2e(0x251)]=function(){const _0x1e50f8=_0x561d2e;if(this[_0x1e50f8(0x471)]())return VisuMZ['ItemsEquipsCore'][_0x1e50f8(0x3a5)][_0x1e50f8(0x19c)]['buttonAssistCategory'];return Scene_ItemBase[_0x1e50f8(0x1d9)][_0x1e50f8(0x251)][_0x1e50f8(0x27d)](this);},Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x370)]=function(){const _0x1d0d6c=_0x561d2e;if(ConfigManager[_0x1d0d6c(0x28c)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x1d0d6c(0x346)];else{if(this[_0x1d0d6c(0x1df)]())return this['updatedLayoutStyle']()[_0x1d0d6c(0x172)](/LOWER/i);else Scene_MenuBase[_0x1d0d6c(0x1d9)][_0x1d0d6c(0x30f)][_0x1d0d6c(0x27d)](this);}},Scene_Equip[_0x561d2e(0x1d9)]['isRightInputMode']=function(){const _0x8e8026=_0x561d2e;if(ConfigManager[_0x8e8026(0x28c)]&&ConfigManager[_0x8e8026(0x223)]!==undefined)return ConfigManager[_0x8e8026(0x223)];else{if(this[_0x8e8026(0x1df)]())return this[_0x8e8026(0x395)]()['match'](/RIGHT/i);else Scene_MenuBase['prototype'][_0x8e8026(0x30f)][_0x8e8026(0x27d)](this);}},Scene_Equip[_0x561d2e(0x1d9)]['updatedLayoutStyle']=function(){const _0x4c8afc=_0x561d2e;return VisuMZ[_0x4c8afc(0x12d)]['Settings'][_0x4c8afc(0x408)]['LayoutStyle'];},Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x5b0513=_0x561d2e;return this[_0x5b0513(0x24d)]&&this[_0x5b0513(0x24d)][_0x5b0513(0x27c)]();},Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x1df)]=function(){const _0x22443b=_0x561d2e;return VisuMZ[_0x22443b(0x12d)]['Settings'][_0x22443b(0x408)][_0x22443b(0x359)];},VisuMZ[_0x561d2e(0x12d)]['Scene_Equip_create']=Scene_Equip[_0x561d2e(0x1d9)]['create'],Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x3ea)]=function(){const _0x3e29bd=_0x561d2e;VisuMZ[_0x3e29bd(0x12d)][_0x3e29bd(0x2ff)][_0x3e29bd(0x27d)](this),this[_0x3e29bd(0x27c)]()&&this[_0x3e29bd(0x3f6)]();},Scene_Equip['prototype'][_0x561d2e(0x267)]=function(){const _0x164724=_0x561d2e;return this[_0x164724(0x1df)]()?this[_0x164724(0x225)]():Scene_MenuBase['prototype']['helpWindowRect']['call'](this);},Scene_Equip['prototype'][_0x561d2e(0x225)]=function(){const _0x61d494=_0x561d2e,_0x41ac1f=0x0,_0x367284=this[_0x61d494(0x1d7)](),_0x2b93a2=Graphics[_0x61d494(0x3a7)],_0x15c74a=this[_0x61d494(0x1bc)]();return new Rectangle(_0x41ac1f,_0x367284,_0x2b93a2,_0x15c74a);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3d6)]=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x1b1)],Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x1b1)]=function(){const _0x4b69ad=_0x561d2e;return this[_0x4b69ad(0x1df)]()?this[_0x4b69ad(0x2db)]():VisuMZ[_0x4b69ad(0x12d)][_0x4b69ad(0x3d6)][_0x4b69ad(0x27d)](this);},Scene_Equip[_0x561d2e(0x1d9)]['statusWindowRectItemsEquipsCore']=function(){const _0x3213e9=_0x561d2e,_0x23cdf8=this[_0x3213e9(0x30f)]()?0x0:Graphics[_0x3213e9(0x3a7)]-this['statusWidth'](),_0x131872=this[_0x3213e9(0x35b)](),_0x499669=this[_0x3213e9(0x31e)](),_0x48b132=this[_0x3213e9(0x1d8)]();return new Rectangle(_0x23cdf8,_0x131872,_0x499669,_0x48b132);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2ad)]=Scene_Equip['prototype'][_0x561d2e(0x349)],Scene_Equip['prototype'][_0x561d2e(0x349)]=function(){const _0x444285=_0x561d2e;return this[_0x444285(0x1df)]()?this[_0x444285(0x364)]():VisuMZ[_0x444285(0x12d)]['Scene_Equip_commandWindowRect'][_0x444285(0x27d)](this);},Scene_Equip[_0x561d2e(0x1d9)]['shouldCommandWindowExist']=function(){const _0x390c5b=_0x561d2e,_0x3fa6d2=VisuMZ['ItemsEquipsCore'][_0x390c5b(0x3a5)][_0x390c5b(0x408)];return _0x3fa6d2[_0x390c5b(0x263)]||_0x3fa6d2[_0x390c5b(0x3ef)];},Scene_Equip['prototype'][_0x561d2e(0x364)]=function(){const _0x2b050e=_0x561d2e,_0x1dfafd=this[_0x2b050e(0x19a)](),_0x8d908d=this['isRightInputMode']()?this[_0x2b050e(0x31e)]():0x0,_0x196c3d=this[_0x2b050e(0x35b)](),_0x4842ce=Graphics['boxWidth']-this[_0x2b050e(0x31e)](),_0x279bb4=_0x1dfafd?this[_0x2b050e(0x38d)](0x1,!![]):0x0;return new Rectangle(_0x8d908d,_0x196c3d,_0x4842ce,_0x279bb4);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x438)]=Scene_Equip[_0x561d2e(0x1d9)]['createSlotWindow'],Scene_Equip['prototype'][_0x561d2e(0x21f)]=function(){const _0x1f1b02=_0x561d2e;VisuMZ[_0x1f1b02(0x12d)][_0x1f1b02(0x438)][_0x1f1b02(0x27d)](this),this[_0x1f1b02(0x27c)]()&&this[_0x1f1b02(0x329)]();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x1e7)]=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x1a3)],Scene_Equip[_0x561d2e(0x1d9)]['slotWindowRect']=function(){const _0x51cbc7=_0x561d2e;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['slotWindowRectItemsEquipsCore']():VisuMZ[_0x51cbc7(0x12d)][_0x51cbc7(0x1e7)][_0x51cbc7(0x27d)](this);},Scene_Equip['prototype']['slotWindowRectItemsEquipsCore']=function(){const _0x2372a8=_0x561d2e,_0x57002c=this[_0x2372a8(0x349)](),_0x2189a5=this[_0x2372a8(0x30f)]()?this['statusWidth']():0x0,_0x500775=_0x57002c['y']+_0x57002c[_0x2372a8(0x1c0)],_0x3ffd1d=Graphics[_0x2372a8(0x3a7)]-this[_0x2372a8(0x31e)](),_0x3681e7=this[_0x2372a8(0x1d8)]()-_0x57002c[_0x2372a8(0x1c0)];return new Rectangle(_0x2189a5,_0x500775,_0x3ffd1d,_0x3681e7);},VisuMZ['ItemsEquipsCore']['Scene_Equip_itemWindowRect']=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x354)],Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x354)]=function(){const _0x4f1a53=_0x561d2e;return this[_0x4f1a53(0x1df)]()?this[_0x4f1a53(0x1a3)]():VisuMZ['ItemsEquipsCore'][_0x4f1a53(0x277)]['call'](this);},Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x31e)]=function(){const _0x1b047d=_0x561d2e;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1b047d(0x42c)]():VisuMZ['ItemsEquipsCore'][_0x1b047d(0x3a5)][_0x1b047d(0x408)]['StatusWindowWidth'];},Scene_Equip[_0x561d2e(0x1d9)]['geUpdatedLayoutStatusWidth']=function(){const _0x42a6bb=_0x561d2e;return Math[_0x42a6bb(0x409)](Graphics[_0x42a6bb(0x3a7)]/0x2);},Scene_Equip[_0x561d2e(0x1d9)]['postCreateSlotWindowItemsEquipsCore']=function(){const _0x47fa15=_0x561d2e;this[_0x47fa15(0x13d)][_0x47fa15(0x2b9)](_0x47fa15(0x38a),this[_0x47fa15(0x42f)]['bind'](this)),this[_0x47fa15(0x13d)][_0x47fa15(0x2b9)](_0x47fa15(0x23a),this[_0x47fa15(0x234)]['bind'](this)),this[_0x47fa15(0x13d)][_0x47fa15(0x2b9)](_0x47fa15(0x411),this[_0x47fa15(0x273)][_0x47fa15(0x457)](this));},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x175)]=Scene_Equip['prototype'][_0x561d2e(0x3f6)],Scene_Equip[_0x561d2e(0x1d9)]['commandEquip']=function(){const _0x470f0a=_0x561d2e;this[_0x470f0a(0x27c)]()&&(this[_0x470f0a(0x24d)][_0x470f0a(0x302)](),this[_0x470f0a(0x24d)][_0x470f0a(0x1cd)]()),VisuMZ['ItemsEquipsCore'][_0x470f0a(0x175)][_0x470f0a(0x27d)](this);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x20b)]=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x152)],Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x152)]=function(){const _0x388842=_0x561d2e;this['_slotWindow'][_0x388842(0x463)]()>=0x0?(VisuMZ['ItemsEquipsCore'][_0x388842(0x20b)][_0x388842(0x27d)](this),this['onSlotOkAutoSelect']()):(this['_slotWindow'][_0x388842(0x142)](0x0),this[_0x388842(0x13d)][_0x388842(0x1dd)]());},Scene_Equip[_0x561d2e(0x1d9)]['onSlotOkAutoSelect']=function(){const _0xf0d4f1=_0x561d2e,_0x49dadf=this[_0xf0d4f1(0x13d)]['item'](),_0xbd346c=this[_0xf0d4f1(0x1c2)][_0xf0d4f1(0x289)][_0xf0d4f1(0x39f)](_0x49dadf),_0x474b26=Math[_0xf0d4f1(0x409)](this[_0xf0d4f1(0x1c2)][_0xf0d4f1(0x25c)]()/0x2)-0x1;this[_0xf0d4f1(0x1c2)][_0xf0d4f1(0x20f)](),this['_itemWindow'][_0xf0d4f1(0x142)](_0xbd346c>=0x0?_0xbd346c:0x0),this[_0xf0d4f1(0x1c2)]['setTopRow'](this[_0xf0d4f1(0x1c2)][_0xf0d4f1(0x463)]()-_0x474b26);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3cd)]=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x308)],Scene_Equip[_0x561d2e(0x1d9)]['onSlotCancel']=function(){const _0x4e8bc7=_0x561d2e;VisuMZ[_0x4e8bc7(0x12d)][_0x4e8bc7(0x3cd)][_0x4e8bc7(0x27d)](this),this[_0x4e8bc7(0x27c)]()&&(this['_commandWindow'][_0x4e8bc7(0x142)](0x0),this[_0x4e8bc7(0x13d)][_0x4e8bc7(0x1cd)]());},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2f2)]=Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x24a)],Scene_Equip[_0x561d2e(0x1d9)][_0x561d2e(0x24a)]=function(){const _0x27bb5e=_0x561d2e;VisuMZ[_0x27bb5e(0x12d)][_0x27bb5e(0x2f2)]['call'](this),this[_0x27bb5e(0x27c)]()&&(this[_0x27bb5e(0x24d)][_0x27bb5e(0x1cd)](),this[_0x27bb5e(0x24d)]['deselect'](),this[_0x27bb5e(0x13d)]['smoothSelect'](0x0),this[_0x27bb5e(0x13d)]['activate']());},Scene_Equip['prototype'][_0x561d2e(0x445)]=function(){const _0x3aeb36=_0x561d2e;if(!this[_0x3aeb36(0x13d)])return![];if(!this[_0x3aeb36(0x13d)][_0x3aeb36(0x2d2)])return![];return this[_0x3aeb36(0x13d)]['isShiftRemoveShortcutEnabled']();},Scene_Equip['prototype'][_0x561d2e(0x1c1)]=function(){const _0x61b871=_0x561d2e;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x61b871(0x343)](_0x61b871(0x428));return Scene_MenuBase['prototype'][_0x61b871(0x1c1)][_0x61b871(0x27d)](this);},Scene_Equip['prototype'][_0x561d2e(0x2ae)]=function(){const _0x3d113c=_0x561d2e;if(this['buttonAssistSlotWindowShift']())return VisuMZ[_0x3d113c(0x12d)][_0x3d113c(0x3a5)]['EquipScene'][_0x3d113c(0x12a)];return Scene_MenuBase['prototype'][_0x3d113c(0x2ae)][_0x3d113c(0x27d)](this);},Scene_Equip['prototype'][_0x561d2e(0x3fb)]=function(){const _0x1ec767=_0x561d2e;if(this[_0x1ec767(0x445)]())return this[_0x1ec767(0x276)][_0x1ec767(0x413)]/0x5/-0x3;return Scene_MenuBase['prototype'][_0x1ec767(0x3fb)][_0x1ec767(0x27d)](this);},VisuMZ['ItemsEquipsCore']['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x561d2e(0x1d9)][_0x561d2e(0x451)],Scene_Load[_0x561d2e(0x1d9)][_0x561d2e(0x451)]=function(){const _0xafb3b4=_0x561d2e;VisuMZ[_0xafb3b4(0x12d)][_0xafb3b4(0x1b3)][_0xafb3b4(0x27d)](this),this[_0xafb3b4(0x12f)]();},Scene_Load[_0x561d2e(0x1d9)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x2942d7=_0x561d2e;if($gameSystem[_0x2942d7(0x450)]()!==$dataSystem[_0x2942d7(0x450)])for(const _0x1cde48 of $gameActors[_0x2942d7(0x289)]){if(_0x1cde48)_0x1cde48[_0x2942d7(0x3de)]();}},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x370)]=function(){const _0x4420e9=_0x561d2e;if(ConfigManager[_0x4420e9(0x28c)]&&ConfigManager[_0x4420e9(0x346)]!==undefined)return ConfigManager[_0x4420e9(0x346)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x4420e9(0x172)](/LOWER/i);else Scene_MenuBase['prototype']['isRightInputMode'][_0x4420e9(0x27d)](this);}},Scene_Shop[_0x561d2e(0x1d9)]['isRightInputMode']=function(){const _0x187245=_0x561d2e;if(ConfigManager[_0x187245(0x28c)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x187245(0x223)];else{if(this[_0x187245(0x1df)]())return this['updatedLayoutStyle']()[_0x187245(0x172)](/RIGHT/i);else Scene_MenuBase['prototype'][_0x187245(0x30f)][_0x187245(0x27d)](this);}},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x395)]=function(){const _0x444297=_0x561d2e;return VisuMZ[_0x444297(0x12d)][_0x444297(0x3a5)][_0x444297(0x248)][_0x444297(0x3c0)];},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x3ac87b=_0x561d2e;return this[_0x3ac87b(0x195)]&&this[_0x3ac87b(0x195)][_0x3ac87b(0x27c)]();},Scene_Shop['prototype'][_0x561d2e(0x1df)]=function(){const _0x24d559=_0x561d2e;return VisuMZ[_0x24d559(0x12d)][_0x24d559(0x3a5)][_0x24d559(0x248)][_0x24d559(0x359)];},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x475)]=Scene_Shop[_0x561d2e(0x1d9)]['prepare'],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x2e6)]=function(_0x349178,_0x178852){const _0xeca522=_0x561d2e;_0x349178=JsonEx[_0xeca522(0x2a9)](_0x349178),VisuMZ['ItemsEquipsCore'][_0xeca522(0x475)][_0xeca522(0x27d)](this,_0x349178,_0x178852),this[_0xeca522(0x1da)]();},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1da)]=function(){const _0x1dbe46=_0x561d2e;this['_goodsCount']=0x0;for(const _0x3b3487 of this['_goods']){this['isGoodShown'](_0x3b3487)?this[_0x1dbe46(0x3b8)]++:_0x3b3487[0x0]=-0x1;}},Scene_Shop['prototype'][_0x561d2e(0x13a)]=function(_0x5444c7){const _0x47c0c1=_0x561d2e;if(_0x5444c7[0x0]>0x2||_0x5444c7[0x0]<0x0)return![];const _0x38dcbb=[$dataItems,$dataWeapons,$dataArmors][_0x5444c7[0x0]][_0x5444c7[0x1]];if(!_0x38dcbb)return![];const _0x501ec6=_0x38dcbb[_0x47c0c1(0x46b)]||'';if(_0x501ec6[_0x47c0c1(0x172)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27981f=JSON['parse']('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x513240 of _0x27981f){if(!$gameSwitches[_0x47c0c1(0x1f1)](_0x513240))return![];}return!![];}if(_0x501ec6[_0x47c0c1(0x172)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c14e5=JSON[_0x47c0c1(0x446)]('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x4ede4f of _0x4c14e5){if(!$gameSwitches[_0x47c0c1(0x1f1)](_0x4ede4f))return![];}return!![];}if(_0x501ec6['match'](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x245e81=JSON[_0x47c0c1(0x446)]('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x58afe2 of _0x245e81){if($gameSwitches['value'](_0x58afe2))return!![];}return![];}if(_0x501ec6[_0x47c0c1(0x172)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b99fd=JSON['parse']('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x10d4c9 of _0x4b99fd){if(!$gameSwitches[_0x47c0c1(0x1f1)](_0x10d4c9))return!![];}return![];}if(_0x501ec6[_0x47c0c1(0x172)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x146c3e=JSON[_0x47c0c1(0x446)]('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x2ff565 of _0x146c3e){if(!$gameSwitches[_0x47c0c1(0x1f1)](_0x2ff565))return!![];}return![];}if(_0x501ec6[_0x47c0c1(0x172)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34a4d3=JSON['parse']('['+RegExp['$1'][_0x47c0c1(0x172)](/\d+/g)+']');for(const _0x4c74e0 of _0x34a4d3){if($gameSwitches[_0x47c0c1(0x1f1)](_0x4c74e0))return![];}return!![];}return!![];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x1bd)]=Scene_Shop['prototype'][_0x561d2e(0x3ea)],Scene_Shop['prototype']['create']=function(){const _0xc6d1a2=_0x561d2e;VisuMZ[_0xc6d1a2(0x12d)][_0xc6d1a2(0x1bd)][_0xc6d1a2(0x27d)](this),this[_0xc6d1a2(0x1df)]()&&this[_0xc6d1a2(0x44a)](),this[_0xc6d1a2(0x353)]();},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x44a)]=function(){const _0x39c62a=_0x561d2e;this['_dummyWindow']['hide'](),this['_buyWindow']['show'](),this['_buyWindow'][_0x39c62a(0x302)](),this[_0x39c62a(0x312)][_0x39c62a(0x376)]();},Scene_Shop[_0x561d2e(0x1d9)]['helpWindowRect']=function(){const _0x3427ad=_0x561d2e;return this[_0x3427ad(0x1df)]()?this[_0x3427ad(0x225)]():Scene_MenuBase[_0x3427ad(0x1d9)][_0x3427ad(0x267)]['call'](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x225)]=function(){const _0x5c8c07=_0x561d2e,_0x3921db=0x0,_0x2ad267=this['helpAreaTop'](),_0x37059e=Graphics['boxWidth'],_0x4754f9=this[_0x5c8c07(0x1bc)]();return new Rectangle(_0x3921db,_0x2ad267,_0x37059e,_0x4754f9);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x196)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x309)],Scene_Shop[_0x561d2e(0x1d9)]['goldWindowRect']=function(){const _0x5e58d9=_0x561d2e;return this[_0x5e58d9(0x1df)]()?this[_0x5e58d9(0x41d)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_goldWindowRect'][_0x5e58d9(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x41d)]=function(){const _0x4338f2=_0x561d2e,_0x225ed5=this[_0x4338f2(0x33d)](),_0x5791ba=this[_0x4338f2(0x38d)](0x1,!![]),_0x4117e1=this[_0x4338f2(0x30f)]()?0x0:Graphics['boxWidth']-_0x225ed5,_0xe6d8ab=this[_0x4338f2(0x35b)]();return new Rectangle(_0x4117e1,_0xe6d8ab,_0x225ed5,_0x5791ba);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x16d)]=Scene_Shop['prototype'][_0x561d2e(0x349)],Scene_Shop[_0x561d2e(0x1d9)]['commandWindowRect']=function(){const _0x4f8533=_0x561d2e;return this[_0x4f8533(0x1df)]()?this[_0x4f8533(0x364)]():VisuMZ[_0x4f8533(0x12d)][_0x4f8533(0x16d)][_0x4f8533(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x364)]=function(){const _0x40bc91=_0x561d2e,_0x2e2bf6=this[_0x40bc91(0x30f)]()?this['mainCommandWidth']():0x0,_0x12e1f9=this[_0x40bc91(0x35b)](),_0x3e8729=Graphics['boxWidth']-this[_0x40bc91(0x33d)](),_0x22938e=this[_0x40bc91(0x38d)](0x1,!![]);return new Rectangle(_0x2e2bf6,_0x12e1f9,_0x3e8729,_0x22938e);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2e4)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x2d8)],Scene_Shop['prototype'][_0x561d2e(0x2d8)]=function(){const _0x1d90a9=_0x561d2e;return this[_0x1d90a9(0x1df)]()?this[_0x1d90a9(0x34f)]():VisuMZ[_0x1d90a9(0x12d)][_0x1d90a9(0x2e4)][_0x1d90a9(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x34f)]=function(){const _0x434be7=_0x561d2e,_0x1c2729=this[_0x434be7(0x24d)]['y']+this['_commandWindow'][_0x434be7(0x1c0)],_0x520520=Graphics[_0x434be7(0x3a7)]-this[_0x434be7(0x31e)](),_0x296398=this[_0x434be7(0x30f)]()?Graphics['boxWidth']-_0x520520:0x0,_0x51ee0d=this['mainAreaHeight']()-this['_commandWindow'][_0x434be7(0x1c0)];return new Rectangle(_0x296398,_0x1c2729,_0x520520,_0x51ee0d);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x415)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1b1)],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1b1)]=function(){const _0x43fb22=_0x561d2e;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x43fb22(0x2db)]():VisuMZ[_0x43fb22(0x12d)]['Scene_Shop_statusWindowRect'][_0x43fb22(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)]['statusWindowRectItemsEquipsCore']=function(){const _0x8de0f4=_0x561d2e,_0x36fb0f=this['statusWidth'](),_0x207ac6=this[_0x8de0f4(0x1d8)]()-this['_commandWindow'][_0x8de0f4(0x1c0)],_0x20e8f6=this['isRightInputMode']()?0x0:Graphics[_0x8de0f4(0x3a7)]-_0x36fb0f,_0x30f1b9=this['_commandWindow']['y']+this['_commandWindow'][_0x8de0f4(0x1c0)];return new Rectangle(_0x20e8f6,_0x30f1b9,_0x36fb0f,_0x207ac6);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x1ea)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x43e)],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x43e)]=function(){const _0x2470a7=_0x561d2e;return this[_0x2470a7(0x1df)]()?this[_0x2470a7(0x3f1)]():VisuMZ[_0x2470a7(0x12d)][_0x2470a7(0x1ea)][_0x2470a7(0x27d)](this);},Scene_Shop['prototype']['buyWindowRectItemsEquipsCore']=function(){const _0x34edbb=_0x561d2e,_0x37f320=this[_0x34edbb(0x24d)]['y']+this[_0x34edbb(0x24d)][_0x34edbb(0x1c0)],_0x2b2322=Graphics['boxWidth']-this[_0x34edbb(0x31e)](),_0x926f2e=this[_0x34edbb(0x1d8)]()-this[_0x34edbb(0x24d)][_0x34edbb(0x1c0)],_0x48d7af=this[_0x34edbb(0x30f)]()?Graphics['boxWidth']-_0x2b2322:0x0;return new Rectangle(_0x48d7af,_0x37f320,_0x2b2322,_0x926f2e);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x41a)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x238)],Scene_Shop[_0x561d2e(0x1d9)]['createCategoryWindow']=function(){const _0x4878ff=_0x561d2e;VisuMZ[_0x4878ff(0x12d)][_0x4878ff(0x41a)][_0x4878ff(0x27d)](this),this[_0x4878ff(0x27c)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x191)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1c5)],Scene_Shop['prototype'][_0x561d2e(0x1c5)]=function(){const _0x367e75=_0x561d2e;return this[_0x367e75(0x1df)]()?this[_0x367e75(0x389)]():VisuMZ[_0x367e75(0x12d)][_0x367e75(0x191)][_0x367e75(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x389)]=function(){const _0x10f24f=_0x561d2e,_0x3664d7=this[_0x10f24f(0x24d)]['y'],_0x35cce9=this['_commandWindow'][_0x10f24f(0x413)],_0xf9d989=this[_0x10f24f(0x38d)](0x1,!![]),_0x23d0ff=this[_0x10f24f(0x30f)]()?Graphics[_0x10f24f(0x3a7)]-_0x35cce9:0x0;return new Rectangle(_0x23d0ff,_0x3664d7,_0x35cce9,_0xf9d989);},Scene_Shop['prototype']['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x2001b4=_0x561d2e;delete this[_0x2001b4(0x195)][_0x2001b4(0x32a)]['ok'],delete this[_0x2001b4(0x195)][_0x2001b4(0x32a)][_0x2001b4(0x38a)];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x27e)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x255)],Scene_Shop['prototype'][_0x561d2e(0x255)]=function(){const _0xd01ea6=_0x561d2e;VisuMZ[_0xd01ea6(0x12d)][_0xd01ea6(0x27e)]['call'](this),this[_0xd01ea6(0x1df)]()&&this[_0xd01ea6(0x3b1)]();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x45d)]=Scene_Shop['prototype']['sellWindowRect'],Scene_Shop['prototype'][_0x561d2e(0x28d)]=function(){const _0x433d04=_0x561d2e;return this[_0x433d04(0x1df)]()?this['sellWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x433d04(0x45d)]['call'](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x25b)]=function(){const _0x3303e8=_0x561d2e,_0x143557=this[_0x3303e8(0x195)]['y']+this[_0x3303e8(0x195)][_0x3303e8(0x1c0)],_0x302c93=Graphics[_0x3303e8(0x3a7)]-this[_0x3303e8(0x31e)](),_0x396ded=this[_0x3303e8(0x1d8)]()-this[_0x3303e8(0x195)][_0x3303e8(0x1c0)],_0x11e0ef=this[_0x3303e8(0x30f)]()?Graphics['boxWidth']-_0x302c93:0x0;return new Rectangle(_0x11e0ef,_0x143557,_0x302c93,_0x396ded);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x3b1)]=function(){const _0x29e146=_0x561d2e;this[_0x29e146(0x161)][_0x29e146(0x253)](this[_0x29e146(0x312)]);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x31e)]=function(){const _0x1eb8c1=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x1eb8c1(0x3a5)][_0x1eb8c1(0x473)][_0x1eb8c1(0x176)];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x220)]=Scene_Shop['prototype']['activateSellWindow'],Scene_Shop['prototype']['activateSellWindow']=function(){const _0x4303a8=_0x561d2e;VisuMZ[_0x4303a8(0x12d)][_0x4303a8(0x220)][_0x4303a8(0x27d)](this),this[_0x4303a8(0x1df)]()&&this[_0x4303a8(0x312)][_0x4303a8(0x376)]();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x46c)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x21b)],Scene_Shop['prototype'][_0x561d2e(0x21b)]=function(){const _0x2fa2f8=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x2fa2f8(0x46c)][_0x2fa2f8(0x27d)](this),this[_0x2fa2f8(0x1df)]()&&this[_0x2fa2f8(0x3a8)]();},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x3a8)]=function(){const _0x32b885=_0x561d2e;this[_0x32b885(0x1ac)]=this[_0x32b885(0x1ac)]||0x0,this['_buyWindow'][_0x32b885(0x142)](this[_0x32b885(0x1ac)]);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x280)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1b6)],Scene_Shop[_0x561d2e(0x1d9)]['commandSell']=function(){const _0x33056c=_0x561d2e;VisuMZ['ItemsEquipsCore']['Scene_Shop_commandSell'][_0x33056c(0x27d)](this),this[_0x33056c(0x1df)]()&&this[_0x33056c(0x18c)](),this[_0x33056c(0x27c)]()&&(this['_categoryWindow']['smoothSelect'](0x0),this[_0x33056c(0x2f4)]());},Scene_Shop[_0x561d2e(0x1d9)]['commandSellItemsEquipsCore']=function(){const _0x973e91=_0x561d2e;this[_0x973e91(0x3ad)][_0x973e91(0x232)](),this[_0x973e91(0x24d)][_0x973e91(0x232)]();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x293)]=Scene_Shop[_0x561d2e(0x1d9)]['onBuyCancel'],Scene_Shop['prototype'][_0x561d2e(0x1a2)]=function(){const _0x595ec3=_0x561d2e;VisuMZ[_0x595ec3(0x12d)][_0x595ec3(0x293)][_0x595ec3(0x27d)](this),this[_0x595ec3(0x1df)]()&&this[_0x595ec3(0x340)]();},Scene_Shop['prototype'][_0x561d2e(0x340)]=function(){const _0x5a9150=_0x561d2e;this[_0x5a9150(0x1ac)]=this[_0x5a9150(0x3ad)][_0x5a9150(0x463)](),this[_0x5a9150(0x3ad)][_0x5a9150(0x376)](),this[_0x5a9150(0x3ad)][_0x5a9150(0x302)](),this[_0x5a9150(0x3ad)]['smoothScrollTo'](0x0,0x0),this[_0x5a9150(0x312)][_0x5a9150(0x376)](),this[_0x5a9150(0x37f)]['hide']();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x44c)]=Scene_Shop[_0x561d2e(0x1d9)]['onCategoryCancel'],Scene_Shop['prototype'][_0x561d2e(0x154)]=function(){const _0xea8aab=_0x561d2e;VisuMZ[_0xea8aab(0x12d)][_0xea8aab(0x44c)][_0xea8aab(0x27d)](this),this[_0xea8aab(0x1df)]()&&this[_0xea8aab(0x141)]();},Scene_Shop['prototype'][_0x561d2e(0x141)]=function(){const _0x37f30d=_0x561d2e;this[_0x37f30d(0x3ad)][_0x37f30d(0x376)](),this[_0x37f30d(0x24d)][_0x37f30d(0x376)]();},VisuMZ[_0x561d2e(0x12d)]['Scene_Shop_onSellOk']=Scene_Shop[_0x561d2e(0x1d9)]['onSellOk'],Scene_Shop[_0x561d2e(0x1d9)]['onSellOk']=function(){const _0x3a4c04=_0x561d2e;VisuMZ[_0x3a4c04(0x12d)][_0x3a4c04(0x3d4)][_0x3a4c04(0x27d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onSellOkItemsEquipsCore']();},Scene_Shop['prototype']['onSellOkItemsEquipsCore']=function(){const _0x97b89=_0x561d2e;this[_0x97b89(0x195)]['show']();},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2c5)]=Scene_Shop[_0x561d2e(0x1d9)]['onSellCancel'],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1f5)]=function(){const _0x36d745=_0x561d2e;VisuMZ[_0x36d745(0x12d)][_0x36d745(0x2c5)][_0x36d745(0x27d)](this),this[_0x36d745(0x27c)]()&&this[_0x36d745(0x154)](),this[_0x36d745(0x1df)]()&&this[_0x36d745(0x37f)][_0x36d745(0x232)]();},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x13e)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x18b)],Scene_Shop['prototype'][_0x561d2e(0x18b)]=function(){const _0x4379ea=_0x561d2e;let _0x29db57=this[_0x4379ea(0x344)]();const _0x1e54f4=this[_0x4379ea(0x123)];return _0x29db57=VisuMZ['ItemsEquipsCore'][_0x4379ea(0x3a5)][_0x4379ea(0x248)]['SellPriceJS'][_0x4379ea(0x27d)](this,_0x1e54f4,_0x29db57),_0x29db57;},Scene_Shop[_0x561d2e(0x1d9)]['determineBaseSellingPrice']=function(){const _0x56b9fd=_0x561d2e;if(!this['_item'])return 0x0;else{if(this[_0x56b9fd(0x123)][_0x56b9fd(0x46b)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x578ece=String(RegExp['$1']);let _0x3e970d=this['_item'],_0x27903b=_0x3e970d[_0x56b9fd(0x348)]*this[_0x56b9fd(0x1ce)]();try{eval(_0x578ece);}catch(_0x48a8c8){if($gameTemp[_0x56b9fd(0x1e2)]())console[_0x56b9fd(0x2eb)](_0x48a8c8);}if(isNaN(_0x27903b))_0x27903b=0x0;return Math['floor'](_0x27903b);}else return this[_0x56b9fd(0x123)]['note']['match'](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math['floor'](this['_item'][_0x56b9fd(0x348)]*this[_0x56b9fd(0x1ce)]());}},Scene_Shop['prototype'][_0x561d2e(0x1ce)]=function(){const _0x56c590=_0x561d2e;return VisuMZ[_0x56c590(0x12d)][_0x56c590(0x3a5)][_0x56c590(0x248)][_0x56c590(0x352)];},Scene_Shop['prototype'][_0x561d2e(0x471)]=function(){const _0x4a82e7=_0x561d2e;if(!this[_0x4a82e7(0x395)]())return![];if(!this[_0x4a82e7(0x27c)]())return![];if(!this[_0x4a82e7(0x161)])return![];if(!this[_0x4a82e7(0x161)][_0x4a82e7(0x2d2)])return![];return this[_0x4a82e7(0x395)]()&&this[_0x4a82e7(0x27c)]();},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x1fe)]=function(){const _0x234d6c=_0x561d2e;if(this['buttonAssistItemListRequirement']())return this[_0x234d6c(0x161)][_0x234d6c(0x2b5)]()===0x1?TextManager[_0x234d6c(0x207)](_0x234d6c(0x439),_0x234d6c(0x14d)):TextManager['getInputMultiButtonStrings'](_0x234d6c(0x411),_0x234d6c(0x23a));else{if(this[_0x234d6c(0x23c)]&&this['_numberWindow'][_0x234d6c(0x2d2)])return TextManager['getInputMultiButtonStrings'](_0x234d6c(0x439),'right');}return Scene_MenuBase[_0x234d6c(0x1d9)][_0x234d6c(0x1fe)]['call'](this);},Scene_Shop[_0x561d2e(0x1d9)]['buttonAssistKey2']=function(){const _0x2fb36d=_0x561d2e;if(this[_0x2fb36d(0x23c)]&&this[_0x2fb36d(0x23c)][_0x2fb36d(0x2d2)])return TextManager[_0x2fb36d(0x207)]('up',_0x2fb36d(0x3d1));return Scene_MenuBase['prototype'][_0x2fb36d(0x33e)][_0x2fb36d(0x27d)](this);},Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x251)]=function(){const _0x3a8943=_0x561d2e;if(this['buttonAssistItemListRequirement']())return VisuMZ['ItemsEquipsCore'][_0x3a8943(0x3a5)][_0x3a8943(0x19c)][_0x3a8943(0x20e)];else{if(this[_0x3a8943(0x23c)]&&this[_0x3a8943(0x23c)][_0x3a8943(0x2d2)])return VisuMZ[_0x3a8943(0x12d)]['Settings'][_0x3a8943(0x248)][_0x3a8943(0x203)];}return Scene_MenuBase['prototype']['buttonAssistText1']['call'](this);},Scene_Shop['prototype'][_0x561d2e(0x128)]=function(){const _0x161c89=_0x561d2e;if(this[_0x161c89(0x23c)]&&this['_numberWindow'][_0x161c89(0x2d2)])return VisuMZ[_0x161c89(0x12d)]['Settings'][_0x161c89(0x248)][_0x161c89(0x296)];return Scene_MenuBase[_0x161c89(0x1d9)][_0x161c89(0x128)][_0x161c89(0x27d)](this);},Scene_Shop['prototype'][_0x561d2e(0x353)]=function(){const _0x1ce934=_0x561d2e;if(!SceneManager[_0x1ce934(0x2ee)]())return;const _0x10d5cf=VisuMZ['ItemsEquipsCore']['Settings'][_0x1ce934(0x248)];_0x10d5cf[_0x1ce934(0x334)]&&$gameSwitches[_0x1ce934(0x444)](_0x10d5cf[_0x1ce934(0x334)],![]),_0x10d5cf[_0x1ce934(0x22c)]&&$gameSwitches[_0x1ce934(0x444)](_0x10d5cf[_0x1ce934(0x22c)],![]);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x1d3)]=Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x269)],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x269)]=function(_0x510c10){const _0xc8ceac=_0x561d2e;VisuMZ['ItemsEquipsCore']['Scene_Shop_doBuy'][_0xc8ceac(0x27d)](this,_0x510c10);if(_0x510c10<=0x0)return;const _0x3678f1=VisuMZ[_0xc8ceac(0x12d)][_0xc8ceac(0x3a5)][_0xc8ceac(0x248)];_0x3678f1[_0xc8ceac(0x334)]&&$gameSwitches[_0xc8ceac(0x444)](_0x3678f1[_0xc8ceac(0x334)],!![]);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3ba)]=Scene_Shop[_0x561d2e(0x1d9)]['doSell'],Scene_Shop[_0x561d2e(0x1d9)][_0x561d2e(0x23b)]=function(_0x4e360c){const _0x2d91f0=_0x561d2e;VisuMZ[_0x2d91f0(0x12d)][_0x2d91f0(0x3ba)][_0x2d91f0(0x27d)](this,_0x4e360c);if(_0x4e360c<=0x0)return;const _0x5a722b=VisuMZ[_0x2d91f0(0x12d)][_0x2d91f0(0x3a5)][_0x2d91f0(0x248)];_0x5a722b[_0x2d91f0(0x334)]&&$gameSwitches['setValue'](_0x5a722b['SwitchSell'],!![]);};function Sprite_NewLabel(){const _0xf67ffd=_0x561d2e;this[_0xf67ffd(0x26f)](...arguments);}Sprite_NewLabel[_0x561d2e(0x1d9)]=Object[_0x561d2e(0x3ea)](Sprite[_0x561d2e(0x1d9)]),Sprite_NewLabel[_0x561d2e(0x1d9)][_0x561d2e(0x3f4)]=Sprite_NewLabel,Sprite_NewLabel[_0x561d2e(0x1d9)][_0x561d2e(0x26f)]=function(){const _0x414a00=_0x561d2e;Sprite['prototype'][_0x414a00(0x26f)][_0x414a00(0x27d)](this),this[_0x414a00(0x456)]();},Sprite_NewLabel['prototype'][_0x561d2e(0x456)]=function(){const _0x141b97=_0x561d2e,_0x2ae9a6=ImageManager[_0x141b97(0x1be)],_0xe34dd1=ImageManager[_0x141b97(0x25d)];this[_0x141b97(0x38e)]=new Bitmap(_0x2ae9a6,_0xe34dd1),this[_0x141b97(0x1e0)](),this[_0x141b97(0x377)]();},Sprite_NewLabel[_0x561d2e(0x1d9)][_0x561d2e(0x1e0)]=function(){const _0x4e779f=_0x561d2e,_0x218619=VisuMZ[_0x4e779f(0x12d)][_0x4e779f(0x3a5)][_0x4e779f(0x1ed)][_0x4e779f(0x197)];if(_0x218619<=0x0)return;const _0x37848e=ImageManager[_0x4e779f(0x3bc)]('IconSet'),_0x394a4b=ImageManager['iconWidth'],_0x2e96ba=ImageManager['iconHeight'],_0x2554ce=_0x218619%0x10*_0x394a4b,_0x4502e6=Math['floor'](_0x218619/0x10)*_0x2e96ba;this['bitmap'][_0x4e779f(0x3fc)](_0x37848e,_0x2554ce,_0x4502e6,_0x394a4b,_0x2e96ba,0x0,0x0);},Sprite_NewLabel[_0x561d2e(0x1d9)][_0x561d2e(0x377)]=function(){const _0x102472=_0x561d2e,_0x58b256=VisuMZ[_0x102472(0x12d)][_0x102472(0x3a5)][_0x102472(0x1ed)],_0x284b6b=_0x58b256['Text'];if(_0x284b6b==='')return;const _0x5195b4=ImageManager[_0x102472(0x1be)],_0x5e3b28=ImageManager[_0x102472(0x25d)];this[_0x102472(0x38e)][_0x102472(0x341)]=_0x58b256[_0x102472(0x384)]||$gameSystem[_0x102472(0x40e)](),this[_0x102472(0x38e)][_0x102472(0x1a0)]=this[_0x102472(0x3c6)](),this[_0x102472(0x38e)][_0x102472(0x237)]=_0x58b256['FontSize'],this[_0x102472(0x38e)][_0x102472(0x271)](_0x284b6b,0x0,_0x5e3b28/0x2,_0x5195b4,_0x5e3b28/0x2,'center');},Sprite_NewLabel['prototype'][_0x561d2e(0x3c6)]=function(){const _0x55c17a=_0x561d2e,_0x16b5fb=VisuMZ[_0x55c17a(0x12d)][_0x55c17a(0x3a5)][_0x55c17a(0x1ed)][_0x55c17a(0x416)];return _0x16b5fb[_0x55c17a(0x172)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x16b5fb);},Window_Base[_0x561d2e(0x1d9)][_0x561d2e(0x158)]=function(_0x47d707,_0x4a981d,_0x27c23f,_0xc31187){const _0x3699b2=_0x561d2e;if(_0x47d707){const _0x335ff8=_0x27c23f+(this[_0x3699b2(0x28a)]()-ImageManager[_0x3699b2(0x25d)])/0x2,_0x740874=ImageManager['iconWidth']+0x4,_0x144d7d=Math['max'](0x0,_0xc31187-_0x740874);this[_0x3699b2(0x24c)](ColorManager[_0x3699b2(0x1fd)](_0x47d707)),this[_0x3699b2(0x130)](_0x47d707[_0x3699b2(0x140)],_0x4a981d,_0x335ff8),this[_0x3699b2(0x271)](_0x47d707[_0x3699b2(0x2fa)],_0x4a981d+_0x740874,_0x27c23f,_0x144d7d),this[_0x3699b2(0x1b4)]();}},Window_Base['prototype'][_0x561d2e(0x3be)]=function(_0x2a0d2e,_0x4540da,_0x519b7f,_0x5e9e73){const _0x56739b=_0x561d2e;if(this[_0x56739b(0x461)](_0x2a0d2e)){this[_0x56739b(0x157)]();const _0x244699=VisuMZ['ItemsEquipsCore']['Settings'][_0x56739b(0x19c)],_0x10c686=_0x244699[_0x56739b(0x42b)],_0x19c602=_0x10c686['format']($gameParty[_0x56739b(0x281)](_0x2a0d2e));this[_0x56739b(0x42a)][_0x56739b(0x237)]=_0x244699[_0x56739b(0x259)],this[_0x56739b(0x271)](_0x19c602,_0x4540da,_0x519b7f,_0x5e9e73,_0x56739b(0x14d)),this['resetFontSettings']();}},Window_Base[_0x561d2e(0x1d9)][_0x561d2e(0x461)]=function(_0x31e282){const _0x48a4b2=_0x561d2e;if(DataManager[_0x48a4b2(0x1f3)](_0x31e282))return $dataSystem[_0x48a4b2(0x342)];return!![];},Window_Base[_0x561d2e(0x1d9)][_0x561d2e(0x279)]=function(_0x28baf1,_0x1e9240,_0x2ca9c1,_0x435e46,_0x51459b){const _0x46c82a=_0x561d2e;_0x51459b=Math[_0x46c82a(0x419)](_0x51459b||0x1,0x1);while(_0x51459b--){_0x435e46=_0x435e46||this[_0x46c82a(0x28a)](),this[_0x46c82a(0x1f2)][_0x46c82a(0x37c)]=0xa0;const _0x247d09=ColorManager[_0x46c82a(0x386)]();this[_0x46c82a(0x1f2)]['fillRect'](_0x28baf1+0x1,_0x1e9240+0x1,_0x2ca9c1-0x2,_0x435e46-0x2,_0x247d09),this['contentsBack'][_0x46c82a(0x37c)]=0xff;}},VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']=Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x26f)],Window_Selectable['prototype'][_0x561d2e(0x26f)]=function(_0x847780){const _0x6efa0a=_0x561d2e;this[_0x6efa0a(0x325)](),VisuMZ[_0x6efa0a(0x12d)]['Window_Selectable_initialize']['call'](this,_0x847780);},Window_Selectable['prototype']['initNewLabelSprites']=function(){const _0x14b4ea=_0x561d2e;this['_newLabelSprites']={},this[_0x14b4ea(0x14b)]=0xff,this[_0x14b4ea(0x294)]=VisuMZ['ItemsEquipsCore'][_0x14b4ea(0x3a5)][_0x14b4ea(0x1ed)][_0x14b4ea(0x460)],this[_0x14b4ea(0x1ee)]=VisuMZ[_0x14b4ea(0x12d)][_0x14b4ea(0x3a5)][_0x14b4ea(0x1ed)][_0x14b4ea(0x362)];},Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x2f5)]=function(){return![];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3e3)]=Window_Selectable[_0x561d2e(0x1d9)]['setHelpWindowItem'],Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x347)]=function(_0x5c9aad){const _0x30c1f3=_0x561d2e;VisuMZ['ItemsEquipsCore']['Window_Selectable_setHelpWindowItem'][_0x30c1f3(0x27d)](this,_0x5c9aad);if(this[_0x30c1f3(0x2f5)]())this[_0x30c1f3(0x332)](_0x5c9aad);},Window_Selectable[_0x561d2e(0x1d9)]['clearNewLabelFromItem']=function(_0x1a232f){const _0x163b59=_0x561d2e;if(!_0x1a232f)return;$gameParty['clearNewItem'](_0x1a232f);let _0x2e687c='';if(DataManager[_0x163b59(0x20c)](_0x1a232f))_0x2e687c=_0x163b59(0x32b)[_0x163b59(0x39a)](_0x1a232f['id']);else{if(DataManager['isWeapon'](_0x1a232f))_0x2e687c=_0x163b59(0x399)[_0x163b59(0x39a)](_0x1a232f['id']);else{if(DataManager[_0x163b59(0x448)](_0x1a232f))_0x2e687c=_0x163b59(0x156)[_0x163b59(0x39a)](_0x1a232f['id']);else return;}}const _0x5460f5=this['_newLabelSprites'][_0x2e687c];if(_0x5460f5)_0x5460f5[_0x163b59(0x232)]();},VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh']=Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x20f)],Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x20f)]=function(){const _0x11ab05=_0x561d2e;this[_0x11ab05(0x12e)](),VisuMZ[_0x11ab05(0x12d)][_0x11ab05(0x3c7)][_0x11ab05(0x27d)](this);},Window_Selectable[_0x561d2e(0x1d9)][_0x561d2e(0x12e)]=function(){const _0x136848=_0x561d2e;for(const _0x7f8258 of Object['values'](this['_newLabelSprites'])){_0x7f8258[_0x136848(0x232)]();}},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x429)]=Window_Selectable['prototype'][_0x561d2e(0x254)],Window_Selectable['prototype']['update']=function(){const _0x3b1fdf=_0x561d2e;this[_0x3b1fdf(0x287)](),VisuMZ[_0x3b1fdf(0x12d)][_0x3b1fdf(0x429)][_0x3b1fdf(0x27d)](this);},Window_Selectable['prototype'][_0x561d2e(0x287)]=function(){const _0x5ea007=_0x561d2e;if(!this[_0x5ea007(0x2f5)]())return;const _0x112070=this[_0x5ea007(0x1ee)];this['_newLabelOpacity']+=this['_newLabelOpacityChange'];(this[_0x5ea007(0x14b)]>=_0x112070||this[_0x5ea007(0x14b)]<=0x0)&&(this[_0x5ea007(0x294)]*=-0x1);this[_0x5ea007(0x14b)]=this[_0x5ea007(0x14b)][_0x5ea007(0x284)](0x0,_0x112070);for(const _0x217414 of Object[_0x5ea007(0x36e)](this[_0x5ea007(0x390)])){_0x217414['opacity']=this[_0x5ea007(0x14b)];}},Window_Selectable['prototype']['createNewLabelSprite']=function(_0x4bd2f9){const _0x4e929a=_0x561d2e,_0x4b3327=this['_newLabelSprites'];if(_0x4b3327[_0x4bd2f9])return _0x4b3327[_0x4bd2f9];else{const _0x30c3d5=new Sprite_NewLabel();return _0x4b3327[_0x4bd2f9]=_0x30c3d5,this[_0x4e929a(0x38c)](_0x30c3d5),_0x30c3d5;}},Window_Selectable[_0x561d2e(0x1d9)]['placeNewLabel']=function(_0x22ff0b,_0x28a67e,_0x1f2823){const _0x2b48ac=_0x561d2e;let _0x18c07a='';if(DataManager[_0x2b48ac(0x20c)](_0x22ff0b))_0x18c07a='item-%1'[_0x2b48ac(0x39a)](_0x22ff0b['id']);else{if(DataManager[_0x2b48ac(0x42d)](_0x22ff0b))_0x18c07a='weapon-%1'[_0x2b48ac(0x39a)](_0x22ff0b['id']);else{if(DataManager[_0x2b48ac(0x448)](_0x22ff0b))_0x18c07a='armor-%1'['format'](_0x22ff0b['id']);else return;}}const _0x543710=this[_0x2b48ac(0x1ef)](_0x18c07a);_0x543710[_0x2b48ac(0x2e0)](_0x28a67e,_0x1f2823),_0x543710[_0x2b48ac(0x376)](),_0x543710[_0x2b48ac(0x2c6)]=this['_newLabelOpacity'];},Window_ItemCategory['categoryList']=VisuMZ['ItemsEquipsCore'][_0x561d2e(0x3a5)][_0x561d2e(0x1f0)][_0x561d2e(0x2cb)],Window_ItemCategory[_0x561d2e(0x1c4)]=[_0x561d2e(0x43a),_0x561d2e(0x32f),_0x561d2e(0x3b7),_0x561d2e(0x2c4),_0x561d2e(0x15b),_0x561d2e(0x2d6),_0x561d2e(0x1d0),_0x561d2e(0x129)],VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x222)]=Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x26f)],Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x26f)]=function(_0x72a434){const _0x275e3a=_0x561d2e;VisuMZ[_0x275e3a(0x12d)]['Window_ItemCategory_initialize'][_0x275e3a(0x27d)](this,_0x72a434),this['createCategoryNameWindow'](_0x72a434);},Window_ItemCategory['prototype']['createCategoryNameWindow']=function(_0x956c45){const _0x423c12=_0x561d2e,_0xd6bc54=new Rectangle(0x0,0x0,_0x956c45[_0x423c12(0x413)],_0x956c45['height']);this[_0x423c12(0x3a6)]=new Window_Base(_0xd6bc54),this[_0x423c12(0x3a6)][_0x423c12(0x2c6)]=0x0,this[_0x423c12(0x209)](this['_categoryNameWindow']),this[_0x423c12(0x29f)]();},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x109134=_0x561d2e;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x109134(0x1d9)][_0x109134(0x27c)]['call'](this);},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x46d)]=function(){},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x183)]=function(){const _0x2e9453=_0x561d2e;if(!this[_0x2e9453(0x27c)]())Window_HorzCommand[_0x2e9453(0x1d9)]['playOkSound']['call'](this);},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x2b5)]=function(){const _0x51f738=_0x561d2e;return this[_0x51f738(0x3a2)]?this[_0x51f738(0x3d8)]():0x4;},Window_ItemCategory['prototype'][_0x561d2e(0x254)]=function(){const _0x17265a=_0x561d2e;Window_HorzCommand[_0x17265a(0x1d9)]['update']['call'](this),this[_0x17265a(0x1c2)]&&this[_0x17265a(0x1c2)]['setCategory'](this[_0x17265a(0x1f8)]());},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x34e)]=function(){const _0x12e9ed=_0x561d2e;if(this[_0x12e9ed(0x27b)]()){const _0x404fbe=this['index']();if(this[_0x12e9ed(0x1c2)]&&this[_0x12e9ed(0x1c2)][_0x12e9ed(0x2b5)]()<=0x1)Input[_0x12e9ed(0x19b)](_0x12e9ed(0x14d))&&this['cursorRight'](Input[_0x12e9ed(0x406)](_0x12e9ed(0x14d))),Input[_0x12e9ed(0x19b)]('left')&&this[_0x12e9ed(0x18e)](Input[_0x12e9ed(0x406)]('left'));else this[_0x12e9ed(0x1c2)]&&this[_0x12e9ed(0x1c2)][_0x12e9ed(0x2b5)]()>0x1&&(Input[_0x12e9ed(0x19b)](_0x12e9ed(0x23a))&&!Input['isPressed']('shift')&&this[_0x12e9ed(0x3eb)](Input[_0x12e9ed(0x406)](_0x12e9ed(0x23a))),Input[_0x12e9ed(0x19b)](_0x12e9ed(0x411))&&!Input[_0x12e9ed(0x2ef)](_0x12e9ed(0x428))&&this[_0x12e9ed(0x18e)](Input[_0x12e9ed(0x406)](_0x12e9ed(0x411))));this[_0x12e9ed(0x463)]()!==_0x404fbe&&this[_0x12e9ed(0x357)]();}},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x30c)]=function(){const _0x222c44=_0x561d2e;if(this[_0x222c44(0x27c)]())return;Window_HorzCommand['prototype']['processHandling'][_0x222c44(0x27d)](this);},Window_ItemCategory['prototype'][_0x561d2e(0x1ad)]=function(){const _0x3ad87f=_0x561d2e;return this[_0x3ad87f(0x27c)]()?![]:Window_HorzCommand[_0x3ad87f(0x1d9)]['isHoverEnabled'][_0x3ad87f(0x27d)](this);},Window_ItemCategory['prototype'][_0x561d2e(0x3dc)]=function(){const _0x386653=_0x561d2e;if(this[_0x386653(0x426)]()){TouchInput[_0x386653(0x406)]()&&this[_0x386653(0x458)](!![]);if(TouchInput[_0x386653(0x3bd)]())this['onTouchOk']();else TouchInput['isCancelled']()&&this[_0x386653(0x3f3)]();}},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x458)]=function(_0xd81ac5){const _0x1d4328=_0x561d2e;this[_0x1d4328(0x27c)]()?this['onTouchSelectModern'](!![]):Window_HorzCommand[_0x1d4328(0x1d9)][_0x1d4328(0x458)][_0x1d4328(0x27d)](this,_0xd81ac5);},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x185)]=function(_0x1c1f89){const _0x13d3fc=_0x561d2e;this['_doubleTouch']=![];if(this[_0x13d3fc(0x27b)]()){const _0x22ad15=this['index'](),_0x47d79b=this[_0x13d3fc(0x310)]();_0x47d79b>=0x0&&_0x47d79b!==this[_0x13d3fc(0x463)]()&&this['select'](_0x47d79b),_0x1c1f89&&this[_0x13d3fc(0x463)]()!==_0x22ad15&&this[_0x13d3fc(0x357)]();}},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x24e)]=function(){const _0x189c77=_0x561d2e;for(const _0x46d37e of Window_ItemCategory[_0x189c77(0x2c9)]){this[_0x189c77(0x2af)](_0x46d37e);}this[_0x189c77(0x2e3)](this[_0x189c77(0x463)]());},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x2af)]=function(_0x25c3aa){const _0x4b75ec=_0x561d2e,_0x54f5be=_0x25c3aa[_0x4b75ec(0x136)],_0x57f8fd=_0x25c3aa[_0x4b75ec(0x197)],_0x112661=_0x25c3aa['SwitchID']||0x0;if(_0x112661>0x0&&!$gameSwitches[_0x4b75ec(0x1f1)](_0x112661))return;let _0x598d94='',_0x12a018=_0x4b75ec(0x328),_0x520089=_0x54f5be;if(_0x54f5be[_0x4b75ec(0x172)](/Category:(.*)/i))_0x598d94=String(RegExp['$1'])[_0x4b75ec(0x1bf)]();else{if(Window_ItemCategory[_0x4b75ec(0x1c4)][_0x4b75ec(0x198)](_0x54f5be))_0x598d94=VisuMZ[_0x4b75ec(0x12d)][_0x4b75ec(0x3a5)][_0x4b75ec(0x1f0)][_0x54f5be];else{if([_0x4b75ec(0x252),'RegularItems']['includes'](_0x54f5be))_0x598d94=TextManager['item'];else{if(_0x54f5be===_0x4b75ec(0x226))_0x598d94=TextManager[_0x4b75ec(0x167)];else{if(_0x54f5be===_0x4b75ec(0x190))_0x598d94=TextManager[_0x4b75ec(0x2d9)];else{if(_0x54f5be==='AllArmors')_0x598d94=TextManager[_0x4b75ec(0x455)];else{if(_0x54f5be['match'](/WTYPE:(\d+)/i))_0x598d94=$dataSystem[_0x4b75ec(0x1d6)][Number(RegExp['$1'])]||'';else{if(_0x54f5be[_0x4b75ec(0x172)](/ATYPE:(\d+)/i))_0x598d94=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';else _0x54f5be[_0x4b75ec(0x172)](/ETYPE:(\d+)/i)&&(_0x598d94=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x57f8fd>0x0&&this[_0x4b75ec(0x260)]()!=='text'&&(_0x598d94=_0x4b75ec(0x3f2)[_0x4b75ec(0x39a)](_0x57f8fd,_0x598d94)),this[_0x4b75ec(0x417)](_0x598d94,_0x12a018,!![],_0x520089);},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x1f7)]=function(){const _0x5cea32=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x5cea32(0x3a5)]['Categories'][_0x5cea32(0x339)];},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x229)]=function(_0x1a592c){const _0x2d72aa=_0x561d2e,_0x3c650b=this[_0x2d72aa(0x29a)](_0x1a592c);if(_0x3c650b===_0x2d72aa(0x46f))this['drawItemStyleIconText'](_0x1a592c);else _0x3c650b===_0x2d72aa(0x127)?this[_0x2d72aa(0x1f4)](_0x1a592c):Window_HorzCommand[_0x2d72aa(0x1d9)][_0x2d72aa(0x229)][_0x2d72aa(0x27d)](this,_0x1a592c);},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x260)]=function(){const _0x51a8fb=_0x561d2e;return VisuMZ[_0x51a8fb(0x12d)][_0x51a8fb(0x3a5)][_0x51a8fb(0x1f0)][_0x51a8fb(0x306)];},Window_ItemCategory['prototype'][_0x561d2e(0x29a)]=function(_0xdf7115){const _0x34d134=_0x561d2e;if(_0xdf7115<0x0)return _0x34d134(0x256);const _0x42b66e=this[_0x34d134(0x260)]();if(_0x42b66e!==_0x34d134(0x381))return _0x42b66e;else{const _0x472be6=this[_0x34d134(0x125)](_0xdf7115);if(_0x472be6[_0x34d134(0x172)](/\\I\[(\d+)\]/i)){const _0x50bdf9=this['itemLineRect'](_0xdf7115),_0x1e093c=this['textSizeEx'](_0x472be6)[_0x34d134(0x413)];return _0x1e093c<=_0x50bdf9[_0x34d134(0x413)]?_0x34d134(0x46f):'icon';}else return _0x34d134(0x256);}},Window_ItemCategory['prototype'][_0x561d2e(0x205)]=function(_0x1c02e5){const _0x2bcd73=_0x561d2e,_0x264118=this[_0x2bcd73(0x31b)](_0x1c02e5),_0x46a249=this['commandName'](_0x1c02e5),_0x2ffc44=this[_0x2bcd73(0x144)](_0x46a249)[_0x2bcd73(0x413)];this['changePaintOpacity'](this[_0x2bcd73(0x36a)](_0x1c02e5));const _0x54b95a=this[_0x2bcd73(0x1f7)]();if(_0x54b95a==='right')this[_0x2bcd73(0x45a)](_0x46a249,_0x264118['x']+_0x264118['width']-_0x2ffc44,_0x264118['y'],_0x2ffc44);else{if(_0x54b95a===_0x2bcd73(0x33a)){const _0x1460d4=_0x264118['x']+Math[_0x2bcd73(0x409)]((_0x264118[_0x2bcd73(0x413)]-_0x2ffc44)/0x2);this['drawTextEx'](_0x46a249,_0x1460d4,_0x264118['y'],_0x2ffc44);}else this[_0x2bcd73(0x45a)](_0x46a249,_0x264118['x'],_0x264118['y'],_0x2ffc44);}},Window_ItemCategory['prototype'][_0x561d2e(0x1f4)]=function(_0x39db7a){const _0x57031c=_0x561d2e,_0x73945d=this[_0x57031c(0x125)](_0x39db7a);if(_0x73945d['match'](/\\I\[(\d+)\]/i)){const _0x4b0d11=Number(RegExp['$1'])||0x0,_0x39ec86=this[_0x57031c(0x31b)](_0x39db7a),_0x493e5e=_0x39ec86['x']+Math[_0x57031c(0x409)]((_0x39ec86[_0x57031c(0x413)]-ImageManager['iconWidth'])/0x2),_0x5935ad=_0x39ec86['y']+(_0x39ec86[_0x57031c(0x1c0)]-ImageManager[_0x57031c(0x25d)])/0x2;this[_0x57031c(0x130)](_0x4b0d11,_0x493e5e,_0x5935ad);}},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x338)]=Window_ItemCategory[_0x561d2e(0x1d9)]['setItemWindow'],Window_ItemCategory['prototype']['setItemWindow']=function(_0x202d0f){const _0x4b57b0=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x4b57b0(0x338)][_0x4b57b0(0x27d)](this,_0x202d0f),_0x202d0f[_0x4b57b0(0x195)]=this;},Window_ItemCategory[_0x561d2e(0x1d9)][_0x561d2e(0x401)]=function(){const _0x137acc=_0x561d2e;Window_HorzCommand[_0x137acc(0x1d9)][_0x137acc(0x401)][_0x137acc(0x27d)](this);if(this[_0x137acc(0x3a6)])this[_0x137acc(0x29f)]();},Window_ItemCategory['prototype'][_0x561d2e(0x29f)]=function(){const _0x2f2238=_0x561d2e,_0x7e10f2=this[_0x2f2238(0x3a6)];_0x7e10f2[_0x2f2238(0x42a)][_0x2f2238(0x34d)]();const _0x75c4aa=this[_0x2f2238(0x29a)](this['index']());if(_0x75c4aa===_0x2f2238(0x127)){const _0xb83381=this[_0x2f2238(0x31b)](this[_0x2f2238(0x463)]());let _0x48ff4a=this[_0x2f2238(0x125)](this['index']());_0x48ff4a=_0x48ff4a[_0x2f2238(0x246)](/\\I\[(\d+)\]/gi,''),_0x7e10f2[_0x2f2238(0x157)](),this[_0x2f2238(0x1b7)](_0x48ff4a,_0xb83381),this[_0x2f2238(0x467)](_0x48ff4a,_0xb83381),this[_0x2f2238(0x2b6)](_0x48ff4a,_0xb83381);}},Window_ItemCategory[_0x561d2e(0x1d9)]['categoryNameWindowDrawBackground']=function(_0x429e43,_0x2f8e65){},Window_ItemCategory[_0x561d2e(0x1d9)]['categoryNameWindowDrawText']=function(_0x134a60,_0x1f8fc8){const _0x41038e=_0x561d2e,_0x45be50=this[_0x41038e(0x3a6)];_0x45be50[_0x41038e(0x271)](_0x134a60,0x0,_0x1f8fc8['y'],_0x45be50['innerWidth'],_0x41038e(0x33a));},Window_ItemCategory['prototype'][_0x561d2e(0x2b6)]=function(_0x2bf314,_0x1ee4bd){const _0x3fad18=_0x561d2e,_0x4f0350=this[_0x3fad18(0x3a6)],_0x4490a6=$gameSystem['windowPadding'](),_0x36fc3e=_0x1ee4bd['x']+Math[_0x3fad18(0x409)](_0x1ee4bd[_0x3fad18(0x413)]/0x2)+_0x4490a6;_0x4f0350['x']=_0x4f0350['width']/-0x2+_0x36fc3e,_0x4f0350['y']=Math[_0x3fad18(0x409)](_0x1ee4bd[_0x3fad18(0x1c0)]/0x2);},Window_ItemList['prototype']['processCursorMoveModernControls']=function(){const _0x315b7e=_0x561d2e;if(this['isCursorMovable']()){const _0x19baf8=this[_0x315b7e(0x463)]();if(this[_0x315b7e(0x2b5)]()<=0x1)!this[_0x315b7e(0x414)](_0x315b7e(0x23a))&&Input[_0x315b7e(0x406)]('pagedown')&&this[_0x315b7e(0x228)](),!this[_0x315b7e(0x414)]('pageup')&&Input[_0x315b7e(0x406)](_0x315b7e(0x411))&&this[_0x315b7e(0x3cc)]();else this['maxCols']()>0x1&&(Input[_0x315b7e(0x19b)](_0x315b7e(0x14d))&&this[_0x315b7e(0x3eb)](Input[_0x315b7e(0x406)](_0x315b7e(0x14d))),Input[_0x315b7e(0x19b)](_0x315b7e(0x439))&&this['cursorLeft'](Input['isTriggered'](_0x315b7e(0x439))),this[_0x315b7e(0x1e5)]()?(Input[_0x315b7e(0x406)](_0x315b7e(0x23a))&&Input[_0x315b7e(0x2ef)]('shift')&&this['cursorPagedown'](),Input[_0x315b7e(0x406)]('pageup')&&Input[_0x315b7e(0x2ef)](_0x315b7e(0x428))&&this[_0x315b7e(0x3cc)]()):(Input[_0x315b7e(0x406)](_0x315b7e(0x23a))&&this['cursorPagedown'](),Input[_0x315b7e(0x406)](_0x315b7e(0x411))&&this[_0x315b7e(0x3cc)]()));Input[_0x315b7e(0x19b)](_0x315b7e(0x3d1))&&(Input[_0x315b7e(0x2ef)](_0x315b7e(0x428))&&this[_0x315b7e(0x148)]()?this[_0x315b7e(0x228)]():this[_0x315b7e(0x26b)](Input[_0x315b7e(0x406)](_0x315b7e(0x3d1)))),Input[_0x315b7e(0x19b)]('up')&&(Input[_0x315b7e(0x2ef)]('shift')&&this[_0x315b7e(0x148)]()?this['cursorPageup']():this['cursorUp'](Input[_0x315b7e(0x406)]('up'))),Imported['VisuMZ_0_CoreEngine']&&this[_0x315b7e(0x46d)](),this[_0x315b7e(0x463)]()!==_0x19baf8&&this[_0x315b7e(0x357)]();}},Window_ItemList['prototype']['limitedPageUpDownSceneCheck']=function(){const _0x5ed662=_0x561d2e,_0x5a01c=SceneManager[_0x5ed662(0x16a)],_0x20de1a=[Scene_Item,Scene_Shop];return _0x20de1a[_0x5ed662(0x198)](_0x5a01c[_0x5ed662(0x3f4)]);},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x1dd)]=function(){const _0x14c8d5=_0x561d2e;Window_Selectable[_0x14c8d5(0x1d9)][_0x14c8d5(0x1dd)][_0x14c8d5(0x27d)](this),this['_categoryWindow']&&this[_0x14c8d5(0x195)][_0x14c8d5(0x27c)]()&&this[_0x14c8d5(0x195)][_0x14c8d5(0x1dd)]();},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x1cd)]=function(){const _0x1d48a2=_0x561d2e;Window_Selectable[_0x1d48a2(0x1d9)][_0x1d48a2(0x1cd)][_0x1d48a2(0x27d)](this),this[_0x1d48a2(0x195)]&&this[_0x1d48a2(0x195)][_0x1d48a2(0x27c)]()&&this[_0x1d48a2(0x195)][_0x1d48a2(0x1cd)]();},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x2fb)]=function(_0x4cfb58){const _0x435f38=_0x561d2e;this[_0x435f38(0x1fb)]!==_0x4cfb58&&(this[_0x435f38(0x1fb)]=_0x4cfb58,this[_0x435f38(0x20f)](),this['_categoryWindow']&&this['_categoryWindow'][_0x435f38(0x27c)]()?this['smoothSelect'](0x0):this['scrollTo'](0x0,0x0));},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x19f)]=Window_ItemList[_0x561d2e(0x1d9)]['maxCols'],Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x2b5)]=function(){const _0x1c4186=_0x561d2e;if(SceneManager[_0x1c4186(0x16a)][_0x1c4186(0x3f4)]===Scene_Battle)return VisuMZ['ItemsEquipsCore'][_0x1c4186(0x19f)][_0x1c4186(0x27d)](this);else return SceneManager[_0x1c4186(0x16a)][_0x1c4186(0x3f4)]===Scene_Map?VisuMZ[_0x1c4186(0x12d)]['Window_ItemList_maxCols'][_0x1c4186(0x27d)](this):VisuMZ[_0x1c4186(0x12d)][_0x1c4186(0x3a5)][_0x1c4186(0x19c)][_0x1c4186(0x3b3)];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3c1)]=Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x1c6)],Window_ItemList[_0x561d2e(0x1d9)]['colSpacing']=function(){const _0x19c7f7=_0x561d2e;return this['maxCols']()<=0x1?Window_Selectable[_0x19c7f7(0x1d9)][_0x19c7f7(0x1c6)][_0x19c7f7(0x27d)](this):VisuMZ[_0x19c7f7(0x12d)][_0x19c7f7(0x3c1)][_0x19c7f7(0x27d)](this);},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x198)]=function(_0x4ed5af){const _0x40170a=_0x561d2e;switch(this['_category']){case _0x40170a(0x252):return DataManager['isItem'](_0x4ed5af);case _0x40170a(0x3d5):return DataManager['isItem'](_0x4ed5af)&&_0x4ed5af['itypeId']===0x1;case _0x40170a(0x226):return DataManager['isItem'](_0x4ed5af)&&_0x4ed5af['itypeId']===0x2;case _0x40170a(0x43a):return DataManager['isItem'](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x2ed)]===0x3;case _0x40170a(0x32f):return DataManager['isItem'](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x2ed)]===0x4;case'Consumable':return DataManager[_0x40170a(0x20c)](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x32e)];case'Nonconsumable':return DataManager[_0x40170a(0x20c)](_0x4ed5af)&&!_0x4ed5af[_0x40170a(0x32e)];case'AlwaysUsable':return DataManager['isItem'](_0x4ed5af)&&[0x0][_0x40170a(0x198)](_0x4ed5af['occasion']);case _0x40170a(0x2d6):return DataManager[_0x40170a(0x20c)](_0x4ed5af)&&[0x0,0x1]['includes'](_0x4ed5af['occasion']);case _0x40170a(0x1d0):return DataManager[_0x40170a(0x20c)](_0x4ed5af)&&[0x0,0x2][_0x40170a(0x198)](_0x4ed5af[_0x40170a(0x143)]);case'NeverUsable':return DataManager[_0x40170a(0x20c)](_0x4ed5af)&&[0x3]['includes'](_0x4ed5af['occasion']);case _0x40170a(0x190):return DataManager[_0x40170a(0x42d)](_0x4ed5af);case _0x40170a(0x3bb):return DataManager[_0x40170a(0x448)](_0x4ed5af);default:if(this[_0x40170a(0x1fb)][_0x40170a(0x172)](/WTYPE:(\d+)/i))return DataManager[_0x40170a(0x42d)](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x2bc)]===Number(RegExp['$1']);else{if(this['_category'][_0x40170a(0x172)](/WTYPE:(.*)/i)){const _0x1ab357=$dataSystem[_0x40170a(0x1d6)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x40170a(0x42d)](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x2bc)]===_0x1ab357;}else{if(this[_0x40170a(0x1fb)]['match'](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x35c)]===Number(RegExp['$1']);else{if(this['_category'][_0x40170a(0x172)](/ATYPE:(.*)/i)){const _0x304b44=$dataSystem[_0x40170a(0x2f9)]['indexOf'](String(RegExp['$1'])[_0x40170a(0x1bf)]());return DataManager[_0x40170a(0x448)](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x35c)]===_0x304b44;}else{if(this['_category']['match'](/ETYPE:(\d+)/i))return!!_0x4ed5af&&_0x4ed5af['etypeId']===Number(RegExp['$1']);else{if(this[_0x40170a(0x1fb)][_0x40170a(0x172)](/ETYPE:(.*)/i)){const _0x30ba6d=$dataSystem[_0x40170a(0x393)]['indexOf'](String(RegExp['$1'])[_0x40170a(0x1bf)]());return DataManager[_0x40170a(0x448)](_0x4ed5af)&&_0x4ed5af[_0x40170a(0x147)]===_0x30ba6d;}else{if(this[_0x40170a(0x1fb)][_0x40170a(0x172)](/Category:(.*)/i))return!!_0x4ed5af&&_0x4ed5af['categories']['includes'](String(RegExp['$1'])['toUpperCase']()[_0x40170a(0x1bf)]());}}}}}}}return![];},Window_ItemList['prototype']['isShowNew']=function(){return!![];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x168)]=Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x229)],Window_ItemList[_0x561d2e(0x1d9)]['drawItem']=function(_0x2f46cf){const _0x15a4aa=_0x561d2e;VisuMZ[_0x15a4aa(0x12d)][_0x15a4aa(0x168)]['call'](this,_0x2f46cf),this[_0x15a4aa(0x2bb)](_0x2f46cf);},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x3be)]=function(_0x17ef39,_0x1f11e9,_0x4434b5,_0x55d2f9){const _0x5aa1b5=_0x561d2e;Window_Selectable['prototype'][_0x5aa1b5(0x3be)][_0x5aa1b5(0x27d)](this,_0x17ef39,_0x1f11e9,_0x4434b5,_0x55d2f9);},Window_ItemList[_0x561d2e(0x1d9)][_0x561d2e(0x2bb)]=function(_0x291545){const _0x1e70dc=_0x561d2e,_0x3184b6=this[_0x1e70dc(0x131)](_0x291545);if(!_0x3184b6||!this['isShowNew']())return;if(!$gameParty[_0x1e70dc(0x307)](_0x3184b6))return;const _0x80d9a6=this[_0x1e70dc(0x31b)](_0x291545),_0xb25a98=_0x80d9a6['x'],_0x5ae526=_0x80d9a6['y']+(this['lineHeight']()-ImageManager[_0x1e70dc(0x25d)])/0x2,_0x467103=VisuMZ[_0x1e70dc(0x12d)]['Settings'][_0x1e70dc(0x1ed)][_0x1e70dc(0x2d3)],_0x1ed10a=VisuMZ['ItemsEquipsCore']['Settings']['New'][_0x1e70dc(0x474)];this['placeNewLabel'](_0x3184b6,_0xb25a98+_0x467103,_0x5ae526+_0x1ed10a);},Window_ItemList['prototype'][_0x561d2e(0x253)]=function(_0x21ba0d){const _0x5197f0=_0x561d2e;this[_0x5197f0(0x312)]=_0x21ba0d,this[_0x5197f0(0x401)]();},VisuMZ[_0x561d2e(0x12d)]['Window_ItemList_updateHelp']=Window_ItemList['prototype'][_0x561d2e(0x1ab)],Window_ItemList['prototype'][_0x561d2e(0x1ab)]=function(){const _0x559a94=_0x561d2e;VisuMZ[_0x559a94(0x12d)][_0x559a94(0x35f)][_0x559a94(0x27d)](this),this[_0x559a94(0x312)]&&this[_0x559a94(0x312)][_0x559a94(0x3f4)]===Window_ShopStatus&&this[_0x559a94(0x312)][_0x559a94(0x34a)](this[_0x559a94(0x17a)]());},Window_BattleItem[_0x561d2e(0x1d9)]['isEnabled']=function(_0x5c858d){const _0x4ba8ef=_0x561d2e;return BattleManager['actor']()?BattleManager[_0x4ba8ef(0x2e9)]()[_0x4ba8ef(0x46a)](_0x5c858d):Window_ItemList[_0x4ba8ef(0x1d9)][_0x4ba8ef(0x290)][_0x4ba8ef(0x27d)](this,_0x5c858d);},Window_EventItem[_0x561d2e(0x1d9)][_0x561d2e(0x2f5)]=function(){return![];},Window_EquipStatus[_0x561d2e(0x1d9)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x23a15c=_0x561d2e;return VisuMZ[_0x23a15c(0x12d)][_0x23a15c(0x3a5)][_0x23a15c(0x408)][_0x23a15c(0x359)];},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x1ca)]=Window_EquipStatus['prototype'][_0x561d2e(0x20f)],Window_EquipStatus[_0x561d2e(0x1d9)]['refresh']=function(){const _0xfe742f=_0x561d2e;this['hideAdditionalSprites'](),this['resetFontSettings']();if(this['_actor'])this[_0xfe742f(0x3a3)][_0xfe742f(0x20f)]();this[_0xfe742f(0x1df)]()?this[_0xfe742f(0x44e)]():VisuMZ['ItemsEquipsCore'][_0xfe742f(0x1ca)][_0xfe742f(0x27d)](this);},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x44e)]=function(){const _0x45f986=_0x561d2e;this['contents']['clear']();if(!this[_0x45f986(0x3a3)])return;if(this[_0x45f986(0x2c2)]()){const _0x2d8778=ImageManager[_0x45f986(0x37b)](this[_0x45f986(0x3a3)][_0x45f986(0x3c3)]());_0x2d8778[_0x45f986(0x330)](this[_0x45f986(0x472)][_0x45f986(0x457)](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2c2)]=function(){const _0x2d7838=_0x561d2e;return Imported[_0x2d7838(0x292)]&&this[_0x2d7838(0x3a3)][_0x2d7838(0x3c3)]()!==''&&VisuMZ[_0x2d7838(0x12d)]['Settings']['EquipScene'][_0x2d7838(0x26a)];},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x472)]=function(){const _0x12c2ab=_0x561d2e;VisuMZ[_0x12c2ab(0x12d)][_0x12c2ab(0x3a5)]['EquipScene']['DrawPortraitJS'][_0x12c2ab(0x27d)](this),this[_0x12c2ab(0x26e)]();},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x30b)]=function(){const _0x4a592e=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x4a592e(0x3a5)][_0x4a592e(0x408)][_0x4a592e(0x427)][_0x4a592e(0x27d)](this),this[_0x4a592e(0x26e)]();},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x26e)]=function(){const _0x52848c=_0x561d2e;this[_0x52848c(0x157)](),VisuMZ[_0x52848c(0x12d)][_0x52848c(0x3a5)]['EquipScene'][_0x52848c(0x356)]['call'](this);},Window_EquipStatus[_0x561d2e(0x1d9)]['drawItemActorMenuImage']=function(_0x4528a4,_0x508949,_0x13331c,_0x29196a,_0x20da10){const _0x50002a=_0x561d2e,_0x47f2cf=ImageManager[_0x50002a(0x37b)](_0x4528a4[_0x50002a(0x3c3)]()),_0x14e845=this[_0x50002a(0x3fd)]-_0x47f2cf[_0x50002a(0x413)];_0x508949+=_0x14e845/0x2;if(_0x14e845<0x0)_0x29196a-=_0x14e845;Window_StatusBase[_0x50002a(0x1d9)][_0x50002a(0x33f)]['call'](this,_0x4528a4,_0x508949,_0x13331c,_0x29196a,_0x20da10);},Window_EquipStatus[_0x561d2e(0x1d9)]['actorParams']=function(){const _0x36e81b=_0x561d2e;return Imported[_0x36e81b(0x13f)]?VisuMZ[_0x36e81b(0x3a4)][_0x36e81b(0x3a5)]['Param'][_0x36e81b(0x2e7)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x561d2e(0x1d9)]['paramValueFontSize']=function(){const _0x39a6bf=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x39a6bf(0x3a5)][_0x39a6bf(0x408)]['ParamValueFontSize'];},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x316)]=function(){const _0x109f5a=_0x561d2e;return Imported[_0x109f5a(0x13f)]&&VisuMZ[_0x109f5a(0x3a4)][_0x109f5a(0x3a5)][_0x109f5a(0x25e)][_0x109f5a(0x21e)];},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x1e4)]=function(_0x4b8e27,_0x24e2b0,_0x507e17,_0x42d74c){const _0x22cc6b=_0x561d2e,_0x4b1207=this['itemPadding']();Imported[_0x22cc6b(0x13f)]?this[_0x22cc6b(0x13b)](_0x24e2b0+_0x4b1207,_0x507e17,_0x42d74c,_0x4b8e27,![]):this[_0x22cc6b(0x271)](TextManager[_0x22cc6b(0x3b6)](_0x4b8e27),_0x24e2b0+_0x4b1207,_0x507e17,_0x42d74c);},Window_EquipStatus['prototype']['drawUpdatedBeforeParamValue']=function(_0x150b94,_0x534748,_0x441d19,_0x361197){const _0x536f7a=_0x561d2e,_0x152ead=this[_0x536f7a(0x3ca)]();let _0x3860f7=0x0;Imported[_0x536f7a(0x13f)]?_0x3860f7=this['_actor'][_0x536f7a(0x314)](_0x150b94,!![]):_0x3860f7=this[_0x536f7a(0x3a3)][_0x536f7a(0x3b6)](_0x150b94);const _0x2f1658=_0x3860f7;this['drawText'](_0x3860f7,_0x534748,_0x441d19,_0x361197-_0x152ead,_0x536f7a(0x14d));},Window_EquipStatus[_0x561d2e(0x1d9)]['drawUpdatedAfterParamValue']=function(_0x507615,_0x4bddf7,_0x5d8faf,_0x3051a7){const _0x5da595=_0x561d2e,_0x158bad=this[_0x5da595(0x3ca)]();let _0x12229d=0x0,_0x1a8f33=0x0,_0x16e942='';if(this[_0x5da595(0x318)]){Imported[_0x5da595(0x13f)]?(_0x12229d=this['_actor'][_0x5da595(0x314)](_0x507615,![]),_0x1a8f33=this[_0x5da595(0x318)][_0x5da595(0x314)](_0x507615,![]),_0x16e942=this[_0x5da595(0x318)][_0x5da595(0x314)](_0x507615,!![])):(_0x12229d=this['_actor'][_0x5da595(0x3b6)](_0x507615),_0x1a8f33=this[_0x5da595(0x318)]['param'](_0x507615),_0x16e942=this[_0x5da595(0x318)]['param'](_0x507615));const _0x268750=_0x12229d,_0x1fe196=_0x1a8f33;diffValue=_0x1fe196-_0x268750,this['changeTextColor'](ColorManager[_0x5da595(0x470)](diffValue)),this[_0x5da595(0x271)](_0x16e942,_0x4bddf7,_0x5d8faf,_0x3051a7-_0x158bad,_0x5da595(0x14d));}},Window_EquipStatus[_0x561d2e(0x1d9)][_0x561d2e(0x405)]=function(_0x235e6e,_0x127014,_0x1efad7,_0x5adfb5){const _0x27dabc=_0x561d2e,_0xcf84d7=this['itemPadding']();let _0x493bbe=0x0,_0x5c3f54=0x0,_0x3d599e=![];if(this[_0x27dabc(0x318)]){Imported[_0x27dabc(0x13f)]?(_0x493bbe=this[_0x27dabc(0x3a3)][_0x27dabc(0x314)](_0x235e6e,![]),_0x5c3f54=this[_0x27dabc(0x318)][_0x27dabc(0x314)](_0x235e6e,![]),_0x3d599e=String(this[_0x27dabc(0x3a3)]['paramValueByName'](_0x235e6e,!![]))[_0x27dabc(0x172)](/([%％])/i)):(_0x493bbe=this['_actor'][_0x27dabc(0x3b6)](_0x235e6e),_0x5c3f54=this[_0x27dabc(0x318)][_0x27dabc(0x3b6)](_0x235e6e),_0x3d599e=_0x493bbe%0x1!==0x0||_0x5c3f54%0x1!==0x0);const _0x2a138c=_0x493bbe,_0x4d101f=_0x5c3f54,_0x222526=_0x4d101f-_0x2a138c;let _0x8a5806=_0x222526;if(_0x3d599e)_0x8a5806=Math[_0x27dabc(0x2e5)](_0x222526*0x64)+'%';_0x222526!==0x0&&(this[_0x27dabc(0x24c)](ColorManager[_0x27dabc(0x470)](_0x222526)),_0x8a5806=(_0x222526>0x0?_0x27dabc(0x383):'(%1)')[_0x27dabc(0x39a)](_0x8a5806),this['drawText'](_0x8a5806,_0x127014+_0xcf84d7,_0x1efad7,_0x5adfb5,_0x27dabc(0x439)));}},Window_EquipStatus['prototype']['drawItemDarkRect']=function(_0x15b1e9,_0x7d03b8,_0x383be7,_0x46c9d4,_0x5d4282){const _0x43f53d=_0x561d2e;if(VisuMZ[_0x43f53d(0x12d)][_0x43f53d(0x3a5)][_0x43f53d(0x408)][_0x43f53d(0x218)]===![])return;_0x5d4282=Math[_0x43f53d(0x419)](_0x5d4282||0x1,0x1);while(_0x5d4282--){_0x46c9d4=_0x46c9d4||this[_0x43f53d(0x28a)](),this['contents'][_0x43f53d(0x37c)]=0xa0;const _0x3d2546=ColorManager['getItemsEquipsCoreBackColor2']();this[_0x43f53d(0x42a)][_0x43f53d(0x465)](_0x15b1e9+0x1,_0x7d03b8+0x1,_0x383be7-0x2,_0x46c9d4-0x2,_0x3d2546),this['contents'][_0x43f53d(0x37c)]=0xff;}},ColorManager[_0x561d2e(0x3c2)]=function(){const _0x1f5e29=_0x561d2e,_0x10267e=VisuMZ[_0x1f5e29(0x12d)][_0x1f5e29(0x3a5)][_0x1f5e29(0x408)];let _0x63e73c=_0x10267e[_0x1f5e29(0x3ce)]!==undefined?_0x10267e[_0x1f5e29(0x3ce)]:0x13;return ColorManager[_0x1f5e29(0x2cc)](_0x63e73c);},VisuMZ['ItemsEquipsCore'][_0x561d2e(0x299)]=Window_EquipCommand[_0x561d2e(0x1d9)]['initialize'],Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x26f)]=function(_0x14dded){const _0x114a84=_0x561d2e;VisuMZ[_0x114a84(0x12d)]['Window_EquipCommand_initialize'][_0x114a84(0x27d)](this,_0x14dded),this[_0x114a84(0x28b)](_0x14dded);},Window_EquipCommand['prototype'][_0x561d2e(0x28b)]=function(_0x402a7b){const _0xccc2db=_0x561d2e,_0x54a911=new Rectangle(0x0,0x0,_0x402a7b[_0xccc2db(0x413)],_0x402a7b[_0xccc2db(0x1c0)]);this[_0xccc2db(0x134)]=new Window_Base(_0x54a911),this['_commandNameWindow'][_0xccc2db(0x2c6)]=0x0,this[_0xccc2db(0x209)](this['_commandNameWindow']),this[_0xccc2db(0x282)]();},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x401)]=function(){const _0x277191=_0x561d2e;Window_HorzCommand[_0x277191(0x1d9)][_0x277191(0x401)][_0x277191(0x27d)](this);if(this['_commandNameWindow'])this[_0x277191(0x282)]();},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x282)]=function(){const _0x5e5e89=_0x561d2e,_0x2d81a6=this[_0x5e5e89(0x134)];_0x2d81a6[_0x5e5e89(0x42a)][_0x5e5e89(0x34d)]();const _0x3cd67e=this[_0x5e5e89(0x1fc)](this[_0x5e5e89(0x463)]());if(_0x3cd67e===_0x5e5e89(0x127)){const _0x4e461e=this[_0x5e5e89(0x31b)](this[_0x5e5e89(0x463)]());let _0x51742c=this[_0x5e5e89(0x125)](this[_0x5e5e89(0x463)]());_0x51742c=_0x51742c[_0x5e5e89(0x246)](/\\I\[(\d+)\]/gi,''),_0x2d81a6[_0x5e5e89(0x157)](),this['commandNameWindowDrawBackground'](_0x51742c,_0x4e461e),this[_0x5e5e89(0x27f)](_0x51742c,_0x4e461e),this[_0x5e5e89(0x46e)](_0x51742c,_0x4e461e);}},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x466)]=function(_0x52fc2e,_0x3649f2){},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x27f)]=function(_0xfff2cf,_0x5dba23){const _0x32fe16=_0x561d2e,_0x2e95e0=this[_0x32fe16(0x134)];_0x2e95e0[_0x32fe16(0x271)](_0xfff2cf,0x0,_0x5dba23['y'],_0x2e95e0[_0x32fe16(0x3fd)],_0x32fe16(0x33a));},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x46e)]=function(_0xc63993,_0x46da78){const _0xb97950=_0x561d2e,_0x4e4726=this[_0xb97950(0x134)],_0x56063c=$gameSystem[_0xb97950(0x41b)](),_0x1111e3=_0x46da78['x']+Math[_0xb97950(0x409)](_0x46da78[_0xb97950(0x413)]/0x2)+_0x56063c;_0x4e4726['x']=_0x4e4726[_0xb97950(0x413)]/-0x2+_0x1111e3,_0x4e4726['y']=Math[_0xb97950(0x409)](_0x46da78[_0xb97950(0x1c0)]/0x2);},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x294883=_0x561d2e;return Imported[_0x294883(0x13f)]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x294883(0x27d)](this);},Window_EquipCommand[_0x561d2e(0x1d9)]['playOkSound']=function(){const _0x5ca150=_0x561d2e;if(this[_0x5ca150(0x26d)]()===_0x5ca150(0x1db))Window_HorzCommand[_0x5ca150(0x1d9)]['playOkSound'][_0x5ca150(0x27d)](this);},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x34e)]=function(){const _0x42cbfa=_0x561d2e;!this[_0x42cbfa(0x126)]()&&Window_HorzCommand[_0x42cbfa(0x1d9)]['processCursorMoveModernControls']['call'](this);},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x126)]=function(){const _0x96fb01=_0x561d2e;if(!this[_0x96fb01(0x27b)]())return![];if(SceneManager[_0x96fb01(0x16a)][_0x96fb01(0x3f4)]!==Scene_Equip)return![];return Input[_0x96fb01(0x406)](_0x96fb01(0x3d1))&&(this[_0x96fb01(0x357)](),SceneManager[_0x96fb01(0x16a)]['commandEquip'](),SceneManager[_0x96fb01(0x16a)][_0x96fb01(0x13d)]['smoothSelect'](-0x1)),![];},Window_EquipCommand[_0x561d2e(0x1d9)]['maxCols']=function(){const _0x4a9586=_0x561d2e;return this[_0x4a9586(0x3a2)]?this['_list'][_0x4a9586(0x22d)]:0x3;},Window_EquipCommand['prototype'][_0x561d2e(0x3dc)]=function(){const _0x4a8813=_0x561d2e;if(this[_0x4a8813(0x322)]()&&this[_0x4a8813(0x34c)]&&SceneManager['_scene']['constructor']===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x4a8813(0x388)]())this[_0x4a8813(0x285)](![]);else TouchInput[_0x4a8813(0x406)]()&&this[_0x4a8813(0x285)](!![]);if(TouchInput[_0x4a8813(0x3bd)]())this['onTouchOk']();else TouchInput[_0x4a8813(0x1e9)]()&&this[_0x4a8813(0x3f3)]();}},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x285)]=function(_0x18a1eb){const _0x4b7443=_0x561d2e;this[_0x4b7443(0x351)]=![];const _0x41ef88=this['index'](),_0xccb0c3=this['hitIndex'](),_0xa126ce=SceneManager['_scene'][_0x4b7443(0x13d)];if(_0xa126ce[_0x4b7443(0x322)]()&&_0xa126ce[_0x4b7443(0x34c)]){if(_0xccb0c3>=0x0)_0xccb0c3===this[_0x4b7443(0x463)]()&&(this[_0x4b7443(0x351)]=!![]),this['activate'](),this[_0x4b7443(0x2e3)](_0xccb0c3);else _0xa126ce[_0x4b7443(0x310)]()>=0x0&&(this[_0x4b7443(0x1cd)](),this['deselect']());}_0x18a1eb&&this[_0x4b7443(0x463)]()!==_0x41ef88&&this[_0x4b7443(0x357)]();},Window_EquipCommand[_0x561d2e(0x1d9)]['makeCommandList']=function(){const _0x3eef66=_0x561d2e;this[_0x3eef66(0x27a)](),this[_0x3eef66(0x363)](),this[_0x3eef66(0x174)]();},Window_EquipCommand[_0x561d2e(0x1d9)]['refresh']=function(){const _0x2e9f0f=_0x561d2e;Window_HorzCommand[_0x2e9f0f(0x1d9)][_0x2e9f0f(0x20f)][_0x2e9f0f(0x27d)](this),this[_0x2e9f0f(0x268)]();},Window_EquipCommand['prototype'][_0x561d2e(0x27a)]=function(){const _0x39ac93=_0x561d2e;if(!this[_0x39ac93(0x2bf)]())return;const _0x1529a4=this[_0x39ac93(0x3cf)](),_0x4c8dcf=VisuMZ[_0x39ac93(0x12d)]['Settings'][_0x39ac93(0x408)][_0x39ac93(0x286)],_0x555470=_0x1529a4===_0x39ac93(0x256)?TextManager[_0x39ac93(0x368)]:_0x39ac93(0x3f2)['format'](_0x4c8dcf,TextManager[_0x39ac93(0x368)]),_0x502add=this['isEquipCommandEnabled']();this[_0x39ac93(0x417)](_0x555470,_0x39ac93(0x1db),_0x502add);},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x2bf)]=function(){return!this['isUseModernControls']();},Window_EquipCommand['prototype'][_0x561d2e(0x430)]=function(){return!![];},Window_EquipCommand[_0x561d2e(0x1d9)]['addOptimizeCommand']=function(){const _0xd9818c=_0x561d2e;if(!this[_0xd9818c(0x17d)]())return;const _0x52b6e7=this['commandStyle'](),_0xcb5a9c=VisuMZ[_0xd9818c(0x12d)][_0xd9818c(0x3a5)]['EquipScene']['CmdIconOptimize'],_0x1454c2=_0x52b6e7===_0xd9818c(0x256)?TextManager[_0xd9818c(0x160)]:_0xd9818c(0x3f2)[_0xd9818c(0x39a)](_0xcb5a9c,TextManager['optimize']),_0x28d579=this[_0xd9818c(0x1d1)]();this[_0xd9818c(0x417)](_0x1454c2,_0xd9818c(0x160),_0x28d579);},Window_EquipCommand['prototype']['isOptimizeCommandAdded']=function(){const _0x32edf2=_0x561d2e;return VisuMZ[_0x32edf2(0x12d)][_0x32edf2(0x3a5)]['EquipScene']['CommandAddOptimize'];},Window_EquipCommand['prototype'][_0x561d2e(0x1d1)]=function(){return!![];},Window_EquipCommand['prototype'][_0x561d2e(0x174)]=function(){const _0x9535eb=_0x561d2e;if(!this['isClearCommandAdded']())return;const _0xf480d7=this['commandStyle'](),_0x414afe=VisuMZ[_0x9535eb(0x12d)][_0x9535eb(0x3a5)][_0x9535eb(0x408)][_0x9535eb(0x139)],_0x189458=_0xf480d7===_0x9535eb(0x256)?TextManager[_0x9535eb(0x34d)]:_0x9535eb(0x3f2)[_0x9535eb(0x39a)](_0x414afe,TextManager['clear']),_0x27207f=this[_0x9535eb(0x1a7)]();this[_0x9535eb(0x417)](_0x189458,_0x9535eb(0x34d),_0x27207f);},Window_EquipCommand['prototype'][_0x561d2e(0x35a)]=function(){const _0x33f7e8=_0x561d2e;return VisuMZ[_0x33f7e8(0x12d)][_0x33f7e8(0x3a5)][_0x33f7e8(0x408)][_0x33f7e8(0x3ef)];},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x1a7)]=function(){return!![];},Window_EquipCommand['prototype'][_0x561d2e(0x1f7)]=function(){const _0x4fba94=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x4fba94(0x3a5)][_0x4fba94(0x408)]['CmdTextAlign'];},Window_EquipCommand['prototype'][_0x561d2e(0x229)]=function(_0x5d9318){const _0x574beb=_0x561d2e,_0x3e09ad=this[_0x574beb(0x1fc)](_0x5d9318);if(_0x3e09ad===_0x574beb(0x46f))this[_0x574beb(0x205)](_0x5d9318);else _0x3e09ad===_0x574beb(0x127)?this[_0x574beb(0x1f4)](_0x5d9318):Window_HorzCommand[_0x574beb(0x1d9)]['drawItem'][_0x574beb(0x27d)](this,_0x5d9318);},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x3cf)]=function(){const _0x33b127=_0x561d2e;return VisuMZ['ItemsEquipsCore']['Settings'][_0x33b127(0x408)][_0x33b127(0x1ec)];},Window_EquipCommand[_0x561d2e(0x1d9)]['commandStyleCheck']=function(_0x4b2e92){const _0x253f30=_0x561d2e;if(_0x4b2e92<0x0)return'text';const _0x5ec86b=this['commandStyle']();if(_0x5ec86b!==_0x253f30(0x381))return _0x5ec86b;else{if(this[_0x253f30(0x3d8)]()>0x0){const _0x7802b1=this[_0x253f30(0x125)](_0x4b2e92);if(_0x7802b1[_0x253f30(0x172)](/\\I\[(\d+)\]/i)){const _0x2446e5=this[_0x253f30(0x31b)](_0x4b2e92),_0x486cf8=this[_0x253f30(0x144)](_0x7802b1)[_0x253f30(0x413)];return _0x486cf8<=_0x2446e5[_0x253f30(0x413)]?'iconText':_0x253f30(0x127);}}}return _0x253f30(0x256);},Window_EquipCommand['prototype'][_0x561d2e(0x205)]=function(_0x341673){const _0x12d194=_0x561d2e,_0x26dd40=this[_0x12d194(0x31b)](_0x341673),_0x48653e=this[_0x12d194(0x125)](_0x341673),_0x1b7e60=this[_0x12d194(0x144)](_0x48653e)[_0x12d194(0x413)];this[_0x12d194(0x31d)](this[_0x12d194(0x36a)](_0x341673));const _0x1b3e77=this[_0x12d194(0x1f7)]();if(_0x1b3e77==='right')this[_0x12d194(0x45a)](_0x48653e,_0x26dd40['x']+_0x26dd40[_0x12d194(0x413)]-_0x1b7e60,_0x26dd40['y'],_0x1b7e60);else{if(_0x1b3e77==='center'){const _0x920b22=_0x26dd40['x']+Math['floor']((_0x26dd40['width']-_0x1b7e60)/0x2);this['drawTextEx'](_0x48653e,_0x920b22,_0x26dd40['y'],_0x1b7e60);}else this[_0x12d194(0x45a)](_0x48653e,_0x26dd40['x'],_0x26dd40['y'],_0x1b7e60);}},Window_EquipCommand[_0x561d2e(0x1d9)][_0x561d2e(0x1f4)]=function(_0x19b561){const _0x4d342d=_0x561d2e;this[_0x4d342d(0x125)](_0x19b561)['match'](/\\I\[(\d+)\]/i);const _0x1d9bb2=Number(RegExp['$1'])||0x0,_0xe942ea=this[_0x4d342d(0x31b)](_0x19b561),_0x4eee9d=_0xe942ea['x']+Math[_0x4d342d(0x409)]((_0xe942ea[_0x4d342d(0x413)]-ImageManager[_0x4d342d(0x1be)])/0x2),_0x19649c=_0xe942ea['y']+(_0xe942ea[_0x4d342d(0x1c0)]-ImageManager[_0x4d342d(0x25d)])/0x2;this[_0x4d342d(0x130)](_0x1d9bb2,_0x4eee9d,_0x19649c);},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x27c)]=function(){const _0x4febc4=_0x561d2e;return Imported[_0x4febc4(0x13f)]&&Window_HorzCommand[_0x4febc4(0x1d9)][_0x4febc4(0x27c)][_0x4febc4(0x27d)](this);},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x1dd)]=function(){const _0x2803b9=_0x561d2e;Window_StatusBase[_0x2803b9(0x1d9)][_0x2803b9(0x1dd)][_0x2803b9(0x27d)](this),this[_0x2803b9(0x401)]();},Window_EquipSlot['prototype'][_0x561d2e(0x297)]=function(){const _0x3c9bca=_0x561d2e;Window_StatusBase['prototype'][_0x3c9bca(0x297)]['call'](this),this[_0x3c9bca(0x15f)]();},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x15f)]=function(){const _0x1105e1=_0x561d2e;if(!this[_0x1105e1(0x178)]())return;if(Input['isTriggered'](_0x1105e1(0x428))&&this['item']()){const _0x591aab=SceneManager[_0x1105e1(0x16a)]['_actor'];_0x591aab&&(this[_0x1105e1(0x20d)](this[_0x1105e1(0x463)]())?(this[_0x1105e1(0x21d)](),this['updateHelp']()):this[_0x1105e1(0x241)]());}},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x20d)]=function(_0x54bb8f){const _0x4a5bb2=_0x561d2e,_0x58de0e=SceneManager[_0x4a5bb2(0x16a)][_0x4a5bb2(0x3a3)];if(!_0x58de0e)return;if(!_0x58de0e['isEquipChangeOk'](this['index']()))return![];const _0x4d917f=_0x58de0e[_0x4a5bb2(0x369)]()[this[_0x4a5bb2(0x463)]()];if(_0x58de0e[_0x4a5bb2(0x44d)]()[_0x4a5bb2(0x198)](_0x4d917f))return![];return!![];;},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x21d)]=function(){const _0x34ec5f=_0x561d2e;SoundManager['playEquip']();const _0x1c8d8f=SceneManager[_0x34ec5f(0x16a)][_0x34ec5f(0x3a3)];_0x1c8d8f['changeEquip'](this[_0x34ec5f(0x463)](),null),this[_0x34ec5f(0x20f)](),this['_itemWindow'][_0x34ec5f(0x20f)](),this['callUpdateHelp']();const _0x3eda2b=SceneManager['_scene'][_0x34ec5f(0x312)];if(_0x3eda2b)_0x3eda2b['refresh']();},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x178)]=function(){const _0x305bc3=_0x561d2e;if(!this[_0x305bc3(0x2d2)])return![];if(!VisuMZ['ItemsEquipsCore'][_0x305bc3(0x3a5)]['EquipScene'][_0x305bc3(0x454)])return![];return!![];},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x34e)]=function(){const _0x54014a=_0x561d2e;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase['prototype'][_0x54014a(0x34e)][_0x54014a(0x27d)](this);},Window_EquipSlot[_0x561d2e(0x1d9)]['processCursorSpecialCheckModernControls']=function(){const _0x350ef2=_0x561d2e;if(!this[_0x350ef2(0x27b)]())return![];if(SceneManager[_0x350ef2(0x16a)][_0x350ef2(0x3f4)]!==Scene_Equip)return![];if(this['allowCommandWindowCursorUp']())return this[_0x350ef2(0x357)](),Input[_0x350ef2(0x34d)](),SceneManager[_0x350ef2(0x16a)][_0x350ef2(0x308)](),![];else{if(Input[_0x350ef2(0x19b)]('down')){const _0x74f157=this[_0x350ef2(0x463)]();return Input[_0x350ef2(0x2ef)](_0x350ef2(0x428))?this[_0x350ef2(0x228)]():this[_0x350ef2(0x26b)](Input['isTriggered'](_0x350ef2(0x3d1))),this[_0x350ef2(0x463)]()!==_0x74f157&&this[_0x350ef2(0x357)](),!![];}else{if(this[_0x350ef2(0x165)]()&&Input[_0x350ef2(0x406)](_0x350ef2(0x428)))return!![];}}return![];},Window_EquipSlot['prototype'][_0x561d2e(0x1de)]=function(){const _0xb2fcce=_0x561d2e;if(this[_0xb2fcce(0x463)]()!==0x0)return![];const _0x9984d0=VisuMZ[_0xb2fcce(0x12d)][_0xb2fcce(0x3a5)][_0xb2fcce(0x408)];if(!_0x9984d0[_0xb2fcce(0x263)]&&!_0x9984d0[_0xb2fcce(0x3ef)])return![];return Input[_0xb2fcce(0x406)]('up');},Window_EquipSlot['prototype'][_0x561d2e(0x165)]=function(){const _0x68d392=_0x561d2e;return VisuMZ[_0x68d392(0x12d)][_0x68d392(0x3a5)][_0x68d392(0x408)][_0x68d392(0x454)];},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x3dc)]=function(){const _0xa8c4b6=_0x561d2e;if(this[_0xa8c4b6(0x322)]()&&this[_0xa8c4b6(0x34c)]&&SceneManager[_0xa8c4b6(0x16a)][_0xa8c4b6(0x3f4)]===Scene_Equip){if(this[_0xa8c4b6(0x1ad)]()&&TouchInput[_0xa8c4b6(0x388)]())this[_0xa8c4b6(0x285)](![]);else TouchInput[_0xa8c4b6(0x406)]()&&this[_0xa8c4b6(0x285)](!![]);if(TouchInput[_0xa8c4b6(0x3bd)]())this['onTouchOk']();else TouchInput[_0xa8c4b6(0x1e9)]()&&this['onTouchCancel']();}},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x285)]=function(_0x41f56f){const _0x4506e0=_0x561d2e;this['_doubleTouch']=![];const _0x3090a5=this[_0x4506e0(0x463)](),_0x93a4a6=this[_0x4506e0(0x310)](),_0x27c6f1=SceneManager[_0x4506e0(0x16a)][_0x4506e0(0x24d)];if(_0x27c6f1[_0x4506e0(0x322)]()&&_0x27c6f1['visible']){if(_0x93a4a6>=0x0)_0x93a4a6===this[_0x4506e0(0x463)]()&&(this[_0x4506e0(0x351)]=!![]),this[_0x4506e0(0x1dd)](),this[_0x4506e0(0x2e3)](_0x93a4a6);else _0x27c6f1[_0x4506e0(0x310)]()>=0x0&&(this['deactivate'](),this[_0x4506e0(0x302)]());}_0x41f56f&&this['index']()!==_0x3090a5&&this[_0x4506e0(0x357)]();},Window_EquipSlot[_0x561d2e(0x1d9)][_0x561d2e(0x2be)]=function(){const _0x3b312e=_0x561d2e;return this[_0x3b312e(0x463)]();},VisuMZ[_0x561d2e(0x12d)]['Window_EquipItem_includes']=Window_EquipItem['prototype']['includes'],Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x198)]=function(_0x1a8299){const _0x330a35=_0x561d2e;return _0x1a8299===null&&this[_0x330a35(0x44d)]()['includes'](this[_0x330a35(0x147)]())?this['_data']['length']>0x0?![]:!![]:VisuMZ['ItemsEquipsCore'][_0x330a35(0x1ff)][_0x330a35(0x27d)](this,_0x1a8299);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x283)]=Window_EquipItem[_0x561d2e(0x1d9)]['isEnabled'],Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x290)]=function(_0xba6fb6){const _0x277fa0=_0x561d2e;if(_0xba6fb6&&this[_0x277fa0(0x3a3)]){if(this['nonRemovableEtypes']()[_0x277fa0(0x198)](this['etypeId']()))return![];if(this[_0x277fa0(0x385)](_0xba6fb6))return![];if(this[_0x277fa0(0x18d)](_0xba6fb6))return![];if(this[_0x277fa0(0x2da)](_0xba6fb6))return![];}return VisuMZ[_0x277fa0(0x12d)][_0x277fa0(0x283)]['call'](this,_0xba6fb6);},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x385)]=function(_0x11f66f){const _0x2c9faf=_0x561d2e,_0x2b4d5c=_0x11f66f[_0x2c9faf(0x46b)];if(_0x2b4d5c['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x3922c1=Number(RegExp['$1'])||0x1;let _0x371cb9=0x0;const _0x3a0d23=this[_0x2c9faf(0x3a3)][_0x2c9faf(0x3e9)](),_0x3ec2e5=SceneManager['_scene'][_0x2c9faf(0x13d)][_0x2c9faf(0x2be)]();_0x3a0d23[_0x3ec2e5]=null;for(const _0x35df28 of _0x3a0d23){if(!_0x35df28)continue;if(DataManager[_0x2c9faf(0x42d)](_0x11f66f)===DataManager[_0x2c9faf(0x42d)](_0x35df28)){if(_0x11f66f['id']===_0x35df28['id'])_0x371cb9+=0x1;}}return _0x371cb9>=_0x3922c1;}else return![];},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x18d)]=function(_0x422279){const _0x596c60=_0x561d2e;if(!DataManager['isWeapon'](_0x422279))return![];const _0x36fdc9=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x9c9238=0x0;const _0x4de3fc=this[_0x596c60(0x3a3)]['equips'](),_0x3d2760=SceneManager[_0x596c60(0x16a)]['_slotWindow']['equipSlotIndex']();_0x4de3fc[_0x3d2760]=null;for(const _0x1cfe32 of _0x4de3fc){if(!_0x1cfe32)continue;if(!DataManager['isWeapon'](_0x1cfe32))continue;if(_0x422279[_0x596c60(0x2bc)]===_0x1cfe32[_0x596c60(0x2bc)]){_0x9c9238+=0x1;if(_0x422279[_0x596c60(0x46b)][_0x596c60(0x172)](_0x36fdc9)){const _0x544f5c=Number(RegExp['$1'])||0x1;if(_0x9c9238>=_0x544f5c)return!![];}if(_0x1cfe32[_0x596c60(0x46b)][_0x596c60(0x172)](_0x36fdc9)){const _0x54cfa0=Number(RegExp['$1'])||0x1;if(_0x9c9238>=_0x54cfa0)return!![];}}}return![];},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x2da)]=function(_0xda72cf){const _0x108b99=_0x561d2e;if(!DataManager[_0x108b99(0x448)](_0xda72cf))return![];const _0x17a81e=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x13a05d=0x0;const _0x2d7f0d=this[_0x108b99(0x3a3)][_0x108b99(0x3e9)](),_0x4ebbdf=SceneManager['_scene'][_0x108b99(0x13d)]['equipSlotIndex']();_0x2d7f0d[_0x4ebbdf]=null;for(const _0x4e90ec of _0x2d7f0d){if(!_0x4e90ec)continue;if(!DataManager[_0x108b99(0x448)](_0x4e90ec))continue;if(_0xda72cf[_0x108b99(0x35c)]===_0x4e90ec[_0x108b99(0x35c)]){_0x13a05d+=0x1;if(_0xda72cf['note'][_0x108b99(0x172)](_0x17a81e)){const _0x45be44=Number(RegExp['$1'])||0x1;if(_0x13a05d>=_0x45be44)return!![];}if(_0x4e90ec[_0x108b99(0x46b)]['match'](_0x17a81e)){const _0x6ab1c0=Number(RegExp['$1'])||0x1;if(_0x13a05d>=_0x6ab1c0)return!![];}}}return![];},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x44d)]=function(){const _0x4a6b79=_0x561d2e;return VisuMZ[_0x4a6b79(0x12d)][_0x4a6b79(0x3a5)]['EquipScene'][_0x4a6b79(0x261)];},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x229)]=function(_0x459f1c){const _0x18737f=_0x561d2e,_0x4af901=this[_0x18737f(0x131)](_0x459f1c);_0x4af901?Window_ItemList[_0x18737f(0x1d9)][_0x18737f(0x229)][_0x18737f(0x27d)](this,_0x459f1c):this['drawRemoveItem'](_0x459f1c);},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x45e)]=function(_0x418947){const _0xed5f1b=_0x561d2e;this[_0xed5f1b(0x31d)](this[_0xed5f1b(0x290)](null));const _0x45c3b6=VisuMZ[_0xed5f1b(0x12d)][_0xed5f1b(0x3a5)][_0xed5f1b(0x408)],_0x393187=this['itemLineRect'](_0x418947),_0x1000ad=_0x393187['y']+(this[_0xed5f1b(0x28a)]()-ImageManager[_0xed5f1b(0x25d)])/0x2,_0x452fee=ImageManager[_0xed5f1b(0x1be)]+0x4,_0x27e1a6=Math['max'](0x0,_0x393187[_0xed5f1b(0x413)]-_0x452fee);this[_0xed5f1b(0x1b4)](),this[_0xed5f1b(0x130)](_0x45c3b6[_0xed5f1b(0x1af)],_0x393187['x'],_0x1000ad),this['drawText'](_0x45c3b6[_0xed5f1b(0x315)],_0x393187['x']+_0x452fee,_0x393187['y'],_0x27e1a6),this[_0xed5f1b(0x31d)](!![]);},Window_EquipItem[_0x561d2e(0x1d9)][_0x561d2e(0x1ab)]=function(){const _0x45c472=_0x561d2e;Window_ItemList[_0x45c472(0x1d9)]['updateHelp'][_0x45c472(0x27d)](this);if(this[_0x45c472(0x3a3)]&&this[_0x45c472(0x312)]&&this[_0x45c472(0x1cc)]>=0x0){const _0x2e5c60=JsonEx['makeDeepCopy'](this['_actor']);_0x2e5c60['_tempActor']=!![],_0x2e5c60['forceChangeEquip'](this['_slotId'],this[_0x45c472(0x17a)]()),this[_0x45c472(0x312)][_0x45c472(0x180)](_0x2e5c60);}},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x3d7)]=Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x26f)],Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x26f)]=function(_0x3dde3e){const _0x252f11=_0x561d2e;VisuMZ['ItemsEquipsCore'][_0x252f11(0x3d7)][_0x252f11(0x27d)](this,_0x3dde3e),this[_0x252f11(0x28b)](_0x3dde3e);},Window_ShopCommand['prototype'][_0x561d2e(0x28b)]=function(_0x1f7600){const _0x56ce4f=_0x561d2e,_0xd54330=new Rectangle(0x0,0x0,_0x1f7600[_0x56ce4f(0x413)],_0x1f7600[_0x56ce4f(0x1c0)]);this['_commandNameWindow']=new Window_Base(_0xd54330),this[_0x56ce4f(0x134)][_0x56ce4f(0x2c6)]=0x0,this['addChild'](this[_0x56ce4f(0x134)]),this['updateCommandNameWindow']();},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x401)]=function(){const _0x220184=_0x561d2e;Window_HorzCommand[_0x220184(0x1d9)][_0x220184(0x401)][_0x220184(0x27d)](this);if(this['_commandNameWindow'])this[_0x220184(0x282)]();},Window_ShopCommand['prototype'][_0x561d2e(0x282)]=function(){const _0x44f347=_0x561d2e,_0x168f75=this[_0x44f347(0x134)];_0x168f75[_0x44f347(0x42a)]['clear']();const _0x5f0d7d=this[_0x44f347(0x1fc)](this[_0x44f347(0x463)]());if(_0x5f0d7d==='icon'){const _0x4d38e0=this[_0x44f347(0x31b)](this[_0x44f347(0x463)]());let _0x4edb1f=this[_0x44f347(0x125)](this[_0x44f347(0x463)]());_0x4edb1f=_0x4edb1f['replace'](/\\I\[(\d+)\]/gi,''),_0x168f75[_0x44f347(0x157)](),this[_0x44f347(0x466)](_0x4edb1f,_0x4d38e0),this[_0x44f347(0x27f)](_0x4edb1f,_0x4d38e0),this[_0x44f347(0x46e)](_0x4edb1f,_0x4d38e0);}},Window_ShopCommand['prototype'][_0x561d2e(0x466)]=function(_0x1c8a91,_0x32e38a){},Window_ShopCommand['prototype']['commandNameWindowDrawText']=function(_0x543e0a,_0x31e567){const _0x9225b=_0x561d2e,_0x410fcf=this[_0x9225b(0x134)];_0x410fcf[_0x9225b(0x271)](_0x543e0a,0x0,_0x31e567['y'],_0x410fcf['innerWidth'],'center');},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x46e)]=function(_0x402f55,_0x24809d){const _0x5afc84=_0x561d2e,_0x5bad6d=this['_commandNameWindow'],_0x489d58=$gameSystem[_0x5afc84(0x41b)](),_0x5731a0=_0x24809d['x']+Math[_0x5afc84(0x409)](_0x24809d[_0x5afc84(0x413)]/0x2)+_0x489d58;_0x5bad6d['x']=_0x5bad6d[_0x5afc84(0x413)]/-0x2+_0x5731a0,_0x5bad6d['y']=Math[_0x5afc84(0x409)](_0x24809d['height']/0x2);},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x2b5)]=function(){const _0x584da4=_0x561d2e;return this[_0x584da4(0x3a2)]?this[_0x584da4(0x3a2)]['length']:0x3;},Window_ShopCommand['prototype'][_0x561d2e(0x1a5)]=function(){const _0x182067=_0x561d2e;return VisuMZ[_0x182067(0x12d)][_0x182067(0x3a5)][_0x182067(0x248)][_0x182067(0x3f0)];},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x24e)]=function(){const _0x4557c3=_0x561d2e;this['addBuyCommand'](),this['addSellCommand'](),this[_0x4557c3(0x2d7)]();},Window_ShopCommand[_0x561d2e(0x1d9)]['refresh']=function(){const _0x4cc536=_0x561d2e;Window_HorzCommand['prototype'][_0x4cc536(0x20f)][_0x4cc536(0x27d)](this),this[_0x4cc536(0x268)]();},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x153)]=function(){const _0x48e8e3=_0x561d2e,_0x2a6857=this[_0x48e8e3(0x3cf)](),_0x600e1e=VisuMZ[_0x48e8e3(0x12d)][_0x48e8e3(0x3a5)][_0x48e8e3(0x248)][_0x48e8e3(0x31f)],_0x1515be=_0x2a6857===_0x48e8e3(0x256)?TextManager[_0x48e8e3(0x16f)]:_0x48e8e3(0x3f2)['format'](_0x600e1e,TextManager[_0x48e8e3(0x16f)]),_0x54cfe8=this['isBuyCommandEnabled']();if(this[_0x48e8e3(0x1a5)]()&&!_0x54cfe8)return;this[_0x48e8e3(0x417)](_0x1515be,_0x48e8e3(0x16f),_0x54cfe8);},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x31c)]=function(){const _0x2b9aa9=_0x561d2e;return SceneManager[_0x2b9aa9(0x16a)]['constructor']===Scene_Shop?SceneManager[_0x2b9aa9(0x16a)][_0x2b9aa9(0x3b8)]>0x0:!![];},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x192)]=function(){const _0x4e9f5d=_0x561d2e,_0x3a6c11=this[_0x4e9f5d(0x3cf)](),_0x5c79f2=VisuMZ[_0x4e9f5d(0x12d)][_0x4e9f5d(0x3a5)]['ShopScene'][_0x4e9f5d(0x39b)],_0x3ded6d=_0x3a6c11===_0x4e9f5d(0x256)?TextManager[_0x4e9f5d(0x2a3)]:_0x4e9f5d(0x3f2)[_0x4e9f5d(0x39a)](_0x5c79f2,TextManager[_0x4e9f5d(0x2a3)]),_0x81af4=this['isSellCommandEnabled']();if(this[_0x4e9f5d(0x1a5)]()&&!_0x81af4)return;this[_0x4e9f5d(0x417)](_0x3ded6d,_0x4e9f5d(0x2a3),_0x81af4);},Window_ShopCommand['prototype'][_0x561d2e(0x380)]=function(){const _0x1924fc=_0x561d2e;return!this[_0x1924fc(0x171)];},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x2d7)]=function(){const _0x1ef550=_0x561d2e,_0x553d20=this[_0x1ef550(0x3cf)](),_0x4b7161=VisuMZ['ItemsEquipsCore'][_0x1ef550(0x3a5)]['ShopScene'][_0x1ef550(0x12b)],_0x384288=VisuMZ['ItemsEquipsCore'][_0x1ef550(0x3a5)][_0x1ef550(0x248)][_0x1ef550(0x21a)],_0x3f06bb=_0x553d20===_0x1ef550(0x256)?_0x384288:'\x5cI[%1]%2'[_0x1ef550(0x39a)](_0x4b7161,_0x384288);this['addCommand'](_0x3f06bb,_0x1ef550(0x38a));},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x1f7)]=function(){const _0x32a3dd=_0x561d2e;return VisuMZ[_0x32a3dd(0x12d)]['Settings'][_0x32a3dd(0x248)][_0x32a3dd(0x319)];},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x229)]=function(_0x57756d){const _0x212425=_0x561d2e,_0x16a45f=this[_0x212425(0x1fc)](_0x57756d);if(_0x16a45f===_0x212425(0x46f))this[_0x212425(0x205)](_0x57756d);else _0x16a45f==='icon'?this[_0x212425(0x1f4)](_0x57756d):Window_HorzCommand[_0x212425(0x1d9)][_0x212425(0x229)][_0x212425(0x27d)](this,_0x57756d);},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x3cf)]=function(){const _0x3f10fc=_0x561d2e;return VisuMZ[_0x3f10fc(0x12d)][_0x3f10fc(0x3a5)][_0x3f10fc(0x248)]['CmdStyle'];},Window_ShopCommand['prototype'][_0x561d2e(0x1fc)]=function(_0x530d79){const _0x3c3650=_0x561d2e;if(_0x530d79<0x0)return _0x3c3650(0x256);const _0x4d2782=this['commandStyle']();if(_0x4d2782!==_0x3c3650(0x381))return _0x4d2782;else{if(this[_0x3c3650(0x3d8)]()>0x0){const _0x429d89=this['commandName'](_0x530d79);if(_0x429d89['match'](/\\I\[(\d+)\]/i)){const _0x58631b=this[_0x3c3650(0x31b)](_0x530d79),_0x4599a7=this[_0x3c3650(0x144)](_0x429d89)[_0x3c3650(0x413)];return _0x4599a7<=_0x58631b[_0x3c3650(0x413)]?_0x3c3650(0x46f):'icon';}}}return _0x3c3650(0x256);},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x205)]=function(_0x4b82ff){const _0x445e78=_0x561d2e,_0x525dd5=this[_0x445e78(0x31b)](_0x4b82ff),_0xbda3d=this[_0x445e78(0x125)](_0x4b82ff),_0x413baf=this[_0x445e78(0x144)](_0xbda3d)[_0x445e78(0x413)];this['changePaintOpacity'](this[_0x445e78(0x36a)](_0x4b82ff));const _0x1eb10c=this[_0x445e78(0x1f7)]();if(_0x1eb10c===_0x445e78(0x14d))this['drawTextEx'](_0xbda3d,_0x525dd5['x']+_0x525dd5[_0x445e78(0x413)]-_0x413baf,_0x525dd5['y'],_0x413baf);else{if(_0x1eb10c===_0x445e78(0x33a)){const _0x4dba88=_0x525dd5['x']+Math[_0x445e78(0x409)]((_0x525dd5[_0x445e78(0x413)]-_0x413baf)/0x2);this[_0x445e78(0x45a)](_0xbda3d,_0x4dba88,_0x525dd5['y'],_0x413baf);}else this[_0x445e78(0x45a)](_0xbda3d,_0x525dd5['x'],_0x525dd5['y'],_0x413baf);}},Window_ShopCommand[_0x561d2e(0x1d9)][_0x561d2e(0x1f4)]=function(_0x12fa7a){const _0x43a531=_0x561d2e;this[_0x43a531(0x125)](_0x12fa7a)['match'](/\\I\[(\d+)\]/i);const _0x35ea3b=Number(RegExp['$1'])||0x0,_0x458ef3=this[_0x43a531(0x31b)](_0x12fa7a),_0x4a4106=_0x458ef3['x']+Math[_0x43a531(0x409)]((_0x458ef3[_0x43a531(0x413)]-ImageManager['iconWidth'])/0x2),_0x2f06b8=_0x458ef3['y']+(_0x458ef3[_0x43a531(0x1c0)]-ImageManager['iconHeight'])/0x2;this[_0x43a531(0x130)](_0x35ea3b,_0x4a4106,_0x2f06b8);},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x278)]=Window_ShopBuy[_0x561d2e(0x1d9)][_0x561d2e(0x20f)],Window_ShopBuy[_0x561d2e(0x1d9)][_0x561d2e(0x20f)]=function(){const _0x50bdc2=_0x561d2e;this[_0x50bdc2(0x2ab)](),VisuMZ['ItemsEquipsCore'][_0x50bdc2(0x278)][_0x50bdc2(0x27d)](this);},Window_ShopBuy['prototype'][_0x561d2e(0x2ab)]=function(){const _0x50c1b4=_0x561d2e;SceneManager[_0x50c1b4(0x16a)]['constructor']===Scene_Shop&&(this['_money']=SceneManager[_0x50c1b4(0x16a)]['money']());},VisuMZ[_0x561d2e(0x12d)][_0x561d2e(0x2f3)]=Window_ShopBuy['prototype']['price'],Window_ShopBuy[_0x561d2e(0x1d9)]['price']=function(_0x4e2001){const _0x1015ca=_0x561d2e;if(!_0x4e2001)return 0x0;const _0x382b0c=VisuMZ[_0x1015ca(0x12d)][_0x1015ca(0x2f3)][_0x1015ca(0x27d)](this,_0x4e2001);return this['modifiedBuyPriceItemsEquipsCore'](_0x4e2001,_0x382b0c);},Window_ShopBuy[_0x561d2e(0x1d9)][_0x561d2e(0x1f9)]=function(_0x51ed0e,_0x5d7d15){const _0x1d554e=_0x561d2e,_0x582098=_0x51ed0e[_0x1d554e(0x46b)];if(_0x582098[_0x1d554e(0x172)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x16ef98=String(RegExp['$1']);try{eval(_0x16ef98);}catch(_0x224a77){if($gameTemp[_0x1d554e(0x1e2)]())console[_0x1d554e(0x2eb)](_0x224a77);}}_0x5d7d15=VisuMZ[_0x1d554e(0x12d)][_0x1d554e(0x3a5)]['ShopScene'][_0x1d554e(0x367)]['call'](this,_0x51ed0e,_0x5d7d15);if(isNaN(_0x5d7d15))_0x5d7d15=0x0;return Math[_0x1d554e(0x409)](_0x5d7d15);},Window_ShopBuy[_0x561d2e(0x1d9)]['drawItem']=function(_0x314a21){const _0x257d66=_0x561d2e;this[_0x257d66(0x157)]();const _0x11adbc=this['itemAt'](_0x314a21),_0x53fe68=this['itemLineRect'](_0x314a21),_0x159049=_0x53fe68[_0x257d66(0x413)];this['changePaintOpacity'](this[_0x257d66(0x290)](_0x11adbc)),this['drawItemName'](_0x11adbc,_0x53fe68['x'],_0x53fe68['y'],_0x159049),this[_0x257d66(0x15c)](_0x11adbc,_0x53fe68),this[_0x257d66(0x31d)](!![]);},Window_ShopBuy['prototype']['drawItemCost']=function(_0x4a57e,_0x6568e9){const _0x12666f=_0x561d2e,_0x4e769a=this[_0x12666f(0x348)](_0x4a57e);this[_0x12666f(0x233)](_0x4e769a,TextManager[_0x12666f(0x3ed)],_0x6568e9['x'],_0x6568e9['y'],_0x6568e9[_0x12666f(0x413)]);},Window_ShopSell['prototype'][_0x561d2e(0x2b5)]=function(){const _0x4e7d8c=_0x561d2e;return SceneManager[_0x4e7d8c(0x16a)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ[_0x561d2e(0x12d)]['Window_ShopSell_isEnabled']=Window_ShopSell['prototype'][_0x561d2e(0x290)],Window_ShopSell[_0x561d2e(0x1d9)]['isEnabled']=function(_0x3614d5){const _0x4fee92=_0x561d2e;if(!_0x3614d5)return![];const _0x47af14=_0x3614d5['note'];if(_0x47af14['match'](/<CANNOT SELL>/i))return![];if(_0x47af14[_0x4fee92(0x172)](/<CAN SELL>/i))return!![];if(_0x47af14[_0x4fee92(0x172)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x157104=JSON[_0x4fee92(0x446)]('['+RegExp['$1'][_0x4fee92(0x172)](/\d+/g)+']');for(const _0x1dbb2b of _0x157104){if(!$gameSwitches[_0x4fee92(0x1f1)](_0x1dbb2b))return![];}}if(_0x47af14[_0x4fee92(0x172)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x337651=JSON['parse']('['+RegExp['$1'][_0x4fee92(0x172)](/\d+/g)+']');for(const _0x586349 of _0x337651){if(!$gameSwitches[_0x4fee92(0x1f1)](_0x586349))return![];}}if(_0x47af14[_0x4fee92(0x172)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26ca2c=JSON[_0x4fee92(0x446)]('['+RegExp['$1'][_0x4fee92(0x172)](/\d+/g)+']');for(const _0x410d47 of _0x26ca2c){if($gameSwitches[_0x4fee92(0x1f1)](_0x410d47))return![];}}return VisuMZ[_0x4fee92(0x12d)][_0x4fee92(0x189)][_0x4fee92(0x27d)](this,_0x3614d5);},Window_ShopStatus['prototype']['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3ac)]=function(){const _0x481883=_0x561d2e;Window_StatusBase[_0x481883(0x1d9)][_0x481883(0x3ac)]['call'](this);for(const _0x42e66e of $gameParty[_0x481883(0x1b2)]()){ImageManager[_0x481883(0x231)](_0x42e66e[_0x481883(0x146)]());}},Window_ShopStatus['prototype']['translucentOpacity']=function(){const _0x155187=_0x561d2e;return VisuMZ[_0x155187(0x12d)][_0x155187(0x3a5)]['StatusWindow'][_0x155187(0x3b0)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x20f)]=function(){const _0x33f404=_0x561d2e;this[_0x33f404(0x42a)][_0x33f404(0x34d)](),this[_0x33f404(0x1f2)][_0x33f404(0x34d)](),this[_0x33f404(0x123)]&&(this[_0x33f404(0x157)](),this[_0x33f404(0x31d)](!![]),this[_0x33f404(0x1dc)](),this[_0x33f404(0x365)]()?this[_0x33f404(0x272)]():this['drawItemData']());},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2ec)]=function(_0x1e6c95,_0x547c1a){const _0x1ed070=_0x561d2e;if(!this[_0x1ed070(0x365)]()&&!DataManager[_0x1ed070(0x20c)](this[_0x1ed070(0x123)]))return;const _0x26caf5=this[_0x1ed070(0x3fd)]-this[_0x1ed070(0x3ca)]()-_0x1e6c95,_0xcc27a5=this['textWidth'](_0x1ed070(0x14e));this[_0x1ed070(0x24c)](ColorManager['systemColor']()),this[_0x1ed070(0x271)](TextManager[_0x1ed070(0x398)],_0x1e6c95+this[_0x1ed070(0x3ca)](),_0x547c1a,_0x26caf5-_0xcc27a5),this[_0x1ed070(0x1b4)](),this[_0x1ed070(0x3be)](this[_0x1ed070(0x123)],_0x1e6c95,_0x547c1a,_0x26caf5);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x279)]=function(_0x1474b0,_0x1594cd,_0x254777,_0x4c12b1,_0xcbdbc1){const _0x2e317a=_0x561d2e;if(VisuMZ[_0x2e317a(0x12d)]['Settings'][_0x2e317a(0x473)][_0x2e317a(0x218)]===![])return;_0xcbdbc1=Math[_0x2e317a(0x419)](_0xcbdbc1||0x1,0x1);while(_0xcbdbc1--){_0x4c12b1=_0x4c12b1||this[_0x2e317a(0x28a)](),this[_0x2e317a(0x1f2)][_0x2e317a(0x37c)]=0xa0;const _0x116763=ColorManager[_0x2e317a(0x37a)]();this[_0x2e317a(0x1f2)][_0x2e317a(0x465)](_0x1474b0+0x1,_0x1594cd+0x1,_0x254777-0x2,_0x4c12b1-0x2,_0x116763),this[_0x2e317a(0x1f2)][_0x2e317a(0x37c)]=0xff;}},ColorManager[_0x561d2e(0x37a)]=function(){const _0x179c8f=_0x561d2e,_0x2ef18b=VisuMZ[_0x179c8f(0x12d)][_0x179c8f(0x3a5)][_0x179c8f(0x473)];let _0x1ee621=_0x2ef18b[_0x179c8f(0x3ce)]!==undefined?_0x2ef18b['BackRectColor']:0x13;return ColorManager[_0x179c8f(0x2cc)](_0x1ee621);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x272)]=function(){const _0x54d09c=_0x561d2e;VisuMZ[_0x54d09c(0x12d)][_0x54d09c(0x3a5)][_0x54d09c(0x473)][_0x54d09c(0x288)]['call'](this);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3b9)]=function(_0x44e7c3,_0x5700b0,_0x20762d){const _0x24fe36=_0x561d2e;if(!this[_0x24fe36(0x365)]())return![];const _0x30d856=$dataSystem['equipTypes'][this['_item'][_0x24fe36(0x147)]];return this['drawItemKeyData'](_0x30d856,_0x44e7c3,_0x5700b0,_0x20762d,!![]),this[_0x24fe36(0x279)](_0x44e7c3,_0x5700b0,_0x20762d),this[_0x24fe36(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x301)]=function(){const _0x2b6ef3=_0x561d2e,_0x2ad502=VisuMZ[_0x2b6ef3(0x12d)][_0x2b6ef3(0x3a5)][_0x2b6ef3(0x19c)][_0x2b6ef3(0x42b)];return _0x2ad502[_0x2b6ef3(0x39a)]($gameParty[_0x2b6ef3(0x281)](this[_0x2b6ef3(0x123)]));},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2bd)]=function(){const _0x28e3b0=_0x561d2e;return Imported[_0x28e3b0(0x13f)]?VisuMZ[_0x28e3b0(0x3a4)][_0x28e3b0(0x3a5)]['Param']['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x379)]=function(){const _0x345b0c=_0x561d2e;return VisuMZ[_0x345b0c(0x12d)]['Settings'][_0x345b0c(0x473)]['ParamChangeFontSize'];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x275)]=function(_0x125a5d,_0x5f1b6b,_0x4e76f4,_0x407072){const _0x23a8f7=_0x561d2e;this['resetFontSettings'](),this['contents'][_0x23a8f7(0x237)]=this[_0x23a8f7(0x379)]();let _0xe58497=this[_0x23a8f7(0x32c)](TextManager['param'](_0x125a5d))+0x4+_0x5f1b6b;return Imported[_0x23a8f7(0x13f)]?(this['drawParamText'](_0x5f1b6b,_0x4e76f4,_0x407072,_0x125a5d,!![]),VisuMZ[_0x23a8f7(0x3a4)]['Settings'][_0x23a8f7(0x25e)][_0x23a8f7(0x21e)]&&(_0xe58497+=ImageManager[_0x23a8f7(0x1be)]+0x4)):(this['changeTextColor'](ColorManager[_0x23a8f7(0x2b2)]()),this[_0x23a8f7(0x271)](TextManager[_0x23a8f7(0x3b6)](_0x125a5d),_0x5f1b6b,_0x4e76f4,_0x407072)),this[_0x23a8f7(0x157)](),_0xe58497;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x36d)]=function(_0xf83f93,_0x791898,_0x41be59,_0x355092,_0x42c031){const _0x11c515=_0x561d2e;_0x41be59+=this[_0x11c515(0x3ca)](),_0x42c031-=this[_0x11c515(0x3ca)]()*0x2;const _0x5dfc17=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'];this['contents'][_0x11c515(0x237)]=_0x5dfc17['ParamChangeFontSize'],this[_0x11c515(0x31d)](_0xf83f93[_0x11c515(0x166)](this[_0x11c515(0x123)]));if(_0xf83f93[_0x11c515(0x40b)](this[_0x11c515(0x123)])){const _0x501e6e=_0x5dfc17['AlreadyEquipMarker'];this[_0x11c515(0x271)](_0x501e6e,_0x41be59,_0x355092,_0x42c031,_0x11c515(0x33a));}else{if(_0xf83f93[_0x11c515(0x166)](this[_0x11c515(0x123)])){const _0x5ed037=this[_0x11c515(0x2c1)](_0xf83f93,this['_item'][_0x11c515(0x147)]),_0x4f507d=JsonEx[_0x11c515(0x2a9)](_0xf83f93);_0x4f507d[_0x11c515(0x318)]=!![];const _0x62b9cb=_0x4f507d['equipSlots']()[_0x11c515(0x39f)](this[_0x11c515(0x123)][_0x11c515(0x147)]);if(_0x62b9cb>=0x0)_0x4f507d[_0x11c515(0x247)](_0x62b9cb,this[_0x11c515(0x123)]);let _0x340adb=0x0,_0x288e08=0x0,_0x1419bc=0x0;Imported[_0x11c515(0x13f)]?(_0x340adb=_0x4f507d[_0x11c515(0x314)](_0x791898),_0x288e08=_0x340adb-_0xf83f93['paramValueByName'](_0x791898),this[_0x11c515(0x24c)](ColorManager[_0x11c515(0x470)](_0x288e08)),_0x1419bc=(_0x288e08>=0x0?'+':'')+VisuMZ[_0x11c515(0x2dc)](_0x288e08,0x0,_0x791898)):(_0x340adb=_0x4f507d[_0x11c515(0x3b6)](_0x791898),_0x288e08=_0x340adb-_0xf83f93[_0x11c515(0x3b6)](_0x791898),this['changeTextColor'](ColorManager[_0x11c515(0x470)](_0x288e08)),_0x1419bc=(_0x288e08>=0x0?'+':'')+_0x288e08);if(_0x1419bc==='+0')_0x1419bc=_0x5dfc17[_0x11c515(0x243)];this['drawText'](_0x1419bc,_0x41be59,_0x355092,_0x42c031,'center');}else{const _0x24abf2=_0x5dfc17[_0x11c515(0x2a4)];this[_0x11c515(0x271)](_0x24abf2,_0x41be59,_0x355092,_0x42c031,_0x11c515(0x33a));}}this[_0x11c515(0x157)](),this[_0x11c515(0x31d)](!![]);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x311)]=function(){const _0x468de9=_0x561d2e;VisuMZ[_0x468de9(0x12d)]['Settings']['StatusWindow'][_0x468de9(0x2fc)][_0x468de9(0x27d)](this);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x1dc)]=function(){const _0x154f3f=_0x561d2e;this[_0x154f3f(0x300)]={};if(!this[_0x154f3f(0x123)])return;const _0x272699=this[_0x154f3f(0x123)]['note'];if(_0x272699[_0x154f3f(0x172)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x472c8c=String(RegExp['$1'])[_0x154f3f(0x30a)](/[\r\n]+/);for(const _0x303787 of _0x472c8c){if(_0x303787['match'](/(.*):[ ](.*)/i)){const _0x497be4=String(RegExp['$1'])['toUpperCase']()[_0x154f3f(0x1bf)](),_0x141266=String(RegExp['$2'])[_0x154f3f(0x1bf)]();this[_0x154f3f(0x300)][_0x497be4]=_0x141266;}}}},Window_ShopStatus['prototype'][_0x561d2e(0x33c)]=function(){const _0x1e43f6=_0x561d2e;return Math[_0x1e43f6(0x419)](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x157)]=function(){const _0x3e67e3=_0x561d2e;Window_StatusBase['prototype'][_0x3e67e3(0x157)][_0x3e67e3(0x27d)](this),this[_0x3e67e3(0x42a)][_0x3e67e3(0x237)]=this[_0x3e67e3(0x204)]||this[_0x3e67e3(0x42a)][_0x3e67e3(0x237)],this[_0x3e67e3(0x42a)][_0x3e67e3(0x1a0)]=this[_0x3e67e3(0x321)]||this[_0x3e67e3(0x42a)][_0x3e67e3(0x1a0)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x150)]=function(){const _0x5bb0fa=_0x561d2e;return this[_0x5bb0fa(0x42a)]['fontSize']/$gameSystem['mainFontSize']();},Window_ShopStatus['prototype'][_0x561d2e(0x130)]=function(_0x3089f6,_0x5ba8a2,_0x38e841){const _0x7ebd88=_0x561d2e,_0x48f450=ImageManager['loadSystem'](_0x7ebd88(0x2a6)),_0x5596b1=ImageManager[_0x7ebd88(0x1be)],_0x2571b1=ImageManager[_0x7ebd88(0x25d)],_0x3017aa=_0x3089f6%0x10*_0x5596b1,_0x17ab59=Math[_0x7ebd88(0x409)](_0x3089f6/0x10)*_0x2571b1,_0x3c60e8=Math['ceil'](_0x5596b1*this['fontSizeRatio']()),_0x46846a=Math[_0x7ebd88(0x17e)](_0x2571b1*this['fontSizeRatio']());this[_0x7ebd88(0x42a)][_0x7ebd88(0x3fc)](_0x48f450,_0x3017aa,_0x17ab59,_0x5596b1,_0x2571b1,_0x5ba8a2,_0x38e841,_0x3c60e8,_0x46846a);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3a9)]=function(_0x579204,_0x28fd5e){const _0x4e4b33=_0x561d2e;_0x28fd5e[_0x4e4b33(0x1c3)]&&this[_0x4e4b33(0x130)](_0x579204,_0x28fd5e['x'],_0x28fd5e['y']+0x2);_0x28fd5e['x']+=Math['ceil'](ImageManager[_0x4e4b33(0x1be)]*this[_0x4e4b33(0x150)]());if(this['fontSizeRatio']()===0x1)_0x28fd5e['x']+=0x4;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2fd)]=function(_0x401d06,_0x628bda,_0x1f9859,_0x5a891c,_0x5040b4,_0x448a3b){const _0x44d454=_0x561d2e;_0x401d06=_0x401d06||'',_0x448a3b=_0x448a3b||_0x44d454(0x439),this[_0x44d454(0x204)]=this[_0x44d454(0x33c)](),this['_resetFontColor']=_0x5040b4?ColorManager[_0x44d454(0x2b2)]():this['contents'][_0x44d454(0x1a0)],_0x628bda+=this[_0x44d454(0x3ca)](),_0x5a891c-=this[_0x44d454(0x3ca)]()*0x2;const _0x141582=this[_0x44d454(0x144)](_0x401d06);if(_0x448a3b===_0x44d454(0x33a))_0x628bda=_0x628bda+Math[_0x44d454(0x409)]((_0x5a891c-_0x141582[_0x44d454(0x413)])/0x2);else _0x448a3b===_0x44d454(0x14d)&&(_0x628bda=_0x628bda+_0x5a891c-_0x141582[_0x44d454(0x413)]);_0x1f9859+=(this[_0x44d454(0x28a)]()-_0x141582[_0x44d454(0x1c0)])/0x2,this['drawTextEx'](_0x401d06,_0x628bda,_0x1f9859,_0x5a891c),this[_0x44d454(0x204)]=undefined,this[_0x44d454(0x321)]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x216)]=function(_0x469db5,_0x3599e0,_0x20e0ec){const _0x3b433a=_0x561d2e;if(!DataManager[_0x3b433a(0x20c)](this[_0x3b433a(0x123)]))return![];const _0x4ade29=this['getItemConsumableLabel']();this[_0x3b433a(0x2fd)](_0x4ade29,_0x469db5,_0x3599e0,_0x20e0ec,!![]);const _0x375050=this[_0x3b433a(0x33b)]();return this[_0x3b433a(0x2fd)](_0x375050,_0x469db5,_0x3599e0,_0x20e0ec,![],_0x3b433a(0x14d)),this[_0x3b433a(0x279)](_0x469db5,_0x3599e0,_0x20e0ec),this[_0x3b433a(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemConsumableLabel']=function(){const _0x24d422=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x24d422(0x3a5)][_0x24d422(0x473)][_0x24d422(0x3e0)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x33b)]=function(){const _0x74f6ea=_0x561d2e,_0x51998e=_0x74f6ea(0x1a9);if(this[_0x74f6ea(0x300)][_0x51998e])return this['_customItemInfo'][_0x51998e];return this[_0x74f6ea(0x392)]()?VisuMZ[_0x74f6ea(0x12d)]['Settings']['StatusWindow'][_0x74f6ea(0x2c4)]:VisuMZ[_0x74f6ea(0x12d)]['Settings']['StatusWindow'][_0x74f6ea(0x38f)];},Window_ShopStatus[_0x561d2e(0x1d9)]['canConsumeItem']=function(){const _0x18acef=_0x561d2e;return VisuMZ[_0x18acef(0x3a4)]&&VisuMZ[_0x18acef(0x3a4)][_0x18acef(0x3a5)][_0x18acef(0x333)]['KeyItemProtect']&&DataManager[_0x18acef(0x1f3)](this['_item'])?![]:this[_0x18acef(0x123)]['consumable'];},Window_ShopStatus['prototype'][_0x561d2e(0x13c)]=function(_0x2aae61,_0x513b8d,_0x392734){const _0x14c70e=_0x561d2e;if(!this[_0x14c70e(0x365)]()&&!DataManager[_0x14c70e(0x20c)](this[_0x14c70e(0x123)]))return![];if(DataManager[_0x14c70e(0x1f3)](this['_item'])&&!$dataSystem[_0x14c70e(0x342)]){const _0x5da236=TextManager[_0x14c70e(0x167)];this[_0x14c70e(0x2fd)](_0x5da236,_0x2aae61,_0x513b8d,_0x392734,!![],_0x14c70e(0x33a));}else{const _0x6224a8=TextManager['possession'];this[_0x14c70e(0x2fd)](_0x6224a8,_0x2aae61,_0x513b8d,_0x392734,!![]);const _0xeb1c3e=this['getItemQuantityText']();this[_0x14c70e(0x2fd)](_0xeb1c3e,_0x2aae61,_0x513b8d,_0x392734,![],_0x14c70e(0x14d));}return this[_0x14c70e(0x279)](_0x2aae61,_0x513b8d,_0x392734),this[_0x14c70e(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemQuantityText']=function(){const _0x235f5a=_0x561d2e,_0x7bbaac=_0x235f5a(0x245);if(this['_customItemInfo'][_0x7bbaac])return this['_customItemInfo'][_0x7bbaac];const _0x379c65=VisuMZ[_0x235f5a(0x12d)][_0x235f5a(0x3a5)][_0x235f5a(0x19c)][_0x235f5a(0x42b)];return _0x379c65[_0x235f5a(0x39a)]($gameParty[_0x235f5a(0x281)](this[_0x235f5a(0x123)]));},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x45b)]=function(_0x25df46,_0x4164ed,_0x25371c){const _0x562877=_0x561d2e,_0x5db62e=this[_0x562877(0x29d)]();return this[_0x562877(0x2fd)](_0x5db62e,_0x25df46,_0x4164ed,_0x25371c,![],_0x562877(0x33a)),this['drawItemDarkRect'](_0x25df46,_0x4164ed,_0x25371c),this[_0x562877(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemOccasionText']=function(){const _0x82033d=_0x561d2e,_0x500649=_0x82033d(0x235);if(this[_0x82033d(0x300)][_0x500649])return this[_0x82033d(0x300)][_0x500649];const _0x306864=VisuMZ[_0x82033d(0x12d)][_0x82033d(0x3a5)]['StatusWindow'],_0x3d1428='Occasion%1'[_0x82033d(0x39a)](this['_item'][_0x82033d(0x143)]);return _0x306864[_0x3d1428];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3f5)]=function(_0x40e651,_0xd46a75,_0x504055){const _0x477ddf=_0x561d2e,_0x4e5882=this[_0x477ddf(0x1b9)]();return this['drawItemKeyData'](_0x4e5882,_0x40e651,_0xd46a75,_0x504055,![],'center'),this[_0x477ddf(0x279)](_0x40e651,_0xd46a75,_0x504055),this[_0x477ddf(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x1b9)]=function(){const _0xdc95ac=_0x561d2e,_0x4318e8=_0xdc95ac(0x412);if(this['_customItemInfo'][_0x4318e8])return this[_0xdc95ac(0x300)][_0x4318e8];const _0x42b00b=VisuMZ[_0xdc95ac(0x12d)][_0xdc95ac(0x3a5)][_0xdc95ac(0x473)];if(Imported[_0xdc95ac(0x387)]){const _0x5918fe=this[_0xdc95ac(0x123)]['note'];if(_0x5918fe[_0xdc95ac(0x172)](/<TARGET:[ ](.*)>/i)){const _0xe0c6d=String(RegExp['$1']);if(_0xe0c6d[_0xdc95ac(0x172)](/(\d+) RANDOM ANY/i))return _0x42b00b[_0xdc95ac(0x15a)]['format'](Number(RegExp['$1']));else{if(_0xe0c6d[_0xdc95ac(0x172)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x42b00b[_0xdc95ac(0x1e3)][_0xdc95ac(0x39a)](Number(RegExp['$1']));else{if(_0xe0c6d[_0xdc95ac(0x172)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x42b00b[_0xdc95ac(0x34b)][_0xdc95ac(0x39a)](Number(RegExp['$1']));else{if(_0xe0c6d[_0xdc95ac(0x172)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x42b00b['ScopeAlliesButUser'];}}}}}const _0x4f79c2=_0xdc95ac(0x1e1)['format'](this[_0xdc95ac(0x123)]['scope']);return _0x42b00b[_0x4f79c2];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x215)]=function(_0x25642d,_0x1db92c,_0x4c6152){const _0x1895dd=_0x561d2e,_0x4b9924=this[_0x1895dd(0x210)]();this[_0x1895dd(0x2fd)](_0x4b9924,_0x25642d,_0x1db92c,_0x4c6152,!![]);const _0x9824b1=this[_0x1895dd(0x382)]();return this['drawItemKeyData'](_0x9824b1,_0x25642d,_0x1db92c,_0x4c6152,![],'right'),this[_0x1895dd(0x279)](_0x25642d,_0x1db92c,_0x4c6152),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemSpeedLabel']=function(){const _0x4c5e6f=_0x561d2e;return VisuMZ['ItemsEquipsCore'][_0x4c5e6f(0x3a5)]['StatusWindow'][_0x4c5e6f(0x1ba)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x382)]=function(){const _0x2f8ce5=_0x561d2e,_0x2038ad=_0x2f8ce5(0x1e6);if(this['_customItemInfo'][_0x2038ad])return this[_0x2f8ce5(0x300)][_0x2038ad];const _0x21bd54=this['_item'][_0x2f8ce5(0x40d)];if(_0x21bd54>=0x7d0)return VisuMZ[_0x2f8ce5(0x12d)]['Settings']['StatusWindow']['Speed2000'];else{if(_0x21bd54>=0x3e8)return VisuMZ[_0x2f8ce5(0x12d)]['Settings'][_0x2f8ce5(0x473)][_0x2f8ce5(0x435)];else{if(_0x21bd54>0x0)return VisuMZ[_0x2f8ce5(0x12d)][_0x2f8ce5(0x3a5)][_0x2f8ce5(0x473)][_0x2f8ce5(0x3da)];else{if(_0x21bd54===0x0)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['Speed0'];else{if(_0x21bd54>-0x3e8)return VisuMZ['ItemsEquipsCore'][_0x2f8ce5(0x3a5)]['StatusWindow'][_0x2f8ce5(0x453)];else{if(_0x21bd54>-0x7d0)return VisuMZ[_0x2f8ce5(0x12d)][_0x2f8ce5(0x3a5)][_0x2f8ce5(0x473)][_0x2f8ce5(0x2b1)];else return _0x21bd54<=-0x7d0?VisuMZ[_0x2f8ce5(0x12d)]['Settings'][_0x2f8ce5(0x473)][_0x2f8ce5(0x423)]:_0x2f8ce5(0x2e2);}}}}}},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x22e)]=function(_0x5f463c,_0x159486,_0x263a40){const _0x4eb3f7=_0x561d2e,_0x963ef7=this[_0x4eb3f7(0x22f)]();this[_0x4eb3f7(0x2fd)](_0x963ef7,_0x5f463c,_0x159486,_0x263a40,!![]);const _0x1d3621=this[_0x4eb3f7(0x257)]();return this[_0x4eb3f7(0x2fd)](_0x1d3621,_0x5f463c,_0x159486,_0x263a40,![],_0x4eb3f7(0x14d)),this[_0x4eb3f7(0x279)](_0x5f463c,_0x159486,_0x263a40),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x22f)]=function(){const _0x3f9f21=_0x561d2e;return VisuMZ[_0x3f9f21(0x12d)]['Settings'][_0x3f9f21(0x473)][_0x3f9f21(0x3e7)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x257)]=function(){const _0x38471c=_0x561d2e,_0x1da79c=_0x38471c(0x43f);if(this[_0x38471c(0x300)][_0x1da79c])return this[_0x38471c(0x300)][_0x1da79c];if(Imported['VisuMZ_1_BattleCore']){const _0x23e8da=this[_0x38471c(0x123)][_0x38471c(0x46b)];if(_0x23e8da[_0x38471c(0x172)](/<ALWAYS HIT>/i))return'100%';else{if(_0x23e8da[_0x38471c(0x172)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x38471c(0x3c8)[_0x38471c(0x39a)](Number(RegExp['$1']));}}return _0x38471c(0x3c8)[_0x38471c(0x39a)](this[_0x38471c(0x123)][_0x38471c(0x3ae)]);},Window_ShopStatus['prototype'][_0x561d2e(0x264)]=function(_0x2cadd4,_0x1ff91c,_0x1213fb){const _0x36244a=_0x561d2e,_0xc21e2a=this[_0x36244a(0x337)]();this['drawItemKeyData'](_0xc21e2a,_0x2cadd4,_0x1ff91c,_0x1213fb,!![]);const _0xb2a960=this[_0x36244a(0x265)]();return this[_0x36244a(0x2fd)](_0xb2a960,_0x2cadd4,_0x1ff91c,_0x1213fb,![],'right'),this[_0x36244a(0x279)](_0x2cadd4,_0x1ff91c,_0x1213fb),this[_0x36244a(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x337)]=function(){const _0x41ce6d=_0x561d2e;return VisuMZ[_0x41ce6d(0x12d)][_0x41ce6d(0x3a5)]['StatusWindow'][_0x41ce6d(0x30d)];},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemRepeatsText']=function(){const _0x2ed117=_0x561d2e,_0xe42021=_0x2ed117(0x425);if(this[_0x2ed117(0x300)][_0xe42021])return this[_0x2ed117(0x300)][_0xe42021];const _0x200836='×%1';return _0x200836['format'](this[_0x2ed117(0x123)][_0x2ed117(0x199)]);},Window_ShopStatus[_0x561d2e(0x1d9)]['drawItemHitType']=function(_0x23a8b9,_0x370550,_0x586d86){const _0x4ceddb=_0x561d2e,_0x472184=this[_0x4ceddb(0x1c7)]();this[_0x4ceddb(0x2fd)](_0x472184,_0x23a8b9,_0x370550,_0x586d86,!![]);const _0x1a8f11=this[_0x4ceddb(0x3c9)]();return this[_0x4ceddb(0x2fd)](_0x1a8f11,_0x23a8b9,_0x370550,_0x586d86,![],_0x4ceddb(0x14d)),this['drawItemDarkRect'](_0x23a8b9,_0x370550,_0x586d86),this[_0x4ceddb(0x157)](),!![];},Window_ShopStatus['prototype']['getItemHitTypeLabel']=function(){const _0xb4e8ed=_0x561d2e;return VisuMZ[_0xb4e8ed(0x12d)][_0xb4e8ed(0x3a5)][_0xb4e8ed(0x473)][_0xb4e8ed(0x240)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3c9)]=function(){const _0x316afe=_0x561d2e,_0x3c80e4='HIT\x20TYPE';if(this[_0x316afe(0x300)][_0x3c80e4])return this[_0x316afe(0x300)][_0x3c80e4];const _0xfa2c18=VisuMZ[_0x316afe(0x12d)][_0x316afe(0x3a5)][_0x316afe(0x473)],_0x2bace7='HitType%1'[_0x316afe(0x39a)](this[_0x316afe(0x123)][_0x316afe(0x177)]);return _0xfa2c18[_0x2bace7];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x137)]=function(_0xaf60a6,_0x22428b,_0x1579cd){const _0xd1eceb=_0x561d2e;if(this[_0xd1eceb(0x123)][_0xd1eceb(0x2f7)]['type']<=0x0)return _0x22428b;if(this[_0xd1eceb(0x2cf)](_0xaf60a6,_0x22428b,_0x1579cd))_0x22428b+=this[_0xd1eceb(0x28a)]();if(this[_0xd1eceb(0x407)](_0xaf60a6,_0x22428b,_0x1579cd))_0x22428b+=this[_0xd1eceb(0x28a)]();return this[_0xd1eceb(0x157)](),_0x22428b;},Window_ShopStatus[_0x561d2e(0x1d9)]['drawItemDamageElement']=function(_0x19f5b3,_0x39e6fb,_0x51b580){const _0x18503b=_0x561d2e,_0x3350c8=this[_0x18503b(0x36b)]();this[_0x18503b(0x2fd)](_0x3350c8,_0x19f5b3,_0x39e6fb,_0x51b580,!![]);const _0x27a5c9=this[_0x18503b(0x431)]();return this['drawItemKeyData'](_0x27a5c9,_0x19f5b3,_0x39e6fb,_0x51b580,![],_0x18503b(0x14d)),this['drawItemDarkRect'](_0x19f5b3,_0x39e6fb,_0x51b580),this[_0x18503b(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x36b)]=function(){const _0x35a394=_0x561d2e;return VisuMZ[_0x35a394(0x12d)][_0x35a394(0x3a5)][_0x35a394(0x473)][_0x35a394(0x24b)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x431)]=function(){const _0x5cd6da=_0x561d2e,_0x4442ba=_0x5cd6da(0x373);if(this['_customItemInfo'][_0x4442ba])return this[_0x5cd6da(0x300)][_0x4442ba];if(this['_item'][_0x5cd6da(0x2f7)][_0x5cd6da(0x447)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x5cd6da(0x3a5)][_0x5cd6da(0x473)][_0x5cd6da(0x366)];else return this[_0x5cd6da(0x123)][_0x5cd6da(0x2f7)][_0x5cd6da(0x447)]===0x0?VisuMZ[_0x5cd6da(0x12d)][_0x5cd6da(0x3a5)][_0x5cd6da(0x473)][_0x5cd6da(0x145)]:$dataSystem[_0x5cd6da(0x37e)][this['_item']['damage'][_0x5cd6da(0x447)]];},Window_ShopStatus['prototype'][_0x561d2e(0x407)]=function(_0x306c49,_0x35dba4,_0x3c1a10){const _0x54a4e8=_0x561d2e,_0x3e99fe=this[_0x54a4e8(0x31a)]();this[_0x54a4e8(0x2fd)](_0x3e99fe,_0x306c49,_0x35dba4,_0x3c1a10,!![]),this['setupItemDamageTempActors']();const _0xf3acc0=this[_0x54a4e8(0x23d)](),_0x9dc1db=ColorManager[_0x54a4e8(0x188)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x54a4e8(0x123)][_0x54a4e8(0x2f7)][_0x54a4e8(0x206)]]);return this[_0x54a4e8(0x24c)](_0x9dc1db),this[_0x54a4e8(0x2fd)](_0xf3acc0,_0x306c49,_0x35dba4,_0x3c1a10,![],_0x54a4e8(0x14d)),this[_0x54a4e8(0x279)](_0x306c49,_0x35dba4,_0x3c1a10),this[_0x54a4e8(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x31a)]=function(){const _0xb8f10c=_0x561d2e;return Imported['VisuMZ_1_BattleCore']&&DataManager['getDamageStyle'](this['_item'])!==_0xb8f10c(0x1e8)?this[_0xb8f10c(0x391)]():this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x43c)]=function(){const _0x8fb020=_0x561d2e,_0x7254b9=VisuMZ[_0x8fb020(0x12d)]['Settings'][_0x8fb020(0x473)],_0x17085d=_0x8fb020(0x443)[_0x8fb020(0x39a)](this[_0x8fb020(0x123)]['damage'][_0x8fb020(0x206)]),_0x28f589=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x8fb020(0x123)][_0x8fb020(0x2f7)]['type']];return _0x7254b9[_0x17085d][_0x8fb020(0x39a)](_0x28f589);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x19d)]=function(){const _0x3338f3=_0x561d2e,_0xef0e12=$gameActors[_0x3338f3(0x2e9)](0x1);this['_tempActorA']=JsonEx['makeDeepCopy'](_0xef0e12),this[_0x3338f3(0x1bb)]=JsonEx[_0x3338f3(0x2a9)](_0xef0e12);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x23d)]=function(){const _0x55107c=_0x561d2e,_0x194b52=_0x55107c(0x437);if(this[_0x55107c(0x300)][_0x194b52])return this[_0x55107c(0x300)][_0x194b52];return Imported[_0x55107c(0x387)]&&DataManager['getDamageStyle'](this['_item'])!==_0x55107c(0x1e8)?this['getItemDamageAmountTextBattleCore']():this[_0x55107c(0x202)]();},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x202)]=function(){const _0x4ebddb=_0x561d2e;window['a']=this[_0x4ebddb(0x464)],window['b']=this['_tempActorB'],this[_0x4ebddb(0x464)][_0x4ebddb(0x2b0)](!![]),this[_0x4ebddb(0x1bb)][_0x4ebddb(0x2b0)]([0x3,0x4][_0x4ebddb(0x198)](this['_item'][_0x4ebddb(0x2f7)]['type']));let _0x41550b=this[_0x4ebddb(0x123)][_0x4ebddb(0x2f7)][_0x4ebddb(0x219)];try{const _0x5efded=Math[_0x4ebddb(0x419)](eval(_0x41550b),0x0)/window['a'][_0x4ebddb(0x270)];return this[_0x4ebddb(0x2f6)](),isNaN(_0x5efded)?'?????':_0x4ebddb(0x3c8)['format'](Math['round'](_0x5efded*0x64));}catch(_0x22257b){return $gameTemp[_0x4ebddb(0x1e2)]()&&(console['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0x4ebddb(0x39a)](this[_0x4ebddb(0x123)][_0x4ebddb(0x2fa)])),console[_0x4ebddb(0x2eb)](_0x22257b)),this['revertGlobalNamespaceVariables'](),_0x4ebddb(0x2e2);}},Window_ShopStatus['prototype'][_0x561d2e(0x2f6)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x561d2e(0x1d9)]['drawItemEffects']=function(_0x3aa51b,_0x1857ae,_0x567aa2){const _0x5215b8=_0x561d2e;if(!this[_0x5215b8(0x1a4)]())return _0x1857ae;if(this[_0x5215b8(0x138)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x2ce)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x250)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this['drawItemEffectsHpDamage'](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x35d)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this['lineHeight']();if(this[_0x5215b8(0x15e)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x173)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x421)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this[_0x5215b8(0x28a)]();if(this[_0x5215b8(0x1d4)](_0x3aa51b,_0x1857ae,_0x567aa2))_0x1857ae+=this['lineHeight']();return this[_0x5215b8(0x157)](),_0x1857ae;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x1a4)]=function(){const _0x519cde=_0x561d2e;let _0x5c78f2=![];this[_0x519cde(0x38b)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x4f9889 of this[_0x519cde(0x123)]['effects']){switch(_0x4f9889[_0x519cde(0x1a8)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x519cde(0x38b)][_0x519cde(0x1eb)]+=_0x4f9889[_0x519cde(0x221)],this[_0x519cde(0x38b)]['flatHP']+=_0x4f9889['value2'],_0x5c78f2=!![];break;case Game_Action[_0x519cde(0x200)]:this[_0x519cde(0x38b)][_0x519cde(0x36f)]+=_0x4f9889['value1'],this[_0x519cde(0x38b)][_0x519cde(0x40c)]+=_0x4f9889[_0x519cde(0x1d5)],_0x5c78f2=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x519cde(0x38b)]['gainTP']+=_0x4f9889[_0x519cde(0x221)],_0x5c78f2=!![];break;case Game_Action[_0x519cde(0x3bf)]:this[_0x519cde(0x38b)][_0x519cde(0x459)][_0x519cde(0x15d)](_0x4f9889[_0x519cde(0x3fe)]),_0x5c78f2=!![];break;case Game_Action[_0x519cde(0x3c4)]:this[_0x519cde(0x38b)][_0x519cde(0x442)][_0x519cde(0x15d)](_0x4f9889['dataId']),this['_itemData'][_0x519cde(0x1a1)]=!![],_0x5c78f2=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0x519cde(0x38b)][_0x519cde(0x295)][_0x4f9889['dataId']]+=0x1,_0x5c78f2=!![];break;case Game_Action[_0x519cde(0x355)]:this[_0x519cde(0x38b)][_0x519cde(0x295)][_0x4f9889['dataId']]-=0x1,_0x5c78f2=!![];break;case Game_Action[_0x519cde(0x208)]:this[_0x519cde(0x38b)][_0x519cde(0x43b)][_0x519cde(0x15d)](_0x4f9889[_0x519cde(0x3fe)]),this[_0x519cde(0x38b)][_0x519cde(0x1a1)]=!![],_0x5c78f2=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x519cde(0x38b)][_0x519cde(0x1c9)][_0x519cde(0x15d)](_0x4f9889[_0x519cde(0x3fe)]),this[_0x519cde(0x38b)]['removeStateBuffChanges']=!![],_0x5c78f2=!![];break;}}if(this[_0x519cde(0x38b)][_0x519cde(0x459)][_0x519cde(0x22d)]>0x0)this[_0x519cde(0x38b)][_0x519cde(0x403)]=!![];for(let _0x3ecaca=0x0;_0x3ecaca<this[_0x519cde(0x38b)][_0x519cde(0x295)][_0x519cde(0x22d)];_0x3ecaca++){if(this[_0x519cde(0x38b)][_0x519cde(0x295)][_0x3ecaca]!==0x0)this[_0x519cde(0x38b)][_0x519cde(0x403)]=!![];}this[_0x519cde(0x123)][_0x519cde(0x336)]!==0x0&&(this[_0x519cde(0x38b)][_0x519cde(0x3a1)]=this['_item']['tpGain'],_0x5c78f2=!![]);const _0x255f65=['HP\x20RECOVERY',_0x519cde(0x304),'TP\x20RECOVERY',_0x519cde(0x2d1),_0x519cde(0x331),_0x519cde(0x449),_0x519cde(0x298),_0x519cde(0x3d3),_0x519cde(0x3f8)];for(const _0x7aec03 of _0x255f65){if(this['_customItemInfo'][_0x7aec03]){_0x5c78f2=!![];break;}}return _0x5c78f2;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x138)]=function(_0x178406,_0x16ea27,_0x57fdb9){const _0x49bc90=_0x561d2e,_0xdb3bef=_0x49bc90(0x2df);if(this[_0x49bc90(0x38b)][_0x49bc90(0x1eb)]<=0x0&&this[_0x49bc90(0x38b)][_0x49bc90(0x2a5)]<=0x0&&!this['_customItemInfo'][_0xdb3bef])return![];const _0x4d23e3=this[_0x49bc90(0x3ff)]();this[_0x49bc90(0x2fd)](_0x4d23e3,_0x178406,_0x16ea27,_0x57fdb9,!![]);const _0x4aed2b=this[_0x49bc90(0x41c)]();return this['changeTextColor'](ColorManager[_0x49bc90(0x188)](0x1)),this[_0x49bc90(0x2fd)](_0x4aed2b,_0x178406,_0x16ea27,_0x57fdb9,![],_0x49bc90(0x14d)),this[_0x49bc90(0x279)](_0x178406,_0x16ea27,_0x57fdb9),this[_0x49bc90(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3ff)]=function(){const _0x3c0aee=_0x561d2e,_0x37ceaa=VisuMZ[_0x3c0aee(0x12d)]['Settings']['StatusWindow'][_0x3c0aee(0x335)];return _0x37ceaa[_0x3c0aee(0x39a)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x561d2e(0x41c)]=function(){const _0x58d717=_0x561d2e,_0x50c16e=_0x58d717(0x2df);if(this['_customItemInfo'][_0x50c16e])return this[_0x58d717(0x300)][_0x50c16e];let _0x5adbc3='';if(this[_0x58d717(0x38b)]['rateHP']>0x0)_0x5adbc3+=_0x58d717(0x361)['format'](Math[_0x58d717(0x409)](this[_0x58d717(0x38b)]['rateHP']*0x64));if(this['_itemData'][_0x58d717(0x1eb)]>0x0&&this[_0x58d717(0x38b)][_0x58d717(0x2a5)]>0x0)_0x5adbc3+='\x20';if(this['_itemData'][_0x58d717(0x2a5)]>0x0)_0x5adbc3+='+%1'['format'](this[_0x58d717(0x38b)][_0x58d717(0x2a5)]);return _0x5adbc3;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2ce)]=function(_0x1e972b,_0x584411,_0x3ee3df){const _0x2b1349=_0x561d2e,_0x163234='MP\x20RECOVERY';if(this[_0x2b1349(0x38b)][_0x2b1349(0x36f)]<=0x0&&this[_0x2b1349(0x38b)][_0x2b1349(0x40c)]<=0x0&&!this[_0x2b1349(0x300)][_0x163234])return![];const _0xfef253=this[_0x2b1349(0x135)]();this['drawItemKeyData'](_0xfef253,_0x1e972b,_0x584411,_0x3ee3df,!![]);const _0x5075c1=this[_0x2b1349(0x12c)]();return this[_0x2b1349(0x24c)](ColorManager[_0x2b1349(0x188)](0x3)),this[_0x2b1349(0x2fd)](_0x5075c1,_0x1e972b,_0x584411,_0x3ee3df,![],_0x2b1349(0x14d)),this[_0x2b1349(0x279)](_0x1e972b,_0x584411,_0x3ee3df),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x561d2e(0x135)]=function(){const _0x21d4c1=_0x561d2e,_0x6fa0d4=VisuMZ['ItemsEquipsCore'][_0x21d4c1(0x3a5)]['StatusWindow']['LabelRecoverMP'];return _0x6fa0d4[_0x21d4c1(0x39a)](TextManager['mp']);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x12c)]=function(){const _0x22acda=_0x561d2e,_0x367f62='MP\x20RECOVERY';if(this[_0x22acda(0x300)][_0x367f62])return this[_0x22acda(0x300)][_0x367f62];let _0x1429a4='';if(this[_0x22acda(0x38b)][_0x22acda(0x36f)]>0x0)_0x1429a4+=_0x22acda(0x361)[_0x22acda(0x39a)](Math[_0x22acda(0x409)](this[_0x22acda(0x38b)][_0x22acda(0x36f)]*0x64));if(this[_0x22acda(0x38b)][_0x22acda(0x36f)]>0x0&&this[_0x22acda(0x38b)]['flatMP']>0x0)_0x1429a4+='\x20';if(this[_0x22acda(0x38b)][_0x22acda(0x40c)]>0x0)_0x1429a4+=_0x22acda(0x258)[_0x22acda(0x39a)](this[_0x22acda(0x38b)][_0x22acda(0x40c)]);return _0x1429a4;},Window_ShopStatus['prototype'][_0x561d2e(0x250)]=function(_0x914a2a,_0x400a30,_0x4b64d4){const _0x1de9df=_0x561d2e,_0x381424=_0x1de9df(0x193);if(this[_0x1de9df(0x38b)][_0x1de9df(0x2d4)]<=0x0&&!this[_0x1de9df(0x300)][_0x381424])return![];const _0x160ef0=this[_0x1de9df(0x305)]();this['drawItemKeyData'](_0x160ef0,_0x914a2a,_0x400a30,_0x4b64d4,!![]);const _0x4f7f58=this['getItemEffectsTpRecoveryText']();return this['changeTextColor'](ColorManager[_0x1de9df(0x25f)]()),this[_0x1de9df(0x2fd)](_0x4f7f58,_0x914a2a,_0x400a30,_0x4b64d4,![],_0x1de9df(0x14d)),this['drawItemDarkRect'](_0x914a2a,_0x400a30,_0x4b64d4),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x561d2e(0x305)]=function(){const _0x4dc277=_0x561d2e,_0x1f58ce=VisuMZ[_0x4dc277(0x12d)][_0x4dc277(0x3a5)][_0x4dc277(0x473)]['LabelRecoverTP'];return _0x1f58ce[_0x4dc277(0x39a)](TextManager['tp']);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x22b)]=function(){const _0x2b6f82=_0x561d2e,_0x38ae48=_0x2b6f82(0x193);if(this['_customItemInfo'][_0x38ae48])return this[_0x2b6f82(0x300)][_0x38ae48];let _0x3c75ad='';return _0x3c75ad+=_0x2b6f82(0x258)[_0x2b6f82(0x39a)](this[_0x2b6f82(0x38b)][_0x2b6f82(0x2d4)]),_0x3c75ad;},Window_ShopStatus['prototype'][_0x561d2e(0x173)]=function(_0x1a8292,_0x5aba5d,_0x3a5bdf){const _0x3d4608=_0x561d2e,_0x11e3b5=_0x3d4608(0x298);if(this['_itemData'][_0x3d4608(0x3a1)]===0x0&&!this[_0x3d4608(0x300)][_0x11e3b5])return![];const _0x2a2f37=this['getItemEffectsSelfTpGainLabel']();this[_0x3d4608(0x2fd)](_0x2a2f37,_0x1a8292,_0x5aba5d,_0x3a5bdf,!![]);const _0x2214f4=this[_0x3d4608(0x20a)]();return this[_0x3d4608(0x38b)][_0x3d4608(0x3a1)]>0x0?this['changeTextColor'](ColorManager[_0x3d4608(0x25f)]()):this[_0x3d4608(0x24c)](ColorManager['powerDownColor']()),this[_0x3d4608(0x2fd)](_0x2214f4,_0x1a8292,_0x5aba5d,_0x3a5bdf,![],_0x3d4608(0x14d)),this[_0x3d4608(0x279)](_0x1a8292,_0x5aba5d,_0x3a5bdf),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x2b3)]=function(){const _0x16f3af=_0x561d2e,_0x5a743b=VisuMZ['ItemsEquipsCore']['Settings'][_0x16f3af(0x473)]['LabelSelfGainTP'];return _0x5a743b[_0x16f3af(0x39a)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainText']=function(){const _0x426bd7=_0x561d2e,_0x9ccadb=_0x426bd7(0x298);if(this[_0x426bd7(0x300)][_0x9ccadb])return this[_0x426bd7(0x300)][_0x9ccadb];let _0x49dae5='';return this[_0x426bd7(0x38b)][_0x426bd7(0x3a1)]>0x0?_0x49dae5+='+%1'[_0x426bd7(0x39a)](this[_0x426bd7(0x38b)][_0x426bd7(0x3a1)]):_0x49dae5+='%1'[_0x426bd7(0x39a)](this[_0x426bd7(0x38b)][_0x426bd7(0x3a1)]),_0x49dae5;},Window_ShopStatus[_0x561d2e(0x1d9)]['drawItemEffectsHpDamage']=function(_0x259da6,_0x121439,_0x57440d){const _0x29e0af=_0x561d2e,_0x140613=_0x29e0af(0x2d1);if(this[_0x29e0af(0x38b)]['rateHP']>=0x0&&this[_0x29e0af(0x38b)][_0x29e0af(0x2a5)]>=0x0&&!this['_customItemInfo'][_0x140613])return![];const _0x486eee=this[_0x29e0af(0x402)]();this[_0x29e0af(0x2fd)](_0x486eee,_0x259da6,_0x121439,_0x57440d,!![]);const _0x2f8030=this[_0x29e0af(0x375)]();return this[_0x29e0af(0x24c)](ColorManager[_0x29e0af(0x188)](0x0)),this[_0x29e0af(0x2fd)](_0x2f8030,_0x259da6,_0x121439,_0x57440d,![],_0x29e0af(0x14d)),this['drawItemDarkRect'](_0x259da6,_0x121439,_0x57440d),this[_0x29e0af(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x402)]=function(){const _0x5225e7=_0x561d2e,_0x307a75=VisuMZ[_0x5225e7(0x12d)][_0x5225e7(0x3a5)]['StatusWindow'][_0x5225e7(0x433)];return _0x307a75[_0x5225e7(0x39a)](TextManager['hp']);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x375)]=function(){const _0x58488f=_0x561d2e,_0x2d29f0='HP\x20DAMAGE';if(this[_0x58488f(0x300)][_0x2d29f0])return this[_0x58488f(0x300)][_0x2d29f0];let _0x374bf4='';if(this['_itemData'][_0x58488f(0x1eb)]<0x0)_0x374bf4+=_0x58488f(0x3c8)[_0x58488f(0x39a)](Math[_0x58488f(0x409)](this[_0x58488f(0x38b)][_0x58488f(0x1eb)]*0x64));if(this[_0x58488f(0x38b)][_0x58488f(0x1eb)]<0x0&&this[_0x58488f(0x38b)]['flatHP']<0x0)_0x374bf4+='\x20';if(this['_itemData'][_0x58488f(0x2a5)]<0x0)_0x374bf4+='%1'['format'](this[_0x58488f(0x38b)]['flatHP']);return _0x374bf4;},Window_ShopStatus[_0x561d2e(0x1d9)]['drawItemEffectsMpDamage']=function(_0x181607,_0x503570,_0x783ec5){const _0x56399c=_0x561d2e,_0x59838e=_0x56399c(0x331);if(this[_0x56399c(0x38b)]['rateMP']>=0x0&&this['_itemData'][_0x56399c(0x40c)]>=0x0&&!this['_customItemInfo'][_0x59838e])return![];const _0x153973=this[_0x56399c(0x2a8)]();this[_0x56399c(0x2fd)](_0x153973,_0x181607,_0x503570,_0x783ec5,!![]);const _0x42a866=this[_0x56399c(0x3ee)]();return this[_0x56399c(0x24c)](ColorManager[_0x56399c(0x188)](0x2)),this[_0x56399c(0x2fd)](_0x42a866,_0x181607,_0x503570,_0x783ec5,![],'right'),this['drawItemDarkRect'](_0x181607,_0x503570,_0x783ec5),this[_0x56399c(0x157)](),!![];},Window_ShopStatus['prototype']['getItemEffectsMpDamageLabel']=function(){const _0x39f0b6=_0x561d2e,_0x234d1a=VisuMZ[_0x39f0b6(0x12d)][_0x39f0b6(0x3a5)][_0x39f0b6(0x473)][_0x39f0b6(0x436)];return _0x234d1a['format'](TextManager['mp']);},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x3ee)]=function(){const _0x2b9a96=_0x561d2e,_0xae65a9=_0x2b9a96(0x331);if(this[_0x2b9a96(0x300)][_0xae65a9])return this[_0x2b9a96(0x300)][_0xae65a9];let _0x3d42a3='';if(this[_0x2b9a96(0x38b)]['rateMP']<0x0)_0x3d42a3+='%1%'[_0x2b9a96(0x39a)](Math[_0x2b9a96(0x409)](this[_0x2b9a96(0x38b)]['rateMP']*0x64));if(this['_itemData'][_0x2b9a96(0x36f)]<0x0&&this[_0x2b9a96(0x38b)][_0x2b9a96(0x40c)]<0x0)_0x3d42a3+='\x20';if(this['_itemData'][_0x2b9a96(0x40c)]<0x0)_0x3d42a3+='%1'[_0x2b9a96(0x39a)](this[_0x2b9a96(0x38b)]['flatMP']);return _0x3d42a3;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x15e)]=function(_0x458e50,_0x399400,_0x5b6ac0){const _0x418a97=_0x561d2e,_0x432635=_0x418a97(0x449);if(this[_0x418a97(0x38b)][_0x418a97(0x2d4)]>=0x0&&!this[_0x418a97(0x300)][_0x432635])return![];const _0x4cee17=this[_0x418a97(0x29c)]();this['drawItemKeyData'](_0x4cee17,_0x458e50,_0x399400,_0x5b6ac0,!![]);const _0x2c913a=this[_0x418a97(0x14c)]();return this[_0x418a97(0x24c)](ColorManager[_0x418a97(0x266)]()),this[_0x418a97(0x2fd)](_0x2c913a,_0x458e50,_0x399400,_0x5b6ac0,![],_0x418a97(0x14d)),this['drawItemDarkRect'](_0x458e50,_0x399400,_0x5b6ac0),this[_0x418a97(0x157)](),!![];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x29c)]=function(){const _0xf02013=_0x561d2e,_0x3f905b=VisuMZ[_0xf02013(0x12d)][_0xf02013(0x3a5)][_0xf02013(0x473)][_0xf02013(0x30e)];return _0x3f905b[_0xf02013(0x39a)](TextManager['tp']);},Window_ShopStatus[_0x561d2e(0x1d9)]['getItemEffectsTpDamageText']=function(){const _0x514d6a=_0x561d2e,_0xcdf59f=_0x514d6a(0x449);if(this[_0x514d6a(0x300)][_0xcdf59f])return this[_0x514d6a(0x300)][_0xcdf59f];let _0x4be68a='';return _0x4be68a+='%1'[_0x514d6a(0x39a)](this[_0x514d6a(0x38b)][_0x514d6a(0x2d4)]),_0x4be68a;},Window_ShopStatus['prototype'][_0x561d2e(0x421)]=function(_0xd55cf1,_0xbb0dc2,_0x190a79){const _0x526be3=_0x561d2e,_0xbb1b14=_0x526be3(0x3d3);if(!this['_itemData'][_0x526be3(0x403)]&&!this[_0x526be3(0x300)][_0xbb1b14])return![];const _0x34ab7b=this[_0x526be3(0x394)]();this[_0x526be3(0x2fd)](_0x34ab7b,_0xd55cf1,_0xbb0dc2,_0x190a79,!![]);const _0x373968=this[_0x526be3(0x1cb)]();return this['drawItemKeyData'](_0x373968,_0xd55cf1,_0xbb0dc2,_0x190a79,![],'right'),this[_0x526be3(0x279)](_0xd55cf1,_0xbb0dc2,_0x190a79),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x561d2e(0x394)]=function(){const _0x3e2fb3=_0x561d2e;return VisuMZ[_0x3e2fb3(0x12d)][_0x3e2fb3(0x3a5)][_0x3e2fb3(0x473)][_0x3e2fb3(0x169)];},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x1cb)]=function(){const _0x52dde3=_0x561d2e,_0x16004b=_0x52dde3(0x3d3);if(this[_0x52dde3(0x300)][_0x16004b])return this[_0x52dde3(0x300)][_0x16004b];let _0x1efbcc='',_0x150e63=0x0;const _0x2a3449=0x8;for(const _0x58b1f5 of this[_0x52dde3(0x38b)][_0x52dde3(0x459)]){const _0x3b6bd3=$dataStates[_0x58b1f5];if(_0x3b6bd3&&_0x3b6bd3[_0x52dde3(0x140)]>0x0){_0x1efbcc+=_0x52dde3(0x3b2)[_0x52dde3(0x39a)](_0x3b6bd3[_0x52dde3(0x140)]),_0x150e63++;if(_0x150e63>=_0x2a3449)return _0x1efbcc;}}for(let _0x393b92=0x0;_0x393b92<this['_itemData'][_0x52dde3(0x295)][_0x52dde3(0x22d)];_0x393b92++){const _0xae91d0=this[_0x52dde3(0x38b)][_0x52dde3(0x295)][_0x393b92],_0x5b3f13=Game_BattlerBase[_0x52dde3(0x1d9)][_0x52dde3(0x24f)](_0xae91d0,_0x393b92);if(_0x5b3f13>0x0){_0x1efbcc+='\x5cI[%1]'['format'](_0x5b3f13),_0x150e63++;if(_0x150e63>=_0x2a3449)return _0x1efbcc;}}return _0x1efbcc;},Window_ShopStatus['prototype'][_0x561d2e(0x1d4)]=function(_0x36d06d,_0x2781e2,_0x2b56f6){const _0x2dbba7=_0x561d2e,_0x1abc0d=_0x2dbba7(0x3f8);if(!this[_0x2dbba7(0x38b)][_0x2dbba7(0x1a1)]&&!this[_0x2dbba7(0x300)][_0x1abc0d])return![];const _0x31cf43=this[_0x2dbba7(0x468)]();this[_0x2dbba7(0x2fd)](_0x31cf43,_0x36d06d,_0x2781e2,_0x2b56f6,!![]);const _0x16c1cd=this[_0x2dbba7(0x1b8)]();return this[_0x2dbba7(0x2fd)](_0x16c1cd,_0x36d06d,_0x2781e2,_0x2b56f6,![],_0x2dbba7(0x14d)),this['drawItemDarkRect'](_0x36d06d,_0x2781e2,_0x2b56f6),this[_0x2dbba7(0x157)](),!![];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0xb36522=_0x561d2e;return VisuMZ[_0xb36522(0x12d)]['Settings'][_0xb36522(0x473)][_0xb36522(0x35e)];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsText']=function(){const _0x34a160=_0x561d2e,_0x516fd6=_0x34a160(0x3f8);if(this['_customItemInfo'][_0x516fd6])return this[_0x34a160(0x300)][_0x516fd6];let _0x40ea26='',_0x5a5671=0x0;const _0x50e236=VisuMZ[_0x34a160(0x12d)][_0x34a160(0x3a5)][_0x34a160(0x473)][_0x34a160(0x1c8)];for(const _0x441fbe of this[_0x34a160(0x38b)][_0x34a160(0x442)]){const _0x4c4a89=$dataStates[_0x441fbe];if(_0x4c4a89&&_0x4c4a89[_0x34a160(0x140)]>0x0){_0x40ea26+='\x5cI[%1]'['format'](_0x4c4a89[_0x34a160(0x140)]),_0x5a5671++;if(_0x5a5671>=_0x50e236)return _0x40ea26;}}for(let _0x186093=0x0;_0x186093<this[_0x34a160(0x38b)][_0x34a160(0x43b)][_0x34a160(0x22d)];_0x186093++){const _0x41ec6a=Game_BattlerBase[_0x34a160(0x1d9)][_0x34a160(0x24f)](0x1,_0x186093);if(_0x41ec6a>0x0){_0x40ea26+=_0x34a160(0x3b2)[_0x34a160(0x39a)](_0x41ec6a),_0x5a5671++;if(_0x5a5671>=_0x50e236)return _0x40ea26;}}for(let _0x18c147=0x0;_0x18c147<this[_0x34a160(0x38b)]['removeDebuff'][_0x34a160(0x22d)];_0x18c147++){const _0x37aa53=Game_BattlerBase[_0x34a160(0x1d9)][_0x34a160(0x24f)](-0x1,_0x18c147);if(_0x37aa53>0x0){_0x40ea26+=_0x34a160(0x3b2)[_0x34a160(0x39a)](_0x37aa53),_0x5a5671++;if(_0x5a5671>=_0x50e236)return _0x40ea26;}}return _0x40ea26;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x418)]=function(_0x1fa94f,_0x3d0cb7,_0xb93240){const _0x35943f=_0x561d2e;if(this[_0x35943f(0x123)][_0x35943f(0x46b)][_0x35943f(0x172)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x25bdab=String(RegExp['$1'])[_0x35943f(0x30a)](/[\r\n]+/);for(const _0xd662a1 of _0x25bdab){if(_0xd662a1[_0x35943f(0x172)](/(.*):[ ](.*)/i)){const _0x3e641c=String(RegExp['$1'])['trim'](),_0x1da22c=String(RegExp['$2'])['trim']();this[_0x35943f(0x462)](_0x3e641c,_0x1da22c,_0x1fa94f,_0x3d0cb7,_0xb93240),_0x3d0cb7+=this[_0x35943f(0x28a)]();}}}return this[_0x35943f(0x157)](),_0x3d0cb7;},Window_ShopStatus[_0x561d2e(0x1d9)][_0x561d2e(0x462)]=function(_0x1210ac,_0x14647c,_0x20b505,_0x27d26f,_0x5f1a02){const _0x1be4d4=_0x561d2e;this['drawItemKeyData'](_0x1210ac,_0x20b505,_0x27d26f,_0x5f1a02,!![]),this['drawItemKeyData'](_0x14647c,_0x20b505,_0x27d26f,_0x5f1a02,![],_0x1be4d4(0x14d)),this[_0x1be4d4(0x279)](_0x20b505,_0x27d26f,_0x5f1a02),this[_0x1be4d4(0x157)]();};