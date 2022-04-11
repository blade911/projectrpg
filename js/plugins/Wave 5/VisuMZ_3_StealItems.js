//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
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
 * Version 1.06: January 13, 2022
 * * Compatibility Update!
 * ** Better compatibility update with Extra Enemy Drops. Update made by Irina.
 * 
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
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
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x4c7b4f=_0x2b8d;(function(_0x49d8ae,_0x2df2d4){const _0x41a80d=_0x2b8d,_0x30d7f0=_0x49d8ae();while(!![]){try{const _0x576166=parseInt(_0x41a80d(0x1ff))/0x1*(parseInt(_0x41a80d(0x193))/0x2)+parseInt(_0x41a80d(0x1eb))/0x3+parseInt(_0x41a80d(0x27a))/0x4+-parseInt(_0x41a80d(0x284))/0x5+-parseInt(_0x41a80d(0x200))/0x6*(parseInt(_0x41a80d(0x212))/0x7)+parseInt(_0x41a80d(0x1bc))/0x8+parseInt(_0x41a80d(0x278))/0x9;if(_0x576166===_0x2df2d4)break;else _0x30d7f0['push'](_0x30d7f0['shift']());}catch(_0x3263e2){_0x30d7f0['push'](_0x30d7f0['shift']());}}}(_0xa5bc,0x8342f));var label=_0x4c7b4f(0x1e2),tier=tier||0x0,dependencies=[_0x4c7b4f(0x216)],pluginData=$plugins[_0x4c7b4f(0x20f)](function(_0x2ec017){const _0x2195fb=_0x4c7b4f;return _0x2ec017['status']&&_0x2ec017[_0x2195fb(0x1ab)]['includes']('['+label+']');})[0x0];function _0xa5bc(){const _0x4980eb=['%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','State-%1-%2','prototype','setHelpWindow','snatchAlreadyStolen','FailureTextColor','match','processStealItemsNothing','JSON','processStealItemsSuccessLogWindow','ARRAYFUNC','processStealItemsAttempt','GOLD','Class-%1-%2','StealAction1','startStealItemsUserEffect','random','note','_weaponIDs','SuccessFlashDuration','setup','stolen','isForOpponent','hide','createStealResist','EquipDebuff','JsOnStealSuccess','_itemIDs','JsStealRateGold','StealAction2','isForOne','_numberWidth','ShowMessages','applyItemUserEffect','trim','JsBonusSteal','stealPlus','subject','toLowerCase','weapon','ARRAYSTRUCT','setupEnemyLevels','initialize','armor','drawItemName','Scene_Battle_createEnemyWindow','Popup','%1_pitch','ARMOR','iconIndex','_visualDrops','processStealItemsSuccessSFX','STRUCT','128664wxRzAO','JsStealResist','2577580bUXyKF','onStealSnatchCancel','drawTextEx','includes','max','parse','makeSuccess','RegExp','startStealSnatchSelection','dropItems','5287310qTAuCh','inputtingAction','format','toFixed','fail','activate','snatchGoldIcon','FailurePopupText','isAnyInputWindowActive','constructor','makeDropItems','Actor-%1-%2','dataId','Snatch','call','NUM','clamp','JsStealRateWeapon','StealRate','map','ParseStealObject','SuccessPopupText','Game_BattlerBase_refresh','_logWindow','%1_volume','StealableItems','Sound','makeDeepCopy','JsOnStealFail','GoldRate','members','2lBUkUF','process_VisuMZ_StealItems','processStealItemsSuccess','stealRate','ConvertParams','_enemy','_action','ITEM','ARRAYNUM','VisualGoldDisplay','addStealText','_enemyWindow','Weapon-%1-%2','gainItem','exit','Game_Enemy_setup','textWidth','kind','setHandler','StealPlus','return\x200','processStealItemsFailurePopup','autoSelect','CoreEngine','description','rate','drawItemNumber','parameters','push','getWeaponIdWithName','Scene_Boot_onDatabaseLoaded','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','checkCacheKey','process_VisuMZ_StealItems_JS','getSnatchTarget','stealResist','JsOnStealNothing','88.88%','active','Game_Enemy_makeDropItems','onEnemyOk','7918192PLzkal','AutoItem','Game_Enemy_gold','textSizeEx','forceSelect','_snatchEnemyIndex','_stealSnatchWindow','_data','plus','processStealItemsNothingSFX','processStealItemsFailureJS','width','all','dropIndex','ParseSkillNotetags','type','Scene_Battle_onEnemyOk','cancel','processStealItemsNothingJS','VisuMZ_3_EnemyLevels','indexOf','split','ParseItemNotetags','VisuMZ_4_ExtraEnemyDrops','StealableItemBatch','createStealSnatchWindow','isEnabled','getArmorIdWithName','SuccessItemName','createKeyJS','EmptyFlashDuration','Game_Enemy_setupEnemyLevels','Enemy-%1-%2','BattleLog','ShuffleArray','_cache','\x5cI[%1]','isEnemy','StealItems','types','name','item','createStealRateJS','gainGold','concat','denominator','onDatabaseLoaded','374091BLObKb','ItemRate','isSnatchEffect','processStealItemsFailureSFX','none','setupStealableItems','hideSubInputWindows','WEAPON','CreateVisualGoldText','create','Scene_Battle_isAnyInputWindowActive','_armorIDs','ARRAYEVAL','index','processStealItemsSuccessEquipDebuff','getStealableItems','_scene','empty','createEnemyWindow','createOnStealJS','84922kPnQKb','315570SpICAi','addParam','needsSelection','JsStealRateItem','Mechanics','createStealRate','deactivate','Skill-%1-%2','onStealSnatchOk','Item-%1-%2','processStealItemsSuccessPopup','StealEmpty','DetermineStealData','JsStealRateArmor','processStealItemsFailure','filter','FUNC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','35kjtAYr','StealData','EmptyTextColor','enemyIndex','VisuMZ_1_BattleCore','StealResist','Parse_Notetags_JS','processStealItemsFailureLogWindow','gold','show','ItemRemoval','_snatchItemIndex','Settings','GoldRemoval','%1_name','EmptyPopupText','processStealItemsSuccessJS','GoldIcon','EVAL','snatchGoldNameFmt','processStealItemsNothingLogWindow','_helpWindow','_stealableItems','setupTextPopup','Auto','AutoGold','traitObjects','%1_pan','FailureFlashDuration','toUpperCase','getItemIdWithName','StealGold','JsStealRate','Armor-%1-%2','Game_Action_applyItemUserEffect','enemy','registerSnatchTarget','setDetails','StealableItemSingle','processStealItemsNothingPopup','snatchGoldHelpText','EmptyFlashColor','playSe','length','refresh','setupIconTextPopup','drop','itemWindowRect','JsOnStealEmpty'];_0xa5bc=function(){return _0x4980eb;};return _0xa5bc();}VisuMZ[label][_0x4c7b4f(0x21e)]=VisuMZ[label][_0x4c7b4f(0x21e)]||{},VisuMZ[_0x4c7b4f(0x197)]=function(_0x2b4169,_0x5f0e88){const _0x5be51a=_0x4c7b4f;for(const _0x21de5f in _0x5f0e88){if(_0x21de5f[_0x5be51a(0x249)](/(.*):(.*)/i)){const _0x4a0f9c=String(RegExp['$1']),_0x1643d8=String(RegExp['$2'])[_0x5be51a(0x22f)]()['trim']();let _0x46d3e6,_0x59208f,_0x59f2ed;switch(_0x1643d8){case _0x5be51a(0x293):_0x46d3e6=_0x5f0e88[_0x21de5f]!==''?Number(_0x5f0e88[_0x21de5f]):0x0;break;case _0x5be51a(0x19b):_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f[_0x5be51a(0x297)](_0x47a282=>Number(_0x47a282));break;case _0x5be51a(0x224):_0x46d3e6=_0x5f0e88[_0x21de5f]!==''?eval(_0x5f0e88[_0x21de5f]):null;break;case _0x5be51a(0x1f7):_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f[_0x5be51a(0x297)](_0x2c08a1=>eval(_0x2c08a1));break;case _0x5be51a(0x24b):_0x46d3e6=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):'';break;case'ARRAYJSON':_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f[_0x5be51a(0x297)](_0x20088c=>JSON['parse'](_0x20088c));break;case _0x5be51a(0x210):_0x46d3e6=_0x5f0e88[_0x21de5f]!==''?new Function(JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f])):new Function(_0x5be51a(0x1a7));break;case _0x5be51a(0x24d):_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f['map'](_0x4f433a=>new Function(JSON[_0x5be51a(0x27f)](_0x4f433a)));break;case'STR':_0x46d3e6=_0x5f0e88[_0x21de5f]!==''?String(_0x5f0e88[_0x21de5f]):'';break;case'ARRAYSTR':_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f[_0x5be51a(0x297)](_0x4d5c15=>String(_0x4d5c15));break;case _0x5be51a(0x277):_0x59f2ed=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):{},_0x46d3e6=VisuMZ[_0x5be51a(0x197)]({},_0x59f2ed);break;case _0x5be51a(0x26b):_0x59208f=_0x5f0e88[_0x21de5f]!==''?JSON[_0x5be51a(0x27f)](_0x5f0e88[_0x21de5f]):[],_0x46d3e6=_0x59208f[_0x5be51a(0x297)](_0x3a3e1d=>VisuMZ['ConvertParams']({},JSON[_0x5be51a(0x27f)](_0x3a3e1d)));break;default:continue;}_0x2b4169[_0x4a0f9c]=_0x46d3e6;}}return _0x2b4169;},(_0x22cb8b=>{const _0x3aa4f6=_0x4c7b4f,_0x42dfe1=_0x22cb8b[_0x3aa4f6(0x1e4)];for(const _0x262e9e of dependencies){if(!Imported[_0x262e9e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3aa4f6(0x286)](_0x42dfe1,_0x262e9e)),SceneManager[_0x3aa4f6(0x1a1)]();break;}}const _0x4f4646=_0x22cb8b[_0x3aa4f6(0x1ab)];if(_0x4f4646['match'](/\[Version[ ](.*?)\]/i)){const _0x12d19e=Number(RegExp['$1']);_0x12d19e!==VisuMZ[label]['version']&&(alert(_0x3aa4f6(0x243)[_0x3aa4f6(0x286)](_0x42dfe1,_0x12d19e)),SceneManager[_0x3aa4f6(0x1a1)]());}if(_0x4f4646[_0x3aa4f6(0x249)](/\[Tier[ ](\d+)\]/i)){const _0x3f2f4d=Number(RegExp['$1']);_0x3f2f4d<tier?(alert(_0x3aa4f6(0x1b2)[_0x3aa4f6(0x286)](_0x42dfe1,_0x3f2f4d,tier)),SceneManager[_0x3aa4f6(0x1a1)]()):tier=Math['max'](_0x3f2f4d,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3aa4f6(0x21e)],_0x22cb8b[_0x3aa4f6(0x1ae)]);})(pluginData),VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1b1)]=Scene_Boot['prototype'][_0x4c7b4f(0x1ea)],Scene_Boot[_0x4c7b4f(0x245)][_0x4c7b4f(0x1ea)]=function(){const _0x12cd4d=_0x4c7b4f;VisuMZ[_0x12cd4d(0x1e2)][_0x12cd4d(0x1b1)][_0x12cd4d(0x292)](this),this[_0x12cd4d(0x194)]();},Scene_Boot[_0x4c7b4f(0x245)][_0x4c7b4f(0x194)]=function(){const _0x24189f=_0x4c7b4f;if(VisuMZ['ParseAllNotetags'])return;this[_0x24189f(0x1b4)]();},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x281)]={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0x4c7b4f(0x245)][_0x4c7b4f(0x1b4)]=function(){const _0x2dbfa4=_0x4c7b4f,_0x3fd1e4=$dataSkills[_0x2dbfa4(0x1e8)]($dataItems);for(const _0x5a15c3 of _0x3fd1e4){if(!_0x5a15c3)continue;VisuMZ[_0x2dbfa4(0x1e2)][_0x2dbfa4(0x218)](_0x5a15c3);}},VisuMZ['StealItems']['ParseSkillNotetags']=VisuMZ[_0x4c7b4f(0x1ca)],VisuMZ[_0x4c7b4f(0x1ca)]=function(_0x8e2c4e){const _0x2501d9=_0x4c7b4f;VisuMZ[_0x2501d9(0x1e2)][_0x2501d9(0x1ca)][_0x2501d9(0x292)](this,_0x8e2c4e),VisuMZ['StealItems'][_0x2501d9(0x218)](_0x8e2c4e);},VisuMZ['StealItems'][_0x4c7b4f(0x1d2)]=VisuMZ[_0x4c7b4f(0x1d2)],VisuMZ[_0x4c7b4f(0x1d2)]=function(_0xcf4ead){const _0x19619f=_0x4c7b4f;VisuMZ[_0x19619f(0x1e2)][_0x19619f(0x1d2)][_0x19619f(0x292)](this,_0xcf4ead),VisuMZ[_0x19619f(0x1e2)][_0x19619f(0x218)](_0xcf4ead);},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x218)]=function(_0x493fae){const _0x952633=_0x4c7b4f,_0x3c5782=VisuMZ[_0x952633(0x1e2)][_0x952633(0x281)];let _0x3c1f20='JsStealRate',_0x2086c5=_0x3c5782[_0x952633(0x232)];VisuMZ[_0x952633(0x1e2)][_0x952633(0x1e6)](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x25f),_0x2086c5=_0x3c5782[_0x952633(0x25f)],VisuMZ[_0x952633(0x1e2)][_0x952633(0x1e6)](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x203),_0x2086c5=_0x3c5782['JsStealRateItem'],VisuMZ[_0x952633(0x1e2)][_0x952633(0x1e6)](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x295),_0x2086c5=_0x3c5782[_0x952633(0x295)],VisuMZ[_0x952633(0x1e2)]['createStealRateJS'](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x20d),_0x2086c5=_0x3c5782['JsStealRateArmor'],VisuMZ['StealItems'][_0x952633(0x1e6)](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x25d),_0x2086c5=_0x3c5782[_0x952633(0x25d)],VisuMZ[_0x952633(0x1e2)][_0x952633(0x1fe)](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20='JsOnStealFail',_0x2086c5=_0x3c5782['JsOnStealFail'],VisuMZ[_0x952633(0x1e2)]['createOnStealJS'](_0x493fae,_0x3c1f20,_0x2086c5),_0x3c1f20=_0x952633(0x1b7),_0x2086c5=_0x3c5782[_0x952633(0x1b7)],VisuMZ[_0x952633(0x1e2)][_0x952633(0x1fe)](_0x493fae,_0x3c1f20,_0x2086c5);},VisuMZ[_0x4c7b4f(0x1e2)]['JS']={},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1e6)]=function(_0x421580,_0x416fad,_0x36a111){const _0x1b1fda=_0x4c7b4f,_0xfca36=_0x421580[_0x1b1fda(0x254)];if(_0xfca36[_0x1b1fda(0x249)](_0x36a111)){const _0x38a862=String(RegExp['$1']),_0x55df55='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x38a862),_0x1f2923=VisuMZ['StealItems'][_0x1b1fda(0x1d9)](_0x421580,_0x416fad);VisuMZ[_0x1b1fda(0x1e2)]['JS'][_0x1f2923]=new Function(_0x55df55);}},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1fe)]=function(_0x2a131e,_0x57e633,_0xbd113a){const _0x4f5a5=_0x4c7b4f,_0x3c9d3e=_0x2a131e['note'];if(_0x3c9d3e['match'](_0xbd113a)){const _0x4915be=String(RegExp['$1']),_0x4b7795=_0x4f5a5(0x211)['format'](_0x4915be),_0x593e72=VisuMZ[_0x4f5a5(0x1e2)][_0x4f5a5(0x1d9)](_0x2a131e,_0x57e633);VisuMZ[_0x4f5a5(0x1e2)]['JS'][_0x593e72]=new Function(_0x4b7795);}},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1d9)]=function(_0x1840aa,_0x33b55d){const _0x1a8073=_0x4c7b4f;let _0x523461='';if($dataActors['includes'](_0x1840aa))_0x523461=_0x1a8073(0x28f)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);if($dataClasses[_0x1a8073(0x27d)](_0x1840aa))_0x523461=_0x1a8073(0x250)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);if($dataSkills[_0x1a8073(0x27d)](_0x1840aa))_0x523461=_0x1a8073(0x207)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);if($dataItems['includes'](_0x1840aa))_0x523461=_0x1a8073(0x209)['format'](_0x1840aa['id'],_0x33b55d);if($dataWeapons['includes'](_0x1840aa))_0x523461=_0x1a8073(0x19f)['format'](_0x1840aa['id'],_0x33b55d);if($dataArmors[_0x1a8073(0x27d)](_0x1840aa))_0x523461=_0x1a8073(0x233)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);if($dataEnemies[_0x1a8073(0x27d)](_0x1840aa))_0x523461=_0x1a8073(0x1dc)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);if($dataStates[_0x1a8073(0x27d)](_0x1840aa))_0x523461=_0x1a8073(0x244)[_0x1a8073(0x286)](_0x1840aa['id'],_0x33b55d);return _0x523461;},DataManager[_0x4c7b4f(0x230)]=function(_0x5b9b35){const _0x18f671=_0x4c7b4f;_0x5b9b35=_0x5b9b35[_0x18f671(0x22f)]()[_0x18f671(0x265)](),this['_itemIDs']=this[_0x18f671(0x25e)]||{};if(this[_0x18f671(0x25e)][_0x5b9b35])return this[_0x18f671(0x25e)][_0x5b9b35];for(const _0x3916d of $dataItems){if(!_0x3916d)continue;this['_itemIDs'][_0x3916d[_0x18f671(0x1e4)][_0x18f671(0x22f)]()[_0x18f671(0x265)]()]=_0x3916d['id'];}return this[_0x18f671(0x25e)][_0x5b9b35]||0x0;},DataManager['getWeaponIdWithName']=function(_0x58acb8){const _0x31c6d6=_0x4c7b4f;_0x58acb8=_0x58acb8[_0x31c6d6(0x22f)]()[_0x31c6d6(0x265)](),this[_0x31c6d6(0x255)]=this['_weaponIDs']||{};if(this['_weaponIDs'][_0x58acb8])return this[_0x31c6d6(0x255)][_0x58acb8];for(const _0x59b7a2 of $dataWeapons){if(!_0x59b7a2)continue;this[_0x31c6d6(0x255)][_0x59b7a2[_0x31c6d6(0x1e4)][_0x31c6d6(0x22f)]()[_0x31c6d6(0x265)]()]=_0x59b7a2['id'];}return this['_weaponIDs'][_0x58acb8]||0x0;},DataManager['getArmorIdWithName']=function(_0x2b91fa){const _0x52e37c=_0x4c7b4f;_0x2b91fa=_0x2b91fa[_0x52e37c(0x22f)]()[_0x52e37c(0x265)](),this[_0x52e37c(0x1f6)]=this[_0x52e37c(0x1f6)]||{};if(this['_armorIDs'][_0x2b91fa])return this[_0x52e37c(0x1f6)][_0x2b91fa];for(const _0x11e9d0 of $dataArmors){if(!_0x11e9d0)continue;this[_0x52e37c(0x1f6)][_0x11e9d0[_0x52e37c(0x1e4)][_0x52e37c(0x22f)]()[_0x52e37c(0x265)]()]=_0x11e9d0['id'];}return this[_0x52e37c(0x1f6)][_0x2b91fa]||0x0;},ImageManager['snatchGoldIcon']=Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x4c7b4f(0x1aa)][_0x4c7b4f(0x21e)]['Gold'][_0x4c7b4f(0x223)]:VisuMZ['StealItems'][_0x4c7b4f(0x21e)]['Snatch'][_0x4c7b4f(0x223)],TextManager['snatchGoldNameFmt']=VisuMZ[_0x4c7b4f(0x1e2)]['Settings'][_0x4c7b4f(0x291)]['GoldNameFmt'],TextManager[_0x4c7b4f(0x23a)]=VisuMZ['StealItems'][_0x4c7b4f(0x21e)]['Snatch']['GoldHelp'],TextManager[_0x4c7b4f(0x247)]=VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x21e)][_0x4c7b4f(0x291)]['AlreadyStolen'],VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x234)]=Game_Action[_0x4c7b4f(0x245)]['applyItemUserEffect'],Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x264)]=function(_0x978875){const _0x48b3f5=_0x4c7b4f;VisuMZ['StealItems'][_0x48b3f5(0x234)][_0x48b3f5(0x292)](this,_0x978875),this[_0x48b3f5(0x252)](_0x978875);},Game_Action['prototype'][_0x4c7b4f(0x252)]=function(_0x3d6ee1){const _0x3e0e21=_0x4c7b4f;if(!this[_0x3e0e21(0x1e5)]())return;if(!_0x3d6ee1[_0x3e0e21(0x1e1)]())return;if(this[_0x3e0e21(0x268)]()[_0x3e0e21(0x1e1)]())return;const _0x20a35b=VisuMZ[_0x3e0e21(0x1e2)][_0x3e0e21(0x20c)](this,_0x3d6ee1);if(_0x20a35b['types']['length']<=0x0)return;const _0x18d1d7=_0x3d6ee1[_0x3e0e21(0x1fa)]();if(_0x18d1d7[_0x3e0e21(0x23d)]<=0x0)return;let _0x37f7ab=[];this[_0x3e0e21(0x1ed)]()?_0x37f7ab=this[_0x3e0e21(0x1b5)](_0x3d6ee1):_0x37f7ab=_0x18d1d7[_0x3e0e21(0x20f)](_0x62a83c=>{const _0xe76880=_0x3e0e21;return _0x20a35b[_0xe76880(0x1e3)][_0xe76880(0x27d)](_0x62a83c['type']);});_0x37f7ab=_0x37f7ab[_0x3e0e21(0x20f)](_0x1de4ac=>{return!_0x1de4ac['stolen'];});if(_0x37f7ab[_0x3e0e21(0x23d)]<=0x0)return this[_0x3e0e21(0x24a)](_0x3d6ee1);this[_0x3e0e21(0x24e)](_0x3d6ee1,_0x20a35b,_0x37f7ab);},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x20c)]=function(_0x16b673,_0x539b5b){const _0x2ecfa8=_0x4c7b4f,_0x32f254=VisuMZ[_0x2ecfa8(0x1e2)][_0x2ecfa8(0x281)],_0xa4c38b=_0x16b673[_0x2ecfa8(0x1e5)]()[_0x2ecfa8(0x254)];let _0x15b711=[],_0x3b1c1f={'all':_0x16b673[_0x2ecfa8(0x268)]()[_0x2ecfa8(0x196)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x5eea8a={'all':_0x16b673[_0x2ecfa8(0x268)]()[_0x2ecfa8(0x267)]()-_0x539b5b[_0x2ecfa8(0x1b6)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0xa4c38b[_0x2ecfa8(0x249)](_0x32f254[_0x2ecfa8(0x251)])&&(_0x15b711=[_0x2ecfa8(0x24f),_0x2ecfa8(0x19a),_0x2ecfa8(0x1f2),_0x2ecfa8(0x273)]);const _0x5dd119=_0xa4c38b['match'](_0x32f254[_0x2ecfa8(0x260)]);if(_0x5dd119)for(const _0x41575a of _0x5dd119){if(!_0x41575a)continue;if(_0x41575a[_0x2ecfa8(0x249)](/ALL/i)){_0x15b711=['GOLD','ITEM','WEAPON',_0x2ecfa8(0x273)];if(_0x41575a[_0x2ecfa8(0x249)](/([\+\-]\d+)([%％])/i))_0x5eea8a[_0x2ecfa8(0x1c8)]+=Number(RegExp['$1'])*0.01;else _0x41575a[_0x2ecfa8(0x249)](/(\d+)([%％])/i)&&(_0x3b1c1f[_0x2ecfa8(0x1c8)]*=Number(RegExp['$1'])*0.01);}if(_0x41575a['match'](/GOLD/i)){_0x15b711['push'](_0x2ecfa8(0x24f));if(_0x41575a[_0x2ecfa8(0x249)](/([\+\-]\d+)([%％])/i))_0x5eea8a[_0x2ecfa8(0x21a)]+=Number(RegExp['$1'])*0.01;else _0x41575a['match'](/(\d+)([%％])/i)&&(_0x3b1c1f['gold']*=Number(RegExp['$1'])*0.01);}if(_0x41575a[_0x2ecfa8(0x249)](/ITEM/i)){_0x15b711[_0x2ecfa8(0x1af)](_0x2ecfa8(0x19a));if(_0x41575a[_0x2ecfa8(0x249)](/([\+\-]\d+)([%％])/i))_0x5eea8a[_0x2ecfa8(0x1e5)]+=Number(RegExp['$1'])*0.01;else _0x41575a['match'](/(\d+)([%％])/i)&&(_0x3b1c1f[_0x2ecfa8(0x1e5)]*=Number(RegExp['$1'])*0.01);}if(_0x41575a[_0x2ecfa8(0x249)](/WEAPON/i)){_0x15b711['push'](_0x2ecfa8(0x1f2));if(_0x41575a[_0x2ecfa8(0x249)](/([\+\-]\d+)([%％])/i))_0x5eea8a[_0x2ecfa8(0x26a)]+=Number(RegExp['$1'])*0.01;else _0x41575a[_0x2ecfa8(0x249)](/(\d+)([%％])/i)&&(_0x3b1c1f['weapon']*=Number(RegExp['$1'])*0.01);}if(_0x41575a[_0x2ecfa8(0x249)](/ARMOR/i)){_0x15b711[_0x2ecfa8(0x1af)](_0x2ecfa8(0x273));if(_0x41575a[_0x2ecfa8(0x249)](/([\+\-]\d+)([%％])/i))_0x5eea8a[_0x2ecfa8(0x26e)]+=Number(RegExp['$1'])*0.01;else _0x41575a[_0x2ecfa8(0x249)](/(\d+)([%％])/i)&&(_0x3b1c1f[_0x2ecfa8(0x26e)]*=Number(RegExp['$1'])*0.01);}}let _0x2aa841=VisuMZ['StealItems'][_0x2ecfa8(0x1d9)](_0x16b673[_0x2ecfa8(0x1e5)](),_0x2ecfa8(0x232));return VisuMZ['StealItems']['JS'][_0x2aa841]&&(_0x3b1c1f[_0x2ecfa8(0x1c8)]=VisuMZ['StealItems']['JS'][_0x2aa841][_0x2ecfa8(0x292)](_0x16b673,_0x16b673[_0x2ecfa8(0x268)](),_0x539b5b,_0x3b1c1f[_0x2ecfa8(0x1c8)])),_0x2aa841=VisuMZ[_0x2ecfa8(0x1e2)]['createKeyJS'](_0x16b673[_0x2ecfa8(0x1e5)](),_0x2ecfa8(0x25f)),VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841]&&(_0x3b1c1f[_0x2ecfa8(0x21a)]=VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841][_0x2ecfa8(0x292)](_0x16b673,_0x16b673[_0x2ecfa8(0x268)](),_0x539b5b,_0x3b1c1f[_0x2ecfa8(0x21a)])),_0x2aa841=VisuMZ['StealItems'][_0x2ecfa8(0x1d9)](_0x16b673[_0x2ecfa8(0x1e5)](),_0x2ecfa8(0x203)),VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841]&&(_0x3b1c1f[_0x2ecfa8(0x1e5)]=VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841][_0x2ecfa8(0x292)](_0x16b673,_0x16b673[_0x2ecfa8(0x268)](),_0x539b5b,_0x3b1c1f[_0x2ecfa8(0x1e5)])),_0x2aa841=VisuMZ[_0x2ecfa8(0x1e2)]['createKeyJS'](_0x16b673[_0x2ecfa8(0x1e5)](),_0x2ecfa8(0x295)),VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841]&&(_0x3b1c1f[_0x2ecfa8(0x26a)]=VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841][_0x2ecfa8(0x292)](_0x16b673,_0x16b673['subject'](),_0x539b5b,_0x3b1c1f[_0x2ecfa8(0x26a)])),_0x2aa841=VisuMZ[_0x2ecfa8(0x1e2)][_0x2ecfa8(0x1d9)](_0x16b673['item'](),'JsStealRateArmor'),VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841]&&(_0x3b1c1f[_0x2ecfa8(0x26e)]=VisuMZ[_0x2ecfa8(0x1e2)]['JS'][_0x2aa841][_0x2ecfa8(0x292)](_0x16b673,_0x16b673['subject'](),_0x539b5b,_0x3b1c1f[_0x2ecfa8(0x26e)])),{'types':_0x15b711,'rate':_0x3b1c1f,'plus':_0x5eea8a};},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1de)]=function(_0x53b6a1){const _0x5ec024=_0x4c7b4f;var _0x370332,_0x273fee,_0x493cfb;for(_0x493cfb=_0x53b6a1[_0x5ec024(0x23d)]-0x1;_0x493cfb>0x0;_0x493cfb--){_0x370332=Math['floor'](Math[_0x5ec024(0x253)]()*(_0x493cfb+0x1)),_0x273fee=_0x53b6a1[_0x493cfb],_0x53b6a1[_0x493cfb]=_0x53b6a1[_0x370332],_0x53b6a1[_0x370332]=_0x273fee;}return _0x53b6a1;},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x24e)]=function(_0x28c043,_0xc7e4ba,_0x2b68af){const _0x479fd6=_0x4c7b4f;VisuMZ[_0x479fd6(0x1e2)][_0x479fd6(0x1de)](_0x2b68af),this[_0x479fd6(0x280)](_0x28c043);for(const _0x30c8dd of _0x2b68af){if(!_0x30c8dd)continue;let _0x53431c=_0xc7e4ba[_0x479fd6(0x1ac)][_0x479fd6(0x1c8)]*_0x30c8dd[_0x479fd6(0x1ac)],_0x3f1f2f=_0xc7e4ba[_0x479fd6(0x1c4)][_0x479fd6(0x1c8)];_0x53431c*=_0xc7e4ba[_0x479fd6(0x1ac)][_0x30c8dd[_0x479fd6(0x1cb)][_0x479fd6(0x269)]()],_0x3f1f2f+=_0xc7e4ba[_0x479fd6(0x1c4)][_0x30c8dd[_0x479fd6(0x1cb)][_0x479fd6(0x269)]()];const _0x1525e2=_0x53431c+_0x3f1f2f;if(Math[_0x479fd6(0x253)]()<_0x1525e2)return this[_0x479fd6(0x195)](_0x28c043,_0x30c8dd);}this[_0x479fd6(0x20e)](_0x28c043);},Game_Action[_0x4c7b4f(0x245)]['isSnatchEffect']=function(){const _0x4edd20=_0x4c7b4f;if(!this[_0x4edd20(0x261)]())return![];if(!this[_0x4edd20(0x259)]())return![];if(!this[_0x4edd20(0x202)]())return![];const _0x2547a4=VisuMZ[_0x4edd20(0x1e2)][_0x4edd20(0x281)],_0x13d735=this['item']()[_0x4edd20(0x254)];return _0x13d735[_0x4edd20(0x249)](_0x2547a4[_0x4edd20(0x291)])&&(_0x13d735[_0x4edd20(0x249)](_0x2547a4['StealAction1'])||_0x13d735[_0x4edd20(0x249)](_0x2547a4[_0x4edd20(0x260)]));},Game_Action[_0x4c7b4f(0x245)]['registerSnatchTarget']=function(_0x54bf74,_0x5dfcd1){const _0x10a5d7=_0x4c7b4f;this[_0x10a5d7(0x1c1)]=_0x54bf74[_0x10a5d7(0x1f8)]();const _0x8b59ef=_0x54bf74[_0x10a5d7(0x1fa)]();this[_0x10a5d7(0x21d)]=_0x8b59ef[_0x10a5d7(0x1d0)](_0x5dfcd1);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1b5)]=function(_0x177ea2){const _0x787ae1=_0x4c7b4f;if(_0x177ea2['index']()!==this['_snatchEnemyIndex'])return[];this[_0x787ae1(0x21d)]=this[_0x787ae1(0x21d)]||0x0;const _0x116b5f=_0x177ea2[_0x787ae1(0x1fa)]();return[_0x116b5f[this[_0x787ae1(0x21d)]]];},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x195)]=function(_0x260ea6,_0x5567f6){const _0x3a55e1=_0x4c7b4f;_0x5567f6['stolen']=!![],this[_0x3a55e1(0x24c)](_0x260ea6,_0x5567f6),this[_0x3a55e1(0x276)](_0x5567f6),this[_0x3a55e1(0x20a)](_0x260ea6,_0x5567f6),this[_0x3a55e1(0x1f9)](_0x260ea6,_0x5567f6),this['processStealItemsSuccessJS'](_0x260ea6,_0x5567f6);},Game_Action[_0x4c7b4f(0x245)]['processStealItemsSuccessLogWindow']=function(_0x1d1e1f,_0x15435c){const _0x36d375=_0x4c7b4f,_0x4d7967=VisuMZ[_0x36d375(0x1e2)][_0x36d375(0x21e)][_0x36d375(0x1dd)];let _0x2e2a7b=_0x4d7967['StealItem'],_0x5aa774='';if(_0x15435c[_0x36d375(0x1cb)]===_0x36d375(0x24f)){$gameParty[_0x36d375(0x1e7)](_0x15435c['id']);if(Imported['VisuMZ_3_VisualGoldDisplay']){const _0x5824b0=Window_Base['VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT'],_0x83f6d=VisuMZ[_0x36d375(0x19c)][_0x36d375(0x1f3)](_0x15435c['id'],_0x5824b0,![]);_0x5aa774=_0x2e2a7b[_0x36d375(0x286)](_0x83f6d,'');}else _0x2e2a7b=_0x4d7967[_0x36d375(0x231)],_0x5aa774=_0x2e2a7b[_0x36d375(0x286)](TextManager['currencyUnit'],_0x15435c['id']);if(Imported[_0x36d375(0x1d3)]){const _0x51ba39=VisuMZ[_0x36d375(0x1e2)][_0x36d375(0x21e)][_0x36d375(0x22a)];_0x51ba39[_0x36d375(0x22b)]&&_0x51ba39[_0x36d375(0x21f)]&&(_0x1d1e1f[_0x36d375(0x275)]=_0x1d1e1f[_0x36d375(0x275)]||{},_0x1d1e1f[_0x36d375(0x275)][_0x36d375(0x21a)]=0x0);}}else{if(_0x15435c[_0x36d375(0x1cb)]===_0x36d375(0x19a)){const _0x3d8a48=$dataItems[_0x15435c['id']];if(!_0x3d8a48)return;$gameParty[_0x36d375(0x1a0)](_0x3d8a48,0x1);const _0x3b214d='\x5cI[%1]'[_0x36d375(0x286)](_0x3d8a48[_0x36d375(0x274)]);_0x5aa774=_0x2e2a7b[_0x36d375(0x286)](_0x3d8a48[_0x36d375(0x1e4)],_0x3b214d);}else{if(_0x15435c[_0x36d375(0x1cb)]==='WEAPON'){const _0x358a77=$dataWeapons[_0x15435c['id']];if(!_0x358a77)return;$gameParty[_0x36d375(0x1a0)](_0x358a77,0x1);const _0xc05c06='\x5cI[%1]'['format'](_0x358a77[_0x36d375(0x274)]);_0x5aa774=_0x2e2a7b[_0x36d375(0x286)](_0x358a77[_0x36d375(0x1e4)],_0xc05c06);}else{if(_0x15435c[_0x36d375(0x1cb)]===_0x36d375(0x273)){const _0x5efac3=$dataArmors[_0x15435c['id']];if(!_0x5efac3)return;$gameParty[_0x36d375(0x1a0)](_0x5efac3,0x1);const _0x5d7409=_0x36d375(0x1e0)[_0x36d375(0x286)](_0x5efac3[_0x36d375(0x274)]);_0x5aa774=_0x2e2a7b[_0x36d375(0x286)](_0x5efac3[_0x36d375(0x1e4)],_0x5d7409);}}}}if(_0x4d7967['ShowMessages']){const _0x50d6a8=SceneManager[_0x36d375(0x1fb)][_0x36d375(0x29b)];if(_0x50d6a8&&_0x5aa774!=='')_0x50d6a8[_0x36d375(0x19d)](_0x5aa774);}},Game_Action['prototype']['processStealItemsSuccessSFX']=function(_0x53c280){const _0x3331b3=_0x4c7b4f,_0x257e83=VisuMZ[_0x3331b3(0x1e2)]['Settings']['Sound'];if(!_0x257e83)return;const _0x3a0571=_0x53c280[_0x3331b3(0x1cb)][_0x3331b3(0x269)]()[_0x3331b3(0x265)](),_0x158ad2={'name':_0x257e83[_0x3331b3(0x220)[_0x3331b3(0x286)](_0x3a0571)]||'','volume':_0x257e83[_0x3331b3(0x29c)[_0x3331b3(0x286)](_0x3a0571)]||0x0,'pitch':_0x257e83['%1_pitch'['format'](_0x3a0571)]||0x0,'pan':_0x257e83[_0x3331b3(0x22d)[_0x3331b3(0x286)](_0x3a0571)]||0x0};if(_0x158ad2[_0x3331b3(0x1e4)]!=='')AudioManager['playSe'](_0x158ad2);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x20a)]=function(_0x5ac0a0,_0x17c542){const _0x482c02=_0x4c7b4f;if(!_0x17c542)return;if(!_0x5ac0a0)return;const _0x23a032=VisuMZ[_0x482c02(0x1e2)]['Settings'][_0x482c02(0x271)];if(!_0x23a032)return;if(_0x23a032['SuccessPopupText']==='')return;const _0x4ea32b=_0x23a032[_0x482c02(0x299)],_0x55b32d={'textColor':_0x23a032['SuccessTextColor']||0x0,'flashColor':_0x23a032['SuccessFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x23a032[_0x482c02(0x256)]||0x3c};_0x5ac0a0[_0x482c02(0x229)](_0x4ea32b,_0x55b32d);if(_0x23a032[_0x482c02(0x1d8)]&&_0x17c542[_0x482c02(0x1cb)]!==_0x482c02(0x24f)){let _0x38c2f8=null;if(_0x17c542[_0x482c02(0x1cb)]===_0x482c02(0x19a))_0x38c2f8=$dataItems[_0x17c542['id']];else{if(_0x17c542[_0x482c02(0x1cb)]===_0x482c02(0x1f2))_0x38c2f8=$dataWeapons[_0x17c542['id']];else _0x17c542[_0x482c02(0x1cb)]==='ARMOR'&&(_0x38c2f8=$dataArmors[_0x17c542['id']]);}_0x38c2f8&&_0x5ac0a0[_0x482c02(0x23f)](_0x38c2f8['iconIndex'],_0x38c2f8['name'],_0x55b32d);}},Game_Action['prototype'][_0x4c7b4f(0x1f9)]=function(_0x248c48,_0x198da0){const _0x235fe5=_0x4c7b4f;if(!_0x248c48)return;const _0x7cfa3=VisuMZ[_0x235fe5(0x1e2)][_0x235fe5(0x21e)][_0x235fe5(0x204)];if(!_0x7cfa3)return;if(!_0x7cfa3[_0x235fe5(0x25c)])return;if(!['WEAPON',_0x235fe5(0x273)][_0x235fe5(0x27d)](_0x198da0[_0x235fe5(0x1cb)]))return;let _0x2f5959=null;if(_0x198da0[_0x235fe5(0x1cb)]===_0x235fe5(0x1f2))_0x2f5959=$dataWeapons[_0x198da0['id']];else _0x198da0[_0x235fe5(0x1cb)]===_0x235fe5(0x273)&&(_0x2f5959=$dataArmors[_0x198da0['id']]);if(!_0x2f5959)return;for(let _0x317309=0x0;_0x317309<0x8;_0x317309++){const _0x298fd1=_0x2f5959['params'][_0x317309];_0x248c48[_0x235fe5(0x201)](_0x317309,-_0x298fd1);}},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x222)]=function(_0x3f347b,_0x2b37d5){const _0x37e777=_0x4c7b4f;if(!_0x3f347b)return;let _0x28ec59=null,_0x58c4d1=0x0;if(_0x2b37d5[_0x37e777(0x1cb)]===_0x37e777(0x24f))_0x58c4d1=_0x2b37d5['id'];else{if(_0x2b37d5['type']===_0x37e777(0x19a))_0x28ec59=$dataItems[_0x2b37d5['id']];else{if(_0x2b37d5['type']==='WEAPON')_0x28ec59=$dataWeapons[_0x2b37d5['id']];else _0x2b37d5[_0x37e777(0x1cb)]===_0x37e777(0x273)&&(_0x28ec59=$dataArmors[_0x2b37d5['id']]);}}const _0x41e5d3=VisuMZ['StealItems']['Settings'][_0x37e777(0x204)];_0x41e5d3&&_0x41e5d3[_0x37e777(0x25d)]&&_0x41e5d3[_0x37e777(0x25d)]['call'](this,this[_0x37e777(0x268)](),_0x3f347b,_0x28ec59,_0x58c4d1);const _0x26aa58=VisuMZ['StealItems'][_0x37e777(0x1d9)](this[_0x37e777(0x1e5)](),'JsOnStealSuccess');VisuMZ[_0x37e777(0x1e2)]['JS'][_0x26aa58]&&VisuMZ[_0x37e777(0x1e2)]['JS'][_0x26aa58][_0x37e777(0x292)](this,this[_0x37e777(0x268)](),_0x3f347b,_0x28ec59,_0x58c4d1);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x20e)]=function(_0x5aacf8){const _0x5606b2=_0x4c7b4f;this[_0x5606b2(0x219)](_0x5aacf8),this[_0x5606b2(0x1ee)](),this['processStealItemsFailurePopup'](_0x5aacf8),this[_0x5606b2(0x1c6)](_0x5aacf8);},Game_Action[_0x4c7b4f(0x245)]['processStealItemsFailureLogWindow']=function(_0x1520c5){const _0x3a00ef=_0x4c7b4f,_0x461b40=VisuMZ[_0x3a00ef(0x1e2)][_0x3a00ef(0x21e)][_0x3a00ef(0x1dd)];if(_0x461b40['ShowMessages']){const _0x1c5af0=_0x461b40['StealFail'],_0x310ae7=SceneManager[_0x3a00ef(0x1fb)][_0x3a00ef(0x29b)];if(_0x310ae7&&_0x1c5af0!=='')_0x310ae7[_0x3a00ef(0x19d)](_0x1c5af0);}},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1ee)]=function(){const _0x48cb02=_0x4c7b4f,_0xb7a6ed=VisuMZ[_0x48cb02(0x1e2)][_0x48cb02(0x21e)][_0x48cb02(0x29e)];if(!_0xb7a6ed)return;const _0x27e97a=_0x48cb02(0x288),_0x32ab0d={'name':_0xb7a6ed[_0x48cb02(0x220)[_0x48cb02(0x286)](_0x27e97a)]||'','volume':_0xb7a6ed[_0x48cb02(0x29c)['format'](_0x27e97a)]||0x0,'pitch':_0xb7a6ed['%1_pitch'['format'](_0x27e97a)]||0x0,'pan':_0xb7a6ed[_0x48cb02(0x22d)[_0x48cb02(0x286)](_0x27e97a)]||0x0};if(_0x32ab0d['name']!=='')AudioManager[_0x48cb02(0x23c)](_0x32ab0d);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1a8)]=function(_0x534380){const _0x862868=_0x4c7b4f;if(!_0x534380)return;const _0x38841a=VisuMZ['StealItems'][_0x862868(0x21e)][_0x862868(0x271)];if(!_0x38841a)return;if(_0x38841a[_0x862868(0x28b)]==='')return;const _0x3beb99=_0x38841a[_0x862868(0x28b)],_0x10ccd7={'textColor':_0x38841a[_0x862868(0x248)]||0x0,'flashColor':_0x38841a['FailureFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x38841a[_0x862868(0x22e)]||0x3c};_0x534380['setupTextPopup'](_0x3beb99,_0x10ccd7);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1c6)]=function(_0x2378b5){const _0x59f0d7=_0x4c7b4f;if(!_0x2378b5)return;const _0x117731=VisuMZ[_0x59f0d7(0x1e2)][_0x59f0d7(0x21e)]['Mechanics'];_0x117731&&_0x117731[_0x59f0d7(0x190)]&&_0x117731[_0x59f0d7(0x190)][_0x59f0d7(0x292)](this,this['subject'](),_0x2378b5);const _0x281a82=VisuMZ[_0x59f0d7(0x1e2)][_0x59f0d7(0x1d9)](this[_0x59f0d7(0x1e5)](),_0x59f0d7(0x190));VisuMZ[_0x59f0d7(0x1e2)]['JS'][_0x281a82]&&VisuMZ[_0x59f0d7(0x1e2)]['JS'][_0x281a82][_0x59f0d7(0x292)](this,this[_0x59f0d7(0x268)](),_0x2378b5);},Game_Action['prototype']['processStealItemsNothing']=function(_0x497d3b){const _0x1dfb03=_0x4c7b4f;this[_0x1dfb03(0x226)](_0x497d3b),this[_0x1dfb03(0x1c5)](),this['processStealItemsNothingPopup'](_0x497d3b),this['processStealItemsNothingJS'](_0x497d3b);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x226)]=function(_0xddcbbc){const _0xc192fa=_0x4c7b4f,_0x345eea=VisuMZ[_0xc192fa(0x1e2)][_0xc192fa(0x21e)][_0xc192fa(0x1dd)];if(_0x345eea[_0xc192fa(0x263)]){const _0x491a8a=_0x345eea[_0xc192fa(0x20b)],_0x3ad55c=SceneManager['_scene']['_logWindow'];if(_0x3ad55c&&_0x491a8a!=='')_0x3ad55c[_0xc192fa(0x19d)](_0x491a8a);}},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1c5)]=function(){const _0x380155=_0x4c7b4f,_0x4f0aaa=VisuMZ['StealItems']['Settings'][_0x380155(0x29e)];if(!_0x4f0aaa)return;const _0x35ae2b=_0x380155(0x1fc),_0x36c98b={'name':_0x4f0aaa['%1_name'[_0x380155(0x286)](_0x35ae2b)]||'','volume':_0x4f0aaa[_0x380155(0x29c)['format'](_0x35ae2b)]||0x0,'pitch':_0x4f0aaa[_0x380155(0x272)[_0x380155(0x286)](_0x35ae2b)]||0x0,'pan':_0x4f0aaa['%1_pan'[_0x380155(0x286)](_0x35ae2b)]||0x0};if(_0x36c98b[_0x380155(0x1e4)]!=='')AudioManager[_0x380155(0x23c)](_0x36c98b);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x239)]=function(_0x51c865){const _0x28e75b=_0x4c7b4f;if(!_0x51c865)return;const _0x433d89=VisuMZ[_0x28e75b(0x1e2)][_0x28e75b(0x21e)][_0x28e75b(0x271)];if(!_0x433d89)return;if(_0x433d89['FailurePopupText']==='')return;const _0x385fa4=_0x433d89[_0x28e75b(0x221)],_0x4c232b={'textColor':_0x433d89[_0x28e75b(0x214)]||0x0,'flashColor':_0x433d89[_0x28e75b(0x23b)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x433d89[_0x28e75b(0x1da)]||0x3c};_0x51c865[_0x28e75b(0x229)](_0x385fa4,_0x4c232b);},Game_Action[_0x4c7b4f(0x245)][_0x4c7b4f(0x1ce)]=function(_0x14e981){const _0xff7bf1=_0x4c7b4f;if(!_0x14e981)return;const _0x10ff81=VisuMZ[_0xff7bf1(0x1e2)][_0xff7bf1(0x21e)][_0xff7bf1(0x204)];_0x10ff81&&_0x10ff81[_0xff7bf1(0x242)]&&_0x10ff81[_0xff7bf1(0x242)][_0xff7bf1(0x292)](this,this[_0xff7bf1(0x268)](),_0x14e981);const _0x109627=VisuMZ[_0xff7bf1(0x1e2)][_0xff7bf1(0x1d9)](this[_0xff7bf1(0x1e5)](),_0xff7bf1(0x1b7));VisuMZ[_0xff7bf1(0x1e2)]['JS'][_0x109627]&&VisuMZ[_0xff7bf1(0x1e2)]['JS'][_0x109627][_0xff7bf1(0x292)](this,this[_0xff7bf1(0x268)](),_0x14e981);},VisuMZ['StealItems'][_0x4c7b4f(0x29a)]=Game_BattlerBase['prototype'][_0x4c7b4f(0x23e)],Game_BattlerBase[_0x4c7b4f(0x245)][_0x4c7b4f(0x23e)]=function(){const _0x5215ce=_0x4c7b4f;this['_cache']={},VisuMZ[_0x5215ce(0x1e2)][_0x5215ce(0x29a)][_0x5215ce(0x292)](this);},Game_BattlerBase[_0x4c7b4f(0x245)]['checkCacheKey']=function(_0x39f0b7){const _0x146b28=_0x4c7b4f;return this[_0x146b28(0x1df)]=this[_0x146b28(0x1df)]||{},this['_cache'][_0x39f0b7]!==undefined;},Game_BattlerBase[_0x4c7b4f(0x245)][_0x4c7b4f(0x196)]=function(){const _0x413501=_0x4c7b4f;let _0x385d98=_0x413501(0x196);if(this[_0x413501(0x1b3)](_0x385d98))return this[_0x413501(0x1df)][_0x385d98];return this[_0x413501(0x1df)][_0x385d98]=this[_0x413501(0x205)](),this[_0x413501(0x1df)][_0x385d98];},Game_BattlerBase['prototype']['createStealRate']=function(){const _0x56a62c=_0x4c7b4f,_0x4d98aa=VisuMZ['StealItems'][_0x56a62c(0x281)];let _0x4b786b=0x1;for(const _0x4d9329 of this['traitObjects']()){if(!_0x4d9329)continue;const _0x139e0b=_0x4d9329[_0x56a62c(0x254)];_0x139e0b['match'](_0x4d98aa[_0x56a62c(0x296)])&&(_0x4b786b*=Number(RegExp['$1'])*0.01);}return Math[_0x56a62c(0x27e)](0x0,_0x4b786b);},Game_BattlerBase[_0x4c7b4f(0x245)]['stealPlus']=function(){const _0x30ba4c=_0x4c7b4f;let _0x5460f6=_0x30ba4c(0x267);if(this[_0x30ba4c(0x1b3)](_0x5460f6))return this[_0x30ba4c(0x1df)][_0x5460f6];return this['_cache'][_0x5460f6]=this['createStealPlus'](),this['_cache'][_0x5460f6];},Game_BattlerBase[_0x4c7b4f(0x245)]['createStealPlus']=function(){const _0x536a9d=_0x4c7b4f,_0x389f71=VisuMZ[_0x536a9d(0x1e2)][_0x536a9d(0x281)];let _0x29d742=0x0;const _0x4039b3=VisuMZ[_0x536a9d(0x1e2)][_0x536a9d(0x21e)][_0x536a9d(0x204)];_0x4039b3&&_0x4039b3[_0x536a9d(0x266)]&&(_0x29d742+=_0x4039b3[_0x536a9d(0x266)]['call'](this));for(const _0xf74398 of this[_0x536a9d(0x22c)]()){if(!_0xf74398)continue;const _0x228d37=_0xf74398[_0x536a9d(0x254)];_0x228d37[_0x536a9d(0x249)](_0x389f71[_0x536a9d(0x1a6)])&&(_0x29d742+=Number(RegExp['$1'])*0.01);}return _0x29d742;},Game_BattlerBase[_0x4c7b4f(0x245)][_0x4c7b4f(0x1b6)]=function(){const _0x482485=_0x4c7b4f;let _0x59a1bd=_0x482485(0x1b6);if(this[_0x482485(0x1b3)](_0x59a1bd))return this['_cache'][_0x59a1bd];return this[_0x482485(0x1df)][_0x59a1bd]=this[_0x482485(0x25b)](),this[_0x482485(0x1df)][_0x59a1bd];},Game_BattlerBase['prototype'][_0x4c7b4f(0x25b)]=function(){const _0x29c11a=_0x4c7b4f,_0x3ebd78=VisuMZ['StealItems']['RegExp'];let _0x46f49f=0x0;const _0x135d2a=VisuMZ['StealItems'][_0x29c11a(0x21e)]['Mechanics'];_0x135d2a&&_0x135d2a[_0x29c11a(0x279)]&&(_0x46f49f+=_0x135d2a[_0x29c11a(0x279)]['call'](this));for(const _0x51577c of this[_0x29c11a(0x22c)]()){if(!_0x51577c)continue;const _0x41c11e=_0x51577c[_0x29c11a(0x254)];_0x41c11e[_0x29c11a(0x249)](_0x3ebd78[_0x29c11a(0x217)])&&(_0x46f49f+=Number(RegExp['$1'])*0.01);}return _0x46f49f;},VisuMZ['StealItems'][_0x4c7b4f(0x1a2)]=Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x257)],Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x257)]=function(_0x5400bc,_0x49b3de,_0x7d30b6){const _0xb8575e=_0x4c7b4f;VisuMZ['StealItems']['Game_Enemy_setup']['call'](this,_0x5400bc,_0x49b3de,_0x7d30b6),!Imported[_0xb8575e(0x1cf)]&&this[_0xb8575e(0x1f0)]();},VisuMZ[_0x4c7b4f(0x1e2)]['Game_Enemy_setupEnemyLevels']=Game_Enemy['prototype'][_0x4c7b4f(0x26c)],Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x26c)]=function(){const _0x12a52a=_0x4c7b4f;VisuMZ[_0x12a52a(0x1e2)][_0x12a52a(0x1db)][_0x12a52a(0x292)](this),this[_0x12a52a(0x1f0)]();},Game_Enemy[_0x4c7b4f(0x245)]['getStealableItems']=function(){const _0x481b67=_0x4c7b4f;if(this[_0x481b67(0x228)]===undefined)this[_0x481b67(0x1f0)]();return this[_0x481b67(0x228)];},Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x1f0)]=function(){const _0x101af6=_0x4c7b4f,_0x12f96b=this[_0x101af6(0x235)]();if(!_0x12f96b)return;this[_0x101af6(0x228)]=VisuMZ[_0x101af6(0x1e2)][_0x101af6(0x29d)](this,_0x12f96b);},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x213)]={},VisuMZ['StealItems'][_0x4c7b4f(0x29d)]=function(_0x364b4e,_0x263eec){const _0xb46649=_0x4c7b4f;if(!_0x263eec)return[];if(VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x213)][_0x263eec['id']])return JsonEx['makeDeepCopy'](VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x213)][_0x263eec['id']]);VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x213)][_0x263eec['id']]=[];const _0xadfdf3=VisuMZ[_0xb46649(0x1e2)]['Settings'][_0xb46649(0x22a)],_0x394cf8=VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x281)],_0x3bbe2f=_0x263eec[_0xb46649(0x254)];if(_0xadfdf3['AutoGold']&&_0x263eec[_0xb46649(0x21a)]>0x0){const _0x5224fd={'type':'GOLD','id':_0x263eec[_0xb46649(0x21a)],'rate':_0xadfdf3[_0xb46649(0x191)],'stolen':![],'drop':!![]};VisuMZ['StealItems']['StealData'][_0x263eec['id']][_0xb46649(0x1af)](_0x5224fd);}if(_0xadfdf3[_0xb46649(0x1bd)]){const _0x3ab233=_0x263eec[_0xb46649(0x283)];for(const _0x17eeca of _0x3ab233){if(_0x17eeca){const _0x425042={'type':_0xb46649(0x1ef),'id':_0x17eeca[_0xb46649(0x290)],'rate':0x1/Math[_0xb46649(0x27e)](0x1,_0x17eeca[_0xb46649(0x1e9)])*_0xadfdf3[_0xb46649(0x1ec)],'stolen':![],'drop':!![],'dropIndex':_0x3ab233[_0xb46649(0x1d0)](_0x17eeca)};_0x425042[_0xb46649(0x1cb)]=[_0xb46649(0x1ef),_0xb46649(0x19a),_0xb46649(0x1f2),_0xb46649(0x273)][_0x17eeca[_0xb46649(0x1a4)]];if(_0x425042['type']===_0xb46649(0x1ef))continue;VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x213)][_0x263eec['id']][_0xb46649(0x1af)](_0x425042);}}}const _0x38c448=_0x3bbe2f[_0xb46649(0x249)](_0x394cf8[_0xb46649(0x238)]);if(_0x38c448)for(const _0x2089a4 of _0x38c448){if(!_0x2089a4)continue;_0x2089a4[_0xb46649(0x249)](_0x394cf8[_0xb46649(0x238)]);const _0x2ceab7=String(RegExp['$1'])['trim'](),_0x4ec1e0=Number(RegExp['$2'])*0.01,_0x433c43=VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x298)](_0x2ceab7,_0x4ec1e0);if(!!_0x433c43)VisuMZ[_0xb46649(0x1e2)][_0xb46649(0x213)][_0x263eec['id']][_0xb46649(0x1af)](_0x433c43);}if(_0x3bbe2f[_0xb46649(0x249)](_0x394cf8[_0xb46649(0x1d4)])){const _0x48b4cc=String(RegExp['$1'])[_0xb46649(0x1d1)](/[\r\n]+/);for(const _0xd4f8ae of _0x48b4cc){if(_0xd4f8ae['match'](/(.*):[ ](.*)([%％])/i)){const _0x248a57=String(RegExp['$1'])['trim'](),_0x4bba8e=Number(RegExp['$2'])*0.01,_0x23e53e=VisuMZ['StealItems'][_0xb46649(0x298)](_0x248a57,_0x4bba8e);if(!!_0x23e53e)VisuMZ['StealItems']['StealData'][_0x263eec['id']][_0xb46649(0x1af)](_0x23e53e);}}}return JsonEx['makeDeepCopy'](VisuMZ['StealItems']['StealData'][_0x263eec['id']]);},VisuMZ[_0x4c7b4f(0x1e2)]['ParseStealObject']=function(_0x2b4cd7,_0x6b33e9){const _0x1e72c=_0x4c7b4f,_0x3d09cf={'type':_0x1e72c(0x1ef),'id':0x0,'rate':_0x6b33e9,'stolen':![],'drop':![]};_0x2b4cd7['match'](/GOLD[ ](\d+)/i)&&(_0x3d09cf[_0x1e72c(0x1cb)]=_0x1e72c(0x24f),_0x3d09cf['id']=Number(RegExp['$1']));if(_0x2b4cd7[_0x1e72c(0x249)](/ITEM[ ](\d+)/i))_0x3d09cf[_0x1e72c(0x1cb)]='ITEM',_0x3d09cf['id']=Number(RegExp['$1']);else _0x2b4cd7[_0x1e72c(0x249)](/ITEM[ ](.*)/i)&&(_0x3d09cf[_0x1e72c(0x1cb)]='ITEM',_0x3d09cf['id']=DataManager[_0x1e72c(0x230)](RegExp['$1']));if(_0x2b4cd7['match'](/WEAPON[ ](\d+)/i))_0x3d09cf[_0x1e72c(0x1cb)]=_0x1e72c(0x1f2),_0x3d09cf['id']=Number(RegExp['$1']);else _0x2b4cd7[_0x1e72c(0x249)](/WEAPON[ ](.*)/i)&&(_0x3d09cf[_0x1e72c(0x1cb)]=_0x1e72c(0x1f2),_0x3d09cf['id']=DataManager[_0x1e72c(0x1b0)](RegExp['$1']));if(_0x2b4cd7[_0x1e72c(0x249)](/ARMOR[ ](\d+)/i))_0x3d09cf[_0x1e72c(0x1cb)]='ARMOR',_0x3d09cf['id']=Number(RegExp['$1']);else _0x2b4cd7[_0x1e72c(0x249)](/ARMOR[ ](.*)/i)&&(_0x3d09cf[_0x1e72c(0x1cb)]=_0x1e72c(0x273),_0x3d09cf['id']=DataManager[_0x1e72c(0x1d7)](RegExp['$1']));return _0x3d09cf;},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1be)]=Game_Enemy['prototype'][_0x4c7b4f(0x21a)],Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x21a)]=function(){const _0x4f60ca=_0x4c7b4f,_0x11349a=VisuMZ[_0x4f60ca(0x1e2)]['Settings'][_0x4f60ca(0x22a)];if(_0x11349a[_0x4f60ca(0x22b)]&&_0x11349a[_0x4f60ca(0x21f)]){const _0x4d3dcb=this[_0x4f60ca(0x1fa)]();for(const _0x403591 of _0x4d3dcb){if(!_0x403591)continue;if(_0x403591[_0x4f60ca(0x240)]&&_0x403591[_0x4f60ca(0x1cb)]===_0x4f60ca(0x24f)){if(_0x403591[_0x4f60ca(0x258)])return 0x0;}}}return VisuMZ[_0x4f60ca(0x1e2)]['Game_Enemy_gold'][_0x4f60ca(0x292)](this);},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1ba)]=Game_Enemy['prototype'][_0x4c7b4f(0x28e)],Game_Enemy[_0x4c7b4f(0x245)][_0x4c7b4f(0x28e)]=function(){const _0x47610d=_0x4c7b4f,_0x4a201a=JsonEx[_0x47610d(0x18f)](this['enemy']()[_0x47610d(0x283)]),_0x2d5028=VisuMZ['StealItems'][_0x47610d(0x21e)]['Auto'];if(_0x2d5028[_0x47610d(0x1bd)]&&_0x2d5028[_0x47610d(0x21c)]){const _0x21ffcf=this[_0x47610d(0x1fa)]();for(const _0xf0e47e of _0x21ffcf){if(!_0xf0e47e)continue;if(_0xf0e47e[_0x47610d(0x240)]&&_0xf0e47e[_0x47610d(0x1cb)]!==_0x47610d(0x24f)){if(!_0xf0e47e[_0x47610d(0x258)])continue;const _0x14cef9=_0xf0e47e[_0x47610d(0x1c9)],_0x299122=this[_0x47610d(0x235)]()[_0x47610d(0x283)][_0x14cef9];_0x299122[_0x47610d(0x1a4)]=0x0;}}}let _0x6b38ed=VisuMZ[_0x47610d(0x1e2)][_0x47610d(0x1ba)][_0x47610d(0x292)](this);return this[_0x47610d(0x235)]()[_0x47610d(0x283)]=_0x4a201a,_0x6b38ed;},VisuMZ['StealItems'][_0x4c7b4f(0x270)]=Scene_Battle[_0x4c7b4f(0x245)]['createEnemyWindow'],Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x1fd)]=function(){const _0x48e0de=_0x4c7b4f;VisuMZ[_0x48e0de(0x1e2)][_0x48e0de(0x270)][_0x48e0de(0x292)](this),this[_0x48e0de(0x1d5)]();},Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x1d5)]=function(){const _0x504d43=_0x4c7b4f,_0x51043f=this[_0x504d43(0x241)]();this[_0x504d43(0x1c2)]=new Window_StealSnatch(_0x51043f),this[_0x504d43(0x1c2)][_0x504d43(0x246)](this[_0x504d43(0x227)]),this[_0x504d43(0x1c2)][_0x504d43(0x1a5)]('ok',this[_0x504d43(0x208)]['bind'](this)),this['_stealSnatchWindow'][_0x504d43(0x1a5)](_0x504d43(0x1cd),this[_0x504d43(0x27b)]['bind'](this)),this['addWindow'](this[_0x504d43(0x1c2)]);},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1f5)]=Scene_Battle['prototype'][_0x4c7b4f(0x28c)],Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x28c)]=function(){const _0x25f078=_0x4c7b4f;if(this[_0x25f078(0x1c2)]&&this[_0x25f078(0x1c2)][_0x25f078(0x1b9)])return!![];return VisuMZ[_0x25f078(0x1e2)][_0x25f078(0x1f5)][_0x25f078(0x292)](this);},VisuMZ[_0x4c7b4f(0x1e2)]['Scene_Battle_hideSubInputWindows']=Scene_Battle['prototype'][_0x4c7b4f(0x1f1)],Scene_Battle['prototype']['hideSubInputWindows']=function(){const _0x26469c=_0x4c7b4f;VisuMZ[_0x26469c(0x1e2)]['Scene_Battle_hideSubInputWindows'][_0x26469c(0x292)](this),this[_0x26469c(0x1c2)]&&(this[_0x26469c(0x1c2)]['deactivate'](),this['_stealSnatchWindow'][_0x26469c(0x25a)]());},VisuMZ[_0x4c7b4f(0x1e2)][_0x4c7b4f(0x1cc)]=Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x1bb)],Scene_Battle['prototype'][_0x4c7b4f(0x1bb)]=function(){const _0x3575bf=_0x4c7b4f,_0x1a131e=BattleManager[_0x3575bf(0x285)]();this[_0x3575bf(0x1c2)]&&_0x1a131e[_0x3575bf(0x1ed)]()?this[_0x3575bf(0x282)]():VisuMZ[_0x3575bf(0x1e2)][_0x3575bf(0x1cc)][_0x3575bf(0x292)](this);},Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x282)]=function(){const _0x4c1930=_0x4c7b4f,_0x19518e=$gameTroop[_0x4c1930(0x192)]()[this[_0x4c1930(0x19e)][_0x4c1930(0x215)]()],_0x2a4a16=BattleManager[_0x4c1930(0x285)]();this[_0x4c1930(0x1c2)][_0x4c1930(0x237)](_0x19518e,_0x2a4a16),this['_stealSnatchWindow'][_0x4c1930(0x23e)](),this[_0x4c1930(0x1c2)][_0x4c1930(0x21b)](),this[_0x4c1930(0x1c2)][_0x4c1930(0x289)]();},Scene_Battle[_0x4c7b4f(0x245)][_0x4c7b4f(0x208)]=function(){const _0x203ec0=_0x4c7b4f,_0x1bb895=BattleManager['inputtingAction'](),_0x42afd4=$gameTroop['members']()[this[_0x203ec0(0x19e)]['enemyIndex']()],_0x4963c3=this[_0x203ec0(0x1c2)][_0x203ec0(0x1e5)]();_0x1bb895[_0x203ec0(0x236)](_0x42afd4,_0x4963c3),VisuMZ[_0x203ec0(0x1e2)]['Scene_Battle_onEnemyOk'][_0x203ec0(0x292)](this);},Scene_Battle[_0x4c7b4f(0x245)]['onStealSnatchCancel']=function(){const _0x3806b7=_0x4c7b4f;this[_0x3806b7(0x1c2)][_0x3806b7(0x25a)](),this[_0x3806b7(0x1c2)][_0x3806b7(0x206)](),this[_0x3806b7(0x19e)][_0x3806b7(0x21b)](),this[_0x3806b7(0x19e)][_0x3806b7(0x289)](),Imported[_0x3806b7(0x216)]&&this[_0x3806b7(0x19e)][_0x3806b7(0x1a9)]();},Window_BattleLog[_0x4c7b4f(0x245)][_0x4c7b4f(0x19d)]=function(_0x1fb44b){const _0x1a066e=_0x4c7b4f;this['_lines'][_0x1a066e(0x1af)](_0x1fb44b),this[_0x1a066e(0x23e)]();};function Window_StealSnatch(){const _0x4edd4c=_0x4c7b4f;this[_0x4edd4c(0x26d)](...arguments);}function _0x2b8d(_0x19c88f,_0x206544){const _0xa5bcee=_0xa5bc();return _0x2b8d=function(_0x2b8d6e,_0x20505a){_0x2b8d6e=_0x2b8d6e-0x18f;let _0x3ca6e2=_0xa5bcee[_0x2b8d6e];return _0x3ca6e2;},_0x2b8d(_0x19c88f,_0x206544);}Window_StealSnatch[_0x4c7b4f(0x245)]=Object[_0x4c7b4f(0x1f4)](Window_ItemList['prototype']),Window_StealSnatch['prototype'][_0x4c7b4f(0x28d)]=Window_StealSnatch,Window_StealSnatch[_0x4c7b4f(0x245)][_0x4c7b4f(0x26d)]=function(_0x3d8948){const _0x1bda8d=_0x4c7b4f;Window_ItemList[_0x1bda8d(0x245)]['initialize']['call'](this,_0x3d8948),this[_0x1bda8d(0x25a)](),this['_enemy']=null,this['_action']=null;},Window_StealSnatch[_0x4c7b4f(0x245)][_0x4c7b4f(0x237)]=function(_0x4c0278,_0x569911){const _0x336a6f=_0x4c7b4f;this[_0x336a6f(0x198)]=_0x4c0278,this[_0x336a6f(0x199)]=_0x569911,this[_0x336a6f(0x23e)](),this[_0x336a6f(0x21b)](),this[_0x336a6f(0x1c0)](0x0);},Window_StealSnatch[_0x4c7b4f(0x245)]['makeItemList']=function(){const _0x7493eb=_0x4c7b4f;this[_0x7493eb(0x1c3)]=[];if(!this[_0x7493eb(0x198)])return;const _0x4aff42=VisuMZ[_0x7493eb(0x1e2)][_0x7493eb(0x20c)](this['_action'],this[_0x7493eb(0x198)]);if(_0x4aff42[_0x7493eb(0x1e3)][_0x7493eb(0x23d)]<=0x0)return;this[_0x7493eb(0x1c3)]=this[_0x7493eb(0x198)][_0x7493eb(0x1fa)]()['filter'](_0xab45d6=>{const _0x437a5=_0x7493eb;return _0x4aff42[_0x437a5(0x1e3)][_0x437a5(0x27d)](_0xab45d6['type']);});},Window_StealSnatch[_0x4c7b4f(0x245)][_0x4c7b4f(0x1d6)]=function(_0x26bc21){const _0x381efa=_0x4c7b4f;return _0x26bc21&&!_0x26bc21[_0x381efa(0x258)];},Window_StealSnatch[_0x4c7b4f(0x245)]['numberWidth']=function(){const _0x101290=_0x4c7b4f;if(this[_0x101290(0x262)])return this['_numberWidth'];return this[_0x101290(0x262)]=this[_0x101290(0x1a3)](_0x101290(0x1b8)),this['_numberWidth']=Math['max'](this[_0x101290(0x262)],this[_0x101290(0x1bf)](TextManager[_0x101290(0x247)])['width']),this[_0x101290(0x262)];},Window_StealSnatch['prototype'][_0x4c7b4f(0x26f)]=function(_0x8171c5,_0x21bc99,_0x536f2b,_0x551f7e){const _0x18d008=_0x4c7b4f;if(!_0x8171c5)return;switch(_0x8171c5[_0x18d008(0x1cb)]['toUpperCase']()[_0x18d008(0x265)]()){case _0x18d008(0x24f):const _0x245964=TextManager[_0x18d008(0x225)][_0x18d008(0x286)](_0x18d008(0x1e0)['format'](ImageManager[_0x18d008(0x28a)]),_0x8171c5['id'],TextManager['currencyUnit']);this[_0x18d008(0x27c)](_0x245964,_0x21bc99,_0x536f2b);break;case'ITEM':Window_Base[_0x18d008(0x245)]['drawItemName'][_0x18d008(0x292)](this,$dataItems[_0x8171c5['id']],_0x21bc99,_0x536f2b,_0x551f7e);break;case'WEAPON':Window_Base[_0x18d008(0x245)][_0x18d008(0x26f)][_0x18d008(0x292)](this,$dataWeapons[_0x8171c5['id']],_0x21bc99,_0x536f2b,_0x551f7e);break;case'ARMOR':Window_Base['prototype'][_0x18d008(0x26f)][_0x18d008(0x292)](this,$dataArmors[_0x8171c5['id']],_0x21bc99,_0x536f2b,_0x551f7e);break;}},Window_StealSnatch[_0x4c7b4f(0x245)][_0x4c7b4f(0x1ad)]=function(_0x31c8e9,_0x3e4888,_0x16f551,_0x443559){const _0x9f11a5=_0x4c7b4f;if(_0x31c8e9[_0x9f11a5(0x258)]){const _0x57a97c=TextManager[_0x9f11a5(0x247)];_0x3e4888+=_0x443559-this['textSizeEx'](_0x57a97c)['width'],this[_0x9f11a5(0x27c)](_0x57a97c,_0x3e4888,_0x16f551);}else{if(VisuMZ['StealItems'][_0x9f11a5(0x21e)][_0x9f11a5(0x291)]['DisplaySuccess']){const _0x5b62be=VisuMZ[_0x9f11a5(0x1e2)][_0x9f11a5(0x20c)](this[_0x9f11a5(0x199)],this[_0x9f11a5(0x198)]);let _0x4a6a1d=_0x5b62be['rate'][_0x9f11a5(0x1c8)]*_0x31c8e9[_0x9f11a5(0x1ac)],_0x58761a=_0x5b62be[_0x9f11a5(0x1c4)][_0x9f11a5(0x1c8)];_0x4a6a1d*=_0x5b62be[_0x9f11a5(0x1ac)][_0x31c8e9[_0x9f11a5(0x1cb)][_0x9f11a5(0x269)]()],_0x58761a+=_0x5b62be[_0x9f11a5(0x1c4)][_0x31c8e9[_0x9f11a5(0x1cb)][_0x9f11a5(0x269)]()];let _0x257cde=(_0x4a6a1d+_0x58761a)[_0x9f11a5(0x294)](0x0,0x1)*0x64;_0x257cde>0x0&&_0x257cde<0x64&&(_0x257cde=_0x257cde[_0x9f11a5(0x287)](0x2)),_0x257cde=String(_0x257cde)+'%',_0x3e4888+=_0x443559-this[_0x9f11a5(0x1bf)](_0x257cde)[_0x9f11a5(0x1c7)],this[_0x9f11a5(0x27c)](_0x257cde,_0x3e4888,_0x16f551);}}},Window_StealSnatch[_0x4c7b4f(0x245)]['setHelpWindowItem']=function(_0x3a2b9a){const _0x2bd916=_0x4c7b4f;if(this[_0x2bd916(0x227)])switch(_0x3a2b9a[_0x2bd916(0x1cb)]['toUpperCase']()[_0x2bd916(0x265)]()){case _0x2bd916(0x24f):this['_helpWindow']['setText'](TextManager[_0x2bd916(0x23a)]);break;case _0x2bd916(0x19a):this['_helpWindow']['setItem']($dataItems[_0x3a2b9a['id']]);break;case'WEAPON':this[_0x2bd916(0x227)]['setItem']($dataWeapons[_0x3a2b9a['id']]);break;case _0x2bd916(0x273):this['_helpWindow']['setItem']($dataArmors[_0x3a2b9a['id']]);break;}};