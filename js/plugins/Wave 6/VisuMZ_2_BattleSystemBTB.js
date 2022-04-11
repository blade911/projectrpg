//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * ---
 * 
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
 * @default true
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
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x201c49=_0x497f;function _0x497f(_0xcc73ad,_0x49c890){const _0x394bb0=_0x394b();return _0x497f=function(_0x497f4c,_0x5e64fa){_0x497f4c=_0x497f4c-0x1ec;let _0x17ec4d=_0x394bb0[_0x497f4c];return _0x17ec4d;},_0x497f(_0xcc73ad,_0x49c890);}(function(_0x3cca51,_0x516ce6){const _0x28dc2d=_0x497f,_0x933b19=_0x3cca51();while(!![]){try{const _0x5b506a=-parseInt(_0x28dc2d(0x302))/0x1+parseInt(_0x28dc2d(0x3fb))/0x2+-parseInt(_0x28dc2d(0x3f2))/0x3+parseInt(_0x28dc2d(0x3d6))/0x4*(parseInt(_0x28dc2d(0x3e3))/0x5)+-parseInt(_0x28dc2d(0x49c))/0x6*(-parseInt(_0x28dc2d(0x2ff))/0x7)+parseInt(_0x28dc2d(0x37e))/0x8*(-parseInt(_0x28dc2d(0x389))/0x9)+parseInt(_0x28dc2d(0x259))/0xa;if(_0x5b506a===_0x516ce6)break;else _0x933b19['push'](_0x933b19['shift']());}catch(_0x1dcbee){_0x933b19['push'](_0x933b19['shift']());}}}(_0x394b,0xc7bb7));var label=_0x201c49(0x356),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x201c49(0x2bb)](function(_0x2dfc79){const _0x432837=_0x201c49;return _0x2dfc79[_0x432837(0x3a5)]&&_0x2dfc79[_0x432837(0x2fb)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x201c49(0x225)]=VisuMZ[label][_0x201c49(0x225)]||{},VisuMZ[_0x201c49(0x483)]=function(_0x173225,_0x39cf19){const _0x911c30=_0x201c49;for(const _0x5bbf39 in _0x39cf19){if(_0x5bbf39[_0x911c30(0x36b)](/(.*):(.*)/i)){if('irStL'!==_0x911c30(0x493)){const _0x393be2=String(RegExp['$1']),_0x1936e0=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x2af387,_0x264f8c,_0x5b15da;switch(_0x1936e0){case'NUM':_0x2af387=_0x39cf19[_0x5bbf39]!==''?Number(_0x39cf19[_0x5bbf39]):0x0;break;case'ARRAYNUM':_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c[_0x911c30(0x23c)](_0x1bffef=>Number(_0x1bffef));break;case'EVAL':_0x2af387=_0x39cf19[_0x5bbf39]!==''?eval(_0x39cf19[_0x5bbf39]):null;break;case _0x911c30(0x392):_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c[_0x911c30(0x23c)](_0x259320=>eval(_0x259320));break;case'JSON':_0x2af387=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):'';break;case _0x911c30(0x3b0):_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c[_0x911c30(0x23c)](_0x55702a=>JSON[_0x911c30(0x462)](_0x55702a));break;case _0x911c30(0x38d):_0x2af387=_0x39cf19[_0x5bbf39]!==''?new Function(JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39])):new Function(_0x911c30(0x1f8));break;case _0x911c30(0x344):_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON['parse'](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c[_0x911c30(0x23c)](_0x52e9e0=>new Function(JSON[_0x911c30(0x462)](_0x52e9e0)));break;case _0x911c30(0x467):_0x2af387=_0x39cf19[_0x5bbf39]!==''?String(_0x39cf19[_0x5bbf39]):'';break;case'ARRAYSTR':_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c['map'](_0x6e2e6=>String(_0x6e2e6));break;case _0x911c30(0x219):_0x5b15da=_0x39cf19[_0x5bbf39]!==''?JSON['parse'](_0x39cf19[_0x5bbf39]):{},_0x2af387=VisuMZ[_0x911c30(0x483)]({},_0x5b15da);break;case _0x911c30(0x2fd):_0x264f8c=_0x39cf19[_0x5bbf39]!==''?JSON[_0x911c30(0x462)](_0x39cf19[_0x5bbf39]):[],_0x2af387=_0x264f8c[_0x911c30(0x23c)](_0x39c235=>VisuMZ[_0x911c30(0x483)]({},JSON[_0x911c30(0x462)](_0x39c235)));break;default:continue;}_0x173225[_0x393be2]=_0x2af387;}else{const _0x50f621=_0x176e6f(_0x54187c['$1']);_0x50f621<_0x1842ec?(_0x286a63('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4fbd86,_0x50f621,_0x589220)),_0x45fa9b[_0x911c30(0x37a)]()):_0x1f634d=_0x16a5f5[_0x911c30(0x391)](_0x50f621,_0x35ac8d);}}}return _0x173225;},(_0x4a6778=>{const _0x30134e=_0x201c49,_0x19476f=_0x4a6778[_0x30134e(0x3f5)];for(const _0x4c1216 of dependencies){if(!Imported[_0x4c1216]){alert(_0x30134e(0x3de)[_0x30134e(0x37d)](_0x19476f,_0x4c1216)),SceneManager[_0x30134e(0x37a)]();break;}}const _0x46d719=_0x4a6778[_0x30134e(0x2fb)];if(_0x46d719[_0x30134e(0x36b)](/\[Version[ ](.*?)\]/i)){const _0x2eee52=Number(RegExp['$1']);_0x2eee52!==VisuMZ[label][_0x30134e(0x29d)]&&(alert(_0x30134e(0x45d)[_0x30134e(0x37d)](_0x19476f,_0x2eee52)),SceneManager[_0x30134e(0x37a)]());}if(_0x46d719['match'](/\[Tier[ ](\d+)\]/i)){const _0x28062a=Number(RegExp['$1']);if(_0x28062a<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x30134e(0x37d)](_0x19476f,_0x28062a,tier)),SceneManager[_0x30134e(0x37a)]();else{if(_0x30134e(0x317)!=='JFmhf')tier=Math[_0x30134e(0x391)](_0x28062a,tier);else{const _0x2f0f6c=_0x31e3ed[_0x30134e(0x356)][_0x30134e(0x225)][_0x30134e(0x44d)],_0x3ed5cd=this[_0x30134e(0x433)]();return _0x2f0f6c['%1_offsetY'['format'](_0x3ed5cd)]||0x0;}}}VisuMZ[_0x30134e(0x483)](VisuMZ[label][_0x30134e(0x225)],_0x4a6778[_0x30134e(0x460)]);})(pluginData),PluginManager[_0x201c49(0x200)](pluginData[_0x201c49(0x3f5)],_0x201c49(0x3df),_0x15335d=>{const _0x25c38=_0x201c49;VisuMZ[_0x25c38(0x483)](_0x15335d,_0x15335d);const _0x5c56b1=_0x15335d[_0x25c38(0x24a)],_0x288175=_0x15335d[_0x25c38(0x425)];for(const _0x1b751a of _0x5c56b1){const _0x33d158=$gameActors[_0x25c38(0x1f6)](_0x1b751a);if(!_0x33d158)continue;_0x33d158['_btbTurnOrderGraphicType']='icon',_0x33d158['_btbTurnOrderIconIndex']=_0x288175;}}),PluginManager[_0x201c49(0x200)](pluginData[_0x201c49(0x3f5)],_0x201c49(0x267),_0x3cbfdb=>{const _0x1c8259=_0x201c49;VisuMZ[_0x1c8259(0x483)](_0x3cbfdb,_0x3cbfdb);const _0x5c5337=_0x3cbfdb[_0x1c8259(0x24a)],_0x2f7e17=_0x3cbfdb[_0x1c8259(0x34b)],_0x5a9b5a=_0x3cbfdb[_0x1c8259(0x2a7)];for(const _0x588827 of _0x5c5337){if(_0x1c8259(0x30d)===_0x1c8259(0x221)){if(!_0x595732[_0x1c8259(0x2df)]())return;this['_btbTurnOrderWindow']=new _0xd583eb();const _0x12cc9e=this['getChildIndex'](this[_0x1c8259(0x3e5)]);this['addChildAt'](this[_0x1c8259(0x2c2)],_0x12cc9e),this[_0x1c8259(0x2d6)](),_0x4afd7f[_0x1c8259(0x4a3)](!![]);}else{const _0x48c289=$gameActors[_0x1c8259(0x1f6)](_0x588827);if(!_0x48c289)continue;_0x48c289['_btbTurnOrderGraphicType']=_0x1c8259(0x46e),_0x48c289[_0x1c8259(0x441)]=_0x2f7e17,_0x48c289[_0x1c8259(0x406)]=_0x5a9b5a;}}}),PluginManager[_0x201c49(0x200)](pluginData[_0x201c49(0x3f5)],'BtbTurnOrderClearActorGraphic',_0x25fe99=>{const _0x33b309=_0x201c49;VisuMZ['ConvertParams'](_0x25fe99,_0x25fe99);const _0x322f95=_0x25fe99[_0x33b309(0x24a)];for(const _0x262f9b of _0x322f95){const _0x80878a=$gameActors[_0x33b309(0x1f6)](_0x262f9b);if(!_0x80878a)continue;_0x80878a[_0x33b309(0x482)]();}}),PluginManager[_0x201c49(0x200)](pluginData[_0x201c49(0x3f5)],_0x201c49(0x3c8),_0x5644ac=>{const _0x3b1a12=_0x201c49;VisuMZ[_0x3b1a12(0x483)](_0x5644ac,_0x5644ac);const _0x458239=_0x5644ac[_0x3b1a12(0x3b6)],_0x4d096a=_0x5644ac[_0x3b1a12(0x425)];for(const _0x417655 of _0x458239){const _0x120ac0=$gameTroop['members']()[_0x417655];if(!_0x120ac0)continue;_0x120ac0[_0x3b1a12(0x480)]='icon',_0x120ac0[_0x3b1a12(0x2d2)]=_0x4d096a;}}),PluginManager[_0x201c49(0x200)](pluginData[_0x201c49(0x3f5)],_0x201c49(0x242),_0x577f74=>{const _0x4dd283=_0x201c49;VisuMZ['ConvertParams'](_0x577f74,_0x577f74);const _0x3c0fb1=_0x577f74[_0x4dd283(0x3b6)],_0x2fa689=_0x577f74[_0x4dd283(0x34b)],_0x468893=_0x577f74[_0x4dd283(0x2a7)];for(const _0x40625f of _0x3c0fb1){if('gnTYK'!=='gnTYK')return this[_0x4dd283(0x361)]();else{const _0x409a47=$gameTroop['members']()[_0x40625f];if(!_0x409a47)continue;_0x409a47[_0x4dd283(0x480)]='face',_0x409a47[_0x4dd283(0x441)]=_0x2fa689,_0x409a47[_0x4dd283(0x406)]=_0x468893;}}}),PluginManager[_0x201c49(0x200)](pluginData['name'],_0x201c49(0x1ff),_0x3cf0b2=>{const _0x2068f5=_0x201c49;VisuMZ[_0x2068f5(0x483)](_0x3cf0b2,_0x3cf0b2);const _0x315c29=_0x3cf0b2['Enemies'];for(const _0x39a76a of _0x315c29){const _0x2471f7=$gameTroop[_0x2068f5(0x423)]()[_0x39a76a];if(!_0x2471f7)continue;_0x2471f7[_0x2068f5(0x482)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x201c49(0x33e),_0x4055bb=>{const _0x5112c4=_0x201c49;VisuMZ[_0x5112c4(0x483)](_0x4055bb,_0x4055bb);const _0x3676d6=_0x4055bb[_0x5112c4(0x2fa)];$gameSystem['setBattleSystemBTBTurnOrderVisible'](_0x3676d6);}),VisuMZ['BattleSystemBTB'][_0x201c49(0x256)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x201c49(0x356)][_0x201c49(0x249)]=Scene_Boot[_0x201c49(0x33b)][_0x201c49(0x32d)],Scene_Boot[_0x201c49(0x33b)]['onDatabaseLoaded']=function(){const _0x1e4685=_0x201c49;VisuMZ[_0x1e4685(0x356)][_0x1e4685(0x249)][_0x1e4685(0x22d)](this),this['process_VisuMZ_BattleSystemBTB']();},Scene_Boot['prototype'][_0x201c49(0x348)]=function(){const _0x144b01=_0x201c49;this[_0x144b01(0x372)](),this[_0x144b01(0x298)]();},Scene_Boot[_0x201c49(0x33b)][_0x201c49(0x372)]=function(){const _0x93293=_0x201c49;if(VisuMZ[_0x93293(0x49a)])return;const _0x2abd79=$dataSkills[_0x93293(0x262)]($dataItems);for(const _0x9badd2 of _0x2abd79){if(!_0x9badd2)continue;DataManager[_0x93293(0x2d0)](_0x9badd2);}},VisuMZ[_0x201c49(0x356)]['JS']={},Scene_Boot[_0x201c49(0x33b)][_0x201c49(0x298)]=function(){const _0x4b9c3d=_0x201c49;if(VisuMZ[_0x4b9c3d(0x49a)])return;const _0x49fea2=VisuMZ[_0x4b9c3d(0x356)][_0x4b9c3d(0x256)],_0x2e6654=$dataSkills[_0x4b9c3d(0x262)](dataItems);for(const _0x43e944 of _0x2e6654){if(!_0x43e944)continue;VisuMZ['BattleSystemBTB'][_0x4b9c3d(0x253)](_0x43e944,_0x4b9c3d(0x228)),VisuMZ['BattleSystemBTB'][_0x4b9c3d(0x253)](_0x43e944,_0x4b9c3d(0x325));}},VisuMZ[_0x201c49(0x356)]['Parse_Notetags_BravePointsUserJS']=function(_0x4c3e15,_0x3cec63){const _0x1dfed4=_0x201c49,_0x37e0fc=VisuMZ['BattleSystemBTB']['RegExp'][_0x3cec63],_0xf184b8=_0x4c3e15[_0x1dfed4(0x337)];if(_0xf184b8[_0x1dfed4(0x36b)](_0x37e0fc)){if('EksYU'===_0x1dfed4(0x2ed))this[_0x1dfed4(0x287)](_0x83830d)&&(_0x4ec2af=_0x13eaf4,_0x36cd66=_0x46e89b[_0x360dc0]);else{const _0x5a33c1=String(RegExp['$1']),_0x9c9c7c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1dfed4(0x37d)](_0x5a33c1),_0x5a413d=VisuMZ[_0x1dfed4(0x356)][_0x1dfed4(0x3be)](_0x4c3e15,_0x3cec63);VisuMZ[_0x1dfed4(0x356)]['JS'][_0x5a413d]=new Function(_0x9c9c7c);}}},VisuMZ[_0x201c49(0x356)][_0x201c49(0x3be)]=function(_0x22698b,_0x397a82){const _0x3627df=_0x201c49;let _0x532d13='';if($dataActors['includes'](_0x22698b))_0x532d13=_0x3627df(0x260)[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataClasses[_0x3627df(0x414)](_0x22698b))_0x532d13=_0x3627df(0x27e)[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataSkills[_0x3627df(0x414)](_0x22698b))_0x532d13=_0x3627df(0x32f)[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataItems['includes'](_0x22698b))_0x532d13='Item-%1-%2'[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataWeapons[_0x3627df(0x414)](_0x22698b))_0x532d13=_0x3627df(0x34e)[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataArmors['includes'](_0x22698b))_0x532d13=_0x3627df(0x235)['format'](_0x22698b['id'],_0x397a82);if($dataEnemies[_0x3627df(0x414)](_0x22698b))_0x532d13=_0x3627df(0x30c)[_0x3627df(0x37d)](_0x22698b['id'],_0x397a82);if($dataStates[_0x3627df(0x414)](_0x22698b))_0x532d13=_0x3627df(0x20b)['format'](_0x22698b['id'],_0x397a82);return _0x532d13;},VisuMZ[_0x201c49(0x356)]['ParseSkillNotetags']=VisuMZ[_0x201c49(0x345)],VisuMZ[_0x201c49(0x345)]=function(_0x5f306b){const _0x5cf5dd=_0x201c49;VisuMZ[_0x5cf5dd(0x356)][_0x5cf5dd(0x345)]['call'](this,_0x5f306b),DataManager[_0x5cf5dd(0x2d0)](_0x5f306b),VisuMZ[_0x5cf5dd(0x356)][_0x5cf5dd(0x253)](_0x5f306b,_0x5cf5dd(0x228)),VisuMZ[_0x5cf5dd(0x356)][_0x5cf5dd(0x253)](_0x5f306b,_0x5cf5dd(0x325));},VisuMZ[_0x201c49(0x356)][_0x201c49(0x31a)]=VisuMZ[_0x201c49(0x31a)],VisuMZ[_0x201c49(0x31a)]=function(_0x72a5f3){const _0x7dc0db=_0x201c49;VisuMZ[_0x7dc0db(0x356)][_0x7dc0db(0x31a)][_0x7dc0db(0x22d)](this,_0x72a5f3),DataManager[_0x7dc0db(0x2d0)](_0x72a5f3),VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'](_0x72a5f3,_0x7dc0db(0x228)),VisuMZ[_0x7dc0db(0x356)][_0x7dc0db(0x253)](_0x72a5f3,_0x7dc0db(0x325));},DataManager[_0x201c49(0x1ef)]=function(_0x1f6208){const _0x16bc3b=_0x201c49;_0x1f6208=_0x1f6208[_0x16bc3b(0x28f)]()[_0x16bc3b(0x2b6)](),this['_skillIDs']=this[_0x16bc3b(0x3a3)]||{};if(this['_skillIDs'][_0x1f6208])return this['_skillIDs'][_0x1f6208];for(const _0x42fa94 of $dataSkills){if(!_0x42fa94)continue;this[_0x16bc3b(0x3a3)][_0x42fa94['name'][_0x16bc3b(0x28f)]()[_0x16bc3b(0x2b6)]()]=_0x42fa94['id'];}return this['_skillIDs'][_0x1f6208]||0x0;},DataManager[_0x201c49(0x394)]=function(_0x328177){const _0x4f3f21=_0x201c49;_0x328177=_0x328177[_0x4f3f21(0x28f)]()['trim'](),this[_0x4f3f21(0x39f)]=this[_0x4f3f21(0x39f)]||{};if(this['_itemIDs'][_0x328177])return this[_0x4f3f21(0x39f)][_0x328177];for(const _0x3f95c1 of $dataItems){if(!_0x3f95c1)continue;this[_0x4f3f21(0x39f)][_0x3f95c1[_0x4f3f21(0x3f5)][_0x4f3f21(0x28f)]()[_0x4f3f21(0x2b6)]()]=_0x3f95c1['id'];}return this['_itemIDs'][_0x328177]||0x0;},DataManager['_btbSkillFlexFusion']={},DataManager[_0x201c49(0x3b7)]={},DataManager[_0x201c49(0x4ad)]={},DataManager[_0x201c49(0x393)]={},DataManager[_0x201c49(0x2d0)]=function(_0x1762e3){const _0xe3c08f=_0x201c49;if(!_0x1762e3)return;const _0x2adfda=VisuMZ['BattleSystemBTB']['RegExp'],_0x4970d7=_0x1762e3['note'],_0x1f829c=DataManager[_0xe3c08f(0x320)](_0x1762e3),_0x54b285=_0x4970d7[_0xe3c08f(0x36b)](_0x2adfda[_0xe3c08f(0x41a)]);if(_0x54b285)for(const _0x22558d of _0x54b285){if('uqhbT'===_0xe3c08f(0x336))_0x19f3ca[_0xe3c08f(0x356)][_0xe3c08f(0x376)][_0xe3c08f(0x22d)](this,_0x25a6b2),_0x5a639d[_0xe3c08f(0x475)]()&&_0x5d01dc[_0xe3c08f(0x2ef)]()&&_0x37eae5['_actionBattlers'][_0xe3c08f(0x211)](_0x35e1c5[_0xe3c08f(0x1f6)](_0x11d735));else{if(!_0x22558d)continue;_0x22558d['match'](_0x2adfda['FusionFlex']);const _0xaea0e4=String(RegExp['$1'])[_0xe3c08f(0x43a)](','),_0x3125c4=this[_0xe3c08f(0x381)](_0xaea0e4,_0x1f829c)[_0xe3c08f(0x499)]((_0x56781f,_0x503dc6)=>_0x56781f-_0x503dc6);if(_0x3125c4[_0xe3c08f(0x2cc)]<=0x1)continue;const _0x3226d2=_0x3125c4[_0xe3c08f(0x464)]('-'),_0x16faf9=_0x1f829c?DataManager[_0xe3c08f(0x424)]:DataManager['_btbItemFlexFusion'];_0x16faf9[_0x3226d2]=_0x1762e3['id'];}}const _0x2d6c38=_0x4970d7[_0xe3c08f(0x36b)](_0x2adfda[_0xe3c08f(0x283)]);if(_0x2d6c38){if(_0xe3c08f(0x331)!==_0xe3c08f(0x452))for(const _0x30c78c of _0x2d6c38){if(!_0x30c78c)continue;_0x30c78c[_0xe3c08f(0x36b)](_0x2adfda[_0xe3c08f(0x283)]);const _0x2cb7f9=String(RegExp['$1'])[_0xe3c08f(0x43a)](','),_0x4a2a35=this[_0xe3c08f(0x381)](_0x2cb7f9,_0x1f829c);if(_0x4a2a35[_0xe3c08f(0x2cc)]<=0x1)continue;const _0xf9d079=_0x4a2a35[_0xe3c08f(0x464)]('-'),_0x4d90b0=_0x1f829c?DataManager[_0xe3c08f(0x424)]:DataManager[_0xe3c08f(0x4ad)];_0x4d90b0[_0xf9d079]=_0x1762e3['id'];}else this[_0xe3c08f(0x2d2)]=_0x3552f3;}},DataManager[_0x201c49(0x381)]=function(_0x2e7f26,_0x4058ca){const _0x5a6725=_0x201c49,_0x44c3af=[];for(let _0x22e524 of _0x2e7f26){_0x22e524=(String(_0x22e524)||'')[_0x5a6725(0x2b6)]();const _0x4efd11=/^\d+$/['test'](_0x22e524);if(_0x4efd11)_0x44c3af[_0x5a6725(0x265)](Number(_0x22e524));else{if(_0x4058ca){if(_0x5a6725(0x49d)!==_0x5a6725(0x49d)){if(!_0xadeda9&&_0x577bba['id']===_0x105093[_0x5a6725(0x29a)]())return _0x4fea05;if(!_0x5a5732&&_0x2ed930['id']===_0x519620['guardSkillId']())return _0x2c0487;}else _0x44c3af[_0x5a6725(0x265)](DataManager[_0x5a6725(0x1ef)](_0x22e524));}else _0x44c3af[_0x5a6725(0x265)](DataManager['getItemIdWithName'](_0x22e524));}}return _0x44c3af;},ImageManager[_0x201c49(0x44b)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x42b)]['BravePointsIcon'],ImageManager[_0x201c49(0x31c)]=ImageManager[_0x201c49(0x31c)]||0x9,ImageManager['svActorVertCells']=ImageManager['svActorVertCells']||0x6,TextManager[_0x201c49(0x2b4)]=VisuMZ[_0x201c49(0x356)]['Settings'][_0x201c49(0x42b)]['BravePointsFull'],TextManager[_0x201c49(0x21b)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)]['General'][_0x201c49(0x48e)],TextManager['btbCostFormat']=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x42b)][_0x201c49(0x374)],TextManager[_0x201c49(0x22a)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x44d)][_0x201c49(0x351)],TextManager['btbActionSlot']=VisuMZ['BattleSystemBTB']['Settings'][_0x201c49(0x44d)][_0x201c49(0x43d)],TextManager[_0x201c49(0x2b0)]=VisuMZ['BattleSystemBTB'][_0x201c49(0x225)][_0x201c49(0x44d)][_0x201c49(0x248)],SceneManager[_0x201c49(0x475)]=function(){const _0x31c5fe=_0x201c49;return this['_scene']&&this[_0x31c5fe(0x489)]['constructor']===Scene_Battle;},VisuMZ[_0x201c49(0x356)]['BattleManager_battleSys']=BattleManager['battleSys'],BattleManager[_0x201c49(0x453)]=function(){const _0x7456f8=_0x201c49;if(this[_0x7456f8(0x2df)]())return'BTB';return VisuMZ[_0x7456f8(0x356)][_0x7456f8(0x29b)]['call'](this);},BattleManager[_0x201c49(0x2df)]=function(){const _0x31d1e0=_0x201c49;return $gameSystem[_0x31d1e0(0x402)]()===_0x31d1e0(0x27f);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x213)]=BattleManager[_0x201c49(0x289)],BattleManager[_0x201c49(0x289)]=function(){const _0x537970=_0x201c49;if(this[_0x537970(0x2df)]())return![];return VisuMZ['BattleSystemBTB'][_0x537970(0x213)][_0x537970(0x22d)](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x2c9)]=BattleManager[_0x201c49(0x44f)],BattleManager[_0x201c49(0x44f)]=function(){const _0x4220ec=_0x201c49;if(this['isBTB']())return![];return VisuMZ['BattleSystemBTB'][_0x4220ec(0x2c9)]['call'](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x440)]=BattleManager[_0x201c49(0x310)],BattleManager[_0x201c49(0x310)]=function(){const _0x1465a6=_0x201c49;if(this['isBTB']())return!![];return VisuMZ[_0x1465a6(0x356)][_0x1465a6(0x440)][_0x1465a6(0x22d)](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x28a)]=BattleManager[_0x201c49(0x3d0)],BattleManager['startInput']=function(){const _0x18c618=_0x201c49;VisuMZ['BattleSystemBTB']['BattleManager_startInput'][_0x18c618(0x22d)](this),this[_0x18c618(0x2df)]()&&this[_0x18c618(0x49e)]()&&!this[_0x18c618(0x3ee)]&&$gameParty[_0x18c618(0x434)]()&&this['selectNextCommand']();},VisuMZ[_0x201c49(0x356)]['BattleManager_startTurn']=BattleManager[_0x201c49(0x32c)],BattleManager['startTurn']=function(){const _0x451b65=_0x201c49;VisuMZ['BattleSystemBTB']['BattleManager_startTurn'][_0x451b65(0x22d)](this),this['refreshStatusBTB']();},BattleManager['refreshStatusBTB']=function(){const _0x2eb38e=_0x201c49;if(!SceneManager['isSceneBattle']())return;if(!this[_0x2eb38e(0x2df)]())return;const _0x52b36b=SceneManager['_scene'];if(!_0x52b36b)return;const _0x36def4=_0x52b36b[_0x2eb38e(0x3c1)];if(!_0x36def4)return;_0x36def4[_0x2eb38e(0x48d)]();},VisuMZ[_0x201c49(0x356)][_0x201c49(0x28d)]=BattleManager['makeActionOrders'],BattleManager[_0x201c49(0x21c)]=function(){const _0x46f5db=_0x201c49;VisuMZ[_0x46f5db(0x356)][_0x46f5db(0x28d)]['call'](this),this['isBTB']()&&(this['_actionBattlers']=this[_0x46f5db(0x4a9)][_0x46f5db(0x2bb)](_0x3dd545=>_0x3dd545&&_0x3dd545[_0x46f5db(0x478)][_0x46f5db(0x2cc)]>0x0),this[_0x46f5db(0x4a3)]());},BattleManager[_0x201c49(0x318)]=function(){const _0x39d40c=_0x201c49;if(!this[_0x39d40c(0x2df)]())return;if(!SceneManager[_0x39d40c(0x475)]())return;const _0x58c34b=this[_0x39d40c(0x4a9)];for(const _0x460791 of _0x58c34b){_0x460791['makeSpeed']();}_0x58c34b[_0x39d40c(0x499)]((_0x1b2218,_0x55d970)=>_0x55d970[_0x39d40c(0x418)]()-_0x1b2218['speed']()),this['isBTB']()&&this['updateTurnOrderBTB']();},BattleManager[_0x201c49(0x332)]=function(){const _0x4d3f81=_0x201c49;if(!this[_0x4d3f81(0x2df)]())return;this[_0x4d3f81(0x4a9)]=this[_0x4d3f81(0x4a9)]||[],this[_0x4d3f81(0x4a9)]=this[_0x4d3f81(0x4a9)][_0x4d3f81(0x2bb)](_0x2546d2=>_0x2546d2&&_0x2546d2[_0x4d3f81(0x3c6)]()&&_0x2546d2[_0x4d3f81(0x3b8)]()),this['updateTurnOrderBTB']();},BattleManager[_0x201c49(0x4a3)]=function(_0x2e86af){const _0x2eb7c9=_0x201c49;if(!this[_0x2eb7c9(0x2df)]())return;const _0x337738=SceneManager[_0x2eb7c9(0x489)]['_btbTurnOrderWindow'];if(!_0x337738)return;_0x337738['updateTurnOrder'](_0x2e86af);},VisuMZ['BattleSystemBTB'][_0x201c49(0x49b)]=BattleManager[_0x201c49(0x2b8)],BattleManager[_0x201c49(0x2b8)]=function(){const _0x270595=_0x201c49;BattleManager[_0x270595(0x2df)]()&&this[_0x270595(0x243)]&&this[_0x270595(0x243)][_0x270595(0x222)](),VisuMZ[_0x270595(0x356)]['BattleManager_startAction'][_0x270595(0x22d)](this);},VisuMZ['BattleSystemBTB'][_0x201c49(0x36c)]=Game_System[_0x201c49(0x33b)][_0x201c49(0x3ad)],Game_System[_0x201c49(0x33b)]['initialize']=function(){const _0x34ad46=_0x201c49;VisuMZ['BattleSystemBTB'][_0x34ad46(0x36c)]['call'](this),this[_0x34ad46(0x34c)]();},Game_System[_0x201c49(0x33b)][_0x201c49(0x34c)]=function(){const _0x35fef1=_0x201c49;this[_0x35fef1(0x272)]=!![];},Game_System[_0x201c49(0x33b)]['isBattleSystemBTBTurnOrderVisible']=function(){const _0x2daddb=_0x201c49;return this[_0x2daddb(0x272)]===undefined&&this[_0x2daddb(0x34c)](),this[_0x2daddb(0x272)];},Game_System[_0x201c49(0x33b)][_0x201c49(0x232)]=function(_0x2a1a80){const _0x55911f=_0x201c49;this[_0x55911f(0x272)]===undefined&&this[_0x55911f(0x34c)](),this['_btbTurnOrderVisible']=_0x2a1a80;},VisuMZ[_0x201c49(0x356)][_0x201c49(0x300)]=Game_Action[_0x201c49(0x33b)]['applyItemUserEffect'],Game_Action[_0x201c49(0x33b)][_0x201c49(0x373)]=function(_0x2a0de){const _0x545366=_0x201c49;VisuMZ['BattleSystemBTB'][_0x545366(0x300)]['call'](this,_0x2a0de),this[_0x545366(0x36d)](_0x2a0de);},Game_Action[_0x201c49(0x33b)][_0x201c49(0x36d)]=function(_0x282e70){const _0x67a78a=_0x201c49;if(!BattleManager[_0x67a78a(0x2df)]())return;if(this['item']())this[_0x67a78a(0x3f3)](_0x282e70);},Game_Action['prototype'][_0x201c49(0x3f3)]=function(_0x2594ce){const _0x13e68b=_0x201c49,_0x572d09=VisuMZ['BattleSystemBTB'][_0x13e68b(0x256)],_0x378a7d=this[_0x13e68b(0x42c)]()['note'],_0x2e851d=this['item']();if(this[_0x13e68b(0x3ab)]()){if(_0x378a7d[_0x13e68b(0x36b)](_0x572d09[_0x13e68b(0x3bc)])){const _0x4754c7=Number(RegExp['$1']);this[_0x13e68b(0x3ab)]()[_0x13e68b(0x4a0)](_0x4754c7);}if(_0x378a7d[_0x13e68b(0x36b)](_0x572d09[_0x13e68b(0x301)])){const _0xa93aee=Number(RegExp['$1']);this[_0x13e68b(0x3ab)]()[_0x13e68b(0x2aa)](_0xa93aee);}const _0x447648=_0x13e68b(0x228),_0x1b1c64=VisuMZ[_0x13e68b(0x356)][_0x13e68b(0x3be)](_0x2e851d,_0x447648);if(VisuMZ['BattleSystemBTB']['JS'][_0x1b1c64]){const _0x36a92f=VisuMZ[_0x13e68b(0x356)]['JS'][_0x1b1c64]['call'](this,this[_0x13e68b(0x3ab)](),_0x2594ce,this[_0x13e68b(0x3ab)]()[_0x13e68b(0x486)]());this[_0x13e68b(0x3ab)]()['setBravePoints'](_0x36a92f);}}if(_0x2594ce){if(_0x378a7d['match'](_0x572d09[_0x13e68b(0x340)])){const _0x2ba819=Number(RegExp['$1']);_0x2594ce[_0x13e68b(0x4a0)](_0x2ba819);}if(_0x378a7d['match'](_0x572d09[_0x13e68b(0x2ea)])){if(_0x13e68b(0x26d)!==_0x13e68b(0x26d))this[_0x13e68b(0x419)](_0x4bfa1c(_0x121d84['$1']));else{const _0xdd8b85=Number(RegExp['$1']);_0x2594ce[_0x13e68b(0x2aa)](_0xdd8b85);}}const _0x8a6820=_0x13e68b(0x325),_0x1f02c4=VisuMZ['BattleSystemBTB']['createKeyJS'](_0x2e851d,_0x8a6820);if(VisuMZ[_0x13e68b(0x356)]['JS'][_0x1f02c4]){if(_0x13e68b(0x468)==='BHSgI'){const _0x177458=VisuMZ[_0x13e68b(0x356)]['JS'][_0x1f02c4][_0x13e68b(0x22d)](this,this[_0x13e68b(0x3ab)](),_0x2594ce,_0x2594ce[_0x13e68b(0x486)]());_0x2594ce['setBravePoints'](_0x177458);}else{const _0x4f2800=_0x3ad05e[_0x13e68b(0x356)][_0x13e68b(0x225)][_0x13e68b(0x44d)],_0x5e40b5=this[_0x13e68b(0x433)]();return _0x4f2800[_0x13e68b(0x201)[_0x13e68b(0x37d)](_0x5e40b5)]||0x0;}}}},VisuMZ[_0x201c49(0x356)][_0x201c49(0x46f)]=Game_Action[_0x201c49(0x33b)][_0x201c49(0x418)],Game_Action[_0x201c49(0x33b)][_0x201c49(0x418)]=function(){const _0x4bebcc=_0x201c49;return BattleManager[_0x4bebcc(0x2df)]()?VisuMZ[_0x4bebcc(0x356)]['Settings'][_0x4bebcc(0x2f2)][_0x4bebcc(0x2d7)][_0x4bebcc(0x22d)](this):_0x4bebcc(0x24d)!==_0x4bebcc(0x24d)?this[_0x4bebcc(0x2c7)]?this[_0x4bebcc(0x2c7)]['members']()[this['_index']]:null:VisuMZ[_0x4bebcc(0x356)][_0x4bebcc(0x46f)]['call'](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x291)]=Game_Action['prototype'][_0x201c49(0x362)],Game_Action['prototype'][_0x201c49(0x362)]=function(){const _0x5efec4=_0x201c49;if(BattleManager[_0x5efec4(0x2df)]())return VisuMZ[_0x5efec4(0x356)][_0x5efec4(0x225)]['Mechanics']['AllowRandomSpeed'];else{if(_0x5efec4(0x3db)!==_0x5efec4(0x239))return VisuMZ[_0x5efec4(0x356)]['Game_Action_allowRandomSpeed'][_0x5efec4(0x22d)](this);else{if(_0x103bf0[_0x5efec4(0x36b)](_0x1558b2[_0x5efec4(0x340)])){const _0x3e33e6=_0x133ed7(_0x11ed22['$1']);_0x3c656b['setBravePoints'](_0x3e33e6);}if(_0x407bc0[_0x5efec4(0x36b)](_0x1f318b[_0x5efec4(0x2ea)])){const _0x12ec06=_0x5c6c25(_0x5e5421['$1']);_0x336929[_0x5efec4(0x2aa)](_0x12ec06);}const _0x54631e=_0x5efec4(0x325),_0x21c6a7=_0x55a4e6[_0x5efec4(0x356)][_0x5efec4(0x3be)](_0x4a5a76,_0x54631e);if(_0x31aadd[_0x5efec4(0x356)]['JS'][_0x21c6a7]){const _0x42e184=_0x1dbff4['BattleSystemBTB']['JS'][_0x21c6a7]['call'](this,this['subject'](),_0x25452b,_0x251537[_0x5efec4(0x486)]());_0x2ea8ad[_0x5efec4(0x4a0)](_0x42e184);}}}},VisuMZ['BattleSystemBTB'][_0x201c49(0x44a)]=Game_Action[_0x201c49(0x33b)][_0x201c49(0x447)],Game_Action['prototype'][_0x201c49(0x447)]=function(_0x25f391){const _0x3f48c2=_0x201c49;VisuMZ[_0x3f48c2(0x356)][_0x3f48c2(0x44a)][_0x3f48c2(0x22d)](this,_0x25f391),BattleManager[_0x3f48c2(0x318)]();},VisuMZ['BattleSystemBTB'][_0x201c49(0x268)]=Game_Action[_0x201c49(0x33b)][_0x201c49(0x284)],Game_Action[_0x201c49(0x33b)]['setItem']=function(_0x3eb3ba){const _0x426d78=_0x201c49;VisuMZ['BattleSystemBTB'][_0x426d78(0x268)][_0x426d78(0x22d)](this,_0x3eb3ba),BattleManager[_0x426d78(0x318)]();},Game_Action[_0x201c49(0x33b)][_0x201c49(0x313)]=function(_0x1207df){const _0x127836=_0x201c49;this[_0x127836(0x216)]=_0x1207df;},Game_Action[_0x201c49(0x33b)]['getTotalActionFusionRecipes']=function(){const _0x33728c=_0x201c49;if(this['_actionFusionRecipe']===undefined)return 0x0;return this[_0x33728c(0x216)][_0x33728c(0x43a)]('-')[_0x33728c(0x2cc)]-0x1;},Game_Action[_0x201c49(0x33b)]['getActionFusionRecipeSkills']=function(){const _0x24aadf=_0x201c49;if(this['_actionFusionRecipe']===undefined)return[];return this[_0x24aadf(0x216)][_0x24aadf(0x43a)]('-')['map'](_0x3b1374=>$dataSkills[Number(_0x3b1374)]);},Game_Action[_0x201c49(0x33b)][_0x201c49(0x295)]=function(){const _0x16eb79=_0x201c49;if(this[_0x16eb79(0x216)]===undefined)return[];return this[_0x16eb79(0x216)]['split']('-')['map'](_0x17c52a=>$dataItems[Number(_0x17c52a)]);},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x486)]=function(){const _0x2aec23=_0x201c49;return this[_0x2aec23(0x3e4)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ[_0x201c49(0x356)]['Settings'][_0x201c49(0x2f2)]['MaxActionsDefault'],Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']=VisuMZ[_0x201c49(0x356)]['Settings'][_0x201c49(0x2f2)][_0x201c49(0x465)],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x46a)]=function(){const _0x27a1a9=_0x201c49;if(this['cannotBraveTrait']())return 0x1;if(this['hideBraveTrait']())return 0x1;const _0x3f06cf=VisuMZ[_0x27a1a9(0x356)][_0x27a1a9(0x256)],_0x3de14e=_0x3f06cf[_0x27a1a9(0x26b)];let _0x3b830c=Game_BattlerBase[_0x27a1a9(0x233)];const _0x4aa635=this[_0x27a1a9(0x2e8)]();for(const _0x25ec8d of _0x4aa635){if(!_0x25ec8d)continue;const _0x1970ad=_0x25ec8d[_0x27a1a9(0x337)];if(_0x1970ad[_0x27a1a9(0x36b)](_0x3de14e)){if(_0x27a1a9(0x2bc)!==_0x27a1a9(0x2bc))return this[_0x27a1a9(0x3e4)]||0x0;else _0x3b830c+=Number(RegExp['$1']);}}return _0x3b830c[_0x27a1a9(0x38e)](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x201c49(0x2c0)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x2f2)][_0x201c49(0x3c7)],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_DEFAULT']=VisuMZ[_0x201c49(0x356)]['Settings']['Mechanics']['MinBravePointsDefault'],Game_BattlerBase[_0x201c49(0x28e)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x2f2)][_0x201c49(0x276)],Game_BattlerBase[_0x201c49(0x3e1)]=VisuMZ[_0x201c49(0x356)]['Settings'][_0x201c49(0x2f2)][_0x201c49(0x217)],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x342)]=function(){const _0x520eba=_0x201c49,_0x39cd8d=VisuMZ['BattleSystemBTB']['RegExp'],_0x39f309=_0x39cd8d[_0x520eba(0x2b9)];let _0x2e78e5=Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT'];const _0x25a90a=this['traitObjects']();for(const _0x57b51e of _0x25a90a){if(!_0x57b51e)continue;const _0x53dd5f=_0x57b51e['note'];_0x53dd5f[_0x520eba(0x36b)](_0x39f309)&&(_0x520eba(0x384)==='DEfFX'?_0x2e78e5+=Number(RegExp['$1']):(_0x43c2fb[_0x520eba(0x356)][_0x520eba(0x31a)][_0x520eba(0x22d)](this,_0x51f1bc),_0x2f9284['btbRegisterFusions'](_0x42ed19),_0x53dbd2[_0x520eba(0x356)][_0x520eba(0x253)](_0xb43897,'JsBravePointsUser'),_0x55a5bd[_0x520eba(0x356)]['Parse_Notetags_BravePointsUserJS'](_0x21a4d3,_0x520eba(0x325))));}return Math[_0x520eba(0x24f)](_0x2e78e5,Game_BattlerBase[_0x520eba(0x28e)]);},Game_BattlerBase[_0x201c49(0x33b)]['minBravePoints']=function(){const _0x5cf300=_0x201c49,_0x260ddc=VisuMZ[_0x5cf300(0x356)][_0x5cf300(0x256)],_0x424c2f=_0x260ddc['MinBravePoints'];let _0x4d00c8=Game_BattlerBase[_0x5cf300(0x40e)];const _0x294366=this[_0x5cf300(0x2e8)]();for(const _0x5693ea of _0x294366){if('yVkSK'!==_0x5cf300(0x323))_0x54641b['prototype'][_0x5cf300(0x210)]['call'](this),this[_0x5cf300(0x43e)](),this['updatePosition'](),this[_0x5cf300(0x4a6)](),this[_0x5cf300(0x44e)](),this[_0x5cf300(0x3af)](),this[_0x5cf300(0x3eb)](),this[_0x5cf300(0x33f)](),this['updateSelectionEffect']();else{if(!_0x5693ea)continue;const _0x34e5cd=_0x5693ea[_0x5cf300(0x337)];if(_0x34e5cd[_0x5cf300(0x36b)](_0x424c2f)){if(_0x5cf300(0x204)===_0x5cf300(0x1f0))return this[_0x5cf300(0x3ae)](_0x3e69cd[_0x5cf300(0x227)](),0x9,!![]);else _0x4d00c8+=Number(RegExp['$1']);}}}return Math[_0x5cf300(0x391)](_0x4d00c8,Game_BattlerBase[_0x5cf300(0x3e1)]);},Game_BattlerBase['prototype'][_0x201c49(0x4a0)]=function(_0x4cdd68){const _0x240896=_0x201c49;this[_0x240896(0x3e4)]=Math['min'](_0x4cdd68,this[_0x240896(0x342)]()),this[_0x240896(0x21a)]();},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x2aa)]=function(_0x1c5a20){const _0x52c8ac=_0x201c49;_0x1c5a20+=this[_0x52c8ac(0x3e4)]||0x0,this[_0x52c8ac(0x4a0)](_0x1c5a20);},Game_BattlerBase[_0x201c49(0x33b)]['loseBravePoints']=function(_0x15f0dc){const _0x47e74f=_0x201c49;this[_0x47e74f(0x2aa)](-_0x15f0dc);},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x294)]=function(_0x5d8760){const _0x8ddf61=_0x201c49,_0x29321b=VisuMZ[_0x8ddf61(0x356)][_0x8ddf61(0x225)][_0x8ddf61(0x2f2)];if(!_0x5d8760)return _0x29321b[_0x8ddf61(0x31b)];if(DataManager[_0x8ddf61(0x320)](_0x5d8760)){if(_0x8ddf61(0x30e)==='PumaP'){const _0x2b5cf3=this[_0x8ddf61(0x47a)]();if(!_0x2b5cf3)return;if(!_0x2b5cf3[_0x8ddf61(0x21d)]())return;if(this[_0x8ddf61(0x314)]===_0x2b5cf3['battlerHue']())return;this[_0x8ddf61(0x314)]=_0x2b5cf3[_0x8ddf61(0x498)]();if(_0x2b5cf3['hasSvBattler']())this[_0x8ddf61(0x314)]=0x0;this[_0x8ddf61(0x3a2)][_0x8ddf61(0x266)](this[_0x8ddf61(0x314)]);}else{if(_0x5d8760['id']===this[_0x8ddf61(0x31e)]())return 0x0;if(this['currentAction']()&&this['currentAction']()[_0x8ddf61(0x42c)]()===_0x5d8760&&this[_0x8ddf61(0x224)]()[_0x8ddf61(0x477)])return 0x0;}}const _0x455704=VisuMZ['BattleSystemBTB'][_0x8ddf61(0x256)],_0xebd3b=_0x5d8760[_0x8ddf61(0x337)];if(_0xebd3b['match'](_0x455704['BravePointCost']))return Number(RegExp['$1']);let _0x4e8e70=0x0;if(DataManager['isSkill'](_0x5d8760))_0x8ddf61(0x45c)!=='dtStj'?_0x3d7da0-=this[_0x8ddf61(0x430)](this['skillCostSeparator']())+_0x77da54:_0x4e8e70=_0x29321b['BravePointSkillCost'];else{if(DataManager[_0x8ddf61(0x4b1)](_0x5d8760)){if(_0x8ddf61(0x4ac)===_0x8ddf61(0x450)){if(this['isBTB']())return![];return _0x2cc57c['BattleSystemBTB'][_0x8ddf61(0x2c9)]['call'](this);}else _0x4e8e70=_0x29321b[_0x8ddf61(0x408)];}}return _0x4e8e70[_0x8ddf61(0x38e)](0x0,Game_BattlerBase[_0x8ddf61(0x28e)]);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x3e2)]=Game_BattlerBase['prototype'][_0x201c49(0x375)],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x375)]=function(_0x3734c0){const _0x5a0109=_0x201c49;if(_0x3734c0&&SceneManager[_0x5a0109(0x475)]()&&BattleManager[_0x5a0109(0x2df)]()){const _0x4b8f15=this[_0x5a0109(0x294)](_0x3734c0);if(this['bravePoints']()-_0x4b8f15<this[_0x5a0109(0x470)]())return![];}return VisuMZ[_0x5a0109(0x356)]['Game_BattlerBase_canUse']['call'](this,_0x3734c0);},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x492)]=function(_0x429098){const _0x661132=_0x201c49;if(!BattleManager['isBTB']())return;const _0x4d6dbe=this[_0x661132(0x294)](_0x429098);this[_0x661132(0x25e)](_0x4d6dbe);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x473)]=Game_Battler[_0x201c49(0x33b)]['useItem'],Game_Battler['prototype'][_0x201c49(0x416)]=function(_0x21052c){const _0xd4aa5a=_0x201c49;if(this['btbMatchesCurrentFusionAction'](_0x21052c)){if(_0xd4aa5a(0x40c)===_0xd4aa5a(0x459)){if(!_0x2e0e8f[_0xd4aa5a(0x475)]())return;_0x37e97d[_0xd4aa5a(0x320)](_0x131128)?this['btbPaySkillFusionCosts']():this[_0xd4aa5a(0x2af)]();}else{this[_0xd4aa5a(0x487)](_0x21052c);return;}}VisuMZ[_0xd4aa5a(0x356)][_0xd4aa5a(0x473)][_0xd4aa5a(0x22d)](this,_0x21052c),this['payBravePointsCost'](_0x21052c);},Game_Battler[_0x201c49(0x33b)]['btbMatchesCurrentFusionAction']=function(_0x7bf047){const _0x179d5f=_0x201c49;if(!BattleManager[_0x179d5f(0x2df)]())return![];if(!SceneManager[_0x179d5f(0x475)]())return![];if(!this['isActor']())return![];if(this!==BattleManager[_0x179d5f(0x243)])return![];if(!this[_0x179d5f(0x224)]())return![];if(!this['currentAction']()[_0x179d5f(0x42c)]())return![];if(this['currentAction']()[_0x179d5f(0x42c)]()!==_0x7bf047)return![];if(this['currentAction']()[_0x179d5f(0x320)]())return this[_0x179d5f(0x224)]()[_0x179d5f(0x2a1)]()[_0x179d5f(0x2cc)]>0x0;else{if(this[_0x179d5f(0x224)]()[_0x179d5f(0x4b1)]())return this[_0x179d5f(0x224)]()[_0x179d5f(0x295)]()[_0x179d5f(0x2cc)]>0x0;else{if(_0x179d5f(0x220)===_0x179d5f(0x4aa))this[_0x179d5f(0x400)]();else return![];}}},Game_Battler['prototype'][_0x201c49(0x487)]=function(_0xb1edc5){const _0x2e01ab=_0x201c49;if(!SceneManager[_0x2e01ab(0x475)]())return;DataManager['isSkill'](_0xb1edc5)?this['btbPaySkillFusionCosts']():this[_0x2e01ab(0x2af)]();},Game_Battler[_0x201c49(0x33b)]['btbPaySkillFusionCosts']=function(){const _0x4573de=_0x201c49,_0x120c5d=this['currentAction']()[_0x4573de(0x2a1)]();if(!_0x120c5d)return;for(const _0xdede29 of _0x120c5d){if(!_0xdede29)continue;if(!this[_0x4573de(0x375)](_0xdede29))return![];VisuMZ[_0x4573de(0x356)][_0x4573de(0x473)][_0x4573de(0x22d)](this,_0xdede29),this['payBravePointsCost'](_0xdede29);}return!![];},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x2af)]=function(){const _0x3113df=_0x201c49,_0x4853c3=this['currentAction']()[_0x3113df(0x295)]();if(!_0x4853c3)return;for(const _0x355ab7 of _0x4853c3){if(_0x3113df(0x304)!==_0x3113df(0x304))_0x2fc451[_0x3113df(0x211)](_0x4c8034);else{if(!_0x355ab7)continue;if(!this[_0x3113df(0x375)](_0x355ab7))return![];VisuMZ[_0x3113df(0x356)][_0x3113df(0x473)][_0x3113df(0x22d)](this,_0x355ab7),this[_0x3113df(0x492)](_0x355ab7);}}return!![];},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x368)]=function(){const _0x3a731c=_0x201c49,_0xd7d0ef=this[_0x3a731c(0x486)]()-this[_0x3a731c(0x4a1)]()+this['calcRegenBravePoints']();return _0xd7d0ef[_0x3a731c(0x38e)](Game_BattlerBase[_0x3a731c(0x3e1)],this[_0x3a731c(0x342)]());},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x4a1)]=function(){const _0xaff47c=_0x201c49;let _0x3abfef=0x0;for(const _0x2c7bd9 of this[_0xaff47c(0x478)]){if(_0xaff47c(0x229)!==_0xaff47c(0x229))return _0x51ce20[_0xaff47c(0x2df)]()&&this['numActions']()>0x1?![]:_0x3e94a2[_0xaff47c(0x356)][_0xaff47c(0x359)][_0xaff47c(0x22d)](this);else{if(!_0x2c7bd9)continue;const _0x4756c3=_0x2c7bd9[_0xaff47c(0x42c)]();_0x3abfef+=this[_0xaff47c(0x294)](_0x4756c3);}}return _0x3abfef;},VisuMZ[_0x201c49(0x356)][_0x201c49(0x319)]=Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x434)],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x434)]=function(){const _0x135465=_0x201c49;return BattleManager[_0x135465(0x2df)]()&&this[_0x135465(0x486)]()<0x0?![]:VisuMZ[_0x135465(0x356)]['Game_BattlerBase_canInput'][_0x135465(0x22d)](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x359)]=Game_BattlerBase[_0x201c49(0x33b)]['canGuard'],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x42a)]=function(){const _0x430ac8=_0x201c49;return BattleManager[_0x430ac8(0x2df)]()&&this[_0x430ac8(0x1f9)]()>0x1?![]:VisuMZ[_0x430ac8(0x356)][_0x430ac8(0x359)][_0x430ac8(0x22d)](this);},Game_BattlerBase[_0x201c49(0x33b)]['canBrave']=function(){const _0x4e79ed=_0x201c49;if(this[_0x4e79ed(0x2a8)]())return![];return this[_0x4e79ed(0x1f9)]()<this[_0x4e79ed(0x46a)]()&&this[_0x4e79ed(0x3e4)]>this[_0x4e79ed(0x470)]();},Game_BattlerBase[_0x201c49(0x33b)]['cannotBraveTrait']=function(){const _0x2a3550=_0x201c49,_0x18f195=VisuMZ[_0x2a3550(0x356)][_0x2a3550(0x256)],_0xb8385e=_0x18f195[_0x2a3550(0x309)];return this[_0x2a3550(0x2e8)]()['some'](_0x5d3401=>_0x5d3401&&_0x5d3401[_0x2a3550(0x337)][_0x2a3550(0x36b)](_0xb8385e));},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x38b)]=function(){const _0x449727=_0x201c49,_0x8faedd=VisuMZ[_0x449727(0x356)][_0x449727(0x256)],_0x4abbfd=_0x8faedd[_0x449727(0x2f0)];return this[_0x449727(0x2e8)]()[_0x449727(0x469)](_0x4e016f=>_0x4e016f&&_0x4e016f['note'][_0x449727(0x36b)](_0x4abbfd));},Game_BattlerBase[_0x201c49(0x33b)]['clearTurnOrderBTBGraphics']=function(){const _0x144954=_0x201c49;delete this[_0x144954(0x480)],delete this[_0x144954(0x441)],delete this[_0x144954(0x406)],delete this[_0x144954(0x2d2)];},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x3dc)]=function(){const _0x7ffc63=_0x201c49;return this[_0x7ffc63(0x480)]===undefined&&(_0x7ffc63(0x4af)===_0x7ffc63(0x4af)?this[_0x7ffc63(0x480)]=this[_0x7ffc63(0x485)]():(_0x3897af['BattleSystemBTB']['Game_Unit_makeActions'][_0x7ffc63(0x22d)](this),_0x5a02ec[_0x7ffc63(0x2df)]()&&this===_0x261247&&_0x5665a4['isSceneBattle']()&&_0x5956f5[_0x7ffc63(0x21c)]())),this['_btbTurnOrderGraphicType'];},Game_BattlerBase['prototype']['createTurnOrderBTBGraphicType']=function(){const _0x3e5c34=_0x201c49;return Window_BTB_TurnOrder[_0x3e5c34(0x225)][_0x3e5c34(0x23a)];},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x2ec)]=function(){const _0x6f2042=_0x201c49;return this[_0x6f2042(0x441)]===undefined&&(_0x6f2042(0x251)===_0x6f2042(0x24b)?_0x377cc9=_0x298e94+this[_0x6f2042(0x3cb)]()+_0x4a51b9:this[_0x6f2042(0x441)]=this[_0x6f2042(0x34d)]()),this[_0x6f2042(0x441)];},Game_BattlerBase[_0x201c49(0x33b)]['createTurnOrderBTBGraphicFaceName']=function(){const _0x28ab52=_0x201c49;return Window_BTB_TurnOrder[_0x28ab52(0x225)]['EnemyBattlerFaceName'];},Game_BattlerBase['prototype']['TurnOrderBTBGraphicFaceIndex']=function(){const _0x2572cf=_0x201c49;return this['_btbTurnOrderFaceIndex']===undefined&&(this['_btbTurnOrderFaceIndex']=this[_0x2572cf(0x369)]()),this['_btbTurnOrderFaceIndex'];},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x369)]=function(){const _0x50a8ad=_0x201c49;return Window_BTB_TurnOrder['Settings'][_0x50a8ad(0x327)];},Game_BattlerBase[_0x201c49(0x33b)]['TurnOrderBTBGraphicIconIndex']=function(){const _0x3a0225=_0x201c49;return this[_0x3a0225(0x2d2)]===undefined&&(this[_0x3a0225(0x2d2)]=this[_0x3a0225(0x458)]()),this[_0x3a0225(0x2d2)];},Game_BattlerBase['prototype'][_0x201c49(0x458)]=function(){const _0x5652c6=_0x201c49;return Window_BTB_TurnOrder[_0x5652c6(0x225)][_0x5652c6(0x41d)];},Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x494)]=function(_0x378eb1){const _0x563aef=_0x201c49;this[_0x563aef(0x2d2)]=_0x378eb1;},VisuMZ[_0x201c49(0x356)][_0x201c49(0x27d)]=Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x48c)],Game_BattlerBase[_0x201c49(0x33b)]['hide']=function(){const _0xf4a774=_0x201c49;VisuMZ[_0xf4a774(0x356)]['Game_BattlerBase_hide'][_0xf4a774(0x22d)](this),BattleManager[_0xf4a774(0x332)]();},VisuMZ[_0x201c49(0x356)][_0x201c49(0x457)]=Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x32a)],Game_BattlerBase[_0x201c49(0x33b)][_0x201c49(0x32a)]=function(){const _0x532b9d=_0x201c49;VisuMZ[_0x532b9d(0x356)][_0x532b9d(0x457)][_0x532b9d(0x22d)](this),BattleManager[_0x532b9d(0x332)]();},VisuMZ[_0x201c49(0x356)]['Game_Battler_performCollapse']=Game_Battler[_0x201c49(0x33b)][_0x201c49(0x27b)],Game_Battler['prototype'][_0x201c49(0x27b)]=function(){const _0x44bd65=_0x201c49;VisuMZ[_0x44bd65(0x356)][_0x44bd65(0x2fe)][_0x44bd65(0x22d)](this),BattleManager[_0x44bd65(0x332)]();},VisuMZ[_0x201c49(0x356)][_0x201c49(0x398)]=Game_Battler['prototype'][_0x201c49(0x28b)],Game_Battler['prototype'][_0x201c49(0x28b)]=function(){const _0x32839f=_0x201c49;return BattleManager[_0x32839f(0x2df)]()?0x1:VisuMZ[_0x32839f(0x356)]['Game_Battler_makeActionTimes'][_0x32839f(0x22d)](this);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x404)]=Game_Battler[_0x201c49(0x33b)][_0x201c49(0x30f)],Game_Battler[_0x201c49(0x33b)][_0x201c49(0x30f)]=function(_0x550eb5){const _0xf97731=_0x201c49;VisuMZ[_0xf97731(0x356)]['Game_Battler_onBattleStart'][_0xf97731(0x22d)](this,_0x550eb5),this['onBattleStartBTB'](_0x550eb5);},Game_Battler['prototype'][_0x201c49(0x3cd)]=function(_0x4e1626){const _0x17b58e=_0x201c49;if(!BattleManager[_0x17b58e(0x2df)]())return;const _0x489161=VisuMZ[_0x17b58e(0x356)][_0x17b58e(0x225)][_0x17b58e(0x2f2)],_0x29d911=VisuMZ['BattleSystemBTB'][_0x17b58e(0x256)];let _0x53348d=_0x4e1626?_0x489161[_0x17b58e(0x42e)]:_0x489161[_0x17b58e(0x435)];const _0x15aa82=this['traitObjects']();for(const _0x5af35d of _0x15aa82){if(!_0x5af35d)continue;const _0x126d61=_0x5af35d[_0x17b58e(0x337)];_0x126d61[_0x17b58e(0x36b)](_0x29d911['BravePointBattleStart'])&&(_0x53348d+=Number(RegExp['$1']));}this[_0x17b58e(0x4a0)](_0x53348d);},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x312)]=function(){const _0x54bef6=_0x201c49;this[_0x54bef6(0x478)]['push'](new Game_Action(this));const _0x5a1df4=VisuMZ[_0x54bef6(0x356)][_0x54bef6(0x225)]['BraveAnimation'];if(_0x5a1df4[_0x54bef6(0x47f)]){const _0x5ca20e='Brave',_0x133860=_0x5a1df4[_0x54bef6(0x3f8)[_0x54bef6(0x37d)](_0x5ca20e)],_0x31137b=_0x5a1df4['%1Mirror'['format'](_0x5ca20e)],_0x205337=_0x5a1df4[_0x54bef6(0x34f)[_0x54bef6(0x37d)](_0x5ca20e)];$gameTemp[_0x54bef6(0x347)]([this],_0x133860,_0x31137b,_0x205337);}},Game_Battler['prototype'][_0x201c49(0x2f3)]=function(){const _0x26f5d3=_0x201c49;if(this[_0x26f5d3(0x478)]['length']<=0x1)return;this[_0x26f5d3(0x478)]['pop']();const _0x3d145b=VisuMZ[_0x26f5d3(0x356)]['Settings'][_0x26f5d3(0x3bf)];if(_0x3d145b[_0x26f5d3(0x383)]){if(_0x26f5d3(0x4b0)==='PdnZo'){const _0x103713=_0x26f5d3(0x476),_0x3b3c55=_0x3d145b['%1AnimationID'['format'](_0x103713)],_0x1c74ad=_0x3d145b[_0x26f5d3(0x215)['format'](_0x103713)],_0x497c68=_0x3d145b[_0x26f5d3(0x34f)['format'](_0x103713)];$gameTemp[_0x26f5d3(0x347)]([this],_0x3b3c55,_0x1c74ad,_0x497c68);}else{if(this['isBTB']())return!![];return _0x19bd9f[_0x26f5d3(0x356)]['BattleManager_isTurnBased'][_0x26f5d3(0x22d)](this);}}},VisuMZ[_0x201c49(0x356)][_0x201c49(0x380)]=Game_Battler[_0x201c49(0x33b)]['onTurnEnd'],Game_Battler['prototype'][_0x201c49(0x36e)]=function(){const _0x16280b=_0x201c49;VisuMZ[_0x16280b(0x356)]['Game_Battler_onTurnEnd'][_0x16280b(0x22d)](this),this[_0x16280b(0x2f5)]();},Game_Battler[_0x201c49(0x33b)]['onTurnEndBTB']=function(){const _0x493ac4=_0x201c49;if(!BattleManager[_0x493ac4(0x2df)]())return;if(!$gameParty['inBattle']())return;this[_0x493ac4(0x341)]();},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x341)]=function(){const _0x5be7f3=_0x201c49,_0x441a58=VisuMZ['BattleSystemBTB'][_0x5be7f3(0x225)][_0x5be7f3(0x2f2)],_0x2ef525=_0x441a58['BravePointsRegenAlive'];if(_0x2ef525&&!this[_0x5be7f3(0x3b8)]())return;const _0x3a38d6=this['calcRegenBravePoints']();this['gainBravePoints'](_0x3a38d6);},Game_Battler['prototype'][_0x201c49(0x377)]=function(){const _0x1a1872=_0x201c49,_0x2252aa=VisuMZ[_0x1a1872(0x356)][_0x1a1872(0x256)],_0x47bc1d=VisuMZ[_0x1a1872(0x356)][_0x1a1872(0x225)][_0x1a1872(0x2f2)];let _0x3de802=_0x47bc1d[_0x1a1872(0x343)]||0x0;const _0x37360a=this[_0x1a1872(0x2e8)]();for(const _0x8d172b of _0x37360a){if(!_0x8d172b)continue;const _0x2fafa6=_0x8d172b[_0x1a1872(0x337)];_0x2fafa6['match'](_0x2252aa[_0x1a1872(0x23d)])&&(_0x3de802+=Number(RegExp['$1']));}return _0x3de802;},Game_Battler[_0x201c49(0x33b)]['processActionFusionsBTB']=function(){const _0x44da16=_0x201c49;if(!this[_0x44da16(0x3c4)]())return;if(this['numActions']()<=0x1)return;if(!this[_0x44da16(0x224)]())return;if(!this[_0x44da16(0x224)]()[_0x44da16(0x42c)]())return;const _0x544175=this[_0x44da16(0x1fc)]();if(_0x544175[_0x44da16(0x2cc)]<=0x0)return;let _0x4b56da='',_0x43ce83=0x0;const _0x2450d8=this[_0x44da16(0x224)]()['isSkill'](),_0x27f3d3=_0x2450d8?DataManager[_0x44da16(0x424)]:DataManager['_btbItemFlexFusion'],_0x53a510=_0x2450d8?DataManager[_0x44da16(0x3b7)]:DataManager[_0x44da16(0x393)];for(const _0x3abeed of _0x544175){if('rmvHQ'!==_0x44da16(0x2b2)){_0x218d61['_braveStartupAnimation']=!![];let _0x24ce80=_0x4b4e0f[_0x44da16(0x420)]();const _0x27d2f9=_0x30e4f2[_0x44da16(0x356)][_0x44da16(0x225)][_0x44da16(0x3bf)],_0x40bbf4=_0x27d2f9[_0x44da16(0x47f)],_0x42666f=_0x27d2f9[_0x44da16(0x3d9)];while(_0x24ce80--){this[_0x44da16(0x265)](_0x44da16(0x241),[_0x2222e7],_0x40bbf4),_0x24ce80>0x0?this['push']('waitCount',_0x42666f):this[_0x44da16(0x265)](_0x44da16(0x252));}this[_0x44da16(0x265)](_0x44da16(0x4b2),_0x3b2d9b,_0x5660ed,_0x2ca581);}else{if(!_0x3abeed)continue;_0x27f3d3[_0x3abeed]&&_0x27f3d3[_0x3abeed]>=_0x43ce83&&(this[_0x44da16(0x287)](_0x3abeed)&&(_0x4b56da=_0x3abeed,_0x43ce83=_0x27f3d3[_0x3abeed])),_0x53a510[_0x3abeed]&&_0x53a510[_0x3abeed]>=_0x43ce83&&(_0x44da16(0x297)===_0x44da16(0x293)?(_0x3f3fa5[_0x44da16(0x356)][_0x44da16(0x36c)][_0x44da16(0x22d)](this),this[_0x44da16(0x34c)]()):this[_0x44da16(0x287)](_0x3abeed)&&('tHddC'===_0x44da16(0x2e1)?_0x27cc8b=!![]:(_0x4b56da=_0x3abeed,_0x43ce83=_0x27f3d3[_0x3abeed])));}}if(_0x43ce83<=0x0)return;this[_0x44da16(0x3c5)](_0x4b56da),this[_0x44da16(0x224)]()[_0x44da16(0x313)](_0x4b56da),_0x2450d8?this[_0x44da16(0x224)]()[_0x44da16(0x447)](_0x43ce83):this[_0x44da16(0x224)]()[_0x44da16(0x284)](_0x43ce83);},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x3c4)]=function(){const _0x190ffe=_0x201c49;if(this['cannotFusionNotetagBTB']())return![];const _0x271eb2=VisuMZ[_0x190ffe(0x356)][_0x190ffe(0x225)][_0x190ffe(0x2f2)];if(this[_0x190ffe(0x2ca)]()){if(_0x271eb2[_0x190ffe(0x30b)]===undefined)return!![];return _0x271eb2[_0x190ffe(0x30b)];}else{if(_0x271eb2[_0x190ffe(0x269)]===undefined)return!![];return _0x271eb2[_0x190ffe(0x269)];}},Game_BattlerBase['prototype'][_0x201c49(0x436)]=function(){const _0x47dd79=_0x201c49,_0x5244f4=VisuMZ[_0x47dd79(0x356)][_0x47dd79(0x256)],_0x3cece4=this[_0x47dd79(0x2e8)]();for(const _0x352f7d of _0x3cece4){if('HpzGW'===_0x47dd79(0x409)){if(!_0x352f7d)continue;const _0x12cc32=_0x352f7d[_0x47dd79(0x337)];if(_0x12cc32[_0x47dd79(0x36b)](_0x5244f4['CannotFusion']))return!![];if(_0x12cc32[_0x47dd79(0x36b)](_0x5244f4[_0x47dd79(0x2ae)]))return![];}else{_0x162def[_0x47dd79(0x33b)][_0x47dd79(0x4a0)]['call'](this,_0x155eaf);if(!_0x201d6d[_0x47dd79(0x475)]())return;if(!_0x2589c0[_0x47dd79(0x496)]()[_0x47dd79(0x414)](this))return;_0x5c4ed9[_0x47dd79(0x254)]();}}return![];},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x1fc)]=function(){const _0x171709=_0x201c49,_0x4257cb=this['currentAction'](),_0x26411e=this[_0x171709(0x478)],_0x5a4f48=_0x26411e[_0x171709(0x2bb)](_0x20c9e4=>this[_0x171709(0x3aa)](_0x4257cb,_0x20c9e4)),_0x5a4e15=_0x5a4f48[_0x171709(0x23c)](_0x1bdc6c=>_0x1bdc6c[_0x171709(0x42c)]()['id']),_0x48a8ac=VisuMZ[_0x171709(0x356)][_0x171709(0x3c0)](_0x4257cb[_0x171709(0x42c)]()['id'],_0x5a4e15);let _0x423287=String(_0x4257cb[_0x171709(0x42c)]()['id']);for(let _0x329809=0x1;_0x329809<_0x26411e[_0x171709(0x2cc)];_0x329809++){const _0x45df58=_0x26411e[_0x329809];if(this[_0x171709(0x3aa)](_0x4257cb,_0x45df58))_0x171709(0x2f6)===_0x171709(0x2f6)?(_0x423287=_0x171709(0x1fe)[_0x171709(0x37d)](_0x423287,_0x45df58[_0x171709(0x42c)]()['id']),_0x48a8ac[_0x171709(0x265)](_0x423287)):this['startFade'](0x0);else break;}return _0x48a8ac[_0x171709(0x2bb)]((_0x276bed,_0x53f4e3,_0x1ef476)=>_0x1ef476[_0x171709(0x399)](_0x276bed)===_0x53f4e3);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x3c0)]=function(_0x3a11f8,_0x171455){const _0x2dc03a=[],_0x11abd4=function(_0x1994a5,_0xfbad5c){const _0x3e68ba=_0x497f;for(var _0xc20d89=0x0;_0xc20d89<_0xfbad5c[_0x3e68ba(0x2cc)];_0xc20d89++){_0x2dc03a['push'](_0x1994a5+'-'+_0xfbad5c[_0xc20d89]),_0x11abd4(_0x1994a5+'-'+_0xfbad5c[_0xc20d89],_0xfbad5c['slice'](_0xc20d89+0x1));}};return _0x11abd4(_0x3a11f8,_0x171455),_0x2dc03a;},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x3aa)]=function(_0x138c83,_0x57edb6){const _0x16d509=_0x201c49;if(!_0x138c83||!_0x57edb6)return![];if(_0x138c83===_0x57edb6)return![];if(!_0x138c83['item']()||!_0x57edb6[_0x16d509(0x42c)]())return![];if(_0x138c83[_0x16d509(0x320)]()!==_0x57edb6[_0x16d509(0x320)]())return![];return!![];},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x287)]=function(_0x20c374){const _0x566886=_0x201c49,_0x54afb3=this[_0x566886(0x224)]()[_0x566886(0x320)](),_0x4d5506=JsonEx[_0x566886(0x24c)](this);_0x4d5506[_0x566886(0x3b4)]=!![],_0x4d5506['currentAction']()[_0x566886(0x313)](_0x20c374);if(_0x54afb3){if('mgbRu'===_0x566886(0x42d))return _0x4d5506[_0x566886(0x37b)]();else _0xa10aa2+=_0x51fda3(_0x11bd49['$1']);}else{if(_0x566886(0x3fc)===_0x566886(0x46d)){this[_0x566886(0x43b)]();const _0x11fa3e=_0x1c3ec3['ItemsEquipsCore'][_0x566886(0x225)][_0x566886(0x49f)];this['contents'][_0x566886(0x223)]=_0x11fa3e['ItemQuantityFontSize'];if(_0x5a1380){const _0x14e2e9=_0x11fa3e[_0x566886(0x273)],_0x245de3=_0x14e2e9[_0x566886(0x37d)](_0x4bf022[_0x566886(0x1f4)](_0x564d66)),_0x2edabe=this[_0x566886(0x430)](_0x245de3+this[_0x566886(0x3cb)]());_0x18f86f-=_0x2edabe;}else _0x58e231-=this[_0x566886(0x430)](this['skillCostSeparator']())+_0x55eb1b;_0x48846c[_0x566886(0x356)][_0x566886(0x2dd)][_0x566886(0x22d)](this,_0xe37e3b,_0x4dc31e,_0x920588,_0x1c6ee4);}else{const _0x3b5c4a=JsonEx['makeDeepCopy']($gameParty['_items']),_0x41ed96=JsonEx[_0x566886(0x24c)]($gameParty[_0x566886(0x451)]),_0x10a5ca=JsonEx[_0x566886(0x24c)]($gameParty['_armors']);let _0x28e1e=_0x4d5506[_0x566886(0x2af)]();return $gameParty[_0x566886(0x428)]=_0x3b5c4a,$gameParty[_0x566886(0x451)]=_0x41ed96,$gameParty[_0x566886(0x2c5)]=_0x10a5ca,_0x28e1e;}}},Game_Battler[_0x201c49(0x33b)][_0x201c49(0x3c5)]=function(_0xa4fc50){const _0x4eaed6=_0x201c49,_0x2c3328=this[_0x4eaed6(0x224)](),_0x523422=_0xa4fc50[_0x4eaed6(0x43a)]('-')[_0x4eaed6(0x23c)](_0x51c993=>Number(_0x51c993));_0x523422[_0x4eaed6(0x2cf)]();const _0x9ec9ba=this[_0x4eaed6(0x478)],_0x5cac71=[];for(const _0x2e675b of _0x9ec9ba){if(_0x4eaed6(0x455)!==_0x4eaed6(0x455))_0x2a9ddb+=_0x328a18(_0x4c18e8['$1']);else{if(this['canActionFusionWithBTB'](_0x2c3328,_0x2e675b)){if(_0x4eaed6(0x378)!==_0x4eaed6(0x378))return _0x5d59eb[_0x4eaed6(0x225)]['EnemyBattlerType'];else{if(_0x523422[_0x4eaed6(0x414)](_0x2e675b[_0x4eaed6(0x42c)]()['id'])){if(_0x4eaed6(0x247)==='nAHJH')_0x5cac71['push'](_0x2e675b),_0x523422[_0x4eaed6(0x277)](_0x523422[_0x4eaed6(0x399)](_0x2e675b[_0x4eaed6(0x42c)]()['id']),0x1);else{if(this[_0x4eaed6(0x448)]>0x0){const _0x4ef11d=this['_homeDuration'];this[_0x4eaed6(0x282)]=(this[_0x4eaed6(0x282)]*(_0x4ef11d-0x1)+this[_0x4eaed6(0x401)])/_0x4ef11d,this[_0x4eaed6(0x421)]=(this['_homeY']*(_0x4ef11d-0x1)+this[_0x4eaed6(0x4a4)])/_0x4ef11d,this['_homeDuration']--,this[_0x4eaed6(0x448)]<=0x0&&(this[_0x4eaed6(0x282)]=this[_0x4eaed6(0x401)],this[_0x4eaed6(0x421)]=this['_targetHomeY']);}}}}}}}for(const _0x57a4dc of _0x5cac71){_0x9ec9ba[_0x4eaed6(0x211)](_0x57a4dc);}},Game_Actor[_0x201c49(0x33b)][_0x201c49(0x4a0)]=function(_0x2169f0){const _0x91103=_0x201c49;Game_Battler[_0x91103(0x33b)]['setBravePoints'][_0x91103(0x22d)](this,_0x2169f0);if(!SceneManager[_0x91103(0x475)]())return;if(!BattleManager['allBattleMembers']()[_0x91103(0x414)](this))return;BattleManager[_0x91103(0x254)]();},VisuMZ['BattleSystemBTB'][_0x201c49(0x25d)]=Game_Actor['prototype'][_0x201c49(0x22f)],Game_Actor['prototype']['makeActions']=function(){const _0x37adfc=_0x201c49;VisuMZ[_0x37adfc(0x356)]['Game_Actor_makeActions'][_0x37adfc(0x22d)](this),BattleManager[_0x37adfc(0x2df)]()&&this[_0x37adfc(0x486)]()<0x0&&this[_0x37adfc(0x350)]();},Game_Actor[_0x201c49(0x33b)][_0x201c49(0x485)]=function(){const _0x344288=_0x201c49,_0x212bc9=this[_0x344288(0x1f6)]()[_0x344288(0x337)];if(_0x212bc9[_0x344288(0x36b)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x344288(0x46e);else{if(_0x212bc9[_0x344288(0x36b)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_BTB_TurnOrder[_0x344288(0x225)][_0x344288(0x357)];},Game_Actor['prototype']['TurnOrderBTBGraphicFaceName']=function(){const _0x36f035=_0x201c49,_0x23e695=this['actor']()['note'];if(_0x23e695['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x36f035(0x33c)]();},Game_Actor[_0x201c49(0x33b)][_0x201c49(0x240)]=function(){const _0x2976a1=_0x201c49,_0x2571e3=this['actor']()[_0x2976a1(0x337)];if(_0x2571e3[_0x2976a1(0x36b)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor['prototype'][_0x201c49(0x458)]=function(){const _0x52794c=_0x201c49,_0x5d46eb=this[_0x52794c(0x1f6)]()[_0x52794c(0x337)];if(_0x5d46eb['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x52794c(0x2f7)===_0x52794c(0x3ba)){const _0x58d28f=_0x47b3a3[_0x52794c(0x356)][_0x52794c(0x225)]['Window'][_0x52794c(0x41c)];_0x58d28f?_0x58d28f['call'](this,this['_btbActionSprite'],this,this[_0x52794c(0x22c)]):this[_0x52794c(0x3e8)][_0x52794c(0x22d)](this,this[_0x52794c(0x1f3)],this,this[_0x52794c(0x22c)]);}else return Number(RegExp['$1']);}return Window_BTB_TurnOrder[_0x52794c(0x225)][_0x52794c(0x412)];},Game_Actor[_0x201c49(0x33b)][_0x201c49(0x3aa)]=function(_0x60223e,_0x4387c4){const _0x4ae7e7=_0x201c49;if(!Game_Battler[_0x4ae7e7(0x33b)][_0x4ae7e7(0x3aa)][_0x4ae7e7(0x22d)](this,_0x60223e,_0x4387c4))return![];if(_0x60223e[_0x4ae7e7(0x445)]()&&_0x4387c4[_0x4ae7e7(0x445)]()){if(_0x60223e['isForFriend']()!==_0x4387c4[_0x4ae7e7(0x2e0)]())return![];if(_0x60223e[_0x4ae7e7(0x278)]!==_0x4387c4[_0x4ae7e7(0x278)])return![];}return!![];},Game_Enemy[_0x201c49(0x33b)]['createTurnOrderBTBGraphicType']=function(){const _0x73f929=_0x201c49,_0x3ea10f=this[_0x73f929(0x23b)]()[_0x73f929(0x337)];if(_0x3ea10f[_0x73f929(0x36b)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x3ea10f[_0x73f929(0x36b)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x73f929(0x3cc)!==_0x73f929(0x3cc)){const _0x2d9017=_0x386056[_0x73f929(0x225)];return this['isHorz']()?_0x2d9017[_0x73f929(0x446)]:_0x2d9017[_0x73f929(0x23e)];}else return'icon';}}return Window_BTB_TurnOrder[_0x73f929(0x225)][_0x73f929(0x23a)];},Game_Enemy[_0x201c49(0x33b)][_0x201c49(0x34d)]=function(){const _0x3fdf25=_0x201c49,_0x30fe2f=this[_0x3fdf25(0x23b)]()['note'];if(_0x30fe2f['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x3fdf25(0x225)]['EnemyBattlerFaceName'];},Game_Enemy['prototype'][_0x201c49(0x369)]=function(){const _0xd47c05=_0x201c49,_0x530436=this['enemy']()[_0xd47c05(0x337)];if(_0x530436[_0xd47c05(0x36b)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('TkCiA'!=='TkCiA')_0x3d8b5c[_0xd47c05(0x265)](_0x2bc343[_0xd47c05(0x1ef)](_0x1298d5));else return Number(RegExp['$2']);}return Window_BTB_TurnOrder[_0xd47c05(0x225)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x201c49(0x33b)]['createTurnOrderBTBGraphicIconIndex']=function(){const _0x1c6449=_0x201c49,_0x281f59=this[_0x1c6449(0x23b)]()['note'];if(_0x281f59[_0x1c6449(0x36b)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0x1c6449(0x41d)];},VisuMZ[_0x201c49(0x356)][_0x201c49(0x454)]=Game_Enemy[_0x201c49(0x33b)][_0x201c49(0x22f)],Game_Enemy[_0x201c49(0x33b)][_0x201c49(0x22f)]=function(){const _0x3bbc8a=_0x201c49;VisuMZ[_0x3bbc8a(0x356)][_0x3bbc8a(0x454)][_0x3bbc8a(0x22d)](this),this[_0x3bbc8a(0x3c2)](),this[_0x3bbc8a(0x274)]();},Game_Enemy['prototype'][_0x201c49(0x3c2)]=function(){const _0xc53ef2=_0x201c49;if(!BattleManager[_0xc53ef2(0x2df)]())return;if(this[_0xc53ef2(0x1f9)]()<=0x0)return;this[_0xc53ef2(0x407)]=![],this[_0xc53ef2(0x486)]()<0x0&&this[_0xc53ef2(0x350)]();},Game_Enemy['prototype'][_0x201c49(0x274)]=function(){const _0x355d4f=_0x201c49;if(!BattleManager[_0x355d4f(0x2df)]())return;if(this['numActions']()<=0x0)return;const _0x57ca73=this[_0x355d4f(0x478)][0x0];if(!_0x57ca73)return;const _0x4767f8=_0x57ca73[_0x355d4f(0x42c)]();if(!_0x4767f8)return;const _0x9e909c=VisuMZ[_0x355d4f(0x356)][_0x355d4f(0x256)],_0x366906=_0x4767f8[_0x355d4f(0x337)];let _0x35eb51=[];if(_0x366906['match'](_0x9e909c['EnemyMultiAction'])){const _0x27cb5c=String(RegExp['$1'])['split'](',');for(let _0x5027ac of _0x27cb5c){_0x5027ac=(String(_0x5027ac)||'')[_0x355d4f(0x2b6)]();const _0x1af4db=/^\d+$/[_0x355d4f(0x382)](_0x5027ac);_0x1af4db?_0x35eb51[_0x355d4f(0x265)](Number(_0x5027ac)):_0x35eb51['push'](DataManager[_0x355d4f(0x1ef)](_0x5027ac));}}if(_0x35eb51['length']<=0x0)return;while(_0x35eb51['length']>this[_0x355d4f(0x46a)]()){_0x35eb51[_0x355d4f(0x432)]();}if(_0x35eb51[_0x355d4f(0x2cc)]<=0x0)return;this[_0x355d4f(0x350)]();for(const _0x24d385 of _0x35eb51){const _0x14c718=new Game_Action(this);_0x14c718[_0x355d4f(0x447)](_0x24d385),_0x14c718['_bypassAiValidCheck']=!![],this[_0x355d4f(0x478)]['push'](_0x14c718);}},Game_Enemy[_0x201c49(0x33b)]['braveAnimationTimes']=function(){const _0x485286=_0x201c49;let _0x22fd46=this[_0x485286(0x1f9)]();for(const _0x5d831b of this[_0x485286(0x478)]){if(!_0x5d831b)continue;_0x22fd46+=_0x5d831b[_0x485286(0x38f)]();}return _0x22fd46-0x1;},VisuMZ[_0x201c49(0x356)][_0x201c49(0x396)]=Game_Unit[_0x201c49(0x33b)][_0x201c49(0x22f)],Game_Unit['prototype'][_0x201c49(0x22f)]=function(){const _0x2d374b=_0x201c49;VisuMZ['BattleSystemBTB']['Game_Unit_makeActions'][_0x2d374b(0x22d)](this),BattleManager[_0x2d374b(0x2df)]()&&this===$gameTroop&&SceneManager[_0x2d374b(0x475)]()&&(_0x2d374b(0x39c)===_0x2d374b(0x39c)?BattleManager['makeActionOrders']():(_0x59dd31[_0x2d374b(0x356)][_0x2d374b(0x2fe)][_0x2d374b(0x22d)](this),_0x5f389f['removeActionBattlersBTB']()));},VisuMZ[_0x201c49(0x356)][_0x201c49(0x376)]=Game_Party[_0x201c49(0x33b)][_0x201c49(0x25b)],Game_Party[_0x201c49(0x33b)][_0x201c49(0x25b)]=function(_0xbc7753){const _0xf89cbc=_0x201c49;VisuMZ[_0xf89cbc(0x356)]['Game_Party_removeActor']['call'](this,_0xbc7753),SceneManager['isSceneBattle']()&&BattleManager['isSTB']()&&(_0xf89cbc(0x463)==='fAzJG'?BattleManager[_0xf89cbc(0x4a9)]['remove']($gameActors[_0xf89cbc(0x1f6)](_0xbc7753)):this[_0xf89cbc(0x3ad)](...arguments));},VisuMZ[_0x201c49(0x356)][_0x201c49(0x230)]=Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x21f)],Scene_Battle['prototype'][_0x201c49(0x21f)]=function(){const _0x3d03d5=_0x201c49;BattleManager['isBTB']()?this['selectNextCommand']():_0x3d03d5(0x481)!==_0x3d03d5(0x20c)?VisuMZ['BattleSystemBTB'][_0x3d03d5(0x230)][_0x3d03d5(0x22d)](this):this[_0x3d03d5(0x3aa)](_0x13676a,_0x4440ef)&&(_0x354462[_0x3d03d5(0x414)](_0x35356a[_0x3d03d5(0x42c)]()['id'])&&(_0x3da089[_0x3d03d5(0x265)](_0x4bf05e),_0xf1767f[_0x3d03d5(0x277)](_0x20023a[_0x3d03d5(0x399)](_0x56d16c[_0x3d03d5(0x42c)]()['id']),0x1)));},VisuMZ[_0x201c49(0x356)][_0x201c49(0x271)]=Scene_Battle[_0x201c49(0x33b)]['createActorCommandWindow'],Scene_Battle[_0x201c49(0x33b)]['createActorCommandWindow']=function(){const _0x550124=_0x201c49;VisuMZ[_0x550124(0x356)][_0x550124(0x271)]['call'](this),this[_0x550124(0x22b)]();},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x22b)]=function(){const _0x4046dd=_0x201c49;if(!BattleManager[_0x4046dd(0x2df)]())return;const _0x22db37=this[_0x4046dd(0x354)];if(!_0x22db37)return;_0x22db37[_0x4046dd(0x45a)](_0x4046dd(0x2f9),this['commandBrave'][_0x4046dd(0x3e0)](this)),_0x22db37[_0x4046dd(0x45a)](_0x4046dd(0x466),this['commandCancelBTB'][_0x4046dd(0x3e0)](this));},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x410)]=function(){const _0x2e7e37=_0x201c49;this[_0x2e7e37(0x312)]();},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x431)]=function(){const _0xf90987=_0x201c49,_0x33591b=BattleManager[_0xf90987(0x1f6)]();if(!_0x33591b){if(_0xf90987(0x2d1)!==_0xf90987(0x2d1)){if(!this[_0xf90987(0x3ff)]())return;const _0x335d22=this['commandStyle'](),_0x2051bc=_0x1231cc[_0xf90987(0x22a)],_0x1607d5=_0x18bfe2[_0xf90987(0x44b)],_0x3e678e=_0x335d22===_0xf90987(0x479)?_0x2051bc:_0xf90987(0x329)[_0xf90987(0x37d)](_0x1607d5,_0x2051bc);this[_0xf90987(0x360)](_0x3e678e,'brave',this[_0xf90987(0x22c)][_0xf90987(0x4a5)]()),_0x4eb38e[_0xf90987(0x254)]();}else this[_0xf90987(0x44c)]();}else{if(_0x33591b[_0xf90987(0x1f9)]()<=0x1){if(_0xf90987(0x2cb)!==_0xf90987(0x2cb)){let _0x390267='';if(_0x32eba7['includes'](_0x1b7bc0))_0x390267=_0xf90987(0x260)[_0xf90987(0x37d)](_0x134b12['id'],_0x15d42b);if(_0x277cd9['includes'](_0x4827e4))_0x390267='Class-%1-%2'[_0xf90987(0x37d)](_0x4e1d0a['id'],_0x53068f);if(_0x2b3379[_0xf90987(0x414)](_0x525182))_0x390267=_0xf90987(0x32f)[_0xf90987(0x37d)](_0x1bf130['id'],_0x1027ce);if(_0x4352ab[_0xf90987(0x414)](_0x6bec83))_0x390267=_0xf90987(0x40f)[_0xf90987(0x37d)](_0x4dec6d['id'],_0x4d6f68);if(_0x323f42[_0xf90987(0x414)](_0x438898))_0x390267=_0xf90987(0x34e)[_0xf90987(0x37d)](_0xdf768c['id'],_0x45b801);if(_0x385338[_0xf90987(0x414)](_0x2f4ddf))_0x390267='Armor-%1-%2'[_0xf90987(0x37d)](_0x4b842a['id'],_0x555133);if(_0x4eaea6['includes'](_0x5bd2c8))_0x390267=_0xf90987(0x30c)[_0xf90987(0x37d)](_0xb7df9['id'],_0x3247a4);if(_0x376345[_0xf90987(0x414)](_0x37b60c))_0x390267=_0xf90987(0x20b)[_0xf90987(0x37d)](_0x48d303['id'],_0x4f028f);return _0x390267;}else this[_0xf90987(0x44c)]();}else _0x33591b[_0xf90987(0x39b)]>0x0?this[_0xf90987(0x44c)]():this[_0xf90987(0x335)]();}},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x312)]=function(){const _0x4a4e1e=_0x201c49,_0x1dbb37=BattleManager[_0x4a4e1e(0x1f6)]();if(!_0x1dbb37)return;_0x1dbb37[_0x4a4e1e(0x312)]();const _0x246521=this[_0x4a4e1e(0x354)][_0x4a4e1e(0x207)],_0x38a091=this[_0x4a4e1e(0x354)][_0x4a4e1e(0x2dc)],_0x5725ca=this['_actorCommandWindow'][_0x4a4e1e(0x205)]();this[_0x4a4e1e(0x354)][_0x4a4e1e(0x3d1)](_0x1dbb37),this['_actorCommandWindow'][_0x4a4e1e(0x366)](_0x5725ca),this[_0x4a4e1e(0x354)][_0x4a4e1e(0x207)]=_0x246521,this['_actorCommandWindow'][_0x4a4e1e(0x2dc)]=_0x38a091;},Scene_Battle['prototype'][_0x201c49(0x335)]=function(){const _0x2d1734=_0x201c49,_0x28242b=BattleManager[_0x2d1734(0x1f6)]();if(!_0x28242b)return;_0x28242b[_0x2d1734(0x2f3)]();const _0x3f22a4=this[_0x2d1734(0x354)]['_scrollX'],_0x55f3c4=this[_0x2d1734(0x354)][_0x2d1734(0x2dc)],_0x56e63f=this[_0x2d1734(0x354)]['index']();this['_actorCommandWindow'][_0x2d1734(0x3d1)](_0x28242b),this[_0x2d1734(0x354)][_0x2d1734(0x366)](_0x56e63f),this['_actorCommandWindow']['_scrollX']=_0x3f22a4,this[_0x2d1734(0x354)]['_scrollY']=_0x55f3c4;},VisuMZ[_0x201c49(0x356)][_0x201c49(0x33d)]=Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x33a)],Scene_Battle['prototype']['createAllWindows']=function(){const _0x2dde8f=_0x201c49;VisuMZ[_0x2dde8f(0x356)]['Scene_Battle_createAllWindows']['call'](this),this[_0x2dde8f(0x35b)]();},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x35b)]=function(){const _0x4cf7ba=_0x201c49;if(!BattleManager[_0x4cf7ba(0x2df)]())return;this[_0x4cf7ba(0x2c2)]=new Window_BTB_TurnOrder();const _0x4cbece=this[_0x4cf7ba(0x388)](this[_0x4cf7ba(0x3e5)]);this[_0x4cf7ba(0x358)](this[_0x4cf7ba(0x2c2)],_0x4cbece),this[_0x4cf7ba(0x2d6)](),BattleManager[_0x4cf7ba(0x4a3)](!![]);},Scene_Battle[_0x201c49(0x33b)][_0x201c49(0x2d6)]=function(){const _0x5dfdde=_0x201c49,_0x5466ac=Window_BTB_TurnOrder[_0x5dfdde(0x225)];if(_0x5466ac['DisplayPosition']!==_0x5dfdde(0x2c3))return;if(!_0x5466ac[_0x5dfdde(0x1ec)])return;if(!this['_logWindow'])return;const _0x4c73c1=this[_0x5dfdde(0x2c2)]['y']-Math[_0x5dfdde(0x3a1)]((Graphics[_0x5dfdde(0x250)]-Graphics[_0x5dfdde(0x3d4)])/0x2),_0x2e4844=_0x4c73c1+this[_0x5dfdde(0x2c2)][_0x5dfdde(0x250)];this['_logWindow']['y']=_0x2e4844+_0x5466ac['ScreenBuffer'];};function Sprite_BTB_TurnOrder_Battler(){const _0x22e2d5=_0x201c49;this[_0x22e2d5(0x3ad)](...arguments);}Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]=Object[_0x201c49(0x35d)](Sprite_Clickable[_0x201c49(0x33b)]),Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['constructor']=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x3ad)]=function(_0x482c95,_0x1035c7){const _0x155752=_0x201c49;this['initMembers'](_0x482c95,_0x1035c7),Sprite_Clickable[_0x155752(0x33b)][_0x155752(0x3ad)]['call'](this),this[_0x155752(0x40a)]=0x0,this['createChildren'](),this[_0x155752(0x4a6)]();},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x2eb)]=function(_0x5f4c79,_0x59baaf){const _0xfef3eb=_0x201c49;this[_0xfef3eb(0x2c7)]=_0x5f4c79,this[_0xfef3eb(0x4a2)]=_0x59baaf;const _0x173fa0=Window_BTB_TurnOrder[_0xfef3eb(0x225)],_0x23ce01=this[_0xfef3eb(0x442)](),_0x19a3ec=this[_0xfef3eb(0x285)]();this[_0xfef3eb(0x38c)]=0x0,this[_0xfef3eb(0x45b)]=_0x23ce01?_0x173fa0['SpriteThin']*_0x19a3ec:0x0,this[_0xfef3eb(0x2c1)]=_0x23ce01?0x0:_0x173fa0['SpriteThin']*_0x19a3ec,this[_0xfef3eb(0x2f8)]=0x0,this[_0xfef3eb(0x1f5)]=0xff,this[_0xfef3eb(0x261)]=![],this[_0xfef3eb(0x308)]=![],this[_0xfef3eb(0x237)]=0x0,this[_0xfef3eb(0x353)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['createChildren']=function(){const _0x291507=_0x201c49;this['createInitialPositions'](),this[_0x291507(0x1fb)](),this['createGraphicSprite'](),this[_0x291507(0x328)](),this[_0x291507(0x2d5)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x367)]=function(){const _0x25c490=_0x201c49;this['x']=this[_0x25c490(0x45b)],this['y']=this[_0x25c490(0x2c1)];},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x442)]=function(){const _0x3cf042=_0x201c49,_0x429e76=Window_BTB_TurnOrder[_0x3cf042(0x225)],_0x28e113=[_0x3cf042(0x2c3),'bottom'][_0x3cf042(0x414)](_0x429e76[_0x3cf042(0x3b3)]);return _0x28e113;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x202)]=function(){const _0x53ade4=_0x201c49,_0x5e3430=Window_BTB_TurnOrder['Settings'];return this[_0x53ade4(0x442)]()?_0x5e3430[_0x53ade4(0x23e)]:_0x5e3430[_0x53ade4(0x446)];},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x1fa)]=function(){const _0x1e2cf5=_0x201c49,_0x4af165=Window_BTB_TurnOrder[_0x1e2cf5(0x225)];return this[_0x1e2cf5(0x442)]()?_0x4af165[_0x1e2cf5(0x446)]:_0x4af165[_0x1e2cf5(0x23e)];},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x2ad)]=function(){const _0x4be46d=_0x201c49;this['bitmap']=new Bitmap(0x48,0x24);const _0x450910=this[_0x4be46d(0x47a)]()?this['battler']()[_0x4be46d(0x3f5)]():'%1\x20%2\x20%3'[_0x4be46d(0x37d)](this[_0x4be46d(0x2c7)],this['_index']);this[_0x4be46d(0x307)][_0x4be46d(0x26a)](_0x450910,0x0,0x0,0x48,0x24,_0x4be46d(0x292));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x1fb)]=function(){const _0x28a0d7=_0x201c49;if(!Window_BTB_TurnOrder[_0x28a0d7(0x225)][_0x28a0d7(0x330)])return;const _0x2981a6=Window_BTB_TurnOrder[_0x28a0d7(0x225)],_0x41afe8=this['_unit']===$gameParty?_0x28a0d7(0x3f9):_0x28a0d7(0x2d4),_0x4f2f09=_0x28a0d7(0x40b)['format'](_0x41afe8),_0x16c47f=new Sprite();_0x16c47f[_0x28a0d7(0x2a9)]['x']=this[_0x28a0d7(0x2a9)]['x'],_0x16c47f['anchor']['y']=this[_0x28a0d7(0x2a9)]['y'];if(_0x2981a6[_0x4f2f09])_0x16c47f[_0x28a0d7(0x307)]=ImageManager[_0x28a0d7(0x443)](_0x2981a6[_0x4f2f09]);else{const _0x4a1887=this[_0x28a0d7(0x202)](),_0x212296=this[_0x28a0d7(0x1fa)]();_0x16c47f[_0x28a0d7(0x307)]=new Bitmap(_0x4a1887,_0x212296);const _0x56af02=ColorManager[_0x28a0d7(0x212)](_0x2981a6[_0x28a0d7(0x234)[_0x28a0d7(0x37d)](_0x41afe8)]),_0x3f9536=ColorManager[_0x28a0d7(0x212)](_0x2981a6[_0x28a0d7(0x2f4)['format'](_0x41afe8)]);_0x16c47f[_0x28a0d7(0x307)][_0x28a0d7(0x403)](0x0,0x0,_0x4a1887,_0x212296,_0x56af02,_0x3f9536,!![]);}this[_0x28a0d7(0x395)]=_0x16c47f,this[_0x28a0d7(0x2bd)](this[_0x28a0d7(0x395)]);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x35f)]=function(){const _0x321a4f=_0x201c49,_0x1e689b=new Sprite();_0x1e689b[_0x321a4f(0x2a9)]['x']=this[_0x321a4f(0x2a9)]['x'],_0x1e689b[_0x321a4f(0x2a9)]['y']=this[_0x321a4f(0x2a9)]['y'],this[_0x321a4f(0x3a2)]=_0x1e689b,this[_0x321a4f(0x2bd)](this[_0x321a4f(0x3a2)]),this[_0x321a4f(0x361)]();},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x328)]=function(){const _0x534b17=_0x201c49;if(!Window_BTB_TurnOrder[_0x534b17(0x225)][_0x534b17(0x3cf)])return;const _0xd0edb8=Window_BTB_TurnOrder[_0x534b17(0x225)],_0x1db435=this[_0x534b17(0x2c7)]===$gameParty?_0x534b17(0x3f9):_0x534b17(0x2d4),_0x430f5f=_0x534b17(0x279)[_0x534b17(0x37d)](_0x1db435),_0x1be87e=new Sprite();_0x1be87e[_0x534b17(0x2a9)]['x']=this['anchor']['x'],_0x1be87e['anchor']['y']=this[_0x534b17(0x2a9)]['y'];if(_0xd0edb8[_0x430f5f])_0x1be87e['bitmap']=ImageManager['loadSystem'](_0xd0edb8[_0x430f5f]);else{if('xSymr'!==_0x534b17(0x48b))this['_subject'][_0x534b17(0x222)]();else{let _0x41f19a=this['bitmapWidth'](),_0x200859=this[_0x534b17(0x1fa)](),_0x431714=_0xd0edb8[_0x534b17(0x305)];_0x1be87e[_0x534b17(0x307)]=new Bitmap(_0x41f19a,_0x200859);const _0x322b58=_0x534b17(0x333),_0x297194=ColorManager[_0x534b17(0x212)](_0xd0edb8['%1BorderColor'[_0x534b17(0x37d)](_0x1db435)]);_0x1be87e[_0x534b17(0x307)]['fillRect'](0x0,0x0,_0x41f19a,_0x200859,_0x322b58),_0x41f19a-=0x2,_0x200859-=0x2,_0x1be87e[_0x534b17(0x307)][_0x534b17(0x2ac)](0x1,0x1,_0x41f19a,_0x200859,_0x297194),_0x41f19a-=_0x431714*0x2,_0x200859-=_0x431714*0x2,_0x1be87e[_0x534b17(0x307)][_0x534b17(0x2ac)](0x1+_0x431714,0x1+_0x431714,_0x41f19a,_0x200859,_0x322b58),_0x41f19a-=0x2,_0x200859-=0x2,_0x431714+=0x1,_0x1be87e[_0x534b17(0x307)][_0x534b17(0x47b)](0x1+_0x431714,0x1+_0x431714,_0x41f19a,_0x200859);}}this[_0x534b17(0x395)]=_0x1be87e,this[_0x534b17(0x2bd)](this[_0x534b17(0x395)]),this[_0x534b17(0x2ba)]=this[_0x534b17(0x395)][_0x534b17(0x2ba)],this[_0x534b17(0x250)]=this[_0x534b17(0x395)][_0x534b17(0x250)];},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x2d5)]=function(){const _0x5ad883=_0x201c49,_0x680109=Window_BTB_TurnOrder['Settings'];if(!_0x680109[_0x5ad883(0x3ef)])return;if(this['_unit']===$gameParty)return;const _0x3f5717=this['bitmapWidth'](),_0xe01b74=this[_0x5ad883(0x1fa)](),_0x41b585=new Sprite();_0x41b585[_0x5ad883(0x2a9)]['x']=this[_0x5ad883(0x2a9)]['x'],_0x41b585[_0x5ad883(0x2a9)]['y']=this[_0x5ad883(0x2a9)]['y'],_0x41b585[_0x5ad883(0x307)]=new Bitmap(_0x3f5717,_0xe01b74),this[_0x5ad883(0x497)]=_0x41b585,this[_0x5ad883(0x2bd)](this[_0x5ad883(0x497)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x47a)]=function(){const _0x2ff8c6=_0x201c49;return this[_0x2ff8c6(0x2c7)]?this[_0x2ff8c6(0x2c7)][_0x2ff8c6(0x423)]()[this[_0x2ff8c6(0x4a2)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['update']=function(){const _0x1f6faf=_0x201c49;Sprite_Clickable['prototype']['update'][_0x1f6faf(0x22d)](this),this[_0x1f6faf(0x43e)](),this['updatePosition'](),this[_0x1f6faf(0x4a6)](),this[_0x1f6faf(0x44e)](),this[_0x1f6faf(0x3af)](),this[_0x1f6faf(0x3eb)](),this[_0x1f6faf(0x33f)](),this[_0x1f6faf(0x3fd)]();},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x43e)]=function(){const _0x137aaf=_0x201c49,_0x158602=this[_0x137aaf(0x334)]();if(this['_position']===_0x158602)return;this[_0x137aaf(0x20e)]=_0x158602;this[_0x137aaf(0x40a)]<0xff&&this[_0x137aaf(0x47a)]()&&_0x158602!==this[_0x137aaf(0x285)]()&&this[_0x137aaf(0x417)](0xff);if(_0x158602===this['defaultPosition']()&&this[_0x137aaf(0x2f8)]<=0x0&&this[_0x137aaf(0x40a)]>0x0)_0x137aaf(0x43c)===_0x137aaf(0x43c)?this[_0x137aaf(0x417)](0x0):this[_0x137aaf(0x3a6)]=_0x137aaf(0x46e);else{if(this[_0x137aaf(0x2f8)]<=0x0&&this[_0x137aaf(0x40a)]<0xff){if(_0x137aaf(0x2e9)===_0x137aaf(0x3a9)){if(!_0x54ba61[_0x137aaf(0x2df)]())return;if(!_0x3f0ae7[_0x137aaf(0x3f1)]())return;this[_0x137aaf(0x341)]();}else this[_0x137aaf(0x4a6)]();}}this[_0x137aaf(0x400)]();},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x2e5)]=function(){const _0x5ce9d1=_0x201c49,_0x524af8=this[_0x5ce9d1(0x2f1)]();if(!_0x524af8)return;let _0x30071c=![];if(this[_0x5ce9d1(0x237)]!==_0x524af8[_0x5ce9d1(0x2ba)])_0x5ce9d1(0x4a8)!==_0x5ce9d1(0x4a8)?this[_0x5ce9d1(0x36a)]():_0x30071c=!![];else this[_0x5ce9d1(0x353)]!==_0x524af8[_0x5ce9d1(0x250)]&&('Jnqqs'!==_0x5ce9d1(0x208)?_0x2b9e61=_0x4c4e02+this[_0x5ce9d1(0x3cb)]()+_0x50a93e:_0x30071c=!![]);if(_0x30071c){if('RTjbR'===_0x5ce9d1(0x281))this[_0x5ce9d1(0x400)]();else{if(!this[_0x5ce9d1(0x2df)]())return;this[_0x5ce9d1(0x4a9)]=this[_0x5ce9d1(0x4a9)]||[],this[_0x5ce9d1(0x4a9)]=this[_0x5ce9d1(0x4a9)][_0x5ce9d1(0x2bb)](_0x9b6be4=>_0x9b6be4&&_0x9b6be4[_0x5ce9d1(0x3c6)]()&&_0x9b6be4[_0x5ce9d1(0x3b8)]()),this[_0x5ce9d1(0x4a3)]();}}},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x400)]=function(){const _0x7a84d8=_0x201c49,_0x6202ec=Window_BTB_TurnOrder[_0x7a84d8(0x225)],_0x3eac87=this[_0x7a84d8(0x442)](),_0x202bb1=_0x6202ec['OrderDirection'],_0x5bf841=_0x6202ec[_0x7a84d8(0x461)],_0x4f5fc9=SceneManager[_0x7a84d8(0x489)]['_btbTurnOrderWindow'];if(!_0x4f5fc9)return;const _0x428e48=this[_0x7a84d8(0x334)]();this[_0x7a84d8(0x38c)]=_0x6202ec[_0x7a84d8(0x255)],this[_0x7a84d8(0x45b)]=_0x3eac87?_0x6202ec[_0x7a84d8(0x23e)]*_0x428e48:0x0,this['_positionTargetY']=_0x3eac87?0x0:_0x6202ec[_0x7a84d8(0x23e)]*_0x428e48,_0x428e48>0x0&&(this[_0x7a84d8(0x45b)]+=_0x3eac87?_0x5bf841:0x0,this[_0x7a84d8(0x2c1)]+=_0x3eac87?0x0:_0x5bf841),_0x202bb1?this[_0x7a84d8(0x45b)]=_0x3eac87?_0x4f5fc9[_0x7a84d8(0x2ba)]-this[_0x7a84d8(0x45b)]-_0x6202ec[_0x7a84d8(0x23e)]:0x0:_0x7a84d8(0x2b7)===_0x7a84d8(0x2b7)?this[_0x7a84d8(0x2c1)]=_0x3eac87?0x0:_0x4f5fc9[_0x7a84d8(0x250)]-this[_0x7a84d8(0x2c1)]-_0x6202ec[_0x7a84d8(0x23e)]:this[_0x7a84d8(0x22c)]&&!this[_0x7a84d8(0x22c)][_0x7a84d8(0x38b)]()&&this['_actor'][_0x7a84d8(0x4a5)]()&&_0x2ea4cb[_0x7a84d8(0x489)][_0x7a84d8(0x312)]();},Sprite_BTB_TurnOrder_Battler['prototype']['updatePosition']=function(){const _0xb2a2d7=_0x201c49;if(this[_0xb2a2d7(0x2f8)]>0x0)return;if(this['_positionDuration']>0x0){if(_0xb2a2d7(0x35a)!==_0xb2a2d7(0x35a)){if(_0x4939fe[_0xb2a2d7(0x30b)]===_0x2a931f)return!![];return _0x717b1c[_0xb2a2d7(0x30b)];}else{const _0x4f677f=this[_0xb2a2d7(0x38c)];this['x']=(this['x']*(_0x4f677f-0x1)+this[_0xb2a2d7(0x45b)])/_0x4f677f,this['y']=(this['y']*(_0x4f677f-0x1)+this[_0xb2a2d7(0x2c1)])/_0x4f677f,this['_positionDuration']--;}}if(this[_0xb2a2d7(0x38c)]<=0x0){if('lCTqK'===_0xb2a2d7(0x263)){this['x']=this[_0xb2a2d7(0x45b)],this['y']=this[_0xb2a2d7(0x2c1)];if(this[_0xb2a2d7(0x40a)]<0xff&&!this['_isBattleOver']&&this[_0xb2a2d7(0x2f8)]<=0x0){if(_0xb2a2d7(0x41f)===_0xb2a2d7(0x41f)){const _0x22ec81=this['battler']();_0x22ec81&&(_0xb2a2d7(0x39e)!==_0xb2a2d7(0x39e)?this[_0xb2a2d7(0x20a)]():this['_fadeTarget']=_0x22ec81['isAlive']()&&_0x22ec81[_0xb2a2d7(0x3c6)]()?0xff:0x0);}else return this[_0xb2a2d7(0x361)]();}}else _0x4b664e=_0x43e5d6[_0xb2a2d7(0x411)];}},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x285)]=function(){const _0x1cae4a=_0x201c49,_0x4823af=Window_BTB_TurnOrder['Settings'],_0x37d828=this[_0x1cae4a(0x442)]()?_0x4823af[_0x1cae4a(0x2e4)]:_0x4823af['MaxVertSprites'];return _0x37d828+0x1;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x2f1)]=function(){const _0x336979=_0x201c49;return SceneManager['_scene'][_0x336979(0x2c2)];},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x334)]=function(){const _0x4405a3=_0x201c49,_0x27dcd0=this['battler']();if(!_0x27dcd0)return this[_0x4405a3(0x285)]();if(_0x27dcd0===BattleManager[_0x4405a3(0x243)])return 0x0;if(BattleManager['_actionBattlers'][_0x4405a3(0x414)](_0x27dcd0)){const _0x7ec74c=BattleManager['_actionBattlers'][_0x4405a3(0x399)](_0x27dcd0)+0x1;return _0x7ec74c;}return this[_0x4405a3(0x285)]();},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x417)]=function(_0x46f994){const _0x8820b=_0x201c49,_0x2f8ddd=Window_BTB_TurnOrder[_0x8820b(0x225)];this[_0x8820b(0x2f8)]=_0x2f8ddd[_0x8820b(0x255)],this[_0x8820b(0x1f5)]=_0x46f994;},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x4a6)]=function(){const _0x31dc15=_0x201c49,_0x4189d9=this[_0x31dc15(0x47a)]();if(!_0x4189d9)return;if(this[_0x31dc15(0x261)]===_0x4189d9[_0x31dc15(0x3b8)]()&&this['_isAppeared']===_0x4189d9['isAppeared']())return;this[_0x31dc15(0x261)]=_0x4189d9[_0x31dc15(0x3b8)](),this['_isAppeared']=_0x4189d9[_0x31dc15(0x3c6)]();let _0x20cf04=this[_0x31dc15(0x261)]&&this[_0x31dc15(0x308)]?0xff:0x0;this['startFade'](_0x20cf04);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x44e)]=function(){const _0x3c76c5=_0x201c49;if(this[_0x3c76c5(0x2f8)]>0x0){const _0x5104d4=this[_0x3c76c5(0x2f8)];this[_0x3c76c5(0x40a)]=(this[_0x3c76c5(0x40a)]*(_0x5104d4-0x1)+this[_0x3c76c5(0x1f5)])/_0x5104d4,this['_fadeDuration']--,this[_0x3c76c5(0x2f8)]<=0x0&&('SZMwK'!==_0x3c76c5(0x27c)?(_0x11f2a0['BattleSystemBTB'][_0x3c76c5(0x404)]['call'](this,_0x347699),this[_0x3c76c5(0x3cd)](_0xbf9269)):(this[_0x3c76c5(0x43e)](),this[_0x3c76c5(0x38c)]=0x0,this[_0x3c76c5(0x2a5)](),this[_0x3c76c5(0x40a)]=this[_0x3c76c5(0x1f5)]));}if(this[_0x3c76c5(0x264)])return;BattleManager[_0x3c76c5(0x3ea)]===_0x3c76c5(0x456)&&(this['_isBattleOver']=!![],this[_0x3c76c5(0x417)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['updateGraphic']=function(){const _0x4b4b27=_0x201c49,_0x15639d=this[_0x4b4b27(0x47a)]();if(!_0x15639d)return;const _0x25a090=Window_BTB_TurnOrder[_0x4b4b27(0x225)],_0x30a93e=this[_0x4b4b27(0x2c7)]===$gameParty?'Actor':_0x4b4b27(0x2d4);let _0x380528=_0x15639d[_0x4b4b27(0x3dc)]();if(_0x15639d['isActor']()&&_0x380528===_0x4b4b27(0x23b))_0x380528=_0x4b4b27(0x46e);else _0x15639d['isEnemy']()&&_0x380528===_0x4b4b27(0x2c8)&&(_0x4b4b27(0x4a7)===_0x4b4b27(0x1f2)?this['canPayActionFusionCombination'](_0x907aa7)&&(_0x54f57a=_0xd8f890,_0x4544ce=_0x1d558b[_0x3eeefe]):_0x380528=_0x4b4b27(0x23b));if(this[_0x4b4b27(0x3a6)]!==_0x380528)return this[_0x4b4b27(0x361)]();switch(this['_graphicType']){case _0x4b4b27(0x46e):if(this[_0x4b4b27(0x3b5)]!==_0x15639d[_0x4b4b27(0x2ec)]())return this[_0x4b4b27(0x361)]();if(this[_0x4b4b27(0x246)]!==_0x15639d['TurnOrderBTBGraphicFaceIndex']()){if(_0x4b4b27(0x32e)==='CvDne')_0x81ec61[_0x4b4b27(0x265)](_0x580400[_0x4b4b27(0x394)](_0x58cebf));else return this['processUpdateGraphic']();}break;case'icon':if(this[_0x4b4b27(0x45f)]!==_0x15639d[_0x4b4b27(0x2d9)]())return this['processUpdateGraphic']();break;case _0x4b4b27(0x23b):if(_0x15639d[_0x4b4b27(0x2ce)]()){if(this['_graphicSv']!==_0x15639d[_0x4b4b27(0x3f7)]())return this['processUpdateGraphic']();}else{if(this[_0x4b4b27(0x25c)]!==_0x15639d[_0x4b4b27(0x286)]())return this[_0x4b4b27(0x361)]();}break;case _0x4b4b27(0x2c8):if(_0x15639d['isActor']()){if(this[_0x4b4b27(0x296)]!==_0x15639d['battlerName']())return this[_0x4b4b27(0x361)]();}else{if(this['_graphicEnemy']!==_0x15639d[_0x4b4b27(0x286)]()){if(_0x4b4b27(0x244)!==_0x4b4b27(0x439))return this[_0x4b4b27(0x361)]();else this[_0x4b4b27(0x491)]()?this[_0x4b4b27(0x22c)]&&!this['_actor']['hideBraveTrait']()&&this[_0x4b4b27(0x22c)][_0x4b4b27(0x4a5)]()&&_0x264b76[_0x4b4b27(0x489)]['performBrave']():_0x1f4029[_0x4b4b27(0x356)][_0x4b4b27(0x426)][_0x4b4b27(0x22d)](this);}}break;}},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['processUpdateGraphic']=function(){const _0x1edef1=_0x201c49,_0x1dac1a=this[_0x1edef1(0x47a)]();if(!_0x1dac1a)return;this[_0x1edef1(0x3a6)]=_0x1dac1a[_0x1edef1(0x3dc)]();if(_0x1dac1a[_0x1edef1(0x2ca)]()&&this[_0x1edef1(0x3a6)]===_0x1edef1(0x23b))this[_0x1edef1(0x3a6)]='face';else _0x1dac1a[_0x1edef1(0x21d)]()&&this[_0x1edef1(0x3a6)]===_0x1edef1(0x2c8)&&(this[_0x1edef1(0x3a6)]=_0x1edef1(0x23b));let _0x4548f1;switch(this[_0x1edef1(0x3a6)]){case _0x1edef1(0x46e):this[_0x1edef1(0x3b5)]=_0x1dac1a['TurnOrderBTBGraphicFaceName'](),this[_0x1edef1(0x246)]=_0x1dac1a[_0x1edef1(0x240)](),_0x4548f1=ImageManager[_0x1edef1(0x299)](this[_0x1edef1(0x3b5)]),_0x4548f1['addLoadListener'](this[_0x1edef1(0x30a)]['bind'](this,_0x4548f1));break;case'icon':this[_0x1edef1(0x45f)]=_0x1dac1a[_0x1edef1(0x458)](),_0x4548f1=ImageManager[_0x1edef1(0x443)]('IconSet'),_0x4548f1[_0x1edef1(0x490)](this['changeIconGraphicBitmap']['bind'](this,_0x4548f1));break;case _0x1edef1(0x23b):if(_0x1dac1a['hasSvBattler']()){if(_0x1edef1(0x352)==='tTrza')this[_0x1edef1(0x296)]=_0x1dac1a[_0x1edef1(0x3f7)](),_0x4548f1=ImageManager[_0x1edef1(0x422)](this[_0x1edef1(0x296)]),_0x4548f1[_0x1edef1(0x490)](this[_0x1edef1(0x236)]['bind'](this,_0x4548f1));else return _0x11f46c[_0x1edef1(0x2df)]()&&this[_0x1edef1(0x486)]()<0x0?![]:_0x3f07c2[_0x1edef1(0x356)][_0x1edef1(0x319)][_0x1edef1(0x22d)](this);}else $gameSystem[_0x1edef1(0x349)]()?(this[_0x1edef1(0x25c)]=_0x1dac1a[_0x1edef1(0x286)](),_0x4548f1=ImageManager[_0x1edef1(0x3a4)](this[_0x1edef1(0x25c)]),_0x4548f1[_0x1edef1(0x490)](this[_0x1edef1(0x3e7)][_0x1edef1(0x3e0)](this,_0x4548f1))):(this[_0x1edef1(0x25c)]=_0x1dac1a['battlerName'](),_0x4548f1=ImageManager['loadEnemy'](this['_graphicEnemy']),_0x4548f1[_0x1edef1(0x490)](this['changeEnemyGraphicBitmap'][_0x1edef1(0x3e0)](this,_0x4548f1)));break;case'svactor':this[_0x1edef1(0x296)]=_0x1dac1a[_0x1edef1(0x286)](),_0x4548f1=ImageManager['loadSvActor'](this[_0x1edef1(0x296)]),_0x4548f1[_0x1edef1(0x490)](this['changeSvActorGraphicBitmap'][_0x1edef1(0x3e0)](this,_0x4548f1));break;}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x30a)]=function(_0x38236a){const _0x4cdc7e=_0x201c49,_0x34efec=this[_0x4cdc7e(0x246)],_0x2fcae6=this[_0x4cdc7e(0x202)](),_0x390a0f=this[_0x4cdc7e(0x1fa)](),_0x20f768=Math[_0x4cdc7e(0x391)](_0x2fcae6,_0x390a0f);this['_graphicSprite'][_0x4cdc7e(0x307)]=new Bitmap(_0x2fcae6,_0x390a0f);const _0x56df4d=this['_graphicSprite'][_0x4cdc7e(0x307)],_0x111872=ImageManager['faceWidth'],_0x17734b=ImageManager[_0x4cdc7e(0x2a3)],_0x2d6d5f=_0x20f768/Math['max'](_0x111872,_0x17734b),_0x3f99d8=ImageManager['faceWidth'],_0x1a031c=ImageManager['faceHeight'],_0x2a7711=_0x34efec%0x4*_0x111872+(_0x111872-_0x3f99d8)/0x2,_0x5399f7=Math[_0x4cdc7e(0x346)](_0x34efec/0x4)*_0x17734b+(_0x17734b-_0x1a031c)/0x2,_0x432994=(_0x2fcae6-_0x111872*_0x2d6d5f)/0x2,_0x14a3f7=(_0x390a0f-_0x17734b*_0x2d6d5f)/0x2;_0x56df4d[_0x4cdc7e(0x42f)](_0x38236a,_0x2a7711,_0x5399f7,_0x3f99d8,_0x1a031c,_0x432994,_0x14a3f7,_0x20f768,_0x20f768);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x2d3)]=function(_0x1ceca7){const _0x3080c7=_0x201c49,_0x26288b=this[_0x3080c7(0x45f)],_0x5d83c9=this[_0x3080c7(0x202)](),_0x1c32ba=this[_0x3080c7(0x1fa)]();this[_0x3080c7(0x3a2)][_0x3080c7(0x307)]=new Bitmap(_0x5d83c9,_0x1c32ba);const _0x3615ac=this['_graphicSprite'][_0x3080c7(0x307)],_0x3fe88f=ImageManager[_0x3080c7(0x206)],_0x560eb6=ImageManager[_0x3080c7(0x40d)],_0x10d0ad=Math['min'](_0x3fe88f,_0x560eb6,_0x5d83c9,_0x1c32ba),_0x26986a=_0x26288b%0x10*_0x3fe88f,_0x1b69f6=Math['floor'](_0x26288b/0x10)*_0x560eb6,_0x47172e=Math[_0x3080c7(0x346)](Math[_0x3080c7(0x391)](_0x5d83c9-_0x10d0ad,0x0)/0x2),_0x4469e0=Math[_0x3080c7(0x346)](Math[_0x3080c7(0x391)](_0x1c32ba-_0x10d0ad,0x0)/0x2);_0x3615ac['blt'](_0x1ceca7,_0x26986a,_0x1b69f6,_0x3fe88f,_0x560eb6,_0x47172e,_0x4469e0,_0x10d0ad,_0x10d0ad);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x201c49(0x236)]=function(_0x53eb66){const _0x59281b=_0x201c49,_0x112a82=this['bitmapWidth'](),_0x94cd47=this['bitmapHeight'](),_0x329c1c=Math[_0x59281b(0x24f)](_0x112a82,_0x94cd47);this[_0x59281b(0x3a2)][_0x59281b(0x307)]=new Bitmap(_0x112a82,_0x94cd47);const _0x2aa9a1=this[_0x59281b(0x3a2)][_0x59281b(0x307)],_0xb93594=this[_0x59281b(0x296)][_0x59281b(0x36b)](/\$/i),_0x3e9250=_0xb93594?0x1:ImageManager[_0x59281b(0x31c)],_0x39468d=_0xb93594?0x1:ImageManager['svActorVertCells'],_0x4cb3de=_0x53eb66['width']/_0x3e9250,_0x5884b4=_0x53eb66[_0x59281b(0x250)]/_0x39468d,_0x2a1006=Math[_0x59281b(0x24f)](0x1,_0x329c1c/_0x4cb3de,_0x329c1c/_0x5884b4),_0x1c3923=_0x4cb3de*_0x2a1006,_0x2e7acf=_0x5884b4*_0x2a1006,_0x47cc1c=Math[_0x59281b(0x3a1)]((_0x112a82-_0x1c3923)/0x2),_0x43225e=Math[_0x59281b(0x3a1)]((_0x94cd47-_0x2e7acf)/0x2);_0x2aa9a1['blt'](_0x53eb66,0x0,0x0,_0x4cb3de,_0x5884b4,_0x47cc1c,_0x43225e,_0x1c3923,_0x2e7acf);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x3e7)]=function(_0x4dd19d){const _0x4365f6=_0x201c49,_0x2de04e=Window_BTB_TurnOrder[_0x4365f6(0x225)],_0xa8d7d6=this[_0x4365f6(0x202)](),_0x3a8da3=this[_0x4365f6(0x1fa)](),_0x2a9ad0=Math[_0x4365f6(0x24f)](_0xa8d7d6,_0x3a8da3);this[_0x4365f6(0x3a2)][_0x4365f6(0x307)]=new Bitmap(_0xa8d7d6,_0x3a8da3);const _0x5569aa=this['_graphicSprite'][_0x4365f6(0x307)],_0x2b88e9=Math[_0x4365f6(0x24f)](0x1,_0x2a9ad0/_0x4dd19d[_0x4365f6(0x2ba)],_0x2a9ad0/_0x4dd19d[_0x4365f6(0x250)]),_0x15b5ad=_0x4dd19d[_0x4365f6(0x2ba)]*_0x2b88e9,_0x3aaeec=_0x4dd19d[_0x4365f6(0x250)]*_0x2b88e9,_0xd7cd42=Math[_0x4365f6(0x3a1)]((_0xa8d7d6-_0x15b5ad)/0x2),_0xa10c3=Math[_0x4365f6(0x3a1)]((_0x3a8da3-_0x3aaeec)/0x2);_0x5569aa['blt'](_0x4dd19d,0x0,0x0,_0x4dd19d['width'],_0x4dd19d[_0x4365f6(0x250)],_0xd7cd42,_0xa10c3,_0x15b5ad,_0x3aaeec);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x3eb)]=function(){const _0x1ff238=_0x201c49,_0x1a2aaf=this[_0x1ff238(0x47a)]();if(!_0x1a2aaf)return;if(!_0x1a2aaf[_0x1ff238(0x21d)]())return;if(this[_0x1ff238(0x314)]===_0x1a2aaf[_0x1ff238(0x498)]())return;this[_0x1ff238(0x314)]=_0x1a2aaf['battlerHue']();if(_0x1a2aaf['hasSvBattler']())this[_0x1ff238(0x314)]=0x0;this[_0x1ff238(0x3a2)][_0x1ff238(0x266)](this[_0x1ff238(0x314)]);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)][_0x201c49(0x33f)]=function(){const _0x2b3876=_0x201c49;if(!this[_0x2b3876(0x497)])return;const _0x23f83b=this[_0x2b3876(0x47a)]();if(!_0x23f83b)return;if(this[_0x2b3876(0x1ed)]===_0x23f83b[_0x2b3876(0x1ed)]&&this['_plural']===_0x23f83b[_0x2b3876(0x306)])return;this[_0x2b3876(0x1ed)]=_0x23f83b[_0x2b3876(0x1ed)],this[_0x2b3876(0x306)]=_0x23f83b['_plural'];const _0x4a5c07=Window_BTB_TurnOrder[_0x2b3876(0x225)],_0x6f141d=this['isHorz'](),_0x150010=this[_0x2b3876(0x202)](),_0x59de0b=this[_0x2b3876(0x1fa)](),_0x52aa4b=this[_0x2b3876(0x497)]['bitmap'];_0x52aa4b[_0x2b3876(0x31f)]();if(!this[_0x2b3876(0x306)])return;_0x52aa4b[_0x2b3876(0x339)]=_0x4a5c07[_0x2b3876(0x22e)]||$gameSystem[_0x2b3876(0x245)](),_0x52aa4b[_0x2b3876(0x223)]=_0x4a5c07[_0x2b3876(0x3d7)]||0x10,_0x6f141d?_0x52aa4b[_0x2b3876(0x26a)](this['_letter'][_0x2b3876(0x2b6)](),0x0,_0x59de0b/0x2,_0x150010,_0x59de0b/0x2,_0x2b3876(0x292)):_0x52aa4b[_0x2b3876(0x26a)](this['_letter'][_0x2b3876(0x2b6)](),0x0,0x2,_0x150010-0x8,_0x59de0b-0x4,'right');},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['updateSelectionEffect']=function(){const _0x509a32=_0x201c49,_0x31a49e=this[_0x509a32(0x47a)]();if(!_0x31a49e)return;const _0x109064=_0x31a49e['battler']();if(!_0x109064)return;const _0x2291fd=_0x109064[_0x509a32(0x38a)]();if(!_0x2291fd)return;this[_0x509a32(0x46c)](_0x2291fd[_0x509a32(0x45e)]);},Sprite_BTB_TurnOrder_Battler[_0x201c49(0x33b)]['getStateTooltipBattler']=function(){const _0x599582=_0x201c49;return this[_0x599582(0x47a)]();},VisuMZ['BattleSystemBTB'][_0x201c49(0x3fa)]=Window_Base[_0x201c49(0x33b)][_0x201c49(0x1f7)],Window_Base[_0x201c49(0x33b)][_0x201c49(0x1f7)]=function(_0x1536d7,_0x12f842,_0x1453ba){const _0x235937=_0x201c49;return _0x1453ba=VisuMZ[_0x235937(0x356)]['Window_Base_makeAdditionalSkillCostText']['call'](this,_0x1536d7,_0x12f842,_0x1453ba),_0x1453ba=this[_0x235937(0x2a0)](_0x1536d7,_0x12f842,_0x1453ba),_0x1453ba;},VisuMZ[_0x201c49(0x356)]['Window_Base_drawItemNumber']=Window_Base['prototype']['drawItemNumber'],Window_Base['prototype'][_0x201c49(0x488)]=function(_0xa8e803,_0x594283,_0x184b11,_0x332aeb){const _0x30a8e4=_0x201c49;BattleManager[_0x30a8e4(0x2df)]()&&this[_0x30a8e4(0x3ce)]===Window_BattleItem?_0x30a8e4(0x338)!==_0x30a8e4(0x338)?_0x738d80+=_0x35012c(_0x35f72c['$1']):this[_0x30a8e4(0x238)](_0xa8e803,_0x594283,_0x184b11,_0x332aeb):VisuMZ[_0x30a8e4(0x356)][_0x30a8e4(0x2dd)][_0x30a8e4(0x22d)](this,_0xa8e803,_0x594283,_0x184b11,_0x332aeb),this['resetFontSettings']();},Window_Base[_0x201c49(0x33b)][_0x201c49(0x238)]=function(_0x58ccf7,_0x49db1a,_0x5c0b77,_0x4fb617){const _0x1cfba7=_0x201c49,_0x129efb=VisuMZ[_0x1cfba7(0x356)][_0x1cfba7(0x225)]['General'],_0x40de59=BattleManager[_0x1cfba7(0x22c)]||$gameParty[_0x1cfba7(0x423)]()[0x0],_0x3b836e=this['makeAdditionalCostTextBTB'](_0x40de59,_0x58ccf7,''),_0x19f65b=this[_0x1cfba7(0x1fd)](_0x3b836e)[_0x1cfba7(0x2ba)],_0x54f3dd=_0x129efb[_0x1cfba7(0x2bf)];let _0x5047e7=_0x49db1a+_0x4fb617-_0x19f65b;if(_0x3b836e==='')VisuMZ['BattleSystemBTB'][_0x1cfba7(0x2dd)][_0x1cfba7(0x22d)](this,_0x58ccf7,_0x49db1a,_0x5c0b77,_0x4fb617);else{if(this['isDrawItemNumber'](_0x58ccf7)){this[_0x1cfba7(0x43b)]();const _0x459222=VisuMZ[_0x1cfba7(0x26e)][_0x1cfba7(0x225)][_0x1cfba7(0x49f)];this[_0x1cfba7(0x472)][_0x1cfba7(0x223)]=_0x459222[_0x1cfba7(0x3c9)];if(_0x54f3dd){if('IBeZb'===_0x1cfba7(0x429)){const _0x186e23=_0x459222[_0x1cfba7(0x273)],_0x222f01=_0x186e23['format']($gameParty['numItems'](_0x58ccf7)),_0x3930ec=this[_0x1cfba7(0x430)](_0x222f01+this[_0x1cfba7(0x3cb)]());_0x5047e7-=_0x3930ec;}else{_0x1aa926[_0x1cfba7(0x356)]['Window_BattleStatus_drawItemStatusXPStyle'][_0x1cfba7(0x22d)](this,_0x5d322c);const _0x1036a8=this[_0x1cfba7(0x1f6)](_0x3d7e47);if(this[_0x1cfba7(0x214)](_0x1036a8)){const _0x1cb0ad=this[_0x1cfba7(0x322)](_0x542c5c);let _0x6aab09=_0x1cb0ad['x'],_0x5b884c=_0x1cb0ad['y'];_0x6aab09+=this[_0x1cfba7(0x32b)](),_0x5b884c+=this[_0x1cfba7(0x21e)]();const _0x5c8b65=this[_0x1cfba7(0x37c)]();this['drawActorBravePoints'](_0x1036a8,_0x6aab09,_0x5b884c,_0x1cb0ad[_0x1cfba7(0x2ba)],_0x5c8b65);}}}else _0x1cfba7(0x43f)===_0x1cfba7(0x397)?_0x2d77c3[_0x1cfba7(0x356)][_0x1cfba7(0x386)][_0x1cfba7(0x22d)](this,_0x522300,_0x1efd10,_0x2ba9b2):_0x4fb617-=this[_0x1cfba7(0x430)](this[_0x1cfba7(0x3cb)]())+_0x19f65b;VisuMZ['BattleSystemBTB']['Window_Base_drawItemNumber']['call'](this,_0x58ccf7,_0x49db1a,_0x5c0b77,_0x4fb617);}}this['drawTextEx'](_0x3b836e,_0x5047e7,_0x5c0b77);},Window_Base[_0x201c49(0x33b)][_0x201c49(0x2a0)]=function(_0x1c6736,_0x4bab13,_0xf5539c){const _0x1aa8b2=_0x201c49;if(!BattleManager[_0x1aa8b2(0x2df)]())return _0xf5539c;if(!_0x1c6736)return _0xf5539c;if(!_0x4bab13)return _0xf5539c;if(_0x4bab13[_0x1aa8b2(0x337)][_0x1aa8b2(0x36b)](VisuMZ[_0x1aa8b2(0x356)][_0x1aa8b2(0x256)][_0x1aa8b2(0x31d)]))return _0xf5539c;let _0x2b6e66=_0x1c6736['bravePointsCost'](_0x4bab13);const _0x2414c0=VisuMZ[_0x1aa8b2(0x356)][_0x1aa8b2(0x225)][_0x1aa8b2(0x42b)],_0x230941=_0x2414c0[_0x1aa8b2(0x2bf)],_0xe23d4c=_0x2414c0['ShowCostForAttack'],_0x2a0b2b=_0x2414c0[_0x1aa8b2(0x39d)],_0x483f9e=_0x2414c0[_0x1aa8b2(0x257)]||0x0,_0x297fe7=_0x2414c0[_0x1aa8b2(0x3c3)],_0x4b174f=_0x2414c0[_0x1aa8b2(0x2d8)];if(DataManager[_0x1aa8b2(0x320)](_0x4bab13)&&this[_0x1aa8b2(0x3ce)]===Window_ActorCommand){if(_0x1aa8b2(0x48a)===_0x1aa8b2(0x29e))this[_0x1aa8b2(0x296)]=_0x23e1a2[_0x1aa8b2(0x3f7)](),_0x907795=_0xe7ae[_0x1aa8b2(0x422)](this[_0x1aa8b2(0x296)]),_0x36ca08[_0x1aa8b2(0x490)](this[_0x1aa8b2(0x236)][_0x1aa8b2(0x3e0)](this,_0x21aa15));else{if(!_0xe23d4c&&_0x4bab13['id']===_0x1c6736[_0x1aa8b2(0x29a)]())return _0xf5539c;if(!_0x2a0b2b&&_0x4bab13['id']===_0x1c6736[_0x1aa8b2(0x31e)]())return _0xf5539c;}}_0x2b6e66-=_0x483f9e;if(_0x2b6e66<0x0)return _0xf5539c;if(!_0x297fe7&&_0x2b6e66===0x0)return _0xf5539c;if(!_0x4b174f&&_0x2b6e66===0x1)return _0xf5539c;const _0x47561e=_0x1aa8b2(0x3fe)[_0x1aa8b2(0x37d)](ImageManager[_0x1aa8b2(0x44b)]),_0x12444b=TextManager[_0x1aa8b2(0x21b)];let _0x4aa278=TextManager[_0x1aa8b2(0x387)]['format'](_0x2b6e66,_0x12444b,_0x47561e);if(_0xf5539c==='')_0xf5539c+=_0x4aa278;else _0x230941?_0x1aa8b2(0x364)!==_0x1aa8b2(0x2ee)?_0xf5539c=_0x4aa278+this[_0x1aa8b2(0x3cb)]()+_0xf5539c:this[_0x1aa8b2(0x44c)]():_0xf5539c=_0xf5539c+this['skillCostSeparator']()+_0x4aa278;return _0xf5539c;},Window_Selectable[_0x201c49(0x33b)][_0x201c49(0x290)]=function(){return![];},VisuMZ[_0x201c49(0x356)][_0x201c49(0x2db)]=Window_Selectable[_0x201c49(0x33b)]['select'],Window_Selectable['prototype'][_0x201c49(0x366)]=function(_0x35bce6){const _0x46c622=_0x201c49;VisuMZ[_0x46c622(0x356)][_0x46c622(0x2db)][_0x46c622(0x22d)](this,_0x35bce6),this[_0x46c622(0x290)]()&&this[_0x46c622(0x495)]&&this['applyBattleItemWindowBTB']();},Window_Selectable[_0x201c49(0x33b)][_0x201c49(0x20a)]=function(){const _0x27c25e=_0x201c49;BattleManager[_0x27c25e(0x318)]();},VisuMZ['BattleSystemBTB'][_0x201c49(0x3b9)]=Window_Help[_0x201c49(0x33b)][_0x201c49(0x284)],Window_Help[_0x201c49(0x33b)][_0x201c49(0x284)]=function(_0x17f808){const _0x7ea650=_0x201c49;if(BattleManager[_0x7ea650(0x2df)]()&&_0x17f808&&_0x17f808[_0x7ea650(0x337)]&&_0x17f808[_0x7ea650(0x337)][_0x7ea650(0x36b)](VisuMZ[_0x7ea650(0x356)][_0x7ea650(0x256)]['BTB_Help'])){if('zRUwF'!==_0x7ea650(0x25f))this[_0x7ea650(0x419)](String(RegExp['$1']));else{const _0x24ca22=[],_0xffb6cc=function(_0x5a49ed,_0x5afbee){const _0x5cc6f3=_0x7ea650;for(var _0x3daf8c=0x0;_0x3daf8c<_0x5afbee['length'];_0x3daf8c++){_0x24ca22[_0x5cc6f3(0x265)](_0x5a49ed+'-'+_0x5afbee[_0x3daf8c]),_0xffb6cc(_0x5a49ed+'-'+_0x5afbee[_0x3daf8c],_0x5afbee['slice'](_0x3daf8c+0x1));}};return _0xffb6cc(_0x34a2f1,_0x5a51ca),_0x24ca22;}}else'KmCRi'===_0x7ea650(0x20d)?VisuMZ[_0x7ea650(0x356)][_0x7ea650(0x3b9)][_0x7ea650(0x22d)](this,_0x17f808):_0x138aeb+=_0x2f005b(_0x419a53['$1']);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x386)]=Window_BattleLog[_0x201c49(0x33b)]['startAction'],Window_BattleLog[_0x201c49(0x33b)]['startAction']=function(_0x2670dc,_0x3ad1bd,_0xcef4bc){const _0x455532=_0x201c49;if(this[_0x455532(0x3dd)](_0x2670dc)){if(_0x455532(0x4ae)!==_0x455532(0x2c6))this[_0x455532(0x444)](_0x2670dc,_0x3ad1bd,_0xcef4bc);else{const _0x257d35=this[_0x455532(0x334)]();if(this[_0x455532(0x20e)]===_0x257d35)return;this[_0x455532(0x20e)]=_0x257d35;this[_0x455532(0x40a)]<0xff&&this[_0x455532(0x47a)]()&&_0x257d35!==this['defaultPosition']()&&this[_0x455532(0x417)](0xff);if(_0x257d35===this[_0x455532(0x285)]()&&this[_0x455532(0x2f8)]<=0x0&&this[_0x455532(0x40a)]>0x0)this['startFade'](0x0);else this[_0x455532(0x2f8)]<=0x0&&this[_0x455532(0x40a)]<0xff&&this[_0x455532(0x4a6)]();this[_0x455532(0x400)]();}}else VisuMZ[_0x455532(0x356)]['Window_BattleLog_startAction'][_0x455532(0x22d)](this,_0x2670dc,_0x3ad1bd,_0xcef4bc);},Window_BattleLog[_0x201c49(0x33b)][_0x201c49(0x4b2)]=function(_0x3472e0,_0x2212b4,_0x1bfb89){const _0x50ec87=_0x201c49;VisuMZ[_0x50ec87(0x356)][_0x50ec87(0x386)][_0x50ec87(0x22d)](this,_0x3472e0,_0x2212b4,_0x1bfb89);},Window_BattleLog[_0x201c49(0x33b)]['showBraveAnimationBTB']=function(_0x2639fc){const _0x87845b=_0x201c49;if(!BattleManager[_0x87845b(0x2df)]())return![];if(!_0x2639fc)return![];if(!_0x2639fc[_0x87845b(0x21d)]())return![];if(_0x2639fc[_0x87845b(0x407)])return![];const _0x20d510=VisuMZ[_0x87845b(0x356)]['Settings'][_0x87845b(0x3bf)];if(!_0x20d510[_0x87845b(0x29f)])return![];if(_0x20d510[_0x87845b(0x47f)]<=0x0)return![];return VisuMZ[_0x87845b(0x356)][_0x87845b(0x225)]['BraveAnimation']['ShowEnemyBrave'];},Window_BattleLog['prototype'][_0x201c49(0x444)]=function(_0xa19833,_0x4398d4,_0x5cce0f){const _0x232158=_0x201c49;_0xa19833[_0x232158(0x407)]=!![];let _0x26921f=_0xa19833[_0x232158(0x420)]();const _0xceb963=VisuMZ[_0x232158(0x356)]['Settings'][_0x232158(0x3bf)],_0x4796ff=_0xceb963['BraveAnimationID'],_0x3a9ed8=_0xceb963[_0x232158(0x3d9)];while(_0x26921f--){_0x232158(0x226)!==_0x232158(0x226)?(_0x589d0c[_0x232158(0x356)][_0x232158(0x2db)][_0x232158(0x22d)](this,_0x225592),this[_0x232158(0x290)]()&&this['active']&&this[_0x232158(0x20a)]()):(this[_0x232158(0x265)]('showNormalAnimation',[_0xa19833],_0x4796ff),_0x26921f>0x0?this[_0x232158(0x265)](_0x232158(0x288),_0x3a9ed8):this[_0x232158(0x265)](_0x232158(0x252)));}this['push'](_0x232158(0x4b2),_0xa19833,_0x4398d4,_0x5cce0f);},VisuMZ[_0x201c49(0x356)][_0x201c49(0x2be)]=Window_ActorCommand['prototype'][_0x201c49(0x2cd)],Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x2cd)]=function(){const _0x16db24=_0x201c49;this['addBraveCommand'](),VisuMZ[_0x16db24(0x356)][_0x16db24(0x2be)][_0x16db24(0x22d)](this);},Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x270)]=function(){const _0x457bb1=_0x201c49;if(!this[_0x457bb1(0x3ff)]())return;const _0x4b23ec=this[_0x457bb1(0x26f)](),_0x29857f=TextManager[_0x457bb1(0x22a)],_0x396e25=ImageManager['btbBravePointsIcon'],_0x856f45=_0x4b23ec===_0x457bb1(0x479)?_0x29857f:'\x5cI[%1]%2'[_0x457bb1(0x37d)](_0x396e25,_0x29857f);this[_0x457bb1(0x360)](_0x856f45,_0x457bb1(0x2f9),this[_0x457bb1(0x22c)][_0x457bb1(0x4a5)]()),BattleManager[_0x457bb1(0x254)]();},Window_ActorCommand[_0x201c49(0x33b)]['canAddBraveCommand']=function(){const _0x1683af=_0x201c49;if(!BattleManager[_0x1683af(0x2df)]())return![];if(!VisuMZ[_0x1683af(0x356)][_0x1683af(0x225)][_0x1683af(0x44d)][_0x1683af(0x3a7)])return![];if(this['_actor']&&this[_0x1683af(0x22c)]['hideBraveTrait']())return![];return!![];},VisuMZ[_0x201c49(0x356)][_0x201c49(0x426)]=Window_Selectable['prototype']['cursorPagedown'],Window_Selectable['prototype']['cursorPagedown']=function(){const _0x3d8eb3=_0x201c49;this['isUsePageUpDnShortcutBTB']()?this[_0x3d8eb3(0x22c)]&&!this[_0x3d8eb3(0x22c)][_0x3d8eb3(0x38b)]()&&this['_actor']['canBrave']()&&SceneManager['_scene'][_0x3d8eb3(0x312)]():VisuMZ['BattleSystemBTB'][_0x3d8eb3(0x426)][_0x3d8eb3(0x22d)](this);},VisuMZ['BattleSystemBTB']['Window_Selectable_cursorPageup']=Window_Selectable[_0x201c49(0x33b)][_0x201c49(0x3f4)],Window_Selectable[_0x201c49(0x33b)][_0x201c49(0x3f4)]=function(){const _0xe1c3e4=_0x201c49;this[_0xe1c3e4(0x491)]()?this['_actor']&&!this[_0xe1c3e4(0x22c)][_0xe1c3e4(0x38b)]()&&this[_0xe1c3e4(0x22c)][_0xe1c3e4(0x1f9)]()>0x1&&SceneManager['_scene'][_0xe1c3e4(0x335)]():VisuMZ[_0xe1c3e4(0x356)][_0xe1c3e4(0x280)][_0xe1c3e4(0x22d)](this);},Window_Selectable[_0x201c49(0x33b)][_0x201c49(0x491)]=function(){const _0x3993ea=_0x201c49;if(this[_0x3993ea(0x3ce)]!==Window_ActorCommand)return![];if(!SceneManager[_0x3993ea(0x475)]())return![];if(!BattleManager[_0x3993ea(0x2df)]())return![];return VisuMZ[_0x3993ea(0x356)][_0x3993ea(0x225)][_0x3993ea(0x44d)][_0x3993ea(0x405)];},VisuMZ[_0x201c49(0x356)][_0x201c49(0x2de)]=Window_ActorCommand[_0x201c49(0x33b)]['makeCommandList'],Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x2b1)]=function(){const _0x44c376=_0x201c49;VisuMZ[_0x44c376(0x356)][_0x44c376(0x2de)][_0x44c376(0x22d)](this),this['createBTBActionCounters']();},VisuMZ[_0x201c49(0x356)][_0x201c49(0x315)]=Window_Base[_0x201c49(0x33b)]['close'],Window_Base['prototype'][_0x201c49(0x471)]=function(){const _0x2123c8=_0x201c49;VisuMZ[_0x2123c8(0x356)][_0x2123c8(0x315)][_0x2123c8(0x22d)](this),SceneManager['isSceneBattle']()&&this[_0x2123c8(0x2e2)]&&this[_0x2123c8(0x2e2)]();},Window_ActorCommand['prototype']['destroyBTBActionCounters']=function(){const _0x33d653=_0x201c49;if(!this[_0x33d653(0x1f3)])return;this[_0x33d653(0x1f3)]['bitmap']&&(_0x33d653(0x34a)!==_0x33d653(0x321)?this[_0x33d653(0x1f3)][_0x33d653(0x307)][_0x33d653(0x3ac)]():(_0x499fe8[_0x33d653(0x33b)][_0x33d653(0x210)][_0x33d653(0x22d)](this),this[_0x33d653(0x2fc)](),this[_0x33d653(0x2a5)](),this[_0x33d653(0x3e9)](),this['updateBattleContainerOrder'](),this['updateVisibility']())),this[_0x33d653(0x218)](this[_0x33d653(0x1f3)]),delete this[_0x33d653(0x1f3)];},Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x4ab)]=function(){const _0x578dfe=_0x201c49;if(!BattleManager[_0x578dfe(0x2df)]())return;if(!this[_0x578dfe(0x22c)])return;this[_0x578dfe(0x2e2)]();if(this[_0x578dfe(0x22c)][_0x578dfe(0x38b)]())return;this[_0x578dfe(0x1f3)]=new Sprite(),this[_0x578dfe(0x2bd)](this[_0x578dfe(0x1f3)]),this[_0x578dfe(0x3f0)]();},Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x3f0)]=function(){const _0x2e4f30=_0x201c49,_0x3f2a6e=VisuMZ[_0x2e4f30(0x356)][_0x2e4f30(0x225)]['Window']['DrawActionCountersJS'];if(_0x3f2a6e)_0x3f2a6e[_0x2e4f30(0x22d)](this,this[_0x2e4f30(0x1f3)],this,this['_actor']);else{if(_0x2e4f30(0x39a)===_0x2e4f30(0x39a))this[_0x2e4f30(0x3e8)][_0x2e4f30(0x22d)](this,this[_0x2e4f30(0x1f3)],this,this[_0x2e4f30(0x22c)]);else{const _0x43a4eb=_0x595c51[_0x2e4f30(0x356)]['Settings'][_0x2e4f30(0x44d)],_0x137c5b=this[_0x2e4f30(0x433)]();return _0x43a4eb[_0x2e4f30(0x3ec)[_0x2e4f30(0x37d)](_0x137c5b)]||0x0;}}},Window_ActorCommand[_0x201c49(0x33b)][_0x201c49(0x3e8)]=function(){const _0x2c10e8=_0x201c49,_0x207af5=arguments[0x0],_0x2dc641=arguments[0x1],_0x24aad9=arguments[0x2];_0x207af5['x']=Math['round'](_0x2dc641[_0x2c10e8(0x2ba)]/0x2),_0x207af5['y']=0x0,_0x207af5[_0x2c10e8(0x2a9)]['x']=0.5,_0x207af5[_0x2c10e8(0x2a9)]['y']=0.5;const _0x5af4dc=TextManager[_0x2c10e8(0x258)],_0x5309d0=TextManager[_0x2c10e8(0x2b0)];let _0x5392de=_0x5af4dc[_0x2c10e8(0x24e)](_0x24aad9[_0x2c10e8(0x1f9)]());const _0x4cc3cc=_0x24aad9[_0x2c10e8(0x39b)];_0x5392de=_0x5392de[_0x2c10e8(0x413)](0x0,_0x4cc3cc)+_0x5309d0+_0x5392de[_0x2c10e8(0x413)](_0x4cc3cc+0x1);const _0x468faa=new Bitmap(_0x2dc641[_0x2c10e8(0x2ba)],_0x2dc641[_0x2c10e8(0x390)]());_0x468faa[_0x2c10e8(0x223)]=0x24,_0x468faa['drawText'](_0x5392de,0x0,0x0,_0x468faa['width'],_0x468faa[_0x2c10e8(0x250)],'center'),_0x207af5[_0x2c10e8(0x307)]=_0x468faa;},Window_ActorCommand[_0x201c49(0x33b)]['isBattleItemWindowBTB']=function(){const _0x1655e2=_0x201c49;return BattleManager[_0x1655e2(0x2df)]();},Window_ActorCommand[_0x201c49(0x33b)]['applyBattleItemWindowBTB']=function(){const _0x3f8568=_0x201c49,_0x2510c1=BattleManager['inputtingAction']();if(_0x2510c1){if('ZRnix'!==_0x3f8568(0x20f))_0x54eebf=_0x44febd,_0x2fd058=_0xc790b2[_0x5d5058];else{const _0x3bba13=this[_0x3f8568(0x1f1)]();switch(_0x3bba13){case _0x3f8568(0x415):_0x2510c1['setAttack']();break;case _0x3f8568(0x2e3):_0x2510c1[_0x3f8568(0x437)]();break;case'singleSkill':_0x2510c1[_0x3f8568(0x447)](this['currentExt']());break;default:_0x2510c1[_0x3f8568(0x447)](null);break;}}}Window_Command[_0x3f8568(0x33b)][_0x3f8568(0x20a)][_0x3f8568(0x22d)](this);},Window_Base[_0x201c49(0x33b)][_0x201c49(0x41e)]=function(_0x5b14c3,_0x8177b2,_0x497a98,_0x4f5953,_0x3bf0bc){const _0x5acd4b=_0x201c49;if(!_0x5b14c3)return;if(!BattleManager[_0x5acd4b(0x2df)]())return;const _0x560c8e=VisuMZ[_0x5acd4b(0x356)]['Settings'][_0x5acd4b(0x44d)],_0x5d025c=BattleManager[_0x5acd4b(0x2e7)]()?_0x560c8e[_0x5acd4b(0x324)]:_0x560c8e['StatusDisplayFmt'],_0x1f75b8=_0x560c8e[_0x5acd4b(0x2b5)],_0x4dbfb0=_0x560c8e[_0x5acd4b(0x23f)],_0x2ba031=_0x560c8e[_0x5acd4b(0x2da)];let _0x14e9b8=0x0,_0x35d355=0x0;_0x35d355=_0x5b14c3[_0x5acd4b(0x486)]();if(_0x35d355>0x0)_0x14e9b8=_0x4dbfb0;if(_0x35d355===0x0)_0x14e9b8=_0x1f75b8;if(_0x35d355<0x0)_0x14e9b8=_0x2ba031;const _0x3be283='\x5cC[%1]%2\x5cC[0]'['format'](_0x14e9b8,_0x35d355),_0x4870d7=_0x5acd4b(0x3fe)[_0x5acd4b(0x37d)](ImageManager['btbBravePointsIcon']);_0x35d355=_0x5b14c3[_0x5acd4b(0x368)]();if(_0x35d355>0x0)_0x14e9b8=_0x4dbfb0;if(_0x35d355===0x0)_0x14e9b8=_0x1f75b8;_0x35d355<0x0&&(_0x14e9b8=_0x2ba031);const _0x59b0eb=_0x5acd4b(0x47d)[_0x5acd4b(0x37d)](_0x14e9b8,_0x35d355);let _0x348dd7=_0x5d025c[_0x5acd4b(0x37d)](_0x3be283,TextManager[_0x5acd4b(0x21b)],_0x4870d7,_0x59b0eb);const _0x552520=this[_0x5acd4b(0x1fd)](_0x348dd7)['width'];if(_0x3bf0bc===_0x5acd4b(0x292))_0x5acd4b(0x3d5)===_0x5acd4b(0x28c)?(this[_0x5acd4b(0x25c)]=_0x5a329f[_0x5acd4b(0x286)](),_0x8de34f=_0x3983b2['loadEnemy'](this['_graphicEnemy']),_0x34d078[_0x5acd4b(0x490)](this['changeEnemyGraphicBitmap'][_0x5acd4b(0x3e0)](this,_0x1c4783))):_0x8177b2+=Math['round']((_0x4f5953-_0x552520)/0x2);else _0x3bf0bc===_0x5acd4b(0x3d2)&&(_0x8177b2+=Math['round'](_0x4f5953-_0x552520));this[_0x5acd4b(0x48f)](_0x348dd7,_0x8177b2,_0x497a98,_0x4f5953);},Window_StatusBase[_0x201c49(0x33b)]['showBravePoints']=function(_0x2a8ac6){const _0x1a0f03=_0x201c49;if(!_0x2a8ac6)return![];if(!BattleManager['isBTB']())return![];if(!this[_0x1a0f03(0x433)])return![];if(_0x2a8ac6[_0x1a0f03(0x38b)]())return![];const _0x30562e=VisuMZ['BattleSystemBTB'][_0x1a0f03(0x225)]['Window'],_0x2391ac=this[_0x1a0f03(0x433)]();return _0x30562e[_0x1a0f03(0x326)[_0x1a0f03(0x37d)](_0x2391ac)];},VisuMZ[_0x201c49(0x356)][_0x201c49(0x365)]=Window_BattleStatus[_0x201c49(0x33b)]['drawItemStatusListStyle'],Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x3d8)]=function(_0x1a37df){const _0x116a04=_0x201c49;VisuMZ['BattleSystemBTB'][_0x116a04(0x365)][_0x116a04(0x22d)](this,_0x1a37df);const _0x21f2cf=this[_0x116a04(0x1f6)](_0x1a37df);if(this['showBravePoints'](_0x21f2cf)){const _0xa0b66b=this[_0x116a04(0x3ed)](_0x1a37df),_0x303e9b=$dataSystem[_0x116a04(0x2ab)]?0x4:0x3,_0xe44e86=_0x303e9b*0x80+(_0x303e9b-0x1)*0x8+0x4;let _0x56b863=_0xa0b66b['x']+this['padding'];if(VisuMZ[_0x116a04(0x2a4)][_0x116a04(0x225)][_0x116a04(0x275)][_0x116a04(0x385)]){if('VdXSl'==='VdXSl')_0x56b863=_0xa0b66b['x']+ImageManager['faceWidth']+0x8;else return this[_0x116a04(0x2d2)]===_0x14fccd&&(this['_btbTurnOrderIconIndex']=this[_0x116a04(0x458)]()),this[_0x116a04(0x2d2)];}else{if(_0x116a04(0x3d3)===_0x116a04(0x370))return 0x0;else _0x56b863+=ImageManager[_0x116a04(0x206)];}const _0x510312=Math[_0x116a04(0x3a1)](Math[_0x116a04(0x24f)](_0xa0b66b['x']+_0xa0b66b[_0x116a04(0x2ba)]-_0xe44e86,_0x56b863));let _0x3aece2=_0x510312+0x88,_0x946ef6=_0xa0b66b['y'];_0x3aece2+=0x88*($dataSystem['optDisplayTp']?0x3:0x2),_0x3aece2+=this['getOffsetX_BTB'](),_0x946ef6+=this[_0x116a04(0x21e)]();const _0x3ffbba=this[_0x116a04(0x37c)]();if(_0x3aece2>_0xa0b66b['x']+_0xa0b66b[_0x116a04(0x2ba)])return;this[_0x116a04(0x41e)](_0x21f2cf,_0x3aece2,_0x946ef6,_0xa0b66b[_0x116a04(0x2ba)],_0x3ffbba);}},VisuMZ[_0x201c49(0x356)][_0x201c49(0x427)]=Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x355)],Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x355)]=function(_0x1d20d7){const _0x4609e6=_0x201c49;VisuMZ[_0x4609e6(0x356)][_0x4609e6(0x427)][_0x4609e6(0x22d)](this,_0x1d20d7);const _0x316969=this[_0x4609e6(0x1f6)](_0x1d20d7);if(this[_0x4609e6(0x214)](_0x316969)){const _0x29512f=this['itemRectPortraitBTB'](_0x1d20d7);let _0x3383f9=_0x29512f['x'],_0x7e70cd=_0x29512f['y'];_0x3383f9+=this[_0x4609e6(0x32b)](),_0x7e70cd+=this['getOffsetY_BTB']();const _0x22ca09=this[_0x4609e6(0x37c)]();this[_0x4609e6(0x41e)](_0x316969,_0x3383f9,_0x7e70cd,_0x29512f['width'],_0x22ca09);}},Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x322)]=function(_0x492eea){const _0x4071b2=_0x201c49,_0x24e1ac=this[_0x4071b2(0x203)](_0x492eea);if(_0x24e1ac[_0x4071b2(0x2ba)]<ImageManager[_0x4071b2(0x303)])return _0x24e1ac;let _0x4f10ad=Math[_0x4071b2(0x3a1)]((_0x24e1ac[_0x4071b2(0x2ba)]-ImageManager[_0x4071b2(0x303)])/0x2);return _0x24e1ac[_0x4071b2(0x2ba)]=ImageManager['faceWidth'],_0x24e1ac['x']+=_0x4f10ad,_0x24e1ac;},Window_BattleStatus[_0x201c49(0x33b)]['getAlignmentBTB']=function(){const _0x5b2de1=_0x201c49,_0x12cdf6=VisuMZ[_0x5b2de1(0x356)]['Settings'][_0x5b2de1(0x44d)],_0x335109=this[_0x5b2de1(0x433)]();return _0x12cdf6[_0x5b2de1(0x201)[_0x5b2de1(0x37d)](_0x335109)]||0x0;},Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x32b)]=function(){const _0x6ae353=_0x201c49,_0x42d006=VisuMZ[_0x6ae353(0x356)]['Settings']['Window'],_0xe3e4ff=this['battleLayoutStyle']();return _0x42d006['%1_offsetX'['format'](_0xe3e4ff)]||0x0;},Window_BattleStatus[_0x201c49(0x33b)][_0x201c49(0x21e)]=function(){const _0x5b1ea0=_0x201c49,_0x1d58d7=VisuMZ[_0x5b1ea0(0x356)][_0x5b1ea0(0x225)][_0x5b1ea0(0x44d)],_0x1d19bf=this[_0x5b1ea0(0x433)]();return _0x1d58d7[_0x5b1ea0(0x3e6)[_0x5b1ea0(0x37d)](_0x1d19bf)]||0x0;},Window_BattleSkill['prototype'][_0x201c49(0x290)]=function(){const _0x323006=_0x201c49;return BattleManager[_0x323006(0x2df)]();},Window_BattleSkill[_0x201c49(0x33b)][_0x201c49(0x20a)]=function(){const _0x13a4ff=_0x201c49,_0x187734=this['item'](),_0xc3220a=BattleManager['inputtingAction']();if(_0xc3220a)_0xc3220a['setSkill'](_0x187734?_0x187734['id']:null);Window_SkillList[_0x13a4ff(0x33b)]['applyBattleItemWindowBTB']['call'](this);},Window_BattleItem[_0x201c49(0x33b)][_0x201c49(0x290)]=function(){return BattleManager['isBTB']();},Window_BattleItem[_0x201c49(0x33b)][_0x201c49(0x20a)]=function(){const _0xa68f41=_0x201c49,_0x24f8ce=this[_0xa68f41(0x42c)](),_0x2304c4=BattleManager[_0xa68f41(0x2e6)]();if(_0x2304c4)_0x2304c4[_0xa68f41(0x284)](_0x24f8ce?_0x24f8ce['id']:null);Window_ItemList['prototype']['applyBattleItemWindowBTB'][_0xa68f41(0x22d)](this);};function _0x394b(){const _0x5c8dea=['_items','IBeZb','canGuard','General','item','mgbRu','BravePointStartFavor','blt','textWidth','commandCancelBTB','pop','battleLayoutStyle','canInput','BravePointStartNeutral','cannotFusionNotetagBTB','setGuard','QBqcm','PaOcx','split','resetFontSettings','zMxoQ','ActionSlot','checkPosition','dPBCY','BattleManager_isTurnBased','_btbTurnOrderFaceName','isHorz','loadSystem','queueBraveAnimationsBTB','needsSelection','SpriteLength','setSkill','_homeDuration','_fullWidth','Game_Action_setSkill','btbBravePointsIcon','commandCancel','Window','updateOpacity','isActiveTpb','kNchS','_weapons','gCwbh','battleSys','Game_Enemy_makeActions','sUdpr','battleEnd','Game_BattlerBase_appear','createTurnOrderBTBGraphicIconIndex','mGDgk','setHandler','_positionTargetX','dtStj','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_blendColor','_graphicIconIndex','parameters','SubjectDistance','parse','fAzJG','join','MaxActionsHardCap','cancel','STR','BHSgI','some','maxBraveActions','windowRect','setBlendColor','dibSB','face','Game_Action_speed','minBravePoints','close','contents','Game_Battler_useItem','DisplayOffsetX','isSceneBattle','Cancel','_guardUnleash','_actions','text','battler','clearRect','children','\x5cC[%1]%2\x5cC[0]','_ogWindowLayerY','BraveAnimationID','_btbTurnOrderGraphicType','kCAOL','clearTurnOrderBTBGraphics','ConvertParams','bottom','createTurnOrderBTBGraphicType','bravePoints','useItemBTB','drawItemNumber','_scene','HLmgp','xSymr','hide','requestRefresh','BravePointsAbbr','drawTextEx','addLoadListener','isUsePageUpDnShortcutBTB','payBravePointsCost','HlMYX','setBTBGraphicIconIndex','active','allBattleMembers','_letterSprite','battlerHue','sort','ParseAllNotetags','BattleManager_startAction','1515588VBhQaP','XrMrD','isSkipPartyCommandWindow','ItemScene','setBravePoints','predictedBravePointCost','_index','updateTurnOrderBTB','_targetHomeY','canBrave','checkOpacity','yqbNU','tmLwq','_actionBattlers','odDgC','createBTBActionCounters','cYHyc','_btbItemFlexFusion','kYOeX','lYAOf','PdnZo','isItem','startActionBTB','RepositionLogWindow','_letter','padding','getSkillIdWithName','ULyFJ','currentSymbol','olPch','_btbActionSprite','numItems','_fadeTarget','actor','makeAdditionalSkillCostText','return\x200','numActions','bitmapHeight','createBackgroundSprite','getActionFusionCombinationsBTB','textSizeEx','%1-%2','BtbTurnOrderClearEnemyGraphic','registerCommand','%1_align','bitmapWidth','itemRect','wkGCO','index','iconWidth','_scrollX','Jnqqs','addInnerChild','applyBattleItemWindowBTB','State-%1-%2','EFUVC','KmCRi','_position','ZRnix','update','remove','getColor','BattleManager_isTpb','showBravePoints','%1Mirror','_actionFusionRecipe','MinBravePointsHardCap','removeChild','STRUCT','refresh','btbBravePointsAbbr','makeActionOrders','isEnemy','getOffsetY_BTB','onDisabledPartyCommandSelection','IPwbJ','yNfbh','processActionFusionsBTB','fontSize','currentAction','Settings','jzSbM','maxBattleMembers','JsBravePointsUser','pcQXH','btbBraveCommand','createActorCommandWindowBTB','_actor','call','EnemyBattlerFontFace','makeActions','Scene_Battle_onDisabledPartyCommandSelection','lRZqp','setBattleSystemBTBTurnOrderVisible','BTB_MAX_ACTIONS_DEFAULT','%1BgColor1','Armor-%1-%2','changeSvActorGraphicBitmap','_containerWidth','drawItemNumberBTB','xXjvl','EnemyBattlerType','enemy','map','BravePointRegen','SpriteThin','PositiveColor','TurnOrderBTBGraphicFaceIndex','showNormalAnimation','BtbTurnOrderEnemyFace','_subject','hCvap','mainFontFace','_graphicFaceIndex','nAHJH','ActionCurrent','Scene_Boot_onDatabaseLoaded','Actors','PHjtE','makeDeepCopy','qclJO','repeat','min','height','oUigC','waitForAnimation','Parse_Notetags_BravePointsUserJS','refreshStatusBTB','UpdateFrames','RegExp','ReduceShownBPCost','btbActionSlot','14008860QBkDWe','llPwd','removeActor','_graphicEnemy','Game_Actor_makeActions','loseBravePoints','hsfPI','Actor-%1-%2','_isAlive','concat','lCTqK','_isBattleOver','push','setHue','BtbTurnOrderActorFace','Game_Action_setItem','EnemyActionFusions','drawText','MaxActions','_ogWindowLayerX','mxusj','ItemsEquipsCore','commandStyle','addBraveCommand','Scene_Battle_createActorCommandWindow','_btbTurnOrderVisible','ItemQuantityFmt','makeMultiActionsBTB','BattleLayout','MaxBravePointsHardCap','splice','_targetIndex','%1SystemBorder','ScreenBuffer','performCollapse','SZMwK','Game_BattlerBase_hide','Class-%1-%2','BTB','Window_Selectable_cursorPageup','RTjbR','_homeX','FusionStrict','setItem','defaultPosition','battlerName','canPayActionFusionCombination','waitCount','isTpb','BattleManager_startInput','makeActionTimes','VjJzX','BattleManager_makeActionOrders','BTB_MAX_BRAVEPOINTS_HARD_CAP','toUpperCase','isBattleItemWindowBTB','Game_Action_allowRandomSpeed','center','xdnOs','bravePointsCost','getActionFusionRecipeItems','_graphicSv','rZiTJ','process_VisuMZ_BattleSystemBTB_JS','loadFace','attackSkillId','BattleManager_battleSys','initHomePositions','version','InfOs','ShowEnemyBrave','makeAdditionalCostTextBTB','getActionFusionRecipeSkills','recalculateHome','faceHeight','BattleCore','updatePosition','RepositionTopHelpY','FaceIndex','cannotBraveTrait','anchor','gainBravePoints','optDisplayTp','fillRect','createTestBitmap','EnableFusion','btbPayItemFusionCosts','btbActionCurrent','makeCommandList','rmvHQ','OrderDirection','btbBravePointsFull','NeutralColor','trim','UrRKQ','startAction','MaxBravePoints','width','filter','ctJGS','addChild','Window_ActorCommand_addGuardCommand','CostPosition','BTB_MAX_BRAVEPOINTS_DEFAULT','_positionTargetY','_btbTurnOrderWindow','top','updatePadding','_armors','JsxnS','_unit','svactor','BattleManager_isActiveTpb','isActor','YTBlY','length','addGuardCommand','hasSvBattler','shift','btbRegisterFusions','DKavQ','_btbTurnOrderIconIndex','changeIconGraphicBitmap','Enemy','createLetterSprite','repositionLogWindowBTB','CalcActionSpeedJS','Show_1_BP_Cost','TurnOrderBTBGraphicIconIndex','NegativeColor','Window_Selectable_select','_scrollY','Window_Base_drawItemNumber','Window_ActorCommand_makeCommandList','isBTB','isForFriend','owPol','destroyBTBActionCounters','guard','MaxHorzSprites','checkTargetPositions','inputtingAction','isInputting','traitObjects','EGELW','BravePointAlterTarget','initMembers','TurnOrderBTBGraphicFaceName','bwCaC','JcDSF','isSTB','HideBrave','containerWindow','Mechanics','cancelBrave','%1BgColor2','onTurnEndBTB','Qlkpm','ltEBX','_fadeDuration','brave','Visible','description','updateHomePosition','ARRAYSTRUCT','Game_Battler_performCollapse','28QPcGnJ','Game_Action_applyItemUserEffect','BravePointAlterUser','6AyIJpA','faceWidth','HAabV','BorderThickness','_plural','bitmap','_isAppeared','CannotBrave','changeFaceGraphicBitmap','ActorActionFusions','Enemy-%1-%2','mlZno','fYqxF','onBattleStart','isTurnBased','createBattlerSprites','performBrave','setActionFusionBTB','_graphicHue','Window_Base_close','ceil','rTaTM','sortActionOrdersBTB','Game_BattlerBase_canInput','ParseItemNotetags','BravePointPredictedCost','svActorHorzCells','HideBravePointCost','guardSkillId','clear','isSkill','YULYp','itemRectPortraitBTB','yVkSK','StatusPredictFmt','JsBravePointsTarget','%1_display','EnemyBattlerFaceIndex','createBorderSprite','\x5cI[%1]%2','appear','getOffsetX_BTB','startTurn','onDatabaseLoaded','HufJe','Skill-%1-%2','ShowMarkerBg','qrnub','removeActionBattlersBTB','#000000','containerPosition','reduceBrave','dTLrY','note','SbVKp','fontFace','createAllWindows','prototype','faceName','Scene_Battle_createAllWindows','SystemTurnOrderVisibility','updateLetter','BravePointSetTarget','regenerateBravePoints','maxBravePoints','BravePointRegenBase','ARRAYFUNC','ParseSkillNotetags','floor','requestFauxAnimation','process_VisuMZ_BattleSystemBTB','isSideView','uIuod','FaceName','initBattleSystemBTB','createTurnOrderBTBGraphicFaceName','Weapon-%1-%2','%1Mute','clearActions','CommandName','tTrza','_containerHeight','_actorCommandWindow','drawItemStatusXPStyle','BattleSystemBTB','ActorBattlerType','addChildAt','Game_BattlerBase_canGuard','olkoK','createBTBTurnOrderWindow','TurnOrder','create','CenterHorz','createGraphicSprite','addCommand','processUpdateGraphic','allowRandomSpeed','_fullHeight','IQsOs','Window_BattleStatus_drawItemStatusListStyle','select','createInitialPositions','predictedBravePoints','createTurnOrderBTBGraphicFaceIndex','selectNextCommand','match','Game_System_initialize','applyBattleSystemBTBUserEffect','onTurnEnd','updateVisibility','KDlqa','seKPu','process_VisuMZ_BattleSystemBTB_Notetags','applyItemUserEffect','BravePointCostFmt','canUse','Game_Party_removeActor','calcRegenBravePoints','ROeaz','MaxVertSprites','exit','btbPaySkillFusionCosts','getAlignmentBTB','format','3432WnmDut','visible','Game_Battler_onTurnEnd','btbParseFusionData','test','CancelAnimationID','DEfFX','ShowFacesListStyle','Window_BattleLog_startAction','btbCostFormat','getChildIndex','11178bwQAOV','mainSprite','hideBraveTrait','_positionDuration','FUNC','clamp','getTotalActionFusionRecipes','lineHeight','max','ARRAYEVAL','_btbItemStrictFusion','getItemIdWithName','_backgroundSprite','Game_Unit_makeActions','SSbgc','Game_Battler_makeActionTimes','indexOf','NYLWm','_actionInputIndex','FwjLe','ShowCostForGuard','wzdbO','_itemIDs','ZxGig','round','_graphicSprite','_skillIDs','loadSvEnemy','status','_graphicType','ShowCommand','isBattleSystemBTBTurnOrderVisible','QyKLJ','canActionFusionWithBTB','subject','destroy','initialize','createBattlerRect','updateGraphic','ARRAYJSON','_turnOrderInnerSprite','updateBattleContainerOrder','DisplayPosition','_tempBattler','_graphicFaceName','Enemies','_btbSkillStrictFusion','isAlive','Window_Help_setItem','vzrfK','DisplayOffsetY','BravePointSetUser','compareBattlerSprites','createKeyJS','BraveAnimation','formFlexCombo','_statusWindow','checkActionsBTB','Show_0_BP_Cost','canProcessActionFusionsBTB','removeActionFusionIngredients','isAppeared','MaxBravePointsDefault','BtbTurnOrderEnemyIcon','ItemQuantityFontSize','_turnOrderContainer','skillCostSeparator','cLOxw','onBattleStartBTB','constructor','ShowMarkerBorder','startInput','setup','right','NngRG','boxHeight','qOVMJ','17252zKqznf','EnemyBattlerFontSize','drawItemStatusListStyle','WaitFrames','RepositionTopHelpX','akRZH','TurnOrderBTBGraphicType','showBraveAnimationBTB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','BtbTurnOrderActorIcon','bind','BTB_MIN_BRAVEPOINTS_HARD_CAP','Game_BattlerBase_canUse','40NaLkXM','_bravePoints','_windowLayer','%1_offsetY','changeEnemyGraphicBitmap','modifyBTBActionCounterSprite_Fallback','updateSidePosition','_phase','updateGraphicHue','%1_offsetX','itemLineRect','_surprise','EnemyBattlerDrawLetter','modifyBTBActionCounterSprite','inBattle','3961557DHgixL','applyItemBattleSystemBTBUserEffect','cursorPageup','name','boxWidth','svBattlerName','%1AnimationID','Actor','Window_Base_makeAdditionalSkillCostText','451328kBJUhy','nPgBe','updateSelectionEffect','\x5cI[%1]','canAddBraveCommand','calculateTargetPositions','_targetHomeX','getBattleSystem','gradientFillRect','Game_Battler_onBattleStart','BraveShortcuts','_btbTurnOrderFaceIndex','_braveStartupAnimation','BravePointItemCost','HpzGW','opacity','%1SystemBg','Hogtd','iconHeight','BTB_MIN_BRAVEPOINTS_DEFAULT','Item-%1-%2','commandBrave','BravePointSkillCost','ActorBattlerIcon','substring','includes','attack','useItem','startFade','speed','setText','FusionFlex','VqcEP','DrawActionCountersJS','EnemyBattlerIcon','drawActorBravePoints','FMSdG','braveAnimationTimes','_homeY','loadSvActor','members','_btbSkillFlexFusion','IconIndex','Window_Selectable_cursorPagedown','Window_BattleStatus_drawItemStatusXPStyle'];_0x394b=function(){return _0x5c8dea;};return _0x394b();}function Window_BTB_TurnOrder(){const _0x25e0f6=_0x201c49;this[_0x25e0f6(0x3ad)](...arguments);}Window_BTB_TurnOrder['prototype']=Object['create'](Window_Base[_0x201c49(0x33b)]),Window_BTB_TurnOrder[_0x201c49(0x33b)]['constructor']=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x201c49(0x225)]=VisuMZ[_0x201c49(0x356)][_0x201c49(0x225)][_0x201c49(0x35c)],Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x3ad)]=function(){const _0x4fff05=_0x201c49,_0x48b020=this[_0x4fff05(0x46b)]();this[_0x4fff05(0x29c)](_0x48b020),Window_Base[_0x4fff05(0x33b)][_0x4fff05(0x3ad)][_0x4fff05(0x22d)](this,_0x48b020),this[_0x4fff05(0x311)](),this['updateVisibility'](),this[_0x4fff05(0x40a)]=0x0;},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x46b)]=function(){const _0x427309=_0x201c49;return this[_0x427309(0x3ae)]($gameParty['maxBattleMembers'](),0x9,!![]);},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x29c)]=function(_0x41c6a4){const _0x56568c=_0x201c49;this['_targetHomeX']=this[_0x56568c(0x282)]=_0x41c6a4['x'],this[_0x56568c(0x4a4)]=this[_0x56568c(0x421)]=_0x41c6a4['y'],this[_0x56568c(0x449)]=_0x41c6a4[_0x56568c(0x2ba)],this[_0x56568c(0x363)]=_0x41c6a4['height'],this['_homeDuration']=0x0;},Window_BTB_TurnOrder[_0x201c49(0x33b)]['createBattlerRect']=function(_0x5bbb4a,_0x208b93,_0xb6b450){const _0x380a42=_0x201c49,_0x1a0788=Window_BTB_TurnOrder[_0x380a42(0x225)],_0x414eec=this[_0x380a42(0x442)]()?_0x1a0788[_0x380a42(0x2e4)]:_0x1a0788[_0x380a42(0x379)],_0x1bd0af=Math[_0x380a42(0x24f)](_0x414eec,_0x5bbb4a+_0x208b93),_0x28c9d0=SceneManager[_0x380a42(0x489)]['_statusWindow'][_0x380a42(0x250)],_0x2e02f7=SceneManager[_0x380a42(0x489)]['_helpWindow'][_0x380a42(0x250)],_0x40e771=_0x1a0788['SubjectDistance'],_0x4f28a3=Graphics[_0x380a42(0x250)]-_0x28c9d0-_0x2e02f7;let _0x247148=0x0,_0x83a2f4=0x0,_0x3ceef8=0x0,_0x5dbc00=0x0;switch(_0x1a0788[_0x380a42(0x3b3)]){case _0x380a42(0x2c3):_0x247148=_0x1a0788['SpriteThin']*_0x1bd0af+_0x40e771,_0x83a2f4=_0x1a0788[_0x380a42(0x446)],_0x3ceef8=Math[_0x380a42(0x316)]((Graphics[_0x380a42(0x2ba)]-_0x247148)/0x2),_0x5dbc00=_0x1a0788[_0x380a42(0x27a)];break;case _0x380a42(0x484):_0x247148=_0x1a0788[_0x380a42(0x23e)]*_0x1bd0af+_0x40e771,_0x83a2f4=_0x1a0788[_0x380a42(0x446)],_0x3ceef8=Math['ceil']((Graphics[_0x380a42(0x2ba)]-_0x247148)/0x2),_0x5dbc00=Graphics[_0x380a42(0x250)]-_0x28c9d0-_0x83a2f4-_0x1a0788[_0x380a42(0x27a)];break;case'left':_0x247148=_0x1a0788[_0x380a42(0x446)],_0x83a2f4=_0x1a0788[_0x380a42(0x23e)]*_0x1bd0af+_0x40e771,_0x3ceef8=_0x1a0788[_0x380a42(0x27a)],_0x5dbc00=Math['ceil']((_0x4f28a3-_0x83a2f4)/0x2),_0x5dbc00+=_0x2e02f7;break;case _0x380a42(0x3d2):_0x247148=_0x1a0788[_0x380a42(0x446)],_0x83a2f4=_0x1a0788['SpriteThin']*_0x1bd0af+_0x40e771,_0x3ceef8=Graphics[_0x380a42(0x2ba)]-_0x247148-_0x1a0788[_0x380a42(0x27a)],_0x5dbc00=Math['ceil']((_0x4f28a3-_0x83a2f4)/0x2),_0x5dbc00+=_0x2e02f7;break;}if(!_0xb6b450){if(_0x380a42(0x41b)!==_0x380a42(0x25a)){const _0x4171f9=Window_BTB_TurnOrder['Settings'][_0x380a42(0x2b3)];let _0x51cfe3=Math[_0x380a42(0x24f)](_0x414eec,Math[_0x380a42(0x24f)]($gameParty[_0x380a42(0x227)]()+0x8)-_0x1bd0af);switch(_0x1a0788['DisplayPosition']){case'top':case'bottom':_0x4171f9&&(_0x3ceef8-=_0x51cfe3*_0x1a0788[_0x380a42(0x23e)]);break;}}else return this[_0x380a42(0x272)]===_0x34d380&&this['initBattleSystemBTB'](),this[_0x380a42(0x272)];}return _0x3ceef8+=_0x1a0788[_0x380a42(0x474)],_0x5dbc00+=_0x1a0788[_0x380a42(0x3bb)],new Rectangle(_0x3ceef8,_0x5dbc00,_0x247148,_0x83a2f4);},Window_BTB_TurnOrder['prototype'][_0x201c49(0x2c4)]=function(){const _0x42e2b3=_0x201c49;this[_0x42e2b3(0x1ee)]=0x0;},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x442)]=function(){const _0x12f88f=_0x201c49,_0x5de2ea=Window_BTB_TurnOrder[_0x12f88f(0x225)],_0x59671f=[_0x12f88f(0x2c3),_0x12f88f(0x484)][_0x12f88f(0x414)](_0x5de2ea[_0x12f88f(0x3b3)]);return _0x59671f;},Window_BTB_TurnOrder[_0x201c49(0x33b)]['createBattlerSprites']=function(){const _0x2f8c4d=_0x201c49;this[_0x2f8c4d(0x3b1)]=new Sprite(),this[_0x2f8c4d(0x209)](this[_0x2f8c4d(0x3b1)]),this['_turnOrderContainer']=[];for(let _0x1bf39b=0x0;_0x1bf39b<$gameParty[_0x2f8c4d(0x227)]();_0x1bf39b++){const _0x459455=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x1bf39b);this['_turnOrderInnerSprite'][_0x2f8c4d(0x2bd)](_0x459455),this[_0x2f8c4d(0x3ca)][_0x2f8c4d(0x265)](_0x459455);}for(let _0x574830=0x0;_0x574830<0x8;_0x574830++){const _0x99b75a=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x574830);this[_0x2f8c4d(0x3b1)][_0x2f8c4d(0x2bd)](_0x99b75a),this['_turnOrderContainer'][_0x2f8c4d(0x265)](_0x99b75a);}},Window_BTB_TurnOrder['prototype']['update']=function(){const _0x5a4fae=_0x201c49;Window_Base[_0x5a4fae(0x33b)][_0x5a4fae(0x210)][_0x5a4fae(0x22d)](this),this[_0x5a4fae(0x2fc)](),this[_0x5a4fae(0x2a5)](),this[_0x5a4fae(0x3e9)](),this[_0x5a4fae(0x3b2)](),this[_0x5a4fae(0x36f)]();},Window_BTB_TurnOrder['prototype'][_0x201c49(0x2fc)]=function(){const _0x368662=_0x201c49;if(this[_0x368662(0x448)]>0x0){if(_0x368662(0x371)===_0x368662(0x371)){const _0x349907=this['_homeDuration'];this['_homeX']=(this['_homeX']*(_0x349907-0x1)+this[_0x368662(0x401)])/_0x349907,this[_0x368662(0x421)]=(this['_homeY']*(_0x349907-0x1)+this['_targetHomeY'])/_0x349907,this[_0x368662(0x448)]--,this[_0x368662(0x448)]<=0x0&&(this[_0x368662(0x282)]=this[_0x368662(0x401)],this[_0x368662(0x421)]=this[_0x368662(0x4a4)]);}else this[_0x368662(0x350)]();}},Window_BTB_TurnOrder[_0x201c49(0x33b)]['updatePosition']=function(){const _0x321b23=_0x201c49,_0x1a1ef6=Window_BTB_TurnOrder[_0x321b23(0x225)];if(_0x1a1ef6[_0x321b23(0x3b3)]!=='top')return;if(!_0x1a1ef6['RepositionTopForHelp'])return;const _0x27fa5d=SceneManager[_0x321b23(0x489)]['_helpWindow'];if(!_0x27fa5d)return;if(_0x27fa5d['visible']){if(_0x321b23(0x3a0)==='sfnkr'){const _0xd005d8=_0x5dd310['Settings'],_0xab6848=[_0x321b23(0x2c3),_0x321b23(0x484)][_0x321b23(0x414)](_0xd005d8[_0x321b23(0x3b3)]);return _0xab6848;}else this['x']=this[_0x321b23(0x282)]+(_0x1a1ef6[_0x321b23(0x3da)]||0x0),this['y']=this[_0x321b23(0x421)]+(_0x1a1ef6[_0x321b23(0x2a6)]||0x0);}else this['x']=this[_0x321b23(0x282)],this['y']=this[_0x321b23(0x421)];const _0xc95bd7=SceneManager['_scene']['_windowLayer'];this[_0x321b23(0x26c)]===undefined&&(this['_ogWindowLayerX']=Math['round']((Graphics[_0x321b23(0x2ba)]-Math[_0x321b23(0x24f)](Graphics[_0x321b23(0x3f6)],_0xc95bd7[_0x321b23(0x2ba)]))/0x2),this['_ogWindowLayerY']=Math['round']((Graphics[_0x321b23(0x250)]-Math[_0x321b23(0x24f)](Graphics[_0x321b23(0x3d4)],_0xc95bd7['height']))/0x2)),this['x']+=_0xc95bd7['x']-this[_0x321b23(0x26c)],this['y']+=_0xc95bd7['y']-this[_0x321b23(0x47e)];},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x3e9)]=function(){const _0x20ca70=_0x201c49,_0x2d948a=Window_BTB_TurnOrder[_0x20ca70(0x225)];if([_0x20ca70(0x2c3)][_0x20ca70(0x414)](_0x2d948a[_0x20ca70(0x3b3)]))return;this['x']=this['_homeX'],this['y']=this[_0x20ca70(0x421)];const _0x582b75=SceneManager[_0x20ca70(0x489)][_0x20ca70(0x3e5)];this['x']+=_0x582b75['x'],this['y']+=_0x582b75['y'];},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x3b2)]=function(){const _0x3d6d16=_0x201c49;if(!this[_0x3d6d16(0x3b1)])return;const _0x154994=this[_0x3d6d16(0x3b1)][_0x3d6d16(0x47c)];if(!_0x154994)return;_0x154994['sort'](this['compareBattlerSprites']['bind'](this));},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x3bd)]=function(_0x22b26b,_0x31e5cd){const _0x18c622=_0x201c49,_0x5c8f5a=this['isHorz'](),_0x29dbdb=Window_BTB_TurnOrder[_0x18c622(0x225)][_0x18c622(0x2b3)];if(_0x5c8f5a&&!_0x29dbdb)return _0x22b26b['x']-_0x31e5cd['x'];else{if(_0x5c8f5a&&_0x29dbdb)return _0x31e5cd['x']-_0x22b26b['x'];else{if(!_0x5c8f5a&&_0x29dbdb){if(_0x18c622(0x438)===_0x18c622(0x438))return _0x22b26b['y']-_0x31e5cd['y'];else _0x5f0f5d[_0x18c622(0x26a)](this['_letter'][_0x18c622(0x2b6)](),0x0,0x2,_0x468989-0x8,_0xa4e951-0x4,'right');}else{if(!_0x5c8f5a&&!_0x29dbdb)return _0x31e5cd['y']-_0x22b26b['y'];}}}},Window_BTB_TurnOrder[_0x201c49(0x33b)]['updateVisibility']=function(){const _0x2659e3=_0x201c49;this[_0x2659e3(0x37f)]=$gameSystem[_0x2659e3(0x3a8)]();},Window_BTB_TurnOrder[_0x201c49(0x33b)]['updateTurnOrder']=function(_0x48d107){const _0x4cf586=_0x201c49;this[_0x4cf586(0x3ca)]['sort']((_0x2d1763,_0x1ad4d2)=>{const _0x3835f7=_0x4cf586;return _0x2d1763[_0x3835f7(0x334)]()-_0x1ad4d2[_0x3835f7(0x334)]();}),this[_0x4cf586(0x2a2)]();if(!_0x48d107)return;for(const _0x22fa0e of this['_turnOrderContainer']){if(!_0x22fa0e)continue;_0x22fa0e['update'](),_0x22fa0e[_0x4cf586(0x38c)]=0x0;}},Window_BTB_TurnOrder[_0x201c49(0x33b)][_0x201c49(0x2a2)]=function(){const _0x7c7408=_0x201c49;if(!this[_0x7c7408(0x442)]())return;const _0x4c35b0=VisuMZ[_0x7c7408(0x356)]['Settings']['TurnOrder'];if(!_0x4c35b0[_0x7c7408(0x35e)])return;const _0x4e96f3=$gameParty[_0x7c7408(0x423)]()[_0x7c7408(0x2bb)](_0x566bb8=>_0x566bb8&&_0x566bb8['isAlive']()&&_0x566bb8[_0x7c7408(0x3c6)]())[_0x7c7408(0x2cc)],_0x25f48c=$gameTroop[_0x7c7408(0x423)]()[_0x7c7408(0x2bb)](_0x57458c=>_0x57458c&&_0x57458c[_0x7c7408(0x3b8)]()&&_0x57458c[_0x7c7408(0x3c6)]())['length'],_0x186073=this[_0x7c7408(0x3ae)](_0x4e96f3,_0x25f48c);this['_targetHomeX']=_0x186073['x'],this[_0x7c7408(0x4a4)]=_0x186073['y'];if(this[_0x7c7408(0x401)]!==this[_0x7c7408(0x282)]||this[_0x7c7408(0x4a4)]!==this[_0x7c7408(0x421)]){if(_0x7c7408(0x231)==='GjXtM'){if(!_0x243272[_0x7c7408(0x2df)]())return;if(this[_0x7c7408(0x42c)]())this[_0x7c7408(0x3f3)](_0x30a6c6);}else this[_0x7c7408(0x448)]=_0x4c35b0[_0x7c7408(0x255)];}};