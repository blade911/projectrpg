//=============================================================================
// VisuStella MZ - Weapon Unleash
// VisuMZ_4_WeaponUnleash.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaponUnleash = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponUnleash = VisuMZ.WeaponUnleash || {};
VisuMZ.WeaponUnleash.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [WeaponUnleash]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Unleash_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Weapon Unleash plugin lets you give battlers a chance to perform a skill
 * that's different from the usual Attack or Guard action they have. Unleashes
 * work off a success rate system, meaning they can but not always occur.
 *
 * In addition to Unleashes, replacements for the default Attack and Guard
 * actions also available through this plugin. Unlike Unleashes, replacements
 * are always present. Though, if an Unleash manages to succeed, they will take
 * over the replacement skill.
 *
 * Each of these features can help alleviate the monotony of using the same
 * commands over and over throughout the game, giving more life to the battle
 * system and keeping it fresh and interesting.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Weapon Unleashes allow Attack commands to perform a different skill at a
 *   percentile chance.
 * * Guard Unleashes, in addition, allow Guard commands to perform a different
 *   skill at a percentile chance.
 * * On the other hand, Replace Attack and Replace Guard traits will straight
 *   up replace the default Attack and Guard commands respectively.
 * * If an Unleash succeeds, it will override the replacement skills.
 * * Add JavaScript effects that run upon Unleash triggers.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Understanding Weapon Unleashes and Guard Unleashes
 * ============================================================================
 * 
 * If a battler (actor or enemy) has an associated Weapon or Guard Unleash
 * notetag applied to itself (either directly, states, skills, or equipment), 
 * then it has a percent chance of performing an Unleash instead.
 * 
 * The Attack command can trigger Weapon Unleashes.
 * 
 * The Guard command can trigger Guard Unleashes.
 * 
 * In order for an Unleash to trigger, the battler must be able to use the
 * skill normally. This means if the Unleash skill costs MP to use and the
 * battler does not have enough MP, then the Unleash skill will not be
 * performed. Likewise, if the Unleash skill is on cooldown, it will not
 * trigger either.
 * 
 * If a battler has multiple Weapon or Guard Unleash traits, the game will go
 * through each trait one by one, taking whichever Unleash succeeds first.
 * 
 * When an Unleash triggers, if the Plugin Parameter settings allow for it,
 * then an animation will play (if Core Engine is installed) and a text popup
 * will be shown (if Battle Core is installed). At this point, any JavaScript
 * effects that trigger upon Unleash will also run, too.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Unleash-Related Notetags ===
 *
 * The following notetags are related to Unleashes, which have a percent chance
 * of trigger upon selecting "Attack" or "Guard" commands in-battle.
 *
 * ---
 *
 * <Weapon Unleash id: x%>
 * <Weapon Unleash name: x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Gives this object a trait that allows the affiliated battler a chance to
 *   perform an action other than "Attack" when selected.
 * - Replace 'id' with either the skill's ID or name you wish for the "Attack"
 *   command to have a chance of activating.
 * - Replace 'x' with a number representing the percentile chance to activate
 *   the Unleash skill.
 * - If a battler has multiple Weapon Unleash traits, the game will go through
 *   each trait one by one, taking whichever Unleash skill succeeds first.
 *
 * ---
 *
 * <Guard Unleash id: x%>
 * <Guard Unleash name: x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Gives this object a trait that allows the affiliated battler a chance to
 *   perform an action other than "Guard" when selected.
 * - Replace 'id' with either the skill's ID or name you wish for the "Guard"
 *   command to have a chance of activating.
 * - Replace 'x' with a number representing the percentile chance to activate
 *   the Unleash skill.
 * - If a battler has multiple Guard Unleash traits, the game will go through
 *   each trait one by one, taking whichever Unleash skill succeeds first.
 *
 * ---
 *
 * <Weapon Unleash: +x%>
 * <Weapon Unleash: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of all Weapon Unleashes by x%.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   all Weapon Unleash success rates.
 *
 * ---
 *
 * <Weapon Unleash id: +x%>
 * <Weapon Unleash id: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of the listed Weapon Unleash by x%.
 * - Replace 'id' with either the skill's ID or name you wish to increase the
 *   Weapon Unleash success rate for.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   the specified Weapon Unleash success rates.
 *
 * ---
 *
 * <Guard Unleash: +x%>
 * <Guard Unleash: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of all Guard Unleashes by x%.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   all Guard Unleash success rates.
 *
 * ---
 *
 * <Guard Unleash id: +x%>
 * <Guard Unleash id: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of the listed Guard Unleash by x%.
 * - Replace 'id' with either the skill's ID or name you wish to increase the
 *   Guard Unleash success rate for.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   the specified Guard Unleash success rates.
 *
 * ---
 *
 * === JavaScript Notetags: Unleash-Related ===
 *
 * The following notetags are made for users with JavaScript knowledge to
 * determine which Unleash skill will be used (if at all).
 *
 * ---
 *
 * <JS Weapon Unleash>
 *  code
 *  code
 *  id = code;
 * </JS Weapon Unleash>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Weapon Unleash skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'user' is the battler who is attempting to unleash the skill.
 * - The 'id' variable is the skill ID that the character will use for the
 *   "Weapon Unleash".
 * - Hint: The Unleashes occur at a 100% success rate. If you wish to make a
 *   percent chance success rate, check for a random number, and make it use
 *   the desired skill ID if it passes, and the default attack skill ID if it
 *   does not pass.
 *
 * ---
 *
 * <JS Guard Unleash>
 *  code
 *  code
 *  id = code;
 * </JS Guard Unleash>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Guard Unleash skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'user' is the battler who is attempting to unleash the skill.
 * - The 'id' variable is the skill ID that the character will use for the
 *   "Guard Unleash".
 * - Hint: The Unleashes occur at a 100% success rate. If you wish to make a
 *   percent chance success rate, check for a random number, and make it use
 *   the desired skill ID if it passes, and the default attack skill ID if it
 *   does not pass.
 *
 * ---
 * 
 * <JS On Unleash>
 *  code
 *  code
 *  code
 * </JS On Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when any kind of Unleash, Weapon or Guard, triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 * 
 * <JS On Weapon Unleash>
 *  code
 *  code
 *  code
 * </JS On Weapon Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when a Weapon Unleash triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 * 
 * <JS On Guard Unleash>
 *  code
 *  code
 *  code
 * </JS On Guard Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when a Guard Unleash triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 *
 * === Replace-Related Notetags ===
 *
 * Skill replacement traits will replace the "Attack" and "Guard" commands in
 * battle with other skills. They will always be replaced unless an Unleash
 * successfully triggers and overrides them.
 *
 * ---
 *
 * <Replace Attack: id>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Replaces the battler's Attack command in battle with a different skill.
 * - Replace 'id' with the skill's ID or name you wish to replace the battler's
 *   Attack command with.
 * - If a Weapon Unleash occurs, the Weapon Unleash will take priority over the
 *   Replace Attack skill.
 * - If a battler has multiple Replace Attack traits, the game will go through
 *   each trait one by one, taking whichever replaced skill is found first.
 *
 * ---
 *
 * <Replace Guard: id>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Replaces the battler's Guard command in battle with a different skill.
 * - Replace 'id' with the skill's ID or name you wish to replace the battler's
 *   Guard command with.
 * - If a Weapon Unleash occurs, the Weapon Unleash will take priority over the
 *   Replace Guard skill.
 * - If a battler has multiple Replace Guard traits, the game will go through
 *   each trait one by one, taking whichever replaced skill is found first.
 *
 * ---
 *
 * === JavaScript Notetags: Replace-Related ===
 *
 * The following notetags are made for users with JavaScript knowledge to
 * determine which replacement skill will be used (if at all).
 *
 * ---
 *
 * <JS Replace Attack>
 *  code
 *  code
 *  id = code;
 * </JS Replace Attack>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Replace Attack skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'id' variable is the skill ID that the character will use for the
 *   attack replacement.
 *
 * ---
 *
 * <JS Replace Guard>
 *  code
 *  code
 *  id = code;
 * </JS Replace Guard>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Replace Guard skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'id' variable is the skill ID that the character will use for the
 *   attack replacement.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Weapon Unleash Settings
 * ============================================================================
 *
 * Special effects regarding Weapon Unleashes. These include animations and
 * text popups that appear visually along with mechanical effects that can be
 * extended upon with JavaScript.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Requires VisuMZ_1_BattleCore.
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
 * JavaScript
 * 
 *   JS: On Unleash:
 *   - Code ran when a Weapon Unleash triggers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Unleash Settings
 * ============================================================================
 *
 * Special effects regarding Guard Unleashes. These include animations and
 * text popups that appear visually along with mechanical effects that can be
 * extended upon with JavaScript.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Requires VisuMZ_1_BattleCore.
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
 * JavaScript
 * 
 *   JS: On Unleash:
 *   - Code ran when a Guard Unleash triggers.
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
 * Version 1.03: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: December 6, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: September 25, 2020
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
 * @param WeaponUnleash
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Weapon:struct
 * @text Weapon Unleash Settings
 * @type struct<Weapon>
 * @desc Special effects regarding Weapon Unleashes.
 * @default {"Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNLEASH!","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60","JavaScript":"","OnUnleashJS:func":"\"// Declare Constants\\nconst user = arguments[0];\\nconst skillID = arguments[1];\\nconst skill = $dataSkills[skillID];\\n\\n// Perform Action\\n\""}
 *
 * @param Guard:struct
 * @text Guard Unleash Settings
 * @type struct<Guard>
 * @desc Special effects regarding Guard Unleashes.
 * @default {"Animation":"","AnimationID:num":"49","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNLEASH!","TextColor:str":"0","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60","JavaScript":"","OnUnleashJS:func":"\"// Declare Constants\\nconst user = arguments[0];\\nconst skillID = arguments[1];\\nconst skill = $dataSkills[skillID];\\n\\n// Perform Action\\n\""}
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
 * Weapon Unleash Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weapon:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore.
 * @default UNLEASH!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param JavaScript
 *
 * @param OnUnleashJS:func
 * @text JS: On Unleash
 * @parent JavaScript
 * @type note
 * @desc Code ran when a Weapon Unleash triggers.
 * @default "// Declare Constants\nconst user = arguments[0];\nconst skillID = arguments[1];\nconst skill = $dataSkills[skillID];\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Guard Unleash Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Guard:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 49
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore.
 * @default UNLEASH!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param JavaScript
 *
 * @param OnUnleashJS:func
 * @text JS: On Unleash
 * @parent JavaScript
 * @type note
 * @desc Code ran when a Guard Unleash triggers.
 * @default "// Declare Constants\nconst user = arguments[0];\nconst skillID = arguments[1];\nconst skill = $dataSkills[skillID];\n\n// Perform Action\n"
 *
 */
//=============================================================================

const _0x2b7275=_0x167a;function _0x167a(_0x5d9f7c,_0x517d60){const _0x4e59b3=_0x4e59();return _0x167a=function(_0x167a9e,_0x2c07f6){_0x167a9e=_0x167a9e-0x79;let _0x3b0432=_0x4e59b3[_0x167a9e];return _0x3b0432;},_0x167a(_0x5d9f7c,_0x517d60);}(function(_0x444f13,_0x9e8cc5){const _0xb2d86d=_0x167a,_0x4487d0=_0x444f13();while(!![]){try{const _0x5099b4=parseInt(_0xb2d86d(0x111))/0x1+-parseInt(_0xb2d86d(0x119))/0x2+-parseInt(_0xb2d86d(0x9d))/0x3+-parseInt(_0xb2d86d(0x10d))/0x4*(-parseInt(_0xb2d86d(0xcb))/0x5)+-parseInt(_0xb2d86d(0xdf))/0x6*(-parseInt(_0xb2d86d(0xdb))/0x7)+-parseInt(_0xb2d86d(0x112))/0x8+-parseInt(_0xb2d86d(0xcc))/0x9;if(_0x5099b4===_0x9e8cc5)break;else _0x4487d0['push'](_0x4487d0['shift']());}catch(_0x2b4c64){_0x4487d0['push'](_0x4487d0['shift']());}}}(_0x4e59,0x7010a));var label=_0x2b7275(0x80),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x16a991){const _0x13319f=_0x2b7275;return _0x16a991[_0x13319f(0x7c)]&&_0x16a991[_0x13319f(0x116)][_0x13319f(0xe8)]('['+label+']');})[0x0];function _0x4e59(){const _0x2fdebd=['processUnleashProperties','Skill-%1-%2','Item-%1-%2','iLuYE','gZIIr','Armor-%1-%2','match','2714005ebKbaQ','currentAction','jENGk','setEnemyAction','12TWrOHG','ParseSkillNotetags','format','ARRAYEVAL','guardSkillId','biqeY','traitObjects','TextColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20skill;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','includes','Parse_Notetags_ProcessJS','setSkill','toUpperCase','processUnleashNotetags','_cache','OnUnleashJS','name','subject','skillId','Actor-%1-%2','ztWto','push','ARRAYFUNC','iWNGL','ON-GUARD-UNLEASH','ON-UNLEASH','Guard','isGuard','ParseClassNotetags','State-%1-%2','%1-UNLEASH','LFhYS','Game_BattlerBase_initMembers','yMixf','WEAPON','ARRAYSTR','checkForWeaponUnleash','initMembers','Window_ActorCommand_setup','ZeJqx','BzXIo','getUnleashSuccessRateBonus','createOnUnleashFuncCode','_checking_VisuMZ_UnleashNotetags','setupTextPopup','item','44lkLljL','nHSqR','ilcod','ParseEnemyNotetags','802277qTClit','1943968ZHFKPi','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setup','FlashDuration','description','createUnleashReplaceFuncCode','user.guardSkillId()','1162242NIDkFH','ParseStateNotetags','checkCacheKey','requestFauxAnimation','return\x200','ParseWeaponNotetags','STR','uimwp','_guardUnleash','EVAL','COrMt','canUse','GUARD-UNLEASH','snHrY','_subject','max','Game_BattlerBase_refresh','status','STRUCT','Yfiev','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','WeaponUnleash','Settings','meetUnleashConditions','actions','createOnUnleashJS','trim','WEAPON-UNLEASH','map','onDatabaseLoaded','Weapon','JSON','uFuOT','XCfWX','fLDEP','createUnleashReplaceJS','Game_BattlerBase_attackSkillId','skills','createKeyJS','prototype','exit','FUNC','checkForGenericUnleashTraits','KbXLK','getAttackSkillId','_weaponUnleash','setGuard','AnimationMirror','egUGH','Scene_Boot_onDatabaseLoaded','1351242RWREBx','NUM','getSkillIdWithName','concat','LBHWd','attackSkillId','dKuam','onUnleash','random','call','olmRy','ParseActorNotetags','Game_BattlerBase_guardSkillId','JAiir','version','enemy','AnimationID','ErTdY','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20id\x20=\x20%2;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20id;\x0a\x20\x20\x20\x20','_skillIDs','startAction','xuVXX','ON-%1-UNLEASH','BattleManager_startAction','hasAttackGuardSkillAsUnleash','setAttack','parse','refresh','sHYNi','kmfmV','REPLACE-GUARD','VisuMZ_1_BattleCore','LlwYF','getGuardSkillId','BmQex','ParseArmorNotetags','process_VisuMZ_WeaponUnleash_Notetags','note','dLXMd','PopupText','onUnleashJS','IwYuN','GUARD','isAttack','applyUnleashSkill','clear','96265EaZszZ','503469iDIrlF','checkForJSUnleashTraits','Weapon-%1-%2','ConvertParams','user.attackSkillId()','ARRAYJSON','parameters','REPLACE-ATTACK'];_0x4e59=function(){return _0x2fdebd;};return _0x4e59();}VisuMZ[label][_0x2b7275(0x81)]=VisuMZ[label][_0x2b7275(0x81)]||{},VisuMZ['ConvertParams']=function(_0x12d450,_0x1afe0e){const _0x1f0321=_0x2b7275;for(const _0x459741 in _0x1afe0e){if(_0x459741[_0x1f0321(0xda)](/(.*):(.*)/i)){const _0x10d666=String(RegExp['$1']),_0x1c8f83=String(RegExp['$2'])['toUpperCase']()[_0x1f0321(0x85)]();let _0x25e649,_0x128473,_0x75baa7;switch(_0x1c8f83){case _0x1f0321(0x9e):_0x25e649=_0x1afe0e[_0x459741]!==''?Number(_0x1afe0e[_0x459741]):0x0;break;case'ARRAYNUM':_0x128473=_0x1afe0e[_0x459741]!==''?JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473[_0x1f0321(0x87)](_0x93d70f=>Number(_0x93d70f));break;case _0x1f0321(0x122):_0x25e649=_0x1afe0e[_0x459741]!==''?eval(_0x1afe0e[_0x459741]):null;break;case _0x1f0321(0xe2):_0x128473=_0x1afe0e[_0x459741]!==''?JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473[_0x1f0321(0x87)](_0x39b316=>eval(_0x39b316));break;case _0x1f0321(0x8a):_0x25e649=_0x1afe0e[_0x459741]!==''?JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741]):'';break;case _0x1f0321(0xd1):_0x128473=_0x1afe0e[_0x459741]!==''?JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473[_0x1f0321(0x87)](_0x266b71=>JSON[_0x1f0321(0xb7)](_0x266b71));break;case _0x1f0321(0x94):_0x25e649=_0x1afe0e[_0x459741]!==''?new Function(JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741])):new Function(_0x1f0321(0x11d));break;case _0x1f0321(0xf5):_0x128473=_0x1afe0e[_0x459741]!==''?JSON['parse'](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473[_0x1f0321(0x87)](_0xa84d04=>new Function(JSON['parse'](_0xa84d04)));break;case _0x1f0321(0x11f):_0x25e649=_0x1afe0e[_0x459741]!==''?String(_0x1afe0e[_0x459741]):'';break;case _0x1f0321(0x102):_0x128473=_0x1afe0e[_0x459741]!==''?JSON['parse'](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473['map'](_0x54d340=>String(_0x54d340));break;case _0x1f0321(0x7d):_0x75baa7=_0x1afe0e[_0x459741]!==''?JSON[_0x1f0321(0xb7)](_0x1afe0e[_0x459741]):{},_0x25e649=VisuMZ['ConvertParams']({},_0x75baa7);break;case'ARRAYSTRUCT':_0x128473=_0x1afe0e[_0x459741]!==''?JSON['parse'](_0x1afe0e[_0x459741]):[],_0x25e649=_0x128473[_0x1f0321(0x87)](_0xcb7354=>VisuMZ[_0x1f0321(0xcf)]({},JSON['parse'](_0xcb7354)));break;default:continue;}_0x12d450[_0x10d666]=_0x25e649;}}return _0x12d450;},(_0x2daf5d=>{const _0x251b86=_0x2b7275,_0xd63228=_0x2daf5d['name'];for(const _0x3ccb0a of dependencies){if(!Imported[_0x3ccb0a]){if(_0x251b86(0x9b)!==_0x251b86(0x9b)){const _0x2c041d=_0x3a74b0[_0x251b86(0x80)][_0x251b86(0x109)](_0x4f4ce1,_0x1872fd),_0x3426b2=_0x5be635['WeaponUnleash'][_0x251b86(0x91)](_0x548597,_0x1092d8);_0x4f61c8[_0x251b86(0x80)]['JS'][_0x3426b2]=new _0x31a2c9(_0x2c041d);}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x251b86(0xe1)](_0xd63228,_0x3ccb0a)),SceneManager[_0x251b86(0x93)]();break;}}}const _0x2c8aed=_0x2daf5d[_0x251b86(0x116)];if(_0x2c8aed[_0x251b86(0xda)](/\[Version[ ](.*?)\]/i)){if(_0x251b86(0xfe)!==_0x251b86(0x100)){const _0x3de185=Number(RegExp['$1']);if(_0x3de185!==VisuMZ[label][_0x251b86(0xab)]){if(_0x251b86(0xbd)===_0x251b86(0xbd))alert(_0x251b86(0x7f)['format'](_0xd63228,_0x3de185)),SceneManager[_0x251b86(0x93)]();else{const _0x5db032=_0x2d8ccf[_0x251b86(0x9f)](_0x4e9e77['$1'])||_0x3e8718(_0x54793e['$1']);_0x5db032===_0x2fe90e&&_0x33c4ff[_0x5db032]&&(_0x31bdb6+=_0x58a161(_0x376d6f['$2'])*0.01);}}}else{const _0x11612=_0x47c8d3['WeaponUnleash']['createUnleashReplaceFuncCode'](_0xca291c,_0x227d48),_0x2db9bf=_0x506a6b['WeaponUnleash'][_0x251b86(0x91)](_0x3a5b40,_0x5af555);_0x5b3fec[_0x251b86(0x80)]['JS'][_0x2db9bf]=new _0x4d10a0(_0x11612);}}if(_0x2c8aed[_0x251b86(0xda)](/\[Tier[ ](\d+)\]/i)){const _0x3cd6f7=Number(RegExp['$1']);_0x3cd6f7<tier?(alert(_0x251b86(0x113)[_0x251b86(0xe1)](_0xd63228,_0x3cd6f7,tier)),SceneManager[_0x251b86(0x93)]()):tier=Math[_0x251b86(0x7a)](_0x3cd6f7,tier);}VisuMZ[_0x251b86(0xcf)](VisuMZ[label]['Settings'],_0x2daf5d[_0x251b86(0xd2)]);})(pluginData),VisuMZ['WeaponUnleash']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x2b7275(0x88)],Scene_Boot[_0x2b7275(0x92)][_0x2b7275(0x88)]=function(){const _0x3781ad=_0x2b7275;VisuMZ[_0x3781ad(0x80)][_0x3781ad(0x9c)]['call'](this),this['process_VisuMZ_WeaponUnleash_Notetags']();},Scene_Boot[_0x2b7275(0x92)][_0x2b7275(0xc1)]=function(){const _0x36aecd=_0x2b7275;if(VisuMZ['ParseAllNotetags'])return;const _0x109993=$dataActors[_0x36aecd(0xa0)]($dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x12fcc7 of _0x109993){if(_0x36aecd(0x8d)!==_0x36aecd(0x8d))_0x2d1b74[_0x36aecd(0x80)][_0x36aecd(0x11a)][_0x36aecd(0xa6)](this,_0x11e913),_0x3f03e3[_0x36aecd(0x80)][_0x36aecd(0xe9)](_0x11ee48);else{if(!_0x12fcc7)continue;VisuMZ[_0x36aecd(0x80)][_0x36aecd(0xe9)](_0x12fcc7);}}},VisuMZ[_0x2b7275(0x80)]['ParseActorNotetags']=VisuMZ[_0x2b7275(0xa8)],VisuMZ[_0x2b7275(0xa8)]=function(_0x1e37fa){const _0x4fb4d5=_0x2b7275;VisuMZ[_0x4fb4d5(0x80)][_0x4fb4d5(0xa8)][_0x4fb4d5(0xa6)](this,_0x1e37fa),VisuMZ[_0x4fb4d5(0x80)][_0x4fb4d5(0xe9)](_0x1e37fa);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0xfb)]=VisuMZ[_0x2b7275(0xfb)],VisuMZ['ParseClassNotetags']=function(_0xe92e42){const _0x24fd30=_0x2b7275;VisuMZ[_0x24fd30(0x80)][_0x24fd30(0xfb)]['call'](this,_0xe92e42),VisuMZ[_0x24fd30(0x80)]['Parse_Notetags_ProcessJS'](_0xe92e42);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0xe0)]=VisuMZ[_0x2b7275(0xe0)],VisuMZ[_0x2b7275(0xe0)]=function(_0x656c91){const _0xa3ed02=_0x2b7275;VisuMZ[_0xa3ed02(0x80)][_0xa3ed02(0xe0)][_0xa3ed02(0xa6)](this,_0x656c91),VisuMZ[_0xa3ed02(0x80)][_0xa3ed02(0xe9)](_0x656c91);},VisuMZ['WeaponUnleash']['ParseWeaponNotetags']=VisuMZ[_0x2b7275(0x11e)],VisuMZ['ParseWeaponNotetags']=function(_0x32871e){const _0x3d8f62=_0x2b7275;VisuMZ[_0x3d8f62(0x80)][_0x3d8f62(0x11e)][_0x3d8f62(0xa6)](this,_0x32871e),VisuMZ[_0x3d8f62(0x80)][_0x3d8f62(0xe9)](_0x32871e);},VisuMZ['WeaponUnleash'][_0x2b7275(0xc0)]=VisuMZ[_0x2b7275(0xc0)],VisuMZ['ParseArmorNotetags']=function(_0x3f2e2e){const _0x4f9d00=_0x2b7275;VisuMZ[_0x4f9d00(0x80)]['ParseArmorNotetags'][_0x4f9d00(0xa6)](this,_0x3f2e2e),VisuMZ[_0x4f9d00(0x80)]['Parse_Notetags_ProcessJS'](_0x3f2e2e);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0x110)]=VisuMZ[_0x2b7275(0x110)],VisuMZ[_0x2b7275(0x110)]=function(_0x3f3aae){const _0x1d1dbd=_0x2b7275;VisuMZ[_0x1d1dbd(0x80)][_0x1d1dbd(0x110)]['call'](this,_0x3f3aae),VisuMZ[_0x1d1dbd(0x80)][_0x1d1dbd(0xe9)](_0x3f3aae);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0x11a)]=VisuMZ[_0x2b7275(0x11a)],VisuMZ[_0x2b7275(0x11a)]=function(_0x46afe4){const _0x56fccd=_0x2b7275;VisuMZ[_0x56fccd(0x80)][_0x56fccd(0x11a)]['call'](this,_0x46afe4),VisuMZ['WeaponUnleash'][_0x56fccd(0xe9)](_0x46afe4);},VisuMZ[_0x2b7275(0x80)]['Parse_Notetags_ProcessJS']=function(_0x473bb5){const _0x2e41d1=_0x2b7275;_0x473bb5[_0x2e41d1(0xc2)]['match'](/<JS WEAPON UNLEASH>\s*([\s\S]*)\s*<\/JS WEAPON UNLEASH>/i)&&VisuMZ[_0x2e41d1(0x80)][_0x2e41d1(0x8e)](_0x473bb5,_0x2e41d1(0x86),RegExp['$1']),_0x473bb5[_0x2e41d1(0xc2)][_0x2e41d1(0xda)](/<JS GUARD UNLEASH>\s*([\s\S]*)\s*<\/JS GUARD UNLEASH>/i)&&(_0x2e41d1(0xf6)!==_0x2e41d1(0xf6)?_0xe2a8f8+=_0x13f946(_0x4ef832['$2'])*0.01:VisuMZ[_0x2e41d1(0x80)][_0x2e41d1(0x8e)](_0x473bb5,_0x2e41d1(0x125),RegExp['$1'])),_0x473bb5[_0x2e41d1(0xc2)][_0x2e41d1(0xda)](/<JS REPLACE ATTACK>\s*([\s\S]*)\s*<\/JS REPLACE ATTACK>/i)&&VisuMZ['WeaponUnleash'][_0x2e41d1(0x8e)](_0x473bb5,_0x2e41d1(0xd3),RegExp['$1']),_0x473bb5[_0x2e41d1(0xc2)][_0x2e41d1(0xda)](/<JS REPLACE GUARD>\s*([\s\S]*)\s*<\/JS REPLACE GUARD>/i)&&VisuMZ[_0x2e41d1(0x80)][_0x2e41d1(0x8e)](_0x473bb5,'REPLACE-GUARD',RegExp['$1']),_0x473bb5[_0x2e41d1(0xc2)][_0x2e41d1(0xda)](/<JS ON UNLEASH>\s*([\s\S]*)\s*<\/JS ON UNLEASH>/i)&&(_0x2e41d1(0xf3)===_0x2e41d1(0xae)?this[_0x2e41d1(0xec)](_0x2e41d1(0x101)):VisuMZ[_0x2e41d1(0x80)][_0x2e41d1(0x84)](_0x473bb5,'ON-UNLEASH',RegExp['$1'])),_0x473bb5[_0x2e41d1(0xc2)]['match'](/<JS ON WEAPON UNLEASH>\s*([\s\S]*)\s*<\/JS ON WEAPON UNLEASH>/i)&&(_0x2e41d1(0x106)===_0x2e41d1(0xb2)?(_0x5db87a[_0x2e41d1(0x80)][_0x2e41d1(0xfb)][_0x2e41d1(0xa6)](this,_0x3ee658),_0x477a4d[_0x2e41d1(0x80)][_0x2e41d1(0xe9)](_0x144e12)):VisuMZ[_0x2e41d1(0x80)][_0x2e41d1(0x84)](_0x473bb5,'ON-WEAPON-UNLEASH',RegExp['$1'])),_0x473bb5['note'][_0x2e41d1(0xda)](/<JS ON GUARD UNLEASH>\s*([\s\S]*)\s*<\/JS ON GUARD UNLEASH>/i)&&VisuMZ[_0x2e41d1(0x80)]['createOnUnleashJS'](_0x473bb5,_0x2e41d1(0xf7),RegExp['$1']);},VisuMZ['WeaponUnleash']['JS']={},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0x8e)]=function(_0xba9b26,_0x2823a6,_0x21641c){const _0x367375=_0x2b7275,_0xc8051a=VisuMZ[_0x367375(0x80)][_0x367375(0x117)](_0x2823a6,_0x21641c),_0x151d3b=VisuMZ[_0x367375(0x80)][_0x367375(0x91)](_0xba9b26,_0x2823a6);VisuMZ[_0x367375(0x80)]['JS'][_0x151d3b]=new Function(_0xc8051a);},VisuMZ['WeaponUnleash'][_0x2b7275(0x117)]=function(_0xfcec71,_0xaadac4){const _0x91a322=_0x2b7275;let _0x2e6697='user.attackSkillId()';switch(_0xfcec71['toUpperCase']()['trim']()){case _0x91a322(0x86):case _0x91a322(0xd3):_0x2e6697=_0x91a322(0xd0);break;case _0x91a322(0x125):case _0x91a322(0xbb):_0x2e6697=_0x91a322(0x118);break;}return _0x91a322(0xaf)['format'](_0xaadac4,_0x2e6697);},VisuMZ[_0x2b7275(0x80)]['createOnUnleashJS']=function(_0x38424,_0x2c70b4,_0x2e528e){const _0x5206e8=_0x2b7275,_0x48dabb=VisuMZ[_0x5206e8(0x80)][_0x5206e8(0x109)](_0x2c70b4,_0x2e528e),_0x17ba88=VisuMZ[_0x5206e8(0x80)]['createKeyJS'](_0x38424,_0x2c70b4);VisuMZ[_0x5206e8(0x80)]['JS'][_0x17ba88]=new Function(_0x48dabb);},VisuMZ['WeaponUnleash'][_0x2b7275(0x109)]=function(_0x2afc81,_0xc33d8a){const _0x368dcf=_0x2b7275;return _0x368dcf(0xe7)['format'](_0xc33d8a);},VisuMZ[_0x2b7275(0x80)]['createKeyJS']=function(_0x2f32da,_0x119d69){const _0x5980af=_0x2b7275;let _0x2248b0='';if($dataActors[_0x5980af(0xe8)](_0x2f32da))_0x2248b0=_0x5980af(0xf2)[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);if($dataClasses[_0x5980af(0xe8)](_0x2f32da))_0x2248b0='Class-%1-%2'['format'](_0x2f32da['id'],_0x119d69);if($dataSkills['includes'](_0x2f32da))_0x2248b0=_0x5980af(0xd5)['format'](_0x2f32da['id'],_0x119d69);if($dataItems['includes'](_0x2f32da))_0x2248b0=_0x5980af(0xd6)[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);if($dataWeapons[_0x5980af(0xe8)](_0x2f32da))_0x2248b0=_0x5980af(0xce)[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);if($dataArmors[_0x5980af(0xe8)](_0x2f32da))_0x2248b0=_0x5980af(0xd9)[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);if($dataEnemies[_0x5980af(0xe8)](_0x2f32da))_0x2248b0='Enemy-%1-%2'[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);if($dataStates[_0x5980af(0xe8)](_0x2f32da))_0x2248b0=_0x5980af(0xfc)[_0x5980af(0xe1)](_0x2f32da['id'],_0x119d69);return _0x2248b0;},DataManager[_0x2b7275(0x9f)]=function(_0x1f3c0a){const _0x418a2a=_0x2b7275;_0x1f3c0a=_0x1f3c0a[_0x418a2a(0xeb)]()[_0x418a2a(0x85)](),this[_0x418a2a(0xb0)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x1f3c0a])return this['_skillIDs'][_0x1f3c0a];for(const _0x32fa9f of $dataSkills){if(_0x418a2a(0xc3)===_0x418a2a(0xc3)){if(!_0x32fa9f)continue;this[_0x418a2a(0xb0)][_0x32fa9f[_0x418a2a(0xef)]['toUpperCase']()[_0x418a2a(0x85)]()]=_0x32fa9f['id'];}else{const _0x417d76=[];for(const _0xadf687 of this['enemy']()[_0x418a2a(0x83)]){const _0x1a4055=_0x523e93[_0xadf687['skillId']];if(_0x1a4055&&!_0x417d76[_0x418a2a(0xe8)](_0x1a4055))_0x417d76['push'](_0x1a4055);}return _0x417d76;}}return this['_skillIDs'][_0x1f3c0a]||0x0;},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0xb4)]=BattleManager[_0x2b7275(0xb1)],BattleManager[_0x2b7275(0xb1)]=function(){const _0x1c211c=_0x2b7275;this[_0x1c211c(0x103)](),VisuMZ['WeaponUnleash'][_0x1c211c(0xb4)]['call'](this);},BattleManager[_0x2b7275(0x103)]=function(){const _0x297b74=_0x2b7275,_0x514af4=this[_0x297b74(0x79)],_0x45b00f=_0x514af4[_0x297b74(0xdc)]();if(_0x45b00f)_0x45b00f[_0x297b74(0xd4)]();},Game_Action[_0x2b7275(0x92)][_0x2b7275(0xd4)]=function(){const _0x1f4ec1=_0x2b7275;if(!this[_0x1f4ec1(0xf0)]())return;if(!this[_0x1f4ec1(0x10c)]())return;if(this[_0x1f4ec1(0xc8)]())this[_0x1f4ec1(0xec)](_0x1f4ec1(0x101));else this[_0x1f4ec1(0xfa)]()&&this[_0x1f4ec1(0xec)]('GUARD');},Game_Action['prototype'][_0x2b7275(0xec)]=function(_0x3d5858){const _0x13cabf=_0x2b7275,_0x989069=this[_0x13cabf(0xf0)]()[_0x13cabf(0xe5)]()[_0x13cabf(0xa0)](this[_0x13cabf(0xf0)]()['skills']());for(const _0x52c74e of _0x989069){if(_0x13cabf(0x107)===_0x13cabf(0x107)){if(!_0x52c74e)continue;if(this['checkObjectForUnleashTraits'](_0x3d5858,_0x52c74e))break;}else _0x426f2b=_0x54fed1[_0x13cabf(0x7a)](_0x566614,_0x2bce14);}},Game_Action[_0x2b7275(0x92)]['checkObjectForUnleashTraits']=function(_0xd48b6a,_0x38015c){const _0x20dcba=_0x2b7275;if(this['checkForGenericUnleashTraits'](_0xd48b6a,_0x38015c))return!![];if(this[_0x20dcba(0xcd)](_0xd48b6a,_0x38015c))return!![];return![];},Game_Action[_0x2b7275(0x92)][_0x2b7275(0x95)]=function(_0x376ca3,_0x3907b2){const _0x3350a2=_0x2b7275,_0x215c8b=_0x3907b2[_0x3350a2(0xc2)][_0x3350a2(0xda)](/<(.*) UNLEASH (.*):[ ](\d+)([%％])>/gi);if(_0x215c8b)for(const _0x356264 of _0x215c8b){if(_0x356264[_0x3350a2(0xda)](/<(.*) UNLEASH (.*):[ ](\d+)([%％])>/i)){if('TtKeZ'!=='TtKeZ')_0x22be0b+=_0x37d8d2(_0x3b88b6['$2'])*0.01;else{const _0x5b7df5=String(RegExp['$1'])[_0x3350a2(0xeb)]()[_0x3350a2(0x85)](),_0x18b0ad=DataManager[_0x3350a2(0x9f)](RegExp['$2'])||Number(RegExp['$2']),_0x548cea=Number(RegExp['$3'])*0.01;if(_0x5b7df5!==_0x376ca3)continue;if(this[_0x3350a2(0xc9)](_0x376ca3,_0x18b0ad,_0x548cea))return!![];}}}return![];},Game_Action[_0x2b7275(0x92)][_0x2b7275(0xcd)]=function(_0x47984d,_0x3877ee){const _0x3ec9d6=_0x2b7275,_0x2dd9de=_0x3ec9d6(0xfd)[_0x3ec9d6(0xe1)](_0x47984d['toUpperCase']()[_0x3ec9d6(0x85)]()),_0x1dd8e4=VisuMZ['WeaponUnleash'][_0x3ec9d6(0x91)](_0x3877ee,_0x2dd9de);if(VisuMZ[_0x3ec9d6(0x80)]['JS'][_0x1dd8e4]){if('uimwp'===_0x3ec9d6(0x120)){const _0x5c604e=VisuMZ[_0x3ec9d6(0x80)]['JS'][_0x1dd8e4][_0x3ec9d6(0xa6)](this,this[_0x3ec9d6(0xf0)](),_0x3877ee);if(this[_0x3ec9d6(0xc9)](_0x47984d,_0x5c604e,0x1))return!![];}else{if(_0x5b5fb2[_0x3ec9d6(0xa5)]()>_0x367be2)return![];const _0x27ed39=_0x487c6c[_0x59a174];if(!_0x27ed39)return![];if(!this[_0x3ec9d6(0xf0)]())return![];if(!this['subject']()[_0x3ec9d6(0x124)](_0x27ed39))return![];return!![];}}return![];},Game_Action['prototype']['applyUnleashSkill']=function(_0x41055f,_0x10f1fa,_0x35086e){const _0x1f8ad7=_0x2b7275;_0x35086e+=this[_0x1f8ad7(0xf0)]()[_0x1f8ad7(0x108)](_0x41055f,_0x10f1fa);if(this[_0x1f8ad7(0xb5)](_0x41055f,_0x10f1fa))return![];if(!this[_0x1f8ad7(0x82)](_0x10f1fa,_0x35086e))return![];this[_0x1f8ad7(0xea)](_0x10f1fa);if(_0x41055f==='WEAPON')_0x1f8ad7(0xb9)===_0x1f8ad7(0xc6)?_0xede96[_0x1f8ad7(0x80)][_0x1f8ad7(0x8e)](_0xe47a19,_0x1f8ad7(0xbb),_0x5e25fd['$1']):(this[_0x1f8ad7(0xa4)](_0x1f8ad7(0x89),_0x10f1fa),this[_0x1f8ad7(0x98)]=!![]);else _0x41055f===_0x1f8ad7(0xc7)&&(this[_0x1f8ad7(0xa4)](_0x1f8ad7(0xf9),_0x10f1fa),this[_0x1f8ad7(0x121)]=!![]);return!![];},Game_Action[_0x2b7275(0x92)][_0x2b7275(0xb5)]=function(_0x24747e,_0x464193){const _0x2a104f=_0x2b7275;if(_0x24747e==='WEAPON'){if(_0x2a104f(0xaa)===_0x2a104f(0xaa))return this[_0x2a104f(0xf0)]()[_0x2a104f(0xa2)]()===_0x464193;else this[_0x2a104f(0xed)]={},_0x4b79c4[_0x2a104f(0x80)][_0x2a104f(0xff)][_0x2a104f(0xa6)](this);}else{if(_0x24747e===_0x2a104f(0xc7)){if(_0x2a104f(0x96)===_0x2a104f(0xa7))_0xd0b0ad[_0x2a104f(0x80)][_0x2a104f(0x84)](_0xe11e2d,_0x2a104f(0xf7),_0x335fdd['$1']);else return this[_0x2a104f(0xf0)]()[_0x2a104f(0xe3)]()===_0x464193;}}return![];},Game_Action[_0x2b7275(0x92)][_0x2b7275(0x82)]=function(_0x581c0b,_0x37ce5d){const _0x4f0b7e=_0x2b7275;if(Math['random']()>_0x37ce5d)return![];const _0x59c029=$dataSkills[_0x581c0b];if(!_0x59c029)return![];if(!this[_0x4f0b7e(0xf0)]())return![];if(!this[_0x4f0b7e(0xf0)]()['canUse'](_0x59c029))return![];return!![];},Game_Action[_0x2b7275(0x92)]['onUnleash']=function(_0x7a4d30,_0x148b4e){const _0x1cd0b=_0x2b7275,_0x349867=VisuMZ[_0x1cd0b(0x80)]['Settings'][_0x7a4d30];if(!_0x349867)return;const _0x57fb8e=this[_0x1cd0b(0xf0)]();if(!_0x57fb8e)return;if(Imported['VisuMZ_0_CoreEngine']){const _0x4340e7=[_0x57fb8e],_0x255a4e=_0x349867[_0x1cd0b(0xad)],_0x38dec7=_0x349867[_0x1cd0b(0x9a)],_0x53812a=_0x349867['AnimationMute'];$gameTemp[_0x1cd0b(0x11c)](_0x4340e7,_0x255a4e,_0x38dec7,_0x53812a);}if(Imported[_0x1cd0b(0xbc)]){if(_0x1cd0b(0x10f)!==_0x1cd0b(0x8b)){const _0x1a703e=_0x349867[_0x1cd0b(0xc4)],_0x3e8fed={'textColor':_0x349867[_0x1cd0b(0xe6)]||0x0,'flashColor':_0x349867['FlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x349867[_0x1cd0b(0x115)]||0x3c};_0x57fb8e[_0x1cd0b(0x10b)](_0x1a703e,_0x3e8fed);}else return this['subject']()[_0x1cd0b(0xa2)]()===_0x396dc2;}if(_0x349867['OnUnleashJS']){if('jENGk'===_0x1cd0b(0xdd))_0x349867[_0x1cd0b(0xee)][_0x1cd0b(0xa6)](this,_0x57fb8e,_0x148b4e);else{const _0x514be9=_0xd831f7[_0x1cd0b(0xf1)];if(_0x514be9===0x1&&this[_0x1cd0b(0xf0)]()['attackSkillId']()!==0x1)this[_0x1cd0b(0xb6)]();else _0x514be9===0x2&&this[_0x1cd0b(0xf0)]()[_0x1cd0b(0xe3)]()!==0x2?this[_0x1cd0b(0x99)]():this[_0x1cd0b(0xea)](_0x514be9);}}_0x57fb8e['onUnleashJS'](_0x7a4d30,_0x148b4e);},Game_Action[_0x2b7275(0x92)][_0x2b7275(0xde)]=function(_0x5bb0cc){const _0x2fb6bc=_0x2b7275;if(_0x5bb0cc){const _0x46df54=_0x5bb0cc[_0x2fb6bc(0xf1)];if(_0x46df54===0x1&&this[_0x2fb6bc(0xf0)]()['attackSkillId']()!==0x1)this['setAttack']();else _0x46df54===0x2&&this['subject']()[_0x2fb6bc(0xe3)]()!==0x2?this[_0x2fb6bc(0x99)]():this['setSkill'](_0x46df54);}else this[_0x2fb6bc(0xca)]();},VisuMZ[_0x2b7275(0x80)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x2b7275(0x92)][_0x2b7275(0x104)],Game_BattlerBase[_0x2b7275(0x92)]['initMembers']=function(){const _0x358c51=_0x2b7275;this[_0x358c51(0xed)]={},VisuMZ[_0x358c51(0x80)][_0x358c51(0xff)][_0x358c51(0xa6)](this);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0x7b)]=Game_BattlerBase[_0x2b7275(0x92)]['refresh'],Game_BattlerBase[_0x2b7275(0x92)][_0x2b7275(0xb8)]=function(){const _0x44c697=_0x2b7275;this[_0x44c697(0xed)]={},VisuMZ[_0x44c697(0x80)][_0x44c697(0x7b)][_0x44c697(0xa6)](this);},Game_BattlerBase[_0x2b7275(0x92)]['checkCacheKey']=function(_0x3fc074){const _0x4e3b07=_0x2b7275;return this[_0x4e3b07(0xed)]=this['_cache']||{},this[_0x4e3b07(0xed)][_0x3fc074]!==undefined;},VisuMZ['WeaponUnleash'][_0x2b7275(0x8f)]=Game_BattlerBase[_0x2b7275(0x92)][_0x2b7275(0xa2)],Game_BattlerBase[_0x2b7275(0x92)][_0x2b7275(0xa2)]=function(){const _0x6bec4c=_0x2b7275;if(this[_0x6bec4c(0x10a)])return VisuMZ[_0x6bec4c(0x80)][_0x6bec4c(0x8f)][_0x6bec4c(0xa6)](this);const _0x264979=_0x6bec4c(0xa2);if(this[_0x6bec4c(0x11b)](_0x264979))return this[_0x6bec4c(0xed)][_0x264979];return this[_0x6bec4c(0xed)][_0x264979]=this[_0x6bec4c(0x97)](),this[_0x6bec4c(0xed)][_0x264979];},Game_BattlerBase['prototype'][_0x2b7275(0x97)]=function(){const _0x55a4d6=_0x2b7275,_0x4230ec=this['traitObjects']()['concat'](this[_0x55a4d6(0x90)]());for(const _0xaa40aa of _0x4230ec){if(!_0xaa40aa)continue;if(_0xaa40aa[_0x55a4d6(0xc2)][_0x55a4d6(0xda)](/<REPLACE ATTACK:[ ](.*)>/i)){if(_0x55a4d6(0xe4)!==_0x55a4d6(0x8c)){const _0x1e6f03=DataManager[_0x55a4d6(0x9f)](RegExp['$1'])||Number(RegExp['$1']);if($dataSkills[_0x1e6f03])return _0x1e6f03;}else _0x5a2758[_0x55a4d6(0x80)]['JS'][_0x3399fb][_0x55a4d6(0xa6)](this,this,_0x5752f0);}const _0x884d01='REPLACE-ATTACK',_0x2e21b4=VisuMZ['WeaponUnleash'][_0x55a4d6(0x91)](_0xaa40aa,_0x884d01);if(VisuMZ['WeaponUnleash']['JS'][_0x2e21b4]){if('cRWsy'===_0x55a4d6(0x123))_0x47e31d+=_0x1566e4(_0x4c15c2['$1'])*0.01;else{this[_0x55a4d6(0x10a)]=!![];const _0x44d724=VisuMZ[_0x55a4d6(0x80)]['JS'][_0x2e21b4][_0x55a4d6(0xa6)](this,this,_0xaa40aa);this[_0x55a4d6(0x10a)]=![];if($dataSkills[_0x44d724])return _0x44d724;}}}return VisuMZ[_0x55a4d6(0x80)][_0x55a4d6(0x8f)]['call'](this);},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0xa9)]=Game_BattlerBase[_0x2b7275(0x92)][_0x2b7275(0xe3)],Game_BattlerBase['prototype'][_0x2b7275(0xe3)]=function(){const _0x2180e8=_0x2b7275;if(this['_checking_VisuMZ_UnleashNotetags'])return VisuMZ[_0x2180e8(0x80)][_0x2180e8(0xa9)][_0x2180e8(0xa6)](this);const _0x2e1ea5=_0x2180e8(0xe3);if(this['checkCacheKey'](_0x2e1ea5))return this['_cache'][_0x2e1ea5];return this[_0x2180e8(0xed)][_0x2e1ea5]=this[_0x2180e8(0xbe)](),this[_0x2180e8(0xed)][_0x2e1ea5];},Game_BattlerBase[_0x2b7275(0x92)]['getGuardSkillId']=function(){const _0x3ab624=_0x2b7275,_0x2219b6=this[_0x3ab624(0xe5)]()[_0x3ab624(0xa0)](this[_0x3ab624(0x90)]());for(const _0x21e231 of _0x2219b6){if(_0x3ab624(0xd8)!==_0x3ab624(0xd8))_0x26875b['WeaponUnleash']['JS'][_0x5a1039][_0x3ab624(0xa6)](this,this,_0x19b0bd);else{if(!_0x21e231)continue;if(_0x21e231[_0x3ab624(0xc2)][_0x3ab624(0xda)](/<REPLACE GUARD:[ ](.*)>/i)){if(_0x3ab624(0x126)===_0x3ab624(0x10e))_0x4d2f6c[_0x3ab624(0x80)][_0x3ab624(0x8e)](_0x1d198e,_0x3ab624(0xd3),_0x1bf014['$1']);else{const _0x467843=DataManager[_0x3ab624(0x9f)](RegExp['$1'])||Number(RegExp['$1']);if($dataSkills[_0x467843])return _0x467843;}}const _0x54dd2e='REPLACE-GUARD',_0x14ea75=VisuMZ[_0x3ab624(0x80)]['createKeyJS'](_0x21e231,_0x54dd2e);if(VisuMZ[_0x3ab624(0x80)]['JS'][_0x14ea75]){this[_0x3ab624(0x10a)]=!![];const _0x1fa965=VisuMZ[_0x3ab624(0x80)]['JS'][_0x14ea75][_0x3ab624(0xa6)](this,this,_0x21e231);this['_checking_VisuMZ_UnleashNotetags']=![];if($dataSkills[_0x1fa965])return _0x1fa965;}}}return VisuMZ['WeaponUnleash'][_0x3ab624(0xa9)][_0x3ab624(0xa6)](this);},Game_BattlerBase[_0x2b7275(0x92)]['getUnleashSuccessRateBonus']=function(_0x3aebff,_0x2a2c40){const _0x51eeb1=_0x2b7275,_0x5c67d8=this['traitObjects']()[_0x51eeb1(0xa0)](this[_0x51eeb1(0x90)]());let _0x5c1f16=0x0;for(const _0x58d9f7 of _0x5c67d8){if(!_0x58d9f7)continue;const _0x37e23e=_0x58d9f7[_0x51eeb1(0xc2)];if(_0x3aebff===_0x51eeb1(0x101)){_0x37e23e['match'](/<WEAPON UNLEASH:[ ]([\+\-]\d+)([%％])>/i)&&(_0x5c1f16+=Number(RegExp['$1'])*0.01);if(_0x37e23e[_0x51eeb1(0xda)](/<WEAPON UNLEASH (.*):[ ]([\+\-]\d+)([%％])>/i)){const _0x2a41cc=DataManager[_0x51eeb1(0x9f)](RegExp['$1'])||Number(RegExp['$1']);if(_0x2a41cc===_0x2a2c40&&$dataSkills[_0x2a41cc]){if(_0x51eeb1(0xba)===_0x51eeb1(0x7e)){const _0x1e9ec7=_0x547738[_0x51eeb1(0x80)]['JS'][_0x49b7dd][_0x51eeb1(0xa6)](this,this[_0x51eeb1(0xf0)](),_0x41cac0);if(this[_0x51eeb1(0xc9)](_0x27746c,_0x1e9ec7,0x1))return!![];}else _0x5c1f16+=Number(RegExp['$2'])*0.01;}}}else{if(_0x3aebff===_0x51eeb1(0xc7)){if(_0x51eeb1(0xbf)!=='BmQex')_0x305830[_0x51eeb1(0x80)][_0x51eeb1(0x9c)][_0x51eeb1(0xa6)](this),this[_0x51eeb1(0xc1)]();else{_0x37e23e[_0x51eeb1(0xda)](/<GUARD UNLEASH:[ ]([\+\-]\d+)([%％])>/i)&&(_0x5c1f16+=Number(RegExp['$1'])*0.01);if(_0x37e23e[_0x51eeb1(0xda)](/<GUARD UNLEASH (.*):[ ]([\+\-]\d+)([%％])>/i)){const _0xaa80d4=DataManager['getSkillIdWithName'](RegExp['$1'])||Number(RegExp['$1']);if(_0xaa80d4===_0x2a2c40&&$dataSkills[_0xaa80d4]){if(_0x51eeb1(0xd7)!==_0x51eeb1(0xd7)){_0x4ac1b6[_0x51eeb1(0xda)](/<GUARD UNLEASH:[ ]([\+\-]\d+)([%％])>/i)&&(_0x25af0d+=_0x45a0bc(_0x5770bb['$1'])*0.01);if(_0x24d3eb[_0x51eeb1(0xda)](/<GUARD UNLEASH (.*):[ ]([\+\-]\d+)([%％])>/i)){const _0x26c807=_0x432389[_0x51eeb1(0x9f)](_0x152cc9['$1'])||_0x4f7e40(_0x15d183['$1']);_0x26c807===_0xafdba7&&_0x576998[_0x26c807]&&(_0x27b8f8+=_0x106181(_0x3438fa['$2'])*0.01);}}else _0x5c1f16+=Number(RegExp['$2'])*0.01;}}}}}}return _0x5c1f16;},Game_Battler['prototype'][_0x2b7275(0xc5)]=function(_0x335171,_0x1e7e89){const _0x21673d=_0x2b7275,_0x1c3183=this[_0x21673d(0xe5)]()[_0x21673d(0xa0)](this[_0x21673d(0x90)]());for(const _0x19a616 of _0x1c3183){if(!_0x19a616)continue;const _0x288a44=VisuMZ['WeaponUnleash'][_0x21673d(0x91)](_0x19a616,_0x21673d(0xf8));VisuMZ[_0x21673d(0x80)]['JS'][_0x288a44]&&VisuMZ[_0x21673d(0x80)]['JS'][_0x288a44]['call'](this,this,_0x1e7e89);const _0x30a6e5=VisuMZ[_0x21673d(0x80)][_0x21673d(0x91)](_0x19a616,_0x21673d(0xb3)[_0x21673d(0xe1)](_0x335171[_0x21673d(0xeb)]()[_0x21673d(0x85)]()));VisuMZ[_0x21673d(0x80)]['JS'][_0x30a6e5]&&VisuMZ['WeaponUnleash']['JS'][_0x30a6e5][_0x21673d(0xa6)](this,this,_0x1e7e89);}},Game_Enemy[_0x2b7275(0x92)][_0x2b7275(0x90)]=function(){const _0xb1f211=_0x2b7275,_0x3d5eaa=[];for(const _0x44bcd6 of this[_0xb1f211(0xac)]()[_0xb1f211(0x83)]){if(_0xb1f211(0xa1)===_0xb1f211(0xa3)){if(this[_0xb1f211(0x95)](_0x1731e2,_0x5ae318))return!![];if(this['checkForJSUnleashTraits'](_0x4645b8,_0x29b4e0))return!![];return![];}else{const _0x57bd10=$dataSkills[_0x44bcd6[_0xb1f211(0xf1)]];if(_0x57bd10&&!_0x3d5eaa['includes'](_0x57bd10))_0x3d5eaa[_0xb1f211(0xf4)](_0x57bd10);}}return _0x3d5eaa;},VisuMZ[_0x2b7275(0x80)][_0x2b7275(0x105)]=Window_ActorCommand[_0x2b7275(0x92)][_0x2b7275(0x114)],Window_ActorCommand['prototype'][_0x2b7275(0x114)]=function(_0x5968bc){const _0x21b99=_0x2b7275;if(_0x5968bc)_0x5968bc[_0x21b99(0xb8)]();VisuMZ['WeaponUnleash'][_0x21b99(0x105)][_0x21b99(0xa6)](this,_0x5968bc);};