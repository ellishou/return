//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.13] [SkillsStatesCore][翻譯版本:1]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Notetags
 * ============================================================================
 * === General Skill Notetags ===
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - 將技能標記為具有多種技能類型，這意味著它們將顯示在不同的技能類型下，而無需創建重複的技能。
 * - 將"x"替換為代表技能類型ID的數字值。
 * - 如果使用"name"筆記標籤變體，則將"name"替換為需要添加的技能類型名稱。
 * 
 * === Skill Cost Notetags ===
 * 以下是可用於調整技能成本的便簽。 其中一些便簽標籤是通過"插件參數: 技能成本類型"添加的，
 * 可以在此處進行更改。 這也意味著其中一些便簽可以更改和/或刪除其功能。
 * ------ ------ ------ ------ ------ ------
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - 這些便簽用於指定數據庫編輯器無法完成的自定義或現有類型的成本。
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - 用數字值替換"x"以確定確切的類型成本值。
 *   這使您可以繞過數據庫編輯器的9,999 MP和100 TP的限制。
 * - "x%"版本將替換為百分位值，以確定等於該類型最大數量限制的百分比的成本。
 * - 這些便籤的功能可以在"插件參數"中更改。
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 * ------ ------ ------ ------ ------ ------
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - 這些便簽標籤用於確保有條件的和%的費用不會太大或太小。
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - 用數字值替換"x"，以確定成本可以達到的最大值或最小值。
 * - 這些便籤的功能可以在"插件參數"中更改。
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 * ------ ------ ------ ------ ------ ------
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - 對於%標記標籤變體: 用數字值替換'x'，以確定調整技能費用類型的比率為固定值。
 *   這在<type Cost: +x>和<type Cost: -x>註釋標籤之前應用。
 * - 對於+和-標記標籤變體: 將'x'替換為數字值，確定調整技能費用類型的費用為固定值。
 *   這將在<type Cost: x%>註釋標籤之後應用。
 * - 這些便籤的功能可以在"插件參數"中更改。
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 * ------ ------ ------ ------ ------ ------
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - 允許您在費用即將結束時將自定義文本插入技能的費用區域。
 * - 用您要顯示的文本替換"文本"。
 * - 可以使用文本代碼。
 * ------ ------ ------ ------ ------ ------
 * === JavaScript Notetags: Skill Costs ===
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 * ------ ------ ------ ------ ------ ------
 * === Gauge Replacement Notetags ===
 *
 * 某些職業可以將其量條換成其他技能費用類型。
 * 這對於不使用那些"技能費用類型"的職業特別有用。
 * 您可以根據需要混合和匹配它們。
 * ------ ------ ------ ------ ------ ------
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - 用其他技能費用類型替換HP（第一），MP（第二）或TP（第三）量條。
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - 將"類型"替換為"無"，以不在那裡顯示任何壓力表。
 * - <替換TP量條: 類型>將需要在"數據庫">"系統1"選項卡中啟用"在窗口中顯示TP"設置。
 * - 標記標籤的功能可以通過更改"技能和狀態"核心插件參數來更改。
 * ------ ------ ------ ------ ------ ------
 * === Skill Accessibility Notetags ===
 *
 * 有時，您不希望所有技能都可見，無論是在戰鬥中隱藏僅菜單的技能，
 * 還是要打開/關閉某些開關，或者要學會某些技能。
 * ------ ------ ------ ------ ------ ------
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - 根據玩家當前是否在戰鬥中，使特定技能可見或隱藏。
 * ------ ------ ------ ------ ------ ------
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - 根據開關確定技能的可見性。
 * ------ ------ ------ ------ ------ ------
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - 根據開關確定技能的可見性。
 * ------ ------ ------ ------ ------ ------
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - 根據所學技能確定技能的可視性。
 * - 這不適用於角色，職業，任何設備或狀態的特質所增加的技能。 這些不是學習的技能。 他們被認為是臨時技能。
 * - 用技能ID替換"x"，以確定技能的可見性。
 * - 如果使用了"name"而非標籤變體，則將"name"替換為要檢查便簽標籤的技能名稱。
 * - 如果使用了"全部"便簽變體，技能將被隱藏，直到學習了所有技能。 然後，將顯示它。
 * - 如果使用"任何"便簽標籤變體，則只要學習了任何技能，就會顯示技能。 否則，它將被隱藏。
 * ------ ------ ------ ------ ------ ------
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - 根據所學技能確定技能的可視性。
 * - 這不適用於角色，職業，任何設備或狀態的特質所增加的技能。 這些不是學習的技能。 他們被認為是臨時技能。
 * - 用技能ID替換"x"，以確定技能的可見性。
 * - 如果使用了"name"而非標籤變體，則將"name"替換為要檢查便簽標籤的技能名稱。
 * - 如果使用了"all"便簽標籤變體，則技能將顯示出來，直到掌握所有技能為止。 然後，它將被隱藏。
 * - 如果使用了"任何"便簽標籤變體，則如果學習了任何技能，則該技能將被隱藏。 否則，將顯示出來。
 * ------ ------ ------ ------ ------ ------
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - 根據可用技能確定技能的可見性。
 * - 這既適用於已通過角色，職業，設備或國家的特質學習和/或暫時添加的技能。
 * - 用技能ID替換"x"，以確定技能的可見性。
 * - 如果使用了"name"而非標籤變體，則將"name"替換為要檢查便簽標籤的技能名稱。
 * - 如果使用了"全部"便簽變體，技能將被隱藏，直到學習了所有技能。 然後，將顯示它。
 * - 如果使用"任何"便簽標籤變體，則只要學習了任何技能，就會顯示技能。 否則，它將被隱藏。
 * ------ ------ ------ ------ ------ ------
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - 根據可用技能確定技能的可見性。
 * - 這既適用於已通過角色，職業，設備或國家的特質學習和/或暫時添加的技能。
 * - 用技能ID替換"x"，以確定技能的可見性。
 * - 如果使用了"name"而非標籤變體，則將"name"替換為要檢查便簽標籤的技能名稱。
 * - 如果使用了"all"便簽標籤變體，則技能將顯示出來，直到掌握所有技能為止。 然後，它將被隱藏。
 * - 如果使用了"任何"便簽標籤變體，則任何學習技能。 否則，將顯示出來。
 * ------ ------ ------ ------ ------ ------
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - 根據開關確定技能的啟用狀態。
 * - 將"x"替換為開關ID，以確定技能的啟用狀態。
 * - 如果使用"全部"便簽變體，則技能將被禁用，直到所有開關都打開。 然後，將啟用它。
 * - 如果使用"任何"記事標籤變體，則任何一個開關為ON時，將啟用技能。 否則，它將被禁用。
 * ------ ------ ------ ------ ------ ------
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - 根據開關確定技能的啟用狀態。
 * - 將"x"替換為開關ID，以確定技能的啟用狀態。
 * - 如果使用了"全部"便簽標籤變體，則將啟用技能，直到所有開關都打開。 然後，它將被禁用。
 * - 如果使用"任何"便簽標籤變體，則任何一個開關為ON時，技能將被禁用。 否則，它將被啟用。
 * ------ ------ ------ ------ ------ ------
 * === JavaScript Notetags: Skill Accessibility ===
 * ------ ------ ------ ------ ------ ------
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 * ------ ------ ------ ------ ------ ------
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 * ------ ------ ------ ------ ------ ------
 * === General State-Related Notetags ===
 *
 * 以下註釋標籤以狀態為中心，例如狀態顯示方式，
 * 影響狀態轉向的項目和技能，狀態可以避免被死亡狀態移除等。
 * ------ ------ ------ ------ ------ ------
 * <No Death Clear>
 * 
 * - Used for: State Notetags
 * - 防止在死亡時清除此狀態。
 * - 這也允許將此狀態添加到已經死亡的戰鬥機中。
 * ------ ------ ------ ------ ------ ------
 * <No Recover All Clear>
 * 
 * - Used for: State Notetags
 * - 防止在使用"全部恢復"命令時清除此狀態。
 * ------ ------ ------ ------ ------ ------
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - 如果整個隊伍都受到帶有<Group Defeat>註釋標籤的狀態的影響，則將其視為失敗。
 * - 它的用法包括在整個聚會範圍內進行石化，冷凍等。
 * ------ ------ ------ ------ ------ ------
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - 如果將狀態應用於已經具有該狀態的目標，請選擇該狀態遵循的規則類型。 這會特別影響回合。
 * - 'Ignore' 將繞過任何回合更改。
 * - 'Reset' 將重新計算該狀態的匝數。
 * - 'Greater' 如果當前的回合大於重置數量，則將選擇保留當前的回合，如果當前的回合較低，則選擇重置。
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 * ------ ------ ------ ------ ------ ------
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - 將狀態標記為正狀態或負狀態，同時更改狀態的回合顏色以匹配"插件參數"設置。
 * - 這也將狀態置於"Positive"類別或"Negative"類別中。
 * ------ ------ ------ ------ ------ ------
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - 將狀態分為某些/多個類別。
 * - 用類別名稱替換"name"以將該狀態標記為。
 * - 插入此值的倍數以用多個類別標記狀態。
 * ------ ------ ------ ------ ------ ------
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - 將狀態分為某些/多個類別。
 * - 將每個"name"替換為類別名稱，以將該狀態標記為。
 * ------ ------ ------ ------ ------ ------
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - 允許技能/物品從特定類別"x"中刪除"y"狀態。
 * - 將"x"替換為要刪除的類別名稱。
 * - 將"y"替換為要從該類別中刪除的次數。
 * - 使用"全部"變體刪除該類別的所有狀態。
 * - 插入此內容的倍數以刪除不同類型的類別。
 * ------ ------ ------ ------ ------ ------
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - 隱藏狀態回合根本不顯示。
 * - 這將通過任何插件參數設置。
 * ------ ------ ------ ------ ------ ------
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - 隱藏狀態回合根本不顯示。
 * - 確定狀態回合計數的顏色。
 * - 將"x"替換為描述窗口文本顏色的數字值。
 * - 用十六進制顏色代碼替換"rrggbb"以獲得更自定義的顏色。
 * ------ ------ ------ ------ ------ ------
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - 如果目標受狀態"id"或狀態"name"的影響，請更改目標的狀態轉換持續時間。
 * - 對於"id"變體，將"id"替換為要修改的狀態的ID。
 * - 對於"name"變體，將"name"替換為要修改的狀態名稱。
 * - 將"x"替換為您希望增加，減少或設置為的值。
 * - 插入此筆記標籤的倍數以一次影響多個狀態。
 * ------ ------ ------ ------ ------ ------
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - 如果目標受到"param" buff的影響，則更改該buff的目標旋轉持續時間。
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - 將"x"替換為您希望增加，減少或設置為的值。
 * - 插入此筆記標籤的倍數以一次影響多個參數。
 * ------ ------ ------ ------ ------ ------
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - 如果目標受到"param"減益的影響，則更改該減益的目標轉身持續時間。
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - 將"x"替換為您希望增加，減少或設置為的值。
 * - 插入此notetag的倍數以一次影響多個參數。
 * ------ ------ ------ ------ ------ ------
 * === JavaScript Notetags: On Add/Erase/Expire ===
 * 使用JavaScript代碼，您可以使用創建自定義效果，這些效果會在添加，刪除或失效遺產時發生。
 * ------ ------ ------ ------ ------ ------
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 * ------ ------ ------ ------ ------ ------
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 * ------ ------ ------ ------ ------ ------
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 * ------ ------ ------ ------ ------ ------
 * === JavaScript Notetags: Slip Damage/Healing ===
 * RPG Maker詞彙表中的滑倒損壞是指隨時間推移而造成的損壞。
 * 以下註釋標籤使您可以執行自定義滑移損壞/修復。
 * ------ ------ ------ ------ ------ ------
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 * ------ ------ ------ ------ ------ ------
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 * ------ ------ ------ ------ ------ ------ 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ------ ------ ------ ------ ------ ------
 *
 * === Passive State Notetags ===
 * 被動國家是指在滿足其條件的情況下始終適用於角色和敵人的國家。
 * 可以通過數據庫對像或"被動狀態插件參數"來授予這些權限。
 * 
 * ------ ------ ------ ------ ------ ------
 * 對於使用代碼"a.isStateAffected(10)"來檢查目標是否受狀態影響的用戶，這不會檢查被動狀態。
 * 這只會檢查直接應用於目標的狀態。
 * 
 * 而是使用"a.states().includes($dataStates[10])"進行檢查。
 * 此代碼將同時搜索直接應用的狀態和被動狀態。
 * ------ ------ ------ ------ ------ ------
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - 將被動狀態x添加到特徵對象，並將其應用於相關的角色或敵方單位。
 * - 用數字替換"x"，以確定要添加為被動狀態的狀態。
 * - 如果使用"name" 筆記標籤變體，則將"name"替換為要添加為被動狀態的狀態名稱。
 * - 注意: 如果您打算通過技能應用被動狀態，則必須通過目標已經學習的技能，而不是通過特質賦予的技能。
 * ------ ------ ------ ------ ------ ------
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - 使得可以多次添加此被動狀態。
 * - 否則，只有被動狀態的一個實例可用。
 * ------ ------ ------ ------ ------ ------
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - 根據角色的當前類別確定被動狀態的被動條件。 只要參與者的當前類別與數據條目之一匹配，就認為被動條件已通過。
 * - 對於"id"變體，將"id"替換為代表類ID的數字。
 * - 對於"name"變體，將"name"替換為類的名稱。
 * ------ ------ ------ ------ ------ ------
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - 需要VisuMZ_2_ClassChangeSystem！
 * - 根據參與者的多類確定被動狀態的被動條件。 只要參與者將任何匹配類分配為多類，就將被動條件視為通過。
 * - 對於"id"變體，將"id"替換為代表類ID的數字。
 * - 對於"name"變體，將"name"替換為類的名稱。
 * ------ ------ ------ ------ ------ ------
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - 根據開關確定被動狀態的被動條件。
 * - 將"x"替換為開關ID，以確定狀態的被動條件。
 * - 如果使用了"全部"便簽標籤變體，則在所有開關都打開之前，將不滿足條件。 然後，它會被滿足。
 * - 如果使用"任何" 筆記標籤變體，則任何一個開關為ON時都將滿足條件。 否則，將無法實現。
 * ------ ------ ------ ------ ------ ------
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - 根據開關確定被動狀態的被動條件。
 * - 將"x"替換為開關ID，以確定狀態的被動條件。
 * - 如果使用了"all"便簽標籤變體，則直到所有開關都關閉後才能滿足條件。 然後，它會被滿足。
 * - 如果使用"任何" 筆記標籤變體，則任何一個開關均處於OFF位置將滿足條件。 否則，將無法實現。
 * ------ ------ ------ ------ ------ ------
 * === JavaScript Notetags: Passive State ===
 *
 * 以下是為具有JavaScript知識的用戶製作的註釋標籤，用於確定是否可以滿足被動狀態的條件。
 * ------ ------ ------ ------ ------ ------
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - 根據JavaScript代碼確定狀態的被動條件。
 * - 替換"code"以確定是否滿足被動狀態的條件。
 * - "condition"變量返回一個布爾值（true / false），以確定是否滿足被動狀態的條件。
 * - "user"變量是指受被動狀態影響的用戶。
 * - "state"變量是指被檢查的被動狀態。
 * - 必須滿足所有其他被動條件，此代碼才能計數。
 * ------ ------ ------ ------ ------ ------
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
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
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text 技能設定
 * @type struct<Skills>
 * @desc 在此處調整常規技能設置。
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text 技能費用類型
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc 此插件添加的所有技能費用類型的列表以及在遊戲中對其進行控制的代碼。
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%%])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%%])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%%])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%%])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%%])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%%])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%%])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%%])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%%])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text 狀態設定
 * @type struct<States>
 * @desc 在此處調整常規狀態設置。
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text 增益/減益設置
 * @parent States:struct
 * @type struct<Buffs>
 * @desc 在此處調整一般的增益/減益設置。
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text 被動狀態
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc 在此處調整被動狀態設置。
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
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
 * @desc 使用此插件提供的更新的技能菜單佈局？
 * 這將覆蓋Core Engine窗口設置。
 * @default true
 *
 * @param LayoutStyle:str
 * @text 佈局樣式
 * @parent General
 * @type select
 * @option 上幫助，左輸入
 * @value upper/left
 * @option 上幫助，右輸入
 * @value upper/right
 * @option 下幫助，左輸入
 * @value lower/left
 * @option 下幫助，右輸入
 * @value lower/right
 * @desc 如果使用更新的佈局，則如何設置菜單場景佈局的樣式？
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text 技能類型窗口
 *
 * @param CmdStyle:str
 * @text 風格
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc 您希望如何在"技能類型"窗口中繪製命令？
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text 文本對齊
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 技能類型窗口的文本對齊。
 * @default left
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
 * @param ShopStatusWindow
 * @text 商店狀態窗口
 *
 * @param ShowShopStatus:eval
 * @text 在技能菜單中顯示？
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc 在"技能"菜單中顯示"商店狀態"窗口？
 * 如果啟用了更新版式，則啟用此功能。
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text 調整列表窗口？
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc 如果使用"商店狀態"窗口，是否可以自動調整"技能"菜單中的"技能列表"窗口？
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc 用於在"技能"菜單中確定此"商店狀態"窗口的尺寸的代碼。
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text 技能類型
 *
 * @param HiddenSkillTypes:arraynum
 * @text 隱藏的技能類型
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc 插入您要從遊戲中隱藏的技能類型的ID。
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text 在戰鬥中隱藏
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc 僅插入您想在戰鬥中隱藏的技能類型的ID。
 * @default []
 *
 * @param IconStypeNorm:num
 * @text 圖標: 普通型
 * @parent SkillTypes
 * @desc 未分配任何圖標的普通技能類型使用的圖標。
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text 圖標: 魔術類型
 * @parent SkillTypes
 * @desc 未分配任何圖標的法術技能類型使用的圖標。
 * @default 79
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param SkillConditionJS:func
 * @text JS: 技能條件 Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc 用於全球技能狀況檢查的JavaScript代碼。
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text 名稱
 * @desc 此技能費用類型的名稱。
 * @default Untitled
 *
 * @param Settings
 * @text 設定
 *
 * @param Icon:num
 * @text 圖標
 * @parent Settings
 * @desc 用於此技能費用類型的圖標。
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text 字體顏色
 * @parent Settings
 * @desc 用於顯示此費用的文本顏色。
 * 對於十六進制顏色，請在VisuMZ_1_MessageCore中使用#rrggbb
 * @default 0
 *
 * @param FontSize:num
 * @text 字體大小
 * @parent Settings
 * @type number
 * @min 1
 * @desc 用於顯示此費用的字體大小。
 * @default 22
 *
 * @param Cost
 * @text 成本處理
 *
 * @param CalcJS:func
 * @text JS: 成本計算 Cost Calculation
 * @parent Cost
 * @type note
 * @desc 關於如何計算技能資源成本的代碼。
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: 可以支付費用嗎？ Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc 計算用戶是否能夠支付費用的代碼。
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: 支付費用 Paying Cost
 * @parent Cost
 * @type note
 * @desc 如果滿足，則為代碼，這是付清所有費用的實際過程。
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text 視窗顯示
 *
 * @param ShowJS:func
 * @text JS: 顯示費用？ Show Cost?
 * @parent  Windows
 * @type note
 * @desc 用於確定是否顯示成本的代碼。
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: 費用文字
 * @parent  Windows
 * @type note
 * @desc 確定用於顯示成本的文本的代碼（支持文本代碼）。
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text 量條顯示
 *
 * @param GaugeMaxJS:func
 * @text JS: 最大值 Maximum Value
 * @parent  Gauges
 * @type note
 * @desc 代碼以確定用於此"技能成本"資源的量條的最大值。
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: 當前值 Current Value
 * @parent  Gauges
 * @type note
 * @desc 代碼以確定用於此技能成本表的資源的當前值。
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: 繪製量條 Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc 確定如何為該量具類型繪製"技能成本"資源的代碼。
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 * @text 一般
 *
 * @param ReapplyRules:str
 * @text 重新應用規則
 * @parent General
 * @type select
 * @option Ignore: 狀態未添加。 State doesn't get added.
 * @value ignore
 * @option Reset: 輪流重置。 Turns get reset.
 * @value reset
 * @option Greater: 匝數取更大的值（電流vs復位）。 Turns take greater value (current vs reset).
 * @value greater
 * @option Add: 輪流加在現有的回合上。 Turns add upon existing turns.
 * @value add
 * @desc 這些是重新應用狀態時的規則。
 * @default greater
 *
 * @param MaxTurns:num
 * @text 最大回合
 * @parent General
 * @type number
 * @min 1
 * @desc 讓狀態上升到的最大回合。
 * 可以使用<Max Turns: x>註釋標籤進行更改。
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text 動作結束更新
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc 具有"動作結束"自動刪除功能的狀態也將在每個動作（而非所有動作）結束時更新回合。
 * @default true
 *
 * @param Turns
 * @text 回合顯示
 *
 * @param ShowTurns:eval
 * @text 顯示回合？
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc 顯示狀態是否打開窗口圖標和子畫面？
 * @default true
 *
 * @param TurnFontSize:num
 * @text 回合字體大小
 * @parent Turns
 * @type number
 * @min 1
 * @desc 用於顯示回合的字體大小。
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text 偏移 X
 * @parent Turns
 * @desc 偏移回合顯示的X位置。
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text 偏移 Y
 * @parent Turns
 * @desc 偏移回合顯示的Y位置。
 * @default -6
 *
 * @param TurnFontSize:num
 * @text 回合字體大小
 * @parent Turns
 * @desc 用於顯示回合的字體大小。
 * @default 16
 *
 * @param ColorNeutral:str
 * @text 回合顏色: 中性
 * @parent Turns
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 0
 *
 * @param ColorPositive:str
 * @text 回合顏色: 積極 (Positive)
 * @parent Turns
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 24
 *
 * @param ColorNegative:str
 * @text 回合顏色: 消極 (Negative)
 * @parent Turns
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 27
 *
 * @param Data
 * @text 資料顯示
 *
 * @param ShowData:eval
 * @text 顯示數據？
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc 在窗口圖標和精靈上方顯示狀態數據？
 * @default true
 *
 * @param DataFontSize:num
 * @text 數據字體大小
 * @parent Data
 * @type number
 * @min 1
 * @desc 用於顯示狀態數據的字體大小。
 * @default 12
 *
 * @param DataOffsetX:num
 * @text 偏移 X
 * @parent Data
 * @desc 偏移狀態數據顯示的X位置。
 * @default 0
 *
 * @param DataOffsetY:num
 * @text 偏移 Y
 * @parent Data
 * @desc 偏移狀態數據顯示的Y位置。
 * @default 8
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param onAddStateJS:func
 * @text JS: 添加狀態 On Add State
 * @parent CustomJS
 * @type note
 * @desc 每當添加狀態時，JavaScript代碼即可在全球範圍內實現自定義效果。
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: 擦除狀態 On Erase State
 * @parent CustomJS
 * @type note
 * @desc 每當刪除狀態時，JavaScript代碼即可在全球範圍內自定義效果。
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: 到期狀態 On Expire State
 * @parent CustomJS
 * @type note
 * @desc 狀態過期時用於全局範圍自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 * @text 一般
 *
 * @param ReapplyRules:str
 * @text 重新應用規則
 * @parent General
 * @type select
 * @option Ignore: 不添加Buff/Debuff。 Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: 輪流重置。Turns get reset.
 * @value reset
 * @option Greater: 匝數取更大的值（電流vs復位）。 Turns take greater value (current vs reset).
 * @value greater
 * @option Add: 輪流加在現有的回合上。 Turns add upon existing turns.
 * @value add
 * @desc 這些是重新應用增益/減益的規則。
 * @default greater
 *
 * @param MaxTurns:num
 * @text 最大回合
 * @parent General
 * @type number
 * @min 1
 * @desc 使buff和debuff達到的最大圈數。
 * @default 9999
 *
 * @param Stacking
 * @text 堆碼
 *
 * @param StackBuffMax:num
 * @text 最大疊加: 增強
 * @parent Stacking
 * @type number
 * @min 1
 * @desc 增益的最大堆疊數。
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text 最大疊加: 減益
 * @parent Stacking
 * @type number
 * @min 1
 * @desc 減益的最大堆疊數。
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: 增益/減益率 Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc 用於確定多少buff和debuff影響參數的代碼。
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text 顯示回合
 *
 * @param ShowTurns:eval
 * @text 顯示回合？
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc 顯示buff和debuff會在窗口圖標和回合精靈上方顯示嗎？
 * @default true
 *
 * @param TurnFontSize:num
 * @text 回合字體大小
 * @parent Turns
 * @type number
 * @min 1
 * @desc 用於顯示回合的字體大小。
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text 偏移 X
 * @parent Turns
 * @desc 偏移轉向顯示的X位置。
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text 偏移 Y
 * @parent Turns
 * @desc 偏移轉向顯示的Y位置。
 * @default -6
 *
 * @param ColorBuff:str
 * @text 回合顏色: Buffs
 * @parent Turns
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 24
 *
 * @param ColorDebuff:str
 * @text 回合顏色: Debuffs
 * @parent Turns
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 27
 *
 * @param Data
 * @text 率的顯示
 *
 * @param ShowData:eval
 * @text 顯示率？
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc 在窗口圖標和精靈上方顯示增益和減益率？
 * @default false
 *
 * @param DataFontSize:num
 * @text 率字體大小
 * @parent Data
 * @type number
 * @min 1
 * @desc 用於顯示速率的字體大小。
 * @default 12
 *
 * @param DataOffsetX:num
 * @text 偏移 X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text 偏移 Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param onAddBuffJS:func
 * @text JS: 新增增益時 On Add Buff
 * @parent CustomJS
 * @type note
 * @desc 添加buff時，可在全球範圍內使用自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: 新增減益時 On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc 每當添加減益效果時，即可在全球範圍內使用自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: 擦除buff On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc 每當擦除buff時，JavaScript代碼即可在全球範圍內自定義效果。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: 在擦除減益上 On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc 每當擦除減益效果時，就可以在全球範圍內使用自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: 過期增益時
 * @parent CustomJS
 * @type note
 * @desc 當buff過期時，可在全球範圍內自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: 過期減益
 * @parent CustomJS
 * @type note
 * @desc Debuff過期時，可在全球範圍內使用自定義效果的JavaScript代碼。
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 * @text 列表
 *
 * @param Global:arraynum
 * @text 全局被動
 * @parent List
 * @type state[]
 * @desc 影響角色和敵人的被動狀態列表。
 * @default []
 *
 * @param Actor:arraynum
 * @text 僅角色被動
 * @parent List
 * @type state[]
 * @desc 僅影響參與者的被動狀態列表。
 * @default []
 *
 * @param Enemy:arraynum
 * @text 敵人被動
 * @parent List
 * @type state[]
 * @desc 僅影響敵人的被動狀態列表。
 * @default []
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param PassiveConditionJS:func
 * @text JS: 條件檢查 Condition Check
 * @parent CustomJS
 * @type note
 * @desc 用於全局範圍內被動條件檢查的JavaScript代碼。
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3422=['process_VisuMZ_SkillsStatesCore_State_Notetags','getSkillIdWithName','Window_SkillList_updateHelp','ActionEndUpdate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','height','lineHeight','uiMenuStyle','Window_SkillStatus_refresh','Scene_Skill_createItemWindow','buff','helpWindowRectSkillsStatesCore','recalculateSlipDamageJS','SkillConditionJS','isActor','debuffColor','meetsPassiveStateGlobalConditionJS','currentDisplayedValue','_statusWindow','meetsStateCondition','Game_BattlerBase_skillTpCost','applyItemUserEffect','initialize','Costs','_currentActor','hasStateCategory','onExpireStateCustomJS','forgetSkill','stateMpSlipDamageJS','NUM','onEraseBuff','_stateDisplay','maxItems','paramBuffRate','setup','meetsSkillConditionsGlobalJS','auto','addPassiveStatesByPluginParameters','death','getStateIdWithName','getStateReapplyRulings','getStateRetainType','fillRect','loadBitmap','getStateData','heal','commandNameWindowDrawText','stateHpSlipHealJS','GroupDigits','version','DisplayedParams','Game_Battler_regenerateAll','groupDefeat','updateStatesActionEnd','_animationIndex','makeAdditionalSkillCostText','checkSkillTypeMatch','applyStateTurnManipulationEffects','onEraseDebuffJS','_checkingPassiveStates','buffTurns','FUNC','setupSkillsStatesCore','Game_BattlerBase_clearStates','_checkingVisuMzPassiveStateObjects','call','isGroupDefeatStateAffected','removeBuffsAuto','textSizeEx','ceil','clearStateDisplay','maxCols','setStatusWindow','center','statusWindowRectSkillsStatesCore','slipMp','parse','stateAddJS','ColorNegative','DEF','success','_cache','currentClass','Parse_Notetags_State_SlipEffectJS','includesSkillsStatesCore','description','recoverAll','drawTextEx','<member-%1>','HiddenSkillTypes','resetTextColor','setStypeId','ColorPositive','setStateData','isPlaytest','isUseModernControls','Parse_Notetags_Skill_Cost','shift','_commandNameWindow','initMembersSkillsStatesCore','paramValueByName','clearStateOrigin','skillVisibleJS','retrieveStateColor','onEraseBuffJS','damage','setDebuffTurns','setStateDisplay','Game_BattlerBase_resetStateCounts','refresh','_itemWindow','trim','_battler','_stateIDs','onAddDebuffJS','stateColor','createShopStatusWindow','PassiveConditionJS','1tCwIru','_stored_buffColor','decreaseBuff','isSkillUsableForAutoBattle','statePassiveConditionJS','removeStatesByCategory','onDatabaseLoaded','convertPassiveStates','507193moeGJQ','mpCost','slipHp','_states','exit','push','canClearState','changeOutlineColor','_skillIDs','process_VisuMZ_SkillsStatesCore_Notetags','onRemoveState','3olvMad','onAddStateCustomJS','Buffs','actor','BattleManager_endAction','addBuffTurns','onEraseBuffGlobalJS','getColorDataFromPluginParameters','rgba(0,\x200,\x200,\x201)','createItemWindow','onAddDebuff','ColorDebuff','iconText','max','_subject','drawActorStateTurns','MAXMP','removeStatesAuto','2719kWpFVu','skillTypeWindowRect','skillTypes','round','floor','addStateTurns','CalcJS','49zKCAuP','TurnOffsetY','clearStatesWithStateRetain','isStateExpired','createAllSkillCostText','GaugeMaxJS','isPartyAllAffectedByGroupDefeatStates','addPassiveStatesFromOtherPlugins','SkillSceneAdjustSkillList','_stateTurns','drawActorStateData','setStateRetainType','isStateCategoryAffected','convertGaugeTypeSkillsStatesCore','text','onExpireDebuff','checkSkillConditionsSwitchNotetags','statusWidth','drawSkillCost','getStateOriginByKey','clearStates','buffIconIndex','passiveStateObjects','onExpireDebuffGlobalJS','stateHpSlipDamageJS','Parse_Notetags_State_PassiveJS','canPaySkillCost','setActor','onExpireBuffGlobalJS','Game_BattlerBase_refresh','toLowerCase','onEraseDebuffGlobalJS','onAddDebuffGlobalJS','helpAreaTop','skillCostSeparator','redrawSkillsStatesCore','_stateMaxTurns','checkCacheKey','Global','user','skills','CmdTextAlign','itemWindowRect','untitled','applyStateCategoryRemovalEffects','Game_BattlerBase_states','PassiveStates','length','removeStatesByCategoryAll','EVAL','toUpperCase','buttonAssistText1','Window_SkillList_setActor','add','regenerateAllSkillsStatesCore','currentValue','MultiplierJS','checkShowHideSwitchNotetags','resetFontSettings','return\x200','clearStateRetainType','useDigitGrouping','drawActorIconsAllTurnCounters','setBuffTurns','IconStypeNorm','number','JSON','SkillMenuStatusRect','Game_BattlerBase_buffIconIndex','ARRAYNUM','EnableLayout','_stateData','helpWindowRect','opacity','map','Window_SkillList_maxCols','onAddStateGlobalJS','onEraseDebuff','drawActorBuffTurns','_skillTypeWindow','Game_BattlerBase_initMembers','meetsSkillConditionsEnableJS','endAction','itemLineRect','Sprite_StateIcon_updateFrame','actions','addDebuffTurns','slipTp','Enemy','makeCurrentTroopUniqueID','applyDebuffTurnManipulationEffects','Parse_Notetags_Skill_JS','ARRAYSTR','LUK','allowCreateShopStatusWindow','onAddStateJS','clear','format','adjustItemWidthByShopStatus','ColorBuff','note','clamp','Game_Battler_isStateAddable','isBuffOrDebuffAffected','_stateOrigin','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawParamText','isStateAddable','updateTurnDisplaySprite','getClassIdWithName','Scene_Skill_skillTypeWindowRect','isUseSkillsStatesCoreUpdatedLayout','placeExactGauge','passiveStates','_currentTroopUniqueID','redraw','removeBuff','SkillsStatesCore','ANY','Window_StatusBase_drawActorIcons','Window_StatusBase_placeGauge','VisuMZ_1_MainMenuCore','gainSilentTp','commandStyleCheck','Sprite_StateIcon_loadBitmap','STR','overwriteBuffTurns','<enemy-%1>','ARRAYFUNC','canUse','isBuffAffected','multiclasses','value','ShowTurns','_stored_debuffColor','Game_BattlerBase_increaseBuff','mainCommandWidth','isSkillCostShown','Sprite_Gauge_setup','ReapplyRules','GaugeCurrentJS','Parse_Notetags_State_ApplyRemoveLeaveJS','stateTpSlipHealJS','onAddBuff','icon','MDF','Scene_Skill_statusWindowRect','StackBuffMax','inBattle','meetsSkillConditions','eraseBuff','isLearnedSkill','VisuMZ_0_CoreEngine','meetsPassiveStateConditionJS','members','getSkillTypes','split','maxSlipDamage','_classIDs','keys','isStateAffected','priority','_shopStatusWindow','addWindow','drawExtendedParameter','stateId','gainHp','remove','ParseStateNotetags','fontSize','Scene_Skill_helpWindowRect','getStateDisplay','constructor','Game_Battler_addState','fontFace','eraseState','changeTextColor','_colorCache','Settings','GaugeDrawJS','Game_Action_applyItemUserEffect','currentMaxValue','Scene_Boot_onDatabaseLoaded','Game_Actor_learnSkill','Parse_Notetags_State_Category','iconHeight','bitmap','gaugeLineHeight','commandNameWindowCenter','VisuMZ_2_ClassChangeSystem','convertTargetToStateOriginKey','placeGauge','Sprite_Gauge_redraw','greater','setStateOrigin','resetStateCounts','iconIndex','outlineColor','addDebuff','buffColor','NEGATIVE','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MAT','createSkillCostText','TurnOffsetX','clearStateData','_turnDisplaySprite','meetsPassiveStateConditionClasses','checkShowHideBattleNotetags','10658YkudNM','filter','DataOffsetY','isStateResist','isBuffExpired','CoreEngine','onEraseStateGlobalJS','actorId','gaugeRate','_result','drawItemStyleIcon','removeState','%1\x20%2\x20%3','enemy','106268vRUAul','shopStatusWidth','gainMp','Game_BattlerBase_eraseBuff','CanPayJS','ParseSkillNotetags','Game_Troop_setup','<troop-%1>','_stateRetainType','frameCount','Skills','states','updateHelp','concat','isMaxBuffAffected','_categoryWindow','ParseAllNotetags','stateTpSlipDamageJS','none','getCurrentStateActiveUser','reset','getColor','createCommandNameWindow','isAlive','Scene_Skill_itemWindowRect','MaxTurns','Sprite_Gauge_currentMaxValue','_stypeIDs','uiHelpPosition','drawItemStyleIconText','right','AGI','shopStatusWindowRectSkillsStatesCore','onExpireBuffJS','ignore','log','autoRemovalTiming','onAddBuffJS','enemyId','Name','DataOffsetX','skillId','paySkillCost','checkShowHideJS','setPassiveStateSlipDamageJS','drawActorIcons','Game_BattlerBase_decreaseBuff','CmdStyle','isRightInputMode','Game_BattlerBase_recoverAll','IconStypeMagic','skill','Game_BattlerBase_meetsSkillConditions','States','Sprite_Gauge_gaugeRate','addPassiveStatesTraitSets','Sprite_Gauge_currentValue','isStateRemoved','categories','onExpireStateJS','shopStatusWindowRect','SkillSceneStatusBgType','stateEraseJS','changePaintOpacity','skillTypeWindowRectSkillsStatesCore','mainFontSize','_buffTurns','allIcons','checkShowHideSkillNotetags','contents','updateFrame','drawFullGauge','recover\x20all','skillTpCost','sort','addPassiveStates','hasState','innerWidth','isDebuffAffected','prototype','49187rpHUSE','initMembers','isAllDead','ARRAYJSON','stateData','increaseBuff','skillMpCost','isCommandEnabled','match','_stypeId','setItem','addState','Game_Battler_addDebuff','Game_Actor_forgetSkill','ShowShopStatus','onAddStateMakeCustomSlipValues','onAddState','_buffs','stateMpSlipHealJS','colSpacing','Game_Battler_addBuff','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addBuff','currentMaxValueSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_eraseState','STRUCT','ParseClassIDs','Window_SkillList_includes','textColor','includes','VisuMZ_1_ElementStatusCore','VisuMZ_1_ItemsEquipsCore','updatedLayoutStyle','onEraseStateJS','#%1','getStateOrigin','LayoutStyle','statusWindowRect','drawItem','_costSettings','onRegenerateCustomStateDamageOverTime','stateExpireJS','callUpdateHelp','Window_SkillType_initialize','Actor','replace','addChild','indexOf','hasSkill','makeSuccess','applyBuffTurnManipulationEffects','commandStyle','buffLength','drawText','totalStateCategoryAffected','getCurrentTroopUniqueID','index','_scene','onExpireBuff','onEraseStateCustomJS','ConvertParams','itemAt','debuffTurns','normalColor','stateTurns','Sprite_Gauge_initMembers','drawActorBuffRates','checkShowHideNotetags','checkSkillConditionsNotetags','anchor','stateMaximumTurns','commandName','makeCommandName','ATK','setStateTurns','usableSkills','onAddBuffGlobalJS','calcWindowHeight','statesByCategory','mainAreaHeight','itemWindowRectSkillsStatesCore','makeCommandList','Game_Unit_isAllDead','skillEnableJS','393627YIoxkm','name','Game_BattlerBase_overwriteBuffTurns','addPassiveStatesByNotetag','TurnFontSize','stypeId','ShowJS','meetsPassiveStateConditionSwitches','293EIRMig','iconWidth','item','width','updateCommandNameWindow','onExpireStateGlobalJS','drawExtendedSkillsStatesCoreStatus','mainAreaTop','currentValueSkillsStatesCore','fontBold','_actor','boxWidth','164553ihdbmQ','meetsPassiveStateConditions'];const _0xb1b7=function(_0x28a0ac,_0x204569){_0x28a0ac=_0x28a0ac-0x149;let _0x34228d=_0x3422[_0x28a0ac];return _0x34228d;};const _0x1d51ec=_0xb1b7;(function(_0x443add,_0x12689b){const _0x31ad0f=_0xb1b7;while(!![]){try{const _0x352d39=parseInt(_0x31ad0f(0x29d))*parseInt(_0x31ad0f(0x36e))+parseInt(_0x31ad0f(0x279))*parseInt(_0x31ad0f(0x271))+parseInt(_0x31ad0f(0x296))*-parseInt(_0x31ad0f(0x1ed))+parseInt(_0x31ad0f(0x37c))+parseInt(_0x31ad0f(0x1e5))+-parseInt(_0x31ad0f(0x1f9))+-parseInt(_0x31ad0f(0x190))*parseInt(_0x31ad0f(0x284));if(_0x352d39===_0x12689b)break;else _0x443add['push'](_0x443add['shift']());}catch(_0x5413bb){_0x443add['push'](_0x443add['shift']());}}}(_0x3422,0x66ac5));var label=_0x1d51ec(0x312),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d51ec(0x36f)](function(_0xa61f91){const _0x565b36=_0x1d51ec;return _0xa61f91['status']&&_0xa61f91[_0x565b36(0x250)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1d51ec(0x34f)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1d51ec(0x1cd)]=function(_0x57cd97,_0x431f0c){const _0x423699=_0x1d51ec;for(const _0x49af7b in _0x431f0c){if(_0x49af7b[_0x423699(0x198)](/(.*):(.*)/i)){const _0x543b31=String(RegExp['$1']),_0x500eda=String(RegExp['$2'])['toUpperCase']()[_0x423699(0x26a)]();let _0x350bf0,_0x35ee2d,_0x7e9c6c;switch(_0x500eda){case _0x423699(0x218):_0x350bf0=_0x431f0c[_0x49af7b]!==''?Number(_0x431f0c[_0x49af7b]):0x0;break;case _0x423699(0x2e2):_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d['map'](_0x2787ff=>Number(_0x2787ff));break;case _0x423699(0x2ce):_0x350bf0=_0x431f0c[_0x49af7b]!==''?eval(_0x431f0c[_0x49af7b]):null;break;case'ARRAYEVAL':_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON['parse'](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d[_0x423699(0x2e7)](_0x220fd4=>eval(_0x220fd4));break;case _0x423699(0x2df):_0x350bf0=_0x431f0c[_0x49af7b]!==''?JSON['parse'](_0x431f0c[_0x49af7b]):'';break;case _0x423699(0x193):_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d[_0x423699(0x2e7)](_0x43f760=>JSON[_0x423699(0x247)](_0x43f760));break;case _0x423699(0x238):_0x350bf0=_0x431f0c[_0x49af7b]!==''?new Function(JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b])):new Function(_0x423699(0x2d8));break;case _0x423699(0x31d):_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d[_0x423699(0x2e7)](_0x1a2194=>new Function(JSON[_0x423699(0x247)](_0x1a2194)));break;case _0x423699(0x31a):_0x350bf0=_0x431f0c[_0x49af7b]!==''?String(_0x431f0c[_0x49af7b]):'';break;case _0x423699(0x2f9):_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d[_0x423699(0x2e7)](_0x2d4a3c=>String(_0x2d4a3c));break;case _0x423699(0x1aa):_0x7e9c6c=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):{},_0x57cd97[_0x543b31]={},VisuMZ['ConvertParams'](_0x57cd97[_0x543b31],_0x7e9c6c);continue;case'ARRAYSTRUCT':_0x35ee2d=_0x431f0c[_0x49af7b]!==''?JSON[_0x423699(0x247)](_0x431f0c[_0x49af7b]):[],_0x350bf0=_0x35ee2d[_0x423699(0x2e7)](_0x5dad83=>VisuMZ[_0x423699(0x1cd)]({},JSON[_0x423699(0x247)](_0x5dad83)));break;default:continue;}_0x57cd97[_0x543b31]=_0x350bf0;}}return _0x57cd97;},(_0x1d026c=>{const _0x3cee9d=_0x1d51ec,_0xbc6e9b=_0x1d026c[_0x3cee9d(0x1e6)];for(const _0x3cd2d9 of dependencies){if(!Imported[_0x3cd2d9]){alert(_0x3cee9d(0x366)[_0x3cee9d(0x2fe)](_0xbc6e9b,_0x3cd2d9)),SceneManager[_0x3cee9d(0x27d)]();break;}}const _0x4eca6d=_0x1d026c[_0x3cee9d(0x250)];if(_0x4eca6d[_0x3cee9d(0x198)](/\[Version[ ](.*?)\]/i)){const _0x84c95d=Number(RegExp['$1']);_0x84c95d!==VisuMZ[label][_0x3cee9d(0x22c)]&&(alert(_0x3cee9d(0x1a5)[_0x3cee9d(0x2fe)](_0xbc6e9b,_0x84c95d)),SceneManager[_0x3cee9d(0x27d)]());}if(_0x4eca6d[_0x3cee9d(0x198)](/\[Tier[ ](\d+)\]/i)){const _0x51408c=Number(RegExp['$1']);_0x51408c<tier?(alert(_0x3cee9d(0x306)[_0x3cee9d(0x2fe)](_0xbc6e9b,_0x51408c,tier)),SceneManager[_0x3cee9d(0x27d)]()):tier=Math[_0x3cee9d(0x291)](_0x51408c,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3cee9d(0x34f)],_0x1d026c['parameters']);})(pluginData),VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x353)]=Scene_Boot[_0x1d51ec(0x18f)][_0x1d51ec(0x277)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x85a1c6=_0x1d51ec;VisuMZ[_0x85a1c6(0x312)]['Scene_Boot_onDatabaseLoaded'][_0x85a1c6(0x23c)](this),this[_0x85a1c6(0x282)]();},Scene_Boot['prototype'][_0x1d51ec(0x282)]=function(){const _0x37a769=_0x1d51ec;if(VisuMZ[_0x37a769(0x150)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x1d51ec(0x18f)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x558db9=_0x1d51ec;for(const _0x571197 of $dataSkills){if(!_0x571197)continue;VisuMZ[_0x558db9(0x312)]['Parse_Notetags_Skill_Cost'](_0x571197),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_JS'](_0x571197);}},Scene_Boot[_0x1d51ec(0x18f)][_0x1d51ec(0x1fb)]=function(){const _0x125bbd=_0x1d51ec;for(const _0x407b1f of $dataStates){if(!_0x407b1f)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category'](_0x407b1f),VisuMZ[_0x125bbd(0x312)]['Parse_Notetags_State_PassiveJS'](_0x407b1f),VisuMZ[_0x125bbd(0x312)][_0x125bbd(0x24e)](_0x407b1f),VisuMZ['SkillsStatesCore'][_0x125bbd(0x32a)](_0x407b1f);}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x381)]=VisuMZ[_0x1d51ec(0x381)],VisuMZ[_0x1d51ec(0x381)]=function(_0x4a1b00){const _0x4140e4=_0x1d51ec;VisuMZ[_0x4140e4(0x312)]['ParseSkillNotetags'][_0x4140e4(0x23c)](this,_0x4a1b00),VisuMZ['SkillsStatesCore'][_0x4140e4(0x25b)](_0x4a1b00),VisuMZ[_0x4140e4(0x312)][_0x4140e4(0x2f8)](_0x4a1b00);},VisuMZ['SkillsStatesCore']['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ[_0x1d51ec(0x345)]=function(_0x471e3c){const _0x4ad8cb=_0x1d51ec;VisuMZ[_0x4ad8cb(0x312)]['ParseStateNotetags'][_0x4ad8cb(0x23c)](this,_0x471e3c),VisuMZ[_0x4ad8cb(0x312)]['Parse_Notetags_State_Category'](_0x471e3c),VisuMZ[_0x4ad8cb(0x312)][_0x4ad8cb(0x2b6)](_0x471e3c),VisuMZ[_0x4ad8cb(0x312)]['Parse_Notetags_State_SlipEffectJS'](_0x471e3c),VisuMZ[_0x4ad8cb(0x312)][_0x4ad8cb(0x32a)](_0x471e3c);},VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost']=function(_0x1853d7){const _0x5efac3=_0x1d51ec,_0x531a1f=_0x1853d7['note'];_0x531a1f[_0x5efac3(0x198)](/<MP COST:[ ](\d+)>/i)&&(_0x1853d7[_0x5efac3(0x27a)]=Number(RegExp['$1'])),_0x531a1f[_0x5efac3(0x198)](/<TP COST:[ ](\d+)>/i)&&(_0x1853d7['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x1e4)]={},VisuMZ[_0x1d51ec(0x312)]['skillVisibleJS']={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2f8)]=function(_0x418da5){const _0x424d5b=_0x1d51ec,_0x130a49=_0x418da5['note'];if(_0x130a49[_0x424d5b(0x198)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x143a07=String(RegExp['$1']),_0x3b1832='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x424d5b(0x2fe)](_0x143a07);VisuMZ['SkillsStatesCore'][_0x424d5b(0x1e4)][_0x418da5['id']]=new Function(_0x424d5b(0x173),_0x3b1832);}if(_0x130a49[_0x424d5b(0x198)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x12530b=String(RegExp['$1']),_0x27623b=_0x424d5b(0x1a8)[_0x424d5b(0x2fe)](_0x12530b);VisuMZ[_0x424d5b(0x312)][_0x424d5b(0x261)][_0x418da5['id']]=new Function(_0x424d5b(0x173),_0x27623b);}},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x355)]=function(_0x47db71){const _0x3caed6=_0x1d51ec;_0x47db71[_0x3caed6(0x17a)]=['ALL',_0x3caed6(0x313)];const _0x36e7b1=_0x47db71['note'],_0x54de76=_0x36e7b1[_0x3caed6(0x198)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x54de76)for(const _0x242036 of _0x54de76){_0x242036['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xce115c=String(RegExp['$1'])[_0x3caed6(0x2cf)]()[_0x3caed6(0x26a)]()['split'](',');for(const _0x2613f7 of _0xce115c){_0x47db71[_0x3caed6(0x17a)][_0x3caed6(0x27e)](_0x2613f7['trim']());}}if(_0x36e7b1['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4c922e=RegExp['$1']['split'](/[\r\n]+/);for(const _0x2b56ae of _0x4c922e){_0x47db71[_0x3caed6(0x17a)][_0x3caed6(0x27e)](_0x2b56ae[_0x3caed6(0x2cf)]()['trim']());}}_0x36e7b1[_0x3caed6(0x198)](/<POSITIVE STATE>/i)&&_0x47db71['categories'][_0x3caed6(0x27e)]('POSITIVE'),_0x36e7b1[_0x3caed6(0x198)](/<NEGATIVE STATE>/i)&&_0x47db71[_0x3caed6(0x17a)]['push'](_0x3caed6(0x365));},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x275)]={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2b6)]=function(_0x1bcbdb){const _0x219ccc=_0x1d51ec,_0x32bf81=_0x1bcbdb['note'];if(_0x32bf81[_0x219ccc(0x198)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0xf2ecf2=String(RegExp['$1']),_0x2fa4b0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x219ccc(0x2fe)](_0xf2ecf2);VisuMZ[_0x219ccc(0x312)][_0x219ccc(0x275)][_0x1bcbdb['id']]=new Function('state',_0x2fa4b0);}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2b5)]={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x22a)]={},VisuMZ[_0x1d51ec(0x312)]['stateMpSlipDamageJS']={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x1a2)]={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x151)]={},VisuMZ[_0x1d51ec(0x312)]['stateTpSlipHealJS']={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0x37fced){const _0x2d9f21=_0x1d51ec,_0x421c9c=_0x37fced[_0x2d9f21(0x301)],_0x11171b=_0x2d9f21(0x1ff);if(_0x421c9c['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x2fef1f=String(RegExp['$1']),_0x4071df=_0x11171b[_0x2d9f21(0x2fe)](_0x2fef1f,_0x2d9f21(0x264),-0x1,_0x2d9f21(0x27b));VisuMZ[_0x2d9f21(0x312)][_0x2d9f21(0x2b5)][_0x37fced['id']]=new Function(_0x2d9f21(0x342),_0x4071df);}else{if(_0x421c9c[_0x2d9f21(0x198)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x40a0a0=String(RegExp['$1']),_0x1a7b76=_0x11171b['format'](_0x40a0a0,_0x2d9f21(0x228),0x1,'slipHp');VisuMZ[_0x2d9f21(0x312)][_0x2d9f21(0x22a)][_0x37fced['id']]=new Function(_0x2d9f21(0x342),_0x1a7b76);}}if(_0x421c9c['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0xb4876f=String(RegExp['$1']),_0xe499ed=_0x11171b['format'](_0xb4876f,_0x2d9f21(0x264),-0x1,_0x2d9f21(0x246));VisuMZ['SkillsStatesCore'][_0x2d9f21(0x217)][_0x37fced['id']]=new Function(_0x2d9f21(0x342),_0xe499ed);}else{if(_0x421c9c[_0x2d9f21(0x198)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x283bbc=String(RegExp['$1']),_0x2e7fd9=_0x11171b['format'](_0x283bbc,_0x2d9f21(0x228),0x1,_0x2d9f21(0x246));VisuMZ['SkillsStatesCore'][_0x2d9f21(0x1a2)][_0x37fced['id']]=new Function(_0x2d9f21(0x342),_0x2e7fd9);}}if(_0x421c9c[_0x2d9f21(0x198)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0xe0b0ad=String(RegExp['$1']),_0x1a2d0a=_0x11171b[_0x2d9f21(0x2fe)](_0xe0b0ad,_0x2d9f21(0x264),-0x1,'slipTp');VisuMZ[_0x2d9f21(0x312)][_0x2d9f21(0x151)][_0x37fced['id']]=new Function('stateId',_0x1a2d0a);}else{if(_0x421c9c[_0x2d9f21(0x198)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x1f4097=String(RegExp['$1']),_0x4b96ac=_0x11171b[_0x2d9f21(0x2fe)](_0x1f4097,'heal',0x1,_0x2d9f21(0x2f4));VisuMZ[_0x2d9f21(0x312)][_0x2d9f21(0x32b)][_0x37fced['id']]=new Function(_0x2d9f21(0x342),_0x4b96ac);}}},VisuMZ['SkillsStatesCore']['stateAddJS']={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x17e)]={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x1ba)]={},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x32a)]=function(_0x3d25ff){const _0x273d1a=_0x1d51ec,_0x3a8a4d=_0x3d25ff[_0x273d1a(0x301)],_0xc4f079='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x3a8a4d[_0x273d1a(0x198)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x419835=String(RegExp['$1']),_0x2af2a6=_0xc4f079[_0x273d1a(0x2fe)](_0x419835);VisuMZ[_0x273d1a(0x312)][_0x273d1a(0x248)][_0x3d25ff['id']]=new Function(_0x273d1a(0x342),_0x2af2a6);}if(_0x3a8a4d['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0xb2af06=String(RegExp['$1']),_0x54057b=_0xc4f079[_0x273d1a(0x2fe)](_0xb2af06);VisuMZ[_0x273d1a(0x312)][_0x273d1a(0x17e)][_0x3d25ff['id']]=new Function('stateId',_0x54057b);}if(_0x3a8a4d[_0x273d1a(0x198)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x48ece8=String(RegExp['$1']),_0xd25af5=_0xc4f079['format'](_0x48ece8);VisuMZ['SkillsStatesCore'][_0x273d1a(0x1ba)][_0x3d25ff['id']]=new Function(_0x273d1a(0x342),_0xd25af5);}},DataManager[_0x1d51ec(0x30a)]=function(_0x5f43a5){const _0x220c1e=_0x1d51ec;_0x5f43a5=_0x5f43a5['toUpperCase']()[_0x220c1e(0x26a)](),this[_0x220c1e(0x33b)]=this[_0x220c1e(0x33b)]||{};if(this[_0x220c1e(0x33b)][_0x5f43a5])return this[_0x220c1e(0x33b)][_0x5f43a5];for(const _0x280d8d of $dataClasses){if(!_0x280d8d)continue;let _0x25e7d8=_0x280d8d[_0x220c1e(0x1e6)];_0x25e7d8=_0x25e7d8[_0x220c1e(0x1be)](/\x1I\[(\d+)\]/gi,''),_0x25e7d8=_0x25e7d8[_0x220c1e(0x1be)](/\\I\[(\d+)\]/gi,''),this[_0x220c1e(0x33b)][_0x25e7d8[_0x220c1e(0x2cf)]()[_0x220c1e(0x26a)]()]=_0x280d8d['id'];}return this['_classIDs'][_0x5f43a5]||0x0;},DataManager['getSkillTypes']=function(_0x146755){const _0x2b5073=_0x1d51ec;this[_0x2b5073(0x15b)]=this['_stypeIDs']||{};if(this[_0x2b5073(0x15b)][_0x146755['id']])return this[_0x2b5073(0x15b)][_0x146755['id']];this[_0x2b5073(0x15b)][_0x146755['id']]=[_0x146755[_0x2b5073(0x1ea)]];if(_0x146755['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xb7de07=JSON[_0x2b5073(0x247)]('['+RegExp['$1'][_0x2b5073(0x198)](/\d+/g)+']');this[_0x2b5073(0x15b)][_0x146755['id']]=this[_0x2b5073(0x15b)][_0x146755['id']][_0x2b5073(0x14d)](_0xb7de07);}else{if(_0x146755['note'][_0x2b5073(0x198)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2d810c=RegExp['$1'][_0x2b5073(0x339)](',');for(const _0x2d31a2 of _0x2d810c){const _0x4e5bea=DataManager['getStypeIdWithName'](_0x2d31a2);if(_0x4e5bea)this[_0x2b5073(0x15b)][_0x146755['id']]['push'](_0x4e5bea);}}}return this[_0x2b5073(0x15b)][_0x146755['id']];},DataManager['getStypeIdWithName']=function(_0x43491a){const _0x4839ce=_0x1d51ec;_0x43491a=_0x43491a[_0x4839ce(0x2cf)]()['trim'](),this['_stypeIDs']=this['_stypeIDs']||{};if(this[_0x4839ce(0x15b)][_0x43491a])return this['_stypeIDs'][_0x43491a];for(let _0x4ffa24=0x1;_0x4ffa24<0x64;_0x4ffa24++){if(!$dataSystem[_0x4839ce(0x298)][_0x4ffa24])continue;let _0x55c1fe=$dataSystem[_0x4839ce(0x298)][_0x4ffa24][_0x4839ce(0x2cf)]()[_0x4839ce(0x26a)]();_0x55c1fe=_0x55c1fe[_0x4839ce(0x1be)](/\x1I\[(\d+)\]/gi,''),_0x55c1fe=_0x55c1fe[_0x4839ce(0x1be)](/\\I\[(\d+)\]/gi,''),this[_0x4839ce(0x15b)][_0x55c1fe]=_0x4ffa24;}return this[_0x4839ce(0x15b)][_0x43491a]||0x0;},DataManager['getSkillIdWithName']=function(_0x2cd38f){const _0x244248=_0x1d51ec;_0x2cd38f=_0x2cd38f[_0x244248(0x2cf)]()[_0x244248(0x26a)](),this[_0x244248(0x281)]=this['_skillIDs']||{};if(this[_0x244248(0x281)][_0x2cd38f])return this[_0x244248(0x281)][_0x2cd38f];for(const _0x3dae4d of $dataSkills){if(!_0x3dae4d)continue;this[_0x244248(0x281)][_0x3dae4d[_0x244248(0x1e6)][_0x244248(0x2cf)]()[_0x244248(0x26a)]()]=_0x3dae4d['id'];}return this[_0x244248(0x281)][_0x2cd38f]||0x0;},DataManager[_0x1d51ec(0x222)]=function(_0x3f6a2c){const _0x3ce075=_0x1d51ec;_0x3f6a2c=_0x3f6a2c[_0x3ce075(0x2cf)]()['trim'](),this[_0x3ce075(0x26c)]=this[_0x3ce075(0x26c)]||{};if(this['_stateIDs'][_0x3f6a2c])return this[_0x3ce075(0x26c)][_0x3f6a2c];for(const _0x41b4be of $dataStates){if(!_0x41b4be)continue;this[_0x3ce075(0x26c)][_0x41b4be[_0x3ce075(0x1e6)][_0x3ce075(0x2cf)]()['trim']()]=_0x41b4be['id'];}return this['_stateIDs'][_0x3f6a2c]||0x0;},DataManager[_0x1d51ec(0x1d7)]=function(_0x30cfae){const _0x4a41de=_0x1d51ec;this[_0x4a41de(0x2c1)]=this['_stateMaxTurns']||{};if(this['_stateMaxTurns'][_0x30cfae])return this['_stateMaxTurns'][_0x30cfae];return $dataStates[_0x30cfae]['note'][_0x4a41de(0x198)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x4a41de(0x2c1)][_0x30cfae]=Number(RegExp['$1']):this[_0x4a41de(0x2c1)][_0x30cfae]=VisuMZ[_0x4a41de(0x312)][_0x4a41de(0x34f)][_0x4a41de(0x175)]['MaxTurns'],this[_0x4a41de(0x2c1)][_0x30cfae];},ColorManager[_0x1d51ec(0x28b)]=function(_0x1dc9ba,_0x3464b7){const _0x58406f=_0x1d51ec;return _0x3464b7=String(_0x3464b7),this[_0x58406f(0x34e)]=this[_0x58406f(0x34e)]||{},_0x3464b7[_0x58406f(0x198)](/#(.*)/i)?this[_0x58406f(0x34e)][_0x1dc9ba]=_0x58406f(0x1b3)[_0x58406f(0x2fe)](String(RegExp['$1'])):this[_0x58406f(0x34e)][_0x1dc9ba]=this[_0x58406f(0x1ad)](Number(_0x3464b7)),this[_0x58406f(0x34e)][_0x1dc9ba];},ColorManager[_0x1d51ec(0x155)]=function(_0x8d6376){const _0x66278d=_0x1d51ec;return _0x8d6376=String(_0x8d6376),_0x8d6376['match'](/#(.*)/i)?_0x66278d(0x1b3)[_0x66278d(0x2fe)](String(RegExp['$1'])):this[_0x66278d(0x1ad)](Number(_0x8d6376));},ColorManager[_0x1d51ec(0x26e)]=function(_0x1a13dd){const _0xc6e0df=_0x1d51ec;if(typeof _0x1a13dd==='number')_0x1a13dd=$dataStates[_0x1a13dd];const _0x2e1294='_stored_state-%1-color'['format'](_0x1a13dd['id']);this[_0xc6e0df(0x34e)]=this[_0xc6e0df(0x34e)]||{};if(this[_0xc6e0df(0x34e)][_0x2e1294])return this[_0xc6e0df(0x34e)][_0x2e1294];const _0x308267=this['retrieveStateColor'](_0x1a13dd);return this[_0xc6e0df(0x28b)](_0x2e1294,_0x308267);},ColorManager[_0x1d51ec(0x262)]=function(_0x42b4cc){const _0x1d3817=_0x1d51ec,_0x3b56a1=_0x42b4cc['note'];if(_0x3b56a1[_0x1d3817(0x198)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3b56a1[_0x1d3817(0x198)](/<POSITIVE STATE>/i))return VisuMZ[_0x1d3817(0x312)][_0x1d3817(0x34f)][_0x1d3817(0x175)][_0x1d3817(0x257)];else return _0x3b56a1['match'](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x1d3817(0x34f)][_0x1d3817(0x175)][_0x1d3817(0x249)]:VisuMZ[_0x1d3817(0x312)]['Settings'][_0x1d3817(0x175)]['ColorNeutral'];}},ColorManager[_0x1d51ec(0x364)]=function(){const _0x406e6a=_0x1d51ec,_0x1c6478=_0x406e6a(0x272);this['_colorCache']=this[_0x406e6a(0x34e)]||{};if(this[_0x406e6a(0x34e)][_0x1c6478])return this['_colorCache'][_0x1c6478];const _0x1fd7f4=VisuMZ[_0x406e6a(0x312)]['Settings'][_0x406e6a(0x286)][_0x406e6a(0x300)];return this[_0x406e6a(0x28b)](_0x1c6478,_0x1fd7f4);},ColorManager['debuffColor']=function(){const _0x3cc30d=_0x1d51ec,_0x5bbfbe=_0x3cc30d(0x323);this[_0x3cc30d(0x34e)]=this[_0x3cc30d(0x34e)]||{};if(this['_colorCache'][_0x5bbfbe])return this[_0x3cc30d(0x34e)][_0x5bbfbe];const _0x181812=VisuMZ['SkillsStatesCore'][_0x3cc30d(0x34f)][_0x3cc30d(0x286)][_0x3cc30d(0x28f)];return this['getColorDataFromPluginParameters'](_0x5bbfbe,_0x181812);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x288)]=BattleManager[_0x1d51ec(0x2ef)],BattleManager['endAction']=function(){const _0x1ca429=_0x1d51ec;this[_0x1ca429(0x230)](),VisuMZ[_0x1ca429(0x312)][_0x1ca429(0x288)][_0x1ca429(0x23c)](this);},BattleManager[_0x1d51ec(0x230)]=function(){const _0x2373d2=_0x1d51ec,_0x1f480b=VisuMZ[_0x2373d2(0x312)][_0x2373d2(0x34f)][_0x2373d2(0x175)];if(!_0x1f480b)return;if(_0x1f480b[_0x2373d2(0x1fe)]===![])return;if(!this[_0x2373d2(0x292)])return;this[_0x2373d2(0x292)][_0x2373d2(0x230)]();},Game_Battler['prototype']['updateStatesActionEnd']=function(){const _0x5729b=_0x1d51ec;for(const _0x11fdc3 of this['_states']){const _0x31eb02=$dataStates[_0x11fdc3];if(!_0x31eb02)continue;if(_0x31eb02[_0x5729b(0x164)]!==0x1)continue;this[_0x5729b(0x2a6)][_0x11fdc3]>0x0&&this['_stateTurns'][_0x11fdc3]--;}this[_0x5729b(0x295)](0x1);},Game_BattlerBase[_0x1d51ec(0x18f)]['updateStateTurns']=function(){const _0x5ce597=_0x1d51ec,_0x431334=VisuMZ['SkillsStatesCore'][_0x5ce597(0x34f)][_0x5ce597(0x175)];for(const _0x583b1d of this[_0x5ce597(0x27c)]){const _0x283109=$dataStates[_0x583b1d];if(_0x431334&&_0x431334[_0x5ce597(0x1fe)]!==![]){if(_0x283109&&_0x283109[_0x5ce597(0x164)]===0x1)continue;}this[_0x5ce597(0x2a6)][_0x583b1d]>0x0&&this[_0x5ce597(0x2a6)][_0x583b1d]--;}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x351)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x1d51ec(0x18f)][_0x1d51ec(0x210)]=function(_0x4239fb){const _0x9cde45=_0x1d51ec;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect'][_0x9cde45(0x23c)](this,_0x4239fb),this['applySkillsStatesCoreEffects'](_0x4239fb);},Game_Action['prototype']['applySkillsStatesCoreEffects']=function(_0x48336d){const _0x35be49=_0x1d51ec;this['applyStateCategoryRemovalEffects'](_0x48336d),this[_0x35be49(0x234)](_0x48336d),this[_0x35be49(0x1c3)](_0x48336d),this[_0x35be49(0x2f7)](_0x48336d);},Game_Action[_0x1d51ec(0x18f)][_0x1d51ec(0x2c9)]=function(_0x1a850b){const _0x8cf926=_0x1d51ec;if(_0x1a850b[_0x8cf926(0x14b)]()[_0x8cf926(0x2cc)]<=0x0)return;const _0x2b1761=this[_0x8cf926(0x1ef)]()[_0x8cf926(0x301)];if(_0x2b1761[_0x8cf926(0x198)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x382800=String(RegExp['$1']);_0x1a850b['removeStatesByCategoryAll'](_0x382800);}const _0x47ec73=_0x2b1761[_0x8cf926(0x198)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x47ec73)for(const _0x33443f of _0x47ec73){_0x33443f[_0x8cf926(0x198)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2f2234=String(RegExp['$1']),_0x165e9b=Number(RegExp['$2']);_0x1a850b['removeStatesByCategory'](_0x2f2234,_0x165e9b);}},Game_Action['prototype']['applyStateTurnManipulationEffects']=function(_0x43cea4){const _0x277dee=_0x1d51ec,_0x2b1160=this[_0x277dee(0x1ef)]()[_0x277dee(0x301)],_0x24ab2c=_0x2b1160['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x24ab2c)for(const _0x412966 of _0x24ab2c){let _0x2b84e3=0x0,_0xc05e4f=0x0;if(_0x412966[_0x277dee(0x198)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2b84e3=Number(RegExp['$1']),_0xc05e4f=Number(RegExp['$2']);else _0x412966['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2b84e3=DataManager['getStateIdWithName'](RegExp['$1']),_0xc05e4f=Number(RegExp['$2']));_0x43cea4[_0x277dee(0x1db)](_0x2b84e3,_0xc05e4f),this['makeSuccess'](_0x43cea4);}const _0x3df842=_0x2b1160[_0x277dee(0x198)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3df842)for(const _0x51f192 of _0x3df842){let _0x2f2407=0x0,_0xb1e563=0x0;if(_0x51f192['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x2f2407=Number(RegExp['$1']),_0xb1e563=Number(RegExp['$2']);else _0x51f192[_0x277dee(0x198)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x2f2407=DataManager['getStateIdWithName'](RegExp['$1']),_0xb1e563=Number(RegExp['$2']));_0x43cea4[_0x277dee(0x29b)](_0x2f2407,_0xb1e563),this[_0x277dee(0x1c2)](_0x43cea4);}},Game_Action[_0x1d51ec(0x18f)]['applyBuffTurnManipulationEffects']=function(_0x2504ae){const _0x51a706=_0x1d51ec,_0x43328d=['MAXHP',_0x51a706(0x294),_0x51a706(0x1da),_0x51a706(0x24a),'MAT',_0x51a706(0x32e),_0x51a706(0x15f),'LUK'],_0x4b7655=this[_0x51a706(0x1ef)]()['note'],_0x5c2d50=_0x4b7655[_0x51a706(0x198)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x5c2d50)for(const _0x164930 of _0x5c2d50){_0x164930['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3e0faf=_0x43328d['indexOf'](String(RegExp['$1'])[_0x51a706(0x2cf)]()),_0x15cc5c=Number(RegExp['$2']);_0x3e0faf>=0x0&&(_0x2504ae[_0x51a706(0x2dc)](_0x3e0faf,_0x15cc5c),this['makeSuccess'](_0x2504ae));}const _0x3990df=_0x4b7655[_0x51a706(0x198)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3990df)for(const _0x225466 of _0x5c2d50){_0x225466[_0x51a706(0x198)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2c2f82=_0x43328d['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x3ed106=Number(RegExp['$2']);_0x2c2f82>=0x0&&(_0x2504ae[_0x51a706(0x289)](_0x2c2f82,_0x3ed106),this[_0x51a706(0x1c2)](_0x2504ae));}},Game_Action[_0x1d51ec(0x18f)][_0x1d51ec(0x2f7)]=function(_0x592ea8){const _0x4ba5e9=_0x1d51ec,_0x4d0bfb=['MAXHP','MAXMP','ATK','DEF',_0x4ba5e9(0x367),'MDF',_0x4ba5e9(0x15f),_0x4ba5e9(0x2fa)],_0x3b1a14=this[_0x4ba5e9(0x1ef)]()[_0x4ba5e9(0x301)],_0x3884e2=_0x3b1a14[_0x4ba5e9(0x198)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x3884e2)for(const _0x578050 of _0x3884e2){_0x578050[_0x4ba5e9(0x198)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x56046f=_0x4d0bfb['indexOf'](String(RegExp['$1'])[_0x4ba5e9(0x2cf)]()),_0x3b95ad=Number(RegExp['$2']);_0x56046f>=0x0&&(_0x592ea8['setDebuffTurns'](_0x56046f,_0x3b95ad),this['makeSuccess'](_0x592ea8));}const _0x65750d=_0x3b1a14[_0x4ba5e9(0x198)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x65750d)for(const _0x23f156 of _0x3884e2){_0x23f156[_0x4ba5e9(0x198)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1dafb5=_0x4d0bfb[_0x4ba5e9(0x1c0)](String(RegExp['$1'])['toUpperCase']()),_0x4aef5b=Number(RegExp['$2']);_0x1dafb5>=0x0&&(_0x592ea8['addDebuffTurns'](_0x1dafb5,_0x4aef5b),this[_0x4ba5e9(0x1c2)](_0x592ea8));}},VisuMZ['SkillsStatesCore']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x1d51ec(0x18f)]['initMembers'],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x191)]=function(){const _0x55ddb5=_0x1d51ec;this[_0x55ddb5(0x24c)]={},this[_0x55ddb5(0x25e)](),VisuMZ[_0x55ddb5(0x312)][_0x55ddb5(0x2ed)][_0x55ddb5(0x23c)](this);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x25e)]=function(){const _0x111605=_0x1d51ec;this[_0x111605(0x384)]='',this['_stateData']={},this['_stateDisplay']={},this['_stateOrigin']={};},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2c2)]=function(_0x4119da){const _0x5a2345=_0x1d51ec;return this['_cache']=this[_0x5a2345(0x24c)]||{},this['_cache'][_0x4119da]!==undefined;},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x2ba)]=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x268)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x268)]=function(){const _0x3baf50=_0x1d51ec;this[_0x3baf50(0x24c)]={},VisuMZ['SkillsStatesCore'][_0x3baf50(0x2ba)][_0x3baf50(0x23c)](this);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x1a9)]=Game_BattlerBase['prototype'][_0x1d51ec(0x34c)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x34c)]=function(_0x2d2573){const _0x2506e5=_0x1d51ec;let _0x30ca53=this['isStateAffected'](_0x2d2573);VisuMZ[_0x2506e5(0x312)][_0x2506e5(0x1a9)][_0x2506e5(0x23c)](this,_0x2d2573);if(_0x30ca53&&!this['isStateAffected'](_0x2d2573))this[_0x2506e5(0x283)](_0x2d2573);},Game_BattlerBase[_0x1d51ec(0x18f)]['onRemoveState']=function(_0x3f6014){const _0xdaa505=_0x1d51ec;this[_0xdaa505(0x36a)](_0x3f6014),this[_0xdaa505(0x241)](_0x3f6014),this[_0xdaa505(0x260)](_0x3f6014);},VisuMZ[_0x1d51ec(0x312)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x360)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x360)]=function(_0x41cf4d){const _0x26fe5b=_0x1d51ec,_0x3bb469=$dataStates[_0x41cf4d],_0xf91e3=this[_0x26fe5b(0x1d1)](_0x41cf4d),_0x4248e0=this[_0x26fe5b(0x223)](_0x3bb469)[_0x26fe5b(0x2bb)]()[_0x26fe5b(0x26a)]();switch(_0x4248e0){case _0x26fe5b(0x162):if(_0xf91e3<=0x0)VisuMZ[_0x26fe5b(0x312)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x41cf4d);break;case'reset':VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x26fe5b(0x23c)](this,_0x41cf4d);break;case _0x26fe5b(0x35e):VisuMZ[_0x26fe5b(0x312)][_0x26fe5b(0x267)][_0x26fe5b(0x23c)](this,_0x41cf4d),this['_stateTurns'][_0x41cf4d]=Math[_0x26fe5b(0x291)](this[_0x26fe5b(0x2a6)][_0x41cf4d],_0xf91e3);break;case _0x26fe5b(0x2d2):VisuMZ[_0x26fe5b(0x312)][_0x26fe5b(0x267)][_0x26fe5b(0x23c)](this,_0x41cf4d),this[_0x26fe5b(0x2a6)][_0x41cf4d]+=_0xf91e3;break;default:VisuMZ['SkillsStatesCore'][_0x26fe5b(0x267)][_0x26fe5b(0x23c)](this,_0x41cf4d);break;}},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x223)]=function(_0x487a93){const _0x57b7bb=_0x1d51ec,_0xe3d657=_0x487a93[_0x57b7bb(0x301)];return _0xe3d657['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x57b7bb(0x312)][_0x57b7bb(0x34f)][_0x57b7bb(0x175)][_0x57b7bb(0x328)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x31b)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x31b)]=function(_0x25450e,_0xf0c640){const _0x26af25=_0x1d51ec,_0x7cc410=VisuMZ[_0x26af25(0x312)][_0x26af25(0x34f)]['Buffs'][_0x26af25(0x328)],_0x3e0bc2=this['buffTurns'](_0x25450e);switch(_0x7cc410){case'ignore':if(_0x3e0bc2<=0x0)this[_0x26af25(0x182)][_0x25450e]=_0xf0c640;break;case _0x26af25(0x154):this[_0x26af25(0x182)][_0x25450e]=_0xf0c640;break;case _0x26af25(0x35e):this[_0x26af25(0x182)][_0x25450e]=Math['max'](_0x3e0bc2,_0xf0c640);break;case'add':this['_buffTurns'][_0x25450e]+=_0xf0c640;break;default:VisuMZ[_0x26af25(0x312)][_0x26af25(0x1e7)][_0x26af25(0x23c)](this,_0x25450e,_0xf0c640);break;}const _0x3768aa=VisuMZ[_0x26af25(0x312)]['Settings'][_0x26af25(0x286)][_0x26af25(0x159)];this[_0x26af25(0x182)][_0x25450e]=this[_0x26af25(0x182)][_0x25450e][_0x26af25(0x302)](0x0,_0x3768aa);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x23d)]=function(){const _0xb2d615=_0x1d51ec;if(this[_0xb2d615(0x24c)][_0xb2d615(0x22f)]!==undefined)return this['_cache'][_0xb2d615(0x22f)];this[_0xb2d615(0x24c)]['groupDefeat']=![];const _0x5edf60=this[_0xb2d615(0x14b)]();for(const _0x1de14e of _0x5edf60){if(!_0x1de14e)continue;if(_0x1de14e['note'][_0xb2d615(0x198)](/<GROUP DEFEAT>/i)){this['_cache'][_0xb2d615(0x22f)]=!![];break;}}return this[_0xb2d615(0x24c)]['groupDefeat'];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates']=Game_BattlerBase['prototype'][_0x1d51ec(0x2b1)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2b1)]=function(){const _0x11de5c=_0x1d51ec;this[_0x11de5c(0x224)]()!==''?this[_0x11de5c(0x29f)]():(VisuMZ['SkillsStatesCore'][_0x11de5c(0x23a)][_0x11de5c(0x23c)](this),this[_0x11de5c(0x25e)]());},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x29f)]=function(){const _0x3beac8=_0x1d51ec,_0x4720cc=this[_0x3beac8(0x14b)]();for(const _0x4ee453 of _0x4720cc){if(_0x4ee453&&this[_0x3beac8(0x27f)](_0x4ee453))this[_0x3beac8(0x34c)](_0x4ee453['id']);}this['_cache']={};},Game_BattlerBase['prototype']['canClearState']=function(_0x17dbff){const _0x5b7668=_0x1d51ec,_0x25ca2d=this[_0x5b7668(0x224)]();if(_0x25ca2d!==''){const _0x3f58eb=_0x17dbff[_0x5b7668(0x301)];if(_0x25ca2d===_0x5b7668(0x221)&&_0x3f58eb[_0x5b7668(0x198)](/<NO DEATH CLEAR>/i))return![];if(_0x25ca2d===_0x5b7668(0x188)&&_0x3f58eb[_0x5b7668(0x198)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x5b7668(0x33d)](_0x17dbff['id']);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x224)]=function(){const _0x4e564f=_0x1d51ec;return this[_0x4e564f(0x384)];},Game_BattlerBase['prototype'][_0x1d51ec(0x2a8)]=function(_0x5c9dee){this['_stateRetainType']=_0x5c9dee;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2d9)]=function(){const _0x28e0f5=_0x1d51ec;this[_0x28e0f5(0x384)]='';},VisuMZ[_0x1d51ec(0x312)]['Game_BattlerBase_die']=Game_BattlerBase[_0x1d51ec(0x18f)]['die'],Game_BattlerBase[_0x1d51ec(0x18f)]['die']=function(){const _0x426c54=_0x1d51ec;this[_0x426c54(0x2a8)](_0x426c54(0x221)),VisuMZ[_0x426c54(0x312)]['Game_BattlerBase_die'][_0x426c54(0x23c)](this),this[_0x426c54(0x2d9)]();},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x171)]=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x251)],Game_BattlerBase[_0x1d51ec(0x18f)]['recoverAll']=function(){const _0x15dba9=_0x1d51ec;this['setStateRetainType'](_0x15dba9(0x188)),VisuMZ[_0x15dba9(0x312)][_0x15dba9(0x171)][_0x15dba9(0x23c)](this),this[_0x15dba9(0x2d9)]();},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2b7)]=function(_0x1208ae){const _0x5a46e6=_0x1d51ec;for(settings of VisuMZ[_0x5a46e6(0x312)]['Settings'][_0x5a46e6(0x212)]){const _0x3071ec=settings['CalcJS'][_0x5a46e6(0x23c)](this,_0x1208ae);if(!settings[_0x5a46e6(0x380)][_0x5a46e6(0x23c)](this,_0x1208ae,_0x3071ec))return![];}return!![];},Game_BattlerBase['prototype'][_0x1d51ec(0x16a)]=function(_0x205044){const _0x1fd809=_0x1d51ec;for(settings of VisuMZ['SkillsStatesCore'][_0x1fd809(0x34f)]['Costs']){const _0x28404e=settings[_0x1fd809(0x29c)]['call'](this,_0x205044);settings['PayJS'][_0x1fd809(0x23c)](this,_0x205044,_0x28404e);}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x174)]=Game_BattlerBase[_0x1d51ec(0x18f)]['meetsSkillConditions'],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x332)]=function(_0x1529de){const _0x5095e2=_0x1d51ec;if(!_0x1529de)return![];if(!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions'][_0x5095e2(0x23c)](this,_0x1529de))return![];if(!this[_0x5095e2(0x1d5)](_0x1529de))return![];if(!this['meetsSkillConditionsEnableJS'](_0x1529de))return![];if(!this[_0x5095e2(0x21e)](_0x1529de))return![];return!![];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1d5)]=function(_0x5a5792){const _0x421d50=_0x1d51ec;if(!this[_0x421d50(0x2ad)](_0x5a5792))return![];return!![];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2ad)]=function(_0x2ee138){const _0x55f945=_0x1d51ec,_0x1d41ab=_0x2ee138[_0x55f945(0x301)];if(_0x1d41ab['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x581735=JSON['parse']('['+RegExp['$1'][_0x55f945(0x198)](/\d+/g)+']');for(const _0x327b4b of _0x581735){if(!$gameSwitches[_0x55f945(0x321)](_0x327b4b))return![];}return!![];}if(_0x1d41ab[_0x55f945(0x198)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x273f75=JSON[_0x55f945(0x247)]('['+RegExp['$1'][_0x55f945(0x198)](/\d+/g)+']');for(const _0x856fe1 of _0x273f75){if(!$gameSwitches[_0x55f945(0x321)](_0x856fe1))return![];}return!![];}if(_0x1d41ab[_0x55f945(0x198)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33d963=JSON[_0x55f945(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x25129f of _0x33d963){if($gameSwitches[_0x55f945(0x321)](_0x25129f))return!![];}return![];}if(_0x1d41ab[_0x55f945(0x198)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1fec3c=JSON[_0x55f945(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2289a5 of _0x1fec3c){if(!$gameSwitches[_0x55f945(0x321)](_0x2289a5))return!![];}return![];}if(_0x1d41ab[_0x55f945(0x198)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x130182=JSON['parse']('['+RegExp['$1'][_0x55f945(0x198)](/\d+/g)+']');for(const _0x2cc89b of _0x130182){if(!$gameSwitches[_0x55f945(0x321)](_0x2cc89b))return!![];}return![];}if(_0x1d41ab[_0x55f945(0x198)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x432d1f=JSON[_0x55f945(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x29ef17 of _0x432d1f){if($gameSwitches[_0x55f945(0x321)](_0x29ef17))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x1d51ec(0x2ee)]=function(_0x570444){const _0x5c3ef5=_0x1d51ec,_0xe472b0=_0x570444['note'],_0x2d7a0b=VisuMZ['SkillsStatesCore']['skillEnableJS'];return _0x2d7a0b[_0x570444['id']]?_0x2d7a0b[_0x570444['id']][_0x5c3ef5(0x23c)](this,_0x570444):!![];},Game_BattlerBase['prototype']['meetsSkillConditionsGlobalJS']=function(_0x525d77){const _0x5e626d=_0x1d51ec;return VisuMZ[_0x5e626d(0x312)][_0x5e626d(0x34f)]['Skills'][_0x5e626d(0x208)][_0x5e626d(0x23c)](this,_0x525d77);},VisuMZ[_0x1d51ec(0x312)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x196)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x196)]=function(_0x29dce4){const _0x3ceeef=_0x1d51ec;for(settings of VisuMZ['SkillsStatesCore'][_0x3ceeef(0x34f)][_0x3ceeef(0x212)]){if(settings[_0x3ceeef(0x167)]['toUpperCase']()==='MP')return settings[_0x3ceeef(0x29c)]['call'](this,_0x29dce4);}return VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillMpCost'][_0x3ceeef(0x23c)](this,_0x29dce4);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x20f)]=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x189)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x189)]=function(_0x198e39){const _0x10149c=_0x1d51ec;for(settings of VisuMZ[_0x10149c(0x312)][_0x10149c(0x34f)]['Costs']){if(settings[_0x10149c(0x167)][_0x10149c(0x2cf)]()==='TP')return settings['CalcJS']['call'](this,_0x198e39);}return VisuMZ[_0x10149c(0x312)][_0x10149c(0x20f)][_0x10149c(0x23c)](this,_0x198e39);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x18c)]=function(_0x1000f4){const _0x50a8b9=_0x1d51ec;if(typeof _0x1000f4===_0x50a8b9(0x2de))_0x1000f4=$dataStates[_0x1000f4];return this[_0x50a8b9(0x14b)]()[_0x50a8b9(0x1ae)](_0x1000f4);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_states']=Game_BattlerBase['prototype'][_0x1d51ec(0x14b)],Game_BattlerBase['prototype']['states']=function(){const _0x4e9362=_0x1d51ec;let _0x344e6c=VisuMZ[_0x4e9362(0x312)][_0x4e9362(0x2ca)][_0x4e9362(0x23c)](this);if(this[_0x4e9362(0x236)])return _0x344e6c;return this[_0x4e9362(0x236)]=!![],this[_0x4e9362(0x18b)](_0x344e6c),this[_0x4e9362(0x236)]=undefined,_0x344e6c;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x18b)]=function(_0x2160ca){const _0x28a463=_0x1d51ec,_0x30071e=this[_0x28a463(0x30e)]();for(state of _0x30071e){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x2160ca[_0x28a463(0x1ae)](state))continue;_0x2160ca['push'](state);}_0x30071e[_0x28a463(0x2cc)]>0x0&&_0x2160ca[_0x28a463(0x18a)]((_0x59a1da,_0xf50fb6)=>{const _0x15ad22=_0x28a463,_0x388038=_0x59a1da[_0x15ad22(0x33e)],_0x30fc78=_0xf50fb6[_0x15ad22(0x33e)];if(_0x388038!==_0x30fc78)return _0x30fc78-_0x388038;return _0x59a1da-_0xf50fb6;});},Game_BattlerBase['prototype']['isPassiveStateStackable']=function(_0x341f0b){const _0x3da319=_0x1d51ec;return _0x341f0b[_0x3da319(0x301)][_0x3da319(0x198)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x278)]=function(){const _0x302f9a=_0x1d51ec,_0x2b9fd2=[];for(const _0x3e1e33 of this[_0x302f9a(0x24c)][_0x302f9a(0x30e)]){const _0x8a0da7=$dataStates[_0x3e1e33];if(!_0x8a0da7)continue;if(!this[_0x302f9a(0x1fa)](_0x8a0da7))continue;_0x2b9fd2['push'](_0x8a0da7);}return _0x2b9fd2;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1fa)]=function(_0x27d73b){const _0x4adb1a=_0x1d51ec;if(!this[_0x4adb1a(0x36c)](_0x27d73b))return![];if(!this[_0x4adb1a(0x1ec)](_0x27d73b))return![];if(!this[_0x4adb1a(0x336)](_0x27d73b))return![];if(!this[_0x4adb1a(0x20b)](_0x27d73b))return![];return!![];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x36c)]=function(_0x6593cd){return!![];},Game_Actor[_0x1d51ec(0x18f)][_0x1d51ec(0x36c)]=function(_0x2249ea){const _0x2b4115=_0x1d51ec,_0x433f8d=_0x2249ea[_0x2b4115(0x301)];if(_0x433f8d[_0x2b4115(0x198)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x2b94bf=String(RegExp['$1'])[_0x2b4115(0x339)](',')['map'](_0x51ea6d=>_0x51ea6d[_0x2b4115(0x26a)]()),_0x5951b5=VisuMZ[_0x2b4115(0x312)][_0x2b4115(0x1ab)](_0x2b94bf);return _0x5951b5['includes'](this[_0x2b4115(0x24d)]());}if(_0x433f8d[_0x2b4115(0x198)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x58c9d1=String(RegExp['$1'])[_0x2b4115(0x339)](',')[_0x2b4115(0x2e7)](_0x4debdf=>_0x4debdf[_0x2b4115(0x26a)]()),_0x3c057b=VisuMZ['SkillsStatesCore']['ParseClassIDs'](_0x58c9d1);let _0x438d60=[this[_0x2b4115(0x24d)]()];return Imported[_0x2b4115(0x35a)]&&this['multiclasses']&&(_0x438d60=this[_0x2b4115(0x320)]()),_0x3c057b[_0x2b4115(0x36f)](_0x4bad10=>_0x438d60[_0x2b4115(0x1ae)](_0x4bad10))['length']>0x0;}return Game_BattlerBase['prototype'][_0x2b4115(0x36c)]['call'](this,_0x2249ea);},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x1ab)]=function(_0x4d33d8){const _0x508427=_0x1d51ec,_0x5656c7=[];for(let _0x59f782 of _0x4d33d8){_0x59f782=(String(_0x59f782)||'')['trim']();const _0x426162=/^\d+$/['test'](_0x59f782);_0x426162?_0x5656c7[_0x508427(0x27e)](Number(_0x59f782)):_0x5656c7[_0x508427(0x27e)](DataManager[_0x508427(0x30a)](_0x59f782));}return _0x5656c7[_0x508427(0x2e7)](_0x5c707c=>$dataClasses[Number(_0x5c707c)])[_0x508427(0x344)](null);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1ec)]=function(_0x28698d){const _0x2b534e=_0x1d51ec,_0x4f8c6b=_0x28698d[_0x2b534e(0x301)];if(_0x4f8c6b[_0x2b534e(0x198)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4bc5df=JSON[_0x2b534e(0x247)]('['+RegExp['$1'][_0x2b534e(0x198)](/\d+/g)+']');for(const _0x1aa87c of _0x4bc5df){if(!$gameSwitches[_0x2b534e(0x321)](_0x1aa87c))return![];}return!![];}if(_0x4f8c6b[_0x2b534e(0x198)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x245c30=JSON[_0x2b534e(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x44483d of _0x245c30){if(!$gameSwitches['value'](_0x44483d))return![];}return!![];}if(_0x4f8c6b['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16cb00=JSON[_0x2b534e(0x247)]('['+RegExp['$1'][_0x2b534e(0x198)](/\d+/g)+']');for(const _0x447c1f of _0x16cb00){if($gameSwitches[_0x2b534e(0x321)](_0x447c1f))return!![];}return![];}if(_0x4f8c6b[_0x2b534e(0x198)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3deaa9=JSON['parse']('['+RegExp['$1'][_0x2b534e(0x198)](/\d+/g)+']');for(const _0x1063d6 of _0x3deaa9){if(!$gameSwitches[_0x2b534e(0x321)](_0x1063d6))return!![];}return![];}if(_0x4f8c6b[_0x2b534e(0x198)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x463783=JSON[_0x2b534e(0x247)]('['+RegExp['$1'][_0x2b534e(0x198)](/\d+/g)+']');for(const _0x31aeb6 of _0x463783){if(!$gameSwitches[_0x2b534e(0x321)](_0x31aeb6))return!![];}return![];}if(_0x4f8c6b[_0x2b534e(0x198)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d34bd=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x54a8ad of _0x4d34bd){if($gameSwitches[_0x2b534e(0x321)](_0x54a8ad))return![];}return!![];}return!![];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x336)]=function(_0x4f7e14){const _0x758fd0=_0x1d51ec,_0x212f43=VisuMZ['SkillsStatesCore'][_0x758fd0(0x275)];if(_0x212f43[_0x4f7e14['id']]&&!_0x212f43[_0x4f7e14['id']][_0x758fd0(0x23c)](this,_0x4f7e14))return![];return!![];},Game_BattlerBase['prototype'][_0x1d51ec(0x20b)]=function(_0x641ce6){const _0x146233=_0x1d51ec;return VisuMZ[_0x146233(0x312)][_0x146233(0x34f)][_0x146233(0x2cb)][_0x146233(0x270)][_0x146233(0x23c)](this,_0x641ce6);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x30e)]=function(){const _0xd1c230=_0x1d51ec;if(this[_0xd1c230(0x2c2)](_0xd1c230(0x30e)))return this[_0xd1c230(0x278)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0xd1c230(0x23b)]=!![],this[_0xd1c230(0x24c)][_0xd1c230(0x30e)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0xd1c230(0x1e8)](),this['addPassiveStatesByPluginParameters'](),this[_0xd1c230(0x23b)]=undefined,this[_0xd1c230(0x278)]();},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2a4)]=function(){const _0x1eb733=_0x1d51ec;if(Imported[_0x1eb733(0x1af)])this[_0x1eb733(0x177)]();},Game_BattlerBase['prototype'][_0x1d51ec(0x2b3)]=function(){return[];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1e8)]=function(){const _0x3447f8=_0x1d51ec,_0x23402f=this[_0x3447f8(0x2b3)]();for(const _0xc2f262 of _0x23402f){if(!_0xc2f262)continue;const _0x470106=_0xc2f262['note'][_0x3447f8(0x198)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x470106)for(const _0x3884e9 of _0x470106){_0x3884e9[_0x3447f8(0x198)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x266ffb=RegExp['$1'];if(_0x266ffb[_0x3447f8(0x198)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x1328df=JSON[_0x3447f8(0x247)]('['+RegExp['$1'][_0x3447f8(0x198)](/\d+/g)+']');this['_cache'][_0x3447f8(0x30e)]=this[_0x3447f8(0x24c)]['passiveStates']['concat'](_0x1328df);}else{const _0x4261cc=_0x266ffb[_0x3447f8(0x339)](',');for(const _0x29eeca of _0x4261cc){const _0x285158=DataManager[_0x3447f8(0x222)](_0x29eeca);if(_0x285158)this[_0x3447f8(0x24c)]['passiveStates'][_0x3447f8(0x27e)](_0x285158);}}}}},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x220)]=function(){const _0x385fa1=_0x1d51ec,_0x314122=VisuMZ[_0x385fa1(0x312)]['Settings']['PassiveStates'][_0x385fa1(0x2c3)];this[_0x385fa1(0x24c)][_0x385fa1(0x30e)]=this[_0x385fa1(0x24c)]['passiveStates'][_0x385fa1(0x14d)](_0x314122);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1d1)]=function(_0x2d72de){const _0x3b92a0=_0x1d51ec;if(typeof _0x2d72de!==_0x3b92a0(0x2de))_0x2d72de=_0x2d72de['id'];return this[_0x3b92a0(0x2a6)][_0x2d72de]||0x0;},Game_BattlerBase[_0x1d51ec(0x18f)]['setStateTurns']=function(_0x37757a,_0x1b03e0){const _0x354a3e=_0x1d51ec;if(typeof _0x37757a!==_0x354a3e(0x2de))_0x37757a=_0x37757a['id'];if(this[_0x354a3e(0x33d)](_0x37757a)){const _0x1e7c2b=DataManager[_0x354a3e(0x1d7)](_0x37757a);this[_0x354a3e(0x2a6)][_0x37757a]=_0x1b03e0[_0x354a3e(0x302)](0x0,_0x1e7c2b);if(this[_0x354a3e(0x2a6)][_0x37757a]<=0x0)this['removeState'](_0x37757a);}},Game_BattlerBase[_0x1d51ec(0x18f)]['addStateTurns']=function(_0x248474,_0x5d6996){const _0x1f641c=_0x1d51ec;if(typeof _0x248474!==_0x1f641c(0x2de))_0x248474=_0x248474['id'];this[_0x1f641c(0x33d)](_0x248474)&&(_0x5d6996+=this[_0x1f641c(0x1d1)](_0x248474),this[_0x1f641c(0x1db)](_0x248474,_0x5d6996));},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x37f)]=Game_BattlerBase[_0x1d51ec(0x18f)]['eraseBuff'],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x333)]=function(_0x9aa4fa){const _0x847186=_0x1d51ec,_0x1aac76=this[_0x847186(0x1a1)][_0x9aa4fa];VisuMZ[_0x847186(0x312)][_0x847186(0x37f)][_0x847186(0x23c)](this,_0x9aa4fa);if(_0x1aac76>0x0)this[_0x847186(0x219)](_0x9aa4fa);if(_0x1aac76<0x0)this['onEraseDebuff'](_0x9aa4fa);},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x324)]=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x195)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x195)]=function(_0x3048c0){const _0x22c253=_0x1d51ec;VisuMZ[_0x22c253(0x312)][_0x22c253(0x324)][_0x22c253(0x23c)](this,_0x3048c0);if(!this[_0x22c253(0x304)](_0x3048c0))this[_0x22c253(0x333)](_0x3048c0);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x16e)]=Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x273)],Game_BattlerBase[_0x1d51ec(0x18f)]['decreaseBuff']=function(_0xcd9ae7){const _0x24943b=_0x1d51ec;VisuMZ[_0x24943b(0x312)][_0x24943b(0x16e)][_0x24943b(0x23c)](this,_0xcd9ae7);if(!this[_0x24943b(0x304)](_0xcd9ae7))this['eraseBuff'](_0xcd9ae7);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x219)]=function(_0x3e0cab){},Game_BattlerBase['prototype'][_0x1d51ec(0x2ea)]=function(_0x4bcb06){},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x14e)]=function(_0x1f0edc){const _0x1e0ebd=_0x1d51ec;return this[_0x1e0ebd(0x1a1)][_0x1f0edc]===VisuMZ[_0x1e0ebd(0x312)][_0x1e0ebd(0x34f)][_0x1e0ebd(0x286)][_0x1e0ebd(0x330)];},Game_BattlerBase[_0x1d51ec(0x18f)]['isMaxDebuffAffected']=function(_0x11d8d7){const _0x1d2007=_0x1d51ec;return this[_0x1d2007(0x1a1)][_0x11d8d7]===-VisuMZ['SkillsStatesCore'][_0x1d2007(0x34f)][_0x1d2007(0x286)]['StackDebuffMax'];},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2e1)]=Game_BattlerBase['prototype'][_0x1d51ec(0x2b2)],Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2b2)]=function(_0x5470bb,_0x29d5f2){const _0x54b32b=_0x1d51ec;return _0x5470bb=_0x5470bb[_0x54b32b(0x302)](-0x2,0x2),VisuMZ[_0x54b32b(0x312)][_0x54b32b(0x2e1)][_0x54b32b(0x23c)](this,_0x5470bb,_0x29d5f2);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x21c)]=function(_0x2ea6b0){const _0x194a00=_0x1d51ec,_0x237936=this['_buffs'][_0x2ea6b0];return VisuMZ[_0x194a00(0x312)][_0x194a00(0x34f)]['Buffs'][_0x194a00(0x2d5)][_0x194a00(0x23c)](this,_0x2ea6b0,_0x237936);},Game_BattlerBase['prototype']['buffTurns']=function(_0x13b5ec){const _0x1a41b6=_0x1d51ec;return this[_0x1a41b6(0x182)][_0x13b5ec]||0x0;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1cf)]=function(_0x3a8228){const _0x150d39=_0x1d51ec;return this[_0x150d39(0x237)](_0x3a8228);},Game_BattlerBase['prototype'][_0x1d51ec(0x2dc)]=function(_0x1cd1ba,_0x5c431e){const _0x31d87c=_0x1d51ec;if(this[_0x31d87c(0x31f)](_0x1cd1ba)){const _0x4838f9=VisuMZ[_0x31d87c(0x312)][_0x31d87c(0x34f)][_0x31d87c(0x286)][_0x31d87c(0x159)];this[_0x31d87c(0x182)][_0x1cd1ba]=_0x5c431e[_0x31d87c(0x302)](0x0,_0x4838f9);}},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x289)]=function(_0x7d4f5b,_0x10d2bf){const _0x28c21f=_0x1d51ec;this['isBuffAffected'](_0x7d4f5b)&&(_0x10d2bf+=this[_0x28c21f(0x237)](stateId),this[_0x28c21f(0x1db)](_0x7d4f5b,_0x10d2bf));},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x265)]=function(_0x1bd9c0,_0x1a848a){const _0x2fc793=_0x1d51ec;if(this[_0x2fc793(0x18e)](_0x1bd9c0)){const _0x2ffa28=VisuMZ[_0x2fc793(0x312)]['Settings'][_0x2fc793(0x286)][_0x2fc793(0x159)];this['_buffTurns'][_0x1bd9c0]=_0x1a848a[_0x2fc793(0x302)](0x0,_0x2ffa28);}},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2f3)]=function(_0x531c6a,_0x25b0be){const _0x5f5268=_0x1d51ec;this[_0x5f5268(0x18e)](_0x531c6a)&&(_0x25b0be+=this['buffTurns'](stateId),this[_0x5f5268(0x1db)](_0x531c6a,_0x25b0be));},Game_BattlerBase['prototype'][_0x1d51ec(0x194)]=function(_0x54f74d){const _0x5b8695=_0x1d51ec;if(typeof _0x54f74d!=='number')_0x54f74d=_0x54f74d['id'];return this[_0x5b8695(0x2e4)]=this[_0x5b8695(0x2e4)]||{},this[_0x5b8695(0x2e4)][_0x54f74d]=this['_stateData'][_0x54f74d]||{},this[_0x5b8695(0x2e4)][_0x54f74d];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x227)]=function(_0x389351,_0x197e73){const _0x524a7b=_0x1d51ec;if(typeof _0x389351!==_0x524a7b(0x2de))_0x389351=_0x389351['id'];const _0x497937=this[_0x524a7b(0x194)](_0x389351);return _0x497937[_0x197e73];},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x258)]=function(_0x213ab1,_0x747418,_0x2ed9f1){const _0x1020e9=_0x1d51ec;if(typeof _0x213ab1!==_0x1020e9(0x2de))_0x213ab1=_0x213ab1['id'];const _0x5b1d09=this[_0x1020e9(0x194)](_0x213ab1);_0x5b1d09[_0x747418]=_0x2ed9f1;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x36a)]=function(_0x5dc1f5){const _0x318974=_0x1d51ec;if(typeof _0x5dc1f5!=='number')_0x5dc1f5=_0x5dc1f5['id'];this[_0x318974(0x2e4)]=this[_0x318974(0x2e4)]||{},this[_0x318974(0x2e4)][_0x5dc1f5]={};},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x348)]=function(_0x12f5bf){const _0x6e9619=_0x1d51ec;if(typeof _0x12f5bf!==_0x6e9619(0x2de))_0x12f5bf=_0x12f5bf['id'];return this[_0x6e9619(0x21a)]=this[_0x6e9619(0x21a)]||{},this[_0x6e9619(0x21a)][_0x12f5bf]===undefined&&(this['_stateDisplay'][_0x12f5bf]=''),this[_0x6e9619(0x21a)][_0x12f5bf];},Game_BattlerBase['prototype'][_0x1d51ec(0x266)]=function(_0x481334,_0x1790ac){const _0x1865f2=_0x1d51ec;if(typeof _0x481334!==_0x1865f2(0x2de))_0x481334=_0x481334['id'];this['_stateDisplay']=this[_0x1865f2(0x21a)]||{},this['_stateDisplay'][_0x481334]=_0x1790ac;},Game_BattlerBase['prototype'][_0x1d51ec(0x241)]=function(_0x1b0753){const _0x5582cf=_0x1d51ec;if(typeof _0x1b0753!==_0x5582cf(0x2de))_0x1b0753=_0x1b0753['id'];this[_0x5582cf(0x21a)]=this[_0x5582cf(0x21a)]||{},this['_stateDisplay'][_0x1b0753]='';},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x1b4)]=function(_0x120230){const _0xecffc1=_0x1d51ec;if(typeof _0x120230!==_0xecffc1(0x2de))_0x120230=_0x120230['id'];this['_stateOrigin']=this[_0xecffc1(0x305)]||{},this['_stateOrigin'][_0x120230]=this['_stateOrigin'][_0x120230]||'user';const _0x679fa3=this[_0xecffc1(0x305)][_0x120230];return this['getStateOriginByKey'](_0x679fa3);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x35f)]=function(_0x373bf5,_0x13740b){const _0x4f72c9=_0x1d51ec;this[_0x4f72c9(0x305)]=this[_0x4f72c9(0x305)]||{};const _0x181607=_0x13740b?this[_0x4f72c9(0x35b)](_0x13740b):this['getCurrentStateOriginKey']();this['_stateOrigin'][_0x373bf5]=_0x181607;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x260)]=function(_0x46f27b){const _0x258b83=_0x1d51ec;this[_0x258b83(0x305)]=this[_0x258b83(0x305)]||{},delete this[_0x258b83(0x305)][_0x46f27b];},Game_BattlerBase['prototype']['getCurrentStateOriginKey']=function(){const _0x283298=_0x1d51ec,_0x48ab16=this[_0x283298(0x153)]();return this[_0x283298(0x35b)](_0x48ab16);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x153)]=function(){const _0x2dded7=_0x1d51ec;if($gameParty[_0x2dded7(0x331)]()){if(BattleManager['_subject'])return BattleManager['_subject'];else{if(BattleManager['_currentActor'])return BattleManager[_0x2dded7(0x213)];}}else{const _0x445f3f=SceneManager[_0x2dded7(0x1ca)];if(![Scene_Map,Scene_Item][_0x2dded7(0x1ae)](_0x445f3f[_0x2dded7(0x349)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x35b)]=function(_0x4fdfb6){const _0x1fa690=_0x1d51ec;if(!_0x4fdfb6)return _0x1fa690(0x2c4);if(_0x4fdfb6['isActor']())return'<actor-%1>'['format'](_0x4fdfb6[_0x1fa690(0x375)]());else{const _0x3283c0=_0x1fa690(0x31c)['format'](_0x4fdfb6[_0x1fa690(0x166)]()),_0x14a456=_0x1fa690(0x253)['format'](_0x4fdfb6[_0x1fa690(0x1c9)]()),_0x16e1b3=_0x1fa690(0x383)[_0x1fa690(0x2fe)]($gameTroop['getCurrentTroopUniqueID']());return _0x1fa690(0x37a)[_0x1fa690(0x2fe)](_0x3283c0,_0x14a456,_0x16e1b3);}return _0x1fa690(0x2c4);},Game_BattlerBase['prototype'][_0x1d51ec(0x2b0)]=function(_0x4a152b){const _0x2350c6=_0x1d51ec;if(_0x4a152b===_0x2350c6(0x2c4))return this;else{if(_0x4a152b[_0x2350c6(0x198)](/<actor-(\d+)>/i))return $gameActors[_0x2350c6(0x287)](Number(RegExp['$1']));else{if($gameParty[_0x2350c6(0x331)]()&&_0x4a152b[_0x2350c6(0x198)](/<troop-(\d+)>/i)){const _0x77a548=Number(RegExp['$1']);if(_0x77a548===$gameTroop[_0x2350c6(0x1c8)]()){if(_0x4a152b['match'](/<member-(\d+)>/i))return $gameTroop[_0x2350c6(0x337)]()[Number(RegExp['$1'])];}}if(_0x4a152b[_0x2350c6(0x198)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x34a)]=Game_Battler['prototype'][_0x1d51ec(0x19b)],Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x19b)]=function(_0x21e82b){const _0xab1bc0=_0x1d51ec,_0xa37112=this[_0xab1bc0(0x308)](_0x21e82b);VisuMZ[_0xab1bc0(0x312)]['Game_Battler_addState'][_0xab1bc0(0x23c)](this,_0x21e82b);if(_0xa37112&&this[_0xab1bc0(0x18c)]($dataStates[_0x21e82b])){this[_0xab1bc0(0x1a0)](_0x21e82b);;}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x303)]=Game_Battler['prototype'][_0x1d51ec(0x308)],Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x308)]=function(_0x168460){const _0x38bb23=_0x1d51ec,_0x42282f=$dataStates[_0x168460];if(_0x42282f&&_0x42282f[_0x38bb23(0x301)][_0x38bb23(0x198)](/<NO DEATH CLEAR>/i))return!this[_0x38bb23(0x371)](_0x168460)&&!this['isStateRestrict'](_0x168460)&&!this[_0x38bb23(0x377)][_0x38bb23(0x179)](_0x168460);return VisuMZ[_0x38bb23(0x312)]['Game_Battler_isStateAddable'][_0x38bb23(0x23c)](this,_0x168460);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1a0)]=function(_0x5e80dd){const _0x2b5ff4=_0x1d51ec;this[_0x2b5ff4(0x35f)](_0x5e80dd),this[_0x2b5ff4(0x19f)](_0x5e80dd),this['onAddStateCustomJS'](_0x5e80dd),this[_0x2b5ff4(0x2e9)](_0x5e80dd);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x283)]=function(_0x5605ea){const _0x176ae1=_0x1d51ec;Game_BattlerBase[_0x176ae1(0x18f)]['onRemoveState'][_0x176ae1(0x23c)](this,_0x5605ea),this[_0x176ae1(0x1cc)](_0x5605ea),this[_0x176ae1(0x374)](_0x5605ea);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x295)]=function(_0x32c764){const _0x3b84d6=_0x1d51ec;for(const _0x4f020b of this['states']()){this[_0x3b84d6(0x2a0)](_0x4f020b['id'])&&_0x4f020b['autoRemovalTiming']===_0x32c764&&(this[_0x3b84d6(0x379)](_0x4f020b['id']),this['onExpireState'](_0x4f020b['id']),this['onExpireStateGlobalJS'](_0x4f020b['id']));}},Game_Battler[_0x1d51ec(0x18f)]['onExpireState']=function(_0x2d5835){const _0x4d714c=_0x1d51ec;this[_0x4d714c(0x215)](_0x2d5835);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x285)]=function(_0x23b1ae){const _0x24de0d=_0x1d51ec,_0x15b83b=VisuMZ['SkillsStatesCore'][_0x24de0d(0x248)];if(_0x15b83b[_0x23b1ae])_0x15b83b[_0x23b1ae][_0x24de0d(0x23c)](this,_0x23b1ae);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1cc)]=function(_0x3d5ba1){const _0x12b5be=_0x1d51ec,_0x5bddbf=VisuMZ['SkillsStatesCore']['stateEraseJS'];if(_0x5bddbf[_0x3d5ba1])_0x5bddbf[_0x3d5ba1][_0x12b5be(0x23c)](this,_0x3d5ba1);},Game_Battler['prototype'][_0x1d51ec(0x215)]=function(_0x5bf53b){const _0x2f0671=_0x1d51ec,_0x1d46c1=VisuMZ[_0x2f0671(0x312)][_0x2f0671(0x1ba)];if(_0x1d46c1[_0x5bf53b])_0x1d46c1[_0x5bf53b][_0x2f0671(0x23c)](this,_0x5bf53b);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2e9)]=function(_0x1d358f){const _0x127973=_0x1d51ec;try{VisuMZ[_0x127973(0x312)][_0x127973(0x34f)][_0x127973(0x175)][_0x127973(0x2fc)][_0x127973(0x23c)](this,_0x1d358f);}catch(_0x18f4f6){if($gameTemp[_0x127973(0x259)]())console[_0x127973(0x163)](_0x18f4f6);}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x374)]=function(_0x2d3b9b){const _0x5dd5e3=_0x1d51ec;try{VisuMZ[_0x5dd5e3(0x312)][_0x5dd5e3(0x34f)][_0x5dd5e3(0x175)][_0x5dd5e3(0x1b2)][_0x5dd5e3(0x23c)](this,_0x2d3b9b);}catch(_0x2afab7){if($gameTemp[_0x5dd5e3(0x259)]())console['log'](_0x2afab7);}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1f2)]=function(_0x5c9cb4){const _0xe743e6=_0x1d51ec;try{VisuMZ[_0xe743e6(0x312)][_0xe743e6(0x34f)]['States'][_0xe743e6(0x17b)][_0xe743e6(0x23c)](this,_0x5c9cb4);}catch(_0x45e241){if($gameTemp[_0xe743e6(0x259)]())console[_0xe743e6(0x163)](_0x45e241);}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1df)]=function(_0x58e7e6){const _0x2796e7=_0x1d51ec;return _0x58e7e6=_0x58e7e6[_0x2796e7(0x2cf)]()[_0x2796e7(0x26a)](),this['states']()['filter'](_0x32a619=>_0x32a619[_0x2796e7(0x17a)][_0x2796e7(0x1ae)](_0x58e7e6));},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x276)]=function(_0x3f9c50,_0x2dc5a1){const _0x5f07a2=_0x1d51ec;_0x3f9c50=_0x3f9c50[_0x5f07a2(0x2cf)]()[_0x5f07a2(0x26a)](),_0x2dc5a1=_0x2dc5a1||0x0;const _0x1126a0=this[_0x5f07a2(0x1df)](_0x3f9c50),_0x150385=[];for(const _0x3327bf of _0x1126a0){if(!_0x3327bf)continue;if(_0x2dc5a1<=0x0)return;_0x150385[_0x5f07a2(0x27e)](_0x3327bf['id']),this[_0x5f07a2(0x377)]['success']=!![],_0x2dc5a1--;}while(_0x150385[_0x5f07a2(0x2cc)]>0x0){this['removeState'](_0x150385[_0x5f07a2(0x25c)]());}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2cd)]=function(_0x4fc0a3){const _0x446fce=_0x1d51ec;_0x4fc0a3=_0x4fc0a3['toUpperCase']()[_0x446fce(0x26a)]();const _0x43401c=this[_0x446fce(0x1df)](_0x4fc0a3),_0x17903a=[];for(const _0x36b75d of _0x43401c){if(!_0x36b75d)continue;_0x17903a[_0x446fce(0x27e)](_0x36b75d['id']),this[_0x446fce(0x377)][_0x446fce(0x24b)]=!![];}while(_0x17903a[_0x446fce(0x2cc)]>0x0){this[_0x446fce(0x379)](_0x17903a['shift']());}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2a9)]=function(_0x108c4c){const _0x2b521b=_0x1d51ec;return this[_0x2b521b(0x1c7)](_0x108c4c)>0x0;},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x214)]=function(_0x4213aa){return this['totalStateCategory'](_0x4213aa)>0x0;},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1c7)]=function(_0x3db5e){const _0x51d36c=_0x1d51ec,_0x417469=this[_0x51d36c(0x1df)](_0x3db5e)['filter'](_0xd98ced=>this[_0x51d36c(0x33d)](_0xd98ced['id']));return _0x417469['length'];},Game_Battler[_0x1d51ec(0x18f)]['totalStateCategory']=function(_0x4d583f){const _0x5321ee=_0x1d51ec,_0x19991a=this['statesByCategory'](_0x4d583f);return _0x19991a[_0x5321ee(0x2cc)];},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x1a4)]=Game_Battler[_0x1d51ec(0x18f)]['addBuff'],Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x1a6)]=function(_0x5c4973,_0x4ce9f4){const _0xc8b6aa=_0x1d51ec;VisuMZ['SkillsStatesCore'][_0xc8b6aa(0x1a4)][_0xc8b6aa(0x23c)](this,_0x5c4973,_0x4ce9f4),this[_0xc8b6aa(0x31f)](_0x5c4973)&&this[_0xc8b6aa(0x32c)](_0x5c4973,_0x4ce9f4);},Game_Battler['prototype']['isBuffPrevented']=function(_0x1a5fd8){},VisuMZ[_0x1d51ec(0x312)]['Game_Battler_addDebuff']=Game_Battler[_0x1d51ec(0x18f)]['addDebuff'],Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x363)]=function(_0x25344b,_0x1e8312){const _0x3d59c2=_0x1d51ec;VisuMZ[_0x3d59c2(0x312)][_0x3d59c2(0x19c)][_0x3d59c2(0x23c)](this,_0x25344b,_0x1e8312),this[_0x3d59c2(0x18e)](_0x25344b)&&this[_0x3d59c2(0x28e)](_0x25344b,_0x1e8312);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x23e)]=function(){const _0x3c92fe=_0x1d51ec;for(let _0xafd0c8=0x0;_0xafd0c8<this[_0x3c92fe(0x1c5)]();_0xafd0c8++){if(this[_0x3c92fe(0x372)](_0xafd0c8)){const _0x12579b=this[_0x3c92fe(0x1a1)][_0xafd0c8];this[_0x3c92fe(0x311)](_0xafd0c8);if(_0x12579b>0x0)this[_0x3c92fe(0x1cb)](_0xafd0c8);if(_0x12579b<0x0)this[_0x3c92fe(0x2ac)](_0xafd0c8);}}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x32c)]=function(_0x5b6e68,_0x45c272){const _0x4ef2db=_0x1d51ec;this[_0x4ef2db(0x1dd)](_0x5b6e68,_0x45c272);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x28e)]=function(_0x1f2be9,_0x191ed4){const _0x52e99a=_0x1d51ec;this[_0x52e99a(0x2bd)](_0x1f2be9,_0x191ed4);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x219)]=function(_0x2e251e){const _0x2a8d66=_0x1d51ec;Game_BattlerBase[_0x2a8d66(0x18f)]['onEraseBuff'][_0x2a8d66(0x23c)](this,_0x2e251e),this[_0x2a8d66(0x28a)](_0x2e251e);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2ea)]=function(_0x247ffc){const _0x487e94=_0x1d51ec;Game_BattlerBase[_0x487e94(0x18f)][_0x487e94(0x2ea)][_0x487e94(0x23c)](this,_0x247ffc),this['onEraseDebuffGlobalJS'](_0x247ffc);},Game_Battler[_0x1d51ec(0x18f)]['onExpireBuff']=function(_0x48fbc2){const _0x2475d0=_0x1d51ec;this[_0x2475d0(0x2b9)](_0x48fbc2);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2ac)]=function(_0xe4bf35){const _0x4fa790=_0x1d51ec;this[_0x4fa790(0x2b4)](_0xe4bf35);},Game_Battler[_0x1d51ec(0x18f)]['onAddBuffGlobalJS']=function(_0x34ff4f,_0x79baaf){const _0x4e02a5=_0x1d51ec;VisuMZ['SkillsStatesCore'][_0x4e02a5(0x34f)][_0x4e02a5(0x286)][_0x4e02a5(0x165)][_0x4e02a5(0x23c)](this,_0x34ff4f,_0x79baaf);},Game_Battler['prototype'][_0x1d51ec(0x2bd)]=function(_0x52a14b,_0x4dbcf6){const _0x2eda06=_0x1d51ec;VisuMZ[_0x2eda06(0x312)][_0x2eda06(0x34f)][_0x2eda06(0x286)][_0x2eda06(0x26d)]['call'](this,_0x52a14b,_0x4dbcf6);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x28a)]=function(_0x244e94){const _0x4ee949=_0x1d51ec;VisuMZ[_0x4ee949(0x312)]['Settings']['Buffs'][_0x4ee949(0x263)][_0x4ee949(0x23c)](this,_0x244e94);},Game_BattlerBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2bc)]=function(_0x11be22){const _0x44dc7e=_0x1d51ec;VisuMZ[_0x44dc7e(0x312)][_0x44dc7e(0x34f)]['Buffs'][_0x44dc7e(0x235)][_0x44dc7e(0x23c)](this,_0x11be22);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2b9)]=function(_0x95840a){const _0x435a94=_0x1d51ec;VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x435a94(0x161)][_0x435a94(0x23c)](this,_0x95840a);},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x2b4)]=function(_0x272330){const _0x3ff108=_0x1d51ec;VisuMZ[_0x3ff108(0x312)][_0x3ff108(0x34f)][_0x3ff108(0x286)]['onExpireDebuffJS'][_0x3ff108(0x23c)](this,_0x272330);},Game_Battler['prototype'][_0x1d51ec(0x19f)]=function(_0x527aa4){const _0x24a5b3=_0x1d51ec,_0x48dfe0=VisuMZ[_0x24a5b3(0x312)],_0x227352=[_0x24a5b3(0x2b5),_0x24a5b3(0x22a),_0x24a5b3(0x217),_0x24a5b3(0x1a2),'stateTpSlipDamageJS','stateTpSlipHealJS'];for(const _0x365766 of _0x227352){_0x48dfe0[_0x365766][_0x527aa4]&&_0x48dfe0[_0x365766][_0x527aa4][_0x24a5b3(0x23c)](this,_0x527aa4);}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x22e)]=Game_Battler['prototype']['regenerateAll'],Game_Battler['prototype']['regenerateAll']=function(){const _0x3b2d60=_0x1d51ec;this[_0x3b2d60(0x207)](),VisuMZ['SkillsStatesCore'][_0x3b2d60(0x22e)][_0x3b2d60(0x23c)](this),this[_0x3b2d60(0x16c)](),this[_0x3b2d60(0x2d3)]();},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x16c)]=function(){const _0x19b6f3=_0x1d51ec;for(const _0x52c8b8 of this[_0x19b6f3(0x30e)]()){if(!_0x52c8b8)continue;this[_0x19b6f3(0x19f)](_0x52c8b8['id']);}},Game_Battler[_0x1d51ec(0x18f)][_0x1d51ec(0x207)]=function(){const _0x39812d=_0x1d51ec;for(const _0x23255c of this[_0x39812d(0x14b)]()){if(!_0x23255c)continue;_0x23255c['note'][_0x39812d(0x198)](/<JS SLIP REFRESH>/i)&&this[_0x39812d(0x19f)](_0x23255c['id']);}},Game_Battler[_0x1d51ec(0x18f)]['regenerateAllSkillsStatesCore']=function(){const _0x36ecdf=_0x1d51ec;if(!this[_0x36ecdf(0x157)]())return;const _0x787787=this['states']();for(const _0x149133 of _0x787787){if(!_0x149133)continue;this['onRegenerateCustomStateDamageOverTime'](_0x149133);}},Game_Battler['prototype'][_0x1d51ec(0x1b9)]=function(_0x20fef3){const _0x5578d9=_0x1d51ec,_0x4619b0=this[_0x5578d9(0x227)](_0x20fef3['id'],_0x5578d9(0x27b))||0x0,_0x3e4323=-this[_0x5578d9(0x33a)](),_0x5acee8=Math[_0x5578d9(0x291)](_0x4619b0,_0x3e4323);if(_0x5acee8!==0x0)this[_0x5578d9(0x343)](_0x5acee8);const _0x41db56=this[_0x5578d9(0x227)](_0x20fef3['id'],_0x5578d9(0x246))||0x0;if(_0x41db56!==0x0)this[_0x5578d9(0x37e)](_0x41db56);const _0x1634b9=this[_0x5578d9(0x227)](_0x20fef3['id'],_0x5578d9(0x2f4))||0x0;if(_0x1634b9!==0x0)this[_0x5578d9(0x317)](_0x1634b9);},VisuMZ[_0x1d51ec(0x312)]['Game_Actor_skillTypes']=Game_Actor['prototype']['skillTypes'],Game_Actor[_0x1d51ec(0x18f)]['skillTypes']=function(){const _0x4bb6d3=_0x1d51ec,_0x24750e=VisuMZ['SkillsStatesCore']['Game_Actor_skillTypes'][_0x4bb6d3(0x23c)](this),_0x31676f=VisuMZ[_0x4bb6d3(0x312)][_0x4bb6d3(0x34f)][_0x4bb6d3(0x14a)];let _0x1784f1=_0x31676f[_0x4bb6d3(0x254)];return $gameParty[_0x4bb6d3(0x331)]()&&(_0x1784f1=_0x1784f1['concat'](_0x31676f['BattleHiddenSkillTypes'])),_0x24750e['filter'](_0xb784b1=>!_0x1784f1['includes'](_0xb784b1));},Game_Actor[_0x1d51ec(0x18f)][_0x1d51ec(0x1dc)]=function(){const _0x41f94b=_0x1d51ec;return this[_0x41f94b(0x2c5)]()[_0x41f94b(0x36f)](_0x1ba2a1=>this[_0x41f94b(0x274)](_0x1ba2a1));},Game_Actor[_0x1d51ec(0x18f)]['isSkillUsableForAutoBattle']=function(_0x126d00){const _0x3a778d=_0x1d51ec;if(!this[_0x3a778d(0x31e)](_0x126d00))return![];const _0x163e0c=this[_0x3a778d(0x298)](),_0x644dc7=DataManager[_0x3a778d(0x338)](_0x126d00),_0x423c3e=_0x163e0c[_0x3a778d(0x36f)](_0xcc6d29=>_0x644dc7['includes'](_0xcc6d29));return _0x423c3e[_0x3a778d(0x2cc)]>0x0;},Game_Actor[_0x1d51ec(0x18f)][_0x1d51ec(0x2b3)]=function(){const _0x21fd39=_0x1d51ec;let _0x4c1792=[this[_0x21fd39(0x287)](),this[_0x21fd39(0x24d)]()];_0x4c1792=_0x4c1792[_0x21fd39(0x14d)](this['equips']()[_0x21fd39(0x36f)](_0x2af398=>_0x2af398));for(const _0x4a496a of this['_skills']){const _0x3cd79d=$dataSkills[_0x4a496a];if(_0x3cd79d)_0x4c1792[_0x21fd39(0x27e)](_0x3cd79d);}return _0x4c1792;},Game_Actor[_0x1d51ec(0x18f)]['addPassiveStatesByPluginParameters']=function(){const _0x1d0015=_0x1d51ec;Game_Battler[_0x1d0015(0x18f)][_0x1d0015(0x220)][_0x1d0015(0x23c)](this);const _0x179f59=VisuMZ['SkillsStatesCore'][_0x1d0015(0x34f)]['PassiveStates'][_0x1d0015(0x1bd)];this[_0x1d0015(0x24c)][_0x1d0015(0x30e)]=this['_cache'][_0x1d0015(0x30e)]['concat'](_0x179f59);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x354)]=Game_Actor[_0x1d51ec(0x18f)]['learnSkill'],Game_Actor['prototype']['learnSkill']=function(_0xa36f4b){const _0x5bc5e6=_0x1d51ec;VisuMZ[_0x5bc5e6(0x312)]['Game_Actor_learnSkill'][_0x5bc5e6(0x23c)](this,_0xa36f4b),this[_0x5bc5e6(0x24c)]={};},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x19d)]=Game_Actor['prototype'][_0x1d51ec(0x216)],Game_Actor[_0x1d51ec(0x18f)][_0x1d51ec(0x216)]=function(_0x3eab41){const _0x586d1f=_0x1d51ec;VisuMZ[_0x586d1f(0x312)][_0x586d1f(0x19d)][_0x586d1f(0x23c)](this,_0x3eab41),this[_0x586d1f(0x24c)]={};},Game_Enemy['prototype'][_0x1d51ec(0x2b3)]=function(){const _0x441df4=_0x1d51ec;let _0x1a37eb=[this[_0x441df4(0x37b)]()];return _0x1a37eb[_0x441df4(0x14d)](this['skills']());},Game_Enemy[_0x1d51ec(0x18f)][_0x1d51ec(0x220)]=function(){const _0x32530f=_0x1d51ec;Game_Battler[_0x32530f(0x18f)][_0x32530f(0x220)][_0x32530f(0x23c)](this);const _0x56aa45=VisuMZ[_0x32530f(0x312)][_0x32530f(0x34f)][_0x32530f(0x2cb)][_0x32530f(0x2f5)];this[_0x32530f(0x24c)]['passiveStates']=this['_cache'][_0x32530f(0x30e)][_0x32530f(0x14d)](_0x56aa45);},Game_Enemy[_0x1d51ec(0x18f)][_0x1d51ec(0x2c5)]=function(){const _0x30776e=_0x1d51ec,_0x3484da=[];for(const _0xa7b1a4 of this[_0x30776e(0x37b)]()[_0x30776e(0x2f2)]){const _0x394114=$dataSkills[_0xa7b1a4[_0x30776e(0x169)]];if(_0x394114&&!_0x3484da[_0x30776e(0x1ae)](_0x394114))_0x3484da['push'](_0x394114);}return _0x3484da;},Game_Enemy[_0x1d51ec(0x18f)][_0x1d51ec(0x20e)]=function(_0x47462b){const _0x48bba7=_0x1d51ec;return this[_0x48bba7(0x18c)]($dataStates[_0x47462b]);},VisuMZ[_0x1d51ec(0x312)]['Game_Unit_isAllDead']=Game_Unit[_0x1d51ec(0x18f)][_0x1d51ec(0x192)],Game_Unit['prototype'][_0x1d51ec(0x192)]=function(){const _0x3b5cc3=_0x1d51ec;if(this[_0x3b5cc3(0x2a3)]())return!![];return VisuMZ['SkillsStatesCore'][_0x3b5cc3(0x1e3)][_0x3b5cc3(0x23c)](this);},Game_Unit['prototype']['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x23cd31=_0x1d51ec,_0x28fbb9=this['aliveMembers']();for(const _0x179a4e of _0x28fbb9){if(!_0x179a4e[_0x23cd31(0x23d)]())return![];}return!![];},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x382)]=Game_Troop['prototype']['setup'],Game_Troop[_0x1d51ec(0x18f)][_0x1d51ec(0x21d)]=function(_0x5af9de){const _0x579f99=_0x1d51ec;VisuMZ[_0x579f99(0x312)][_0x579f99(0x382)][_0x579f99(0x23c)](this,_0x5af9de),this[_0x579f99(0x2f6)]();},Game_Troop[_0x1d51ec(0x18f)][_0x1d51ec(0x2f6)]=function(){const _0x560514=_0x1d51ec;this[_0x560514(0x30f)]=Graphics['frameCount'];},Game_Troop[_0x1d51ec(0x18f)]['getCurrentTroopUniqueID']=function(){const _0x466b8a=_0x1d51ec;return this[_0x466b8a(0x30f)]=this[_0x466b8a(0x30f)]||Graphics[_0x466b8a(0x149)],this[_0x466b8a(0x30f)];},Scene_Skill[_0x1d51ec(0x18f)]['isBottomHelpMode']=function(){const _0x180245=_0x1d51ec;if(ConfigManager[_0x180245(0x202)]&&ConfigManager[_0x180245(0x15c)]!==undefined)return ConfigManager[_0x180245(0x15c)];else{if(this[_0x180245(0x30c)]())return this[_0x180245(0x1b1)]()[_0x180245(0x198)](/LOWER/i);else Scene_ItemBase[_0x180245(0x18f)][_0x180245(0x170)][_0x180245(0x23c)](this);}},Scene_Skill[_0x1d51ec(0x18f)]['isRightInputMode']=function(){const _0x2ec3e1=_0x1d51ec;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x2ec3e1(0x30c)]()?this['updatedLayoutStyle']()[_0x2ec3e1(0x198)](/RIGHT/i):Scene_ItemBase[_0x2ec3e1(0x18f)][_0x2ec3e1(0x170)][_0x2ec3e1(0x23c)](this);},Scene_Skill[_0x1d51ec(0x18f)]['updatedLayoutStyle']=function(){const _0xd654fe=_0x1d51ec;return VisuMZ['SkillsStatesCore'][_0xd654fe(0x34f)][_0xd654fe(0x14a)][_0xd654fe(0x1b5)];},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x25a)]=function(){const _0x59cae0=_0x1d51ec;return this[_0x59cae0(0x14f)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x30c)]=function(){const _0x2ac299=_0x1d51ec;return VisuMZ[_0x2ac299(0x312)][_0x2ac299(0x34f)][_0x2ac299(0x14a)][_0x2ac299(0x2e3)];},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x347)]=Scene_Skill['prototype'][_0x1d51ec(0x2e5)],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x3c5064=_0x1d51ec;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x3c5064(0x206)]():VisuMZ[_0x3c5064(0x312)]['Scene_Skill_helpWindowRect'][_0x3c5064(0x23c)](this);},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x206)]=function(){const _0x263a72=_0x1d51ec,_0x3f24ba=0x0,_0x4958ae=this[_0x263a72(0x2be)](),_0x39344f=Graphics[_0x263a72(0x1f8)],_0x4d2ecf=this['helpAreaHeight']();return new Rectangle(_0x3f24ba,_0x4958ae,_0x39344f,_0x4d2ecf);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x30b)]=Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x297)],Scene_Skill[_0x1d51ec(0x18f)]['skillTypeWindowRect']=function(){const _0x667d6a=_0x1d51ec;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x667d6a(0x180)]():VisuMZ['SkillsStatesCore'][_0x667d6a(0x30b)][_0x667d6a(0x23c)](this);},Scene_Skill['prototype']['skillTypeWindowRectSkillsStatesCore']=function(){const _0xb1c27e=_0x1d51ec,_0x4e3bbe=this[_0xb1c27e(0x325)](),_0x5caaac=this[_0xb1c27e(0x1de)](0x3,!![]),_0x81642b=this[_0xb1c27e(0x170)]()?Graphics[_0xb1c27e(0x1f8)]-_0x4e3bbe:0x0,_0x375acf=this[_0xb1c27e(0x1f4)]();return new Rectangle(_0x81642b,_0x375acf,_0x4e3bbe,_0x5caaac);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x32f)]=Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x1b6)],Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x1b6)]=function(){const _0xb3725d=_0x1d51ec;return this[_0xb3725d(0x30c)]()?this[_0xb3725d(0x245)]():VisuMZ[_0xb3725d(0x312)][_0xb3725d(0x32f)]['call'](this);},Scene_Skill['prototype'][_0x1d51ec(0x245)]=function(){const _0x41c1bc=_0x1d51ec,_0x2039d5=Graphics[_0x41c1bc(0x1f8)]-this[_0x41c1bc(0x325)](),_0x7f461a=this[_0x41c1bc(0x2ec)][_0x41c1bc(0x200)],_0x36654c=this[_0x41c1bc(0x170)]()?0x0:Graphics[_0x41c1bc(0x1f8)]-_0x2039d5,_0x3a1fd4=this['mainAreaTop']();return new Rectangle(_0x36654c,_0x3a1fd4,_0x2039d5,_0x7f461a);},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x204)]=Scene_Skill['prototype'][_0x1d51ec(0x28d)],Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x28d)]=function(){const _0x4e0a72=_0x1d51ec;VisuMZ['SkillsStatesCore'][_0x4e0a72(0x204)][_0x4e0a72(0x23c)](this),this[_0x4e0a72(0x2fb)]()&&this[_0x4e0a72(0x26f)]();},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x158)]=Scene_Skill[_0x1d51ec(0x18f)]['itemWindowRect'],Scene_Skill['prototype'][_0x1d51ec(0x2c7)]=function(){const _0xdbf645=_0x1d51ec;if(this[_0xdbf645(0x30c)]())return this[_0xdbf645(0x1e1)]();else{const _0x4d97e0=VisuMZ[_0xdbf645(0x312)][_0xdbf645(0x158)][_0xdbf645(0x23c)](this);return this[_0xdbf645(0x2fb)]()&&this[_0xdbf645(0x2ff)]()&&(_0x4d97e0['width']-=this[_0xdbf645(0x37d)]()),_0x4d97e0;}},Scene_Skill['prototype']['itemWindowRectSkillsStatesCore']=function(){const _0x57ebbb=_0x1d51ec,_0x3dc81d=Graphics[_0x57ebbb(0x1f8)]-this[_0x57ebbb(0x37d)](),_0x2967b1=this[_0x57ebbb(0x1e0)]()-this[_0x57ebbb(0x20d)][_0x57ebbb(0x200)],_0x75bb3a=this[_0x57ebbb(0x170)]()?Graphics[_0x57ebbb(0x1f8)]-_0x3dc81d:0x0,_0x35e154=this['_statusWindow']['y']+this['_statusWindow']['height'];return new Rectangle(_0x75bb3a,_0x35e154,_0x3dc81d,_0x2967b1);},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x2fb)]=function(){const _0x516a79=_0x1d51ec;if(!Imported[_0x516a79(0x1b0)])return![];else return this[_0x516a79(0x30c)]()?!![]:VisuMZ[_0x516a79(0x312)][_0x516a79(0x34f)]['Skills'][_0x516a79(0x19e)];},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x2ff)]=function(){const _0x4382e0=_0x1d51ec;return VisuMZ[_0x4382e0(0x312)]['Settings'][_0x4382e0(0x14a)][_0x4382e0(0x2a5)];},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x26f)]=function(){const _0x53c785=_0x1d51ec,_0x4c6b2d=this['shopStatusWindowRect']();this['_shopStatusWindow']=new Window_ShopStatus(_0x4c6b2d),this[_0x53c785(0x340)](this[_0x53c785(0x33f)]),this[_0x53c785(0x269)][_0x53c785(0x243)](this[_0x53c785(0x33f)]);const _0x293f32=VisuMZ[_0x53c785(0x312)][_0x53c785(0x34f)][_0x53c785(0x14a)][_0x53c785(0x17d)];this[_0x53c785(0x33f)]['setBackgroundType'](_0x293f32||0x0);},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x17c)]=function(){const _0x52e87c=_0x1d51ec;return this[_0x52e87c(0x30c)]()?this[_0x52e87c(0x160)]():VisuMZ['SkillsStatesCore']['Settings'][_0x52e87c(0x14a)][_0x52e87c(0x2e0)][_0x52e87c(0x23c)](this);},Scene_Skill[_0x1d51ec(0x18f)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x402833=_0x1d51ec,_0x263ad0=this[_0x402833(0x37d)](),_0x1f9edc=this[_0x402833(0x269)][_0x402833(0x200)],_0x45998d=this[_0x402833(0x170)]()?0x0:Graphics[_0x402833(0x1f8)]-this[_0x402833(0x37d)](),_0x560db2=this[_0x402833(0x269)]['y'];return new Rectangle(_0x45998d,_0x560db2,_0x263ad0,_0x1f9edc);},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x37d)]=function(){const _0x52602d=_0x1d51ec;return Imported[_0x52602d(0x1b0)]?Scene_Shop[_0x52602d(0x18f)][_0x52602d(0x2ae)]():0x0;},Scene_Skill[_0x1d51ec(0x18f)][_0x1d51ec(0x2d0)]=function(){const _0x507a23=_0x1d51ec;return this[_0x507a23(0x2ec)]&&this[_0x507a23(0x2ec)]['active']?TextManager['buttonAssistSwitch']:'';},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x1d2)]=Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x191)],Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x191)]=function(){const _0x4c7a74=_0x1d51ec;VisuMZ[_0x4c7a74(0x312)][_0x4c7a74(0x1d2)]['call'](this),this['_costSettings']=null;},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x327)]=Sprite_Gauge[_0x1d51ec(0x18f)]['setup'],Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x21d)]=function(_0x28d51f,_0x551dc1){const _0x4c251f=_0x1d51ec;this[_0x4c251f(0x239)](_0x28d51f,_0x551dc1),_0x551dc1=_0x551dc1['toLowerCase'](),VisuMZ[_0x4c251f(0x312)][_0x4c251f(0x327)][_0x4c251f(0x23c)](this,_0x28d51f,_0x551dc1);},Sprite_Gauge[_0x1d51ec(0x18f)]['setupSkillsStatesCore']=function(_0x5218b5,_0x26eb5f){const _0x1194b4=_0x1d51ec,_0x319d1c=VisuMZ['SkillsStatesCore'][_0x1194b4(0x34f)][_0x1194b4(0x212)]['filter'](_0x267638=>_0x267638[_0x1194b4(0x167)][_0x1194b4(0x2cf)]()===_0x26eb5f[_0x1194b4(0x2cf)]());_0x319d1c['length']>=0x1?this[_0x1194b4(0x1b8)]=_0x319d1c[0x0]:this['_costSettings']=null;},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x178)]=Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x2d4)],Sprite_Gauge[_0x1d51ec(0x18f)]['currentValue']=function(){const _0x1cf632=_0x1d51ec;return this[_0x1cf632(0x26b)]&&this[_0x1cf632(0x1b8)]?this['currentValueSkillsStatesCore']():VisuMZ[_0x1cf632(0x312)][_0x1cf632(0x178)][_0x1cf632(0x23c)](this);},Sprite_Gauge['prototype'][_0x1d51ec(0x1f5)]=function(){const _0x1fae80=_0x1d51ec;return this['_costSettings'][_0x1fae80(0x329)][_0x1fae80(0x23c)](this[_0x1fae80(0x26b)]);},VisuMZ[_0x1d51ec(0x312)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x352)],Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x352)]=function(){const _0x579c5e=_0x1d51ec;return this[_0x579c5e(0x26b)]&&this['_costSettings']?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x579c5e(0x312)][_0x579c5e(0x15a)][_0x579c5e(0x23c)](this);},Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x1a7)]=function(){const _0x495026=_0x1d51ec;return this[_0x495026(0x1b8)][_0x495026(0x2a2)][_0x495026(0x23c)](this[_0x495026(0x26b)]);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x176)]=Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x376)],Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x376)]=function(){const _0x3c4ea6=_0x1d51ec,_0x5305c7=VisuMZ[_0x3c4ea6(0x312)]['Sprite_Gauge_gaugeRate']['call'](this);return _0x5305c7[_0x3c4ea6(0x302)](0x0,0x1);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x35d)]=Sprite_Gauge['prototype'][_0x1d51ec(0x310)],Sprite_Gauge['prototype'][_0x1d51ec(0x310)]=function(){const _0x416a92=_0x1d51ec;this[_0x416a92(0x26b)]&&this[_0x416a92(0x1b8)]?(this[_0x416a92(0x357)]['clear'](),this[_0x416a92(0x2c0)]()):VisuMZ[_0x416a92(0x312)]['Sprite_Gauge_redraw'][_0x416a92(0x23c)](this);},Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x20c)]=function(){const _0x1769e2=_0x1d51ec;let _0x54a975=this[_0x1769e2(0x2d4)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x1769e2(0x2da)]()&&(_0x54a975=VisuMZ[_0x1769e2(0x22b)](_0x54a975)),_0x54a975;},Sprite_Gauge[_0x1d51ec(0x18f)][_0x1d51ec(0x2c0)]=function(){const _0x202c27=_0x1d51ec;this['_costSettings'][_0x202c27(0x350)][_0x202c27(0x23c)](this);},Sprite_Gauge['prototype'][_0x1d51ec(0x187)]=function(_0x358e76,_0xc43ce6,_0x28a7cb,_0x102907,_0x57a472,_0x3b2d40){const _0x382e43=_0x1d51ec,_0x1277dd=this['gaugeRate'](),_0x5050be=Math[_0x382e43(0x29a)]((_0x57a472-0x2)*_0x1277dd),_0x1c9e47=_0x3b2d40-0x2,_0x4ff32e=this['gaugeBackColor']();this[_0x382e43(0x357)][_0x382e43(0x225)](_0x28a7cb,_0x102907,_0x57a472,_0x3b2d40,_0x4ff32e),this[_0x382e43(0x357)]['gradientFillRect'](_0x28a7cb+0x1,_0x102907+0x1,_0x5050be,_0x1c9e47,_0x358e76,_0xc43ce6);},VisuMZ[_0x1d51ec(0x312)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x1d51ec(0x18f)]['loadBitmap'],Sprite_StateIcon['prototype'][_0x1d51ec(0x226)]=function(){const _0xfdfa77=_0x1d51ec;VisuMZ[_0xfdfa77(0x312)][_0xfdfa77(0x319)][_0xfdfa77(0x23c)](this),this['createTurnDisplaySprite']();},Sprite_StateIcon['prototype']['createTurnDisplaySprite']=function(){const _0x43088d=_0x1d51ec,_0x468133=Window_Base[_0x43088d(0x18f)][_0x43088d(0x201)]();this[_0x43088d(0x36b)]=new Sprite(),this[_0x43088d(0x36b)]['bitmap']=new Bitmap(ImageManager[_0x43088d(0x1ee)],_0x468133),this[_0x43088d(0x36b)]['anchor']['x']=this['anchor']['x'],this[_0x43088d(0x36b)][_0x43088d(0x1d6)]['y']=this[_0x43088d(0x1d6)]['y'],this[_0x43088d(0x1bf)](this[_0x43088d(0x36b)]),this[_0x43088d(0x185)]=this[_0x43088d(0x36b)][_0x43088d(0x357)];},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x2f1)]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x1d51ec(0x18f)][_0x1d51ec(0x186)]=function(){const _0x20ba5e=_0x1d51ec;VisuMZ[_0x20ba5e(0x312)][_0x20ba5e(0x2f1)][_0x20ba5e(0x23c)](this),this[_0x20ba5e(0x309)]();},Sprite_StateIcon[_0x1d51ec(0x18f)][_0x1d51ec(0x1c6)]=function(_0x25f616,_0x49593a,_0x5ce580,_0x2ad8f6,_0x7c95cf){const _0x2ade94=_0x1d51ec;this['contents'][_0x2ade94(0x1c6)](_0x25f616,_0x49593a,_0x5ce580,_0x2ad8f6,this[_0x2ade94(0x185)][_0x2ade94(0x200)],_0x7c95cf);},Sprite_StateIcon[_0x1d51ec(0x18f)][_0x1d51ec(0x309)]=function(){const _0x2dd958=_0x1d51ec;this['resetFontSettings'](),this['contents'][_0x2dd958(0x2fd)]();const _0xe678e5=this[_0x2dd958(0x26b)];if(!_0xe678e5)return;const _0x2908c0=_0xe678e5[_0x2dd958(0x14b)]()[_0x2dd958(0x36f)](_0x59182d=>_0x59182d[_0x2dd958(0x361)]>0x0),_0x48c567=[...Array(0x8)[_0x2dd958(0x33c)]()][_0x2dd958(0x36f)](_0x273e9a=>_0xe678e5[_0x2dd958(0x205)](_0x273e9a)!==0x0),_0x327f33=this[_0x2dd958(0x231)],_0x30aa30=_0x2908c0[_0x327f33];if(_0x30aa30)Window_Base[_0x2dd958(0x18f)][_0x2dd958(0x293)]['call'](this,_0xe678e5,_0x30aa30,0x0,0x0),Window_Base[_0x2dd958(0x18f)][_0x2dd958(0x2a7)]['call'](this,_0xe678e5,_0x30aa30,0x0,0x0);else{const _0x4b8245=_0x48c567[_0x327f33-_0x2908c0[_0x2dd958(0x2cc)]];if(!_0x4b8245)return;Window_Base[_0x2dd958(0x18f)]['drawActorBuffTurns'][_0x2dd958(0x23c)](this,_0xe678e5,_0x4b8245,0x0,0x0),Window_Base['prototype'][_0x2dd958(0x1d3)][_0x2dd958(0x23c)](this,_0xe678e5,_0x4b8245,0x0,0x0);}},Sprite_StateIcon[_0x1d51ec(0x18f)][_0x1d51ec(0x2d7)]=function(){const _0x5dcaed=_0x1d51ec;this['contents'][_0x5dcaed(0x34b)]=$gameSystem['mainFontFace'](),this[_0x5dcaed(0x185)]['fontSize']=$gameSystem[_0x5dcaed(0x181)](),this['resetTextColor']();},Sprite_StateIcon[_0x1d51ec(0x18f)]['resetTextColor']=function(){const _0x3a0dd8=_0x1d51ec;this[_0x3a0dd8(0x34d)](ColorManager[_0x3a0dd8(0x1d0)]()),this[_0x3a0dd8(0x280)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x1d51ec(0x18f)][_0x1d51ec(0x34d)]=function(_0x35a3f5){const _0x257d31=_0x1d51ec;this[_0x257d31(0x185)][_0x257d31(0x1ad)]=_0x35a3f5;},Sprite_StateIcon['prototype'][_0x1d51ec(0x280)]=function(_0x130184){const _0x4f50c3=_0x1d51ec;this[_0x4f50c3(0x185)][_0x4f50c3(0x362)]=_0x130184;},Window_Base['prototype'][_0x1d51ec(0x2af)]=function(_0x61ff52,_0x1c0f12,_0x2f396d,_0x2885de,_0x4a6c89){const _0x59099f=_0x1d51ec,_0x2079e3=this[_0x59099f(0x2a1)](_0x61ff52,_0x1c0f12),_0x297a6c=this[_0x59099f(0x23f)](_0x2079e3,_0x2f396d,_0x2885de,_0x4a6c89),_0x4fdb84=_0x2f396d+_0x4a6c89-_0x297a6c[_0x59099f(0x1f0)];this[_0x59099f(0x252)](_0x2079e3,_0x4fdb84,_0x2885de,_0x4a6c89),this[_0x59099f(0x2d7)]();},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x2a1)]=function(_0x2da193,_0x34d64c){const _0x493135=_0x1d51ec;let _0x5637a1='';for(settings of VisuMZ[_0x493135(0x312)]['Settings'][_0x493135(0x212)]){if(!this[_0x493135(0x326)](_0x2da193,_0x34d64c,settings))continue;if(_0x5637a1['length']>0x0)_0x5637a1+=this[_0x493135(0x2bf)]();_0x5637a1+=this[_0x493135(0x368)](_0x2da193,_0x34d64c,settings);}_0x5637a1=this[_0x493135(0x232)](_0x2da193,_0x34d64c,_0x5637a1);if(_0x34d64c[_0x493135(0x301)][_0x493135(0x198)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x5637a1['length']>0x0)_0x5637a1+=this[_0x493135(0x2bf)]();_0x5637a1+=String(RegExp['$1']);}return _0x5637a1;},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x232)]=function(_0x1742c9,_0x1e537b,_0x37030a){return _0x37030a;},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x326)]=function(_0x588158,_0x4c0526,_0x4f50d0){const _0x33bf60=_0x1d51ec,_0xd9e698=_0x4f50d0[_0x33bf60(0x29c)]['call'](_0x588158,_0x4c0526);return _0x4f50d0[_0x33bf60(0x1eb)]['call'](_0x588158,_0x4c0526,_0xd9e698,_0x4f50d0);},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x368)]=function(_0xe948ba,_0x5b6534,_0x193edb){const _0x106d01=_0x1d51ec,_0x169991=_0x193edb['CalcJS']['call'](_0xe948ba,_0x5b6534);return _0x193edb['TextJS'][_0x106d01(0x23c)](_0xe948ba,_0x5b6534,_0x169991,_0x193edb);},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x2bf)]=function(){return'\x20';},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x16d)]=function(_0x16a073,_0x2a3455,_0x2fc346,_0x8a4290){const _0x24240b=_0x1d51ec;if(!_0x16a073)return;VisuMZ[_0x24240b(0x312)]['Window_StatusBase_drawActorIcons'][_0x24240b(0x23c)](this,_0x16a073,_0x2a3455,_0x2fc346,_0x8a4290),this[_0x24240b(0x2db)](_0x16a073,_0x2a3455,_0x2fc346,_0x8a4290);},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x2db)]=function(_0x5e6d0b,_0x2949cd,_0x253452,_0x36716f){const _0x11e12c=_0x1d51ec;_0x36716f=_0x36716f||0x90;const _0x39d7d0=ImageManager[_0x11e12c(0x1ee)],_0x193953=_0x5e6d0b[_0x11e12c(0x183)]()['slice'](0x0,Math[_0x11e12c(0x29a)](_0x36716f/_0x39d7d0)),_0x1cb7a0=_0x5e6d0b[_0x11e12c(0x14b)]()['filter'](_0x2fcc5b=>_0x2fcc5b[_0x11e12c(0x361)]>0x0),_0x675b49=[...Array(0x8)[_0x11e12c(0x33c)]()][_0x11e12c(0x36f)](_0x1d5f2e=>_0x5e6d0b[_0x11e12c(0x205)](_0x1d5f2e)!==0x0),_0x5a1c67=[];let _0x5f10dd=_0x2949cd;for(let _0x50b449=0x0;_0x50b449<_0x193953[_0x11e12c(0x2cc)];_0x50b449++){this[_0x11e12c(0x2d7)]();const _0x16ac8d=_0x1cb7a0[_0x50b449];if(_0x16ac8d)!_0x5a1c67['includes'](_0x16ac8d)&&this[_0x11e12c(0x293)](_0x5e6d0b,_0x16ac8d,_0x5f10dd,_0x253452),this['drawActorStateData'](_0x5e6d0b,_0x16ac8d,_0x5f10dd,_0x253452),_0x5a1c67[_0x11e12c(0x27e)](_0x16ac8d);else{const _0x49b68c=_0x675b49[_0x50b449-_0x1cb7a0[_0x11e12c(0x2cc)]];this[_0x11e12c(0x2eb)](_0x5e6d0b,_0x49b68c,_0x5f10dd,_0x253452),this['drawActorBuffRates'](_0x5e6d0b,_0x49b68c,_0x5f10dd,_0x253452);}_0x5f10dd+=_0x39d7d0;}},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x293)]=function(_0x508350,_0x41397b,_0x20221f,_0x3286fa){const _0x3fd845=_0x1d51ec;if(!VisuMZ[_0x3fd845(0x312)]['Settings'][_0x3fd845(0x175)][_0x3fd845(0x322)])return;if(!_0x508350[_0x3fd845(0x33d)](_0x41397b['id']))return;if(_0x41397b['autoRemovalTiming']===0x0)return;if(_0x41397b[_0x3fd845(0x301)][_0x3fd845(0x198)](/<HIDE STATE TURNS>/i))return;const _0x580229=_0x508350[_0x3fd845(0x1d1)](_0x41397b['id']),_0x35aa5e=ImageManager[_0x3fd845(0x1ee)],_0x2af7af=ColorManager[_0x3fd845(0x26e)](_0x41397b);this[_0x3fd845(0x34d)](_0x2af7af),this[_0x3fd845(0x280)](_0x3fd845(0x28c)),this['contents'][_0x3fd845(0x1f6)]=!![],this[_0x3fd845(0x185)]['fontSize']=VisuMZ[_0x3fd845(0x312)]['Settings']['States'][_0x3fd845(0x1e9)],_0x20221f+=VisuMZ['SkillsStatesCore'][_0x3fd845(0x34f)][_0x3fd845(0x175)][_0x3fd845(0x369)],_0x3286fa+=VisuMZ[_0x3fd845(0x312)]['Settings'][_0x3fd845(0x175)][_0x3fd845(0x29e)],this[_0x3fd845(0x1c6)](_0x580229,_0x20221f,_0x3286fa,_0x35aa5e,_0x3fd845(0x15e)),this['contents'][_0x3fd845(0x1f6)]=![],this[_0x3fd845(0x2d7)]();},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x2a7)]=function(_0x4e65c4,_0x1f7ed0,_0xc790f5,_0x4698c7){const _0x13582c=_0x1d51ec;if(!VisuMZ[_0x13582c(0x312)][_0x13582c(0x34f)][_0x13582c(0x175)]['ShowData'])return;const _0x560907=ImageManager[_0x13582c(0x1ee)],_0x541633=ImageManager['iconHeight']/0x2,_0x2b1a46=ColorManager['normalColor']();this[_0x13582c(0x34d)](_0x2b1a46),this[_0x13582c(0x280)]('rgba(0,\x200,\x200,\x201)'),this[_0x13582c(0x185)]['fontBold']=!![],this['contents'][_0x13582c(0x346)]=VisuMZ[_0x13582c(0x312)][_0x13582c(0x34f)][_0x13582c(0x175)]['DataFontSize'],_0xc790f5+=VisuMZ['SkillsStatesCore'][_0x13582c(0x34f)]['States'][_0x13582c(0x168)],_0x4698c7+=VisuMZ[_0x13582c(0x312)][_0x13582c(0x34f)][_0x13582c(0x175)]['DataOffsetY'];const _0x5f02d2=String(_0x4e65c4[_0x13582c(0x348)](_0x1f7ed0['id']));this['drawText'](_0x5f02d2,_0xc790f5,_0x4698c7,_0x560907,_0x13582c(0x244)),this[_0x13582c(0x185)]['fontBold']=![],this[_0x13582c(0x2d7)]();},Window_Base[_0x1d51ec(0x18f)][_0x1d51ec(0x2eb)]=function(_0x2ce96a,_0x358c7f,_0x58632b,_0x517a28){const _0x6a7112=_0x1d51ec;if(!VisuMZ['SkillsStatesCore'][_0x6a7112(0x34f)][_0x6a7112(0x286)][_0x6a7112(0x322)])return;const _0x3a7247=_0x2ce96a[_0x6a7112(0x205)](_0x358c7f);if(_0x3a7247===0x0)return;const _0x3de105=_0x2ce96a['buffTurns'](_0x358c7f),_0x30bee0=ImageManager[_0x6a7112(0x1ee)],_0x13902d=_0x3a7247>0x0?ColorManager[_0x6a7112(0x364)]():ColorManager['debuffColor']();this['changeTextColor'](_0x13902d),this[_0x6a7112(0x280)](_0x6a7112(0x28c)),this[_0x6a7112(0x185)][_0x6a7112(0x1f6)]=!![],this[_0x6a7112(0x185)][_0x6a7112(0x346)]=VisuMZ[_0x6a7112(0x312)][_0x6a7112(0x34f)]['Buffs'][_0x6a7112(0x1e9)],_0x58632b+=VisuMZ[_0x6a7112(0x312)][_0x6a7112(0x34f)]['Buffs'][_0x6a7112(0x369)],_0x517a28+=VisuMZ[_0x6a7112(0x312)]['Settings'][_0x6a7112(0x286)][_0x6a7112(0x29e)],this['drawText'](_0x3de105,_0x58632b,_0x517a28,_0x30bee0,_0x6a7112(0x15e)),this[_0x6a7112(0x185)][_0x6a7112(0x1f6)]=![],this['resetFontSettings']();},Window_Base['prototype']['drawActorBuffRates']=function(_0x42f41b,_0x3e0ae6,_0x1b6e86,_0x5a1425){const _0x1ae25c=_0x1d51ec;if(!VisuMZ[_0x1ae25c(0x312)][_0x1ae25c(0x34f)]['Buffs']['ShowData'])return;const _0x379528=_0x42f41b[_0x1ae25c(0x21c)](_0x3e0ae6),_0x37b1e6=_0x42f41b[_0x1ae25c(0x205)](_0x3e0ae6),_0x50105d=ImageManager[_0x1ae25c(0x1ee)],_0x33e2cf=ImageManager[_0x1ae25c(0x356)]/0x2,_0x462539=_0x37b1e6>0x0?ColorManager[_0x1ae25c(0x364)]():ColorManager[_0x1ae25c(0x20a)]();this[_0x1ae25c(0x34d)](_0x462539),this['changeOutlineColor'](_0x1ae25c(0x28c)),this[_0x1ae25c(0x185)]['fontBold']=!![],this['contents']['fontSize']=VisuMZ[_0x1ae25c(0x312)][_0x1ae25c(0x34f)][_0x1ae25c(0x286)]['DataFontSize'],_0x1b6e86+=VisuMZ[_0x1ae25c(0x312)][_0x1ae25c(0x34f)][_0x1ae25c(0x286)][_0x1ae25c(0x168)],_0x5a1425+=VisuMZ[_0x1ae25c(0x312)][_0x1ae25c(0x34f)][_0x1ae25c(0x286)][_0x1ae25c(0x370)];const _0x299f22='%1%'[_0x1ae25c(0x2fe)](Math[_0x1ae25c(0x299)](_0x379528*0x64));this[_0x1ae25c(0x1c6)](_0x299f22,_0x1b6e86,_0x5a1425,_0x50105d,_0x1ae25c(0x244)),this[_0x1ae25c(0x185)][_0x1ae25c(0x1f6)]=![],this['resetFontSettings']();},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x315)]=Window_StatusBase[_0x1d51ec(0x18f)][_0x1d51ec(0x35c)],Window_StatusBase[_0x1d51ec(0x18f)]['placeGauge']=function(_0xe9060c,_0x2ebfa1,_0xb52612,_0x206951){const _0x566853=_0x1d51ec;if(_0xe9060c[_0x566853(0x209)]())_0x2ebfa1=this[_0x566853(0x2aa)](_0xe9060c,_0x2ebfa1);this[_0x566853(0x30d)](_0xe9060c,_0x2ebfa1,_0xb52612,_0x206951);},Window_StatusBase['prototype'][_0x1d51ec(0x30d)]=function(_0x18cbfb,_0x58263f,_0x39ace2,_0x2869ac){const _0x22572a=_0x1d51ec;if([_0x22572a(0x152),_0x22572a(0x2c8)][_0x22572a(0x1ae)](_0x58263f[_0x22572a(0x2bb)]()))return;VisuMZ[_0x22572a(0x312)][_0x22572a(0x315)][_0x22572a(0x23c)](this,_0x18cbfb,_0x58263f,_0x39ace2,_0x2869ac);},Window_StatusBase[_0x1d51ec(0x18f)][_0x1d51ec(0x2aa)]=function(_0x3013c2,_0x9446b9){const _0x361ad8=_0x1d51ec,_0x28b71a=_0x3013c2['currentClass']()['note'];if(_0x9446b9==='hp'&&_0x28b71a['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x9446b9==='mp'&&_0x28b71a[_0x361ad8(0x198)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x9446b9==='tp'&&_0x28b71a[_0x361ad8(0x198)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x9446b9;}},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x314)]=Window_StatusBase[_0x1d51ec(0x18f)]['drawActorIcons'],Window_StatusBase[_0x1d51ec(0x18f)][_0x1d51ec(0x16d)]=function(_0x56c2b7,_0x4d4fac,_0x5f2096,_0xf53e3){const _0x1d0765=_0x1d51ec;if(!_0x56c2b7)return;Window_Base[_0x1d0765(0x18f)]['drawActorIcons'][_0x1d0765(0x23c)](this,_0x56c2b7,_0x4d4fac,_0x5f2096,_0xf53e3);},VisuMZ['SkillsStatesCore']['Window_SkillType_initialize']=Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x211)],Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x211)]=function(_0x1c432e){const _0x515682=_0x1d51ec;VisuMZ['SkillsStatesCore'][_0x515682(0x1bc)][_0x515682(0x23c)](this,_0x1c432e),this['createCommandNameWindow'](_0x1c432e);},Window_SkillType['prototype'][_0x1d51ec(0x156)]=function(_0x2ef87d){const _0x5d46ba=_0x1d51ec,_0x282bb3=new Rectangle(0x0,0x0,_0x2ef87d[_0x5d46ba(0x1f0)],_0x2ef87d[_0x5d46ba(0x200)]);this[_0x5d46ba(0x25d)]=new Window_Base(_0x282bb3),this[_0x5d46ba(0x25d)][_0x5d46ba(0x2e6)]=0x0,this[_0x5d46ba(0x1bf)](this[_0x5d46ba(0x25d)]),this[_0x5d46ba(0x1f1)]();},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x1bb)]=function(){const _0x5dd05f=_0x1d51ec;Window_Command[_0x5dd05f(0x18f)][_0x5dd05f(0x1bb)]['call'](this);if(this[_0x5dd05f(0x25d)])this['updateCommandNameWindow']();},Window_SkillType['prototype'][_0x1d51ec(0x1f1)]=function(){const _0x288ce6=_0x1d51ec,_0x6ab1a8=this[_0x288ce6(0x25d)];_0x6ab1a8[_0x288ce6(0x185)][_0x288ce6(0x2fd)]();const _0x5280fc=this[_0x288ce6(0x318)](this[_0x288ce6(0x1c9)]());if(_0x5280fc==='icon'&&this[_0x288ce6(0x21b)]()>0x0){const _0x327a27=this[_0x288ce6(0x2f0)](this[_0x288ce6(0x1c9)]());let _0x1adb9d=this[_0x288ce6(0x1d8)](this[_0x288ce6(0x1c9)]());_0x1adb9d=_0x1adb9d['replace'](/\\I\[(\d+)\]/gi,''),_0x6ab1a8[_0x288ce6(0x2d7)](),this['commandNameWindowDrawBackground'](_0x1adb9d,_0x327a27),this['commandNameWindowDrawText'](_0x1adb9d,_0x327a27),this[_0x288ce6(0x359)](_0x1adb9d,_0x327a27);}},Window_SkillType[_0x1d51ec(0x18f)]['commandNameWindowDrawBackground']=function(_0x1c42e7,_0x4bdbba){},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x229)]=function(_0x4b18df,_0x24b923){const _0x5cc4f6=_0x1d51ec,_0x251675=this[_0x5cc4f6(0x25d)];_0x251675['drawText'](_0x4b18df,0x0,_0x24b923['y'],_0x251675[_0x5cc4f6(0x18d)],'center');},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x359)]=function(_0x42f7dd,_0x354713){const _0x169972=_0x1d51ec,_0x598ae0=this[_0x169972(0x25d)],_0x4f3589=$gameSystem['windowPadding'](),_0x31dc4e=_0x354713['x']+Math[_0x169972(0x29a)](_0x354713[_0x169972(0x1f0)]/0x2)+_0x4f3589;_0x598ae0['x']=_0x598ae0[_0x169972(0x1f0)]/-0x2+_0x31dc4e,_0x598ae0['y']=Math[_0x169972(0x29a)](_0x354713[_0x169972(0x200)]/0x2);},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x25a)]=function(){const _0x4bc1a4=_0x1d51ec;return Imported[_0x4bc1a4(0x335)]&&Window_Command['prototype'][_0x4bc1a4(0x25a)][_0x4bc1a4(0x23c)](this);},Window_SkillType['prototype'][_0x1d51ec(0x1e2)]=function(){const _0xb36bd=_0x1d51ec;if(!this[_0xb36bd(0x1f7)])return;const _0x117891=this[_0xb36bd(0x1f7)][_0xb36bd(0x298)]();for(const _0x5cb199 of _0x117891){const _0x5620ae=this[_0xb36bd(0x1d9)](_0x5cb199);this['addCommand'](_0x5620ae,_0xb36bd(0x173),!![],_0x5cb199);}},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x1d9)]=function(_0x41a08e){const _0x16a04a=_0x1d51ec;let _0x36ee94=$dataSystem[_0x16a04a(0x298)][_0x41a08e];if(_0x36ee94[_0x16a04a(0x198)](/\\I\[(\d+)\]/i))return _0x36ee94;if(this[_0x16a04a(0x1c4)]()==='text')return _0x36ee94;const _0x3662ae=VisuMZ['SkillsStatesCore'][_0x16a04a(0x34f)][_0x16a04a(0x14a)],_0x1c72ea=$dataSystem['magicSkills']['includes'](_0x41a08e),_0xdf8fb3=_0x1c72ea?_0x3662ae[_0x16a04a(0x172)]:_0x3662ae[_0x16a04a(0x2dd)];return'\x5cI[%1]%2'['format'](_0xdf8fb3,_0x36ee94);},Window_SkillType['prototype']['itemTextAlign']=function(){const _0x568946=_0x1d51ec;return VisuMZ[_0x568946(0x312)][_0x568946(0x34f)]['Skills'][_0x568946(0x2c6)];},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x1b7)]=function(_0x3eb495){const _0x320847=_0x1d51ec,_0x23255d=this[_0x320847(0x318)](_0x3eb495);if(_0x23255d===_0x320847(0x290))this[_0x320847(0x15d)](_0x3eb495);else _0x23255d===_0x320847(0x32d)?this[_0x320847(0x378)](_0x3eb495):Window_Command[_0x320847(0x18f)][_0x320847(0x1b7)][_0x320847(0x23c)](this,_0x3eb495);},Window_SkillType['prototype'][_0x1d51ec(0x1c4)]=function(){const _0x428077=_0x1d51ec;return VisuMZ['SkillsStatesCore']['Settings'][_0x428077(0x14a)][_0x428077(0x16f)];},Window_SkillType[_0x1d51ec(0x18f)][_0x1d51ec(0x318)]=function(_0x426e36){const _0x58cd60=_0x1d51ec;if(_0x426e36<0x0)return'text';const _0x31be6a=this[_0x58cd60(0x1c4)]();if(_0x31be6a!==_0x58cd60(0x21f))return _0x31be6a;else{if(this[_0x58cd60(0x21b)]()>0x0){const _0x3f25a1=this[_0x58cd60(0x1d8)](_0x426e36);if(_0x3f25a1[_0x58cd60(0x198)](/\\I\[(\d+)\]/i)){const _0x17e970=this[_0x58cd60(0x2f0)](_0x426e36),_0x2b32d0=this[_0x58cd60(0x23f)](_0x3f25a1)['width'];return _0x2b32d0<=_0x17e970[_0x58cd60(0x1f0)]?_0x58cd60(0x290):_0x58cd60(0x32d);}}}return _0x58cd60(0x2ab);},Window_SkillType['prototype'][_0x1d51ec(0x15d)]=function(_0x201c98){const _0x53ab3c=_0x1d51ec,_0x458414=this[_0x53ab3c(0x2f0)](_0x201c98),_0x4e4cbc=this[_0x53ab3c(0x1d8)](_0x201c98),_0x4ac7ea=this[_0x53ab3c(0x23f)](_0x4e4cbc)[_0x53ab3c(0x1f0)];this[_0x53ab3c(0x17f)](this[_0x53ab3c(0x197)](_0x201c98));const _0x496299=this['itemTextAlign']();if(_0x496299===_0x53ab3c(0x15e))this[_0x53ab3c(0x252)](_0x4e4cbc,_0x458414['x']+_0x458414[_0x53ab3c(0x1f0)]-_0x4ac7ea,_0x458414['y'],_0x4ac7ea);else{if(_0x496299===_0x53ab3c(0x244)){const _0x14b863=_0x458414['x']+Math[_0x53ab3c(0x29a)]((_0x458414[_0x53ab3c(0x1f0)]-_0x4ac7ea)/0x2);this[_0x53ab3c(0x252)](_0x4e4cbc,_0x14b863,_0x458414['y'],_0x4ac7ea);}else this[_0x53ab3c(0x252)](_0x4e4cbc,_0x458414['x'],_0x458414['y'],_0x4ac7ea);}},Window_SkillType['prototype']['drawItemStyleIcon']=function(_0x15c99a){const _0x4f2a06=_0x1d51ec;this['commandName'](_0x15c99a)[_0x4f2a06(0x198)](/\\I\[(\d+)\]/i);const _0x297718=Number(RegExp['$1'])||0x0,_0x562f8e=this[_0x4f2a06(0x2f0)](_0x15c99a),_0x1fd833=_0x562f8e['x']+Math[_0x4f2a06(0x29a)]((_0x562f8e[_0x4f2a06(0x1f0)]-ImageManager['iconWidth'])/0x2),_0xab3496=_0x562f8e['y']+(_0x562f8e[_0x4f2a06(0x200)]-ImageManager[_0x4f2a06(0x356)])/0x2;this['drawIcon'](_0x297718,_0x1fd833,_0xab3496);},VisuMZ[_0x1d51ec(0x312)]['Window_SkillStatus_refresh']=Window_SkillStatus['prototype'][_0x1d51ec(0x268)],Window_SkillStatus[_0x1d51ec(0x18f)][_0x1d51ec(0x268)]=function(){const _0x4d89b4=_0x1d51ec;VisuMZ['SkillsStatesCore'][_0x4d89b4(0x203)][_0x4d89b4(0x23c)](this);if(this[_0x4d89b4(0x1f7)])this[_0x4d89b4(0x1f3)]();},Window_SkillStatus[_0x1d51ec(0x18f)][_0x1d51ec(0x1f3)]=function(){const _0x18166f=_0x1d51ec;if(!Imported[_0x18166f(0x335)])return;if(!Imported[_0x18166f(0x316)])return;const _0x5e1419=this[_0x18166f(0x358)]();let _0x1baf58=this[_0x18166f(0x1a3)]()/0x2+0xb4+0xb4+0xb4,_0x148ad4=this[_0x18166f(0x18d)]-_0x1baf58-0x2;if(_0x148ad4>=0x12c){const _0x580248=VisuMZ[_0x18166f(0x373)]['Settings']['Param'][_0x18166f(0x22d)],_0x577726=Math[_0x18166f(0x29a)](_0x148ad4/0x2)-0x18;let _0x4b422a=_0x1baf58,_0x5c23e8=Math[_0x18166f(0x29a)]((this['innerHeight']-Math[_0x18166f(0x240)](_0x580248['length']/0x2)*_0x5e1419)/0x2),_0x140cae=0x0;for(const _0x17c85e of _0x580248){this[_0x18166f(0x341)](_0x4b422a,_0x5c23e8,_0x577726,_0x17c85e),_0x140cae++,_0x140cae%0x2===0x0?(_0x4b422a=_0x1baf58,_0x5c23e8+=_0x5e1419):_0x4b422a+=_0x577726+0x18;}}this[_0x18166f(0x2d7)]();},Window_SkillStatus[_0x1d51ec(0x18f)][_0x1d51ec(0x341)]=function(_0x3264a1,_0x51815f,_0x5e8ca6,_0x27a6ca){const _0xb20680=_0x1d51ec,_0x3692e2=this['gaugeLineHeight']();this[_0xb20680(0x2d7)](),this[_0xb20680(0x307)](_0x3264a1,_0x51815f,_0x5e8ca6,_0x27a6ca,!![]),this[_0xb20680(0x255)](),this[_0xb20680(0x185)][_0xb20680(0x346)]-=0x8;const _0x47f84f=this[_0xb20680(0x1f7)][_0xb20680(0x25f)](_0x27a6ca,!![]);this[_0xb20680(0x185)]['drawText'](_0x47f84f,_0x3264a1,_0x51815f,_0x5e8ca6,_0x3692e2,_0xb20680(0x15e));},VisuMZ['SkillsStatesCore'][_0x1d51ec(0x1ac)]=Window_SkillList['prototype'][_0x1d51ec(0x1ae)],Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x1ae)]=function(_0x4b27d8){const _0x1c5048=_0x1d51ec;return this[_0x1c5048(0x24f)](_0x4b27d8);},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2e8)]=Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x242)],Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x242)]=function(){const _0x9cd8db=_0x1d51ec;return SceneManager['_scene'][_0x9cd8db(0x349)]===Scene_Battle?VisuMZ[_0x9cd8db(0x312)][_0x9cd8db(0x2e8)][_0x9cd8db(0x23c)](this):VisuMZ['SkillsStatesCore'][_0x9cd8db(0x34f)]['Skills']['ListWindowCols'];},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x2d1)]=Window_SkillList['prototype'][_0x1d51ec(0x2b8)],Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x2b8)]=function(_0x5089eb){const _0x494210=_0x1d51ec,_0x1b00a7=this[_0x494210(0x1f7)]!==_0x5089eb;VisuMZ[_0x494210(0x312)][_0x494210(0x2d1)][_0x494210(0x23c)](this,_0x5089eb),_0x1b00a7&&(this[_0x494210(0x20d)]&&this['_statusWindow'][_0x494210(0x349)]===Window_ShopStatus&&this[_0x494210(0x20d)][_0x494210(0x19a)](this['itemAt'](0x0)));},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x256)]=function(_0x1a7494){const _0x1caa22=_0x1d51ec;if(this[_0x1caa22(0x199)]===_0x1a7494)return;this[_0x1caa22(0x199)]=_0x1a7494,this[_0x1caa22(0x268)](),this['scrollTo'](0x0,0x0),this[_0x1caa22(0x20d)]&&this[_0x1caa22(0x20d)][_0x1caa22(0x349)]===Window_ShopStatus&&this['_statusWindow'][_0x1caa22(0x19a)](this[_0x1caa22(0x1ce)](0x0));},Window_SkillList['prototype']['includesSkillsStatesCore']=function(_0x4949f2){const _0x2a7f3b=_0x1d51ec;if(!_0x4949f2)return VisuMZ['SkillsStatesCore']['Window_SkillList_includes'][_0x2a7f3b(0x23c)](this,_0x4949f2);if(!this['checkSkillTypeMatch'](_0x4949f2))return![];if(!this[_0x2a7f3b(0x1d4)](_0x4949f2))return![];if(!this[_0x2a7f3b(0x16b)](_0x4949f2))return![];return!![];},Window_SkillList['prototype'][_0x1d51ec(0x233)]=function(_0x1d8b2b){const _0x3c4821=_0x1d51ec;return DataManager['getSkillTypes'](_0x1d8b2b)[_0x3c4821(0x1ae)](this[_0x3c4821(0x199)]);},Window_SkillList['prototype'][_0x1d51ec(0x1d4)]=function(_0x1f9239){const _0x471a0c=_0x1d51ec;if(!this[_0x471a0c(0x36d)](_0x1f9239))return![];if(!this[_0x471a0c(0x2d6)](_0x1f9239))return![];if(!this[_0x471a0c(0x184)](_0x1f9239))return![];return!![];},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x36d)]=function(_0x3287f6){const _0x51c28f=_0x1d51ec,_0x2c16ce=_0x3287f6['note'];if(_0x2c16ce[_0x51c28f(0x198)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x51c28f(0x331)]())return![];else return _0x2c16ce[_0x51c28f(0x198)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x51c28f(0x331)]()?![]:!![];},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x2d6)]=function(_0x138338){const _0x4cc096=_0x1d51ec,_0x1c737d=_0x138338['note'];if(_0x1c737d[_0x4cc096(0x198)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45aadc=JSON[_0x4cc096(0x247)]('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x1d1b72 of _0x45aadc){if(!$gameSwitches['value'](_0x1d1b72))return![];}return!![];}if(_0x1c737d[_0x4cc096(0x198)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20fcbc=JSON['parse']('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x642af of _0x20fcbc){if(!$gameSwitches[_0x4cc096(0x321)](_0x642af))return![];}return!![];}if(_0x1c737d['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bdc24=JSON['parse']('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x1a3269 of _0x2bdc24){if($gameSwitches[_0x4cc096(0x321)](_0x1a3269))return!![];}return![];}if(_0x1c737d[_0x4cc096(0x198)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38e18e=JSON[_0x4cc096(0x247)]('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x2f4a64 of _0x38e18e){if(!$gameSwitches['value'](_0x2f4a64))return!![];}return![];}if(_0x1c737d[_0x4cc096(0x198)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34fd54=JSON['parse']('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x115c2a of _0x34fd54){if(!$gameSwitches['value'](_0x115c2a))return!![];}return![];}if(_0x1c737d[_0x4cc096(0x198)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x180af5=JSON[_0x4cc096(0x247)]('['+RegExp['$1'][_0x4cc096(0x198)](/\d+/g)+']');for(const _0x4ca958 of _0x180af5){if($gameSwitches[_0x4cc096(0x321)](_0x4ca958))return![];}return!![];}return!![];},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x184)]=function(_0x1ebb19){const _0xbde022=_0x1d51ec,_0x4bffc9=_0x1ebb19['note'];if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x271349=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x3efe38 of _0x271349){if(!this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x3efe38))return![];}return!![];}else{if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x49c6a5=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x4b7ce3 of _0x49c6a5){const _0x4c27ce=DataManager[_0xbde022(0x1fc)](_0x4b7ce3);if(!_0x4c27ce)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x4c27ce))return![];}return!![];}}if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c3205=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x38c789 of _0x2c3205){if(!this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x38c789))return![];}return!![];}else{if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1ad54e=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x2ba1c6 of _0x1ad54e){const _0x4aedc1=DataManager['getSkillIdWithName'](_0x2ba1c6);if(!_0x4aedc1)continue;if(!this['_actor'][_0xbde022(0x334)](_0x4aedc1))return![];}return!![];}}if(_0x4bffc9['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7858e0=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x5ce7c6 of _0x7858e0){if(this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x5ce7c6))return!![];}return![];}else{if(_0x4bffc9['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5f39b7=RegExp['$1'][_0xbde022(0x339)](',');for(const _0xb390e4 of _0x5f39b7){const _0x59cb13=DataManager['getSkillIdWithName'](_0xb390e4);if(!_0x59cb13)continue;if(this[_0xbde022(0x1f7)]['isLearnedSkill'](_0x59cb13))return!![];}return![];}}if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x37ac67=JSON[_0xbde022(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3a3794 of _0x37ac67){if(!this['_actor'][_0xbde022(0x334)](_0x3a3794))return!![];}return![];}else{if(_0x4bffc9['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xcf7aeb=RegExp['$1']['split'](',');for(const _0x2d0945 of _0xcf7aeb){const _0x1705cb=DataManager[_0xbde022(0x1fc)](_0x2d0945);if(!_0x1705cb)continue;if(!this[_0xbde022(0x1f7)]['isLearnedSkill'](_0x1705cb))return!![];}return![];}}if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2125ac=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x562ef1 of _0x2125ac){if(!this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x562ef1))return!![];}return![];}else{if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x48cd8a=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x5b3808 of _0x48cd8a){const _0x2f12f3=DataManager['getSkillIdWithName'](_0x5b3808);if(!_0x2f12f3)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x2f12f3))return!![];}return![];}}if(_0x4bffc9['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f8a00=JSON[_0xbde022(0x247)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x17b092 of _0x4f8a00){if(this[_0xbde022(0x1f7)][_0xbde022(0x334)](_0x17b092))return![];}return!![];}else{if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x19f2c6=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x2478a3 of _0x19f2c6){const _0x510a18=DataManager[_0xbde022(0x1fc)](_0x2478a3);if(!_0x510a18)continue;if(this['_actor'][_0xbde022(0x334)](_0x510a18))return![];}return!![];}}if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f5a6e=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x33f72c of _0x2f5a6e){if(!this[_0xbde022(0x1f7)]['hasSkill'](_0x33f72c))return![];}return!![];}else{if(_0x4bffc9['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x434fbc=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x1bbff1 of _0x434fbc){const _0x30cfa1=DataManager[_0xbde022(0x1fc)](_0x1bbff1);if(!_0x30cfa1)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x30cfa1))return![];}return!![];}}if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e425f=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x15dcff of _0x4e425f){if(!this['_actor']['hasSkill'](_0x15dcff))return![];}return!![];}else{if(_0x4bffc9['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2be5df=RegExp['$1']['split'](',');for(const _0x3f83ac of _0x2be5df){const _0x285bff=DataManager['getSkillIdWithName'](_0x3f83ac);if(!_0x285bff)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x285bff))return![];}return!![];}}if(_0x4bffc9[_0xbde022(0x198)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38a5a2=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x19cfda of _0x38a5a2){if(this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x19cfda))return!![];}return![];}else{if(_0x4bffc9['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5e93a5=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x54ecbb of _0x5e93a5){const _0x411237=DataManager[_0xbde022(0x1fc)](_0x54ecbb);if(!_0x411237)continue;if(this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x411237))return!![];}return![];}}if(_0x4bffc9['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b3697=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x330cba of _0x4b3697){if(!this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x330cba))return!![];}return![];}else{if(_0x4bffc9['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x58e57a=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x12bb00 of _0x58e57a){const _0x4709b4=DataManager['getSkillIdWithName'](_0x12bb00);if(!_0x4709b4)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x4709b4))return!![];}return![];}}if(_0x4bffc9['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23f179=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x1c8d8c of _0x23f179){if(!this['_actor'][_0xbde022(0x1c1)](_0x1c8d8c))return!![];}return![];}else{if(_0x4bffc9['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x7b0b9d=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x39e600 of _0x7b0b9d){const _0x3179a5=DataManager[_0xbde022(0x1fc)](_0x39e600);if(!_0x3179a5)continue;if(!this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x3179a5))return!![];}return![];}}if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x172c72=JSON[_0xbde022(0x247)]('['+RegExp['$1'][_0xbde022(0x198)](/\d+/g)+']');for(const _0x39ddb7 of _0x172c72){if(this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x39ddb7))return![];}return!![];}else{if(_0x4bffc9[_0xbde022(0x198)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x366ee6=RegExp['$1'][_0xbde022(0x339)](',');for(const _0x118236 of _0x366ee6){const _0x3fc4dc=DataManager[_0xbde022(0x1fc)](_0x118236);if(!_0x3fc4dc)continue;if(this[_0xbde022(0x1f7)][_0xbde022(0x1c1)](_0x3fc4dc))return![];}return!![];}}return!![];},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x16b)]=function(_0x121288){const _0x283fe1=_0x1d51ec,_0x28ae52=_0x121288['note'],_0x2cc7c5=VisuMZ[_0x283fe1(0x312)]['skillVisibleJS'];return _0x2cc7c5[_0x121288['id']]?_0x2cc7c5[_0x121288['id']][_0x283fe1(0x23c)](this,_0x121288):!![];},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x2af)]=function(_0x2c1ae3,_0x5d3084,_0x5a9699,_0x3a79e9){const _0x36215c=_0x1d51ec;Window_Base[_0x36215c(0x18f)]['drawSkillCost'][_0x36215c(0x23c)](this,this['_actor'],_0x2c1ae3,_0x5d3084,_0x5a9699,_0x3a79e9);},Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x243)]=function(_0x321dab){const _0x356d50=_0x1d51ec;this[_0x356d50(0x20d)]=_0x321dab,this[_0x356d50(0x1bb)]();},VisuMZ[_0x1d51ec(0x312)][_0x1d51ec(0x1fd)]=Window_SkillList['prototype'][_0x1d51ec(0x14c)],Window_SkillList[_0x1d51ec(0x18f)][_0x1d51ec(0x14c)]=function(){const _0x5c80be=_0x1d51ec;VisuMZ[_0x5c80be(0x312)]['Window_SkillList_updateHelp'][_0x5c80be(0x23c)](this),this[_0x5c80be(0x20d)]&&this['_statusWindow'][_0x5c80be(0x349)]===Window_ShopStatus&&this[_0x5c80be(0x20d)]['setItem'](this[_0x5c80be(0x1ef)]());};